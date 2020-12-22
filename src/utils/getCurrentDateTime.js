export default function getCurrentDateTime() {
    const NOW = new Date();
    return `${ NOW.getFullYear() }-${ (NOW.getMonth() + 1 < 10 ? '0' : '') + (NOW.getMonth() + 1).toString() }-${ (NOW.getDate() < 10 ? '0' : '') + NOW.getDate().toString() }_${ (NOW.getHours() < 10 ? '0' : '') + NOW.getHours().toString() }-${ (NOW.getMinutes() < 10 ? '0' : '') + NOW.getMinutes().toString() }-${ (NOW.getSeconds() < 10 ? '0' : '') + NOW.getSeconds().toString() }-${ (NOW.getMilliseconds() < 10 ? '00' : (NOW.getMilliseconds() < 100 ? '0' : '')) + NOW.getMilliseconds().toString() }`;
}
