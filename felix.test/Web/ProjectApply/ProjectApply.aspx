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
    <script src="../App/config/applyConfig.js"></script>
    <script src="../App/js/validate.js"></script>
    <script src="../../Scripts/tools.js" type="text/javascript"></script>
    <script src="../../Scripts/config.js" type="text/javascript"></script>
    <title>立项申请</title>

<script type="text/javascript">



function Submit(){
    var jsonObj = initStrJson($(".content"));
    console.log(jsonObj);

    var da={"ProjectNo":"111","ProjectName":"ddf"}

    AjaxPost(config_service_url + "PrjEstablish",da,function(){
        alert(rr)
    },true)

}

</script>
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
                            <label for="ProjectNO" class="col-sm-3 control-label">项目编号</label>
                            <div class="col-sm-7">
                                <input id="ProjectNO" name="ProjectNO" type="text" value="项目编号" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomerName" class="col-sm-3 control-label">客户名称</label>
                            <div class="col-sm-7">
                                <input id="CustomerName" name="CustomerName" type="text" value="客户名称" class="form-control" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="ObjType" class="col-sm-3 control-label">客户类别</label>
                            <div class="col-sm-3">
                                <select id="ObjType" name="ObjType" class="form-control"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="HostType" name="HostType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomerSize" class="col-sm-3 control-label">客户规模</label>
                            <div class="col-sm-7">
                                <select id="CustomerSize" name="CustomerSize" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="EstablishTime" class="col-sm-3 control-label">成立时间</label>
                            <div class="col-sm-7">
                                <select id="EstablishTime" name="EstablishTime" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Tel" class="col-sm-3 control-label">联系方式 </label>
                            <div class="col-sm-7">
                                <input id="Tel" name="Tel" type="text" class="form-control" placeholder=""/>
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
                                <input id="ProjectName" name="ProjectName" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="AccountTime" class="col-sm-3 control-label">帐期 </label>
                            <div class="col-sm-3">
                                <select id="AccountTime" name="AccountTime" class="form-control"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="PayType" name="PayType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DeliverType" class="col-sm-3 control-label">交付方式 </label>
                            <div class="col-sm-7">
                                <select id="DeliverType" name="DeliverType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="FPTTIme" class="col-sm-3 control-label">FOT时间 </label>
                            <div class="col-sm-7">
                                <input id="FPTTIme" name="FPTTIme" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="PPAPTime" class="col-sm-3 control-label">PPAP时间 </label>
                            <div class="col-sm-7">
                                <input id="PPAPTime" name="PPAPTime" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectCycle" class="col-sm-3 control-label">项目周期 </label>
                            <div class="col-sm-7">
                                <select id="ProjectCycle" name="ProjectCycle" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="RequireResource" class="col-sm-3 control-label">所需资源 </label>
                            <div class="col-sm-7">
                                <select id="RequireResource" name="RequireResource" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProfitMargin" class="col-sm-3 control-label">利润率 </label>
                            <div class="col-sm-7">
                                <select id="ProfitMargin" name="ProfitMargin" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DifficultyGrade" class="col-sm-3 control-label">制造难度 </label>
                            <div class="col-sm-7">
                                <select id="DifficultyGrade" name="DifficultyGrade" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ReplyTerm" class="col-sm-3 control-label">回复期限 </label>
                            <div class="col-sm-7">
                                <select id="ReplyTerm" name="ReplyTerm" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectDes" class="col-sm-3 control-label">项目描述 </label>
                            <div class="col-sm-7">
                                <input id="ProjectDes" name="ProjectDes" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-warning btn-lg">重  置</button>
                            <button type="button" class="btn btn-success btn-lg" onclick="Submit()">提  交</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    </div>
</body>
</html>
