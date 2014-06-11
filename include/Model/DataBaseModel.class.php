<?php
/**
 * データベースの基本設定モデル
 * 
 * データベースの仕様に基づき作成
 * 参照 : https://redmine.plus-place.org/projects/lias/wiki/Lias_Wiki#DataBase
 * 
 * @package lias
 * @author R.SkuLL <info@rskull.com>
 * @version 1.0
 */
class DataBaseModel extends Model {
    
    var $DB;
    
    public function __construct ($mysqlDsn, $user, $pass) {
        try {
            $db = new PDO($mysqlDsn, $user, $pass);
            $db->exec('SET NAMES utf8');
            $this->DB = $db;
        } catch(PDOException $e) {
            $this->JsonHeader();
            header('HTTP/1.1 500 Internal Server Error');
            die('{"Error":"DataBase Error"}');
        }
        
    }
    
    /**
     * SQLを送信して結果を取得
     * 
     * return Object $result SQLの結果
    **/
    protected function query ($sql) {
        $db = $this->DB;
        $result = $db->prepare($sql);
        $result->execute();
        return $result;
    }

    /**
     * SQLの結果が空だったらエラーを返す
     * 422 リクエストエラーを吐く
     * 絶対に取得されないとおかしい部分に適用する
     * 
     * return Object $result SQLの結果
    **/
    public function resultCheck ($result) {
        if (empty($result))
            $this->ErrorHeader();
    }
    
    /**
     * パラメータが空、または数値かチェック
     * 422 リクエストエラーを吐く
     * 
     * @param int $num 何らかの数値型ID
    **/
    public function ParamCheck ($num) {
        if (empty($num) || !is_numeric($num))
            $this->ErrorHeader();
    }
    
    /**
     * セッションが保たれているかチェク
     * 未認証エラーを出す
     * 
     * @param int $id ユーザーID
    **/
    public function sessionCheck ($lias_id) {
        if (empty($lias_id)) {
            $this->JsonHeader();
            header('HTTP/1.1 401 Unauthorized');
            die('{"Error":"Authorization Required"}');
        }
    }
    
    /**
     * 正常に処理が完了したときのヘッダー（一応）
     * 200 Status OK
    **/
    public function SuccessHeader () {
        header('HTTP/1.1 200 OK');
    }
    
    /**
     * パラメーターやリクエストに異常があったときにエラーを返す
     * 422 Unprocessable Entity
    **/
    public function ErrorHeader () {
        $this->JsonHeader();
        header('HTTP/1.1 422 Unprocessable Entity');
        die('{"Error":"Unprocessable Entity"}');
    }
    
    /**
     * JSONを吐き出す時に送信するヘッダー
    **/
    public function JsonHeader () {
        header('Content-Type: text/javascript; charset=utf-8');
    }
        
}