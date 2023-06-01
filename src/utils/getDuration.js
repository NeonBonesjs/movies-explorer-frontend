export default function getDuration (num) {
    if(num < 60) {
        return `${num}м`
    } else if(num === 60) {
        return '1ч'
    } else if(num === 120) {
        return '2ч'
    } else {
        return `${Math.trunc(num / 60)}ч  ${num % 60}м`
    }
    
}