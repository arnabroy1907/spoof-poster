export const getStringedDate = (millis: number) => {
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayShortArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthShortArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const instDate = new Date(millis);
    
    const date = instDate.getDate();
    const month = instDate.getMonth();
    const year = instDate.getFullYear();

    const day = instDate.getDay();

    const hours = instDate.getHours();
    const minutes = instDate.getMinutes();
    const seconds = instDate.getSeconds();

    let formattedHour = hours;
    let ampm = 'AM';

    if (hours > 11) {
        ampm = 'PM';
    }

    if (hours > 12) {
        formattedHour = hours - 12;
    }

    if (hours === 0) {
        formattedHour = 12;
    }

    return `${dayShortArr[day]} ${date} ${monthShortArr[month]} ${year} ${formattedHour < 10 ? '0' : ''}${formattedHour}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}