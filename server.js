var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var Bear = require('./models/bears');


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
	console.log('Something is happening');
	next();
});

router.get('/', function(req, res){
	res.json({ message: 'hooray! welcome to our api!'});
});

router.route('/bears')
	.post(function(req, res){
		
		var bear = new Bear();
		bear.name = req.body.name;
		bear.age = req.body.age;
		bear.gender = req.body.gender;
		
		bear.save(function(err, bear){
			if(err){
			console.log(err)
			} else {
			res.json(bear)

			}
		})	
	})

	.get(function(req, res){
		Bear.find(function(err, bears){
			if(err){

			} else {
				res.json(bears)
			}
		})
	})

router.route('/bears/:bear_id')

	.get(function(req, res){
		Bear.findById(req.params.bear_id, function(err, bear){
			if(err){
				console.log(err);
			
			} else {
				res.json(bear);
			}
		})
	})

	.put(function(req, res){
		Bear.findById(req.params.bear_id, function(err, bear){
			if(err){
				console.log(err)
			} else {
				bear.name = req.body.name ? req.body.name : bear.name;
				bear.age = req.body.age ? req.body.age : bear.age;
				bear.gender = req.body.gender ? req.body.gender : bear.gender;

				bear.save(function(err){
					if(err){
						console.log(err);
					}

					res.json({ message: 'Bear updated!'});
				})
			}
			
		})
	})

	.delete(function(req, res){
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear){
			if(err){
				console.log(err);
			} else {
				res.json({ message: 'Successfully deleted'});

			}
		})
	})

app.use('/api', router);

app.listen(port);
	console.log('Magic happens on port ' + port);