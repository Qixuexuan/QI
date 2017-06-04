
let ticket;
$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
        GetLoginInfo();

    });
});


//  获取登陆信息数据
function GetLoginInfo() {
    AjaxGetAuth(config_service_url + "Account/LoginInfo", function (result) {

        if (result.Data.length > 0) {
            var data = result.Data[0];
            for (let key in data) {
                $("#" + key).text(data[key]);
            }
        }

        GetAlertData();
    }, true, ticket, function () {
        $.messager.alert("提示：", "获取登陆信息数据失败.", "info");
    });
}

function GetAlertData() {

    AjaxGetAuth(config_service_url + "public/alert", function (result) {

        console.log(result);
    }, true, ticket, function () {
        $.messager.alert("提示：", "获取警告信息数据失败.", "info");
    });
}

//  任务清单
function TaskList() {
    //  TODO：任务清单
}

//  修改密码
function ChangePWD() {
    //TODO:更换密码
    showModalWindow("修改密码", width, height, pageUrl + "?s=" + Math.random() + "&CurrentNode=" + CurrentNode + "&PGuid=" + PGuid);
}

//  退出登陆
function SignOut() {
    window.navigate("../../../Default.aspx");
}