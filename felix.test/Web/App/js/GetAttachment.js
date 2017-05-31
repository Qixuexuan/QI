let TGuid
let ticket
$(document).ready(function () {
    $(":text").css({ "width": "100%", "height": "100%", "border": "0px", "margin": "0px auto" });
    $("select").css({ "width": "100%", "height": "100%", "border": "0px", "margin": "0px auto" });
    $("textarea").css({ "width": "100%", "height": "100%", "border": "0px", "margin": "0px auto" });

    TGuid = getQueryString("TGuid");

    GetTicket(function (t) {
        ticket = t;
    });

    GetAttachMenat();
});

function GetAttachMenat() {

    AjaxGetAuth(config_service_url + "attachment/" + TGuid, function (result) {
        console.log(config_service_url);
        console.log(result);

        let index = 0;
        for(let data of result.Data) {
            index++;
            let trhtml = `<tr class="sptr"><td>${index}</td><td><a href="${config_service_url}${data.FileURL}">${data.FileName}</a></td><td>${data.FileType}</td></tr>`;
            $("#attachmentTable").append(trhtml);
            
        }

    }, true, ticket, function () {
        $.messager.alert("提示：", "获取数据失败.", "info");
    });
}

//关闭窗口
function closeD() {
    closeModalWindow(getQueryString("cz_index"));
}