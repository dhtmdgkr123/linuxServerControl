<?php
/**
 * @name: logout.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
session_start();
header("Content-type: application/json; charset=UTF-8");
$response = array();
$response["rel"] = session_destroy();
session_unset();
echo json_encode($response);
?>
