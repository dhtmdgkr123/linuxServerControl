Linux server control
=
[![StyleCI](https://github.styleci.io/repos/118418973/shield?branch=master)](https://github.styleci.io/repos/118418973)
+ Control MySqlServer
+ Control Apache2
+ Control NGINX
+ Control Server Power
+ Control Shell Commad
+ View Server Status


Install Dependency
=
```bash
$ apt-get -y install redis-server # require
$ apt-get -y install php-redis    # require
$ apt-get -y install bc           # require
$ apt-get -y install sysstat      # require
$ systemctl restart php7.X-fpm    # after install php-redis
# if ubuntu version == 14 and php version == 5
$ apt-get -y install libssh2-php
# else if ubuntu version > 17 and php version>7
$ apt-get -y install php-ssh2
```
<h1 >Warning</h1>
If you want to use this package <br>
please Clean up WAS root folder


Installation
=
```bash
$ cd WAS root down level folder 
$ rm -rf $(pwd)/{,.[!.],..?}*   # clean up all of with hidden file
# Please Check your working Directory
$ git clone https://github.com/dhtmdgkr123/linuxServerControl.git .
```


Usage
=

<h2>Change Log</h2>

>><h4>Version 1.0.0</h5>

>>1. Start, Restart and shutdown Apache2 or NGINX WebServer<br />
>>1. Start, Restart and shutdown MySQL DataBase Server<br />
>>1. Restart and shutdown Server Power!<br />
>>1. Can use Linux command on all of web application  <br />
>>1. Realtime view CPU, Memory, Disk usage <br />
>>1. View individual of disk usage and information <br />

>><h4>Version 1.0.1</h4>
>>1. Resolve Path issue<br />
>>1. Improve backend logic<br />

>><h4>Version 1.0.1.1</h4>
>>1. Resolve Path issue<br />
>>1. Not allow duplicate submit at all of function<br />

>><h4>Version 1.0.1.2</h4>
>>1. Resolve Path issue<br />
>>1. Adjust alert message in login page <br />

>><h4>Version 1.1.0</h4>
>>1. Add Codeigniter(with Composer)<br />
>>1. Add Password encrypt logic<br />
>>1. Add nginx Control pannel<br />
>>1. Add Secure Sturcture Folder<br />


TODO
=
- Add network Trafic Monitor
- Add Crontab control
- Add Hdd, Cpu Temperature Monitor
- Add Ftp Service

License
-
Apache-2.0.Copyright (c) osh12201@gmail.com

<h2>Thanks to<br />&emsp;&emsp;KST,&nbsp;HANDOO,&nbsp;BBANG_PD<br /><br /></h2>

<h2>Contact : osh12201@gmail.com</h2>   
