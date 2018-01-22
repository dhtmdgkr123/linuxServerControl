/*
  @Author : dhtmdgkr123(Matas)
  @Created : 2018 - 01 - 09
  @Version : 1.0.0
*/
$(function()
{
	$(".article-wrap").hide();
	$(".article-wrap:first").show();
	$("ul.tabs li").click(function()
	{
		$("ul.tabs li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
		$(this).addClass("active").css("color", "darkred");
		$(".article-wrap").hide()
		var activeTab = $(this).attr("rel");
		$("#" + activeTab).fadeIn()
    });
});