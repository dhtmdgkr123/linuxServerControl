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
        if ( ! self ) {
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

class commandHelper  {

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
        }

        // this.ajaxOpt = {
        //     type: 'post',
        //     async: true,
        //     cache: false,
        //     datatype: 'json',
        //     data: '',
        //     url: '',
        //     success: '',
        //     error: ''
        // };
        this.userLang = navigator.language || navigator.userLanguage;
    }

    pwd() {
        let self = this;
        let txtArea = self.content.children[4];
        let ajaxOpt = this.ajaxOpt;
        this.content.children[1].setAttribute('id', 'wait');
        this.inputTag.setAttribute('readonly', true);
        txtArea.value = 'wait...';

        fetch([location.origin, '/Command/getPwd'].join(''), self.fetchOpt )
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.status) {
                    txtArea.value = savePwd = resp.message;
                    self.inputTag.removeAttribute('readonly');
                    self.content.children[1].setAttribute('id', 'proc_btn');
                } else {
                    alert(res[self.userLang][resp.page]['code'][resp.code]);
                }
            });

        // ajaxOpt.success = function (resp) {

        //     if (resp.status) {
        //         txtArea.value = savePwd = resp.message;
        //         self.inputTag.removeAttribute('readonly');
        //         self.content.children[1].setAttribute('id', 'proc_btn');
        //     } else {
        //         alert(res[self.userLang][resp.page]['code'][resp.code]);
        //     }

        // };

        // $.ajax(ajaxOpt);

    }
    
    clearTxtarea(content) {
        content.value = savePwd;

    }
    
    isBlockingCommand(command) {
        const firstKeyword = command[0];
        return ['git', 'vi', 'vim', 'apt-get', 'apt', 'nano', 'more', 'wget', 'top'].some((arrVal) => {
            return arrVal === firstKeyword;
        });
    }

    isShutdownCommand(command) {
        const firstKeyword = command[0];
        return ['halt', 'shutdown'].some((arrVal) => {
            return firstKeyword === arrVal;
        });
    }

    isRebootCommand(command) {
        const recoverCommand = command.join(' ');
        return [
            'shutdown -r now', 'init 6', 'reboot'
        ].some((arrVal) => {
            return recoverCommand === arrVal;
        });
    }



    processData(command) {
        
        let content = this.content.children[4];
        if (command === 'clear') {
            this.clearTxtarea(content);
            
        } else {
            const splitCommand = command.split(' ');

            if (this.isBlockingCommand(splitCommand)) {
                alert('사용할 수 없는 명령어 입니다.');
                return false;
                
            } else if ( this.isRebootCommand(splitCommand) && confirm('재부팅하게요?') ) {
                
            } else if (this.isShutdownCommand(splitCommand) && confirm('종료하시겠습니까?') ) {
                
            }
        }

        // let respMsg = 'asdfasdfasdasdfasdfa';
        // content.scrollTop = content.scrollHeight;
        // content.value = [content.value, ' ', val, '\n', respMsg, '\n', savePwd].join('');


        this.inputTag.value = '';

    }






    // function isBlockingCommand(cmd) {

    //     return [git, vi, vim, apt-get, apt, nano, more, wget, top, ].some( (val) => {
    //      val === cmd
    //     } )

    //     }

    //     function isShutdownCommand() {
    //         스플릿[0]
    //         [ halt, shutdown ]
    //     }

    //     function mysql관련명령어() {
    //         if ( 명령 스플릿[1] === mysql ) {
    //             if ( [2] === stop ) else if ( [2] === restart ) else if ( [2] === start )
    //         }
    //         sysytmctl mysql start restart stop
    //         service mysql start restart stop
    //     }

    //     function 아파치관련명령어() {
    //         명령 = 스플릿 명령
    //         if ( 명령 스플릿[1] === apache2 또는 명령어[1] === httpd ) {
    //             if ( [2] === stop ) { 정지함수() } else if ( [2] === restart ) {재시작함수()} else if ( [2] === start ) { 시작함수() }
    //         }
    //     }

    //     function 엔진엑스 관련 명령어() {
    //         명령 = 스플릿 명령
    //         if ( 명령 스플릿[1] === nginx ) {
    //             if ( [2] === stop ) { 정지함수() } else if ( [2] === restart ) {재시작함수()} else if ( [2] === start ) { 시작함수() }
    //         }
    //     }

    //     }

    //     if (차단할 명령어(cmd)) {
    //         알럿(사용불가명령어);
    //     } else if ( 종료명령어(cmd) ) {

    //     } else if ( 컴퓨터재시작 명령어(cmd) ) {

    //     } else if ( mysql관련 명령어(cmd) ) {

    //     } else if ( 아파치관련명령어(cmd) ) {

    //     } else if ( 엔진엑스 관련명령어(cmd) ) {


    //     } else {
    //         명령어 실행!

    //     }














}

