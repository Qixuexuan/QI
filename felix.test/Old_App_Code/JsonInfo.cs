using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;

/// <summary>
/// JsonInfo 的摘要说明
/// </summary>
public class JsonInfo
{
    private Dictionary<string, string> dic;
    private DataTable _dtKey;

    public JsonInfo()
    {
        dic = new Dictionary<string, string>();

        _dtKey = new DataTable();
        _dtKey.Columns.Add("key");
    }

    public void Add(string key, string value)
    {
        dic.Add(key, value);
    }

    public void AddNoMark(string key, object value)
    {
        dic.Add(key, value.ToString());

        DataRow dr = _dtKey.NewRow();
        dr["key"] = key;
        _dtKey.Rows.Add(dr);
    }

    public void Remove(string key)
    {
        dic.Remove(key);        
    }

    public void Clear()
    {
        dic.Clear();
    }

    public string ToString()
    {
        string str = string.Empty;
        string str2 = "userinfo, servicelist, attribute, showlist, querylist, tdc, tqp, tts, ds, sinfo, subclass, smallclass, largeclass, config, status, offline,";
        foreach (KeyValuePair<string, string> pair in this.dic)
        {
            if (this._dtKey.Select("key='" + pair.Key + "'").Length > 0)
            {
                str = str + string.Format("\"{0}\":{1},", pair.Key, pair.Value);
            }
            else if (str2.IndexOf(pair.Key.ToLower() + ",") > -1)
            {
                if (pair.Value != string.Empty)
                {
                    str = str + string.Format("\"{0}\":{1},", pair.Key, pair.Value);
                }
                else if (pair.Key != "Offline")
                {
                    str = str + string.Format("\"{0}\":{{}},", pair.Key);
                }
            }
            else
            {
                str = str + string.Format("\"{0}\":\"{1}\",", pair.Key, pair.Value);
            }
        }
        if (str.Length > 0)
        {
            str = str.Substring(0, str.Length - 1);
        }
        return ("{" + str + "}");
    }


  



}
