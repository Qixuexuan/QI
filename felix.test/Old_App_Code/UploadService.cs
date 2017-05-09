using Leon.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Xml.Linq;

/// <summary>
/// UploadService 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
// [System.Web.Script.Services.ScriptService]
public class UploadService : System.Web.Services.WebService
{

    public UploadService()
    {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string UpdateFile(string msg)
    {

        string xml = msg;
        //xml = msg;

        XElement xEle = null;
        try
        {
            //SaveMsgFile(msg);
            //xml = FileStreamReadFile(@"E:\test\20150508170657.txt");

            xEle = XElement.Parse(xml, LoadOptions.None);

            XElement fileAreaEle = xEle.Element("FileData");
            if (fileAreaEle != null)
            {
                string _saveFilePath = "";

                foreach (XElement ele in fileAreaEle.Elements("File"))
                {
                    if (ele != null)
                    {
                        string filename = ele.Element("FileName") == null ? "" : ele.Element("FileName").Value;
                        string fileType = ele.Element("ContentType") == null ? "" : ele.Element("ContentType").Value;
                        string fileContent = ele.Element("Content") == null ? "" : ele.Element("Content").Value;
                        SaveFile(filename, fileType, fileContent, _saveFilePath);
                    }
                }

            }
            return "1";
        }
        catch
        {
            return "-1";

        }


    }

    private string GetPath(string tablename, string mainid, string wfType, string cmdid)
    {
        try
        {
            string strSQL = string.Format("EXEC UP_GetFilePathNew '{0}', '{1}','{2}','{3}'",
                tablename, mainid, wfType, cmdid);

            DataTable dt = DBAccess.ExecuteDataTable(strSQL);
            if (dt != null && dt.Rows.Count > 0)
            {
                DataRow dr = dt.Rows[0];
                return dr[0].ToString();
            }
            else
            {
                return "";
            }
        }
        catch
        {
            return "";
        }
    }

    private void SaveFile(string fileName, string FileType, string fileContent, string filePath)
    {
        try
        {
            byte[] buffer = Convert.FromBase64String(fileContent);

            string _filePath = Server.MapPath("~/" + filePath);
            if (!Directory.Exists(_filePath))
            {
                Directory.CreateDirectory(_filePath);
            }

            FileStream fs = new FileStream(_filePath + fileName + "." + FileType, FileMode.OpenOrCreate, FileAccess.Write);
            BinaryWriter w = new BinaryWriter(fs);
            w.Write(buffer);
            w.Flush();
            fs.Close();

            //return filePath;
        }
        catch
        { }
    }
}
