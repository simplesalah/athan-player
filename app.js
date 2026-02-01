const child_process = require('child_process');
const prayTimes = require('./PrayTimes.js');

// ------ Config ------
//TODO: move to file
const latitude = 21.427378; //negative value for South, positive for North
const longitute = 39.814838; //negative value for West, positive for East

const athanFile = '/home/pi/athan-player/athan.mp3'
const fajrAthanFile = '/home/pi/athan-player/athan-fajr.mp3'

const weekdayEnabledPrayers = ['fajr', 'isha']
const weekendEnabledPrayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

const calcMethod = 'ISNA'; //or MWL, Makkah, Karachi, etc
const asrMethod = 'Standard'; //either Hanafi or Standard

const debugEnabled = true;
// ------ Config end ------

(async function main() {
    while (true) {
        debug(`Starting main loop.`);

        let {nextPrayer, nextAthanTime} = getNextAthan();
        
        await sleepTill(nextAthanTime);

        if (passesConfig(nextPrayer)) {
            playAthan(nextPrayer);
        }
    }
})()

//returns Date object of next prayer's athan time
function getNextAthan() {
    let currTime = new Date();
    let athanTimes = getAthanTimes(currTime);

    let nextPrayer = null;
    let prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

    for (let i=0; i<prayers.length; i++) {
        let prayer = prayers[i]
        let athanTime = timeToDate( athanTimes[prayer] );

        if (athanTime >= currTime) {
            nextPrayer = prayer;
            break;
        }
    }

    if (nextPrayer) {
        let nextAthanTime = timeToDate( athanTimes[nextPrayer] );

        debug(`Next prayer is ${nextPrayer} at ${nextAthanTime}.`);
        return {nextPrayer, nextAthanTime};
    }
    else {
        let nextPrayer = 'fajr';

        let tomorrow = addDays(currTime, 1);
        athanTimes = getAthanTimes(tomorrow);

        let nextAthanTime = timeToDate( athanTimes[nextPrayer] );
        nextAthanTime = addDays(nextAthanTime, 1); //Having to do this is non-intuitive. Improve your APIs.

        debug(`Next prayer is ${nextPrayer} at ${nextAthanTime}.`);
        return {nextPrayer, nextAthanTime};
    }
}

//sample response: 
//{"imsak":"04:42","fajr":"04:52","sunrise":"06:10","dhuhr":"11:34","asr":"14:30","sunset":"16:58","maghrib":"16:58","isha":"18:17","midnight":"23:34"}
function getAthanTimes(date) {
    prayTimes.setMethod(calcMethod); 
    prayTimes.adjust( {asr: asrMethod} );
    return prayTimes.getTimes(date, [latitude, longitute], 'auto', 'auto', '24h');
}

//convert a 24 hour time (e.g. "23:11") to a Date object of today's date.
function timeToDate(time_24) {
    let today = new Date();
    let yyyy = today.getFullYear();

    let month = today.getMonth(); // Jan is 0
    let mm = month < 9 ? `0${month + 1}` : `${month + 1}`

    let day = today.getDate();
    let dd = day < 10 ? `0${day}` : `${day}`

    debug(`${yyyy}-${mm}-${dd}T${time_24}:00`);
    return new Date(`${yyyy}-${mm}-${dd}T${time_24}:00`)
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// must call this with await! 
async function sleepTill(time) {
    let ms = time - new Date();
    if (ms > 0) {
        debug(`Sleeping for ${ms} ms.`);
        await new Promise(resolve => setTimeout(resolve, ms));
    }
}

function passesConfig(prayer) {
    if (todayIsWeekday())
        return weekdayEnabledPrayers.includes(prayer);
    else
        return weekendEnabledPrayers.includes(prayer);
}

function todayIsWeekday() {
    let day = new Date().getDay();
    return day != 0 && day != 6;
}

function playAthan(prayer) {
    debug(`Playing athan for ${prayer}.`);

    let args = [];
    if (prayer == 'fajr')
        args.push(fajrAthanFile);
    else
        args.push(athanFile);

    const env = {
      ...process.env,
      XDG_RUNTIME_DIR: `/run/user/${process.getuid()}`
    };

    child_process.execFileSync('mpg123', args, {env})
}

function playAthanMac(prayer) {
    let args = [];
    if (prayer == 'fajr')
        args.push(fajrAthanFile);
    else
        args.push(athanFile);
    child_process.execFileSync('afplay', args)
}

function debug(msg) {
    if (debugEnabled) {
        console.log(msg);
    }
}
