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
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>
    <script src="../App/config/applyConfig.js"></script>
    <script src="../App/js/validate.js"></script>
    
    <title>立项申请</title>

<script type="text/javascript">

  
var ticket;
$(document).ready(function () {
    //每个需要访问服务的页面都要
    GetTicket(function (t) {
        ticket = t;
        console.log("ticket:"+ticket);

        BlindData();
    });
})


function BlindData(){

//  客户类别
BindSltAuth($("#CustomCategory"), config_service_url + "Dictionary/CustomCategory", function () {
            });

//  项目类型
BindSltAuth($("#ProjectType"), config_service_url + "Dictionary/ProjectType", function () {
            });

//  客户规模
BindSltAuth($("#CustomSituation"), config_service_url + "Dictionary/CustomSituation", function () {
            });

//  成立时间
BindSltAuth($("#EstablishTime"), config_service_url + "Dictionary/EstablishTime", function () {
            });

//  账期
BindSltAuth($("#PayDays"), config_service_url + "Dictionary/PayDays", function () {
            });


//  支付方式
BindSltAuth($("#PayType"), config_service_url + "Dictionary/PayType", function () {
            });


//  交付方式
BindSltAuth($("#DeliveryMethod"), config_service_url + "Dictionary/DeliveryMethod", function () {
            });


//  项目周期
BindSltAuth($("#ProjectCycle"), config_service_url + "Dictionary/ProjectCycle", function () {
            });


//  所需资源
BindSltAuth($("#ResourceNeed"), config_service_url + "Dictionary/ResourceNeed", function () {
            });


//  利润率
BindSltAuth($("#RateOfProfit"), config_service_url + "Dictionary/RateOfProfit", function () {
            });


//  制造难度
BindSltAuth($("#DifficultyOfManufacture"), config_service_url + "Dictionary/DifficultyOfManufacture", function () {
            });


//  回复期限
BindSltAuth($("#ReplyLimit"), config_service_url + "Dictionary/ReplyLimit", function () {
            });
}





function Submit() {
    var jsonObj = initStrJson($(".content"));
    console.log(jsonObj);

    AjaxPostAuthNew(config_service_url + "PrjEstablish/Submit", jsonObj, function (result) {
        console.log(result);
    }, 
    true, 
    ticket,
     function (XMLHttpRequest, textStatus, errorThrown) {
         console.log(XMLHttpRequest);
         console.log(textStatus);
         console.log(errorThrown);
     })
}

//判断是否有效
        function CheckValidate(obj)
        {
            var isOK = true;
            obj.find("input[type=text]").each(function ()
            {
                if ($(this).attr("isneed") == "true")
                {
                    //验证是否必填
                    if (IsNullOrEmpty($(this).val()))
                    {
                        isOK = false;
                        var _eleObj = $(this);

                        $.messager.alert("提示", $(this).attr("validate-msg"), "info",
                            function ()
                            {
                                _eleObj.focus();
                                _eleObj.attr("placeholder", "--必填--");
                            });
                        return isOK;
                    }
                }
                //else if ($(this).attr("isdemical") == "true")
                //{
                //    //验证是否是数字

                //}
            });
            return isOK;
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
                            <label for="ProjectNo" class="col-sm-3 control-label">项目编号</label>
                            <div class="col-sm-7">
                                <input id="ProjectNo" name="ProjectNo" type="text" value="项目编号" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomName" class="col-sm-3 control-label">客户名称</label>
                            <div class="col-sm-7">
                                <input id="CustomName" name="CustomName" type="text" value="客户名称" class="form-control" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="CustomCategory" class="col-sm-3 control-label">客户类别</label>
                            <div class="col-sm-3">
                                <select id="CustomCategory" name="CustomCategory" class="form-control"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="ProjectType" name="ProjectType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomSituation" class="col-sm-3 control-label">客户规模</label>
                            <div class="col-sm-7">
                                <select id="CustomSituation" name="CustomSituation" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="EstablishTime" class="col-sm-3 control-label">成立时间</label>
                            <div class="col-sm-7">
                                <select id="EstablishTime" name="EstablishTime" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomContact" class="col-sm-3 control-label">联系方式 </label>
                            <div class="col-sm-7">
                                <input id="CustomContact" name="CustomContact" type="text" class="form-control" placeholder=""/>
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
                            <label for="PayDays" class="col-sm-3 control-label">帐期 </label>
                            <div class="col-sm-3">
                                <select id="PayDays" name="PayDays" class="form-control"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="PayType" name="PayType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DeliveryMethod" class="col-sm-3 control-label">交付方式 </label>
                            <div class="col-sm-7">
                                <select id="DeliveryMethod" name="DeliveryMethod" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="FotTime" class="col-sm-3 control-label">FOT时间 </label>
                            <div class="col-sm-7">
                                <input id="FotTime" name="FotTime" type="text" class="form-control" placeholder=""/>
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
                            <label for="ResourceNeed" class="col-sm-3 control-label">所需资源 </label>
                            <div class="col-sm-7">
                                <select id="ResourceNeed" name="ResourceNeed" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="RateOfProfit" class="col-sm-3 control-label">利润率 </label>
                            <div class="col-sm-7">
                                <select id="RateOfProfit" name="RateOfProfit" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DifficultyOfManufacture" class="col-sm-3 control-label">制造难度 </label>
                            <div class="col-sm-7">
                                <select id="DifficultyOfManufacture" name="DifficultyOfManufacture" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ReplyLimit" class="col-sm-3 control-label">回复期限 </label>
                            <div class="col-sm-7">
                                <select id="ReplyLimit" name="ReplyLimit" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectDesc" class="col-sm-3 control-label">项目描述 </label>
                            <div class="col-sm-7">
                                <input id="ProjectDesc" name="ProjectDesc" type="text" class="form-control" placeholder=""/>
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
