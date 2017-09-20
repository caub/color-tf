/* 
 color model conversions between RGB, HSL, HSV and HWB

sources:
 - http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 - http://alvyray.com/Papers/CG/hwb2rgb.htm 

info:
- foo2bar: input and output are in [0, 1]
- fooToBar: natural ranges: hues in [0, 360[, colors in [0, 255], saturation/value/lightness in [0, 100]
*/


function hsl2rgb(h, s, l){
	if(s != 0) { // not achromatic
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		return [
			hue2rgb(p, q, h + 1/3),
			hue2rgb(p, q, h),
			hue2rgb(p, q, h - 1/3)
		];
	}
	return [l, l, l];
}

function hue2rgb(p, q, t){ // private fn
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}

function hsv2rgb(h, s, v){
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	switch (i){
		case 6:
		case 0: return [v, t, p];
		case 1: return [q, v, p];
		case 2: return [p, v, t];
		case 3: return [p, q, v];
		case 4: return [t, p, v];
		case 5: return [v, p, q];
	}
}


function hwb2rgb(h, w, b){ // could throw or warn if w+b>=1 ?
	const v = 1 - b;
	const i = Math.floor(h * 6);
	const f = (i&1) ? 1+i - h*6 : h*6 - i; // if i is odd
	const n = w + f * (v - w);

	switch (i){
		case 6:
		case 0: return [v, n, w];
		case 1: return [n, v, w];
		case 2: return [w, v, n];
		case 3: return [w, n, v];
		case 4: return [n, w, v];
		case 5: return [v, w, n];
	}
}


function rgb2hsl(r, g, b){
	const max = Math.max(r,g,b), min = Math.min(r,g,b);
	const l = (max + min) / 2, d = max - min;

	if(d > 0) {  // not achromatic
		const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		const h = max===r ? (g - b) / d + (g < b ? 6 : 0) :
						max===g ? (b - r) / d + 2 :
										 (r - g) / d + 4;
		return [h/6, s, l];
	}

	return [0, 0, l];
}


function rgb2hsv(r, g, b){
	const max = Math.max(r,g,b), min = Math.min(r,g,b);
	const v = max, d = max - min, s = max === 0 ? 0 : d / max;

	if (d > 0) { // not achromatic
		const h = max===r ? (g - b) / d + (g < b ? 6 : 0) :
						max===g ? (b - r) / d + 2 :
										 (r - g) / d + 4;
		return [h/6, s, v];
	}

	return [0, s, v];
}


function rgb2hwb(R, G, B){
	const max = Math.max(R,G,B), min = Math.min(R,G,B);
	const b = 1 - max, d = max -min;

	if(d > 0) {  // not achromatic
		const [f, i] = min===R ? [G - B, 3/6] :
								 min===G ? [B - R, 5/6] :
													[R - G, 1/6];

		return [i - f/(6*d), min, b];
	}

	return [0, min, b];
}


const hsv2hwb = (h,s,v) => [h, (1-s)*v, 1-v];

const hwb2hsv = (h,w,b) => [h, b===1 ? 0 : Math.max(0, 1-w/(1-b)), 1-b];


function hsv2hsl(h,s,v){
	const L = (2 - s) * v/2,
		S = s*v / (L<.5 ? L*2 : 2-L*2);

	return [h, S||0, L]
}
function hsl2hsv(h,s,l){
	const t = s * (l<.5 ? l : 1-l),
		V = l + t,
		S = l>0 ? 2*t/V : 0;
	return [h, S, V];
}

// ab128c -> [r, g, b]
const hexToRgb = s => s.length===3 ? 
	[parseInt(s[0]+s[0], 16), parseInt(s[1]+s[1], 16), parseInt(s[2]+s[2], 16)] :
	[parseInt(s.slice(0,2), 16), parseInt(s.slice(2,4), 16), parseInt(s.slice(4,6), 16)];

const hex2rgb = s => hexToRgb(s).map(x => x/255);

const rgbToHex = (R, G, B) => R%17===0 && G%17===0 && B%17===0 ? // short version
	R.toString(16)[0]+G.toString(16)[0]+B.toString(16)[0] :
	R.toString(16).padStart(2,0)+G.toString(16).padStart(2,0)+B.toString(16).padStart(2,0);

const rgb2hex = (r, g, b) => rgbToHex(Math.round(r*255), Math.round(g*255), Math.round(b*255));

// round hsl, hsv, hwb outputs
const pretty = ([h,s,l]) => [Math.round(360*h) % 360, Math.round(100*s), Math.round(100*l)];

const fns = {
	rgb2hsl,
	rgb2hsv,
	rgb2hwb,
	rgb2hex,

	rgbToHsl: (R,G,B) => pretty(rgb2hsl(R/255, G/255, B/255)),
	rgbToHsv: (R,G,B) => pretty(rgb2hsv(R/255, G/255, B/255)),
	rgbToHwb: (R,G,B) => pretty(rgb2hwb(R/255, G/255, B/255)),
	rgbToHex,


	hsl2rgb,
	hsl2hsv,
	hsl2hwb: (h,s,l) => hsv2hwb(...hsl2hsv(h,s,l)),
	hsl2hex: (h,s,l) => rgb2hex(...hsl2rgb(h,s,l)),

	hslToRgb: (H,S,L) => hsl2rgb(H/360, S/100, L/100).map(x => Math.round(x*255)), 
	hslToHsv: (H,S,L) => pretty(hsl2hsv(H/360, S/100, L/100)),
	hslToHwb: (H,S,L) => pretty(hsv2hwb(...hsl2hsv(H/360, S/100, L/100))),
	hslToHex: (H,S,L) => rgb2hex(...hsl2rgb(H/360, S/100, L/100)),


	hsv2rgb,
	hsv2hsl,
	hsv2hwb,
	hsv2hex: (h,s,v) => rgb2hex(...hsv2rgb(h,s,v)), 

	hsvToRgb: (H,S,V) => hsv2rgb(H/360, S/100, V/100).map(x => Math.round(x*255)), 
	hsvToHsl: (H,S,V) => pretty(hsv2hsl(H/360, S/100, V/100)),
	hsvToHwb: (H,S,V) => pretty(hsv2hwb(H/360, S/100, V/100)),
	hsvToHex: (H,S,V) => rgb2hex(...hsv2rgb(H/360, S/100, V/100)), 


	hwb2rgb,
	hwb2hsl: (h,w,b) => hsv2hsl(...hwb2hsv(h,w,b)),
	hwb2hsv,
	hwb2hex: (h,w,b) => rgb2hex(...hwb2rgb(h,w,b)),

	hwbToRgb: (H,W,B) => hwb2rgb(H/360, W/100, B/100).map(x => Math.round(x*255)),
	hwbToHsl: (H,W,B) => pretty(hsv2hsl(...hwb2hsv(h,w,b))),
	hwbToHsv: (H,W,B) => pretty(hwb2hsv(H/360, W/100, B/100)),
	hwbToHex: (H,W,B) => rgb2hex(...hwb2rgb(H/360, W/100, B/100)),


	hex2rgb,
	hex2hsl: s => rgb2hsl(...hex2rgb(s)),
	hex2hsv: s => rgb2hsv(...hex2rgb(s)),
	hex2hwb: s => rgb2hwb(...hex2rgb(s)),

	hexToRgb,
	hexToHsl: s => pretty(rgb2hsl(...hex2rgb(s))),
	hexToHsv: s => pretty(rgb2hsv(...hex2rgb(s))),
	hexToHwb: s => pretty(rgb2hwb(...hex2rgb(s)))
};


// quick shims if the js engine is old:
if (!String.prototype.padStart) {
	if (!String.prototype.repeat) {
		String.prototype.repeat = function(n) {var s=this; for(var i=1;i<n;i++) s+=this; return s}
	}
	String.prototype.padStart = function(n, c) {return ((c+'').repeat(n)+this).slice(-n)}
}


if (typeof module === 'object') {
	module.exports = fns;
}