window.addEventListener('load', function(e){
    new renderServerInfo();
    const toggleSlider = new slideToggle();
    const commandPipe = new servicePipe();
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
            commandPipe.setTarget(target).mainProcess()
            target = null;
        }
    });
});