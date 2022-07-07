const formatYearTime = date => {
    const year = date.getFullYear();
    return year;
}

const formatMonthTime = date => {
    const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    return month;
}

const formatDateTime = date => {
    const curdate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return curdate;
}

const formatHourTime = date => {
    const hour = date.getHours();
    return hour;
    // const minute = date.getMinutes();
    // return [hour,minute].map(formatNumber).join(':');
}

const formatMinTime = date => {
    const minute = date.getMinutes();
    return minute;
    // return [hour,minute].map(formatNumber).join(':');
}

const formatSTime = date => {
    const s = date.getSeconds();
    return s;
}

// function formatNumber(n) {
//     n = n.toString()
//     return n[1] ? n : '0' + n
// }

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    formatYearTime: formatYearTime,
    formatMonthTime: formatMonthTime,
    formatDateTime: formatDateTime,
    formatHourTime: formatHourTime,
    formatMinTime:formatMinTime,
    formatSTime: formatSTime,
    formatNumber:formatNumber,
}