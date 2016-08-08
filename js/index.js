$(function(){

	$('#dowebok').fullpage({
		scrollingSpeed: 400,
		css3: true,
		resize: true,
		anchors: ["page1","page2","page3","page4","page5"],
		verticalCentered: false,
		afterLoad: function(anchorLink,index){
			if(index==1){
				$("#home").css({"display":"block"}).addClass("home_zoom");	//第一页主页面变为不透明，背景图变化
				$("aside").css({"top":($(".active").height()-$("aside").height())/2});	//侧边栏定高
				$("header").before("<div id='header' style='opacity:0'></div>");
				$("#home_head").css({"margin-top":"80px"});		//头像margin-top改变
				$("aside a").eq(0).addClass("selected").siblings().removeClass("selected");
				$("header").animate({opacity:"1"},1000,function(){
					$("#header").css({"opacity":"0.3"});
					$("#home_info1").fadeIn(500,function(){
						$(this).next().animate({width:"800px"},500,function(){
							$("#home_info2").fadeIn(200,function(){
								$(this).next().fadeIn(200,function(){
									$(this).next().fadeIn(200,function(){
										$(this).next().fadeIn(200,function(){
											$(this).next().fadeIn(200,function(){
												$("aside").fadeIn(30);
											});
										});
									});
								});
							});
						});
					});
				});


			}
			if(index==2){
				$("aside a").eq(1).addClass("selected").siblings().removeClass("selected");
				$("#about_content h1").after("<div class='title_en'><h2>· About me ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});
				$("#about_list_content").css({"opacity":"1"});
				$("#about_info").animate({width:"800px",marginTop:"0",marginBottom:"0"},700,'easeOutElastic',function(){
					$("#about_info p").eq(0).animate({bottom:"0"},500,function(){
						$("#about_info p").eq(1).animate({bottom:"0"},500,function(){
							$("#about_info p").eq(2).animate({bottom:"0"},500,function(){
								$("#about_info p").eq(3).animate({bottom:"0"},500);
							});
						});
					});
				});
			}
			if(index==3){
				$("aside a").eq(2).addClass("selected").siblings().removeClass("selected");
				$("#skill_content h1").after("<div class='title_en'><h2>· Skill ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});
				$(".skill_list_content").addClass("skill_scale");

				$(".progress-ring").hover(function(){
					$(this).siblings(".skill_int").slideDown(400);
					$(this).siblings(".skill_flag").addClass("skill_flag_scale");
				},function() {
					$(this).siblings(".skill_int").slideUp(50);
					$(this).siblings(".skill_flag").removeClass("skill_flag_scale");
				});

				$(".progress-ring").loadingRing();
			}

			if(index==4){
				$("aside a").eq(3).addClass("selected").siblings().removeClass("selected");
				$("#demo_content h1").after("<div class='title_en'><h2>· Demo ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});
				var i=-1;
				$(".demo_scale").each(function() {
					var $this=$(this);
					if(!$this.hasClass("b_to_t")){
						i++;
						setTimeout(function(){
							$this.addClass("b_to_t");
						},200*i);
					}
				})
			}
			if(index==5){
				$("aside a").eq(4).addClass("selected").siblings().removeClass("selected");
				$("#contact_content h1").after("<div class='title_en'><h2>· Contact me ·</h2></div>");
				$(".title_en").animate({width:"130px"},800,function(){
					$(".title_en h2").slideDown(400);
				});
				var i=-1;
				$("#contact_head1").addClass("b_to_t");
				$("#contact_head2 span").each(function(){
					var $this=$(this);
					if(!$this.hasClass("fade_in")){
						i++;
						setTimeout(function(){
							$this.addClass("fade_in");
						},400*i);
					}
				});
				var j=-1;
				setTimeout(function(){
					$(".contact_scale").each(function(){
						var $this=$(this);
						if(!$this.hasClass("fade_in")){
							j++;
							setTimeout(function(){
								$this.addClass("fade_in");
							},500*j);
						}
					});
				},70);
			}
		},
		onLeave:function(index , nextIndex, direction){
			if(index==2||index==3||index==4||index==5){
				$(".title_en").remove();
			}
		}
	});


	$.ajax({
		type: "GET",
		url: "ajax/message.json",
		dataType: "json",
		success: function(data){
			for(var i in data.about_info){
				$("#about_info").append("<p>"+data.about_info[i]+"</p>");
			}
			$("#skill_info").append("<p>"+data.skill_info+"</p>");
			$(".skill_int").append("<ul></ul>");
			for(var i in data.html){
				$("#skill_int1 ul").append("<li>"+data.html[i]+"</li>");
			}
			for(var i in data.css){
				$("#skill_int2 ul").append("<li>"+data.css[i]+"</li>");
			}
			for(var i in data.javaScript){
				$("#skill_int3 ul").append("<li>"+data.javaScript[i]+"</li>");
			}
			for(var i in data.jQuery){
				$("#skill_int4 ul").append("<li>"+data.jQuery[i]+"</li>");
			}
			for(var i in data.contact_info){
				$("#contact_info").append("<p>"+data.contact_info[i]+"</p>");
			}
		}
	});
});

(function ($) {
	$.fn.loadingRing = function () {
		var defaultOpt = {
			trackColor: '#f0f0f0',
			progressColor: '#6ec84e',
			precent: 75,
			duration: 1500
		}; // 默认选项
		$(this).each(function () {
			var $target = $(this);
			var color = $target.data('color'); // 颜色
			var precent = parseInt($target.data('precent'), 10); // 百分比
			var duration = parseFloat($target.data('duration'), 10) * 1000; // 持续时间
			var trackColor, progressColor;
			if (color && color.split(',').length === 2) {
				var colorSet = color.split(',');
				trackColor = colorSet[0];
				progressColor = colorSet[1];
			} else {
				trackColor = defaultOpt.trackColor;
				progressColor = defaultOpt.progressColor;
			}
			if (!precent)
				precent = defaultOpt.precent;
			if (!duration)
				duration = defaultOpt.duration;

			$target.append('<div class="progress-track"></div><div class="progress-left"></div><div class="progress-right"></div><div class="progress-cover"></div><div class="progress-text"><span class="progress-num">' + precent +'</span><span class="progress-percent">%</span></div>');

			var x = $target.find('.progress-cover').height(); // 触发 Layout
			// http://stackoverflow.com/questions/12088819/css-transitions-on-new-elements

			$target.find('.progress-track, .progress-cover').css('border-color', trackColor);
			$target.find('.progress-left, .progress-right').css('border-color', progressColor);

			$target.find('.progress-left').css({
				'transform': 'rotate(' + precent * 3.6 + 'deg)',
				'-o-transform': 'rotate(' + precent * 3.6 + 'deg)',
				'-ms-transform': 'rotate(' + precent * 3.6 + 'deg)',
				'-moz-transform': 'rotate(' + precent * 3.6 + 'deg)',
				'-webkit-transform': 'rotate(' + precent * 3.6 + 'deg)',
				'transition': 'transform ' + duration + 'ms linear',
				'-o-transition': '-o-transform ' + duration + 'ms linear',
				'-ms-transition': '-ms-transform ' + duration + 'ms linear',
				'-moz-transition': '-moz-transform ' + duration + 'ms linear',
				'-webkit-transition': '-webkit-transform ' + duration + 'ms linear'
			});

			if (precent > 50) {
				var animation = 'toggle ' + (duration * 50 / precent) + 'ms';
				$target.find('.progress-right').css({
					'opacity': 1,
					'animation': animation,
					'animation-timing-function': 'step-end'
				});
				$target.find('.progress-cover').css({
					'opacity': 0,
					'animation': animation,
					'animation-timing-function': 'step-start'
				});
			}
		});
	};
})(jQuery);
