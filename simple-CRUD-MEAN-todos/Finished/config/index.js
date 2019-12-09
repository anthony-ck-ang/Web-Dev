let configValues = require('./config');

module.exports = {
    
    getDbConnectionString: () => {
        return 'mongodb+srv://' + configValues.uname + ':' + configValues.pwd + '@cluster0-fwckn.mongodb.net/test?retryWrites=true&w=majority';
    }
    
}