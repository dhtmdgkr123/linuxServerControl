
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
    
    doc.getElementById('sendCommand').addEventListener('submit', function(e){
        e.preventDefault();
        if (isSubmut) {
            isSubmut = false;
            commandObj.mainProcess( this );
        }
        isSubmut = true;
    });

    doc.getElementById('content1').addEventListener('click', function(evt){
        const target = evt.target;
        const nodeName = target.nodeName.toLowerCase();
        let id = null;
        
        if (nodeName === 'i' || nodeName === 'h3') {
            id = target.parentElement.getAttribute('id');
        } else {
            id = target.getAttribute('id');
        }

        new servicePipe(id).mainProcess();
    });
});

