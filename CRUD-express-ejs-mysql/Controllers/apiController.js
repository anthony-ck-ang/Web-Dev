module.exports = function(app, mysqlConnection){

    app.get('/', (req, res) => {
        res.render('index');
      });

    //Get all employees
    app.get('/employees', (req, res) => {
        //Callback function after execution of query
        mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
            if (err) console.log(err);    
            else res.render('employees', { D: rows});
            // else res.send(rows);
        });
    });

    //Get an employee
    app.get('/employee/:id', (req, res) => {
        mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
            if (err) console.log(err);
            else res.send(rows);        
        });
    });

    //Delete an employee; Use POSTMAN 
    app.delete('/employee/:id', (req, res) => {
        mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
            if (err) console.log(err);     
            else res.send('Deleted successfully.'); 
        });
    });

    //Stored procedure 

    //Insert an employee 
    //Callback function to call the stored procedure
    app.post('/employee', (req, res) => {
        let emp = req.body; //data obj

        // '\' to escape and treat it as single line
        // SET data IN @variables
        // CALL the SP and pass in the data
        let sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
        CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";

        // '?' is like placeholder to pass in data; [?, ?, ?, ?] 
        // Extract the different props from data obj
        mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
            if (err) console.log(err);
            else {
                //returned -> [ {}, {}, {}, {}, [{ "EmpID: xx"}], {}]
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Inserted employee id : '+ element[0].EmpID);
                });
            }
        });
    });

    //Update an employee*
    app.put('/employee', (req, res) => {
        let emp = req.body;
        let sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
        CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";

        mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
            if (err) console.log(err);
            else res.send('Updated successfully');   
        });
    });

}