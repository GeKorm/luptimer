var $microsecondsDsp = $('#microsecondsDsp');
var $millisecondsDsp = $('#millisecondsDsp');
var $secondsDsp = $('#secondsDsp');
var $minutesDsp = $('#minutesDsp');
var $hoursDsp = $('#hoursDsp');

function startDoc() {
    $('#start-button').css('font-weight', 'bold');
    $('#hold-button').removeClass('button');
    $('#hold-button').addClass('disabled');
    $('#pause-button').removeClass('button');
    $('#pause-button').addClass('disabled');
    $('#pause-button').css('outline', 'none');
    $('#pause-button').text('Pause');
}

startDoc();
var hey = $luptimer();
var pauseCount = 0;
var startOnce = false;



$('#start-button').on('click', function () {
    $('#start-button').css('font-weight', '300');
    $('#start-button').removeClass('button');
    $('#start-button').addClass('disabled');
    $('#start-button').css('outline', 'rgba(235, 169, 0, 0.25) dashed 1px');
    $('#pause-button').addClass('button');
    $('#pause-button').removeClass('disabled');
    $('#pause-button').css('outline', 'none');
    $('#pause-button').text('Pause');
    hey.start();
    startOnce = true;
    pauseCount = 0;
    hey.display('#hoursDsp', 'hours');
    hey.display('#minutesDsp', 'minutes');
    hey.display('#secondsDsp', 'seconds');
    hey.display('#millisecondsDsp', 'milliseconds');
    hey.display('#microsecondsDsp', 'microseconds');
});

$('#pause-button').on('click', function () {
    if (startOnce === true) {
        $('#start-button').addClass('button');
        $('#start-button').removeClass('disabled');
        $('#start-button').css('outline', 'none');
        if ($('#start-button').css('font-weight') != 'bold') {
            $('#pause-button').text('Reset');
            $('#pause-button').css('outline', 'rgba(235, 169, 0, 0.25) dashed 1px');
        }
        hey.pause();
        if (pauseCount >= 1) {
            hey.reset();
            $microsecondsDsp.text(0);
            $millisecondsDsp.text(0);
            $secondsDsp.text(0);
            $minutesDsp.text(0);
            $hoursDsp.text(0);
            $('#pause-button').css('outline', 'none');
            $('#pause-button').text('Pause');
            startDoc();
        }
        pauseCount += 1;
    }
});