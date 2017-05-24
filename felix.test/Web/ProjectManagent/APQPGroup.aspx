<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="APQPGroup.aspx.cs" Inherits="test.Web.ProjectManagent.APQPGroup" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>APQP小组</title>
    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Content/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../../Content/common.css" rel="stylesheet" />
    <script type="text/javascript" src="../../Scripts/jquery.min.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
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

        span {
            color: red;
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
        th,td {
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
            padding:5px;
        }
        div p:nth-child(1) {
            margin-top:15px;
        }

        .member-name {
            width:50px;
            color:black;
            line-height:20px
        }

        .member-minus {
            color:red;
            font-size:15px;
            font-weight:bold;
            cursor:pointer;
            float:right;
            padding-right:20px;
            line-height:20px
        }
        .member-plus {
            color:green;
            font-size:15px;
            font-weight:bold;
            cursor:pointer
        }
    </style>
</head>

<body>
    <div class="content tableBox">
        <p><span>*</span>Remarks: If there are more than one member from same department, then the first member represent their department and take the responsibility</p>
        <p>注：以上成员每个部门若有多名成员构成，则排在第一位的人员是此部门对此案的领导和代表人员.</p>
        <table id="APQP-Table">
            <tr>
                <th>Dept 部 门</th>
                <th>Member 人员</th>
                <th>添加成员</th>
                <th>Responsibility 职 责</th>
            </tr>
            <tr>
                <td>Commercial/Customer representatives 商务/顾客代表</td>
                <td><div><span class="member-name">Jerry</span><span class="glyphicon glyphicon-minus member-minus" onclick="MinusMember()"></span></div>
                    <div><span class="member-name">TOMd.Jerry</span><span class="glyphicon glyphicon-minus member-minus" onclick="function(){$(this).parent().remove()}"></span></div>
                </td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>项目经理/项目组长：制定项目进度计划，项目成本和项目质量目标，并通过组织协调和控制来确保该目标的实现。和顾客工程方面事宜的沟通确认，包括项目进度等。</td>
            </tr>

            <tr>
                <td>Project management项目经理</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>项目经理/项目组长：制定项目进度计划，项目成本和项目质量目标，并通过组织协调和控制来确保该目标的实现。和顾客工程方面事宜的沟通确认，包括项目进度等。</td>
            </tr>

            <tr>
                <td>Quality Engineer质量工程师</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与项目各阶段的评估和确认，根据项目需求评估检测/试验设备的能力，主导图纸评估、特殊特性识别等工作，参与APQP文件制作。完成过程质量控制失效模式分析（FMEA），制定控制计划、检验指导书，测量指导书，完成[初始过程能力研究&测量系统研究计划]，并按照计划落实。供方管理，原材料的检验,质量问题的统计分析和反馈。（测量工装、夹制具的开发）</td>
            </tr>

            <tr>
                <td>Production生产</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与项目各阶段的评估和确认。根据项目需求评估主导产品实现过程设计、生产设备的能力。参与APQP文件的讨论和制作。完成工艺过程序失效模式分析（FMEA）,制定工作指导书，包装规范等。（主导生产过程工装、夹制具、自动货设备的开发）</td>
            </tr>

            <tr>
                <td>工艺工程</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与项目各阶段的评估和确认。根据项目需求评估主导产品实现过程设计、生产设备的能力。参与APQP文件的讨论和制作。完成工艺过程序失效模式分析（FMEA）,制定工作指导书，包装规范等。（主导生产过程工装、夹制具、自动货设备的开发）</td>
            </tr>

            <tr>
                <td>SCM供应链</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与项目各阶段的评估和确认。提供新项目产能需求评估&产能冲突解决方案，组织新供方的开发和确认，材料购买。试生产生产计划的安排等。</td>
            </tr>

            <tr>
                <td>Tooling Designer模具设计</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与项目各阶段的评估和确认。参与APQP文件的讨论和制作。负责模具设计和模具制造评审，模具进度管理。制定模具维护和保养规范等。模具问题点分析、改善方案制定，（备件评估&备件清单制作）</td>
            </tr>

            <tr>
                <td>钳工组长</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与项目各阶段的评估和确认。参与APQP文件的讨论和制作。负责模具设计和模具制造评审，模具进度管理。制定模具维护和保养规范等。模具问题点分析、改善方案制定，（备件评估&备件清单制作）</td>
            </tr>

            <tr>
                <td>研发</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与与研发相关项目的开发工作和评审工作</td>
            </tr>

            <tr>
                <td>自动化</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与前期项目自动化方案的设计、评估与开发调试</td>
            </tr>

            <tr>
                <td>包装工程</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>负责项目产品的包装方案和验证工作</td>
            </tr>

            <tr>
                <td>财务</td>
                <td></td>
                <td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td>
                <td>参与项目的成本核算和预算控制</td>
            </tr>
        </table>
    </div>

</body>
</html>
