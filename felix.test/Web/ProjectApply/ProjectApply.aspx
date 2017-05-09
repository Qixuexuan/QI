<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectApply.aspx.cs" Inherits="test.Web.ProjectApply.ProjectApply" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../App/css/common.css" rel="stylesheet" type="text/css" />
    <script src="../App/js/projApply.js"></script>
    <title>立项申请</title>
</head>
<body>
    <%--<form id="form1" runat="server">--%>
    <div style="height: 35px; padding-top: 6px; padding-left: 10px; border-top: 1px solid #ccc; margin-top: 2px;">
            <form id="Form1" runat="server">
                <div style="float: left">
                    <asp:LinkButton runat="server" Visible="false" ID="lbtNew" CssClass="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true">新建</asp:LinkButton>
                    <asp:LinkButton runat="server" Visible="false" ID="lbtEdit" CssClass="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:true">修改</asp:LinkButton>
                    <asp:LinkButton runat="server" Visible="false" ID="lbtDelete" CssClass="easyui-linkbutton" data-options="iconCls:'icon-cancel',plain:true">删除</asp:LinkButton>
                </div>
                <div style="float: left">
                    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-detail',plain:true"
                        onclick="Detail()">详情</a>
                    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:true"
                        onclick="reload()">刷新</a>
                </div>
            </form>
        </div>
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
                                <input id="ProjectNO" type="text" value="项目编号" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomerName" class="col-sm-3 control-label">客户名称</label>
                            <div class="col-sm-7">
                                <input id="CustomerName" type="text" value="客户名称" class="form-control" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="ObjType" class="col-sm-3 control-label">客户类别</label>
                            <div class="col-sm-3">
                                <select id="ObjType" class="form-control"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="HostType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="CustomerSize" class="col-sm-3 control-label">客户规模</label>
                            <div class="col-sm-7">
                                <select id="CustomerSize" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="EstablishTime" class="col-sm-3 control-label">成立时间</label>
                            <div class="col-sm-7">
                                <select id="EstablishTime" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Tel" class="col-sm-3 control-label">联系方式 </label>
                            <div class="col-sm-7">
                                <input id="Tel" type="text" class="form-control" placeholder=""/>
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
                                <input id="ProjectName" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="AccountTime" class="col-sm-3 control-label">帐期 </label>
                            <div class="col-sm-3">
                                <select id="AccountTime" class="form-control"></select>
                            </div>
                            <div class="col-sm-4">
                                <select id="PayType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DeliverType" class="col-sm-3 control-label">交付方式 </label>
                            <div class="col-sm-7">
                                <select id="DeliverType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="FPTTIme" class="col-sm-3 control-label">FOT时间 </label>
                            <div class="col-sm-7">
                                <input id="FPTTIme" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="PPAPTime" class="col-sm-3 control-label">PPAP时间 </label>
                            <div class="col-sm-7">
                                <input id="PPAPTime" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectCycle" class="col-sm-3 control-label">项目周期 </label>
                            <div class="col-sm-7">
                                <select id="ProjectCycle" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="RequireResource" class="col-sm-3 control-label">所需资源 </label>
                            <div class="col-sm-7">
                                <select id="RequireResource" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProfitMargin" class="col-sm-3 control-label">利润率 </label>
                            <div class="col-sm-7">
                                <select id="ProfitMargin" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="DifficultyGrade" class="col-sm-3 control-label">制造难度 </label>
                            <div class="col-sm-7">
                                <select id="DifficultyGrade" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ReplyTerm" class="col-sm-3 control-label">回复期限 </label>
                            <div class="col-sm-7">
                                <select id="ReplyTerm" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="ProjectDes" class="col-sm-3 control-label">项目描述 </label>
                            <div class="col-sm-7">
                                <input id="ProjectDes" type="text" class="form-control" placeholder=""/>
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="button" class="btn btn-warning btn-lg">重  置</button>
                            <button type="button" class="btn btn-success btn-lg">提  交</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>


    </div>
    <%--</form>--%>
</body>
</html>
