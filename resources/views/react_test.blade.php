<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>React Sample</title>
</head>
<body>
<meta name="csrf-token" content="{{ csrf_token() }}">
<style>
    /* 円の基本形 */
    .maru {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        flex-flow: column;
        vertical-align: top;
    }
    /* 円の大きさ */
    .size_normal{
        width: 60px;
        height: 60px;
    }
    /* 文字の大きさ */
    .letter3 {
        font-size: 2em;
        line-height: 1.5em;
    }
    /* 円と文字の色 */
    .pink1 {
        color: cadetblue;
        border: 4px solid cadetblue;
    }
</style>
<div id="example"></div>
<script src="{{asset('/js/app.js')}}"></script>
</body>
</html>