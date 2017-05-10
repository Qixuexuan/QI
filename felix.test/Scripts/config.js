function UrlRegEx(url)
{
    //如果加上/g参数，那么只返回$0匹配。也就是说arr.length = 0   
    var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
    //re.exec(url);   
    var arr = url.match(re);
    return arr;

}

function getIP()
{
    return UrlRegEx(location.href)[2];
}


var config_service_url = getIP() == "localhost" ? "http://pdm.sinno-tech.com:8889/" : ("http://" + getIP() + "/szdlserver/");