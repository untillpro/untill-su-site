(function($){
	$.fn.popup = function(options){ 
		current_popup = null;
		options = $.extend({
				time: 700,
				width: "",
				height: "",
				closeClass: "popup_close",
				closeText: "",
				bg: null, 
				cont: null,
				container: null, 
				close_button: null,
				close_callback: null,
				open_callback: null,
				show_close: true,
		}, options);

		elems = this;
		
		function init(){
			
			this.o = new Array();
			jQuery.extend(this.o, options);
			
			var obj = this;
			
			this.make = function(){
				var obj = this;
				$(obj).hide();
				
				obj.o.bg = document.createElement("div");
				$(obj.o.bg).hide().addClass("popup_bg").click(function(){
					obj.close();
				});
				
				obj.o.cont = document.createElement("div");
				$(obj.o.cont).hide().addClass("popup_cont");
				
				obj.o.container = document.createElement("div");
				$(obj.o.container).addClass("popup_container");
				
				if(obj.o.width != ""){
					$(obj.o.container).width(obj.o.width);
				}
				
				if(obj.o.height != ""){
					$(obj.o.ontainer).height(obj.o.height);
				}
				
				
				if(obj.o.show_close){
					obj.o.close_button = document.createElement("div");
					
					if(obj.o.closeClass != ""){
						$(obj.o.close_button).addClass(obj.o.closeClass);
					} else {
						$(obj.o.close_button).addClass("popup_close");
					}
					
					if(obj.o.closeText != ""){
						$(obj.o.close_button).html(obj.o.closeText);
					}
					
					$(obj.o.close_button).click(function(){
						obj.close();
					});
				}

				var clone = $(obj).clone();
				
				$(obj.o.container).prepend(obj.o.close_button);
				$(obj.o.container).append(clone);
				
				$(obj.o.cont).prepend(obj.o.bg).append(obj.o.container);
				
				$(clone).show();
				
				$(document.body).prepend(obj.o.cont);

				obj.open();
				$(obj.o.container).addClass('opened');
			};

			this.close = function(){
				var obj = this;
				
				$(obj.o.container).removeClass('opened');
				
				$(obj.o.bg).fadeTo(obj.o.time, 0, function(){
					$(this).remove();
				});
				
				$(obj.o.cont).fadeTo(obj.o.time,0, function(){
					$(this).remove();
					
					if(obj.o.close_callback != null){
						obj.o.close_callback();
					}
					
					$(".page_wrapper").removeClass("fixed").css("top", "0px");
					
					$(window).scrollTop(obj.o.scroll_top);
				});
				
				current_popup = null;
			}
			
			this.open = function(){
				var obj = this;
			
				if(current_popup != null){
					current_popup.close();
					
					setTimeout(function(){
						current_popup = obj;
						
						$(obj.o.bg).fadeTo(obj.o.time, 1, function(){});
						$(obj.o.cont).fadeTo(obj.o.time, 1, function(){
							if(obj.o.open_callback != null){
								obj.o.open_callback();
							}
						});
					}, 1000);
				} else {
					current_popup = obj;
					
					$(obj.o.bg).fadeTo(obj.o.time, 1, function(){});
					$(obj.o.cont).fadeTo(obj.o.time, 1, function(){
						if(obj.o.open_callback != null){
							obj.o.open_callback();
						}
					});
					
					obj.o.scroll_top = $(window).scrollTop();
			
					if(obj.o.scroll_top > 0){
						$(".page_wrapper").css("top", -obj.o.scroll_top + "px");
						$(window).scrollTop(0);
					}
					
					$(".page_wrapper").addClass('fixed');
				}
			}
			
			this.setOpenCallback = function(callback){
				this.o.open_callback = callback;
			}			
			
			this.setCloseCallback = function(callback){
				this.o.close_callback = callback;
			}
			
			this.make();
		}
		
		return this.each(init);
	}
})(jQuery);
