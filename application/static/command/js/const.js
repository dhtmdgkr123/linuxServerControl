var savePwd = null;
var lastCommand = null;
const KEY_WORD = {
    sysCtl : 'systemctl',
    sysCtLIdx : -1,
    clr: 'clear',
    rebootMsg : 'isRebootMessage',
    shutdown : 'isShutDownMessage',
    notUsedCommand : 'canNotUsedCommand',
    sysIndex : 1,
    application : {
        nginx : 'nginx',
        mysql : 'mysql',
        apache: 'apache',
        server : 'server',
        user : 'user'
    },
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
};
