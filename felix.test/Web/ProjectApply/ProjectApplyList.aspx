﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectApplyList.aspx.cs" Inherits="test.Web.ProjectApply.ProjectApplyList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <script type="text/javascript" src="../../Scripts/jquery.min.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script type="text/javascript" src="../../Scripts/geone.datagrid.js"></script>
    <script src="../../Js/modalWindow.js"></script>
    <script type="text/javascript">
        var _pageIndex = 1;
        var _pageSize = 10;
        var ticket;
        $(document).ready(function () {
            var columnsObj = [[
                { field: 'GPSTime', title: 'GPSTime', width: 160, sortable: false },
                { field: 'Speed', title: 'Speed', width: 60, sortable: false },
             {
                 field: 'LocationType', title: '类型', width: 120, sortable: false,
                 styler: function (value, row, index) {

                 },
                 formatter: function (value, row, index) {

                     if (value == "22") {
                         return '<div onclick="Edit(\'' + row.UserName + '\')" style="background-color:green;margin-top:5px;margin-left:5px;width:60px;height:60px;">编辑</div>';
                     }
                     else if (value == "0") {
                         return 'ee';

                     }

                 }
             }
            ]];

            InitDataGridTest(config_service_url + "UserList?Status=0", columnsObj);
        });
        function Edit(p) {
            alert(p);

        }
        //分页事件
        function PageEvent(pageNumber, pageSize) {
            $('#gd_url').datagrid('load', { PageNumber: pageNumber, PageSize: pageSize, ID: "ddd" });

        }

        function test() {
            window.parent.parent.createTab("tab_info_1", "项目详情", "../Web/ProjectApply/ProjectDetail.aspx?s=" + Math.random());
        }

        function test1() {
            showModalWindow('项目详情', 550, 220, "../Web/ProjectApply/ProjectDetail.aspx?s=" + Math.random());
        }
    </script>
</head>
<body>
    <div style="height: 35px; padding-top: 6px; padding-left: 10px; border-top: 1px solid #ccc; margin-top: 2px;">
        <div style="float: left;">
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="test()">隐患详情</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="test1()">所属任务详情</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="DetailAll()">所有详情</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:true"
                onclick="reload()">刷新</a>
        </div>
        <div id="processCmd">
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:true"
                onclick="FileProblem()">归档</a>
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
