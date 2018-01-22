/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
function login()
{
	$.ajax
	({
		type: "POST",
		url: "/process/auth.php",
		dataType: "json",
		data: {
				'server_add': $("input[name='server_add']").val(),
				'server_port': $("input[name='server_port']").val(),
				'member_id': $("input[name='member_id']").val(),
				'member_pw': $("input[name='member_pw']").val()
			  },
		success: function(response)
		{
			if (response.rlt_code === 0)
			{
				location.href = '/view/input.php';
				console.log("success");
			}
			else if(response.rlt_code === 2)
			{
				alert("Fail to log in please check id or password");
			}
			else if(response.rlt_code === 1)
			{
				alert("Fail to connect Server");
			}
		},
		error: function(error)
		{
			alert("Sorry try again!");
			//console.log(error.rlt_code);
		}
	});
}
$(document).ready(function()
{
    console.log("%cHello admin~ below that link is my blog~",'color: blue;font-size:50px');
    console.log("%chttp://matas-cs.tistory.com/",'color: #ed5406;font-size:50px');
    console.log("%cIf you want to get this web's sourcecode visit my github~",'color: blue;font-size:50px')
	console.log("%chttps://github.com/dhtmdgkr123",'color:#2bb34a;font-size:50px');
	$('#login').click(function()
	{
		login();
	});
	$("#password").on('keypress', function(e)
	{
		if (e.keyCode === 13)
		{
			login();
		}
	});
});
