class renderInterFace {
    constructor(target) {
        if (target) {
            this.imgInput = document.getElementById(target);
        }
        this.userLang = navigator.language || navigator.userLanguage;
        this.pageName = 'viewStatus';
        this.useCpuTemp = false;
    }
    renderUrl({className, methodName}) {
        let retVal = false;
        if (className && methodName) {
            retVal = [
                location.origin, className, methodName
            ].join('/');
        }
        return retVal;
    }

    checkStatus(reqPromise) {
        return reqPromise.ok && reqPromise.status === 200 && reqPromise.statusText === 'OK';
    }
    async req() {}
}

class renderServerInfo extends renderInterFace {
    constructor() {
        super('selectImg');
        this.percentStyle = ["668de5", "71e096", "ffdc89", "ff9548", "ff4848"];
        this.req();
    }
    
    async req() {
        const url = this.renderUrl({
            className: 'getStatus',
            methodName: 'renderMainInfo'
        });
        const req = await fetch(url, {
            method: 'get'
        });
        if (this.checkStatus(req)) {
            const json = await req.json();
            
            if ( json.message.serverInfo.status ) {
                this.imgInput.insertAdjacentHTML('afterbegin', json.message.userTemplate);
                document.getElementById('card_main').insertAdjacentHTML('afterbegin', json.message.serverInfo.diskInfo.map((i) => this.renderTemplate(i)).join(''))
                
                document.getElementsByClassName('top-card')[0].insertAdjacentHTML('afterbegin', this.renderInfo(json.message.serverInfo));
                this.renderGraph(json.message.serverInfo);
                
            } else {

                alert([
                    json.message.serverInfo.packageName, res[this.userLang][this.pageName]
                ].join(''));
                location.href = json.message.url;
            }
        }
    }
    
    getConfig({labelName, value, isTemprature}) {
        return {
            label: labelName,
            size: 120,
            min: 0,
            max: 100,
            initValue: value,
            minorTicks: 5,
            yellowZones: [{from: this.min}],
            isTemp : isTemprature,
            
            range: null,
            get yellowZones () {
                return [{
                    from: this.min + this.range * 0.75,
                    to: this.min + this.range * 0.9
                }];
            },
            get redZones() {
                return [{
                    from: this.yellowZones[0].to,
                    to: this.max
                }];
            }
        };
    }
    
    renderGraph(info) {
        let chart = null;
        
        if (typeof(info.cpuTemp.status) === 'undefined') {
            this.useCpuTemp = true;
            chart = {
                'cpu': new Gauge('chartDiv1', this.getConfig({labelName: 'cpu', value: info.cpuUsage, isTemprature: false})),
                'ram': new Gauge('chartDiv2', this.getConfig({labelName: 'ram', value: info.ramPercent, isTemprature: false})),
                'disk': new Gauge('chartDiv3', this.getConfig({labelName: 'ram', value: info.ramPercent, isTemprature: false})),
                'cpuTemp' : new Gauge('chartDiv4', this.getConfig({labelName: 'Cpu Temp', value: info.cpuTemp, isTemprature: true}))
            };
            
        } else {
            chart = {
                'cpu': new Gauge('chartDiv1', this.getConfig({labelName: 'cpu', value: info.cpuUsage, isTemprature: false})),
                'ram': new Gauge('chartDiv2', this.getConfig({labelName: 'ram', value: info.ramPercent, isTemprature: false})),
                'disk': new Gauge('chartDiv3', this.getConfig({labelName: 'ram', value: info.ramPercent, isTemprature: false})),
                
            }
        }
        
        let isSend = true;
        const intervalUrl = this.renderUrl({
            className: 'GetStatus',
            methodName : 'interValServerInfo'
        });
        let json = null;
        
        setInterval( async () => {
            if ( isSend ) {
                isSend = false;
                const getServerInfo = await fetch(intervalUrl, {
                    method: 'get'
                });
                if ( this.checkStatus(getServerInfo) ) {
                    json = await getServerInfo.json();
                    
                    if ( json.status ) {
                        chart.cpu.redraw(json.cpuUsage);
                        chart.ram.redraw(json.ramPercent);
                        chart.disk.redraw(json.diskPercent);
                        if ( this.useCpuTemp ) {
                            chart.cpuTemp.redraw(json.cpuTemp);
                        }
                    }
                    isSend = true;
                }
            }
        }, 2000);
    }

    renderInfo(serverInfo) {
        return (`
            <h2>IP Address : ${serverInfo.ipAddress}</h2>
            <h2>Host name : ${serverInfo.userInfo}</h2>
        `);
    }

    renderTemplate(diskInfo = {}) {
        const getHexValueByPercent = diskInfo.Use <= 20 ? this.percentStyle[0] : diskInfo.Use <= 40 ? this.percentStyle[1] : diskInfo.Use <= 60 ? this.percentStyle[2] : diskInfo.Use <= 80 ? this.percentStyle[3] : this.percentStyle[4];
        return (`<div class="card-container">
            <div class="card_item flex">
                <div class="disk flex_00 disk_bg">
                    <div class="disk_img">
                        <div class="disk_info flex_align"></div>
                    </div>
                </div>
                <div class="diskflex_01">
                    <div class="disk_info_txt flex_align">${diskInfo.MountedOn}</div>
                </div>
                <div class="disk flex_01 disk_height_set">
                    <div class="progress_height_set progressbar_wrap">
                        <div class="progress_value" style="width:${diskInfo.Use}%;background-color:#${getHexValueByPercent}">
                            <div class="progress_context">${diskInfo.Use}%</div>
                        </div>
                    </div>
                </div>
                <div class="disk flex_00 disk_height_set">
                    <div class="flex_align disk_height_set toggle_disk_option">option</div>
                </div>
            </div>
            <div class="toggle_info" data-toggle="false">
                <div class="flex">
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Filesystem : </span>
                            <span class="value_txt">${diskInfo.Filesystem}</span>
                        </div>
                    </div>
                    <div class="info_title flex_00">
                        <div class="flex_align">
                            <span>Type : </span>
                            <span class="value_txt">${diskInfo.Type}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Size : </span>
                            <span class="value_txt">${diskInfo.Size}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Use : </span>
                            <span class="value_txt">${typeof(diskInfo.Used) === 'number' ? '0M' : diskInfo.Used}</span>
                        </div>
                    </div>
                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span>Free : </span>
                            <span class="value_txt">${diskInfo.Avail}</span>
                        </div>
                    </div>

                    <div class="info_value flex_00">
                        <div class="flex_align">
                            <span >Mounted on : </span>
                            <span class="value_txt">${diskInfo.MountedOn}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
    }
}