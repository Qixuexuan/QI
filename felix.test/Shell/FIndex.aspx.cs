using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using HY.Business.Cache.Session;

using System.Text;
using System.Configuration;
using System.Net;
using System.IO;
using Newtonsoft.Json;
public partial class Shell_FIndex : Page
{
    public string userid = string.Empty;
    public string username = string.Empty;
    public string psd = string.Empty;
    public string ComOrAJ = string.Empty;

    #region OnInitComplete
    /// <summary>
    /// 在页初始化后引发 System.Web.UI.Page.InitComplete 事件。
    /// </summary>
    /// <param name="e">包含事件数据的 System.EventArgs。</param>
    protected override void OnInitComplete(EventArgs e)
    {
        base.OnInitComplete(e);
    }
    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!string.IsNullOrEmpty(HYSession.WebUserID))
        {
            showData();
        }
    }

    private void showData()
    {
        StreamReader reader = null;
        try
        {
            WebClient client = new WebClient();
            string url = ConfigurationManager.AppSettings["serverUrl"] + "Account/Menu";
            client.Headers.Add("authorization", HYSession.WebUserID);
            Stream data = client.OpenRead(url);

            reader = new StreamReader(data, Encoding.UTF8);
            string responseJson = reader.ReadToEnd();
            Dictionary<string, dynamic> dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(responseJson);
            Newtonsoft.Json.Linq.JArray al = dic["Data"] as Newtonsoft.Json.Linq.JArray;
            string rs = JsonConvert.SerializeObject(al);

            string treeNodes = @" var zNodes = " + rs;
            MenuUserName.InnerText = Server.UrlDecode(HYSession.WebUserName);
            this.ClientScript.RegisterStartupScript(this.GetType(),
                   "msg",
                   treeNodes,
                   true);
        }
        catch
        {

        }
        finally
        {
            try
            {
                if (reader != null)
                {
                    reader.Close();
                }
            }
            catch
            { }
        }

    }

    /// <summary>
    /// 退出系统 清空session和cookie
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void nav_exit_Click(object sender, EventArgs e)
    {
        try
        {
            HYSession.Clear();
            HttpContext.Current.Request.Cookies.Clear();
            HttpContext.Current.Response.Cookies.Clear();
            Response.Redirect("../default.aspx");
        }
        catch
        {

        }
    }
}
