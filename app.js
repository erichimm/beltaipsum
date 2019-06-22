const   express =       require('express'),
        app =           express(),
        bodyParser =    require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log(req.query.options);
    res.render('index');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Starting server on port 3000');
});