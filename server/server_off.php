<?php
/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
header("Content-type: application/json; charset=UTF-8");
session_start();
$rlt = 1;
$server_add = $_SESSION['server_add'];
$server_port = $_SESSION['server_port'];
$member_id = $_SESSION['member_id'];
$member_pw = $_SESSION['member_pw'];
if($member_id === "root")
{
	$cmd = 'shutdown -h now';
	$conn = ssh2_connect($server_add,$server_port);
	ssh2_auth_password($conn, $member_id, $member_pw);
	if (!$conn)
	{
        $rlt = -1;
		$rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
	}
	else
	{
		$stream = ssh2_exec($conn, $cmd);
		$stream_stdout = ssh2_fetch_stream($stream, SSH2_STREAM_STDIO);
		$stream_errout = ssh2_fetch_stream($stream, SSH2_STREAM_STDERR);
		stream_set_blocking($stream_stdout,true);
		stream_set_blocking($stream_errout,true);
		$stream_std = stream_get_contents($stream_stdout);
		$stream_err = stream_get_contents($stream_errout);
		if(!$stream_err)
		{
            $rlt = 1;
			$rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
		}
	}
}
else
{
    $rlt = -2;
	$rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
}
$response = array();
$response['rlt_code'] = $rlt;
echo json_encode($response);
?>