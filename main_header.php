<?php
ini_set('display_errors', 1);
ini_set('session.gc_maxlifetime', 60*60*24*7);//有効期限
ini_set('session.use_only_cookies', 'On');//Cookieのみでの受け渡し
date_default_timezone_set('Asia/Tokyo');

include_once(dirname(__FILE__) . '/./include/config.php');
include_once(dirname(__FILE__) . '/./include/miyukkiFW.class.php');
