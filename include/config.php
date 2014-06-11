<?php

/* ==================== Common Setting ==================== */
$CONF['DEBUG_MODE'] = true;
$CONF['SESSION_NAME'] = 'lias_session';
$CONF['LOGIN_SUCCESS_PAGE'] = '/deck/';
$CONF['LOGIN_FAIL_PAGE'] = '/deck/';


/* ==================== OAuth Setting ==================== */
if($CONF['DEBUG_MODE']) {
	//髢狗匱逕ｨ
	$CONF['OAUTH_TWITTER_CONSUMER_KEY'] = 'oJFfnMYS3dA9UTNrgdbsEA';
	$CONF['OAUTH_TWITTER_CONSUMER_SECRET'] = 'b2oMyoUnra4U8CsQBA66NwiNIiwBv6yhl5owfsMc';
}else{
	//譛ｬ逡ｪ逕ｨ
	$CONF['OAUTH_TWITTER_CONSUMER_KEY'] = 'jnpiQAww0oOGFf1fPNcGBw';
	$CONF['OAUTH_TWITTER_CONSUMER_SECRET'] = 'VQlHstvVtodOHKcw7QrmkVMVJqzlTSw9YAg8fwXdKo';
}

if($CONF['DEBUG_MODE']) {
	//髢狗匱逕ｨ
	$CONF['OAUTH_FACEBOOK_APP_ID'] = '276502569098040';
	$CONF['OAUTH_FACEBOOK_APP_SECRET'] = '97202b2a6ab7e0128860338971e5583a';
}else{
	//譛ｬ逡ｪ逕ｨ
	$CONF['OAUTH_FACEBOOK_APP_ID'] = '159391987506664';
	$CONF['OAUTH_FACEBOOK_APP_SECRET'] = '4fd4670f4b0105a366bee6406725010a';
}


/* ==================== Maintenance Setting ==================== */
$CONF['MAINTENANCE_MODE'] = false;
$CONF['MAINTENANCE_DESCRIPTION'] = '繝｡繝ｳ繝�リ繝ｳ繧ｹ縺�ｈ縺｣';
$CONF['MAINTENANCE_THROUGH_IP'] = array('223.133.88.126', '192.168.1.1');


/* ==================== Database Setting ==================== */
// Common
// http://devtest-lias.plus-place.org/phpmyadmin/
//$CONF['MYSQL_ADDR'] = 'mysql://lias:8w3olATA@localhost/lias';
//$CONF['MYSQL_UESR'] = 'lias';
//$CONF['MYSQL_PASS'] = '8w3olATA';
$CONF['MYSQL_DSN'] = 'mysql:host=localhost;dbname=dev-lias';
$CONF['MYSQL_USER'] = 'lias';
$CONF['MYSQL_PASS'] = '8w3olATA';