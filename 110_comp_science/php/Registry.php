<?php 

class Registry {
	private static $instance;
	private $request;

	private function _construct ()
	{}

	public static function instance()
	{
		if ( !isset(self::$instance) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function getRequest()
	{
		if ( is_null($this->request) ) {
			$this->request=new Request ();
		}
	}

	public function setRequest(Request $request)
	{
		$this->request = $request ;
	}
}
// Пустой класс для тестирования
class Request {}
// После этого в одной из частей системы вы можете добавить объект типа Request
$reg = Registry:: instance();
$reg->setRequest(new Request());
//и получить к нему доступ из другой части системы.
$reg = Registry::instance ( ) ;
print_r( $reg->getRequest() ); 