using System.Collections.Generic;

public class JSON
{
	private List<KeyValuePair<string, string>> _sDic;

	public JSON()
	{
		this._sDic = new List<KeyValuePair<string, string>>();
	}

	public void Add(string key, string value)
	{
		this._sDic.Add(new KeyValuePair<string, string>(key, value));
	}
	//public void Remove(string key)
	//{
	//    this._sDic.Remove(key);
	//}

	public override string ToString()
	{
		string json = string.Empty;

		foreach (KeyValuePair<string, string> s in this._sDic)
		{
			json += string.Format("\"{0}\":\"{1}\",", s.Key, s.Value);
			//}
			//else if (vdic.Value is List<JSON>)
			//{
			//    string array = string.Empty;
			//    foreach (JSON subJson in (List<JSON>)vdic.Value)
			//    {
			//        array += subJson.ToString() + ",";
			//    }
			//    str += string.Format("\"{0}\":{1},", vdic.Key, "[" + array.Trim(',') + "]");
			//}
		}

		return "{" + json.Trim(',')+ "}";
	}
}