<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectApply.aspx.cs" Inherits="test.Web.ProjectApply.ProjectApply" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../App/css/tableContent.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-3.2.1.js"></script>

    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script src="../App/js/validate.js"></script>
    <script src="../App/js/ProjectApply.js"></script>

    <title>立项申请</title>

    <style>
        tr {
            height: 40px;
            padding:3px;
        }
    </style>
</head>
<body>
    <div class="content tableBox">
        <table>
            <tr>
                <td class="alignRight"><span>项目编号</span></td>
                <td class="alignLeft">
                    <input id="ProjectNo" name="ProjectNo" type="text" class="form-control" isneed="true" validate-msg="请输入项目编号." placeholder="--必填--" /></td>
            </tr>
            <tr>
                <td class="alignRight"><span>客户名称</span></td>
                <td class="alignLeft">
                    <input id="CustomName" name="CustomName" type="text" class="form-control" isneed="true" validate-msg="请输入客户名称." placeholder="--必填--" /></td>
            </tr>
            <tr>
                <td class="alignRight"><span>客户类别</span></td>
                <td class="alignLeft">
                    <select id="CustomCategory" name="CustomCategory" class="form-control" isneed="true" validate-msg="请选择客户类别."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>项目类型</span></td>
                <td class="alignLeft">
                    <select id="ProjectType" name="ProjectType" class="form-control" isneed="true" validate-msg="请选择项目类型."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>客户规模</span></td>
                <td class="alignLeft">
                    <select id="CustomSituation" name="CustomSituation" class="form-control" isneed="true" validate-msg="请选择客户规模."></select></td>
            </tr>

            <tr>
                <td class="alignRight"><span>成立时间</span></td>
                <td class="alignLeft">
                    <select id="EstablishTime" name="EstablishTime" class="form-control" isneed="true" validate-msg="请选择客户公司成立时间."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>联系方式</span></td>
                <td class="alignLeft">
                    <input id="CustomContact" name="CustomContact" type="tel" class="form-control" isneed="true" validate-msg="请输入客户联系方式." placeholder="--必填--" /></td>
            </tr>
            <tr>
                <td class="alignRight"><span>项目名称</span></td>
                <td class="alignLeft">
                    <input id="ProjectName" name="ProjectName" type="text" class="form-control" isneed="true" validate-msg="请输入项目名称." placeholder="--必填--" /></td>
            </tr>
            <tr>
                <td class="alignRight"><span>账期</span></td>
                <td class="alignLeft">
                    <select id="PayDays" name="PayDays" class="form-control" isneed="true" validate-msg="请选择账期."></select></td>
            </tr>

            <tr>
                <td class="alignRight"><span>支付方式</span></td>
                <td class="alignLeft">
                    <select id="PayType" name="PayType" class="form-control" isneed="true" validate-msg="请选择支付方式."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>交付方式</span></td>
                <td class="alignLeft">
                    <select id="DeliveryMethod" name="DeliveryMethod" class="form-control" isneed="true" validate-msg="请选择交付方式."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>FOT时间</span></td>
                <td class="alignLeft">
                    <input id="FotTime" name="FotTime" type="date" class="form-control" isneed="true" validate-msg="请输入FOT时间." placeholder="--必填--" /></td>
            </tr>
            <tr>
                <td class="alignRight"><span>PPAP时间</span></td>
                <td class="alignLeft">
                    <input id="PPAPTime" name="PPAPTime" type="date" class="form-control" isneed="true" validate-msg="请输入PPAP时间." placeholder="--必填--" /></td>
            </tr>
            <tr>
                <td class="alignRight"><span>项目周期</span></td>
                <td class="alignLeft">
                    <select id="ProjectCycle" name="ProjectCycle" class="form-control" isneed="true" validate-msg="请选择项目周期."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>所需资源</span></td>
                <td class="alignLeft">
                    <select id="ResourceNeed" name="ResourceNeed" class="form-control" isneed="true" validate-msg="请选择所需资源."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>利润率</span></td>
                <td class="alignLeft">
                    <select id="RateOfProfit" name="RateOfProfit" class="form-control" isneed="true" validate-msg="请选择利润率."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>制造难度</span></td>
                <td class="alignLeft">
                    <select id="DifficultyOfManufacture" name="DifficultyOfManufacture" class="form-control" isneed="true" validate-msg="请选择制造难度."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>回复期限</span></td>
                <td class="alignLeft">
                    <select id="ReplyLimit" name="ReplyLimit" class="form-control" isneed="true" validate-msg="请选择回复期限."></select></td>
            </tr>
            <tr>
                <td class="alignRight"><span>项目描述</span></td>
                <td class="alignLeft">
                    <textarea id="ProjectDesc" name="ProjectDesc" class="form-control" rows="3"></textarea></td>
            </tr>


        </table>
        <div class="form-group" style="text-align:center;margin-top:20px">
            <button type="button" class="btn btn-warning" onclick="Save()">保  存</button>
            <button type="button" class="btn btn-success" onclick="Submit()">提  交</button>
        </div>
    </div>
</body>
</html>
