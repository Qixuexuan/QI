function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}


//格局化日期：yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}
//获得本周的开端日期
function getWeekStartDate() {
    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; // 

    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return formatDate(weekStartDate);
}

//获得本周的停止日期
function getWeekEndDate() {
    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; // 
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    return formatDate(weekEndDate);
}


function NewDate(str) {

    var sfm = str.substr(11, 8);
    str = str.substr(0, 10);
    str = str.split('-');
    var date = new Date();
    date.setUTCFullYear(str[0], str[1] - 1, str[2]);
    if (sfm.length > 0) {
        sfm = sfm.split(':');
        date.setUTCHours(sfm[0], sfm[1], sfm[2], 0);
    }
    else {
        date.setUTCHours(0, 0, 0, 0);
    }
    return date;
}

//加上天数后的 新日期
function AddDays(date, days) {
    //var nd = NewDate(date);
    var nd = new Date(Date.parse(date.replace(/-/g, "/")));

    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    //alert(nd.getFullYear() + "年" + (nd.getMonth() + 1) + "月" + nd.getDate() + "日");
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate();
    var h = nd.getHours(); //获取系统时，
    var mi = nd.getMinutes(); //分
    var ss = nd.getSeconds(); //秒

    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    if (h <= 9) h = "0" + h;

    if (mi <= 9) mi = "0" + mi;
    if (ss <= 9) ss = "0" + ss;

    var cdate = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + ss;
    return cdate;
}

////得到根窗口对象
function getWindow() {
    var w = window;
    while (w.parent.location.href != w.location.href) { w = w.parent; }
    return w;
}

//function getDocument()
//{
//    return getWindow().document;
//}

/*判断session是否有效*/
function SessionIsOverTime(SuccessCallback) {
   
    //判断session是否有效
    CheckSession("../../Handler/SystemService.asmx/CheckSession",
        function () {
            SuccessCallback();
        });
}

/*判断*/
function CheckRole(_url, SuccessCallback) {
    AjaxGet(_url, function (rr) {
        SuccessCallback(rr.d);

    }, false);
}

function CheckSession(_url, _callback) {
   
    AjaxGet(_url, function (rr) {
   
        if (rr.d == "0") {
            $.messager.alert("提示：", "页面已经过期，请重新登录.", "info", function () {
                //如果session过期，跳转页面
                var url = "../../Default.aspx";
                getWindow().ReloadFIndex(url);
            });
        }
        else
        {
            alert("d");
            _callback();
        }

    }, false);

}

function AjaxGet(_url, _callback, _async) {
    $.ajax({
        async: _async,
        type: "post", //访问WebService使用Post方式请求 
        url: _url, //调用Url(WebService的地址和方法名称组合---WsURL/方法名) 
        data: {}, //这里是要传递的参数，为Json格式{paraName:paraValue} 
        contentType: "Application/Json", // 发送信息至服务器时内容编码类型 
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "Application/Json"); // 接受的数据类型。(貌似不起作用，因为WebService的请求/返回 类型是相同的，由于请求的是Json，所以，返回的默认是Json)
        },
        success: function (data) {
            //var jsonValue = data; 
            //alert(jsonValue.d);// 输出Json 
            _callback(data);
        },
        complete: function (XMLHttpRequest, textStatus) {
            //var returnText = XMLHttpRequest.responseText;
            //alert(returnText);
            //$("#backData").html(returnText);// 输出服务器端返回数据
        }

    });
}

function AjaxPost(_url, _data, _callback, _async) {
    $.ajax({
        type: "POST",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: _data,
        dataType: 'json',
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}
//post + auth
function AjaxPostAuthNew(_url, _data, _callback, _async, _token, _callback_error) {
    $.ajax({
        type: "POST",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: _data,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", _token);
        },
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _callback_error();
        }
    });
}
//post + auth
function AjaxPostAuth(_url, _data, _callback, _async, _token, _callback_error) {
    $.ajax({
        type: "POST",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: JSON.stringify(_data),
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", _token);
        },
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _callback_error();
        }
    });
}
//get + auth
function AjaxGetAuth(_url, _callback, _async, _token, _callback_error) {
    $.ajax({
        type: "GET",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: {},
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", _token);
        },
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _callback_error();
        }
    });
}
//put + auth
function AjaxPutAuth(_url, _data, _callback, _async, _token, _callback_error) {
    $.ajax({
        type: "PUT",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: JSON.stringify(_data),
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", _token);
        },
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _callback_error();
        }
    });
}
//put + auth
function AjaxPutAuthNew(_url, _data, _callback, _async, _token, _callback_error) {
    $.ajax({
        type: "PUT",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: _data,
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", _token);
        },
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _callback_error();
        }
    });
}

///PATCH + auth
function AjaxPATCHAuth(_url, _data, _callback, _async, _token, _callback_error) {
    $.ajax({
        type: "PATCH",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: JSON.stringify(_data),
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", _token);
        },
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _callback_error();
        }
    });
}

///DELETE + auth
function AjaxDeleteAuth(_url, _callback, _async, _token, _callback_error) {
    $.ajax({
        type: "DELETE",
        async: _async,
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(),
        data: {},
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", _token);
        },
        success: function (rr) {
            _callback(rr);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _callback_error();
        }
    });
}




/*******************表单功能 开始************************/
function InitGrid(gridObj, dataUrl, queryParamsJson, columnsObj, pageObj, pageEvent) {
    //判断session是否有效
    SessionIsOverTime(function () {
        //使用url （可以是json 文件 和 服务地址） 加载 
        gridObj.datagrid({
            url: dataUrl,
            //data: jobj,
            queryParams: queryParamsJson,
            columns: columnsObj,
            striped: true,
            rownumbers: true,
            singleSelect: true,  // singleSelect:true 不能和checkbox：true 同时用
            autoRowHeight: false,
            rowStyler: function (index, row) {
                return "height:30px";
            },
            onSortColumn: function (sort, order) {
            },
            onLoadSuccess: function (data) {
                var cnt = 0;
                if (data.rows.length > 0) {
                    cnt = data.rows[0].rows;
                }
                pageObj.pagination({
                    total: cnt,
                    onSelectPage: function (pageNumber, pageSize) {
                        $(this).pagination('loading');
                        pageEvent(pageNumber, pageSize);
                        $(this).pagination('loaded');
                    },
                    beforePageText: "当前页",
                    afterPageText: " 共 {pages}",
                    displayMsg: "{from} - {to} (共 {total} 条)"

                });
                $(".panel-body").css({ "padding": "0px" });
                $(".pagination").css({ "margin": "0px" });
            },
            onClickRow: function (rowIndex, rowData) {

            },
            toolbar: '#tb'//工具条 div 的id

        });
        var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") == -1 ? false : true;
        var docHeight = (isIE) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;

        //Grid 调整大小事件
        gridObj.datagrid('resize', {

            width: document.body.clientWidth,
            height: (docHeight - 120)

        });

        //窗口尺寸变化事件
        $(window).resize(function () {
            var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") == -1 ? false : true;
            var docHeight = (isIE) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;

            gridObj.datagrid('resize', {
                width: document.body.clientWidth,
                height: (docHeight - 120)
            });
        });
    });
}

//重新加载数据 可用作 条件 查询
function GridReload(gridObj, pageNumber, pageSize, queryData) {
    var pn = pageNumber;
    var ps = pageSize;
    if (pn == undefined || pn == "") {
        pn = 1;
    }
    if (ps == undefined || ps == "") {
        ps = 10;
    }
    if (queryData != undefined && queryData != "") {
        gridObj.datagrid('load', queryData)//重新load数据
    }
}

//异步刷新必须 由 jquery.plugins.js 调用
function refresh_datatable() {
    if (reload) {
        reload();//重新加载grid 
    }
}

//必须重载的框架方法 
//重写refreshPage (tab 页面必须) ,保持页码不变
function refreshPage() {
    if (reload) {
        reload();//重新加载grid 
    }
}

/***** *动态生成详情内容  *****/
function GetHtml(jsonObj, compareKey) {
    var html = '';
    var cnt = 0; //判断是否创建行的变量
    for (var key in jsonObj[0]) {
        if (cnt == 0) {
            html += '<tr>';//重新创建行
        }
        if (cnt == 0 && compareKey.indexOf(key) > -1) {
            //第一个td 
            html += '<td class="table-edit-title" style="width: 70px;">' + key + ':</td>';
            html += '<td class="table-edit-content" style="width: 150px;" colspan="3">';
            html += '<div id="title">' + jsonObj[0][key] + '</div>';
            html += '</td></tr>';
            cnt = 0;  //重置变量
        }
        else if (cnt == 1 && compareKey.indexOf(key) > -1) {
            html += '<td class="table-edit-title" style="width: 70px;"></td><td class="table-edit-content" style="width: 150px;" ></td></tr><tr>';
            html += '<td class="table-edit-title" style="width: 70px;">' + key + ':</td>';
            html += '<td class="table-edit-content" style="width: 150px;" colspan="3">';
            html += '<div id="title">' + jsonObj[0][key] + '</div>';
            html += '</td></tr>';
            cnt = 0;  //重置变量
        }
        else {
            html += '<td class="table-edit-title" style="width: 70px;">' + key + ':</td>';
            html += '<td class="table-edit-content" style="width: 150px;">';
            html += '<div id="title">' + jsonObj[0][key] + '</div>';
            html += '</td>';

            if (cnt == 1) {
                html += '</tr> ';//一行结束
                cnt = 0; //重置变量
            }
            else {
                cnt++;
            }
        }
    }
    return html;
}

//获取表单输入
function initStrJson($obj) {
    var strJson = "";
    $obj.find("*[name]").not("div[type='checkbox'],radio,textarea[name='editorValue']").each(function () {
        strJson = strJson + ',"' + $(this).attr("name") + '":"' + $(this).val() + '"';
    });

    $obj.find("radio:checked").each(function () {
        strJson = strJson + ',"' + $(this).attr("name") + '":"' + $(this).val() + '"';
    });
    $obj.find("div[type = 'checkbox']").each(function () {
        var checkname = '';
        var checkval = '';
        $(this).find(":checkbox:checked").each(function () {
            checkname = $(this).attr("name");
            checkval += ';' + $(this).val();
        });
        if (checkname !== "") {
            strJson = strJson + ',"' + checkname + '":"' + checkval.substring(1) + '"';
        }
    });

    var str = strJson.substring(1);
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/\r/g, "&lt;");
    str = str.replace(/\n/g, "&lt;");

    return "{" + str + "}";
}

//绑定下拉框
function BindSlt(sltObj, url, bizType, fieldKey, fieldValue, callBack) {
    if (sltObj == null || sltObj == undefined)
    { return false; }
    sltObj.empty();
    sltObj.append("<option value=''>请选择...</option>");
    $.post(url, { "bizType": bizType },
            function (rr) {
                var json = eval(rr);

                $(json).each(function (idx) {
                    sltObj.append("<option value='" + json[idx][fieldValue] + "'>" + json[idx][fieldKey] + "</option>");
                });

                if (callBack != null && callBack != undefined && callBack != "") {
                    //回调
                    callBack();
                }
            }, "json");
}

//绑定表单控件数据
function BindForm(data) {
    if (data == "" || data == "-1") {
        //$.messager.alert("提示：", "提交失败.", "info");
    }
    else {
        var jsonObj = eval(data);
        /** 遍历加载数据 开始*/
        for (var key in jsonObj[0]) {
            if ($("#" + key).length > 0) {
                if ($("#" + key).is("div")) {
                    $("#" + key).text(jsonObj[0][key]);
                }
                else {
                    $("#" + key).val(jsonObj[0][key]);
                }
            }
        }
        /** 遍历加载数据 结束*/
    }
}

function BindSltAuth(sltObj, url, callBack) {
    if (sltObj == null || sltObj == undefined)
    { return false; }
    sltObj.empty();
    sltObj.append("<option value=''>请选择...</option>");

    var _token = getToken();

    AjaxGetAuth(url, function (rr) {
        var json = eval(rr);
        json = json.Data;
        $(json).each(function (idx) {
            sltObj.append("<option value='" + json[idx].Value + "'>" + json[idx].Name + "</option>");
        });

        if (callBack != null && callBack != undefined && callBack != "") {
            //回调
            callBack();
        }

    }, true, _token, function () { });
}


/********************表单功能  结束********************/

function GetTicket(callback) {
    AjaxGet(getRootPath() + "/Handler/SystemService.asmx/GetTicket", function (rr) {
        if (rr.d == "") {
            //$.messager.alert("提示：", "页面已经过期，请重新登录.", "info", function ()
            //{
            //    //如果session过期，跳转页面
            //alert("d");
            var url = "../../Default.aspx";
            getWindow().ReloadFIndex(url);
            //});
        }
        callback(rr.d);
    }, false);
}

function getRootPath() {
    //获取当前网址，
    var curPath = window.document.location.href;
    //获取主机地址之后的目录，如： test/test.jsp
    var pathName = window.document.location.pathname;
    var pos = curPath.indexOf(pathName);
    //获取主机地址，
    var localhostPaht = curPath.substring(0, pos);
    //获取带"/"的项目名，如：/test
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

    return (localhostPaht + projectName);
}

function getToken() {
    //console.log(ticket);
    if (ticket == undefined) {
        if (ticket == "" || ticket == null) {
            return "";
        }
        else
            return ticket;
    }
    else
        return ticket;
}

/****cookies********************/
//
//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    document.cookie = name + "=" + escape(value);
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

jQuery.fn.extend({
    ///这个函数是全部选择所有的元素
    ShowAttach: function (json, callback) {
        var htmlAttach = "";
        $(json).each(function (idx) {
            var jsonAttach = json;
            var FileURL = config_service_url + jsonAttach[idx].FileURL;
            var ThumbURL = config_service_url + jsonAttach[idx].ThumbURL;

            if (jsonAttach[idx].FileType == "1") {
                htmlAttach += "<div style='float:left' class='detail-attach'  lang='" + FileURL + "' ><img src='" + ThumbURL + "' style='width:100px;height:100px;' /></div>";
            }
            else {
                htmlAttach += "<div style='float:left'  lang='" + FileURL + "' ><a href='" + FileURL + "'><img src='" + ThumbURL + "' style='width:100px;height:100px;' /></a></div>";

            }
        });

        htmlAttach += "<div style='clear:both'></div>";
        this.html(htmlAttach);

        callback();
    },
    ShowAttachGrid: function (json, callback) {
        var htmlAttach = "";
        $(json).each(function (idx) {
            var jsonAttach = json;
            var FileURL = config_service_url + jsonAttach[idx].FileURL;
            var ThumbURL = config_service_url + jsonAttach[idx].ThumbURL;
            var FileName = jsonAttach[idx].FileName;
            //if (jsonAttach[idx].FileType == "1") {
            //    htmlAttach += "<div  style='float:left;width:160px;text-align:center;' ><div class='detail-attach'  lang='" + FileURL + "' ><img src='" + ThumbURL + "' style='width:100px;height:100px;' /></div><div style='text-align:center;width:150px;'>" + FileName + "</div></div>";
            //}
            //else {
            htmlAttach += "<div  style='float:left;width:160px;text-align:center;' > <div lang='" + FileURL + "' ><a href='" + FileURL + "' target='_blank'><img src='" + ThumbURL + "' style='width:100px;height:100px;' /></a></div><div style='text-align:center;width:150px;'>" + FileName + "</div></div>";

            //}
        });

        htmlAttach += "<div style='clear:both'></div>";
        this.html(htmlAttach);

        callback();
    }
});

function ShowImg(imgUrl) {
    window.parent.showModalWindow('图片', 650, 450, "../Web/Attach/PhotoContainer.html?s=" + Math.random() + "&height=450&url=" + escape(imgUrl));
}