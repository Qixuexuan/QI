/**
 * 初始化界面内容
 */
let _rootconfig;
const CONST_CONFIG_PATH = "config/projApplyConfig.json"
$.get(CONST_CONFIG_PATH, function(data) {
    _rootconfig = data;
    for (var obj in _rootconfig) {
        let Obj = _rootconfig[obj];
        for (let item of Obj.Items) {
            let opt = `<option value='${item}'>${item}</option>`;
            $("#" + obj).append(opt)
        }
    }
});

function submit() {
    let data = getInputData();
    console.log(data);
}

/**
 * 检查界面中所输入的值是否都满足要求
 */
function checkDataInput() {

}

/**
 * 获取界面中所输入的数据
 */
function getInputData() {

    let AvailableData = {
        ProjectNO: $("#ProjectNO").val(),
        CustomerName: $("#CustomerName").val(),
        ObjType: $("#ObjType").val(),
        HostType: $("#HostType").val(),
        CustomerSize: $("#CustomerSize").val(),
        EstablishTime: $("#EstablishTime").val(),
        Tel: $("#Tel").val(),
        ProjectName: $("#ProjectName").val(),
        AccountTime: $("#AccountTime").val(),
        PayType: $("#PayType").val(),
        DeliverType: $("#DeliverType").val(),
        FPTTIme: $("#FPTTIme").val(),
        PPAPTime: $("#PPAPTime").val(),
        ProjectCycle: $("#ProjectCycle").val(),
        RequireResource: $("#RequireResource").val(),
        ProfitMargin: $("#ProfitMargin").val(),
        DifficultyGrade: $("#DifficultyGrade").val(),
        ReplyTerm: $("#ReplyTerm").val(),
        ProjectDes: $("#ProjectDes").val(),
        ProDeptAssessment: $("#ProDeptAssessment").val(),
        ProDeptDes: $("#ProDeptDes").val(),
        TecDeptAssessment: $("#TecDeptAssessment").val(),
        TecDeptDes: $("#TecDeptDes").val(),
        ManufactureDiffAssessment: $("#ManufactureDiffAssessment").val(),
        CapacityDiffAssessment: $("#CapacityDiffAssessment").val(),
        MakeDes: $("#MakeDes").val(),
        ProjectAssessment: $("#ProjectAssessment").val(),
        ProjectDes: $("#ProjectDes").val()
    }

    return AvailableData;

}