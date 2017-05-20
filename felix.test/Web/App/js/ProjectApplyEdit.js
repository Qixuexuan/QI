let ticket;
let pguid;
$(document).ready(function () {
    //每个需要访问服务的页面都要
    GetTicket(function (t) {
        ticket = t;
        pguid = getQueryString("PGuid");
        BlindData();
        GetPrjDetail();
    });
})


function BlindData(){

//  客户类别
BindSltAuth($("#CustomCategory"), config_service_url + "Dictionary/CustomCategory", function () {
            });

//  项目类型
BindSltAuth($("#ProjectType"), config_service_url + "Dictionary/ProjectType", function () {
            });

//  客户规模
BindSltAuth($("#CustomSituation"), config_service_url + "Dictionary/CustomSituation", function () {
            });

//  成立时间
BindSltAuth($("#EstablishTime"), config_service_url + "Dictionary/EstablishTime", function () {
            });

//  账期
BindSltAuth($("#PayDays"), config_service_url + "Dictionary/PayDays", function () {
            });


//  支付方式
BindSltAuth($("#PayType"), config_service_url + "Dictionary/PayType", function () {
            });


//  交付方式
BindSltAuth($("#DeliveryMethod"), config_service_url + "Dictionary/DeliveryMethod", function () {
            });


//  项目周期
BindSltAuth($("#ProjectCycle"), config_service_url + "Dictionary/ProjectCycle", function () {
            });


//  所需资源
BindSltAuth($("#ResourceNeed"), config_service_url + "Dictionary/ResourceNeed", function () {
            });


//  利润率
BindSltAuth($("#RateOfProfit"), config_service_url + "Dictionary/RateOfProfit", function () {
            });


//  制造难度
BindSltAuth($("#DifficultyOfManufacture"), config_service_url + "Dictionary/DifficultyOfManufacture", function () {
            });


//  回复期限
BindSltAuth($("#ReplyLimit"), config_service_url + "Dictionary/ReplyLimit", function () {
});

    //  客户列表
BindSltAuth($("#CustomName"), config_service_url + "Account/Customer", function () {
});
}


//  获取项目详情
function GetPrjDetail() {

    AjaxGetAuth(config_service_url + "PrjEstablish/detail/" + pguid, function (result) {
        if (result.Data.length > 0) {

            console.log(result);

            var data = result.Data[0];
            for (var key in data) {
                //$("#" + key).text(data[key]);
                try{
                    //$("#" + key).find("option[text='" + data[key] + "']").attr("selected", true);
                    $("#" + key).val(data[key]);
                }
                catch(err){
                    $("#" + key).val(data[key]);
                }
                
            }
        }

    }, true, ticket, function () {
        $.messager.alert("提示：", "获取详情数据失败.", "info");
    })
}


//  提交立项申请
function Submit() {
    //表单验证
    if (!CheckValidate($(".content"))) return false;

    let jsonObj1 = initStrJson($(".content"));
   

    console.log(jsonObj);

    AjaxPostAuthNew(config_service_url + "PrjEstablish/Submit", jsonObj, function (result) {
        //console.log(result);
        $.messager.alert("提示：", result.Message, "info");
    }, 
    true, 
    ticket,
     function (XMLHttpRequest, textStatus, errorThrown) {
         $.messager.alert("提示：", result.Message, "info");
     })
}

//  保存申请内容
function Save() {
    //表单验证
    if (!CheckValidate($(".content"))) return false;

    var jsonObj1 = initStrJson($(".content"));
    let Obj = JSON.parse(jsonObj1);
    Obj.PGUID = pguid;
    let jsonObj = JSON.stringify(Obj);
    console.log(jsonObj);

    AjaxPostAuthNew(config_service_url + "PrjEstablish/Save", jsonObj, function (result) {
        //console.log(result);
        $.messager.alert("提示：", result.Message, "info");
    },
    true,
    ticket,
     function (XMLHttpRequest, textStatus, errorThrown) {
         $.messager.alert("提示：", result.Message, "info");
     })
}