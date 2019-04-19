var savePwd;
class TAB {
    constructor(list, page) {
        /**
         * @param listTag
         * @param all of contentTag
         */

        this.list = list;
        this.page = page;
    }

    init() {

        for (let i = arguments[0] === 'allNone' ? 0 : 1, len = this.page.length; i < len; i++) {
            this.page[i].style.display = 'none';
        }
        this.clickEvt();

        return this;

    }

    clickEvt() {
        const self = this;
        self.list.addEventListener('click', function (evt) {
            const target = evt.target;
            if (target.parentElement.classList.length) {
                return;
            }
            if (target.nodeName === 'A' || target.nodeName === 'LI') {
                self.tabProcess(target.parentElement);
            }
        });
    }

    classProcess(list, self) {
        const className = 'active';
        for (let i = 0, len = list.length; i < len; i++) {
            list[i].classList.remove(className);
        }
        self.classList.add(className);
        return this;
    }

    tabProcess(self) {
        this.classProcess(this.list.children, self)
            .init('allNone')
            .fadeIn(
                this.page[self.getAttribute('id').slice(-1)],
                400
            );
    }


    fadeIn(self, ms) {
        if (!self) {
            console.error('input element');
            return;
        }

        let selfCss = self.style;

        selfCss.opacity = 0;
        selfCss.filter = 'alpha(opacity=0)';
        selfCss.display = 'block';
        selfCss.visibility = 'visible';
        if (ms) {
            let opacity = 0;
            let timer = setInterval(() => {
                opacity += 50 / ms;
                if (opacity >= 1) {
                    clearInterval(timer);
                    opacity = 1;
                }
                selfCss.opacity = opacity;
                selfCss.filter = ['alpha(opacity=', opacity * 50, ')'].join('');
            }, 50);
        } else {
            selfCss.opacity = 1;
            selfCss.filter = 'alpha(opacity=1)';
        }
    }
}

class commandHelper {

    constructor(content, doc) {
        this.emptyString = '';
        this.content = content;
        this.doc = doc;
        this.inputTag = content.children[0].children[0];
        this.fetchOpt = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        this.userLang = navigator.language || navigator.userLanguage;
    }

    pwd() {
        const self = this;
        const txtArea = self.content.children[2];
        const request = async (url) => {
            const compareStatus = (ok, code, txt) => ok && code === 200 && txt === 'OK';
            const response = await fetch(url, self.fetchOpt);

            return compareStatus(
                response.ok,
                response.status,
                response.statusText
            ) ? await response.json() : false;
        };

        const setPwd = (json) => {
            if (json.status && json.code === 1) {
                txtArea.value = savePwd = json.message;
                self.inputTag.removeAttribute('readonly');
                self.content.children[1].setAttribute('id', 'proc_btn');
            } else {
                alert(res[self.userLang][json.page]['code'][json.code]);
            }
        };

        const setWaitStatus = () => {
            self.inputTag.setAttribute('readonly', true);
            self.content.children[1].setAttribute('id', 'wait');
            txtArea.value = 'wait...';
            return [
                location.origin, '/Command/getPwd'
            ].join(this.emptyString);
        };
        
        request(setWaitStatus()).then((_val) => setPwd(_val));
    }

    clearTxtarea(content) {
        content.value = savePwd;
    }
    
    isBlockingCommand(command) {
        return [
            'git', 'vi', 'vim',
            'apt-get', 'apt', 'nano',
            'more', 'wget', 'top'
        ].some((arrVal) => {
            return arrVal === command;
        });
    }

    isShutdownCommand(command) {
        return [
            'halt', 'shutdown'
        ].some((arrVal) => {
            return arrVal === command;
        });
    }

    isRebootCommand(command) {
        return [
            'shutdown -r now', 'init 6', 'reboot'
        ].some((arrVal) => {
            return arrVal === command;
        });
    }

    isMySQLCommand(command) {
        return [
            /mysql/,
            /mysqld/,
            /\/etc\/init.d\/mysql/,
            /\/etc\/init.d\/mysqld/,
        ].some((val) => {
            return val.test(command);
        });
    }

    isApacheCommand(command) {
        return [
            /apachectl/,
            /httpd/,
            /\/etc\/rc.d\/init.d\/httpd/,
            /apache2/,
        ].some((val) => {
            return val.test(command);
        });
    }

    isNginxCommand(command) {
        return [
            /\/etc\/init.d\/nginx/,
            /nginx/,
        ].some((val) => {
            return val.test(command);
        });
    }
    
    checkCommand(command) {
        const content = this.content.children[2];
        const isStop = (cmd) => cmd === 'stop';
        const isRestart = (cmd) => cmd === 'restart';
        const isStart = (cmd) => cmd === 'start';
        const isReload = (cmd) => cmd === 'reload';
        
        let data = {
            type: null,
            action : null,
            command : null
        };
        
        if (command === KEY_WORD.clr) {
            this.clearTxtarea(content);
            this.inputTag.value = this.emptyString;
            return false;
            
        } else {
            data.command = command;
            const splitCommand = command.split(' ');
            const OTHER_INEX = splitCommand.length - 1;


            if (this.isBlockingCommand(splitCommand[0])) {
                alert(res[this.userLang][KEY_WORD.notUsedCommand]);
                data.type = data.action = 'block';

            } else if (this.isRebootCommand(command) && confirm(res[this.userLang][KEY_WORD.rebootMsg])) {
                data.action = KEY_WORD.action.reboot;
                data.type = KEY_WORD.application.server;

            } else if (this.isShutdownCommand(splitCommand[0]) && confirm(res[this.userLang][KEY_WORD.shutdown])) {
                data.action = KEY_WORD.action.shutdown;
                data.type = KEY_WORD.application.server;

            } else if (this.isApacheCommand(command)) {
                data.type = KEY_WORD.application.apache;
                let finalCommand = null;
                alert(';test');
                if (splitCommand.includes(KEY_WORD.sysCtl)) {
                    finalCommand = splitCommand[KEY_WORD.sysIndex].toLowerCase();
                } else {
                    finalCommand = splitCommand[OTHER_INEX].toLowerCase();
                }
                if (isStop(finalCommand)) {
                    data.action = KEY_WORD.action.stop;
                } else if (isRestart(finalCommand)) {
                    data.action = KEY_WORD.action.restart;
                } else if (isStart(finalCommand)) {
                    data.action = KEY_WORD.action.start;
                } else if (isReload(finalCommand)) {
                    data.action = KEY_WORD.action.reload;
                } else {
                    data.action = KEY_WORD.action.status;
                }

            } else if (this.isMySQLCommand(command)) {
                data.type = KEY_WORD.application.mysql;
                let finalCommand = null;
                if (splitCommand.includes(KEY_WORD.sysCtl)) {
                    finalCommand = splitCommand[KEY_WORD.sysIndex].toLowerCase();
                } else {
                    finalCommand = splitCommand[OTHER_INEX].toLowerCase();
                }

                if (isStop(finalCommand)) {
                    data.action = KEY_WORD.action.stop;
                } else if (isRestart(finalCommand)) {
                    data.action = KEY_WORD.action.restart;
                } else if (isStart(finalCommand)) {
                    data.action = KEY_WORD.action.start;
                } else if (isReload(finalCommand)) {
                    data.action = KEY_WORD.action.reload;
                } else {
                    data.action = KEY_WORD.action.status;
                }

            } else if ( this.isNginxCommand(command) ) {
                data.type = KEY_WORD.application.nginx;
                let finalCommand = null;

                if (splitCommand.includes(KEY_WORD.sysCtl)) {
                    finalCommand = splitCommand[KEY_WORD.sysIndex].toLowerCase();
                } else {
                    finalCommand = splitCommand[OTHER_INEX].toLowerCase();
                }

                if (isStop(finalCommand)) {
                    data.action = KEY_WORD.action.stop;
                } else if (isRestart(finalCommand)) {
                    data.action = KEY_WORD.action.restart;
                } else if (isStart(finalCommand)) {
                    data.action = KEY_WORD.action.start;
                } else if (isReload(finalCommand)) {
                    data.action = KEY_WORD.action.reload;
                } else {
                    data.action = KEY_WORD.action.status;
                }
            } else {
                data.type = KEY_WORD.application.user;
                data.action = KEY_WORD.action.userComand;
            }
        }
        lastCommand = this.inputTag.value;
        this.inputTag.value = this.emptyString;
        return data;
    }
    
    mainProcess(formTag) {
        const setTxtValue = (fetchObj) => {
            const txtArea = this.content.children[2];
            if (fetchObj.status && fetchObj.code === 1) {
                txtArea.value = [
                    txtArea.value, ' ', lastCommand, '\n', fetchObj.message, '\n', savePwd  
                ].join(this.emptyString);
            }
        }



        const generateForm = (formTag) => new FormData(formTag).get('proc');
        const objToForm = (data) => {
            const from = new FormData();
            Object.keys(data).forEach(objData => {from.append(objData, data[objData])});
            return from;
        };
        const request = async (url) => {
            const compareStatus = (ok, code, txt) => ok && code === 200 && txt === 'OK';


            console.log(
                this.checkCommand(generateForm(formTag))
            );
            return false;

            const fetchOpt = {
                method : 'post',
                body : objToForm(this.checkCommand(generateForm(formTag)))
            };


            const response = await fetch(url,fetchOpt);
            return compareStatus(
                response.ok,
                response.status,
                response.statusText
            ) ? await response.json() : false;
        };
        
        request(formTag.getAttribute('action')).then((_res)=>{setTxtValue(_res)});

    }


}