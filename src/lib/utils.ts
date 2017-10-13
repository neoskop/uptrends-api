
export function formatDate(date : Date|string) : string {
    if(typeof date === 'string') {
        if(!/^\d{4}\/\d{2}\/\d{2}$/.test(date)) {
            throw new Error(`Invalid date provided, required Date or string with format "yyyy/mm/dd", "${date}" given`);
        }
        return date;
    }
    
    if(Number.isNaN(date.getTime())) {
        throw new Error(`Invalid date provided, required Date or string with format "yyyy/mm/dd", "${date}" given`);
    }
    
    let m = (date.getMonth() + 1).toString(),
        d = date.getDate().toString();
    
    if(1 === m.length) {
        m = `0${m}`;
    }
    if(1 === d.length) {
        d = `0${d}`;
    }
    
    return `${date.getFullYear()}/${m}/${d}`;
}

export function url(strings : TemplateStringsArray, ...values : any[]) : string {
    let result = '';
    for(let i = 0, l = values.length; i < l; ++i) {
        result += strings[i] + encodeURIComponent(values[i]);
    }
    result += strings[strings.length - 1];
    
    return result;
}
