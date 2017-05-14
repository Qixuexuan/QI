<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectApply.aspx.cs" Inherits="test.Web.ProjectApply.ProjectApply" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../App/css/common.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-3.2.1.js"></script>

    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script src="../App/js/validate.js"></script>
    <script src="../App/js/ProjectApply.js"></script>
    
    <title>立项申请</title>

</head>
<body>
    <div class="container-fluid">

        <div class="row ibox">
            <div class="col-md-12">
                <div class="title">
                    <h5>基本信息</h5>
                    <span class="glyphicon glyphicon-chevron-up"></span>
                </div>
                <div class="content">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="ProjectNo" class="col-sm-3 control-label">项目编号</label>
                            <div class="col-sm-7">
                                <input id="ProjectNo" name="ProjectNo" type="text" class="form-control" isneed="true" validate-msg="请输入项目编号." placeholder="--必填--"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomName" class="col-sm-3 control-label">客户名称</label>
                            <div class="col-sm-7">
                                <input id="CustomName" name="CustomName" type="text" class="form-control" isneed="true" validate-msg="请输入客户名称." placeholder="--必填--"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="CustomCategory" class="col-sm-3 control-label">客户类别</label>
                            <div class="col-sm-3">
                                <select id="CustomCategory" name="CustomCategory" class="form-control" isneed="true" validate-msg="请选择客户类别."></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="ProjectType" name="ProjectType" class="form-control" isneed="true" validate-msg="请选择项目类型."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomSituation" class="col-sm-3 control-label">客户规模</label>
                            <div class="col-sm-7">
                                <select id="CustomSituation" name="CustomSituation" class="form-control" isneed="true" validate-msg="请选择客户规模."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="EstablishTime" class="col-sm-3 control-label">成立时间</label>
                            <div class="col-sm-7">
                                <select id="EstablishTime" name="EstablishTime" class="form-control" isneed="true" validate-msg="请选择客户公司成立时间."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomContact" class="col-sm-3 control-label">联系方式 </label>
                            <div class="col-sm-7">
                                <input id="CustomContact" name="CustomContact" type="tel" class="form-control" isneed="true" validate-msg="请输入客户联系方式." placeholder="--必填--"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="row ibox">
            <div class="col-md-12">
                <div class="title">
                    <h5>详细信息</h5>
                    <span class="glyphicon glyphicon-chevron-up"></span>
                </div>
                <div class="content">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="ProjectName" class="col-sm-3 control-label">项目名称 </label>
                            <div class="col-sm-7">
                                <input id="ProjectName" name="ProjectName" type="text" class="form-control" isneed="true" validate-msg="请输入项目名称." placeholder="--必填--"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="PayDays" class="col-sm-3 control-label">帐期 </label>
                            <div class="col-sm-3">
                                <select id="PayDays" name="PayDays" class="form-control" isneed="true" validate-msg="请选择账期."></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="PayType" name="PayType" class="form-control" isneed="true" validate-msg="请选择支付方式."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DeliveryMethod" class="col-sm-3 control-label">交付方式 </label>
                            <div class="col-sm-7">
                                <select id="DeliveryMethod" name="DeliveryMethod" class="form-control" isneed="true" validate-msg="请选择交付方式."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="FotTime" class="col-sm-3 control-label">FOT时间 </label>
                            <div class="col-sm-7">
                                <input id="FotTime" name="FotTime" type="date" class="form-control" isneed="true" validate-msg="请输入FOT时间." placeholder="--必填--"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="PPAPTime" class="col-sm-3 control-label">PPAP时间 </label>
                            <div class="col-sm-7">
                                <input id="PPAPTime" name="PPAPTime" type="date" class="form-control" isneed="true" validate-msg="请输入PPAP时间." placeholder="--必填--"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectCycle" class="col-sm-3 control-label">项目周期 </label>
                            <div class="col-sm-7">
                                <select id="ProjectCycle" name="ProjectCycle" class="form-control" isneed="true" validate-msg="请选择项目周期."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ResourceNeed" class="col-sm-3 control-label">所需资源 </label>
                            <div class="col-sm-7">
                                <select id="ResourceNeed" name="ResourceNeed" class="form-control" isneed="true" validate-msg="请选择所需资源."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="RateOfProfit" class="col-sm-3 control-label">利润率 </label>
                            <div class="col-sm-7">
                                <select id="RateOfProfit" name="RateOfProfit" class="form-control" isneed="true" validate-msg="请选择利润率."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DifficultyOfManufacture" class="col-sm-3 control-label">制造难度 </label>
                            <div class="col-sm-7">
                                <select id="DifficultyOfManufacture" name="DifficultyOfManufacture" class="form-control" isneed="true" validate-msg="请选择制造难度."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ReplyLimit" class="col-sm-3 control-label">回复期限 </label>
                            <div class="col-sm-7">
                                <select id="ReplyLimit" name="ReplyLimit" class="form-control" isneed="true" validate-msg="请选择回复期限."></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectDesc" class="col-sm-3 control-label">项目描述 </label>
                            <div class="col-sm-7">
                                <!--<input id="ProjectDesc" name="ProjectDesc" type="text" class="form-control" placeholder=""/>-->
                                <textarea id="ProjectDesc" name="ProjectDesc" class="form-control" rows="3"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-warning">重  置</button>
                            <button type="button" class="btn btn-success" onclick="Submit()">提  交</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    </div>
</body>
</html>
