<?php
/**
 * @name: cmdprocess.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
session_start();
header("Content-type: application/json; charset=UTF-8");
$server_add = $_SESSION['server_add'];
$server_port = $_SESSION['server_port'];
$member_id = $_SESSION['member_id'];
$member_pw = $_SESSION['member_pw'];
$cmd_1 = $_POST['cmd'];
$conn = ssh2_connect($server_add,$server_port);
$response = array();
$rlt = 1;
if (!$conn) {
    $rlt = -1;
	$response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else if (!@ssh2_auth_password($conn, $member_id, $member_pw)) {
    $rlt = -3;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else {
    $stream_1 = ssh2_exec($conn, $cmd_1);
    $stream_stdout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDIO);
    $stream_errout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDERR);
    $errout_block_1 = stream_set_blocking($stream_errout_1,true);
    $stdout_block_1 = stream_set_blocking($stream_stdout_1,true);
    $stream_err_1 = stream_get_contents($stream_errout_1);
    $stream_std_1 = stream_get_contents($stream_stdout_1);
    if (!$conn) {
        session_destroy();
        Header("Location:/");
    } else if ($stream_err_1) {
        $rlt = -2;
        $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
        $response['rlt_msg'] = trim($stream_err_1);
    } else if ($rlt === 1) {
        $rlt = 1;
        $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;;
        $response['rlt_msg'] = trim($stream_std_1);
    } else {
        $rlt = 5;
        $rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
        $response['rlt_code'] = $rlt;
    }
}
echo json_encode($response);
?>
