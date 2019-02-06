window.addEventListener('load', function () {
    const doc = document;
    let isSubmit = true;


    doc.getElementById('myForm').addEventListener('submit', function(evt){
        evt.preventDefault();
        if (isSubmit) {
            isSubmit = false;
            new checkUserData(this).processData();
            isSubmit = true;
        }
        
    });
    
});