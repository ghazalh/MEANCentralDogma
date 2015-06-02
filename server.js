var express = require ('express');
var morgan=require ('morgan');
var colors = require('colors');
var bodyParser=require('body-parser');
var cp= require ('child_process');
var app = express();
var port=9001;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

  res.send(results);
});
})

// ==== Listen ====
app.listen(port);
console.log('Express server listening on port ' + port.toString().blue);


// ==== Serve static content ====
app.use(express.static('public'));
console.log('Serving static content from ' + 'public'.rainbow);

  

