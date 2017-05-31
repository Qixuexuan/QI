﻿let _pageIndex = 1;
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
            field: 'PStatus', title: '状态', width: 100, sortable: false,
            styler: function (value, row, index) {

            },
            formatter: function (value, row, index) {

                if (value == "已激活") {
                    return '<div><img src="../App/icon/icon_active.png" style="height:18px;width:18px;margin-left:30px"/></div>';
                }
                else if (value == "未激活") {
                    
                    return '<div><img src="../App/icon/icon_unactive.png" style="height:18px;width:18px;margin-left:30px"/></div>';
                }

            }
        },

        { field: 'StartTime', title: '开始时间', width: 100, sortable: false },
        { field: 'CurrentStage', title: '阶段', width: 100, sortable: false },
        { field: 'Schedule', title: '进度', width: 100, sortable: false },
        { field: 'IsCanEdit', title: '是否可以编辑', width: 100, sortable: false }
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
            window.parent.parent.createTab("tab_info_0", "项目详情", "../Web/ProjectApply/ProjectDetail.html?s=" + Math.random() + "&PGuid=" + PGuid);
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
            let PGuid = rowData.PGUID;
            let IsCanEditn = rowData.IsCanEdit;
            window.parent.parent.createTab("tab_info_apqp", "APQP小组", "../Web/ProjectManagent/APQPGroup.aspx?s=" + Math.random() + "&PGuid=" + PGuid + "&IsCanEditn=" + IsCanEditn);
        }
    });
}

// APQP小组任务列表
function APQPTaskList() {
    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {
            let PGuid = rowData.PGUID;
            let IsCanEditn = rowData.IsCanEdit;
            window.parent.parent.createTab("tab_info_2", "APQP任务列表", "../Web/ProjectManagent/APQPTaskList.aspx?s=" + Math.random() + "&PGuid=" + PGuid + "&IsCanEditn=" + IsCanEditn);
        }
    });
}


//  激活项目
function ActivatePrj() {

    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {

            $.messager.confirm('提示', '确认激活该项目吗?', function (result) {
                if (result) {
                    var PGuid = rowData.PGUID;
                    ChangePrjStatus(PGuid, 1);
                }
            });
            
        }
    });

}

//  作废项目
function CancelPrj() {

    SessionIsOverTime(function () {
        var rowData = $("#gd_url").datagrid("getSelected");
        if (rowData == undefined || rowData == null) {
            $.messager.alert("提示：", "您没有选中任何记录，请选中后再操作.", "info");
        }

        else {
            $.messager.confirm('提示', '确认作废该项目吗?', function (result) {
                if (result) {
                    var PGuid = rowData.PGUID;
                    ChangePrjStatus(PGuid, -1);
                }
            });
           
        }
    });

}

//  更新项目状态
function ChangePrjStatus(pguid, val) {
    let jsonObj = null;
    AjaxPostAuthNew(config_service_url + "Project/update/" + pguid + "/" + val, jsonObj, function (result) {
        $.messager.alert("提示：", result.Message, "info");
        reload();
    },
 true,
 ticket,
  function (XMLHttpRequest, textStatus, errorThrown) {
      $.messager.alert("提示：", result.Message, "info");
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