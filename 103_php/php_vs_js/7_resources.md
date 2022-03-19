## Resource
это специальная переменная, содержащая ссылку на внешний ресурс

$fp = fopen("foo", "w");

// показ. тип ресурса
echo get_resource_type($fp);     // stream

// показ. идентификатор ресурса
echo get_resource_id($fp);       // 698