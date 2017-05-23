<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MemberSelect.aspx.cs" Inherits="test.Web.ProjectManagent.AQPQGroup" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>选择APQP小组成员</title>

    <link href="../../Content/easyUI/themes/icon.css" rel="stylesheet" />
    <link href="../../Content/easyUI/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../../Js/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="../../Scripts/easyUI/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../Scripts/tools.js"></script>
    <script type="text/javascript" src="../../Scripts/config.js"></script>

    <script type="text/javascript">
        let ticket;
        let treeDataUrl = config_service_url;
        $(document).ready(function () {
            GetTicket(function (t) {
                ticket = t;
            });
        });

        //  获取选中的节点
		function getChecked(){
		    let nodes = $('#APQTree').tree('getChecked');
		    let s = '';
		    for (let i = 0; i < nodes.length; i++) {
				if (s != '') s += ',';
				s += nodes[i].id;
			}
			alert(s);
		}
	</script>
</head>
<body>
    <div class="easyui-panel" style="padding:5px">
		<ul id="APQTree" class="easyui-tree" data-options="url:'tree_data1.json',method:'get',animate:true,checkbox:true"></ul>
	</div>
</body>
</html>
