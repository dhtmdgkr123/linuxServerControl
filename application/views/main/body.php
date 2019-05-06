<body>
    <div class="login-wrap">
        <div class="login-form">
            <img src="<?=$data['img']['user']?>" alt="유저 아이콘">
        </div>
        <div class="login-input">
            <div class="border-title">
                <a>SERVER</a>
                <div class="border-type-spear">
                </div>

                <form id="myForm" action="<?=$data['actionUrl']?>" method="post">
                    <input placeholder="Server Addresses" type="text" id="serverAddress" name="serverAddress"
                        autoncomplete="off" value="<?=$_SERVER['HTTP_HOST']?>">
                    <!--Port  -->
                    <input placeholder="Port" type="text" id="serverPort" name="serverPort" autoncomplete="off">
                    <div class="border-title">
                        <a>CONNECT</a>
                        <div class="border-type-spear">
                        </div>
                    </div>

                    <!-- I D -->
                    <input placeholder="I D" type="text" name="userId" id="userId" autoncomplete="off">

                    <!-- P W -->
                    <input placeholder="Password" type="password" name="userPassword" id="userPassword" autoncomplete="off">

                    <button id="login" class="submit-done" type="submit">LOGIN</button>
                    <button id="reset" class="submit-done" type="reset">RESET</button>
                </form>
                <!--Server address  -->
            </div>

        </div>
        <!-- Button  -->
    </div>