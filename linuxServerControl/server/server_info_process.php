<?php
/**
 * @name: server_info_process.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
session_start();
header("Content-type: application/json; charset=UTF-8");
$server_add = $_SESSION['server_add'];
$server_port = $_SESSION['server_port'];
$user_id = $_SESSION['member_id'];
$user_pw = $_SESSION['member_pw'];
$cmd_1 = 'hostname';
$cmd_2 = <<<EOT
ifconfig | head -2 | tail -1 | awk '{print $2}' | cut -f 2 -d ":"
EOT;
$cmd_3 = <<<EOT
old=`echo \$LANG`;LANG=C; mpstat | tail -0; A=`echo $?`; if [ \$A == 0 ]; then mpstat | tail -1 | awk '{print 100-$12}'; else echo "Please install mpstat"; fi; LANG=\$old;
EOT;
$cmd_4 = <<<EOT
tot=`df -P | grep -v ^Filesystem | awk '{sum += $2} END { print sum; }'`;use=`df -P | grep -v ^Filesystem | awk '{sum += $3} END { print sum; }'`;per_1=`echo "100*\$use/\$tot" | bc -l`;per=`echo \$per_1 | cut -c 1-4`;echo \$per;
EOT;
$cmd_5 = <<<EOT
TOTAL=`free | grep ^Mem | awk '{print $2}'`;USED1=`free | grep ^Mem | awk '{print $3}'`;n=$((100*USED1/TOTAL));echo \$n;
EOT;
$cmd_6 = <<<EOT
df -T -P
EOT;
$conn = ssh2_connect($server_add,$server_port);
$rlt = TRUE;
$response = array();
if (!$conn) {
    $rlt = -1;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else if(!ssh2_auth_password($conn, $user_id, $user_pw)) {
    $rlt = -2;
    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
} else {
    //--------------------------------------------------------------
    //                  		 hostname
    //--------------------------------------------------------------
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
        //--------------------------------------------------------------
        //                 			ipaddress
        //--------------------------------------------------------------
        $stream_2 = ssh2_exec($conn, $cmd_2);
        $stream_stdout_2 = ssh2_fetch_stream($stream_2, SSH2_STREAM_STDIO);
        $stream_errout_2 = ssh2_fetch_stream($stream_2, SSH2_STREAM_STDERR);
        $errout_block_2 = stream_set_blocking($stream_errout_2,true);
        $stdout_block_2 = stream_set_blocking($stream_stdout_2,true);
        $stream_err_2 = stream_get_contents($stream_errout_2);
        $stream_std_2 = stream_get_contents($stream_stdout_2);
        if ($stream_err_2) {
            $rlt = -4;
            $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
        } else {
            //--------------------------------------------------------------
            //		        CPU activity ratio //sysstat
            //--------------------------------------------------------------
            $stream_3 = ssh2_exec($conn, $cmd_3);
            $stream_stdout_3 = ssh2_fetch_stream($stream_3, SSH2_STREAM_STDIO);
            $stream_errout_3 = ssh2_fetch_stream($stream_3, SSH2_STREAM_STDERR);
            $errout_block_3 = stream_set_blocking($stream_errout_3,true);
            $stdout_block_3 = stream_set_blocking($stream_stdout_3,true);
            $stream_err_3 = stream_get_contents($stream_errout_3);
            $stream_std_3 = stream_get_contents($stream_stdout_3);
            if ($stream_err_3) {
                $rlt = -5;
                $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
            } else {
                //--------------------------------------------------------------
                //                  disk usage //bc
                //--------------------------------------------------------------
                $stream_4 = ssh2_exec($conn, $cmd_4);
                $stream_stdout_4 = ssh2_fetch_stream($stream_4, SSH2_STREAM_STDIO);
                $stream_errout_4 = ssh2_fetch_stream($stream_4, SSH2_STREAM_STDERR);
                $errout_block_4 = stream_set_blocking($stream_errout_4,true);
                $stdout_block_4 = stream_set_blocking($stream_stdout_4,true);
                $stream_err_4 = stream_get_contents($stream_errout_4);
                $stream_std_4 = stream_get_contents($stream_stdout_4);
                if ($stream_err_4) {
                    $rlt = -6;
                    $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
                } else {
                    //--------------------------------------------------------------
                    //                    Memory usage
                    //--------------------------------------------------------------
                    $stream_5 = ssh2_exec($conn, $cmd_5);
                    $stream_stdout_5 = ssh2_fetch_stream($stream_5, SSH2_STREAM_STDIO);
                    $stream_errout_5 = ssh2_fetch_stream($stream_5, SSH2_STREAM_STDERR);
                    $errout_block_5 = stream_set_blocking($stream_errout_5,true);
                    $stdout_block_5 = stream_set_blocking($stream_stdout_5,true);
                    $stream_err_5 = stream_get_contents($stream_errout_5);
                    $stream_std_5 = stream_get_contents($stream_stdout_5);
                    if ($stream_err_5) {
                        $rlt = -7;
                        $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
                    } else {
                        //--------------------------------------------------------------
                        //              disk usage for individual dev
                        //--------------------------------------------------------------
                        $stream_6 = ssh2_exec($conn, $cmd_6);
                        $stream_stdout_6 = ssh2_fetch_stream($stream_6, SSH2_STREAM_STDIO);
                        $stream_errout_6 = ssh2_fetch_stream($stream_6, SSH2_STREAM_STDERR);
                        $errout_block_6 = stream_set_blocking($stream_errout_6,true);
                        $stdout_block_6 = stream_set_blocking($stream_stdout_6,true);
                        $stream_err_6 = stream_get_contents($stream_errout_6);
                        $stream_std_6 = stream_get_contents($stream_stdout_6);
                        if ($stream_err_6) {
                            $rlt = -8;
                            $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
                        } else {
                            if ($rlt) {
                                $rlt = 1;
                                $rst = array();
                                $data = trim($stream_std_6);
                            	$data = str_replace("1024-blocks", "Size", $data);
                            	$data = str_replace("Mounted on", "MountedOn", $data);
                            	$data = str_replace("%", "", $data);
                                $data = explode("\n", $data);
                                foreach($data as $key => $row) {
                            		$row = preg_split("/\s+/", $row);
                            		foreach ($row as $k => $v) {
                            			if($key === 0) {
                            				$title[] = $row[$k];
                            			} else {
                            				if (sizeof($row) === sizeof($title)) {
                            					$v = is_numeric($v) ? ((int)$v) : $v;
                                                $rst[$key][$title[$k]] = $v;
                            				}
                            			}
                            		}
                                }
                                $response['rlt_code'] = $rlt;
                                $response['host'] = trim($stream_std_1);     // hostname
                                $response['ip_addr'] = trim($stream_std_2);  // ifconfig | head -2 | tail -1 | awk {'print $2'} | cut -f 2 -d ":"
                                $response['cpu'] = trim($stream_std_3);      //clear mpstat | tail -1 | awk '{print 100-$13}'
                                $response['disk'] = trim($stream_std_4);     //clear tot=`df -P | grep -v ^Filesystem | awk '{sum += $2} END { print sum; }'`;use=`df -P | grep -v ^Filesystem | awk '{sum += $3} END { print sum; }'`;per_1=`echo "100*\$use/\$tot" | bc -l`;per=`echo \$per_1 | cut -c 1-4`;echo \$per;
                                $response['mem'] = trim($stream_std_5);      //clear TOTAL=`free | grep ^Mem | awk '{print $2}'`;USED1=`free | grep ^Mem | awk '{print $3}'`;n=$((100*USED1/TOTAL));echo \$n;
                                $response['dev'] = $rst;      // df -T -x tmpfs -x devtmpfs -P
                            } else {
                                $rlt = -9;
                                $response['rlt_code'] = is_numeric($rlt) ? ((int)$rlt) : $rlt;
                            }
                        }
                    }
                }
            }
        }
    }
}
echo json_encode($response);
?>
