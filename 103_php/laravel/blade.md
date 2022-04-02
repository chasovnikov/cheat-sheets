
```php
{{ }}

{!! !!}

@if(true)
{{ }}
@endif

@foreach($ar as $v)
{{ $v }}
@endforeach

@yield('content')
@section('content')
@endsection


@yield('title')
@section('title', 'Главная страница')

@extends('layout.app')

```
