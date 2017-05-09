using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Data;


/// <summary>
/// JSON帮助类 
/// </summary>
public class JsonHelper
{
    /// <summary> 
    /// 对象转JSON 
    /// </summary> 
    /// <param name="obj">对象</param> 
    /// <returns>JSON格式的字符串</returns> 
    public static string ObjectToJSON(object obj)
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();
        try
        {
            return jss.Serialize(obj);
        }
        catch (Exception ex)
        {
            throw new Exception("JSONHelper.ObjectToJSON(): " + ex.Message);
        }
    }

    /// <summary> 
    /// 数据表转键值对集合 www.2cto.com  
    /// 把DataTable转成 List集合, 存每一行 
    /// 集合中放的是键值对字典,存每一列 
    /// </summary> 
    /// <param name="dt">数据表</param> 
    /// <returns>哈希表数组</returns> 
    public static List<Dictionary<string, object>> DataTableToList(DataTable dt)
    {
        List<Dictionary<string, object>> list
             = new List<Dictionary<string, object>>();

        foreach (DataRow dr in dt.Rows)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            foreach (DataColumn dc in dt.Columns)
            {
                dic.Add(dc.ColumnName, dr[dc.ColumnName]);
            }
            list.Add(dic);
        }
        return list;
    }

    /// <summary> 
    /// 数据集转键值对数组字典 
    /// </summary> 
    /// <param name="dataSet">数据集</param> 
    /// <returns>键值对数组字典</returns> 
    public static Dictionary<string, List<Dictionary<string, object>>> DataSetToDic(DataSet ds)
    {
        Dictionary<string, List<Dictionary<string, object>>> result = new Dictionary<string, List<Dictionary<string, object>>>();

        foreach (DataTable dt in ds.Tables)
            result.Add(dt.TableName, DataTableToList(dt));

        return result;
    }

    /// <summary> 
    /// 数据表转JSON 
    /// </summary> 
    /// <param name="dataTable">数据表</param> 
    /// <returns>JSON字符串</returns> 
    public static string DataTableToJSON(DataTable dt)
    {
        return ObjectToJSON(DataTableToList(dt));
    }

    /// <summary> 
    /// JSON文本转对象,泛型方法 
    /// </summary> 
    /// <typeparam name="T">类型</typeparam> 
    /// <param name="jsonText">JSON文本</param> 
    /// <returns>指定类型的对象</returns> 
    public static T JSONToObject<T>(string jsonText)
    {
        JavaScriptSerializer jss = new JavaScriptSerializer();
        try
        {
            return jss.Deserialize<T>(jsonText);
        }
        catch (Exception ex)
        {
            throw new Exception("JSONHelper.JSONToObject(): " + ex.Message);
        }
    }

    /// <summary> 
    /// 将JSON文本转换为数据表数据 
    /// </summary> 
    /// <param name="jsonText">JSON文本</param> 
    /// <returns>数据表字典</returns> 
    public static Dictionary<string, List<Dictionary<string, object>>> TablesDataFromJSON(string jsonText)
    {
        return JSONToObject<Dictionary<string, List<Dictionary<string, object>>>>(jsonText);
    }

    /// <summary> 
    /// 将JSON文本转换成数据行 
    /// </summary> 
    /// <param name="jsonText">JSON文本</param> 
    /// <returns>数据行的字典</returns> 
    public static Dictionary<string, object> DataRowFromJSON(string jsonText)
    {
        return JSONToObject<Dictionary<string, object>>(jsonText);
    }

    public static string DTToJson(DataTable dt)
    {
        if (dt.Rows.Count == 0)
        {
            return "[]";
        }
        string str = "[";
        foreach (DataRow row in dt.Rows)
        {
            JsonInfo info = new JsonInfo();
            foreach (DataColumn column in dt.Columns)
            {
                info.Add(column.ColumnName, row[column].ToString());
            }
            str = str + info.ToString() + ",";
        }
        return (str.Substring(0, str.Length - 1) + "]");
    }
    public static string DataRowToJson(DataTable dt)
    {
        if (dt.Rows.Count == 0)
        {
            return "[]";
        }
        string str = "";
        DataRow row = dt.Rows[0];
        JsonInfo info = new JsonInfo();
        foreach (DataColumn column in dt.Columns)
        {
            info.Add(column.ColumnName, row[column].ToString());
        }
        return (str + info.ToString());
    }

    /// <summary>
    /// 获取datatables 请求的 参数值
    /// </summary>
    /// <param name="pName"></param>
    /// <param name="obj"></param>
    /// <returns></returns>
    public static string GetParamsFromAoData(string pName,object obj)
    {
        try
        {
            object[] objArr = obj as object[];
            foreach (object o in objArr)
            {
                Dictionary<string, object> dic = o as Dictionary<string, object>;
                if (dic["name"].ToString() == pName)
                {
                    return dic["value"].ToString();
                }
            }
            return "";

        }
        catch
        {
            return "";
        }
    }
 

 

 

}
