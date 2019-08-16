const   express =       require('express'),
        bodyParser =    require('body-parser');
const   generator =     require('./generator.js');

app = express()
    .use(bodyParser.urlencoded({extended: true}))
    .use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/belta', (req, res) => {
    // console.log(req.query);
    let generatedText = generator(req.query);
    res.json(generatedText);
})

app.listen(process.env.PORT || 3001, () => {
    console.log('Starting server on port 3000');
});