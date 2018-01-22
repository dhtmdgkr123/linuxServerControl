<?php
/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
session_start();
header("Content-type: application/json; charset=UTF-8");
$server_add = $_POST['server_add'];
$server_port = $_POST['server_port'];
$user_id = $_POST['member_id'];
$user_pw = $_POST['member_pw'];
$connection = ssh2_connect($server_add,$server_port);
$_SESSION['server_add'] = $_POST['server_add'];
$_SESSION['server_port'] = $_POST['server_port'];
$_SESSION['member_id'] = $_POST['member_id'];
$_SESSION['member_pw'] = $_POST['member_pw'];
$result = -1;
if (!$connection)
{
    $result = 1;
    $result = is_numeric($result) ? ((int)$result) : $result;
}
else if (!@ssh2_auth_password($connection, $user_id, $user_pw))
{
    $result = 2;
    $result = is_numeric($result) ? ((int)$result) : $result;
}
if ($result === -1)
{
    $result = 0;
    $result = is_numeric($result) ? ((int)$result) : $result;
	$_SESSION["login"] = $result;
}
$response = array();
$response['rlt_code'] = $result;
echo json_encode($response);
?>