<?php
/**
 * ユーザーの基本情報をJSONで出力するAction
 * 
 * APIの仕様にそって各項目を出力
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Get_personal_profile_data 
 *
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class profileDataAction extends Action {
    
    public function execute () {
        
        $db = new profileDataModel(
            $this->getConfig('MYSQL_DSN'),
            $this->getConfig('MYSQL_USER'),
            $this->getConfig('MYSQL_PASS')
        );
        
        // パラメーター取得 無指定の場合はエラー
        $lias_id = $this->getGetParameter('liasId');
        $group_id = $this->getGetParameter('groupId');
        
        
        // 自分のIDを取得 なれけばログアウト中とみなす
        $my_id = $this->getSession($this->getConfig('SESSION_NAME'));
        $db->sessionCheck($my_id);

        $profile = $db->getMakeArray($my_id, $lias_id, $group_id);
        
        $db->SuccessHeader();
        $db->JsonHeader();
        $output = new JSONPrintModel;
        $output->printNormal($profile);
        
    }

}