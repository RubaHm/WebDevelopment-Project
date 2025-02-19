const express = require("express");
const app = express();

app.use("/", express.static('./website'));

const  {check, validationResult}=require("express-validator");
let formvalidate=getFormValidation();

app.use(express.urlencoded({extended:false}));

app.post("/server", formvalidate, (request,response)=>{
    const errors=validationResult(request);

    if(!errors.isEmpty()){
        const msg="<h2>Your submission has errors</h2>" + printErrors(errors.array());
        response.send(msg);
    }
    else{
        const fname=request.body.fname;
        const lname=request.body.lname;
        const d=request.body.d;
        const people=request.body.people;
        const email=request.body.email;
        const nationality=request.body.nationality;

        addUser(fname, lname, d, people, email, nationality);

        const msg="<h1>request submitted</h1>"+ "<p>First Name: "+fname+"</p>"+
                    "<p>Last Name: "+lname+"</p>"+"<p>Booking date: "+d+"</p>"+
                    "<p>Number of People: "+people+"</p>"+
                    "<p>Email: "+email+"</p>"+"<p>Nationality: "+nationality+"</p>";
        response.send(msg);
}
})
app.listen(2500, ()=>{
    console.log("The server is running on provided port");
})

function getFormValidation(){
    return[
        //firstname
        check('fname').isLength({min:1,max:100}).withMessage('First name must be between 1 and 100 chars in length')
        .isString().withMessage("First name must be of type string")
        .matches('[A-Za-z]+').withMessage("First name must consist of English letters only")
        .trim().escape(), 
         //lastname
         check('lname').isLength({min:1,max:100}).withMessage('Last name must be between 1 and 100 chars in length')
         .isString().withMessage("Last name must be of type string")
         .matches('[A-Za-z]+').withMessage("Last name must consist of English letters only")
         .trim().escape(), 
        //email
        check('email').isLength({min:2,max:200}).withMessage('Email must be between 2 and 200 chars in length')//length
                .isString().withMessage("Email must be of type string")//validate type
                .isEmail().withMessage('Email must be in the correct email format e.g., x@y.com')//format
                .trim().escape(),//sanitize and clean
        //nationality
        check('nationality').custom(val => {   //check if selection is whitelisted
            const whitelist = ['+mosotho', 'qatari', 'romanian', 'russian', 'rwandan', 'saint lucian',
        'salvadoran', 'samoan', 'san marinese','sao tomean', 'saudi', 'scottish', 'senegalese'];
            if(whitelist.includes(val)) return true
            return false
        }).withMessage("Nationality must be from provided list")
        .trim().escape()//sanitize and clean
    ];
}

function printErrors(errArray){
    let errors = [];
    for (let index = 0; index < errArray.length; index++) {
        let err = errArray[index]["msg"];
        let msg = "<p>-"+err+"</p>";
        errors.push(msg);
    }
    return errors.join("");
}

function addUser(fname, lname, d, people, email, nationality){
    const mysql = require("mysql2");
    let db =  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'bookform'
    });

    //connect to db
    db.connect(function(err) {
        //check for errors
        if (err) throw err;
        //create SQL command
        var sql = "INSERT INTO user (fname, lname, date, people, email, nationality) VALUES ('"+fname+
                        "', '"+lname+ "','"+d+ "', '"+people+ "','"+email+ "', '"+nationality+"')";
        //execute SQL command
        db.query(sql, function (err, result) {
            //check for errors
          if (err) throw err;
          //if no errors, then successful
          console.log("1 record inserted");
        });
      });
}