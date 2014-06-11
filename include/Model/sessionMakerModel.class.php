<?php
/**
 * Session操作のモデル
 * 
 * @package lias
 * @author R.SkuLL < inof@rskull.com >
 * @version 1.0
 */
class sessionMakerModel extends DataBaseModel {
    
    static public $salt = 'tI7b2eU6oq4i';
    
    public function getLiasId ($id) {
        $this->resultCheck($id);
        $sql = "SELECT id FROM user WHERE twitter_id = $id OR facebook_id = $id"; 
        $result = $this->DB->query($sql);
        $lias_id = $result->fetchColumn();
        $this->resultCheck($lias_id);//ここでLiasに登録されてなかったら登録処理をする。
        return $lias_id;
    }
        
    public function makeUserSession($id, $auth_provider, $auth_identifier) {
        $base = sprintf('%s:%s:%s:%s', self::$salt, $id, $auth_provider, $auth_identifier);
	$hash = sprintf('%s-%s', $id, sha1($base));
	return $hash;
    }
        
}