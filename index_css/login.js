/**
 * @name: login.js
 * @since: 2018 - 04 - 21
 * @version: 1.0.1.1
 * @Contact: osh12201@gmail.com
 */
var chk = false;

function login(server_add, server_port, member_id, member_pw) {
    if (chk) {
        $.alert('Wait Please');
        return;
    } else {
        chk = true;
        if (server_add === "") {
            $.alert('Check Server address');
            chk = false
        } else if (server_port === "") {
            $.alert('Check Server port');
            chk = false
        } else if (member_id === "") {
            $.alert('Check Id');
            chk = false
        } else if (member_pw === "") {
            $.alert('Check passwrod');
            chk = false
        } else {
            $.ajax({
                type: "POST",
                url: "process/auth.php",
                dataType: "json",
                cache: false,
                async: true,
                data: {
                    'server_add': server_add,
                    'server_port': server_port,
                    'member_id': member_id,
                    'member_pw': member_pw
                },
                success: function(response) {
                    chk = false
                    if (response.rlt_code === 1) {
                        location.href = 'view/input.php';
                    } else if (response.rlt_code === -1) {
                        $.alert('Fail to connect Server');
                    } else if (response.rlt_code === -2) {
                        $.alert('Fail to log in please check id or password');
                    }
                },
                error: function(error) {
                    chk = false
                    $.alert('Please install php-ssh2 library or install openssl library');
                }
            });
        }
    }

}
$(document).ready(function() {
    console.log("%cHello admin~ below that link is my blog~", 'color: blue;font-size:50px');
    console.log("%chttp://matas-cs.tistory.com/", 'color: #ed5406;font-size:50px');
    console.log("%cIf you want to get this web's sourcecode visit my github~", 'color: blue;font-size:50px')
    console.log("%chttps://github.com/dhtmdgkr123", 'color:#2bb34a;font-size:50px');
    $('#login').on('click', function() {
        login(
            $('#server_add').val(),
            $('#server_port').val(),
            $('#member_id').val(),
            $('#password').val()
        );
    });
    $("input").on('keypress', function(e) {
        if (e.keyCode === 13) {
            login($('#server_add').val(),
                $('#server_port').val(),
                $('#member_id').val(),
                $('#password').val()
            );
        }
    });
});