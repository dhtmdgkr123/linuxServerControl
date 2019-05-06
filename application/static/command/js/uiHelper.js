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