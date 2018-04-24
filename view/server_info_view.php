<?php
session_start();
if ($_SESSION["status"] !== 1) {
    header("Location:../");
    exit;
}
?>
<!DOCTYPE html>
<!--
/**
 * @name: server_info_view.php
 * @since: 2018 - 04 - 21
 * @version: 1.0.1.1
 * @Contact: osh12201@gmail.com
 */
-->
<html lang="ko">
<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Server Status</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto|Source+Sans+Pro" rel="stylesheet">
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="alternate" type="application/rss+xml" title="[##_title_##]" href="[##_rss_url_##]" />
    <link rel="stylesheet" href="../base/base_reset.css">
    <link rel="stylesheet" href="../server_view_css/style.css">
    <link rel="stylesheet" href="../base/base_confirm.css">

</head>
<body class="bgColor bgImg">
    <div class="bgMask"></div>
<s_t3>
    <div class="page_wrap flex">
        <div class="side_wrap flex_01">
            <div class="side_container baseColor">
                <!-- head -->
                <div class="side_head flex subColor">
                    <div id="select_img" class="flex_00 logo_height_set">
                    <!-- <div class="flex_align logo_height_set logo_img" style="background-image:url(image url)"></div> -->
                    </div>
                    <div class="flex_01 logo_height_set">
                        <div class="flex_align logo_height_set logo_txt fontColor">
                            Server Panel
                        </div>
                    </div>
                </div>
                <!-- side sub menu -->
                <div class="side_menu boxColor">
                    <div class="side_sub_menu flex">
                        <div id="log_out" class="sub_menu_item flex_00">
                            <div class="menu_txt flex_align"><i class="ion-locked"></i></div>
                        </div>
                <!--        <div class="sub_menu_item flex_00">
                            <div class="menu_txt flex_align"><i class="ion-android-settings"></i></div>
                        </div>
                        <div class="sub_menu_item flex_00">
                            <div class="menu_txt flex_align"><i class="ion-android-options"></i></div>
                        </div> -->
                    </div>
                </div>
                <!-- side content -->
                <div class="side_content fontColor">
                    <ul class="category_list">
                        <h3 class="side_item_title">Server</h3>
                        <li id="Command"><a>Command</a></li>
                        <li id="ServerOff"><a>ServerOff</a></li>
                        <li id="ServerRestart"><a>ServerRestart</a></li>
                    </ul>
                </div>
                <div class="side_content fontColor">
                    <ul class="category_list">
                        <h3 class="side_item_title">MySQL</h3>
                        <li id="mysq_status"><a>MySQL Status</a></li>
                        <li id="mysq_start"><a>MySQL Start</a></li>
                        <li id="mysq_stop"><a>MySQL Stop</a></li>
                        <li id="mysq_restart"><a>MySQL ReStart</a></li>
                    </ul>
                </div>
                <div class="side_content fontColor">
                    <ul class="category_list">
                        <h3 class="side_item_title">Apache2</h3>
                        <li id="apa_status"><a>Apache2 Status</a></li>
                        <li id="apa_start"><a>Apache2 Start</a></li>
                        <li id="apa_stop"><a>Apache2 Stop</a></li>
                        <li id="apa_restart"><a>Apache2 ReStart</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="content_wrap flex_02">
            <div class="top_card">
				<div class="gauge_chart" id="chart_div_1"></div>
				<div class="gauge_chart" id="chart_div_2"></div>
				<div class="gauge_chart" id="chart_div_3"></div>
            </div>
            <div id="card_main" class="card">
            </div>
        </div>
    </div>
</s_t3>

<script src="../base/jquery.js"></script>
<script src="../server_view_js/loader.js"></script>
<script src="../server_view_js/app.js"></script>
<script src="../base/base_confirm.js"></script>
</body>
</html>
