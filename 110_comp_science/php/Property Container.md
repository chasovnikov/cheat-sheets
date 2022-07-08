### Контейнер свойств

Используется для динамического расширения свойств уже созданного объекта.

```php

interface PropertyContainerInterface
{
    public function setProperty($propertyName, $value);
    public function updateProperty($propertyName, $value);
    public function getProperty($propertyName, $value);
    public function deleteProperty($propertyName, $value);
}

// ------------------------

class PropertyContainer implements PropertyContainerInterface
{
    private $propertyContainer = [];

    public function setProperty($propertyName, $value)
    {
        $this->propertyContainer[$propertyName] = $value;
    }

    public function updateProperty($propertyName, $value)
    {
        if (!isset($this->propertyContainer[$propertyName])) 
        {
            throw new Exception("property {$propertyName} not found");
        }
        $this->propertyContainer[$propertyName] = $value;
    }
    
    public function getProperty($propertyName, $value)
    {
        return $this->propertyContainer[$propertyName];
    }

    public function deleteProperty($propertyName, $value)
    {
        unset($this->propertyContainer[$propertyName]);
    }

}

// ----------------------
// Объект, нуждающийся в расширении свойств
class BlogPost extends PropertyContainer
{
    private $title;

    public function setTitle($title)
    {
        $this->title = $title;
    }
}

// ----------------------

$post = new BlogPost();

// присваиваем свойсво изначально объявленое в классе
$post->setTitle('Hello');

// присваиваем динамическое свойство объекту
$post->setProperty('view_count', 100);
$post->updateProperty('view_count', 200);
$post->getProperty('view_count');
$post->deleteProperty('view_count');
```