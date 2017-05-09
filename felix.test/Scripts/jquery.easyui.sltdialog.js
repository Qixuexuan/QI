function InitDialog(title, sltObj, sourceJson, selectedJson, callBack, callBack_Cancel)
{
    //var _obj = targetObj;

    //初始化界面布局
    var _html = "<div style='padding-top:2px;padding-left:2px;'>";
    //<input type='text' style='width:150px;height:15px;'/>搜索</div>
    _html += "<table><tr><td style='border:1px solid #ccc;width:200px; vertical-align:top;overflow:auto; '>";
    _html += "<div style='overflow:auto;height:215px;'><table id='dlg-table-left'><tr><th></th><th style='display:none'></th></tr></table></div>";
    _html += "</td><td style='width:20px;'><div id='slt-right' class='slt-right'>-></div><br/><div id='slt-left'  class='slt-left'><-</div></td>";
    _html += "<td style='border:1px solid #ccc;width:200px;height:215px; vertical-align:top; overflow:auto;'>";
    _html += "<div style='overflow:auto;height:215px;'><table id='dlg-table-right' ><tr><th></th><th  style='display:none'></th></tr></table></div></td></tr></table>";

    sltObj.empty().html(_html);
    //
    $("#dlg-table-left").css({ "width": "100%", "overflow-y": "auto" });
    $("#dlg-table-right").css({ "width": "100%", "overflow-y": "auto" });

    //过滤已经选中的项
    var _sourceJson = [];
    $.each(sourceJson, function (i)
    {
        if (selectedJson == null || selectedJson == "" || selectedJson == undefined || selectedJson.length == 0)
        {
            _sourceJson = sourceJson;
        }
        else
        {
            var mark = true;
            //判断是否已经选中
            $.each(selectedJson, function (idx)
            {
                //alert(JSON.stringify(selectedJson));
                if (selectedJson[idx].value == sourceJson[i].value)
                {
                    mark = false;
                }
            });
            if (mark)
                _sourceJson.push(sourceJson[i]);
        }
    });
    //alert(JSON.stringify(_sourceJson));
    //左边table 加载列表
    $.each(_sourceJson, function (idx)
    {
        $("#dlg-table-left tr:last").after("<tr><td class='dlg-table-row'>" + _sourceJson[idx].name + "</td><td style='display:none'>" + _sourceJson[idx].value + "</td></tr>");
    });

    //左边table 事件
    $("#dlg-table-left").on("click", "tr:gt(0)", function ()
    {
        $("#dlg-table-left tr:gt(0)").removeClass("selected");
        $(this).addClass("selected");
    });

    //右边table 事件
    $("#dlg-table-right").on("click", "tr:gt(0)", function ()
    {
        $("#dlg-table-right tr:gt(0)").removeClass("selected");
        $(this).addClass("selected");
    });

    //右移事件
    $("#slt-right").click(function ()
    {
        $("#dlg-table-left tr.selected").each(function ()
        {
            $(this).remove();

            $("#dlg-table-right tr:last").after("<tr><td class='dlg-table-row'>" + $(this).find("td:eq(0)").html() + "</td><td  style='display:none'>" + $(this).find("td:eq(1)").html() + "</td></tr>");
        });

    });

    //左移事件
    $("#slt-left").click(function ()
    {
        $("#dlg-table-right tr.selected").each(function ()
        {
            $(this).remove();
            $("#dlg-table-left tr:last").after("<tr><td class='dlg-table-row'>" + $(this).find("td:eq(0)").html() + "</td><td  style='display:none'>" + $(this).find("td:eq(1)").html() + "</td></tr>");
        });
    });

    //加载以选中的项

    $.each(selectedJson, function (idx)
    {
        $("#dlg-table-right tr:last").after("<tr><td class='dlg-table-row'>" + selectedJson[idx].name + "</td><td  style='display:none'>" + selectedJson[idx].value + "</td></tr>");
    });

    //打开
    sltObj.dialog({
        modal: true,
        title: title,
        iconCls: 'icon-save',
        resizable: false,
        buttons: [{
            text: '确定',
            //iconCls: 'icon-ok',
            handler: function ()
            {
                if ($("#dlg-table-right tr:gt(0)").length > 0)
                {
                    //获取选中的项
                    var _json = [];
                    $("#dlg-table-right tr:gt(0)").each(function ()
                    {
                        var _desc = $(this).find("td:eq(0)").html();
                        var _value = $(this).find("td:eq(1)").html();
                        _json.push({ "value": _value, "name": _desc });
                    });
                    //执行回调方法
                    callBack(_json);
                }
                else
                {
                    alert("请至少选择其中一项");
                }

            }
        }, {
            text: '取消',
            handler: function ()
            {
                callBack_Cancel();
            }
        }]
    }
    );
}

function InitDialog_Tree(title, treeObj, zNodes, callBack, callBack_Cancel)
{
    //var zNodes = eval(result);
    treeObj.html('<ul id="treeDemo" class="ztree"></ul>');
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    //打开
    treeObj.dialog({
        modal: true,
        title: title,
        iconCls: 'icon-save',
        resizable: false,
        buttons: [{
            text: '确定',
            //iconCls: 'icon-ok',
            handler: function ()
            {
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = treeObj.getSelectedNodes();
                if (nodes == null || nodes == undefined || nodes == "null" || nodes.length == 0)
                {
                    alert("请选择其中一项!");
                    return;
                }
                var treeNode = nodes[0];
                var t_code = treeNode.code;
                var t_name = treeNode.name;

                if (t_code == "")
                {
                    alert("请选择其中一项!");
                    return;
                }
                else
                {
                    var _json = { "code": t_code, "name": t_name };
                    callBack(_json);
                }


            }
        }, {
            text: '取消',
            handler: function ()
            {
                callBack_Cancel();
            }
        }]
    }
    );
}
