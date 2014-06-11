<?php

/**
 * Facebookログイン用アクション
 *
 * FacebookのOAuth認証ダイアログに移動させ、
 * コールバックから戻ってきたらFacebook内のIDを取得し、認証用のセッションを生成する。
 * 
 * @package lias
 * @author Yusei Yamanaka <yusei1128@gmail.com>
 * @version 1.0
 */
class loginFacebookAction extends Action {
    
    function execute () {
        
        $fom = new FacebookOAuthModel(
            $this->getConfig('OAUTH_FACEBOOK_APP_ID'),
            $this->getConfig('OAUTH_FACEBOOK_APP_SECRET')
        );
        
        if (!$this->getCookie('isWaitCallback')) {
            
            $this->setCookie('isWaitCallback', true);
            $this->redirect($fom->getAuthorizeUrl($this->getServerInfo('BASE_URL').$this->getServerInfo('SCRIPT_NAME'))); 
            
        } else {
            
            $this->deleteCookie('isWaitCallback');
            $token = $fom->getAccessToken(
                $this->getGetParameter('code'),
                $this->getServerInfo('BASE_URL')
               .$this->getServerInfo('SCRIPT_NAME')
            );
            
            $profile = $fom->getProfile($token);
			
            $smm = new sessionMakerModel(
                $this->getConfig('MYSQL_DSN'),
                $this->getConfig('MYSQL_USER'),
                $this->getConfig('MYSQL_PASS')
            );
                        
            $lias_id = $smm->getLiasId($profile->id);
            $hash = $smm->makeUserSession($lias_id, 'Facebook', $profile->id);
            $this->setSession($this->getConfig('SESSION_NAME'), $lias_id);
            $this->setSession('hash', $hash);
            $this->redirect($this->getServerInfo('BASE_URL').$this->getConfig('LOGIN_SUCCESS_PAGE'));
        }
    }
        
}