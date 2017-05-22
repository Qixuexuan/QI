<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectApplyEdit.aspx.cs" Inherits="test.Web.ProjectApply.ProjectApply" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../App/css/tableContent.css" rel="stylesheet" type="text/css" />--%>
    <script type="text/javascript" src="../../Scripts/jquery-3.2.1.js"></script>

    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script src="../App/js/validate.js"></script>
    <script src="../App/js/ProjectApplyEdit.js"></script>

    <title>立项申请</title>

    <style>
        table {
            width: 80%;
            margin: 0 auto;
            margin-top: 20px;
            border: 1px solid lightgray;
        }
        
        table,
        table tr th,
        table tr td {
            border: 1px solid #f2f0f1;
        }
        
        tr {
            height: 45px;
            line-height: 40px;
        }
        
        /*odd表示下标是基数的元素*/
        table tr td:nth-child(odd) {
            width: 100px;
            background-color: #F6F6F6;
            text-align: right;
            padding-right: 10px;
        }
        table tr td:nth-child(even) {
            width: 340px;
            padding-left: 20px;
            padding-right: 15px;
        }
    </style>
</head>
<body>
    <div class="content">
        <table>
        <tr>
            <td>客户名称</td>
            <td class="formJson"><select id="CustomName" name="CustomName" type="text" class="form-control" isneed="true" validate-msg="请输入客户名称."></select></td>
            <td>客户类别</td>
            <td class="formJson"><select id="CustomCategory" name="CustomCategory" class="form-control" isneed="true" validate-msg="请选择客户类别."></select></td>
        </tr>
        <tr>
            <td>项目类型</td>
            <td class="formJson"><select id="ProjectType" name="ProjectType" class="form-control" isneed="true" validate-msg="请选择项目类型."></select></td>
            <td>客户规模</td>
            <td class="formJson"><select id="CustomSituation" name="CustomSituation" class="form-control" isneed="true" validate-msg="请选择客户规模."></select></td>
        </tr>
        <tr>
            <td>成立时间</td>
            <td class="formJson"><select id="EstablishTime" name="EstablishTime" class="form-control" isneed="true" validate-msg="请选择客户公司成立时间."></select></td>
            <td>联系方式</td>
            <td class="formJson"><input id="CustomContact" name="CustomContact" type="tel" class="form-control" isneed="true" validate-msg="请输入客户联系方式." placeholder="--必填--" /></td>
        </tr>
        <tr>
            <td>项目名称</td>
            <td class="formJson"><input id="ProjectName" name="ProjectName" type="text" class="form-control" isneed="true" validate-msg="请输入项目名称." placeholder="--必填--" /></td>
            <td>账期</td>
            <td class="formJson"><select id="PayDays" name="PayDays" class="form-control" isneed="true" validate-msg="请选择账期."></select></td>
        </tr>
        <tr>
            <td>支付方式</td>
            <td class="formJson"><select id="PayType" name="PayType" class="form-control" isneed="true" validate-msg="请选择支付方式."></select></td>
            <td>交付方式</td>
            <td class="formJson"><select id="DeliveryMethod" name="DeliveryMethod" class="form-control" isneed="true" validate-msg="请选择交付方式."></select></td>
        </tr>
        <tr>
            <td>FOT时间</td>
            <td class="formJson"><input id="FotTime" name="FotTime" type="date" class="form-control" isneed="true" validate-msg="请输入FOT时间." placeholder="--必填--" /></td>
            <td>PPAP时间</td>
            <td class="formJson"><input id="PPAPTime" name="PPAPTime" type="date" class="form-control" isneed="true" validate-msg="请输入PPAP时间." placeholder="--必填--" /></td>
        </tr>
        <tr>
            <td>项目周期</td>
            <td class="formJson"><select id="ProjectCycle" name="ProjectCycle" class="form-control" isneed="true" validate-msg="请选择项目周期."></select></td>
            <td>所需资源</td>
            <td class="formJson"><select id="ResourceNeed" name="ResourceNeed" class="form-control" isneed="true" validate-msg="请选择所需资源."></select></td>
        </tr>
        <tr>
            <td>利润率</td>
            <td class="formJson"><select id="RateOfProfit" name="RateOfProfit" class="form-control" isneed="true" validate-msg="请选择利润率."></select></td>
            <td>制造难度</td>
            <td class="formJson"><select id="DifficultyOfManufacture" name="DifficultyOfManufacture" class="form-control" isneed="true" validate-msg="请选择制造难度."></select></td>
        </tr>
        <tr>
            <td>回复期限</td>
            <td class="formJson"><select id="ReplyLimit" name="ReplyLimit" class="form-control" isneed="true" validate-msg="请选择回复期限."></select></td>
            <td>项目描述</td>
            <td class="formJson"><textarea id="ProjectDesc" name="ProjectDesc" class="form-control" rows="3"></textarea></td>
        </tr>
    </table>
        <div class="form-group" style="text-align:center;margin-top:20px">
            <button type="button" class="btn btn-warning" onclick="Save()">保  存</button>
            <button type="button" class="btn btn-success" onclick="Submit()">提  交</button>
        </div>
    </div>
</body>
</html>
