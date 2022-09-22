
export function ComputeTimeDifference(current: number, previous: number): string {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + " seconds ago";   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + " minutes ago";   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + " hours ago";   
    }
    else if (elapsed < msPerMonth) {
        const number = Math.round(elapsed/msPerDay);
        if (number === 1) {
            return 'less than ' + Math.round(elapsed/msPerDay) + " day ago";
        } else {
            return 'less than ' + Math.round(elapsed/msPerDay) + " days ago";
        }
    }
    else if (elapsed < msPerYear) {
        return 'less than ' + Math.round(elapsed/msPerMonth) + " months ago";   
    }
    else {
        return 'less than ' + Math.round(elapsed/msPerYear ) + " years ago";   
    }

}

export function ComputeCurrentTimeDifference(timestamp: number): string {
    return ComputeTimeDifference(Date.now(), timestamp);
}
