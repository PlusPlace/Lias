<?php

class serverInfoModel extends Model {
	function getServerInfo() {
		$returnVal = array();
		$returnVal['HTTP_HOST'] = $_SERVER["HTTP_HOST"];
		$returnVal['BASE_URL'] = 'http://'.$_SERVER["HTTP_HOST"];
		$returnVal['SCRIPT_NAME'] =  $_SERVER['SCRIPT_NAME'];
		//$returnVal['PATH_INFO'] = split('[/¥.]', getenv ('PATH_INFO'));
		$returnVal['DATETIME'] = date('ymdHis');
		$returnVal['UNIXTIME'] = date('U');
		return $returnVal;
	}
}