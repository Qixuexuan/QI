<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectApplyAddList.aspx.cs" Inherits="test.Web.ProjectApply.ProjectApplyAddList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>新增立项申请</title>
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Content/common.css" rel="stylesheet" />
    <script type="text/javascript" src="../../Scripts/jquery.min.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script type="text/javascript" src="../../Js/modalWindow.js"></script>
    <script type="text/javascript" src="../App/js/geone.datagrid.js"></script>
    <script type="text/javascript" src="../App/js/ProjectApplyAddList.js"></script>
</head>
<body class="GridBody">
    <div style="height: 35px; padding-top: 6px; padding-left: 10px; border-top: 1px solid #ccc; margin-top: 2px;">
        <div style="float: left;">
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="addNewPrjApply()">新增申请</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="editPrjApply()">编辑</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="submitPrjApply()">提交申请</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="deletePrjApply()">删除</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:true"
                onclick="reload()">刷新</a>
        </div>
    </div>
    <div style="height: 35px; padding-top: 6px; padding-left: 10px; border-top: 1px solid #ccc;">
        <span style="font-size: 12px;">关键字：</span>
        <input class="easyui-textbox" data-options="prompt:'输入内容..',validType:''"
            style="width: 200px; height: 25px; font-size: inherit;" id="txtQueryCondition" />
        <a href="javascript:void(0)" onclick="Search()" class="easyui-linkbutton" style="width: 50px; margin-top: 1px; height: 25px;">搜索</a>
    </div>
    <div id="gannt_left">
        <div id="left-scroll-panel">
            <table id="gd_url"></table>
            <div id="pp"></div>
        </div>
        <div id="info_bottom"></div>
    </div>
</body>
</html>
