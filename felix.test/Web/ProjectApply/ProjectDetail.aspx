<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectDetail.aspx.cs" Inherits="test.Web.ProjectApply.ProjectDetail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>项目详情</title>
    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../App/css/common.css" rel="stylesheet" type="text/css" />
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
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="ProjectNO" class="col-sm-3 control-label">项目编号</label>
                            <div class="col-sm-7">
                                <input id="ProjectNO" type="text" class="form-control" placeholder="" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomerName" class="col-sm-3 control-label">客户名称</label>
                            <div class="col-sm-7">
                                <input id="CustomerName" type="text" class="form-control" placeholder="" readonly="readonly"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="ObjType" class="col-sm-3 control-label">客户类别</label>
                            <div class="col-sm-3">
                                <select id="ObjType" class="form-control" disabled="disabled"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="HostType" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomerSize" class="col-sm-3 control-label">客户规模</label>
                            <div class="col-sm-7">
                                <select id="CustomerSize" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="EstablishTime" class="col-sm-3 control-label">成立时间</label>
                            <div class="col-sm-7">
                                <select id="EstablishTime" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Tel" class="col-sm-3 control-label">联系方式 </label>
                            <div class="col-sm-7">
                                <input id="Tel" type="text" class="form-control" placeholder="" readonly="readonly"/>
                            </div>
                        </div>
                    </form>

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
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="ProjectName" class="col-sm-3 control-label">项目名称 </label>
                            <div class="col-sm-7">
                                <input id="ProjectName" type="text" class="form-control" placeholder="" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="AccountTime" class="col-sm-3 control-label">帐期 </label>
                            <div class="col-sm-3">
                                <select id="AccountTime" class="form-control" disabled="disabled"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="PayType" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DeliverType" class="col-sm-3 control-label">交付方式 </label>
                            <div class="col-sm-7">
                                <select id="DeliverType" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="FPTTIme" class="col-sm-3 control-label">FOT时间 </label>
                            <div class="col-sm-7">
                                <input id="FPTTIme" type="text" class="form-control" placeholder="" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="PPAPTime" class="col-sm-3 control-label">PPAP时间 </label>
                            <div class="col-sm-7">
                                <input id="PPAPTime" type="text" class="form-control" placeholder="" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectCycle" class="col-sm-3 control-label">项目周期 </label>
                            <div class="col-sm-7">
                                <select id="ProjectCycle" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="RequireResource" class="col-sm-3 control-label">所需资源 </label>
                            <div class="col-sm-7">
                                <select id="RequireResource" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProfitMargin" class="col-sm-3 control-label">利润率 </label>
                            <div class="col-sm-7">
                                <select id="ProfitMargin" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DifficultyGrade" class="col-sm-3 control-label">制造难度 </label>
                            <div class="col-sm-7">
                                <select id="DifficultyGrade" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ReplyTerm" class="col-sm-3 control-label">回复期限 </label>
                            <div class="col-sm-7">
                                <select id="ReplyTerm" class="form-control" disabled="disabled"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectDes" class="col-sm-3 control-label">项目描述 </label>
                            <div class="col-sm-7">
                                <input id="ProjectDes" type="text" class="form-control" placeholder="" readonly="readonly"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-warning btn-lg">Reject</button>
                            <button type="button" class="btn btn-success btn-lg">Approve</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>

        <div class="row ibox">
            <div class="col-md-12">
                <div class="title">
                    <h5>审核信息</h5>
                    <span class="glyphicon glyphicon-chevron-up"></span>
                </div>
                <div class="content">

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="ProDeptAssessment" class="col-sm-3 control-label">项目部评估 </label>
                                    <div class="col-sm-7">
                                        <select id="ProDeptAssessment" class="form-control" disabled="disabled"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="ProDeptDes" class="col-sm-3 control-label">备注 </label>
                                    <div class="col-sm-7">
                                        <input id="ProDeptDes" type="text" class="form-control" placeholder="" readonly="readonly"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="TecDeptAssessment" class="col-sm-3 control-label">技术部评估 </label>
                                    <div class="col-sm-7">
                                        <select id="TecDeptAssessment" class="form-control" disabled="disabled"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="TecDeptDes" class="col-sm-3 control-label">备注 </label>
                                    <div class="col-sm-7">
                                        <input id="TecDeptDes" type="text" class="form-control" placeholder="" readonly="readonly"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="ManufactureDiffAssessment" class="col-sm-3 control-label">制造难度评估 </label>
                                    <div class="col-sm-7">
                                        <select id="ManufactureDiffAssessment" class="form-control" disabled="disabled"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="CapacityDiffAssessment" class="col-sm-3 control-label">产能难度评估 </label>
                                    <div class="col-sm-7">
                                        <select id="CapacityDiffAssessment" class="form-control" disabled="disabled"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="MakeDes" class="col-sm-3 control-label">备注 </label>
                                    <div class="col-sm-7">
                                        <input id="MakeDes" type="text" class="form-control" placeholder="" readonly="readonly"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="ProjectAssessment" class="col-sm-3 control-label">项目评估 </label>
                                    <div class="col-sm-7">
                                        <select id="ProjectAssessment" class="form-control" disabled="disabled"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="ProjectDes1" class="col-sm-3 control-label">备注 </label>
                                    <div class="col-sm-7">
                                        <input id="ProjectDes1" type="text" class="form-control" placeholder="" readonly="readonly"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-warning btn-lg" onclick="submit()">Reject</button>
                        <button type="button" class="btn btn-success btn-lg">Approve</button>
                    </div>




                </div>

            </div>
        </div>

    </div>
</body>
</html>
