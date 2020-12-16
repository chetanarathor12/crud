var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');


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

//get data
router.get('/degree', (req, res, next) => {
    console.log("in emp");
    connection.query("SELECT * FROM degree", (err, rows) => {
        if (!err)

            res.json(rows)
        else

            throw err;
    });

})




/*Get the user Data*/
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    var sql = `SELECT * FROM degree WHERE id=${id}`;
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
    var degree_name = req.body.degree_name;
    var degree_year = req.body.degree_year;
    var college_name = req.body.college_name;
    var course_name = req.body.course_name;
    var sql = `UPDATE degree SET degree_name='${degree_name}',degree_year='${degree_year}',college_name='${college_name}',course_name='${course_name}' WHERE id='${id}'`;
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log(result);
        res.json({'status':'success'});

    })

});

/*post method for create product*/
router.post('/create', function (req, res, next) {

    var degree_name = req.body.degree_name;
    var degree_year = req.body.degree_year;
    var college_name = req.body.college_name;
    var course_name = req.body.course_name;


    var sql = `INSERT INTO  degree (degree_name,degree_year,college_name,course_name)\ VALUES ('${degree_name}', '${degree_year}','${college_name}','${course_name}')`;
    connection.query(sql, function (err, data) {
        if (err) throw err;
        console.log(data);
        res.json({ 'statu': 'success' })

    })
})
/*delete method for delete product*/
router.delete('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    var sql = `DELETE FROM degree WHERE id=${id}`;
    connection.query(sql, function (err, result) {
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success' })
    })
})

module.exports = router;
