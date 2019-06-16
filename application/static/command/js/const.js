<<<<<<< HEAD
var savePwd = null;
var lastCommand = null;
const KEY_WORD = {
    sysCtl : 'systemctl',
    service: 'service',
    sysStatus: 'status',
    sysCtLIdx : -1,
    clr: 'clear',
    exec: 'execCommand',
    rebootMsg : 'isRebootMessage',
    shutdown : 'isShutDownMessage',
    notUsedCommand : 'canNotUsedCommand',
    buttonActied: 'buttonAction',
    sysIndex : 1,
    checkStatus: [true, 200, 'OK'],
    application : {
        apache : ['apache2','/etc/rc.d/init.d/httpd', 'apachectl','/apachectl', '/etc/init.d/apache2', '/etc/init.d/httpd'],
        nginx: ['/nginx/', '/nginx', '/etc/init.d/nginx'],
        mysql : ['/etc/init.d/mysql', '/etc/init.d/mysqld', 'mysql', 'mysqld'],
        server : 'server',
        user : 'user'
    },
    serviceType: ['nginx', 'mysql', 'httpd', 'apache2'],
    applicationAction : ['start', 'stop', 'reload', 'restart'],
    action : {
        start : 'start',
        stop  : 'stop',
        restart : 'restart',
        reload : 'reload' ,
        shutdown : 'shutdown',
        reboot : 'reboot',
        status : 'status',
        userComand : 'userCommand'
    },
    rebootCommand : ['shutdown -r now', 'init 6', 'reboot'],
    shutdownCommand: ['halt -p -f', 'halt', 'shutdown', 'shutdown -h now'],
    blockCommand: [
        'git', 'vi', 'vim',
        'apt-get', 'apt', 'nano',
        'more', 'wget', 'top'
    ]
};
const saveCommand = [];
let arrIdx = -1;





=======
var savePwd = null;
var lastCommand = null;
const KEY_WORD = {
    sysCtl : 'systemctl',
    service: 'service',
    sysStatus: 'status',
    sysCtLIdx : -1,
    clr: 'clear',
    exec: 'execCommand',
    rebootMsg : 'isRebootMessage',
    shutdown : 'isShutDownMessage',
    notUsedCommand : 'canNotUsedCommand',
    buttonActied: 'buttonAction',
    sysIndex : 1,
    checkStatus: [true, 200, 'OK'],
    application : {
        apache : ['apache2','/etc/rc.d/init.d/httpd', 'apachectl','/apachectl', '/etc/init.d/apache2', '/etc/init.d/httpd'],
        nginx: ['/nginx/', '/nginx', '/etc/init.d/nginx'],
        mysql : ['/etc/init.d/mysql', '/etc/init.d/mysqld', 'mysql', 'mysqld'],
        server : 'server',
        user : 'user'
    },
    serviceType: ['nginx', 'mysql', 'httpd', 'apache2'],
    applicationAction : ['start', 'stop', 'reload', 'restart'],
    action : {
        start : 'start',
        stop  : 'stop',
        restart : 'restart',
        reload : 'reload' ,
        shutdown : 'shutdown',
        reboot : 'reboot',
        status : 'status',
        userComand : 'userCommand'
    },
    rebootCommand : ['shutdown -r now', 'init 6', 'reboot'],
    shutdownCommand: ['halt -p -f', 'halt', 'shutdown', 'shutdown -h now'],
    blockCommand: [
        'git', 'vi', 'vim',
        'apt-get', 'apt', 'nano',
        'more', 'wget', 'top'
    ]
};





>>>>>>> refector
