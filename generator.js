var fs = require('fs');
var os = require('os');

function generate(options) {
    if(!options) {
        return null;
    }
    console.dir(options);

    var words = getWords(options.genType);

    var text = '';
    for(var i=0; i<options.paragraphs; i++){
        text += makeParagraph(words);
    }

    return JSON.stringify(text);
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

function makeSentance(words, length) {
    var sentance = '';

    for(var i=0; i<length; i++) {
        // pick a random word from [0, words.length)
        let word = words[Math.floor(Math.random() * words.length)];
        // if first word, capitalize
        if(i === 0) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        sentance += word;

        // 10% chance to add a comma in the middle of the sentance
        if(i>3 && i<length-3) {
            if(Math.random()*10 < 1) {
                sentance += ',';
            }
        }
        if(i === length-1) {
            sentance += '.';
        } else {
            sentance += ' ';
        }
    }

    return sentance;
}

function makeParagraph(words) {
    return makeSentance(words, 14) + ' ';
}

module.exports = { generate };