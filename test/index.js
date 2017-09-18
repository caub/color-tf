const assert = require('assert');
const {
	rgbToHsl,
	rgbToHsv,
	rgbToHwb,
	rgbToHex,

	hslToRgb,
	hslToHsv,
	hslToHwb,
	hslToHex,

	hsvToRgb,
	hsvToHsl,
	hsvToHwb,
	hsvToHex, 

	hwbToRgb,
	hwbToHsl,
	hwbToHsv,
	hwbToHex,

	hexToRgb,
	hexToHsl,
	hexToHsv,
	hexToHwb
} = require('../');


const pretty = ([h,s,l]) => [Math.round(360*h) % 360, Math.round(100*s), Math.round(100*l)];
const prettyRgb = ([h,s,l]) => [Math.round(255*h)%255, Math.round(255*s)%255, Math.round(255*l)%255];


// console.log('- hex');
assert.equal(rgbToHex(17/255, 68/255, 0), '140');
assert.deepEqual(prettyRgb(hexToRgb('140')), prettyRgb([17/255, 68/255, 0]));
assert.equal(rgbToHex(.33, .8, .99), '54ccfc');
assert.deepEqual(prettyRgb(hexToRgb('54ccfc')), prettyRgb([.33, .8, .99]));


// todo make something less chaotic below

assert.deepEqual(hslToRgb(1/6,1,.99), [ 1, 1, 0.98 ]);

const c1 = [.4, 0, 1];
assert.deepEqual(rgbToHsv(...hslToRgb(...c1)), [ 0, 0, 1 ]);
assert.deepEqual(hslToHsv(...c1), [ 0.4, 0, 1 ]);

assert.deepEqual( rgbToHsl(...hsvToRgb(...c1)), [ 0, 0, 1 ]);
assert.deepEqual(hsvToHsl(...c1), [ 0.4, 0, 1 ]);
assert.deepEqual(hsvToRgb(0, 0, .7), [ 0.7, 0.7, 0.7 ]);

[
	[255,0,0],
	[0,255,0],
	[0,0,255],
	[255,255,0],
	[255,0,255],
	[0,255,255],
	[250,29,134],
	[255,255,255],
	[0,0,0],
	[128,128,128],
	[0,0,134]
].forEach(a => {
	const hwb = rgbToHwb(...a.map(i=>i/255));
	const b = hwbToRgb(...hwb).map(i=>Math.floor(i*255));
	assert.deepEqual(a, b);
});


const rgb = [.77, .4557, .6665];

assert.deepEqual(pretty(rgbToHsl(...hslToRgb(...rgb))), pretty(rgb));

assert.deepEqual(rgbToHwb(.6,.6,.6), [0, .6, .4]);


[
	[0/360, 0, 0],
	[120/360, 0, .0],
	[240/360, 0.23, 0.05],
	[60/360, .6, .35],
	[60/360, .6, .2],
	[240/360, .9, .0999],
	[240/360, 1, 0],
	[240/360, 0, 1]
].forEach(x => {
	const y1= hwbToRgb(...x);
	const y2= hwbToHsv(...x);
	const y3 = hsvToRgb(...y2);
	assert.deepEqual(prettyRgb(y1), prettyRgb(y3));
});


const [h,w,b] = rgbToHwb(0,0,1);  //  [ 2/3, 0, 0 ]
const white = rgbToHwb(1,1,1); // [ 0, 1, 0 ] 
const black = rgbToHwb(0,0,0); // [ 0, 0, 1 ]

const [wr, br] = [.5, .5], S=wr+br;

assert.deepEqual([h,w,b], [2/3, 0, 0]);
assert.deepEqual(white, [0,1,0]);
assert.deepEqual(black, [0,0,1]);


assert.equal(
	hwbToRgb(
		h,
		w+wr*(1-w),
		b+br*(1-b)
	).map(i => Math.round(i*255).toString(16)).join(''),
	'808080'
);


const cs = [
	[62,134,191],
	[42,90,127],
	[83,179,255],
	[21,45,64],
	[75,161,229]
]

assert.deepEqual(
	cs.map(x => pretty(rgbToHsl(...x.map(x => x/255)))),
	[ 
		[ 207, 51, 50 ],
		[ 206, 50, 33 ],
		[ 207, 100, 66 ],
		[ 207, 51, 17 ],
		[ 206, 75, 60 ]
	]
);


assert.deepEqual(
	rgbToHsl(...hsvToRgb(120/360,0.1,1)),
	[1/3, 1, .95]
);
