//[content]:
//		任何数字
//			"anynumeric"
//			"double"
//		自然数
//			"natural"
//		整数
//			"integer"
//		日期
//			"date"
//		日期时间
//			"datetime"
//		仅包含数字
//			"numberstring"
//		仅包含英文字符
//			"englishchar"
//		正则表达式校验
//			"regularvalidat"
//					[regularValidatType]:
//						默认
//							"Default"
//						电话号码校验
//							"AnyPhoneNumber"
//						固定电话号码校验
//							"FixedPhoneNumber"
//						移动电话号码校验
//							"MobilePhoneNumber"
//						邮编校验
//							"Zip"
//						Email地址校验
//							"Email"
//						身份证号码校验
//							"IDCardNumber"
//						自定义格式校验
//							"CustomExpression"



//数据检测开始
//遍历数字格式化Form里的需要校验的元素
function ValidatAllControls()
{
	var e;
	var check_content = "";
	var context_label = "";
	var passCheck = true;
	var errorMsg = "";

	var result;

	for(var i = 0;i < window.document.forms[0].elements.length;i++)
	{
		e = window.document.forms[0].elements[i];
		//控件是否需要校验
		if (!$(e).attr("Validation")) continue;
				
		
		//判空
		if ($(e).attr("allowEmpty") && $.trim(e.value) == "")
		{
			passCheck = false;
			e.focus();
			errorMsg = msg0003;
			break;
		}

		if ((e.type == "text" || e.type == "password") && $(e).attr("content"))
		{
			check_content = $(e).attr("content").toLowerCase();//取得contentType信息

			context_label = GetControlContextLabel(e);

			if (check_content == "anynumeric" || check_content == "double")//任何数字
			{
				if ($.trim(e.value) != "" && !IsNumeric(e.value))
				{
					passCheck = false;
					e.focus();
					errorMsg = msg0004.replace("[0]", context_label);
					break;
				}
			}

			if (check_content == "natural")//自然数
			{
				if ($.trim(e.value) != "" && !IsNatural(e.value))
				{
					passCheck = false;
					e.focus();
					errorMsg = msg0005.replace("[0]", context_label);
					break;
				}
			}

			if (check_content == "integer")//整数
			{
				if ($.trim(e.value) != "" && !IsInteger(e.value))
				{
					passCheck = false;
					e.focus();
					errorMsg = msg0002.replace("[0]", context_label);
					break;
				}
			}

			if (check_content == "date")//日期
			{
				if ($.trim(e.value) != "" && !IsDate(e.value))
				{
					passCheck = false;
					e.focus();
					errorMsg = msg0006.replace("[0]", context_label);
					break;
				}
			}

			if (check_content == "datetime")//日期时间
			{
				if ($.trim(e.value) != "" && !IsDateTime(e.value))
				{
					passCheck = false;
					e.focus();
					errorMsg = msg0007.replace("[0]", context_label);
					break;
				}
			}

			if (check_content == "numberstring")//仅包含数字
			{
				if ($.trim(e.value) != "" && !IsNumberString(e.value))
				{
					passCheck = false;
					e.focus();
					errorMsg = msg0008.replace("[0]", context_label);
					break;
				}
			}

			if (check_content == "englishchar")//仅包含英文字符
			{
				if ($.trim(e.value) != "" && !IsEnglishChar(e.value))
				{
					passCheck = false;
					e.focus();
					errorMsg = msg0009.replace("[0]", context_label);
					break;
				}
			}

			
			if (check_content == "regularvalidat")//正则表达式校验
			{
				var regularValidatType = $(e).attr("regularValidatType");
				if (regularValidatType != null && regularValidatType != "Default")
				{
					switch(regularValidatType)
					{
						case "AnyPhoneNumber":
							if (!IsAnyPhoneNumber(e.value))
							{
								passCheck = false;
								errorMsg = context_label + "电话号码校验不正确";
							}
							break;
						case "FixedPhoneNumber":
							if (!IsFixedPhoneNumber(e.value))
							{
								passCheck = false;
								errorMsg = context_label + "固定电话号码校验不正确";
							}
							break;
						case "MobilePhoneNumber":
							if (!IsMobilePhoneNumber(e.value))
							{
								passCheck = false;
								errorMsg = context_label + "移动电话号码校验不正确";
							}
							break;
						case "Zip":
							if (!IsZip(e.value))
							{
								passCheck = false;
								errorMsg = context_label + "邮编校验不正确";
							}
							break;
						case "Email":
							if (!IsEmail(e.value))
							{
								passCheck = false;
								errorMsg = context_label + "Email地址校验不正确";
							}
							break;
						case "IDCardNumber":
							if (!IsIDCardNumber(e.value))
							{
								passCheck = false;
								errorMsg = context_label + "身份证号码校验不正确";
							}
							break;
						case "CustomExpression":
							if (e.customValidatRegularExpression != null && e.customValidatRegularExpression != "")
							{
								if (!IsCustomRegularExpression(e.value,e.customValidatRegularExpression))
								{
									passCheck = false;
									errorMsg = context_label + "格式不正确";
								}
							}
							break;
					}

					if (!passCheck)
					{
						e.focus();
						break;
					}
				}
			}
		}

		//范围校验
		result = ValidatRange(e)
		if (result != null)
		{
			passCheck = false;
			e.focus();
			errorMsg = result;
			break;
		}

		//比较校验
		result = ValidatCompare(window.document,e)
		if (result != null)
		{
			passCheck = false;
			e.focus();
			errorMsg = result;
			break;
		}
	}

	if(!passCheck)
	{
		alert(errorMsg);
	}

	return passCheck ;
}


//控件值范围校验
function ValidatRange(objControl)
{
	if (objControl.rangeCheck_DataType != null)
	{
		var max = objControl.rangeCheck_MaximumValue;
		var min = objControl.rangeCheck_MinimumValue;

		if (objControl.rangeCheck_DataType == "Numeric")
		{
			if (!IsNumeric(objControl.value)) return null;
			var val = RemoveComma(objControl.value);

			if (max != null && parseFloat(val) > parseFloat(max)) return "值范围不能大于" + max;

			if (min != null && parseFloat(val) < parseFloat(min)) return "值范围不能小于" + min;
		}

		if (objControl.rangeCheck_DataType == "DateTime")
		{
			var val = objControl.value;

			if (!IsDate(val) && !IsDateTime(val)) return null;

			if (max != null && (IsDate(max) || IsDateTime(max))
			&& Date.parse(ConvertJsDate(val)) > Date.parse(ConvertJsDate(max)))
			{
				return "值范围不能大于" + max;
			}

			if (min != null  && (IsDate(min) || IsDateTime(min))
			&& Date.parse(ConvertJsDate(val)) < Date.parse(ConvertJsDate(min)))
			{
				return "值范围不能小于" + min;
			}
		}
	}

	return null;
}

//控件值比较校验
function ValidatCompare(objDocument,objControl)
{
	if (objControl.compareCheck_CompareControlID != null
	&& objControl.compareCheck_DataType != null
	&& objDocument.all(objControl.compareCheck_CompareControlID) != null)
	{
		var thisValue = objControl.value;
		var compareControl = objDocument.all(objControl.compareCheck_CompareControlID);
		var compareValue = compareControl.value;

		if (objControl.compareCheck_DataType == "Numeric")
		{
			thisValue = parseFloat(thisValue);
			compareValue = parseFloat(compareValue);

			switch (objControl.compareCheck_Operator)
			{
				case "Equal":
					if (thisValue != compareValue) return "值应等于" + GetControlContextLabel(compareControl);
					break;
				case "NotEqual":
					if (thisValue == compareValue) return "值应不等于" + GetControlContextLabel(compareControl);
					break;
				case "GreaterThan":
					if (thisValue <= compareValue) return "值应大于" + GetControlContextLabel(compareControl);
					break;
				case "GreaterThanEqual":
					if (thisValue < compareValue) return "值应大于等于" + GetControlContextLabel(compareControl);
					break;
				case "LessThan":
					if (thisValue >= compareValue) return "值应小于" + GetControlContextLabel(compareControl);
					break;
				case "LessThanEqual":
					if (thisValue > compareValue) return "值应小于等于" + GetControlContextLabel(compareControl);
					break;
			}
		}

		if (objControl.compareCheck_DataType == "DateTime")
		{
			if (!IsDate(thisValue) && !IsDateTime(thisValue)) return null;

			thisValue = Date.parse(ConvertJsDate(thisValue));
			compareValue = Date.parse(ConvertJsDate(compareValue));

			switch (objControl.compareCheck_Operator)
			{
				case "Equal":
					if (thisValue != compareValue) return "值应等于" + GetControlContextLabel(compareControl);
					break;
				case "NotEqual":
					if (thisValue == compareValue) return "值应不等于" + GetControlContextLabel(compareControl);
					break;
				case "GreaterThan":
					if (thisValue <= compareValue) return "值应大于" + GetControlContextLabel(compareControl);
					break;
				case "GreaterThanEqual":
					if (thisValue < compareValue) return "值应大于等于" + GetControlContextLabel(compareControl);
					break;
				case "LessThan":
					if (thisValue >= compareValue) return "值应小于" + GetControlContextLabel(compareControl);
					break;
				case "LessThanEqual":
					break;
					if (thisValue > compareValue) return "值应小于等于" + GetControlContextLabel(compareControl);
			}
		}
	}

	return null;
}


//校验字符串是否为数字
function IsNumeric(str)
{
	if (IsEmpty(str)) return true;
	if (CheckComma(str))
	{
		str = RemoveComma(str);
	}
	else
	{
		return false;
	}
	re = new RegExp("^[-|+]{0,1}[0-9]{0,}[.]{0,1}[0-9]{0,}$");
	return str.match(re) != null;
}

//校验字符串是否为整数
function IsInteger(str)
{
	if (IsEmpty(str)) return true;
	if (CheckComma(str))
	{
		str = RemoveComma(str);
	}
	else
	{
		return false;
	}
	re = new RegExp("^[-|+]{0,1}[0-9]{1,}$");
	return str.match(re) != null;
}

//校验字符串是否为自然数
function IsNatural(str)
{
	if (IsEmpty(str)) return true;
	if (CheckComma(str))
	{
		str = RemoveComma(str);
	}
	else
	{
		return false;
	}
	re = new RegExp("^[0-9]{1,}$");
	return str.match(re) != null;
}

//校验字符串是否仅包含数字
function IsNumberString(str)
{
	if (IsEmpty(str)) return true;
	re = new RegExp("^[0-9]{1,}$");
	return str.match(re) != null;
}

//校验字符串是否为英文字母和数字
function IsEnglishChar(str)
{
	if (IsEmpty(str)) return true;
	var re = new RegExp("^[a-zA-Z0-9. ]{1,}$");
	return str.match(re) != null;
}

//校验字符串是否为日期
function IsDate(str)
{
	if (IsEmpty(str)) return true;
	var date1,date2,pattern,pattern1,pattern2,rg1;
	var userg1 = true;

	date1 = "[0-9]{4}[-|/]{1}[0-9]{1,2}[-|/]{1}[0-9]{1,2}";//yyyyMMdd
	date2 = "[0-9]{1,2}[-|/]{1}[0-9]{1,2}[-|/]{1}[0-9]{4}";//MMddyyyy

	pattern = "^"+date1+"$|^"+date2+"$";
	rg1 = new RegExp(pattern);
	if (str.match(rg1) == null) return false;

	date1 = "([0-9]{4})[-|/]{1}([0-9]{1,2})[-|/]{1}([0-9]{1,2})";//yyyyMMdd
	date2 = "([0-9]{1,2})[-|/]{1}([0-9]{1,2})[-|/]{1}([0-9]{4})";//MMddyyyy
	pattern1 = "^"+date1+"$";
	pattern2 = "^"+date2+"$";

	rg1 = new RegExp(pattern1);

	if (str.match(rg1) == null)
	{
		rg1 = new RegExp(pattern2);
		userg1 = false;
	}

	var arr = rg1.exec(str);

	var year,month,day;
	if (userg1)
	{
		year = parseFloat(arr[1]);
		month = parseFloat(arr[2]);
		day = parseFloat(arr[3]);
	}
	else
	{
		month = parseFloat(arr[1]);
		day = parseFloat(arr[2]);
		year = parseFloat(arr[3]);
	}


	if (year < 1800 || year > 2999) return false;
	if (month > 12 || month < 1) return false;
	if (day > 31 || day < 1) return false;

	if (month < 7 && month % 2 == 0 && day > 30) return false;
	if (month > 8 && month % 2 != 0 && day > 30) return false;
	if(month == 2)
	{
		if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4 == 0))
		{
			if (day > 29) return false;
		}
		else
		{
			if (day > 28) return false;
		}
	}

	return true;
}

//校验字符串是否为时间
function IsTime(str)
{
	if (IsEmpty(str)) return true;
	var date1,date2,pattern,pattern1,pattern2,rg1;
	date1 = "[0-9]{1,2}[:]{1}[0-9]{1,2}";
	date2 = date1 + "[:]{1}[0-9]{1,2}";

	pattern = "^"+date1+"$|^"+date2+"$";
	var re = new RegExp(pattern);
	if(str.match(re) == null) return false;

	date1 = "([0-9]{1,2})[:]{1}([0-9]{1,2})";
	date2 = date1 + "[:]{1}([0-9]{1,2})";
	pattern1 = "^"+date1+"$";
	pattern2 = "^"+date2+"$";

	re = new RegExp(pattern1);
	if (str.match(re) == null)
	{
		re = new RegExp(pattern2);
	}

	var arr = re.exec(str);
	var hour = parseFloat(arr[1]);
	var min = parseFloat(arr[2]);
	var sec;
	if (arr.Length > 3) sec = parseFloat(arr[3]);

	if (hour < 0 || hour > 23)return false;
	if (min < 0 || min > 59)return false;
	if (arr.Length > 3) if (sec < 0 || sec > 59)return false;

	return true;
}

//校验字串是否为日期时间
function IsDateTime(str)
{
	if (IsEmpty(str)) return true;
	if (str.indexOf(" ") == -1) return false;
	var arrStr = str.split(" ");

	if (!IsDate(arrStr[0])) return false;
	if (!IsTime(arrStr[1])) return false;

	return true;
}

//字符串的全部或一部分是否为日期
function IsPartialDate(str)
{
	if (IsDate(str)) return true;
	if (str.indexOf(" ") == -1) return false;
	var arrStr = str.split(" ");

	if (IsDate(arrStr[0])) return true;

	return false;
}

//校验字符串是否为身份证号码
function IsIDCardNumber(str)
{
	if (IsEmpty(str)) return true;
	re = new RegExp("^[0-9]{15}$|^[0-9]{18}$");
	return str.match(re) != null;
}

//校验字符串是否为邮政编码
function IsZip(str)
{
	if (IsEmpty(str)) return true;
	re = new RegExp("^[0-9]{6}$");
	return str.match(re) != null;
}

//校验字符串是否为Email地址
function IsEmail(str)
{
	if (IsEmpty(str)) return true;
	re = new RegExp("^[a-zA-Z0-9_]{1,}[@]{1}[a-zA-Z0-9_]{1,}[.][a-zA-Z0-9_.]{0,}[a-zA-Z0-9_]{1,}$");
	return str.match(re) != null;
}

//校验字符串是否为各种电话号码
function IsAnyPhoneNumber(str)
{
	if (IsEmpty(str)) return true;
	re1 = new RegExp("^[0-9]{7,8}$");
	re2 = new RegExp("^[0-9]{4}[-][0-9]{7,8}$|^[0-9]{4}[-][0-9]{7,8}[-][0-9]{2,5}$");
	re3 = new RegExp("^[0-9]{11}$|^[(][0-9]{3}[)][0-9]{11}$");

	return (str.match(re1) != null || str.match(re2) != null || str.match(re3) != null);
}

//校验字符串是否为固定电话号码
function IsFixedPhoneNumber(str)
{
	if (IsEmpty(str)) return true;
	re1 = new RegExp("^[0-9]{7,8}$");
	re2 = new RegExp("^[0-9]{4}[-][0-9]{7,8}[-][0-9]{2,5}$|^[0-9]{4}[-][0-9]{7,8}$");

	return str.match(re1) != null || str.match(re2) != null;
}

//校验字符串是否为手机号码
function IsMobilePhoneNumber(str)
{
	if (IsEmpty(str)) return true;
	re1 = new RegExp("^[0-9]{11}$|^[(][0-9]{3}[)][0-9]{11}$");
	return str.match(re1) != null;
}

//校验字符串是否符合自定义正则表达式
function IsCustomRegularExpression(str,regularExpression)
{
	if (IsEmpty(str)) return true;
	re1 = new RegExp("^" + regularExpression + "$");
	return str.match(re1) != null;
}

//模拟Format函数:四舍五入，截取到指定长度，在千位加逗号
function Round_Cut_AddComma(str,flen,formatString)
{
	var i;
	var eStr = "";
	var sym = "";
	str = Round_Cut(str,flen,formatString);

	if (str == "" || !IsNumeric(str)) return "";//如果是不合理的数字，返回空

	if (str.charAt(0) == "+" || str.charAt(0) == "-")
	{
		sym = str.charAt(0);
		str = str.substr(1,str.length - 1);
	}

	var l = str.lastIndexOf(".");

	if (l > 0)//有小数
	{
		var ArrStr = str.split(".");
		var pStr = ArrStr[0];
		var fStr = ArrStr[1];

		eStr = AddComma(pStr);

		eStr = eStr + "." + fStr;
	}
	else
	{
		eStr = AddComma(str);
	}

	eStr = sym + eStr;

	if (!IsNumeric(eStr)) return "";
	if (parseFloat(eStr) == 0) eStr = "0";
	if (eStr.charAt(eStr.length-1) == ".") eStr = eStr.substring(0,eStr.length-1);

	return eStr;
}

//模拟Format函数:四舍五入，截取到指定长度
function Round_Cut(str,flen,formatString)
{
	var i;
	str = str.toString();

	if (!IsNumeric(str)) return "";

	str = RemoveComma(str);
	str = AddZero(str);

	if (str.charAt(str.length-1) == ".") str = str.substring(0,str.length-1);

	if (flen < 0) return str;
	if (str == "" || !IsNumeric(str)) return "";

	str = Nz(str).toFixed(flen).toString();//四舍五入
	str = parseFloat(str).toString();

	var l = str.lastIndexOf(".");
	var strlen = str.length;

	if (l == -1)//没有小数位
	{
		if (formatString == "EmptyDotZero")
		{
			str += ".";
			for (i=0;i<flen;i++)
			{
				str += "0";
			}
		}
		return str;
	}
	else
	{
		if ( flen < (strlen - l - 1) )//需要截取
		{
			return str.substring(0,l + flen + 1);
		}
		else
		{
			if (formatString == "EmptyDotZero")
			{
				for (i = 0;i < (flen - (strlen - l - 1));i++)
				{
					str += "0";
				}
			}
			return str;
		}
	}
}

//----------------------------------------------------
//--------------------以下私有函数--------------------
//返回是否为空
function IsEmpty(str)
{
	return str == null || $.trim(str) == "";
}


//转换空为数字零
function Nz(str)
{
	if(str == "" || !IsNumeric(str))
	{
		return 0;
	}
	else
	{
		str = RemoveComma(str);
		return parseFloat(str.toString());
	}
}

//检查数字里的逗号是否合法
function CheckComma(str)
{
	var ArrStr = new Array(),pStr = "",fStr= "";
	str = str.toString();
	if (str == "") return true;
	if (str.indexOf(".") > -1)
	{
		ArrStr = str.split(".");
		pStr = ArrStr[0];
		fStr = ArrStr[1];
	}
	else
	{
		pStr = str;
	}

	if (pStr.charAt(0) == "+" || pStr.charAt(0) == "-")
	{
		pStr = pStr.substr(1,pStr.length - 1);
	}
	ArrStr = pStr.split(",");

	if (ArrStr.length == 1) return true;
	for (var i=0;i<ArrStr.length;i++)
	{
		if (i == 0)
		{
			if (ArrStr[i].length < 1 || ArrStr[i].length > 3) return false;
		}
		else
		{
			if (ArrStr[i].length != 3) return false;
		}
	}
	if (fStr.indexOf(",") > -1) return false;

	return true;
}

//加逗号，私有函数
function AddComma(pStr)
{
	var i;
	var eStr = "";
	var ArrS = new Array();

	for (i=0;i<pStr.length;i++)//得到数组
	{
		ArrS[i] = pStr.charAt(i);
	}

	for (i = pStr.length - 4;i >= 0;i -= 3)//加逗号
	{
		ArrS[i] += ",";
	}

	for (i=0;i<ArrS.length;i++)//还原成字串
	{
		eStr += ArrS[i];
	}

	return eStr;
}

//去掉字串中的逗号
function RemoveComma(str)
{
	while (str.indexOf(",") > -1)
	{
		str = str.replace(",","");
	}

	return str;
}

//检查小数点前是否有0，没有0加0，私有函数
function AddZero(str)
{
	var symbol = "";
	if (str.charAt(0) == "+" || str.charAt(0) == "-")
	{
		symbol = str.charAt(0);
	}

	var arrS = new Array();

	for (var i=0;i<str.length;i++)//得到数组
	{
		if (i == 0 && (str.charAt(i) == "+" || str.charAt(i) == "-"))
		{
			arrS[i] = "";
			continue;
		}
		arrS[i] = str.charAt(i);
	}

	for (i = 0;i<arrS.length;i++)//加0
	{
		if (arrS[i] == "." && arrS[i-1] != "0" && i == 0)
		{
			arrS[i] = "0.";
		}
	}

	str = "";
	for (i=0;i<arrS.length;i++)//还原成字串
	{
		str += arrS[i];
	}

	return symbol + str;
}

//得到控件关联的Label的文字
function GetControlContextLabel(objControl)
{
	var context_label = "";
	if ($(objControl).attr("contextLabelID"))
	{
		context_label = "[ " + $(objControl).attr("contextLabelID") + " ] ";
	}
	else
	{
		context_label = "字段";
	}
	return context_label;
}

//转换时间字符串为Javascript可以识别的时间字符串
function ConvertJsDate(strDate)
{
	if (strDate == null) return "";

	while (strDate.indexOf("/") > -1)
	{
		strDate = strDate.replace("/","-");
	}

	sym = "-";

	//已经按MM-dd-yyyy次序，不需转换
	if ((strDate.split(" ")[0].split(sym)[0]).length < 4) return strDate;

	if (strDate.indexOf(" ") != -1) //包含时间
	{
		var arrDate = strDate.split(" ")[0].split(sym);
		return arrDate[1] + sym + arrDate[2] + sym + arrDate[0] + " " + strDate.split(" ")[1];
	}
	else
	{
		var arrDate = strDate.split(sym);
		return arrDate[1] + sym + arrDate[2] + sym + arrDate[0];
	}
}

//转换时间字符串为Javascript日期对象
function ConvertJsDateObject(strDate)
{
	return new Date(ConvertJsDate(strDate));
}

//格式化时间字符串显示
function FormatDateTimeString(sym,formatString,objDate)
{
	var str;
	var yyyy = objDate.getFullYear().toString();
	var MM = (objDate.getMonth() + 1).toString();
	var dd = objDate.getDate().toString();
	var hh = objDate.getHours().toString();
	var mm = objDate.getMinutes().toString();
	var ss = objDate.getSeconds().toString();

	if (MM.length == 1) MM = "0" + MM;
	if (dd.length == 1) dd = "0" + dd;
	if (hh.length == 1) hh = "0" + hh;
	if (mm.length == 1) mm = "0" + mm;
	if (ss.length == 1) ss = "0" + ss;

	var hhmm = " " + hh + ":" + mm;

	switch(formatString)
	{
		case "yyyyMMdd":
			str = yyyy + sym + MM + sym + dd;
			break;
		case "yyyyMMddhhmm":
			str = yyyy + sym + MM + sym + dd + hh + mm;
			break;
		case "yyyyMMddhhmmss":
			str = yyyy + sym + MM + sym + dd + hh + mm + ss;
			break;
		case "MMddyyyy":
			str = MM + sym + dd + sym + yyyy;
			break;
		case "MMddyyyyhhmm":
			str = MM + sym + dd + sym + yyyy + hhmm;
			break;
	}

	return str;
}
