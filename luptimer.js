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
        time: function (unit) {
            if (typeof unit === 'undefined') {
                return displayTime;
            } else {
                if (unit === 'hours') {
                    return Math.floor(Math.floor(Math.floor(displayTime / 1000) / 60) / 60);
                } else if (unit === 'minutes') {
                    return Math.floor(Math.floor(displayTime / 1000) / 60);
                } else if (unit === 'seconds') {
                    return Math.floor(displayTime / 1000);
                } else if (unit === 'milliseconds') {
                    return Math.floor(displayTime);
                } else if (unit === 'microseconds') {
                    return Math.floor(displayTime * 1000);
                } else {
                    console.log("No time unit specified");
                }
            }
        },
        total: function () {
            return totalTimeSincePageLoad();
        },
        display: function (selector, unit) {
            if (typeof unit === 'undefined') {
                return displayTime;
            } else {
                if (unit === 'hours') {
                    (function hdsp() {
                        if (timerRunning === true) {
                            requestAnimationFrame(hdsp);
                            document.querySelector(selector).textContent = hoursDsp.toString();
                        }
                    })();
                } else if (unit === 'minutes') {
                    (function mdsp() {
                        if (timerRunning === true) {
                            requestAnimationFrame(mdsp);
                            document.querySelector(selector).textContent = minutesDsp.toString();
                        }
                    })();
                } else if (unit === 'seconds') {
                    (function sdsp() {
                        if (timerRunning === true) {
                            requestAnimationFrame(sdsp);
                            document.querySelector(selector).textContent = secondsDsp.toString();
                        }
                    })();
                } else if (unit === 'milliseconds') {
                    (function mildsp() {
                        if (timerRunning === true) {
                            requestAnimationFrame(mildsp);
                            document.querySelector(selector).textContent = millisecondsDsp.toString();
                        }
                    })();
                } else if (unit === 'microseconds') {
                    (function micdsp() {
                        if (timerRunning === true) {
                            requestAnimationFrame(micdsp);
                            document.querySelector(selector).textContent = microsecondsDsp.toString();
                        }
                    })();
                } else {
                    console.log("No time unit specified");
                }
            }
        }
    };
    window.$luptimer = $luptimer;



})(window, document);
