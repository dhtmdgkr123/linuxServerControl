<?php
include_once('./base/base.php');
session_start();
if ($_SESSION["status"] === 1) {
    header("Location:".$base_url."/view/input.php");
    exit;
}
?>
<!DOCTYPE html>
<!--
/**
 * @name: index.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
-->
<html lang="ko">
    <head>
        <title>Auth</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="<?=$base_url?>/base/base_reset.css?<?=md5(microtime())?>">
		<link rel="stylesheet" href="<?=$base_url?>/index_css/style.css?<?=md5(microtime())?>" >
        <link rel="stylesheet" href="<?=$base_url?>/base/base_confirm.css?<?=md5(microtime())?>">

    </head>
    <body>
        <div class="login-wrap">
            <div class="login-form">
                <img src="/index_css/user.png">
            </div>
            <div class="login-input">
                <div class="border-title">
                    <a>SERVER</a>
                <div class="border-type-spear">
                </div>
                <!--Server address  -->
                <input placeholder="Server Addresses" type="text" name="server_add" autoncomplete="off">
                <!--Port  -->
                <input placeholder="Port" type="text" name="server_port" autoncomplete="off">
                <div class="border-title">
                    <a>CONNECT</a>
                <div class="border-type-spear">
                </div>
                </div>
                <!--I D -->
                <input placeholder="I D" type="text" name="member_id" id="member_id" autoncomplete="off">
                <!--Pw  -->
                <input placeholder="Password" type="password" name="member_pw" id="password" autoncomplete="off">
            </div>
        </div>
    <!--Button  -->
	<button id ="login" class="submit-done" type="submit">LOGIN</button>
	<button id ="reset" class="submit-done" type="reset" >RESET</button>

    <script src="<?=$base_url?>/base/jquery.js?<?=md5(microtime())?>"></script>
	<script src="<?=$base_url?>/index_css/login.js?<?=md5(microtime())?>"></script>
    <script src="<?=$base_url?>/base/base_confirm.js?<?=md5(microtime())?>"></script>

    </body>
</html>
