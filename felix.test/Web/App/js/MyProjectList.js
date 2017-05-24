let _pageIndex = 1;
let _pageSize = 10;
let ticket;
$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
    });

    //列表字段模板
    var columnsObj = [[
        { field: 'ProjectNo', title: '项目编号', width: 100, sortable: false },
        { field: 'ProjectName', title: '项目名称', width: 100, sortable: false },
        { field: 'CustomName', title: '客户名称', width: 100, sortable: false },
        { field: 'KAM', title: 'KAM', width: 100, sortable: false },
        { field: 'PM', title: 'PM', width: 100, sortable: false },
        { field: 'PStatus', title: '状态', width: 100, sortable: false },
        { field: 'StartTime', title: '开始时间', width: 100, sortable: false },
        { field: 'CurrentStage', title: '阶段', width: 100, sortable: false },
        { field: 'Schedule', title: '进度', width: 100, sortable: false },
    ]];

    InitDataGridTest(config_service_url + "Project", columnsObj, null, function () { });
});


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

            var PGuid = rowData.PEGUID;
            window.parent.parent.createTab("tab_info_1", "项目详情", "../Web/ProjectApply/ProjectDetail.html?s=" + Math.random() + "&PGuid=" + PGuid);
        }
    });

}

// APQP小组
function APQPGroup() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {
            var PEGuid = rowData.PEGUID;
            window.parent.parent.createTab("tab_info_1", "APQP小组", "../Web/ProjectManagent/APQPGroup.aspx?s=" + Math.random() + "&PEGuid=" + PEGuid);
        }
    });
}

//  刷新内容
function reload() {
    window.location.reload();
}