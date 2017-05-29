<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="APQPTaskList.aspx.cs" Inherits="test.Web.ProjectManagent.APQPTaskList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>AQPQ任务列表</title>
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Content/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <%--<link rel="stylesheet" href="../../Content/jquery-ui-1.12.1.custom/jquery-ui.min.css" />--%>
    <%--<link rel="stylesheet" href="../../Content/jquery-ui-1.12.1.custom/jquery-ui.theme.min.css" />--%>


    <script type="text/javascript" src="../../Scripts/jquery.min.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <%--<script type="text/javascript" src="../../Content/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>--%>
    
    <%--<script type="text/javascript" src="../../Scripts/easyUI/easyui-lang-zh_CN.js"></script>--%>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script type="text/javascript" src="../../Js/modalWindow.js"></script>
    <script type="text/javascript" src="../App/js/APQPGroup.js"></script>

    <style>
        p {
            color: gray;
            text-shadow: 0px 0px 5px lightgray;
            font-style: italic;
        }
    </style>
</head>
<body class="GridBody">
    <div style="height: 35px; padding-top: 6px; padding-left: 10px; border-top: 1px solid #ccc; margin-top: 2px;">
        <div style="float: left;">
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="PrjDetail()">预留BTN</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                onclick="APQPGroup()">预留BTN</a>
        </div>
    </div>
    <div style="padding-top: 6px;border-top: 1px solid gray;border-bottom: 1px solid gray;background-color:lightgray;text-align:center">
        <p>APQP Developmentment Tasklist</p>
        <p>先期产品质量策划任务清单</p>
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
