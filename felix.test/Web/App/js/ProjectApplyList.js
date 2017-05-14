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
         field: 'CanApprove', title: '审核权限', width: 120, sortable: false,
         styler: function (value, row, index) {

         },
         formatter: function (value, row, index) {

             if (value == "1") {
                 return '<div onclick="Edit(\'' + row.UserName + '\')" style="background-color:green;margin-top:5px;margin-left:5px;width:60px;height:60px;">审核</div>';
             }
             else if (value == "0") {
                 return '-';

             }

         }
     }
    ]];

    InitDataGridTest(config_service_url + "PrjEstablish", columnsObj, null, function () { });
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


//详情
function Detail() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }
        else {
            showModalWindow('详情', 720, 350, "../Web/DangerousCargo/DCListView.html?s=" + Math.random() + "&id=" + rowData.ID);
            //$.messager.alert("提示：", "功能开发中.", "info");
        }
    });
}

function Approve() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }
        else {
            showModalWindow('项目评估', 550, 220, "../Web/ProjectApply/Evaluate/SelfEvaluate.html?s=" + Math.random());
        }
    });

}

function Edit(p) {
    alert(p);

}
//分页事件
function PageEvent(pageNumber, pageSize) {
    _pageIndex = pageNumber;
    _pageSize = pageSize;
    $('#gd_url').datagrid('load', { PageNumber: pageNumber, PageSize: pageSize, keyWord: "ddd" });

}

function PrjDetail() {
    window.parent.parent.createTab("tab_info_1", "项目详情", "../Web/ProjectApply/ProjectDetail.aspx?s=" + Math.random());
}

function addPrjApply() {
    //showModalWindow('项目详情', 550, 220, "../Web/ProjectApply/ProjectApply.aspx?s=" + Math.random());
    window.parent.parent.createTab("tab_info_1", "项目申请", "../Web/ProjectApply/ProjectApply.aspx?s=" + Math.random());
}