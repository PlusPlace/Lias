<?php
/**
 * Twitterログイン用アクション
 *
 * TwitterのOAuth認証ダイアログに移動させ、
 * コールバックから戻ってきたらTwitter内のIDを取得し、認証用のセッションを生成する。
 * ただし、コールバック時に#_=_というハッシュがつくのでリダイレクトにはHTMLを使用。
 * 
 * @package lias
 * @author Yusei Yamanaka <yusei1128@gmail.com>
 * @version 1.0
 */
class loginTwitterAction extends Action {
    
    function execute () {
        
        $tom = new TwitterOAuthModel(
            $this->getConfig('OAUTH_TWITTER_CONSUMER_KEY'),
            $this->getConfig('OAUTH_TWITTER_CONSUMER_SECRET')
        );
        
        if (!$this->getCookie('isWaitCallback')) {
         
            $token_url = $tom->getOAuthTokenAndAuthorizeUrl($this->getServerInfo('BASE_URL').$this->getServerInfo('SCRIPT_NAME'));
            $this->setCookie('isWaitCallback', true);
            $this->setCookie('OAuthToken', $token_url[0]);
            $this->setCookie('OAuthTokenSecret', $token_url[1]);
            $this->redirect($token_url[2]);
            
            } else {
                
                $this->deleteCookie('isWaitCallback');
		$this->deleteCookie('OAuthToken');
		$this->deleteCookie('OAuthTokenSecret');
                        
                $token = $tom->getAccessToken(
                    $this->getCookie('OAuthToken'),
                    $this->getCookie('OAuthTokenSecret'),
                    $this->getGetParameter('oauth_verifier')
                );
			
		$smm = new sessionMakerModel(
                    $this->getConfig('MYSQL_DSN'),
                    $this->getConfig('MYSQL_USER'),
                    $this->getConfig('MYSQL_PASS')
                );
                        
                $lias_id = $smm->getLiasId($token['user_id']);
                $hash = $smm->makeUserSession($lias_id, 'twitter', $token['user_id']);
                $this->setSession($this->getConfig('SESSION_NAME'), $lias_id);
                $this->setSession('hash', $hash);
		$this->redirect($this->getServerInfo('BASE_URL').$this->getConfig('LOGIN_SUCCESS_PAGE'));
            }
    }
    
}