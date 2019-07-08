window.addEventListener('load', function(e){
    const serverInfo = new renderServerInfo();
    const toggleSlider = new slideToggle();
    let target = null;
    document.getElementById('card_main').addEventListener('click', function(e) {
        target = e.target;
        if (target.classList.contains('toggle_disk_option')) {
            target = target.parentElement.parentElement.nextElementSibling;
            toggleSlider.setTarget(target).main();
        }
    });
    document.getElementById('getTarget').addEventListener('click', function(e) {
        if ( e.target.nodeName === 'LI' ) {
            target = e.target;
            new servicePipe(target).main()
            target = null;
        }
    });

    

    
});