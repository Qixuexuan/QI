
var modalWindowPrefix = "ModalWin"; //头部CSS名称

function showModalWindow_New(title, width, height, top, left, url, cz_index, hideHead)
{
    if (getWindow().jQuery(".ModalWindowStyle").length > 3)
    {
        alert("当前活动窗口数量太多，请先关闭不在使用的窗口！");
        return;
    }

    var align = "";
    if (height == "-1")
    {
        height = jQuery(getWindow()).height() - 130;
        align = "right";
    }

    if (!width) width = 400;
    if (!height) height = 500;

    height = height + 23;

    //width = Math.min(width, 1000);
    //height = Math.min(height, 560);

    var a = new ModalWindow_New(title, width, height, top, left, url, hideHead, align, cz_index);

    a.bulid();

    getWindow().Resizable();
    return false;
}
//创建一个对象;
function ModalWindow_New(tit, w, h, t, l, u, hideHead, align, cz_index)
{
    var position = "";
    var mCount = 0;
    this.width = w;
    this.height = h;


    position = "middle";

    //得到right窗口个数
    mCount = jQuery(".ModalWindowStyle[myposition='middle']").length;

    this.left = l;
    this.top = t;

    this.title = tit;
    this.url = u;
    this.isTab = (u.split('?')[0].toLowerCase().indexOf("tabpage.aspx") >= 0);
    this.isHideHead = hideHead;
    if (this.isHideHead)
    {
        this.height = this.height - 28;
        this.top = this.top + 14;
    }

    if (align == "right" || align == "left")
    {
        this.top = this.top + 75;
        this.height = this.height - 80;
    }

    addGlobalZIndex(3);
    this.zIndex = getGlobalZIndex();


    //pindex,cindex 父zindex 子窗口zindex	
    if (typeof (cz_index) == "undefined")
    {
        this.id = modalWindowPrefix + "_" + this.zIndex;
    }
    else
    {
    
        if (cz_index.indexOf("pic") > -1)
        {
            this.id = cz_index;
        }
        else
        {
            this.id = cz_index + "_" + this.zIndex;
        }
    }

    if (this.url.indexOf("?") == -1)
    {
        this.url += "?cz_index=" + this.id;
    }
    else
    {
        this.url += "&cz_index=" + this.id;
    }
     
    this.bulid = function ()
    {
        var str = ""
		//主体层1
		+ "<div id='" + this.id + "' "
		+ "myheight='" + this.height + "' "  //自定义高度属性
		+ "myposition='" + position + "' "  //自定义位置属性
		+ (this.isTab ? "class='ModalWindowStyle_Tab' " : "class='ModalWindowStyle' ") //定义样式
		+ "style='"
		+ "z-index:" + getMaxIndex(this.zIndex) + ";"
		+ "width:" + this.width + "px;"
		+ "height:" + this.height + "px;"
		+ "left:" + this.left + "px;"
		+ "top:" + this.top + "px;'>"
		//窗体头层1.1
			+ "<div "
			+ "class='ModalWindowHeadStyle' "//定义样式
			+ (this.isHideHead ? "style='display: none;' " : "")
			+ "onmousedown='startDrag(this)' "
			+ "onmouseup='stopDrag(this)' "
			+ "onmousemove='drag(this)'"
			+ ">"
				+ "<div class='HeadLeft'></div>"
				+ "<div class='HeadMid'>"
					+ "<span>" + this.title + "</span>"
				+ "</div>"
				+ "<div class='HeadRight'></div>"
		//关闭箭头
				+ '<a href="javascript:void(0);" onclick="shutup(this);" class="ModelWindowShutup show hidden" style="right:45px;"></a>'
				+ '<a href="javascript:void(0);" onclick="removeModalWindow(\'' + this.id + '\');"></a>'
			+ "</div>"
		//内容层1.2
		//+ "<div class='ModalWindowContentStyle' style='height:" + (this.height - 32).toString() + "px;'>"
			+ "<div class='ModalWindowContentStyle' style='height:100%;'>"
				+ "<iframe style=' visibility:inherit; width:100%; height:100%;' src='" + this.url + "' frameborder='no' allowtransparency='true'> </iframe>"
			+ "</div>"
		+ "</div>"//主体层1结束

        var modalWindow = jQuery(getDocument().body).append(str).find("#" + this.id);
        modalWindow.focus();
    };
}


//----------------------------------------------------外部调用方法----------------------------------------------------
//显示模态窗口
function showModalWindow(title, width, height, url, cz_index, hideHead,isResizable)
{
    if (getWindow().jQuery(".ModalWindowStyle").length > 3)
    {
        alert("当前活动窗口数量太多，请先关闭不在使用的窗口！");
        return;
    }

    var align = "";
    if (height == "-1")
    {
        height = jQuery(getWindow()).height() - 130;
        align = "right";
    }

    if (!width) width = 400;
    if (!height) height = 500;

    height = height + 23;

    //width = Math.min(width, 1000);
    //height = Math.min(height, 560);

    var a = new ModalWindow(title, width, height, url, hideHead, align, cz_index);

    a.bulid();
    if (isResizable)
    {
        getWindow().Resizable();
    }
    return false;
}
//创建一个对象;
function ModalWindow(tit, w, h, u, hideHead, align, cz_index)
{
    var position = "";
    var mCount = 0;
    this.width = w;
    this.height = h;

    this.top = getWindow().pageYOffset ? getWindow().pageYOffset : getDocument().documentElement.scrollTop;
    if (jQuery(getWindow()).height() > this.height)
    {
        this.top += (jQuery(getWindow()).height() - this.height) / 2;
    }

    if (align == "right")
    {
        position = "right";

        //得到right窗口个数
        mCount = jQuery(".ModalWindowStyle[myposition='right']").length;

        this.left = (getDocument().body.clientWidth - this.width) - mCount * 6;
        this.top = this.top + mCount * 3;
    }
    else if (align == "left")
    {
        position = "left";

        //得到right窗口个数
        mCount = jQuery(".ModalWindowStyle[myposition='right']").length;

        this.left = 0 + mCount * 6;
        this.top = this.top + mCount * 3;
    }
    else
    {
        position = "middle";

        //得到right窗口个数
        mCount = jQuery(".ModalWindowStyle[myposition='middle']").length;

        this.left = (getDocument().body.clientWidth - this.width) / 2 + mCount * 10;
        this.top = this.top + mCount * 5;
    }


    this.title = tit;
    this.url = u;
    this.isTab = (u.split('?')[0].toLowerCase().indexOf("tabpage.aspx") >= 0);
    this.isHideHead = hideHead;
    if (this.isHideHead)
    {
        this.height = this.height - 28;
        this.top = this.top + 14;
    }

    if (align == "right" || align == "left")
    {
        this.top = this.top + 75;
        this.height = this.height - 80;
    }

    addGlobalZIndex(3);
    this.zIndex = getGlobalZIndex();


    //pindex,cindex 父zindex 子窗口zindex	
    if (typeof (cz_index) == "undefined")
    {
        this.id = modalWindowPrefix + "_" + this.zIndex;
    }
    else
    {
        //added by xuh on 20150804 用于判断是否为照片对比的开窗
        if (cz_index.indexOf("pic") > -1)
        {
            this.id = cz_index;
        }
        else
        {
            this.id = cz_index + "_" + this.zIndex;
        }
    }

    if (this.url.indexOf("?") == -1)
    {
        this.url += "?cz_index=" + this.id;
    }
    else
    {
        this.url += "&cz_index=" + this.id;
    }

    //alert(getMaxIndex(this.zIndex));

    this.bulid = function ()
    {
        var str = ""
		//主体层1
		+ "<div id='" + this.id + "' "
		+ "myheight='" + this.height + "' "  //自定义高度属性
		+ "myposition='" + position + "' "  //自定义位置属性
		+ (this.isTab ? "class='ModalWindowStyle_Tab' " : "class='ModalWindowStyle' ") //定义样式
		+ "style='"
		+ "z-index:" + getMaxIndex(this.zIndex) + ";"
		+ "width:" + this.width + "px;"
		+ "height:" + this.height + "px;"
		+ "left:" + this.left + "px;"
		+ "top:" + this.top + "px;'>"
		//窗体头层1.1
			+ "<div "
			+ "class='ModalWindowHeadStyle' "//定义样式
			+ (this.isHideHead ? "style='display: none;' " : "")
			+ "onmousedown='startDrag(this)' "
			+ "onmouseup='stopDrag(this)' "
			+ "onmousemove='drag(this)'"
			+ ">"
				+ "<div class='HeadLeft'></div>"
				+ "<div class='HeadMid'>"
					+ "<span>" + this.title + "</span>"
				+ "</div>"
				+ "<div class='HeadRight'></div>"
		//关闭箭头
				+ '<a href="javascript:void(0);" onclick="shutup(this);" class="ModelWindowShutup show hidden" style="right:45px;"></a>'
				+ '<a href="javascript:void(0);" onclick="removeModalWindow(\'' + this.id + '\');"></a>'
			+ "</div>"
		//内容层1.2
		//+ "<div class='ModalWindowContentStyle' style='height:" + (this.height - 32).toString() + "px;'>"
			+ "<div class='ModalWindowContentStyle' style='height:100%;'>"
				+ "<iframe style=' visibility:inherit; width:100%; height:100%;' src='" + this.url + "' frameborder='no' allowtransparency='true'> </iframe>"
			+ "</div>"
		+ "</div>"//主体层1结束

        var modalWindow = jQuery(getDocument().body).append(str).find("#" + this.id);
        modalWindow.focus();
    };
}

//显示所有弹出窗
function ShowModelWindow()
{
    jQuery(".ModalWindowContentStyle").show();
    jQuery(".ModelWindowShutup").addClass('hidden');
    jQuery(".ui-icon-gripsmall-diagonal-se").show();

    jQuery(".ModalWindowStyle").each(function ()
    {
        jQuery(this).height(jQuery(this).attr("myheight"));
    });
}

//隐藏所有弹出窗
function HideModelWindow()
{
    jQuery(".ModalWindowStyle").each(function ()
    {
        if (jQuery(this).attr("myposition") != "right")
        {
            jQuery(".ModalWindowContentStyle", this).hide();
            jQuery(".ModelWindowShutup", this).removeClass('hidden');
            jQuery(".ui-icon-gripsmall-diagonal-se", this).hide();
            jQuery(this).height(0);
        }
    });
}

//关闭所有弹出窗
function CloseModelWindow()
{ 
   
}


//最大最小化
function shutup(obj)
{
    var ModalWindow = jQuery(obj).parent().parent();

    var modelDiv = jQuery(ModalWindow).find(".ModalWindowContentStyle");
    var diagonal = jQuery(ModalWindow).find(".ui-icon-gripsmall-diagonal-se");

    if (jQuery(obj).hasClass("hidden"))
    {
        jQuery(modelDiv).hide();
        jQuery(diagonal).hide();
        jQuery(ModalWindow).height(0);
    }
    else
    {
        jQuery(modelDiv).show();
        jQuery(diagonal).show();
        jQuery(ModalWindow).height(jQuery(ModalWindow).attr("myheight"));
    }

    jQuery(obj).toggleClass('hidden');
}

//-----------------------------核心关闭窗口方法-----------------------------
function removeModalWindow(id)
{
    var pid = id.substring(0, id.lastIndexOf("_"));
    var body = jQuery(getDocument().body);
    var myposition = body.find("#" + id).attr("myposition");
    body.find("#" + id).remove();

    //如果是右弹出窗口，不需要刷新父页面
    if (myposition == "right") return;

    var refreshPage;
    if (pid == modalWindowPrefix)
    {
        refreshPage = getWindow().refreshPage;
    }
    else
    {
        if (getDocument().getElementById(pid) != null)
        {
            refreshPage = getDocument().getElementById(pid).getElementsByTagName("iframe")[0].contentWindow.refreshPage;
        }
    }

    if (refreshPage) { refreshPage(); }
}

function closeModalWindow(z_index)
{
    
    if (typeof (z_index) == "undefined" || z_index == "")
    {
       
        jQuery(getModalWindow()).find("a:last").click();
    }
    else
    {
        jQuery(getDocument().getElementById(z_index)).find("a:last").click();
    }
}

function getModalWindow()
{
    var zIndex = getGlobalZIndex();
    
    if (zIndex == 10000)
    {
        return null;
    }
    else
    {
        return getDocument().getElementById(modalWindowPrefix + "_" + zIndex.toString());
    }
}
function isModalWindow()
{
    if (typeof (getUrlVar('cz_index')) == "undefined")
    {
        return false;
    }
    else
    {
        return true;
    }
}


//--------------------------------获取全局zIndex--------------------------------
//得到全局zIndex
function getGlobalZIndex()
{
    return parseInt(getGlobalZIndexControl().val());
}

//累加全局zIndex
function addGlobalZIndex(value)
{
    var o = getGlobalZIndexControl();
    o.val(parseInt(o.val()) + value);
}

//生成全局zIndex
function getGlobalZIndexControl()
{
    var c = jQuery(getDocument().body).find("#_zIndexControl");

    if (!c.is('input'))
    {
        jQuery(getDocument().body).find("form:first").append("<input id='_zIndexControl' type='hidden' value='10000' />");
    }
    return jQuery(getDocument().body).find("#_zIndexControl");
}

//取得最大z-index 加1
function getMaxIndex(maxindex)
{
    var max_index = parseInt(maxindex);

    getWindow().jQuery(".ModalWindowStyle").each(function ()
    {
        var objindex = parseInt(jQuery(this).css("z-index"));
        if (max_index < objindex)
            max_index = objindex;
    });
    max_index = max_index + 1;
    return max_index;
}

//--------------------------------------拖动--------------------------------------

var x0 = 0, y0 = 0, x1 = 0, y1 = 0;
var offx = 0, offy = 0;
var moveable = false;

//开始拖动;
function startDrag(obj)
{
    var ModalWindow = jQuery(obj).parent();
    var max_index = jQuery(ModalWindow).css("z-index");
    jQuery(ModalWindow).css("z-index", getMaxIndex(max_index));

    if (event.button == 1 || event.button == 0)
    {
        //锁定标题栏;
        if (event.button == 1)
        {
            obj.setCapture();
        }
        //定义对象;
        var win = obj.parentNode;
        //记录鼠标和层位置;
        x0 = event.clientX;
        y0 = event.clientY;
        x1 = parseInt(win.style.left);
        y1 = parseInt(win.style.top);
        moveable = true;
    }
}
//拖动;
function drag(obj)
{
    if (moveable)
    {
        var win = obj.parentNode;
        win.style.left = x1 + event.clientX - x0;
        win.style.top = y1 + event.clientY - y0;

        //窗口在可见区域内
        if (event.clientY <= 0)//上边界
        {
            obj.releaseCapture();
            moveable = false;
            win.style.top = 0;
        }
        var currentHeight = getWindow().document.body.clientHeight;
        if (event.clientY > currentHeight)//下边界
        {
            obj.releaseCapture();
            moveable = false;
            win.style.top = currentHeight - 20;
        }
    }
}
//停止拖动;
function stopDrag(obj)
{
    if (moveable)
    {
        if (event.button == 1)
        {
            obj.releaseCapture();
        }
        moveable = false;
    }
}

//得到根窗口对象
function getWindow()
{
    var w = window;
    while (w.parent.location.href != w.location.href) { w = w.parent; }
    return w;
}

function getDocument()
{
    return getWindow().document;
}

//--------------------------------------消息纸条--------------------------------------
//显示消息纸条
function showMessageNote(message)
{
    var div = jQuery(getDocument()).find('#divMessageNote');
    if (!div.is('div'))
    {
        alert(message);
        return;
    };

    //alert(message);
    div.children("#divMessageNoteContent").html("<a href='javascript:void(0);'>" + message + "</a>");

    jQuery(getDocument()).find('#divMessageNote').show();
    jQuery(getDocument()).find('#divMessageNote').css("bottom", "0");
    //div.animate({ bottom: 0 }, 1500, function() { alert(message); });

    getWindow().setTimeoutClosTip();
}

function hideMessageNote()
{
    var div = jQuery(getDocument()).find('#divMessageNote');
    if (!div.is('div'))
    {
        return;
    };
    div.animate({ bottom: -76 }, 500, function () { jQuery(getDocument()).find('#divMessageNote').hide(); });
}

//得到指定名称的对象
function getObject(objName)
{
    var o = null;
    o = window.document.getElementById(objName); //当前文档对象
    if (o != null) return o;

    var pd = getDocument(true); //得到根

    o = pd.getElementById(objName); //根文档对象
    if (o != null) return o;

    //2
    if (pd.frames.length != 0)
    {
        for (i = 0; i < pd.frames.length; i++)
        {
            o = pd.frames[i].self.window.document.getElementById(objName); //第二级
            if (o != null) return o;

            //3
            if (pd.frames[i].frames.length != 0)
            {
                for (j = 0; j < pd.frames[i].frames.length; j++)
                {
                    o = pd.frames[i].frames[j].self.window.document.getElementById(objName); //第三级
                    if (o != null) return o;

                    //4
                    if (pd.frames[i].frames[j].frames.length != 0)
                    {
                        for (q = 0; q < pd.frames[i].frames[j].frames.length; q++)
                        {
                            o = pd.frames[i].frames[j].frames[q].self.window.document.getElementById(objName); //第四级
                            if (o != null) return o;
                        }
                    }
                }
            }
        }
    }

    return null;
}


function closeAndReload()
{

    var button = getObject('btnFind');
    button.click();

    closeWindow();
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getUrlVar(name)
{
    return getUrlVars()[name];
}
