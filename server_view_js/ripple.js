/*
* Author: Antonio Dal Sie
* Name: lv-ripple
* Description: Material ripple effects
*/
(function($,exports){

	var lvRipple = (function(){

		var elements = {
			enable: [],
			disable: []
		};

		var rippleEventArray = []; //single init ripple

		var rippleConfig = {
			'rippleOpacity': .2,
			'rippleDelay': 100,
			'mobileTouch': false
		};

		function findElement(){
			elements.enable = $("ripple, *[ripple], .ripple").toArray();
		}

		function arrayRemove(array,elem){
			var index = array.indexOf(elem);
			if (index > -1) {
			    delete array[index];
			}
			return arrayClear(array);
		}

		function arrayClear(array){
			return array.filter(function(n){ return n != undefined });
		}

		function _destroyElements(){
			$(elements.enable).each(function(index, el) {
				delete elements.enable[index];
				$(el).trigger('r-destroy');
			});
			elements.enable = arrayClear(elements.enable);
		}

		function _disableElements(){
			$(elements.enable).each(function(index, el) {
				delete elements.enable[index];
				$(el).trigger('r-disable');
				elements.disable.push(el);
			});
			elements.enable = arrayClear(elements.enable);
		}

		function _enableElements(){
			$(elements.disable).each(function(index, el) {
				delete elements.disable[index];
				$(el).trigger('r-enable');
				elements.enable.push(el);
			});
			elements.disable = arrayClear(elements.disable);
		}

		function _updateElements(){
			$(elements.enable).each(function(index, el) {
				$(el).trigger('r-update');
			});
		}

		function destroyElement(elem){
			elements.enable = arrayRemove(elements.enable,$(elem)[0]);
			$(elem).trigger('r-destroy');
		}

		function disableElement(elem){
			elements.enable = arrayRemove(elements.enable,$(elem)[0]);
			$(elem).trigger('r-disable');
			elements.disable.push($(elem)[0]);
		}

		function enableElement(elem){
			elements.disable = arrayRemove(elements.disable,$(elem)[0]);
			$(elem).trigger('r-enable');
			elements.enable.push($(elem)[0]);
		}

		function updateElement(elem){
			$(elem).trigger('r-update');
		}

		function createMarkup(element){
			var content = $(element).html();
			var markup = $("<button></button>");
			var overink = $(element).hasClass('r-overink');

			if(overink){
				markup = $("<div></div>");
				var replacement = $("<button></button>");
			}


			if($(element).prop('nodeName').toLowerCase() != "ripple"){
				var cloneElement = $(element).clone();
				$(cloneElement).empty();
				$(cloneElement).removeClass('ripple');
				$(cloneElement).removeAttr('ripple');
				$(cloneElement).removeAttr('data-ripple');
				$(cloneElement).removeAttr('lv-ripple');
				
				if(overink){
					replacement = $(cloneElement);
				}else{
					markup = $(cloneElement);
				}
			}

			markup.addClass('ripple-cont');

			if(overink){
				replacement.addClass('ripple-content');
				replacement.html(content);

				markup.append(replacement);
			}else{
				markup.append("<div class='ripple-content'>"+content+"</div>");
			}

			markup.append("<div class='ink-content'></div>");
			return markup[0].outerHTML;
		}

		function replaceElement(element,newType) {
        	var attrs = {};

	        el = $(element);

	        $.each(el[0].attributes, function(idx, attr) {
	            attrs[attr.nodeName] = attr.nodeValue;
	        });

	        el = $("<" + newType + "/>", attrs);

	        return el;
	    }

		function createAllElements(){
			$(elements.enable).each(function(index, el) {
				var markup = createMarkup(el);
				var idmark = $.now();
				markup = $(markup);
				markup.addClass("ripple-idm-"+idmark);

				$(el).after(markup).remove();
				markup = $(".ripple-idm-"+idmark);
				markup.removeClass("ripple-idm-"+idmark);

				elements.enable[index] = markup[0];
				rippleInit(markup[0],index);
			});
		}

		function createElement(elem){
			if($(elem).length <= 1){
				var markup = createMarkup(elem);
				var idmark = $.now();
				markup = $(markup);
				markup.addClass("ripple-idm-"+idmark);

				$(elem).after(markup).remove();
				markup = $(".ripple-idm-"+idmark);
				markup.removeClass("ripple-idm-"+idmark);

				var index = elements.enable.push(markup[0]);
				return rippleInit(markup[0],index);
			}else{
				$(elem).each(function(index, el) {
					return createElement(el);
				});
			}
		}

		function rippleInit(element,index){

			var elem = null;
			var rippleCont = null;
			var inkLight = false;
			var inkColor = false;
			var customOpacity = null;
			var icon = false;
			var overInk = false;
			var preventInk = false;
			var index = index;
			var longTouch = null;
			var scrollTouch = null;
			
			elem = $(element);
			element = elem[0];

			if(typeof PointerEventsPolyfill !== "undefined"){
				PointerEventsPolyfill.initialize({
					'selector': elem,
					'mouseEvents': ['click','dblclick']
				});
			}

			var listenType = {
				"start" : ('ontouchstart' in document.documentElement) 
						? !!rippleConfig.mobileTouch 
							? 'touchstart'
							: 'click'
						: 'mousedown',
				"end" : ('ontouchend' in document.documentElement) ? 'touchend' : 'mouseup'
			};

			rippleEventArray[index] = [];

			elem.on("r-destroy",function(){
				elem.children(".ink-content").remove();
				var cont = elem.find(".ripple-content").html();
				elem.find(".ripple-content").remove();
				elem.append(cont);
				elem.removeClass('ripple-cont');
				elem.unbind(listenType.start,createRipple);
			});

			elem.on("r-disable",function(){
				elem.unbind(listenType.start,createRipple);
			});

			elem.on("r-enable",function(){
				elem.bind(listenType.start,createRipple);
			});

			elem.on("r-update",function(){
				_setValue();
			});

			elem.removeClass('ripple');
			rippleCont = elem.children(".ink-content");

			function _setValue(){
				icon = elem.hasClass('r-icon');
				overInk = elem.hasClass('r-overink');
				inkLight = typeof element.attributes['r-light'] !== "undefined";
				inkColor = typeof element.attributes['r-color'] !== "undefined" ? element.attributes['r-color'].nodeValue : false;
				customOpacity = typeof element.attributes['r-opacity'] !== "undefined" ? element.attributes['r-opacity'].nodeValue : null;
				preventInk = typeof element.attributes['r-prevent'] !== "undefined" ? element.attributes['r-prevent'].nodeValue : false;
			}

			_setValue();

			elem.bind(listenType.start,createRipple);

			function createRipple(event){
				var timeStamp = event.timeStamp;

				if(timeStamp == 0){
					var date = new Date();
					timeStamp = date.getTime();
				}

				if(elem.hasClass('r-childprevent')) return elem.removeClass('r-childprevent');
				elem.parents(".ripple-cont").addClass('r-childprevent');

				if(rippleEventArray[index].indexOf(event.timeStamp) != -1)return;
				rippleEventArray[index].push(event.timeStamp);

				var targetInk = $(event.target);

				if(typeof element.attributes['r-disabled'] != "undefined" || elem.hasClass('disabled'))return;
				if(targetInk.hasClass('r-noink') || !!targetInk.parents('.r-noink').length)return;
				if(!!preventInk && elem.is(preventInk))return;

				if(!!overInk)rippleCont.show(0);

				var inkWrapper = $("<div class='ink'><i></i></div>");
				var ink = inkWrapper.find("i");
				var incr = 0;
				var incrmax = 0;

				rippleCont.find(".ink").removeClass('new');
				inkWrapper.addClass('new');

				rippleCont.prepend(inkWrapper);

				//Set x and y position inside ripple content
				var x = event.type != "touchstart" ? 
					event.pageX - rippleCont.offset().left : 
					event.originalEvent.touches[0].pageX - rippleCont.offset().left;

				var y = event.type != "touchstart" ? 
					event.pageY - rippleCont.offset().top :
					event.originalEvent.touches[0].pageY - rippleCont.offset().top;

				// if icon set default position: 50% 50%
				if(!icon){
					inkWrapper.css({top: y+'px', left: x+'px'});
					
					//Set translate of user from center of ripple content
					x = x > rippleCont.outerWidth()/2 ? x - rippleCont.outerWidth()/2 : rippleCont.outerWidth()/2 - x;
					y = y > rippleCont.outerHeight()/2 ? y - rippleCont.outerHeight()/2 : rippleCont.outerHeight()/2 - y;
				}else{
					x = 0;
					y = 0;
				}

				//Set total translate
				var tr = (x*2) + (y*2);

				var h = rippleCont.outerHeight();
				var w = rippleCont.outerWidth();

				//Set diagonal of ripple container
				var d = Math.sqrt(w * w + h * h);
				//Set incremental diameter of ripple
				var incrmax = tr;
				
				incrmax = icon ? 0 : incrmax;

				inkWrapper.css({height: d, width: d});

				ink.css("opacity",0);
				
				var inkOpacity = customOpacity || rippleConfig.rippleOpacity;

				if(!!inkColor){
					ink.css("background-color",inkColor);
				}else if(!!inkLight){
					ink.css("background-color","rgb(255,255,255)");
				}

				if(!icon){
					rippleCont.css("background-color",'rgba(0,0,0,'+.098+')');

					if(!!inkColor){
						var rgba = hexToRGB(inkColor);
						rippleCont.css("background-color",'rgba('+rgba.r+','+rgba.g+','+rgba.b+','+.098+')');
					}else if(!!inkLight){
						rippleCont.css("background-color",'rgba(255,255,255,'+.098+')');
					}
				}

				setTimeout(function(){
					inkWrapper.addClass('animate');
				},1);

				// ink.css({height: d+incr, width: d+incr});

				ink.css({opacity: inkOpacity});
				
				var inkGrow = null;

				function hoverIncrement(){
					var incrStep = ((incrmax - incr)/100)*10
					inkGrow = setInterval(function(){
						if(incr < incrmax){
							incr += incrStep;
							inkWrapper.css({
								height: d+incr,
								width: d+incr
							});
						}else{
							clearInterval(inkGrow);
						}
					},50);
				}
				
				function listenerPress(){
					$(window).bind(listenType.end+' blur', removeInk);
					elem.bind('mouseleave',removeInk);
				}

				function removeInk(){
					$(window).unbind(listenType.end+' blur', removeInk);
					elem.unbind('mouseleave', removeInk);

					clearInterval(inkGrow);
					clearInterval(longTouch);
					clearInterval(scrollTouch);

					var delay = incr <= incrmax ? rippleConfig.rippleDelay : 1;
					incr = incr < incrmax ? incrmax : incr;
					inkWrapper.css({
						height: d+incr,
						width: d+incr
					});
					setTimeout(function(){
						ink.css({
							opacity:0
						});
						if(!!inkWrapper.hasClass('new') && !icon)rippleCont.css("background-color","");
						setTimeout(function(){
							inkWrapper.remove();
							if(!!overInk && !rippleCont.find(".ink").length)rippleCont.hide(0);
						},550);
					},delay);
				}

				hoverIncrement();

				if(event.type == "mousedown" && event.which !== 1){
					setTimeout(function(){
						removeInk();
					},100);
				}else if(event.type == "click"){
					setTimeout(function(){
						removeInk();
					},300);
				}else if(event.type == "touchstart"){
					longTouch = setTimeout(function(){
						removeInk();
					},1000);
					$(window).bind('scroll',forceRemoveInk);
					scrollTouch = setTimeout(function(){
						$(window).unbind('scroll',forceRemoveInk);
					},500);
					listenerPress();
				}else{
					listenerPress();
				}
			}

			function _destroySelf(){
				elements.enable = arrayRemove(elements.enable,$(elem)[0]);
				elem.children(".ink-content").remove();
				var cont = elem.find(".ripple-content").html();
				elem.find(".ripple-content").remove();
				elem.append(cont);
				elem.removeClass('ripple-cont');
				elem.unbind('mousedown touchstart',createRipple);
			}

			function _disableSelf(){
				elements.enable = arrayRemove(elements.enable,$(elem)[0]);
				elem.unbind('mousedown touchstart',createRipple);
				elements.disable.push($(elem)[0]);
			}

			function _enebleSelf(){
				elements.disable = arrayRemove(elements.disable,$(elem)[0]);
				elem.bind('mousedown touchstart',createRipple);
				elements.enable.push($(elem)[0]);
			}
			
			return {
				element: elem,
				destroy: _destroySelf,
				disable: _disableSelf,
				enable: _enebleSelf,
				update: _setValue
			}
		}
		
		function hexToRGB(hex){

			var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
			var matches = patt.exec(hex);

			return {
				r:parseInt(matches[1], 16),
				g:parseInt(matches[2], 16),
				b:parseInt(matches[3], 16)
			};
		}
		
		function _init(config){
			!! config ? _setConfig(config) : $.noop();
			findElement();
			createAllElements();
		}

		function _initElement(elem){
			return !! elem ? createElement(elem) : createElement(this);
		}

		function _getList(){
			return elements;
		}

		function _getRippleEventArray(){
			return rippleEventArray;
		}

		function _setConfig(config){
			$.extend(rippleConfig, config);
		}

		function _findCommand(cmd){
			switch(cmd){
				case "enable": enableElement(this)
							break;
				case "disable": disableElement(this)
							break;
				case "destroy": destroyElement(this)
							break;
				case "update": updateElement(this)
							break;
				default: return _initElement(this);
						break;
			}
		}

		return {
			init: _init,
			initElement: _initElement,
			list: _getList,
			eventHistory: _getRippleEventArray,
			config: _setConfig,
			destroy: _destroyElements,
			disable: _disableElements,
			enable: _enableElements,
			update: _updateElements,
			switch: _findCommand
		}
	})();

	// exports.lvRipple = exports.lvRipple || lvRipple;
	$.ripple = lvRipple;
	$.fn.ripple = lvRipple.switch;
	

})(jQuery,window);