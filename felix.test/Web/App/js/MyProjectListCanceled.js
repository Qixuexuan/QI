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
        {
            field: 'Pstatus', title: '状态', width: 100, sortable: false,
            styler: function (value, row, index) {

            },
            formatter: function (value, row, index) {

                if (value == "1") {
                    return '<div><img src="../App/icon/icon_active.png" style="height:18px;width:18px;margin-left:30px"/></div>';
                }
                else if (value == "0") {

                    return '<div><img src="../App/icon/icon_unactive.png" style="height:18px;width:18px;margin-left:30px"/></div>';
                }
                else if (value == "-1") {
                    return '<div><img src="../App/icon/icon_canceled.png" style="height:18px;width:18px;margin-left:30px"/></div>';
                }
                else {
                    return '<div><img src="../App/icon/icon_warn.png" style="height:18px;width:18px;margin-left:30px"/></div>';
                }
            }
        },
        { field: 'PStatusDesc', title: '状态描述', width: 100, sortable: false },
        { field: 'StartTime', title: '开始时间', width: 100, sortable: false },
        { field: 'CurrentStage', title: '阶段', width: 100, sortable: false },
        { field: 'Schedule', title: '进度', width: 100, sortable: false }
    ]];

    InitDataGridTest(config_service_url + "Project/-1", columnsObj, null, function () { });
});


//分页事件
function PageEvent(pageNumber, pageSize) {
    _pageIndex = pageNumber;
    _pageSize = pageSize;
    $('#gd_url').datagrid('load', { PageNumber: pageNumber, PageSize: pageSize, KeyWord: "" });

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
            window.parent.parent.createTab("tab_info_prj" + PGuid, "项目详情", "../Web/ProjectApply/ProjectDetail.html?s=" + Math.random() + "&PGuid=" + PGuid);
        }
    });

}

//  恢复项目
function RecoveryPrj() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {

            $.messager.confirm('提示', '确认恢复该项目吗?', function (result) {
                if (result) {
                    var PGuid = rowData.PGUID;
                    ChangePrjStatus(PGuid, 0);
                }
            });

        }
    });
}

//  更新项目状态
function ChangePrjStatus(pguid, status) {
    let jsonObj = null;
    AjaxPostAuthNew(config_service_url + "Project/update/" + pguid + "/" + status, jsonObj, function (result) {
        $.messager.alert("提示：", "项目恢复成功", "info");
        reload();
    },
 true,
 ticket,
  function (XMLHttpRequest, textStatus, errorThrown) {
      $.messager.alert("提示：", "项目恢复失败.", "info");
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

//  搜索
function Search() {
    reload();
}