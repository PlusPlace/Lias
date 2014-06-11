<?php

/**
 * JSONの出力モデル
 * 
 * @package lias
 * @author Yusei Yamanaka <yusei1128@gmail.com>
 * @version 1.0
 */
class JSONPrintModel extends Model {
	function printNormal($data, $as_jsonp = false) {
		//$data['result'] = 'ok';
		//$json = json_encode(array($data));
                $json = json_encode($data);
		if($json === false) {
			throw new Exception('Encode Error');
		}
		echo $json;
	}
	
	function printFail($code = 'other', $message = '', $as_jsonp = false) {
		$data['result'] = 'fail';
		$data['code'] = $code;
		$data['message'] = $message;
		$json = json_encode(array($data));
		if($json === false) {
			throw new Exception('Encode Error');
		}
		echo $json;
	}
}