// iNaturalist requests that apps rate limit to around 1 request a second.
// I've read the actual hard limit is 100 requests a minute.
// This limiter will restrict requests to just over 60 a minute at absolute maximum.
// It allows shorter limiting when few requests are made within a minute window,
// getting progressively longer until hitting around a 2 second limit at around 60 requests.
// This allows for faster response times when the app is used with natural user interaction
// delays in comparison to a flat 1 second delay for every request.
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const MINUTE = 60000;
const recentRequestTimes = [] as number[];
let nextTime = window.performance.now();

let difference = 0;

export async function limit(func: () => Promise<Response>) {
	let now = window.performance.now();
	difference = nextTime - now;

	if (difference > 0) {
		await delay(difference);
		now += difference;
	}

	nextTime = calculateNextTime(now);
	recentRequestTimes.push(now);

	return func();
}

function calculateNextTime(now: number): number {
	// Clear request times that have moved outside the minute window
	while (
		recentRequestTimes.length > 0 &&
		now - recentRequestTimes[0] > MINUTE
	) {
		recentRequestTimes.shift();
	}

	// Delay more as more requests are inside the minute window.
	// This should have the effect of around a 1 sec delay after 30 requests,
	// and 2 seconds for 60 requests, resulting in no more than around 60 requests a minute.
	const delay = recentRequestTimes.length * 33;

	return now + delay;
}
