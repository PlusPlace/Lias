<?php

class Controller {
	var $conf;
	
	public function __construct($conf){
		if($conf) $this->conf = $conf;
	}
	
	public function dispatch($actname, $section = null){
		if($section != null){
			require_once(dirname(__FILE__) . '/'.$section.'Action/'.$actname.'Action.class.php');
		}else{
			require_once(dirname(__FILE__) . '/Action/'.$actname.'Action.class.php');
		}
		$target = $actname.'Action';
		$action = new $target($this->conf);
		$action->execute();
	}
}

class Model {
	var $debugMode = false;
	
	public function __construct() {
		
	}
	
	public function loadLibrary($name, $path) {
		return require_once(dirname(__FILE__) . '/Library/' . $name . '/' . $path . '.php');
	}
}

class Action extends Model {
	private $_conf;
	private $_user_info;
	private $_server_info;
	
	public function __construct($conf){
		$this->_conf = $conf;
		
		$uim = new userInfoModel();
		$this->_user_info = $uim->getUserInfo();
		$sim = new serverInfoModel();
		$this->_server_info = $sim->getServerInfo();
		
		if($this->getConfig('MAINTENANCE_MODE') && !in_array($this->getUserInfo('IP'), $this->getConfig('MAINTENANCE_THROUGH_IP'))){
			$this->printMaintenancePage();
		}
	}
	
	public function getConfig($key = null) {
		if(!$key){
			return $this->_conf;
		}else{
			return isset($this->_conf[$key])?$this->_conf[$key]:'';
		}
	}
	
	public function getUserInfo($key = null) {
		if(!$key){
			return $this->_user_info;
		}else{
			return isset($this->_user_info[$key])?$this->_user_info[$key]:'';
		}
	}
	
	public function getServerInfo($key = null) {
		if(!$key){
			return $this->_server_info;
		}else{
			return isset($this->_server_info[$key])?$this->_server_info[$key]:'';
		}
	}
	
	public function getCookie($key) {
		return isset($_COOKIE[$key])?$_COOKIE[$key]:'';
	}
	
	public function setCookie($key, $value, $path = '/', $day = 365) {
		$time = time() + $day * 60 * 60 * 24;
		setcookie($key, $value, $time, $path);
	}
	
	public function deleteCookie($key, $path = '/') {
		$this->setCookie($key, '', $path);
	}
	
        public function setSession ($key, $val) {
            session_start();
            $_SESSION[$key] = $val;
            session_write_close();
        }
        
        public function getSession ($key) {
            session_start();
            session_regenerate_id(true);
            if (empty($_SESSION[$key]))
                return null;
            return $_SESSION[$key];
            session_write_close();
        }
        
        public function deleteSession () {
            session_start();
            $_SESSION = array();
            if (isset($_COOKIE[session_name()]))
                setcookie (session_name(), '', time() - 7200, '/');
            session_destroy();
            session_write_close();
        }
        
	public function getGetParameter($name = null) {
		if(!$name){
			return $_GET;
		}else{
			return isset($_GET[$name])?$_GET[$name]:'';
		}
	}
	
	public function getPostParameter($name = null) {
		if(!$name){
			return $_POST;
		}else{
			return isset($_POST[$name])?$_POST[$name]:'';
		}
	}
	
	public function getFilesParameter($name = null) {
		if(!$name){
			return $_FILES;
		}else{
			return isset($_FILES[$name])?$_FILES[$name]:null;
		}
	}
	
	public function getPathinfo($pathno) {
		$pathinfo = split('[/\.]', getenv ('PATH_INFO'));
		return $pathinfo[$pathno];
	}
	
	public function redirect($url, $permanently = false) {
		if($permanently) {
			header('HTTP/1.1 301 Moved Permanently');
		}else{
			header('HTTP/1.1 302 Found');
		}
		header('Location: '.$url);
		exit();
	}
	
	public function printMaintenancePage() {
		header('HTTP/1.1 503 Service Unavailable');
		$output = new JSONPrintModel();
		$output->printFail('maintenance', $e->getMessage());
		exit();
	}
	
	public function printExceptionPage($e) {
		header('HTTP/1.1 500 Internal Server Error');
		$output = new JSONPrintModel();
		$output->printFail('exception', $e->getMessage());
		exit();
	}
	
	public function getExceptionTrace($e) {
		list($errno, $errstr, $errfile, $errline, $errtrace) = array($e->getCode(), $e->getMessage(), $e->getFile(), $e->getLine(), $e->getTrace());
		
		$lv = 'unknown';
		switch($errno){
			case E_ERROR:
				$lv = "ERROR";
				break;
			case E_WARNING:
				$lv = "WARNING";
				break;
			case E_PARSE:
				$lv = "PARSE";
				break;
			case E_NOTICE:
				$lv = "NOTICE";
				break;
			case E_STRICT:
				$lv = "STRICT";
				break;
			default:
				$lv = $errno;
				break;
		}
		
		$result .= "<font size='1'><table dir='ltr' border='1' cellspacing='0' cellpadding='1'>";
		$result .= "<tr><th align='left' bgcolor='#f57900' colspan='5'><span style='background-color: #cc0000; color: #fce94f; font-size: x-large;'>( ! )</span>";
		$result .= " $lv : $errstr in $errfile <i>$errline</i>";
		$result .= "</th></tr>\n";
		$result .= "<tr><th align='left' bgcolor='#e9b96e' colspan='5'>Call Stack</th></tr>\n";
		$result .= "<tr><th align='center' bgcolor='#eeeeec'>#</th><th align='left' bgcolor='#eeeeec'>Function</th><th align='left' bgcolor='#eeeeec'>Location</th></tr>\n";
		
		for($i = sizeof($errtrace) - 1 ; $i >= 0; $i--){
			$obj = $errtrace[$i];
			$result .= "<tr><td align='center' bgcolor='#eeeeec'>$i</td><td align='left' bgcolor='#eeeeec'>";
			if($obj['class']){
				$result .= $obj['class'] . '=>';
			}
			$result .= $obj['function']. '</td>';
			$file = realpath($obj['file']);
			$result .="<td align='left' bgcolor='#eeeeec'>$file:$obj[line]</td></tr>\n";
		}
		
		$result .= "</table></font>\n";
		
		return $result;
	}
	
	public function getObjectTrace($object) {
		$result .= "<table dir=\"ltr\" border=\"1\" cellspacing=\"0\" cellpadding=\"1\"><tbody>\n";
		$result .= "<tr><th bgcolor=\"#00f579\" colspan=\"2\">\$_SERVER</th></tr>\n";
		foreach ($object as $key => $value) {
			$result .= "<tr>\n";
			$result .= "<th align=\"left\" bgcolor=\"#6ee9b9\">{$key}</th>\n";
			$result .= "<td bgcolor=\"#eeeeec\">{$value}</td>\n";
			$result .= "</tr>\n";
		}
		$result .= "</tbody></table>\n";
		return $result;
	}
}

function _endsWith($haystack, $needle) {
	return strrpos($haystack, $needle) === strlen($haystack) - strlen($needle);
}

spl_autoload_register('autoload');
function autoload($class_name){
	if(_endsWith($class_name, 'Model')) {
		require_once(dirname(__FILE__) . '/Model/' . $class_name . '.class.php');
	}else if(_endsWith($class_name, 'Exception')) {
		require_once(dirname(__FILE__) . '/Exception/' . $class_name . '.class.php');
	}
}