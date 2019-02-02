<?php
/**
 * @name: apa_off.php
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
$cmd_1 = <<<EOT
systemctl stop apache2;a=`echo $?`;if [ \$a = 0 ];then echo "Success to Off Apache2"; else echo "Fail!! Install Apache2 Package";fi
EOT;
$rlt = 1;
$response = array();
if ($member_id === "root" || $member_id === "ROOT") {
    $conn = ssh2_connect($server_add,$server_port);
    if (!$conn) {
        $rlt = -1;
        $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
    } else if(!ssh2_auth_password($conn, $member_id, $member_pw)) {
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
            $response['msg'] = trim($stream_err_1);
        } else if ($rlt === 1) {
            $rlt = 1;
            $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
            $response['msg'] = trim($stream_std_1);
        } else {
            $rlt = -5;
            $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
        }
    }
} else {
    $rlt = -4;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
}
echo json_encode($response);
?>