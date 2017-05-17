using System;
using System.Configuration;
using System.Data;
//using HY.Business.Cache.Session;

using System.Data.SqlClient;
using System.Collections.Generic;
using System.Web;
using HY.Business.Cache.Session;
using System.Net;
using Newtonsoft.Json;
using System.Text;
using System.IO;

public partial class Default : System.Web.UI.Page
{
    private string _target = "Shell/" + ConfigurationManager.AppSettings["FirstPage"];

    protected void Page_Load(object sender, EventArgs e)
    {
        //HYSession.Clear(); 
        if (!IsPostBack)
        {
            SetFocus(txtAccount);
        }
    }

    /// <summary>
    /// 用户登录
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        try
        {
            if (ValidateLogin())    //验证通过
            {
                Response.Redirect(Server.UrlDecode(this._target), false);
            }
        }
        catch
        { Label1.Text = "登陆失败"; }
    }

    private bool ValidateLogin()
    {
        try
        {
            //if (!string.IsNullOrEmpty(HYSession.WebUserName))
            //{
            //    Label1.Text = "该浏览器禁止同时登录多个用户！";
            //    return false;
            //} 
            string account = txtAccount.Text.Trim();
            string pwd = txtPwd.Text.Trim();

            WebClient client = new WebClient();
            string url = ConfigurationManager.AppSettings["serverUrl"] + "Account/ValidateLogin/" + account + "/" + pwd;
            client.Headers.Add("authorization", "1");
            Stream data = client.OpenRead(url);
            StreamReader reader = null;
            try
            {
                reader = new StreamReader(data, Encoding.UTF8);
                string responseJson = reader.ReadToEnd();
                Dictionary<string, dynamic> dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(responseJson);
                Newtonsoft.Json.Linq.JArray al = dic["Data"] as Newtonsoft.Json.Linq.JArray;

                string rs = JsonConvert.SerializeObject(al);
                List<Dictionary<string, string>> list_Accont = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(rs);
                if (list_Accont == null || list_Accont.Count == 0)
                {
                    Label1.Text = "登陆失败";
                    return false;
                }
                else
                {
                    HYSession.WebUserID = list_Accont[0]["userguid"].ToString();
                    HYSession.WebUserAccount = list_Accont[0]["useraccount"].ToString();
                    HYSession.WebUserName = Server.UrlEncode(list_Accont[0]["realname"].ToString());
                    HYSession.ManageUnit = "";
                    HYSession.DepID = list_Accont[0]["department"].ToString();
                    return true;
                }

            }
            catch
            {
                Label1.Text = "登陆失败";
                return false;
            }
        }
        catch (Exception ex)
        {
            //ClientScript.RegisterStartupScript(this.GetType(), "error", "<script type='text/javascript'>alert('" + ex.Message + "！');</script>");
            Label1.Text = "登陆失败";
            return false;
        }
    }

}
