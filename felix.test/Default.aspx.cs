using System;
using System.Configuration;
using System.Data;
//using HY.Business.Cache.Session;
 
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Web;
 
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
                ////限制恶意试密码
                //if (CheckLoginState("1", txtAccount.Text.Trim()))
                //{
                //    //初始化session，并跳转到指定页面
                //    SetSession();
                //    Response.Redirect(Server.UrlDecode(this._target), false);
                //}
                //else
                //{
                //    //跳转到错误页面
                //    HttpContext.Current.Session.Clear();
                //    Response.Redirect("error.html");
                //}
                //初始化session，并跳转到指定页面
                SetSession();
                Response.Redirect(Server.UrlDecode(this._target), false);
            }
            else
            {
                ////验证失败
                ////限制恶意试密码
                //if (!CheckLoginState("0", txtAccount.Text.Trim()))
                //{
                //跳转到错误页面
                //HttpContext.Current.Session.Clear();
                //Response.Redirect("error.html");
                //}
            }
        }
        catch
        { }
    }

    /// <summary>
    /// 限制恶意试密码
    /// </summary>
    /// <returns></returns>
    private bool CheckLoginState(string state, string username)
    {
        try
        {
            //List<ParameterInfo> pList = new List<ParameterInfo>();
            //pList.Add(new ParameterInfo() { ParameterName = "username", Direction = ParameterDirection.Input, Value = username, dbType = DbType.String });
            //pList.Add(new ParameterInfo() { ParameterName = "state", Direction = ParameterDirection.Input, Value = state, dbType = DbType.String });

            //DataTable dtUser = DBAccess.ExecuteDataTable("Sys_SetLoginLog", pList, CommandType.StoredProcedure);
            //if (dtUser != null && dtUser.Rows.Count > 0 && dtUser.Rows[0][0].ToString() == "-1")
            //{
            //    //验证失败 登录次数连续 大于 5次 在停用时间内
            //    return false;
            //}
            //else
            //{
                return true;
            //}
        }
        catch
        {
            return true;
        }
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

            return true;

            //SystemManager sm = new SystemManager();
            //if (sm.ValidateLogin(account, txtPwd.Text.Trim()))
            //{

            //    SetSession();
            //    //记录操作日志
            //    //AddSysOperateLog(Server.UrlDecode(HYSession.WebUserName), "访问", "登录", this.GetType().Name, "ValidateLogin");
            //    return true;

            //}
            //else
            //{
            //    if (account == "" && txtPwd.Text.Trim() == "")
            //    {
            //        //ClientScript.RegisterStartupScript(this.GetType(), "empty", "<script type='text/javascript'>alert('用户名不能为空！');</script>");
            //        Label1.Text = "用户名不能为空！";
            //    }
            //    else
            //    {
            //        //ClientScript.RegisterStartupScript(this.GetType(), "window", "<script type='text/javascript'>alert('请输入正确的用户名或密码！');</script>");
            //        Label1.Text = "请输入正确的用户名或密码！";
            //        //HYSession.Clear();
            //    }
            //    return false;
            //}


        }
        catch (Exception ex)
        {
            //ClientScript.RegisterStartupScript(this.GetType(), "error", "<script type='text/javascript'>alert('" + ex.Message + "！');</script>");
            Label1.Text = "登陆失败";
            return false;
        }
    }
    private void SetSession()
    {
        #region 注释
        //List<ParameterInfo> pList = new List<ParameterInfo>();
        //pList.Add(new ParameterInfo() { ParameterName = "UserAccount", Direction = ParameterDirection.Input, Value = txtAccount.Text.Trim(), dbType = DbType.String });

        //DataTable dtUser = DBAccess.ExecuteDataTable("Sys_GetUserInfo", pList, CommandType.StoredProcedure);
        //if (dtUser != null && dtUser.Rows.Count > 0)
        //{
        //    DataRow dr = dtUser.Rows[0];
        //    HYSession.WebUserID = Convert.ToString(dr["ID"]);
        //    HYSession.WebUserAccount = Convert.ToString(dr["UserAccount"]);
        //    HYSession.WebUserName = Server.UrlEncode(Convert.ToString(dr["UserName"]));
        //    HYSession.ManageUnit = Server.UrlEncode(Convert.ToString(dr["ManageUnit"]));
        //    HYSession.DepID = Server.UrlEncode(Convert.ToString(dr["Department"]));

        //}
        //else
        //{
        //    throw new Exception("");
        //}
        #endregion

        //HYSession.WebUserID = "49963349-1359-4AB0-9FF9-AB27FFF80C16";
        //HYSession.WebUserAccount = "682995403";
        //HYSession.WebUserName = Server.UrlEncode("可成科技（宿迁）有限公司");
        //HYSession.ManageUnit = "";
        //HYSession.DepID = "";
    }


}
