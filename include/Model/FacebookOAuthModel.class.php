<?php

/**
 * FacebookのOAuth認証モデル
 * 
 * FacebookのOAuth認証を扱うモデル。
 * 
 * @package lias
 * @author Yusei Yamanaka <yusei1128@gmail.com>
 * @version 1.0
 */
class FacebookOAuthModel extends Model {
    
    var $application_id;
    var $application_secret;
	
    /**
    * コンストラクタ
    *
    * @param string $application_id Facebookアプリケーションのapplication_id
    * @param string $application_secret Facebookアプリケーションのapplication_secret
    */
    function __construct($application_id, $application_secret) {
        $this->application_id = $application_id;
        $this->application_secret = $application_secret;
    }
	
    /**
    * 認証用URLを取得する
    *
    * @param string $callback OAuth認証を許可した際に戻ってくるURL
    * @return string 認証用URL
    */
    function getAuthorizeUrl($callback = '') {
        $url = 'https://www.facebook.com/dialog/oauth/'
            .'?client_id=' . $this->application_id
            .'&redirect_uri=' . urlencode($callback)
            .'&scope=user_status';
		 
        return $url;
    }
	
    /**
    * 認証用コードとコールバックよりアクセストークンを取得する
    *
    * @param string $code コールバック時にURL引数に付いているcode
    * @param string $callback getAuthorizeUrlで指定したcallback
    * @return string アクセストークン
    */
    function getAccessToken($code, $callback = '') {
        $url = 'https://graph.facebook.com/oauth/access_token'
            .'?client_id=' . $this->application_id
            .'&client_secret=' . $this->application_secret
            .'&redirect_uri=' . $callback
            .'&code=' . urlencode($code);
        $data = @file_get_contents($url);
        parse_str($data, $data);
        return $data['access_token'];
    }
	
    /**
     * アクセストークンよりユーザーの情報を取得する
     *
     * @param string $access_token getAccessTokenで取得したaccess_token
     * @return mixed ユーザーの情報
     */
    function getProfile($access_token) {
        $url = 'https://graph.facebook.com/me'
            .'?access_token=' . $access_token;
        $jsondata = @file_get_contents($url);
        return json_decode($jsondata);
    }
    
}