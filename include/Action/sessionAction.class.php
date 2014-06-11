<?php
/**
 * Session API の Action
 * 
 * APIの仕様にそって各項目の値を取得する関数を定義
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Get_global_session 
 *
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class sessionAction extends Action {
 
    public function execute () {
        
        $db = new sessionModel(
            $this->getConfig('MYSQL_DSN'),
            $this->getConfig('MYSQL_USER'),
            $this->getConfig('MYSQL_PASS')
        );
        
        // 自分のIDを取得 なれけばログアウト中とみなす
        $my_id = $this->getSession($this->getConfig('SESSION_NAME'));
        $db->sessionCheck($my_id);
        
        // パラメーターから渡されたID
        $lias_id  = $this->getGetParameter('liasId');
        $group_id = $this->getGetParameter('groupId');
        
        $session = $db->getMakeArray($my_id, $lias_id, $group_id);
        $db->SuccessHeader();
        $db->JsonHeader();
        $output = new JSONPrintModel;
        $output->printNormal($session);
    }
    
    
    
}
