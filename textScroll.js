/**
 * @name     基于jquery的跑马灯插件
 * @Author   zzc452@163.com [漂石]
 * @DateTime 2019-10-25
 */

/* 
	基于jquery的跑马灯插件，使用时先引入jquery插件
	用法：$('xx').textScroll({trigger:'mouseenter',speed:30});
	参数为一个对象，可缺省，trigger是一个字符串为触发方式，默认值为auto表示自动滚动，鼠标移入停止，可设置为mouseenter，此时为鼠标移入滚动，移出停止
	speed为数字表示滚动速度
*/

$.fn.textScroll = function(options){
	var options = options || {};
	var setting = {
		speed:30,
		trigger:'auto'
	};
	var setting = $.extend(setting,options);
	this.each(function(){
		var self = $(this);
		var width_outer = self.outerWidth();
		var width_inner = self.find('.inner').outerWidth();
		if(width_outer >= width_inner) return;
		$(this).append($(this).html());
		var timer1 = null,timer2 = null;
		function beginScroll(){
			var currentLeft = self.scrollLeft()
			timer1 = setInterval(function(){
				self.scrollLeft((currentLeft++));
				if(self.scrollLeft() >= width_inner){
					clearInterval(timer1);
					self.scrollLeft(0);
					beginScroll();
				}
			},setting.speed);
		};
		try {
			if(setting.trigger.toLowerCase() == 'auto'){
				beginScroll();
				$(this).on('mouseenter',function(){
					clearInterval(timer1);
					clearTimeout(timer2);
				})
				$(this).on('mouseleave',function(){
					timer2 = setTimeout(beginScroll,300);
				})
			}else if(setting.trigger.toLowerCase() == 'mouseenter'){
				$(this).on('mouseenter',function(){
					timer2 = setTimeout(beginScroll,300);
				})
				$(this).on('mouseleave',function(){
					clearInterval(timer1);
					clearTimeout(timer2);
				})
			}
		} catch(e) {
			throw new Error(e);
		}
	});
	
};