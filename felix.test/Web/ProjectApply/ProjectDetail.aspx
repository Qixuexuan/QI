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
    <div class="FormPage" style="height: 430px; overflow: auto;">
        <div class="FormContent">
            <table cellpadding="5" cellspacing="0" class="table-edit" style="font-size: 13px; min-width: 500px; max-width: 800px;">
                <tr>
                    <td class="table-edit-title" style="width: 70px;">企业名称:</td>
                    <td class="table-edit-content formJson" colspan="3" style="width: 300px;">
                        <input id="Guid" name="Guid" style="display: none" />
                        <div id="CompanyNameDesc" style="color: blue"></div>
                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">工商注册号:</td>
                    <td class="table-edit-content" style="width: 150px;">
                        <div id="RegistrationNumber" style="color: blue"></div>
                        <!--<input type="text" name="RegistrationNumber" id="Text1" isneed="true" validate-msg="请输入工商注册号." placeholder="--必填--" />-->
                    </td>
                    <td class="table-edit-title" style="width: 70px;">组织机构代码:</td>
                    <td class="table-edit-content" style="width: 150px;">
                        <div id="OrganizationCode" style="color: blue"></div>
                        <!--<input type="text" name="OrganizationCode" id="OrganizationCode" isneed="true" validate-msg="请输入组织机构代码." placeholder="--必填--" />-->
                    </td>

                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">地址:</td>
                    <td class="table-edit-content formJson" colspan="3" style="width: 300px;">
                        <input type="text" name="Address" id="Address" isneed="true" validate-msg="请输入地址." placeholder="--必填--" />
                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">企业属地:</td>
                    <td class="table-edit-content formJson" colspan="3" style="width: 300px;">
                        <input type="text" name="Region" id="Region" isneed="true" validate-msg="请输入企业属地." placeholder="--必填--" />
                    </td>
                </tr>
                <tr>

                    <td class="table-edit-title" style="width: 70px;">邮政编码:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" name="Postcode" id="Postcode" placeholder="--邮政编码--" />
                    </td>
                    <td class="table-edit-title" style="width: 70px;">企业规模:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <select id="Scale" name="Scale" isneed="true" validate-msg="请输入企业规模.">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">企业性质:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <select id="Nature" name="Nature" isneed="true" validate-msg="请输入企业性质.">
                        </select>
                    </td>
                    <td class="table-edit-title" style="width: 70px;">行业类别:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <select id="Category" name="Category" isneed="true" validate-msg="请输入行业类别.">
                        </select>
                    </td>
                </tr>
                <!--<tr>
                    <td class="table-edit-title" style="width: 70px;">企业分类:</td>
                    <td class="table-edit-content" style="width: 150px;">
                        <select id="Classification" name="Classification">
                            <option value="1">企业分类1</option>
                            <option value="2">企业分类2</option>
                        </select>
                    </td>
                   
                </tr>-->

                <tr>
                    <td class="table-edit-title" style="width: 70px;">投资方国籍:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <select id="InvestorNationality" name="InvestorNationality" isneed="true" validate-msg="请输入投资方国籍.">
                        </select>
                    </td>
                    <td class="table-edit-title" style="width: 70px;">法人姓名:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="CorporateName" name="CorporateName" isneed="true" validate-msg="请输入法人姓名." placeholder="--必填--" />
                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">法人性别:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <select id="CorporateGender" name="CorporateGender" isneed="true" validate-msg="请输入法人性别.">
                        </select>
                        <!--<input type="text" id="CorporateGender" name="CorporateGender" isneed="true" validate-msg="请输入法人性别." placeholder="--必填--" />-->
                    </td>
                    <td class="table-edit-title" style="width: 70px;">法人年龄:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="CorporateAge" name="CorporateAge"
                            isneed="true" validatetype="IsInteger" validate-msg="请输入法人年龄." placeholder="--必填--" />

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">法人联系电话:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="CorporatePhone" name="CorporatePhone"
                            isneed="true" validatetype="IsAnyPhoneNumber" validate-msg="请输入法人联系电话." placeholder="--必填--" />

                    </td>
                    <td class="table-edit-title" style="width: 70px;">法人证件号码:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="CertificateNumber" name="CertificateNumber"
                            isneed="true" validate-msg="请输入法人证件号码." placeholder="--必填--" />

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">法人电子邮箱:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="Email" name="Email"
                            validatetype="IsEmail" isneed="true" validate-msg="请输入法人电子邮箱." placeholder="--必填--" />

                    </td>
                    <td class="table-edit-title" style="width: 70px;">法人职务:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="CorporateDuty" name="CorporateDuty"
                            isneed="true" validate-msg="请输入法人职务." placeholder="--必填--" />

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">企业设立日期:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="CreateDate" name="CreateDate"
                            onfocus="WdatePicker({dateFmt: 'yyyy-MM-dd'})"
                            isneed="true" validate-msg="请输入企业设立日期." placeholder="--必填--" />

                    </td>
                    <td class="table-edit-title" style="width: 70px;">企业投产日期:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="InvestmentDate" name="InvestmentDate"
                            onfocus="WdatePicker({dateFmt: 'yyyy-MM-dd'})"
                            isneed="true" validate-msg="请输入企业投产日期." placeholder="--必填--" />

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">注册资本(万):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="RegisteredCapita" name="RegisteredCapita" style="width: 100px !important;"
                            isneed="true" validatetype="IsNumeric" validate-msg="请输入注册资本." placeholder="--必填--" />
                        <select name="RegisteredCapitaUnit" id="RegisteredCapitaUnit" isneed="true" style="width: 60px !important;">
                        </select>
                    </td>
                    <td class="table-edit-title" style="width: 70px;">投资总额(万):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="TotalInvestment" name="TotalInvestment" style="width: 100px !important;"
                            isneed="true" validatetype="IsNumeric" validate-msg="请输入投资总额." placeholder="--必填--" />
                        <select name="TotalInvestmentUnit" id="TotalInvestmentUnit" isneed="true" style="width: 60px !important;">
                        </select>

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">固定资产总额(万):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="FixedTotalInvestment" name="FixedTotalInvestment" style="width: 100px !important;"
                            isneed="true" validatetype="IsNumeric" validate-msg="请输入固定资产总额." placeholder="--必填--" />
                        <select name="FixedTotalInvestmentUnit" id="FixedTotalInvestmentUnit" isneed="true" style="width: 60px !important;">
                        </select>
                    </td>
                    <td class="table-edit-title" style="width: 70px;">占地面积(㎡):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="Area" name="Area"
                            isneed="true" validatetype="IsNumeric" validate-msg="请输入占地面积." placeholder="--必填--" />

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">办公楼面积(㎡):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="OfficeArea" name="OfficeArea"
                            isneed="true" validatetype="IsNumeric" validate-msg="请输入办公楼面积." placeholder="--必填--" />

                    </td>
                    <td class="table-edit-title" style="width: 70px;">车间厂房面积(㎡):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="FactoryArea" name="FactoryArea"
                            isneed="true" validatetype="IsNumeric" validate-msg="请输入车间厂房面积." placeholder="--必填--" />

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">仓库面积(㎡):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="WarehouseArea" name="WarehouseArea"
                            isneed="true" validatetype="IsNumeric" validate-msg="请输入仓库面积." placeholder="--必填--" />

                    </td>
                    <td class="table-edit-title" style="width: 70px;">厂房归属:</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <select id="PlantOwnership" name="PlantOwnership" isneed="true" validate-msg="请输入厂房归属.">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">管理人员数(位):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="ManagerNumber" name="ManagerNumber"
                            isneed="true" validatetype="IsInteger" validate-msg="请输入管理人员数." placeholder="--必填--" />

                    </td>
                    <td class="table-edit-title" style="width: 70px;">工人数(位):</td>
                    <td class="table-edit-content formJson" style="width: 150px;">
                        <input type="text" id="WorkerNumber" name="WorkerNumber"
                            isneed="true" validatetype="IsInteger" validate-msg="请输入工人数." placeholder="--必填--" />

                    </td>
                </tr>
                <tr>
                    <td class="table-edit-title" style="width: 70px;">经营范围:</td>
                    <td class="table-edit-content formJson" colspan="3" style="width: 300px;">
                        <input type="text" id="BusinessScope" name="BusinessScope" isneed="true" validate-msg="请输入经营范围." placeholder="--必填--" />

                    </td>
                </tr>
            </table>

        </div>

    </div>
</body>
</html>
