### Канал событий

```php
interface EventChannelInterface 
{
    public function publish($topic, $data);
    public function subscribe($topic, SubscriberInterface $subscriber);
}

// ------------------

class EventChannel implements EventChannelInterface
{
    private $topic = [];

    public function subscribe($topic, SubscriberInterface $subscriber)
    {
        $this->topic[$topic][] = $subscriber;

        $msg = "{$subscriber->getName()} подписан(-а) на [{$topic}]";
        \Debugbar::debug($msg);
    }

    public function publish($topic, $data)
    {
        if (empty($this->topic[$topic])) {
            return;
        }
        foreach ($this->topic[$topic] as $subscriber) {
            /** @var SubscriberInterface $subscriber */
            subscriber->notify($data);
        }
    }
}

// ========================

// Издатель
interface PublisherInterface
{
    public function publish($data);
}

// ----------------------

class Publisher implements PublisherInterface 
{
    private $topic;
    private $eventChannel;

    public function __construct($topic, EventChannelInterface $eventChannel)
    {
        $this->topic = $topic;
        $this->eventChannel = $eventChannel;
    }

    public function publish($data) 
    {
        $this->eventChannel->publish($this->topic, $data);
    }
}

// ========================

// Подписчики
interface SubscriberInterface
{
    public function notify($data);
    public function getName();
}
// ----------------------


class Subscriber implements SubscriberInterface 
{
    private $name;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function notify($data) 
    {
        $msg = "{$subscriber->getName()} оповещён(-а) на [{$topic}]";
        \Debugbar::debug($msg);
    }

    public function getName()
    {
        return $this->name;
    }
}

// =======================
$topic1 = 'topic-news';
$news = new EventChannel();
$publ = new Publisher($topic1, $news);

$san = new Subscriber('San');
$jon = new Subscriber('Jon');

$news->subscribe($topic1, $san);
$news->subscribe($topic1, $jon);

$publ->publish('New post');

```