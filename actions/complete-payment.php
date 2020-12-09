<?php 


if(!isset($_GET['email']) || empty($_GET['email'])){
	exit;
}

 // Notify about order via email.
$headers =  'MIME-Version: 1.0' . "\r\n";
$headers .= 'From: 7-й HR івент. Менеджмент та люди <info@7hr-forum.ua>' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";


$message = 'Щиро дякуємо за проявлений інтерес до нашого заходу!<br>Даним листом підтверджуємо отримання ваших реєстраційних даних. <br>
Найближчим часом наш менеджер зателефонує Вам. <br><br>В разі виникнення додаткових запитань, <br>Телефонуйте +38 063 6386 871 (Оксана)';


mail($_GET['email'], '7-й HR івент. Менеджмент та люди', $message, $headers);