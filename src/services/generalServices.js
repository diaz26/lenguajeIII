'use strict'

module.exports = function () {

    async function dateToString(date) {
        let dat = new Date(date)
        let month = '' + (dat.getMonth() + 1),
            day = '' + dat.getDate(),
            year = dat.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-')
    }

    async function dateNow() {
        let dat = new Date()
        return await dateToString(dat)
    }
    return {
        dateToString,
        dateNow
    }
}
