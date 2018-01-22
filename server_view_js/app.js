/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
//---------------------------------
//          SERVER
//---------------------------------
function go_command()
{
    $.ajax
    ({
        type: "POST",
        url: "/server_view_js/log_chk.php",
        datatype: "json",
        cache: false,
        async: true,
        success: function(response)
        {
            if (response.rlt_code === 1)
            {
                location.href="/view/input.php";
            }
            else
            {
                location.href="/";
            }
        },
        error: function(error)
        {
            alert("Sorry try again!");
        }
    });
}
function server_off()
{
	$.ajax
	({
		type: "POST",
		url: "/server/server_off.php",
		datatype: "json", 
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert("Success to shutdown Server");
				log_out();
			}
			else if(response.rlt_code === -1)
			{
                alert("Fail to connect Server");
                location.href="/";
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
function server_restart()
{
	$.ajax
	({
		type: "POST",
		url: "/server/server_restart.php",
		datatype: "json",
		async: true,
		success: function(response)
		{
			if(response.rlt_code === 1)
			{
				alert("Success to restart server");
				log_out();
			}
			else if(response.rlt_code === -1)
			{
                alert("Fail to connect Server");
                location.href="/";
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
//-----------------------------
//			MySQL
//-----------------------------
function mysq_off()
{
	$.ajax
	({
		type: "POST",
		url: "/my_sq/mysq_off.php",
		datatype: "json",
		//async: true,
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert(response.msg);
			}
			else if(response.rlt_code == -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry Try again!");
		}
	});
}
function mysq_start()
{
	$.ajax
	({
		type: "POST",
		url: "/my_sq/mysq_start.php",
		datatype: "json",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert(response.msg);
			}
			else if(response.rlt_code === -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
function mysq_stat()
{
	$.ajax
	({
		type: "POST",
		url: "/my_sq/mysq_stat.php",
		datatype: "json",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert(response.msg);
			}
			else if(response.rlt_code === -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
function mysq_restart()
{
	$.ajax
	({
		type: "POST",
		url: "/my_sq/mysq_restart.php",
		datatype: "json",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert(response.msg);
			}
			else if(response.rlt_code === -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
//-----------------------------
//			Apache
//-----------------------------
function apa_stat()
{
	$.ajax
	({
		type: "POST",
		url: "/apa/apa_stat.php",
		datatype: "json",
		success: function(response)
		{
			if(response.rlt_code === 1)
			{
				alert(response.rlt_msg);
			}
			else if(response.rlt_code === -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
function apa_off()
{
	$.ajax
	({
		type: "POST",
		url: "/apa/apa_off.php",
		datatype: "json",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert(response.msg);
			}
			else if(response.rlt_code === -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
function apa_restart()
{
	$.ajax
	({
		type: "POST",
		url: "/apa/apa_restart.php",
		datatype: "json",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert(response.msg);
			}
			else if(response.rlt_code === -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again");
		}
	});
}
function apa_start()
{
	$.ajax
	({
		type: "POST",
		url: "/apa/apa_start.php",
		datatype: "json",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				alert(response.msg);
			}
			else if(response.rlt_code === -1)
			{
				alert("Fail to connect Server");
			}
			else if(response.rlt_code === -2)
			{
				alert("Only root can do this");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
//---------------------------------
//             Other
//---------------------------------
function log_out()
{
	$.ajax
	({
		type: "POST",
		url: "/process/logout.php",
		success: function(response)
		{
			if(response.rel)
			{
				location.href = "/";
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
		}
	});
}
//---------------------------------
//          main
//---------------------------------
$(document).ready(function()
{
    $.ajax
    ({
        type: "POST",
        url: "/server_view_js/get_img.php",
        success: function(response)
        {
            if (response.rlt_code === 1)
            {
                if (response.member_id === "root")
                {
                    $("#select_img").prepend("<div id='root' class='flex_align logo_height_set logo_img'></div>");
                }
                else
                {
                    $("#select_img").prepend("<div id='unroot' class='flex_align logo_height_set logo_img'></div>");
                }
            }
            else
            {
                alert("errcode : " + response.rlt_code);
            }
        },
        error: function(error)
        {
            alert("sorry try again!");
        }
    });
    console.log('%cHello, color log!', 'color:red');
    console.log("Do you want this application's source?!!");
    console.log("http://matas-cs.tistory.com/");
    console.log("This is my blog~~ well come~");
    //-------------------------------------------------------------------
    //                        Start Draw Chart
    //-------------------------------------------------------------------
    var ccpu = 0;  //cpu_per
	var ddisk = 0; //disk_per
    var mmem = 0;  //memory_per
    //-----------------------------------------------------
    //						CPU
    //-----------------------------------------------------
    function drawChart()
    {
        //console.log('Chart1 callback');
        var data = google.visualization.arrayToDataTable
        ([
            ['Label', 'Value'],
            ['CPU', ccpu]
        ]);
        var options =
        {
            width: 400, height: 120,
            redFrom: 90, redTo: 100,
            yellowFrom:75, yellowTo: 90,
        };
        var chart = new google.visualization.Gauge(document.getElementById('chart_div_1'));
        chart.draw(data, options);
    }
    //-----------------------------------------------------
    //						Disk
    //-----------------------------------------------------
    function drawChart_2()
    {
        //console.log('Chart2 callback');
        var data = google.visualization.arrayToDataTable
        ([
            ['Label', 'Value'],
            ['Disk', ddisk]
        ]);
        var options =
        {
            width: 400, height: 120,
            redFrom: 90, redTo: 100,
            yellowFrom:75, yellowTo: 90,
        };
        var chart = new google.visualization.Gauge(document.getElementById('chart_div_2'));
        chart.draw(data, options);
    }
    //-----------------------------------------------------
    //						Memory
    //-----------------------------------------------------
    function drawChart_3()
    {
        //console.log('Chart3 callback');
        var data = google.visualization.arrayToDataTable
        ([
            ['Label', 'Value'],
            ['Memory', mmem]
        ]);
        var options =
        {
            width: 400, height: 120,
            redFrom: 90, redTo: 100,
            yellowFrom:75, yellowTo: 90,
        };
        var chart = new google.visualization.Gauge(document.getElementById('chart_div_3'));
        chart.draw(data, options);
    }

    google.charts.load('current', {'packages':['gauge']});
    $.ajax
    ({
        type: "POST",
        url: "/server/server_info_process.php",
        datatype: "json",
        async: true,
        success: function(response)
        {
            if (response.rlt_code === 1)
            {
                hhost = response.host;
                ipadddr = response.ip_addr;
                ccpu = Number(response.cpu);
                ddisk = Number(response.disk);
                mmem = Number(response.mem);
                google.charts.setOnLoadCallback(drawChart);
                google.charts.setOnLoadCallback(drawChart_2);
                google.charts.setOnLoadCallback(drawChart_3);
                console.log("IP ADDRESS : " + ipadddr);
                console.log("HOST : " + hhost);
                $('.top_card').append("<h1>IP Address : " + ipadddr + "</h2>");
                $('.top_card').append("<h1> Host : " + hhost + "</h2>");
                var arr = response.dev;
                var dev = [];       //dev seg
                var capa = [];      //Capacity
                var Fsystem = [];   //Filesystem
                var mount_on = [];  //Mounted_on
                var ava = [];       //available
                var siz = [];       //size
                var typ = [];       //type
                var use = [];       //used
                for (var a in arr)
                {
                    if (arr[a].Capacity !== 0)
                    {
                        //test logic
                        dev.push(arr[a]);
                    }
                }
                // console.log(dev);
                for (var b in dev)
                {
                    if (dev[b].Capacity !== 0)
                    {
                        //test logic
                        ava.push(dev[b].Available);        //available
                        capa.push(dev[b].Capacity);        //Capacity
                        Fsystem.push(dev[b].Filesystem);   //Filesystem
                        mount_on.push(dev[b].MountedOn);   //Mounted_on
                        siz.push(dev[b].Size);             //size
                        typ.push(dev[b].Type);             //type
                        use.push(dev[b].Used);             //used
                    }
                }
                //------------------------------------------------------
                //append 
                //------------------------------------------------------
                var tag_close = "</div>";
                var tag_open = "<div id='card";
                var shi = "'";
                var card_cont = "class='card_container'>";
                var card_item_flex = "class='card_item flex'>";
                var disk_flex_00 = "class='disk flex_00 disk_bg'>";
                var disk_img = "class='disk_img'>";
                var disk_info_flex_align = "class='disk_info flex_align'>";
                var diskflex_01 = "class='diskflex_01'>";
                var disk_info_txt_flex_align = "class='disk_info_txt flex_align'>";
                var disk_flex_01_disk_height_set = "class='disk flex_01 disk_height_set'>";
                var progress_height_set_progressbar_wrap = "class='progress_height_set progressbar_wrap'>";
                var progress_value = "class='progress_value' style='width:";
                var progress_context = "class='progress_context'>";
                var disk_flex_00_disk_height_set = "class='disk flex_00 disk_height_set'>";
                var flex_align_disk_height_set_toggle_disk_option = "class='flex_align disk_height_set toggle_disk_option'>option";
                var toggle_info = "class='toggle_info' data-toggle='false'>";
                var class_flex = "class='flex'>";
                var info_value_flex_00 = "class='info_value flex_00'>";
                var flex_align = "class='flex_align'>";
                var info_title_flex_00 = "class='info_title flex_00'>";
                var pbstyle = ["668de5","71e096","ffdc89","ff9548","ff4848"];
                for (var i = 0; i < capa.length; i++)
                {
                    var size_size = siz[i];
                    var use_size = use[i];
                    var ava_size = ava[i]
                    size_size /= 1024;
                    use_size /= 1024;
                    ava_size /= 1024;
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
                    //-----------------------------
                    //      test value
                    //      capa[i] += 70;
                    //-----------------------------
                    if (capa[i] >= 1 && capa[i] <= 20)
                    {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" +  ";background-color:#" + pbstyle[0] + shi + "\"" + ">");
                    }
                    else if (capa[i] >= 21 && capa[i] <= 40)
                    {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" +  ";background-color:#" + pbstyle[1] + shi + "\"" + ">");
                    }
                    else if (capa[i] >= 41 && capa[i] <= 60)
                    {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" +  ";background-color:#" + pbstyle[2] + shi + "\"" + ">");
                    }
                    else if (capa[i] >= 61 && capa[i] <= 80)
                    {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" +  ";background-color:#" + pbstyle[3] + shi + "\"" + ">");
                    }
                    else if (capa[i] > 81 && capa[i] <= 100)
                    {
                        $("#card_7_" + i).prepend(tag_open + "_8_" + i + shi + progress_value + capa[i] + "%" +  ";background-color:#" + pbstyle[4] + shi + "\"" + ">");
                    }
                    //-------------------------------------
                    if (capa[i] === 1)
                    {
                        $("#card_8_" + i).prepend("<span id='one'>" + capa[i] + "%"+ "</span>");
                    }
                    else
                    {
                        // $("#card_8_" + i).prepend("<span class='progress_context'>" + capa[i] + "%" + "</span>");
                        $("#card_8_" + i).prepend(tag_open + "_9_" + i + shi + progress_context + capa[i] + "%" + tag_close);
                    }
                    //-------------------------------------
                    // $("#card_8_" + i).prepend(tag_open + "_9_" + i + shi + progress_context + capa[i] + "%" + tag_close);
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
                    if (size_size >= 1024)
                    {
                        size_size = size_size / 1024;
                        $("#size_" + i).after("<span class='value_txt'>" + size_size.toFixed(1) + "GB" + "</span>");
                    }
                    else if(size_size < 1024)
                    {
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
                    if (use_size >= 1024)
                    {
                        use_size /= 1024;
                        $("#used_" + i).after("<span class='value_txt'>" + use_size.toFixed(1) + "GB" + "</span>");
                    }
                    else if(use_size < 1024)
                    {
                        $("#used_" + i).after("<span class='value_txt'>" + use_size.toFixed(1) + "MB" + "</span>");
                    }
                    // $("#used_" + i).after("<span class='value_txt'>" + use[i] + "</span>");
                    $("#card_21_" + i).append(tag_close);
                    $("#card_20_" + i).append(tag_close);
                    $("#card_20_" + i).after(tag_open + "_22_" + i + shi + info_value_flex_00);
                    $("#card_22_" + i).prepend(tag_open + "_23_" + i + shi + flex_align);
                    $("#card_23_" + i).prepend("<span id='free_" + i + "'>Free : </span>");
                    if (ava_size >= 1024)
                    {
                        ava_size /= 1024;
                        $("#free_" + i).after("<span class='value_txt'>" + ava_size.toFixed(1) + "GB" + "</span>");
                    }
                    else if(ava_size < 1024)
                    {
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
                    $("#card_26_" + i).prepend(tag_open + "_27_" + i +shi + flex_align);
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
                var aja_com = false;
                setInterval(function()
                {
                    if (aja_com)
                    {
                        return;
                    }
                    aja_com = true;
                    $.ajax
                    ({
                        type: "POST",
                        url: "/server/server_info_process.php",
                        datatype: "json",
                        async: true,
                        cache : false,
                        success: function(response)
                        {
                            if (response.rlt_code === 1)
                            {
                                ccpu = Number(response.cpu);
                                ddisk = Number(response.disk);
                                mmem = Number(response.mem);
                                //--------------------------------------------
                                //       TEST random val for gauge chart
                                //--------------------------------------------
                                // ccpu = 40 + Math.round(60 * Math.random());
                                // ddisk = 40 + Math.round(60 * Math.random());
                                // mmem = 40 + Math.round(60 * Math.random());
                                //--------------------------------------------
                                google.charts.setOnLoadCallback(drawChart);
                                google.charts.setOnLoadCallback(drawChart_2);
                                google.charts.setOnLoadCallback(drawChart_3);
                                // console.log("cpu : " + ccpu);
                                // console.log("Memeoy : " + mmem);
                                // console.log("Disk : " + ddisk);
                                
                            }
                            else
                            {
                                alert("error code : " + response.rlt_code);
                                location.href= "/";
                            }
                        },
                        error: function(error)
                        {
                            alert("sorry");
                            // location.href= "/view/input.php";
                        },
                        complete: function()
                        {
                            aja_com = false;
                        }
                    });
                }, 1000);
            }
            else
            {
                alert("erro code : " + response_rlt_code);
                location.href= "/";
            }
        },
        error: function(error)
        {
            alert("sorry");
            location.href= "/";
        }
    });

    //-------------------------------------------------------------------
    //                        End 
    //-------------------------------------------------------------------
    // toggle option
    var info_switch = 0;
    $(document).on('click', ".toggle_disk_option",function()
    {
        var elements = $(this).parents(".card_container").find(".toggle_info");
        if ( info_switch == 0 )
        {
            elements.slideDown(230);
            info_switch = 1;
        }
        else
        {
            elements.slideUp(230);
            info_switch = 0;
        };
    });
    //---------------------------------
    //          SERVER
    //---------------------------------
    $('#Command').click(function()
    {
        go_command();
    });
    $('#ServerOff').click(function()
    {
        var con_off = confirm("Do you want to Off Server?");
        if (con_off)
        {
            server_off();
        }
        else
        {
            return false;
        }
        
    });
    $('#ServerRestart').click(function()
    {
        var con_s_restart = confirm("Do you want to restart Server?");
        if (con_s_restart)
        {
            server_restart();
        }
        else
        {
            return false;
        }
        
    });
    //---------------------------------
    //          MySql
    //---------------------------------
    $('#mysq_start').click(function()
    {
        var con_m_start = confirm("Do you want to Start MySQL Server?");
        if (con_m_restart)
        {
            mysq_start();
        }
        else
        {
            return false;
        }
    });
    $('#mysq_stop').click(function()
    {
        var con_m_stop = confirm("Dp you want to Off MySQL Server?");
        if (con_m_stop)
        {
            mysq_off();
        }
        else
        {
            return false;
        }
    });
    $('#mysq_restart').click(function()
    {
        var con_m_restart = confirm("Do you want to Restart MySQL Server?");
        if (con_m_restart)
        {
            mysq_restart();
        }
        else
        {
            return false;            
        }
    });
    $('#mysq_status').click(function()
    {
    	mysq_stat();
    });
    //---------------------------------
    //          Apache2
    //---------------------------------
    $('#apa_start').click(function()
    {
        var con_a_start = confirm("Do you want to start Apache2 Server?");
        if (con_a_start)
        {
            apa_start();
        }
        else
        {
            return false;
        }
    });
    $('#apa_stop').click(function()
    {
        var con_a_stop = confirm("Do you want to Off Apache2 Server?");
        if (con_a_stop)
        {
            apa_off();
        }
        else
        {
            return false;
        }
    });
    $('#apa_restart').click(function()
    {
        var con_a_restart = confirm("Do you want to Restart Apache2 Server?");
        if (con_a_restart)
        {
            apa_restart();
        }
        else
        {
            return false;
        }
    });
    $('#apa_status').click(function()
    {
    	apa_stat();
    });
    $('#log_out').click(function()
    {
        log_out();
    });
});