using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text.RegularExpressions;
using System.Web.UI.HtmlControls;
 

/// <summary>
///Common 的摘要说明
/// </summary>
public class Common
{
    public static string GetRequestValue(string Key)
    {
        Page page = (Page)HttpContext.Current.Handler;

        if (page.Request.QueryString[Key] != null)
            return page.Request.QueryString[Key];

        return string.Empty;
    }

    public static string GetRequestValue2(string Key)
    {
        if (HttpContext.Current.Request.QueryString[Key] != null)
            return HttpContext.Current.Request.QueryString[Key];

        return string.Empty;
    }

    /// <summary>
    /// 获取POST的Form 参数
    /// </summary>
    /// <param name="context"></param>
    /// <param name="name"></param>
    /// <returns></returns>
    public static string Request_GetFormParam(HttpContext context, string name)
    {
        if (context == null)
            return "";
        try
        {
            if (context.Request.Form[name] != null)
            {
                return context.Request.Form[name].ToString();
            }
            else
                return "-1";
        }
        catch
        {
            return "-1";
        }
    }

    public static void ShowErrMsg(string Msg)
    {
        Page page = (Page)HttpContext.Current.Handler;
        page.Response.Write(Msg);
    }

    /// <summary>
    /// aa={(id)}   用数据源替换 aa=111
    /// </summary>
    /// <param name="str"></param>
    /// <param name="dr"></param>
    /// <returns></returns>
    public static string ReplaceComplexString(string str, DataRow dr)
    {
        string REG_EX = "{((.*?))}";
        Regex regex = new Regex(REG_EX, RegexOptions.Singleline | RegexOptions.IgnoreCase);
        Match m = regex.Match(str);
        while (m.Success)
        {
            int index = m.Groups[0].Index;
            int length = m.Groups[0].Value.Length;
            string val = m.Groups[0].Value.Substring(2, length - 4);

            //删除原有
            str = str.Remove(index, length);
            str = str.Insert(index, dr[val].ToString());

            m = m.NextMatch();
        }

        return str;
    }
     

    /// <summary>
    /// 从 context 中获取 查询分页列表 所依赖的 参数
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static Dictionary<string, string> GetDicFromContextForList(HttpContext context)
    {
        try
        {
            #region 获取参数
            string param = Common.Request_GetFormParam(context, "queryCondition");
            string pageNumber = Common.Request_GetFormParam(context, "PageNumber");
            string pageSize = Common.Request_GetFormParam(context, "PageSize");
            string sort = Common.Request_GetFormParam(context, "Sort");
            string order = Common.Request_GetFormParam(context, "Order");
            string userid = Common.Request_GetFormParam(context, "userCode");
            #endregion
            sort = (sort == "-1" ? "" : sort);
            order = (order == "-1" ? "" : order);

            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("param", param);
            dic.Add("pageIndex", pageNumber);
            dic.Add("pageSize", pageSize);
            dic.Add("sort", sort);
            dic.Add("order", order);
            dic.Add("userid", userid);

            return dic;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// 格式化输出 固定格式 json,供silverlight 气泡使用
    /// </summary>
    /// <param name="dt_View"></param>
    /// <returns></returns>
    public static string GetJsonFromDT(DataTable dt_View)
    {
        try
        {
            #region
            string s1 = "[";
            foreach (DataRow dr in dt_View.Rows)
            {
                JsonInfo ji = new JsonInfo();
                JsonInfo jiAttribute = new JsonInfo();
                foreach (DataColumn dc in dt_View.Columns)
                {
                    if ("id,name,shape,tablename,info_url,type".Contains(dc.ColumnName))
                    {
                        ji.Add(dc.ColumnName, dr[dc.ColumnName].ToString());
                    }
                    else
                    {
                        jiAttribute.Add(dc.ColumnName, dr[dc.ColumnName].ToString());
                    }
                }

                ji.Add("attribute", jiAttribute.ToString());
                ji.Add("showlist", "");
                ji.Add("querylist", "");
                s1 += ji.ToString() + ",";
            }
            if (!s1.Equals("["))
                s1 = s1.Substring(0, s1.Length - 1);
            s1 += "]";
            #endregion

            return s1;
        }
        catch
        {
            return "";
        }
    }
}
