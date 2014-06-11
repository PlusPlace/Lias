<?php

class userInfoModel extends Model {
    function getUserInfo () {
        $returnVal = array();
        $returnVal['IP'] = getenv('REMOTE_ADDR');
        $returnVal['HOST'] = gethostbyaddr($returnVal['IP']);
        $returnVal['IS_LOGIN'] = false;
            if(false) {
                /*
                $cmm = new channelManageModel($addr);
                $channelinfo = $cmm->getChannelNameAndTitleFromSession($session);
                if($channelinfo){
                    $returnVal['IS_LOGIN'] = true;
                    $returnVal['CHANNEL_NAME'] = $channelinfo['Name'];
                    $returnVal['CHANNEL_TITLE'] = $channelinfo['Title'];
                    $returnVal['IS_PREMIUM'] = (bool)$channelinfo['Premium'];
                }
                */
            }
        return $returnVal;
    }
}