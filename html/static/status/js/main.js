window.addEventListener('load', function(e){
    new renderImage();
    let target = null;
   
    document.getElementById('getTarget').addEventListener('click', function(e) {
        if ( e.target.nodeName === 'LI' ) {
            target = e.target;
            new servicePipe(target).main()
            target = null;
        }
    });

    new renderDiskUsgae();

    
});