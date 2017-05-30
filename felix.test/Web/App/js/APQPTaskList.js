let _pageIndex = 1;
let _pageSize = 10;
let ticket;
let pguid;
$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
    });
    pguid = getQueryString("PGuid");

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

    InitDataGridTest(config_service_url + "TaskList/" + pguid, columnsObj, null, function () { });
});


//分页事件
function PageEvent(pageNumber, pageSize) {
    _pageIndex = pageNumber;
    _pageSize = pageSize;
    $('#gd_url').datagrid('load', { PageNumber: pageNumber, PageSize: pageSize, keyWord: "ddd" });

}

// 提交任务，开始任务审批
function Submit() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {
            $.messager.confirm('提示', '确认提交吗?', function (result) {
                if (result) {
                    let TGuid = rowData.TGUID;
                    DoSubmit(TGuid);
                }
            });
        }
    });
}

// 实施提交
function DoSubmit(TGuid) {

    let obj = { TGUID: TGuid };
    let jsonObj = null; 
    AjaxPostAuthNew(config_service_url + "TaskList/ApplySubmit/" + TGuid, jsonObj, function (result) {
        $.messager.confirm('提示', result.Message, function (result) {
            reload();
        });
    },
 true,
 ticket,
  function (XMLHttpRequest, textStatus, errorThrown) {
      $.messager.alert("提示：", result.Message, "info");
  })
}

//  修改计划时间
function ChangePlanDate() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {

            var TGuid = rowData.TGUID;
            var FInstanceId = rowData.FINSTANCEID;

            showModalWindow("修改计划完成时间", 550, 230, "../Web/ProjectManagent/ChangePlanTime.html?s=" + Math.random() + "&TGuid=" + TGuid + "&FInstanceId=" + FInstanceId);
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