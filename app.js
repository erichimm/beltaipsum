const   express =       require('express'),
        app =           express(),
        bodyParser =    require('body-parser');

const   generator =     require('./generator.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // console.log(req.query.options);
    res.render('index', {ipsum: generator.generate(req.query.options)});
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Starting server on port 3000');
});