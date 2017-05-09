
var MENU_ITEM_HEIGHT = 30;
var MIN_PNAEL_HEIGHT = 8 * MENU_ITEM_HEIGHT;
var MAX_PNAEL_HEIGHT = 20 * MENU_ITEM_HEIGHT;
var SCROLL_HEIGHT = 4 * MENU_ITEM_HEIGHT;
var bigMenuIcons = ['@crs','reportshop','comm','erp','exam_manage','hrms','info','mytable','project','roll_manage','sale_manage','sys','system',
                    'training','workflow','address','netdisk','picture','wiki','wf_entrust','wf_destory','wf_log','wf_mine','wf_new',
                    'wf_query','wf_stat','sms','person_info','todo','notify','notify_auditing','email','calendar','diary','bbs','meeting',
                    'attendance','attendance_manage','work_plan','vehicle','score','vote','fax','file_folder','news'];

var timer_sms_mon = null;
var timer_online_tree_ref = null;
//短信箱自动关闭时间，秒
var smsbox_close_timeout = 5;
var smsbox_close_countdown = null;
var smsbox_close_timer = null;

var timeLastLoadOnline = 0;
var nextTabId = 0;

//门户切换变量
var max_portals = 5;
var imgPosition = 0;
var curPosition = 3;
var portalIsRunning = 'udefined';
var portalImgs = null;
var movec = null;
var hide = null;

jQuery.noConflict();

(function($)
{
    $.fn.addTab = function(id, title, url, closable, selected)
    {
        $('.over-mask-layer').hide();   //如果有门户切换、常用任务等面板打开，则隐藏之
        $('#overlay_panel').hide();

        if (!id) return;
        closable = (typeof (closable) == 'undefined') ? true : closable;
        selected = (typeof (selected) == 'undefined') ? true : selected;
        $('#tabs_container').tabs('add', {
            id: id,
            title: title,
            closable: closable,
            selected: selected,
            content: '<iframe id="tabs_' + id + '_iframe" name="tabs_' + id + '_iframe" src="' + url + '" onload="IframeLoaded(\'' + id + '\');" border="0" frameborder="0" framespacing="0" marginheight="0" marginwidth="0" style="width:100%;height:100%;"></iframe>'
        });

    };

    $.fn.selectTab = function(id)
    {
        $('#tabs_container').tabs('select', id);
    };
    $.fn.closeTab = function(id)
    {
        $('#tabs_container').tabs('close', id);
    };
    $.fn.getSelected = function()
    {
        return $('#tabs_container').tabs('selected');
    };

    //门户切换函数开始
    function roll(direction)
    {
        var length = portalImgs.length;
        var start = imgPosition;
        var offset = Math.floor((max_portals - portalImgs.length) / 2);

        if ('r' == direction)
        {
            for (var i = 0; i < length; i++)
            {
                start = start + 1;
                if (start > (length - 1))
                    start = start - length;
                portalImgs[i].src = portalArray[start + offset].src;
            }

            imgPosition = imgPosition + 1;
            if (imgPosition > (length - 1))
            {
                imgPosition = imgPosition - length;
            }
        }
        if ('l' == direction)
        {
            var a = true;
            for (var i = 0; i < length; i++)
            {
                if (a)
                {
                    start = start - 1;
                    if (start < 0)
                    {
                        start = start + length;
                        a = false;
                    }
                    if (start < (length - 1))
                    {
                        a = false;
                    }
                } else
                {
                    start = start + 1;
                    if (start > (length - 1))
                    {
                        start = start - length;
                        a = true;
                    }
                }

                portalImgs[i].src = portalArray[start + offset].src;
                if (start == (length - 1))
                {
                    start = -1;
                }
            }
            imgPosition = imgPosition - 1;
            if (imgPosition < 0)
                imgPosition = imgPosition + length;
        }
    }

    function right()
    {
        i++;
        var offset = Math.floor((max_portals - portalImgs.length) / 2);

        var posArray = [];
        for (var j = 0; j < portalImgs.length; j++)
        {
            var left = $(portalImgs[j]).offset().left - $(portalImgs[j].parentNode).offset().left;
            var top = $(portalImgs[j]).offset().top - $(portalImgs[j].parentNode).offset().top;
            posArray[j] = [$(portalImgs[j]).width(), $(portalImgs[j]).height(), left, top];
        }

        var diffArray = [[], [-2, -4, -9, 1.5], [-2, -5, -10, 1.5], [2, 4, -11, -1.5], [2, 4, -11, -1.5]];
        for (var j = 1; j < portalImgs.length; j++)
        {
            $(portalImgs[j]).css({ width: (posArray[j][0] + diffArray[j + offset][0]), height: (posArray[j][1] + diffArray[j + offset][1]), left: (posArray[j][2] + diffArray[j + offset][2]), top: (posArray[j][3] + diffArray[j + offset][3]) });
        }

        if (i > 9)
        {
            clearInterval(hide);
            hide = null;
            resetPortalCss();
            roll('r');
            portalIsRunning = 'false';
        }
    }

    function left()
    {
        i++;
        var offset = Math.floor((max_portals - portalImgs.length) / 2);

        var posArray = [];
        for (var j = 0; j < portalImgs.length; j++)
        {
            var left = $(portalImgs[j]).offset().left - $(portalImgs[j].parentNode).offset().left;
            var top = $(portalImgs[j]).offset().top - $(portalImgs[j].parentNode).offset().top;
            posArray[j] = [$(portalImgs[j]).width(), $(portalImgs[j]).height(), left, top];
        }

        var diffArray = [[2, 4, 9, -1.5], [2, 5, 10, -1.5], [-2, -5, 11, 1.5], [-2, -4, 11, 1.5], []];
        for (var j = 0; j < portalImgs.length - 1; j++)
        {
            $(portalImgs[j]).css({ width: (posArray[j][0] + diffArray[j + offset][0]), height: (posArray[j][1] + diffArray[j + offset][1]), left: (posArray[j][2] + diffArray[j + offset][2]), top: (posArray[j][3] + diffArray[j + offset][3]) });
        }

        if (i > 9)
        {
            clearInterval(hide);
            hide = null;
            resetPortalCss();
            roll('l');
            portalIsRunning = 'false';
        }
    }

    function move(direction)
    {
        if (portalIsRunning != 'udefined' && portalIsRunning == 'true') { return; }

        var frequency = $.browser.msie ? 30 : 20;
        var offset = Math.floor((max_portals - portalImgs.length) / 2);

        i = 0;
        var lastIndex = portalImgs.length - 1;
        var cssIndex = $(portalImgs[lastIndex]).attr('index')

        if (direction == 'r')
        {
            curPosition = curPosition + 2;
            $(portalImgs[lastIndex]).css({ left: portalImgCss[cssIndex].left, top: portalImgCss[cssIndex].top });
            hide = window.setInterval(right, frequency);
            portalIsRunning = 'true';
        }

        if (direction == 'l')
        {
            curPosition = curPosition - 1;
            $(portalImgs[lastIndex]).css({ left: ("-" + portalImgCss[cssIndex].left), top: portalImgCss[cssIndex].top });
            /*
            var pos = imgPosition - 1;
            if(pos < 0)
            pos = pos + portalImgs.length;
            portalImgs[lastIndex].src =  portalArray[pos].src;*/
            hide = window.setInterval(left, frequency);
            portalIsRunning = 'true';
        }

        if (curPosition > (portalImgs.length - 1))
            curPosition = 0;
        if (curPosition < 0)
            curPosition = portalImgs.length - 1;
    }

    function moveC(direction)
    {
        if (portalIsRunning != 'true')
        {
            move(direction);
            clearInterval(movec);
        }
    }

    function openPortal()
    {
        if (hide)
        {
            window.setTimeout(openPortal, 300);
        }
        else
        {
            $(portalImgs[Math.floor(portalImgs.length / 2)]).triggerHandler('click');
        }
    }

    var portalImgCss = [];
    //portalImgCss["0"] = { width: "110px", height: "170px", left: "5px", top: "130px", zIndex: "2" };
    portalImgCss["0"] = { width: "165px", height: "270px", left: "1px", top: "120px", zIndex: "3" };
    portalImgCss["1"] = { width: "190px", height: "310px", left: "115px", top: "100px", zIndex: "4" };
    portalImgCss["2"] = { width: "226px", height: "368px", left: "250px", top: "70px", zIndex: "5" };
    portalImgCss["3"] = { width: "190px", height: "310px", left: "420px", top: "100px", zIndex: "4" };
    portalImgCss["4"] = { width: "165px", height: "270px", left: "565px", top: "120px", zIndex: "3" };
    //portalImgCss["6"] = { width: "110px", height: "170px", left: "605px", top: "130px", zIndex: "2" };

    function resetPortalCss()
    {
        for (var j = 0; j < portalImgs.length; j++)
        {
            $(portalImgs[j]).css(portalImgCss[$(portalImgs[j]).attr('index')]);
        }
    }
    //门户切换函数结束

    function checkActive(id)
    {
        if ($('#' + id + '_panel:hidden').length > 0)
            $('#' + id).removeClass('active');
        else
            window.setTimeout(checkActive, 300, id);
    };

    function getSecondMenuHTML(id)
    {
        var html = '';
        for (var i = 0; i < second_array[id].length; i++)
        {
            var func_id = 'f' + second_array[id][i];
            var func_name = func_array[func_id][0];
            var func_code = func_array[func_id][1];
            var open_window = func_array[func_id][3] ? func_array[func_id][3] : '';
            var bExpand = func_code.substr(0, 1) == "@" && third_array[func_id];
            var onclick = bExpand ? "" : "createTab(" + func_id.substr(1) + ",'" + func_name.replace("'", "\'") + "','" + func_code.replace("'", "\'") + "','" + open_window + "');";
            html += '<li><a id="' + func_id + '" href="javascript:;" onclick="' + onclick + '"' + (bExpand ? ' class="expand"' : '') + ' hidefocus="hidefocus"><span>' + func_name + '</span></a>';
            if (bExpand)
            {
                html += '<ul>';
                for (var j = 0; j < third_array[func_id].length; j++)
                {
                    var func_id1 = 'f' + third_array[func_id][j];
                    var func_name1 = func_array[func_id1][0];
                    var func_code1 = func_array[func_id1][1];
                    var open_window1 = func_array[func_id1][3] ? func_array[func_id1][3] : '';
                    var onclick1 = "createTab(" + func_id1.substr(1) + ",'" + func_name1.replace("'", "\'") + "','" + func_code1.replace("'", "\'") + "','" + open_window1 + "');";
                    html += '<li><a id="' + func_id1 + '" href="javascript:;" onclick="' + onclick1 + '" hidefocus="hidefocus"><span>' + func_name1 + '</span></a></li>';
                }
                html += '</ul>';
            }
            html += '</li>';


        }

        return '<ul id="second_menu">' + html + '</ul>';
    };

    function resizeLayout()
    {
        // 主操作区域高度
        var wWidth = (window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth));
        var wHeight = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
        var nHeight = $('#north').is(':visible') ? $('#north').outerHeight() : 0;
        var fHeight = $('#funcbar').is(':visible') ? $('#funcbar').outerHeight() : 0;
        var sHeight = $('#south').is(':visible') ? $('#south').outerHeight() : 0;
        $('#center').height(wHeight - nHeight - fHeight - sHeight - $('#taskbar').outerHeight());

        //一级标签宽度
        var width = wWidth - $('#taskbar_left').outerWidth() - $('#taskbar_right').outerWidth();
        $('#tabs_container').width(width - $('#tabs_left_scroll').outerWidth() - $('#tabs_right_scroll').outerWidth() - 1);
        $('#taskbar_center').width(width - 1);   //-1是为了兼容iPad

        $('#tabs_container').triggerHandler('_resize');
    };

    //菜单滚动箭头事件,id为first_menu
    function initMenuScroll(id)
    {
        //菜单向上滚动箭头事件
        $('#' + id + ' > .scroll-up:first').hover(
         function()
         {
             $(this).addClass('scroll-up-hover');
             if (id == 'first_panel')
             {
                 $("#first_menu > li > a.active").removeClass('active');   //恢复一级active的菜单为正常
             }
         },
         function()
         {
             $(this).removeClass('scroll-up-hover');
         }
      );

        //点击向上箭头
        $('#' + id + ' > .scroll-up:first').click(
         function()
         {
             var ul = $('#' + id + ' > ul:first');
             ul.animate({ 'scrollTop': (ul.scrollTop() - SCROLL_HEIGHT) }, 600);
         }
      );

        //向下滚动箭头事件
        $('#' + id + ' > .scroll-down:first').hover(
         function()
         {
             $(this).addClass('scroll-down-hover');
             if (id == 'first_panel')
             {
                 $("#first_menu > li > a.active").removeClass('active');   //恢复一级级active的菜单为正常
             }
         },
         function()
         {
             $(this).removeClass('scroll-down-hover');
         }
      );

        //点击向下箭头
        $('#' + id + ' > .scroll-down:first').click(
         function()
         {
             var ul = $('#' + id + ' > ul:first');
             ul.animate({ 'scrollTop': (ul.scrollTop() + SCROLL_HEIGHT) }, 600);
         }
      );
    };

    //初始化菜单
    function initStartMenu()
    {
        //点击页面，隐藏各级菜单面板，并清除二级和三级菜单的active状态
        $('#overlay_startmenu').click(function()
        {
            if ($('#start_menu_panel:visible').length)
            {
                $('#overlay_startmenu').hide();
                $('#start_menu_panel').slideUp(300);
                $('#start_menu').removeClass('active');
            }
        });

        //鼠标点击导航图标按钮弹出菜单面板
        $('#start_menu').bind('click', function()
        {
            if ($('#start_menu_panel:visible').length)
            {
                $('#overlay_startmenu').hide();
                $('#start_menu_panel').slideUp(300);
                $(this).removeClass('active');
            }
            //设置导航图标为active状态
            $(this).addClass('active');

            //遮罩层位置和显示
            $('#overlay_startmenu').show();

            //菜单面板位置
            var top = $('#start_menu').offset().top + $('#start_menu').outerHeight() - 6;
            $('#start_menu_panel').css({ top: top });
            $('#start_menu_panel').slideDown('fast');

            ////计算并设置菜单面板的高度,是否显示滚动箭头
            var scrollHeight = $("#first_menu").attr('scrollHeight');
            if ($("#first_menu").height() < scrollHeight)
            {
                var height = ($('#south').offset().top - $('#start_menu').offset().top) * 0.7;   //可用高度为开始菜单和状态栏高差的70%
                height = height - height % MENU_ITEM_HEIGHT;   //可用高度为 MENU_ITEM_HEIGHT 的整数倍
                //如果可用高度大于允许的最高高度，则限制
                height = height <= MAX_PNAEL_HEIGHT ? height : MAX_PNAEL_HEIGHT;
                //如果可用高度超过scrollHeight，则设置高度为scrollHeight
                height = height > scrollHeight ? scrollHeight : height;
                $('#first_menu').height(height);
            }
            else
            {
                var height = scrollHeight > MIN_PNAEL_HEIGHT ? scrollHeight : MIN_PNAEL_HEIGHT;
                $('#first_menu').height(height);
            }

            if ($("#first_menu").height() >= $("#first_menu").attr('scrollHeight'))
            {
                $('#first_panel > .scroll-up:first').hide();
                $('#first_panel > .scroll-down:first').hide();
            }

            //计算并设置二级菜单面板的位置
            var top = $('#first_menu').offset().top - $("#start_menu_panel").offset().top;
            $('#second_panel').css('top', top - 5);
            $('#second_panel > .second-panel-menu').css('height', $('#first_menu').height());

            //第一次打开时设置二级菜单滚动事件
            if ($('#second_panel > .second-panel-menu > .jscroll-c').length <= 0)
                $('#second_panel > .second-panel-menu').jscroll();
        });

        //生成一级菜单
        var html = "";
        for (var i = 0; i < first_array.length; i++)
        {
            var menu_id = first_array[i];
            if (typeof (func_array['m' + menu_id]) != "object")
                continue;

            var image = !func_array['m' + menu_id][1] ? 'icon_default' : func_array['m' + menu_id][1];
            html += '<li><a id="m' + menu_id + '" href="javascript:;" hidefocus="hidefocus"><img src="css/images/' + image + '.png" align="absMiddle" /> ' + func_array['m' + menu_id][0] + '</a></li>';
        }
        $("#first_menu").html(html);
        $("#first_menu").mousewheel(function()
        {
            $('#first_menu').stop().animate({ 'scrollTop': ($('#first_menu').scrollTop() - this.D) }, 300);
        });

        //一级菜单滚动箭头事件
        initMenuScroll('first_panel');

        //一级菜单hover和click事件
        $("#first_menu > li > a").click(function()
        {
            //如果当前一级菜单为active，则返回
            if (this.className.indexOf('active') >= 0)
                return;

            $("#second_menu > li > a.expand").removeClass('active');   //恢复二级expand菜单为正常
            $("#first_menu > li > a.active").removeClass('active');   //恢复一级级active的菜单为正常

            //获取当前一级菜单下属二级菜单的HTML代码，并更新二级菜单面板
            $('#second_panel > .second-panel-menu').html(getSecondMenuHTML(this.id));
            $("#" + this.id).addClass('active');   //将当前一级菜单设为active

            //二级级菜单滚动事件
            $('#second_panel > .second-panel-menu').jscroll();

            //二级菜单点击展开三级菜单
            $('#second_menu > li > a.expand').click(function()
            {
                $(this).toggleClass('active');
                $(this).parent().children('ul').toggle();
                $('#second_panel > .second-panel-menu').jscroll();
            });
        });

        if (menuExpand != "" && typeof (second_array['m' + menuExpand]) == "object")
        {
            //展开定义的二级菜单
            $('#m' + menuExpand).addClass('active');
            $('#second_panel > .second-panel-menu').html(getSecondMenuHTML('m' + menuExpand));

            //二级菜单点击展开三级菜单
            $('#second_menu > li > a.expand').click(function()
            {
                $(this).toggleClass('active');
                $(this).parent().children('ul').toggle();
                $('#second_panel > .second-panel-menu').jscroll();
            });
        }
        else
        {
            //登录时把常用任务菜单项作为二级菜单的内容
            //         var html = "";
            //         for(var i=0; i<shortcutArray.length; i++)
            //         {
            //            if(typeof(func_array['f'+shortcutArray[i]]) != "object")
            //               continue;
            //         
            //            var func_id = 'f'+shortcutArray[i];
            //            var func_name = func_array[func_id][0];
            //            var func_code = func_array[func_id][1];
            //            var open_window = func_array[func_id][3] ? func_array[func_id][3] : "";
            //         
            //            if(func_code.substr(0, 1) == "@")
            //               continue;
            //         
            //            var onclick = "createTab(" + func_id.substr(1) + ",'" + func_name.replace("'", "\'") + "','" + func_code.replace("'", "\'") + "','" + open_window + "');";
            //            html += '<li><a id="' + func_id + '" href="javascript:;" onclick="' + onclick + '" hidefocus="hidefocus"><span>' + func_name + '</span></a></li>';
            //         }
            //         html = '<ul id="second_menu">' + html + '</ul>';
            //         $('#second_panel > .second-panel-menu').html(html);
        }

        $('#second_panel, #second_menu').bind('selectstart', function()
        {
            return false;
        });


        //在线状态相关事件
        $('#start_menu_panel > .panel-user > .avatar').hover(
         function() { },
         function() { window.setTimeout(function() { $('#on_status').fadeOut(); }, 300); }
      );
        $('#start_menu_panel > .panel-user > .avatar').click(function()
        {
            $('#on_status').fadeIn(300, function()
            {
                $(this).css('filter', 'progid:DXImageTransform.Microsoft.shadow(strength=5, direction=135, color=#a3a4a8);');
            });
        });

        $('#on_status > a').click(function()
        {
            var status = $(this).attr('status');
            if (status < "1" || status > "4") return;

            $.get("ipanel/pheader.php", { ON_STATUS_SET: status });
            $('#start_menu_panel > .panel-user > .avatar > .status_icon').attr('class', 'status_icon status_icon_' + status);
            $('#on_status').fadeOut(300);
        });
    }

    function initTabs()
    {
        //设置标签栏属性
        $('#tabs_container').tabs({
            tabsLeftScroll: 'tabs_left_scroll',
            tabsRightScroll: 'tabs_right_scroll',
            panelsContainer: 'center',
            secondTabsContainer: 'funcbar_left'
        });

        //关闭所有标签后，显示门户切换
        $('#tabs_container').bind('_close', function()
        {
            /*if ($('a.tab', this).length <= 0 && $('#portal_panel:visible').length <= 0)
                $('#portal').trigger('click');*/                                                                           
        });
    }

    function initPortal()
    {
        //创建门户图片
        for (var id in portalArray)
        {
            $('<img src="' + portalArray[id].src + '" index="' + id + '" />').appendTo('#portal_slider');
        }

        //门户切换事件
        $('#portal').bind('click', function()
        {
            if ($('#' + this.id + '_panel:visible').length)
            {
                $('#' + this.id + '_panel').animate({ top: -$('#' + this.id + '_panel').outerHeight() }, 600, function() { $(this).hide() });
                $('#overlay_panel').hide();
                return;
            }

            //面板位置
            $('.over-mask-layer').hide();
            $('#overlay_panel').show();
            $('#' + this.id + '_panel').css('left', ($(document).width() - $('#' + this.id + '_panel').width()) / 2);
            var top = $('#' + this.id + '_panel').outerHeight() > $('#center').outerHeight() ? -10 : 40;
            $('#' + this.id + '_panel').css({ top: -$('#' + this.id + '_panel').outerHeight() });
            $('#' + this.id + '_panel').show().animate({ top: top }, 600);

            //常用任务图标设为active状态
            $(this).addClass('active');
            window.setTimeout(checkActive, 300, this.id);
        });

        //绑定门户切换面板左右翻页hover事件
        $('#portal_panel > .left').hover(
         function() { $(this).addClass('left-active'); },
         function() { $(this).removeClass('left-active'); }
      );
        $('#portal_panel > .right').hover(
         function() { $(this).addClass('right-active'); },
         function() { $(this).removeClass('right-active'); }
      );

        //绑定门户切换面板左右翻页click事件
        $('#portal_panel > .left').bind('click', function() { move('l'); });

        $('#portal_panel > .right').bind('click', function() { move('r'); });

        //初始化门户图片的事件
        portalImgs = $("#portal_slider > img");
        resetPortalCss();
        portalImgs.each(function()
        {
            $(this).hover(
				function()
				{
				    var pos = this.src.lastIndexOf('-');
				    if (pos < 0)
				    {
				        this.src = this.src.substr(0, this.src.lastIndexOf('.')) + '-1.png';
				    }
				},
                function()
                {
                    var pos = this.src.lastIndexOf('-');
                    if (pos > 0)
                    {
                        this.src = this.src.substr(0, pos) + '.png';
                    }
                }
			);

            var index = $(this).attr('index');
            //            if (index == "0") {
            //            	$(this).bind('click', function() {
            //            		move('l');
            //            		roll('l');
            //            		movec = window.setInterval(moveC, 5, 'l');
            //            		window.setTimeout(openPortal, 300);
            //            	});
            //            }
            if (index == "0")
            {
                $(this).bind('click', function()
                {
                    move('l');
                    movec = window.setInterval(moveC, 5, 'l');
                    window.setTimeout(openPortal, 300);
                });
            }
            else if (index == "1")
            {
                $(this).bind('click', function()
                {
                    move('l');
                    window.setTimeout(openPortal, 300);
                });
            }
            else if (index == "2")
            {
                $(this).bind('click', function()
                {
                    $(this).effect('bounce', {}, 300, function()
                    {
                        var src = $(this).attr('src').substr($(this).attr('src').lastIndexOf('/') + 1).replace("_1", "");
                        for (var id in portalArray)
                        {
                            if (portalArray[id].src.indexOf(src) >= 0)
                            {
                                $().addTab('portal_' + id, portalArray[id].title, portalArray[id].url, portalArray[id].closable);
                                break;
                            }
                        }
                    });
                });
            }
            else if (index == "3")
            {
                $(this).bind('click', function()
                {
                    move('r');
                    window.setTimeout(openPortal, 300);
                });
            }
            else if (index == "4")
            {
                $(this).bind('click', function()
                {
                    move('r');
                    movec = window.setInterval(moveC, 5, 'r');
                    window.setTimeout(openPortal, 300);
                });
            }
            //            else if (index == "6") {
            //               	$(this).bind('click', function() {
            //               		move('r');
            //               		roll('r');
            //               		movec = window.setInterval(moveC, 5, 'r');
            //               		window.setTimeout(openPortal, 300);
            //               	});
            //            }
        });
    }

    function initShortcut()
    {
        //常用任务事件
        $('#shortcut').bind('click', function()
        {
            if ($('#' + this.id + '_panel:visible').length)
            {
                $('#' + this.id + '_panel').animate({ top: -$('#' + this.id + '_panel').outerHeight() }, 600, function() { $(this).hide() });
                $('#overlay_panel').hide();
                return;
            }
            
            $('#shortcut_panel div[class = "close"] a').css("cursor", "pointer");
            $('#shortcut_panel div[class = "close"] a').eq(1).bind('click', function() { $("#shortcut").click(); });
            //每次打开，动态生成面板内容
            $('#shortcut_block').html('');
            $('#shortcut_panel > .center > .bottom').html('');
            if ($('#shortcut_block').children('div').length <= 0)
            {
                var div = null;
                var count = 0;
                for (var i = 0; i < shortcutArray.length; i++)
                {
                    if (typeof (func_array['f' + shortcutArray[i]]) != "object")
                        continue;

                    if (count % 12 == 0)
                    {
                        $('<div class="page"></div>').appendTo('#shortcut_block');
                        div = $('#shortcut_block > div').last();
                    }

                    var func_id = 'f' + shortcutArray[i];
                    var func_name = func_array[func_id][0];
                    var func_code = func_array[func_id][1];
                    var image = func_array[func_id][2];
                    var open_window = func_array[func_id][3] ? func_array[func_id][3] : "";

                    var onclick = "createTab(" + func_id.substr(1) + ",'" + func_name.replace("'", "\'") + "','" + func_code.replace("'", "\'") + "','" + open_window + "');";
                    var index = $.inArray(image, bigMenuIcons);
                    image = index >= 0 ? image : 'default';
                    var html = '<div class="item" onclick="' + onclick + '"><img src="css/images/' + image + '.png" /><div>' + func_name + '</div></div>';
                    div.append(html);
                    count++;
                }

                //页码图标及其点击事件
                var pages = $('#shortcut_block').children('div').length;
                for (var i = 0; i < pages; i++)
                {
                    $('#shortcut_panel > .center > .bottom').append('<a href="javascript:;" page="' + i + '" hidefocus="hidefocus"></a>');
                }

                $('#shortcut_panel > .center > .bottom > a:first').addClass('active');
                $('#shortcut_panel > .center > .bottom > a').click(function()
                {
                    var block = $('#shortcut_block');
                    var scrollTo = block.outerWidth() * $(this).attr('page');
                    var count = Math.abs($(this).parent().children('a.active').attr('page') - $(this).attr('page'));
                    if (count > 3)
                    {
                        block.scrollLeft(scrollTo);
                    }
                    else
                    {
                        block.animate({ 'scrollLeft': scrollTo }, 600);
                    }
                    $(this).parent().children('a').removeClass('active');
                    $(this).addClass('active');
                });
            }

            //面板位置
            $('.over-mask-layer').hide();
            $('#overlay_panel').show();
            //$('#overlay_panel').height($('#center').height());
            $('#' + this.id + '_panel').css('left', ($(document).width() - $('#' + this.id + '_panel').width()) / 2);
            $('#' + this.id + '_panel').css({ top: -$('#' + this.id + '_panel').outerHeight() });

            var top = $('#' + this.id + '_panel').outerHeight() > $('#center').outerHeight() ? 120 : 40;
            $('#' + this.id + '_panel').show().animate({ top: top }, 600);

            //常用任务图标设为active状态
            $(this).addClass('active');
            window.setTimeout(checkActive, 300, this.id);
        });

        //绑定常用任务面板左右翻页hover事件
        $('#shortcut_panel > .left').hover(
         function() { $(this).addClass('left-active'); },
         function() { $(this).removeClass('left-active'); }
      );
        $('#shortcut_panel > .right').hover(
         function() { $(this).addClass('right-active'); },
         function() { $(this).removeClass('right-active'); }
      );

        //绑定常用任务面板左右翻页click事件
        $('#shortcut_panel > .left').bind('click', function()
        {
            var block = $('#shortcut_block');
            var page = parseInt((block.scrollLeft() - block.outerWidth()) / block.outerWidth());
            var page_bar = $('#shortcut_panel > .center > .bottom > a');
            page = page < 0 ? page_bar.length - 1 : page;
            page_bar.eq(page).click();
        });

        $('#shortcut_panel > .right').bind('click', function()
        {
            var block = $('#shortcut_block');
            var page = parseInt((block.scrollLeft() + block.outerWidth()) / block.outerWidth());
            var page_bar = $('#shortcut_panel > .center > .bottom > a');
            page = page > page_bar.length - 1 ? 0 : page;
            page_bar.eq(page).click();
        });
    }

    function initPersonInfo()
    {
        //控制面板点击事件
        $('#person_info').bind('click', function()
        {
            window.setTimeout(function()
            {
                $().addTab('11', func_array["f1"][0], func_array["f1"][1], func_array["f1"][3]);
            }, 1);   //延迟1毫秒就能从OA精灵窗口打开控制面板标签，奇怪的问题

        });
    }

    function initLogout()
    {
        //注销
        $('#logout').bind('click', function()
        {
            logout();
            return false;
        });
    }

    function initHideTopbar()
    {
        $('#hide_topbar').addClass('up');

        //隐藏topbar事件
        $('#hide_topbar').bind('click', function()
        {
            $('#north').slideToggle("slow", function() { resizeLayout(); });
            $(this).toggleClass('up');

            //            var hidden = $(this).attr('class').indexOf('up') >= 0;
            //            $.cookie('hideTopbar', (hidden ? '1' : null), { expires: 1000, path: '/' });
        });

        //        if ($.cookie('hideTopbar') == '1')
        //            $('#hide_topbar').triggerHandler('click');
    }

    function initSearch()
    {
        //搜索框的回车事件
        $('#keyword').keypress(function(event)
        {
            if (event.keyCode == 13)
                $('#search_submit').trigger('click');
        });
        $("#keyword").autocomplete({
            source: 'search.php',
            select: function(event, ui)
            {
                view_user(ui.item.id)
            }
        });

        $('#search_submit').click(function()
        {
            return;
            var keyword = $('#keyword').val();
            if (!keyword)
                return;

            openURL('', 'OA搜索', "ipanel/ilook/search.php?KWORD=" + keyword);
            $("#keyword").autocomplete('close');
        });
    }
     
     
    //窗口resize事件
    $(window).resize(function() { resizeLayout(); });
    //$(window).bind('beforeunload', function(){exit();});

    $(document).ready(function($)
    {
        $('#loading').remove();

        //调整窗口大小
        resizeLayout();

        //开始菜单
        initStartMenu();

        //标签栏
        initTabs();

        //门户切换
        initPortal();

        //常用任务
        //initShortcut();

        //控制面板事件
        initPersonInfo();

        //注销事件
        initLogout();

        //隐藏topbar事件
        initHideTopbar();

        //搜索框
        initSearch();
         

        //日期时间和天气
        mdate();
        timeview();
   
        window.setInterval(StatusTextScroll, statusTextScroll * 50);
    });
})(jQuery);

//修复setTimeout bug，使用window.setTimeout调用
if(!+'\v1') {
    (function(f){
        window.setTimeout =f(window.setTimeout);
        window.setInterval =f(window.setInterval);
    })(function(f){
        return function(c,t){
            var a=[].slice.call(arguments,2);
            return f(function(){
                c.apply(this,a)},t)
            }
    });
}

//var $ = function(id) {return document.getElementById(id);};

function HTML2Text(html)
{
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
}

function Text2Object(data)
{
    try{
        var func = new Function("return " + data);
        return func();
    } catch(ex) {
        return '<b>' + ex.description + '</b><br /><br />' + HTML2Text(data) + '';
    }
}

//id--标签唯一标识;name--标签名;code--;open_window;
function createTab(id, name, code, open_window) {

    jQuery('#overlay_startmenu').triggerHandler('click');
    jQuery('#funcbar_left > div.second-tabs-container').hide();
    if(code.indexOf('http://') == 0 || code.indexOf('https://') == 0 || code.indexOf('ftp://') == 0)
    {
    	openURL(id, name, code, open_window);
        return;
    }
    else if(code.indexOf('file://') == 0)
    {
    	winexe(name, code.substr(7));
        return;
    }

    var url = code;

 

	 
	var path = parse[4];
	var query = parse[5];

   //菜单地址直接定义为具体文件或路径传递参数的模块
   var pos = path.lastIndexOf('/');
   if(pos > 0 && path.substr(pos+1).indexOf('.') > 0 || query != "")
   {
      openURL(id, name, url, open_window);
      return;
   }
 
   jQuery(document).trigger('click');
}

function closeTab(id)
{
	id = (typeof(id) != 'string') ? jQuery().getSelected() : id;
	jQuery().closeTab(id);
}

function IframeLoaded(id)
{
	var iframe = window.frames['tabs_' + id + '_iframe'];
	if(iframe && $('tabs_link_' + id) && $('tabs_link_' + id).innerText == '')
	{
		$('tabs_link_' + id).innerText = !iframe.document.title ? "无标题" : iframe.document.title;
	}
}

function openURL(id, name, url, open_window, width, height, left, top) {
	id = !id ? ('w' + (nextTabId++)) : id;
	if (open_window != "1")
	{
		window.setTimeout(function() { jQuery().addTab(id, name, url, true) }, 1);
	}
	else
	{
		width = typeof(width) == "undefined" ? 780 : width;
		height = typeof(height) == "undefined" ? 550 : height;
		left = typeof(left) == "undefined" ? (screen.availWidth-width)/2 : left;
		top = typeof(top) == "undefined" ? (screen.availHeight-height)/2-30 : top;
		window.open(url, id, "height="+height+",width="+width+",status=0,toolbar=no,menubar=yes,location=no,scrollbars=yes,top="+top+",left="+left+",resizable=yes");
	}
	jQuery(document).trigger('click');
}

 
function BlinkTabs(id)
{
}

function getEvent() //同时兼容ie和ff的写法
{
    if(document.all)  return window.event;
    func=getEvent.caller;
    while(func!=null){
        var arg0=func.arguments[0];
        if(arg0)
        {
          if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
          {
          return arg0;
          }
        }
        func=func.caller;
    }
    return null;
}

function mdate()
{
//   var solarTerm=sTerm(OA_TIME.getFullYear(), OA_TIME.getMonth(), OA_TIME.getDate());
//   if(solarTerm != "")
    //$('#date').get(0).innerHTML = OA_TIME.getFullYear() + "年" + OA_TIME.getMonth() +"月"+ OA_TIME.getDate()+"日";
}
function timeview()
{
   //$('#time_area').get(0).innerHTML = OA_TIME.toTimeString().substr(0,8);
   //OA_TIME.setSeconds(OA_TIME.getSeconds()+1);
   //window.setTimeout( timeview, 1000);
}

function GetWeather(beUpdate)
{
   var WEATHER_CITY_ID = $('chinacity').options[$('chinacity').selectedIndex].value;
   var WEATHER_CITY = $('chinacity').options[$('chinacity').selectedIndex].text;

   if(WEATHER_CITY == "选择城市" || WEATHER_CITY == "0")
   {
      alert("请选择城市");
      return;
   }

   $('weather').innerHTML='<div class="loading_blue_16">正在加载，请稍候……</div>';
   jQuery.ajax({
      type: 'GET',
      url: '/inc/weather.php',
      data: {'WEATHER_CITY':escape(WEATHER_CITY), 'WEATHER_CITY_ID':WEATHER_CITY_ID, 'UPDATE':beUpdate},
      dataType: 'text',
      success: function(data)
               {
                  if(data.substr(0, 6) == "error:")
                     $('weather').innerHTML = data.substr(6)+" <a href=\"javascript:SetCity('"+WEATHER_CITY_ID+"');GetWeather();\">刷新</a> <a href=\"#\" onclick=\"$('area_select').style.display='block';$('weather').style.display='none';\">更改城市</a>";
                  else
                     $('weather').innerHTML = data;
               },
      error: function (request, textStatus, errorThrown)
             {
                $('weather').innerHTML = "获取天气错误：" + request.status + " <a href=\"javascript:SetCity('"+WEATHER_CITY_ID+"');GetWeather();\">刷新</a> <a href=\"#\" onclick=\"$('area_select').style.display='block';$('weather').style.display='none';\">更改城市</a>";
             }
   });

   $('area_select').style.display='none';
   $('weather').style.display='block';
}

var relogin = 0;
function logout() {
   var msg="您好，" + loginUser.user_name + "！\n\n确认要注销吗？";
   if(window.confirm(msg))
   {
     relogin=1;
     window.location = "../Default.aspx";
   }
}

function exit()
{
   var msg="您好，" + loginUser.user_name + "！\n\n确认要退出吗？";
   if(window.confirm(msg))
   {
      var event = getEvent();
      if(ispirit != "1" || jQuery(document.body).width() - event.clientX < 50 || event.altKey || event.ctrlKey)
      {
         if(jQuery.browser.msie)
             jQuery.get('../Default.aspx');
         else
             window.location = "../Default.aspx";
      }
      window.close();
   }
}

//-- 短信提醒和短信箱面板 --
function ViewNewSms()
{
   var pannelActive = $('smsbox').className.indexOf('active') >= 0;
   if(!pannelActive)
      jQuery('#smsbox').click();
   else
      LoadSms();

   CloseRemind();
   ResetTitle();
}

var documentTitle = document.title;
var blinkTitleInterval = null;
function sms_mon()
{
   jQuery.ajax({
      type: 'GET',
      url: '../attachment/new_sms/' + loginUser.uid + '.sms',
      data: {'now': new Date().getTime()},
      success: function(data){
         //$('new_sms').innerHTML = newSmsHtml;
         if(data == "1")
         {
            $('new_sms_sound').innerHTML = newSmsSoundHtml;
            if(timer_sms_mon)   window.clearTimeout(timer_sms_mon);
            var wWidth = (window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth));
            var wHeight = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
            var left = Math.floor((wWidth - jQuery('#new_sms_panel').outerWidth())/2);
            var top  = Math.floor((wHeight - jQuery('#new_sms_panel').outerHeight())/2) - 100;

            jQuery('#new_sms_panel').css({left:left, top:top});
            jQuery('#new_sms_mask').show();
            jQuery('#new_sms_panel').show();
            jQuery('#new_sms_panel').focus();
            
            blinkTitleInterval = window.setInterval(BlinkTitle, 1000);
         }
      }
   });
   timer_sms_mon = window.setTimeout(sms_mon, monInterval.sms*1000);
}

function BlinkTitle()
{
   document.title = document.title == "　　　　　　　　" ? "您有新的短消息！" : "　　　　　　　　";
}

function ResetTitle()
{
   window.clearInterval(blinkTitleInterval);
   document.title = documentTitle;
}

var maxSendSmsId = 0;
var newSmsArray = [];
var selectedRecvSmsIdStr = selectedSendSmsIdStr = "";
function LoadSms(flag)
{
   jQuery('#smsbox_tips').html('<div class="loading">正在加载，请稍候……</div>').show();
   flag = typeof(flag) == "undefined" ? "1" : "0";
   jQuery.ajax({
      type: 'GET',
      url: 'sms/new_sms/get_sms.php',
      data: {'FLAG': flag},
      success: function(data){
         var array = Text2Object(data);
         if(typeof(array) != "object" || typeof(array.length) != "number" || array.length < 0)
         {
            jQuery('#smsbox_tips').html('<div class="error">' + array + '</div>').show();
            return;
         }
         else if(array.length == 0)
         {
            jQuery('#smsbox_tips').html(jQuery('#no_sms').html()).show(0, function(){jQuery(this).triggerHandler('_show');});
            return;
         }

         for(var i=0; i< array.length; i++)
         {
            var sms_id = array[i].sms_id;
            var bFound = false;
            for(var j=0; j< newSmsArray.length; j++)
            {
               if(sms_id == newSmsArray[j].sms_id)
               {
                  bFound = true;
                  break;
               }
            }
            
            if(!bFound)
               newSmsArray[newSmsArray.length] = array[i];
         }
         
         FormatSms();
      },
      error: function(request, textStatus, errorThrown){
         jQuery('#smsbox_tips').html('<div class="error">获取短消息数据失败(' + request.status + ')：' + textStatus + '</div>').show();
      }
   });
}

function FormatSms()
{
   var bGroupByName = jQuery('#group_by_name').attr('class').indexOf('active') >= 0;
   var array = [];
   var count = 0;
   for(var i=newSmsArray.length-1; i >= 0; i--)
   {
      if(newSmsArray[i].receive != '1')
         continue;
     
      var id = bGroupByName ? newSmsArray[i].from_id : newSmsArray[i].type_id;
      if(typeof(array[id]) != "undefined")
      {
         array[id].count++;
         continue;
      }

      count++;
      var name = bGroupByName ? newSmsArray[i].from_name : newSmsArray[i].type_name;
      var time = newSmsArray[i].send_time.indexOf(' ') > 0 ? newSmsArray[i].send_time.substr(0,5) : newSmsArray[i].send_time;
      var unread = array[id] && array[id].unread ? (array[id].unread || newSmsArray[i].unread) : newSmsArray[i].unread;
      array[id] = {name:name, count:1, time:time, content:newSmsArray[i].content, unread:unread};
   }
   
   if(count == 0)
   {
      jQuery('#smsbox_tips').html(jQuery('#no_sms').html()).show(0, function(){jQuery(this).triggerHandler('_show');});
      return;
   }

   var html = '';
   for(var id in array)
   {
      //取短信内容的前2行内容显示
      var content = array[id].content;
      var pos = content.indexOf('<br />');
      if(pos >= 0)
      {
         var pos2 = content.indexOf('<br />', pos + 6);
         if(pos2 >= 0)
            content = content.substr(0, pos2);
      }
      //alert(HTML2Text(content))
      html += '<div class="list-block" group_id="' + id + '"' + (bGroupByName ? ' user="' + id + '"' : '') + '>';
      html += '   <table class="' + (array[id].unread ? "unread" : "") + '">';
      html += '      <tr><td class="name">' + array[id].name + '</td><td class="count">' + array[id].count + '</td><td class="time">' + array[id].time + '</td></tr>';
      html += '      <tr><td colspan="3" class="msg">' + content + '</td></tr>';
      html += '   </table>';
      html += '</div>';
   }
   jQuery('#smsbox_list_container').html(html);
   jQuery('#smsbox_list_container').triggerHandler('_change');
}

function CreateMsgBlock(msg)
{
   var html = '';
   html += '<div class="msg-block ' + msg["class"] + '" sms_id="' + msg["sms_id"] + '" user="' + msg["user"] + '">';
   html += '   <div class="head">';
   html += '      <div class="name">' + msg["name"] + '&nbsp;' + msg["time"] + '</div>';
   if(msg["url"])
   {
      html += '   <div class="operation">';
      html += '      <a href="javascript:;" class="reply" hidefocus="hidefocus">回复</a>';
      html += '      <a href="javascript:;" class="detail" sms_id="' + msg["sms_id"] + '" url="' + msg["url"] + '" hidefocus="hidefocus">查看详情</a>';
      html += '   </div>';
   }
   html += '   </div>';
   html += '   <div class="msg">' + msg["content"] + '</div>';
   html += '</div>';
   return html;
}

function RemoveSms(recvIdStr, sendIdStr, del)
{
   if(!recvIdStr) return;
   jQuery.ajax({
      type: 'POST',
      url: 'status_bar/sms_submit.php',
      data: {'SMS_ID':recvIdStr, 'DEL':del},
      dataType: 'text',
      success: function(data){
         var array = [];
         for(var i=0; i< newSmsArray.length; i++)
         {
            var id = newSmsArray[i].sms_id;
            if(id == recvIdStr || recvIdStr.indexOf(id+',') == 0 || recvIdStr.indexOf(','+id+',')> 0 ||
               id == sendIdStr || sendIdStr.indexOf(id+',') == 0 || sendIdStr.indexOf(','+id+',')> 0)
               continue;
            
            array[array.length] = newSmsArray[i];
         }
         newSmsArray = array;
         
         
         if(recvIdStr.indexOf(',') > 0) //多条
         {
            selectedRecvSmsIdStr = selectedSendSmsIdStr = '';
            FormatSms();
         }
         else //一条
         {
            jQuery('#smsbox_msg_container > div.msg-block[sms_id="' + recvIdStr + '"]').remove();
            
            if(selectedRecvSmsIdStr.indexOf(recvIdStr+',') == 0)
               selectedRecvSmsIdStr = selectedRecvSmsIdStr.substr(recvIdStr.length+1);
            if(selectedRecvSmsIdStr.indexOf(','+recvIdStr+',') > 0)
               selectedRecvSmsIdStr = selectedRecvSmsIdStr.replace(','+recvIdStr+',', '');
            
            if(jQuery('#smsbox_msg_container > div.msg-block').length == 0)
               FormatSms();
         }
      },
      error: function (request, textStatus, errorThrown){
         alert('操作失败：' + textStatus);
      }
   });
}

function CloseRemind()
{
   jQuery('#new_sms_mask').hide();
   jQuery('#new_sms_panel').hide();
   timer_sms_mon = window.setTimeout(sms_mon, monInterval.sms*1000);
   
   ResetTitle();
}

function GetSmsIds()
{
   var recvIds = sendIds = '';
   for(var i=newSmsArray.length-1; i >= 0; i--)
   {
      if(newSmsArray[i].sms_id == '')
         continue;
      
      if(newSmsArray[i].receive == '1')
         recvIds += newSmsArray[i].sms_id + ',';
      else
         sendIds += newSmsArray[i].sms_id + ',';
   }
   
   return { recv : recvIds, send : sendIds };
}
//-- 组织面板 --
function ActiveUserTab(obj)
{
   if(obj.className.indexOf('active') >= 0)
      return;

   jQuery('#org_panel > .head > div >a.active').removeClass('active');
   jQuery(obj).addClass('active');
   jQuery('#user_online').toggle();
   jQuery('#user_all').toggle();
   jQuery('#org_panel').triggerHandler('_show');
}

function ViewOnlineUser()
{
   var pannelActive = $('org').className.indexOf('active') >= 0;
   var onlineActive = $('user_online_tab').className.indexOf('active') >= 0;
   if(pannelActive)
   {
      if(onlineActive)
         jQuery('#org').click();
      else
         ActiveUserTab($('user_online_tab'));
   }
   else
   {
      jQuery('#org').click();
      ActiveUserTab($('user_online_tab'));
   }
}

 
function LoadOnlineTree()
{
   $('onlineTree').innerHTML = '<div class="loading">正在加载，请稍候……</div>';
   jQuery.ajax({
      type: 'GET',
      url: '/inc/online.php',
      data: {'TYPE': 1},
      success: function(data){
         BulidOnlineTree(data);
         jQuery('#user_online').jscroll();
         timer_online_tree_ref = window.setTimeout(LoadOnlineTree, monInterval.online*5*1000);
         timeLastLoadOnline = (new Date()).getTime();
      },
      error: function(request, textStatus, errorThrown){
         $('onlineTree').innerHTML = "<div class='tips'>刷新人员列表错误：" + request.status + "</div>";
         timer_online_tree_ref = window.setTimeout(LoadOnlineTree, monInterval.online*5*1000);
      }
   });
}

function BulidOnlineTree(data)
{
   if(data.substr(0,4)!="+OK ")
   {
      $('onlineTree').innerHTML = data;
      return;
   }

   data = data.substr(4);
   var user_count=data.substr(0,data.indexOf(":"));
   user_count = isNaN(parseInt(user_count)) ? 1 : parseInt(user_count);
   data = data.substr(data.indexOf(":")+1, data.length);

   tree = new MzTreeView("tree");
   tree.icons    = {
     L0        : 'transparent.gif',  //┏
     L1        : 'transparent.gif',  //┣
     L2        : 'transparent.gif',  //┗
     L3        : 'transparent.gif',  //━
     L4        : 'transparent.gif',  //┃
     empty     : 'transparent.gif',     //空白图
     PM0       : 'P0.png',  //＋┏
     PM1       : 'P0.png',  //＋┣
     PM2       : 'P0.png',  //＋┗
     PM3       : 'P0.png',  //＋━
     root      : 'root.png',   //缺省的根节点图标
     folder    : 'folder.png', //缺省的文件夹图标
     file      : 'file.png',   //缺省的文件图标
     exit      : 'exit.gif',
     U00      : 'U00.png',
     U01      : 'U01.png',
     U02      : 'U02.png',
     U03      : 'U03.png',
     U10      : 'U10.png',
     U11      : 'U11.png',
     U12      : 'U12.png',
     U13      : 'U13.png'
   };
   tree.iconsExpand = {
     PM0       : 'M0.png',     //－┏
     PM1       : 'M0.png',     //－┣
     PM2       : 'M0.png',     //－┗
     PM3       : 'M0.png',     //－━
     folder    : 'folderopen.png',
     exit      : 'exit.gif'
   };
   tree.setIconPath("/images/user_list3/");
   tree.nodes['0,TDOA']='type:1;text:'+unit_name+';';
   eval(data);

   var html=tree.toString();
   if(tree.totalNode<=1)
   {
      $('onlineTree').innerHTML = "<div class='tips'>尚未定义部门，<br>无法显示人员列表</div>";
   }
   else
   {
      $('onlineTree').innerHTML = html;
      tree.expandAll();
      tree.initAll(tree.node["0"].childNodes);
      $('user_count').innerHTML = user_count;
   }
}

function SearchUser(USER_ID)
{
   openURL('', '人员查询', "ipanel/user/query.php");
}

function view_user(USER_ID)
{
   openURL('', '', "ipanel/user/user_info.php?USER_ID="+USER_ID+"&WINDOW=1", "1", 910, 585);
}
 
function winexe(NAME,PROG)
{
   var URL="/general/winexe?PROG="+PROG+"&NAME="+NAME;
   window.open(URL,"winexe","height=100,width=350,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top=0,left=0,resizable=no");
}

//-- 状态栏文字 --
function StatusTextScroll()
{
   var obj = jQuery('#status_text');
   var scrollTo = obj.scrollTop() + obj.height();
   if(scrollTo >= obj.attr('scrollHeight'))
      scrollTo = 0;
   obj.animate({scrollTop: scrollTo}, 300);
}

 