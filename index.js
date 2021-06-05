
var express = require('express');
var app = express();
app.use(express.static("public"));

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var port = 64455
app.set('port', port);

var mysql = require('./seprate.js');

app.get('/reset-table',function(req,res,next){
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
      var string = "CREATE TABLE workouts("+ "id INT PRIMARY KEY AUTO_INCREMENT,"+ "name VARCHAR(255) NOT NULL,"+ "reps INT,"+ "weight INT,"+ "date DATE," +  "lbs BOOLEAN)";
      mysql.pool(string, function(err){
        context.results = "Table reset";
        res.render('home',context);
        })
    });
}); 

app.get('/',function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
      if(err){
        next(err);
        result = context;
        return;
      }
      context = JSON.stringify(rows);
      console.log(context);	
      res.render('home', context);
    });
  });

app.post("/insert", function(req, res, next) {
    var context = {};
	mysql.pool.query("INSERT INTO workouts (`name`, `date`,`reps`,`weight`,`lbs`) VALUES (?,?,?,?,?)", [req.body.name, req.body.date, req.body.reps, req.body.weight, req.body.unit], function(err, result){
		if(err){
			next(err);
            result = context;
			return;
		}
        context.inserted = result.insertId;
        console.log(context);	
        res.send(JSON.stringify(context));
	});
});

app.get('/delete', function(req, res, next) {
    var context = {};
    mysql.pool.query("DELETE FROM `workouts` WHERE id = ?", [req.query.id], function(err, result) {
        result = context;
        if(err){
            next(err);
            result = context;
            return;
        }
        result = context.result;
        context = JSON.stringify(rows);
        console.log(context);	
        res.render('home', context);
    });
});

app.get('/update',function(req,res,next){
    var context = {};
    mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
      if(err){
        result = context;
        next(err);
        return;
      }
      if(result.length == 1){
        var current = result[0];
        mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
          [req.query.name || current.name, req.query.reps || current.reps, req.query.weight || current.weight, req.query.date || current.date, req.query.lbs || current.lbs, req.query.id], function(err, result){
            result = context;
            if(err){
                next(err);
                result = context;
                return;
            }
            result = context.result;
            context = JSON.stringify(rows);
            console.log(context);	
            res.render('home', context);
            });
      }
    });
  });