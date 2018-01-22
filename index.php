<?php
session_start();
if($_SESSION["login"] === 0)
{
	header("Location:/view/input.php");
	exit;
}
?>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <title>Auth</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/index_css/reset.css" rel="stylesheet">
		<link href="/index_css/style.css" rel="stylesheet">
		<script src="http://code.jquery.com/jquery.min.js"></script>
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
                <!--서버 주소  -->
                <input placeholder="Server Addresses" type="text" name="server_add" autoncomplete="off">
                <!--포트  -->
                <input placeholder="Port" type="text" name="server_port" autoncomplete="off">
                <div class="border-title">
                    <a>CONNECT</a>
                <div class="border-type-spear">
                </div>
                </div>
                <!--아이디  -->
                <input placeholder="I D" type="text" name="member_id" id="member_id" autoncomplete="off">
                <!--비밀번호  -->
                <input placeholder="Password" type="password" name="member_pw" id="password" autoncomplete="off"> 
            </div>
        </div>
    <!--초기화  -->
	<button id ="login" class="submit-done" type="submit">LOGIN</button>
	<button id ="reset" class="submit-done" type="reset" >RESET</button>
	<script src="/index_css/login.js?<?=md5(microtime())?>"></script>
    </body>
</html>
