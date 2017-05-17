<%@ Page Language="C#" AutoEventWireup="true" Inherits="Shell_FIndex" EnableTheming="false" CodeBehind="FIndex.aspx.cs" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <!--[if lt IE 10 ]> <html class="ie9"> <![endif]-->
    <link href="../App_Themes/Flat/Login/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <title></title>
    <style>
        body, form {
            margin: 0px;
            padding: 0px;
            font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
        }
    </style>

    <link href="../App_Themes/flat/shell.css" rel="stylesheet" type="text/css" /> 
    <link href="../App_Themes/flat/ModalWindow.css" rel="stylesheet" type="text/css" /> 
    <link href="../App_Themes/flat/JIndex.css" rel="stylesheet" type="text/css" />
    <link href="../Js/jQueryTheme/jquery.ui.all.css" rel="stylesheet" type="text/css"> 
    <link rel="stylesheet" href="../zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <link rel="stylesheet" href="../App_Themes/Flat/leftmenu.css" type="text/css">
    <link href="../App_Themes/Flat/newstyle.css" rel="stylesheet" />
    <script type="text/javascript" src="../JS/jQuery.js"></script>
    <script type="text/javascript" src="../JS/modalWindow.js"></script> 
    <script type="text/javascript" src="../JS/common.js"></script> 
    <script type="text/javascript" src="../JS/jQueryUI/jQuery-ui.custom.min.js"></script>
    <script type="text/javascript" src="../JS/jQueryUI/jQuery.ui.autocomplete.js"></script>
    <script type="text/javascript" src="../JS/jQueryUI/jQuery.effects.bounce.js"></script>
    <script src="../Js/jQueryUI/jquery.ui.resizable.js"></script> 
    <script type="text/javascript" src="../JS/Shell/jQuery.plugins.js"></script>
    <script type="text/javascript" src="../JS/Shell/FIndex.js"></script>
    <script type="text/javascript" src="../js/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
    <script type="text/javascript" src="../zTree/js/jquery.ztree.core-3.5.js"></script>

    <script type="text/javascript">
        var _userid = "<%= userid%>";

        self.resizeTo(screen.availWidth, screen.availHeight);
        self.focus();
        var menuExpand = "";
        var ispirit = "";
        var statusTextScroll = 60;
        var portalArray = [];
        portalArray["0"] = { src: "", url: "", title: "", closable: "true" };
        var portalload = [];
        portalload["0"] = { src: "../App_Themes/Default/images/2.png", url: "../Web/Index/index.aspx", title: "首页", closable: false };
        var portalLoadArray = ["0"];
        jQuery.noConflict();

        /********菜单树 开始*********************************/

        var curExpandNode = null;
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: false,
                addDiyDom: addDiyDom
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeExpand: beforeExpand,
                onExpand: onExpand,
                onClick: onClick
            }
        };
        //
        //var zNodes ="";

        //var loginUser = { "uid": " 1 ", "user_id": " test ", "user_name": " 测fff试 " };
        //var OA_TIME = new Date(2016, 1, 19, 15, 31, 26);


        jQuery(document).ready(function ()
        {
            try
            {
                var treeObj = jQuery("#treeDemo");
                jQuery.fn.zTree.init(treeObj, setting, zNodes);

                treeObj.hover(function ()
                {
                    if (!treeObj.hasClass("showIcon"))
                    {
                        treeObj.addClass("showIcon");
                    }
                }, function ()
                {
                    treeObj.removeClass("showIcon");
                });
            }
            catch (e)
            { }

        });
        function Resizable()
        {
            jQuery('.ModalWindowStyle').resizable({
                start: function (event, ui)
                {
                    jQuery('<div class="ui-resizable-iframeFix" style="background: #fff;"></div>')
                .css({
                    width: '100%', height: '100%',
                    position: "absolute", opacity: "0.001", zIndex: 600000
                })
                .prependTo("body");
                },
                stop: function (event, ui)
                {
                    jQuery('.ui-resizable-iframeFix').remove()
                },
                minHeight: 250,
                minWidth: 320
            });
        }
        function addDiyDom(treeId, treeNode)
        {
            try
            {
                var spaceWidth = 10;
                var switchObj = jQuery("#" + treeNode.tId + "_ico");

                if (treeNode.level > 0)
                {
                    var spaceStr = "<span style='float:left;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
                    switchObj.before(spaceStr);
                }
            }
            catch (e) { }
        }

        function beforeExpand(treeId, treeNode)
        {
            try
            {
                var pNode = curExpandNode ? curExpandNode.getParentNode() : null;
                var treeNodeP = treeNode.parentTId ? treeNode.getParentNode() : null;
                var zTree = jQuery.fn.zTree.getZTreeObj("treeDemo");
                for (var i = 0, l = !treeNodeP ? 0 : treeNodeP.children.length; i < l; i++)
                {
                    if (treeNode !== treeNodeP.children[i])
                    {
                        zTree.expandNode(treeNodeP.children[i], false);
                    }
                }
                while (pNode)
                {
                    if (pNode === treeNode)
                    {
                        break;
                    }
                    pNode = pNode.getParentNode();
                }
                if (!pNode)
                {
                    singlePath(treeNode);
                }
            } catch (e) { }
        }

        function singlePath(newNode)
        {
            try
            {
                if (newNode === curExpandNode) return;
                if (curExpandNode && curExpandNode.open == true)
                {
                    var zTree = jQuery.fn.zTree.getZTreeObj("treeDemo");
                    if (newNode.parentTId === curExpandNode.parentTId)
                    {
                        zTree.expandNode(curExpandNode, false);
                    } else
                    {
                        var newParents = [];
                        while (newNode)
                        {
                            newNode = newNode.getParentNode();
                            if (newNode === curExpandNode)
                            {
                                newParents = null;
                                break;
                            } else if (newNode)
                            {
                                newParents.push(newNode);
                            }
                        }
                        if (newParents != null)
                        {
                            var oldNode = curExpandNode;
                            var oldParents = [];
                            while (oldNode)
                            {
                                oldNode = oldNode.getParentNode();
                                if (oldNode)
                                {
                                    oldParents.push(oldNode);
                                }
                            }
                            if (newParents.length > 0)
                            {
                                zTree.expandNode(oldParents[Math.abs(oldParents.length - newParents.length) - 1], false);
                            } else
                            {
                                zTree.expandNode(oldParents[oldParents.length - 1], false);
                            }
                        }
                    }
                }
                curExpandNode = newNode;
            }
            catch (e) { }
        }

        function onExpand(event, treeId, treeNode)
        {
            curExpandNode = treeNode;
        }

        function onClick(e, treeId, treeNode)
        {
            var zTree = jQuery.fn.zTree.getZTreeObj("treeDemo");
            zTree.expandNode(treeNode, null, null, null, true);

            if (treeNode.targetURL == "") return;

            //0--判断是否已打开，否则弹出新窗口
            //1--打开为tab标签页
            //2--调用silverlight脚本方法
            switch (treeNode.IsThird)
            {
                case "0":
                    jQuery("#tabs_link_portal_0").click();

                    var flag = 0;
                    for (var i = 0; i < jQuery("iframe").length; i++)
                    {
                        var ss = jQuery(jQuery("iframe")[i]).attr("src").toLowerCase();

                        if (ss.indexOf(treeNode.targetURL.toLowerCase()) > -1)
                        {
                            flag = 1;
                            var zIndex = getGlobalZIndex();
                            var ModalWindow = jQuery(jQuery("iframe")[i]).parent().parent()
                            jQuery(ModalWindow).css("z-index", getMaxIndex(zIndex));
                        }
                    }

                    if (flag == 0)
                    {
                        showModalWindow(treeNode.name, 800, 550, treeNode.targetURL);
                    }
                    break;
                case "1":
                    createTab(treeNode.JQKey, treeNode.name, treeNode.targetURL, '');
                    break;
                case "2":
                    var jsUrl = treeNode.targetURL.substring(0, treeNode.targetURL.indexOf("?"));
                    jsUrl = jsUrl.replace(/#/g, "'");
                    eval(jsUrl);
                    break;
            }
        }
        /********菜单树 结束*********************************/

        /**************其他 开始*********************************************/
        function openImg(img)
        {
            try
            {
                var bigs = window.location.href.replace("Shell/FIndex.aspx", img);

                OpenDialog2(bigs, 600, 500);
            }
            catch (e) { }
        }

        function refreshPage()
        {
            var func = jQuery("iframe:visible")[0].contentWindow.refreshPage;
            if (func) { func(); }
        }

        //重新加载页面
        function ReloadFIndex(url)
        {
            window.location.href = url;
        }
        function CancelDialog()
        {

        }
        function UserCenter()
        {
            //var url = "../Web/SysManage/ModifyPwd_JCXXPT.aspx";
            //showModalWindow('修改密码', 400, 150, url);
            return false;
        }
        /**************其他 结束*********************************************/
    </script>
</head>

<body style="overflow: hidden; margin: 0px;">
     
    <form id="form1" runat="server">
        <input id="btnOpenDialog" type="button" value="button" style="display: none;" />
        <div class="topbg">
            <div class="topbg2">
                <div id="north">
                    <div class="leftcorner"></div>
                    <div id="north_left">
                        <div id="logobg" runat="server"></div>
                        <div id="tip" style="display: none;">
                        </div>
                    </div>

                    <div id="north_right1">
                        <div id="datetime">
                            <a id="log" title="系统日志" href="javascript:return false;"><span class="c10"></span>系统日志</a>
                            <a id="nav_person" title="个人中心" href="#" onclick="UserCenter();"><span class="c12"></span>个人中心</a>
                            <asp:LinkButton ID="nav_exit" runat="server" OnClientClick="return confirm('确定要注销吗？');" OnClick="nav_exit_Click"><span class="c11"></span>退出</asp:LinkButton>
                        </div>

                    </div>

                </div>

                <div id="taskbar" style="margin-top: 0px;">

                    <div id="taskbar_left">
                        <div class="avatar">
                            <asp:Image ID="imgUser" runat="server" ImageUrl="~/App_Themes/Flat/images/0.gif" />
                        </div>
                        <div id="MenuUserName" runat="server" class="username">
                             
                        </div>
                        <div class="tools">
                            <a id="hide_leftbar" href="javascript:void(0);"></a>
                        </div>
                    </div>
                    <div id="taskbar_center">
                        <div id="tabs_left_scroll">
                        </div>
                        <div id="tabs_container">
                        </div>
                        <div id="tabs_right_scroll">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div id="funcbar" style="display: none;">
            <div id="funcbar_left">
            </div>
        </div>
        <div id="pagecenter">
            <!-- 左侧菜单 -->
            <table style="width: 100%; height: 100%;" cellpadding="0" cellspacing="0">
                <tr>
                    <td valign="top" id="LeftMenu" class="leftmenubb">
                        <div class="LeftMenuTD">
                            <ul id="treeDemo" class="ztree">
                            </ul>
                        </div>
                    </td>
                    <td id="center" style="width: 100%;">
                        <div>
                            <!-- 门户切换 -->
                            <div id="portal_panel" class="over-mask-layer">
                                <div class="close">
                                    <a></a><a class="btn-black-aa" href="javascript:;" onclick="jQuery('#portal').click();"
                                        hidefocus="hidefocus">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                </div>
                                <div class="icon">
                                </div>
                                <div class="left">
                                </div>
                                <div class="center" id="portal_slider">
                                </div>
                                <div class="right">
                                </div>
                            </div>
                            <!-- 常用任务面板 -->
                            <div id="shortcut_panel" class="over-mask-layer">
                                <div class="close">
                                    <a></a><a class="btn-black-aa" href="javascript:;" onclick="jQuery('#shortcut').click();"
                                        hidefocus="hidefocus">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                </div>
                                <div class="icon">
                                </div>
                                <div class="left">
                                </div>
                                <div class="center">
                                    <div id="shortcut_block" class="topshort">
                                    </div>
                                    <div class="bottom">
                                    </div>
                                </div>
                                <div class="right">
                                </div>
                            </div>
                            <div id="overlay_panel">
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="south" style="display: none;">
            <table>
                <tr>
                    <td class="left">
                        <div id="new_sms">
                        </div>
                        <span id="new_sms_sound" style="width: 1px; height: 1px;"></span>
                    </td>
                    <td class="center">
                        <div id="status_text">
                            技术支持：<br />
                            <br />
                        </div>
                    </td>
                    <td style="cursor: hand;" class="right">
                        <div title="将问题提交给开发商进行解决">
                            问题反馈
                        </div>
                    </td>
                    <td class="right">
                        <a id="smsbox" class="ipanel_tab" href="javascript:;" panel="smsbox_panel" title="消息盒子"
                            hidefocus="hidefocus"></a><a id="org" class="ipanel_tab" href="javascript:;" panel="org_panel"
                                title="组织" hidefocus="hidefocus"></a>
                    </td>
                </tr>
            </table>
        </div>
        <div id="overlay_startmenu">
        </div>
        <div id="overlay">
        </div>
        <div style="display: none">
            <asp:TextBox ID="txtServerUrl" runat="server"></asp:TextBox>
            <asp:TextBox ID="txtUserID" runat="server"></asp:TextBox>
            <asp:TextBox ID="txtAppid" runat="server"></asp:TextBox>
        </div>
    </form> 
</body>
</html>
