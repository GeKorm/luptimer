jQuery(document).ready(function() {

var microsecondsDsp = jQuery('#microsecondsDsp');
var millisecondsDsp = jQuery('#millisecondsDsp');
var secondsDsp = jQuery('#secondsDsp');
var minutesDsp = jQuery('#minutesDsp');
var hoursDsp = jQuery('#hoursDsp');

function startDoc() {
    jQuery('#start-button').css('font-weight', 'bold');
    jQuery('#hold-button').removeClass('button');
    jQuery('#hold-button').addClass('disabled');
    jQuery('#pause-button').removeClass('button');
    jQuery('#pause-button').addClass('disabled');
    jQuery('#pause-button').css('outline', 'none');
    jQuery('#pause-button').text('Pause');
}

startDoc();
var hey = $luptimer();
var pauseCount = 0;
var startOnce = false;



jQuery('#start-button').on('click', function () {
    jQuery('#start-button').css('font-weight', '300');
    jQuery('#start-button').removeClass('button');
    jQuery('#start-button').addClass('disabled');
    jQuery('#start-button').css('outline', 'rgba(235, 169, 0, 0.25) dashed 1px');
    jQuery('#pause-button').addClass('button');
    jQuery('#pause-button').removeClass('disabled');
    jQuery('#pause-button').css('outline', 'none');
    jQuery('#pause-button').text('Pause');
    hey.start();
    startOnce = true;
    pauseCount = 0;
    hey.display('#hoursDsp', 'hours');
    hey.display('#minutesDsp', 'minutes');
    hey.display('#secondsDsp', 'seconds');
    hey.display('#millisecondsDsp', 'milliseconds');
    hey.display('#microsecondsDsp', 'microseconds');
});

jQuery('#pause-button').on('click', function () {
    if (startOnce === true) {
        jQuery('#start-button').addClass('button');
        jQuery('#start-button').removeClass('disabled');
        jQuery('#start-button').css('outline', 'none');
        if (jQuery('#start-button').css('font-weight') != 'bold') {
            jQuery('#pause-button').text('Reset');
            jQuery('#pause-button').css('outline', 'rgba(235, 169, 0, 0.25) dashed 1px');
        }
        hey.pause();
        if (pauseCount >= 1) {
            hey.reset();
            microsecondsDsp.text(0);
            millisecondsDsp.text(0);
            secondsDsp.text(0);
            minutesDsp.text(0);
            hoursDsp.text(0);
            ('#pause-button').css('outline', 'none');
            ('#pause-button').text('Pause');
            startDoc();
        }
        pauseCount += 1;
    }
});
});

