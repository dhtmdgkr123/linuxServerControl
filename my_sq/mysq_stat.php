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
$cmd_1 = <<<EOT
a=`systemctl status mysql | grep active | awk '{print $2}'`;if [ \$a = "active" ]; then echo "MySQL is active"; elif [ \$a = "inactive" ]; then echo "MySQL is inactive"; else echo "Unknown error or package isn't installed!";fi
EOT;
#If you want to Change Command change cmd_1
$conn = ssh2_connect($server_add,$server_port);
$rlt = 1;
ssh2_auth_password($conn, $member_id, $member_pw);
if (!$conn)
{
    $rlt = -1;
	$rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
}
$stream_1 = ssh2_exec($conn, $cmd_1);
$stream_stdout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDIO);
$stream_errout_1 = ssh2_fetch_stream($stream_1, SSH2_STREAM_STDERR);
$errout_block_1 = stream_set_blocking($stream_errout_1,true);
$stdout_block_1 = stream_set_blocking($stream_stdout_1,true);
$stream_err_1 = stream_get_contents($stream_errout_1);
$stream_std_1 = stream_get_contents($stream_stdout_1);
if ($stream_err_1 === true)
{
    $rlt = -2;
	$rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
}
if ($rlt === 1)
{
    $rlt = 1;
	$rlt = is_numeric($rlt) ? ((int)$rlt) : $rlt;
	$msg = (trim($stream_std_1));
}
$response = array();
$response['rlt_code'] = $rlt;
$response['msg'] = $msg;
echo json_encode($response);
?>