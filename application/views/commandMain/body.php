<body>
    <div class="page-container">
        <!-- desktop header layout -->
        <header class="default-desktop no-border">
            <div class="container max-width">
                <!-- site logo -->
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
                            
                            <form action="<?=$data['action']?>" id="sendCommand" method="post">
                                <input name="command" id="proc" class="console-input" placeholder="Enter..">
                                <button type="submit" id="proc_btn" class="console-btn btn-active">Run</button>
                                <button id="res_btn" class="console-btn">Reset</button>
                            </form>

                            <span>Console Log</span>
                            <textarea class="console" id="console" contenteditable="true" cols="30" rows="10" readonly></textarea>
                        </section>
                        
                        <!-- tab 2 : Admin -->
                        <section id="content1" class="article-wrap">
                            <?php $iconClassName = 0; $title = 1; foreach($data['admin'] as $key => $value): ?>
                            <div class="container">
                                <p class="menu-title"><?=$key?></p>
                                <?php foreach($value as $v):?>
                                <div id="<?=preg_replace('/\s+/', '', $v[$title])?>" class="flat-btn">
                                    <i class="<?=$v[$iconClassName]?>"></i>
                                    <h3 class="flat-btn-title"><?=$v[$title]?></h3>
                                </div>
                                <?php endforeach; ?>
                            </div>
                            <?php endforeach; ?>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>