var express = require('express');
var multer = require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
//var http=require('http');
var Storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "" + Date.now() + path.extname(file.originalname));
  }
})
var upload = multer({
  storage: Storage
}).single('file');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "matka",
  port: 3306
});
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});
router.get('/user', (req, res, next) => {
  console.log("in emp");
  connection.query("SELECT * FROM user", (err, rows) => {
    if (!err)

      res.json(rows)
    else

      throw err;
  });

})

//Showing login form 
router.get("/login", function (req, res) {
  res.render("index");
});

/*User login Api*/
router.post('/login', function (req, res, next) {
  var login = req.body.login;
  var password = req.body.password;
  var sql = `SELECT login,password FROM user WHERE login="${login}" AND password="${password}" `;
  connection.query(sql, function (err, row) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ row: "login successfull" });
  })
});


/*Get the user Data*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM user WHERE id=${id}`;
  connection.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(row)
  })
});

/*Update Api*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var login = req.body.login;
  var password = req.body.password;
  var Address = req.body.Address;
  var Mobile_No = req.body.Mobile_No;
  var sql = `UPDATE user SET name='${name}',login='${login}',password='${password}',Address='${Address}',Mobile_No='${Mobile_No}' WHERE id='${id}'`;
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(result);

  })

});

/*post method for create product*/
router.post('/create', upload, function (req, res, next) {

  var name = req.body.name;
  var login = req.body.login;
  var password = req.body.password;
  var image = req.file.filename;
  var Address = req.body.Address;
  var Mobile_No = req.body.Mobile_No;
  console.log("image--", imagefile);

  var sql = `INSERT INTO  user (name,login,password,image,Address,Mobile_No)\ VALUES ('${name}', '${login}','${password}','${image}','${Address}','${Mobile_No}')`;
  connection.query(sql, function (err, data) {
    if (err) throw err;
    console.log(data);

  })
})
/*delete method for delete product*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM user WHERE id=${id}`;
  connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
})

module.exports = router;
