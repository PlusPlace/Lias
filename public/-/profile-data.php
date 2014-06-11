<?php
include_once('./../../main_header.php');

$act = new Controller($CONF);
$act->dispatch('profileData');
