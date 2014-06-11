<?php
include dirname(__FILE__).'/../../main_header.php';

$act = new Controller($CONF);
$act->dispatch('loginFacebook');
debug_print_backtrace();