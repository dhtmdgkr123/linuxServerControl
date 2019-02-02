<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<html lang="ko">

<head>
    <title>Server Control</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <?php for ($i=0, $key = array_keys($css), $len = count($css); $i < $len; $i++):?>
        <link href="<?=$css[$key[$i]]?>" rel="stylesheet">
    <?php endfor;?>



    <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet">

</head>

