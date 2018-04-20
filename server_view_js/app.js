/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
//---------------------------------
//          global
//---------------------------------
var base_url = location.origin;
var ccpu = 0; //cpu_per
var ddisk = 0; //disk_per
var mmem = 0; //memory_per


function go_command() {
    $.ajax({
        type: "POST",
        url: base_url + "/server_view_js/log_chk.php",
        datatype: "json",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rlt_code === 1) {
                location.href = base_url + "/view/input.php";
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
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}
//---------------------------------
//          SERVER
//---------------------------------
function server_off() {
    $.ajax({
        type: "POST",
        url: base_url + "/server/server_off.php",
        datatype: "json",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rlt_code === 1) {
                $.alert('Success to shutdown Server');
                setTimeout(function() {
                    log_out();
                }, 2000);
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
            $.alert('Sorry try again');
        }
    });
}

function server_restart() {
    $.ajax({
        type: "POST",
        url: base_url + "/server/server_restart.php",
        datatype: "json",
        cache: false,
        async: true,
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
                $.alert('Success to off Apache2');
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
                $.alert('Success to start Apache2');
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
                $.alert('Success to start Apache2');
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
//---------------------------------
//             Other
//---------------------------------
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

function get_img() {
    $.ajax({
        type: "POST",
        url: base_url + "/server_view_js/get_img.php",
        cache: false,
        async: true,
        success: function(response) {
            if (response.rlt_code === 1) {
                if (response.member_id === "root" || response.member_id === "ROOT") {
                    $("#select_img").prepend("<div id='root' class='flex_align logo_height_set logo_img'></div>");
                } else {
                    $("#select_img").prepend("<div id='unroot' class='flex_align logo_height_set logo_img'></div>");
                }
            } else if (response.rlt_code === -2) {
                $.alert('Fail to auth Server');
                setTimeout(function() {
                    log_out();
                });
            } else if (response.rlt_code === -1) {
                $.alert('Fail to connect Server');
                setTimeout(function() {
                    log_out();
                });
            }
        },
        error: function() {
            $.alert('Sorry try again');
        }
    });
}
//---------------------------------
//          main
//---------------------------------
$(document).ready(function() {
    get_img();
    console.log("%cHello~ below that link is my blog~", 'color: blue;font-size:50px');
    console.log("%chttp://matas-cs.tistory.com/", 'color: #ed5406;font-size:50px');
    console.log("%cIf you want to get this web's sourcecode visit my github~", 'color: blue;font-size:50px')
    console.log("%chttps://github.com/dhtmdgkr123", 'color:#2bb34a;font-size:50px');
    //-------------------------------------------------------------------
    //                        Start Draw Chart
    //-------------------------------------------------------------------

    //-----------------------------------------------------
    //						CPU
    //-----------------------------------------------------
    function drawChart() {
        let data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['CPU', ccpu]
        ]);
        let options = {
            width: 400,
            height: 120,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
        };
        let chart = new google.visualization.Gauge(document.getElementById('chart_div_1'));
        chart.draw(data, options);
    }
    //-----------------------------------------------------
    //						Disk
    //-----------------------------------------------------
    function drawChart_2() {
        let data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Disk', ddisk]
        ]);
        let options = {
            width: 400,
            height: 120,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
        };
        let chart = new google.visualization.Gauge(document.getElementById('chart_div_2'));
        chart.draw(data, options);
    }
    //-----------------------------------------------------
    //						Memory
    //-----------------------------------------------------
    function drawChart_3() {
        let data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Memory', mmem]
        ]);
        let options = {
            width: 400,
            height: 120,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
        };
        let chart = new google.visualization.Gauge(document.getElementById('chart_div_3'));
        chart.draw(data, options);
    }

    google.charts.load('current', {
        'packages': ['gauge']
    });
    $.ajax({
        type: "POST",
        url: base_url + "/server/server_info_process.php",
        datatype: "json",
        async: true,
        cache: false,
        success: function(response) {
            if (response.rlt_code === 1) {
                hhost = response.host;
                ipadddr = response.ip_addr;
                ccpu = Number(response.cpu);
                ddisk = Number(response.disk);
                mmem = Number(response.mem);
                google.charts.setOnLoadCallback(drawChart);
                google.charts.setOnLoadCallback(drawChart_2);
                google.charts.setOnLoadCallback(drawChart_3);
                $('.top_card').append("<h1>IP Address : " + ipadddr + "</h2>");
                $('.top_card').append("<h1> Host : " + hhost + "</h2>");
                let arr = response.dev;
                let capa = []; //Capacity
                let Fsystem = []; //Filesystem
                let mount_on = []; //Mounted_on
                let ava = []; //available
                let siz = []; //size
                let typ = []; //type
                let use = []; //used
                for (let a in response.dev) {
                    if (response.dev[a].Capacity !== 0) {
                        ava.push(response.dev[a].Available);
                        capa.push(response.dev[a].Capacity);
                        Fsystem.push(response.dev[a].Filesystem);
                        mount_on.push(response.dev[a].MountedOn);
                        siz.push(response.dev[a].Size);
                        typ.push(response.dev[a].Type);
                        use.push(response.dev[a].Used);
                    }
                }
                //------------------------------------------------------
                //                         append
                //------------------------------------------------------
                let tag_close = "</div>";
                let tag_open = "<div id='card";
                let shi = "'";
                let card_cont = "class='card_container'>";
                let card_item_flex = "class='card_item flex'>";
                let disk_flex_00 = "class='disk flex_00 disk_bg'>";
                let disk_img = "class='disk_img'>";
                let disk_info_flex_align = "class='disk_info flex_align'>";
                let diskflex_01 = "class='diskflex_01'>";
                let disk_info_txt_flex_align = "class='disk_info_txt flex_align'>";
                let disk_flex_01_disk_height_set = "class='disk flex_01 disk_height_set'>";
                let progress_height_set_progressbar_wrap = "class='progress_height_set progressbar_wrap'>";
                let progress_value = "class='progress_value' style='width:";
                let progress_context = "class='progress_context'>";
                let disk_flex_00_disk_height_set = "class='disk flex_00 disk_height_set'>";
                let flex_align_disk_height_set_toggle_disk_option = "class='flex_align disk_height_set toggle_disk_option'>option";
                let toggle_info = "class='toggle_info' data-toggle='false'>";
                let class_flex = "class='flex'>";
                let info_value_flex_00 = "class='info_value flex_00'>";
                let flex_align = "class='flex_align'>";
                let info_title_flex_00 = "class='info_title flex_00'>";
                let pbstyle = ["668de5", "71e096", "ffdc89", "ff9548", "ff4848"];
                for (let i in capa) {
                    let size_size = siz[i] / 1024;
                    let use_size = use[i] / 1024;
                    let ava_size = ava[i] / 1024
                    $("#card_main").append(tag_open + i + shi + card_cont);
                    $("#card" + i).prepend(tag_open + "_0_" + i + shi + card_item_flex);
                    $("#card_0_" + i).prepend(tag_open + "_1_" + i + shi + disk_flex_00);
                    $("#card_1_" + i).prepend(tag_open + "_2_" + i + shi + disk_img);
                    $("#card_2_" + i).prepend(tag_open + "_3_" + i + shi + disk_info_flex_align + tag_close);
                    $("#card_3_" + i).append(tag_close);
                    $("#card_2_" + i).append(tag_close);
                    $("#card_1_" + i).append(tag_close);
                    $("#card_1_" + i).after(tag_open + "_4_" + i + shi + diskflex_01);
                    $("#card_4_" + i).prepend(tag_open + "_5_" + i + shi + disk_info_txt_flex_align + "Disk#" + i + tag_close);
                    $("#card_5_" + i).append(tag_close);
                    $("#card_4_" + i).after(tag_open + "_6_" + i + shi + disk_flex_01_disk_height_set);
                    $("#card_6_" + i).prepend(tag_open + "_7_" + i + shi + progress_height_set_progressbar_wrap)
                    if (capa[i] >= 1 && capa[i] <= 20) {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" + ";background-color:#" + pbstyle[0] + shi + "\"" + ">");
                    } else if (capa[i] >= 21 && capa[i] <= 40) {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" + ";background-color:#" + pbstyle[1] + shi + "\"" + ">");
                    } else if (capa[i] >= 41 && capa[i] <= 60) {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" + ";background-color:#" + pbstyle[2] + shi + "\"" + ">");
                    } else if (capa[i] >= 61 && capa[i] <= 80) {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" + ";background-color:#" + pbstyle[3] + shi + "\"" + ">");
                    } else if (capa[i] > 81 && capa[i] <= 100) {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" + ";background-color:#" + pbstyle[4] + shi + "\"" + ">");
                    }
                    //-------------------------------------
                    if (capa[i] === 1) {
                        $("#card_8_" + i).prepend("<span id='one'>" + capa[i] + "%" + "</span>");
                    } else {
                        $("#card_8_" + i).prepend(tag_open + "_9_" + i + shi + progress_context + capa[i] + "%" + tag_close);
                    }
                    //-------------------------------------
                    $("#card_8_" + i).append(tag_close);
                    //-----------------------------------------------
                    $("#card_6_" + i).after(tag_open + "_10_" + i + shi + disk_flex_00_disk_height_set);
                    $("#card_10_" + i).prepend(tag_open + "_11_" + i + shi + flex_align_disk_height_set_toggle_disk_option + tag_close);
                    $("#card_10_" + i).append(tag_close);
                    $("#card_0_" + i).after(tag_open + "_12_" + i + shi + toggle_info);
                    $("#card_12_" + i).prepend(tag_open + "_13_" + i + shi + class_flex);
                    $("#card_13_" + i).prepend(tag_open + "_14_" + i + shi + info_value_flex_00);
                    $("#card_14_" + i).prepend(tag_open + "_15_" + i + shi + flex_align);
                    $("#card_15_" + i).prepend("<span id='mount_" + i + "'>Filesystem : </span>");
                    $("#mount_" + i).after("<span class='value_txt'>" + Fsystem[i] + "</span>");
                    $("#card_15_" + i).append(tag_close);
                    $("#card_14_" + i).append(tag_close);
                    $("#card_14_" + i).after(tag_open + "_16_" + i + shi + info_title_flex_00);
                    $("#card_16_" + i).prepend(tag_open + "_17_" + i + shi + flex_align);
                    $("#card_17_" + i).prepend("<span id='fsystem_" + i + "'>Type : </span>");
                    $("#fsystem_" + i).after("<span class='value_txt'>" + typ[i] + "</span>");
                    $("#card_17_" + i).append(tag_close);
                    $("#card_16_" + i).append(tag_close);
                    $("#card_16_" + i).after(tag_open + "_18_" + i + shi + info_value_flex_00);
                    $("#card_18_" + i).prepend(tag_open + "_19_" + i + shi + flex_align);
                    //-----------------------------------------------------------------------
                    //                      get_size
                    //-----------------------------------------------------------------------
                    $("#card_19_" + i).prepend("<span id='size_" + i + "'>Size : </span>");
                    if (size_size >= 1024) {
                        size_size = size_size / 1024;
                        $("#size_" + i).after("<span class='value_txt'>" + size_size.toFixed(1) + "GB" + "</span>");
                    } else if (size_size < 1024) {
                        $("#size_" + i).after("<span class='value_txt'>" + size_size.toFixed(1) + "MB" + "</span>");
                    }
                    //-----------------------------------------------------------------------
                    //                      get_size
                    //-----------------------------------------------------------------------
                    $("#card_19_" + i).append(tag_close);
                    $("#card_18_" + i).append(tag_close);
                    $("#card_18_" + i).after(tag_open + "_20_" + i + shi + info_value_flex_00);
                    $("#card_20_" + i).prepend(tag_open + "_21_" + i + shi + flex_align);
                    $("#card_21_" + i).prepend("<span id='used_" + i + "'>Use : </span>");
                    if (use_size >= 1024) {
                        use_size /= 1024;
                        $("#used_" + i).after("<span class='value_txt'>" + use_size.toFixed(1) + "GB" + "</span>");
                    } else if (use_size < 1024) {
                        $("#used_" + i).after("<span class='value_txt'>" + use_size.toFixed(1) + "MB" + "</span>");
                    }
                    // $("#used_" + i).after("<span class='value_txt'>" + use[i] + "</span>");
                    $("#card_21_" + i).append(tag_close);
                    $("#card_20_" + i).append(tag_close);
                    $("#card_20_" + i).after(tag_open + "_22_" + i + shi + info_value_flex_00);
                    $("#card_22_" + i).prepend(tag_open + "_23_" + i + shi + flex_align);
                    $("#card_23_" + i).prepend("<span id='free_" + i + "'>Free : </span>");
                    if (ava_size >= 1024) {
                        ava_size /= 1024;
                        $("#free_" + i).after("<span class='value_txt'>" + ava_size.toFixed(1) + "GB" + "</span>");
                    } else if (ava_size < 1024) {
                        $("#free_" + i).after("<span class='value_txt'>" + ava_size.toFixed(1) + "MB" + "</span>");
                    }
                    $("#card_23_" + i).append(tag_close);
                    $("#card_22_" + i).append(tag_close);
                    $("#card_22_" + i).after(tag_open + "_24_" + i + shi + info_value_flex_00);
                    $("#card_24_" + i).prepend(tag_open + "_25_" + i + shi + flex_align);
                    $("#card_25_" + i).prepend("<span id='aval_" + i + "'>Available : </span>");
                    $("#aval_" + i).after("<span class='value_txt'>" + capa[i] + "%" + "</span>");
                    $("#card_25_" + i).append(tag_close);
                    $("#card_24_" + i).append(tag_close);
                    $("#card_24_" + i).after(tag_open + "_26_" + i + shi + info_value_flex_00);
                    $("#card_26_" + i).prepend(tag_open + "_27_" + i + shi + flex_align);
                    $("#card_27_" + i).prepend("<span id='type_" + i + "'>Mounted on : </span>");
                    $("#type_" + i).after("<span class='value_txt'>" + mount_on[i] + "</span>");
                    $("#card_27_" + i).append(tag_close);
                    $("#card_26_" + i).append(tag_close);
                    $("#card" + i).append(tag_close);
                    $("#card_main").append(tag_close);
                }
                //--------------------------------------
                //          GOOGLE CHAR DRAW
                //--------------------------------------
                let aja_com = false;
                setInterval(function() {
                    if (aja_com) {
                        return;
                    }
                    aja_com = true;
                    $.ajax({
                        type: "POST",
                        url: base_url + "/server/server_info_process.php",
                        datatype: "json",
                        async: true,
                        cache: false,
                        success: function(response) {
                            if (response.rlt_code === 1) {
                                ccpu = Number(response.cpu);
                                ddisk = Number(response.disk);
                                mmem = Number(response.mem);
                                google.charts.setOnLoadCallback(drawChart);
                                google.charts.setOnLoadCallback(drawChart_2);
                                google.charts.setOnLoadCallback(drawChart_3);

                            } else {
                                $.alert("error code : " + response.rlt_code);
                                location.href = base_url;
                            }
                        },
                        error: function(error) {
                            $.alert('Sorry try again');
                            setTimeout(function() {
                                location.href = base_url;
                            }, 1000);
                        },
                        complete: function() {
                            aja_com = false;
                        }
                    });
                }, 1000);
            } else {
                $.alert("erro code : " + response.rlt_code);
                setTimeout(function() {
                    location.href = base_url;
                });
            }
        },
        error: function(error) {
            $.alert("sorry try again");
            setTimeout(function() {
                location.href = base_url;
            });
        }
    });

    //-------------------------------------------------------------------
    //                        End
    //-------------------------------------------------------------------
    // toggle option
    let info_switch = 0;
    $(document).on('click', ".toggle_disk_option", function() {
        let elements = $(this).parents(".card_container").find(".toggle_info");
        if (info_switch == 0) {
            elements.slideDown(230);
            info_switch = 1;
        } else {
            elements.slideUp(230);
            info_switch = 0;
        }
    });
    //---------------------------------
    //          SERVER
    //---------------------------------
    $('#Command').on('click', function() {
        go_command();
    });
    $('#ServerOff').on('click', function() {
        $.confirm({
            title: 'Server off!',
            content: 'Do you want Off Server?',
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
    $('#ServerRestart').on('click', function() {
        $.confirm({
            title: 'Server Restart!',
            content: 'Do you want Restart Server?',
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
    //---------------------------------
    //          MySql
    //---------------------------------
    $('#mysq_start').on('click', function() {
        $.confirm({
            title: 'MySQL Server Restart!',
            content: 'Do you want to Start MySQL Server?',
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
    $('#mysq_stop').on('click', function() {
        $.confirm({
            title: 'MySQL Server Off!',
            content: 'Do you want to Off MySQL Server?',
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
            title: 'MySQL Server Restart!',
            content: 'Do you want to Restart MySQL Server?',
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
    $('#mysq_status').on('click', function() {
        mysq_stat();
    });
    //---------------------------------
    //          Apache2
    //---------------------------------
    $('#apa_start').on('click', function() {
        $.confirm({
            title: 'Apache2 Server Start!',
            content: "Do you want to start Apache2 Server?",
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
    $('#apa_stop').on('click', function() {
        $.confirm({
            title: 'Apache2 Server Off!',
            content: "Do you want to Off Apache2 Server?",
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
            title: "Aaoche2 Server Restart",
            content: "Do you want to Restart Apache2 Server?",
            buttons: {
                confirm: function() {
                    apa_restart();
                },
                cancel: function() {
                    // $,alert('Canceled');
                }
            }
        });
    });
    $('#apa_status').on('click', function() {
        apa_stat();
    });
    $('#log_out').on('click', function() {
        log_out();
    });
    $(document).on('click', '#unroot', function() {
        go_command();
    });
    $(document).on('click', '#root', function() {
        go_command();
    });
});