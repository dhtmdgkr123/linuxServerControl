<?php
/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
session_start();
header("Content-type: application/json; charset=UTF-8");
$server_add = $_SESSION['server_add'];
$server_port = $_SESSION['server_port'];
$user_id = $_SESSION['member_id'];
$user_pw = $_SESSION['member_pw'];
$conn = ssh2_connect($server_add,$server_port);
$rlt = 1;
$response = array();
if (!$conn) {
    $rlt = -1;
    $rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else if (!@ssh2_auth_password($conn, $user_id, $user_pw)) {
    $rlt = -2;
    $rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else if ($rlt === 1) {
    $rlt = 1;
    $rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
    $response['member_id'] = $user_id;
}
$response['rlt_code'] = $rlt;
echo json_encode($response);
?>
