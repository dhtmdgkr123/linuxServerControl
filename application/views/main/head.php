<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php for ($i=0, $key = array_keys($css), $len = count($css); $i < $len; $i++):?>
        <link rel="stylesheet" href="<?=$css[$key[$i]]?>">
    <?php endfor;?>
    
    <title>Auth</title>

</head>