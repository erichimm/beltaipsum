const fs = require('fs');
const os = require('os');

function generator(options) {
    if(!options) {
        return null;
    }

    var words = getWords(options.type);

    var numParagraphs = options.paragraphs;
    var text = [];
    for(var i=0; i<numParagraphs; i++){
        // let paragraph length be between [5, 15) sentances long
        let paragraphLength = Math.floor(Math.random() * 10) + 5;
        text.push(makeParagraph(words, paragraphLength));
    }

    if(options['start-with-belta'] === 'on') {
        let first = text[0];
        first = 'Belta ipsum dolor amet ' + first.charAt(0).toLowerCase() + first.slice(1);
        text[0] = first;
    }
    if(options['end-with-sasa'] === 'on') {
        let last = text[text.length-1];
        last = last.slice(0, last.length-1) + ', sasa ke?';
        text[text.length-1] = last;
    }

    return text;
}

function getWords(type) {
    if(type === 'belta-latin') {
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

        if(i !== numSentences-1) {
            paragraph += ' ';
        }
    }

    return paragraph;
}

module.exports = generator;