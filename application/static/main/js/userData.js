class checkUserData {
    constructor(tag) {
        this.userLang = navigator.language || navigator.userLanguage;
        this.tag = tag;
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

    inputIsEmpty(formData) {
        
        return true;
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


    // generateData(userData) {
    //     for (let i = 0, len = userData.length; i < len; i++) {
    //         this.sendData[userData[i].getAttribute('id')] = userData[i].value;
    //     }
    //     return this.sendData;
    // }

    // asdfasdf(obj) {
    //     return obj => Object.keys(obj).reduce( (frmData, key) => {
    //         frmData.append(key, obj[key]);
    //         return frmData;
    //     }, new FormData());
    // }

    
    processData() {
        // this.generateData(this.tag)();
        // for (let i of a.values()) {
        // }
        // let isEmpty = this.inputIsEmpty(this.generateData(this.tag));
        // let a = this.asdfasdf(this.generateData(this.tag))();
        return false;
        if (isEmpty === true) {
            this.sendUserData(this.sendData);
        } else {
            if (this.userLang === 'ko-KR') {
                res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag][0] = isEmpty;

            } else {
                res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag][1] = isEmpty;
                
            }
            alert(res[this.userLang][this.ErrorTag.idxError][this.ErrorTag.code][this.ErrorTag.tag].join(''));
            return false;
        }
        
    }

    sendUserData(dataSet) {
        let self = this;
        // let frmData = new FormData().append()
        // console.log(JSON.stringify(dataSet));
        fetch([location.origin, '/Main/authUserData'].join(''), {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSet)
        }).then((resp) => {
            return resp.json();
        }).then((resp) => {
            // resp = self.extractJson(resp.responseText);
            console.log(resp);
            // resp.status ? location.href = resp.link : alert(res[self.userLang][resp.page]['code'][resp.code]);
        });

        // $.ajax({
        //     type: 'post',
        //     async: true,
        //     cache: false,
        //     datatype: 'json',
        //     data: dataSet,
        //     url: self.reqUrl,
        //     complete: function (resp) {
        //         resp = self.extractJson(resp.responseText);
                
        //     }

        // });
    }
}