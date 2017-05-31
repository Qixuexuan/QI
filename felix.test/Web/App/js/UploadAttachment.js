var r;
let ticket
$(document).ready(function () {
    $(":text").css({ "width": "100%", "height": "100%", "border": "0px", "margin": "0px auto" });
    $("select").css({ "width": "100%", "height": "100%", "border": "0px", "margin": "0px auto" });
    $("textarea").css({ "width": "100%", "height": "100%", "border": "0px", "margin": "0px auto" });

    let TGuid = getQueryString("TGuid");

    GetTicket(function (t) {
        ticket = t;
    });
   

    /********************创建上传对象 - 开始 **********************/
    var url = config_service_url + "Attachment/" + TGuid;

    var _url = config_service_url + "attachment/" + TGuid;
   
    BindAttachListNew($("#uploadfileQueue"), _url, "-", ticket);

    r = InitResumableObje(url,
        $("#uploadfileQueue"),
        "browseButton",
        function (result) {
            $.messager.alert("提示", "提交成功.", "info", function () { closeD(); });
        });

    /********************创建上传对象 - 结束 **********************/
});

function ProblemToFile() {

    if ($("#uploadfileQueue>div").length > 0) {
        r.on('uploadStart', function () {
            r.defaults.target = config_service_url + "Attachment/" + getQueryString("TGuid");
        });
        r.upload();
    }
    else {
        $.messager.alert("提示：", "没有新增的附件.", "info");
    }
                  
}

//关闭窗口
function closeD() {
    closeModalWindow(getQueryString("cz_index"));
}