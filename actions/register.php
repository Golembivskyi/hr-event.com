<?php

// Make some validation.
if( !isset($_GET['name'])
    || !isset($_GET['email'])
    || !isset($_GET['phone'])
    || !isset($_GET['ticketType'])
    || !isset($_GET['paymentType'])
){
    exit("Заполните все необходимые поля.");
}

require 'classes/Csv.php';
require 'classes/Promo.php';


// Select price.
$prices = [
    'standard' => 1490,
    'one-plus-one' => 2390,
    'premium' => 1750
];
$price = array_key_exists($_GET['ticketType'], $prices) ? $prices[$_GET['ticketType']] : $prices['standard'];

$discount = 0;
$promoCode = '(no promo code)';
if( isset($_GET['promoCode']) && !empty($_GET['promoCode']) ){
	$promoCode = $_GET['promoCode'];
	$discount = Promo::getDiscount($_GET['promoCode']);
	if($discount > 0){
		$price -= ($price * $discount / 100);
		$description .= ', промо код '.$_GET['promoCode']." ($discount%)";
	}
}

// Notify about order via email.
$headers =  'MIME-Version: 1.0' . "\r\n";
$headers .= 'From: Your name <info@7hr-forum.ua>' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$csv = new Csv('orders');
$csv->addData([
	$_GET['name'],
	$_GET['email'],
	$_GET['phone'],
	$_GET['ticketType'],
	$_GET['paymentType'],
	isset($_GET['promoCode']) ? $_GET['promoCode'] : '(Без промо кода)',
	$discount.'%',
	$price,
]);

$message = '<b>ПІП:</b> '.$_GET['name'].'<br><br><b>Email:</b> '.$_GET['email'].'<br><br><b>Телефон:</b> '.$_GET['phone'].'<br><br><b>Ціна:</b> '.$price;
$message .= '<br><br><b>Промо код:</b> '.$promoCode.'<br><br><b>Скидка:</b> '.$discount;
if( isset($_GET['comment']) && !empty($_GET['comment']) ) $message .= '<br><br><b>Реквізити:</b> '.$_GET['comment'];
if( isset($_GET['secondPersonName']) && !empty($_GET['secondPersonName'])) $message .= '<br><br><b>Другий учасник:</b> '.$_GET['secondPersonName'];

mail('advice@eventsua.com', 'HR Forum order', $message, $headers);
mail('advice@jo.in.ua', 'HR Forum order', $message, $headers);


