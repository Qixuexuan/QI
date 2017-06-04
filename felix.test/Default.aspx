<%@ Page Language="C#" AutoEventWireup="true" Inherits="Default" Codebehind="Default.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="App_Themes/Flat/Login/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
    <link href="App_Themes/Flat/Login/learunui-framework.css" rel="stylesheet" />
    <link href="App_Themes/Flat/login/loginnew.css" rel="stylesheet" type="text/css" />
    <%--<link href="App_Themes/Flat/Login/zzsc.css" rel="stylesheet" />--%>
    <link href="Js/jQueryTheme/jquery.ui.all.css" rel="stylesheet" />
    <link href="Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" />
    <script type="text/javascript" src="Js/jQueryUI/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="Js/jQueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="Js/jQueryUI/jquery-ui.custom.min.js"></script>
    <script type="text/javascript" src="Js/bootstrap-3.2.0-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="Js/bootstrap-3.2.0-dist/js/bootstrap-treeview.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
      <script src="Js/respond.js"></script>
    <![endif]-->
    <script type="text/javascript">
        function showDialog()
        {
            $("#hDivDialog").dialog({
                resizable: false,
                height: 342,
                width: 480,
                modal: true,
                title: ""
            });
            $(".ui-dialog-titlebar").css("height", "0px");
            $(".ui-dialog-titlebar").css("border", "0px");
            $(".ui-dialog-titlebar").css("background-color", "#fff");
            $(".ui-dialog-titlebar").css("padding", "0px");
            $("#hDivDialog").css("padding", "0px");
            $("#hDivDialog").css("margin-left", "-5px");
            $(".ui-dialog-title").css("margin", "0px");

            $(".ui-dialog-titlebar-close").css("margin-top", "8px");
            $(".ui-dialog-titlebar-close").css("z-index", "100");

        }
        var mark = true;
        $(document).ready(function ()
        {
            $("#txtAccount").change(function ()
            {
                $("#hidAccount").val($("#txtAccount").val());
            });
        }); 
        //检查账号是否违法
        function check() {
            if ($("#txtAccount").val().indexOf(">") > -1 ||
                   $("#txtAccount").val().indexOf("<") > -1 || $("#txtAccount").val().indexOf("/") > -1) {
                alert("请输入有效账号.");
                return false;
            }
            else
                return true;
        }
    </script>
</head>
<body class="Loginbody">
    <form id="form1" runat="server" autocomplete="off">

        <div class="logo" style="visibility:hidden;height:30px">
            <img src="App_Themes/Flat/login/logo.png" alt=""/>

        </div>
        <div class="content" style="width:389px">
            <div class="Loginform">
                <div class="form-message">
                    <asp:Label ID="Label1" runat="server" Text=""></asp:Label>
                </div>
                <div class="form-account">
                    账户
                <asp:TextBox ID="txtAccount" autocomplete="off" runat="server"></asp:TextBox>
                </div>
                <div class="form-password">
                    密码
                <asp:TextBox ID="txtPwd" runat="server" TextMode="Password"></asp:TextBox>
                </div>
                <div class="form-bottom">

                    <asp:Button ID="btnSubmit" runat="server" Text="" BorderWidth="0px" CssClass="btlogin" OnClientClick="return check()" OnClick="btnSubmit_Click" />
                </div>
               
            </div>
            <div id="hDivUser" style="width: 300px; background-color: #fff; height: 200px; display: none; overflow: auto; left: 668px; top: 150px; position: relative;"></div>
        </div>
        <div style="text-align: center; margin: 20px; font-family: Microsoft Yahei; color: #fff; margin: auto; width: 983px; padding-top: 30px;">
           
        </div>
        <div class="copyright">
             
        <br />
            技术支持
        </div>
        <asp:HiddenField ID="hidAccount" runat="server" />
    </form>

   <%-- <div id="hDivDialog" style="display: none; background: url(App_Themes/Flat/Login/phone.png)">
    </div>--%>
</body>
</html>
