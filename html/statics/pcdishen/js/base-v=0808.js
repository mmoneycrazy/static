// JavaScript Document

var js_dir = '';

seajs.config({    
    alias: {
        'superSlide': js_dir + 'jquery.SuperSlide.2.1.1',
        'validate': js_dir + 'jquery.validate.min',
        'layer': js_dir + 'layer/layer',
        'tween': js_dir + 'tween.min',
        'common': js_dir + 'common.js?v=0504'
    }
});


// requestAnimFrame
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame   ||
    window.mozRequestAnimationFrame      ||
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();


// 星座下拉选择
$.fn.xzSelect = function(options){
    var defaults = {
        astro: [
            { name: '白羊座', date: '3日21日-4月20日', value: 'aries'},
            { name: '金牛座', date: '4月20日-5月20日', value: 'taurus'},
            { name: '双子座', date: '5月21日-6月21日', value: 'gemini'},
            { name: '巨蟹座', date: '6月22日-7月22日', value: 'cancer'},
            { name: '狮子座', date: '7月23日-8月22日', value: 'leo'},
            { name: '处女座', date: '8月23日-9月22日', value: 'virgo'},
            { name: '天秤座', date: '9月23日-10月23日', value: 'libra'},
            { name: '天蝎座', date: '10月24日-11月22日', value: 'scorpio'},
            { name: '射手座', date: '11月23日-12月21日', value: 'sagittarius'},
            { name: '摩羯座', date: '12月22日-1月19日', value: 'capricorn'},
            { name: '水瓶座', date: '1月20日-2月18日', value: 'aquarius'},
            { name: '双鱼座', date: '2月19日-3月20日', value: 'pisces'}
        ],
        callback: function(){}
    };
    var params = $.extend({}, defaults, options);

    this.each(function(){
        var $this = $(this),
            $cont = $this.find('.xz-select-bd'),
            hasDom = $cont.find('li').length;   //是否已存在选项

        var selecter = {
            createHTML: function(){                    
                var count = 12;
                var html = '<div class="xz-select-list"><h3 class="icxz-select-title">选择星座</h3><ul>';
                for (var i = 0; i < params.astro.length; i++) {
                    var name = params.astro[i].name;
                    if(params.word){
                        name = name.replace(/座/, params.word);
                    }
                    html += '<li><i class="icon icon-xz'+ (i+1) +'"></i><span class="name">'+ name +'</span></li>';
                }
                html += '</ul></div>';
                $cont.append(html);
            },
            events: function(){
                $this.on('click', function(e){
                    e.stopPropagation();
                })
                .on('click', '.xz-select-hd', function(e){
                    var $select = $(this).parent();

                    if(!$select.hasClass('show')){                    
                        $('.xz-select').removeClass('show');
                        $select.addClass('show');
                    }
                    else{
                        $('.xz-select').removeClass('show');
                    }
                })
                .on('click', '.xz-select-bd li', function(){
                    var $item = $(this),
                        $name = $this.find('.xz-select-hd .name'),
                        index = $item.index(),
                        title = $item.text(),
                        astro = params.astro[index];

                    $name && $name.html(title);                        
                    params.callback(index, astro);
                    $this.removeClass('show');
                })

                $(document).on('click', function(){                
                    $this.removeClass('show');
                })
            },
            init: function(){
                !hasDom && this.createHTML();
                this.events();
            }
        }
        $cont && selecter.init();        
    })
}    

// 日期下拉选择
$.fn.calendar = function(options){
    var params = {
        year: 2000,
        beginYear: 1936,
        endYear: (new Date).getFullYear(),
        isLunar: false
    };
    
    var calendar = {
        getLunarYear: function (year) {
            var a = year - 1900 + 36;
            var Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
                Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

            return Gan[a % 10] + Zhi[a % 12] + '年';
        }, 
        getLunarMonth: function (month) {
            var nStr = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
            return nStr[month] + "月";
        },
        getLeapMonth: function(yearIndex){
            var myMonths=[3,0,7,0,0,6,0,0,4,0,0,2,0,7,0,0,5,0,0,3,0,8,0,0,6,0,0,4,0,0,3,0,7,0,0,5,0,0,4,0,8,0,0,6,0,0,4,0,10,0,0,6,0,0,5,0,0,3,0,8,0,0,5,0,0,4,0,0,2,0,7,0,0,5,0,0,4,0,9,0,0,6,0,0,4,0,0,2,0,6,0,0,5,0,0,3];
            return myMonths[yearIndex];
        },
        getLunarDay: function (i) {
            var nStr1 = ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
                nStr2 = ["初", "十", "廿", "卅", "□"];   

            var v;
            switch (i) {
            case 10:
                v = "初十";
                break;
            case 20:
                v = "二十";
                break;
            case 30:
                v = "三十";
                break;
            default:
                v = nStr2[Math.floor(i / 10)];
                v += nStr1[i % 10];
            }
            return v
        },
        getLunarDays: function(yearIndex, monthIndex){
            var lunarInfo = [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835];

            var count = lunarInfo[yearIndex + 36] & 65536 >> (monthIndex + 1) ? 30 : 29;
            var days = [];
            for (var i = 1; i <= count ; i++) {
                days.push({text: this.getLunarDay(i), value: i})
            }
            return days;
        },
        createHTML: function(type, $this, isLunar){
            var data = [],
                $y = $this.find('.year'),
                $m = $this.find('.month'),
                $d = $this.find('.day'),
                $h = $this.find('.hour'),
                $mm = $this.find('.minute');
            
            if(type == 'y'){
                var y = $y.find('input').val() || params.year;

                for (var i = params.beginYear; i <= params.endYear; i++) {                        
                    if(isLunar){
                        var v = this.getLunarYear(i);
                        var active = y == i ? ' on' : '';
                        data.push('<li data-value="'+ i +'" class="option'+ active +'">'+ v +'('+ i +')</li>');
                    }
                    else{
                        var active = y == i ? ' on' : '';
                        data.push('<li data-value="'+ i +'" class="option'+ active +'">'+ i +'年</li>');
                    }
                }
                $y.find('.select-bd ul').html(data.join(''));
            }
            else if(type == 'm'){
                var m = $m.find('input').val() || 1;
                // console.log(m);
                for (var i = 0; i < 12; i++) {
                    var index = i + 1;

                    if(isLunar){
                        var yearIndex = $y.find('.on').index();
                        var leapMonth = this.getLeapMonth(yearIndex);

                        var v = this.getLunarMonth(i);                        
                        var active = '';
                        if(m == index){
                            active = ' on';
                        }
                        data.push('<li data-value="'+ index +'" class="option'+ active +'">'+ v +'</li>');
                        if(leapMonth != 0 && leapMonth - 1 == i){
                            // v = "闰" + this.getLunarMonth(i);
                            data.push('<li data-value="'+ index +'" class="option'+ active +'">闰'+ v +'</li>');
                        }
                    }
                    else{
                        var active = m == index ? ' on' : '';
                        data.push('<li data-value="'+ index +'" class="option'+ active +'">'+ index +'月</li>');
                    }
                }
                $m.find('.select-bd ul').html(data.join(''));


                var $opt = $m.find('.on').length ? $m.find('.on') : $m.find('.option').eq(0);
                $m.find('input').val($opt.attr('data-value'));
                $m.find('.select-hd').html($opt.text());
            }
            else if(type == 'd'){
                if(isLunar){
                    var y = $d.find('input').val(),
                        yearIndex = $y.find('.on').index() || 0,
                        monthIndex = $m.find('.on').index() || 0,
                        dayIndex = $d.find('.on').index() || 0,
                        days = this.getLunarDays(yearIndex, monthIndex);

                    if(dayIndex >= days.length){
                        var $opt = $d.find('.option').eq(days.length-1).addClass('on'); //.attr('data-value');
                        $d.find('input').val($opt.attr('data-value'));
                        $d.find('.select-hd').html($opt.text());
                        y = $opt.attr('data-value');
                    }
                    $.each(days, function(i, v){
                        var active = y == v.value ? ' on' : '';
                        data.push('<li data-value="'+ v.value +'" class="option'+ active +'">'+ v.text +'</li>');
                    })
                }
                else{
                    var y = $y.find('input').val() || params.year,
                        m = $m.find('input').val() || 1,
                        d = $d.find('input').val() || 1,
                        maxDay = 31;
                    
                    if(m == 4 || m == 6 || m == 9 || m == 11){
                        maxDay = 30;
                    }
                    else if(m == 2){
                        if((y%4 == 0 && y%100 != 0 ) || (y%400 == 0)){
                            maxDay = 29;
                        }else{  
                            maxDay = 28;
                        }
                    }
                    if(d > maxDay){
                        d = maxDay;
                        $d.find('.input').val(d);
                        $d.find('.select-hd').html(d + '日');
                    }
                    for (var i = 1; i <= maxDay; i++) {
                        var active = d == i ? ' on' : '';
                        data.push('<li data-value="'+i+'" class="option'+ active +'">'+i+'日</li>');
                    }
                }
                $d.find('.select-bd ul').html(data.join(''));
            }
            else if(type == 'h'){
                var h = $this.find('.hour input').val() || 0;
                for (var i = 0; i <= 23; i++) {
                    // var value = i.length > 1 ? (+i) : ('0'+i);
                    var active = h == i ? ' on' : '';
                    data.push('<li data-value="'+ i +'" class="option'+ active +'">'+ i +'时</li>');
                }
                $h.find('.select-bd ul').html(data.join(''));
            }
            else if(type == 'mm'){
                var mm = $this.find('.minute input').val() || 0;
                for (var i = 0; i <= 59; i++) {
                    var active = mm == i ? ' on' : '';
                    // var value = i.length > 1 ? (+i) : ('0'+i);
                    data.push('<li data-value="'+ i +'" class="option'+ active +'">'+ i +'分</li>');
                }
                $mm.find('.select-bd ul').html(data.join(''));
            }
        }
    }

    this.each(function(){
        // var params = $.extend({}, params, options);
        var $this = $(this),
            $m = $this.find('.month'),
            $d = $this.find('.day'),
            isLunar = !!$this.attr('data-type');

        $this.on('click', '.year .option', function(){
            calendar.createHTML('m', $this, isLunar);
            calendar.createHTML('d', $this, isLunar);
            
            $m.find('.select-bd').scroller();
            $d.find('.select-bd').scroller();
        })
        $this.on('click', '.month .option', function(){
            calendar.createHTML('d', $this, isLunar);
            $d.find('.select-bd').scroller();
        })

        calendar.createHTML('y', $this, isLunar);
        calendar.createHTML('m', $this, isLunar);
        calendar.createHTML('d', $this, isLunar);
        calendar.createHTML('h', $this, isLunar);
        calendar.createHTML('mm', $this, isLunar);
    })
}

// 模拟滚动条
$.fn.scroller = function(options){
    var defaults = {          
        range: 150,     //鼠标每次滚动的距离
        speed: 200,     //滚动速度
        follow: true,   //当内容小于容器时，是否跟随窗口滚动
        endFun: null
    };

    this.each(function(){
        var params = $.extend({}, defaults, options);
        var that = $(this), cssObj = {'overflow': 'hidden'};
        if(that.css('maxHeight') !== 'none'){
            cssObj.height = that.height();
        }
        // 初始化结构
        that.css(cssObj);
        if(that.find('.scroller').length === 0){
            that.wrapInner('<div class="scroller"><div style="zoom: 1;"></div></div>')
            .append('<div class="scrollbar-track" style="display:none;"><span class="scrollbar-thumb"></span></div>');
        }

        var target = $('.scroller', this) //滚动容器
            track  = $('.scrollbar-track', this),       //滚动条
            thumb  = $('.scrollbar-thumb', this),       //滚动滑动条             
            height = target.height(),                   //滚动容器高度
            inner  = target.children(),
            innerHeight = inner.height(),               //内容实际高度
            thumbHeight = height / innerHeight * height,//滚动滑动条高度
            moveHeight  = innerHeight - height,         //可滚动高度
            isScroll = false;                           //是否处于滚动状态

        var scroller = {
            movingStartY: 0,
            movingPosY:0,

            // 初始化
            init: function(){
                var t = this;
                t.rW();
                $(window).bind('resize', function(){
                    t.rW()
                });;
                t._init();
            },
            _init: function(){
                if(height >= innerHeight){
                    track.hide();
                    return !params.follow;
                }else{
                    thumb.height(thumbHeight);  //设置滑动条高度
                    track.show();               //显示滚动条
                }
                this.mS();                  //绑定滚轮事件
                this.drag();                //绑定滑动条拖动事件
                params.scrollTop && this.sTo(params.scrollTop, 0);
            },      
            // 绑定滚轮事件
            mS: function(){
                var t = this;
                target.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function(e) {
                    e.preventDefault(); // 阻止与事件关联的默认动作
                    var v = e.originalEvent.wheelDelta || -e.originalEvent.detail,  //值为120和-120
                        y = this.scrollTop; //滚动条位置

                    if(v < 0){
                        y += params.range;
                        t.sTo(y, params.speed);
                    }else{
                        y -= params.range;                            
                        t.sTo(y, params.speed);
                    }
                })  
            },
            getMousePos: function(event) {
                var e = event || window.event;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var y = e.pageY || e.clientY + scrollY;
                return y;
            },
            // 左键拖动
            drag: function(){
                var t = this, move = false, moveY = 0;

                thumb.off('mousedown').on('mousedown', function(e){
                    e.preventDefault();
                    t.movingStartY = t.getMousePos(e);
                    t.movingPosY = $(this).position().top;
                    that.addClass('moving');
                    // console.log(t.movingPosY);
                    $(document).on('mousemove', t.mousemove);
                    $(document).on('mouseup', t.mouseup);
                })
            },
            mousemove: function(e){
                var moveY = scroller.movingPosY + scroller.getMousePos(e)-scroller.movingStartY;
                moveY = moveY * (innerHeight / height);
                scroller.sTo(moveY, 0)
            },
            mouseup: function(e){
                that.removeClass('moving');
                $(document).off('mousemove', scroller.mousemove);
                $(document).off('mouseup', scroller.mouseup);                    
            },
            // 滚动
            sTo: function(y, speed){
                var t = this;

                y = y > moveHeight ? moveHeight : y;
                y = y < 0 ? 0 : y;
                
                if(!isScroll){
                    isScroll = true;
                    target.animate({scrollTop: y}, speed, function(){
                        isScroll = false;
                    });
                    thumb.animate({top: y * height / innerHeight}, speed);
                }
            },
            // 重置
            rW: function(){
                if(height !== target.height() || innerHeight !== inner.height()){
                    height = target.height(),                   //滚动容器高度
                    innerHeight = inner.height(),               //内容实际高度
                    thumbHeight = height / innerHeight * height,//滚动滑动条高度
                    moveHeight  = innerHeight - height,         //可滚动高度
                    this._init();
                }
            }
        }
        scroller.init();
    })
}