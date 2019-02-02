window.addEventListener('load', function () {
    const doc = document;
    const tagList = {
        'loginBtn': doc.getElementById('login'),
        'passWordBtn': doc.getElementById('userPassword')
    };
    let isSubmit = true;

    tagList.loginBtn.addEventListener('click', function () {
        if (isSubmit) {
            isSubmit = false;
            new checkUserData(
                doc.getElementsByTagName('input')
            ).processData();
            isSubmit = true;
        }

    });

    tagList.passWordBtn.addEventListener('keypress', function (evt) {
        
        if (evt.keyCode === 13 && isSubmit)  {
            // isSubmit = false;
            
            new checkUserData(
                doc.getElementById('myForm')
            ).processData();
            // isSubmit = true;
        }
        // console.log(isSubmit);

    });
});