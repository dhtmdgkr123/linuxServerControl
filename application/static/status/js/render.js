class renderInterFace {
    constructor(target) {
        if ( target ) {
            this.imgInput = document.getElementById(target);
        }
    }
    renderUrl(urlObject = {}) {
        if ( urlObject.className && urlObject.methodName ) {
            return [
                location.origin, urlObject.className, urlObject.methodName
            ].join('/');

        } else {
            return false;
        }
    }

    checkStatus(reqPromise) {
        return reqPromise.ok && reqPromise.status === 200 && reqPromise.statusText === 'OK';
    }
    async req() {}
}

class renderImage extends renderInterFace {
    constructor() {
        super('selectImg');
        this.req();
    }
    
    async req() {

        const imgUrl = this.renderUrl({
            className: 'getStatus',
            methodName: 'checkRootId'
        });
        
        const requrst = await fetch(imgUrl, {
            method: 'get'
        });

        if ( this.checkStatus(requrst) ) {
            const json = await requrst.json();
            if ( json.stat ) {
                this.imgInput.insertAdjacentHTML('afterbegin', json.message);

            } else {
                location.href = json.message;
            }
        }
    }
}



class renderDiskUsgae extends renderInterFace {
    constructor() {

    }


    async req() {
        // const url = this.renderUrl({
        //     className: 
        // });
    }

    renderTemplate(diskInfo = {}) {
        return `<div class="card_container">
            <div class="card_item flex">
                <div class="disk flex_00 disk_bg">
                    <div class="disk_img">
                        <div class="disk_info flex_align"></div>
                    </div>
                </div>
                <div class="diskflex_01">
                    <div class="disk_info_txt flex_align">${diskInfo.mounted}</div>
                </div>
                <div class="disk flex_01 disk_height_set">
                    <div class="progress_height_set progressbar_wrap">
                        <div class="progress_value" style="width:${diskInfo.avail}%;background-color:#668de5">
                            <div class="progress_context">${diskInfo.avail}%</div>
                        </div>
                    </div>
                </div>
                <div class="disk flex_00 disk_height_set">
                    <div class="flex_align disk_height_set toggle_disk_option">option</div>
                </div>
            </div>
            <div class="toggle_info" data-toggle="false" style="display: none;">
                <div class="flex">
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Filesystem : </span>
                            <span class="value_txt">${diskInfo.fileSystem}</span>
                        </div>
                    </div>
                    <div class="info_title flex_00">
                        <div class="flex_align">
                            <span>Type : </span>
                            <span class="value_txt">${diskInfo.type}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Size : </span>
                            <span class="value_txt">${diskInfo.size}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Use : </span>
                            <span class="value_txt">${diskInfo.use}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Free : </span>
                            <span class="value_txt">${diskInfo.free}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Available : </span>
                            <span class="value_txt">${diskInfo.avail}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span >Mounted on : </span>
                            <span class="value_txt">${diskInfo.mounted}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }


}