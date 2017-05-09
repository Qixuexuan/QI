function FlowBusiness()
{
	this.CreateStartNode=_createStartNode;
	function _createStartNode(id,des,l,t)
	{
		id='0_'+id;
		var left = l ? l : 20;
		var top = t ? t : $("body").height()/2;
		$('<div id="'+id+'" class="startNode" style="left: '+left.toString()+'px; top: '+top.toString()+'px;"><span class="nodeDes">'+(des?des:"")+'</span></div>').appendTo("body").draggable({
			drag:function(){nodeDrag(this.id);},
			stop:function(){nodeDrag(this.id);}
		});
		bindRightClick("#"+id);
	};

	this.CreateEndNode=_createEndNode;
	function _createEndNode(id,des,l,t)
	{
		id='1_'+id;
		var left = l ? l : $("body").width()-100;
		var top = t ? t : $("body").height()/2;
		$('<div id="'+id+'" class="endNode" style="left: '+left.toString()+'px; top: '+top.toString()+'px;"><span class="nodeDes">'+(des?des:"")+'</span></div>').appendTo("body").draggable({
			drag:function(){nodeDrag(this.id);},
			stop:function(){nodeDrag(this.id);}
		});
		bindRightClick("#"+id);
	};

	this.CreateNode=_createNode;
	function _createNode(id,des,l,t)
	{
		id='2_'+id;
		var left = l ? l : $("body").width()/2;
		var top = t ? t : $("body").height()/2;
		$('<div id="'+id+'" class="node" style="left: '+left.toString()+'px; top: '+top.toString()+'px;"><span class="nodeDes">'+(des?des:"")+'</span></div>').appendTo("body").draggable({
			drag:function(){nodeDrag(this.id);},
			stop:function(){nodeDrag(this.id);}
		});
		bindRightClick("#"+id);
	};


	this.CreateLine=_createLine;
	function _createLine(id)
	{
		id = id ? id : _getNewLineID();
		$('<v:line id="'+id+'"class="line" style="">'+
			'<v:stroke endarrow="Classic" color="red" weight="2" />'+
			'</v:line>').appendTo("body");
		bindRightClick("#"+id);
	}

	this.CreateRelation=_createRelation;
	function _createRelation(sour,targ,line)
	{
		if(sour==targ) return false;

		var div=$('#divNodeRrelationship');
		if(!div.is('div')) {
			$("<div>",{id:"divNodeRrelationship",style:"display:none;"}).appendTo("body > form");
		}
		else{
			var inputs=div.find('input');
			for(var i=0;i<inputs.length;i++){
				if(($(inputs[i]).attr("sour")==sour && $(inputs[i]).attr("targ")==targ)
				|| ($(inputs[i]).attr("sour")==targ && $(inputs[i]).attr("targ")==sour)) return false;
			}
		}

		$("#divNodeRrelationship").append($('<input>',{sour:sour,targ:targ,line:line}));
		Redraw(line);
		return true;
	}

	var BtnCreateRelationship;
	var _newLineID;

	//“建立关系”按钮点击事件
	this.BtnCreateRelationshipClick=function(e)
	{
		BtnCreateRelationship=$(this);
		var o=$(this);
		if(o.data("CreateRelationship") && o.data("CreateRelationship")!="_start_")
		{
			$("#"+_newLineID).remove();
		}

		o.data("CreateRelationship","_start_");
	}

	this.StopCreateRelationship=function(e)
	{
		var o=BtnCreateRelationship;
		if (o && o.data("CreateRelationship") && e.button == 2)
		{
			$("#"+_newLineID).remove();
			o.removeData("CreateRelationship");
		}
	}

	var _newLineL;
	var _newLineT;
	//节点被选择事件
	this.NodeSelected=function(e,ui)
	{
		var o=BtnCreateRelationship;
		if(o && o.data("CreateRelationship") && o.data("CreateRelationship")=="_start_")
		{
			_newLineID = _getNewLineID();
			_createLine(_newLineID);

			var origin=$(ui.selected);
			_newLineL=parseInt(origin.css("left").split("px")[0]) + origin.width()/2;
			_newLineT=parseInt(origin.css("top").split("px")[0]) + origin.height()/2;

			$("body").bind("mousemove",function(e){
				var line = $("#"+_newLineID);
				line.hide();
				GenerateLine(line,_newLineL,_newLineT,e.pageX,e.pageY)
				line.show();
			});
			o.data("CreateRelationship",ui.selected.id)
		}
		else if(o && o.data("CreateRelationship") && o.data("CreateRelationship")!="_start_")
		{
			var create = _createRelation(o.data("CreateRelationship"),ui.selected.id,_newLineID);
			if (create)
			{
				Redraw(_newLineID);

				_newLineID = _getNewLineID();
				_createLine(_newLineID);

				var origin=$(ui.selected);
				_newLineL=parseInt(origin.css("left").split("px")[0]) + origin.width()/2;
				_newLineT=parseInt(origin.css("top").split("px")[0]) + origin.height()/2;
				o.data("CreateRelationship",ui.selected.id)
			}
			else
			{
				$("#"+_newLineID).remove();
				$("body").unbind("mousemove");
				o.removeData("CreateRelationship");
			}
		}

		NodeSelected(ui.selected.id.substring(2));
	}

	this.GetNewLineID=_getNewLineID;
	function _getNewLineID()
	{
		var prefix = "4_line";
		var i = 1;
		while($('#'+prefix+i.toString()).is('line'))
		{
			i++;
		}
		return prefix+i.toString();
	}

	var Redraw=function(line)
	{
		var div=$('#divNodeRrelationship');
		if(div.is('div'))
		{
			var inputs=div.find('input');
			for(var i=0;i<inputs.length;i++)
			{
				if($(inputs[i]).attr("line")==line)
				{
					redrawLine($(inputs[i]).attr("sour"),$(inputs[i]).attr("targ"),$(inputs[i]).attr("line"));
					return;
				}
			}
		}
	}

	//取得页面上的节点和关系，组成JSON
	this.GetJSONData=function()
	{
		var json = '';

		//生成节点的相关数据
		json += 'node:[';
		var nodes = $(".startNode,.endNode,.node");
		if (nodes.length>0)
		{
			for (var i=0; i<nodes.length; i++)
			{
				json += '{id:"'+nodes[i].id.substring(2)+'",left:'+$(nodes[i]).css("left").split("px")[0]+',top:'+$(nodes[i]).css("top").split("px")[0]+'},';
			}
			json = json.substring(0,json.length-1);
		}
		json += ']';

		//生成关系的相关数据
		json += ',line:[';
		var lines = $('#divNodeRrelationship').find('input');
		if (lines.length>0)
		{
			for (var i=0; i<lines.length; i++)
			{
				json += '{sour:"'+$(lines[i]).attr("sour").substring(2)+'",targ:"'+$(lines[i]).attr("targ").substring(2)+'"},';
			}
			json = json.substring(0,json.length-1);
		}
		json += ']';

		return eval('({' + json + '})');
	}

	this.EditNode=_editNode;
	function _editNode(id,desc)
	{
		$('#2_'+id).html('<span class="nodeDes">'+(desc?desc:"")+'</span>');
	}

	this.DeleteNode=_deleteNode;
	function _deleteNode(id)
	{
		var lines = $('#divNodeRrelationship').find('input');
		for (var i=0; i<lines.length; i++)
		{
			if ($(lines[i]).attr("sour")==id)
				_deleteLine($(lines[i]).attr("line"));
			else if ($(lines[i]).attr("targ")==id)
				_deleteLine($(lines[i]).attr("line"));
		}
		$("#"+id).remove();
	}

	this.DeleteLine=_deleteLine;
	function _deleteLine(id)
	{
		var lines = $('#divNodeRrelationship').find('input');
		for (var i=0; i<lines.length; i++)
		{
			if ($(lines[i]).attr("line")==id)
			{
				$(lines[i]).remove();
				$("#"+id).remove();
				return;
			}
		}
	}

	function nodeDrag(nodeId)
	{
		var relations = $("#divNodeRrelationship > input").each(function()
		{
			redrawLine($(this).attr("sour"),$(this).attr("targ"),$(this).attr("line"));
		});
	}

	function redrawLine(originId, targetId, lineId)
	{
		var origin=$("#"+originId);
		var target=$("#"+targetId);
		var line=$("#"+lineId);
		line.hide();

		//线的源头坐标
		var beginL = parseInt(origin.css("left").split("px")[0]) + origin.width()/2;
		var beginT = parseInt(origin.css("top").split("px")[0]) + origin.height()/2;
		//线的目标坐标
		var endL = parseInt(target.css("left").split("px")[0]);
		var endT = parseInt(target.css("top").split("px")[0]);

		//调整线的目标坐标
		if(beginT<endT) //源在目标的上部
		{
			if (Math.abs(beginL-endL) > Math.abs(beginT-endT) && beginL < endL) //源在目标的上部偏左
			{
				endT = endT + target.height()/2;
			}
			else if (Math.abs(beginL-endL) > Math.abs(beginT-endT) && beginL > endL) //源在目标的上部偏右
			{
				endL = endL + target.width();
				endT = endT + target.height()/2;
			}
			else //源在目标的上部中间
			{
				endL = endL + target.width()/2;
			}
		}
		else //源在目标的下部
		{
			if (Math.abs(beginL-endL) > Math.abs(beginT-endT) && beginL < endL) //源在目标的下部偏左
			{
				endT = endT + target.height()/2;
			}
			else if (Math.abs(beginL-endL) > Math.abs(beginT-endT) && beginL > endL) //源在目标的下部偏右
			{
				endL = endL + target.width();
				endT = endT + target.height()/2;
			}
			else //源在目标的下部中间
			{
				endL = endL + target.width()/2;
				endT = endT + target.height();
			}
		}

		GenerateLine(line,beginL,beginT,endL,endT);

		line.show();
	}

	function GenerateLine(line,beginL,beginT,endL,endT)
	{
		//定位线的区域
		line.css("left",Math.min(beginL, endL));
		line.css("top",beginT);

		//定位线的起始点坐标
		line.attr("from",Math.max(beginL-endL, 0).toString() + ",0");
		line.attr("to",Math.max(endL-beginL, 0).toString() + "," + (endT-beginT).toString());
	}
}
