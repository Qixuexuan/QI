using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class TreeStruct
{
	private string _id = string.Empty;
	public string id
	{
		get { return _id; }
		set { _id = value; }
	}

	private string _value = string.Empty;
	public string value
	{
		get { return _value; }
		set { _value = value; }
	}

	private string _label = string.Empty;
	public string label
	{
		get { return _label; }
		set { _label = value; }
	}

	private string _filename = string.Empty;
	public string filename
	{
		get { return _filename; }
		set { _filename = value; }
	}

	private string _xmlid = string.Empty;
	public string xmlid
	{
		get { return _xmlid; }
		set { _xmlid = value; }
	}

    private string _filter = string.Empty;
    public string filter
	{
        get { return _filter; }
		set { _filter = value; }
	}

    private string _layerIndex = string.Empty;
    public string layerIndex
	{
        get { return _layerIndex; }
        set { _layerIndex = value; }
	}

    private string _Category = string.Empty;
     public string Category
	{
        get { return _Category; }
        set { _Category = value; }
	}

     private string _TokenName = string.Empty;
     public string TokenName
     {
         get { return _TokenName; }
         set { _TokenName = value; }
     }

     private string _alpha = string.Empty;
     public string Alpha
     {
         get { return _alpha; }
         set { _alpha = value; }
     }
     private string _url = string.Empty;
     public string Url
     {
         get { return _url; }
         set { _url = value; }
     }
}
