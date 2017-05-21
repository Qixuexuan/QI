<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectDetail.aspx.cs" Inherits="test.Web.ProjectApply.ProjectDetail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>项目详情</title>
    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../App/css/common.css" rel="stylesheet" type="text/css" />

    <!--easyui css-->
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <!--easyui css-->
    <link href="../../App_Themes/Flat/newstyle.css" rel="stylesheet" />
    <link href="../../App_Themes/Flat/Form.css" rel="stylesheet" />
    <link href="../../Content/table.css" rel="stylesheet" />
    <link href="../../Content/form.css" rel="stylesheet" />
    <!--jquery js-->
    <script src="../../Scripts/jquery.min.js"></script>
    <!--easyui js-->
    <script src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script src="../../Scripts/jquery.easyui.sltdialog.js"></script>
    <script src="../../Scripts/easyUI/easyui-lang-zh_CN.js"></script>
</head>
<body>
    <!--<div class="container-fluid" style="background-color:white">-->
        <!--<div class="row">-->
            <div class="tableBox">
                <table>
                    <tr>
                        <td class="alignRight"><span>项目编码</span></td>
                        <td class="alignLeft"><span id="ProjectNo"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>项目名称</span></td>
                        <td class="alignLeft"><span id="ProjectName"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>项目申请人</span></td>
                        <td class="alignLeft"><span id="ApplyPerson"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>项目申请时间</span></td>
                        <td class="alignLeft"><span id="ApplyTime"></span></td>
                    </tr>

                    <tr>
                        <td class="alignRight"><span>客户类别</span></td>
                        <td class="alignLeft"><span id="CustomCategoryDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>客户名称</span></td>
                        <td class="alignLeft"><span id="CustomName"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>客户规模</span></td>
                        <td class="alignLeft"><span id="CustomSituationDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>成立时间</span></td>
                        <td class="alignLeft"><span id="EstablishTimeDesc"></span></td>
                    <tr>
                        <td class="alignRight"><span>联系方式</span></td>
                        <td class="alignLeft"><span id="CustomContact"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>帐期</span></td>
                        <td class="alignLeft"><span id="PayDaysDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>支付方式</span></td>
                        <td class="alignLeft"><span id="PayTypeDesc"></span></td>
                    <tr>
                        <td class="alignRight"><span>交付方式</span></td>
                        <td class="alignLeft"><span id="DeliveryMethodDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>FOT时间</span></td>
                        <td class="alignLeft"><span id="FotTime"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>PPAP时间</span></td>
                        <td class="alignLeft"><span id="PPAPTime"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>项目周期</span></td>
                        <td class="alignLeft"><span id="ProjectCycleDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>所需资源</span></td>
                        <td class="alignLeft"><span id="ResourceNeedDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>利润率</span></td>
                        <td class="alignLeft"><span id="RateOfProfitDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>制造难度</span></td>
                        <td class="alignLeft"><span id="DifficultyOfManufactureDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>回复期限</span></td>
                        <td class="alignLeft"><span id="ReplyLimitDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>项目描述</span></td>
                        <td class="alignLeft"><span id="ProjectDesc"></span></td>
                    </tr>

                </table>
            </div>

        <!--</div>-->

        <!--<div class="row">-->
            <div class="tableBox">
                <table>
                    <tr>
                        <td class="alignRight"><span>项目部评估</span></td>
                        <td class="alignLeft"><span id="PrjDeptEvaluateDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>技术部评估</span></td>
                        <td class="alignLeft"><span id="TechDeptEvaluateDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>制造难度评估</span></td>
                        <td class="alignLeft"><span id="MakeDifficutEvaluateDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>产能评估</span></td>
                        <td class="alignLeft"><span id="OutDifficultEvaluateDesc"></span></td>
                    </tr>
                    <tr>
                        <td class="alignRight"><span>项目自评</span></td>
                        <td class="alignLeft"><span id="SelfEvaluateDesc"></span></td>
                    </tr>

                </table>
            </div>

        <!--</div>-->
    <!--</div>-->
</body>
</html>
