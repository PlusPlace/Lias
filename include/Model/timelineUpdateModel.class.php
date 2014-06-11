<?php
/**
 * 最新のタイムライン分を取得するModel
 * 
 * APIの仕様にそって各項目を出力
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Get_personal_timeline
 *
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class timelineUpdateModel extends timelineModel {
    
   /**
     * 全体の配列を形成する
     * 
     * @param int $my_id 自分のID
     * @param int $group_id グループのID
     * @param int $max_id 最新記事のID
     * @return array $timeline
    **/
    public function getMakeArray($my_id, $group_id, $max_id) {
        
        $this->ParamCheck($max_id);
        
        // 取得TLがグループかユーザーか分ける
        if (!empty($group_id)) {
            $this->ParamCheck($group_id);
            $sql = $this->getRequestSQL($my_id, $group_id, $max_id);
        } else {
            $group_id = 0;
            $sql = $this->getRequestSQL($my_id, $group_id, $max_id);
        }
        
        $timeline = $this->getTimeline($my_id, $group_id, $sql);
        $this->checkTimelineUpdate($timeline);
        return $timeline;
        
    }
    
    /**
     * 指定対象のタイムラインSQLを取得する
     * 
     * @param int $my_id 自分のID
     * @param int $group_id グループのID
     * @param int $max_id 現在の一番新しい記事のID
     * @return string $sql
    **/
    private function getRequestSQL ($my_id, $group_id, $max_id) {
        
        if(!empty($group_id)) {
        
            $belong = $this->getGroupIn($my_id, $group_id, 'group_id');
            if ($belong) {

                 // 自分が所属しているグループの現在のマックスID以降を取得する
                return "SELECT t.*, g.group_name FROM timeline as t, `group` as g
                WHERE g.id = t.group_id AND t.id > $max_id AND (group_id = $group_id
                OR group_id IN (SELECT follow_group_id FROM relation_group_follow
                WHERE group_id = $group_id)) ORDER BY t.id DESC";
            
            } else {
             
                // 無所属のグループの現在のマックスID以降を取得する
                return "SELECT t.*, g.group_name FROM timeline as t, `group` as g
                WHERE g.id = t.group_id AND t.id > $max_id
                AND t.group_id = $group_id ORDER BY t.id DESC";
                
            }
            
        } else {
               
                // 自分のタイムラインのマックスID以降を取得する
                return "SELECT t.*, g.group_name FROM timeline as t, `group` as g
                WHERE g.id = t.group_id AND t.id > $max_id AND t.group_id IN
                (SELECT group_id FROM relation_user_follow WHERE lias_id = $my_id
                UNION SELECT group_id FROM relation_user_group WHERE lias_id = $my_id)
                ORDER BY t.id DESC";
                
            }
    
    }
    
   /**
     * アップデートがあるかチェックする
     * 
     * @param int $tl タイムラインのID
    **/
    private function checkTimelineUpdate ($tl) {
        if (empty($tl)) {
            $this->SuccessHeader();
            $this->JsonHeader();
            die('{"Success":"No new timeline."}');
        }
    }
    
    
}