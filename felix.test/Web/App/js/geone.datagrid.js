/****
* TODO: 需要扩展 对象
* 引用 该js包的页面 需要创建全局变量
* var _pageIndex = 1;
* var _pageSize = 10;
* SessionIsOverTime 需要引用tools.js
**/

function InitDataGrid(_url, columnsObj, callback) {
    //使用url （可以是json 文件 和 服务地址） 加载
    $("#gd_url").datagrid({
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        loadFilter: function (data) {
            var value = {
                total: 0,
                rows: []
            };
            if (data && data.Data.length>0) {
                value.total = data.Data.Total;
                $(data.Data.DataTable).each(function (idx) {
                    data.Data.DataTable[idx].rows = data.Data.Rows;
                    data.Data.DataTable[idx].total = data.Data.Total;
                    value.rows.push(data.Data.DataTable[idx]);
                });
                return value;
            } else {
                return value;
            }
        },
        method: "get",
        columns: columnsObj,
        striped: true,
        rownumbers: true,
        singleSelect: true,  // singleSelect:true 不能和checkbox：true 同时用
        autoRowHeight: false,
        rowStyler: function (index, row) {
            //console.log(row.Marked);
            if (row.Marked != undefined) {
                if (!row.Marked)
                { return "height:30px;color:red;font-weight:bold"; }
                else
                {
                    return "height:30px";
                }
            }
            else {
                return "height:30px";
            }
        },
        onSortColumn: function (sort, order) {
        },
        onLoadSuccess: function (data) {
            var cnt = 0;
            if (data.rows.length > 0) {
                cnt = data.rows[0].rows;
            }

            $('#pp').pagination({
                total: cnt,
                onSelectPage: function (pageNumber, pageSize) {
                    $(this).pagination('loading');
                    _pageIndex = pageNumber;
                    _pageSize = pageSize;
                    PageEvent(pageNumber, pageSize);
                    $(this).pagination('loaded');
                },
                beforePageText: "当前页",
                afterPageText: " 共 {pages}",
                displayMsg: "{from} - {to} (共 {total} 条)"

            });
            if (callback) callback();
        },
        onClickRow: function (rowIndex, rowData) {

        },
        toolbar: '#tb'
    });

    //Grid 调整大小事件
    $('#gd_url').datagrid('resize', {

        width: document.body.clientWidth,
        height: (document.body.clientHeight - 130)
    });

    //窗口尺寸变化事件
    $(window).resize(function () {
        $('#gd_url').datagrid('resize', {
            width: document.body.clientWidth,
            height: (document.body.clientHeight - 130)
        });
    });
}


function InitDataGridTest(_url, columnsObj, callback,callback_click) {
    //使用url （可以是json 文件 和 服务地址） 加载
    $("#gd_url").datagrid({
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        loadFilter: function (data) {
            var value = {
                total: 0,
                rows: []
            };
            if (data && data.Data.length > 0) {
                value.total = data.Data[0].Total;
                $(data.Data).each(function (idx) {
                    data.Data[idx].rows = data.Data[0].Rows;
                    data.Data[idx].total = data.Data[0].Total;
                    value.rows.push(data.Data[idx]);
                });
                return value;
            } else {
                return value;
            }
        },
        method: "get",
        columns: columnsObj,
        striped: true,
        rownumbers: true,
        singleSelect: true,  // singleSelect:true 不能和checkbox：true 同时用
        autoRowHeight: false,
        rowStyler: function (index, row) {
            //console.log(row.Marked);
            if (row.Marked != undefined) {
                if (!row.Marked)
                { return "height:30px;color:red;font-weight:bold"; }
                else
                {
                    return "height:30px";
                }
            }
            else {
                return "height:30px";
            }
        },
        onSortColumn: function (sort, order) {
        },
        onLoadSuccess: function (data) {
            var cnt = 0;
            if (data.rows.length > 0) {
                cnt = data.rows[0].rows;
            }

            $('#pp').pagination({
                total: cnt,
                onSelectPage: function (pageNumber, pageSize) {
                    $(this).pagination('loading');
                    _pageIndex = pageNumber;
                    _pageSize = pageSize;
                    PageEvent(pageNumber, pageSize);
                    $(this).pagination('loaded');
                },
                beforePageText: "当前页",
                afterPageText: " 共 {pages}",
                displayMsg: "{from} - {to} (共 {total} 条)"

            });
            if (callback) callback();
        },
        onClickRow: function (rowIndex, rowData) {
            callback_click(rowData);
        },
        toolbar: '#tb'
    });
    var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") == -1 ? false : true;
    var docHeight = (isIE) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
     
    //Grid 调整大小事件
    $('#gd_url').datagrid('resize', {

        width: document.body.clientWidth,
        height: (docHeight - 120)

    });

    //窗口尺寸变化事件
    $(window).resize(function () {
        var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") == -1 ? false : true;
        var docHeight = (isIE) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;

        $('#gd_url').datagrid('resize', {
            width: document.body.clientWidth,
            height: (docHeight - 120)
        });
    });
}
