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
$member_id = $_SESSION['member_id'];
$member_pw = $_SESSION['member_pw'];
$cmd_1 = 'pwd';
$rlt = 1;
$idchk = 1;
$conn = ssh2_connect($server_add,$server_port);
if (!$conn)
{
    $rlt = -1;
    $rlt = is_numeric($rlt) ? (int($rlt)) : $rlt;
}
ssh2_auth_password($conn, $member_id, $member_pw);
$stream_1 = ssh2_exec($conn, $cmd_1);
$stream_stdout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDIO);
$stream_errout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDERR);
$errout_block_1 = stream_set_blocking($stream_errout_1,true);
$stdout_block_1 = stream_set_blocking($stream_stdout_1,true);
$stream_err_1 = stream_get_contents($stream_errout_1);
$stream_std_1 = stream_get_contents($stream_stdout_1);
$resp = array();
if ($stream_err_1 === true)
{
    $rlt = -2;
    $rlt = is_numeric($rlt) ? (int($rlt)) : $rlt;
}
if ($rlt === 1)
{
	$rlt = 1;
	if ($member_id === "root")
	{
		$idchk = "#";
	}
	else
	{
		$idchk = "$";
	}
	$resp['pwd'] = $member_id."@".$server_add." : ".trim($stream_std_1)." ".$idchk. "  ";
}
$resp['rlt_code'] = $rlt;
echo json_encode($resp);
?>