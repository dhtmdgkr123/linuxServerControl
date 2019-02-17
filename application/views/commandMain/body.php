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
                                <div id="serverStatus" class="flat-btn">
                                    <i class="ion-heart"></i>
                                    <h3 class="flat-btn-title">Status</h3>
                                </div>
                                <div id="serverOff" class="flat-btn">
                                    <i class="ion-android-alert"></i>
                                    <h3 class="flat-btn-title">Server Off</h3>
                                </div>
                                <div id="serverRestart" class="flat-btn">
                                    <i class="ion-android-refresh"></i>
                                    <h3 class="flat-btn-title">Server Restart</h3>
                                </div>
                            </div>


                            <div class="container">
                                <!-- line # 2 -->
                                <p class="menu-title">MySQL</p>
                                <div id="MySqlStart" class="flat-btn">
                                    <i class="ion-android-arrow-dropright-circle"></i>
                                    <h3 class="flat-btn-title">MySQL Run</h3>
                                </div>
                                <div id="MySqlOff" class="flat-btn">
                                    <i class="ion-android-alert"></i>
                                    <h3 class="flat-btn-title">MySQL Off</h3>
                                </div>
                                <div id="MySqlReStart" class="flat-btn">
                                    <i class="ion-android-refresh"></i>
                                    <h3 class="flat-btn-title">MySQL Restart</h3>
                                </div>
                                <!-- button -->
                                <div id="MySqlStatus" class="flat-btn">
                                    <i class="ion-heart"></i>
                                    <h3 class="flat-btn-title">MySQL Satatus</h3>
                                </div>
                            </div>


                            <div class="container">
                                <!-- line # 3 -->
                                <p class="menu-title">APACHE</p>
                                <div id="apacheStart" class="flat-btn">
                                    <i class="ion-android-arrow-dropright-circle"></i>
                                    <h3 class="flat-btn-title">APACHE Run</h3>
                                </div>
                                <div id="apacheOff" class="flat-btn">
                                    <i class="ion-android-alert"></i>
                                    <h3 class="flat-btn-title">APACHE Off</h3>
                                </div>
                                <div id="apacheRestart" class="flat-btn">
                                    <i class="ion-android-refresh"></i>
                                    <h3 class="flat-btn-title">APACHE Restart</h3>
                                </div>
                                <div id="apacheStatus" class="flat-btn">
                                    <i class="ion-heart"></i>
                                    <h3 class="flat-btn-title">APACHE Status</h3>
                                </div>
                            </div>

                            <div class="container">
                                <!-- line # 3 -->
                                <p class="menu-title">NGINX</p>
                                <div id="nginxStart" class="flat-btn">
                                    <i class="ion-android-arrow-dropright-circle"></i>
                                    <h3 class="flat-btn-title">NGINX Run</h3>
                                </div>
                                <div id="nginxOff" class="flat-btn">
                                    <i class="ion-android-alert"></i>
                                    <h3 class="flat-btn-title">NGINX Off</h3>
                                </div>
                                <div id="nginxRestart" class="flat-btn">
                                    <i class="ion-android-refresh"></i>
                                    <h3 class="flat-btn-title">NGINX Restart</h3>
                                </div>
                                <div id="nginxStatus" class="flat-btn">
                                    <i class="ion-heart"></i>
                                    <h3 class="flat-btn-title">NGINX Status</h3>
                                </div>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>