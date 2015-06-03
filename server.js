var express = require ('express');
var morgan=require ('morgan');
var colors = require('colors');
var bodyParser=require('body-parser');
var cp= require ('child_process');
var mongoose= require('mongoose');
var app = express();
var port=9001;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// === Connect to MongoDB ====

mongoose.connect('mongodb://localhost/DNA');

//====================CORS===================
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//================morgan=================
app.use(morgan(
    ':method '.magenta + 
    ':url '.yellow + 
    ':status '.blue +
    ':res[content-length] '.italic.grey + 'bits '.italic.blue 
    + 'sent in ' + ':response-time ms'.grey
));

// ==== Schemas ====
var DNASchema = mongoose.Schema({
    'sequence': String,
    'dnainput': String
});

// ==== Models ====
var DNASeq = mongoose.model('DNA', DNASchema);

/*var user1 = new DNASeq({
	username: 'Bob',
	password: 'sdsdsdsd'
});

user1.save(function(err, savedUser) {
	if (err) {
		console.log(err);
	} else {
		console.log(savedUser);
	}
});
*/

// POST /genDNA
app.post('/genDNA', function(req, res){
     var arg = req.body.arg;
    // will populate this object depending on python output
    var results = {
        received: req.body,
        errorlog: null,
        exitcode: null,
        output: null
    };

   

    // Spawn child process





var myPython = cp.spawn('python', ['DNAtoAA.py', arg]);

myPython.stdout.on('data',function(data) {
  results.output = data.toString();
});

myPython.stderr.on('data', function(data) {
  results.output = data.toString();
});

myPython.on('close', function(code) {
  results.exitcode= code;
if (code === 0) {
            // success, store sequence in DB
            var seq = new DNASeq({
                sequence: results.output,
                dnainput: arg 
            });

            seq.save(function(err, sequence){
                if (err) console.error(err);
                
                console.log('saved sequence');
            });
        }
  res.send(results);
});
})

// GET /dnas
app.get('/dnas', function(req, res) {
    DNASeq.find(function(err, dnas){
        if (err) console.error(err);
        
        res.send(dnas);
    });
});
// ==== Listen ====
app.listen(port);
console.log('Express server listening on port ' + port.toString().blue);


// ==== Serve static content ====
app.use(express.static('public'));
console.log('Serving static content from ' + 'public'.rainbow);
