<?php
/**
 * ユーザーの基本情報をJSONで出力するモデル
 * 
 * APIの仕様にそって各項目の値を取得する関数を定義
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Get_personal_profile_data 
 *
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class profileDataModel extends DataBaseModel {
    
    /**
     * 全体の配列を形成する
     * 
     * @param int $my_id 自分のID
     * @param int $lias_id 指定ID
     * @param int $group_id グループのID
     * @return array $session
    **/
    public function getMakeArray ($my_id, $lias_id, $group_id) {
        
        if (!empty($group_id)) {
            $this->ParamCheck($group_id);
            return $this->getGroupBasicInfo($my_id, $group_id);
        } else {
            $this->ParamCheck($lias_id);
            return $this->getUserBasicInfo($my_id, $lias_id);
        }
        
    }

    /**
     * ユーザーの基本情報を取得
     * 
     * @param int $my_id 自分のID
     * @param int $lias_id 指定ユーザーのID
     * @return array $Userprofile
    **/
    private function getUserBasicInfo ($my_id, $lias_id) {
        
        // 他ユーザの場合プロフィール閲覧権限を確認する。
        if ($my_id != $lias_id) {
            $sql = "SELECT *, (SELECT DISTINCT COUNT(group_id) FROM relation_user_group
            WHERE lias_id = $my_id OR lias_id = $lias_id GROUP BY group_id HAVING COUNT(group_id) > 1) as belong
            FROM user WHERE id = $lias_id";
        } else {
            $sql = "SELECT * FROM user WHERE id = $my_id";
        }
        
        // 結果を取得し、空だったらエラー
        $result = $this->DB->query($sql);
        $val = $result->fetchAll(PDO::FETCH_ASSOC);
        $this->resultCheck($val);
        
        // 指定ユーザーが同じグループに属していて、なおかつ閲覧権限が０以上だったら値を２にしてしまう
        foreach ($val[0] as $key => $value) {
            if (preg_match('/^privacy_/', $key)) {
                if (!empty($val[0]['belong']) && $value > 0) $value = 2;
                $$key = $value;
            }
        }
        
        // 項目設定
        $privacy = array('private', 'limited', 'public');
        $my_id == $lias_id ? $permission = true : $permission = false;
        $gender = array('男','女');
        $genderVal = array('male','female');
        $birthday = explode('-', $val[0]['birth_date']);
        
        $UserProfile = array(
            'name'  => $val[0]['user_name'],
            'profileImage' => '',
            'bio' => $val[0]['bio'],
            'groups' => $this->getGroups($lias_id, 'user'),
            'tags' => $this->getTags($lias_id, 'user'),
            'basicInfo' => array(
                'birthday' => array(
                    $birthday[0],
                    $birthday[1],
                    $birthday[2]
                ),
                'gender' => $gender[$val[0]['gender']],
                'genderVal' =>  $genderVal[$val[0]['gender']],
                'belongGroups' => $this->getBelongGroups($lias_id)
            ),
            'contactInfo'=> array(
                'mailes' => $this->getMails($lias_id, 'user'),
                'websites' => $this->getWebsites($lias_id, 'user')
            ),
            'privacy' => array(
                'bio' => $privacy[$privacy_bio],
                'groups' => $privacy[$privacy_groups],
                'tags' => $privacy[$privacy_tags],
                'gender' => $privacy[$privacy_gender],
                'birthday' => $privacy[$privacy_birthday],
                'belongGroups' => $privacy[$privacy_belongGroups],
                'mails' => $privacy[$privacy_mails],
                'websites' => $privacy[$privacy_websites]
            ),
            'valid' => $val[0]['valid'],
            'permission' => $permission
        );
        
        return $this->deletePrivacyVal($UserProfile, $permission);
        
    }

    /**
     * グループの基本情報を取得
     * 
     * @param int $my_id 自分のID
     * @param int $group_id 指定グループのID
     * @return array $groupBasicInfo
    **/
    private function getGroupBasicInfo ($my_id, $group_id) {
        
        $sql = "SELECT *,
        (SELECT permission FROM relation_user_group
        WHERE lias_id = $my_id AND group_id = $group_id) as permission
        FROM `group` WHERE id = $group_id";
        
        $result = $this->DB->query($sql);
        $val = $result->fetchAll(PDO::FETCH_ASSOC);
        $this->resultCheck($val);
        
        $val[0]['permission'] == 1 ? $permission = true : $permission = false;
        
        $groupBasicInfo = array(
            'name' => $val[0]['group_name'],
            'profileImage' => '',
            'summary' => $val[0]['summary'],
            'member' => $this->getMember($group_id),
            'groups' => $this->getGroups($group_id, 'group'),
            'tags' => $this->getTags($group_id, 'group'),
            'basicInfo' => array(
                'founded' => $val[0]['founded']
             ),
            'contactInfo' => array(
                'mails' => $this->getMails($group_id, 'group'),
                'websites' => $this->getWebsites($group_id, 'group')
            ),
            'valid' => $val[0]['valid'],
            'permission' => $permission
        );
                
        return $groupBasicInfo;
        
    }
    
    /**
     * グループに所属するメンバーを取得
     * 
     * @param int $group_id 指定グループのID
     * @return array $member
    **/
    private function getMember ($group_id) {
        
        $member = array();
        
        $sql = "SELECT id, user_name FROM user WHERE id IN
        (SELECT lias_id FROM relation_user_group WHERE group_id = $group_id)";
        
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC)) {
            $member[] = array(
                'name' => $val['user_name'],
                'icon' => '',
                'userId' => $val['id']
            );
        }
        
        return $member;
        
    }

    /**
     * ユーザーまたはグループの登録したメールとURL一覧
     * 
     * @param int $id ユーザーかグループの ID
     * @param string $lias user か groupを指定
     * @return array $contactInfo [0]=>object mails [1]=>object websites
    **/
    private function getWebsites ($id, $lias) {
        
        $websites = array();
        
        $lias == 'user' ? $key = 'lias' : $key = 'group';
        $sql = "SELECT url FROM ".$lias."_website WHERE ".$key."_id = $id";
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC))
            $websites[] = $val['url'];
        
        return $websites;

    }
    
    /**
     * ユーザーまたはグループの登録したメール取得
     * 
     * @param int $id　ユーザーかグループのID
     * @param strin $lias user か groupを指定
     * @return array $contactInfo [0]=>object mails [1]=>object websites
    **/
    private function getMails ($id, $lias) {
                
        $mailes = array();
        
        $lias == 'user' ? $key = 'lias' : $key = 'group';
        $sql = "SELECT mail FROM ".$lias."_mail WHERE ".$key."_id = $id";
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC))
            $mailes[] = $val['mail'];
        
        return $mailes;
        
    }

    /**
     * ユーザーが所属してるグループを取得
     *
     * @param int $lias_id ユーザー ID
     * @return array $groups [0]=>グループ名 [1]=>iconのパス [2]=>グループID
    **/
    private function getBelongGroups ($lias_id) {

        $belong = array();
        
        $sql = "SELECT id,group_name FROM `group` WHERE id IN
        (SELECT group_id FROM relation_user_group WHERE lias_id = $lias_id)";
        
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC)) {
            $belong[] = array(
                'name'  => $val['group_name'],
                'icon'  => '',
                'groupId' => $val['id']
            );
        }
        return $belong;

    }

    /**
     * ユーザーまたはグループが登録してるタグを取得
     *
     * @param int $id　ユーザーかグループのID
     * @param strin $lias user か groupを指定
     * @return array $tags [0]=>タグの名前 [1]=>タグID
    **/
    private function getTags ($id, $lias) {
        
        $tags = array();
        $lias == 'user' ? $key = 'lias' : $key = 'group';
        
        $sql = "SELECT * FROM tag WHERE id IN
        (SELECT tag_id FROM relation_".$lias."_tag WHERE ".$key."_id = $id)";
        
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC)) {
            $tags[] = array(
                'name'  => $val['tag'],
                'tagId' => $val['id']
            );
        }
        return $tags;
        
    }
    
    /**
     * ユーザーまたはグループがフォローしてるグループを取得
     * 
     * @param int $id　ユーザーかグループのID
     * @param strin $lias user か groupを指定
     * @return array $groups [0]=>グループ名 [1]=>iconのパス [2]=>グループID
    **/
    private function getGroups ($id, $lias) {

        $groups = array();
        
        //取得フィールドと条件フィールドを分ける
        if ($lias == 'user') {
            $key = 'lias';
            $field = 'group_id';
        } else {
            $key = 'group';
            $field = 'follow_group_id';
        }
        
        $sql = "SELECT id, group_name FROM `group` WHERE id IN
        (SELECT $field FROM relation_".$lias."_follow WHERE ".$key."_id = $id)";
        
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC)) {
            $groups[] = array(
                'name'    => $val['group_name'],
                'icon'    => '',
                'groupId' => $val['id']
            );
        }
        return $groups;
    }
    
    /**
     * プライバシー設定に基づき項目を削除する
     * 
     * @param array $profile 最終形成された配列
     * @param boolean $permission 自分の権限
     * @return array $profile
    **/
    private function deletePrivacyVal ($profile, $permission) {
        foreach ($profile['privacy'] as $key => $val) {
            
            if ($permission) break;
            if ($val != 'public') {
                
                if ($key == 'birthday' || $key == 'belongGroups') {
                    $profile['basicInfo'][$key] = array();
                } elseif ($key == 'gender') {
                    $profile['basicInfo']['gender'] = '';
                    $profile['basicInfo']['genderVal'] = '';
                } elseif ($key == 'mails' || $key =='websites') {
                    $profile['contactInfo'][$key] = array();
                } else {
                    $profile[$key] = '';
                }
                
            }
            
        }
        
        return $profile;
    }
    
   
}
    
