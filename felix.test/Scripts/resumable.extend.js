
/********************附件功能  开始********************/
/*
*创建上传对象
*url:文件上传服务地址
*fileQueueList：选择的文件列表容器
*btnName:选择文件按钮id
*chunkSize:文件大小 字节 默认5 * 1024 * 1024=5M
*/
function InitResumableObje(url, fileQueueList, btnName, callBack, chunkSize) {
    if (chunkSize == "" || chunkSize == undefined) {
        chunkSize = 5 * 1024 * 1024;
    }
    var r = new Resumable({
        //target: '../../Handler/UploadHandler.ashx?type=ComTrainingCommon&userId=' + getQueryString("userId"),
        target: url,
        //query: { mainid: getQueryString("userId") },
        //chunkSize: 2 * 1024 * 1024,
        chunkSize: chunkSize,
        simultaneousUploads: 10,
        testChunks: false,
        throttleProgressCallbacks: 1,
        fileParameterName: 'Filedata'   //后台服务获取文件流的名称 Request.Files["Filedata"]
    });
    r.assignBrowse(document.getElementById(btnName));
    r.on('fileAdded', function (file, event) {
        if (fileQueueList != null && fileQueueList != undefined) {
            var html = "<div id='" + file.uniqueIdentifier + "'><div  class='icon-delete' style='width:16px;height:16px;cursor:pointer;float:left'></div><div style='float:left'>" + file.fileName + "</div><div style='clear:both;'></div></div>";
            fileQueueList.append(html);
            $(".icon-delete").click(function () {
                var obj = $(this).parent();
                for (var i = 0, l = r.files.length; i < l; i++) {
                    if (obj.attr("id") == r.files[i]["uniqueIdentifier"]) {
                        r.files[i].cancel();
                        obj.remove();
                        break;
                    }
                }
            });

            //var html = "<div id='" + file.uniqueIdentifier + "'>" + file.fileName + "</div>";
            //fileQueueList.append(html);
            //$("#" + file.uniqueIdentifier).click(function ()
            //{
            //    var obj = $(this);
            //    for (var i = 0, l = r.files.length; i < l; i++)
            //    {
            //        if (obj.attr("id") == r.files[i]["uniqueIdentifier"])
            //        {
            //            r.files[i].cancel();
            //            obj.remove();
            //            break;
            //        }
            //    }
            //});
        }
    });
    //r.on('uploadStart', function ()
    //{
    //    r.defaults.query = { mainid: mainid };
    //});
    r.on('complete', function () {
        if (fileQueueList != null && fileQueueList != undefined) {
            fileQueueList.html("");
        }
        callBack();
    });
    return r;
}

//url 使用 defauts.target.url
function InitResumableObjeNew(url, fileQueueList, btnName, callBack, chunkSize) {
    if (chunkSize == "" || chunkSize == undefined) {
        chunkSize = 5 * 1024 * 1024;
    }
    var r = new Resumable({
        chunkSize: chunkSize,
        simultaneousUploads: 10,
        testChunks: false,
        throttleProgressCallbacks: 1,
        fileParameterName: 'Filedata'   //后台服务获取文件流的名称 Request.Files["Filedata"]
    });
    r.assignBrowse(document.getElementById(btnName));
    r.on('fileAdded', function (file, event) {
        if (fileQueueList != null && fileQueueList != undefined) {
            var html = "<div id='" + file.uniqueIdentifier + "'><div  class='icon-delete' style='width:16px;height:16px;cursor:pointer;float:left'></div><div style='float:left'>" + file.fileName + "</div><div style='clear:both;'></div></div>";
            fileQueueList.append(html);
            $(".icon-delete").click(function () {
                var obj = $(this).parent();
                for (var i = 0, l = r.files.length; i < l; i++) {
                    if (obj.attr("id") == r.files[i]["uniqueIdentifier"]) {
                        r.files[i].cancel();
                        obj.remove();
                        break;
                    }
                }
            });

        }
    });
    r.on('complete', function () {
        if (fileQueueList != null && fileQueueList != undefined) {
            fileQueueList.html("");
        }
        callBack();
    });
    return r;
}

//*** 绑定附件列表 可以删除  ***/
function BindAttachList(obj, url, urlDelete, mainid, bizType) {
    if (obj == null || obj == undefined)
    { return false; }

    obj.empty();
    $.post(url,
            { "id": mainid, "bizType": bizType },
        function (data) {
            if (data == "" || data == "-1") {
                //$.messager.alert("提示：", "提交失败.", "info");
            }
            else {
                var jsonObj = eval(data);
                var divHtml = '<table>';
                $(jsonObj).each(function (idx) {
                    divHtml += '<tr>';
                    divHtml += '<td style="margin-top:4px;"><a href="' + this.UrlPath + '"  target="blank">' + this.FName + '</a></td>';
                    if (urlDelete != "") {
                        divHtml += '<td style="margin-top:4px;"><a href="javascript:return false;" class="RemoveAttach" lang="' + this.AGUID + '" >删除</a></td>';
                    }
                    divHtml += '</tr>';

                })
                divHtml += "</table>";
                obj.empty().html(divHtml);
                if (urlDelete != "" || urlDelete != undefined) {
                    $(".RemoveAttach").click(function () {
                        RemoveAttach(urlDelete, $(this).attr("lang"), function () {
                            BindAttachList(obj, url, urlDelete, mainid, bizType);
                        });
                    });
                }
                //onclick = "RemoveAttach(\'' + urlDelete + '\',\'' + this.AGUID + '\')"
            }
        }, "json");
}

function BindAttachListNew(obj, url, urlDelete, ticket) {

    AjaxGetAuth(url, function (rr) {
        var json = eval(rr);
        console.log(json);
        if (json.Code == "0") {
           
            if (obj == null || obj == undefined)
            { return false; }

            obj.empty();

            var jsonObj = json.Data;
            var divHtml = '<table>';
            $(jsonObj).each(function (idx) {
                divHtml += '<tr>';
                divHtml += '<td style="margin-top:4px;"><a href="' + config_service_url + this.FileURL + '"  target="blank">' + this.FileName + '</a></td>';
                if (urlDelete != "") {
                    divHtml += '<td style="margin-top:4px;"><a href="javascript:return false;" class="RemoveAttach" lang="' + config_service_url + this.FileURL + '" >删除</a></td>';
                }
                divHtml += '</tr>';

            })
            divHtml += "</table>";
            obj.empty().html(divHtml);
            if (urlDelete != "" || urlDelete != undefined) {
                $(".RemoveAttach").click(function () {
                    RemoveAttachNew($(this).attr("lang"), ticket, function () {
                        BindAttachListNew(obj, url, urlDelete, ticket);
                    });
                });


            }
        }

    }, true, ticket, function () { });


}

//从附件列表中移除
function RemoveAttach(url, attachId, callback) {
    $.messager.confirm("确认？", "是否继续删除操作？", function (r) {
        if (r) {
            $.post(url,
                     { "id": attachId },
                 function (data) {
                     if (data == "" || data == "-1") {
                         //$.messager.alert("提示：", "提交失败.", "info");
                     }
                     else {
                         //绑定附件
                         callback();
                     }
                 }, "json");
        }
    });
}
function RemoveAttachNew(url, ticket, callback) {
    $.messager.confirm("确认？", "是否继续删除操作？", function (r) {
        if (r) {
            $.ajax({
                type: "DELETE",
                async: false,
                contentType: "application/json",
                url: url,
                data: {},
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", ticket);
                },
                success: function (rr) {
                    callback();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }
    });
}
/********************附件功能  结束********************/
