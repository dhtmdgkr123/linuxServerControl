class servicePipe {


    constructor(target) {
        this.target = target;
        this.serviceId = target.getAttribute('id');
    }

    getServiceList(serviceId) {
        return Array.from(document.getElementById('getTarget').children)
                    .map((i) => Array.from(i.children[0].children)
                                     .filter((j) => j.hasAttribute('id'))
                                     .map((j) => j.getAttribute('id').trim())
                    )
                    .flatMap(i => i)
                    .some(i => i === serviceId);
    }
    
    main() {
        if ( this.getServiceList(this.serviceId) ) {
            console.log('asdf');
        } else {
            console.log('ㅠㅠ')
        }
    }
}