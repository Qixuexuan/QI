﻿let ticket;
let pguid;//项目的pguid
let configData;//APQP小组配置项
let configDataLength;//配置项的长度
let treeData;// 成员树的数据
let IsCanEditn;

$(document).ready(function () {
    GetTicket(function (t) {
        ticket = t;
    });

    pguid = getQueryString("PGuid");
    IsCanEditn = getQueryString("IsCanEditn");

    GetAPQPData();
    GetTreeData();
});

//  获取AQPQ小组配置项
function GetAPQPData() {
    AjaxGetAuth(config_service_url + "Project/apqp/" + pguid, function (result) {

        configData = result.Data;
        configDataLength = configData.length;
        //console.log(JSON.stringify(configData));

        BindData(configData);

    }, true, ticket, function () {
        $.messager.alert("提示：", "获取APQP配置项数据失败.", "info");
    });
}

//  获取成员树结构数据
function GetTreeData() {
    AjaxGetAuth(config_service_url + "Account/PersonTree", function (result) {

        treeData = result.Data;
        $("#APQTree").tree({ data: treeData });

    }, true, ticket, function () {
        $.messager.alert("提示：", "获取部门成员数据失败.", "info");
    });
}


//  生成AQPQ小组页面数据
function BindData(DataList) {
    for(let data of DataList) {
        let selectedMember = '';
        if (data.PERSONNAME != "" && data.PERSONNAME != undefined && data.PERSONNAME != null) {
            let nameArr = data.PERSONNAME.split(',');
            let guidArr = data.PERSONCODE.split(',');

            for (let i = 0; i < guidArr.length; i++) {

                let newid = guidArr[i];
                let name = nameArr[i];
                selectedMember += `<div><span id="${newid}" class="member-name">${name}</span><span class="glyphicon glyphicon-minus member-minus" onclick="MinusMember(this)"></span>`;
            }
        }

        let html = `<tr id="${data.CGUID}"><td>${data.POSITIONNAME}</td><td id="${data.POSITIONCODE}">${selectedMember}</td><td><span class="glyphicon glyphicon-plus member-plus" onclick="PlusMember(this)"></span></td><td>${data.Responsibility}</td></tr>`
        $("#APQP-Table").append(html);
    }
}

//  添加成员
function PlusMember(ele) {

    if (IsCanEditn != "1") {
        //$.messager.alert("提示：", "当前状态不可添加成员.", "info");
        alert("当前状态不可添加成员.");
        return;
    }

    ClearSelectNode();

    $("#treeBox").show();

    $("#dialog-confirm").dialog({
        resizable: false,
        height: 350,
        width: 550,
        modal: true,
        title: "选择成员",
        buttons: [{
            text: "确  认",
            click: function () {
                let dataList = GetTreeSelectNode();
                AddMembersTo(dataList, ele);
                $(this).dialog("close");
            }
        }, {
            text: "取  消",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });



}

//  获取成员树中选择的成员节点
function GetTreeSelectNode() {

    let dataArr = [];

    let nodes = $('#APQTree').tree('getChecked');
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].children == null) {
            let obj = {};
            obj.id = nodes[i].id;
            obj.name = nodes[i].text;
            dataArr.push(obj);
        }

    }
    return dataArr;
}

//  清除树中选中的节点
function ClearSelectNode() {

    let nodes = $('#APQTree').tree('getChecked');
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].checked = false;
    }

    let shit = $('#APQTree').tree();//这样也能起到刷新作用？  不然节点依然是选中状态
}

//  在界面中填入选择好的成员元素
function AddMembersTo(dataList, ele) {
    for (let i = 0; i < dataList.length; i++) {
        let newid = dataList[i].id;
        let name = dataList[i].name;
        let pretd = $(ele).parent().prev();

        //  寻找当前td中是否存在此id的成员
        let $allsapn = $('span'); //获取所有的span元素
        let flag = $(pretd).find($allsapn); //根据$allsapn获取pretd元素中的所有span
        //  遍历pretd元素中的所有span  判断是否存在id为newid的span

        let isExist = false;

        for (let i = 0; i < flag.length; i++) {
            if (flag[i].id == newid) {
                isExist = true;
                break;
            }
        }

        if (!isExist) {
            let newmember = `<div><span id="${newid}" class="member-name">${name}</span><span class="glyphicon glyphicon-minus member-minus" onclick="MinusMember(this)"></span>`;
            pretd.append(newmember);
        }


    }
}

//  移除成员
function MinusMember(ele) {

    if (IsCanEditn != "1") {
        //$.messager.alert("提示：", "当前状态不可删除成员.", "info");
        alert("当前状态不可删除成员.");
        return;
    }

    $(ele).parent().remove();
}

//  全部重置(清除)
function Reset() {

    for (let i = 0; i < configDataLength; i++) {
        $(`#${i}`).children().remove(); //成员所在的td
    }
}

//  保存内容
function Submit() {
    debugger;
    let data = GetSelectMember();

    let jsonObj = JSON.stringify(data);
    //console.log(jsonObj);

    AjaxPostAuthNew(config_service_url + "Project/APQP/save", jsonObj, function (result) {
        $.messager.confirm('提示', result.Message, function (result) {
            if (result) {
                //关闭页面
                window.parent.parent.closeTab("tab_info_apqp");
            }
        });
        
    },
  true,
  ticket,
   function (XMLHttpRequest, textStatus, errorThrown) {
       $.messager.alert("提示：", result.Message, "info");
   })

}

//  获取选择在表格中的成员
function GetSelectMember() {
    let obj = { ProjectAPQP: [] };

    for (let data of configData) {
        let item = {};

        let _td = $(`#${data.POSITIONCODE}`); //成员所在的td
        let cguid = $(_td).parent().attr("id");

        let idStr = '';
        let nameStr = '';

        //  获取选择的成员id和name串
        let tdChildre = _td.children();
        for (let i = 0; i < tdChildre.length; i++) {
            let id = tdChildre[i].childNodes[0].id; //成员id
            let text = tdChildre[i].childNodes[0].textContent; //成员名
            idStr += id + ',';
            nameStr += text + ',';
        }

        idStr = idStr.substring(0, idStr.length - 1);
        nameStr = nameStr.substring(0, nameStr.length - 1);


        item.AGUID = data['AGUID'];
        item.PGUID = data['PGUID'];
        item.CGUID = data['CGUID'];
        item.POSITIONCODE = data['POSITIONCODE'];
        item.POSITIONNAME = data['POSITIONNAME'];
        item.PERSONCODE = idStr;
        item.PERSONNAME = nameStr;
        item.Responsibility = data['Responsibility'];
        item.OrderBy = data['OrderBy'];

        obj.ProjectAPQP.push(item);
    }

    return obj;
}

