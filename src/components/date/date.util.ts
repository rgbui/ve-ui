import moment from 'moment';

export var dateUtil = {
    pad(n) {
        return n.toString().length == 1 ? "0" + n : n;
    },
    parse(dateString: string) {
        return moment(dateString, "YYYY-MM-DD HH:mm:ss").toDate();
    },
    toString(date: Date) {
        moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    dateToText(date: Date, mode: 'date' | 'datetime' | 'time') {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            minute = date.getMinutes(),
            hour = date.getHours(),
            second = date.getSeconds();
        if (mode == "date")
            return `${year}-${this.pad(month)}-${this.pad(day)}`;
        else if (mode == "datetime") {
            return `${year}-${this.pad(month)}-${this.pad(day)} ${this.pad(hour)}:${this.pad(minute)}:${this.pad(second)}`;
        } else if (mode == "time") {
            return `${this.pad(hour)}:${this.pad(
                minute
            )}:${this.pad(second)}`;
        }
    }
}