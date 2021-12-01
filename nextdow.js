const moment = require('moment');


const UTCOffsetHour = 9;
const resetDOWs = ["1","4"];

const correctedUTCNow = moment.utc().add(UTCOffsetHour, 'h');
const nowDOW = correctedUTCNow.day();
let nextResetDayOfWeek = null;
let nextResetTime = null;

// 현재 요일이 마지막 갱신 요일 이후라면 최초 갱신요일을 사용
// ex) 0,3이 갱신 요일인데 목요일(4)~토요일(6) 사이에 갱신 요청이 온다면 갱신 요일을 모두 지났으니 무조건 갱신
const maxDow = Math.max.apply(Math, resetDOWs);
console.log('maxDow=' + maxDow);
if (maxDow <= nowDOW) {
    nextResetDayOfWeek = resetDOWs[0];
}
// 다음 갱신 요일을 구한다
else {
    for (let i = 0; i < resetDOWs.length; i++) {
        const dow = resetDOWs[i];

        if (nowDOW < dow) {
            nextResetDayOfWeek = dow;
            break;
        }

        nextResetDayOfWeek = resetDOWs[i - 1] ? resetDOWs[i - 1] : resetDOWs[0];
    }
}

console.log('nextResetDayOfWeek=' + nextResetDayOfWeek);

if (nextResetDayOfWeek != null) {
    if (nowDOW < nextResetDayOfWeek) {
        nextResetTime = correctedUTCNow.day(nextResetDayOfWeek).hour(0).minute(0).second(0);
        console.log('1 nextResetTime=' + nextResetTime);
    }
    else {
        const t = nextResetDayOfWeek + 7;
        console.log('t===' + t);
        nextResetTime = correctedUTCNow.day(nextResetDayOfWeek + 7).hour(0).minute(0).second(0);
        console.log('2 nextResetTime=' + nextResetTime);
    }

    if (nextResetTime) {
        nextResetTime = nextResetTime.subtract(UTCOffsetHour, 'h').format(this.DateTimeFormat);
        console.log('3 nextResetTime=' + nextResetTime);
    }
}

console.log(nextResetTime);