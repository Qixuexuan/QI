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
        //if (string.IsNullOrEmpty(HYSession.WebUserID))
        //{
        //    Response.Redirect("../default.aspx");
        //}
        //else
        //{
        //    if (!IsPostBack)
        //    {
        //        MenuUserName.Attributes["title"] = Server.UrlDecode(HYSession.WebUserName);
        //        MenuUserName.InnerText = Server.UrlDecode(HYSession.WebUserName);

        //        txtUserID.Text = Server.UrlDecode(HYSession.WebUserName);
        //        txtAppid.Text = ConfigurationManager.AppSettings["appID"];
        //        txtServerUrl.Text = ConfigurationManager.AppSettings["serverUrl"];
        //        userid = HYSession.WebUserID;
        //        showData(); 
        //    }
        //    username = HYSession.WebUserAccount;
             
        //}
    }
     
    private void showData()
    {
        //string strSQL = string.Format("EXEC UP_HY_Menu_GET '{0}', '{1}'", HYSession.WebUserAccount, ConfigurationManager.AppSettings["appID"]);

        //DataTable dt = DBAccess.ExecuteDataTable(strSQL, "DataCenter");
        //int cnt = 0;
        //string treeNodes = @" var zNodes = [";
        //foreach (DataRow dr in dt.Rows)
        //{
        //    string strNode = string.Empty;
        //    if (cnt == 0)
        //    {
        //        strNode = string.Format(@" id:'{0}',pId:'{1}',name:'{2}',targetURL:'{3}',iconSkin:'{4}', JQKey:'{5}', IsThird:'{6}',open:true", dr["id"], dr["ParentID"], dr["CName"], dr["TargetURL"], dr["Icon"], dr["JQKey"], dr["IsThird"]);
        //    }
        //    else
        //    {
        //        strNode = string.Format(@" id:'{0}',pId:'{1}',name:'{2}',targetURL:'{3}',iconSkin:'{4}', JQKey:'{5}', IsThird:'{6}'", dr["id"], dr["ParentID"], dr["CName"], dr["TargetURL"], dr["Icon"], dr["JQKey"], dr["IsThird"]);
        //    }
        //    cnt++;
        //    treeNodes += "{" + strNode + "},";
        //}
        //treeNodes = treeNodes.TrimEnd(',');
        //treeNodes += "];";

        //string loginUser = "var loginUser = {\"uid\":\" " + HYSession.WebUserID + " \",\"user_id\":\" " + Server.UrlDecode(HYSession.WebUserAccount) + " \",\"user_name\":\" " + Server.UrlDecode(HYSession.WebUserName) + " \"};\r\n";
        //string oa_Time = string.Format("var OA_TIME = new Date({0},{1},{2},{3},{4},{5});\r\n",
        //                               DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);

        //this.ClientScript.RegisterStartupScript(this.GetType(),
        //"msg",
        //treeNodes + loginUser + oa_Time,
        //true);
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
