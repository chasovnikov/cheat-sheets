Observer.
	Определяет отношение "один ко многим" между объектами таким образом, что при изменении состояния определенного объекта
	происходжит автоматическое оповещение всех зависимых. (Есть в SPL-библиотеке)
Рализация:
	1. В Субъекте - список оповещаемых, методы добавления и удаления из списка, метод для прохода по списку
	2. Наблюдатель - метод "update" для обновления информации

Участники: 
	1. Субъект(интерфейс)
	2. Наблюдатель(интерфейс)
	3. Конкретный субъект
	4. Конкретный наблюдатель - хранит ссылку на объект класса Конкрет Суб

<?php 

class Login implements SplSubject
{
	/**
	 * @var object
	 */
	private $storage;
	// ...
	public function __construct()
	{
		$this->storage = new SplObjectStorage();
	}
	
	//add observer
	public function attach ( SplObserver $observer )
	{
		$this->storage->attach( $observer );
	}

	//remove observer
	public function detach ( SplObserver $observer )
	{
		$this->storage->detach( $observer ) ;
	}

	//notify observers
	public function notify ()
	{
		foreach ( $this->storage as $obs ) {
			$obs ->update( $this );
		}
	}
// ...
}

abstract class LoginObserver implements SplObserver
{
	private $login;

	public function __construct ( Login $login )
	{
		$this->login = $login;
		$login->attach ( $this );
	}
	public function update( SplSubject $subject )
	{
		if ( $subject === $this->login ) {
			$this->doUpdate( $subject );
		}
	}

	abstract public function doUpdate( Login $login );
}

class ConcreteObserver extends LoginObserver
{
    function doUpdate(Login $login)
    {
        //...
    }
}

$observable = new Login();
new ConcreteObserver($login);