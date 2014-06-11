<?php
include dirname(__FILE__).'/../../main_header.php';

$act = new Controller($CONF);
$act->dispatch('loginTwitter');
debug_print_backtrace();