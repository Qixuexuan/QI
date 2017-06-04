<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="APQPGroup.aspx.cs" Inherits="test.Web.ProjectManagent.APQPGroup" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>APQP小组</title>
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Content/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="../../Content/jquery-ui-1.12.1.custom/jquery-ui.min.css" />
    <link rel="stylesheet" href="../../Content/jquery-ui-1.12.1.custom/jquery-ui.theme.min.css" />


    <script type="text/javascript" src="../../Scripts/jquery.min.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../Content/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
    
    <script type="text/javascript" src="../../Scripts/easyUI/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script type="text/javascript" src="../../Js/modalWindow.js"></script>
    <script type="text/javascript" src="../App/js/APQPGroup.js"></script>

    <style>
        body > div {
            width: 95%;
            margin: 0 auto;
        }

        p {
            color: gray;
            text-shadow: 0px 0px 5px lightgray;
            font-style: italic;
        }

        table {
            width: 100%;
            border: 1px solid gray;
        }

        th {
            background-color: lightblue;
            height: 25px;
            text-align: center;
        }

        th, td {
            border: 1px solid gray;
        }

        table tr td:nth-child(1) {
            width: 20%;
            text-align: center;
        }

        table tr td:nth-child(2) {
            width: 20%;
            text-align: center;
        }

        table tr td:nth-child(3) {
            width: 10%;
            text-align: center;
        }

        table tr td:nth-child(4) {
            text-align: center;
            padding: 5px;
        }

        div p:nth-child(1) {
            margin-top: 15px;
        }

        .member-name {
            width: 50px;
            color: black;
            line-height: 20px;
        }

        .member-minus {
            color: red;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            float: right;
            padding-right: 20px;
            line-height: 20px;
        }

        .member-plus {
            color: green;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
        }
         .lication {
            height:30px;
            border-bottom:1px solid lightgray;
        }
            .lication > span {
                line-height:30px;
                margin-left:20px;
            }
    </style>
</head>

<body>
     <div class="lication" style="width:100%;margin-top:0px">
        <span>当前位置：项目管理 > 我的项目 > APQP小组</span>
    </div>
    <div id="dialog-confirm">
        <div id="treeBox" class="easyui-panel" style="padding: 5px;display:none;width:510px">
            <ul id="APQTree" class="easyui-tree" data-options="animate:true,checkbox:true"></ul>
        </div>
    </div>
   
    <div class="content">
        <p><span style="color:red">*</span>Remarks: If there are more than one member from same department, then the first member represent their department and take the responsibility</p>
        <p>注：以上成员每个部门若有多名成员构成，则排在第一位的人员是此部门对此案的领导和代表人员.</p>
        <table id="APQP-Table">
            <tr>
                <th>Dept 部 门</th>
                <th>Member 人员</th>
                <th>添加成员</th>
                <th>Responsibility 职 责</th>
            </tr>
            <%-- <tr id="testid">
                <td>Commercial/Customer representatives 商务/顾客代表</td>
                <td id="0"><div><span class="member-name">Jerry</span><span class="glyphicon glyphicon-minus member-minus" onclick="MinusMember(this)"></span></div>
                    <div><span class="member-name">TOMd.Jerry</span><span class="glyphicon glyphicon-minus member-minus" onclick="MinusMember(this)"></span></div>
                </td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>项目经理/项目组长：制定项目进度计划，项目成本和项目质量目标，并通过组织协调和控制来确保该目标的实现。和顾客工程方面事宜的沟通确认，包括项目进度等。</td>
            </tr>--%>
        </table>
        <div class="form-group" style="text-align: center; margin-top: 20px">
            <button type="button" class="btn btn-warning" onclick="Reset()">重  置</button>
            <button type="button" class="btn btn-success" onclick="Submit()">保  存</button>
        </div>
    </div>

</body>
</html>
