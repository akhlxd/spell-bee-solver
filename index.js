// setting up the required modules

const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require('path');
const exphbs = require('express-handlebars');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();

//setting up templating engine

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

//setting directory path

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const spawn = require('child_process').spawn;
//let html='';

app.get('/', (req, res) => {
    res.redirect('/index');
});

app.post('/index', (req, res) => {
	console.log(req.body)
	
	let html='';

	let spec_char=req.body['spec_char'];
	let ch1=req.body['ch1'].toLowerCase();
	let ch2=req.body['ch2'].toLowerCase();
	let ch3=req.body['ch3'].toLowerCase();
	let ch4=req.body['ch4'].toLowerCase();
	let ch5=req.body['ch5'].toLowerCase();
	let ch6=req.body['ch6'].toLowerCase();

	console.log(`special character: ${spec_char}`);
	console.log(`character 1: ${ch1}`);
	console.log(`character 2: ${ch2}`);
	console.log(`character 3: ${ch3}`);
	console.log(`character 4: ${ch4}`);
	console.log(`character 5: ${ch5}`);
	console.log(`character 6: ${ch6}`);

	const ls = spawn('python', [
    'solver.py',
    spec_char,
    ch1,
    ch2,
    ch3,
    ch4,
    ch5,
    ch6,
  ]);
	ls.stdout.on('data', (data) => {
    //console.log(`stdout: ${data}`);
    html = data.toString()
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
		req.session.context= html;
		//console.log('context : ', req.session.context);
		res.redirect('/result');
    //console.log('HTML: ', html);
  });

	
});

app.get('/result', (req, res) => {
	let context = req.session.context;
	//console.log('context : ', context);
	res.render('result', {context});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
