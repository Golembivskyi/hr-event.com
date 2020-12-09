<?php

if(!isset($_POST['email'])) exit;

require('classes/Csv.php');

$csv = new Csv('subscribes');
$csv->addData([$_POST['email']]);