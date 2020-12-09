<?php

// Make some validation.
if( !isset($_GET['name']) 
	|| !isset($_GET['ticketType']) 
	|| empty($_GET['ticketType']) 
	|| empty($_GET['phone']) 
	|| empty($_GET['name']) 
	|| empty($_GET['email']) 
){
    exit;
}

require 'classes/Promo.php';
require 'classes/Csv.php';
require 'classes/LiqPay.php';
$liqPay = new LiqPay('i71341873519', 'wxlYNt7MUzr3Uaf1Qsic1ZEm28aNhHnCwH3cINqy');


// Select price.
$prices = [
    'standard' => 1490,
    'one-plus-one' => 2390,
    'premium' => 1750
];

$price = array_key_exists($_GET['ticketType'], $prices) ? $prices[$_GET['ticketType']] : $prices['standard'];

$description = 'Имя: '.$_GET['name'].', телефон: '.$_GET['phone'].', тип билета: '.$_GET['ticketType'];

$discount = 0;
if( isset($_GET['promoCode']) && !empty($_GET['promoCode']) ){
	$discount = Promo::getDiscount($_GET['promoCode']);
	if($discount > 0){
		$price -= ($price * $discount / 100);
		$description .= ', промо код '.$_GET['promoCode']." ($discount%)";
	}
}


$csv = new Csv('orders');
$csv->addData([
	$_GET['name'],
	$_GET['email'],
	$_GET['phone'],
	$_GET['ticketType'],
	$_GET['paymentType'],
	isset($_GET['promoCode']) && !empty($_GET['promoCode']) ? $_GET['promoCode'] : '(No promo code)',
	$discount.'%',
	$price,
]);


// Prepare data for the LiqPay button.
$data = [
    'version' => 3,
    'action' => 'pay',
    'amount' => $price,
    'currency' => LiqPay::CURRENCY_UAH,
    'description' => $description,
	//'sandbox' => 1,
	'server_url' => 'http://hr.jo.in.ua/actions/complete-payment.php?email='.$_GET['email']
];


// Send payment button back to the client.
echo '<div>Знижка: '.$discount.'%</div>'.$liqPay->cnb_form($data);