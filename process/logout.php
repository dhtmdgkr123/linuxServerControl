<?php
/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
session_start();
header("Content-type: application/json");
$result = session_destroy();
$response = array();
$response["rel"] = $result;
echo json_encode($response);
?>