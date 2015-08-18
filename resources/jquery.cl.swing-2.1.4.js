 /*!
 * jQuery swing UI Plugin v2.1.4
 *
 * charset utf-8
 *
 * Copyright (c) 2014 coooliang
 * Released under the MIT license
 *
 * Date: Thu Aug 15 2015 19:11:12
 */


//----plugins----//
(function($){
	$.extend({
		jsafestring:function(t){
			return !!t?t:'';
		},
		jsafenumber:function(t){
			return !!t?parseInt(t):0;
		}
	});
	$.fn.extend({
		jbutton:function(){
			return new JButton();
			$(this).addClass("cl-swing-button");
		}
	});
})(jQuery)

var JSwingOptions = {
	JFontDefault : 'SimSun',
	JFontSizeDefault: '12',

    JControlStateNormal : '0',     
    JControlStateHighlighted : '1'
}

var JSwingUIOptions = {
	JLabelDefaultFrame : new JRectMake(0,0,60,20),
	JButtonDefaultFrame : new JRectMake(0,0,60,20),
	JPanelDefaultFrame : new JRectMake(0,0,400,200),
	JLabelDefaultText : 'JLabel',
	JButtonDefaultText : 'JButton',
	JPanelDefaultText : 'JPanel',
	JMessageBoxDefaultText : 'JMessageBox',
	JMessageBoxDefaultMsg : 'JMessageBoxMsg',
	JMessageBoxDefaultFrame : new JRectMake(0,0,250,64)
}

window.add = function (d,t){
	var $target = !!$target?$(t):$("body");
	$target.append(d.$ho);
}

//Frame
function JRectMake(x,y,w,h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	this.toString = function(){
		return '{x:' + this.x + ',y:' + this.y + ',width:'+this.width+',height:' + this.height +'}';
	}
	return this;
}

//----ui----//
function JObject(){
	this.className = 'JObject';
	this.$ho = $("<div/>");
	this.$ho.css('position','absolute');

	this.setOrigin = function(x,y){
		this.$ho.css({'left':x,'top':y});
	}
	this.setSize = function(w,h){
		this.$ho.css({'width':w,'height':h});
		this.$ho.css('line-height', h+'px');
	}

	this.css = function(k,v){
		if(!!k && !!v && typeof(k)=='string' && typeof(v)=='string'){
			this.$ho.css(k,v);
		}else{
			this.$ho.css(k);
		}
	}

	this.addClass = function(cl){
		this.$ho.addClass(cl);
	}

	this.click = function(callback){
		var tt = this;
		this.$ho.click(function(){
			if(event.target == event.currentTarget)callback(tt);
		});
	}
	this.addClickListener = function(callback){
		var tt = this;
		this.$ho.click(function(){
			if(event.target == event.currentTarget)callback(tt);
		});
	}

	this.add = function(obj){
		this.$ho.append(obj.$ho);
	}

	this.toString = function(){
		return '{ className:' + this.className + ' }';
	}

	return this;
}
//------------end of JObject---------------//



function JLabel(t,f){
	JObject.call(this);
	
	f = !!f?f:JSwingUIOptions.JLabelDefaultFrame;
	t = !!t?t:JSwingUIOptions.JLabelDefaultText;

	this.frame = f;
	this.title = t;
	this.className = 'JLabel';
	this.font = JSwingOptions.JFontDefault;
	this.fontSize = JSwingOptions.JFontSizeDefault;

	this.$ho.css('text-align','center');
	this.$ho.html($.jsafestring(t));

	this.getFrame = function(){
		return this.frame;
	}
	this.setFrame = function(f){
		this.$ho.css({'left':f.x,'top':f.y,'width':f.width-2,'height':f.height-2});
		this.$ho.css('line-height', f.height+'px');
	}

	if(!!f){
		this.setFrame(f);
	}else{
		$.error("you have a JLabel didn't set frame");
	}

	this.getTitle = function(){
		return this.title;
	}
	
	this.setTitle = function(t){
		this.$ho.html(($.jsafestring(t)));
	}

	this.getTitleColor = function(){
		return this.titleColor;
	}
	this.setTitleColor = function(c){
		this.titleColor = c;
		this.$ho.css('color',c);
	}

	this.getFont = function(){
		return this.font;
	}
	this.setFont = function(f){
		this.font = f;
		this.$ho.css({'font-family':f});
	}

	this.getFontSize = function(){
		return this.fontSize;
	}
	this.setFontSize = function(fs){
		this.fontSize = fs;
		this.$ho.css({'font-size':fs+'px'});
	}

	this.toString = function(){
		return '{ className:' + this.className + ' }';
	}

	return this;
}

function JButton(t,f){
	f = !!f?f:JSwingUIOptions.JButtonDefaultFrame;
	t = !!t?t:JSwingUIOptions.JButtonDefaultText;

	JLabel.call(this,t,f);

	this.className = 'JButton';
	this.title = t;
	this.frame = f;

	var btnHtml = '<table border="0" cellpadding="0" cellspacing="0" style="width:'+this.frame.width+'px;height:'+this.frame.height+'px">'+
					'<tbody><tr><td class="x-btn-left"><i>&nbsp;</i></td><td class="x-btn-center"><em unselectable="on">'+
					'<button class="x-btn-text" type="button">'+this.title+'</button></em></td><td class="x-btn-right"><i>&nbsp;</i></td></tr></tbody></table>';
	this.$ho.html(btnHtml);
	this.$ho.css('user-select','none');
	this.$ho.addClass('x-btn-wrap x-btn');

	this.$ho.hover(function(){
		$(this).addClass('x-btn-over');
	},function(){
		$(this).removeClass('x-btn-over');
		$(this).removeClass('x-btn-click');
	});

	this.$ho.mousedown(function(){
		$(this).addClass('x-btn-click');
	});
	this.$ho.mouseup(function(){
		$(this).removeClass('x-btn-click');
	});


	return this;
}

/*
*
* params: 
* p image's path
* f image's frame
*
*/
function JImage(p,f){
	
	JObject.call(this,f);


	return this;
}

function JPanel(t,f){
	JObject.call(this);

	f = !!f?f:JSwingUIOptions.JPanelDefaultFrame;
	t = !!t?t:JSwingUIOptions.JPanelDefaultText;

	//init
	var containerHtml = '<div class="container">'+
						'<div class="x-panel">'+
							'<div class="x-panel-header">'+
								'<div class="x-tool">&nbsp;</div>'+
								'<span class="x-panel-header-text">'+ t +'</span>'+
							'</div>'+
							'<div class="x-panel-bwrap">'+
								'<div class="x-panel-body"></div>'+
							'</div>'+
						'</div>'+
					'</div>';
	this.$ho.append(containerHtml);
	this.$ho.addClass("cl-swing-panel");

	this.title = t;
	this.frame = f;


	//private method
	this.initHover = function(){
		var $x_tool = $(".x-tool",this.$ho);
		$x_tool.css({'user-select':'none'});
		$x_tool.hover(function(){
			$(this).css('background-position','-15px -60px');
		},function(){
			$(this).css('background-position','0px -60px');
		});
		var x_panel_bwrap_height = $(".x-panel-body",this.$ho).height();
		$x_tool.click(function(){
			var top = parseInt($(".x-panel-body",this.$ho).css('top'))
			if(top < 0){
				$x_tool.css('background-position','0 -60px');
				$(".x-panel-body",this.$ho).animate({'top': '0'},'fast');

				$x_tool.hover(function(){
					$(this).css('background-position','-15px -60px');
				},function(){
					$(this).css('background-position','0px -60px');
				});
			}else{
				$x_tool.css('background-position','0 -75px');
				$(".x-panel-body",this.$ho).animate({'top': -x_panel_bwrap_height-x_panel_bwrap_height},'fast');

				$x_tool.hover(function(){
					$(this).css('background-position','-15px -75px');
				},function(){
					$(this).css('background-position','0px -75px');
				});
			}
		});
	}

	this.getFrame = function(){
		return this.frame;
	}
	this.setFrame = function(f){
		this.$ho.css({'left':f.x,'top':f.y,'width':f.width-2,'height':f.height-2});
		$('.container,.x-panel',this.$ho).css({'height':f.height,'width':f.width});
		$(".x-panel-header",this.$ho).css({'width':f.width-10,'user-select':'none'});
		$(".x-panel-bwrap",this.$ho).css({'width':f.width,'height':f.height-25});
		$(".x-panel-body",this.$ho).css({'height':f.height-26,'width':f.width-2});
		this.initHover();
	}

	if(!!f){
		this.setFrame(f);
	}else{
		$.error("you have a JPanel didn't set frame");
	}

	this.getTitle = function(){
		return this.title;
	}
	this.setTitle = function(t){
		$(".x-panel-header-text",this.$ho).html(t);
	}

	this.showTitle = function(t){
		!t?$(".x-panel-header",this.$ho).css({'padding-top':'0px','padding-bottom':'0px','height':'0px'}):$(".x-panel-header",this.$ho).css({'padding-top':'5px','padding-bottom':'4px','height':'15px'});
	}

	this.showToggleBtn = function(t){
		!!t?$(".x-tool",this.$ho).show():$(".x-tool",this.$ho).hide();
	}

	this.load = function(url,data,callback){
		if($.jsafestring(url) != '')$(".x-panel-body",this.$ho).load(url,data,callback);
	}

	return this;
}

function JMessageBox(t,msg){
	JObject.call(this);

	t = !!t?t:JSwingUIOptions.JMessageBoxDefaultText;
	msg = !!msg?msg:JSwingUIOptions.JMessageBoxDefaultMsg;

	this.title = t;
	this.msg = msg;
	this.frame = JSwingUIOptions.JMessageBoxDefaultFrame;
	
	this.$ho.append('<div id="msg-div" style="left: '+this.frame.x+'px; top: '+this.frame.y+'px;"><div><div class="msg"><div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div><div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc">'+
		'<h3>Button Click</h3>You clicked the yes button</div></div></div><div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div></div></div></div>');

	this.show = function(){
		var oldy = this.frame.y;
		this.$ho.css('top',- this.frame.height);
		window.add(this);

		var obj = this;
		this.$ho.animate({'top':oldy},500,function(){
			setTimeout(function(){obj.$ho.animate({'top':- obj.frame.height},500);},2000);
			
		});
	}

	this.setOrigin = function(x,y){
		this.frame.x = x;
		this.frame.y = y;
		$("#msg-div",this.$ho).css({'left':this.frame.x+'px','top':this.frame.y+'px'});
	}

	return this;
}

function JCheckBox(){

}

function JRadioButton(){

}

function JList(){

}

function JComboBox(){

}

function JScrollPane(){

}

function JSlider(){

}

function JTextField(){

}

function JTextArea(){

}

function JPasswordField(){

}

function JWindow(){

}

function JFrame(){

}

