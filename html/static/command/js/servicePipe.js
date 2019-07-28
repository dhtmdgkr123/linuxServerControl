class servicePipe extends commandHelper {
    constructor(target) {
        super();
        this.patternArray = [
            'status',
            'command'
        ];
        if ( target ) {
            this.target = target
            this.servicePattern = target.getAttribute('id');
        }
    }

    setTarget(target) {
        this.target = target;
        this.servicePattern = this.target.getAttribute('id');
        return this;
    }

    isStatus() {
        const lower = this.servicePattern.toLowerCase();
        const checkCommand = /(webshell|status)/.test(lower)
        return checkCommand;
    }

    sendData() {
        (async (url) => {
            const f = new FormData();
            f.append('pipeCommand', this.servicePattern);
            const request = await fetch(url, {
                body: f,
                method: 'post'
            });
            
            const response = await request.json();
            const resKeys = Object.keys(res[this.userLang][KEY_WORD.buttonActied]);
            
            if (response.status) {
                if (response.isUrl) {
                    location.href = response.message;
                    
                } else {
                    const responseJson = JSON.parse(response.message);
                    let message = null;
                    if (this.userLang !== 'ko-KR') {
                        if (responseJson[1] === resKeys[3] || responseJson[0] === 3) {
                            message = [
                                responseJson[2].toUpperCase(),
                                res[this.userLang][KEY_WORD.buttonActied][responseJson[1]][responseJson[0]],
                            ].join('');
                        } else {
                            message = [
                                res[this.userLang][KEY_WORD.buttonActied][responseJson[1]][responseJson[0]],
                                responseJson[2].toUpperCase(),
                            ].join('');
                        }
                    } else {
                        message = [
                            responseJson[2].toUpperCase(),
                            res[this.userLang][KEY_WORD.buttonActied][responseJson[1]][responseJson[0]],
                        ].join('');
                    }
                    alert(message);
                    message = null;
                }
            } else {
                
                alert(res[this.userLang][KEY_WORD.exec][response.message]);
            }
        })(this.renderUrl({
            className: 'ServicePipe',
            methodName: 'getServiceName'
        }));
    }

    getInnerText(target) {
        target = target.children.length ? target.children[1] : target;
        return target
                .innerText
                .split(' ')
                .map((i) => i.toLowerCase());
    }

    mainProcess() {
        if (this.getServiceList(this.servicePattern)) {
            let serviceName = this.getInnerText(this.target);
            if (serviceName[1] === 'off') {
                serviceName[1] = 'stop';
            }

            if ( this.isStatus() ) {
                this.sendData();
            } else {
                if (this.strToConfirm(KEY_WORD.sysCtl, serviceName[1], serviceName[0])) {
                    this.sendData();
                }
            }
        }
    }
    
    renderUrl(urlObject = {}) {
        let retVal = false;
        if (urlObject.className && urlObject.methodName) {
            retVal = [
                location.origin, urlObject.className, urlObject.methodName
            ].join('/');
        }
        return retVal;
    }

    getServiceList(serviceId) {
        const checkUrl = location.pathname.split('/')[1].toLowerCase() === 'ServerStatus'.toLowerCase();
        if ( checkUrl ) {
            return Array
                    .from(document.getElementById('getTarget').children)
                    .map((i) => Array.from(i.children[0].children)
                                     .filter((j) => j.hasAttribute('id'))
                                     .map((j) => j.getAttribute('id').trim())
                    )
                    .flatMap(i => i)
                    .some(i => i === serviceId);
        } else {
            return Array
                    .from(document.getElementsByClassName('container'))
                    .filter((i, v) => v >= 3)
                    .map(i => Array
                        .from(i.children)
                        .filter(j => j.hasAttribute('id'))
                        .map(j => j.getAttribute('id'))
                    )
                    .flat()
                    .some(arrVal => serviceId === arrVal)

        }
    }



}