<?php
/**
 * Session API の Model
 * 
 * APIの仕様にそって各項目の値を取得する関数を定義
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Get_global_session 
 *
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class sessionModel extends DataBaseModel {
    
    /**
     * 全体の配列を形成する
     * 
     * @param int $my_id 自分のID
     * @param int $lias_id 指定ID int $group_id グループのID
     * @return array $session
    **/
    public function getMakeArray ($my_id, $lias_id, $group_id) {
        
        if (!empty($group_id)) {
            return $this->checkGroup($my_id, $group_id);
        } else {
            return $this->checkUser($my_id, $lias_id);
        }
        
    }
    
    /**
     * 指定IDが自分かどうかを確かめる
     * 
     * @param int $my_id 自分のID
     * @param int $lias_id 指定ID
     * @return array $session
    **/
    private function checkUser ($my_id, $lias_id = null) {
        
        if (!empty($lias_id)) {
            if (!is_numeric($lias_id))
                $this->ErrorHeader();
        }
        
        $session = array();
        if ($my_id === $lias_id || empty($lias_id)) {
            $lias_id = $my_id;
            $session['primaryToolName'] = 'home';
            $session['usingTools'] = array(
                'home' => 'tlp0',
                'info' => 'tlp7',
                'timeline' => 'tlp1',
                'group' => 'tlp2',
                'calender' => 'tlp4',
                'direct-message' => 'tlp5'
            );
        } else {
            $session['usingTools']['info'] = 'tlp7';
            $session['primaryToolName'] = 'info';
        }
        
        $sql = "SELECT id, user_name FROM user WHERE id = $lias_id";
        $result = $this->DB->query($sql);
        $val = $result->fetchAll(PDO::FETCH_ASSOC);
        $this->resultCheck($val);
        $session['pageIcon'] = '';
        $session['pageName'] = $val[0]['user_name'];
        $session['id'] = 'p'.$val[0]['id'];
        
        return $session;
        
    }
    
    /**
     * 指定グループに自分が所属しているか
     * 
     * @param int $my_id 自分のID
     * @param int $group_id グループID
     * @return array $session
    **/
    private function checkGroup ($my_id, $group_id) {
        
        $this->ParamCheck($group_id);
        $session = array();
        
        // 指定したグループに自分が所属しているか否かとグループ名を取得
        $sql = "SELECT id, group_name,
        (SELECT group_id FROM relation_user_group WHERE lias_id = $my_id AND group_id = $group_id) as belong
        FROM `group` WHERE id = $group_id";
        
        $result = $this->DB->query($sql);
        $val = $result->fetchAll(PDO::FETCH_ASSOC);
        $this->resultCheck($val);
        $session['pageIcon'] = '';
        $session['pageName'] = $val[0]['group_name'];
        $session['id'] = 'g'.$val[0]['id'];
        
        if (!empty($val[0]['belong'])) {
            
            $session['primaryToolName'] = 'home';
            $session['usingTools'] = array(
                'home' => 'tlg0',
                'info' => 'tlg11',
                'timeline' => 'tlg1',
                'member' => 'tlg9',
                'connection' => 'tlg7',
                'event' => 'tlg3',
                'calender' => 'tlg4',
                'room' => 'tlg8',
                'direct-message' => 'tlg5',
                'settion' => 'tlg6'
            );
            
        } else {
            $session['usingTools'] = array(
                'info' => 'tlg11',
                'timeline' => 'tlg1'
            );
            $session['primaryToolName'] = 'info';
        }
        
        return $session;
        
    }
    
    
}
