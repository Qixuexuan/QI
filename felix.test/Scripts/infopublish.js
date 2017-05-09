

$(document).ready(function ()
{
    var id = getQueryString("id");
    $.post("../../Handler/InfoHandler.ashx?type=articleinfo", { "id": id }, function (data)
    {
        var json = eval(data);

        var html = '<table style="width: 96%; border: 0px;" align="center" cellpadding="2" cellspacing="8">';
        html += '<tr> <td class="td-title" > ';
        html += json[0].Info_title + ' </td>';
        html += ' </tr><tr>  <td align="center" class="td-title2">';

        //html += '  2015/9/29 17:01:35   来源：本站   作者：管理员   人气：215次';
        html += '发布时期：' + json[0].Pub_date + '&nbsp;&nbsp; 作者：' + json[0].Pub_Author;
        html += '   </td>  </tr> <tr> <td style="text-indent: 18pt;">';
        html += json[0].infoContent;
        html += '</td>  </tr> </table>';

        $(".divContent").html(html);

    }, "json");

});
