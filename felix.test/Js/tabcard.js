/**
* 标签页操作类
*/
function TabCard(tabId,fromContendId,fromMoreId,bindType)
{
	this.mPevActiveObj	= null;							//保存上一个激对象
	this.mTabId			= tabId;						//当前标签组id		exp: tab1
	this.mFromContendId = fromContendId;				//要加载的内容的id前缀 exp tab2_l1 tab2_l2 tab2_l3 命名方法是按 1 递增 
	this.mFromMoreId    = fromMoreId;
	this.mBindType		= bindType;
//	this.mToContentId	= toContentId;					//用于显示内容的id

//设置默认内容id 等命名...
	this.mDefaultToContendId	= this.mTabId + "_content";		//默认加载到哪个内容ID		exp: tab1_content
	this.mDefaultFromContendId	= this.mTabId+"_l";				//默认内容列表前辍			exp: tab1_11 tab1_12
	this.mDefaultFromMoreId = this.mTabId+"_more"
	this.mDefaultCardListTagName	= "li";						//默认标签页元素
	this.mListStartNumb			= 2;							//列表开始的基数

	this.mActiveClass	= "selectedTag";								//默认激活时采用的 class
	this.mNoActiveClass	= "";							//默认没激活时采用的 class

	this.mCardListObj	= null;//标签页元素对象

	/**
	* 初始化标签页
	*/
	this.initab = function ()
	{
		if(!this.mTabId)
			return false;
		this.mFromContendId	= (!this.mFromContendId  ? this.mDefaultFromContendId : this.mFromContendId);
		this.mFromMoreId	= (!this.mFromMoreId  ? this.mDefaultFromMoreId : this.mFromMoreId);
		this.mCardListObj	= document.getElementById(this.mTabId).getElementsByTagName(this.mDefaultCardListTagName);//得到标签页元素对象
		//得到标签卡组 绑定所有当前标签事件
		var li_n = this.mCardListObj.length;
		var obj_name = this;
		var tmp_from_id	= 0;
		for (var m = 0; m < li_n; m++)
		{
			tmp_from_id	= this.mFromContendId+(m+this.mListStartNumb);
			tmp_fromMore_id	= this.mFromMoreId+(m+this.mListStartNumb);
			if(this.mCardListObj[m].className == this.mActiveClass)	//得到当前激活的选项卡
			{
//				alert("active");
				//document.getElementById(tmp_from_id).style.display="block";	//设置成可见
				this.mPevActiveObj	= this.mCardListObj[m];//保存为上一个激活标签 主要是防止闪烁,加快显示速度
			}
			else
			{
				document.getElementById(tmp_from_id).style.display="none";	//设置成不可见
				document.getElementById(tmp_fromMore_id).style.display="none";	//设置成不可见
				this.mCardListObj[m].className = this.mNoActiveClass;	//其他标签设置成不激活状态
			}

			if(this.mBindType)
				this.mCardListObj[m].onclick = function(){obj_name.ActiveLabel(this);} //绑定鼠标单击时事件
			else
				this.mCardListObj[m].onmouseover = function(){obj_name.ActiveLabel(this);} //绑定鼠标移上去事件
		}
	}

	/**
	* 激活指定标签页 同时加载了对应的内容
	*/
	this.ActiveLabel = function (activeObj)
	{
		if(activeObj == this.mPevActiveObj)//和上一个激活标签一样跳过处理
			return true;
		if(this.mPevActiveObj)	//如果上一个激活标签存在,设置样式为默认
			this.mPevActiveObj.className = this.mNoActiveClass;
		activeObj.className = this.mActiveClass;
		this.mPevActiveObj	= activeObj;

		var li_n = this.mCardListObj.length;  //有几个标签
		var tmp_from_id	= 0;
		for (var m = 0; m < li_n; m++)
		{
			tmp_from_id	= this.mFromContendId+(m+this.mListStartNumb);
			tmp_fromMore_id	= this.mFromMoreId+(m+this.mListStartNumb);
			document.getElementById(tmp_from_id).style.display="none";	//设置成不可见
			document.getElementById(tmp_fromMore_id).style.display="none";	//设置成不可见
			if(this.mCardListObj[m]	== activeObj)	//找到当前激活对象所在序号
			{
				this.LoadContent(tmp_from_id);//加载对应序号的内容
                this.LoadContent(tmp_fromMore_id);//加载对应序号的内容
			}
		}
	}

	/**
	* 加载内容
	*/
	this.LoadContent = function (fromId)
	{
//		document.getElementById(toID).innerHTML	= document.getElementById(fromId).innerHTML;
		document.getElementById(fromId).style.display="block";	//设置可见
	}
}
-->