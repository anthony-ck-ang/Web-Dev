// gets a new object (the architecture allows us to not have to use the 'new' keyword here)
let a = G$('ant', 'ang');

//console.log(a);
//Greetr.init {firstName: "ant", lastName: "ang", language: "en"}

// use our chainable methods
//a.greet().setLang('cn').greet(true).log();
//Greetr.js:60 Hello ant!
//Greetr.js:60 Ni Hao ma, ant ang
//Greetr.js:60 Ni hao ant!

//a.greet().setLang('es').greet(true); //Greetr.js:37 Uncaught Invalid language


// use our object on the click of the login button
$('#login').click(function(){
    
    // create a new 'Greetr' object (let's pretend we know the name from the login)
    let loginGrtr = G$('anthony', 'ang');
    
    //hide login on the screen
    $('#logindiv').hide();
    
    //fired off functions:
    //set lang
    //HTMLGreeting
    //log
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
    
});

