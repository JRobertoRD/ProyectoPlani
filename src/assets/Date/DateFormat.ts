export class DateFormat {
    getDateWithFormat() {
        const date = new Date();
        let day = ''+date.getDate();
        let month = ''+date.getMonth();
        if (date.getDate() < 10) {
            day = '0' + date.getDate()
        }
        if (date.getMonth() + 1 < 10) {
            month = '0' + date.getMonth()
        }
        return day + "-" + month + "-" + date.getFullYear();
    }

}