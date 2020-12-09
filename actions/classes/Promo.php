<?php

class Promo
{
	public static $codes = [
		// 5%
		'gowDill5' => 5,
		'S14ine10' => 5,
		'su47me39' => 5,
		
		// 10%
		'Dgf95D44' => 10,
		'g15dFf88' => 10,
		'45D8dG6e' => 10,
		
		// 15%
		'Ddbyos5f' => 15,
		'EognHyfs' => 15,
		'EbfpDmgj' => 15,
		
		// 20%
		'EFufGHDn' => 20,
		'DHTTGHDf' => 20,
		'Prudfyun' => 20,
		
		// 40%
		'DiftDHYd' => 40,
	];
	
	
	public static function getDiscount($code)
	{
		if(array_key_exists($code, self::$codes)){
			return self::$codes[$code];
		}
		return 0;
	}
}