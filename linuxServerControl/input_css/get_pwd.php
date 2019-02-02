<?php
/**
 * @name: get_pwd.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
header("Content-type: application/json; charset=UTF-8");
session_start();
$server_add = $_SESSION['server_add'];
$server_port = $_SESSION['server_port'];
$member_id = $_SESSION['member_id'];
$member_pw = $_SESSION['member_pw'];
$cmd_1 = 'pwd';
$rlt = 1;
$conn = ssh2_connect($server_add,$server_port);
$response = array();
if (!$conn) {
    $rlt = -1;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else if (!@ssh2_auth_password($conn, $member_id, $member_pw)) {
    $rlt = -2;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else {
    $stream_1 = ssh2_exec($conn, $cmd_1);
    $stream_stdout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDIO);
    $stream_errout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDERR);
    $errout_block_1 = stream_set_blocking($stream_errout_1,true);
    $stdout_block_1 = stream_set_blocking($stream_stdout_1,true);
    $stream_err_1 = stream_get_contents($stream_errout_1);
    $stream_std_1 = stream_get_contents($stream_stdout_1);
    if ($stream_err_1) {
        $rlt = -3;
        $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
    } else {
        $rlt = 1;
        $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
        if ($member_id === "root" || $member_id === "ROOT") {
            $response['pwd'] = $member_id."@".$server_add." : ".trim($stream_std_1)." #  ";
        } else {
            $response['pwd'] = $member_id."@".$server_add." : ".trim($stream_std_1)." $  ";
        }
    }
}
echo json_encode($response);
?>
