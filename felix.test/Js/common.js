
//关闭窗体
function ClosePage(isClose)
{
    if (ConvertBoolean(isClose))
    {
        if (window.parent)
        {
            window.parent.closed();
        }
        else if (window)
            window.close();
    }
}
//打开模态窗体
function openModalDialog(width, height, url)
{
    var valueTextBoxs = new Array(2);
    var L = (screen.width - width) / 2;
    var T = (screen.height - height) / 2;
    var res = window.showModalDialog(url, valueTextBoxs, 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px; dialogLeft:' + L + 'px; dialogTop:' + T + 'px;  status=no;help=no;resizable=no')
    if (valueTextBoxs != null && valueTextBoxs.length > 0)
    {
        if (valueTextBoxs[0] && valueTextBoxs[0] == "RefreshData" && valueTextBoxs[1] && valueTextBoxs[1] != "")
        {
            if (typeof (RefreshDataView))
            {
                RefreshDataView();
                window.top.window.DialogboxShow(valueTextBoxs[1], true)
            }
        }
        else if (valueTextBoxs[0] && valueTextBoxs[0] == "RefreshDataView")
        {
            if (typeof (RefreshDataView))
            {
                RefreshDataView();
            }
        }
        else if (valueTextBoxs[0] && valueTextBoxs[0] == "BookPrint" && valueTextBoxs[1] && valueTextBoxs[1] != '')//预订篇转向预订查询页面
        {
            window.top.window.DialogboxShow('操作成功！', true)
            var strurl = valueTextBoxs[1];
            if (strurl.indexOf("＾") > 0)
            {
                var rls = strurl.split("＾");
                if (rls.length > 1)
                {
                    OpenWindow(800, 600, rls[1]);
                    setTimeout("window.top.document.all[\"mainfrm\"].src ='" + rls[0] + "'", 250);

                }
            }
            else
            {
                window.top.document.all["mainfrm"].src = strurl;
            }

        }
    }

}

//打开模态窗体
function openModalDialogExtend(width, height, url, id, controlId, objitemid, controlType, xColumn, objID, refurbishControl)
{
    var valueTextBoxs = new Array(2);
    var L = (screen.width - width) / 2;
    var T = (screen.height - height) / 2;
    var res = window.showModalDialog(url, valueTextBoxs, 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px; dialogLeft:' + L + 'px; dialogTop:' + T + 'px;  status=no;help=no;resizable=no')
    if (valueTextBoxs != null && valueTextBoxs.length > 1 && ConvertBoolean(refurbishControl))
    {
        RefurbishControlByBtn(controlId, controlType, xColumn, objID, valueTextBoxs[0], valueTextBoxs[1]);
    }
}
//打开自定义的页面
function OpenDefinedPageExtend(url, id, controlId, objitemid, controlType, xColumn, objID)
{
    if (window.top && window.top.document && window.top.document.all["mainfrm"])
        window.top.document.all["mainfrm"].src = url;
    else if (window.top && window.top.document)
    {
        window.top.window.location = url;
    }
}
//打开窗体
function OpenWindowExtend(width, height, url, id, controlId, objitemid, controlType, xColumn, objID)
{
    var L = (screen.width - width) / 2;
    var T = (screen.height - height) / 2;
    window.open(url, '', 'width=' + width + ',height=' + height + ',left=' + L + ',top=' + T + ', toolbar=no,  scrollbars=yes,resizable=no,location=no,status=no');
}

//打开窗体
function OpenWindow(width, height, url)
{
    showModalWindow('', width, height, url)
}

//打开Folder模组
function OpenFolderModule(IsOverride, ModuleID, width, height)
{
    if (ConvertBoolean(IsOverride))
    {
        //引用Folder模组
        self.location.href = '../../ND/Module/FolderModule.aspx?pFolderTypeID=' + ModuleID;
    }
    else
    {
        var L = (screen.width - width) / 2;
        var T = (screen.height - height) / 2;
        //引用Folder模组
        window.open('../../ND/Module/FolderModule.aspx?pFolderTypeID=' + ModuleID, '',
            'width=' + width + ',height=' + height + ',left=' + L + ',top=' + T + ',scrollbars=yes,titlebar=no,toolbar=no,resizable=yes');
    }
}

//打开自定义的页面
function OpenDefinedPage(url)
{
    if (window.top && window.top.document && window.top.document.all["mainfrm"])
        window.top.document.all["mainfrm"].src = url;
    else if (window.top && window.top.document)
    {
        window.top.window.location = url;
    }
}
//超时跳转
function baseOpenDefault(url)
{
    if (window.top && window.top.window.opener)
    {
        if (window.top.opener.window.top)
        {
            window.top.opener.window.top.location = url;
            window.top.window.close();
        } else
        {
            window.opener.window.location = url;
            window.top.window.close();
        }
    }
    else if (window.opener != null)
    {
        if (window.opener.window.top)
        {
            window.opener.window.top.location = url;
            window.top.window.close();
        } else
        {
            window.opener.window.location = url;
            window.top.window.close();
        }
    }
    else if (window.parent)
    {
        window.parent.window.top.location = url;
        if (window.parent.dialogArguments)
        {
            self.close();
        }
    } else
    {
        window.top.window.location = url;
    }
}

//转换成bool类型
function ConvertBoolean(obj)
{
    if (obj == null || obj == undefined)
        return false;
    else if (obj || obj == "1" || obj == 1 || obj.toString().toLowerCase() == "true")
        return true;
    else
        return false;
}
function convertString(obj)
{
    if (obj == null || obj == undefined || obj == NaN)
        return "";
    else if (typeof (obj) == "int" && typeof (obj) == "Number" && isNaN(obj))
        return "";
    return obj
}

//webcom所选值改变之后事件
function webcomboChange(webcomId)
{

}
function webdateOnBlur(oDateChooser, dummy, oEvent)
{
    if (oDateChooser && oDateChooser.getValue() && typeof (oDateChooser.getValue()) == "object")
    {
        var keyValue = oDateChooser.getText();
        if (keyValue)
        {
            oDateChooser.setValue(keyValue);
            Anthem_InvokePageMethod('ControlRelationshipDealWith', [oDateChooser.Id, keyValue], null);
        }
    }
}
function setWebComValues(webComboId, value)
{
    if (igcmbo_getComboById(webComboId))
        igcmbo_getComboById(webComboId).setDisplayValue(value)
}

//显示树下拉框
function showDropDownTree(divId, iframeDivId, width, height, url, iframeId, isEnabled)
{
    var e = $$(divId);
    if (!$$(iframeDivId))
    {
        var iframeDiv = document.createElement("div");
        iframeDiv.id = iframeDivId;
        iframeDiv.className = "dropdownlistTree";
        var divStyle = iframeDiv.style;
        divStyle.position = "absolute";
        divStyle.zIndex = "1000";
        var postionDiv = GetAbsoluteLocationEx(e);
        divStyle.left = parseInt(postionDiv.absoluteLeft) - width + postionDiv.offsetWidth + 2;
        divStyle.top = parseInt(postionDiv.absoluteTop) + postionDiv.offsetHeight + 4; ;
        iframeDiv.innerHTML = "<iframe id=\"" + iframeId + "\" frameborder=\"0\" width=\"100%\" height=\"100%\" scrolling=\"auto\" src=\"" + url + "\" class=\"dropdownlistTreeIframe\" ></iframe>";
        document.body.appendChild(iframeDiv);
    }
    $$(iframeDivId).className = "dropdownlistTree";
    $$(iframeDivId).style.display = "block";
    $$(iframeDivId).style.height = height + "px";
    $$(iframeDivId).style.width = width + "px";

}

function setDropDownTreeValueByParas(ctlId, key, value)
{
    //    $$(ctlId + "_txt").value = value;
    Anthem_InvokePageMethod('SetDropDownTreeValue', [ctlId, key, value], null);
    if (document.getElementById(ctlId).onblur)
        document.getElementById(ctlId).onblur();
}


//去掉字串两端空格
function trim(str)
{
    if (str && str.replace)
        return str.replace(/^[ \t\n\r]+/g, "").replace(/[ \t\n\r]+$/g, "");
    return str;
}

//获取对象
function $$(id)
{
    var obj = document.getElementById(id);
    if (obj)
        return obj;
    else
    { obj = document.all[id]; }
    return obj;
}

//去掉所有的html标记
function delHtmlTag(str)
{
    return str.replace(/<\/?.+?>/g, "");
}

var ImgBox = function()
{
    if (window.top)
    {
        if (window.top.window.document)
        {
            if (window.top.window.document.body)
            {
                this.objDocument = window.top.window.document;
            }
            else
                this.objDocument = window.document;
        }
    }
    else
        this.objDocument = window.document;

}

function imgGridViewChange(imgWidth, objDocument)
{//图片逐渐放大效果
    if (parseInt(objDocument.getElementById("imgGridView").style.width) < imgWidth)
    {
        objDocument.getElementById("imgGridView").style.width = objDocument.getElementById("imgGridView").style.pixelWidth + 10;
        objDocument.getElementById("ImgDialog").style.width = objDocument.getElementById("ImgDialog").style.pixelWidth + 10;
        setTimeout(function() { imgGridViewChange(imgWidth, objDocument); }, 5);
    }
    else
        this.transImg('0', objDocument);

}
//图片滤镜效果
function transImg(enable, objDocument)
{
    objDocument.getElementById("imgGridView").filters.blendtrans.Apply();
    objDocument.getElementById("imgGridView").filters[0].enabled = enable;
    objDocument.getElementById("imgGridView").filters.blendtrans.Play();
}
ImgBox.prototype = {

    imgGridViewChange: function(imgWidth)
    {//图片逐渐放大效果
        imgGridViewChange(imgWidth, this.objDocument);
    },
    CreatImg: function(imgScr)
    {
        var imgWidth, imgHeight, L, T;
        if (this.objDocument.body.offsetWidth)
            imgWidth = 400 * this.objDocument.body.offsetWidth / screen.width;
        if (this.objDocument.body.offsetHeight)
            imgHeight = 300 * this.objDocument.body.offsetHeight / screen.height;
        if (this.objDocument.body.offsetHeight && this.objDocument.body.offsetWidth)
        {
            L = (this.objDocument.body.offsetWidth - imgWidth) / 2;
            T = (this.objDocument.body.offsetHeight - imgHeight) / 2;
        }
        else
        {
            L = (screen.width - imgWidth) / 2;
            T = (screen.height - imgHeight) / 2;
        }
        if (imgWidth > imgHeight)
            imgWidth = imgHeight;

        var objDialog = this.objDocument.getElementById("ImgDialog");
        if (!objDialog)
            objDialog = this.objDocument.createElement("div");
        objDialog.id = "ImgDialog";
        var oS = objDialog.style;
        oS.display = "block";
        oS.top = T + "px";
        oS.left = L + "px";
        oS.margin = "0px";
        oS.padding = "0px";
        oS.width = "10px";

        oS.position = "absolute";
        oS.zIndex = "2000";
        oS.background = "#FFF";
        oS.border = "solid #69aef0 1px";
        var obj = this.objDocument
        objDialog.innerHTML = "<img id=\"imgGridView\"  style=\"filter:alpha(opacity=30,enabled=1) blendtrans(duration=1);border:0 solid black\"  width=\"" + imgWidth + "\" src='" + imgScr + "' alt=\"单击取消图片 \" />";
        this.objDocument.body.appendChild(objDialog);
        this.objDocument.getElementById("imgGridView").style.width = "10px";
        setTimeout(function() { imgGridViewChange(imgWidth, obj); }, 5);
        this.objDocument.getElementById("ImgDialog").onclick = function() { var msg = new ImgBox(); msg.hideImgDiv(); delete msg }
        event.cancelBubble = true;
    },
    hideImgDiv: function()
    {
        transImg('1', this.objDocument);
        this.objDocument.getElementById("ImgDialog").style.display = 'none';
    }

}
function CreatImgDiv(imgUrl)
{
    var img = new ImgBox();
    img.CreatImg(imgUrl);
    delete img;
}

//消息框
function hidInfDiv(iAlpha, objWindow)
{

    var objDialog = objWindow.getElementById("InformationDiaDiv");
    if (objDialog)
    {
        while (iAlpha >= 0)
        {
            iAlpha--;
            objDialog.style.filter = "Alpha(Opacity=" + iAlpha + ")"; //透明度逐渐变大
            if (iAlpha <= 1)
            {
                objDialog.style.filter = "Alpha(Opacity=0)";
                objDialog.style.display = "none";
            }
        }
    }
}
function hidInformation(iAlpha, objWindow)
{
    if (objWindow)
        objWindow = getobjWindowDocument();
    var objDialog = objWindow.getElementById("InformationDiaDiv");
    if (objDialog)
    {

        hidInfDiv(iAlpha, objWindow);
    }
    else
    {
        var hidmsg = document.getElementById("InformationDiaDiv");
        if (hidmsg)
        {
            hidmsg.style.filter = "Alpha(Opacity=0)";
            hidmsg.style.display = "none";
        }
    }
}

function ShowDialogDiv(objWindow, iAlpha)
{
    var obj = objWindow.getElementById("InformationDiaDiv");
    if (obj)
    {
        var oS = obj.style;
        while (parseInt(oS.width) < 400)
        {
            oS.left = oS.pixelLeft - 30;
            iAlpha = iAlpha + 8; //透明度逐渐显示速度
            oS.filter = "Alpha(Opacity=" + iAlpha + ")"; //透明度逐渐变小
            oS.width = oS.pixelWidth + 30;
            objscrollTop = objWindow.documentElement.scrollTop;
            if (oS.display == "block")
            {
                if (objWindow.documentElement.scrollTop)
                {
                    if (objWindow.documentElement.scrollTop != objscrollTop)
                    {
                        if (objWindow.documentElement.scrollTop > objscrollTop)
                            oS.top = oS.pixelTop + objWindow.documentElement.scrollTop;
                        else
                            oS.top = oS.pixelTop - (objscrollTop - objWindow.documentElement.scrollTop);
                        objscrollTop = objWindow.documentElement.scrollTop
                    }
                }
            }
        }
        oS.left = objWindow.documentElement.offsetWidth - oS.pixelWidth - 6;
        setTimeout(function() { hidInformation(iAlpha, objWindow); }, 2000);
        iAlpha = 0;
    }

}
function getobjDocument()
{
    var objDocument;
    if (window.top)
    {//获取窗体顶级对象显示消息对话框
        if (window.top.window.document)
        {
            if (window.top.window.document.body)
            {
                objDocument = window.top.window.document;
            }
            else
                objDocument = window.document;
        }
    }
    else if (window.parent)
    {
        if (window.parent.window.top)
        {
            if (window.parent.window.top.window.document.body)
            {
                objDocument = window.parent.window.top.window.document;
            }
            else
                objDocument = window.parent.window.document;
        }
    }
    else
        objDocument = window.document;
    return objDocument;
}
var MessageBox = function(message, isSucceed, isClose)
{

    this.objDocument = getobjDocument();
    this.Message = message; //消息
    this.IsSucceed = isSucceed; //消息
    this.IsClose = isClose; //消息
    //消息层    
    this.t_DiglogX = 0;
    this.t_DiglogY = 0;
    this.t_DiglogW = 0;
    this.t_DiglogH = 0;
    this.iAlpha = 0;
    this.objscrollTop = 0;
    this.ShowDiv = "";
    this.objWindow = getobjWindowDocument();
    this.focuControl = "";
}
function getobjWindowDocument()
{
    var obj;
    if (window.top && window.top.opener)
    {//消息纸条window对象
        if (window.top.opener.window)
        {
            if (window.top.opener.window.top)
            {
                if (window.top.opener.window.top.window.document)
                {
                    obj = window.top.opener.window.top.window.document;
                }
            }
            else
                obj = window.top.opener.window.document;
        }
    }
    else if (window.opener)
    {//消息纸条window对象
        if (window.opener.window)
        {
            if (window.opener.window.top)
            {
                if (window.opener.window.top.window.document)
                {
                    obj = window.opener.window.top.window.document;
                }
            }
            else
                obj = window.opener.window.document;
        }
    }
    else if (window.top.window)
    {
        obj = window.top.window.document;
    }
    else
        obj = window.document;
    return obj;
}

MessageBox.prototype = {

    setShowDiv: function()
    {
        var panlTable = '<table width="100%" height="100%" border="0" align="center" cellpadding="0" cellspacing="0">'
        + ' <tr>    <td width="105" align="left" valign="middle"  ><div  class="MessageBoxLeft"></div></td>    <td align="left"><font style="font-size:14px; font-family:Tahoma, Arial, Verdana, "宋体", PMingLiU, MingLiU;color:#000;font-weight:bolder;">' + this.Message + '</font></td>'
        + ' </tr>  <tr>'
        + '  <td height="25" colspan="2" align="center" valign="middle"><input id="bntClose" type="button" value="关闭" class="styButton" ; /></td>'
        + ' </tr></table>'
        this.ShowDiv = '<div class="box-tl" ><div class="box-tr"><div class="box-tc" id="title"><font class="msgTitle">提示</font></div></div></div><div class="box-ml"><div class="box-mr"><div class="box-mc" id="panel">' + panlTable + '</div></div></div><div class="box-bl"><div class="box-br"><div class="box-bc"></div></div></div><div class="box-tool" id="divDialog"  onmousedown=\"onmousedownMsg(this);\"  onmousemove=\"onmousemoveMsg(this);\"  onmouseout=\"onmouseoutMsg(this);\"><a href="javascript:void(0);" id="closeA" ></a></div>'

    },

    setfocuControl: function(controlId)
    {
        this.focuControl = controlId;
    },
    ScreenConvert: function()
    {//整个页面区域加屏蔽层
        this.setShowDiv();
        var objScreen = this.objDocument.getElementById("ScreenOver"); //遮罩
        if (!objScreen)
        {
            var objScreen = this.objDocument.createElement("div");
            var oS = objScreen.style;
            objScreen.id = "ScreenOver";
            oS.display = "block";
            oS.top = oS.left = oS.margin = oS.padding = "0px";
            var wh = "100%";
            if (this.objDocument.body.parentElement)
            {
                var wh = this.objDocument.body.parentElement.offsetHeight + "px";
            }
            else if (this.objDocument.body.offsetHeight)
            {
                var wh = this.objDocument.body.offsetHeight + "px";
            }
            else if (this.objDocument.innerHeight)
            {
                var wh = this.objDocument.offsetHeight + "px";
            }
            oS.width = "100%";
            oS.height = wh;
            oS.position = "absolute";
            oS.zIndex = "1200";
            oS.background = "#cccccc";
            oS.filter = "alpha(opacity=50)";
            oS.opacity = 40 / 100;
            oS.MozOpacity = 40 / 100;
            this.objDocument.body.appendChild(objScreen);
        }
        objScreen.style.display = "block";
        objScreen.dataSrc = this.focuControl;
        var allselect = this.objDocument.getElementsByTagName("select");
        var lgth = allselect.length;
        for (var i = 0; i < lgth; i++)
            allselect[i].style.visibility = "hidden";
    },
    DialogLoc: function() //计算div窗口位置
    {
        var dde = this.objDocument.documentElement;
        if (window.innerWidth)
        {
            var ww = objDocument.innerWidth;
            var wh = objDocument.innerHeight;
            var bgX = objDocument.pageXOffset;
            var bgY = objDocument.pageYOffset;
        }
        else
        {
            var ww = dde.offsetWidth;
            var wh = dde.offsetHeight;
            var bgX = dde.scrollLeft;
            var bgY = dde.scrollTop;
        }
        t_DiglogX = (bgX + ((ww - this.t_DiglogW) / 2));
        t_DiglogY = (bgY + ((wh - this.t_DiglogH) / 2));
    },
    ScreenClear: function()//清屏
    {

        var objScreen = this.objDocument.getElementById("ScreenOver");
        if (objScreen)
            objScreen.style.display = "none";
        var allselect = this.objDocument.getElementsByTagName("select");
        var lgth = allselect.length
        for (var i = 0; i < lgth; i++)
            allselect[i].style.visibility = "visible";
        delete objScreen;
    },
    DialogHide: function()//关闭div置顶层
    {

        this.ScreenClear();
        var objDialog = this.objDocument.getElementById("DialogMove");
        if (objDialog)
            objDialog.style.display = "none";
        var objScreen = this.objDocument.getElementById("ScreenOver");
        if (objScreen)
        {
            if (objScreen.dataFld == "true")
            {
                if (window.parent)
                {
                    window.parent.close();
                }
                else
                    objScreen.dataFld = "";
            }
            else
                objScreen.dataFld = "";
            if (objScreen.dataSrc != "")
            {
                var contronlsid = objScreen.dataSrc.split('^');
                if (contronlsid && contronlsid.length > 0)
                {
                    var lgth = contronlsid.length;
                    for (var j = 0; j < lgth; j++)
                    {
                        var ctlid = contronlsid[j];
                        if (ctlid && ctlid != "")
                        {
                            if (ctlid.indexOf("300") != -1)
                            {//时间
                                if (igdrp_getComboById(ctlid) && igdrp_getComboById(ctlid).isEnabled)
                                {
                                    igdrp_getComboById(ctlid).focus();
                                    ctlid += "_input";
                                    $$(ctlid).style.backgroundColor = "#E8B820";
                                    $$(ctlid).onblur = function()
                                    {
                                        this.style.backgroundColor = "";
                                    }
                                }
                            }
                            else
                            {
                                if (ctlid != "" && $$$$(ctlid))
                                {
                                    var objControl = $$$$(ctlid);
                                    if (!objControl.disabled && objControl.type && objControl.type.toUpperCase() != "HIDDEN")
                                    {
                                        objControl.focus();
                                        objControl.style.backgroundColor = "#E8B820";
                                        if (objControl.type && objControl.type.toUpperCase() == "TEXT" || objControl.tagName.toUpperCase() == "SELECT")
                                        {
                                            objControl.onchange = function()
                                            {
                                                this.style.backgroundColor = "";
                                            }
                                        }
                                        else
                                        {
                                            objControl.onblur = function()
                                            {
                                                this.style.backgroundColor = "";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    DialogShow: function(showdata, ow, oh, w, h)//显示DIV置顶层
    {

        var objDialog = this.objDocument.getElementById("DialogMove");
        if (!objDialog)
            objDialog = this.objDocument.createElement("div");
        this.t_DiglogW = ow;
        this.t_DiglogH = oh;
        this.DialogLoc();
        objDialog.id = "DialogMove";
        var oS = objDialog.style;
        oS.display = "block";
        oS.top = t_DiglogY + "px";
        oS.left = t_DiglogX + "px";
        oS.margin = "0px";
        oS.padding = "0px";
        oS.width = w + "px";
        oS.height = h + "px";
        oS.position = "absolute";
        oS.zIndex = "2000";
        oS.background = "#FFF";
        oS.border = "solid #69aef0 0px";
        objDialog.innerHTML = showdata;
        this.objDocument.body.appendChild(objDialog);
    },
    informationDiv: function(msg)
    {
        divMsg = "<DIV onclick=\"if(this.parentElement)  this.parentElement.style.display='none'\" id=\"msg_boxTitle\" style=\"DISPLAY: block; WIDTH: 114px; HEIGHT:35px\"></DIV><DIV id=\"msg_boxBody\" style=\"DISPLAY: block; PADDING-LEFT: 10px; PADDING-TOP: 7px\">" + msg + "</DIV>";
        return divMsg;
    },

    creatInformation: function(objDoc, msg)//创建消息纸条
    {
        var objDialog = objDoc.getElementById("InformationDiaDiv");
        if (!objDialog)
            objDialog = objDoc.createElement("div");
        objDialog.id = "InformationDiaDiv";
        objDialog.className = "msgBox";
        var oS = objDialog.style;
        oS.display = "block";
        oS.top = objDoc.documentElement.offsetHeight + objDoc.documentElement.scrollTop - 50;
        oS.left = objDoc.documentElement.offsetWidth - 25;
        oS.margin = "0px";
        oS.padding = "0px";
        oS.width = "10px";
        oS.height = "35px";
        oS.position = "absolute";
        oS.zIndex = "2000";
        oS.filter = "Alpha(Opacity=0)";
        oS.opacity = "0";
        oS.background = "#fff79e";
        oS.border = "solid #e05f00 1px";
        objDialog.innerHTML = this.informationDiv(msg);
        objDoc.body.appendChild(objDialog);
        objDocDialog = objDoc;

        ShowDialogDiv(objDoc, this.iAlpha);

    },
    informationDialog: function(msg, isClose)
    {
        this.creatInformation(this.objWindow, msg);
    },
    HidInfoDiv: function()
    {
        try
        {

            if (this.objWindow)
            {
                if (this.objWindow.getElementById("InformationDiaDiv"))
                {
                    this.objWindow.getElementById("InformationDiaDiv").style.display = "none";
                }
            }
        }
        catch (exception)
        {
        }

    },
    MessageBoxShow: function(string)
    {

        this.ScreenConvert();
        this.DialogShow(this.ShowDiv, 250, 120, 300, 158);
        this.objDocument.getElementById("bntClose").onclick = function() { var msg = new MessageBox(); msg.Hide(); }
        this.objDocument.getElementById("closeA").onclick = function() { var msg = new MessageBox(); msg.Hide(); }
        return false;
    },
    MsgStringBox: function(string, IsClose, isSucceed)
    {
        if (isIE7() || isIE8())
        {
            if (!ConvertBoolean(isSucceed))
            {
                this.MessageBoxShow(string);
            }
            else
            {
                this.informationDialog(string);
                if (ConvertBoolean(IsClose))
                {
                    if (window.top)
                    {
                        setTimeout(function() { window.top.window.close(); }, 1100);
                    }
                    else if (window.parent)
                    {
                        setTimeout(function() { window.parent.close(); }, 1100);
                    }
                    else
                        setTimeout(function() { self.close(); }, 1100);
                }
            }
        }
        else if (isIE6())
        {
            if (ConvertBoolean(IsClose))
            {
                alert(delHtmlTag(string));
                if (window.top)
                {
                    window.top.window.close();
                }
                else if (window.parent)
                {
                    window.parent.close();
                }
                else
                    self.close();
            }
            else
                alert(delHtmlTag(string));
        }
        else
        {
            alert(delHtmlTag(string));
        }
    },

    //消息纸条
    Show: function()
    {
        if (!ConvertBoolean(this.IsSucceed))
        {
            this.MsgStringBox(this.Message);
        }
        else
        {
            if (ConvertBoolean(this.IsSucceed) && ConvertBoolean(this.IsClose))
            {

                var objScreen = this.objDocument.getElementById("ScreenOver");
                if (objScreen)
                    objScreen.dataFld = this.IsClose;
                this.MsgStringBox(this.Message, this.IsClose, this.IsSucceed);
            }
            else
            {
                this.informationDialog(this.Message, ConvertBoolean(this.IsClose));
            }

        }
    },
    Hide: function()
    {
        this.DialogHide();

        this.HidInfoDiv();
    }
}

function DialogboxShow(message, isSucceed, isClose)
{
    alert(message);
}

function FocusDialogboxShow(message, controlID, isSucceed, isClose)
{
    alert(message);
    $("#" + controlID).focus();
}

//隐藏消息纸条
function hidinformationDialog()
{
    try
    {
        var msg = new MessageBox();
        if (msg.objWindow)
        {
            var msgBox = msg.objWindow.getElementById("msg_boxTitle");
            if (msgBox && msgBox.parentElement)
            {
                msgBox.parentElement.style.display = 'none';
            }
        }
    }
    catch (exception)
    {
    }
}

function onmousemoveMsg(obj)
{
    if (obj && obj.dataFld != "" && obj.parentElement && obj.parentElement.id)
    {
        if (event && event.button == 1 && obj.parentElement.id == "DialogMove")
        {
            obj.style.cursor = "move";
            var objprent = obj.parentElement;
            var x = parseInt(objprent.style.left);
            var y = parseInt(objprent.style.top);
            var maxLeft = parseInt(document.body.clientWidth) - parseInt(objprent.clientWidth);
            var maxTop = parseInt(document.body.clientHeight) - parseInt(objprent.clientHeight);
            var vs = obj.dataFld.split('|');
            objprent.style.left = x + (event.clientX - parseInt(vs[0])) + "px";
            objprent.style.top = y + (event.clientY - parseInt(vs[1])) + "px";
            var left = parseInt(objprent.style.left);
            var top = parseInt(objprent.style.top);
            if (left < 0)
            {
                objprent.style.left = "0px";
            }
            if (left > maxLeft)
            {
                objprent.style.left = maxLeft + "px";
            }
            if (top < 0)
            {
                objprent.style.top = "0px";
            }
            if (top > maxTop)
            {
                objprent.style.top = maxTop + "px";
            }
            obj.dataFld = event.clientX + "|" + event.clientY;
        }
    }
}
function onmousedownMsg(obj)
{
    if (obj)
    {
        obj.dataFld = event.clientX + "|" + event.clientY;
    }
}
function onmouseoutMsg(obj)
{
    if (obj)
    {
        obj.dataFld = "";
        obj.style.cursor = "auto";
    }
}

//update by Leon at 2012-2-7
function radiobuttonlistIsChecked(id)
{
    id = "#" + id;

    var checked = false;
    $(id).find("input").each(function()
    {
        if (this.checked) checked = true;
    });

    return checked;
}

//update by Leon at 2012-2-7
function radiobuttonlistSelectValue(id)
{
    id = "#" + id;

    var val = "";
    $(id).find("input").each(function()
    {
        if (this.checked) val = $(this).val();
    });

    return val;
}

//单选
function openModelPage(url, id, divuniqueid, width, height)
{
    var valueTextBoxs = new Array(2);
    var L = (screen.width - width) / 2;
    var T = (screen.height - height) / 2;
    var res = window.showModalDialog("../../ND/Dialog/GridSelect.aspx?sql=" + url, valueTextBoxs, 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px; dialogLeft=' + L + 'px; dialogTop=' + T + 'px;  status=no;help=no;resizable=no')
    if (valueTextBoxs != null && valueTextBoxs.length > 1)
    {
        if (valueTextBoxs[0] != null && valueTextBoxs[0] != undefined && valueTextBoxs[0] != "")
        {
            Anthem_InvokePageMethod('SetSelectGridValue', [valueTextBoxs[0], valueTextBoxs[1], id], null);
            var txt = $$(id + "_txt");
            if (txt && txt.onchange)
            {
                txt.onchange();
            }

        }

    }
}
//多选
function openModelMultiplePage(url, id, divuniqueid, width, height)
{
    var valueTextBoxs = new Array(3);
    var L = (screen.width - width) / 2;
    var T = (screen.height - height) / 2;
    if ($$(id).dataFld)
    {
        valueTextBoxs[2] = $$(id).dataFld;
    }
    var txt = $$(id + "_txt");
    if (txt && txt.value == "")
    {
        valueTextBoxs[2] = "";
    }
    var res = window.showModalDialog("../../ND/Dialog/GridMultipleSelect.aspx?sql=" + url, valueTextBoxs, 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px; dialogLeft=' + L + 'px; dialogTop=' + T + 'px;  status=no;help=no;resizable=no')
    if (valueTextBoxs != null && valueTextBoxs.length > 1)
    {
        if (valueTextBoxs[0] != null && valueTextBoxs[0] != undefined)
        {
            Anthem_InvokePageMethod('SetMultipleSelectGridValue', [valueTextBoxs[0], valueTextBoxs[1], id], null);
            $$(id).dataFld = valueTextBoxs[0] + "" + valueTextBoxs[1];
            if (txt && txt.onchange)
            {
                txt.onchange();
            }
        }
    }
}
function setGridTxtValues(divuniqueid, Values)
{
    var divGrid = document.getElementById(divuniqueid);
    if (divGrid && divGrid.firstChild)
    {
        divGrid.firstChild.value = Values;
    }
}


//控件级联
function ControlRelationship(pInitiativeID, id)
{
    //alert(document.getElementById(id).value);
    Anthem_InvokePageMethod('ControlRelationshipDealWith', [pInitiativeID, document.getElementById(id).value], null);

}
var hideMenuBnt = new Array(); //需要隐藏的二级按钮id

function ArrayContains(item, arrayObj)
{
    for (var hidid in arrayObj)
    {
        if (arrayObj[hidid] && arrayObj[hidid].toLowerCase() == item.toLowerCase())
        {
            return true;
        }
    }
    return false;
}
function ShowMenuBnt(divId, cellId, width)
{
    var objdiv = $$(divId);
    if (objdiv.style.display == "block")
    {
        objdiv.style.display = "none";
        return;
    }
    if (objdiv)
    {
        with (objdiv)
        {
            style.display = "block";
            style.zIndex = "1000";
            style.visibility = "visible";
            style.position = "absolute";
            className = "childrenlinkmenuui";
            if (!width)
                style.width = $$(cellId).offsetWidth;
            else
                style.width = width;
            var menuLeft = GetAbsoluteLocationEx($$(cellId)).absoluteLeft;
            style.left = menuLeft - $$(cellId).offsetWidth;
            style.top = GetAbsoluteLocationEx($$(cellId)).absoluteTop + 26;
        }
    }
    var isHas = false;
    for (var dv in hideMenuBnt)
    {
        if (divId[dv] == divId)
        {
            isHas = true;
        }
    }
    if (!isHas)
        hideMenuBnt.push(divId);
    //    for (var hidid in hideMenuBnt) {
    //        if (hideMenuBnt[hidid] && hideMenuBnt[hidid].toLowerCase() != divId.toLowerCase()) {
    //            $$(hideMenuBnt[hidid]).style.display = "none";
    //        }
    //    }

    //    hideMenuBnt.push(divId);
}

function GetAbsoluteLocationEx(element)
{
    if (arguments.length != 1 || element == null)
    {
        return null;
    }
    var elmt = element;
    var offsetTop = elmt.offsetTop;
    var offsetLeft = elmt.offsetLeft;
    var offsetWidth = elmt.offsetWidth;
    var offsetHeight = elmt.offsetHeight;
    while (elmt)
    {          // add this judge
        if (elmt.style.position == 'absolute' || elmt.style.position == 'relative')
        {
            offsetTop += elmt.offsetTop;
            offsetLeft += elmt.offsetLeft;
            break;
        }
        offsetTop += elmt.offsetTop;
        offsetLeft += elmt.offsetLeft;
        elmt = elmt.offsetParent;
    }
    return { absoluteTop: offsetTop, absoluteLeft: offsetLeft,
        offsetWidth: offsetWidth, offsetHeight: offsetHeight
    };
}
function $$$$(id)
{
    if (window.frames)
    {
        var lgth = window.frames.length;
        for (var i = 0; i < lgth; i++)
        {
            return window.frames[i].frameElement.contentWindow.window.document.getElementById(id);
        }
    }
    else
        return document.getElementById(id);
}
function getOffsetSize(Id)
{
    var elmt = $$(Id);
    if (elmt != null && elmt != undefined)
    {
        return { offsetTop: elmt.offsetTop, offsetLeft: elmt.offsetLeft,
            offsetWidth: elmt.offsetWidth, offsetHeight: elmt.offsetHeight
        };
    }
    else
    {
        return { offsetTop: 0, offsetLeft: 0,
            offsetWidth: 0, offsetHeight: 0
        };
    }
}

function getControlHeight(id)
{
    var pControl = document.getElementById(id);
    if (pControl)
    {

        var heights = pControl.offsetHeight;
        delete pControl;
        return heights;
    }
    else
    {
        delete pControl;
        return 0;
    }

}
function getControlWidth(id)
{
    var pControl = document.getElementById(id);
    if (pControl)
    {

        var heights = pControl.offsetWidth;
        delete pControl;
        return heights;
    }
    else
    {
        delete pControl;
        return 0;
    }

}
//创建 input 文本框
function CreateInput(parentid, id, value)
{
    var input = document.createElement("input");
    input.type = "hidden";
    input.id = id;
    input.value = value;
    $$(parentid).appendChild(input);
}

function LoadWebComData(id, datasource)
{

    var stores = new Ext.data.ArrayStore({ fields: Ext.getCmp(id).store.fields.keys,
        data: datasource
    });
    Ext.getCmp(id).clearValue();
    Ext.getCmp(id).store = stores;
}
//按钮特效
function changeClassByOver(obj, isChildBtn)
{
    if (obj && obj.children)
    {
        var i = parseInt(obj.children.length);

        if (i > 2)
        {
            obj.children[0].className = "buttonle0";
            obj.children[1].className = "buttonmid0";
            if (isChildBtn)
                obj.children[2].className = "buttonri0"; //子按钮
            else
                obj.children[2].className = "buttonri000";
        }

    }

}

function changeClassByOut(obj, isChildBtn)
{
    if (obj && obj.children)
    {
        var i = parseInt(obj.children.length);

        if (i > 2)
        {
            obj.children[0].className = "buttonle";
            obj.children[1].className = "buttonmid";

            if (isChildBtn)
                obj.children[2].className = "buttonri";
            else
                obj.children[2].className = "buttonri00";

        }

    }
}
function RefurbishWebComData(webcomDateId, dataId)
{
    var data = $$(dataId).value;
    var datacombos = eval('(' + data + ')');
    LoadWebComData(webcomDateId, datacombos);
}

function ExtendBtnMethod(Id, controlId, objitemId, controlType, xColumn, objID, obj)
{//执行按钮
    Anthem_InvokePageMethod('RunExtendBtnMethod', [Id, controlId, objitemId, controlType, xColumn, objID], null);
    if ($$(controlId) && ($$(controlId).disabled))
    {
        if (typeof ($$(controlId).onchange) == "function")
        {
            $$(controlId).onchange();
        }
    }
    if ($$(controlId))
        $$(controlId).dataFld = "1"
}

function RefurbishControlByBtn(pControlId, controlType, xColumn, objID, key, code)
{//刷新控件

    Anthem_InvokePageMethod('RefurbishControl', [pControlId, controlType, xColumn, objID, key, code], null);
}
function RefurbishWebComData(webcomDateId, dataId)
{
    var data = $$(dataId).value;
    if (data && data != "")
    {
        webCom_datasource = eval('(' + data + ')');
    }
    else
        webCom_datasource = {};
    var webcom_Id = webcomDateId + "_webcom";
    Ext.getCmp(webcom_Id).setDisabled(false);
    LoadWebComData(webcom_Id, webCom_datasource);
}

function request(paras)
{//获取url参数
    var url = location.href;
    if (url.indexOf("?") != -1 && paras && url.indexOf(paras) != -1)
    {
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        if (paraString && paraString.length)
        {
            var j;
            for (var i = 0; i = paraString.length; i++)
            {
                j = paraString[i];
                if (j.indexOf("=") != -1 && j.substring(0, j.indexOf("=")).toLowerCase() == paras.toLowerCase())
                {
                    return j.substring(j.indexOf("=") + 1, j.length);
                }
            }
        }
    }
}

/////***********需要保存的表名,主键列,保存数据对象（可以有多行）***********************需要保存的表名,主键列,保存数据对象（可以有多行）****/////
function setValue(tableName, pKey, rowValue)
{// 返回数据的规则
    var my_array = new Array();
    var table = new Object(); // 保存的表名(此列必须，缺省为空)
    table["Table"] = tableName;
    my_array.push(table);
    var keys = new Object(); //主键列(此列必须，缺省为空)
    keys["PKey"] = pKey;
    my_array.push(keys);
    var obj = new Object(); //主键列(此列必须，缺省为空)
    obj["ModelList"] = rowValue;
    my_array.push(obj); //保存的数据模型类似model(此列必须，缺省为空)对象的值可以使用{()}获取父页面对象的值
    return my_array;
}

function setWebDateChooserValue(id, value, isLocked)
{
    var dateChooser = igdrp_getComboById(id);
    if (dateChooser)
    {
        var locked = ConvertBoolean(isLocked);
        if (locked)
            dateChooser.setEnabled(true);
        dateChooser.setValue(value);
    }
}

function CreateMessagebox(divleft, divtop, divhtml)
{

    var MsgBoxDiv = $$("msgbox_show_div");
    if (!MsgBoxDiv)
    {

        MsgBoxDiv = document.createElement("DIV");
        document.body.appendChild(MsgBoxDiv);
    }

    var objTable = "<TABLE  height=\"113\" cellSpacing=\"0\" cellPadding=\"0\" width=\"277\" border=\"0\"><TBODY><TR>" +
"<TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_ul.gif) no-repeat; WIDTH: 7px; HEIGHT: 6px\">" +
"</TD><TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_u.gif) repeat-x\" colSpan=\"3\">" +
"</TD><TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_ur.gif) no-repeat; WIDTH: 7px; HEIGHT: 6px\"></TD>" +
"</TR><TR><TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_l.gif) repeat-y; WIDTH: 7px\">" +
"</TD><TD style=\"BACKGROUND: #ffffff; HEIGHT: 14px\" colSpan=\"3\"><DIV><SPAN id=\"id_19_MsgBoxTitl\" style=\"FLOAT: left\"></SPAN>" +
"<IMG onmousemove=\"javascript:this.src='../../App_Themes/Default/images/messagebox/iw_close.gif';\" " +
"style=\"FLOAT: right; CURSOR: pointer\" onclick=\"javascript:$$('msgbox_show_div').style.display ='none';\" " +
"onmouseout=\"javascript:this.src='../../App_Themes/Default/images/messagebox/iw_c.gif';\" " +
"src=\"../../App_Themes/Default/images/messagebox/iw_c.gif\" /> </DIV>" +
"</TD><TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_r.gif) repeat-y; WIDTH: 7px\"></TD>" +
"</TR><TR><TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_l.gif) repeat-y; WIDTH: 7px; HEIGHT: 100%\"></TD>" +
"<TD style=\"BACKGROUND: #fafafa\" vAlign=\"middle\" align=\"center\" colSpan=\"3\"><DIV id=\"id_19_MsgBoxBody\" style=\"OVERFLOW-Y: auto; OVERFLOW-X: hidden; WIDTH: 260px; HEIGHT: 105px\">" +
+divhtml + "</DIV></TD>" +
"<TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_r.gif) repeat-y; WIDTH: 7px; HEIGHT: 100%\">" +
"</TD></TR><TR><TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_bl.gif) no-repeat; WIDTH: 7px\">" +
"</TD><TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_u.gif) repeat-x; PADDING-TOP: 15px;background-position:center bottom \" align=\"center\" colSpan=\"3\" height=\"11\">" +
"</TD>" +
"<TD style=\"BACKGROUND: url(../../App_Themes/Default/images/messagebox/iw_br.gif) no-repeat; WIDTH: 7px\"></TD></TR></TBODY></TABLE>";

    with (MsgBoxDiv)
    {
        id = "msgbox_show_div";
        innerHTML = objTable;
        style.left = divleft;
        style.top = divtop;
        style.display = "block";
        style.zIndex = "1000";
        style.visibility = "visible";
        style.position = "absolute";
    }

}
function CreateMessageboxByMid(divhtml)
{
    var L = parseInt((document.body.offsetWidth - 277)) / 2;
    var T = parseInt((document.body.offsetHeight - 113)) / 2;
    CreateMessagebox(L, T, divhtml);
}

var ua = navigator.userAgent.toLowerCase();
var getnavigatorversion =
{
    ve: ua.match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/)[1],
    ie: /msie/.test(ua) && !/opera/.test(ua),
    op: /opera/.test(ua),
    sa: /version.*safari/.test(ua),
    ch: /chrome/.test(ua),
    ff: /gecko/.test(ua) && !/webkit/.test(ua)
};

function isIE7()
{
    if (getnavigatorversion.ie)
    {
        var browsername = navigator.appName;
        var browserver = navigator.appVersion;
        if (browsername.indexOf("Microsoft") != -1 && (browserver.indexOf('MSIE 7.0') != -1 || browserver.indexOf('IE7') != -1))
        {
            return true;
        }
        return false;
    }
    return false;
}
function isIE()
{
    if (getnavigatorversion.ie)
    {
        return true;
    }
    return false;
}
function isIE8()
{
    if (getnavigatorversion.ie)
    {
        var browsername = navigator.appName;
        var browserver = navigator.appVersion;
        if (browsername.indexOf("Microsoft") != -1 && (browserver.indexOf('MSIE 8.0') != -1 || browserver.indexOf('IE8') != -1))
        {
            return true;
        }
        return false;
    }
    return false;
}
function isIE6()
{
    if (getnavigatorversion.ie)
    {
        var browsername = navigator.appName;
        var browserver = navigator.appVersion;
        if (browsername.indexOf("Microsoft") != -1 && (browserver.indexOf('MSIE 6.0') != -1 || browserver.indexOf('IE6') != -1))
        {
            return true;
        }
        return false;
    }
    return false;
}
function isfirefox()
{
    if (getnavigatorversion.ff)
    {
        return true;
    }
    return false;
}
function isopera()
{
    if (getnavigatorversion.op)
    {
        return true;
    }
    return false;
}
function ischrome()
{
    if (getnavigatorversion.ch)
    {
        return true;
    }
    return false;
}
function issafari()
{
    if (getnavigatorversion.sa)
    {
        return true;
    }
    return false;
}
//取得根目录
function getRootPath()
{

    var strFullPath = window.document.location.href;

    var strPath = window.document.location.pathname;

    var pos = strFullPath.indexOf(strPath);

    var prePath = strFullPath.substring(0, pos);

    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);

    return (prePath + postPath);

}

function getWindowHeight()
{//获取页面显示区域高度
    if (window.self && self.innerHeight)
    {
        return self.innerHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight)
    {
        return document.documentElement.clientHeight;
    }
    return 0;
}




