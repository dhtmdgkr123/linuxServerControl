class status {
    constructor() {
        this.imgInput = document.getElementById('selectImg');
        this.getImg();
    }
    async getImg() {
        const requrst = await fetch(this.imgUrl(), {
            method: 'get'
        });

        if (this.checkStatus(requrst)) {
            const j = await requrst.json();
            if ( j.stat ) {
                this.imgInput.insertAdjacentHTML('afterbegin', j.message);
            } else {
                location.href = j.message;
            }
        }
    }
    checkStatus(requrstPromise) {
        return requrstPromise.ok && requrstPromise.status === 200 && requrstPromise.statusText === 'OK';
    }
    imgUrl() {
        return [
            location.origin,
            'getStatus',
            'checkRootId'
        ].join('/');
    }
}