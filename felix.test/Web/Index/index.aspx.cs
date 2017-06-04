using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HY.Business.Cache.Session;

namespace test.Web.index
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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
}