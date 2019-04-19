
window.addEventListener('load', function () {
    let isSubmut = true;    
    const doc = document;
    const firstContent = doc.getElementById('content0');
    const commandObj = new commandHelper(firstContent, doc);
    commandObj.pwd();
    const inputTag = doc.getElementById('proc');
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

    // inputTag.addEventListener('keypress', function(evt){
    //     if ( evt.keyCode === 13  && isSubmut) {
    //         isSubmut = false;
    //         commandObj.mainProcess(
    //             this.value.trim()
    //         );
    //         isSubmut = true;
    //     }
        
    // });
});

