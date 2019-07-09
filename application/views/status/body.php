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
                                <li id="<?=preg_replace('/\s+/', '', $action)?>"><?=$action?></li>
                            <?php endforeach;?>
                        </ul>
                    </div>
                    <?php endforeach;?>

                </div>
                <!-- side content -->
            </div>
        </div>

        <div class="content_wrap flex_02">
            <div class="top-card">
                <?php for ($i = 1; $i <= 3; $i++ ): ?>
                    <div class="gauge_chart" id="chartDiv<?=$i?>"></div>
                <?php endfor; ?>
            </div>
            <div id="card_main" class="card">


                <!-- template -->

                
                
                <!-- <div class="card_container">
                    <div class="card_item flex">
                        <div class="disk flex_00 disk_bg">
                            <div class="disk_img">
                                <div class="disk_info flex_align"></div>
                            </div>
                        </div>
                        <div class="diskflex_01">
                            <div class="disk_info_txt flex_align">/run</div>
                        </div>
                        <div class="disk flex_01 disk_height_set">
                            <div class="progress_height_set progressbar_wrap">
                                <div class="progress_value" style="width:3%;background-color:#668de5">
                                    <div class="progress_context">3%</div>
                                </div>
                            </div>
                        </div>
                        <div class="disk flex_00 disk_height_set">
                            <div class="flex_align disk_height_set toggle_disk_option">option</div>
                        </div>
                    </div>
                    <div class="toggle_info" data-toggle="false" style="display: block;">
                        <div class="flex">
                            <div class="info_value flex_00">
                                <div class="flex_align">
                                    <span>Filesystem : </span>
                                    <span class="value_txt">tmpfs</span>
                                </div>
                            </div>
                            <div class="info_title flex_00">
                                <div class="flex_align">
                                    <span>Type : </span>
                                    <span class="value_txt">tmpfs</span>
                                </div>
                            </div>
                            <div class="info_value flex_00">
                                <div class="flex_align">
                                    <span>Size : </span>
                                    <span class="value_txt">198.2MB</span>
                                </div>
                            </div>
                            <div class="info_value flex_00">
                                <div class="flex_align">
                                    <span>Use : </span>
                                    <span class="value_txt">5.9MB</span>
                                </div>
                            </div>
                            <div class="info_value flex_00">
                                <div class="flex_align">
                                    <span>Free : </span>
                                    <span class="value_txt">192.3MB</span>
                                </div>
                            </div>
                            <div class="info_value flex_00">
                                <div class="flex_align">
                                    <span>Available : </span>
                                    <span class="value_txt">3%</span>
                                </div>
                            </div>
                            <div class="info_value flex_00">
                                <div class="flex_align">
                                    <span >Mounted on : </span>
                                    <span class="value_txt">/run</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->


                <!-- endTemplate -->

            </div>
        </div>
    </div>