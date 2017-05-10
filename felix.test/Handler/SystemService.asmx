<%@ WebService Language="C#" Class="SystemService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
[System.Web.Script.Services.ScriptService]
public class SystemService : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string CheckSession()
    {
        try
        {
            if (string.IsNullOrEmpty(HY.Business.Cache.Session.HYSession.WebUserID.ToString()))
            {
                return "0";
            }
            else
                return "1";
        }
        catch
        {
            return "0";
        }
    }

    [WebMethod(EnableSession = true)]
    public string GetTicket()
    {
        try
        {
            if (string.IsNullOrEmpty(HY.Business.Cache.Session.HYSession.WebUserID.ToString()))
            {
                return "";
            }
            else
                return HY.Business.Cache.Session.HYSession.WebUserID.ToString();
        }
        catch
        {
            return "-1";
        }
    }
    
    [WebMethod(EnableSession = true)]
    public string CheckRole()
    {
        try
        {
            if (string.IsNullOrEmpty(HY.Business.Cache.Session.HYSession.WebUserID)
                //|| HY.Business.Cache.Session.HYSession.WebUserID.Length < 10
                )
            {
                return "0";
            }
            else
            {

                return "1";
            }
        }
        catch
        {
            return "0";
        }
    }
}