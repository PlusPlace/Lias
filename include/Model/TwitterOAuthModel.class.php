<?php

/**
 * TwitterのOAuth認証モデル
 * 
 * TwitterのOAuth認証を扱うモデル。
 * ライブラリとしてOAuthとtwitteroauthを使用。
 * 
 * @package lias
 * @author Yusei Yamanaka <yusei1128@gmail.com>
 * @version 1.0
 */
class TwitterOAuthModel extends Model {
	var $consumer_key;
	var $consumer_secret;
	
	/**
	* コンストラクタ
	*
	* @param string $consumer_key Twitterアプリケーションのconsumer_key
	* @param string $consumer_secret Twitterアプリケーションのconsumer_secret
	*/
	function __construct($consumer_key, $consumer_secret) {
		$this->loadLibrary('twitteroauth', 'OAuth');
		$this->loadLibrary('twitteroauth', 'twitteroauth');
		
		$this->consumer_key = $consumer_key;
		$this->consumer_secret = $consumer_secret;
	}
	
	/**
	* OAuthトークンと認証用URLを取得する
	*
	* @param string $callback OAuth認証を許可した際に戻ってくるURL
	* @return array [0]=>OAuthトークン,[1]=>OAuthトークンシークレット,[2]=>認証用URL
	*/
	function getOAuthTokenAndAuthorizeUrl($callback = '') {
		$twitteroauth = new TwitterOAuth($this->consumer_key, $this->consumer_secret);
		$request_token = $twitteroauth->getRequestToken($callback);
		 
		return array(
				$request_token['oauth_token'], 
				$request_token['oauth_token_secret'], 
				$twitteroauth->getAuthorizeURL($request_token['oauth_token'])
			);
	}
	
	/**
	* OAuthトークンとoauth_verifierよりアクセストークンを取得する
	*
	* @param string $oauth_token getOAuthTokenAndAuthorizeUrlで取得したoauth_token
	* @param string $oauth_token_secret getOAuthTokenAndAuthorizeUrlで取得したoauth_token_secret
	* @param string $oauth_verifier コールバック時にURL引数に付いているoauth_verifier
	* @return array [oauth_token],[oauth_token_secret],[user_id],[screen_name]
	*/
	function getAccessToken($oauth_token, $oauth_token_secret, $oauth_verifier) {
		$twitteroauth = new TwitterOAuth($this->consumer_key, $this->consumer_secret, $oauth_token, $oauth_token_secret);
		return $twitteroauth->getAccessToken($oauth_verifier);
	}
}