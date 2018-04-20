<?php
/**
 * @name: logout.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
session_start();
header("Content-type: application/json");
$result = session_destroy();
session_unset();
$response = array();
$response["rel"] = $result;
echo json_encode($response);
?>
