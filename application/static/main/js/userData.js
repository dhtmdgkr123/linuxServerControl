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


        for (const formPare of formData.entries()) {
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
            this.sendUserData({
                'action' : this.formTag.getAttribute('action'),
                'data' : statusObject.data
            });

        } else {
            if (this.userLang === 'ko-KR') {
                res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag][0] = statusObject.data;

            } else {
                res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag][1] = statusObject.data;

            }
            alert(res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag].join(''));
            return false;

        }
        
        // this.generateData(this.tag)();
        // for (let i of a.values()) {
        // }
        // let isEmpty = this.inputIsEmpty(this.generateData(this.tag));
        // let a = this.asdfasdf(this.generateData(this.tag))();
        
        // 1. 값을 가져온다 (JSON으로)
        // if ( 값이 비어있는지 확인한다 ) {
        //     값을 보낸다()
        // } else {
        //     값에 해당하는 알럿을 띄운다.
        // }
        
    }

    sendUserData(dataSet) {
        fetch(dataSet.action, {
            method: 'POST',
            body: dataSet.data
        }).then((resp) => resp.json()).then((resp) => {
            console.log(resp);
        });
        // fetch([location.origin, '/Main/authUserData'].join(''), {
        //     method: 'POST',
        //     body: JSON.stringify(dataSet)
        // }).then((resp) => {
        //     return resp.json();
        // }).then((resp) => {
        //     // resp = self.extractJson(resp.responseText);
        //     console.log(resp);
        //     // resp.status ? location.href = resp.link : alert(res[self.userLang][resp.page]['code'][resp.code]);
        // });
    }
}