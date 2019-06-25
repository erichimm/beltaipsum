var fs = require('fs');
var os = require('os');

function generate(options) {
    if(!options) {
        return null;
    }
    console.dir(options);

    var words = getWords(options.genType);

    return JSON.stringify(options);
}

function getWords(type) {
    if(type === 'belta-with-filler') {
        var belterWords = fs.readFileSync('./public/assets/belter_library.txt')
                            .toString('utf-8').split(os.EOL);
        var latinWords = fs.readFileSync('./public/assets/ipsum_library.txt')
                            .toString('utf-8').split(os.EOL);
        belterWords.push(...latinWords);
        return belterWords;
    } else {
        var belterWords = fs.readFileSync('./public/assets/belter_library.txt')
                            .toString('utf-8').split(os.EOL);
        return belterWords;
    }
}

module.exports = { generate };