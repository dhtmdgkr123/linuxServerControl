class servicePipe {
    constructor(servicePattern) {
        this.servicePattern = servicePattern;
        
    }
    
    mainProcess() {
        if (this.getServiceList(this.servicePattern)) {
            (async (url)=> {
                const f = new FormData();
                f.append('test', this.servicePattern);
                const request = await fetch(url, {
                    body: f,
                    method: 'post'
                });
                const getJson = await request.json();
                console.log(getJson);
                
            })(this.renderUrl())
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