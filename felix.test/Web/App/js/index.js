
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

        //console.log(result);
        if (result.Data.length > 0) {
            for(let data of result.Data) {
                let html = `<p>项目编号${data.ProjectNo}，${data.FrmType}，已逾期<span class="warnTime">${data.OverDay}天</span>，申请人：${data.Applyame}，开始时间：${data.StartTime}</p>`
                $("#warn").append(html);
            }
        }
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
    showModalWindow("修改密码", 550, 270, "../Web/UserCenter/ChangePWD.html" + "?s=" + Math.random());
}

//  退出登陆
function SignOut() {
   
    $.messager.confirm('提示', '确认退出登陆吗?', function (result) {
        if (result) {
            //window.navigate("../../../Default.aspx");
            window.history.back(-1)
        }
    });
}

function reload() {
}