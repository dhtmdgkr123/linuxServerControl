<?php
/**
 * @name: auth.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
session_start();
header("Content-type: application/json; charset=UTF-8");
$server_add = $_POST['server_add'];
$server_port = $_POST['server_port'];
$user_id = $_POST['member_id'];
$user_pw = $_POST['member_pw'];
$response = array();
$conn = ssh2_connect($server_add,$server_port);
$rlt = TRUE;
if (!$conn) {
    $rlt = -1;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else if (!@ssh2_auth_password($conn, $user_id, $user_pw)) {
    $rlt = -2;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else {
    $response['rlt_code'] = 1;
    $_SESSION['server_add'] = $server_add;
    $_SESSION['server_port'] = $server_port;
    $_SESSION['member_id'] = $user_id;
    $_SESSION['member_pw'] = $user_pw;
    $_SESSION["status"] = 1;
}
echo json_encode($response);
?>
