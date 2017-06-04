var _pageIndex = 1;
var _pageSize = 10;
var ticket;
$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
    });

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
        { field: 'ApplyPerson', title: '申请人', width: 100, sortable: false }

    ]];

    InitDataGridTest(config_service_url + "PrjEstablish/0", columnsObj, null, function () { });
});


//分页事件
function PageEvent(pageNumber, pageSize) {
    _pageIndex = pageNumber;
    _pageSize = pageSize;
    $('#gd_url').datagrid('load', { PageNumber: pageNumber, PageSize: pageSize, KeyWord: "" });

}

//  新增项目申请
function addNewPrjApply() {
    //showModalWindow('项目详情', 550, 220, "../Web/ProjectApply/ProjectApply.aspx?s=" + Math.random());
    window.parent.parent.createTab("tab_info_addapply", "添加项目申请", "../Web/ProjectApply/ProjectApply.aspx?s=" + Math.random());
}

//  编辑项目申请内容
function editPrjApply() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }
        else {
            var PGuid = rowData.PGUID;
            window.parent.parent.createTab("tab_info_editapply", "项目编辑", "../Web/ProjectApply/ProjectApplyEdit.aspx?s=" + Math.random() + "&PGuid=" + PGuid);

        }
    });
}

//  提交项目申请
function submitPrjApply() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }
        else {
            $.messager.confirm('提示', '确认提交吗?', function (result) {
                if (result) {

                    let PGuid = rowData.PGUID;
                    let jsonObj = { "PGUID ": PGuid };
                    let jsonStr = JSON.stringify(jsonObj);

                    AjaxPostAuthNew(config_service_url + "PrjEstablish/ApplySubmit/" + PGuid, jsonStr, function (result) {
                        $.messager.alert("提示：", result.Message, "info");
                        reload();
                    },
                    true,
                    ticket,
                     function () {
                         $.messager.alert("提示：", "提交失败.", "info");
                     })

                }
            });
        }
    });
}

//  删除新增项目
function deletePrjApply() {

    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }
        else {
            $.messager.confirm('提示', '确认删除吗?', function (result) {
                if (result) {

                    let PGuid = rowData.PGUID;
                    let jsonObj = { "PGUID ": PGuid };
                    let jsonStr = JSON.stringify(jsonObj);

                    AjaxPostAuthNew(config_service_url + "PrjEstablish/delete/" + PGuid, jsonStr, function (result) {
                        $.messager.alert("提示：", result.Message, "info");
                        reload();
                    },
                    true,
                    ticket,
                     function () {
                         $.messager.alert("提示：", "提交失败.", "info");
                     })

                }
            });

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
        KeyWord: $("#txtQueryCondition").val(),
        userCode: '',
        PageNumber: _pageIndex,
        PageSize: _pageSize
    };
}

//  搜索
function Search() {
    reload();
}