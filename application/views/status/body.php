<body class="bgColor bgImg">
    <div class="bgMask"></div>
    <div class="page_wrap flex">
        <div class="side_wrap flex_01">
            <div class="side_container baseColor">
                <!-- head -->
                <div class="side_head flex subColor">
                    <div id="selectImg" class="flex_00 logo_height_set">
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
                        <a href="<?=$this->config->site_url('Command/logout');?>">
                            <div id="log_out" class="sub_menu_item flex_00">
                                <div class="menu_txt flex_align"><i class="ion-locked"></i></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div id="getTarget">
                    <?php foreach ($data['UI'] as $title => $actionList):?>
                    <div class="side_content fontColor">
                        <ul class="category_list">
                            <h3 class="side_item_title"><?=$title?></h3>
                            <?php foreach($actionList as $action): ?>
                                <li id="<?=$action?>"><?=$action?></li>
                            <?php endforeach;?>
                        </ul>
                    </div>
                    <?php endforeach;?>

                </div>
                <!-- side content -->
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