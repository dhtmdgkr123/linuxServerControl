/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
//-----------------------------
//			server
//-----------------------------
var savepath;
function server_stat()
{
	$.ajax
	({
		type: "POST",
		url: "/server/server_info_process.php",
		datatype: "json",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				location.href="/view/server_info_view.php";
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
			else if(response.rlt_code === -3)
			{
				alert("Please install sysstat");
			}
			else if(response.rlt_code === -4)
			{
				alert("Please install bc");
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
                console.log(response.msg);
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
//-----------------------------
//			  Other
//-----------------------------
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
function cmdprocess()
{
	var clear_find = $('#proc').val();
	if (~clear_find.indexOf('clear'))
	{
		$('#console').empty();
        $('#console').append(document.createTextNode(savepath));
	}
	else if(~clear_find.indexOf('halt'))
	{
		var halt_real = confirm("Do you want to shutdown your Server?");
		if (halt_real)
		{
			server_off();
		}
		else
		{
			return false;
		}
    }
	else if(~clear_find.indexOf('shutdown'))
	{
        var halt_real = confirm("Do you want to shutdown your Server?");
		if (halt_real)
		{
			server_off();
		}
		else
		{
			return false;
		}
	}
	else if(~clear_find.indexOf('top'))
	{
		$('#console').append(clear_find);
		$('#console').append("\n");
		$('#console').append( document.createTextNode("Can't do this command on this service\n"));
		$('#console').append(savepath);
		$('#console').scrollTop($('#console').prop('scrollHeight'));
	}
	else if(~clear_find.indexOf('vi'))
	{
		$('#console').append(clear_find);
		$('#console').append("\n");
		$('#console').append( document.createTextNode("Can't do this command on this service\n"));
		$('#console').append(savepath);
		$('#console').scrollTop($('#console').prop('scrollHeight'));
	}
	else if(~clear_find.indexOf('rm'))
	{
		var rm_con = confirm("Do you want to remove?");
		if (rm_con)
		{
			$.ajax
			({
				type: "POST",
				url: "/process/cmdprocess.php",
				datatype: "json",
				data: 
				{
					'cmd' : clear_find
				},
				success: function(response)
				{
					if (response.rlt_code === 1)
					{
                        var rlt = response.rlt_msg;
						$('#console').append(clear_find);
						$('#console').append("\n");
						$('#console').append( document.createTextNode(rlt));
						$('#console').append("\n");
						$('#console').append(savepath);
						$('#console').scrollTop($('#console').prop('scrollHeight'));
					} 
					else if(response.rlt_code === -1)
					{
						$('#console').append(clear_find);
						$('#console').append("\n");
						$('#console').append( document.createTextNode("Fail to connect server\n"));
						$('#console').append(savepath);
						$('#console').scrollTop($('#console').prop('scrollHeight'));
					}
					else if(response.rlt_code === -2)
					{
                        var rlt = response.rlt_msg;
						$('#console').append(clear_find);
						$('#console').append("\n");
						$('#console').append( document.createTextNode(rlt));
						$('#console').append("\n");
						$('#console').append(savepath);
						$('#console').scrollTop($('#console').prop('scrollHeight'));
					}
				},
				error: function(error)
				{
					$('#console').append(clear_find);
					$('#console').append("\n");
					$('#console').append( document.createTextNode("Sorry try again!\n"));
					$('#console').append(savepath);
					$('#console').scrollTop($('#console').prop('scrollHeight'));
				}
			});
		}
		else
		{
			return false;
		}
	}
	else
	{
		$.ajax
		({
			type: "POST",
			url: "/process/cmdprocess.php",
			datatype: "json",
			data: 
			{
				'cmd' : clear_find
			},
			success: function(response)
			{
                var rlt = response.rlt_msg;
				if (response.rlt_code === 1)
				{
                    $('#console').append(clear_find);
					$('#console').append("\n");
					$('#console').append( document.createTextNode(rlt));
					$('#console').append("\n");
					$('#console').append(savepath);
					$('#console').scrollTop($('#console').prop('scrollHeight'));
				} 
				else if(response.rlt_code === -1)
				{
					$('#console').append(clear_find);
					$('#console').append("\n");
					$('#console').append( document.createTextNode("Fail to connect server\n"));
					$('#console').append(savepath);
					$('#console').scrollTop($('#console').prop('scrollHeight'));
				}
				else if(response.rlt_code === -2)
				{
					$('#console').append(clear_find);
					$('#console').append("\n");
					$('#console').append( document.createTextNode(rlt));
					$('#console').append(savepath);
					$('#console').scrollTop($('#console').prop('scrollHeight'));
                }
                else if(~clear_find.indexOf('undefind'))
                {
                    $('#console').append(clear_find);
					$('#console').append("\n");
					$('#console').append( document.createTextNode("Fail to connect server\n"));
					$('#console').append(savepath);
					$('#console').scrollTop($('#console').prop('scrollHeight'));
                }
                else
                {
					$('#console').append(clear_find);
					$('#console').append("\n");
					$('#console').append( document.createTextNode(rlt));
					$('#console').append("\n");
					$('#console').append(savepath);
					$('#console').scrollTop($('#console').prop('scrollHeight'));
                }
			},
			error: function(error)
			{
				$('#console').append(clear_find);
				$('#console').append("\n");
				$('#console').append( document.createTextNode("Sorry try again!\n"));
				$('#console').append(savepath);
				$('#console').scrollTop($('#console').prop('scrollHeight'));
			}
		});
	}
}
function get_pwd()
{
	$.ajax
	({
		type: "POST",
		url: "/input_css/get_pwd.php",
		success: function(response)
		{
			if (response.rlt_code === 1)
			{
				savepath = response.pwd
				$('#console').append(response.pwd);
			}
			else if(response.rlt_code !== 1)
			{
				$('#console').append("Sorry Press F5 key");
			}
		},
		error: function(error)
		{
			$('#console').append("Sorry Press F5 key");
		}
	});
}
$(window).load(function()
{
    get_pwd();
    console.log("%cHello~ below that link is my blog~",'color: blue;font-size:50px');
    console.log("%chttp://matas-cs.tistory.com/",'color: #ed5406;font-size:50px');
    console.log("%cIf you want to get this web's sourcecode visit my github~",'color: blue;font-size:50px')
	console.log("%chttps://github.com/dhtmdgkr123",'color:#2bb34a;font-size:50px');
	//----------------------------------
	//			    server
	//----------------------------------
	$('#server_stat').click(function()
	{
        server_stat();
	});
	$('#server_off').click(function()
	{
		var ser_off = confirm("Do you want to shutdown Server?");
		if (ser_off)
		{
			server_off();
		}
		else
		{
			return false;
		}
	});
	$('#server_restart').click(function()
	{
		var ser_restart = confirm("Do you want to restart Server?");
		if (ser_restart)
		{
			server_restart();
		}
		else
		{
			return false;
		}
	});
	//----------------------------------
	//			     MySql
	//----------------------------------
	$('#mysq_start').click(function()
	{
		var my_start = confirm("Do you want to start MySQL?");
		if (my_start)
		{
			mysq_start();
		}
		else
		{
			return false;
		}
	});
	$('#mysq_off').click(function()
	{
		var my_off = confirm("Do you want to shutdown MySQL?");
		if (my_off)
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
		var my_restart = confirm("Do you want to restart MySQL?");
		if(my_restart)
		{
			mysq_restart();
		}
		else
		{
			return false;
		}
	});
	$('#mysq_stat').click(function()
	{
		mysq_stat();
	});
	//----------------------------------
	//			   Apache
	//----------------------------------
	$('#apa_start').click(function()
	{
		var ap_start = confirm("Do you want to start Apache2?");
		if (ap_start)
		{
			apa_start();
		}
		else
		{
			return false;
		}
	});
	$('#apa_off').click(function()
	{
		var ap_off = confirm("Do you want to shutdown Apache2?");
		if (ap_off)
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
		var ap_restart = confirm("Do you want to restart Apache2?");
		if (ap_restart)
		{
			apa_restart();
		}
		else
		{
			return false;
		}
	});
	$('#apa_stat').click(function()
	{
		apa_stat();
	});
	$('#log_out').click(function()
	{
		log_out();
	});
	$('#proc_btn').click(function()
	{
		cmdprocess();
		$('#proc').val("");
	});
	$('#res_btn').click(function()
	{
		$('#proc').val("");
	});
});
$(document).ready(function()
{
	$("#proc").on('keypress', function(e)
	{
		if (e.keyCode === 13)
		{
			cmdprocess();
			$('#proc').val("");
		}
	});
});