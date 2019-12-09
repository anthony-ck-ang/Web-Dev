
## `Installation | Connection`

### `Install`
- MySQL Server 
- MySQL Workbench

### `Connect`
```html
- Open mysql commandline
- Key in pw

show databases;
use <db name>;
show tables;
```

or...


`MySQL Workbench`
- Under Database tab, select 'Connect to Database..'
- Key in params and click 'ok'
- Under Navigator -> SCHEMAS, right click to create schema... employeedb
- Open a new sql tab ->

<br>

## `Setup`
### `CREATE table`
```html
use employeedb;

CREATE TABLE `employee` (
	`EmpID` int8 NOT NULL AUTO_INCREMENT,
    `Name` varchar(45) DEFAULT NULL,
    `EmpCode`varchar(45) DEFAULT NULL,
    `Salary` int8 DEFAULT NULL,
    PRIMARY KEY (`EmpID`)
) AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;
```

### `ADD employees`
```html
use employeedb;

LOCK TABLES `employee` WRITE;
INSERT INTO `employee` VALUES 
(1,'AARON LANGDON','EMP01', 11111),
(2,'BETTY KIM','EMP02', 22222),
(3,'JAMES NEWTON','EMP03', 33333);
UNLOCK TABLES;
```

### `SELECT all employees`
```html
SELECT * FROM employeedb.employee;
```
<br>

## `Possible Issue`
- https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

```html
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
flush privileges;
```

<br>

## `Store Procedure`
### `Insert employee`

- In mysql workbench, under employeedb -> Stored Procedure
- Right click 'create stored procedure..'

```html
CREATE PROCEDURE `EmployeeAddOrEdit` (
IN _EmpID int8,
IN _Name varchar(45),
IN _EmpCode varchar(45),
IN _Salary int8
)
BEGIN
	IF _EmpID = 0 THEN
		INSERT INTO employee(Name, EmpCode, Salary)
        VALUES(_Name, _EmpCode, _Salary);
        
        SET _EmpID = LAST_INSERT_ID();
	ELSE
		UPDATE Employee
        SET
        Name = _Name,
        EmpCode = _EmpCode,
        Salary = _Salary
        WHERE EmpID = _EmpID;
	END IF;
    
    SELECT _EmpID AS 'EmpID';

END
```

<br>

## `POSTMAN`

### `ADD an employee`
```html
POST: http://localhost:8080/employee
Body: JSON(application/json)

{
	"EmpID":0,
	"Name":"Lolita Fara",
	"EmpCode":"EMP04",
	"Salary":44444
}

-> Send 
```


### `UPDATE an employee`
```html
PUT: http://localhost:8080/employee
Body: JSON(application/json)

{
	"EmpID":6,
	"Name":"Fiona Backings",
	"EmpCode":"EMP05",
	"Salary":55555
}

-> Send 
```

### `DELETE an employee`
```html
DELETE: http://localhost:8080/employee/1

-> Send 
```
