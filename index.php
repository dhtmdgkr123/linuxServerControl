<?php
session_start();
if ($_SESSION["status"] === 1) {
    header("Location:view/input.php");
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

        <link rel="stylesheet" href="base/base_reset.css">
		<link rel="stylesheet" href="index_css/style.css" >
        <link rel="stylesheet" href="base/base_confirm.css">

    </head>
    <body>
        <div class="login-wrap">
            <div class="login-form">
                <img src="index_css/user.png">
            </div>
            <div class="login-input">
                <div class="border-title">
                    <a>SERVER</a>
                <div class="border-type-spear">
                </div>
                <!--Server address  -->
                <input placeholder="Server Addresses" type="text" id="server_add" name="server_add" autoncomplete="off">
                <!--Port  -->
                <input placeholder="Port" type="text" id="server_port" name="server_port" autoncomplete="off">
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

    <script src="base/jquery.js"></script>
	<script src="index_css/login.js"></script>
    <script src="base/base_confirm.js"></script>

    </body>
</html>
