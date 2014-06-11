<?php
/**
 * 最新のタイムライン分を取得するAction
 * 
 * APIの仕様にそって各項目を出力
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Get_personal_timeline
 *
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class timelineUpdateAction extends Action {
        
    public function execute () {
        
        $db = new timelineUpdateModel(
            $this->getConfig('MYSQL_DSN'),
            $this->getConfig('MYSQL_USER'),
            $this->getConfig('MYSQL_PASS')
        );
        
        // 自分のIDを取得 なれけばログアウト中とみなす
        $my_id = $this->getSession($this->getConfig('SESSION_NAME'));
        $db->sessionCheck($my_id);
        
        // パラメーター取得
        $group_id = $this->getGetParameter('groupId');
        $max_id = $this->getGetParameter('maxId');
        
        $timeline = $db->getMakeArray($my_id, $group_id, $max_id);
        
        $db->SuccessHeader();
        $db->JsonHeader();
        $output = new JSONPrintModel;
        $output->printNormal($timeline);
        
    }
    
}
