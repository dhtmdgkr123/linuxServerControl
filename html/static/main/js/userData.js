class checkUserData {
    constructor(tag) {
        this.userLang = navigator.language || navigator.userLanguage;
        this.formTag = tag;
        this.sendData = {
            'serverAddress': '',
            'serverPort': '',
            'userId': '',
            'userPassword': ''
        }
        this.reqUrl = location.origin + '/Main/authUserData';
        this.ErrorTag = {
            'idxError' : 'indexError',
            'code' : 'code',
            'tag' : -4
        };
    }

    extractJson(str) {
        let firstOpen, firstClose, candidate;
        firstOpen = str.indexOf('{', firstOpen + 1);
        do {
            firstClose = str.lastIndexOf('}');
            if (firstClose <= firstOpen) {
                return null;
            }
            do {
                candidate = str.substring(firstOpen, firstClose + 1);
                try {
                    return JSON.parse(candidate);
                } catch (e) {}
                firstClose = str.substr(0, firstClose).lastIndexOf('}');
            } while (firstClose > firstOpen);
            firstOpen = str.indexOf('{', firstOpen + 1);
        } while (firstOpen !== -1);

    }

    generateData(userData) {
        return new FormData(userData);
    }
    
    isEmptyData(formData) {
        let statObject = {
            'stat' : false,
            'data' : ''
        };

        const formDataEntire = formData.entries();
        for (const formPare of formDataEntire) {
            if ( ! formPare[1] ) {
                statObject.data = formPare[0];
                return statObject;
            }
        }
        statObject.stat = true;
        statObject.data = formData;
        return statObject;
    }
    
    processData() {
        const statusObject = this.isEmptyData(this.generateData(this.formTag));
        if ( statusObject.stat ) {

            const jsonData = this.sendUserData({
                'action' : this.formTag.getAttribute('action'),
                'data' : statusObject.data
            });

            if ( jsonData ) {
                jsonData.then((resp) => {
                    if (resp.status && resp.code) {
                        location.href = resp.page;
                    } else {
                        alert(res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][resp.code]);
                    }
                });
            }

        } else {
            if (this.userLang === 'ko-KR') {
                res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag][0] = statusObject.data;

            } else {
                res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag][1] = statusObject.data;
            
            }
            alert(res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag].join(''));
            return false;

        }
    }

    sendUserData(dataSet) {
        return fetch(dataSet.action, {
            method: 'POST',
            body: dataSet.data
        }).then(resp => resp.ok && resp.status === 200 ? resp.json() : false);
    }
}