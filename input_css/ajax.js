/**
 * @name: ajax.js
 * @since: 2018 - 04 - 21
 * @version: 1.0.1
 * @Contact: osh12201@gmail.com
 */
//-----------------------------
//			server
//-----------------------------
var savepath;
var base_url = location.origin;
var console_selector = $('#console');

function server_stat() {
    $.ajax({
        type: "POST",
        url: base_url + "/server/server_info_process.php",
        datatype: "json",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rlt_code === 1) {
                location.href = base_url + "/view/server_info_view.php";
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth server');
                setTimeout(function() {
                    log_out();
                }, 2000)
            } else if (response.rlt_code === -3) {
                $.alert('Fail to get host name try again');
            } else if (response.rlt_code === -4) {
                $.alert('Fail to get IP address try again');
            } else if (response.rlt_code === -5) {
                $.alert('Please install sysstat');
            } else if (response.rlt_code === -6) {
                $.alert('Please install bc');
            } else if (response.rlt_code === -7) {
                $.alert('Fail to get Memory Usage');
            } else if (response.rlt_code === -8) {
                $.alert('Fail to get Disk usage');
            } else if (response.rlt_code === -9) {
                $.alert('Unknown error');
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}

function server_off() {
    $.ajax({
        type: "POST",
        url: base_url + "/server/server_off.php",
        datatype: "json",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert('Success to off Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -4) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth server');
                setTimeout(function() {
                    log_out();
                }, 2000)
            } else if (response.rlt_code === -5) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert('Sorry try again!');
        }
    });
}

function server_restart() {
    $.ajax({
        type: "POST",
        url: base_url + "/server/server_restart.php",
        datatype: "json",
        async: true,
        cache: false,
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert('Success to restart Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -4) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -5) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}
//-----------------------------
//			MySQL
//-----------------------------
function mysq_off() {
    $.ajax({
        type: "POST",
        url: base_url + "/my_sq/mysq_off.php",
        datatype: "json",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code == -4) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -5) {
                $.alert(response.msg);
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}

function mysq_start() {
    $.ajax({
        type: "POST",
        url: base_url + "/my_sq/mysq_start.php",
        datatype: "json",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code === -5) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -1) {
                $.alert('Fail to Connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                }, 2000)
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -4) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}

function mysq_stat() {
    $.ajax({
        type: "POST",
        url: base_url + "/my_sq/mysq_stat.php",
        datatype: "json",
        async: true,
        cache: false,
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                }, 2000)
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -4) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}

function mysq_restart() {
    $.ajax({
        type: "POST",
        url: base_url + "/my_sq/mysq_restart.php",
        cache: false,
        async: true,
        datatype: "json",
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -4) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -5) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert("Sorry try again!");
        }
    });
}
//-----------------------------
//			Apache
//-----------------------------
function apa_stat() {
    $.ajax({
        type: "POST",
        url: base_url + "/apa/apa_stat.php",
        cache: false,
        async: true,
        datatype: "json",
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -4) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}

function apa_off() {
    $.ajax({
        type: "POST",
        cache: false,
        async: true,
        url: base_url + "/apa/apa_off.php",
        datatype: "json",
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -4) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -5) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}

function apa_restart() {
    $.ajax({
        type: "POST",
        url: base_url + "/apa/apa_restart.php",
        cache: false,
        async: true,
        datatype: "json",
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code === -4) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -5) {
                $.alert('Unknown Error');
            }
        },
        error: function() {
            $.alert('Sorry try again!');
        }
    });
}

function apa_start() {
    $.ajax({
        type: "POST",
        url: base_url + "/apa/apa_start.php",
        cache: false,
        async: true,
        datatype: "json",
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert(response.msg);
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server')
                setTimeout(function() {
                    log_out();
                }, 2000);
            } else if (response.rlt_code === -3) {
                $.alert(response.msg);
            } else if (response.rlt_code === -4) {
                $.alert('Only root can do this');
            } else if (response.rlt_code === -5) {
                $.alert('Unknown error');
            }
        },
        error: function() {
            $.alert('Sorry try again!');
        }
    });
}
//-----------------------------
//			  Other
//-----------------------------
function log_out() {
    $.ajax({
        type: "POST",
        url: base_url + "/process/logout.php",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rel) {
                location.href = base_url;
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}


function get_cmd_kind(fisrt, second) {
    return fisrt.trim().split(' ')[0] === second.trim();
}

function cmdprocess() {
    let clear_find = $('#proc').val();
    if (~clear_find.indexOf('clear')) {
        console_selector.empty();
        console_selector.append(document.createTextNode(savepath));
    } else if (~clear_find.indexOf('halt')) {
        $.confirm({
            title: 'Shutdown your server!',
            content: 'Do you want to shutdown your Server?!',
            buttons: {
                confirm: function() {
                    server_off();
                },
                cancel: function() {
                    // $.alert('cancle func')
                },
            }
        });
    } else if (~clear_find.indexOf('shutdown')) {
        $.confirm({
            title: 'Shutdown your server!',
            content: 'Do you want to shutdown your Server?!',
            buttons: {
                confirm: function() {
                    server_off();
                },
                cancel: function() {
                    // $.alert('cancle func')
                },
            }
        });
        // get_cmd_kind(clear_find, 'rm')
    } else if (get_cmd_kind(clear_find, 'top')) {
        console_selector.append(clear_find);
        console_selector.append("\n");
        console_selector.append(document.createTextNode("Can't do this command on this service\n"));
        console_selector.append(savepath);
        console_selector.scrollTop(console_selector.prop('scrollHeight'));
    } else if (get_cmd_kind(clear_find, 'vi')) {
        console_selector.append(clear_find);
        console_selector.append("\n");
        console_selector.append(document.createTextNode("Can't do this command on this service\n"));
        console_selector.append(savepath);
        console_selector.scrollTop(console_selector.prop('scrollHeight'));
    } else if (get_cmd_kind(clear_find, 'rm')) {
        $.confirm({
            title: 'remove File!',
            content: 'Are u really remove file?',
            buttons: {
                confirm: function() {
                    $.ajax({
                        type: "POST",
                        url: base_url + "/process/cmdprocess.php",
                        datatype: "json",
                        data: {
                            'cmd': clear_find
                        },
                        success: function(response) {
                            let rlt = response.rlt_msg;
                            if (response.rlt_code === 1) {
                                console_selector.append(clear_find);
                                console_selector.append("\n");
                                console_selector.append(document.createTextNode(rlt));
                                console_selector.append("\n");
                                console_selector.append(savepath);
                                console_selector.scrollTop(console_selector.prop('scrollHeight'));
                            } else if (response.rlt_code === -1) {
                                console_selector.append(clear_find);
                                console_selector.append("\n");
                                console_selector.append(document.createTextNode("Fail to connect server\n"));
                                console_selector.append(savepath);
                                console_selector.scrollTop(console_selector.prop('scrollHeight'));
                            } else if (response.rlt_code === -2) {
                                console_selector.append(clear_find);
                                console_selector.append("\n");
                                console_selector.append(document.createTextNode(rlt));
                                console_selector.append("\n");
                                console_selector.append(savepath);
                                console_selector.scrollTop(console_selector.prop('scrollHeight'));
                            }
                        },
                        error: function() {
                            console_selector.append(clear_find);
                            console_selector.append("\n");
                            console_selector.append(document.createTextNode("Sorry try again!\n"));
                            console_selector.append(savepath);
                            console_selector.scrollTop(console_selector.prop('scrollHeight'));
                        }
                    });
                },
                cancel: function() {
                    // $.alert('cancle func')
                },
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: base_url + "/process/cmdprocess.php",
            datatype: "json",
            data: {
                'cmd': clear_find
            },
            success: function(response) {
                let rlt = response.rlt_msg;
                if (response.rlt_code === 1) {
                    console_selector.append(clear_find);
                    console_selector.append("\n");
                    console_selector.append(document.createTextNode(rlt));
                    console_selector.append("\n");
                    console_selector.append(savepath);
                    console_selector.scrollTop(console_selector.prop('scrollHeight'));
                } else if (response.rlt_code === -1) {
                    console_selector.append(clear_find);
                    console_selector.append("\n");
                    console_selector.append(document.createTextNode("Fail to connect server\n"));
                    console_selector.append(savepath);
                    console_selector.scrollTop(console_selector.prop('scrollHeight'));
                } else if (response.rlt_code === -2) {
                    console_selector.append(clear_find);
                    console_selector.append("\n");
                    console_selector.append(document.createTextNode(rlt));
                    console_selector.append("\n");
                    console_selector.append(savepath);
                    console_selector.scrollTop(console_selector.prop('scrollHeight'));
                } else if (response.rlt_code === -5) {
                    console_selector.append(clear_find);
                    console_selector.append("\n");
                    console_selector.append(document.createTextNode("Unknown Error! Press F5 key\n"));
                    console_selector.append(savepath);
                    console_selector.scrollTop(console_selector.prop('scrollHeight'));
                } else if (response.rlt_code === -3) {
                    console_selector.append(clear_find);
                    console_selector.append("\n");
                    console_selector.append(document.createTextNode("Fail to auth server!Press F5 key\n"));
                    console_selector.append("\n");
                    console_selector.append(savepath);
                    console_selector.scrollTop(console_selector.prop('scrollHeight'));
                } else {
                    console_selector.append(clear_find);
                    console_selector.append("\n");
                    console_selector.append(document.createTextNode(rlt));
                    console_selector.append("\n");
                    console_selector.append(savepath);
                    console_selector.scrollTop(console_selector.prop('scrollHeight'));
                }
            },
            error: function() {
                console_selector.append(clear_find);
                console_selector.append("\n");
                console_selector.append(document.createTextNode("Sorry Press F5 key\n"));
                console_selector.append(savepath);
                console_selector.scrollTop(console_selector.prop('scrollHeight'));
            }
        });
    }
}

function get_pwd() {
    $.ajax({
        type: "POST",
        url: base_url + "/input_css/get_pwd.php",
        success: function(response) {
            if (response.rlt_code) {
                savepath = response.pwd;
                console_selector.append(savepath);
            } else {
                console_selector.append("Sorry Press F5 key");
            }
        },
        error: function() {
            console_selector.append("Sorry Press F5 key");
        }
    });
}
$(document).ready(function() {
    get_pwd();
    console.log("%cHello~ below that link is my blog~", 'color: blue;font-size:50px');
    console.log("%chttp://matas-cs.tistory.com/", 'color: #ed5406;font-size:50px');
    console.log("%cIf you want to get this web's sourcecode visit my github~", 'color: blue;font-size:50px')
    console.log("%chttps://github.com/dhtmdgkr123", 'color:#2bb34a;font-size:50px');
    $(".article-wrap").hide();
    $(".article-wrap:first").show();
    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        $(this).addClass("active").css("color", "darkred");
        $(".article-wrap").hide()
        let activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
    //----------------------------------
    //			    server
    //----------------------------------
    $('#server_stat').on('click', function() {
        server_stat();
    });
    $('#server_off').on('click', function() {
        $.confirm({
            title: 'Shutdown your server!',
            content: "Do you want to shutdown Server?",
            buttons: {
                confirm: function() {
                    server_off();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },

            }
        });
    });
    $('#server_restart').on('click', function() {
        $.confirm({
            title: 'Restart your server!',
            content: "Do you want to restart Server?",
            buttons: {
                confirm: function() {
                    server_restart();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },

            }
        });
    });
    //----------------------------------
    //			     MySql
    //----------------------------------
    $('#mysq_start').on('click', function() {
        $.confirm({
            title: 'Start your MySQL!',
            content: "Do you want to start MySQL?",
            buttons: {
                confirm: function() {
                    mysq_start();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },
            }
        });
    });
    $('#mysq_off').on('click', function() {
        $.confirm({
            title: 'Shutdown your MySQL!',
            content: "Do you want to shutdown MySQL?",
            buttons: {
                confirm: function() {
                    mysq_off();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },
            }
        });
    });
    $('#mysq_restart').on('click', function() {
        $.confirm({
            title: 'Restart your MySQL!',
            content: "Do you want to restart MySQL?",
            buttons: {
                confirm: function() {
                    mysq_restart();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },
            }
        });
    });
    $('#mysq_stat').on('click', function() {
        mysq_stat();
    });
    //----------------------------------
    //			   Apache
    //----------------------------------
    $('#apa_start').on('click', function() {
        $.confirm({
            title: 'Start your Apache2!',
            content: "Do you want to start Apache2?",
            buttons: {
                confirm: function() {
                    apa_start();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },
            }
        });
    });
    $('#apa_off').on('click', function() {
        $.confirm({
            title: 'Start your Apache2!',
            content: "Do you want to shutdown Apache2?",
            buttons: {
                confirm: function() {
                    apa_off();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },
            }
        });
    });
    $('#apa_restart').on('click', function() {

        $.confirm({
            title: 'Restart your Apache2!',
            content: "Do you want to Restart Apache2?",
            buttons: {
                confirm: function() {
                    apa_off();
                },
                cancel: function() {
                    // $.alert('Canceled!');
                },
            }
        });
    });
    $('#apa_stat').on('click', function() {
        apa_stat();
    });
    $('#log_out').on('click', function() {
        log_out();
    });
    $('#proc_btn').on('click', function() {
        cmdprocess();
        $('#proc').val("");
    });
    $('#res_btn').on('click', function() {
        $('#proc').val("");
    });
    $("#proc").on('keypress', function(e) {
        if (e.keyCode === 13) {
            cmdprocess();
            $('#proc').val("");
        }
    });
});