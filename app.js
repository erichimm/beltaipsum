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

app.get('/api', (req, res) => {
    // console.log(req.query);
    let generatedText = generator(req.query);
    res.json(generatedText);
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => console.log(`Starting server on port ${port}`));
