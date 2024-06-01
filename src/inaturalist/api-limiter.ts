const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const LIMIT = 1000;
let nextTime = window.performance.now();
let difference = 0;

export async function limit(func: () => Promise<Response>){
    difference = (nextTime - window.performance.now());
    
    if (difference > 0) {
        nextTime += LIMIT;
        await delay(difference);
    }
    else {
        nextTime = window.performance.now() + LIMIT;
    }
    return func();
}