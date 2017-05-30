let _pageIndex = 1;
let _pageSize = 10;
let ticket;
$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
    });

    //列表字段模板
    var columnsObj = [[
        { field: 'TaskName', title: '任务名称', width: 100, sortable: false },
        { field: 'TaskDesc', title: '任务描述', width: 100, sortable: false },
        { field: 'Owner', title: '责任人', width: 100, sortable: false },
        { field: 'OwnerDesc', title: '客户经理', width: 100, sortable: false },
        { field: 'PhaseDesc', title: '阶段', width: 100, sortable: false },
        { field: 'PlanTime', title: '计划结束时间', width: 100, sortable: false },
        { field: 'ActualTime', title: '实际完成时间', width: 100, sortable: false },
        { field: 'CURRENTNODEDESC', title: '当前状态', width: 100, sortable: false },
        { field: 'Remark', title: '备注', width: 200, sortable: false }
    ]];

    InitDataGridTest(config_service_url + "TaskList/TaskAppoveList", columnsObj, null, function () { });
});


//分页事件
function PageEvent(pageNumber, pageSize) {
    _pageIndex = pageNumber;
    _pageSize = pageSize;
    $('#gd_url').datagrid('load', { PageNumber: pageNumber, PageSize: pageSize, keyWord: "ddd" });

}

//  提交审批
function SubmitApprove() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {
           
            // TODO:弹出提交审批窗口  服务5   当前测试代码
            var TGuid = rowData.TGUID;
            var FInstanceId = rowData.FINSTANCEID;

            showModalWindow("任务审批", 550, 230, "../Web/ProjectManagent/TaskApprove.html?s=" + Math.random() + "&TGuid=" + TGuid + "&FInstanceId=" + FInstanceId);

        }
    });
}


//  获取流程处理日志
function GetPrecessLog() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {

            var TGuid = rowData.TGUID;
            //  流程处理日志
            window.parent.parent.createTab("tab_info_prolog", "任务流程日志", "../Web/ProjectManagent/TaskProcessLog.html?s=" + Math.random() + "&TGuid=" + TGuid);
        }
    });
}




//重新加载，必须
function reload() {
    $('#gd_url').datagrid('load', GetQueryData());
}
//获取查询条件, 必须
function GetQueryData() {
    return {
        queryCondition: $("#txtQueryCondition").val(),
        userCode: '',
        PageNumber: _pageIndex,
        PageSize: _pageSize
    };
}