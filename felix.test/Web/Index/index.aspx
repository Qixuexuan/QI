<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="test.Web.index.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>

    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../App/css/index.css" rel="stylesheet" />
    
</head>
<body>
    <div class="container-fluid">

        <div class="row ibox">
            <div class="col-md-8">
                <div class="title" style="border-top:3px solid #CCCC99">
                    <span class="glyphicon glyphicon-user" style="color: cadetblue"></span>
                    <h5>登陆信息</h5>
                </div>
                <div class="content">
                    <p>登陆用户：星诺奇科技</p>
                    <p>上次登陆时间：2017-05-07 13：23：20</p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="title">
                    <span class="glyphicon glyphicon-wrench" style="color: cadetblue;margin-left:10px"></span>
                    <h5>轻松办公</h5>
                </div>
                <div class="content" style="min-height: 100px;">
                    <p><span class="glyphicon glyphicon-hand-right" style="color:#336633"/><a class="mya">任务清单</a></p>
                    <p><span class="glyphicon glyphicon-hand-right" style="color:#990033"/><a class="mya">密码修改</a></p>
                    <p><span class="glyphicon glyphicon-hand-right" style="color:#0099CC"/><a class="mya">退出登陆</a></p>
                </div>
            </div>
        </div>

        <div class="row ibox">
            <div class="col-md-8">
                <div class="title" style="border-top:3px solid #CCCC99">
                    <span class="glyphicon glyphicon-bullhorn" style="color: red;line-height: 48px;margin-left: 10px"></span>
                    <h5>Andon警告</h5>
                </div>
                <div class="content">
                    <p>项目申请单P10001等待审核 已逾期5天    申请人:Kiven,申请时间：2017/03/10</p>
                    <p>项目P10001等待您成立APQP小组 已逾期7天    申请人:Terry,申请时间：2017/03/07</p>
                    <p>项目P10001等待您成立APQP小组 已逾期7天    申请人:Terry,申请时间：2017/03/07</p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="title">
                    <span class="glyphicon glyphicon-phone-alt" style="color: cadetblue;margin-left:10px"></span>
                    <h5>服务支持</h5>
                </div>
                <div class="content" style="min-height: 100px;">
                    <p><span class="glyphicon glyphicon-hand-right" style="color:#990033" /><span class="mysp">All services are currently running</span></p>
                    <p><span class="glyphicon glyphicon-hand-right" style="color:#009966" /><span class="mysp">0512-65928988/836</span></p>
                    <p><span class="glyphicon glyphicon-hand-right" style="color:#33CC33" /><span class="mysp">Justin.wang@sinno-tech.com</span></p>
                </div>
            </div>
        </div>

        <div class="row ibox">
            <div class="col-md-8">
                <div class="title" style="border-top:3px solid #CCCC99">
                    <span class="glyphicon glyphicon-pushpin" style="color: brown"></span>
                    <h5>未完成进度</h5>
                </div>
                <div class="content">
                    <p>P00001 申请日期：2017/03/07  进度：报价>财务审核</p>
                </div>
            </div>
        </div>

        <div class="row ibox">
            <div class="col-md-8">
                <div class="title" style="border-top:3px solid #CCCC99">
                    <span class="glyphicon glyphicon-info-sign" style="color: cadetblue"></span>
                    <h5>在制项目的生产状况</h5>
                </div>
                <div class="content">
                    <p>P10001工作中心:PA02,模具:100251-8000290,正常运行5天，OEE:98%,良率99%</p>
                </div>
            </div>
        </div>




    </div>
</body>
</html>
