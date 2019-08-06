const   express =       require('express'),
        bodyParser =    require('body-parser');
const   generator =     require('./generator.js');

app = express()
    .use(bodyParser.urlencoded({extended: true}))
    .use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // console.log(req.query.options);
    res.render('index', {ipsum: generator.generate(req.query.options)});
});

app.get('/api/belta', (req, res) => {
    console.log(req.query.options);
    let generatedText = generator.generate(req.query.options);
    res.json(generatedText);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Starting server on port 3000');
});