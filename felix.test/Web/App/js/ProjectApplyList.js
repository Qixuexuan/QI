var _pageIndex = 1;
var _pageSize = 10;
var ticket;
$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
    });
    //post 访问 示例
    var json = { "wfSchemeCode": "sbjcz", "userId": "1" };
    //AjaxPost("http://192.168.84.41/sbjcz_wfeservice/CreateWFInstance",
    //    JSON.stringify(json),
    //    function (data) {
    //        console.log(data);
    //    }, true);

    //AjaxGetAuth("http://pdm.sinno-tech.com:8889/PrjEstablish?PageNumber=1&PageSize=212&keyWord=K",
    //    function () {

    //    }, true, "1", function () { })


    //列表访问示例
    var columnsObj = [[
        { field: 'ProjectNo', title: '项目编号', width: 100, sortable: false },
        { field: 'ProjectName', title: '项目名称', width: 100, sortable: false },
        { field: 'CustomCategory', title: '客户类型', width: 100, sortable: false },
        { field: 'CustomName', title: '客户名称', width: 100, sortable: false },
        { field: 'CustomSituation', title: '客户规模', width: 100, sortable: false },
        { field: 'FotTime', title: 'FOT时间', width: 100, sortable: false },
        { field: 'PPAPTime', title: 'PPAP时间', width: 100, sortable: false },
        { field: 'ResourceNeed', title: '所需资源', width: 100, sortable: false },
        { field: 'ProjectCycle', title: '项目周期', width: 100, sortable: false },
        { field: 'RateOfProfit', title: '利润率', width: 100, sortable: false },
        { field: 'ProjectDesc', title: '项目描述', width: 100, sortable: false },
        { field: 'ApplyTime', title: '申请时间', width: 100, sortable: false },
        { field: 'ApplyPerson', title: '申请人', width: 100, sortable: false },
     {
         field: 'CanApprove', title: '是否可审核', width: 120, sortable: false,
         styler: function (value, row, index) {

         },
         formatter: function (value, row, index) {

             if (value == "1") {
                 //return '<div onclick="Edit(\'' + row.UserName + '\')" style="background-color:green;margin-top:5px;margin-left:5px;width:60px;height:60px;">审核</div>';
                 return '是'
             }
             else if (value == "0") {
                 return '否';

             }

         }
     }
    ]];

    InitDataGridTest(config_service_url + "PrjEstablish/1", columnsObj, null, function () { });
});
//点击事件
function callback_click(data) {
    if (data.IsPermit == "1") {
        $("#Approve").show();
    }
    else {
        $("#Approve").hide();

    }
}


//  审核
function Approve() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");

        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");

            if (rowData.CanApprove != "1") {
                $.messager.alert("提示：", "抱歉，您无改项目的审核权限.", "info");
            }
        }

        else {
            console.log(rowData);
            var CurrentNode = rowData.CURRENTNODE;
            var PGuid = rowData.PGUID;
            var width = 550;
            var height = 230;
            var pageUrl = "";
            var modelTitle = "";

            //CurrentNode = "PrjDeptEvaluate";

            switch (CurrentNode) {
                case "Apply":
                    modelTitle = "立项申请";
                    pageUrl = "../Web/ProjectApply/Evaluate/Apply.html";
                    break;
                case "SelfEvaluate":
                    modelTitle = "项目自评";
                    pageUrl = "../Web/ProjectApply/Evaluate/SelfEvaluate.html";
                    break;
                case "PrjDeptEvaluate":
                    modelTitle = "项目部评估";
                    pageUrl = "../Web/ProjectApply/Evaluate/PrjDeptEvaluate.html";
                    height = 300;
                    break;
                case "TechDeptEvaluate":
                    modelTitle = "技术部评估";
                    pageUrl = "../Web/ProjectApply/Evaluate/TechDeptEvaluate.html";
                    break;
                case "ManufactDeptEvaluate":
                    modelTitle = "制造难度评估";
                    pageUrl = "../Web/ProjectApply/Evaluate/MDeptEvaluate.html";
                    height = 300;
                    break;
                default:
                    modelTitle = "";
                    pageUrl = "";
                    break;
            }
            if (pageUrl != "")
                showModalWindow(modelTitle, width, height, pageUrl + "?s=" + Math.random() + "&CurrentNode=" + CurrentNode + "&PGuid=" + PGuid);
        }
    });

}

//分页事件
function PageEvent(pageNumber, pageSize) {
    _pageIndex = pageNumber;
    _pageSize = pageSize;
    $('#gd_url').datagrid('load', { PageNumber: pageNumber, PageSize: pageSize, keyWord: "ddd" });

}

//  项目详情
function PrjDetail() {

    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {

            var PGuid = rowData.PGUID;
            window.parent.parent.createTab("tab_info_1", "项目详情", "../Web/ProjectApply/ProjectDetail.html?s=" + Math.random() + "&PGuid=" + PGuid);
        }
    });

}

//  刷新内容
function reload() {
    window.location.reload();
}