<?php

interface payStrategy{
	public function pay($amount);
}
class payByCC implements payStrategy{
	private $ccNum='';
	private $ccType='';
	private $vvNum='';
	private $ccExpMonth='';
	private $ccExpYear='';

	public function pay($amount=0){
		echo "Paying".$amount." using Creadit Card";
	}
}
class payByPayPal implements payStrategy{
	private $payPayPalEmail='';

	public function pay($amount=0){
		echo "Paying".$amount." using PayPal";
	}
}
class shoppingCart{
	public $amount=0;
	public function __construct($amount=0){
		$this->amount=$amount;
	}
	public function getAmount(){
		return $this->amount;
	}
	public function setAmount($amount=0){
		$this->amount=$amount;
	}
	public function payAmount(){
		if($this->amount>=500){
			$payment=new payByCC();
		}else{
			$payment = new payByPayPal();
		}
		$payment->pay($this->amount);
	}
}
$cart = new shoppingCart(499);
$cart->payAmount();

$cart = new shoppingCart(501);
$cart->payAmount();

?>