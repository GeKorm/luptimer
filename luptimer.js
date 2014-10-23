(function (window, document, undefined) {
    window.requestAnimationFrame = (function () {
        return (
        window.RequestAnimationFrame || window.RequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimaationFrame || function (callback, element) {
            //Unsupported browser
            window.setTimeout(callback, 1000 / 60);
        });
    })();

    window.performance = window.performance || {};
    performance.now = (function () {
        return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
            //Unsupported browser
            return new Date().getTime();
        };
    })();

    var microsecondsDsp = 0;
    var millisecondsDsp = 0;
    var secondsDsp = 0;
    var minutesDsp = 0;
    var hoursDsp = 0;
    var displayTime = 0;
    var startClickTimeVar = 0;
    var pauseTime = 0;
    var timerRunning = false;
    var timerPaused = false;
    var pauseCount = 0;

    function timer() {
        if (timerRunning === true) {
            requestAnimationFrame(timer);
            displayTime = totalTimeSincePageLoad() - startClickTimeVar;
            microsecondsDsp = (Math.floor(displayTime * 1000) % 1000);
            millisecondsDsp = (Math.floor(displayTime) % 1000);
            secondsDsp = (Math.floor(displayTime / 1000) % 60);
            minutesDsp = (Math.floor(Math.floor(displayTime / 1000) / 60) % 60);
            hoursDsp = (Math.floor(Math.floor(Math.floor(displayTime / 1000) / 60) / 60) % 60);
        }
    }

    function totalTimeSincePageLoad() {
        var total = performance.now();
        return total;
    }


    var $luptimer = function () {

        if (window === this) {

            return new $luptimer();
        }
        return this;
    };
    $luptimer.fn = $luptimer.prototype = {
        start: function () {
            if (timerRunning === false && timerPaused === false) {
                timerRunning = true;
                startClickTimeVar = totalTimeSincePageLoad();
                timer();
            } else if (timerRunning === false && timerPaused === true) {
                startClickTimeVar = totalTimeSincePageLoad() - pauseTime + startClickTimeVar;
                timerRunning = true;
                timerPaused = false;
                timer();
            }
        },
        pause: function () {
            timerRunning = false;
            timerPaused = true;
            pauseTime = totalTimeSincePageLoad();
        },
        reset: function () {
            microsecondsDsp = 0;
            millisecondsDsp = 0;
            secondsDsp = 0;
            minutesDsp = 0;
            hoursDsp = 0;
            displayTime = 0;
            startClickTimeVar = 0;
            timerRunning = false;
            timerPaused = false;
        },
        time: function () {
            return displayTime;
        },
        total: function () {
            return totalTimeSincePageLoad();
        },
        display: function (selector, unit) {
            return totalTimeSincePageLoad();
        }
    };
    window.$luptimer = $luptimer;



})(window, document);
