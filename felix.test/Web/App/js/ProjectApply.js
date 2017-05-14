var ticket;
$(document).ready(function () {
    //每个需要访问服务的页面都要
    GetTicket(function (t) {
        ticket = t;
        

        BlindData();
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
}




//  提交立项申请
function Submit() {
    debugger;
    //表单验证
    if (!CheckValidate($(".content"))) return false;

    var jsonObj = initStrJson($(".content"));
    console.log(jsonObj);

    //AjaxPostAuthNew(config_service_url + "PrjEstablish/Submit", jsonObj, function (result) {
    //    console.log(result);
    //}, 
    //true, 
    //ticket,
    // function (XMLHttpRequest, textStatus, errorThrown) {
    //     console.log(XMLHttpRequest);
    //     console.log(textStatus);
    //     console.log(errorThrown);
    // })
}