<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>React Sample</title>
</head>
<body>
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="example"></div>
<script src="{{asset('/js/app.js')}}"></script>
</body>
</html>