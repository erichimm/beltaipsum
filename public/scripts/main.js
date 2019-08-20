$(function() {
    $('form').submit(async function(event) {
        event.preventDefault();
        let options = $(this).serialize();        
        let generatedText = await $.getJSON('/api',options);

        let text = '';
        generatedText.forEach((paragraph, i) => {
            text += paragraph;
            if(i !== generatedText.length-1) {
                text += '\n\n';
            }
        });
        $('.textDisplay').text(text);
    });

    $('#copyBtn').click(function(event) {
        $('body').append('<textarea class="hidden"></textarea>');
        let $temp = $('.hidden');
        $temp.text($('.textDisplay').text());
        $temp.select();
        document.execCommand('copy');
        $('.hidden').remove();
        $('.tooltiptext').text('Copied!');
    });

    $('#copyBtn').mouseleave(function(event) {
        $('.tooltiptext').text('Copy to Clipboard');
    });
});