//执行sp或者sql、C#等之前的提示
function ConfirmMsg(msg, toolbarID, ids)
{
	if (msg && msg != "null" & msg != "undefined") {
		if (confirm(msg)) {
			return Anthem_InvokePageMethod('ExecMethod', [toolbarID, ids], null);
		}
	}
}

//--身份证号码验证-支持新的带x身份证
function CheckIsIdCardNo(ColName, str)
{
	if (str == null || str == "") {
		return true;
	}

	if (!isIdCardNo(str.toLowerCase())) {
		DialogboxShow("[" + ColName + "]" + "身份证号码不合规范！");
		return false;
	}
	return true;
}

//--身份证号码验证-支持新的带x身份证
function isIdCardNo(pId)
{
	pId = pId.toLowerCase();
	var arrVerifyCode = [1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2];
	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	var Checker = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

	if (pId.length != 15 && pId.length != 18) return false;

	var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19" + pId.slice(6, 16);

	if (!/^\d+$/.test(Ai)) return false;

	var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai.slice(12, 14);

	var d = new Date(yyyy, mm, dd), now = new Date();
	var year = d.getFullYear(), mon = d.getMonth(), day = d.getDate();

	if (year != yyyy || mon != mm || day != dd || d > now || year < 1940) return false;

	for (var i = 0, ret = 0; i < 17; i++) ret += Ai.charAt(i) * Wi[i];
	Ai += arrVerifyCode[ret %= 11];

	return pId.length == 18 && pId != Ai ? false : true;
};


//校验是否不为空
function CheckIsNotEmpty(ColName, str, id)
{
	if (str == undefined && id) {
		if (id.lastIndexOf('1000') > 0) {
			var divGrid = document.getElementById(id);
			if (divGrid && divGrid.firstChild) {
				var vs = divGrid.firstChild.value;
				if (!IsNotEmpty(vs)) {
					DialogboxShow("[" + ColName + "]" + "值不能为空！");
					return false;
				}
				else
					return true;
			}
			else {
				FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
				return false;
			}
		}
	}

	if (id && id.lastIndexOf('_200500') > 0) {
		var divGrid = document.getElementById(id + "_txt");
		if (divGrid) {
			if (!IsNotEmpty(divGrid.value)) {
				FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
				return false;
			} else
				return true;
		}
		else {
			FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
			return false;
		}

	}

	if (str != undefined && typeof (str.lastIndexOf) && typeof (str.lastIndexOf) != "undefined" && str.lastIndexOf('') > 0) {
		var para = str.split('');
		if (para.length == 6) {
			if (para[1] != null) {
				if (parseInt(para[1]) < 0) {
					FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
					return false;
				} else
					return true;
			}
		}
	}
	if (document.getElementById(id) && document.getElementById(id).type == "checkbox" && document.getElementById(id).checked == false) {
		DialogboxShow("[" + ColName + "]" + "值不能为空！");
		return false;
	}
	if (document.getElementById(id) && document.getElementById(id).tagName == "DIV") {
		if (id.indexOf('_201') >= 0) {
			if (!radiobuttonlistIsChecked(id)) {
				FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
				return false;
			} else
				return true;
		}
		else if (id.indexOf('_2030') >= 0) {
			var s = document.getElementById(id + "hid").value
			if (s) {
				ss = s.split("|");
				var isEmpty = false;
				for (key in ss) {
					if (ss[key] != "") {
						if (!IsNotEmpty(ss[key])) {
							FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
							return false;
						}
						else
							isEmpty = true;
					}
				}
				if (!isEmpty) {
					FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
					return false;
				} else
					return true;
			}
		}
	}

	if (!IsNotEmpty(str)) {
		FocusDialogboxShow("[" + ColName + "]" + "值不能为空！", id);
		return false;
	}
	return true;
}


//是否不为空
function IsNotEmpty(str)
{
	if (str == null || trim(str) == "" || str == undefined || str == "undefined") {
		return false;
	}
	else {
		return true;
	}
}

//是否是电子邮件(p)
function CheckIsEmail(ColName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (!IsEmail(str)) {
		FocusDialogboxShow("[" + ColName + "]" + "电子邮件格式错误！", id);
		return false;
	}
	return true;
}

//是否是手机号码
function CheckIsMobile(ColName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (!IsMobile(str)) {
		FocusDialogboxShow("[" + ColName + "]" + "手机号码格式错误！", id);
		return false;
	}
	return true;
}

//是否是手机(p)
function IsMobile(str)
{
	var pattern = /^1\d{10}$/gi;
	flag = pattern.test(str);
	if (flag) {
		return true;
	}
	else {
		return false;
	}
}
//校验是否是整数
function CheckIsInteger(CName, str, id)
{
	if (!IsInteger(str)) {
		alert(msg0002.replace("[0]", CName));
		$("#" + id).focus();
		return false;
	}
	return true;
}
/**
*校验整型是否为非负数
*str：要校验的串。
*
*返回值：
*如果为空，定义校验通过，返回true
*如果非负数，            返回true 输入值不能是负数！
*如果是负数，            返回false               
*/
function isNotNegativeInteger(ColName, str, id)
{
	//如果为空，则通过校验
	if (str == "")
		return true;
	if (!isNaN(parseFloat(str)) && parseFloat(str) == str && parseFloat(str) >= 0) {
		return true;
	}
	else {
		FocusDialogboxShow("[" + ColName + "]" + "输入值必须是正实数！", id);
		return false;

	}
}

//校验是否是正整数
function CheckIsSignlessInteger(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (IsSignlessInteger(str) == 2) {
		FocusDialogboxShow("[" + CName + "]" + "是正整数类型，请输入正整数！", id);
		return false;
	}
	else if (IsSignlessInteger(str) == 3) {
		FocusDialogboxShow("[" + CName + "]" + "是正整数类型，请输入合理范围的正整数！", id);
		return false;
	}
	return true;
}
//校验是非负整数
function CheckIsNonnegativeInteger(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (trim(str) == '0') {
		return true;
	}
	if (IsSignlessInteger(str) == 2) {
		FocusDialogboxShow("[" + CName + "]" + "是非负整数，请输入非负整数！", id);
		return false;
	}
	else if (IsSignlessInteger(str) == 3) {
		FocusDialogboxShow("[" + CName + "]" + "是非负整数，请输入合理范围的非负整数！", id);
		return false;
	}
	return true;
}

function isChinese(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	var re = /[^\u4e00-\u9fa5]/;
	if (re.test(str)) {
		FocusDialogboxShow("[" + CName + "]" + "请输入中文！", id);
		return false;
	}
	return true;
}

//校验是否是字母
function CheckIsChar(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (IsChar(str) == false) {
		FocusDialogboxShow("[" + CName + "]" + "应该是字母类型，请输入字母！", id);
		return false;
	}

	return true;
}
//校验是否给字母
function IsChar(str)
{
	if (/^[a-zA-Z]*$/.test(str)) {
		return true;
	}
	else {
		return false;
	}
}

//校验是否是字母数字
function CheckIsNumChar(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (IsCharNum(str) == false) {
		FocusDialogboxShow("[" + CName + "]" + "应该是半角字母数字类型，请输入半角字母数字！", id);
		return false;
	}

	return true;
}
//校验是否给字母数字
function IsCharNum(str)
{
	if (/^[a-zA-Z0-9]*$/.test(str)) {
		return true;
	}
	else {
		return false;
	}
}

//校验是否是数字
function CheckIsNum(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (IsNum(str) == false) {
		DialogboxShow("[" + CName + "]" + "应该是半角数字类型，请输入半角数字！");
		return false;
	}

	return true;
}
//校验是否给数字
function IsNum(str)
{
	if (/^[0-9]*$/.test(str)) {
		return true;
	}
	else {
		return false;
	}
}

//是否是正整数
function IsSignlessInteger(str)
{
	if (isNaN(parseInt(str)) || parseInt(str) != str) {
		return 2;
	}
	else {
		if (parseInt(str) > 2147483647 || parseInt(str) <= 0) {
			return 3;
		}
		return 1;
	}
}

//正整数
function ChechIsSignless(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (!IsSignless(str)) {
		FocusDialogboxShow("[" + CName + "]" + "是整数类型，请输入正整数！", id);
		return false;
	}
	return true;
}
//是否是正整数
function IsSignless(str)
{
	if (IsDecimal(str) && parseFloat(str) > 0)
		return true;
	else

		return false;

}

//校验是否是浮点数
function CheckIsDecimal(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}

	if (IsDecimal(str) == 2) {
		FocusDialogboxShow("[" + CName + "]" + "数据格式错误，请正确输入！", id);
		return false;
	}
	else if (IsDecimal(str) == 3) {
		FocusDialogboxShow("[" + CName + "]" + "数据格式错误，请输入合理范围的正整数！", id);
		return false;
	}
	return true;
}

//是否是浮点数
function IsDecimal(str)
{
	if (str.indexOf(".") == -1) {
		if (!IsInteger(str)) {
			return 2;
		}
	}
	if (/^[-]?\d+(\.\d+)?$/.test(str)) {
		if (str.split('.')[0].length > 14) {
			return 3;
		}
		return 1;
	}
	else {
		return 2;
	}
}

//校验是否是日期
function CheckIsDate(CName, str, id)
{
	if (trim(str) == '') {
		return true;
	}
	if (!IsDate(str)) {
		FocusDialogboxShow("[" + CName + "]" + "是日期类型，请输入日期！", id);
		return false;
	}
	return true;
}

function setHTMLValues(htmlID, HidTextID)
{
	var html = htmlID.getHTML();
	if (html != null && html != undefined)
		document.getElementById(HidTextID).value = html;
}

function setValue(htmlID)
{
	var html = htmlID.getHTML();
	if (html == null || html == undefined || html == "null" || html == "undefined")
		htmlID.setHTML("");
}

function getCheckboxListCheckEvent(ID, checkID, checked)
{
	if (checked == true) {
		if (document.getElementById(ID).value != null && document.getElementById(ID).value != undefined) {
			if (document.getElementById(ID).value != "")
				document.getElementById(ID).value = document.getElementById(ID).value + checkID + "#";
			else
				document.getElementById(ID).value = checkID + "#";
		}
	} else {
		var checkValue = document.getElementById(ID).value;
		var pValue = "";
		if (checkValue != null && checkValue != undefined && checkValue != "" && checkValue.indexOf("#") > -1) {
			var check = checkValue.split('#');
			if (check && check.length > 0) {
				for (c in check) {
					if (check[c] != null && check[c] != checkID && check[c] != "")
						pValue += check[c] + "#";
				}
			}
			document.getElementById(ID).value = pValue;
		}
	}

}

//checkbox 是否选择
function selectValues(isSelect, controlValue, controlId)
{
	if (isSelect && controlValue != null && controlValue != undefined && controlValue != "undefined" && controlValue != "") {
		var values = document.getElementById(controlId).value + "|" + controlValue + "|";
		document.getElementById(controlId).value = values;
		delete values;
	}
	else if (!isSelect && controlValue != null && controlValue != undefined && controlValue != "undefined") {
		var values = document.getElementById(controlId).value;
		if (values != "" && values != null && values != undefined) {
			if (values.indexOf("|" + controlValue + "|") != -1) {
				values = values.replace("|" + controlValue + "|", "|");
				if (values == "|")
					document.getElementById(controlId).value = '';
				else
					document.getElementById(controlId).value = values;
			}
		}
		delete values;
	}
}

function ShowCheckboxList(obj)
{
	if ((event.srcElement.tagName.toLowerCase() == "td" || event.srcElement.tagName.toLowerCase() == "div" || event.srcElement.tagName.toLowerCase() == "table") && event.offsetY <= 15) {
		if (obj && obj.childNodes && obj.childNodes.length > 0) {
			for (i = 0; i < obj.childNodes.length; i++) {
				var o = obj.childNodes[i];
				if (o && o.tagName && o.tagName.toLowerCase() == "table") {
					var objHeight = getControlHeight(obj.id);
					if (objHeight && parseInt(objHeight) > 11) {
						obj.style.height = "9px";
						obj.style.backgroundImage = "url(../../App_Themes/Default/images/engine/untitled.gif)";
					}
					else {
						obj.style.height = getControlHeight(o.id);
						obj.style.backgroundImage = "url(../../App_Themes/Default/images/engine/untitled2.gif)";
					}
					delete objHeight;
				}
			}
		}
	}

}

//ControlGrid页grid赋值
function setControlGridValue(id, tableName, execObjID)
{
	Anthem_InvokePageMethod('SetControlValueMethod', [id, tableName, execObjID], null);
}

function getCtlJosnString()
{
	var arry = new Object();
	var isJosn = false;
	for (var i = 0; i < window.frames.length; i++) {
		if (window.frames[i].frameElement && window.frames[i].frameElement.contentWindow && window.frames[i].frameElement.contentWindow.window && typeof (window.frames[i].frameElement.contentWindow.window.returnControlValues) == "function") {
			var childValues = window.frames[i].frameElement.contentWindow.window.returnControlValues();
			if (childValues != null && childValues != undefined) {
				if (childValues && typeof (childValues) && typeof (childValues) != "object" && typeof (childValues).toLowerCase() == "string") {
					isJosn = true;
					arry[i] = eval(childValues);
				} else {
					arry[i] = childValues;
					isJosn = true;
				}
			}
		}
	}
	if (isJosn) {
		var arryJosn = arry.toJSONString();
		var HidChildObjectID = 'HidChildObject';
		$$(HidChildObjectID).value = arryJosn;
	}
	return isJosn;
}