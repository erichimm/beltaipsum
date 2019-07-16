var fs = require('fs');
var os = require('os');

function generate(options) {
    if(!options) {
        return null;
    }

    var words = getWords(options.genType);

    var numParagraphs = options.paragraphs;
    var text = '';
    for(var i=0; i<numParagraphs; i++){
        // let paragraph length be between [5, 15) sentances long
        let paragraphLength = Math.floor(Math.random() * 10) + 5;
        text += makeParagraph(words, paragraphLength);
        if(i != numParagraphs-1) {
            text += '\n';
        }
    }

    if(options['start-with-belta'] === 'on') {
        text = 'Belta ipsum dolor amet ' + text.charAt(0).toLowerCase() + text.slice(1);
    }
    if(options['end-with-sasa'] === 'on') {
        text = text.slice(0, text.length-3) + ', sasa ke?';
    }

    return text;
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

function makeSentence(words, length) {
    var sentence = '';

    for(let i=0; i<length; i++) {
        // pick a random word from [0, words.length)
        let word = words[Math.floor(Math.random() * words.length)];
        // if first word, capitalize
        if(i === 0) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        sentence += word;

        // 10% chance to add a comma in the middle of the sentence
        if(i>3 && i<length-3) {
            if(Math.random()*10 < 1) {
                sentence += ',';
            }
        }
        if(i === length-1) {
            sentence += '.';
        } else {
            sentence += ' ';
        }
    }

    return sentence;
}

function makeParagraph(words, numSentences) {
    var paragraph = '';
    
    for(let i=0; i<numSentences; i++) {
        // let sentance length be between [5, 25) words long
        let sentenceLength = Math.floor(Math.random() * 20) + 5;
        paragraph += makeSentence(words, sentenceLength);

        if(i === numSentences-1) {
            paragraph += '\n';
        } else {
            paragraph += ' ';
        }
    }

    return paragraph;
}

module.exports = { generate };