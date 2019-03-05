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
        let self = this;
        this.list.addEventListener('click', function (evt) {
            let target = evt.target;
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
        this.content = content;
        this.doc = doc;
        this.inputTag = content.children[0];
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
        const txtArea = self.content.children[4];


        const request = async () => {
            const compareStatus = (ok, code, txt) => ok && code === 200 && txt === 'OK';
            const response = await fetch([location.origin, '/Command/getPwd'].join(''), self.fetchOpt);

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
        };

        setWaitStatus();
        request().then((_val) => setPwd(_val));
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
            'mysql',
            'mysqld',
            '/etc/init.d/mysql',
            '/etc/init.d/mysqld',
        ].some((val) => {
            return command.includes(val);
        });
    }

    isApacheCommand(command) {
        return [
            'apachectl',
            'httpd',
            '/etc/rc.d/init.d/httpd',
            'httpd',
            'apache2',
        ].some((val) => {
            return command.includes(val);
        });
    }

    isNginxCommand(command) {
        return [
            '/etc/init.d/nginx',
            'nginx',
        ].some((val) => {
            return command.includes(val);
        });
    }




    processData(command) {
        const SYS_CTL = 'systemctl';
        const content = this.content.children[4];
        const isStop = (cmd) => cmd === 'stop';
        const isRestart = (cmd) => cmd === 'restart';
        const isStart = (cmd) => cmd === 'start';
        const isReload = (cmd) => cmd === 'reload';

        if (command === 'clear') {
            this.clearTxtarea(content);

        } else {

            const splitCommand = command.split(' ');
            if (this.isBlockingCommand(splitCommand[0])) {
                alert('사용할 수 없는 명령어 입니다.');
            } else if (this.isRebootCommand(command) && confirm('재부팅하게요?')) {


            } else if (this.isShutdownCommand(splitCommand[0]) && confirm('종료하시겠습니까?')) {


            } else if (this.isApacheCommand(command)) {
                let finalCommand = null;
                const SYSTEMCTL_INDEX = 1;
                const OTHER_INEX = splitCommand.length - 1;
                if (splitCommand.includes(SYS_CTL)) {
                    finalCommand = splitCommand[SYSTEMCTL_INDEX].toLowerCase();
                } else {
                    finalCommand = splitCommand[OTHER_INEX].toLowerCase();
                }
                if (isStop(finalCommand)) {
                    console.log('stop apa');
                } else if (isRestart(finalCommand)) {


                    console.log(`restart`);
                } else if (isStart(finalCommand)) {

                    console.log(`start`);
                } else if (isReload(finalCommand)) {

                    console.log('reload');
                } else {
                    console.log('status');
                }
            } else if (this.isMySQLCommand(command)) {
                let finalCommand = null;
                const SYSTEMCTL_INDEX = 1;
                const OTHER_INEX = splitCommand.length - 1;

                if (splitCommand.includes(SYS_CTL)) {
                    finalCommand = splitCommand[SYSTEMCTL_INDEX].toLowerCase();
                } else {
                    finalCommand = splitCommand[OTHER_INEX].toLowerCase();
                }

                if (isStop(finalCommand)) {

                    console.log('stop apa');
                } else if (isRestart(finalCommand)) {


                    console.log(`restart`);
                } else if (isStart(finalCommand)) {

                    console.log(`start`);
                } else if (isReload(finalCommand)) {

                    console.log('reload');
                } else {

                    console.log('status');
                }


            } else if (this.isNginxCommand(command)) {

                let finalCommand = null;
                const SYSTEMCTL_INDEX = 1;
                const OTHER_INEX = splitCommand.length - 1;
                if (splitCommand.includes(SYS_CTL)) {
                    finalCommand = splitCommand[SYSTEMCTL_INDEX].toLowerCase();
                } else {
                    finalCommand = splitCommand[OTHER_INEX].toLowerCase();
                }

                if (isStop(finalCommand)) {
                    console.log('stop apa');
                } else if (isRestart(finalCommand)) {


                    console.log(`restart`);
                } else if (isStart(finalCommand)) {

                    console.log(`start`);
                } else if (isReload(finalCommand)) {

                    console.log('reload');
                } else {
                    console.log('status');
                }
            }
            // let respMsg = 'asdfasdfasdasdfasdfa';
            // content.scrollTop = content.scrollHeight;
            // content.value = [content.value, ' ', val, '\n', respMsg, '\n', savePwd].join('');

            this.inputTag.value = '';
        }
    }
}