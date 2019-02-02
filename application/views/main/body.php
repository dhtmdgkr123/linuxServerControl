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
                <form id="myForm" action="" method="post">

                    <input placeholder="Server Addresses" type="text" id="serverAddress" name="server_add"
                        autoncomplete="off">
                    <!--Port  -->
                    <input placeholder="Port" type="text" id="serverPort" name="server_port" autoncomplete="off">
                    <div class="border-title">
                        <a>CONNECT</a>
                        <div class="border-type-spear">
                        </div>
                    </div>

                    <!-- I D -->
                    <input placeholder="I D" type="text" name="userId" id="userId" autoncomplete="off">

                    <!-- P W -->
                    <input placeholder="Password" type="password" name="userPw" id="userPassword" autoncomplete="off">

                </form>
                <!--Server address  -->
            </div>

        </div>
        <!-- Button  -->
        <button id="login" class="submit-done" type="submit">LOGIN</button>
        <button id="reset" class="submit-done" type="reset">RESET</button>
    </div>