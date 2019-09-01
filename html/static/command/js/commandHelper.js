class commandHelper {

    constructor(content, doc) {
        if (content && doc) {
            this.content = content;
            this.doc = doc;
            this.inputTag = content.children[0].children[0];
        }
        this.fetchOpt = {
            method: 'POST'
        };
        this.emptyString = '';
        this.userLang = navigator.language || navigator.userLanguage;
    }
    
    strToConfirm(actionName, serviceName, servicePattern) {
        const makeString = (arr, command) => this.userLang === Object.keys(res)[0] ? [command, arr].join(this.emptyString) : [arr, command].join(this.emptyString);
        return confirm(makeString(res[this.userLang][KEY_WORD.exec][actionName][serviceName], servicePattern));
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
            return `${location.origin}/Command/getPwd`;
        };
        request(setWaitStatus()).then(_val => setPwd(_val));
    }

    checkCommand(command) {
        let sendData = {
            command: false
        };
        let serviceList = Object.keys(KEY_WORD.application);
        const commandUtil = {
            isClear: command => KEY_WORD.clr === command[0],
            clearTxtarea: (txtArea) => { txtArea.value = savePwd; },

            isConfirmSupport: command => KEY_WORD.serviceType.some(arrVal => arrVal === command),

            isBlock: command => KEY_WORD.blockCommand.some(arrVal => arrVal === command),
            
            isReboot: command => KEY_WORD.rebootCommand.some(arrVal => arrVal === command),
            isShutdown : command => KEY_WORD.shutdownCommand.some(arrVal => arrVal === command),
            
            isSystemCtl: command => KEY_WORD.sysCtl === command[0],
            isService: command => KEY_WORD.service === command[0],
            checkAction : command => KEY_WORD.applicationAction.some(arrVal => arrVal === command),            
            isNotStatus: command => KEY_WORD.sysStatus !== command[1]
        };

        const serviceCheck = {
            isHttpd: command => KEY_WORD.application.apache.some(arrVal => arrVal === command),
            isNginx: command => KEY_WORD.application.nginx.some(arrVal => arrVal === command),
            isMySql: command => KEY_WORD.application.mysql.some(arrVal => arrVal === command),
        };
        
        const splitedCommand = command.split(' ').map(i => i.toLowerCase());
        const content = this.content.children[2];

        // const makeString = (arr, command) => this.userLang === Object.keys(res)[0] ? [command, arr].join(this.emptyString) : [arr, command].join(this.emptyString)
        // const strToConfirm = (firstIdx, secondIdx, servicePattern) => confirm(makeString(res[this.userLang][KEY_WORD.exec][firstIdx][secondIdx], servicePattern));

        if (commandUtil.isClear(splitedCommand)) {
            commandUtil.clearTxtarea(content);

        } else if (commandUtil.isBlock(splitedCommand[0])) {
            const generateBlockString = (splitCommand) => [splitCommand[0], res[this.userLang][KEY_WORD.exec]['code'][-2]].join(this.emptyString)
            alert(generateBlockString(splitedCommand));

        }
        
        /**
         * @TODO : USING LOOP
         */
        else if (commandUtil.isSystemCtl(splitedCommand)) {
            
            if (commandUtil.isConfirmSupport(splitedCommand[2])) {
                if (commandUtil.checkAction(splitedCommand[1])) {
                    if (commandUtil.isNotStatus(splitedCommand)) {
                        if (this.strToConfirm(splitedCommand[0], splitedCommand[1], splitedCommand[2])) {
                            // bit mask 처리
                            sendData.command = command;
                        }
                    } else {
                        sendData.command = command;
                    }
                } else {
                    sendData.command = command;
                }
            } else {
                sendData.command = command;
            }
        } else if (commandUtil.isService(splitedCommand)) {
            if (commandUtil.isConfirmSupport(splitedCommand[2])) {
                if (commandUtil.checkAction(splitedCommand[2])) {
                    if (commandUtil.isNotStatus(splitedCommand)) {
                        if (this.strToConfirm(KEY_WORD.sysCtl, splitedCommand[2], splitedCommand[1])) {
                            // bit mask 처리
                            sendData.command = command;
                        }
                    } else {
                        sendData.command = command;
                    }
                } else {
                    sendData.command = command;
                }
            } else {
                sendData.command = command;
            }
        }

        /**
         * @TODO : USING LOOP
         */
        
        else if (commandUtil.isShutdown(command)) {
            if (confirm(res[this.userLang]['isShutDownMessage'])) {
                sendData.command = command;
            }
        } else if (commandUtil.isReboot(command)) {
            if (confirm(res[this.userLang]['isRebootMessage'])) {
                sendData.command = command;
            }
        } else {
            let cnt = 0;
            for (let i in serviceCheck) {
                if ( serviceCheck[i](splitedCommand[0]) ) {
                    if ( commandUtil.isNotStatus(splitedCommand) ) {
                        if ( this.strToConfirm(KEY_WORD.sysCtl, splitedCommand[1], serviceList[cnt]) ) {
                            sendData.command = command;
                            return sendData;
                        }
                    }
                }
                cnt++;
            }
            sendData.command = command; 
        }
        return sendData;
    }

    async mainProcess(formTag) {
        const form = new FormData(formTag);
        let inputValue = form.get(this.inputTag.getAttribute('name'));
        const setTxtValue = (fetchObj) => {
            if (fetchObj.pwd) {
                savePwd = fetchObj.pwd;
            }
            const txtArea = this.content.children[2];
            txtArea.value = `${txtArea.value} ${inputValue}\n${fetchObj.message}\n${savePwd}`;
            txtArea.scrollTop = txtArea.scrollHeight;
            
        };
        this.inputTag.value = this.emptyString;
        const isChecked = this.checkCommand(inputValue);
        
        if (isChecked.command.length) {
            const body = {
                body: form,
                method: 'post'
            };
            const getData = await fetch(formTag.getAttribute('action'), body);
            const checkStatus = (arr) => ! (KEY_WORD.checkStatus.filter( v => ! arr.includes(v) ).length);
            if (checkStatus([getData.ok, getData.status, getData.statusText])) {
                
                setTxtValue(await getData.json());
                saveCommand.push(inputValue);
                ++arrIdx;
            } else {
                console.error('server conn fail');
            }
        }
    }
}