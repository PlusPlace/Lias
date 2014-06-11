<?php
/**
 * グループのメンバー一覧を取得するAPI
 * 
 * APIの仕様に基づき作成
 * 参照 : 
 * 
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class groupMemberModel extends DataBaseModel {
    
    /**
     * 全体の配列を形成する
     * 
     * @param int $my_id 自分のID
     * @param int $group_id グループのID
     * @return array $member
    **/
    public function getMakeArray ($my_id, $group_id) {
        
        // パラメータが不正だったらエラー
        $this->ParamCheck($group_id);
        return $this->getMember($my_id, $group_id);

    }
    
    /**
     * グループに所属するメンバーを取得
     * 
     * @param int $my_id 自分のID
     * @param int $group_id 指定グループのID
     * @return array $member
    **/
    private function getMember ($my_id, $group_id) {
        
        $member = array();
        $boolean = array(false, true);
        $permission = false;
        
        $sql = "SELECT u.id, u.user_name, r.position, r.permission
        FROM user as u, relation_user_group as r WHERE u.id = r.lias_id
        AND r.group_id = $group_id";
        
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC)) {
            
            $admin = $boolean[$val['permission']];
            if ($my_id == $val['id'] && $admin) $permission = true;
            $member['members'][] = array(
                'userId' => $val['id'],
                'name' => $val['user_name'],
                'icon' => '',
                'position' => $val['position'],
                'mail' => array ($this->getMails($val['id']) ),
                'admin' => $admin
            );
        }
        $member['permission'] = $permission;
        
        return $member;
    }
   
    /**
     * ユーザーの登録したメール取得
     * 
     * @param int $id　ユーザーかグループのID
     * @param strin $lias user か groupを指定
     * @return array $contactInfo [0]=>object mails [1]=>object websites
    **/
    private function getMails ($lias_id) {
        
        $mails = array();
        
        $sql = "SELECT mail FROM user_mail WHERE lias_id = $lias_id";
        $result = $this->DB->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC))
            $mails[] = $val['mail'];
        
        return $mails;
        
    }
    
    
}