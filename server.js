var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var bearRouter = require('./routes/bears');

var Bear = require('./models/bears');


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index', {title: 'What up world!'} )
});


app.get('/about', function(req, res){
	var data = {};
	data.title = 'About Page';
	data.name = 'Jarome';
	data.time = new Date();
	res.render('about', data);
});

app.get('/bears', function(req, res){
	Bear.find(function(err, bears){
			if(err){
				console.log(err)
			} else {
			res.render('bears', { bears: bears })	
			}
		})
	
});

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
	console.log('Something is happening');
	next();
});

router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to our api!'});
})

app.use('/api', bearRouter);

app.listen(port);
	console.log('Magic happens on port ' + port);