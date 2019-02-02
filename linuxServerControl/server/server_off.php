<?php
/**
 * @name: server_off.php
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
$response = array();
$rlt = 1;
if($member_id === "root" || $member_id === "ROOT") {
	$conn = ssh2_connect($server_add,$server_port);
	if (!$conn) {
        $rlt = -1;
		$response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
	} else if(!ssh2_auth_password($conn, $member_id, $member_pw)) {
		$rlt = -2;
		$response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
	} else {
		$cmd = 'shutdown -h now';
		$stream = ssh2_exec($conn, $cmd);
		$stream_stdout = ssh2_fetch_stream($stream, SSH2_STREAM_STDIO);
	    $stream_errout = ssh2_fetch_stream($stream, SSH2_STREAM_STDERR);
	    $errout_block = stream_set_blocking($stream_errout,true);
	    $stdout_block = stream_set_blocking($stream_stdout,true);
	    $stream_err = stream_get_contents($stream_errout);
	    $stream_std = stream_get_contents($stream_stdout);
		if ($stream_err) {
			$rlt = -3;
			$response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
			$response['msg'] = trim($stream_err);
		} else if ($rlt === 1) {
			$rlt = 1;
			$response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
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
