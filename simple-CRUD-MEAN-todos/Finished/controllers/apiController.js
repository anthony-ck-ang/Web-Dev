let Todos = require('../models/todoModel');
// const bodyParser = require('body-parser');

module.exports = (app) => {
    
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));

    // Find all todos
    app.get('/api/findAll/todos', (req, res) => {
        
        Todos.find((err, todos) =>{
            if (err) throw err;
            res.send(todos);
        });  
    });
    
    // Find by name
    // Same user can have multiple todos
    app.get('/api/todos/:uname', (req, res) => {
        //pass in uname from url as a obj
        Todos.find({ username: req.params.uname }, (err, todos) => {
            if (err) throw err;
            res.send(todos);
        }); 
    });
    
    // Find by id
    // One todo can only have one uid
    app.get('/api/todo/:id', (req, res) => {
       
       Todos.findById({ _id: req.params.id }, (err, todo) => {
           if (err) throw err;
 
           res.send(todo);
       });
    });
    
    //Update or Create new
    app.post('/api/update/todo', (req, res) => {
        // Update existing todo if id exist in json body
        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, (err, todo) => {
                if (err) throw err;
                res.send('Update successfully');
            });
        }else {
           // Create and save new todo
           var newTodo = Todos({
               username: 'test',
               todo: req.body.todo,
               isDone: req.body.isDone,
               hasAttachment: req.body.hasAttachment
           });

           newTodo.save((err) =>{
               if (err) throw err;
               res.send('New todo saved successfully');
           });
        }  
    });

    //Delete by id
    app.delete('/api/delete/todo', (req, res) => {
        Todos.findByIdAndRemove(req.body.id, (err) => {
            if (err) throw err;
            res.send('Deleted successfully');
        })
    });
    
}