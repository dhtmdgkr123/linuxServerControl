window.addEventListener('load', function(e){
    const stat = new status();
    let target = null;
    // this.document.getElementById('')
    document.getElementById('getTarget').addEventListener('click', function(e){
        // console.log(e.target);
        if ( e.target.nodeName === 'LI' ) {
            target = e.target;
            console.log(target);
            console.log(target.getAttribute('id'));
        }
    })
});