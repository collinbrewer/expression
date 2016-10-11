// https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSExpression_Class/#//apple_ref/occ/clm/NSExpression/expressionForFunction:arguments:

function num (n) { return (isNaN(n) ? 0 : n); }

function avg (a) { return sum(a) / a.length; }

function sum (a) {
	return a.reduce(function (p, c) {
		return num(c) + p;
	}, 0);
}

function count (a) { return a.length; }

function min (a) {
	return a.reduce(function (p, c) {
		p = num(p);
		c = num(c);
		return (p < c ? p : c);
	}, undefined);
}

function max (a) {
	return a.reduce(function (p, c) {
		return (p > c ? p : c);
	}, undefined);
}

function median (arr) {
	if (arr.length === 0) return undefined;
	arr.sort(function (a, b) { return num(a) - num(b); });
	var l = arr.length;
	var h = ~~(l / 2);
	return (l % 2 === 1 ? arr[h] : (arr[h - 1] + arr[h]) / 2);
}

function mode (a) {
	return a.reduce(function (p, c) {
		var frequency = ((c in p.mapping) ? (p.mapping[c] + 1) : (p.mapping[c] = 1));

		if (frequency > p.greatestFrequency || p.mode === undefined || p.mode === null) {
			p.greatestFrequency = frequency;
			p.mode = c;
		}

		return p;
	}, {mode: undefined, greatestFrequency: -Infinity, mapping: {}}).mode;
}

function variance (a) {
	var average = avg(a);
	var i = a.length;
	var v = 0;
	var n;

	if (i > 2) {
		while (i--) {
			n = Number(a[i]);

			if (isNaN(n)) {
				n = 0;
			}

			v += Math.pow((n - average), 2);
		}

		v /= a.length;
	}

	return v;
}

function stddev (a) {
	return Math.sqrt(variance(a));
}

function union (a) {
	return a;
}

function distinctUnion (a) {
	return a.reduce(function (p, c) {
		p.distinct.indexOf(c) === -1 && p.distinct.push(c);
		return p;
	}, {distinct: []}).distinct;
}

module.exports = {
	avg: avg,
	average: avg,
	sum: sum,
	count: count,
	min: min,
	max: max,
	median: median,
	mode: mode,
	variance: variance,
	stddev: stddev,
	union: union,
	distinctUnion: distinctUnion
};
