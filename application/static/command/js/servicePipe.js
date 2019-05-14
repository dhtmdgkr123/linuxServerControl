class servicePipe extends commandHelper {
    constructor(target) {
        super()
        this.target = target
        this.servicePattern = target.getAttribute('id');
    }

    isNotStatus() {
        return this.servicePattern.toLowerCase().indexOf('status') === -1;
    }

    sendData() {
        (async (url) => {

            const f = new FormData();
            f.append('test', this.servicePattern);
            const request = await fetch(url, {
                body: f,
                method: 'post'
            });
            
            const response = await request.json();
            const resKeys = Object.keys(res[this.userLang][KEY_WORD.buttonActied]);
            console.log(response);

            if (response.status) {
                if (response.isUrl) {
                    console.log(response.message);
                    // location.href = response.message;
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
        })(this.renderUrl());
    }

    mainProcess() {
        if (this.getServiceList(this.servicePattern)) {
            let serviceName = this.target.children[1]
                .innerText
                .split(' ')
                .map(i => i.toLowerCase());

            if (serviceName[1] === 'off') {
                serviceName[1] = 'stop';
            }
            
            if (this.isNotStatus()) {
                if (this.strToConfirm(KEY_WORD.sysCtl, serviceName[1], serviceName[0])) {
                    this.sendData();
                }
            } else {
                this.sendData();
            }
        }
    }

    renderUrl() {
        return [
            location.origin, '/ServicePipe/getServiceName'
        ].join('');
    }


    getServiceList(serviceId) {
        return Array
                .from(document.getElementsByClassName('container'))
                .filter((i, v) => v >= 3)
                .map(i => Array
                    .from(i.children)
                    .filter(j => j.hasAttribute('id'))
                    .map(j => j.getAttribute('id'))
                )
                .toString()
                .split(',')
                .map(i => i.trim())
                .some(arrVal => serviceId === arrVal);
    }



}