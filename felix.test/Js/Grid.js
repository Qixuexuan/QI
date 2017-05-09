var pageCount;
var tHeight;
var aHeight;
var dHeight;
var pHeight;
var sHeight;

$(function()
{
	if (isModalWindow())
	{
		$('body').addClass("GridBody_Pop");
	}

	pageCount = $("#GridJump > option").length || $(".GridPager").find("select:first > option").length;

	hidePager();

	tHeight = ($(".tools_bar:visible").length > 0) ? $(".tools_bar").outerHeight(true) : 0;
	aHeight = ($(".GridAdvancedSearch:visible").length > 0) ? $(".GridAdvancedSearch").outerHeight(true) : 0;
	sHeight = ($(".GridSearch:visible").length > 0) ? $(".GridSearch").outerHeight(true) : 0;
	dHeight = ($(".GridDescription:visible").length > 0) ? $(".GridDescription").outerHeight(true) : 0;
	pHeight = ($(".GridPager:visible").length > 0) ? $(".GridPager").outerHeight(true) : 0;

	resizeWindow();

	var resizeFrame = window.parent.resizeFrame;
	if (resizeFrame) resizeFrame(window.location.href, tHeight + aHeight + dHeight + pHeight + sHeight + $(".GridView").outerHeight() + 12);
});

$(window).resize(resizeWindow);

function resizeWindow()
{
	$(".GridTable").height($(window).height() - tHeight - aHeight - dHeight - pHeight - sHeight);
}

function refreshPage()
{
	$(".GridPager").find("select:first").trigger("change");
}
function hidePager()
{
	if (pageCount <= 1)
	{
		$(".GridPager").hide();
	}
}

function ShowForm(t, w, h, url, rid)
{
	if (rid)
	{
		showModalWindow(t, w, h, url + "?RecordID=" + rid + "&" + splitUrl(""));
	}
	else
	{
		showModalWindow(t, w, h, url + "?" + splitUrl(""));
	}
}
function splitUrl(parms)
{
	var a = location.href.split("?");
	if (a.length < 2) return "";

	var b = a[1].split("&");
	var s = "";

	for ( var i = 0 ; i < b.length;i++)
	{
		if ((parms + ",recordid,mainid").toLowerCase().indexOf(b[i].toLowerCase().split("=")[0]) > -1) continue;
		s += b[i] + "&";
	}
	s = s.substring(0,s.length-1);

	return '&' + s;
}

function BeforeDelete(isMulti)
{
	var selectedRowCount = GetSelectedRowCount();

	if (selectedRowCount = 0)
	{
		alert(msg1101);
		return false;
	}

	if (isMulti == 1 && selectedRowCount > 1)
	{
		alert(msg1102);
		return false;
	}

	return confirm(msg1001);
}

function OpenWindowInfo(width, height, url, tablename, id) {
	$.post("../Extented/ReplaceSqlValue.aspx"
		, { url: url, tablename: tablename, id: id }
		, function(response) {
			OpenWindow(width, width, response);
		}
		, "text");
}

function OpenWindowInfoSelf(url, tablename, id)
{
    //alert("1111");
    
    $.post("../Extented/ReplaceSqlValue.aspx"
		, { url: url, tablename: tablename, id: id }
		, function(response)
		{
		    window.location.href = response;
		}
		, "text");
}


function removeElement(_element)
{
	var _parentElement = _element.parentNode;
	if (_parentElement)
	{
		_parentElement.removeChild(_element);
	}
}
function showAdvancedSearch() {
	if ($(".GridAdvancedSearch:visible").length > 0) {
		$(".GridAdvancedSearch").hide();
	} else {
		$(".GridAdvancedSearch").show();
	}
	resizeWindow();
	return false;
}

function JumpPage(ddlID)//跳转页
{
	return Anthem_InvokePageMethod('JumpPage', [document.getElementById(ddlID).value], null);
}

function PageSizePage(ddlID)//当前页记录
{
	Anthem_InvokePageMethod('SetPageSize', [document.getElementById(ddlID).value], null);
	resizeWindow();
}

//判断行选择
function GetSelectedRowCount()
{
	var i = 0;
	var rows = $(".GridView").find("tr");
	if (rows.length > 1)
	{
		for (var j = 1; j < rows.length; j++)
		{
			i += $(rows[j]).find("td:first").find(":checked").length;
		}
	}
	return i;
}



function GetSelectID(ColumnIndex) {
    var obj = null;
    var SelValue = "";
    var boolSelected = false;
    var interval = 0;
    var CheckBoxs = document.getElementsByTagName("input");
    var selectedID = null;
    for (var i = 0; i < CheckBoxs.length; i++) {
        if (CheckBoxs[i].id.indexOf('Chk_Cell') > -1) {
            if (CheckBoxs[i].checked == true) {
                interval++;
                // obj = CheckBoxs[i];
                SelValue += CheckBoxs[i].value + ",";

            }
        }
    }

    if (interval > 1) {
        // alert("只能选择一条记录！");
        //return 0;
    }

    else if (interval == 0) {
        alert("请选择一条记录！");
        return 0;
    }

    var selectedID = "";
    if (ColumnIndex == null)
        // selectedID = obj.value;
        selectedID = SelValue;
    else
        selectedID = obj.parentElement.parentElement.cells[ColumnIndex].innerText;

    return selectedID;
}

function CheckSelectOne()
{
    var obj = null;
    var boolSelected = false;
    var interval = 0;
    var CheckBoxs = document.getElementsByTagName("input");
    var selectedID = null;
    for (var i = 0; i < CheckBoxs.length; i++)
    {
        if (CheckBoxs[i].id.indexOf('Chk_Cell') > -1)
        {
            if (CheckBoxs[i].checked == true)
            {
                interval++;
                obj = CheckBoxs[i];
            }
        }
    }

    if (interval == 0)
    {
        alert("请选择记录！");
        return false;
    }

    return true;
}

function checkSelect()
{
    var obj = null;
    var boolSelected = false;
    var interval = 0;
    var CheckBoxs = document.getElementsByTagName("input");
    var selectedID = null;
    for (var i = 0; i < CheckBoxs.length; i++)
    {
        if (CheckBoxs[i].id.indexOf('Chk_Cell') > -1)
        {
            if (CheckBoxs[i].checked == true)
            {
                interval++;
                obj = CheckBoxs[i];
            }
        }
    }

    if (interval == 0)
    {
        alert("请选择记录！");
        return false;
    }

    return true;
}





//前台调用脚本，为了让程序能跑起来
function CheckSelectedRowMultiLine(canExecMultiLine) {
	if (parseInt(canExecMultiLine) == 2) {
		if (HasSelectedRow() == false) {
			alert(msg1101);
			return false;
		}
	}
	if (parseInt(canExecMultiLine) == 1) {
		if (HasSelectedRow() == false) {
			alert(msg1102);
			return false;
		}
		if (HasSelectedMoreRows() == true) {
			alert(msg1103);
			return false;
		}
	}
	return true;
}

//Gridview CheckBox全选
function selectAllTop(chk)
{
	if (chk.checked)
	{
		$(".GridView").find("tr").each(function(i)
		{
			$(this).find("td:first").find("input:checkbox").attr("checked",true);
		});
	}
	else
	{
		$(".GridView").find("tr").each(function(i)
		{
			$(this).find("td:first").find("input:checkbox").removeAttr("checked");
		});
	}
}

//grid选择框
function selectAllGd(pcheck, str, hddSelectedRowID) {
	if (document.getElementById(hddSelectedRowID) == null)
		return;
	if (!pcheck) {// 去除全选
		document.getElementById("chkAll").checked = false;
	}
	if (pcheck) {//判断全选是否选中
		var chkother = document.getElementsByTagName("input");
		var chk = 0;
		var count = 0;
		var lgth = chkother.length;
		var chkBox
		for (var i = 0; i < lgth; i++) {
			chkBox = chkother[i]
			if (chkBox.type == 'checkbox' && chkBox.id.indexOf('CheckBoxSelect') != -1) {
				count++;
				if (chkBox.checked == true) {
					chk++;
				}
			}
		}
		if (chk == count) {
			document.getElementById("chkAll").checked = true;
		}
	}
	var pvalue = document.getElementById(hddSelectedRowID).value;
	if (pvalue != null && pvalue != undefined) {
		var sp = pvalue.split('|');
		if (sp != null && sp.length > 0) {
			if (pcheck == true) {
				var isSelected = false;
				var isSelectValue = "";
				var spLenght = sp.length;
				for (var k = 0; k < spLenght; k++) {
					if (sp[k] != "") {
						if (sp[k] == str) {
							isSelected = true;
							return;
						}
						isSelectValue += sp[k] + "|";
					}
				}
				if (!isSelected) {
					isSelectValue += str + "|";
					document.getElementById(hddSelectedRowID).value = isSelectValue;
				}
			}
			else {
				var noSelectValue = "";
				var spLenght = sp.length;
				for (var k = 0; k < spLenght; k++) {
					if (sp[k] != str && sp[k] != "") {
						noSelectValue += sp[k] + "|";
					}
				}
				document.getElementById(hddSelectedRowID).value = noSelectValue;
			}
		}
	}
}

//执行sp或者sql、C#等之前的提示
function ConfirmMsg(msg, toolbarID, ids) {
	if (msg && msg != "null" & msg != "undefined") {
		if (confirm(msg)) {
			var hddSelectedRowID = '<%=HddSelectedRow.ClientID%>';
			if (ids == "ID")
				ids = $$(hddSelectedRowID).value
			return Anthem_InvokePageMethod('ExecMethod', [toolbarID, ids], null);
		}
	}
}

//grid弹出模组页
function RowSelected(RowClickModule, selectedRow, selectedRowUniqueID) {
	if (RowClickModule != "") {
		var toolbarID = parseInt(RowClickModule);
		var x = document.getElementById(selectedRowUniqueID);
		var y = x.value;
		x.value = selectedRow + '|';
		var toolbarBtn = document.getElementById(toolbarID);
		if (toolbarBtn)
			toolbarBtn.click();
		else
			return Anthem_InvokePageMethod('PreExecCheck', ['', toolbarID, selectedRow], null);
		if (document.getElementById(selectedRowUniqueID)) {
			document.getElementById(selectedRowUniqueID).value = y;
		}
	}
}

function SelectItemByText(objSelect, objItemText)
{
	//判断是否存在 
	for (var i = 0; i < objSelect.options.length; i++)
	{
		if (objSelect.options[i].value == objItemText)
		{
			objSelect.options[i].selected = true;
			break;
		}
	}
}

function clearCheckBoxList(id)
{
	var objid = $$(id);
	if (objid) {
		if (objid.rows) {
			for (var row in objid.rows) {
				if (row != null) {
					for (var cell in objid.rows[row].cells) {
						if (cell != null && objid.rows[row].cells[cell] && objid.rows[row].cells[cell].childNodes && objid.rows[row].cells[cell].childNodes.length > 0) {
							objid.rows[row].cells[cell].childNodes[0].checked = false;
						}
					}
				}
			}
		}
	}
}

function setGridColorByonmouseover(obj) {
	$(obj).addClass("SelectedRow");
}
function setGridColorByonmouseout(obj) {
	$(obj).removeClass("SelectedRow");
}
function setGridOddColorByonmouseover(obj) {
	$(obj).addClass("SelectedRow");
}
function setGridOddColorByonmouseout(obj) {
	$(obj).removeClass("SelectedRow");
}

