<body>
    <div class="page-container">
        <!-- mobile header layout -->
        <header class="default-mobile no-mobile no-border">

        </header>
        <!-- desktop header layout -->
        <header class="default-desktop no-border">
            <div class="container max-width">
                <!-- site logo -->

                <!--
                    
                    <div class="logo-wrap">
                        <div class="logo-position">
                        </div>
                    </div>
                
                -->

                <!--log out-->
                <div class="sign-btn">
                    <a href="<?=$data['logout']?>">
                        <i class="ion-locked"></i>
                    </a>
                </div>
            </div>
        </header>
        <!-- page content -->
        <div class="wrapper">
            <div class="container">
                <!-- content header -->
                <div class="content-header none-select">
                    <!--제목-->
                    <span class="content-header-title">Control Server</span>
                    <div class="content-header-masking"></div>
                </div>
                <!-- content -->
                <div class="article-content max-width">
                    <!-- article top menu -->
                    <div class="article-top-menu none-select">
                        <ul class="tabs">
                            <li id="tab0" class="active"><a>Console</a></li>
                            <li id="tab1"><a>Admin</a></li>
                            <!--    <li rel="tab3"><a>DataBase0</a></li> -->
                        </ul>
                    </div>
                    <div class="container">
                        <!-- tab1 : console-->
                        <section class="article-wrap" id="content0">
                            <input id="proc" class="console-input" placeholder="Enter..">
                            <button id="proc_btn" class="console-btn btn-active">Run</button>
                            <button id="res_btn" class="console-btn">Reset</button>
                            <span>Console Log</span>
                            <textarea class="console" id="console" contenteditable="true" cols="30" rows="10" readonly></textarea>
                        </section>
                        <!--
                           <section id="tab3" class="article-wrap">No Command</section>
                            <section id="tab3" class="article-wrap"  class="tab_content">
                                    <input id="db_proc" class="console-input" placeholder="Enter..">
                                    <button id="db_proc_btn" class="console-btn btn-active">Run</button>
                                    <button id="db_res_btn" class="console-btn">Reset</button>
                                    <span>Console Log</span>
                                    <textarea class="console" id="console" contenteditable="true" name="" cols="30" rows="10" readonly></textarea>
                            </section>
                        -->
                        <!-- tab 2 : Admin -->
                        <section id="content1" class="article-wrap">
                            <div class="container">
                                <!-- line # 1 -->
                                <p class="menu-title">Server</p>
                                <div id="server_stat" class="flat-btn">
                                    <!-- If you want to change Icon change i class -->
                                    <!-- http://ionicons.com/ -->
                                    <i class="ion-heart"></i>
                                    <h3 class="flat-btn-title">Status</h3>
                                </div>
                                <div id="server_off" class="flat-btn">
                                    <i class="ion-android-alert"></i>
                                    <h3 class="flat-btn-title">Server Off</h3>
                                </div>
                                <div id="server_restart" class="flat-btn">
                                    <i class="ion-android-refresh"></i>
                                    <h3 class="flat-btn-title">Server Restart</h3>
                                </div>
                            </div>
                            <div class="container">
                                <!-- line # 2 -->
                                <p class="menu-title">MySQL</p>
                                <div id="mysq_start" class="flat-btn">
                                    <i class="ion-android-arrow-dropright-circle"></i>
                                    <h3 class="flat-btn-title">MySQL Run</h3>
                                </div>
                                <div id="mysq_off" class="flat-btn">
                                    <i class="ion-android-alert"></i>
                                    <h3 class="flat-btn-title">MySQL Off</h3>
                                </div>
                                <div id="mysq_restart" class="flat-btn">
                                    <i class="ion-android-refresh"></i>
                                    <h3 class="flat-btn-title">MySQL Restart</h3>
                                </div>
                                <!-- button -->
                                <div id="mysq_stat" class="flat-btn">
                                    <i class="ion-heart"></i>
                                    <h3 class="flat-btn-title">MySQL Satatus</h3>
                                </div>
                            </div>
                            <div class="container">
                                <!-- line # 3 -->
                                <p class="menu-title">APACHE</p>
                                <div id="apa_start" class="flat-btn">
                                    <i class="ion-android-arrow-dropright-circle"></i>
                                    <h3 class="flat-btn-title">APACHE Run</h3>
                                </div>
                                <div id="apa_off" class="flat-btn">
                                    <i class="ion-android-alert"></i>
                                    <h3 class="flat-btn-title">APACHE Off</h3>
                                </div>
                                <div id="apa_restart" class="flat-btn">
                                    <i class="ion-android-refresh"></i>
                                    <h3 class="flat-btn-title">APACHE Restart</h3>
                                </div>
                                <div id="apa_stat" class="flat-btn">
                                    <i class="ion-heart"></i>
                                    <h3 class="flat-btn-title">APACHE Status</h3>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>