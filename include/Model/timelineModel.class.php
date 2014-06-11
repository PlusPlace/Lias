<?php
/**
 * タイムラインを取得するModel
 * 
 * APIの仕様にそって各項目を出力
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Get_personal_timeline
 *
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class timelineModel extends DataBaseModel {
    
    /**
     * 全体の配列を形成する
     * 
     * @param int $my_id 自分のID
     * @param int $group_id グループのID
     * @param int $page １０件以降取得するオフセット
     * @return array $timeline
    **/
    public function getMakeArray ($my_id, $group_id, $page) {
        
        // 表示数
        $output = 10;
        
        // ページのオフセット
        if (empty($page)) $page = 1;
        $this->ParamCheck($page);
        $limit = $output * $page;
        $page--;
        $offset = $output * $page;
                
        // 取得TLがグループかユーザーか分ける
        if (!empty($group_id)) {

            $this->ParamCheck($group_id);
            $sql = $this->getRequestSQL($my_id, $group_id, $limit, $offset);
            
        } else {
            
            $group_id = 0;
            $sql = $this->getRequestSQL($my_id, $group_id, $limit, $offset);
        
        }
        
        $timeline = $this->getTimeline($my_id, $group_id, $sql);
        $this->resultCheck($timeline);
        return $timeline;
        
    }
    
    /**
     * 指定したタイムラインを取得する
     * 
     * 自分が所属しているグループだったらフォローしている
     * グループタイムラインも一緒に表示される。
     * 他グループだったらそのグループのタイムラインのみ
     * 
     * @param int $my_id 自分のID
     * @param string $sql SQL
    **/
    protected function getTimeline ($my_id, $group_id, $sql) {
        
        $timeline = array();
        $result = $this->DB->query($sql);
        
        while ($val = $result->fetch(PDO::FETCH_ASSOC)) {
            
            // 作成時間を分割
            $createAt = explode(' ', $val['createAt']);
            $Ymd = explode('-', $createAt[0]);
            $His = explode(':', $createAt[1]);
            
            // like関連データ取得
            $likeData = $this->getLikeData($val['id'], $my_id);
            
            $timeline['articles'][] = array(
                'createdAt' => array(
                    $Ymd[0], $Ymd[1], $Ymd[2],
                    $His[0], $His[1], $His[2]
                ),
                'article' => $val['article'],
                'articleId' => $val['id'],
                'creator' => array(
                    'name' => $val['group_name'],
                    'groupId' => $val['group_id'],
                    'icon' => ''
                ),
                'likes' => $likeData['likes'],
                'liked' => $likeData['liked'],
                'comments' => $this->getComment($val['id'])
            );
            
        }
        
        // グループのタイムライン取得のときのみパーミッションを追加する。
        if (!empty($timeline) && !empty($group_id))
            $timeline['permission'] = $this->getGroupIn($my_id, $group_id, 'permission');
        
        return $timeline;
    }
    
    /**
     * 指定ユーザーが指定グループに所属しているか
     * 
     * @param int $my_id 自分のID
     * @param int $group_id グループのID
     * @param string $field　取得したいフィールド
     * @return boolean $sql
    **/
    protected function getGroupIn ($my_id, $group_id, $field) {
        
        $sql = "SELECT $field FROM relation_user_group
        WHERE group_id = $group_id AND lias_id = $my_id";
        
        $result = $this->DB->query($sql);
        $val = $result->fetchColumn();
        return !empty($val) ? true : false;
        
    }
    
    /**
     * 指定対象のタイムラインSQLを取得する
     * 
     * max_idが指定されているときは、それ以降の新しい記事を返す
     * 
     * @param int $my_id 自分のID
     * @param int $group_id グループのID
     * @param int $limit 取得上限
     * @para, int $page ページ番号
     * @return string $sql
    **/
    private function getRequestSQL ($my_id, $group_id, $limit, $page) {
            
        if (!empty($group_id)) {
            
            // グループに所属しているかチェック
            $belong = $this->getGroupIn($my_id, $group_id, 'group_id');
            if ($belong) {
        
                // 自分が所属しているグループのタイムラインを取得
                return "SELECT t.*, g.group_name FROM timeline as t, `group` as g
                WHERE g.id = t.group_id AND (t.group_id = $group_id OR t.group_id IN
                (SELECT follow_group_id FROM relation_group_follow WHERE group_id = $group_id))
                ORDER BY t.id DESC LIMIT $limit OFFSET $page";
                
            } else {
                
                // グループのタイムライン取得
                return "SELECT t.*, g.group_name FROM timeline as t, `group` as g
                WHERE g.id = t.group_id AND t.group_id = $group_id
                ORDER BY id DESC LIMIT $limit OFFSET $page";
                
            }
                
        } else {

                // ユーザーの所属とフォローしてるグループのタイムラインを取得
                return "SELECT t.*, g.group_name FROM timeline as t, `group` as g
                WHERE g.id = t.group_id AND group_id IN
                (SELECT group_id FROM relation_user_follow WHERE lias_id = $my_id UNION
                SELECT group_id FROM relation_user_group WHERE lias_id = $my_id)
                ORDER BY t.id DESC LIMIT $limit OFFSET $page";
        }
        
    }

    /**
     * 指定したグループのタイムラインのコメント一覧を取得
     * 
     * @param int $tl_id タイムラインID
     * @return array $comments
    **/
    protected function getComment ($tl_id) {
            
        $comments = array();
            
        $sql = "SELECT * FROM comment WHERE tl_id = $tl_id";
        $result = $this->DB->query($sql);
        while($val = $result->fetch(PDO::FETCH_ASSOC)) {
            $comments[] = array(
                'commentatorName' => $val['name'],
                'commentatorId' => $this->getCommentorId($val['lias_id'], $val['group_id']),
                'commentatorIcon' => '',
                'comment' => $val['comment']
            );
        }
        
        return $comments;
            
    }
    
    /**
     * 値が入ってる方を返す
     * 
     * ユーザーIDの接頭にはp
     * グループIDの接頭にはgを付ける
     * @param int $lias_id 指定ユーザーのID
     * @param int $group_id グループのID
     * @return array $lias_id or $group_id
    **/
    protected function getCommentorId ($lias_id, $group_id) {
        return !empty($lias_id) ? 'p'.$lias_id : 'g'.$group_id;
    }
    
    /**
     * いいね！ボタン関連の情報を取得
     * 
     * @param int $tl_id タイムラインID
     * @param int $lias_id 指定ユーザーのID
     * @return array [likes]=>いいね！の押された数 [liked]=>自分が押したかどうか
    **/
    protected function getLikeData ($tl_id, $lias_id) {
        
        $likes_sql = "SELECT COUNT(*) FROM `like` WHERE tl_id = $tl_id";
        $result = $this->DB->query($likes_sql);
        $likes = $result->fetchColumn();
        
        $boolean = array(false, true);
        $liked_sql = "SELECT COUNT(*) FROM `like` WHERE tl_id = $tl_id AND lias_id = $lias_id";
        $result = $this->DB->query($liked_sql);
        $liked = $boolean[$result->fetchColumn()];
        
        
        return array(
            'likes' => $likes,
            'liked' => $liked
        );
        
    }
    
}
