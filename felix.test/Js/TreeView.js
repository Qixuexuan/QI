//WebTree CheckBox全选
function tv_NodeChecked(treeId, nodeId, bChecked) {
    setChildNodesChecked(igtree_getNodeById(nodeId), bChecked);
}

function setChildNodesChecked(node, bChecked) {
    var childNodes = node.getChildNodes();
    if (childNodes.length > 0) {
        for (var i = 0; i < childNodes.length; i++) {
            setChildNodesChecked(childNodes[i], bChecked)
            childNodes[i].setChecked(bChecked);
        }
    }
}

//绑定TreeView的CheckBox事件 
function BindCheckBoxEventHanlder(tvID) {
    var inputs = document.getElementsByTagName("input");
    var j = 0;
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.type == "checkbox" && input.id.indexOf(tvID) != -1) {
            input.onclick = function() { onCheck(); checkFatherCheckbox(event.srcElement); };
            j++;
            if (input.checked == true) {
                input.checked = false;
            }
        }
    }
}

//子节点全选的话，父节点自动选中；或子节点都未选，父节点取消选中
function checkFatherCheckbox(objChk) {
    if (objChk.checked) //选中
    {
        var objDiv = getParentDiv(objChk); //整个DIV
        if (objDiv == null) return;

        if (!isAllChildChecked(objDiv)) return; //所有子节点都选中了

        var objChk = getFirstCheckbox(objDiv); //得到DIV中第一个checkbox

        if (objChk == null) return;

        var id = objChk.id;

        var p = id.substr(0, id.lastIndexOf("n") + 1);

        var sn = id.substr(id.lastIndexOf("n") + 1);
        sn = sn.substr(0, sn.indexOf("CheckBox"));

        var n = parseInt(sn) - 1;

        var pCheckBox = document.getElementById(p + n.toString() + "CheckBox");
        if (pCheckBox) pCheckBox.checked = true;
    }
    else//未选中
    {
        var objDiv = getParentDiv(objChk); //整个DIV
        if (objDiv == null) return;

        var objChk = getFirstCheckbox(objDiv); //得到DIV中第一个checkbox

        if (objChk == null) return;

        var id = objChk.id;

        var p = id.substr(0, id.lastIndexOf("n") + 1);

        var sn = id.substr(id.lastIndexOf("n") + 1);
        sn = sn.substr(0, sn.indexOf("CheckBox"));

        var n = parseInt(sn) - 1;

        var pCheckBox = document.getElementById(p + n.toString() + "CheckBox");
        if (pCheckBox) pCheckBox.checked = false;
    }
}

//得到父级DIV
function getParentDiv(objElement) {
    var div;
    if (objElement.parentElement.tagName.toLowerCase() != "div") {
        div = getParentDiv(objElement.parentElement);
    }
    else {
        return objElement.parentElement;
    }
    return div;
}

//CheckBox全选事件
function onCheck() {
    var div = event.srcElement.parentElement.parentElement.parentElement.parentElement.nextSibling;
    if (div) {
        if (div.tagName == "DIV") {
            CheckChild(div, event.srcElement.checked);
        }
    }
}
function onUnCheck() {
    var div = event.srcElement.parentElement.parentElement.parentElement.parentElement.nextSibling;
    if (div) {
        if (div.tagName == "DIV") {
            CheckChild(div, false);
        }
    }
}
//递归设置CheckBox Checked
function CheckChild(objdiv, checked) {
    try {
        if (objdiv.childNodes) {
            var childNodes = objdiv.childNodes;
            if (childNodes.length > 0) {
                for (var i = 0; i < childNodes.length; i++) {
                    var child = childNodes[i];
                    if (child.tagName == "DIV") {
                        CheckChild(child, checked);
                    }
                    else if (child.tagName == "TABLE") {
                        var childChecks = child.getElementsByTagName("input");
                        if (childChecks.length > 0) {
                            childChecks[0].checked = checked;
                        }
                    }
                }
            }
        }
    }
    catch (e) {
        return;
    }
}

//递归查找指定DIV中是否所有的 Checkbox 都 Checked
function isAllChildChecked(objdiv) {
    try {
        if (objdiv.childNodes) {
            var childNodes = objdiv.childNodes;
            if (childNodes.length > 0) {
                for (var i = 0; i < childNodes.length; i++) {
                    var child = childNodes[i];
                    if (child.tagName == "DIV") {
                        CheckChild(child, checked);
                    }
                    else if (child.tagName == "TABLE") {
                        var childChecks = child.getElementsByTagName("input");
                        if (childChecks.length > 0) {
                            if (!childChecks[0].checked) return false;
                        }
                    }
                }
            }
        }

        return true;
    }
    catch (e) {
        return false;
    }
}

//返回指定DIV中第一个checkbox
function getFirstCheckbox(objdiv) {
    try {
        if (objdiv.childNodes) {
            var childNodes = objdiv.childNodes;
            if (childNodes.length > 0) {
                for (var i = 0; i < childNodes.length; i++) {
                    var child = childNodes[i];
                    if (child.tagName == "DIV") {
                        CheckChild(child, checked);
                    }
                    else if (child.tagName == "TABLE") {
                        var childChecks = child.getElementsByTagName("input");
                        if (childChecks.length > 0) {
                            return childChecks[0];
                        }
                    }
                }
            }
        }

        return null;
    }
    catch (e) {
        return null;
    }
}

//解决TreeView控件IE7界面断线问题
function setTreeViewDivHeight(treeViewID) {
    var treeview = document.body.all(treeViewID);
    var startIndex = treeview.sourceIndex;
    var begin = false;

    for (var i = startIndex; i < document.body.all.length - startIndex; i++) {
        var e = document.body.all(i);
        if (e.tagName == "DIV"
		&& e.id == ""
		&& e.style.width == "20px"
		&& e.style.height == "1px") {
            e.style.height = "20px";
            begin = true;
        }
        if (begin && e.tagName == "DIV" && e.id != "" && e.id.indexOf(treeViewID) == -1) {
            break;
        }
    }
}
