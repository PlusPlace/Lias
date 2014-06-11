<?php

class groupUpdate extends Action {
    
    public function execute () {
        
        $db = new groupUpdateModel(
            $this->getConfig('MYSQL_DSN'),
            $this->getConfig('MYSQL_USER'),
            $this->getConfig('MYSQL_PASS')
        );
        
        // 自分のIDを取得 なれけばログアウト中とみなす
        $my_id = $this->getSession($this->getConfig('SESSION_NAME'));
        $db->sessionCheck($my_id);
        
        // パラメーターから渡されたID
        $group_id = $this->getGetParameter('groupId');
        
        $session = $db->getMakeArray($my_id, $group_id);
        $db->SuccessHeader();
        $db->JsonHeader();
        $output = new JSONPrintModel;
        $output->printNormal($session);
        
        
    }
    
}