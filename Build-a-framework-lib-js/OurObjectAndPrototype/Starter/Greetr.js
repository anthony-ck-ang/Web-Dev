//new exe context; function
//need access to global var (window) and jquery var
(function(global, $){
    
    let Greetr = function(firstname, lastName, language) {
        
        //create a new empty obj {} 
        //add a new init prop which is a function that takes in 3 params
        //{} invokes init prop
        //returns: new instantiated obj
        return new Greetr.init(firstname, lastName, language);
    }
    
    //all methods added here to be used
    //this will be the prototype for all new {} created
    Greetr.prototype = {}
    
    //init prop: func constructor that set up props in empty {}
    Greetr.init = function(firstname, lastName, language) {
        //ref {}
        let self = this; 
        self.firstname = firstname || '';
        self.lastname = lastName || '';
        self.language = language || 'en';       
    }
    
    //all new obj instantiated by init will have it's prototype point to Greetr.init.prototype
    //ref to Greetr.prototype to use all it's methods
    Greetr.init.prototype = Greetr.prototype;
    
    //expose Greetr func by attaching it to the glob obj
    //2 alias/prop on glob obj that point to Greetr func
    global.Greetr = global.G$ = Greetr;
        
    
}(window, jQuery)); //pass in