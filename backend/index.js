var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

var router = express.Router();


app.listen(3000);

//cho phep thu 4200 qua 3000
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//body-praser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();
app.use(bodyParser.json());

//connect mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://doan2:1234@librarymanagement.obk3g.mongodb.net/LibraryManagement?retryWrites=true&w=majority', function(err){
    if(err){
        console.log("Connect error");
    }else{
        console.log("Connect database successfully!!");
    }
});
module.exports = router;

//module
const Category = require("./Models/Category");
const User = require("./Models/User");


// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// JWT
var jwt = require('jsonwebtoken');

const multer = require('multer');
const Book = require("./Models/Book");
///luu anh trong storage
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/uploadImage')
    },
    //add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        console.log(file);
        if(file.mimetype=="image/png"||
        file.mimetype=="image/jpeg" ||
        file.mimetype=="image/jpg"){

            callback(null,true)
        }else{
            return callback(new Error('Only images are allowed'))
        }
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////

//category
app.get("/category",function(req,res){
    res.render("category");
});

app.post("/api/addCategory",function(req,res){
    const newCate = new Category({
        name: req.body.name,
        cate_id: []
    });
    newCate.save(function(err){
        if(err){
            console.log("save cate fail"+err);
            res.json({kq:0});
        }else{
            console.log("NAME: "+req.body.name);
            console.log("save cate ok");
            res.json({kq:1});
        }
    });
    
});
//delete category
app.post("/api/deleteCategory",jsonParser,function(req,res){
    Category.findByIdAndRemove(req.body._id, function(error) {

        console.log(req.body._id);
        if (error) {
          //return next(error);
          console.log(error);
        } else {
         
            console.log(req.body._id);
          console.log('Deleted book successfully!');
        }
      });
});

//xuat list category
app.post("/api/category", function(req,res){

    Category.find(function(err,items){
        if(err){
            res.json({kq:0,"err":err});
        }else{
            res.json(items);
        }
    });
});
///////////////////////////USER//////////////////////////////
//hien thi tren web, theo file ejs
app.get("/user",function(req,res){
    res.render("user");
});
   
 app.post("/user",upload.single("image"), function(req,res){
    console.log(req.file);
           //add
           const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            name: req.body.name,
            dob: req.body.dob,
            address: req.body.address,
            image: req.file.filename,
            //file:req.file.filename
            
        });
    newUser.save(function(err, result){
        if(err){
            console.log("Save reader fail"+err);
            res.json({kq:0});
        }else{
            console.log(newUser);
            console.log("Save reader ok");            
        }
    }); 
    console.log(JSON.stringify(req.body));

});




//tao api de qua angular goi ra
app.post("/api/user", function(req,res){
    User.find(function(err,items){
        if(err){
            res.json({kq:0,"err":err});
        }else{
            res.json(items);
        }
    });
 });

 //get a user
 app.get("/api/user/:id", function(req,res){
    console.log("id user: "+req.params.id);
    User.findById(req.params.id, (err, doc) => {
        if (!err) { 
            console.log(doc);
            res.json(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
 });


//Add user

app.post("/api/addUser",function(req,res){
    //const file = req.file;
    //console.log(file.filename);
           //add
           const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            name: req.body.name,
            address:req.body.address,
            dob: req.body.dob,
            image: "1648743817197avatar.png",
            sex: req.body.sex,
            role: req.body.role,
            //file:req.file.filename
            
        });
        newUser.save(function(err, result){
            if(err){
                console.log("Save reader fail"+err);
                res.json({kq:0});
            }else{
                console.log("Save reader ok");
                
            }
        }); 
});


//// update

app.put("/api/updateUser",upload.single('file'),function(req,res){
    User.findByIdAndUpdate(req.body._id, {
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            name: req.body.name,
            address:req.body.address,
            dob: req.body.dob,
            image: req.file.filename,
            sex: req.body.sex,
            role: req.body.role,
      }, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          res.json(data)
          console.log('Reader updated successfully!')
        }
      })
});

app.put("/api/updateAUser",upload.single('file'), function(req,res){
    User.findByIdAndUpdate(req.body._id, {
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            name: req.body.name,
            address:req.body.address,
            dob: req.body.dob,
            sex: req.body.sex,
            role: req.body.role,
      }, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          res.json(data)
          console.log('Reader updated successfully!')
        }
      })
});

///delete
app.post("/api/deleteUser",jsonParser,function(req,res){
    User.findByIdAndRemove(req.body._id, function(error) {

        console.log(req.body._id);
        if (error) {
          //return next(error);
          console.log(error);
        } else {
         
            console.log(req.body._id);
          console.log('Reader delete successfully!');
        }
      });
});
//////////////BOOK/////////////////////////////

//Get all book
app.post("/api/book", function(req,res){
    Book.find(function(err,items){
        if(err){
            res.json({kq:0,"err":err});
        }else{
            res.json(items);
        }
    });
 });

 //Get a book
 app.get('/api/book/:id', (req, res) => {

    Book.findById(req.params.id, (err, doc) => {
        if (!err) { 
            console.log(doc);
            res.json(doc); }
        else { console.log('Error in Retriving Book :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Add book
app.post("/api/addBook", upload.single('file'), function(req,res){
    const file = req.file;
    console.log(file.filename);
           //add
           const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
            status: 0,
            idBorrower: "",
            kind: req.body.kind,
            dateCreate: req.body.dateCreate,
            quantity: req.body.quantity,
            edition: req.body.edition,
            publisher: req.body.publisher,
            copyright: req.body.copyright,
        });
        newBook.save(function(err, result){
            if(err){
                console.log("save book fail"+err);
                res.json({kq:0});
            }else{
                console.log("save book ok");
                
            }
        }); 
});
//// update

app.put("/api/updateBook",upload.single('file'),function(req,res){
    Book.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename,
        //status: 0,
        //idBorrower: "",
        kind: req.body.kind,
        edition: req.body.edition,
        quantity: req.body.quantity,
        publisher: req.body.publisher,
        copyright: req.body.copyright,
        //dateCreate: req.body.dateCreate
      }, (error, data) => {
        if (error) {
          //return next(error);
          console.log(error)
        } else {
          res.json(data)
        
          console.log('Book updated successfully!')
        }
      })
});

app.put("/api/updateABook",upload.single('file'),function(req,res){
    Book.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        //status: 0,
        //idBorrower: "",
        kind: req.body.kind,
        edition: req.body.edition,
        quantity: req.body.quantity,
        publisher: req.body.publisher,
        copyright: req.body.copyright,
        //dateCreate: req.body.dateCreate
      }, (error, data) => {
        if (error) {
          //return next(error);
          console.log(error)
        } else {
          res.json(data)
        
          console.log('Book updated successfully!')
        }
      })
});


///delete
app.post("/api/deleteBook",jsonParser,function(req,res){
    Book.findByIdAndRemove(req.body._id, function(error) {

        console.log(req.body._id);
        if (error) {
          //return next(error);
          console.log(error);
        } else {
         
            console.log(req.body._id);
          console.log('Deleted book successfully!');
        }
      });
});