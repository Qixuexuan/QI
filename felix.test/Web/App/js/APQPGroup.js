let ticket;
let peguid;
$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
    });

    peguid = getQueryString("PEGuid");

    GetAPQPData();
});

function GetAPQPData() {
    AjaxGetAuth(config_service_url + "Project/apqp", function (result) {
        console.log(JSON.stringify(result));
        BindData(result.Data);
    }, true, ticket, function () {
        $.messager.alert("提示：", "获取APQP配置项数据失败.", "info");
    });
}

let A = 'Hello';
let B='TOM'
let html1 = `<tr><td>${B}</td><td></td><td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td><td>${A}</td></tr>`
console.log(html1);
$("#APQP-Table tbody").append(html1);
//  绑定页面数据
function BindData(DataList) {
    for(let data of DataList) {
        let html = `<tr><td>${data.POSITIONNAME}</td><td></td><td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember()"></span></td><td>${data.Responsibility}</td></tr>`
        $("#APQP-Table tbody").append(html);
    }
}

//  添加成员
function PlusMember() {
    $.messager.alert("提示：", "waiting.", "info");
}

//  移除成员
function MinusMember() {
    //$.messager.alert("提示：", "waiting.", "info");
    //$("#test").parent().remove();
}