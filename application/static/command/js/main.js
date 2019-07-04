
window.addEventListener('load', function () {
    let isSubmut = true;    
    const doc = document;
    const firstContent = doc.getElementById('content0');
    const commandObj = new commandHelper(firstContent, doc);
    
    commandObj.pwd();
    
    new TAB(
        doc.getElementsByClassName('tabs')[0],
        doc.getElementsByClassName('article-wrap')
    ).init();


    doc.getElementById('proc').addEventListener('keydown', function(e){
        if (e.keyCode === 38) {
            if ( arrIdx >= 0 ) {
                this.value = saveCommand[arrIdx--];
            }
        } else if (e.keyCode === 40) {
            if ( arrIdx >= 0 ) {
                this.value = saveCommand[arrIdx++];
            }
        }
    });


    doc.getElementById('sendCommand').addEventListener('submit', function(e){
        e.preventDefault();
        if (isSubmut) {
            isSubmut = false;
            commandObj.mainProcess(this);
        }
        isSubmut = true;
    });

    doc.getElementById('content1').addEventListener('click', function(evt){
        let target = evt.target;
        const nodeName = target.nodeName.toLowerCase();
        
        if (nodeName === 'i' || nodeName === 'h3') {
            target = target.parentElement;
        } else {
            target = target;
        }
        if (isSubmut) {
            isSubmut = false;
            new servicePipe(target).mainProcess();
        }
        isSubmut = true;
    });
});

