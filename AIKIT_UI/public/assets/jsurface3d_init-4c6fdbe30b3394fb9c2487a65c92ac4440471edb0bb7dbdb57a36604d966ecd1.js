/**
 * @author mrdoob / http://mrdoob.com/
 * @author Larry Battle / http://bateru.com/news
 */

var THREE = THREE || { REVISION: '53' };

self.console = self.console || {

	info: function () {},
	log: function () {},
	debug: function () {},
	warn: function () {},
	error: function () {}

};

self.Int32Array = self.Int32Array || Array;
self.Float32Array = self.Float32Array || Array;

// Shims for "startsWith", "endsWith", and "trim" for browsers where this is not yet implemented
// not sure we should have this, or at least not have it here

// http://stackoverflow.com/questions/646628/javascript-startswith
// http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
// http://wiki.ecmascript.org/doku.php?id=harmony%3astring_extras

String.prototype.startsWith = String.prototype.startsWith || function ( str ) {

	return this.slice( 0, str.length ) === str;

};

String.prototype.endsWith = String.prototype.endsWith || function ( str ) {

	var t = String( str );
	var index = this.lastIndexOf( t );
	return ( -1 < index && index ) === (this.length - t.length);

};

String.prototype.trim = String.prototype.trim || function () {

	return this.replace( /^\s+|\s+$/g, '' );

};


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik M�ller
// fixes from Paul Irish and Tino Zijdel

( function () {

	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {

		window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];

	}

	if ( window.requestAnimationFrame === undefined ) {

		window.requestAnimationFrame = function ( callback, element ) {

			var currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
			var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
			lastTime = currTime + timeToCall;
			return id;

		};

	}

	window.cancelAnimationFrame = window.cancelAnimationFrame || function ( id ) { window.clearTimeout( id ) };

}() );


// MATERIAL CONSTANTS

// side

THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;

// shading

THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;

// colors

THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;

// blending modes

THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;

// custom blending equations
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)

THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;

// custom blending destination factors

THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;

// custom blending source factors

//THREE.ZeroFactor = 200;
//THREE.OneFactor = 201;
//THREE.SrcAlphaFactor = 204;
//THREE.OneMinusSrcAlphaFactor = 205;
//THREE.DstAlphaFactor = 206;
//THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;


// TEXTURE CONSTANTS

THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;

// Mapping modes

THREE.UVMapping = function () {};

THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};

THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};

// Wrapping modes

THREE.RepeatWrapping = 1000;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;

// Filters

THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;

// Data types

THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;

// Pixel types

//THREE.UnsignedByteType = 1009;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;

// Pixel formats

THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;

// Compressed texture formats

THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;

/*
// Potential future PVRTC compressed texture formats
THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;
*/
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Clock = function ( autoStart ) {

	this.autoStart = ( autoStart !== undefined ) ? autoStart : true;

	this.startTime = 0;
	this.oldTime = 0;
	this.elapsedTime = 0;

	this.running = false;

};

THREE.Clock.prototype.start = function () {

	this.startTime = Date.now();
	this.oldTime = this.startTime;

	this.running = true;

};

THREE.Clock.prototype.stop = function () {

	this.getElapsedTime();

	this.running = false;

};

THREE.Clock.prototype.getElapsedTime = function () {

	this.elapsedTime += this.getDelta();

	return this.elapsedTime;

};


THREE.Clock.prototype.getDelta = function () {

	var diff = 0;

	if ( this.autoStart && ! this.running ) {

		this.start();

	}

	if ( this.running ) {

		var newTime = Date.now();
		diff = 0.001 * ( newTime - this.oldTime );
		this.oldTime = newTime;

		this.elapsedTime += diff;

	}

	return diff;

};/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Color = function ( hex ) {

	if ( hex !== undefined ) this.setHex( hex );

	return this;

};

THREE.Color.prototype = {

	constructor: THREE.Color,

	r: 1, g: 1, b: 1,

	copy: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	},

	copyGammaToLinear: function ( color ) {

		this.r = color.r * color.r;
		this.g = color.g * color.g;
		this.b = color.b * color.b;

		return this;

	},

	copyLinearToGamma: function ( color ) {

		this.r = Math.sqrt( color.r );
		this.g = Math.sqrt( color.g );
		this.b = Math.sqrt( color.b );

		return this;

	},

	convertGammaToLinear: function () {

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	},

	convertLinearToGamma: function () {

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	},

	setRGB: function ( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	},

	setHSV: function ( h, s, v ) {

		// based on MochiKit implementation by Bob Ippolito
		// h,s,v ranges are < 0.0 - 1.0 >

		var i, f, p, q, t;

		if ( v === 0 ) {

			this.r = this.g = this.b = 0;

		} else {

			i = Math.floor( h * 6 );
			f = ( h * 6 ) - i;
			p = v * ( 1 - s );
			q = v * ( 1 - ( s * f ) );
			t = v * ( 1 - ( s * ( 1 - f ) ) );

			if ( i === 0 ) {

				this.r = v;
				this.g = t;
				this.b = p;

			} else if ( i === 1 ) {

				this.r = q;
				this.g = v;
				this.b = p;

			} else if ( i === 2 ) {

				this.r = p;
				this.g = v;
				this.b = t;

			} else if ( i === 3 ) {

				this.r = p;
				this.g = q;
				this.b = v;

			} else if ( i === 4 ) {

				this.r = t;
				this.g = p;
				this.b = v;

			} else if ( i === 5 ) {

				this.r = v;
				this.g = p;
				this.b = q;

			}

		}

		return this;

	},

	getHex: function () {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	},

	setHex: function ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	},

	getHexString: function () {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	},

	getContextStyle: function () {

		return 'rgb(' + ( ( this.r * 255 ) | 0 )  + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	},

	setContextStyle: function ( style ) {

		var color = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.exec( style );

		this.r = parseInt( color[ 1 ], 10 ) / 255;
		this.g = parseInt( color[ 2 ], 10 ) / 255;
		this.b = parseInt( color[ 3 ], 10 ) / 255;

		return this;

	},

	getHSV: function ( hsv ) {

		// based on MochiKit implementation by Bob Ippolito
		// h,s,v ranges are < 0.0 - 1.0 >

		var r = this.r;
		var g = this.g;
		var b = this.b;

		var max = Math.max( Math.max( r, g ), b );
		var min = Math.min( Math.min( r, g ), b );

		var hue;
		var saturation;
		var value = max;

		if ( min === max )	{

			hue = 0;
			saturation = 0;

		} else {

			var delta = ( max - min );
			saturation = delta / max;

			if ( r === max ) {

				hue = ( g - b ) / delta;

			} else if ( g === max ) {

				hue = 2 + ( ( b - r ) / delta );

			} else	{

				hue = 4 + ( ( r - g ) / delta );
			}

			hue /= 6;

			if ( hue < 0 ) {

				hue += 1;

			}

			if ( hue > 1 ) {

				hue -= 1;

			}

		}

		if ( hsv === undefined ) {

			hsv = { h: 0, s: 0, v: 0 };

		}

		hsv.h = hue;
		hsv.s = saturation;
		hsv.v = value;

		return hsv;

	},

	lerpSelf: function ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	},

	clone: function () {

		return new THREE.Color().setRGB( this.r, this.g, this.b );

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

THREE.Vector2.prototype = {

	constructor: THREE.Vector2,

	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	},

	add: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;

		return this;

	},

	sub: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;

	},

	divideScalar: function ( s ) {

		if ( s ) {

			this.x /= s;
			this.y /= s;

		} else {

			this.set( 0, 0 );

		}

		return this;

	},

	negate: function() {

		return this.multiplyScalar( - 1 );

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y;

	},

	length: function () {

		return Math.sqrt( this.lengthSq() );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	},

	setLength: function ( l ) {

		return this.normalize().multiplyScalar( l );

	},

	lerpSelf: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	},

	equals: function( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	},

	clone: function () {

		return new THREE.Vector2( this.x, this.y );

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector3 = function ( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};


THREE.Vector3.prototype = {

	constructor: THREE.Vector3,

	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},

	add: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},

	sub: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},

	multiply: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	},

	multiplySelf: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;
		this.z *= s;

		return this;

	},

	divideSelf: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	},

	divideScalar: function ( s ) {

		if ( s ) {

			this.x /= s;
			this.y /= s;
			this.z /= s;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	},


	negate: function() {

		return this.multiplyScalar( - 1 );

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},

	length: function () {

		return Math.sqrt( this.lengthSq() );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		return this.normalize().multiplyScalar( l );

	},

	lerpSelf: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	},

	cross: function ( a, b ) {

		this.x = a.y * b.z - a.z * b.y;
		this.y = a.z * b.x - a.x * b.z;
		this.z = a.x * b.y - a.y * b.x;

		return this;

	},

	crossSelf: function ( v ) {

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	},

	angleTo: function ( v ) {

		return Math.acos( this.dot( v ) / this.length() / v.length() );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		return new THREE.Vector3().sub( this, v ).lengthSq();

	},

	getPositionFromMatrix: function ( m ) {

		this.x = m.elements[12];
		this.y = m.elements[13];
		this.z = m.elements[14];

		return this;

	},

	setEulerFromRotationMatrix: function ( m, order ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		// clamp, to handle numerical problems

		function clamp( x ) {

			return Math.min( Math.max( x, -1 ), 1 );

		}

		var te = m.elements;
		var m11 = te[0], m12 = te[4], m13 = te[8];
		var m21 = te[1], m22 = te[5], m23 = te[9];
		var m31 = te[2], m32 = te[6], m33 = te[10];

		if ( order === undefined || order === 'XYZ' ) {

			this.y = Math.asin( clamp( m13 ) );

			if ( Math.abs( m13 ) < 0.99999 ) {

				this.x = Math.atan2( - m23, m33 );
				this.z = Math.atan2( - m12, m11 );

			} else {

				this.x = Math.atan2( m32, m22 );
				this.z = 0;

			}

		} else if ( order === 'YXZ' ) {

			this.x = Math.asin( - clamp( m23 ) );

			if ( Math.abs( m23 ) < 0.99999 ) {

				this.y = Math.atan2( m13, m33 );
				this.z = Math.atan2( m21, m22 );

			} else {

				this.y = Math.atan2( - m31, m11 );
				this.z = 0;

			}

		} else if ( order === 'ZXY' ) {

			this.x = Math.asin( clamp( m32 ) );

			if ( Math.abs( m32 ) < 0.99999 ) {

				this.y = Math.atan2( - m31, m33 );
				this.z = Math.atan2( - m12, m22 );

			} else {

				this.y = 0;
				this.z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			this.y = Math.asin( - clamp( m31 ) );

			if ( Math.abs( m31 ) < 0.99999 ) {

				this.x = Math.atan2( m32, m33 );
				this.z = Math.atan2( m21, m11 );

			} else {

				this.x = 0;
				this.z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			this.z = Math.asin( clamp( m21 ) );

			if ( Math.abs( m21 ) < 0.99999 ) {

				this.x = Math.atan2( - m23, m22 );
				this.y = Math.atan2( - m31, m11 );

			} else {

				this.x = 0;
				this.y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			this.z = Math.asin( - clamp( m12 ) );

			if ( Math.abs( m12 ) < 0.99999 ) {

				this.x = Math.atan2( m32, m22 );
				this.y = Math.atan2( m13, m11 );

			} else {

				this.x = Math.atan2( - m23, m33 );
				this.y = 0;

			}

		}

		return this;

	},

	setEulerFromQuaternion: function ( q, order ) {

		// q is assumed to be normalized

		// clamp, to handle numerical problems

		function clamp( x ) {

			return Math.min( Math.max( x, -1 ), 1 );

		}

		// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

		var sqx = q.x * q.x;
		var sqy = q.y * q.y;
		var sqz = q.z * q.z;
		var sqw = q.w * q.w;

		if ( order === undefined || order === 'XYZ' ) {

			this.x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
			this.y = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ) ) );
			this.z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order ===  'YXZ' ) {

			this.x = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ) ) );
			this.y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
			this.z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZXY' ) {

			this.x = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ) ) );
			this.y = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
			this.z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZYX' ) {

			this.x = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
			this.y = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ) ) );
			this.z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order === 'YZX' ) {

			this.x = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
			this.y = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
			this.z = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ) ) );

		} else if ( order === 'XZY' ) {

			this.x = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
			this.y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
			this.z = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ) ) );

		}

		return this;

	},

	getScaleFromMatrix: function ( m ) {

		var sx = this.set( m.elements[0], m.elements[1], m.elements[2] ).length();
		var sy = this.set( m.elements[4], m.elements[5], m.elements[6] ).length();
		var sz = this.set( m.elements[8], m.elements[9], m.elements[10] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	},

	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );

	}

};
/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector4 = function ( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Vector4.prototype = {

	constructor: THREE.Vector4,

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	},

	add: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	},

	sub: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;
		this.z *= s;
		this.w *= s;

		return this;

	},

	divideScalar: function ( s ) {

		if ( s ) {

			this.x /= s;
			this.y /= s;
			this.z /= s;
			this.w /= s;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		}

		return this;

	},


	negate: function() {

		return this.multiplyScalar( -1 );

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	},

	lengthSq: function () {

		return this.dot( this );

	},

	length: function () {

		return Math.sqrt( this.lengthSq() );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		return this.normalize().multiplyScalar( l );

	},

	lerpSelf: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	},

	clone: function () {

		return new THREE.Vector4( this.x, this.y, this.z, this.w );

	},

	setAxisAngleFromQuaternion: function ( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos( q.w );

		var s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			 this.x = 1;
			 this.y = 0;
			 this.z = 0;

		} else {

			 this.x = q.x / s;
			 this.y = q.y / s;
			 this.z = q.z / s;

		}

		return this;

	},

	setAxisAngleFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var angle, x, y, z,		// variables for result
			epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[0], m12 = te[4], m13 = te[8],
			m21 = te[1], m22 = te[5], m23 = te[9],
			m31 = te[2], m32 = te[6], m33 = te[10];

		if ( ( Math.abs( m12 - m21 ) < epsilon )
		  && ( Math.abs( m13 - m31 ) < epsilon )
		  && ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 )
			  && ( Math.abs( m13 + m31 ) < epsilon2 )
			  && ( Math.abs( m23 + m32 ) < epsilon2 )
			  && ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			var xx = ( m11 + 1 ) / 2;
			var yy = ( m22 + 1 ) / 2;
			var zz = ( m33 + 1 ) / 2;
			var xy = ( m12 + m21 ) / 4;
			var xz = ( m13 + m31 ) / 4;
			var yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) { // m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) { // m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else { // m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 )
						 + ( m13 - m31 ) * ( m13 - m31 )
						 + ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) s = 1;

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Matrix3 = function () {

	this.elements = new Float32Array(9);

};

THREE.Matrix3.prototype = {

	constructor: THREE.Matrix3,

	multiplyVector3: function ( v ) {

		var te = this.elements;

		var vx = v.x, vy = v.y, vz = v.z;

		v.x = te[0] * vx + te[3] * vy + te[6] * vz;
		v.y = te[1] * vx + te[4] * vy + te[7] * vz;
		v.z = te[2] * vx + te[5] * vy + te[8] * vz;

		return v;

	},

	multiplyVector3Array: function ( a ) {

		var tmp = THREE.Matrix3.__v1;

		for ( var i = 0, il = a.length; i < il; i += 3 ) {

			tmp.x = a[ i ];
			tmp.y = a[ i + 1 ];
			tmp.z = a[ i + 2 ];

			this.multiplyVector3( tmp );

			a[ i ]     = tmp.x;
			a[ i + 1 ] = tmp.y;
			a[ i + 2 ] = tmp.z;

		}

		return a;

	},

	getInverse: function ( matrix ) {

		// input: THREE.Matrix4
		// ( based on http://code.google.com/p/webgl-mjs/ )

		var me = matrix.elements;

		var a11 =   me[10] * me[5] - me[6] * me[9];
		var a21 = - me[10] * me[1] + me[2] * me[9];
		var a31 =   me[6] * me[1] - me[2] * me[5];
		var a12 = - me[10] * me[4] + me[6] * me[8];
		var a22 =   me[10] * me[0] - me[2] * me[8];
		var a32 = - me[6] * me[0] + me[2] * me[4];
		var a13 =   me[9] * me[4] - me[5] * me[8];
		var a23 = - me[9] * me[0] + me[1] * me[8];
		var a33 =   me[5] * me[0] - me[1] * me[4];

		var det = me[0] * a11 + me[1] * a12 + me[2] * a13;

		// no inverse

		if ( det === 0 ) {

			console.warn( "Matrix3.getInverse(): determinant == 0" );

		}

		var idet = 1.0 / det;

		var m = this.elements;

		m[ 0 ] = idet * a11; m[ 1 ] = idet * a21; m[ 2 ] = idet * a31;
		m[ 3 ] = idet * a12; m[ 4 ] = idet * a22; m[ 5 ] = idet * a32;
		m[ 6 ] = idet * a13; m[ 7 ] = idet * a23; m[ 8 ] = idet * a33;

		return this;

	},


	transpose: function () {

		var tmp, m = this.elements;

		tmp = m[1]; m[1] = m[3]; m[3] = tmp;
		tmp = m[2]; m[2] = m[6]; m[6] = tmp;
		tmp = m[5]; m[5] = m[7]; m[7] = tmp;

		return this;

	},


	transposeIntoArray: function ( r ) {

		var m = this.m;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	}

};

THREE.Matrix3.__v1 = new THREE.Vector3();/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 */


THREE.Matrix4 = function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

	this.elements = new Float32Array( 16 );

	this.set(

		( n11 !== undefined ) ? n11 : 1, n12 || 0, n13 || 0, n14 || 0,
		n21 || 0, ( n22 !== undefined ) ? n22 : 1, n23 || 0, n24 || 0,
		n31 || 0, n32 || 0, ( n33 !== undefined ) ? n33 : 1, n34 || 0,
		n41 || 0, n42 || 0, n43 || 0, ( n44 !== undefined ) ? n44 : 1

	);

};

THREE.Matrix4.prototype = {

	constructor: THREE.Matrix4,

	set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		var te = this.elements;

		te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
		te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
		te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
		te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	copy: function ( m ) {

		var me = m.elements;

		this.set(

			me[0], me[4], me[8], me[12],
			me[1], me[5], me[9], me[13],
			me[2], me[6], me[10], me[14],
			me[3], me[7], me[11], me[15]

		);

		return this;

	},

	lookAt: function ( eye, target, up ) {

		var te = this.elements;

		var x = THREE.Matrix4.__v1;
		var y = THREE.Matrix4.__v2;
		var z = THREE.Matrix4.__v3;

		z.sub( eye, target ).normalize();

		if ( z.length() === 0 ) {

			z.z = 1;

		}

		x.cross( up, z ).normalize();

		if ( x.length() === 0 ) {

			z.x += 0.0001;
			x.cross( up, z ).normalize();

		}

		y.cross( z, x );


		te[0] = x.x; te[4] = y.x; te[8] = z.x;
		te[1] = x.y; te[5] = y.y; te[9] = z.y;
		te[2] = x.z; te[6] = y.z; te[10] = z.z;

		return this;

	},

	multiply: function ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
		var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
		var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
		var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

		var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
		var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
		var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
		var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	},

	multiplySelf: function ( m ) {

		return this.multiply( this, m );

	},

	multiplyToArray: function ( a, b, r ) {

		var te = this.elements;

		this.multiply( a, b );

		r[ 0 ] = te[0]; r[ 1 ] = te[1]; r[ 2 ] = te[2]; r[ 3 ] = te[3];
		r[ 4 ] = te[4]; r[ 5 ] = te[5]; r[ 6 ] = te[6]; r[ 7 ] = te[7];
		r[ 8 ]  = te[8]; r[ 9 ]  = te[9]; r[ 10 ] = te[10]; r[ 11 ] = te[11];
		r[ 12 ] = te[12]; r[ 13 ] = te[13]; r[ 14 ] = te[14]; r[ 15 ] = te[15];

		return this;

	},

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
		te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
		te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
		te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;

		return this;

	},

	multiplyVector3: function ( v ) {

		var te = this.elements;

		var vx = v.x, vy = v.y, vz = v.z;
		var d = 1 / ( te[3] * vx + te[7] * vy + te[11] * vz + te[15] );

		v.x = ( te[0] * vx + te[4] * vy + te[8] * vz + te[12] ) * d;
		v.y = ( te[1] * vx + te[5] * vy + te[9] * vz + te[13] ) * d;
		v.z = ( te[2] * vx + te[6] * vy + te[10] * vz + te[14] ) * d;

		return v;

	},

	multiplyVector4: function ( v ) {

		var te = this.elements;
		var vx = v.x, vy = v.y, vz = v.z, vw = v.w;

		v.x = te[0] * vx + te[4] * vy + te[8] * vz + te[12] * vw;
		v.y = te[1] * vx + te[5] * vy + te[9] * vz + te[13] * vw;
		v.z = te[2] * vx + te[6] * vy + te[10] * vz + te[14] * vw;
		v.w = te[3] * vx + te[7] * vy + te[11] * vz + te[15] * vw;

		return v;

	},

	multiplyVector3Array: function ( a ) {

		var tmp = THREE.Matrix4.__v1;

		for ( var i = 0, il = a.length; i < il; i += 3 ) {

			tmp.x = a[ i ];
			tmp.y = a[ i + 1 ];
			tmp.z = a[ i + 2 ];

			this.multiplyVector3( tmp );

			a[ i ]     = tmp.x;
			a[ i + 1 ] = tmp.y;
			a[ i + 2 ] = tmp.z;

		}

		return a;

	},

	rotateAxis: function ( v ) {

		var te = this.elements;
		var vx = v.x, vy = v.y, vz = v.z;

		v.x = vx * te[0] + vy * te[4] + vz * te[8];
		v.y = vx * te[1] + vy * te[5] + vz * te[9];
		v.z = vx * te[2] + vy * te[6] + vz * te[10];

		v.normalize();

		return v;

	},

	crossVector: function ( a ) {

		var te = this.elements;
		var v = new THREE.Vector4();

		v.x = te[0] * a.x + te[4] * a.y + te[8] * a.z + te[12] * a.w;
		v.y = te[1] * a.x + te[5] * a.y + te[9] * a.z + te[13] * a.w;
		v.z = te[2] * a.x + te[6] * a.y + te[10] * a.z + te[14] * a.w;

		v.w = ( a.w ) ? te[3] * a.x + te[7] * a.y + te[11] * a.z + te[15] * a.w : 1;

		return v;

	},

	determinant: function () {

		var te = this.elements;

		var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
		var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
		var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
		var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n14 * n23 * n32 * n41-
			n13 * n24 * n32 * n41-
			n14 * n22 * n33 * n41+
			n12 * n24 * n33 * n41+

			n13 * n22 * n34 * n41-
			n12 * n23 * n34 * n41-
			n14 * n23 * n31 * n42+
			n13 * n24 * n31 * n42+

			n14 * n21 * n33 * n42-
			n11 * n24 * n33 * n42-
			n13 * n21 * n34 * n42+
			n11 * n23 * n34 * n42+

			n14 * n22 * n31 * n43-
			n12 * n24 * n31 * n43-
			n14 * n21 * n32 * n43+
			n11 * n24 * n32 * n43+

			n12 * n21 * n34 * n43-
			n11 * n22 * n34 * n43-
			n13 * n22 * n31 * n44+
			n12 * n23 * n31 * n44+

			n13 * n21 * n32 * n44-
			n11 * n23 * n32 * n44-
			n12 * n21 * n33 * n44+
			n11 * n22 * n33 * n44
		);

	},

	transpose: function () {

		var te = this.elements;
		var tmp;

		tmp = te[1]; te[1] = te[4]; te[4] = tmp;
		tmp = te[2]; te[2] = te[8]; te[8] = tmp;
		tmp = te[6]; te[6] = te[9]; te[9] = tmp;

		tmp = te[3]; te[3] = te[12]; te[12] = tmp;
		tmp = te[7]; te[7] = te[13]; te[13] = tmp;
		tmp = te[11]; te[11] = te[14]; te[14] = tmp;

		return this;

	},

	flattenToArray: function ( flat ) {

		var te = this.elements;
		flat[ 0 ] = te[0]; flat[ 1 ] = te[1]; flat[ 2 ] = te[2]; flat[ 3 ] = te[3];
		flat[ 4 ] = te[4]; flat[ 5 ] = te[5]; flat[ 6 ] = te[6]; flat[ 7 ] = te[7];
		flat[ 8 ]  = te[8]; flat[ 9 ]  = te[9]; flat[ 10 ] = te[10]; flat[ 11 ] = te[11];
		flat[ 12 ] = te[12]; flat[ 13 ] = te[13]; flat[ 14 ] = te[14]; flat[ 15 ] = te[15];

		return flat;

	},

	flattenToArrayOffset: function( flat, offset ) {

		var te = this.elements;
		flat[ offset ] = te[0];
		flat[ offset + 1 ] = te[1];
		flat[ offset + 2 ] = te[2];
		flat[ offset + 3 ] = te[3];

		flat[ offset + 4 ] = te[4];
		flat[ offset + 5 ] = te[5];
		flat[ offset + 6 ] = te[6];
		flat[ offset + 7 ] = te[7];

		flat[ offset + 8 ]  = te[8];
		flat[ offset + 9 ]  = te[9];
		flat[ offset + 10 ] = te[10];
		flat[ offset + 11 ] = te[11];

		flat[ offset + 12 ] = te[12];
		flat[ offset + 13 ] = te[13];
		flat[ offset + 14 ] = te[14];
		flat[ offset + 15 ] = te[15];

		return flat;

	},

	getPosition: function () {

		var te = this.elements;
		return THREE.Matrix4.__v1.set( te[12], te[13], te[14] );

	},

	setPosition: function ( v ) {

		var te = this.elements;

		te[12] = v.x;
		te[13] = v.y;
		te[14] = v.z;

		return this;

	},

	getColumnX: function () {

		var te = this.elements;
		return THREE.Matrix4.__v1.set( te[0], te[1], te[2] );

	},

	getColumnY: function () {

		var te = this.elements;
		return THREE.Matrix4.__v1.set( te[4], te[5], te[6] );

	},

	getColumnZ: function() {

		var te = this.elements;
		return THREE.Matrix4.__v1.set( te[8], te[9], te[10] );

	},

	getInverse: function ( m ) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements;
		var me = m.elements;

		var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
		var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
		var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
		var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

		te[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
		te[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
		te[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
		te[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
		te[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
		te[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
		te[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
		te[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
		te[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
		te[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
		te[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
		te[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
		te[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
		te[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
		te[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
		te[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;
		this.multiplyScalar( 1 / m.determinant() );

		return this;

	},

	setRotationFromEuler: function ( v, order ) {

		var te = this.elements;

		var x = v.x, y = v.y, z = v.z;
		var a = Math.cos( x ), b = Math.sin( x );
		var c = Math.cos( y ), d = Math.sin( y );
		var e = Math.cos( z ), f = Math.sin( z );

		if ( order === undefined || order === 'XYZ' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[0] = c * e;
			te[4] = - c * f;
			te[8] = d;

			te[1] = af + be * d;
			te[5] = ae - bf * d;
			te[9] = - b * c;

			te[2] = bf - ae * d;
			te[6] = be + af * d;
			te[10] = a * c;

		} else if ( order === 'YXZ' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[0] = ce + df * b;
			te[4] = de * b - cf;
			te[8] = a * d;

			te[1] = a * f;
			te[5] = a * e;
			te[9] = - b;

			te[2] = cf * b - de;
			te[6] = df + ce * b;
			te[10] = a * c;

		} else if ( order === 'ZXY' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[0] = ce - df * b;
			te[4] = - a * f;
			te[8] = de + cf * b;

			te[1] = cf + de * b;
			te[5] = a * e;
			te[9] = df - ce * b;

			te[2] = - a * d;
			te[6] = b;
			te[10] = a * c;

		} else if ( order === 'ZYX' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[0] = c * e;
			te[4] = be * d - af;
			te[8] = ae * d + bf;

			te[1] = c * f;
			te[5] = bf * d + ae;
			te[9] = af * d - be;

			te[2] = - d;
			te[6] = b * c;
			te[10] = a * c;

		} else if ( order === 'YZX' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[0] = c * e;
			te[4] = bd - ac * f;
			te[8] = bc * f + ad;

			te[1] = f;
			te[5] = a * e;
			te[9] = - b * e;

			te[2] = - d * e;
			te[6] = ad * f + bc;
			te[10] = ac - bd * f;

		} else if ( order === 'XZY' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[0] = c * e;
			te[4] = - f;
			te[8] = d * e;

			te[1] = ac * f + bd;
			te[5] = a * e;
			te[9] = ad * f - bc;

			te[2] = bc * f - ad;
			te[6] = b * e;
			te[10] = bd * f + ac;

		}

		return this;

	},


	setRotationFromQuaternion: function ( q ) {

		var te = this.elements;

		var x = q.x, y = q.y, z = q.z, w = q.w;
		var x2 = x + x, y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

		te[0] = 1 - ( yy + zz );
		te[4] = xy - wz;
		te[8] = xz + wy;

		te[1] = xy + wz;
		te[5] = 1 - ( xx + zz );
		te[9] = yz - wx;

		te[2] = xz - wy;
		te[6] = yz + wx;
		te[10] = 1 - ( xx + yy );

		return this;

	},

	compose: function ( translation, rotation, scale ) {

		var te = this.elements;
		var mRotation = THREE.Matrix4.__m1;
		var mScale = THREE.Matrix4.__m2;

		mRotation.identity();
		mRotation.setRotationFromQuaternion( rotation );

		mScale.makeScale( scale.x, scale.y, scale.z );

		this.multiply( mRotation, mScale );

		te[12] = translation.x;
		te[13] = translation.y;
		te[14] = translation.z;

		return this;

	},

	decompose: function ( translation, rotation, scale ) {

		var te = this.elements;

		// grab the axis vectors
		var x = THREE.Matrix4.__v1;
		var y = THREE.Matrix4.__v2;
		var z = THREE.Matrix4.__v3;

		x.set( te[0], te[1], te[2] );
		y.set( te[4], te[5], te[6] );
		z.set( te[8], te[9], te[10] );

		translation = ( translation instanceof THREE.Vector3 ) ? translation : new THREE.Vector3();
		rotation = ( rotation instanceof THREE.Quaternion ) ? rotation : new THREE.Quaternion();
		scale = ( scale instanceof THREE.Vector3 ) ? scale : new THREE.Vector3();

		scale.x = x.length();
		scale.y = y.length();
		scale.z = z.length();

		translation.x = te[12];
		translation.y = te[13];
		translation.z = te[14];

		// scale the rotation part

		var matrix = THREE.Matrix4.__m1;

		matrix.copy( this );

		matrix.elements[0] /= scale.x;
		matrix.elements[1] /= scale.x;
		matrix.elements[2] /= scale.x;

		matrix.elements[4] /= scale.y;
		matrix.elements[5] /= scale.y;
		matrix.elements[6] /= scale.y;

		matrix.elements[8] /= scale.z;
		matrix.elements[9] /= scale.z;
		matrix.elements[10] /= scale.z;

		rotation.setFromRotationMatrix( matrix );

		return [ translation, rotation, scale ];

	},

	extractPosition: function ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[12] = me[12];
		te[13] = me[13];
		te[14] = me[14];

		return this;

	},

	extractRotation: function ( m ) {

		var te = this.elements;
		var me = m.elements;

		var vector = THREE.Matrix4.__v1;

		var scaleX = 1 / vector.set( me[0], me[1], me[2] ).length();
		var scaleY = 1 / vector.set( me[4], me[5], me[6] ).length();
		var scaleZ = 1 / vector.set( me[8], me[9], me[10] ).length();

		te[0] = me[0] * scaleX;
		te[1] = me[1] * scaleX;
		te[2] = me[2] * scaleX;

		te[4] = me[4] * scaleY;
		te[5] = me[5] * scaleY;
		te[6] = me[6] * scaleY;

		te[8] = me[8] * scaleZ;
		te[9] = me[9] * scaleZ;
		te[10] = me[10] * scaleZ;

		return this;

	},

	//

	translate: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[12] = te[0] * x + te[4] * y + te[8] * z + te[12];
		te[13] = te[1] * x + te[5] * y + te[9] * z + te[13];
		te[14] = te[2] * x + te[6] * y + te[10] * z + te[14];
		te[15] = te[3] * x + te[7] * y + te[11] * z + te[15];

		return this;

	},

	rotateX: function ( angle ) {

		var te = this.elements;
		var m12 = te[4];
		var m22 = te[5];
		var m32 = te[6];
		var m42 = te[7];
		var m13 = te[8];
		var m23 = te[9];
		var m33 = te[10];
		var m43 = te[11];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[4] = c * m12 + s * m13;
		te[5] = c * m22 + s * m23;
		te[6] = c * m32 + s * m33;
		te[7] = c * m42 + s * m43;

		te[8] = c * m13 - s * m12;
		te[9] = c * m23 - s * m22;
		te[10] = c * m33 - s * m32;
		te[11] = c * m43 - s * m42;

		return this;

	},

	rotateY: function ( angle ) {

		var te = this.elements;
		var m11 = te[0];
		var m21 = te[1];
		var m31 = te[2];
		var m41 = te[3];
		var m13 = te[8];
		var m23 = te[9];
		var m33 = te[10];
		var m43 = te[11];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[0] = c * m11 - s * m13;
		te[1] = c * m21 - s * m23;
		te[2] = c * m31 - s * m33;
		te[3] = c * m41 - s * m43;

		te[8] = c * m13 + s * m11;
		te[9] = c * m23 + s * m21;
		te[10] = c * m33 + s * m31;
		te[11] = c * m43 + s * m41;

		return this;

	},

	rotateZ: function ( angle ) {

		var te = this.elements;
		var m11 = te[0];
		var m21 = te[1];
		var m31 = te[2];
		var m41 = te[3];
		var m12 = te[4];
		var m22 = te[5];
		var m32 = te[6];
		var m42 = te[7];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[0] = c * m11 + s * m12;
		te[1] = c * m21 + s * m22;
		te[2] = c * m31 + s * m32;
		te[3] = c * m41 + s * m42;

		te[4] = c * m12 - s * m11;
		te[5] = c * m22 - s * m21;
		te[6] = c * m32 - s * m31;
		te[7] = c * m42 - s * m41;

		return this;

	},

	rotateByAxis: function ( axis, angle ) {

		var te = this.elements;

		// optimize by checking axis

		if ( axis.x === 1 && axis.y === 0 && axis.z === 0 ) {

			return this.rotateX( angle );

		} else if ( axis.x === 0 && axis.y === 1 && axis.z === 0 ) {

			return this.rotateY( angle );

		} else if ( axis.x === 0 && axis.y === 0 && axis.z === 1 ) {

			return this.rotateZ( angle );

		}

		var x = axis.x, y = axis.y, z = axis.z;
		var n = Math.sqrt(x * x + y * y + z * z);

		x /= n;
		y /= n;
		z /= n;

		var xx = x * x, yy = y * y, zz = z * z;
		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var oneMinusCosine = 1 - c;
		var xy = x * y * oneMinusCosine;
		var xz = x * z * oneMinusCosine;
		var yz = y * z * oneMinusCosine;
		var xs = x * s;
		var ys = y * s;
		var zs = z * s;

		var r11 = xx + (1 - xx) * c;
		var r21 = xy + zs;
		var r31 = xz - ys;
		var r12 = xy - zs;
		var r22 = yy + (1 - yy) * c;
		var r32 = yz + xs;
		var r13 = xz + ys;
		var r23 = yz - xs;
		var r33 = zz + (1 - zz) * c;

		var m11 = te[0], m21 = te[1], m31 = te[2], m41 = te[3];
		var m12 = te[4], m22 = te[5], m32 = te[6], m42 = te[7];
		var m13 = te[8], m23 = te[9], m33 = te[10], m43 = te[11];
		var m14 = te[12], m24 = te[13], m34 = te[14], m44 = te[15];

		te[0] = r11 * m11 + r21 * m12 + r31 * m13;
		te[1] = r11 * m21 + r21 * m22 + r31 * m23;
		te[2] = r11 * m31 + r21 * m32 + r31 * m33;
		te[3] = r11 * m41 + r21 * m42 + r31 * m43;

		te[4] = r12 * m11 + r22 * m12 + r32 * m13;
		te[5] = r12 * m21 + r22 * m22 + r32 * m23;
		te[6] = r12 * m31 + r22 * m32 + r32 * m33;
		te[7] = r12 * m41 + r22 * m42 + r32 * m43;

		te[8] = r13 * m11 + r23 * m12 + r33 * m13;
		te[9] = r13 * m21 + r23 * m22 + r33 * m23;
		te[10] = r13 * m31 + r23 * m32 + r33 * m33;
		te[11] = r13 * m41 + r23 * m42 + r33 * m43;

		return this;

	},

	scale: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[0] *= x; te[4] *= y; te[8] *= z;
		te[1] *= x; te[5] *= y; te[9] *= z;
		te[2] *= x; te[6] *= y; te[10] *= z;
		te[3] *= x; te[7] *= y; te[11] *= z;

		return this;

	},

	getMaxScaleOnAxis: function () {

		var te = this.elements;

		var scaleXSq =  te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
		var scaleYSq =  te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
		var scaleZSq =  te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

		return Math.sqrt( Math.max( scaleXSq, Math.max( scaleYSq, scaleZSq ) ) );

	},

	//

	makeTranslation: function ( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	},

	makeRotationX: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0,  0, 0,
			0, c, -s, 0,
			0, s,  c, 0,
			0, 0,  0, 1

		);

		return this;

	},

	makeRotationY: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			-s, 0, c, 0,
			 0, 0, 0, 1

		);

		return this;

	},

	makeRotationZ: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, -s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1

		);

		return this;

	},

	makeRotationAxis: function ( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		 return this;

	},

	makeScale: function ( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	},

	makeFrustum: function ( left, right, bottom, top, near, far ) {

		var te = this.elements;
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		te[0] = x;  te[4] = 0;  te[8] = a;   te[12] = 0;
		te[1] = 0;  te[5] = y;  te[9] = b;   te[13] = 0;
		te[2] = 0;  te[6] = 0;  te[10] = c;   te[14] = d;
		te[3] = 0;  te[7] = 0;  te[11] = - 1; te[15] = 0;

		return this;

	},

	makePerspective: function ( fov, aspect, near, far ) {

		var ymax = near * Math.tan( fov * Math.PI / 360 );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

	},

	makeOrthographic: function ( left, right, top, bottom, near, far ) {

		var te = this.elements;
		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		te[0] = 2 / w; te[4] = 0;     te[8] = 0;      te[12] = -x;
		te[1] = 0;     te[5] = 2 / h; te[9] = 0;      te[13] = -y;
		te[2] = 0;     te[6] = 0;     te[10] = -2 / p; te[14] = -z;
		te[3] = 0;     te[7] = 0;     te[11] = 0;      te[15] = 1;

		return this;

	},


	clone: function () {

		var te = this.elements;

		return new THREE.Matrix4(

			te[0], te[4], te[8], te[12],
			te[1], te[5], te[9], te[13],
			te[2], te[6], te[10], te[14],
			te[3], te[7], te[11], te[15]

		);

	}

};

THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();

THREE.Matrix4.__m1 = new THREE.Matrix4();
THREE.Matrix4.__m2 = new THREE.Matrix4();
/**
 * https://github.com/mrdoob/eventtarget.js/
 */

THREE.EventTarget = function () {

	var listeners = {};

	this.addEventListener = function ( type, listener ) {

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	};

	this.dispatchEvent = function ( event ) {

		for ( var listener in listeners[ event.type ] ) {

			listeners[ event.type ][ listener ]( event );

		}

	};

	this.removeEventListener = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			listeners[ type ].splice( index, 1 );

		}

	};

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Frustum = function ( ) {

	this.planes = [

		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4()

	];

};

THREE.Frustum.prototype.setFromMatrix = function ( m ) {

	var plane;
	var planes = this.planes;

	var me = m.elements;
	var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
	var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
	var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
	var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

	planes[ 0 ].set( me3 - me0, me7 - me4, me11 - me8, me15 - me12 );
	planes[ 1 ].set( me3 + me0, me7 + me4, me11 + me8, me15 + me12 );
	planes[ 2 ].set( me3 + me1, me7 + me5, me11 + me9, me15 + me13 );
	planes[ 3 ].set( me3 - me1, me7 - me5, me11 - me9, me15 - me13 );
	planes[ 4 ].set( me3 - me2, me7 - me6, me11 - me10, me15 - me14 );
	planes[ 5 ].set( me3 + me2, me7 + me6, me11 + me10, me15 + me14 );

	for ( var i = 0; i < 6; i ++ ) {

		plane = planes[ i ];
		plane.divideScalar( Math.sqrt( plane.x * plane.x + plane.y * plane.y + plane.z * plane.z ) );

	}

};

THREE.Frustum.prototype.contains = function ( object ) {

	var distance = 0.0;
	var planes = this.planes;
	var matrix = object.matrixWorld;
	var me = matrix.elements;
	var radius = - object.geometry.boundingSphere.radius * matrix.getMaxScaleOnAxis();

	for ( var i = 0; i < 6; i ++ ) {

		distance = planes[ i ].x * me[12] + planes[ i ].y * me[13] + planes[ i ].z * me[14] + planes[ i ].w;
		if ( distance <= radius ) return false;

	}

	return true;

};

THREE.Frustum.__v1 = new THREE.Vector3();
/**
 * @author mrdoob / http://mrdoob.com/
 */

( function ( THREE ) {

	THREE.Ray = function ( origin, direction, near, far ) {

		this.origin = origin || new THREE.Vector3();
		this.direction = direction || new THREE.Vector3();
		this.near = near || 0;
		this.far = far || Infinity;

	};

	var originCopy = new THREE.Vector3();

	var localOriginCopy = new THREE.Vector3();
	var localDirectionCopy = new THREE.Vector3();

	var vector = new THREE.Vector3();
	var normal = new THREE.Vector3();
	var intersectPoint = new THREE.Vector3();

	var inverseMatrix = new THREE.Matrix4();

	var descSort = function ( a, b ) {

		return a.distance - b.distance;

	};

	var v0 = new THREE.Vector3(), v1 = new THREE.Vector3(), v2 = new THREE.Vector3();

	var distanceFromIntersection = function ( origin, direction, position ) {

		v0.sub( position, origin );

		var dot = v0.dot( direction );

		var intersect = v1.add( origin, v2.copy( direction ).multiplyScalar( dot ) );
		var distance = position.distanceTo( intersect );

		return distance;

	};

	// http://www.blackpawn.com/texts/pointinpoly/default.html

	var pointInFace3 = function ( p, a, b, c ) {

		v0.sub( c, a );
		v1.sub( b, a );
		v2.sub( p, a );

		var dot00 = v0.dot( v0 );
		var dot01 = v0.dot( v1 );
		var dot02 = v0.dot( v2 );
		var dot11 = v1.dot( v1 );
		var dot12 = v1.dot( v2 );

		var invDenom = 1 / ( dot00 * dot11 - dot01 * dot01 );
		var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		return ( u >= 0 ) && ( v >= 0 ) && ( u + v < 1 );

	};

	var intersectObject = function ( object, ray, intersects ) {

		if ( object instanceof THREE.Particle ) {

			var distance = distanceFromIntersection( ray.origin, ray.direction, object.matrixWorld.getPosition() );

			if ( distance > object.scale.x ) {

				return intersects;

			}

			intersects.push( {

				distance: distance,
				point: object.position,
				face: null,
				object: object

			} );

		} else if ( object instanceof THREE.Mesh ) {

			// Checking boundingSphere

			var scaledRadius = object.geometry.boundingSphere.radius * object.matrixWorld.getMaxScaleOnAxis();

			// Checking distance to ray

			var distance = distanceFromIntersection( ray.origin, ray.direction, object.matrixWorld.getPosition() );

			if ( distance > scaledRadius) {

				return intersects;

			}

			// Checking faces

			var geometry = object.geometry;
			var vertices = geometry.vertices;

			var isFaceMaterial = object.material instanceof THREE.MeshFaceMaterial;
			var objectMaterials = isFaceMaterial === true ? object.material.materials : null;

			var side = object.material.side;

			var a, b, c, d;
			var precision = ray.precision;

			object.matrixRotationWorld.extractRotation( object.matrixWorld );

			originCopy.copy( ray.origin );

			inverseMatrix.getInverse( object.matrixWorld );

			localOriginCopy.copy( originCopy );
			inverseMatrix.multiplyVector3( localOriginCopy );

			localDirectionCopy.copy( ray.direction );
			inverseMatrix.rotateAxis( localDirectionCopy ).normalize();

			for ( var f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

				var face = geometry.faces[ f ];

				var material = isFaceMaterial === true ? objectMaterials[ face.materialIndex ] : object.material;

				if ( material === undefined ) continue;

				side = material.side;

				vector.sub( face.centroid, localOriginCopy );

				var normal = face.normal;
				var dot = localDirectionCopy.dot( normal );

				// bail if ray and plane are parallel

				if ( Math.abs( dot ) < precision ) continue;

				// calc distance to plane

				var scalar = normal.dot( vector ) / dot;

				// if negative distance, then plane is behind ray

				if ( scalar < 0 ) continue;

				if ( side === THREE.DoubleSide || ( side === THREE.FrontSide ? dot < 0 : dot > 0 ) ) {

					intersectPoint.add( localOriginCopy, localDirectionCopy.multiplyScalar( scalar ) );

					if ( face instanceof THREE.Face3 ) {

						a = vertices[ face.a ];
						b = vertices[ face.b ];
						c = vertices[ face.c ];

						if ( pointInFace3( intersectPoint, a, b, c ) ) {

							var point = object.matrixWorld.multiplyVector3( intersectPoint.clone() );
							distance = originCopy.distanceTo( point );

							if ( distance < ray.near || distance > ray.far ) continue;

							intersects.push( {

								distance: distance,
								point: point,
								face: face,
								faceIndex: f,
								object: object

							} );

						}

					} else if ( face instanceof THREE.Face4 ) {

						a = vertices[ face.a ];
						b = vertices[ face.b ];
						c = vertices[ face.c ];
						d = vertices[ face.d ];

						if ( pointInFace3( intersectPoint, a, b, d ) || pointInFace3( intersectPoint, b, c, d ) ) {

							var point = object.matrixWorld.multiplyVector3( intersectPoint.clone() );
							distance = originCopy.distanceTo( point );

							if ( distance < ray.near || distance > ray.far ) continue;

							intersects.push( {

								distance: distance,
								point: point,
								face: face,
								faceIndex: f,
								object: object

							} );

						}

					}

				}

			}

		}

	};

	var intersectDescendants = function ( object, ray, intersects ) {

		var descendants = object.getDescendants();

		for ( var i = 0, l = descendants.length; i < l; i ++ ) {

			intersectObject( descendants[ i ], ray, intersects );

		}
	};

	//

	THREE.Ray.prototype.precision = 0.0001;

	THREE.Ray.prototype.set = function ( origin, direction ) {

		this.origin = origin;
		this.direction = direction;

	};

	THREE.Ray.prototype.intersectObject = function ( object, recursive ) {

		var intersects = [];

		if ( recursive === true ) {

			intersectDescendants( object, this, intersects );

		}

		intersectObject( object, this, intersects );

		intersects.sort( descSort );

		return intersects;

	};

	THREE.Ray.prototype.intersectObjects = function ( objects, recursive ) {

		var intersects = [];

		for ( var i = 0, l = objects.length; i < l; i ++ ) {

			intersectObject( objects[ i ], this, intersects );

			if ( recursive === true ) {

				intersectDescendants( objects[ i ], this, intersects );

			}
		}

		intersects.sort( descSort );

		return intersects;

	};

}( THREE ) );
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Rectangle = function () {

	var _left = 0;
	var _top = 0;
	var _right = 0;
	var _bottom = 0;
	var _width = 0;
	var _height = 0;
	var _isEmpty = true;

	function resize() {

		_width = _right - _left;
		_height = _bottom - _top;

	}

	this.getX = function () {

		return _left;

	};

	this.getY = function () {

		return _top;

	};

	this.getWidth = function () {

		return _width;

	};

	this.getHeight = function () {

		return _height;

	};

	this.getLeft = function() {

		return _left;

	};

	this.getTop = function() {

		return _top;

	};

	this.getRight = function() {

		return _right;

	};

	this.getBottom = function() {

		return _bottom;

	};

	this.set = function ( left, top, right, bottom ) {

		_isEmpty = false;

		_left = left; _top = top;
		_right = right; _bottom = bottom;

		resize();

	};

	this.addPoint = function ( x, y ) {

		if ( _isEmpty === true ) {

			_isEmpty = false;
			_left = x; _top = y;
			_right = x; _bottom = y;

			resize();

		} else {

			_left = _left < x ? _left : x; // Math.min( _left, x );
			_top = _top < y ? _top : y; // Math.min( _top, y );
			_right = _right > x ? _right : x; // Math.max( _right, x );
			_bottom = _bottom > y ? _bottom : y; // Math.max( _bottom, y );

			resize();
		}

	};

	this.add3Points = function ( x1, y1, x2, y2, x3, y3 ) {

		if ( _isEmpty === true ) {

			_isEmpty = false;
			_left = x1 < x2 ? ( x1 < x3 ? x1 : x3 ) : ( x2 < x3 ? x2 : x3 );
			_top = y1 < y2 ? ( y1 < y3 ? y1 : y3 ) : ( y2 < y3 ? y2 : y3 );
			_right = x1 > x2 ? ( x1 > x3 ? x1 : x3 ) : ( x2 > x3 ? x2 : x3 );
			_bottom = y1 > y2 ? ( y1 > y3 ? y1 : y3 ) : ( y2 > y3 ? y2 : y3 );

			resize();

		} else {

			_left = x1 < x2 ? ( x1 < x3 ? ( x1 < _left ? x1 : _left ) : ( x3 < _left ? x3 : _left ) ) : ( x2 < x3 ? ( x2 < _left ? x2 : _left ) : ( x3 < _left ? x3 : _left ) );
			_top = y1 < y2 ? ( y1 < y3 ? ( y1 < _top ? y1 : _top ) : ( y3 < _top ? y3 : _top ) ) : ( y2 < y3 ? ( y2 < _top ? y2 : _top ) : ( y3 < _top ? y3 : _top ) );
			_right = x1 > x2 ? ( x1 > x3 ? ( x1 > _right ? x1 : _right ) : ( x3 > _right ? x3 : _right ) ) : ( x2 > x3 ? ( x2 > _right ? x2 : _right ) : ( x3 > _right ? x3 : _right ) );
			_bottom = y1 > y2 ? ( y1 > y3 ? ( y1 > _bottom ? y1 : _bottom ) : ( y3 > _bottom ? y3 : _bottom ) ) : ( y2 > y3 ? ( y2 > _bottom ? y2 : _bottom ) : ( y3 > _bottom ? y3 : _bottom ) );

			resize();

		};

	};

	this.addRectangle = function ( r ) {

		if ( _isEmpty === true ) {

			_isEmpty = false;
			_left = r.getLeft(); _top = r.getTop();
			_right = r.getRight(); _bottom = r.getBottom();

			resize();

		} else {

			_left = _left < r.getLeft() ? _left : r.getLeft(); // Math.min(_left, r.getLeft() );
			_top = _top < r.getTop() ? _top : r.getTop(); // Math.min(_top, r.getTop() );
			_right = _right > r.getRight() ? _right : r.getRight(); // Math.max(_right, r.getRight() );
			_bottom = _bottom > r.getBottom() ? _bottom : r.getBottom(); // Math.max(_bottom, r.getBottom() );

			resize();

		}

	};

	this.inflate = function ( v ) {

		_left -= v; _top -= v;
		_right += v; _bottom += v;

		resize();

	};

	this.minSelf = function ( r ) {

		_left = _left > r.getLeft() ? _left : r.getLeft(); // Math.max( _left, r.getLeft() );
		_top = _top > r.getTop() ? _top : r.getTop(); // Math.max( _top, r.getTop() );
		_right = _right < r.getRight() ? _right : r.getRight(); // Math.min( _right, r.getRight() );
		_bottom = _bottom < r.getBottom() ? _bottom : r.getBottom(); // Math.min( _bottom, r.getBottom() );

		resize();

	};

	this.intersects = function ( r ) {

		// http://gamemath.com/2011/09/detecting-whether-two-boxes-overlap/

		if ( _right < r.getLeft() ) return false;
		if ( _left > r.getRight() ) return false;
		if ( _bottom < r.getTop() ) return false;
		if ( _top > r.getBottom() ) return false;

		return true;

	};

	this.empty = function () {

		_isEmpty = true;

		_left = 0; _top = 0;
		_right = 0; _bottom = 0;

		resize();

	};

	this.isEmpty = function () {

		return _isEmpty;

	};

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Math = {

	// Clamp value to range <a, b>

	clamp: function ( x, a, b ) {

		return ( x < a ) ? a : ( ( x > b ) ? b : x );

	},

	// Clamp value to range <a, inf)

	clampBottom: function ( x, a ) {

		return x < a ? a : x;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>

	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)

	random16: function () {

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;

	},

	// Random integer from <low, high> interval

	randInt: function ( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );

	},

	// Random float from <low, high> interval

	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	sign: function ( x ) {

		return ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Object3D = function () {

	THREE.Object3DLibrary.push( this );

	this.id = THREE.Object3DIdCount ++;

	this.name = '';
	this.properties = {};

	this.parent = undefined;
	this.children = [];

	this.up = new THREE.Vector3( 0, 1, 0 );

	this.position = new THREE.Vector3();
	this.rotation = new THREE.Vector3();
	this.eulerOrder = THREE.Object3D.defaultEulerOrder;
	this.scale = new THREE.Vector3( 1, 1, 1 );

	this.renderDepth = null;

	this.rotationAutoUpdate = true;

	this.matrix = new THREE.Matrix4();
	this.matrixWorld = new THREE.Matrix4();
	this.matrixRotationWorld = new THREE.Matrix4();

	this.matrixAutoUpdate = true;
	this.matrixWorldNeedsUpdate = true;

	this.quaternion = new THREE.Quaternion();
	this.useQuaternion = false;

	this.boundRadius = 0.0;
	this.boundRadiusScale = 1.0;

	this.visible = true;

	this.castShadow = false;
	this.receiveShadow = false;

	this.frustumCulled = true;

	this._vector = new THREE.Vector3();

};


THREE.Object3D.prototype = {

	constructor: THREE.Object3D,

	applyMatrix: function ( matrix ) {

		this.matrix.multiply( matrix, this.matrix );

		this.scale.getScaleFromMatrix( this.matrix );

		var mat = new THREE.Matrix4().extractRotation( this.matrix );
		this.rotation.setEulerFromRotationMatrix( mat, this.eulerOrder );

		this.position.getPositionFromMatrix( this.matrix );

	},

	translate: function ( distance, axis ) {

		this.matrix.rotateAxis( axis );
		this.position.addSelf( axis.multiplyScalar( distance ) );

	},

	translateX: function ( distance ) {

		this.translate( distance, this._vector.set( 1, 0, 0 ) );

	},

	translateY: function ( distance ) {

		this.translate( distance, this._vector.set( 0, 1, 0 ) );

	},

	translateZ: function ( distance ) {

		this.translate( distance, this._vector.set( 0, 0, 1 ) );

	},

	localToWorld: function ( vector ) {

		return this.matrixWorld.multiplyVector3( vector );

	},

	worldToLocal: function ( vector ) {

		return THREE.Object3D.__m1.getInverse( this.matrixWorld ).multiplyVector3( vector );

	},

	lookAt: function ( vector ) {

		// TODO: Add hierarchy support.

		this.matrix.lookAt( vector, this.position, this.up );

		if ( this.rotationAutoUpdate ) {

			if ( this.useQuaternion === false )  {

				this.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );

			} else {

				this.quaternion.copy( this.matrix.decompose()[ 1 ] );

			}

		}

	},

	add: function ( object ) {

		if ( object === this ) {

			console.warn( 'THREE.Object3D.add: An object can\'t be added as a child of itself.' );
			return;

		}

		if ( object instanceof THREE.Object3D ) {

			if ( object.parent !== undefined ) {

				object.parent.remove( object );

			}

			object.parent = this;
			this.children.push( object );

			// add to scene

			var scene = this;

			while ( scene.parent !== undefined ) {

				scene = scene.parent;

			}

			if ( scene !== undefined && scene instanceof THREE.Scene )  {

				scene.__addObject( object );

			}

		}

	},

	remove: function ( object ) {

		var index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = undefined;
			this.children.splice( index, 1 );

			// remove from scene

			var scene = this;

			while ( scene.parent !== undefined ) {

				scene = scene.parent;

			}

			if ( scene !== undefined && scene instanceof THREE.Scene ) {

				scene.__removeObject( object );

			}

		}

	},

	traverse: function ( callback ) {

		callback( this );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].traverse( callback );

		}

	},

	getChildByName: function ( name, recursive ) {

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];

			if ( child.name === name ) {

				return child;

			}

			if ( recursive === true ) {

				child = child.getChildByName( name, recursive );

				if ( child !== undefined ) {

					return child;

				}

			}

		}

		return undefined;

	},

	getDescendants: function ( array ) {

		if ( array === undefined ) array = [];

		Array.prototype.push.apply( array, this.children );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].getDescendants( array );

		}

		return array;

	},

	updateMatrix: function () {

		this.matrix.setPosition( this.position );

		if ( this.useQuaternion === false )  {

			this.matrix.setRotationFromEuler( this.rotation, this.eulerOrder );

		} else {

			this.matrix.setRotationFromQuaternion( this.quaternion );

		}

		if ( this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1 ) {

			this.matrix.scale( this.scale );
			this.boundRadiusScale = Math.max( this.scale.x, Math.max( this.scale.y, this.scale.z ) );

		}

		this.matrixWorldNeedsUpdate = true;

	},

	updateMatrixWorld: function ( force ) {

		if ( this.matrixAutoUpdate === true ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate === true || force === true ) {

			if ( this.parent === undefined ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].updateMatrixWorld( force );

		}

	},

	clone: function ( object ) {

		if ( object === undefined ) object = new THREE.Object3D();

		object.name = this.name;

		object.up.copy( this.up );

		object.position.copy( this.position );
		if ( object.rotation instanceof THREE.Vector3 ) object.rotation.copy( this.rotation ); // because of Sprite madness
		object.eulerOrder = this.eulerOrder;
		object.scale.copy( this.scale );

		object.renderDepth = this.renderDepth;

		object.rotationAutoUpdate = this.rotationAutoUpdate;

		object.matrix.copy( this.matrix );
		object.matrixWorld.copy( this.matrixWorld );
		object.matrixRotationWorld.copy( this.matrixRotationWorld );

		object.matrixAutoUpdate = this.matrixAutoUpdate;
		object.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;

		object.quaternion.copy( this.quaternion );
		object.useQuaternion = this.useQuaternion;

		object.boundRadius = this.boundRadius;
		object.boundRadiusScale = this.boundRadiusScale;

		object.visible = this.visible;

		object.castShadow = this.castShadow;
		object.receiveShadow = this.receiveShadow;

		object.frustumCulled = this.frustumCulled;

		for ( var i = 0; i < this.children.length; i ++ ) {

			var child = this.children[ i ];
			object.add( child.clone() );

		}

		return object;

	},

	deallocate: function () {

		var index = THREE.Object3DLibrary.indexOf( this );
		if ( index !== -1 ) THREE.Object3DLibrary.splice( index, 1 );

	}

};

THREE.Object3D.__m1 = new THREE.Matrix4();
THREE.Object3D.defaultEulerOrder = 'XYZ',

THREE.Object3DIdCount = 0;
THREE.Object3DLibrary = [];
/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author julianwa / https://github.com/julianwa
 */

THREE.Projector = function() {

	var _object, _objectCount, _objectPool = [], _objectPoolLength = 0,
	_vertex, _vertexCount, _vertexPool = [], _vertexPoolLength = 0,
	_face, _face3Count, _face3Pool = [], _face3PoolLength = 0,
	_face4Count, _face4Pool = [], _face4PoolLength = 0,
	_line, _lineCount, _linePool = [], _linePoolLength = 0,
	_particle, _particleCount, _particlePool = [], _particlePoolLength = 0,

	_renderData = { objects: [], sprites: [], lights: [], elements: [] },

	_vector3 = new THREE.Vector3(),
	_vector4 = new THREE.Vector4(),

	_viewProjectionMatrix = new THREE.Matrix4(),
	_modelViewProjectionMatrix = new THREE.Matrix4(),
	_normalMatrix = new THREE.Matrix3(),

	_frustum = new THREE.Frustum(),

	_clippedVertex1PositionScreen = new THREE.Vector4(),
	_clippedVertex2PositionScreen = new THREE.Vector4(),

	_face3VertexNormals;

	this.projectVector = function ( vector, camera ) {

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		_viewProjectionMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
		_viewProjectionMatrix.multiplyVector3( vector );

		return vector;

	};

	this.unprojectVector = function ( vector, camera ) {

		camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );

		_viewProjectionMatrix.multiply( camera.matrixWorld, camera.projectionMatrixInverse );
		_viewProjectionMatrix.multiplyVector3( vector );

		return vector;

	};

	this.pickingRay = function ( vector, camera ) {

		var end, ray, t;

		// set two vectors with opposing z values
		vector.z = -1.0;
		end = new THREE.Vector3( vector.x, vector.y, 1.0 );

		this.unprojectVector( vector, camera );
		this.unprojectVector( end, camera );

		// find direction from vector to end
		end.subSelf( vector ).normalize();

		return new THREE.Ray( vector, end );

	};

	var projectGraph = function ( root, sortObjects ) {

		_objectCount = 0;

		_renderData.objects.length = 0;
		_renderData.sprites.length = 0;
		_renderData.lights.length = 0;

		var projectObject = function ( parent ) {

			for ( var c = 0, cl = parent.children.length; c < cl; c ++ ) {

				var object = parent.children[ c ];

				if ( object.visible === false ) continue;

				if ( object instanceof THREE.Light ) {

					_renderData.lights.push( object );

				} else if ( object instanceof THREE.Mesh || object instanceof THREE.Line ) {

					if ( object.frustumCulled === false || _frustum.contains( object ) === true ) {

						_object = getNextObjectInPool();
						_object.object = object;

						if ( object.renderDepth !== null ) {

							_object.z = object.renderDepth;

						} else {

							_vector3.copy( object.matrixWorld.getPosition() );
							_viewProjectionMatrix.multiplyVector3( _vector3 );
							_object.z = _vector3.z;

						}

						_renderData.objects.push( _object );

					}

				} else if ( object instanceof THREE.Sprite || object instanceof THREE.Particle ) {

					_object = getNextObjectInPool();
					_object.object = object;

					// TODO: Find an elegant and performant solution and remove this dupe code.

					if ( object.renderDepth !== null ) {

						_object.z = object.renderDepth;

					} else {

						_vector3.copy( object.matrixWorld.getPosition() );
						_viewProjectionMatrix.multiplyVector3( _vector3 );
						_object.z = _vector3.z;

					}

					_renderData.sprites.push( _object );

				} else {

					_object = getNextObjectInPool();
					_object.object = object;

					if ( object.renderDepth !== null ) {

						_object.z = object.renderDepth;

					} else {

						_vector3.copy( object.matrixWorld.getPosition() );
						_viewProjectionMatrix.multiplyVector3( _vector3 );
						_object.z = _vector3.z;

					}

					_renderData.objects.push( _object );

				}

				projectObject( object );

			}

		};

		projectObject( root );

		if ( sortObjects === true ) _renderData.objects.sort( painterSort );

		return _renderData;

	};

	this.projectScene = function ( scene, camera, sortObjects, sortElements ) {

		var near = camera.near, far = camera.far, visible = false,
		o, ol, v, vl, f, fl, n, nl, c, cl, u, ul, object, modelMatrix,
		geometry, vertices, vertex, vertexPositionScreen,
		faces, face, faceVertexNormals, normal, faceVertexUvs, uvs,
		v1, v2, v3, v4, isFaceMaterial, objectMaterials, material, side;

		_face3Count = 0;
		_face4Count = 0;
		_lineCount = 0;
		_particleCount = 0;

		_renderData.elements.length = 0;

		scene.updateMatrixWorld();

		if ( camera.parent === undefined ) camera.updateMatrixWorld();

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		_viewProjectionMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );

		_frustum.setFromMatrix( _viewProjectionMatrix );

		_renderData = projectGraph( scene, sortObjects );

		for ( o = 0, ol = _renderData.objects.length; o < ol; o ++ ) {

			object = _renderData.objects[ o ].object;

			modelMatrix = object.matrixWorld;

			_vertexCount = 0;

			if ( object instanceof THREE.Mesh ) {

				geometry = object.geometry;

				vertices = geometry.vertices;
				faces = geometry.faces;
				faceVertexUvs = geometry.faceVertexUvs;

				_normalMatrix.getInverse( modelMatrix );
				_normalMatrix.transpose();

				isFaceMaterial = object.material instanceof THREE.MeshFaceMaterial;
				objectMaterials = isFaceMaterial === true ? object.material : null;

				side = object.material.side;

				for ( v = 0, vl = vertices.length; v < vl; v ++ ) {

					_vertex = getNextVertexInPool();
					_vertex.positionWorld.copy( vertices[ v ] );

					modelMatrix.multiplyVector3( _vertex.positionWorld );

					_vertex.positionScreen.copy( _vertex.positionWorld );
					_viewProjectionMatrix.multiplyVector4( _vertex.positionScreen );

					_vertex.positionScreen.x /= _vertex.positionScreen.w;
					_vertex.positionScreen.y /= _vertex.positionScreen.w;

					_vertex.visible = _vertex.positionScreen.z > near && _vertex.positionScreen.z < far;

				}

				for ( f = 0, fl = faces.length; f < fl; f ++ ) {

					face = faces[ f ];

					material = isFaceMaterial === true ? objectMaterials.materials[ face.materialIndex ] : object.material;

					if ( material === undefined ) continue;

					side = material.side;

					if ( face instanceof THREE.Face3 ) {

						v1 = _vertexPool[ face.a ];
						v2 = _vertexPool[ face.b ];
						v3 = _vertexPool[ face.c ];

						if ( v1.visible === true && v2.visible === true && v3.visible === true ) {

							visible = ( ( v3.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -
								( v3.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) ) < 0;

							if ( side === THREE.DoubleSide || visible === ( side === THREE.FrontSide ) ) {

								_face = getNextFace3InPool();

								_face.v1.copy( v1 );
								_face.v2.copy( v2 );
								_face.v3.copy( v3 );

							} else {

								continue;

							}

						} else {

							continue;

						}

					} else if ( face instanceof THREE.Face4 ) {

						v1 = _vertexPool[ face.a ];
						v2 = _vertexPool[ face.b ];
						v3 = _vertexPool[ face.c ];
						v4 = _vertexPool[ face.d ];

						if ( v1.visible === true && v2.visible === true && v3.visible === true && v4.visible === true ) {

							visible = ( v4.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -
								( v4.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) < 0 ||
								( v2.positionScreen.x - v3.positionScreen.x ) * ( v4.positionScreen.y - v3.positionScreen.y ) -
								( v2.positionScreen.y - v3.positionScreen.y ) * ( v4.positionScreen.x - v3.positionScreen.x ) < 0;


							if ( side === THREE.DoubleSide || visible === ( side === THREE.FrontSide ) ) {

								_face = getNextFace4InPool();

								_face.v1.copy( v1 );
								_face.v2.copy( v2 );
								_face.v3.copy( v3 );
								_face.v4.copy( v4 );

							} else {

								continue;

							}

						} else {

							continue;

						}

					}

					_face.normalWorld.copy( face.normal );

					if ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) _face.normalWorld.negate();
					_normalMatrix.multiplyVector3( _face.normalWorld ).normalize();

					_face.centroidWorld.copy( face.centroid );
					modelMatrix.multiplyVector3( _face.centroidWorld );

					_face.centroidScreen.copy( _face.centroidWorld );
					_viewProjectionMatrix.multiplyVector3( _face.centroidScreen );

					faceVertexNormals = face.vertexNormals;

					for ( n = 0, nl = faceVertexNormals.length; n < nl; n ++ ) {

						normal = _face.vertexNormalsWorld[ n ];
						normal.copy( faceVertexNormals[ n ] );

						if ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) normal.negate();

						_normalMatrix.multiplyVector3( normal ).normalize();

					}

					_face.vertexNormalsLength = faceVertexNormals.length;

					for ( c = 0, cl = faceVertexUvs.length; c < cl; c ++ ) {

						uvs = faceVertexUvs[ c ][ f ];

						if ( uvs === undefined ) continue;

						for ( u = 0, ul = uvs.length; u < ul; u ++ ) {

							_face.uvs[ c ][ u ] = uvs[ u ];

						}

					}

					_face.color = face.color;
					_face.material = material;

					_face.z = _face.centroidScreen.z;

					_renderData.elements.push( _face );

				}

			} else if ( object instanceof THREE.Line ) {

				_modelViewProjectionMatrix.multiply( _viewProjectionMatrix, modelMatrix );

				vertices = object.geometry.vertices;

				v1 = getNextVertexInPool();
				v1.positionScreen.copy( vertices[ 0 ] );
				_modelViewProjectionMatrix.multiplyVector4( v1.positionScreen );

				// Handle LineStrip and LinePieces
				var step = object.type === THREE.LinePieces ? 2 : 1;

				for ( v = 1, vl = vertices.length; v < vl; v ++ ) {

					v1 = getNextVertexInPool();
					v1.positionScreen.copy( vertices[ v ] );
					_modelViewProjectionMatrix.multiplyVector4( v1.positionScreen );

					if ( ( v + 1 ) % step > 0 ) continue;

					v2 = _vertexPool[ _vertexCount - 2 ];

					_clippedVertex1PositionScreen.copy( v1.positionScreen );
					_clippedVertex2PositionScreen.copy( v2.positionScreen );

					if ( clipLine( _clippedVertex1PositionScreen, _clippedVertex2PositionScreen ) === true ) {

						// Perform the perspective divide
						_clippedVertex1PositionScreen.multiplyScalar( 1 / _clippedVertex1PositionScreen.w );
						_clippedVertex2PositionScreen.multiplyScalar( 1 / _clippedVertex2PositionScreen.w );

						_line = getNextLineInPool();
						_line.v1.positionScreen.copy( _clippedVertex1PositionScreen );
						_line.v2.positionScreen.copy( _clippedVertex2PositionScreen );

						_line.z = Math.max( _clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z );

						_line.material = object.material;

						_renderData.elements.push( _line );

					}

				}

			}

		}

		for ( o = 0, ol = _renderData.sprites.length; o < ol; o++ ) {

			object = _renderData.sprites[ o ].object;

			modelMatrix = object.matrixWorld;

			if ( object instanceof THREE.Particle ) {

				_vector4.set( modelMatrix.elements[12], modelMatrix.elements[13], modelMatrix.elements[14], 1 );
				_viewProjectionMatrix.multiplyVector4( _vector4 );

				_vector4.z /= _vector4.w;

				if ( _vector4.z > 0 && _vector4.z < 1 ) {

					_particle = getNextParticleInPool();
					_particle.object = object;
					_particle.x = _vector4.x / _vector4.w;
					_particle.y = _vector4.y / _vector4.w;
					_particle.z = _vector4.z;

					_particle.rotation = object.rotation.z;

					_particle.scale.x = object.scale.x * Math.abs( _particle.x - ( _vector4.x + camera.projectionMatrix.elements[0] ) / ( _vector4.w + camera.projectionMatrix.elements[12] ) );
					_particle.scale.y = object.scale.y * Math.abs( _particle.y - ( _vector4.y + camera.projectionMatrix.elements[5] ) / ( _vector4.w + camera.projectionMatrix.elements[13] ) );

					_particle.material = object.material;

					_renderData.elements.push( _particle );

				}

			}

		}

		if ( sortElements === true ) _renderData.elements.sort( painterSort );

		return _renderData;

	};

	// Pools

	function getNextObjectInPool() {

		if ( _objectCount === _objectPoolLength ) {

			var object = new THREE.RenderableObject();
			_objectPool.push( object );
			_objectPoolLength ++;
			_objectCount ++;
			return object;

		}

		return _objectPool[ _objectCount ++ ];

	}

	function getNextVertexInPool() {

		if ( _vertexCount === _vertexPoolLength ) {

			var vertex = new THREE.RenderableVertex();
			_vertexPool.push( vertex );
			_vertexPoolLength ++;
			_vertexCount ++;
			return vertex;

		}

		return _vertexPool[ _vertexCount ++ ];

	}

	function getNextFace3InPool() {

		if ( _face3Count === _face3PoolLength ) {

			var face = new THREE.RenderableFace3();
			_face3Pool.push( face );
			_face3PoolLength ++;
			_face3Count ++;
			return face;

		}

		return _face3Pool[ _face3Count ++ ];


	}

	function getNextFace4InPool() {

		if ( _face4Count === _face4PoolLength ) {

			var face = new THREE.RenderableFace4();
			_face4Pool.push( face );
			_face4PoolLength ++;
			_face4Count ++;
			return face;

		}

		return _face4Pool[ _face4Count ++ ];

	}

	function getNextLineInPool() {

		if ( _lineCount === _linePoolLength ) {

			var line = new THREE.RenderableLine();
			_linePool.push( line );
			_linePoolLength ++;
			_lineCount ++
			return line;

		}

		return _linePool[ _lineCount ++ ];

	}

	function getNextParticleInPool() {

		if ( _particleCount === _particlePoolLength ) {

			var particle = new THREE.RenderableParticle();
			_particlePool.push( particle );
			_particlePoolLength ++;
			_particleCount ++
			return particle;

		}

		return _particlePool[ _particleCount ++ ];

	}

	//

	function painterSort( a, b ) {

		return b.z - a.z;

	}

	function clipLine( s1, s2 ) {

		var alpha1 = 0, alpha2 = 1,

		// Calculate the boundary coordinate of each vertex for the near and far clip planes,
		// Z = -1 and Z = +1, respectively.
		bc1near =  s1.z + s1.w,
		bc2near =  s2.z + s2.w,
		bc1far =  - s1.z + s1.w,
		bc2far =  - s2.z + s2.w;

		if ( bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0 ) {

			// Both vertices lie entirely within all clip planes.
			return true;

		} else if ( ( bc1near < 0 && bc2near < 0) || (bc1far < 0 && bc2far < 0 ) ) {

			// Both vertices lie entirely outside one of the clip planes.
			return false;

		} else {

			// The line segment spans at least one clip plane.

			if ( bc1near < 0 ) {

				// v1 lies outside the near plane, v2 inside
				alpha1 = Math.max( alpha1, bc1near / ( bc1near - bc2near ) );

			} else if ( bc2near < 0 ) {

				// v2 lies outside the near plane, v1 inside
				alpha2 = Math.min( alpha2, bc1near / ( bc1near - bc2near ) );

			}

			if ( bc1far < 0 ) {

				// v1 lies outside the far plane, v2 inside
				alpha1 = Math.max( alpha1, bc1far / ( bc1far - bc2far ) );

			} else if ( bc2far < 0 ) {

				// v2 lies outside the far plane, v2 inside
				alpha2 = Math.min( alpha2, bc1far / ( bc1far - bc2far ) );

			}

			if ( alpha2 < alpha1 ) {

				// The line segment spans two boundaries, but is outside both of them.
				// (This can't happen when we're only clipping against just near/far but good
				//  to leave the check here for future usage if other clip planes are added.)
				return false;

			} else {

				// Update the s1 and s2 vertices to match the clipped line segment.
				s1.lerpSelf( s2, alpha1 );
				s2.lerpSelf( s1, 1 - alpha2 );

				return true;

			}

		}

	}

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Quaternion = function( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Quaternion.prototype = {

	constructor: THREE.Quaternion,

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	copy: function ( q ) {

		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;

		return this;

	},

	setFromEuler: function ( v, order ) {

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var c1 = Math.cos( v.x / 2 );
		var c2 = Math.cos( v.y / 2 );
		var c3 = Math.cos( v.z / 2 );
		var s1 = Math.sin( v.x / 2 );
		var s2 = Math.sin( v.y / 2 );
		var s3 = Math.sin( v.z / 2 );

		if ( order === undefined || order === 'XYZ' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'YXZ' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'ZXY' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'ZYX' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'YZX' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'XZY' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		return this;

	},

	setFromAxisAngle: function ( axis, angle ) {

		// from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
		// axis have to be normalized

		var halfAngle = angle / 2,
			s = Math.sin( halfAngle );

		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos( halfAngle );

		return this;

	},

	setFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[0], m12 = te[4], m13 = te[8],
			m21 = te[1], m22 = te[5], m23 = te[9],
			m31 = te[2], m32 = te[6], m33 = te[10],

			trace = m11 + m22 + m33,
			s;

		if( trace > 0 ) {

			s = 0.5 / Math.sqrt( trace + 1.0 );

			this.w = 0.25 / s;
			this.x = ( m32 - m23 ) * s;
			this.y = ( m13 - m31 ) * s;
			this.z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this.w = (m32 - m23 ) / s;
			this.x = 0.25 * s;
			this.y = (m12 + m21 ) / s;
			this.z = (m13 + m31 ) / s;

		} else if (m22 > m33) {

			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this.w = (m13 - m31 ) / s;
			this.x = (m12 + m21 ) / s;
			this.y = 0.25 * s;
			this.z = (m23 + m32 ) / s;

		} else {

			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this.w = ( m21 - m12 ) / s;
			this.x = ( m13 + m31 ) / s;
			this.y = ( m23 + m32 ) / s;
			this.z = 0.25 * s;

		}

		return this;

	},

	inverse: function () {

		this.conjugate().normalize();

		return this;

	},

	conjugate: function () {

		this.x *= -1;
		this.y *= -1;
		this.z *= -1;

		return this;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	},

	normalize: function () {

		var l = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

		if ( l === 0 ) {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		} else {

			l = 1 / l;

			this.x = this.x * l;
			this.y = this.y * l;
			this.z = this.z * l;
			this.w = this.w * l;

		}

		return this;

	},

	multiply: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
		var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w,
		qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

		this.x =  qax * qbw + qay * qbz - qaz * qby + qaw * qbx;
		this.y = -qax * qbz + qay * qbw + qaz * qbx + qaw * qby;
		this.z =  qax * qby - qay * qbx + qaz * qbw + qaw * qbz;
		this.w = -qax * qbx - qay * qby - qaz * qbz + qaw * qbw;

		return this;

	},

	multiplySelf: function ( b ) {

		var qax = this.x, qay = this.y, qaz = this.z, qaw = this.w,
		qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

		this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		return this;

	},

	multiplyVector3: function ( vector, dest ) {

		if ( !dest ) { dest = vector; }

		var x    = vector.x,  y  = vector.y,  z  = vector.z,
			qx   = this.x, qy = this.y, qz = this.z, qw = this.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y,
			iy =  qw * y + qz * x - qx * z,
			iz =  qw * z + qx * y - qy * x,
			iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return dest;

	},

	slerpSelf: function ( qb, t ) {

		var x = this.x, y = this.y, z = this.z, w = this.w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

		if ( cosHalfTheta < 0 ) {

			this.w = -qb.w;
			this.x = -qb.x;
			this.y = -qb.y;
			this.z = -qb.z;

			cosHalfTheta = -cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this.w = w;
			this.x = x;
			this.y = y;
			this.z = z;

			return this;

		}

		var halfTheta = Math.acos( cosHalfTheta );
		var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

		if ( Math.abs( sinHalfTheta ) < 0.001 ) {

			this.w = 0.5 * ( w + this.w );
			this.x = 0.5 * ( x + this.x );
			this.y = 0.5 * ( y + this.y );
			this.z = 0.5 * ( z + this.z );

			return this;

		}

		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
		ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this.w = ( w * ratioA + this.w * ratioB );
		this.x = ( x * ratioA + this.x * ratioB );
		this.y = ( y * ratioA + this.y * ratioB );
		this.z = ( z * ratioA + this.z * ratioB );

		return this;

	},

	clone: function () {

		return new THREE.Quaternion( this.x, this.y, this.z, this.w );

	}

}

THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {

	// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

	var cosHalfTheta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;

	if ( cosHalfTheta < 0 ) {

		qm.w = -qb.w;
		qm.x = -qb.x;
		qm.y = -qb.y;
		qm.z = -qb.z;

		cosHalfTheta = -cosHalfTheta;

	} else {

		qm.copy( qb );

	}

	if ( Math.abs( cosHalfTheta ) >= 1.0 ) {

		qm.w = qa.w;
		qm.x = qa.x;
		qm.y = qa.y;
		qm.z = qa.z;

		return qm;

	}

	var halfTheta = Math.acos( cosHalfTheta );
	var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

	if ( Math.abs( sinHalfTheta ) < 0.001 ) {

		qm.w = 0.5 * ( qa.w + qm.w );
		qm.x = 0.5 * ( qa.x + qm.x );
		qm.y = 0.5 * ( qa.y + qm.y );
		qm.z = 0.5 * ( qa.z + qm.z );

		return qm;

	}

	var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta;
	var ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

	qm.w = ( qa.w * ratioA + qm.w * ratioB );
	qm.x = ( qa.x * ratioA + qm.x * ratioB );
	qm.y = ( qa.y * ratioA + qm.y * ratioB );
	qm.z = ( qa.z * ratioA + qm.z * ratioB );

	return qm;

}
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Vertex = function ( v ) {

	console.warn( 'THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.')
	return v;

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Face3 = function ( a, b, c, normal, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	this.vertexNormals = normal instanceof Array ? normal : [ ];

	this.color = color instanceof THREE.Color ? color : new THREE.Color();
	this.vertexColors = color instanceof Array ? color : [];

	this.vertexTangents = [];

	this.materialIndex = materialIndex;

	this.centroid = new THREE.Vector3();

};

THREE.Face3.prototype = {

	constructor: THREE.Face3,

	clone: function () {

		var face = new THREE.Face3( this.a, this.b, this.c );

		face.normal.copy( this.normal );
		face.color.copy( this.color );
		face.centroid.copy( this.centroid );

		face.materialIndex = this.materialIndex;

		var i, il;
		for ( i = 0, il = this.vertexNormals.length; i < il; i ++ ) face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();
		for ( i = 0, il = this.vertexColors.length; i < il; i ++ ) face.vertexColors[ i ] = this.vertexColors[ i ].clone();
		for ( i = 0, il = this.vertexTangents.length; i < il; i ++ ) face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();

		return face;

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Face4 = function ( a, b, c, d, normal, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;

	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	this.vertexNormals = normal instanceof Array ? normal : [ ];

	this.color = color instanceof THREE.Color ? color : new THREE.Color();
	this.vertexColors = color instanceof Array ? color : [];

	this.vertexTangents = [];

	this.materialIndex = materialIndex;

	this.centroid = new THREE.Vector3();

};

THREE.Face4.prototype = {

	constructor: THREE.Face4,

	clone: function () {

		var face = new THREE.Face4( this.a, this.b, this.c, this.d );

		face.normal.copy( this.normal );
		face.color.copy( this.color );
		face.centroid.copy( this.centroid );

		face.materialIndex = this.materialIndex;

		var i, il;
		for ( i = 0, il = this.vertexNormals.length; i < il; i ++ ) face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();
		for ( i = 0, il = this.vertexColors.length; i < il; i ++ ) face.vertexColors[ i ] = this.vertexColors[ i ].clone();
		for ( i = 0, il = this.vertexTangents.length; i < il; i ++ ) face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();

		return face;

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.UV = function ( u, v ) {

	this.u = u || 0;
	this.v = v || 0;

};

THREE.UV.prototype = {

	constructor: THREE.UV,

	set: function ( u, v ) {

		this.u = u;
		this.v = v;

		return this;

	},

	copy: function ( uv ) {

		this.u = uv.u;
		this.v = uv.v;

		return this;

	},

	lerpSelf: function ( uv, alpha ) {

		this.u += ( uv.u - this.u ) * alpha;
		this.v += ( uv.v - this.v ) * alpha;

		return this;

	},

	clone: function () {

		return new THREE.UV( this.u, this.v );

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Geometry = function () {

	THREE.GeometryLibrary.push( this );

	this.id = THREE.GeometryIdCount ++;

	this.name = '';

	this.vertices = [];
	this.colors = [];  // one-to-one vertex colors, used in ParticleSystem, Line and Ribbon
	this.normals = []; // one-to-one vertex normals, used in Ribbon

	this.faces = [];

	this.faceUvs = [[]];
	this.faceVertexUvs = [[]];

	this.morphTargets = [];
	this.morphColors = [];
	this.morphNormals = [];

	this.skinWeights = [];
	this.skinIndices = [];

	this.lineDistances = [];

	this.boundingBox = null;
	this.boundingSphere = null;

	this.hasTangents = false;

	this.dynamic = true; // the intermediate typed arrays will be deleted when set to false

	// update flags

	this.verticesNeedUpdate = false;
	this.elementsNeedUpdate = false;
	this.uvsNeedUpdate = false;
	this.normalsNeedUpdate = false;
	this.tangentsNeedUpdate = false;
	this.colorsNeedUpdate = false;
	this.lineDistancesNeedUpdate = false;

	this.buffersNeedUpdate = false;

};

THREE.Geometry.prototype = {

	constructor : THREE.Geometry,

	applyMatrix: function ( matrix ) {

		var normalMatrix = new THREE.Matrix3();

		normalMatrix.getInverse( matrix ).transpose();

		for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

			var vertex = this.vertices[ i ];

			matrix.multiplyVector3( vertex );

		}

		for ( var i = 0, il = this.faces.length; i < il; i ++ ) {

			var face = this.faces[ i ];

			normalMatrix.multiplyVector3( face.normal ).normalize();

			for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

				normalMatrix.multiplyVector3( face.vertexNormals[ j ] ).normalize();

			}

			matrix.multiplyVector3( face.centroid );

		}

	},

	computeCentroids: function () {

		var f, fl, face;

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];
			face.centroid.set( 0, 0, 0 );

			if ( face instanceof THREE.Face3 ) {

				face.centroid.addSelf( this.vertices[ face.a ] );
				face.centroid.addSelf( this.vertices[ face.b ] );
				face.centroid.addSelf( this.vertices[ face.c ] );
				face.centroid.divideScalar( 3 );

			} else if ( face instanceof THREE.Face4 ) {

				face.centroid.addSelf( this.vertices[ face.a ] );
				face.centroid.addSelf( this.vertices[ face.b ] );
				face.centroid.addSelf( this.vertices[ face.c ] );
				face.centroid.addSelf( this.vertices[ face.d ] );
				face.centroid.divideScalar( 4 );

			}

		}

	},

	computeFaceNormals: function () {

		var n, nl, v, vl, vertex, f, fl, face, vA, vB, vC,
		cb = new THREE.Vector3(), ab = new THREE.Vector3();

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			vA = this.vertices[ face.a ];
			vB = this.vertices[ face.b ];
			vC = this.vertices[ face.c ];

			cb.sub( vC, vB );
			ab.sub( vA, vB );
			cb.crossSelf( ab );

			cb.normalize();

			face.normal.copy( cb );

		}

	},

	computeVertexNormals: function ( areaWeighted ) {

		var v, vl, f, fl, face, vertices;

		// create internal buffers for reuse when calling this method repeatedly
		// (otherwise memory allocation / deallocation every frame is big resource hog)

		if ( this.__tmpVertices === undefined ) {

			this.__tmpVertices = new Array( this.vertices.length );
			vertices = this.__tmpVertices;

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ] = new THREE.Vector3();

			}

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				if ( face instanceof THREE.Face3 ) {

					face.vertexNormals = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];

				} else if ( face instanceof THREE.Face4 ) {

					face.vertexNormals = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];

				}

			}

		} else {

			vertices = this.__tmpVertices;

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ].set( 0, 0, 0 );

			}

		}

		if ( areaWeighted ) {

			// vertex normals weighted by triangle areas
			// http://www.iquilezles.org/www/articles/normals/normals.htm

			var vA, vB, vC, vD;
			var cb = new THREE.Vector3(), ab = new THREE.Vector3(),
				db = new THREE.Vector3(), dc = new THREE.Vector3(), bc = new THREE.Vector3();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				if ( face instanceof THREE.Face3 ) {

					vA = this.vertices[ face.a ];
					vB = this.vertices[ face.b ];
					vC = this.vertices[ face.c ];

					cb.sub( vC, vB );
					ab.sub( vA, vB );
					cb.crossSelf( ab );

					vertices[ face.a ].addSelf( cb );
					vertices[ face.b ].addSelf( cb );
					vertices[ face.c ].addSelf( cb );

				} else if ( face instanceof THREE.Face4 ) {

					vA = this.vertices[ face.a ];
					vB = this.vertices[ face.b ];
					vC = this.vertices[ face.c ];
					vD = this.vertices[ face.d ];

					// abd

					db.sub( vD, vB );
					ab.sub( vA, vB );
					db.crossSelf( ab );

					vertices[ face.a ].addSelf( db );
					vertices[ face.b ].addSelf( db );
					vertices[ face.d ].addSelf( db );

					// bcd

					dc.sub( vD, vC );
					bc.sub( vB, vC );
					dc.crossSelf( bc );

					vertices[ face.b ].addSelf( dc );
					vertices[ face.c ].addSelf( dc );
					vertices[ face.d ].addSelf( dc );

				}

			}

		} else {

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				if ( face instanceof THREE.Face3 ) {

					vertices[ face.a ].addSelf( face.normal );
					vertices[ face.b ].addSelf( face.normal );
					vertices[ face.c ].addSelf( face.normal );

				} else if ( face instanceof THREE.Face4 ) {

					vertices[ face.a ].addSelf( face.normal );
					vertices[ face.b ].addSelf( face.normal );
					vertices[ face.c ].addSelf( face.normal );
					vertices[ face.d ].addSelf( face.normal );

				}

			}

		}

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ].normalize();

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( face instanceof THREE.Face3 ) {

				face.vertexNormals[ 0 ].copy( vertices[ face.a ] );
				face.vertexNormals[ 1 ].copy( vertices[ face.b ] );
				face.vertexNormals[ 2 ].copy( vertices[ face.c ] );

			} else if ( face instanceof THREE.Face4 ) {

				face.vertexNormals[ 0 ].copy( vertices[ face.a ] );
				face.vertexNormals[ 1 ].copy( vertices[ face.b ] );
				face.vertexNormals[ 2 ].copy( vertices[ face.c ] );
				face.vertexNormals[ 3 ].copy( vertices[ face.d ] );

			}

		}

	},

	computeMorphNormals: function () {

		var i, il, f, fl, face;

		// save original normals
		// - create temp variables on first access
		//   otherwise just copy (for faster repeated calls)

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( ! face.__originalFaceNormal ) {

				face.__originalFaceNormal = face.normal.clone();

			} else {

				face.__originalFaceNormal.copy( face.normal );

			}

			if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

			for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

				if ( ! face.__originalVertexNormals[ i ] ) {

					face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

				} else {

					face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

				}

			}

		}

		// use temp geometry to compute face and vertex normals for each morph

		var tmpGeo = new THREE.Geometry();
		tmpGeo.faces = this.faces;

		for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

			// create on first access

			if ( ! this.morphNormals[ i ] ) {

				this.morphNormals[ i ] = {};
				this.morphNormals[ i ].faceNormals = [];
				this.morphNormals[ i ].vertexNormals = [];

				var dstNormalsFace = this.morphNormals[ i ].faceNormals;
				var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					faceNormal = new THREE.Vector3();

					if ( face instanceof THREE.Face3 ) {

						vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };

					} else {

						vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), d: new THREE.Vector3() };

					}

					dstNormalsFace.push( faceNormal );
					dstNormalsVertex.push( vertexNormals );

				}

			}

			var morphNormals = this.morphNormals[ i ];

			// set vertices to morph target

			tmpGeo.vertices = this.morphTargets[ i ].vertices;

			// compute morph normals

			tmpGeo.computeFaceNormals();
			tmpGeo.computeVertexNormals();

			// store morph normals

			var faceNormal, vertexNormals;

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				faceNormal = morphNormals.faceNormals[ f ];
				vertexNormals = morphNormals.vertexNormals[ f ];

				faceNormal.copy( face.normal );

				if ( face instanceof THREE.Face3 ) {

					vertexNormals.a.copy( face.vertexNormals[ 0 ] );
					vertexNormals.b.copy( face.vertexNormals[ 1 ] );
					vertexNormals.c.copy( face.vertexNormals[ 2 ] );

				} else {

					vertexNormals.a.copy( face.vertexNormals[ 0 ] );
					vertexNormals.b.copy( face.vertexNormals[ 1 ] );
					vertexNormals.c.copy( face.vertexNormals[ 2 ] );
					vertexNormals.d.copy( face.vertexNormals[ 3 ] );

				}

			}

		}

		// restore original normals

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.normal = face.__originalFaceNormal;
			face.vertexNormals = face.__originalVertexNormals;

		}

	},

	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// tangents go to vertices

		var f, fl, v, vl, i, il, vertexIndex,
			face, uv, vA, vB, vC, uvA, uvB, uvC,
			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r, t, test,
			tan1 = [], tan2 = [],
			sdir = new THREE.Vector3(), tdir = new THREE.Vector3(),
			tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(),
			n = new THREE.Vector3(), w;

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			tan1[ v ] = new THREE.Vector3();
			tan2[ v ] = new THREE.Vector3();

		}

		function handleTriangle( context, a, b, c, ua, ub, uc ) {

			vA = context.vertices[ a ];
			vB = context.vertices[ b ];
			vC = context.vertices[ c ];

			uvA = uv[ ua ];
			uvB = uv[ ub ];
			uvC = uv[ uc ];

			x1 = vB.x - vA.x;
			x2 = vC.x - vA.x;
			y1 = vB.y - vA.y;
			y2 = vC.y - vA.y;
			z1 = vB.z - vA.z;
			z2 = vC.z - vA.z;

			s1 = uvB.u - uvA.u;
			s2 = uvC.u - uvA.u;
			t1 = uvB.v - uvA.v;
			t2 = uvC.v - uvA.v;

			r = 1.0 / ( s1 * t2 - s2 * t1 );
			sdir.set( ( t2 * x1 - t1 * x2 ) * r,
					  ( t2 * y1 - t1 * y2 ) * r,
					  ( t2 * z1 - t1 * z2 ) * r );
			tdir.set( ( s1 * x2 - s2 * x1 ) * r,
					  ( s1 * y2 - s2 * y1 ) * r,
					  ( s1 * z2 - s2 * z1 ) * r );

			tan1[ a ].addSelf( sdir );
			tan1[ b ].addSelf( sdir );
			tan1[ c ].addSelf( sdir );

			tan2[ a ].addSelf( tdir );
			tan2[ b ].addSelf( tdir );
			tan2[ c ].addSelf( tdir );

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];
			uv = this.faceVertexUvs[ 0 ][ f ]; // use UV layer 0 for tangents

			if ( face instanceof THREE.Face3 ) {

				handleTriangle( this, face.a, face.b, face.c, 0, 1, 2 );

			} else if ( face instanceof THREE.Face4 ) {

				handleTriangle( this, face.a, face.b, face.d, 0, 1, 3 );
				handleTriangle( this, face.b, face.c, face.d, 1, 2, 3 );

			}

		}

		var faceIndex = [ 'a', 'b', 'c', 'd' ];

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			for ( i = 0; i < face.vertexNormals.length; i++ ) {

				n.copy( face.vertexNormals[ i ] );

				vertexIndex = face[ faceIndex[ i ] ];

				t = tan1[ vertexIndex ];

				// Gram-Schmidt orthogonalize

				tmp.copy( t );
				tmp.subSelf( n.multiplyScalar( n.dot( t ) ) ).normalize();

				// Calculate handedness

				tmp2.cross( face.vertexNormals[ i ], t );
				test = tmp2.dot( tan2[ vertexIndex ] );
				w = (test < 0.0) ? -1.0 : 1.0;

				face.vertexTangents[ i ] = new THREE.Vector4( tmp.x, tmp.y, tmp.z, w );

			}

		}

		this.hasTangents = true;

	},

	computeLineDistances: function ( ) {

		var d = 0;
		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			if ( i > 0 ) {

				d += vertices[ i ].distanceTo( vertices[ i - 1 ] );

			}

			this.lineDistances[ i ] = d;

		}

	},

	computeBoundingBox: function () {

		if ( ! this.boundingBox ) {

			this.boundingBox = { min: new THREE.Vector3(), max: new THREE.Vector3() };

		}

		if ( this.vertices.length > 0 ) {

			var position, firstPosition = this.vertices[ 0 ];

			this.boundingBox.min.copy( firstPosition );
			this.boundingBox.max.copy( firstPosition );

			var min = this.boundingBox.min,
				max = this.boundingBox.max;

			for ( var v = 1, vl = this.vertices.length; v < vl; v ++ ) {

				position = this.vertices[ v ];

				if ( position.x < min.x ) {

					min.x = position.x;

				} else if ( position.x > max.x ) {

					max.x = position.x;

				}

				if ( position.y < min.y ) {

					min.y = position.y;

				} else if ( position.y > max.y ) {

					max.y = position.y;

				}

				if ( position.z < min.z ) {

					min.z = position.z;

				} else if ( position.z > max.z ) {

					max.z = position.z;

				}

			}

		} else {

			this.boundingBox.min.set( 0, 0, 0 );
			this.boundingBox.max.set( 0, 0, 0 );

		}

	},

	computeBoundingSphere: function () {

		var maxRadiusSq = 0;

		if ( this.boundingSphere === null ) this.boundingSphere = { radius: 0 };

		for ( var i = 0, l = this.vertices.length; i < l; i ++ ) {

			var radiusSq = this.vertices[ i ].lengthSq();
			if ( radiusSq > maxRadiusSq ) maxRadiusSq = radiusSq;

		}

		this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

	},

	/*
	 * Checks for duplicate vertices with hashmap.
	 * Duplicated vertices are removed
	 * and faces' vertices are updated.
	 */

	mergeVertices: function () {

		var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
		var unique = [], changes = [];

		var v, key;
		var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
		var precision = Math.pow( 10, precisionPoints );
		var i,il, face;
		var abcd = 'abcd', o, k, j, jl, u;

		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

			v = this.vertices[ i ];
			key = [ Math.round( v.x * precision ), Math.round( v.y * precision ), Math.round( v.z * precision ) ].join( '_' );

			if ( verticesMap[ key ] === undefined ) {

				verticesMap[ key ] = i;
				unique.push( this.vertices[ i ] );
				changes[ i ] = unique.length - 1;

			} else {

				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
				changes[ i ] = changes[ verticesMap[ key ] ];

			}

		};


		// Start to patch face indices

		for( i = 0, il = this.faces.length; i < il; i ++ ) {

			face = this.faces[ i ];

			if ( face instanceof THREE.Face3 ) {

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];

			} else if ( face instanceof THREE.Face4 ) {

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];
				face.d = changes[ face.d ];

				// check dups in (a, b, c, d) and convert to -> face3

				o = [ face.a, face.b, face.c, face.d ];

				for ( k = 3; k > 0; k -- ) {

					if ( o.indexOf( face[ abcd[ k ] ] ) !== k ) {

						// console.log('faces', face.a, face.b, face.c, face.d, 'dup at', k);

						o.splice( k, 1 );

						this.faces[ i ] = new THREE.Face3( o[0], o[1], o[2], face.normal, face.color, face.materialIndex );

						for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

							u = this.faceVertexUvs[ j ][ i ];
							if ( u ) u.splice( k, 1 );

						}

						this.faces[ i ].vertexColors = face.vertexColors;

						break;
					}

				}

			}

		}

		// Use unique set of vertices

		var diff = this.vertices.length - unique.length;
		this.vertices = unique;
		return diff;

	},

	clone: function () {

		var geometry = new THREE.Geometry();

		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			geometry.vertices.push( vertices[ i ].clone() );

		}

		var faces = this.faces;

		for ( var i = 0, il = faces.length; i < il; i ++ ) {

			geometry.faces.push( faces[ i ].clone() );

		}

		var uvs = this.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvs.length; i < il; i ++ ) {

			var uv = uvs[ i ], uvCopy = [];

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.UV( uv[ j ].u, uv[ j ].v ) );

			}

			geometry.faceVertexUvs[ 0 ].push( uvCopy );

		}

		return geometry;

	},

	deallocate: function () {

		var index = THREE.GeometryLibrary.indexOf( this );
		if ( index !== -1 ) THREE.GeometryLibrary.splice( index, 1 );

	}

};

THREE.GeometryIdCount = 0;
THREE.GeometryLibrary = [];
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.BufferGeometry = function () {

	THREE.GeometryLibrary.push( this );

	this.id = THREE.GeometryIdCount ++;

	// attributes

	this.attributes = {};

	// attributes typed arrays are kept only if dynamic flag is set

	this.dynamic = false;

	// boundings

	this.boundingBox = null;
	this.boundingSphere = null;

	this.hasTangents = false;

	// for compatibility

	this.morphTargets = [];

};

THREE.BufferGeometry.prototype = {

	constructor : THREE.BufferGeometry,

	applyMatrix: function ( matrix ) {

		var positionArray;
		var normalArray;

		if ( this.attributes[ "position" ] ) positionArray = this.attributes[ "position" ].array;
		if ( this.attributes[ "normal" ] ) normalArray = this.attributes[ "normal" ].array;

		if ( positionArray !== undefined ) {

			matrix.multiplyVector3Array( positionArray );
			this.verticesNeedUpdate = true;

		}

		if ( normalArray !== undefined ) {

			var normalMatrix = new THREE.Matrix3();
			normalMatrix.getInverse( matrix ).transpose();

			normalMatrix.multiplyVector3Array( normalArray );

			this.normalizeNormals();

			this.normalsNeedUpdate = true;

		}

	},

	computeBoundingBox: function () {

		if ( ! this.boundingBox ) {

			this.boundingBox = {

				min: new THREE.Vector3( Infinity, Infinity, Infinity ),
				max: new THREE.Vector3( -Infinity, -Infinity, -Infinity )

			};

		}

		var positions = this.attributes[ "position" ].array;

		if ( positions ) {

			var bb = this.boundingBox;
			var x, y, z;

			for ( var i = 0, il = positions.length; i < il; i += 3 ) {

				x = positions[ i ];
				y = positions[ i + 1 ];
				z = positions[ i + 2 ];

				// bounding box

				if ( x < bb.min.x ) {

					bb.min.x = x;

				} else if ( x > bb.max.x ) {

					bb.max.x = x;

				}

				if ( y < bb.min.y ) {

					bb.min.y = y;

				} else if ( y > bb.max.y ) {

					bb.max.y = y;

				}

				if ( z < bb.min.z ) {

					bb.min.z = z;

				} else if ( z > bb.max.z ) {

					bb.max.z = z;

				}

			}

		}

		if ( positions === undefined || positions.length === 0 ) {

			this.boundingBox.min.set( 0, 0, 0 );
			this.boundingBox.max.set( 0, 0, 0 );

		}

	},

	computeBoundingSphere: function () {

		if ( ! this.boundingSphere ) this.boundingSphere = { radius: 0 };

		var positions = this.attributes[ "position" ].array;

		if ( positions ) {

			var radiusSq, maxRadiusSq = 0;
			var x, y, z;

			for ( var i = 0, il = positions.length; i < il; i += 3 ) {

				x = positions[ i ];
				y = positions[ i + 1 ];
				z = positions[ i + 2 ];

				radiusSq =  x * x + y * y + z * z;
				if ( radiusSq > maxRadiusSq ) maxRadiusSq = radiusSq;

			}

			this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

		}

	},

	computeVertexNormals: function () {

		if ( this.attributes[ "position" ] && this.attributes[ "index" ] ) {

			var i, il;
			var j, jl;

			var nVertexElements = this.attributes[ "position" ].array.length;

			if ( this.attributes[ "normal" ] === undefined ) {

				this.attributes[ "normal" ] = {

					itemSize: 3,
					array: new Float32Array( nVertexElements ),
					numItems: nVertexElements

				};

			} else {

				// reset existing normals to zero

				for ( i = 0, il = this.attributes[ "normal" ].array.length; i < il; i ++ ) {

					this.attributes[ "normal" ].array[ i ] = 0;

				}

			}

			var offsets = this.offsets;

			var indices = this.attributes[ "index" ].array;
			var positions = this.attributes[ "position" ].array;
			var normals = this.attributes[ "normal" ].array;

			var vA, vB, vC, x, y, z,

			pA = new THREE.Vector3(),
			pB = new THREE.Vector3(),
			pC = new THREE.Vector3(),

			cb = new THREE.Vector3(),
			ab = new THREE.Vector3();

			for ( j = 0, jl = offsets.length; j < jl; ++ j ) {

				var start = offsets[ j ].start;
				var count = offsets[ j ].count;
				var index = offsets[ j ].index;

				for ( i = start, il = start + count; i < il; i += 3 ) {

					vA = index + indices[ i ];
					vB = index + indices[ i + 1 ];
					vC = index + indices[ i + 2 ];

					x = positions[ vA * 3 ];
					y = positions[ vA * 3 + 1 ];
					z = positions[ vA * 3 + 2 ];
					pA.set( x, y, z );

					x = positions[ vB * 3 ];
					y = positions[ vB * 3 + 1 ];
					z = positions[ vB * 3 + 2 ];
					pB.set( x, y, z );

					x = positions[ vC * 3 ];
					y = positions[ vC * 3 + 1 ];
					z = positions[ vC * 3 + 2 ];
					pC.set( x, y, z );

					cb.sub( pC, pB );
					ab.sub( pA, pB );
					cb.crossSelf( ab );

					normals[ vA * 3 ] 	  += cb.x;
					normals[ vA * 3 + 1 ] += cb.y;
					normals[ vA * 3 + 2 ] += cb.z;

					normals[ vB * 3 ] 	  += cb.x;
					normals[ vB * 3 + 1 ] += cb.y;
					normals[ vB * 3 + 2 ] += cb.z;

					normals[ vC * 3 ] 	  += cb.x;
					normals[ vC * 3 + 1 ] += cb.y;
					normals[ vC * 3 + 2 ] += cb.z;

				}

			}

			this.normalizeNormals();

			this.normalsNeedUpdate = true;

		}

	},

	normalizeNormals: function () {

		var normals = this.attributes[ "normal" ].array;

		var x, y, z, n;

		for ( var i = 0, il = normals.length; i < il; i += 3 ) {

			x = normals[ i ];
			y = normals[ i + 1 ];
			z = normals[ i + 2 ];

			n = 1.0 / Math.sqrt( x * x + y * y + z * z );

			normals[ i ] 	 *= n;
			normals[ i + 1 ] *= n;
			normals[ i + 2 ] *= n;

		}

	},

	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// (per vertex tangents)

		if ( this.attributes[ "index" ] === undefined ||
			 this.attributes[ "position" ] === undefined ||
			 this.attributes[ "normal" ] === undefined ||
			 this.attributes[ "uv" ] === undefined ) {

			console.warn( "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()" );
			return;

		}

		var indices = this.attributes[ "index" ].array;
		var positions = this.attributes[ "position" ].array;
		var normals = this.attributes[ "normal" ].array;
		var uvs = this.attributes[ "uv" ].array;

		var nVertices = positions.length / 3;

		if ( this.attributes[ "tangent" ] === undefined ) {

			var nTangentElements = 4 * nVertices;

			this.attributes[ "tangent" ] = {

				itemSize: 4,
				array: new Float32Array( nTangentElements ),
				numItems: nTangentElements

			};

		}

		var tangents = this.attributes[ "tangent" ].array;

		var tan1 = [], tan2 = [];

		for ( var k = 0; k < nVertices; k ++ ) {

			tan1[ k ] = new THREE.Vector3();
			tan2[ k ] = new THREE.Vector3();

		}

		var xA, yA, zA,
			xB, yB, zB,
			xC, yC, zC,

			uA, vA,
			uB, vB,
			uC, vC,

			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r;

		var sdir = new THREE.Vector3(), tdir = new THREE.Vector3();

		function handleTriangle( a, b, c ) {

			xA = positions[ a * 3 ];
			yA = positions[ a * 3 + 1 ];
			zA = positions[ a * 3 + 2 ];

			xB = positions[ b * 3 ];
			yB = positions[ b * 3 + 1 ];
			zB = positions[ b * 3 + 2 ];

			xC = positions[ c * 3 ];
			yC = positions[ c * 3 + 1 ];
			zC = positions[ c * 3 + 2 ];

			uA = uvs[ a * 2 ];
			vA = uvs[ a * 2 + 1 ];

			uB = uvs[ b * 2 ];
			vB = uvs[ b * 2 + 1 ];

			uC = uvs[ c * 2 ];
			vC = uvs[ c * 2 + 1 ];

			x1 = xB - xA;
			x2 = xC - xA;

			y1 = yB - yA;
			y2 = yC - yA;

			z1 = zB - zA;
			z2 = zC - zA;

			s1 = uB - uA;
			s2 = uC - uA;

			t1 = vB - vA;
			t2 = vC - vA;

			r = 1.0 / ( s1 * t2 - s2 * t1 );

			sdir.set(
				( t2 * x1 - t1 * x2 ) * r,
				( t2 * y1 - t1 * y2 ) * r,
				( t2 * z1 - t1 * z2 ) * r
			);

			tdir.set(
				( s1 * x2 - s2 * x1 ) * r,
				( s1 * y2 - s2 * y1 ) * r,
				( s1 * z2 - s2 * z1 ) * r
			);

			tan1[ a ].addSelf( sdir );
			tan1[ b ].addSelf( sdir );
			tan1[ c ].addSelf( sdir );

			tan2[ a ].addSelf( tdir );
			tan2[ b ].addSelf( tdir );
			tan2[ c ].addSelf( tdir );

		}

		var i, il;
		var j, jl;
		var iA, iB, iC;

		var offsets = this.offsets;

		for ( j = 0, jl = offsets.length; j < jl; ++ j ) {

			var start = offsets[ j ].start;
			var count = offsets[ j ].count;
			var index = offsets[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleTriangle( iA, iB, iC );

			}

		}

		var tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
		var n = new THREE.Vector3(), n2 = new THREE.Vector3();
		var w, t, test;
		var nx, ny, nz;

		function handleVertex( v ) {

			n.x = normals[ v * 3 ];
			n.y = normals[ v * 3 + 1 ];
			n.z = normals[ v * 3 + 2 ];

			n2.copy( n );

			t = tan1[ v ];

			// Gram-Schmidt orthogonalize

			tmp.copy( t );
			tmp.subSelf( n.multiplyScalar( n.dot( t ) ) ).normalize();

			// Calculate handedness

			tmp2.cross( n2, t );
			test = tmp2.dot( tan2[ v ] );
			w = ( test < 0.0 ) ? -1.0 : 1.0;

			tangents[ v * 4 ] 	  = tmp.x;
			tangents[ v * 4 + 1 ] = tmp.y;
			tangents[ v * 4 + 2 ] = tmp.z;
			tangents[ v * 4 + 3 ] = w;

		}

		for ( j = 0, jl = offsets.length; j < jl; ++ j ) {

			var start = offsets[ j ].start;
			var count = offsets[ j ].count;
			var index = offsets[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleVertex( iA );
				handleVertex( iB );
				handleVertex( iC );

			}

		}

		this.hasTangents = true;
		this.tangentsNeedUpdate = true;

	},

	deallocate: function () {

		var index = THREE.GeometryLibrary.indexOf( this );
		if ( index !== -1 ) THREE.GeometryLibrary.splice( index, 1 );

	}

};

/**
 * Spline from Tween.js, slightly optimized (and trashed)
 * http://sole.github.com/tween.js/examples/05_spline.html
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Spline = function ( points ) {

	this.points = points;

	var c = [], v3 = { x: 0, y: 0, z: 0 },
	point, intPoint, weight, w2, w3,
	pa, pb, pc, pd;

	this.initFromArray = function( a ) {

		this.points = [];

		for ( var i = 0; i < a.length; i++ ) {

			this.points[ i ] = { x: a[ i ][ 0 ], y: a[ i ][ 1 ], z: a[ i ][ 2 ] };

		}

	};

	this.getPoint = function ( k ) {

		point = ( this.points.length - 1 ) * k;
		intPoint = Math.floor( point );
		weight = point - intPoint;

		c[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;
		c[ 1 ] = intPoint;
		c[ 2 ] = intPoint  > this.points.length - 2 ? this.points.length - 1 : intPoint + 1;
		c[ 3 ] = intPoint  > this.points.length - 3 ? this.points.length - 1 : intPoint + 2;

		pa = this.points[ c[ 0 ] ];
		pb = this.points[ c[ 1 ] ];
		pc = this.points[ c[ 2 ] ];
		pd = this.points[ c[ 3 ] ];

		w2 = weight * weight;
		w3 = weight * w2;

		v3.x = interpolate( pa.x, pb.x, pc.x, pd.x, weight, w2, w3 );
		v3.y = interpolate( pa.y, pb.y, pc.y, pd.y, weight, w2, w3 );
		v3.z = interpolate( pa.z, pb.z, pc.z, pd.z, weight, w2, w3 );

		return v3;

	};

	this.getControlPointsArray = function () {

		var i, p, l = this.points.length,
			coords = [];

		for ( i = 0; i < l; i ++ ) {

			p = this.points[ i ];
			coords[ i ] = [ p.x, p.y, p.z ];

		}

		return coords;

	};

	// approximate length by summing linear segments

	this.getLength = function ( nSubDivisions ) {

		var i, index, nSamples, position,
			point = 0, intPoint = 0, oldIntPoint = 0,
			oldPosition = new THREE.Vector3(),
			tmpVec = new THREE.Vector3(),
			chunkLengths = [],
			totalLength = 0;

		// first point has 0 length

		chunkLengths[ 0 ] = 0;

		if ( !nSubDivisions ) nSubDivisions = 100;

		nSamples = this.points.length * nSubDivisions;

		oldPosition.copy( this.points[ 0 ] );

		for ( i = 1; i < nSamples; i ++ ) {

			index = i / nSamples;

			position = this.getPoint( index );
			tmpVec.copy( position );

			totalLength += tmpVec.distanceTo( oldPosition );

			oldPosition.copy( position );

			point = ( this.points.length - 1 ) * index;
			intPoint = Math.floor( point );

			if ( intPoint != oldIntPoint ) {

				chunkLengths[ intPoint ] = totalLength;
				oldIntPoint = intPoint;

			}

		}

		// last point ends with total length

		chunkLengths[ chunkLengths.length ] = totalLength;

		return { chunks: chunkLengths, total: totalLength };

	};

	this.reparametrizeByArcLength = function ( samplingCoef ) {

		var i, j,
			index, indexCurrent, indexNext,
			linearDistance, realDistance,
			sampling, position,
			newpoints = [],
			tmpVec = new THREE.Vector3(),
			sl = this.getLength();

		newpoints.push( tmpVec.copy( this.points[ 0 ] ).clone() );

		for ( i = 1; i < this.points.length; i++ ) {

			//tmpVec.copy( this.points[ i - 1 ] );
			//linearDistance = tmpVec.distanceTo( this.points[ i ] );

			realDistance = sl.chunks[ i ] - sl.chunks[ i - 1 ];

			sampling = Math.ceil( samplingCoef * realDistance / sl.total );

			indexCurrent = ( i - 1 ) / ( this.points.length - 1 );
			indexNext = i / ( this.points.length - 1 );

			for ( j = 1; j < sampling - 1; j++ ) {

				index = indexCurrent + j * ( 1 / sampling ) * ( indexNext - indexCurrent );

				position = this.getPoint( index );
				newpoints.push( tmpVec.copy( position ).clone() );

			}

			newpoints.push( tmpVec.copy( this.points[ i ] ).clone() );

		}

		this.points = newpoints;

	};

	// Catmull-Rom

	function interpolate( p0, p1, p2, p3, t, t2, t3 ) {

		var v0 = ( p2 - p0 ) * 0.5,
			v1 = ( p3 - p1 ) * 0.5;

		return ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	};

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Camera = function () {

	THREE.Object3D.call( this );

	this.matrixWorldInverse = new THREE.Matrix4();

	this.projectionMatrix = new THREE.Matrix4();
	this.projectionMatrixInverse = new THREE.Matrix4();

};

THREE.Camera.prototype = Object.create( THREE.Object3D.prototype );

THREE.Camera.prototype.lookAt = function ( vector ) {

	// TODO: Add hierarchy support.

	this.matrix.lookAt( this.position, vector, this.up );

	if ( this.rotationAutoUpdate === true ) {

		if ( this.useQuaternion === false )  {

			this.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );

		} else {

			this.quaternion.copy( this.matrix.decompose()[ 1 ] );

		}

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {

	THREE.Camera.call( this );

	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;

	this.near = ( near !== undefined ) ? near : 0.1;
	this.far = ( far !== undefined ) ? far : 2000;

	this.updateProjectionMatrix();

};

THREE.OrthographicCamera.prototype = Object.create( THREE.Camera.prototype );

THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {

	this.projectionMatrix.makeOrthographic( this.left, this.right, this.top, this.bottom, this.near, this.far );

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author greggman / http://games.greggman.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.PerspectiveCamera = function ( fov, aspect, near, far ) {

	THREE.Camera.call( this );

	this.fov = fov !== undefined ? fov : 50;
	this.aspect = aspect !== undefined ? aspect : 1;
	this.near = near !== undefined ? near : 0.1;
	this.far = far !== undefined ? far : 2000;

	this.updateProjectionMatrix();

};

THREE.PerspectiveCamera.prototype = Object.create( THREE.Camera.prototype );


/**
 * Uses Focal Length (in mm) to estimate and set FOV
 * 35mm (fullframe) camera is used if frame size is not specified;
 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
 */

THREE.PerspectiveCamera.prototype.setLens = function ( focalLength, frameHeight ) {

	if ( frameHeight === undefined ) frameHeight = 24;

	this.fov = 2 * Math.atan( frameHeight / ( focalLength * 2 ) ) * ( 180 / Math.PI );
	this.updateProjectionMatrix();

}


/**
 * Sets an offset in a larger frustum. This is useful for multi-window or
 * multi-monitor/multi-machine setups.
 *
 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
 * the monitors are in grid like this
 *
 *   +---+---+---+
 *   | A | B | C |
 *   +---+---+---+
 *   | D | E | F |
 *   +---+---+---+
 *
 * then for each monitor you would call it like this
 *
 *   var w = 1920;
 *   var h = 1080;
 *   var fullWidth = w * 3;
 *   var fullHeight = h * 2;
 *
 *   --A--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
 *   --B--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
 *   --C--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
 *   --D--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
 *   --E--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
 *   --F--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
 *
 *   Note there is no reason monitors have to be the same size or in a grid.
 */

THREE.PerspectiveCamera.prototype.setViewOffset = function ( fullWidth, fullHeight, x, y, width, height ) {

	this.fullWidth = fullWidth;
	this.fullHeight = fullHeight;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.updateProjectionMatrix();

};


THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {

	if ( this.fullWidth ) {

		var aspect = this.fullWidth / this.fullHeight;
		var top = Math.tan( this.fov * Math.PI / 360 ) * this.near;
		var bottom = -top;
		var left = aspect * bottom;
		var right = aspect * top;
		var width = Math.abs( right - left );
		var height = Math.abs( top - bottom );

		this.projectionMatrix.makeFrustum(
			left + this.x * width / this.fullWidth,
			left + ( this.x + this.width ) * width / this.fullWidth,
			top - ( this.y + this.height ) * height / this.fullHeight,
			top - this.y * height / this.fullHeight,
			this.near,
			this.far
		);

	} else {

		this.projectionMatrix.makePerspective( this.fov, this.aspect, this.near, this.far );

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Light = function ( hex ) {

	THREE.Object3D.call( this );

	this.color = new THREE.Color( hex );

};

THREE.Light.prototype = Object.create( THREE.Object3D.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.AmbientLight = function ( hex ) {

	THREE.Light.call( this, hex );

};

THREE.AmbientLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.DirectionalLight = function ( hex, intensity ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 1, 0 );
	this.target = new THREE.Object3D();

	this.intensity = ( intensity !== undefined ) ? intensity : 1;

	this.castShadow = false;
	this.onlyShadow = false;

	//

	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;

	this.shadowCameraLeft = -500;
	this.shadowCameraRight = 500;
	this.shadowCameraTop = 500;
	this.shadowCameraBottom = -500;

	this.shadowCameraVisible = false;

	this.shadowBias = 0;
	this.shadowDarkness = 0.5;

	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;

	//

	this.shadowCascade = false;

	this.shadowCascadeOffset = new THREE.Vector3( 0, 0, -1000 );
	this.shadowCascadeCount = 2;

	this.shadowCascadeBias = [ 0, 0, 0 ];
	this.shadowCascadeWidth = [ 512, 512, 512 ];
	this.shadowCascadeHeight = [ 512, 512, 512 ];

	this.shadowCascadeNearZ = [ -1.000, 0.990, 0.998 ];
	this.shadowCascadeFarZ  = [  0.990, 0.998, 1.000 ];

	this.shadowCascadeArray = [];

	//

	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null;

};

THREE.DirectionalLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.HemisphereLight = function ( skyColorHex, groundColorHex, intensity ) {

	THREE.Light.call( this, skyColorHex );

	this.groundColor = new THREE.Color( groundColorHex );

	this.position = new THREE.Vector3( 0, 100, 0 );

	this.intensity = ( intensity !== undefined ) ? intensity : 1;

};

THREE.HemisphereLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointLight = function ( hex, intensity, distance ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 0, 0 );
	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.distance = ( distance !== undefined ) ? distance : 0;

};

THREE.PointLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SpotLight = function ( hex, intensity, distance, angle, exponent ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 1, 0 );
	this.target = new THREE.Object3D();

	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.distance = ( distance !== undefined ) ? distance : 0;
	this.angle = ( angle !== undefined ) ? angle : Math.PI / 2;
	this.exponent = ( exponent !== undefined ) ? exponent : 10;

	this.castShadow = false;
	this.onlyShadow = false;

	//

	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;
	this.shadowCameraFov = 50;

	this.shadowCameraVisible = false;

	this.shadowBias = 0;
	this.shadowDarkness = 0.5;

	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;

	//

	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null;

};

THREE.SpotLight.prototype = Object.create( THREE.Light.prototype );
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Loader = function ( showStatus ) {

	this.showStatus = showStatus;
	this.statusDomElement = showStatus ? THREE.Loader.prototype.addStatusElement() : null;

	this.onLoadStart = function () {};
	this.onLoadProgress = function () {};
	this.onLoadComplete = function () {};

};

THREE.Loader.prototype = {

	constructor: THREE.Loader,

	crossOrigin: 'anonymous',

	addStatusElement: function () {

		var e = document.createElement( "div" );

		e.style.position = "absolute";
		e.style.right = "0px";
		e.style.top = "0px";
		e.style.fontSize = "0.8em";
		e.style.textAlign = "left";
		e.style.background = "rgba(0,0,0,0.25)";
		e.style.color = "#fff";
		e.style.width = "120px";
		e.style.padding = "0.5em 0.5em 0.5em 0.5em";
		e.style.zIndex = 1000;

		e.innerHTML = "Loading ...";

		return e;

	},

	updateProgress: function ( progress ) {

		var message = "Loaded ";

		if ( progress.total ) {

			message += ( 100 * progress.loaded / progress.total ).toFixed(0) + "%";


		} else {

			message += ( progress.loaded / 1000 ).toFixed(2) + " KB";

		}

		this.statusDomElement.innerHTML = message;

	},

	extractUrlBase: function ( url ) {

		var parts = url.split( '/' );
		parts.pop();
		return ( parts.length < 1 ? '.' : parts.join( '/' ) ) + '/';

	},

	initMaterials: function ( materials, texturePath ) {

		var array = [];

		for ( var i = 0; i < materials.length; ++ i ) {

			array[ i ] = THREE.Loader.prototype.createMaterial( materials[ i ], texturePath );

		}

		return array;

	},

	needsTangents: function ( materials ) {

		for( var i = 0, il = materials.length; i < il; i ++ ) {

			var m = materials[ i ];

			if ( m instanceof THREE.ShaderMaterial ) return true;

		}

		return false;

	},

	createMaterial: function ( m, texturePath ) {

		var _this = this;

		function is_pow2( n ) {

			var l = Math.log( n ) / Math.LN2;
			return Math.floor( l ) == l;

		}

		function nearest_pow2( n ) {

			var l = Math.log( n ) / Math.LN2;
			return Math.pow( 2, Math.round(  l ) );

		}

		function load_image( where, url ) {

			var image = new Image();

			image.onload = function () {

				if ( !is_pow2( this.width ) || !is_pow2( this.height ) ) {

					var width = nearest_pow2( this.width );
					var height = nearest_pow2( this.height );

					where.image.width = width;
					where.image.height = height;
					where.image.getContext( '2d' ).drawImage( this, 0, 0, width, height );

				} else {

					where.image = this;

				}

				where.needsUpdate = true;

			};

			image.crossOrigin = _this.crossOrigin;
			image.src = url;

		}

		function create_texture( where, name, sourceFile, repeat, offset, wrap, anisotropy ) {

			var isCompressed = sourceFile.toLowerCase().endsWith( ".dds" );
			var fullPath = texturePath + "/" + sourceFile;

			if ( isCompressed ) {

				var texture = THREE.ImageUtils.loadCompressedTexture( fullPath );

				where[ name ] = texture;

			} else {

				var texture = document.createElement( 'canvas' );

				where[ name ] = new THREE.Texture( texture );

			}

			where[ name ].sourceFile = sourceFile;

			if( repeat ) {

				where[ name ].repeat.set( repeat[ 0 ], repeat[ 1 ] );

				if ( repeat[ 0 ] !== 1 ) where[ name ].wrapS = THREE.RepeatWrapping;
				if ( repeat[ 1 ] !== 1 ) where[ name ].wrapT = THREE.RepeatWrapping;

			}

			if ( offset ) {

				where[ name ].offset.set( offset[ 0 ], offset[ 1 ] );

			}

			if ( wrap ) {

				var wrapMap = {
					"repeat": THREE.RepeatWrapping,
					"mirror": THREE.MirroredRepeatWrapping
				}

				if ( wrapMap[ wrap[ 0 ] ] !== undefined ) where[ name ].wrapS = wrapMap[ wrap[ 0 ] ];
				if ( wrapMap[ wrap[ 1 ] ] !== undefined ) where[ name ].wrapT = wrapMap[ wrap[ 1 ] ];

			}

			if ( anisotropy ) {

				where[ name ].anisotropy = anisotropy;

			}

			if ( ! isCompressed ) {

				load_image( where[ name ], fullPath );

			}

		}

		function rgb2hex( rgb ) {

			return ( rgb[ 0 ] * 255 << 16 ) + ( rgb[ 1 ] * 255 << 8 ) + rgb[ 2 ] * 255;

		}

		// defaults

		var mtype = "MeshLambertMaterial";
		var mpars = { color: 0xeeeeee, opacity: 1.0, map: null, lightMap: null, normalMap: null, bumpMap: null, wireframe: false };

		// parameters from model file

		if ( m.shading ) {

			var shading = m.shading.toLowerCase();

			if ( shading === "phong" ) mtype = "MeshPhongMaterial";
			else if ( shading === "basic" ) mtype = "MeshBasicMaterial";

		}

		if ( m.blending !== undefined && THREE[ m.blending ] !== undefined ) {

			mpars.blending = THREE[ m.blending ];

		}

		if ( m.transparent !== undefined || m.opacity < 1.0 ) {

			mpars.transparent = m.transparent;

		}

		if ( m.depthTest !== undefined ) {

			mpars.depthTest = m.depthTest;

		}

		if ( m.depthWrite !== undefined ) {

			mpars.depthWrite = m.depthWrite;

		}

		if ( m.visible !== undefined ) {

			mpars.visible = m.visible;

		}

		if ( m.flipSided !== undefined ) {

			mpars.side = THREE.BackSide;

		}

		if ( m.doubleSided !== undefined ) {

			mpars.side = THREE.DoubleSide;

		}

		if ( m.wireframe !== undefined ) {

			mpars.wireframe = m.wireframe;

		}

		if ( m.vertexColors !== undefined ) {

			if ( m.vertexColors === "face" ) {

				mpars.vertexColors = THREE.FaceColors;

			} else if ( m.vertexColors ) {

				mpars.vertexColors = THREE.VertexColors;

			}

		}

		// colors

		if ( m.colorDiffuse ) {

			mpars.color = rgb2hex( m.colorDiffuse );

		} else if ( m.DbgColor ) {

			mpars.color = m.DbgColor;

		}

		if ( m.colorSpecular ) {

			mpars.specular = rgb2hex( m.colorSpecular );

		}

		if ( m.colorAmbient ) {

			mpars.ambient = rgb2hex( m.colorAmbient );

		}

		// modifiers

		if ( m.transparency ) {

			mpars.opacity = m.transparency;

		}

		if ( m.specularCoef ) {

			mpars.shininess = m.specularCoef;

		}

		// textures

		if ( m.mapDiffuse && texturePath ) {

			create_texture( mpars, "map", m.mapDiffuse, m.mapDiffuseRepeat, m.mapDiffuseOffset, m.mapDiffuseWrap, m.mapDiffuseAnisotropy );

		}

		if ( m.mapLight && texturePath ) {

			create_texture( mpars, "lightMap", m.mapLight, m.mapLightRepeat, m.mapLightOffset, m.mapLightWrap, m.mapLightAnisotropy );

		}

		if ( m.mapBump && texturePath ) {

			create_texture( mpars, "bumpMap", m.mapBump, m.mapBumpRepeat, m.mapBumpOffset, m.mapBumpWrap, m.mapBumpAnisotropy );

		}

		if ( m.mapNormal && texturePath ) {

			create_texture( mpars, "normalMap", m.mapNormal, m.mapNormalRepeat, m.mapNormalOffset, m.mapNormalWrap, m.mapNormalAnisotropy );

		}

		if ( m.mapSpecular && texturePath ) {

			create_texture( mpars, "specularMap", m.mapSpecular, m.mapSpecularRepeat, m.mapSpecularOffset, m.mapSpecularWrap, m.mapSpecularAnisotropy );

		}

		//

		if ( m.mapBumpScale ) {

			mpars.bumpScale = m.mapBumpScale;

		}

		// special case for normal mapped material

		if ( m.mapNormal ) {

			var shader = THREE.ShaderUtils.lib[ "normal" ];
			var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

			uniforms[ "tNormal" ].value = mpars.normalMap;

			if ( m.mapNormalFactor ) {

				uniforms[ "uNormalScale" ].value.set( m.mapNormalFactor, m.mapNormalFactor );

			}

			if ( mpars.map ) {

				uniforms[ "tDiffuse" ].value = mpars.map;
				uniforms[ "enableDiffuse" ].value = true;

			}

			if ( mpars.specularMap ) {

				uniforms[ "tSpecular" ].value = mpars.specularMap;
				uniforms[ "enableSpecular" ].value = true;

			}

			if ( mpars.lightMap ) {

				uniforms[ "tAO" ].value = mpars.lightMap;
				uniforms[ "enableAO" ].value = true;

			}

			// for the moment don't handle displacement texture

			uniforms[ "uDiffuseColor" ].value.setHex( mpars.color );
			uniforms[ "uSpecularColor" ].value.setHex( mpars.specular );
			uniforms[ "uAmbientColor" ].value.setHex( mpars.ambient );

			uniforms[ "uShininess" ].value = mpars.shininess;

			if ( mpars.opacity !== undefined ) {

				uniforms[ "uOpacity" ].value = mpars.opacity;

			}

			var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: true };
			var material = new THREE.ShaderMaterial( parameters );

		} else {

			var material = new THREE[ mtype ]( mpars );

		}

		if ( m.DbgName !== undefined ) material.name = m.DbgName;

		return material;

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.BinaryLoader = function ( showStatus ) {

	THREE.Loader.call( this, showStatus );

};

THREE.BinaryLoader.prototype = Object.create( THREE.Loader.prototype );

// Load models generated by slim OBJ converter with BINARY option (converter_obj_three_slim.py -t binary)
//  - binary models consist of two files: JS and BIN
//  - parameters
//		- url (required)
//		- callback (required)
//		- texturePath (optional: if not specified, textures will be assumed to be in the same folder as JS model file)
//		- binaryPath (optional: if not specified, binary file will be assumed to be in the same folder as JS model file)

THREE.BinaryLoader.prototype.load = function( url, callback, texturePath, binaryPath ) {

	// todo: unify load API to for easier SceneLoader use

	texturePath = texturePath && ( typeof texturePath === "string" ) ? texturePath : this.extractUrlBase( url );
	binaryPath = binaryPath && ( typeof binaryPath === "string" ) ? binaryPath : this.extractUrlBase( url );

	var callbackProgress = this.showProgress ? THREE.Loader.prototype.updateProgress : null;

	this.onLoadStart();

	// #1 load JS part via web worker

	this.loadAjaxJSON( this, url, callback, texturePath, binaryPath, callbackProgress );

};

THREE.BinaryLoader.prototype.loadAjaxJSON = function ( context, url, callback, texturePath, binaryPath, callbackProgress ) {

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {

		if ( xhr.readyState == 4 ) {

			if ( xhr.status == 200 || xhr.status == 0 ) {

				var json = JSON.parse( xhr.responseText );
				context.loadAjaxBuffers( json, callback, binaryPath, texturePath, callbackProgress );

			} else {

				console.error( "THREE.BinaryLoader: Couldn't load [" + url + "] [" + xhr.status + "]" );

			}

		}

	};

	xhr.open( "GET", url, true );
	xhr.send( null );

};

THREE.BinaryLoader.prototype.loadAjaxBuffers = function ( json, callback, binaryPath, texturePath, callbackProgress ) {

	var xhr = new XMLHttpRequest(),
		url = binaryPath + "/" + json.buffers;

	var length = 0;

	xhr.onreadystatechange = function () {

		if ( xhr.readyState == 4 ) {

			if ( xhr.status == 200 || xhr.status == 0 ) {

				var buffer = xhr.response;
				if ( buffer === undefined ) buffer = ( new Uint8Array( xhr.responseBody ) ).buffer; // IEWEBGL needs this
				THREE.BinaryLoader.prototype.createBinModel( buffer, callback, texturePath, json.materials );

			} else {

				console.error( "THREE.BinaryLoader: Couldn't load [" + url + "] [" + xhr.status + "]" );

			}

		} else if ( xhr.readyState == 3 ) {

			if ( callbackProgress ) {

				if ( length == 0 ) {

					length = xhr.getResponseHeader( "Content-Length" );

				}

				callbackProgress( { total: length, loaded: xhr.responseText.length } );

			}

		} else if ( xhr.readyState == 2 ) {

			length = xhr.getResponseHeader( "Content-Length" );

		}

	};

	xhr.open( "GET", url, true );
	xhr.responseType = "arraybuffer";
	xhr.send( null );

};

// Binary AJAX parser

THREE.BinaryLoader.prototype.createBinModel = function ( data, callback, texturePath, jsonMaterials ) {

	var Model = function ( texturePath ) {

		var scope = this,
			currentOffset = 0,
			md,
			normals = [],
			uvs = [],
			start_tri_flat, start_tri_smooth, start_tri_flat_uv, start_tri_smooth_uv,
			start_quad_flat, start_quad_smooth, start_quad_flat_uv, start_quad_smooth_uv,
			tri_size, quad_size,
			len_tri_flat, len_tri_smooth, len_tri_flat_uv, len_tri_smooth_uv,
			len_quad_flat, len_quad_smooth, len_quad_flat_uv, len_quad_smooth_uv;


		THREE.Geometry.call( this );

		md = parseMetaData( data, currentOffset );

		currentOffset += md.header_bytes;
/*
		md.vertex_index_bytes = Uint32Array.BYTES_PER_ELEMENT;
		md.material_index_bytes = Uint16Array.BYTES_PER_ELEMENT;
		md.normal_index_bytes = Uint32Array.BYTES_PER_ELEMENT;
		md.uv_index_bytes = Uint32Array.BYTES_PER_ELEMENT;
*/
		// buffers sizes

		tri_size =  md.vertex_index_bytes * 3 + md.material_index_bytes;
		quad_size = md.vertex_index_bytes * 4 + md.material_index_bytes;

		len_tri_flat      = md.ntri_flat      * ( tri_size );
		len_tri_smooth    = md.ntri_smooth    * ( tri_size + md.normal_index_bytes * 3 );
		len_tri_flat_uv   = md.ntri_flat_uv   * ( tri_size + md.uv_index_bytes * 3 );
		len_tri_smooth_uv = md.ntri_smooth_uv * ( tri_size + md.normal_index_bytes * 3 + md.uv_index_bytes * 3 );

		len_quad_flat      = md.nquad_flat      * ( quad_size );
		len_quad_smooth    = md.nquad_smooth    * ( quad_size + md.normal_index_bytes * 4 );
		len_quad_flat_uv   = md.nquad_flat_uv   * ( quad_size + md.uv_index_bytes * 4 );
		len_quad_smooth_uv = md.nquad_smooth_uv * ( quad_size + md.normal_index_bytes * 4 + md.uv_index_bytes * 4 );

		// read buffers

		currentOffset += init_vertices( currentOffset );

		currentOffset += init_normals( currentOffset );
		currentOffset += handlePadding( md.nnormals * 3 );

		currentOffset += init_uvs( currentOffset );

		start_tri_flat 		= currentOffset;
		start_tri_smooth    = start_tri_flat    + len_tri_flat    + handlePadding( md.ntri_flat * 2 );
		start_tri_flat_uv   = start_tri_smooth  + len_tri_smooth  + handlePadding( md.ntri_smooth * 2 );
		start_tri_smooth_uv = start_tri_flat_uv + len_tri_flat_uv + handlePadding( md.ntri_flat_uv * 2 );

		start_quad_flat     = start_tri_smooth_uv + len_tri_smooth_uv  + handlePadding( md.ntri_smooth_uv * 2 );
		start_quad_smooth   = start_quad_flat     + len_quad_flat	   + handlePadding( md.nquad_flat * 2 );
		start_quad_flat_uv  = start_quad_smooth   + len_quad_smooth    + handlePadding( md.nquad_smooth * 2 );
		start_quad_smooth_uv= start_quad_flat_uv  + len_quad_flat_uv   + handlePadding( md.nquad_flat_uv * 2 );

		// have to first process faces with uvs
		// so that face and uv indices match

		init_triangles_flat_uv( start_tri_flat_uv );
		init_triangles_smooth_uv( start_tri_smooth_uv );

		init_quads_flat_uv( start_quad_flat_uv );
		init_quads_smooth_uv( start_quad_smooth_uv );

		// now we can process untextured faces

		init_triangles_flat( start_tri_flat );
		init_triangles_smooth( start_tri_smooth );

		init_quads_flat( start_quad_flat );
		init_quads_smooth( start_quad_smooth );

		this.computeCentroids();
		this.computeFaceNormals();

		function handlePadding( n ) {

			return ( n % 4 ) ? ( 4 - n % 4 ) : 0;

		};

		function parseMetaData( data, offset ) {

			var metaData = {

				'signature'               :parseString( data, offset,  12 ),
				'header_bytes'            :parseUChar8( data, offset + 12 ),

				'vertex_coordinate_bytes' :parseUChar8( data, offset + 13 ),
				'normal_coordinate_bytes' :parseUChar8( data, offset + 14 ),
				'uv_coordinate_bytes'     :parseUChar8( data, offset + 15 ),

				'vertex_index_bytes'      :parseUChar8( data, offset + 16 ),
				'normal_index_bytes'      :parseUChar8( data, offset + 17 ),
				'uv_index_bytes'          :parseUChar8( data, offset + 18 ),
				'material_index_bytes'    :parseUChar8( data, offset + 19 ),

				'nvertices'    :parseUInt32( data, offset + 20 ),
				'nnormals'     :parseUInt32( data, offset + 20 + 4*1 ),
				'nuvs'         :parseUInt32( data, offset + 20 + 4*2 ),

				'ntri_flat'      :parseUInt32( data, offset + 20 + 4*3 ),
				'ntri_smooth'    :parseUInt32( data, offset + 20 + 4*4 ),
				'ntri_flat_uv'   :parseUInt32( data, offset + 20 + 4*5 ),
				'ntri_smooth_uv' :parseUInt32( data, offset + 20 + 4*6 ),

				'nquad_flat'      :parseUInt32( data, offset + 20 + 4*7 ),
				'nquad_smooth'    :parseUInt32( data, offset + 20 + 4*8 ),
				'nquad_flat_uv'   :parseUInt32( data, offset + 20 + 4*9 ),
				'nquad_smooth_uv' :parseUInt32( data, offset + 20 + 4*10 )

			};
/*
			console.log( "signature: " + metaData.signature );

			console.log( "header_bytes: " + metaData.header_bytes );
			console.log( "vertex_coordinate_bytes: " + metaData.vertex_coordinate_bytes );
			console.log( "normal_coordinate_bytes: " + metaData.normal_coordinate_bytes );
			console.log( "uv_coordinate_bytes: " + metaData.uv_coordinate_bytes );

			console.log( "vertex_index_bytes: " + metaData.vertex_index_bytes );
			console.log( "normal_index_bytes: " + metaData.normal_index_bytes );
			console.log( "uv_index_bytes: " + metaData.uv_index_bytes );
			console.log( "material_index_bytes: " + metaData.material_index_bytes );

			console.log( "nvertices: " + metaData.nvertices );
			console.log( "nnormals: " + metaData.nnormals );
			console.log( "nuvs: " + metaData.nuvs );

			console.log( "ntri_flat: " + metaData.ntri_flat );
			console.log( "ntri_smooth: " + metaData.ntri_smooth );
			console.log( "ntri_flat_uv: " + metaData.ntri_flat_uv );
			console.log( "ntri_smooth_uv: " + metaData.ntri_smooth_uv );

			console.log( "nquad_flat: " + metaData.nquad_flat );
			console.log( "nquad_smooth: " + metaData.nquad_smooth );
			console.log( "nquad_flat_uv: " + metaData.nquad_flat_uv );
			console.log( "nquad_smooth_uv: " + metaData.nquad_smooth_uv );

			var total = metaData.header_bytes
					  + metaData.nvertices * metaData.vertex_coordinate_bytes * 3
					  + metaData.nnormals * metaData.normal_coordinate_bytes * 3
					  + metaData.nuvs * metaData.uv_coordinate_bytes * 2
					  + metaData.ntri_flat * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes )
					  + metaData.ntri_smooth * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes + metaData.normal_index_bytes*3 )
					  + metaData.ntri_flat_uv * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes + metaData.uv_index_bytes*3 )
					  + metaData.ntri_smooth_uv * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes + metaData.normal_index_bytes*3 + metaData.uv_index_bytes*3 )
					  + metaData.nquad_flat * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes )
					  + metaData.nquad_smooth * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes + metaData.normal_index_bytes*4 )
					  + metaData.nquad_flat_uv * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes + metaData.uv_index_bytes*4 )
					  + metaData.nquad_smooth_uv * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes + metaData.normal_index_bytes*4 + metaData.uv_index_bytes*4 );
			console.log( "total bytes: " + total );
*/

			return metaData;

		};

		function parseString( data, offset, length ) {

			var charArray = new Uint8Array( data, offset, length );

			var text = "";

			for ( var i = 0; i < length; i ++ ) {

				text += String.fromCharCode( charArray[ offset + i ] );

			}

			return text;

		};

		function parseUChar8( data, offset ) {

			var charArray = new Uint8Array( data, offset, 1 );

			return charArray[ 0 ];

		};

		function parseUInt32( data, offset ) {

			var intArray = new Uint32Array( data, offset, 1 );

			return intArray[ 0 ];

		};

		function init_vertices( start ) {

			var nElements = md.nvertices;

			var coordArray = new Float32Array( data, start, nElements * 3 );

			var i, x, y, z;

			for( i = 0; i < nElements; i ++ ) {

				x = coordArray[ i * 3 ];
				y = coordArray[ i * 3 + 1 ];
				z = coordArray[ i * 3 + 2 ];

				vertex( scope, x, y, z );

			}

			return nElements * 3 * Float32Array.BYTES_PER_ELEMENT;

		};

		function init_normals( start ) {

			var nElements = md.nnormals;

			if ( nElements ) {

				var normalArray = new Int8Array( data, start, nElements * 3 );

				var i, x, y, z;

				for( i = 0; i < nElements; i ++ ) {

					x = normalArray[ i * 3 ];
					y = normalArray[ i * 3 + 1 ];
					z = normalArray[ i * 3 + 2 ];

					normals.push( x/127, y/127, z/127 );

				}

			}

			return nElements * 3 * Int8Array.BYTES_PER_ELEMENT;

		};

		function init_uvs( start ) {

			var nElements = md.nuvs;

			if ( nElements ) {

				var uvArray = new Float32Array( data, start, nElements * 2 );

				var i, u, v;

				for( i = 0; i < nElements; i ++ ) {

					u = uvArray[ i * 2 ];
					v = uvArray[ i * 2 + 1 ];

					uvs.push( u, v );

				}

			}

			return nElements * 2 * Float32Array.BYTES_PER_ELEMENT;

		};

		function init_uvs3( nElements, offset ) {

			var i, uva, uvb, uvc, u1, u2, u3, v1, v2, v3;

			var uvIndexBuffer = new Uint32Array( data, offset, 3 * nElements );

			for( i = 0; i < nElements; i ++ ) {

				uva = uvIndexBuffer[ i * 3 ];
				uvb = uvIndexBuffer[ i * 3 + 1 ];
				uvc = uvIndexBuffer[ i * 3 + 2 ];

				u1 = uvs[ uva*2 ];
				v1 = uvs[ uva*2 + 1 ];

				u2 = uvs[ uvb*2 ];
				v2 = uvs[ uvb*2 + 1 ];

				u3 = uvs[ uvc*2 ];
				v3 = uvs[ uvc*2 + 1 ];

				uv3( scope.faceVertexUvs[ 0 ], u1, v1, u2, v2, u3, v3 );

			}

		};

		function init_uvs4( nElements, offset ) {

			var i, uva, uvb, uvc, uvd, u1, u2, u3, u4, v1, v2, v3, v4;

			var uvIndexBuffer = new Uint32Array( data, offset, 4 * nElements );

			for( i = 0; i < nElements; i ++ ) {

				uva = uvIndexBuffer[ i * 4 ];
				uvb = uvIndexBuffer[ i * 4 + 1 ];
				uvc = uvIndexBuffer[ i * 4 + 2 ];
				uvd = uvIndexBuffer[ i * 4 + 3 ];

				u1 = uvs[ uva*2 ];
				v1 = uvs[ uva*2 + 1 ];

				u2 = uvs[ uvb*2 ];
				v2 = uvs[ uvb*2 + 1 ];

				u3 = uvs[ uvc*2 ];
				v3 = uvs[ uvc*2 + 1 ];

				u4 = uvs[ uvd*2 ];
				v4 = uvs[ uvd*2 + 1 ];

				uv4( scope.faceVertexUvs[ 0 ], u1, v1, u2, v2, u3, v3, u4, v4 );

			}

		};

		function init_faces3_flat( nElements, offsetVertices, offsetMaterials ) {

			var i, a, b, c, m;

			var vertexIndexBuffer = new Uint32Array( data, offsetVertices, 3 * nElements );
			var materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );

			for( i = 0; i < nElements; i ++ ) {

				a = vertexIndexBuffer[ i * 3 ];
				b = vertexIndexBuffer[ i * 3 + 1 ];
				c = vertexIndexBuffer[ i * 3 + 2 ];

				m = materialIndexBuffer[ i ];

				f3( scope, a, b, c, m );

			}

		};

		function init_faces4_flat( nElements, offsetVertices, offsetMaterials ) {

			var i, a, b, c, d, m;

			var vertexIndexBuffer = new Uint32Array( data, offsetVertices, 4 * nElements );
			var materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );

			for( i = 0; i < nElements; i ++ ) {

				a = vertexIndexBuffer[ i * 4 ];
				b = vertexIndexBuffer[ i * 4 + 1 ];
				c = vertexIndexBuffer[ i * 4 + 2 ];
				d = vertexIndexBuffer[ i * 4 + 3 ];

				m = materialIndexBuffer[ i ];

				f4( scope, a, b, c, d, m );

			}

		};

		function init_faces3_smooth( nElements, offsetVertices, offsetNormals, offsetMaterials ) {

			var i, a, b, c, m;
			var na, nb, nc;

			var vertexIndexBuffer = new Uint32Array( data, offsetVertices, 3 * nElements );
			var normalIndexBuffer = new Uint32Array( data, offsetNormals, 3 * nElements );
			var materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );

			for( i = 0; i < nElements; i ++ ) {

				a = vertexIndexBuffer[ i * 3 ];
				b = vertexIndexBuffer[ i * 3 + 1 ];
				c = vertexIndexBuffer[ i * 3 + 2 ];

				na = normalIndexBuffer[ i * 3 ];
				nb = normalIndexBuffer[ i * 3 + 1 ];
				nc = normalIndexBuffer[ i * 3 + 2 ];

				m = materialIndexBuffer[ i ];

				f3n( scope, normals, a, b, c, m, na, nb, nc );

			}

		};

		function init_faces4_smooth( nElements, offsetVertices, offsetNormals, offsetMaterials ) {

			var i, a, b, c, d, m;
			var na, nb, nc, nd;

			var vertexIndexBuffer = new Uint32Array( data, offsetVertices, 4 * nElements );
			var normalIndexBuffer = new Uint32Array( data, offsetNormals, 4 * nElements );
			var materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );

			for( i = 0; i < nElements; i ++ ) {

				a = vertexIndexBuffer[ i * 4 ];
				b = vertexIndexBuffer[ i * 4 + 1 ];
				c = vertexIndexBuffer[ i * 4 + 2 ];
				d = vertexIndexBuffer[ i * 4 + 3 ];

				na = normalIndexBuffer[ i * 4 ];
				nb = normalIndexBuffer[ i * 4 + 1 ];
				nc = normalIndexBuffer[ i * 4 + 2 ];
				nd = normalIndexBuffer[ i * 4 + 3 ];

				m = materialIndexBuffer[ i ];

				f4n( scope, normals, a, b, c, d, m, na, nb, nc, nd );

			}

		};

		function init_triangles_flat( start ) {

			var nElements = md.ntri_flat;

			if ( nElements ) {

				var offsetMaterials = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;
				init_faces3_flat( nElements, start, offsetMaterials );

			}

		};

		function init_triangles_flat_uv( start ) {

			var nElements = md.ntri_flat_uv;

			if ( nElements ) {

				var offsetUvs = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;
				var offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;

				init_faces3_flat( nElements, start, offsetMaterials );
				init_uvs3( nElements, offsetUvs );

			}

		};

		function init_triangles_smooth( start ) {

			var nElements = md.ntri_smooth;

			if ( nElements ) {

				var offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;
				var offsetMaterials = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;

				init_faces3_smooth( nElements, start, offsetNormals, offsetMaterials );

			}

		};

		function init_triangles_smooth_uv( start ) {

			var nElements = md.ntri_smooth_uv;

			if ( nElements ) {

				var offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;
				var offsetUvs = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;
				var offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;

				init_faces3_smooth( nElements, start, offsetNormals, offsetMaterials );
				init_uvs3( nElements, offsetUvs );

			}

		};

		function init_quads_flat( start ) {

			var nElements = md.nquad_flat;

			if ( nElements ) {

				var offsetMaterials = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;
				init_faces4_flat( nElements, start, offsetMaterials );

			}

		};

		function init_quads_flat_uv( start ) {

			var nElements = md.nquad_flat_uv;

			if ( nElements ) {

				var offsetUvs = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;
				var offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;

				init_faces4_flat( nElements, start, offsetMaterials );
				init_uvs4( nElements, offsetUvs );

			}

		};

		function init_quads_smooth( start ) {

			var nElements = md.nquad_smooth;

			if ( nElements ) {

				var offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;
				var offsetMaterials = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;

				init_faces4_smooth( nElements, start, offsetNormals, offsetMaterials );

			}

		};

		function init_quads_smooth_uv( start ) {

			var nElements = md.nquad_smooth_uv;

			if ( nElements ) {

				var offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;
				var offsetUvs = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;
				var offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;

				init_faces4_smooth( nElements, start, offsetNormals, offsetMaterials );
				init_uvs4( nElements, offsetUvs );

			}

		};

	};

	function vertex ( scope, x, y, z ) {

		scope.vertices.push( new THREE.Vector3( x, y, z ) );

	};

	function f3 ( scope, a, b, c, mi ) {

		scope.faces.push( new THREE.Face3( a, b, c, null, null, mi ) );

	};

	function f4 ( scope, a, b, c, d, mi ) {

		scope.faces.push( new THREE.Face4( a, b, c, d, null, null, mi ) );

	};

	function f3n ( scope, normals, a, b, c, mi, na, nb, nc ) {

		var nax = normals[ na*3     ],
			nay = normals[ na*3 + 1 ],
			naz = normals[ na*3 + 2 ],

			nbx = normals[ nb*3     ],
			nby = normals[ nb*3 + 1 ],
			nbz = normals[ nb*3 + 2 ],

			ncx = normals[ nc*3     ],
			ncy = normals[ nc*3 + 1 ],
			ncz = normals[ nc*3 + 2 ];

		scope.faces.push( new THREE.Face3( a, b, c,
						  [new THREE.Vector3( nax, nay, naz ),
						   new THREE.Vector3( nbx, nby, nbz ),
						   new THREE.Vector3( ncx, ncy, ncz )],
						  null,
						  mi ) );

	};

	function f4n ( scope, normals, a, b, c, d, mi, na, nb, nc, nd ) {

		var nax = normals[ na*3     ],
			nay = normals[ na*3 + 1 ],
			naz = normals[ na*3 + 2 ],

			nbx = normals[ nb*3     ],
			nby = normals[ nb*3 + 1 ],
			nbz = normals[ nb*3 + 2 ],

			ncx = normals[ nc*3     ],
			ncy = normals[ nc*3 + 1 ],
			ncz = normals[ nc*3 + 2 ],

			ndx = normals[ nd*3     ],
			ndy = normals[ nd*3 + 1 ],
			ndz = normals[ nd*3 + 2 ];

		scope.faces.push( new THREE.Face4( a, b, c, d,
						  [new THREE.Vector3( nax, nay, naz ),
						   new THREE.Vector3( nbx, nby, nbz ),
						   new THREE.Vector3( ncx, ncy, ncz ),
						   new THREE.Vector3( ndx, ndy, ndz )],
						  null,
						  mi ) );

	};

	function uv3 ( where, u1, v1, u2, v2, u3, v3 ) {

		where.push( [
			new THREE.UV( u1, v1 ),
			new THREE.UV( u2, v2 ),
			new THREE.UV( u3, v3 )
		] );

	};

	function uv4 ( where, u1, v1, u2, v2, u3, v3, u4, v4 ) {

		where.push( [
			new THREE.UV( u1, v1 ),
			new THREE.UV( u2, v2 ),
			new THREE.UV( u3, v3 ),
			new THREE.UV( u4, v4 )
		] );
	};

	Model.prototype = Object.create( THREE.Geometry.prototype );

	var geometry = new Model( texturePath );
	var materials = this.initMaterials( jsonMaterials, texturePath );

	if ( this.needsTangents( materials ) ) geometry.computeTangents();

	callback( geometry, materials );

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ImageLoader = function () {

	THREE.EventTarget.call( this );

	this.crossOrigin = null;

};

THREE.ImageLoader.prototype = {

	constructor: THREE.ImageLoader,

	load: function ( url, image ) {

		var scope = this;

		if ( image === undefined ) image = new Image();

		image.addEventListener( 'load', function () {

			scope.dispatchEvent( { type: 'load', content: image } );

		}, false );

		image.addEventListener( 'error', function () {

			scope.dispatchEvent( { type: 'error', message: 'Couldn\'t load URL [' + url + ']' } );

		}, false );

		if ( scope.crossOrigin ) image.crossOrigin = scope.crossOrigin;

		image.src = url;

	}

}
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.JSONLoader = function ( showStatus ) {

	THREE.Loader.call( this, showStatus );

	this.withCredentials = false;

};

THREE.JSONLoader.prototype = Object.create( THREE.Loader.prototype );

THREE.JSONLoader.prototype.load = function ( url, callback, texturePath ) {

	var scope = this;

	// todo: unify load API to for easier SceneLoader use

	texturePath = texturePath && ( typeof texturePath === "string" ) ? texturePath : this.extractUrlBase( url );

	this.onLoadStart();
	this.loadAjaxJSON( this, url, callback, texturePath );

};

THREE.JSONLoader.prototype.loadAjaxJSON = function ( context, url, callback, texturePath, callbackProgress ) {

	var xhr = new XMLHttpRequest();

	var length = 0;

	xhr.withCredentials = this.withCredentials;

	xhr.onreadystatechange = function () {

		if ( xhr.readyState === xhr.DONE ) {

			if ( xhr.status === 200 || xhr.status === 0 ) {

				if ( xhr.responseText ) {

					var json = JSON.parse( xhr.responseText );
					context.createModel( json, callback, texturePath );

				} else {

					console.warn( "THREE.JSONLoader: [" + url + "] seems to be unreachable or file there is empty" );

				}

				// in context of more complex asset initialization
				// do not block on single failed file
				// maybe should go even one more level up

				context.onLoadComplete();

			} else {

				console.error( "THREE.JSONLoader: Couldn't load [" + url + "] [" + xhr.status + "]" );

			}

		} else if ( xhr.readyState === xhr.LOADING ) {

			if ( callbackProgress ) {

				if ( length === 0 ) {

					length = xhr.getResponseHeader( "Content-Length" );

				}

				callbackProgress( { total: length, loaded: xhr.responseText.length } );

			}

		} else if ( xhr.readyState === xhr.HEADERS_RECEIVED ) {

			length = xhr.getResponseHeader( "Content-Length" );

		}

	};

	xhr.open( "GET", url, true );
	xhr.send( null );

};

THREE.JSONLoader.prototype.createModel = function ( json, callback, texturePath ) {

	var scope = this,
	geometry = new THREE.Geometry(),
	scale = ( json.scale !== undefined ) ? 1.0 / json.scale : 1.0;

	parseModel( scale );

	parseSkin();
	parseMorphing( scale );

	geometry.computeCentroids();
	geometry.computeFaceNormals();

	function parseModel( scale ) {

		function isBitSet( value, position ) {

			return value & ( 1 << position );

		}

		var i, j, fi,

		offset, zLength, nVertices,

		colorIndex, normalIndex, uvIndex, materialIndex,

		type,
		isQuad,
		hasMaterial,
		hasFaceUv, hasFaceVertexUv,
		hasFaceNormal, hasFaceVertexNormal,
		hasFaceColor, hasFaceVertexColor,

		vertex, face, color, normal,

		uvLayer, uvs, u, v,

		faces = json.faces,
		vertices = json.vertices,
		normals = json.normals,
		colors = json.colors,

		nUvLayers = 0;

		// disregard empty arrays

		for ( i = 0; i < json.uvs.length; i++ ) {

			if ( json.uvs[ i ].length ) nUvLayers ++;

		}

		for ( i = 0; i < nUvLayers; i++ ) {

			geometry.faceUvs[ i ] = [];
			geometry.faceVertexUvs[ i ] = [];

		}

		offset = 0;
		zLength = vertices.length;

		while ( offset < zLength ) {

			vertex = new THREE.Vector3();

			vertex.x = vertices[ offset ++ ] * scale;
			vertex.y = vertices[ offset ++ ] * scale;
			vertex.z = vertices[ offset ++ ] * scale;

			geometry.vertices.push( vertex );

		}

		offset = 0;
		zLength = faces.length;

		while ( offset < zLength ) {

			type = faces[ offset ++ ];


			isQuad          	= isBitSet( type, 0 );
			hasMaterial         = isBitSet( type, 1 );
			hasFaceUv           = isBitSet( type, 2 );
			hasFaceVertexUv     = isBitSet( type, 3 );
			hasFaceNormal       = isBitSet( type, 4 );
			hasFaceVertexNormal = isBitSet( type, 5 );
			hasFaceColor	    = isBitSet( type, 6 );
			hasFaceVertexColor  = isBitSet( type, 7 );

			//console.log("type", type, "bits", isQuad, hasMaterial, hasFaceUv, hasFaceVertexUv, hasFaceNormal, hasFaceVertexNormal, hasFaceColor, hasFaceVertexColor);

			if ( isQuad ) {

				face = new THREE.Face4();

				face.a = faces[ offset ++ ];
				face.b = faces[ offset ++ ];
				face.c = faces[ offset ++ ];
				face.d = faces[ offset ++ ];

				nVertices = 4;

			} else {

				face = new THREE.Face3();

				face.a = faces[ offset ++ ];
				face.b = faces[ offset ++ ];
				face.c = faces[ offset ++ ];

				nVertices = 3;

			}

			if ( hasMaterial ) {

				materialIndex = faces[ offset ++ ];
				face.materialIndex = materialIndex;

			}

			// to get face <=> uv index correspondence

			fi = geometry.faces.length;

			if ( hasFaceUv ) {

				for ( i = 0; i < nUvLayers; i++ ) {

					uvLayer = json.uvs[ i ];

					uvIndex = faces[ offset ++ ];

					u = uvLayer[ uvIndex * 2 ];
					v = uvLayer[ uvIndex * 2 + 1 ];

					geometry.faceUvs[ i ][ fi ] = new THREE.UV( u, v );

				}

			}

			if ( hasFaceVertexUv ) {

				for ( i = 0; i < nUvLayers; i++ ) {

					uvLayer = json.uvs[ i ];

					uvs = [];

					for ( j = 0; j < nVertices; j ++ ) {

						uvIndex = faces[ offset ++ ];

						u = uvLayer[ uvIndex * 2 ];
						v = uvLayer[ uvIndex * 2 + 1 ];

						uvs[ j ] = new THREE.UV( u, v );

					}

					geometry.faceVertexUvs[ i ][ fi ] = uvs;

				}

			}

			if ( hasFaceNormal ) {

				normalIndex = faces[ offset ++ ] * 3;

				normal = new THREE.Vector3();

				normal.x = normals[ normalIndex ++ ];
				normal.y = normals[ normalIndex ++ ];
				normal.z = normals[ normalIndex ];

				face.normal = normal;

			}

			if ( hasFaceVertexNormal ) {

				for ( i = 0; i < nVertices; i++ ) {

					normalIndex = faces[ offset ++ ] * 3;

					normal = new THREE.Vector3();

					normal.x = normals[ normalIndex ++ ];
					normal.y = normals[ normalIndex ++ ];
					normal.z = normals[ normalIndex ];

					face.vertexNormals.push( normal );

				}

			}


			if ( hasFaceColor ) {

				colorIndex = faces[ offset ++ ];

				color = new THREE.Color( colors[ colorIndex ] );
				face.color = color;

			}


			if ( hasFaceVertexColor ) {

				for ( i = 0; i < nVertices; i++ ) {

					colorIndex = faces[ offset ++ ];

					color = new THREE.Color( colors[ colorIndex ] );
					face.vertexColors.push( color );

				}

			}

			geometry.faces.push( face );

		}

	};

	function parseSkin() {

		var i, l, x, y, z, w, a, b, c, d;

		if ( json.skinWeights ) {

			for ( i = 0, l = json.skinWeights.length; i < l; i += 2 ) {

				x = json.skinWeights[ i     ];
				y = json.skinWeights[ i + 1 ];
				z = 0;
				w = 0;

				geometry.skinWeights.push( new THREE.Vector4( x, y, z, w ) );

			}

		}

		if ( json.skinIndices ) {

			for ( i = 0, l = json.skinIndices.length; i < l; i += 2 ) {

				a = json.skinIndices[ i     ];
				b = json.skinIndices[ i + 1 ];
				c = 0;
				d = 0;

				geometry.skinIndices.push( new THREE.Vector4( a, b, c, d ) );

			}

		}

		geometry.bones = json.bones;
		geometry.animation = json.animation;

	};

	function parseMorphing( scale ) {

		if ( json.morphTargets !== undefined ) {

			var i, l, v, vl, dstVertices, srcVertices;

			for ( i = 0, l = json.morphTargets.length; i < l; i ++ ) {

				geometry.morphTargets[ i ] = {};
				geometry.morphTargets[ i ].name = json.morphTargets[ i ].name;
				geometry.morphTargets[ i ].vertices = [];

				dstVertices = geometry.morphTargets[ i ].vertices;
				srcVertices = json.morphTargets [ i ].vertices;

				for( v = 0, vl = srcVertices.length; v < vl; v += 3 ) {

					var vertex = new THREE.Vector3();
					vertex.x = srcVertices[ v ] * scale;
					vertex.y = srcVertices[ v + 1 ] * scale;
					vertex.z = srcVertices[ v + 2 ] * scale;

					dstVertices.push( vertex );

				}

			}

		}

		if ( json.morphColors !== undefined ) {

			var i, l, c, cl, dstColors, srcColors, color;

			for ( i = 0, l = json.morphColors.length; i < l; i++ ) {

				geometry.morphColors[ i ] = {};
				geometry.morphColors[ i ].name = json.morphColors[ i ].name;
				geometry.morphColors[ i ].colors = [];

				dstColors = geometry.morphColors[ i ].colors;
				srcColors = json.morphColors [ i ].colors;

				for ( c = 0, cl = srcColors.length; c < cl; c += 3 ) {

					color = new THREE.Color( 0xffaa00 );
					color.setRGB( srcColors[ c ], srcColors[ c + 1 ], srcColors[ c + 2 ] );
					dstColors.push( color );

				}

			}

		}

	};

	var materials = this.initMaterials( json.materials, texturePath );

	if ( this.needsTangents( materials ) ) geometry.computeTangents();

	callback( geometry, materials );

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.LoadingMonitor = function () {

	THREE.EventTarget.call( this );

	var scope = this;

	var loaded = 0;
	var total = 0;

	var onLoad = function ( event ) {

		loaded ++;

		scope.dispatchEvent( { type: 'progress', loaded: loaded, total: total } );

		if ( loaded === total ) {

			scope.dispatchEvent( { type: 'load' } );

		}

	};

	this.add = function ( loader ) {

		total ++;

		loader.addEventListener( 'load', onLoad, false );

	};

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SceneLoader = function () {

	this.onLoadStart = function () {};
	this.onLoadProgress = function() {};
	this.onLoadComplete = function () {};

	this.callbackSync = function () {};
	this.callbackProgress = function () {};

	this.geometryHandlerMap = {};
	this.hierarchyHandlerMap = {};

	this.addGeometryHandler( "ascii", THREE.JSONLoader );
	this.addGeometryHandler( "binary", THREE.BinaryLoader );

};

THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;

THREE.SceneLoader.prototype.load = function ( url, callbackFinished ) {

	var scope = this;

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {

		if ( xhr.readyState === 4 ) {

			if ( xhr.status === 200 || xhr.status === 0 ) {

				var json = JSON.parse( xhr.responseText );
				scope.parse( json, callbackFinished, url );

			} else {

				console.error( "THREE.SceneLoader: Couldn't load [" + url + "] [" + xhr.status + "]" );

			}

		}

	};

	xhr.open( "GET", url, true );
	xhr.send( null );

};

THREE.SceneLoader.prototype.addGeometryHandler = function ( typeID, loaderClass ) {

	this.geometryHandlerMap[ typeID ] = { "loaderClass": loaderClass };

};

THREE.SceneLoader.prototype.addHierarchyHandler = function ( typeID, loaderClass ) {

	this.hierarchyHandlerMap[ typeID ] = { "loaderClass": loaderClass };

};

THREE.SceneLoader.prototype.parse = function ( json, callbackFinished, url ) {

	var scope = this;

	var urlBase = THREE.Loader.prototype.extractUrlBase( url );

	var dg, dm, dc, df, dt,
		g, m, l, d, p, r, q, s, c, t, f, tt, pp, u,
		geometry, material, camera, fog,
		texture, images,
		light, hex, intensity,
		counter_models, counter_textures,
		total_models, total_textures,
		result;

	var target_array = [];

	var data = json;

	// async geometry loaders

	for ( var typeID in this.geometryHandlerMap ) {

		var loaderClass = this.geometryHandlerMap[ typeID ][ "loaderClass" ];
		this.geometryHandlerMap[ typeID ][ "loaderObject" ] = new loaderClass();

	}

	// async hierachy loaders

	for ( var typeID in this.hierarchyHandlerMap ) {

		var loaderClass = this.hierarchyHandlerMap[ typeID ][ "loaderClass" ];
		this.hierarchyHandlerMap[ typeID ][ "loaderObject" ] = new loaderClass();

	}

	counter_models = 0;
	counter_textures = 0;

	result = {

		scene: new THREE.Scene(),
		geometries: {},
		face_materials: {},
		materials: {},
		textures: {},
		objects: {},
		cameras: {},
		lights: {},
		fogs: {},
		empties: {}

	};

	if ( data.transform ) {

		var position = data.transform.position,
			rotation = data.transform.rotation,
			scale = data.transform.scale;

		if ( position )
			result.scene.position.set( position[ 0 ], position[ 1 ], position [ 2 ] );

		if ( rotation )
			result.scene.rotation.set( rotation[ 0 ], rotation[ 1 ], rotation [ 2 ] );

		if ( scale )
			result.scene.scale.set( scale[ 0 ], scale[ 1 ], scale [ 2 ] );

		if ( position || rotation || scale ) {

			result.scene.updateMatrix();
			result.scene.updateMatrixWorld();

		}

	}

	function get_url( source_url, url_type ) {

		if ( url_type == "relativeToHTML" ) {

			return source_url;

		} else {

			return urlBase + "/" + source_url;

		}

	};

	// toplevel loader function, delegates to handle_children

	function handle_objects() {

		handle_children( result.scene, data.objects );

	}

	// handle all the children from the loaded json and attach them to given parent

	function handle_children( parent, children ) {

		for ( var dd in children ) {

			// check by id if child has already been handled,
			// if not, create new object

			if ( result.objects[ dd ] === undefined ) {

				var o = children[ dd ];

				var object = null;

				// meshes

				if ( o.type && ( o.type in scope.hierarchyHandlerMap ) && o.loading === undefined ) {

					var loaderParameters = {};

					for ( var parType in g ) {

						if ( parType !== "type" && parType !== "url" ) {

							loaderParameters[ parType ] = g[ parType ];

						}

					}

					material = result.materials[ o.material ];

					o.loading = true;

					var loader = scope.hierarchyHandlerMap[ o.type ][ "loaderObject" ];

					// OBJLoader

					if ( loader.addEventListener ) {

						loader.addEventListener( 'load', create_callback_hierachy( dd, parent, material, o ) );
						loader.load( get_url( o.url, data.urlBaseType ) );

					} else {

						// ColladaLoader

						if ( loader.options ) {

							loader.load( get_url( o.url, data.urlBaseType ), create_callback_hierachy( dd, parent, material, o ) );

						// UTF8Loader

						} else {

							loader.load( get_url( o.url, data.urlBaseType ), create_callback_hierachy( dd, parent, material, o ), loaderParameters );

						}

					}

				} else if ( o.geometry !== undefined ) {

					geometry = result.geometries[ o.geometry ];

					// geometry already loaded

					if ( geometry ) {

						var needsTangents = false;

						material = result.materials[ o.material ];
						needsTangents = material instanceof THREE.ShaderMaterial;

						p = o.position;
						r = o.rotation;
						q = o.quaternion;
						s = o.scale;
						m = o.matrix;

						// turn off quaternions, for the moment

						q = 0;

						// use materials from the model file
						// if there is no material specified in the object

						if ( ! o.material ) {

							material = new THREE.MeshFaceMaterial( result.face_materials[ o.geometry ] );

						}

						// use materials from the model file
						// if there is just empty face material
						// (must create new material as each model has its own face material)

						if ( ( material instanceof THREE.MeshFaceMaterial ) && material.materials.length === 0 ) {

							material = new THREE.MeshFaceMaterial( result.face_materials[ o.geometry ] );

						}

						if ( material instanceof THREE.MeshFaceMaterial ) {

							for ( var i = 0; i < material.materials.length; i ++ ) {

								needsTangents = needsTangents || ( material.materials[ i ] instanceof THREE.ShaderMaterial );

							}

						}

						if ( needsTangents ) {

							geometry.computeTangents();

						}

						if ( o.skin ) {

							object = new THREE.SkinnedMesh( geometry, material );

						} else if ( o.morph ) {

							object = new THREE.MorphAnimMesh( geometry, material );

							if ( o.duration !== undefined ) {

								object.duration = o.duration;

							}

							if ( o.time !== undefined ) {

								object.time = o.time;

							}

							if ( o.mirroredLoop !== undefined ) {

								object.mirroredLoop = o.mirroredLoop;

							}

							if ( material.morphNormals ) {

								geometry.computeMorphNormals();

							}

						} else {

							object = new THREE.Mesh( geometry, material );

						}

						object.name = dd;

						if ( m ) {

							object.matrixAutoUpdate = false;
							object.matrix.set(
								m[0], m[1], m[2], m[3],
								m[4], m[5], m[6], m[7],
								m[8], m[9], m[10], m[11],
								m[12], m[13], m[14], m[15]
							);

						} else {

							object.position.set( p[0], p[1], p[2] );

							if ( q ) {

								object.quaternion.set( q[0], q[1], q[2], q[3] );
								object.useQuaternion = true;

							} else {

								object.rotation.set( r[0], r[1], r[2] );

							}

							object.scale.set( s[0], s[1], s[2] );

						}

						object.visible = o.visible;
						object.castShadow = o.castShadow;
						object.receiveShadow = o.receiveShadow;

						parent.add( object );

						result.objects[ dd ] = object;

					}

				// lights

				} else if ( o.type === "DirectionalLight" || o.type === "PointLight" || o.type === "AmbientLight" ) {

					hex = ( o.color !== undefined ) ? o.color : 0xffffff;
					intensity = ( o.intensity !== undefined ) ? o.intensity : 1;

					if ( o.type === "DirectionalLight" ) {

						p = o.direction;

						light = new THREE.DirectionalLight( hex, intensity );
						light.position.set( p[0], p[1], p[2] );

						if ( o.target ) {

							target_array.push( { "object": light, "targetName" : o.target } );

							// kill existing default target
							// otherwise it gets added to scene when parent gets added

							light.target = null;

						}

					} else if ( o.type === "PointLight" ) {

						p = o.position;
						d = o.distance;

						light = new THREE.PointLight( hex, intensity, d );
						light.position.set( p[0], p[1], p[2] );

					} else if ( o.type === "AmbientLight" ) {

						light = new THREE.AmbientLight( hex );

					}

					parent.add( light );

					light.name = dd;
					result.lights[ dd ] = light;
					result.objects[ dd ] = light;

				// cameras

				} else if ( o.type === "PerspectiveCamera" || o.type === "OrthographicCamera" ) {

					if ( o.type === "PerspectiveCamera" ) {

						camera = new THREE.PerspectiveCamera( o.fov, o.aspect, o.near, o.far );

					} else if ( o.type === "OrthographicCamera" ) {

						camera = new THREE.OrthographicCamera( c.left, c.right, c.top, c.bottom, c.near, c.far );

					}

					p = o.position;
					camera.position.set( p[0], p[1], p[2] );
					parent.add( camera );

					camera.name = dd;
					result.cameras[ dd ] = camera;
					result.objects[ dd ] = camera;

				// pure Object3D

				} else {

					p = o.position;
					r = o.rotation;
					q = o.quaternion;
					s = o.scale;

					// turn off quaternions, for the moment

					q = 0;

					object = new THREE.Object3D();
					object.name = dd;
					object.position.set( p[0], p[1], p[2] );

					if ( q ) {

						object.quaternion.set( q[0], q[1], q[2], q[3] );
						object.useQuaternion = true;

					} else {

						object.rotation.set( r[0], r[1], r[2] );

					}

					object.scale.set( s[0], s[1], s[2] );
					object.visible = ( o.visible !== undefined ) ? o.visible : false;

					parent.add( object );

					result.objects[ dd ] = object;
					result.empties[ dd ] = object;

				}

				if ( object ) {

					if ( o.properties !== undefined )  {

						for ( var key in o.properties ) {

							var value = o.properties[ key ];
							object.properties[ key ] = value;

						}

					}

					if ( o.children !== undefined ) {

						handle_children( object, o.children );

					}

				}

			}

		}

	};

	function handle_mesh( geo, mat, id ) {

		result.geometries[ id ] = geo;
		result.face_materials[ id ] = mat;
		handle_objects();

	};

	function handle_hierarchy( node, id, parent, material, o ) {

		var p = o.position;
		var r = o.rotation;
		var q = o.quaternion;
		var s = o.scale;

		node.position.set( p[0], p[1], p[2] );

		if ( q ) {

			node.quaternion.set( q[0], q[1], q[2], q[3] );
			node.useQuaternion = true;

		} else {

			node.rotation.set( r[0], r[1], r[2] );

		}

		node.scale.set( s[0], s[1], s[2] );

		if ( material ) {

			node.traverse( function ( child )  {

				child.material = material;

			} );

		}

		parent.add( node );

		result.objects[ id ] = node;
		handle_objects();

	};

	function create_callback_geometry( id ) {

		return function( geo, mat ) {

			handle_mesh( geo, mat, id );

			counter_models -= 1;

			scope.onLoadComplete();

			async_callback_gate();

		}

	};

	function create_callback_hierachy( id, parent, material, obj ) {

		return function( event ) {

			var result;

			// loaders which use EventTarget

			if ( event.content ) {

				result = event.content;

			// ColladaLoader

			} else if ( event.dae ) {

				result = event.scene;


			// UTF8Loader

			} else {

				result = event;

			}

			handle_hierarchy( result, id, parent, material, obj );

			counter_models -= 1;

			scope.onLoadComplete();

			async_callback_gate();

		}

	};

	function create_callback_embed( id ) {

		return function( geo, mat ) {

			result.geometries[ id ] = geo;
			result.face_materials[ id ] = mat;

		}

	};

	function async_callback_gate() {

		var progress = {

			totalModels : total_models,
			totalTextures : total_textures,
			loadedModels : total_models - counter_models,
			loadedTextures : total_textures - counter_textures

		};

		scope.callbackProgress( progress, result );

		scope.onLoadProgress();

		if ( counter_models === 0 && counter_textures === 0 ) {

			finalize();
			callbackFinished( result );

		}

	};

	function finalize() {

		// take care of targets which could be asynchronously loaded objects

		for ( var i = 0; i < target_array.length; i ++ ) {

			var ta = target_array[ i ];

			var target = result.objects[ ta.targetName ];

			if ( target ) {

				ta.object.target = target;

			} else {

				// if there was error and target of specified name doesn't exist in the scene file
				// create instead dummy target
				// (target must be added to scene explicitly as parent is already added)

				ta.object.target = new THREE.Object3D();
				result.scene.add( ta.object.target );

			}

			ta.object.target.properties.targetInverse = ta.object;

		}

	};

	var callbackTexture = function ( count ) {

		counter_textures -= count;
		async_callback_gate();

		scope.onLoadComplete();

	};

	// must use this instead of just directly calling callbackTexture
	// because of closure in the calling context loop

	var generateTextureCallback = function ( count ) {

		return function() {

			callbackTexture( count );

		};

	};

	// first go synchronous elements

	// fogs

	for ( df in data.fogs ) {

		f = data.fogs[ df ];

		if ( f.type === "linear" ) {

			fog = new THREE.Fog( 0x000000, f.near, f.far );

		} else if ( f.type === "exp2" ) {

			fog = new THREE.FogExp2( 0x000000, f.density );

		}

		c = f.color;
		fog.color.setRGB( c[0], c[1], c[2] );

		result.fogs[ df ] = fog;

	}

	// now come potentially asynchronous elements

	// geometries

	// count how many geometries will be loaded asynchronously

	for ( dg in data.geometries ) {

		g = data.geometries[ dg ];

		if ( g.type in this.geometryHandlerMap ) {

			counter_models += 1;

			scope.onLoadStart();

		}

	}

	// count how many hierarchies will be loaded asynchronously

	for ( var dd in data.objects ) {

		var o = data.objects[ dd ];

		if ( o.type && ( o.type in this.hierarchyHandlerMap ) ) {

			counter_models += 1;

			scope.onLoadStart();

		}

	}

	total_models = counter_models;

	for ( dg in data.geometries ) {

		g = data.geometries[ dg ];

		if ( g.type === "cube" ) {

			geometry = new THREE.CubeGeometry( g.width, g.height, g.depth, g.widthSegments, g.heightSegments, g.depthSegments );
			result.geometries[ dg ] = geometry;

		} else if ( g.type === "plane" ) {

			geometry = new THREE.PlaneGeometry( g.width, g.height, g.widthSegments, g.heightSegments );
			result.geometries[ dg ] = geometry;

		} else if ( g.type === "sphere" ) {

			geometry = new THREE.SphereGeometry( g.radius, g.widthSegments, g.heightSegments );
			result.geometries[ dg ] = geometry;

		} else if ( g.type === "cylinder" ) {

			geometry = new THREE.CylinderGeometry( g.topRad, g.botRad, g.height, g.radSegs, g.heightSegs );
			result.geometries[ dg ] = geometry;

		} else if ( g.type === "torus" ) {

			geometry = new THREE.TorusGeometry( g.radius, g.tube, g.segmentsR, g.segmentsT );
			result.geometries[ dg ] = geometry;

		} else if ( g.type === "icosahedron" ) {

			geometry = new THREE.IcosahedronGeometry( g.radius, g.subdivisions );
			result.geometries[ dg ] = geometry;

		} else if ( g.type in this.geometryHandlerMap ) {

			var loaderParameters = {};
			for ( var parType in g ) {

				if ( parType !== "type" && parType !== "url" ) {

					loaderParameters[ parType ] = g[ parType ];

				}

			}

			var loader = this.geometryHandlerMap[ g.type ][ "loaderObject" ];
			loader.load( get_url( g.url, data.urlBaseType ), create_callback_geometry( dg ), loaderParameters );

		} else if ( g.type === "embedded" ) {

			var modelJson = data.embeds[ g.id ],
				texture_path = "";

			// pass metadata along to jsonLoader so it knows the format version

			modelJson.metadata = data.metadata;

			if ( modelJson ) {

				var jsonLoader = this.geometryHandlerMap[ "ascii" ][ "loaderObject" ];
				jsonLoader.createModel( modelJson, create_callback_embed( dg ), texture_path );

			}

		}

	}

	// textures

	// count how many textures will be loaded asynchronously

	for ( dt in data.textures ) {

		tt = data.textures[ dt ];

		if ( tt.url instanceof Array ) {

			counter_textures += tt.url.length;

			for( var n = 0; n < tt.url.length; n ++ ) {

				scope.onLoadStart();

			}

		} else {

			counter_textures += 1;

			scope.onLoadStart();

		}

	}

	total_textures = counter_textures;

	for ( dt in data.textures ) {

		tt = data.textures[ dt ];

		if ( tt.mapping !== undefined && THREE[ tt.mapping ] !== undefined  ) {

			tt.mapping = new THREE[ tt.mapping ]();

		}

		if ( tt.url instanceof Array ) {

			var count = tt.url.length;
			var url_array = [];

			for( var i = 0; i < count; i ++ ) {

				url_array[ i ] = get_url( tt.url[ i ], data.urlBaseType );

			}

			var isCompressed = url_array[ 0 ].endsWith( ".dds" );

			if ( isCompressed ) {

				texture = THREE.ImageUtils.loadCompressedTextureCube( url_array, tt.mapping, generateTextureCallback( count ) );

			} else {

				texture = THREE.ImageUtils.loadTextureCube( url_array, tt.mapping, generateTextureCallback( count ) );

			}

		} else {

			var isCompressed = tt.url.toLowerCase().endsWith( ".dds" );
			var fullUrl = get_url( tt.url, data.urlBaseType );
			var textureCallback = generateTextureCallback( 1 );

			if ( isCompressed ) {

				texture = THREE.ImageUtils.loadCompressedTexture( fullUrl, tt.mapping, textureCallback );

			} else {

				texture = THREE.ImageUtils.loadTexture( fullUrl, tt.mapping, textureCallback );

			}

			if ( THREE[ tt.minFilter ] !== undefined )
				texture.minFilter = THREE[ tt.minFilter ];

			if ( THREE[ tt.magFilter ] !== undefined )
				texture.magFilter = THREE[ tt.magFilter ];

			if ( tt.anisotropy ) texture.anisotropy = tt.anisotropy;

			if ( tt.repeat ) {

				texture.repeat.set( tt.repeat[ 0 ], tt.repeat[ 1 ] );

				if ( tt.repeat[ 0 ] !== 1 ) texture.wrapS = THREE.RepeatWrapping;
				if ( tt.repeat[ 1 ] !== 1 ) texture.wrapT = THREE.RepeatWrapping;

			}

			if ( tt.offset ) {

				texture.offset.set( tt.offset[ 0 ], tt.offset[ 1 ] );

			}

			// handle wrap after repeat so that default repeat can be overriden

			if ( tt.wrap ) {

				var wrapMap = {
				"repeat" 	: THREE.RepeatWrapping,
				"mirror"	: THREE.MirroredRepeatWrapping
				}

				if ( wrapMap[ tt.wrap[ 0 ] ] !== undefined ) texture.wrapS = wrapMap[ tt.wrap[ 0 ] ];
				if ( wrapMap[ tt.wrap[ 1 ] ] !== undefined ) texture.wrapT = wrapMap[ tt.wrap[ 1 ] ];

			}

		}

		result.textures[ dt ] = texture;

	}

	// materials

	for ( dm in data.materials ) {

		m = data.materials[ dm ];

		for ( pp in m.parameters ) {

			if ( pp === "envMap" || pp === "map" || pp === "lightMap" || pp === "bumpMap" ) {

				m.parameters[ pp ] = result.textures[ m.parameters[ pp ] ];

			} else if ( pp === "shading" ) {

				m.parameters[ pp ] = ( m.parameters[ pp ] === "flat" ) ? THREE.FlatShading : THREE.SmoothShading;

			} else if ( pp === "side" ) {

				if (  m.parameters[ pp ] == "double" ) {

					m.parameters[ pp ] = THREE.DoubleSide;

				} else if ( m.parameters[ pp ] == "back" ) {

					m.parameters[ pp ] = THREE.BackSide;

				} else {

					m.parameters[ pp ] = THREE.FrontSide;

				}

			} else if ( pp === "blending" ) {

				m.parameters[ pp ] = m.parameters[ pp ] in THREE ? THREE[ m.parameters[ pp ] ] : THREE.NormalBlending;

			} else if ( pp === "combine" ) {

				m.parameters[ pp ] = ( m.parameters[ pp ] == "MixOperation" ) ? THREE.MixOperation : THREE.MultiplyOperation;

			} else if ( pp === "vertexColors" ) {

				if ( m.parameters[ pp ] == "face" ) {

					m.parameters[ pp ] = THREE.FaceColors;

				// default to vertex colors if "vertexColors" is anything else face colors or 0 / null / false

				} else if ( m.parameters[ pp ] )   {

					m.parameters[ pp ] = THREE.VertexColors;

				}

			} else if ( pp === "wrapRGB" ) {

				var v3 = m.parameters[ pp ];
				m.parameters[ pp ] = new THREE.Vector3( v3[ 0 ], v3[ 1 ], v3[ 2 ] );

			}

		}

		if ( m.parameters.opacity !== undefined && m.parameters.opacity < 1.0 ) {

			m.parameters.transparent = true;

		}

		if ( m.parameters.normalMap ) {

			var shader = THREE.ShaderUtils.lib[ "normal" ];
			var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

			var diffuse = m.parameters.color;
			var specular = m.parameters.specular;
			var ambient = m.parameters.ambient;
			var shininess = m.parameters.shininess;

			uniforms[ "tNormal" ].value = result.textures[ m.parameters.normalMap ];

			if ( m.parameters.normalScale ) {

				uniforms[ "uNormalScale" ].value.set( m.parameters.normalScale[ 0 ], m.parameters.normalScale[ 1 ] );

			}

			if ( m.parameters.map ) {

				uniforms[ "tDiffuse" ].value = m.parameters.map;
				uniforms[ "enableDiffuse" ].value = true;

			}

			if ( m.parameters.envMap ) {

				uniforms[ "tCube" ].value = m.parameters.envMap;
				uniforms[ "enableReflection" ].value = true;
				uniforms[ "uReflectivity" ].value = m.parameters.reflectivity;

			}

			if ( m.parameters.lightMap ) {

				uniforms[ "tAO" ].value = m.parameters.lightMap;
				uniforms[ "enableAO" ].value = true;

			}

			if ( m.parameters.specularMap ) {

				uniforms[ "tSpecular" ].value = result.textures[ m.parameters.specularMap ];
				uniforms[ "enableSpecular" ].value = true;

			}

			if ( m.parameters.displacementMap ) {

				uniforms[ "tDisplacement" ].value = result.textures[ m.parameters.displacementMap ];
				uniforms[ "enableDisplacement" ].value = true;

				uniforms[ "uDisplacementBias" ].value = m.parameters.displacementBias;
				uniforms[ "uDisplacementScale" ].value = m.parameters.displacementScale;

			}

			uniforms[ "uDiffuseColor" ].value.setHex( diffuse );
			uniforms[ "uSpecularColor" ].value.setHex( specular );
			uniforms[ "uAmbientColor" ].value.setHex( ambient );

			uniforms[ "uShininess" ].value = shininess;

			if ( m.parameters.opacity ) {

				uniforms[ "uOpacity" ].value = m.parameters.opacity;

			}

			var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: true };

			material = new THREE.ShaderMaterial( parameters );

		} else {

			material = new THREE[ m.type ]( m.parameters );

		}

		result.materials[ dm ] = material;

	}

	// second pass through all materials to initialize MeshFaceMaterials
	// that could be referring to other materials out of order

	for ( dm in data.materials ) {

		m = data.materials[ dm ];

		if ( m.parameters.materials ) {

			var materialArray = [];

			for ( var i = 0; i < m.parameters.materials.length; i ++ ) {

				var label = m.parameters.materials[ i ];
				materialArray.push( result.materials[ label ] );

			}

			result.materials[ dm ].materials = materialArray;

		}

	}

	// objects ( synchronous init of procedural primitives )

	handle_objects();

	// defaults

	if ( result.cameras && data.defaults.camera ) {

		result.currentCamera = result.cameras[ data.defaults.camera ];

	}

	if ( result.fogs && data.defaults.fog ) {

		result.scene.fog = result.fogs[ data.defaults.fog ];

	}

	c = data.defaults.bgcolor;
	result.bgColor = new THREE.Color();
	result.bgColor.setRGB( c[0], c[1], c[2] );

	result.bgColorAlpha = data.defaults.bgalpha;

	// synchronous callback

	scope.callbackSync( result );

	// just in case there are no async elements

	async_callback_gate();

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.TextureLoader = function () {

	THREE.EventTarget.call( this );

	this.crossOrigin = null;

};

THREE.TextureLoader.prototype = {

	constructor: THREE.TextureLoader,

	load: function ( url ) {

		var scope = this;

		var image = new Image();

		image.addEventListener( 'load', function () {

			var texture = new THREE.Texture( image );
			texture.needsUpdate = true;

			scope.dispatchEvent( { type: 'load', content: texture } );

		}, false );

		image.addEventListener( 'error', function () {

			scope.dispatchEvent( { type: 'error', message: 'Couldn\'t load URL [' + url + ']' } );

		}, false );

		if ( scope.crossOrigin ) image.crossOrigin = scope.crossOrigin;

		image.src = url;

	}

}
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Material = function () {

	THREE.MaterialLibrary.push( this );

	this.id = THREE.MaterialIdCount ++;

	this.name = '';

	this.side = THREE.FrontSide;

	this.opacity = 1;
	this.transparent = false;

	this.blending = THREE.NormalBlending;

	this.blendSrc = THREE.SrcAlphaFactor;
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = THREE.AddEquation;

	this.depthTest = true;
	this.depthWrite = true;

	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;

	this.alphaTest = 0;

	this.overdraw = false; // Boolean for fixing antialiasing gaps in CanvasRenderer

	this.visible = true;

	this.needsUpdate = true;

};

THREE.Material.prototype.setValues = function ( values ) {

	if ( values === undefined ) return;

	for ( var key in values ) {

		var newValue = values[ key ];

		if ( newValue === undefined ) {

			console.warn( 'THREE.Material: \'' + key + '\' parameter is undefined.' );
			continue;

		}

		if ( key in this ) {

			var currentValue = this[ key ];

			if ( currentValue instanceof THREE.Color && newValue instanceof THREE.Color ) {

				currentValue.copy( newValue );

			} else if ( currentValue instanceof THREE.Color && typeof( newValue ) === "number" ) {

				currentValue.setHex( newValue );

			} else if ( currentValue instanceof THREE.Vector3 && newValue instanceof THREE.Vector3 ) {

				currentValue.copy( newValue );

			} else {

				this[ key ] = newValue;

			}

		}

	}

};

THREE.Material.prototype.clone = function ( material ) {

	if ( material === undefined ) material = new THREE.Material();

	material.name = this.name;

	material.side = this.side;

	material.opacity = this.opacity;
	material.transparent = this.transparent;

	material.blending = this.blending;

	material.blendSrc = this.blendSrc;
	material.blendDst = this.blendDst;
	material.blendEquation = this.blendEquation;

	material.depthTest = this.depthTest;
	material.depthWrite = this.depthWrite;

	material.polygonOffset = this.polygonOffset;
	material.polygonOffsetFactor = this.polygonOffsetFactor;
	material.polygonOffsetUnits = this.polygonOffsetUnits;

	material.alphaTest = this.alphaTest;

	material.overdraw = this.overdraw;

	material.visible = this.visible;

	return material;

};

THREE.Material.prototype.deallocate = function () {

	var index = THREE.MaterialLibrary.indexOf( this );
	if ( index !== -1 ) THREE.MaterialLibrary.splice( index, 1 );

};

THREE.MaterialIdCount = 0;
THREE.MaterialLibrary = [];
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round",
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */

THREE.LineBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.color = new THREE.Color( 0xffffff );

	this.linewidth = 1;
	this.linecap = 'round';
	this.linejoin = 'round';

	this.vertexColors = false;

	this.fog = true;

	this.setValues( parameters );

};

THREE.LineBasicMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.LineBasicMaterial.prototype.clone = function () {

	var material = new THREE.LineBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.linewidth = this.linewidth;
	material.linecap = this.linecap;
	material.linejoin = this.linejoin;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  linewidth: <float>,
 *
 *  scale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */

THREE.LineDashedMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.color = new THREE.Color( 0xffffff );

	this.linewidth = 1;

	this.scale = 1;
	this.dashSize = 3;
	this.gapSize = 1;

	this.vertexColors = false;

	this.fog = true;

	this.setValues( parameters );

};

THREE.LineDashedMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.LineDashedMaterial.prototype.clone = function () {

	var material = new THREE.LineDashedMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.linewidth = this.linewidth;

	material.scale = this.scale;
	material.dashSize = this.dashSize;
	material.gapSize = this.gapSize;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *
 *  fog: <bool>
 * }
 */

THREE.MeshBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.color = new THREE.Color( 0xffffff ); // emissive

	this.map = null;

	this.lightMap = null;

	this.specularMap = null;

	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;

	this.fog = true;

	this.shading = THREE.SmoothShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.vertexColors = THREE.NoColors;

	this.skinning = false;
	this.morphTargets = false;

	this.setValues( parameters );

};

THREE.MeshBasicMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshBasicMaterial.prototype.clone = function () {

	var material = new THREE.MeshBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.specularMap = this.specularMap;

	material.envMap = this.envMap;
	material.combine = this.combine;
	material.reflectivity = this.reflectivity;
	material.refractionRatio = this.refractionRatio;

	material.fog = this.fog;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;
	material.wireframeLinecap = this.wireframeLinecap;
	material.wireframeLinejoin = this.wireframeLinejoin;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;
	material.morphTargets = this.morphTargets;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.MeshLambertMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.color = new THREE.Color( 0xffffff ); // diffuse
	this.ambient = new THREE.Color( 0xffffff );
	this.emissive = new THREE.Color( 0x000000 );

	this.wrapAround = false;
	this.wrapRGB = new THREE.Vector3( 1, 1, 1 );

	this.map = null;

	this.lightMap = null;

	this.specularMap = null;

	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;

	this.fog = true;

	this.shading = THREE.SmoothShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.vertexColors = THREE.NoColors;

	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;

	this.setValues( parameters );

};

THREE.MeshLambertMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshLambertMaterial.prototype.clone = function () {

	var material = new THREE.MeshLambertMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.ambient.copy( this.ambient );
	material.emissive.copy( this.emissive );

	material.wrapAround = this.wrapAround;
	material.wrapRGB.copy( this.wrapRGB );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.specularMap = this.specularMap;

	material.envMap = this.envMap;
	material.combine = this.combine;
	material.reflectivity = this.reflectivity;
	material.refractionRatio = this.refractionRatio;

	material.fog = this.fog;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;
	material.wireframeLinecap = this.wireframeLinecap;
	material.wireframeLinejoin = this.wireframeLinejoin;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;
	material.morphTargets = this.morphTargets;
	material.morphNormals = this.morphNormals;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalScale: <Vector2>,
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.MeshPhongMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.color = new THREE.Color( 0xffffff ); // diffuse
	this.ambient = new THREE.Color( 0xffffff );
	this.emissive = new THREE.Color( 0x000000 );
	this.specular = new THREE.Color( 0x111111 );
	this.shininess = 30;

	this.metal = false;
	this.perPixel = true;

	this.wrapAround = false;
	this.wrapRGB = new THREE.Vector3( 1, 1, 1 );

	this.map = null;

	this.lightMap = null;

	this.bumpMap = null;
	this.bumpScale = 1;

	this.normalMap = null;
	this.normalScale = new THREE.Vector2( 1, 1 );

	this.specularMap = null;

	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;

	this.fog = true;

	this.shading = THREE.SmoothShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.vertexColors = THREE.NoColors;

	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;

	this.setValues( parameters );

};

THREE.MeshPhongMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshPhongMaterial.prototype.clone = function () {

	var material = new THREE.MeshPhongMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.ambient.copy( this.ambient );
	material.emissive.copy( this.emissive );
	material.specular.copy( this.specular );
	material.shininess = this.shininess;

	material.metal = this.metal;
	material.perPixel = this.perPixel;

	material.wrapAround = this.wrapAround;
	material.wrapRGB.copy( this.wrapRGB );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.bumpMap = this.bumpMap;
	material.bumpScale = this.bumpScale;

	material.normalMap = this.normalMap;
	material.normalScale.copy( this.normalScale );

	material.specularMap = this.specularMap;

	material.envMap = this.envMap;
	material.combine = this.combine;
	material.reflectivity = this.reflectivity;
	material.refractionRatio = this.refractionRatio;

	material.fog = this.fog;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;
	material.wireframeLinecap = this.wireframeLinecap;
	material.wireframeLinejoin = this.wireframeLinejoin;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;
	material.morphTargets = this.morphTargets;
	material.morphNormals = this.morphNormals;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  opacity: <float>,

 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,

 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */

THREE.MeshDepthMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.setValues( parameters );

};

THREE.MeshDepthMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshDepthMaterial.prototype.clone = function () {

	var material = new THREE.LineBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  opacity: <float>,

 *  shading: THREE.FlatShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,

 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */

THREE.MeshNormalMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	this.shading = THREE.FlatShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.setValues( parameters );

};

THREE.MeshNormalMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshNormalMaterial.prototype.clone = function () {

	var material = new THREE.MeshNormalMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.MeshFaceMaterial = function ( materials ) {

	this.materials = materials instanceof Array ? materials : [];

};

THREE.MeshFaceMaterial.prototype.clone = function () {

	return new THREE.MeshFaceMaterial( this.materials.slice( 0 ) );

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  vertexColors: <bool>,
 *
 *  fog: <bool>
 * }
 */

THREE.ParticleBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.color = new THREE.Color( 0xffffff );

	this.map = null;

	this.size = 1;
	this.sizeAttenuation = true;

	this.vertexColors = false;

	this.fog = true;

	this.setValues( parameters );

};

THREE.ParticleBasicMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.ParticleBasicMaterial.prototype.clone = function () {

	var material = new THREE.ParticleBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.map = this.map;

	material.size = this.size;
	material.sizeAttenuation = this.sizeAttenuation;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  color: <hex>,
 *  program: <function>,
 *  opacity: <float>,
 *  blending: THREE.NormalBlending
 * }
 */

THREE.ParticleCanvasMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.color = new THREE.Color( 0xffffff );
	this.program = function ( context, color ) {};

	this.setValues( parameters );

};

THREE.ParticleCanvasMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.ParticleCanvasMaterial.prototype.clone = function () {

	var material = new THREE.ParticleCanvasMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.program = this.program;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ParticleDOMMaterial = function ( element ) {

	this.element = element;

};

THREE.ParticleDOMMaterial.prototype.clone = function(){

	return new THREE.ParticleDOMMaterial( this.element );

};
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  fragmentShader: <string>,
 *  vertexShader: <string>,
 *
 *  uniforms: { "parameter1": { type: "f", value: 1.0 }, "parameter2": { type: "i" value2: 2 } },
 *
 *  defines: { "label" : "value" },
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  lights: <bool>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.ShaderMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.fragmentShader = "void main() {}";
	this.vertexShader = "void main() {}";
	this.uniforms = {};
	this.defines = {};
	this.attributes = null;

	this.shading = THREE.SmoothShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.fog = false; // set to use scene fog

	this.lights = false; // set to use scene lights

	this.vertexColors = THREE.NoColors; // set to use "color" attribute stream

	this.skinning = false; // set to use skinning attribute streams

	this.morphTargets = false; // set to use morph targets
	this.morphNormals = false; // set to use morph normals

	this.setValues( parameters );

};

THREE.ShaderMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.ShaderMaterial.prototype.clone = function () {

	var material = new THREE.ShaderMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.fragmentShader = this.fragmentShader;
	material.vertexShader = this.vertexShader;

	material.uniforms = THREE.UniformsUtils.clone( this.uniforms );

	material.attributes = this.attributes;
	material.defines = this.defines;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	material.fog = this.fog;

	material.lights = this.lights;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;

	material.morphTargets = this.morphTargets;
	material.morphNormals = this.morphNormals;

	return material;

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	THREE.TextureLibrary.push( this );

	this.id = THREE.TextureIdCount ++;

	this.name = '';

	this.image = image;

	this.mapping = mapping !== undefined ? mapping : new THREE.UVMapping();

	this.wrapS = wrapS !== undefined ? wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = wrapT !== undefined ? wrapT : THREE.ClampToEdgeWrapping;

	this.magFilter = magFilter !== undefined ? magFilter : THREE.LinearFilter;
	this.minFilter = minFilter !== undefined ? minFilter : THREE.LinearMipMapLinearFilter;

	this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

	this.format = format !== undefined ? format : THREE.RGBAFormat;
	this.type = type !== undefined ? type : THREE.UnsignedByteType;

	this.offset = new THREE.Vector2( 0, 0 );
	this.repeat = new THREE.Vector2( 1, 1 );

	this.generateMipmaps = true;
	this.premultiplyAlpha = false;
	this.flipY = true;

	this.needsUpdate = false;
	this.onUpdate = null;

};

THREE.Texture.prototype = {

	constructor: THREE.Texture,

	clone: function () {

		var texture = new THREE.Texture();

		texture.image = this.image;

		texture.mapping = this.mapping;

		texture.wrapS = this.wrapS;
		texture.wrapT = this.wrapT;

		texture.magFilter = this.magFilter;
		texture.minFilter = this.minFilter;

		texture.anisotropy = this.anisotropy;

		texture.format = this.format;
		texture.type = this.type;

		texture.offset.copy( this.offset );
		texture.repeat.copy( this.repeat );

		texture.generateMipmaps = this.generateMipmaps;
		texture.premultiplyAlpha = this.premultiplyAlpha;
		texture.flipY = this.flipY;

		return texture;

	},

	deallocate: function () {

		var index = THREE.TextureLibrary.indexOf( this );
		if ( index !== -1 ) THREE.TextureLibrary.splice( index, 1 );

	}

};

THREE.TextureIdCount = 0;
THREE.TextureLibrary = [];
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.CompressedTexture = function ( mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter ) {

	THREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type );

	this.image = { width: width, height: height };
	this.mipmaps = mipmaps;

};

THREE.CompressedTexture.prototype = Object.create( THREE.Texture.prototype );

THREE.CompressedTexture.prototype.clone = function () {

	var texture = new THREE.CompressedTexture();

	texture.image = this.image;
	texture.mipmaps = this.mipmaps;

	texture.format = this.format;
	texture.type = this.type;

	texture.mapping = this.mapping;

	texture.wrapS = this.wrapS;
	texture.wrapT = this.wrapT;

	texture.magFilter = this.magFilter;
	texture.minFilter = this.minFilter;

	texture.anisotropy = this.anisotropy;

	texture.offset.copy( this.offset );
	texture.repeat.copy( this.repeat );

	return texture;

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.DataTexture = function ( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter ) {

	THREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type );

	this.image = { data: data, width: width, height: height };

};

THREE.DataTexture.prototype = Object.create( THREE.Texture.prototype );

THREE.DataTexture.prototype.clone = function () {

	var clonedTexture = new THREE.DataTexture( this.image.data,  this.image.width, this.image.height, this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter );

	clonedTexture.offset.copy( this.offset );
	clonedTexture.repeat.copy( this.repeat );

	return clonedTexture;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Particle = function ( material ) {

	THREE.Object3D.call( this );

	this.material = material;

};

THREE.Particle.prototype = Object.create( THREE.Object3D.prototype );

THREE.Particle.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Particle( this.material );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ParticleSystem = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = ( material !== undefined ) ? material : new THREE.ParticleBasicMaterial( { color: Math.random() * 0xffffff } );

	this.sortParticles = false;

	if ( this.geometry ) {

		// calc bound radius

		if( this.geometry.boundingSphere === null ) {

			this.geometry.computeBoundingSphere();

		}

		this.boundRadius = geometry.boundingSphere.radius;

	}

	this.frustumCulled = false;

};

THREE.ParticleSystem.prototype = Object.create( THREE.Object3D.prototype );

THREE.ParticleSystem.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.ParticleSystem( this.geometry, this.material );
	object.sortParticles = this.sortParticles;

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Line = function ( geometry, material, type ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = ( material !== undefined ) ? material : new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );
	this.type = ( type !== undefined ) ? type : THREE.LineStrip;

	if ( this.geometry ) {

		if ( ! this.geometry.boundingSphere ) {

			this.geometry.computeBoundingSphere();

		}

	}

};

THREE.LineStrip = 0;
THREE.LinePieces = 1;

THREE.Line.prototype = Object.create( THREE.Object3D.prototype );

THREE.Line.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Line( this.geometry, this.material, this.type );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Mesh = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = ( material !== undefined ) ? material : new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );

	if ( this.geometry ) {

		// calc bound radius

		if ( this.geometry.boundingSphere === null ) {

			this.geometry.computeBoundingSphere();

		}

		this.boundRadius = geometry.boundingSphere.radius;


		// setup morph targets

		if ( this.geometry.morphTargets.length ) {

			this.morphTargetBase = -1;
			this.morphTargetForcedOrder = [];
			this.morphTargetInfluences = [];
			this.morphTargetDictionary = {};

			for( var m = 0; m < this.geometry.morphTargets.length; m ++ ) {

				this.morphTargetInfluences.push( 0 );
				this.morphTargetDictionary[ this.geometry.morphTargets[ m ].name ] = m;

			}

		}

	}

}

THREE.Mesh.prototype = Object.create( THREE.Object3D.prototype );

THREE.Mesh.prototype.getMorphTargetIndexByName = function ( name ) {

	if ( this.morphTargetDictionary[ name ] !== undefined ) {

		return this.morphTargetDictionary[ name ];

	}

	console.log( "THREE.Mesh.getMorphTargetIndexByName: morph target " + name + " does not exist. Returning 0." );

	return 0;

};

THREE.Mesh.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Mesh( this.geometry, this.material );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Bone = function( belongsToSkin ) {

	THREE.Object3D.call( this );

	this.skin = belongsToSkin;
	this.skinMatrix = new THREE.Matrix4();

};

THREE.Bone.prototype = Object.create( THREE.Object3D.prototype );

THREE.Bone.prototype.update = function( parentSkinMatrix, forceUpdate ) {

	// update local

	if ( this.matrixAutoUpdate ) {

		forceUpdate |= this.updateMatrix();

	}

	// update skin matrix

	if ( forceUpdate || this.matrixWorldNeedsUpdate ) {

		if( parentSkinMatrix ) {

			this.skinMatrix.multiply( parentSkinMatrix, this.matrix );

		} else {

			this.skinMatrix.copy( this.matrix );

		}

		this.matrixWorldNeedsUpdate = false;
		forceUpdate = true;

	}

	// update children

	var child, i, l = this.children.length;

	for ( i = 0; i < l; i ++ ) {

		this.children[ i ].update( this.skinMatrix, forceUpdate );

	}

};

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SkinnedMesh = function ( geometry, material, useVertexTexture ) {

	THREE.Mesh.call( this, geometry, material );

	//

	this.useVertexTexture = useVertexTexture !== undefined ? useVertexTexture : true;

	// init bones

	this.identityMatrix = new THREE.Matrix4();

	this.bones = [];
	this.boneMatrices = [];

	var b, bone, gbone, p, q, s;

	if ( this.geometry && this.geometry.bones !== undefined ) {

		for ( b = 0; b < this.geometry.bones.length; b ++ ) {

			gbone = this.geometry.bones[ b ];

			p = gbone.pos;
			q = gbone.rotq;
			s = gbone.scl;

			bone = this.addBone();

			bone.name = gbone.name;
			bone.position.set( p[0], p[1], p[2] );
			bone.quaternion.set( q[0], q[1], q[2], q[3] );
			bone.useQuaternion = true;

			if ( s !== undefined ) {

				bone.scale.set( s[0], s[1], s[2] );

			} else {

				bone.scale.set( 1, 1, 1 );

			}

		}

		for ( b = 0; b < this.bones.length; b ++ ) {

			gbone = this.geometry.bones[ b ];
			bone = this.bones[ b ];

			if ( gbone.parent === -1 ) {

				this.add( bone );

			} else {

				this.bones[ gbone.parent ].add( bone );

			}

		}

		//

		var nBones = this.bones.length;

		if ( this.useVertexTexture ) {

			// layout (1 matrix = 4 pixels)
			//	RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
			//  with  8x8  pixel texture max   16 bones  (8 * 8  / 4)
			//  	 16x16 pixel texture max   64 bones (16 * 16 / 4)
			//  	 32x32 pixel texture max  256 bones (32 * 32 / 4)
			//  	 64x64 pixel texture max 1024 bones (64 * 64 / 4)

			var size;

			if ( nBones > 256 )
				size = 64;
			else if ( nBones > 64 )
				size = 32;
			else if ( nBones > 16 )
				size = 16;
			else
				size = 8;

			this.boneTextureWidth = size;
			this.boneTextureHeight = size;

			this.boneMatrices = new Float32Array( this.boneTextureWidth * this.boneTextureHeight * 4 ); // 4 floats per RGBA pixel
			this.boneTexture = new THREE.DataTexture( this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType );
			this.boneTexture.minFilter = THREE.NearestFilter;
			this.boneTexture.magFilter = THREE.NearestFilter;
			this.boneTexture.generateMipmaps = false;
			this.boneTexture.flipY = false;

		} else {

			this.boneMatrices = new Float32Array( 16 * nBones );

		}

		this.pose();

	}

};

THREE.SkinnedMesh.prototype = Object.create( THREE.Mesh.prototype );

THREE.SkinnedMesh.prototype.addBone = function( bone ) {

	if ( bone === undefined ) {

		bone = new THREE.Bone( this );

	}

	this.bones.push( bone );

	return bone;

};

THREE.SkinnedMesh.prototype.updateMatrixWorld = function ( force ) {

	this.matrixAutoUpdate && this.updateMatrix();

	// update matrixWorld

	if ( this.matrixWorldNeedsUpdate || force ) {

		if ( this.parent ) {

			this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );

		} else {

			this.matrixWorld.copy( this.matrix );

		}

		this.matrixWorldNeedsUpdate = false;

		force = true;

	}

	// update children

	for ( var i = 0, l = this.children.length; i < l; i ++ ) {

		var child = this.children[ i ];

		if ( child instanceof THREE.Bone ) {

			child.update( this.identityMatrix, false );

		} else {

			child.updateMatrixWorld( true );

		}

	}

	// make a snapshot of the bones' rest position

	if ( this.boneInverses == undefined ) {

		this.boneInverses = [];

		for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

			var inverse = new THREE.Matrix4();

			inverse.getInverse( this.bones[ b ].skinMatrix );

			this.boneInverses.push( inverse );

		}

	}

	// flatten bone matrices to array

	for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

		// compute the offset between the current and the original transform;

		//TODO: we could get rid of this multiplication step if the skinMatrix
		// was already representing the offset; however, this requires some
		// major changes to the animation system

		THREE.SkinnedMesh.offsetMatrix.multiply( this.bones[ b ].skinMatrix, this.boneInverses[ b ] );

		THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset( this.boneMatrices, b * 16 );

	}

	if ( this.useVertexTexture ) {

		this.boneTexture.needsUpdate = true;

	}

};

THREE.SkinnedMesh.prototype.pose = function() {

	this.updateMatrixWorld( true );

	for ( var i = 0; i < this.geometry.skinIndices.length; i ++ ) {

		// normalize weights

		var sw = this.geometry.skinWeights[ i ];

		var scale = 1.0 / sw.lengthManhattan();

		if ( scale !== Infinity ) {

			sw.multiplyScalar( scale );

		} else {

			sw.set( 1 ); // this will be normalized by the shader anyway

		}

	}

};

THREE.SkinnedMesh.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.SkinnedMesh( this.geometry, this.material, this.useVertexTexture );

	THREE.Mesh.prototype.clone.call( this, object );

	return object;

};

THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4();
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MorphAnimMesh = function ( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );

	// API

	this.duration = 1000; // milliseconds
	this.mirroredLoop = false;
	this.time = 0;

	// internals

	this.lastKeyframe = 0;
	this.currentKeyframe = 0;

	this.direction = 1;
	this.directionBackwards = false;

	this.setFrameRange( 0, this.geometry.morphTargets.length - 1 );

};

THREE.MorphAnimMesh.prototype = Object.create( THREE.Mesh.prototype );

THREE.MorphAnimMesh.prototype.setFrameRange = function ( start, end ) {

	this.startKeyframe = start;
	this.endKeyframe = end;

	this.length = this.endKeyframe - this.startKeyframe + 1;

};

THREE.MorphAnimMesh.prototype.setDirectionForward = function () {

	this.direction = 1;
	this.directionBackwards = false;

};

THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {

	this.direction = -1;
	this.directionBackwards = true;

};

THREE.MorphAnimMesh.prototype.parseAnimations = function () {

	var geometry = this.geometry;

	if ( ! geometry.animations ) geometry.animations = {};

	var firstAnimation, animations = geometry.animations;

	var pattern = /([a-z]+)(\d+)/;

	for ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {

		var morph = geometry.morphTargets[ i ];
		var parts = morph.name.match( pattern );

		if ( parts && parts.length > 1 ) {

			var label = parts[ 1 ];
			var num = parts[ 2 ];

			if ( ! animations[ label ] ) animations[ label ] = { start: Infinity, end: -Infinity };

			var animation = animations[ label ];

			if ( i < animation.start ) animation.start = i;
			if ( i > animation.end ) animation.end = i;

			if ( ! firstAnimation ) firstAnimation = label;

		}

	}

	geometry.firstAnimation = firstAnimation;

};

THREE.MorphAnimMesh.prototype.setAnimationLabel = function ( label, start, end ) {

	if ( ! this.geometry.animations ) this.geometry.animations = {};

	this.geometry.animations[ label ] = { start: start, end: end };

};

THREE.MorphAnimMesh.prototype.playAnimation = function ( label, fps ) {

	var animation = this.geometry.animations[ label ];

	if ( animation ) {

		this.setFrameRange( animation.start, animation.end );
		this.duration = 1000 * ( ( animation.end - animation.start ) / fps );
		this.time = 0;

	} else {

		console.warn( "animation[" + label + "] undefined" );

	}

};

THREE.MorphAnimMesh.prototype.updateAnimation = function ( delta ) {

	var frameTime = this.duration / this.length;

	this.time += this.direction * delta;

	if ( this.mirroredLoop ) {

		if ( this.time > this.duration || this.time < 0 ) {

			this.direction *= -1;

			if ( this.time > this.duration ) {

				this.time = this.duration;
				this.directionBackwards = true;

			}

			if ( this.time < 0 ) {

				this.time = 0;
				this.directionBackwards = false;

			}

		}

	} else {

		this.time = this.time % this.duration;

		if ( this.time < 0 ) this.time += this.duration;

	}

	var keyframe = this.startKeyframe + THREE.Math.clamp( Math.floor( this.time / frameTime ), 0, this.length - 1 );

	if ( keyframe !== this.currentKeyframe ) {

		this.morphTargetInfluences[ this.lastKeyframe ] = 0;
		this.morphTargetInfluences[ this.currentKeyframe ] = 1;

		this.morphTargetInfluences[ keyframe ] = 0;

		this.lastKeyframe = this.currentKeyframe;
		this.currentKeyframe = keyframe;

	}

	var mix = ( this.time % frameTime ) / frameTime;

	if ( this.directionBackwards ) {

		mix = 1 - mix;

	}

	this.morphTargetInfluences[ this.currentKeyframe ] = mix;
	this.morphTargetInfluences[ this.lastKeyframe ] = 1 - mix;

};

THREE.MorphAnimMesh.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.MorphAnimMesh( this.geometry, this.material );

	object.duration = this.duration;
	object.mirroredLoop = this.mirroredLoop;
	object.time = this.time;

	object.lastKeyframe = this.lastKeyframe;
	object.currentKeyframe = this.currentKeyframe;

	object.direction = this.direction;
	object.directionBackwards = this.directionBackwards;

	THREE.Mesh.prototype.clone.call( this, object );

	return object;

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Ribbon = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = material;

};

THREE.Ribbon.prototype = Object.create( THREE.Object3D.prototype );

THREE.Ribbon.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Ribbon( this.geometry, this.material );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.LOD = function () {

	THREE.Object3D.call( this );

	this.LODs = [];

};


THREE.LOD.prototype = Object.create( THREE.Object3D.prototype );

THREE.LOD.prototype.addLevel = function ( object3D, visibleAtDistance ) {

	if ( visibleAtDistance === undefined ) {

		visibleAtDistance = 0;

	}

	visibleAtDistance = Math.abs( visibleAtDistance );

	for ( var l = 0; l < this.LODs.length; l ++ ) {

		if ( visibleAtDistance < this.LODs[ l ].visibleAtDistance ) {

			break;

		}

	}

	this.LODs.splice( l, 0, { visibleAtDistance: visibleAtDistance, object3D: object3D } );
	this.add( object3D );

};

THREE.LOD.prototype.update = function ( camera ) {

	if ( this.LODs.length > 1 ) {

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		var inverse  = camera.matrixWorldInverse;
		var distance = -( inverse.elements[2] * this.matrixWorld.elements[12] + inverse.elements[6] * this.matrixWorld.elements[13] + inverse.elements[10] * this.matrixWorld.elements[14] + inverse.elements[14] );

		this.LODs[ 0 ].object3D.visible = true;

		for ( var l = 1; l < this.LODs.length; l ++ ) {

			if( distance >= this.LODs[ l ].visibleAtDistance ) {

				this.LODs[ l - 1 ].object3D.visible = false;
				this.LODs[ l     ].object3D.visible = true;

			} else {

				break;

			}

		}

		for( ; l < this.LODs.length; l ++ ) {

			this.LODs[ l ].object3D.visible = false;

		}

	}

};

THREE.LOD.prototype.clone = function () {

	// TODO

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Sprite = function ( parameters ) {

	THREE.Object3D.call( this );

	parameters = parameters || {};

	this.color = ( parameters.color !== undefined ) ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );
	this.map = ( parameters.map !== undefined ) ? parameters.map : new THREE.Texture();

	this.blending = ( parameters.blending !== undefined ) ? parameters.blending : THREE.NormalBlending;

	this.blendSrc = parameters.blendSrc !== undefined ? parameters.blendSrc : THREE.SrcAlphaFactor;
	this.blendDst = parameters.blendDst !== undefined ? parameters.blendDst : THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = parameters.blendEquation !== undefined ? parameters.blendEquation : THREE.AddEquation;

	this.useScreenCoordinates = ( parameters.useScreenCoordinates !== undefined ) ? parameters.useScreenCoordinates : true;
	this.mergeWith3D = ( parameters.mergeWith3D !== undefined ) ? parameters.mergeWith3D : !this.useScreenCoordinates;
	this.affectedByDistance = ( parameters.affectedByDistance !== undefined ) ? parameters.affectedByDistance : !this.useScreenCoordinates;
	this.scaleByViewport = ( parameters.scaleByViewport !== undefined ) ? parameters.scaleByViewport : !this.affectedByDistance;
	this.alignment = ( parameters.alignment instanceof THREE.Vector2 ) ? parameters.alignment : THREE.SpriteAlignment.center.clone();

	this.fog = ( parameters.fog !== undefined ) ? parameters.fog : false;

	this.rotation3d = this.rotation;
	this.rotation = 0;
	this.opacity = 1;

	this.uvOffset = new THREE.Vector2( 0, 0 );
	this.uvScale  = new THREE.Vector2( 1, 1 );

};

THREE.Sprite.prototype = Object.create( THREE.Object3D.prototype );

/*
 * Custom update matrix
 */

THREE.Sprite.prototype.updateMatrix = function () {

	this.matrix.setPosition( this.position );

	this.rotation3d.set( 0, 0, this.rotation );
	this.matrix.setRotationFromEuler( this.rotation3d );

	if ( this.scale.x !== 1 || this.scale.y !== 1 ) {

		this.matrix.scale( this.scale );
		this.boundRadiusScale = Math.max( this.scale.x, this.scale.y );

	}

	this.matrixWorldNeedsUpdate = true;

};

THREE.Sprite.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Sprite( {} );

	object.color.copy( this.color );
	object.map = this.map;
	object.blending = this.blending;

	object.useScreenCoordinates = this.useScreenCoordinates;
	object.mergeWith3D = this.mergeWith3D;
	object.affectedByDistance = this.affectedByDistance;
	object.scaleByViewport = this.scaleByViewport;
	object.alignment = this.alignment;

	object.fog = this.fog;

	object.rotation3d.copy( this.rotation3d );
	object.rotation = this.rotation;
	object.opacity = this.opacity;

	object.uvOffset.copy( this.uvOffset );
	object.uvScale.copy( this.uvScale);

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};

/*
 * Alignment
 */

THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2( 1, -1 );
THREE.SpriteAlignment.topCenter = new THREE.Vector2( 0, -1 );
THREE.SpriteAlignment.topRight = new THREE.Vector2( -1, -1 );
THREE.SpriteAlignment.centerLeft = new THREE.Vector2( 1, 0 );
THREE.SpriteAlignment.center = new THREE.Vector2( 0, 0 );
THREE.SpriteAlignment.centerRight = new THREE.Vector2( -1, 0 );
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2( 1, 1 );
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2( 0, 1 );
THREE.SpriteAlignment.bottomRight = new THREE.Vector2( -1, 1 );
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Scene = function () {

	THREE.Object3D.call( this );

	this.fog = null;
	this.overrideMaterial = null;

	this.matrixAutoUpdate = false;

	this.__objects = [];
	this.__lights = [];

	this.__objectsAdded = [];
	this.__objectsRemoved = [];

};

THREE.Scene.prototype = Object.create( THREE.Object3D.prototype );

THREE.Scene.prototype.__addObject = function ( object ) {

	if ( object instanceof THREE.Light ) {

		if ( this.__lights.indexOf( object ) === - 1 ) {

			this.__lights.push( object );

		}

		if ( object.target && object.target.parent === undefined ) {

			this.add( object.target );

		}

	} else if ( !( object instanceof THREE.Camera || object instanceof THREE.Bone ) ) {

		if ( this.__objects.indexOf( object ) === - 1 ) {

			this.__objects.push( object );
			this.__objectsAdded.push( object );

			// check if previously removed

			var i = this.__objectsRemoved.indexOf( object );

			if ( i !== -1 ) {

				this.__objectsRemoved.splice( i, 1 );

			}

		}

	}

	for ( var c = 0; c < object.children.length; c ++ ) {

		this.__addObject( object.children[ c ] );

	}

};

THREE.Scene.prototype.__removeObject = function ( object ) {

	if ( object instanceof THREE.Light ) {

		var i = this.__lights.indexOf( object );

		if ( i !== -1 ) {

			this.__lights.splice( i, 1 );

		}

	} else if ( !( object instanceof THREE.Camera ) ) {

		var i = this.__objects.indexOf( object );

		if( i !== -1 ) {

			this.__objects.splice( i, 1 );
			this.__objectsRemoved.push( object );

			// check if previously added

			var ai = this.__objectsAdded.indexOf( object );

			if ( ai !== -1 ) {

				this.__objectsAdded.splice( ai, 1 );

			}

		}

	}

	for ( var c = 0; c < object.children.length; c ++ ) {

		this.__removeObject( object.children[ c ] );

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Fog = function ( hex, near, far ) {

	this.name = '';

	this.color = new THREE.Color( hex );

	this.near = ( near !== undefined ) ? near : 1;
	this.far = ( far !== undefined ) ? far : 1000;

};

THREE.Fog.prototype.clone = function () {

	return new THREE.Fog( this.color.getHex(), this.near, this.far );

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.FogExp2 = function ( hex, density ) {

	this.name = '';
	this.color = new THREE.Color( hex );
	this.density = ( density !== undefined ) ? density : 0.00025;

};

THREE.FogExp2.prototype.clone = function () {

	return new THREE.FogExp2( this.color.getHex(), this.density );

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.CanvasRenderer = function ( parameters ) {

	console.log( 'THREE.CanvasRenderer', THREE.REVISION );

	parameters = parameters || {};

	var _this = this,
	_renderData, _elements, _lights,
	_projector = new THREE.Projector(),

	_canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' ),

	_canvasWidth, _canvasHeight, _canvasWidthHalf, _canvasHeightHalf,
	_context = _canvas.getContext( '2d' ),

	_clearColor = new THREE.Color( 0x000000 ),
	_clearOpacity = 0,

	_contextGlobalAlpha = 1,
	_contextGlobalCompositeOperation = 0,
	_contextStrokeStyle = null,
	_contextFillStyle = null,
	_contextLineWidth = null,
	_contextLineCap = null,
	_contextLineJoin = null,

	_v1, _v2, _v3, _v4,
	_v5 = new THREE.RenderableVertex(),
	_v6 = new THREE.RenderableVertex(),

	_v1x, _v1y, _v2x, _v2y, _v3x, _v3y,
	_v4x, _v4y, _v5x, _v5y, _v6x, _v6y,

	_color = new THREE.Color(),
	_color1 = new THREE.Color(),
	_color2 = new THREE.Color(),
	_color3 = new THREE.Color(),
	_color4 = new THREE.Color(),

	_diffuseColor = new THREE.Color(),
	_emissiveColor = new THREE.Color(),

	_patterns = {}, _imagedatas = {},

	_near, _far,

	_image, _uvs,
	_uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y,

	_clipRect = new THREE.Rectangle(),
	_clearRect = new THREE.Rectangle(),
	_bboxRect = new THREE.Rectangle(),

	_enableLighting = false,
	_ambientLight = new THREE.Color(),
	_directionalLights = new THREE.Color(),
	_pointLights = new THREE.Color(),

	_pi2 = Math.PI * 2,
	_vector3 = new THREE.Vector3(), // Needed for PointLight

	_pixelMap, _pixelMapContext, _pixelMapImage, _pixelMapData,
	_gradientMap, _gradientMapContext, _gradientMapQuality = 16;

	_pixelMap = document.createElement( 'canvas' );
	_pixelMap.width = _pixelMap.height = 2;

	_pixelMapContext = _pixelMap.getContext( '2d' );
	_pixelMapContext.fillStyle = 'rgba(0,0,0,1)';
	_pixelMapContext.fillRect( 0, 0, 2, 2 );

	_pixelMapImage = _pixelMapContext.getImageData( 0, 0, 2, 2 );
	_pixelMapData = _pixelMapImage.data;

	_gradientMap = document.createElement( 'canvas' );
	_gradientMap.width = _gradientMap.height = _gradientMapQuality;

	_gradientMapContext = _gradientMap.getContext( '2d' );
	_gradientMapContext.translate( - _gradientMapQuality / 2, - _gradientMapQuality / 2 );
	_gradientMapContext.scale( _gradientMapQuality, _gradientMapQuality );

	_gradientMapQuality --; // Fix UVs

	this.domElement = _canvas;

	this.autoClear = true;
	this.sortObjects = true;
	this.sortElements = true;

	this.info = {

		render: {

			vertices: 0,
			faces: 0

		}

	}

	this.setSize = function ( width, height ) {

		_canvasWidth = width;
		_canvasHeight = height;
		_canvasWidthHalf = Math.floor( _canvasWidth / 2 );
		_canvasHeightHalf = Math.floor( _canvasHeight / 2 );

		_canvas.width = _canvasWidth;
		_canvas.height = _canvasHeight;

		_clipRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );
		_clearRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );

		_contextGlobalAlpha = 1;
		_contextGlobalCompositeOperation = 0;
		_contextStrokeStyle = null;
		_contextFillStyle = null;
		_contextLineWidth = null;
		_contextLineCap = null;
		_contextLineJoin = null;

	};

	this.setClearColor = function ( color, opacity ) {

		_clearColor.copy( color );
		_clearOpacity = opacity !== undefined ? opacity : 1;

		_clearRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );

	};

	this.setClearColorHex = function ( hex, opacity ) {

		_clearColor.setHex( hex );
		_clearOpacity = opacity !== undefined ? opacity : 1;

		_clearRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );

	};

	this.getMaxAnisotropy  = function () {

		return 0;

	};

	this.clear = function () {

		_context.setTransform( 1, 0, 0, - 1, _canvasWidthHalf, _canvasHeightHalf );

		if ( _clearRect.isEmpty() === false ) {

			_clearRect.minSelf( _clipRect );
			_clearRect.inflate( 2 );

			if ( _clearOpacity < 1 ) {

				_context.clearRect( Math.floor( _clearRect.getX() ), Math.floor( _clearRect.getY() ), Math.floor( _clearRect.getWidth() ), Math.floor( _clearRect.getHeight() ) );

			}

			if ( _clearOpacity > 0 ) {

				setBlending( THREE.NormalBlending );
				setOpacity( 1 );

				setFillStyle( 'rgba(' + Math.floor( _clearColor.r * 255 ) + ',' + Math.floor( _clearColor.g * 255 ) + ',' + Math.floor( _clearColor.b * 255 ) + ',' + _clearOpacity + ')' );

				_context.fillRect( Math.floor( _clearRect.getX() ), Math.floor( _clearRect.getY() ), Math.floor( _clearRect.getWidth() ), Math.floor( _clearRect.getHeight() ) );

			}

			_clearRect.empty();

		}


	};

	this.render = function ( scene, camera ) {

		if ( camera instanceof THREE.Camera === false ) {

			console.error( 'THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.' );
			return;

		}

		var e, el, element, material;

		this.autoClear === true
			? this.clear()
			: _context.setTransform( 1, 0, 0, - 1, _canvasWidthHalf, _canvasHeightHalf );

		_this.info.render.vertices = 0;
		_this.info.render.faces = 0;

		_renderData = _projector.projectScene( scene, camera, this.sortObjects, this.sortElements );
		_elements = _renderData.elements;
		_lights = _renderData.lights;

		/* DEBUG
		_context.fillStyle = 'rgba( 0, 255, 255, 0.5 )';
		_context.fillRect( _clipRect.getX(), _clipRect.getY(), _clipRect.getWidth(), _clipRect.getHeight() );
		*/

		_enableLighting = _lights.length > 0;

		if ( _enableLighting === true ) {

			 calculateLights();

		}

		for ( e = 0, el = _elements.length; e < el; e++ ) {

			element = _elements[ e ];

			material = element.material;

			if ( material === undefined || material.visible === false ) continue;

			_bboxRect.empty();

			if ( element instanceof THREE.RenderableParticle ) {

				_v1 = element;
				_v1.x *= _canvasWidthHalf; _v1.y *= _canvasHeightHalf;

				renderParticle( _v1, element, material, scene );

			} else if ( element instanceof THREE.RenderableLine ) {

				_v1 = element.v1; _v2 = element.v2;

				_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;
				_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;

				_bboxRect.addPoint( _v1.positionScreen.x, _v1.positionScreen.y );
				_bboxRect.addPoint( _v2.positionScreen.x, _v2.positionScreen.y );

				if ( _clipRect.intersects( _bboxRect ) === true ) {

					renderLine( _v1, _v2, element, material, scene );

				}


			} else if ( element instanceof THREE.RenderableFace3 ) {

				_v1 = element.v1; _v2 = element.v2; _v3 = element.v3;

				_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;
				_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;
				_v3.positionScreen.x *= _canvasWidthHalf; _v3.positionScreen.y *= _canvasHeightHalf;

				if ( material.overdraw === true ) {

					expand( _v1.positionScreen, _v2.positionScreen );
					expand( _v2.positionScreen, _v3.positionScreen );
					expand( _v3.positionScreen, _v1.positionScreen );

				}

				_bboxRect.add3Points( _v1.positionScreen.x, _v1.positionScreen.y,
						      _v2.positionScreen.x, _v2.positionScreen.y,
						      _v3.positionScreen.x, _v3.positionScreen.y );

				if ( _clipRect.intersects( _bboxRect ) === true ) {

					renderFace3( _v1, _v2, _v3, 0, 1, 2, element, material, scene );

				}

			} else if ( element instanceof THREE.RenderableFace4 ) {

				_v1 = element.v1; _v2 = element.v2; _v3 = element.v3; _v4 = element.v4;

				_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;
				_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;
				_v3.positionScreen.x *= _canvasWidthHalf; _v3.positionScreen.y *= _canvasHeightHalf;
				_v4.positionScreen.x *= _canvasWidthHalf; _v4.positionScreen.y *= _canvasHeightHalf;

				_v5.positionScreen.copy( _v2.positionScreen );
				_v6.positionScreen.copy( _v4.positionScreen );

				if ( material.overdraw === true ) {

					expand( _v1.positionScreen, _v2.positionScreen );
					expand( _v2.positionScreen, _v4.positionScreen );
					expand( _v4.positionScreen, _v1.positionScreen );

					expand( _v3.positionScreen, _v5.positionScreen );
					expand( _v3.positionScreen, _v6.positionScreen );

				}

				_bboxRect.addPoint( _v1.positionScreen.x, _v1.positionScreen.y );
				_bboxRect.addPoint( _v2.positionScreen.x, _v2.positionScreen.y );
				_bboxRect.addPoint( _v3.positionScreen.x, _v3.positionScreen.y );
				_bboxRect.addPoint( _v4.positionScreen.x, _v4.positionScreen.y );

				if ( _clipRect.intersects( _bboxRect ) === true ) {

					renderFace4( _v1, _v2, _v3, _v4, _v5, _v6, element, material, scene );

				}

			}

			/* DEBUG
			_context.lineWidth = 1;
			_context.strokeStyle = 'rgba( 0, 255, 0, 0.5 )';
			_context.strokeRect( _bboxRect.getX(), _bboxRect.getY(), _bboxRect.getWidth(), _bboxRect.getHeight() );
			*/

			_clearRect.addRectangle( _bboxRect );


		}

		/* DEBUG
		_context.lineWidth = 1;
		_context.strokeStyle = 'rgba( 255, 0, 0, 0.5 )';
		_context.strokeRect( _clearRect.getX(), _clearRect.getY(), _clearRect.getWidth(), _clearRect.getHeight() );
		*/

		_context.setTransform( 1, 0, 0, 1, 0, 0 );

		//

		function calculateLights() {

			_ambientLight.setRGB( 0, 0, 0 );
			_directionalLights.setRGB( 0, 0, 0 );
			_pointLights.setRGB( 0, 0, 0 );

			for ( var l = 0, ll = _lights.length; l < ll; l ++ ) {

				var light = _lights[ l ];
				var lightColor = light.color;

				if ( light instanceof THREE.AmbientLight ) {

					_ambientLight.r += lightColor.r;
					_ambientLight.g += lightColor.g;
					_ambientLight.b += lightColor.b;

				} else if ( light instanceof THREE.DirectionalLight ) {

					// for particles

					_directionalLights.r += lightColor.r;
					_directionalLights.g += lightColor.g;
					_directionalLights.b += lightColor.b;

				} else if ( light instanceof THREE.PointLight ) {

					// for particles

					_pointLights.r += lightColor.r;
					_pointLights.g += lightColor.g;
					_pointLights.b += lightColor.b;

				}

			}

		}

		function calculateLight( position, normal, color ) {

			for ( var l = 0, ll = _lights.length; l < ll; l ++ ) {

				var light = _lights[ l ];
				var lightColor = light.color;

				if ( light instanceof THREE.DirectionalLight ) {

					var lightPosition = light.matrixWorld.getPosition().normalize();

					var amount = normal.dot( lightPosition );

					if ( amount <= 0 ) continue;

					amount *= light.intensity;

					color.r += lightColor.r * amount;
					color.g += lightColor.g * amount;
					color.b += lightColor.b * amount;

				} else if ( light instanceof THREE.PointLight ) {

					var lightPosition = light.matrixWorld.getPosition();

					var amount = normal.dot( _vector3.sub( lightPosition, position ).normalize() );

					if ( amount <= 0 ) continue;

					amount *= light.distance == 0 ? 1 : 1 - Math.min( position.distanceTo( lightPosition ) / light.distance, 1 );

					if ( amount == 0 ) continue;

					amount *= light.intensity;

					color.r += lightColor.r * amount;
					color.g += lightColor.g * amount;
					color.b += lightColor.b * amount;

				}

			}

		}

		function renderParticle( v1, element, material, scene ) {

			setOpacity( material.opacity );
			setBlending( material.blending );

			var width, height, scaleX, scaleY,
			bitmap, bitmapWidth, bitmapHeight;

			if ( material instanceof THREE.ParticleBasicMaterial ) {

				if ( material.map === null ) {

					scaleX = element.object.scale.x;
					scaleY = element.object.scale.y;

					// TODO: Be able to disable this

					scaleX *= element.scale.x * _canvasWidthHalf;
					scaleY *= element.scale.y * _canvasHeightHalf;

					_bboxRect.set( v1.x - scaleX, v1.y - scaleY, v1.x  + scaleX, v1.y + scaleY );

					if ( _clipRect.intersects( _bboxRect ) === false ) {

						return;

					}

					setFillStyle( material.color.getContextStyle() );

					_context.save();
					_context.translate( v1.x, v1.y );
					_context.rotate( - element.rotation );
					_context.scale( scaleX, scaleY );
					_context.fillRect( -1, -1, 2, 2 );
					_context.restore();

				} else {

					bitmap = material.map.image;
					bitmapWidth = bitmap.width >> 1;
					bitmapHeight = bitmap.height >> 1;

					scaleX = element.scale.x * _canvasWidthHalf;
					scaleY = element.scale.y * _canvasHeightHalf;

					width = scaleX * bitmapWidth;
					height = scaleY * bitmapHeight;

					// TODO: Rotations break this...

					_bboxRect.set( v1.x - width, v1.y - height, v1.x  + width, v1.y + height );

					if ( _clipRect.intersects( _bboxRect ) === false ) {

						return;

					}

					_context.save();
					_context.translate( v1.x, v1.y );
					_context.rotate( - element.rotation );
					_context.scale( scaleX, - scaleY );

					_context.translate( - bitmapWidth, - bitmapHeight );
					_context.drawImage( bitmap, 0, 0 );
					_context.restore();

				}

				/* DEBUG
				setStrokeStyle( 'rgb(255,255,0)' );
				_context.beginPath();
				_context.moveTo( v1.x - 10, v1.y );
				_context.lineTo( v1.x + 10, v1.y );
				_context.moveTo( v1.x, v1.y - 10 );
				_context.lineTo( v1.x, v1.y + 10 );
				_context.stroke();
				*/

			} else if ( material instanceof THREE.ParticleCanvasMaterial ) {

				width = element.scale.x * _canvasWidthHalf;
				height = element.scale.y * _canvasHeightHalf;

				_bboxRect.set( v1.x - width, v1.y - height, v1.x + width, v1.y + height );

				if ( _clipRect.intersects( _bboxRect ) === false ) {

					return;

				}

				setStrokeStyle( material.color.getContextStyle() );
				setFillStyle( material.color.getContextStyle() );

				_context.save();
				_context.translate( v1.x, v1.y );
				_context.rotate( - element.rotation );
				_context.scale( width, height );

				material.program( _context );

				_context.restore();

			}

		}

		function renderLine( v1, v2, element, material, scene ) {

			setOpacity( material.opacity );
			setBlending( material.blending );

			_context.beginPath();
			_context.moveTo( v1.positionScreen.x, v1.positionScreen.y );
			_context.lineTo( v2.positionScreen.x, v2.positionScreen.y );

			if ( material instanceof THREE.LineBasicMaterial ) {

				setLineWidth( material.linewidth );
				setLineCap( material.linecap );
				setLineJoin( material.linejoin );
				setStrokeStyle( material.color.getContextStyle() );

				_context.stroke();
				_bboxRect.inflate( material.linewidth * 2 );

			}

		}

		function renderFace3( v1, v2, v3, uv1, uv2, uv3, element, material, scene ) {

			_this.info.render.vertices += 3;
			_this.info.render.faces ++;

			setOpacity( material.opacity );
			setBlending( material.blending );

			_v1x = v1.positionScreen.x; _v1y = v1.positionScreen.y;
			_v2x = v2.positionScreen.x; _v2y = v2.positionScreen.y;
			_v3x = v3.positionScreen.x; _v3y = v3.positionScreen.y;

			drawTriangle( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y );

			if ( ( material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) && material.map === null && material.map === null ) {

				_diffuseColor.copy( material.color );
				_emissiveColor.copy( material.emissive );

				if ( material.vertexColors === THREE.FaceColors ) {

					_diffuseColor.r *= element.color.r;
					_diffuseColor.g *= element.color.g;
					_diffuseColor.b *= element.color.b;

				}

				if ( _enableLighting === true ) {

					if ( material.wireframe === false && material.shading == THREE.SmoothShading && element.vertexNormalsLength == 3 ) {

						_color1.r = _color2.r = _color3.r = _ambientLight.r;
						_color1.g = _color2.g = _color3.g = _ambientLight.g;
						_color1.b = _color2.b = _color3.b = _ambientLight.b;

						calculateLight( element.v1.positionWorld, element.vertexNormalsWorld[ 0 ], _color1 );
						calculateLight( element.v2.positionWorld, element.vertexNormalsWorld[ 1 ], _color2 );
						calculateLight( element.v3.positionWorld, element.vertexNormalsWorld[ 2 ], _color3 );

						_color1.r = _color1.r * _diffuseColor.r + _emissiveColor.r;
						_color1.g = _color1.g * _diffuseColor.g + _emissiveColor.g;
						_color1.b = _color1.b * _diffuseColor.b + _emissiveColor.b;

						_color2.r = _color2.r * _diffuseColor.r + _emissiveColor.r;
						_color2.g = _color2.g * _diffuseColor.g + _emissiveColor.g;
						_color2.b = _color2.b * _diffuseColor.b + _emissiveColor.b;

						_color3.r = _color3.r * _diffuseColor.r + _emissiveColor.r;
						_color3.g = _color3.g * _diffuseColor.g + _emissiveColor.g;
						_color3.b = _color3.b * _diffuseColor.b + _emissiveColor.b;

						_color4.r = ( _color2.r + _color3.r ) * 0.5;
						_color4.g = ( _color2.g + _color3.g ) * 0.5;
						_color4.b = ( _color2.b + _color3.b ) * 0.5;

						_image = getGradientTexture( _color1, _color2, _color3, _color4 );

						clipImage( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, 0, 0, 1, 0, 0, 1, _image );

					} else {

						_color.r = _ambientLight.r;
						_color.g = _ambientLight.g;
						_color.b = _ambientLight.b;

						calculateLight( element.centroidWorld, element.normalWorld, _color );

						_color.r = _color.r * _diffuseColor.r + _emissiveColor.r;
						_color.g = _color.g * _diffuseColor.g + _emissiveColor.g;
						_color.b = _color.b * _diffuseColor.b + _emissiveColor.b;

						material.wireframe === true
							? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
							: fillPath( _color );

					}

				} else {

					material.wireframe === true
						? strokePath( material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
						: fillPath( material.color );

				}

			} else if ( material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) {

				if ( material.map !== null ) {

					if ( material.map.mapping instanceof THREE.UVMapping ) {

						_uvs = element.uvs[ 0 ];
						patternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uvs[ uv1 ].u, _uvs[ uv1 ].v, _uvs[ uv2 ].u, _uvs[ uv2 ].v, _uvs[ uv3 ].u, _uvs[ uv3 ].v, material.map );

					}


				} else if ( material.envMap !== null ) {

					if ( material.envMap.mapping instanceof THREE.SphericalReflectionMapping ) {

						var cameraMatrix = camera.matrixWorldInverse;

						_vector3.copy( element.vertexNormalsWorld[ uv1 ] );
						_uv1x = ( _vector3.x * cameraMatrix.elements[0] + _vector3.y * cameraMatrix.elements[4] + _vector3.z * cameraMatrix.elements[8] ) * 0.5 + 0.5;
						_uv1y = ( _vector3.x * cameraMatrix.elements[1] + _vector3.y * cameraMatrix.elements[5] + _vector3.z * cameraMatrix.elements[9] ) * 0.5 + 0.5;

						_vector3.copy( element.vertexNormalsWorld[ uv2 ] );
						_uv2x = ( _vector3.x * cameraMatrix.elements[0] + _vector3.y * cameraMatrix.elements[4] + _vector3.z * cameraMatrix.elements[8] ) * 0.5 + 0.5;
						_uv2y = ( _vector3.x * cameraMatrix.elements[1] + _vector3.y * cameraMatrix.elements[5] + _vector3.z * cameraMatrix.elements[9] ) * 0.5 + 0.5;

						_vector3.copy( element.vertexNormalsWorld[ uv3 ] );
						_uv3x = ( _vector3.x * cameraMatrix.elements[0] + _vector3.y * cameraMatrix.elements[4] + _vector3.z * cameraMatrix.elements[8] ) * 0.5 + 0.5;
						_uv3y = ( _vector3.x * cameraMatrix.elements[1] + _vector3.y * cameraMatrix.elements[5] + _vector3.z * cameraMatrix.elements[9] ) * 0.5 + 0.5;

						patternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y, material.envMap );

					}/* else if ( material.envMap.mapping == THREE.SphericalRefractionMapping ) {



					}*/


				} else {

					_color.copy( material.color );

					if ( material.vertexColors === THREE.FaceColors ) {

						_color.r *= element.color.r;
						_color.g *= element.color.g;
						_color.b *= element.color.b;

					}

					material.wireframe === true
						? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
						: fillPath( _color );

				}

			} else if ( material instanceof THREE.MeshDepthMaterial ) {

				_near = camera.near;
				_far = camera.far;

				_color1.r = _color1.g = _color1.b = 1 - smoothstep( v1.positionScreen.z, _near, _far );
				_color2.r = _color2.g = _color2.b = 1 - smoothstep( v2.positionScreen.z, _near, _far );
				_color3.r = _color3.g = _color3.b = 1 - smoothstep( v3.positionScreen.z, _near, _far );

				_color4.r = ( _color2.r + _color3.r ) * 0.5;
				_color4.g = ( _color2.g + _color3.g ) * 0.5;
				_color4.b = ( _color2.b + _color3.b ) * 0.5;

				_image = getGradientTexture( _color1, _color2, _color3, _color4 );

				clipImage( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, 0, 0, 1, 0, 0, 1, _image );

			} else if ( material instanceof THREE.MeshNormalMaterial ) {

				_color.r = normalToComponent( element.normalWorld.x );
				_color.g = normalToComponent( element.normalWorld.y );
				_color.b = normalToComponent( element.normalWorld.z );

				material.wireframe === true
					? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
					: fillPath( _color );

			}

		}

		function renderFace4( v1, v2, v3, v4, v5, v6, element, material, scene ) {

			_this.info.render.vertices += 4;
			_this.info.render.faces ++;

			setOpacity( material.opacity );
			setBlending( material.blending );

			if ( ( material.map !== undefined && material.map !== null ) || ( material.envMap !== undefined && material.envMap !== null ) ) {

				// Let renderFace3() handle this

				renderFace3( v1, v2, v4, 0, 1, 3, element, material, scene );
				renderFace3( v5, v3, v6, 1, 2, 3, element, material, scene );

				return;

			}

			_v1x = v1.positionScreen.x; _v1y = v1.positionScreen.y;
			_v2x = v2.positionScreen.x; _v2y = v2.positionScreen.y;
			_v3x = v3.positionScreen.x; _v3y = v3.positionScreen.y;
			_v4x = v4.positionScreen.x; _v4y = v4.positionScreen.y;
			_v5x = v5.positionScreen.x; _v5y = v5.positionScreen.y;
			_v6x = v6.positionScreen.x; _v6y = v6.positionScreen.y;

			if ( material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) {

				_diffuseColor.copy( material.color );
				_emissiveColor.copy( material.emissive );

				if ( material.vertexColors === THREE.FaceColors ) {

					_diffuseColor.r *= element.color.r;
					_diffuseColor.g *= element.color.g;
					_diffuseColor.b *= element.color.b;

				}

				if ( _enableLighting === true ) {

					if ( material.wireframe === false && material.shading == THREE.SmoothShading && element.vertexNormalsLength == 4 ) {

						_color1.r = _color2.r = _color3.r = _color4.r = _ambientLight.r;
						_color1.g = _color2.g = _color3.g = _color4.g = _ambientLight.g;
						_color1.b = _color2.b = _color3.b = _color4.b = _ambientLight.b;

						calculateLight( element.v1.positionWorld, element.vertexNormalsWorld[ 0 ], _color1 );
						calculateLight( element.v2.positionWorld, element.vertexNormalsWorld[ 1 ], _color2 );
						calculateLight( element.v4.positionWorld, element.vertexNormalsWorld[ 3 ], _color3 );
						calculateLight( element.v3.positionWorld, element.vertexNormalsWorld[ 2 ], _color4 );

						_color1.r = _color1.r * _diffuseColor.r + _emissiveColor.r;
						_color1.g = _color1.g * _diffuseColor.g + _emissiveColor.g;
						_color1.b = _color1.b * _diffuseColor.b + _emissiveColor.b;

						_color2.r = _color2.r * _diffuseColor.r + _emissiveColor.r;
						_color2.g = _color2.g * _diffuseColor.g + _emissiveColor.g;
						_color2.b = _color2.b * _diffuseColor.b + _emissiveColor.b;

						_color3.r = _color3.r * _diffuseColor.r + _emissiveColor.r;
						_color3.g = _color3.g * _diffuseColor.g + _emissiveColor.g;
						_color3.b = _color3.b * _diffuseColor.b + _emissiveColor.b;

						_color4.r = _color4.r * _diffuseColor.r + _emissiveColor.r;
						_color4.g = _color4.g * _diffuseColor.g + _emissiveColor.g;
						_color4.b = _color4.b * _diffuseColor.b + _emissiveColor.b;

						_image = getGradientTexture( _color1, _color2, _color3, _color4 );

						// TODO: UVs are incorrect, v4->v3?

						drawTriangle( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y );
						clipImage( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y, 0, 0, 1, 0, 0, 1, _image );

						drawTriangle( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y );
						clipImage( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y, 1, 0, 1, 1, 0, 1, _image );

					} else {

						_color.r = _ambientLight.r;
						_color.g = _ambientLight.g;
						_color.b = _ambientLight.b;

						calculateLight( element.centroidWorld, element.normalWorld, _color );

						_color.r = _color.r * _diffuseColor.r + _emissiveColor.r;
						_color.g = _color.g * _diffuseColor.g + _emissiveColor.g;
						_color.b = _color.b * _diffuseColor.b + _emissiveColor.b;

						drawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );

						material.wireframe === true
							? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
							: fillPath( _color );

					}

				} else {

					_color.r = _diffuseColor.r + _emissiveColor.r;
					_color.g = _diffuseColor.g + _emissiveColor.g;
					_color.b = _diffuseColor.b + _emissiveColor.b;

					drawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );

					material.wireframe === true
						? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
						: fillPath( _color );

				}

			} else if ( material instanceof THREE.MeshBasicMaterial ) {

				_color.copy( material.color );

				if ( material.vertexColors === THREE.FaceColors ) {

					_color.r *= element.color.r;
					_color.g *= element.color.g;
					_color.b *= element.color.b;

				}

				drawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );

				material.wireframe === true
					? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
					: fillPath( _color );

			} else if ( material instanceof THREE.MeshNormalMaterial ) {

				_color.r = normalToComponent( element.normalWorld.x );
				_color.g = normalToComponent( element.normalWorld.y );
				_color.b = normalToComponent( element.normalWorld.z );

				drawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );

				material.wireframe === true
					? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )
					: fillPath( _color );

			} else if ( material instanceof THREE.MeshDepthMaterial ) {

				_near = camera.near;
				_far = camera.far;

				_color1.r = _color1.g = _color1.b = 1 - smoothstep( v1.positionScreen.z, _near, _far );
				_color2.r = _color2.g = _color2.b = 1 - smoothstep( v2.positionScreen.z, _near, _far );
				_color3.r = _color3.g = _color3.b = 1 - smoothstep( v4.positionScreen.z, _near, _far );
				_color4.r = _color4.g = _color4.b = 1 - smoothstep( v3.positionScreen.z, _near, _far );

				_image = getGradientTexture( _color1, _color2, _color3, _color4 );

				// TODO: UVs are incorrect, v4->v3?

				drawTriangle( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y );
				clipImage( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y, 0, 0, 1, 0, 0, 1, _image );

				drawTriangle( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y );
				clipImage( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y, 1, 0, 1, 1, 0, 1, _image );

			}

		}

		//

		function drawTriangle( x0, y0, x1, y1, x2, y2 ) {

			_context.beginPath();
			_context.moveTo( x0, y0 );
			_context.lineTo( x1, y1 );
			_context.lineTo( x2, y2 );
			_context.closePath();

		}

		function drawQuad( x0, y0, x1, y1, x2, y2, x3, y3 ) {

			_context.beginPath();
			_context.moveTo( x0, y0 );
			_context.lineTo( x1, y1 );
			_context.lineTo( x2, y2 );
			_context.lineTo( x3, y3 );
			_context.closePath();

		}

		function strokePath( color, linewidth, linecap, linejoin ) {

			setLineWidth( linewidth );
			setLineCap( linecap );
			setLineJoin( linejoin );
			setStrokeStyle( color.getContextStyle() );

			_context.stroke();

			_bboxRect.inflate( linewidth * 2 );

		}

		function fillPath( color ) {

			setFillStyle( color.getContextStyle() );
			_context.fill();

		}

		function patternPath( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, texture ) {

			if ( texture instanceof THREE.DataTexture || texture.image === undefined || texture.image.width == 0 ) return;

			if ( texture.needsUpdate === true ) {

				var repeatX = texture.wrapS == THREE.RepeatWrapping;
				var repeatY = texture.wrapT == THREE.RepeatWrapping;

				_patterns[ texture.id ] = _context.createPattern(
					texture.image, repeatX === true && repeatY === true
						? 'repeat'
						: repeatX === true && repeatY === false
							? 'repeat-x'
							: repeatX === false && repeatY === true
								? 'repeat-y'
								: 'no-repeat'
				);

				texture.needsUpdate = false;

			}

			_patterns[ texture.id ] === undefined
				? setFillStyle( 'rgba(0,0,0,1)' )
				: setFillStyle( _patterns[ texture.id ] );

			// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120

			var a, b, c, d, e, f, det, idet,
			offsetX = texture.offset.x / texture.repeat.x,
			offsetY = texture.offset.y / texture.repeat.y,
			width = texture.image.width * texture.repeat.x,
			height = texture.image.height * texture.repeat.y;

			u0 = ( u0 + offsetX ) * width;
			v0 = ( 1.0 - v0 + offsetY ) * height;

			u1 = ( u1 + offsetX ) * width;
			v1 = ( 1.0 - v1 + offsetY ) * height;

			u2 = ( u2 + offsetX ) * width;
			v2 = ( 1.0 - v2 + offsetY ) * height;

			x1 -= x0; y1 -= y0;
			x2 -= x0; y2 -= y0;

			u1 -= u0; v1 -= v0;
			u2 -= u0; v2 -= v0;

			det = u1 * v2 - u2 * v1;

			if ( det === 0 ) {

				if ( _imagedatas[ texture.id ] === undefined ) {

					var canvas = document.createElement( 'canvas' )
					canvas.width = texture.image.width;
					canvas.height = texture.image.height;

					var context = canvas.getContext( '2d' );
					context.drawImage( texture.image, 0, 0 );

					_imagedatas[ texture.id ] = context.getImageData( 0, 0, texture.image.width, texture.image.height ).data;

				}

				var data = _imagedatas[ texture.id ];
				var index = ( Math.floor( u0 ) + Math.floor( v0 ) * texture.image.width ) * 4;

				_color.setRGB( data[ index ] / 255, data[ index + 1 ] / 255, data[ index + 2 ] / 255 );
				fillPath( _color );

				return;

			}

			idet = 1 / det;

			a = ( v2 * x1 - v1 * x2 ) * idet;
			b = ( v2 * y1 - v1 * y2 ) * idet;
			c = ( u1 * x2 - u2 * x1 ) * idet;
			d = ( u1 * y2 - u2 * y1 ) * idet;

			e = x0 - a * u0 - c * v0;
			f = y0 - b * u0 - d * v0;

			_context.save();
			_context.transform( a, b, c, d, e, f );
			_context.fill();
			_context.restore();

		}

		function clipImage( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, image ) {

			// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120

			var a, b, c, d, e, f, det, idet,
			width = image.width - 1,
			height = image.height - 1;

			u0 *= width; v0 *= height;
			u1 *= width; v1 *= height;
			u2 *= width; v2 *= height;

			x1 -= x0; y1 -= y0;
			x2 -= x0; y2 -= y0;

			u1 -= u0; v1 -= v0;
			u2 -= u0; v2 -= v0;

			det = u1 * v2 - u2 * v1;

			idet = 1 / det;

			a = ( v2 * x1 - v1 * x2 ) * idet;
			b = ( v2 * y1 - v1 * y2 ) * idet;
			c = ( u1 * x2 - u2 * x1 ) * idet;
			d = ( u1 * y2 - u2 * y1 ) * idet;

			e = x0 - a * u0 - c * v0;
			f = y0 - b * u0 - d * v0;

			_context.save();
			_context.transform( a, b, c, d, e, f );
			_context.clip();
			_context.drawImage( image, 0, 0 );
			_context.restore();

		}

		function getGradientTexture( color1, color2, color3, color4 ) {

			// http://mrdoob.com/blog/post/710

			_pixelMapData[ 0 ] = ( color1.r * 255 ) | 0;
			_pixelMapData[ 1 ] = ( color1.g * 255 ) | 0;
			_pixelMapData[ 2 ] = ( color1.b * 255 ) | 0;

			_pixelMapData[ 4 ] = ( color2.r * 255 ) | 0;
			_pixelMapData[ 5 ] = ( color2.g * 255 ) | 0;
			_pixelMapData[ 6 ] = ( color2.b * 255 ) | 0;

			_pixelMapData[ 8 ] = ( color3.r * 255 ) | 0;
			_pixelMapData[ 9 ] = ( color3.g * 255 ) | 0;
			_pixelMapData[ 10 ] = ( color3.b * 255 ) | 0;

			_pixelMapData[ 12 ] = ( color4.r * 255 ) | 0;
			_pixelMapData[ 13 ] = ( color4.g * 255 ) | 0;
			_pixelMapData[ 14 ] = ( color4.b * 255 ) | 0;

			_pixelMapContext.putImageData( _pixelMapImage, 0, 0 );
			_gradientMapContext.drawImage( _pixelMap, 0, 0 );

			return _gradientMap;

		}

		function smoothstep( value, min, max ) {

			var x = ( value - min ) / ( max - min );
			return x * x * ( 3 - 2 * x );

		}

		function normalToComponent( normal ) {

			var component = ( normal + 1 ) * 0.5;
			return component < 0 ? 0 : ( component > 1 ? 1 : component );

		}

		// Hide anti-alias gaps

		function expand( v1, v2 ) {

			var x = v2.x - v1.x, y =  v2.y - v1.y,
			det = x * x + y * y, idet;

			if ( det === 0 ) return;

			idet = 1 / Math.sqrt( det );

			x *= idet; y *= idet;

			v2.x += x; v2.y += y;
			v1.x -= x; v1.y -= y;

		}
	};

	// Context cached methods.

	function setOpacity( value ) {

		if ( _contextGlobalAlpha !== value ) {

			_context.globalAlpha = value;
			_contextGlobalAlpha = value;

		}

	}

	function setBlending( value ) {

		if ( _contextGlobalCompositeOperation !== value ) {

			if ( value === THREE.NormalBlending ) {

				_context.globalCompositeOperation = 'source-over';

			} else if ( value === THREE.AdditiveBlending ) {

				_context.globalCompositeOperation = 'lighter';

			} else if ( value === THREE.SubtractiveBlending ) {

				_context.globalCompositeOperation = 'darker';

			}

			_contextGlobalCompositeOperation = value;

		}

	}

	function setLineWidth( value ) {

		if ( _contextLineWidth !== value ) {

			_context.lineWidth = value;
			_contextLineWidth = value;

		}

	}

	function setLineCap( value ) {

		// "butt", "round", "square"

		if ( _contextLineCap !== value ) {

			_context.lineCap = value;
			_contextLineCap = value;

		}

	}

	function setLineJoin( value ) {

		// "round", "bevel", "miter"

		if ( _contextLineJoin !== value ) {

			_context.lineJoin = value;
			_contextLineJoin = value;

		}

	}

	function setStrokeStyle( value ) {

		if ( _contextStrokeStyle !== value ) {

			_context.strokeStyle = value;
			_contextStrokeStyle = value;

		}

	}

	function setFillStyle( value ) {

		if ( _contextFillStyle !== value ) {

			_context.fillStyle = value;
			_contextFillStyle = value;

		}

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.ShaderChunk = {

	// FOG

	fog_pars_fragment: [

		"#ifdef USE_FOG",

			"uniform vec3 fogColor;",

			"#ifdef FOG_EXP2",

				"uniform float fogDensity;",

			"#else",

				"uniform float fogNear;",
				"uniform float fogFar;",

			"#endif",

		"#endif"

	].join("\n"),

	fog_fragment: [

		"#ifdef USE_FOG",

			"float depth = gl_FragCoord.z / gl_FragCoord.w;",

			"#ifdef FOG_EXP2",

				"const float LOG2 = 1.442695;",
				"float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );",
				"fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",

			"#else",

				"float fogFactor = smoothstep( fogNear, fogFar, depth );",

			"#endif",

			"gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

		"#endif"

	].join("\n"),

	// ENVIRONMENT MAP

	envmap_pars_fragment: [

		"#ifdef USE_ENVMAP",

			"uniform float reflectivity;",
			"uniform samplerCube envMap;",
			"uniform float flipEnvMap;",
			"uniform int combine;",

			"#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )",

				"uniform bool useRefract;",
				"uniform float refractionRatio;",

			"#else",

				"varying vec3 vReflect;",

			"#endif",

		"#endif"

	].join("\n"),

	envmap_fragment: [

		"#ifdef USE_ENVMAP",

			"vec3 reflectVec;",

			"#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )",

				"vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );",

				"if ( useRefract ) {",

					"reflectVec = refract( cameraToVertex, normal, refractionRatio );",

				"} else { ",

					"reflectVec = reflect( cameraToVertex, normal );",

				"}",

			"#else",

				"reflectVec = vReflect;",

			"#endif",

			"#ifdef DOUBLE_SIDED",

				"float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );",
				"vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );",

			"#else",

				"vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );",

			"#endif",

			"#ifdef GAMMA_INPUT",

				"cubeColor.xyz *= cubeColor.xyz;",

			"#endif",

			"if ( combine == 1 ) {",

				"gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );",

			"} else if ( combine == 2 ) {",

				"gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;",

			"} else {",

				"gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );",

			"}",

		"#endif"

	].join("\n"),

	envmap_pars_vertex: [

		"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )",

			"varying vec3 vReflect;",

			"uniform float refractionRatio;",
			"uniform bool useRefract;",

		"#endif"

	].join("\n"),

	worldpos_vertex : [

		"#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )",

			"#ifdef USE_SKINNING",

				"vec4 worldPosition = modelMatrix * skinned;",

			"#endif",

			"#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )",

				"vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );",

			"#endif",

			"#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )",

				"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

			"#endif",

		"#endif"

	].join("\n"),

	envmap_vertex : [

		"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )",

			"vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;",
			"worldNormal = normalize( worldNormal );",

			"vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );",

			"if ( useRefract ) {",

				"vReflect = refract( cameraToVertex, worldNormal, refractionRatio );",

			"} else {",

				"vReflect = reflect( cameraToVertex, worldNormal );",

			"}",

		"#endif"

	].join("\n"),

	// COLOR MAP (particles)

	map_particle_pars_fragment: [

		"#ifdef USE_MAP",

			"uniform sampler2D map;",

		"#endif"

	].join("\n"),


	map_particle_fragment: [

		"#ifdef USE_MAP",

			"gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );",

		"#endif"

	].join("\n"),

	// COLOR MAP (triangles)

	map_pars_vertex: [

		"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )",

			"varying vec2 vUv;",
			"uniform vec4 offsetRepeat;",

		"#endif"

	].join("\n"),

	map_pars_fragment: [

		"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )",

			"varying vec2 vUv;",

		"#endif",

		"#ifdef USE_MAP",

			"uniform sampler2D map;",

		"#endif",

	].join("\n"),

	map_vertex: [

		"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )",

			"vUv = uv * offsetRepeat.zw + offsetRepeat.xy;",

		"#endif"

	].join("\n"),

	map_fragment: [

		"#ifdef USE_MAP",

			"#ifdef GAMMA_INPUT",

				"vec4 texelColor = texture2D( map, vUv );",
				"texelColor.xyz *= texelColor.xyz;",

				"gl_FragColor = gl_FragColor * texelColor;",

			"#else",

				"gl_FragColor = gl_FragColor * texture2D( map, vUv );",

			"#endif",

		"#endif"

	].join("\n"),

	// LIGHT MAP

	lightmap_pars_fragment: [

		"#ifdef USE_LIGHTMAP",

			"varying vec2 vUv2;",
			"uniform sampler2D lightMap;",

		"#endif"

	].join("\n"),

	lightmap_pars_vertex: [

		"#ifdef USE_LIGHTMAP",

			"varying vec2 vUv2;",

		"#endif"

	].join("\n"),

	lightmap_fragment: [

		"#ifdef USE_LIGHTMAP",

			"gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );",

		"#endif"

	].join("\n"),

	lightmap_vertex: [

		"#ifdef USE_LIGHTMAP",

			"vUv2 = uv2;",

		"#endif"

	].join("\n"),

	// BUMP MAP

	bumpmap_pars_fragment: [

		"#ifdef USE_BUMPMAP",

			"uniform sampler2D bumpMap;",
			"uniform float bumpScale;",

			// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen
			//	http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html

			// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

			"vec2 dHdxy_fwd() {",

				"vec2 dSTdx = dFdx( vUv );",
				"vec2 dSTdy = dFdy( vUv );",

				"float Hll = bumpScale * texture2D( bumpMap, vUv ).x;",
				"float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;",
				"float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;",

				"return vec2( dBx, dBy );",

			"}",

			"vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {",

				"vec3 vSigmaX = dFdx( surf_pos );",
				"vec3 vSigmaY = dFdy( surf_pos );",
				"vec3 vN = surf_norm;",		// normalized

				"vec3 R1 = cross( vSigmaY, vN );",
				"vec3 R2 = cross( vN, vSigmaX );",

				"float fDet = dot( vSigmaX, R1 );",

				"vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );",
				"return normalize( abs( fDet ) * surf_norm - vGrad );",

			"}",

		"#endif"

	].join("\n"),

	// NORMAL MAP

	normalmap_pars_fragment: [

		"#ifdef USE_NORMALMAP",

			"uniform sampler2D normalMap;",
			"uniform vec2 normalScale;",

			// Per-Pixel Tangent Space Normal Mapping
			// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

			"vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {",

				"vec3 q0 = dFdx( eye_pos.xyz );",
				"vec3 q1 = dFdy( eye_pos.xyz );",
				"vec2 st0 = dFdx( vUv.st );",
				"vec2 st1 = dFdy( vUv.st );",

				"vec3 S = normalize(  q0 * st1.t - q1 * st0.t );",
				"vec3 T = normalize( -q0 * st1.s + q1 * st0.s );",
				"vec3 N = normalize( surf_norm );",

				"vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;",
				"mapN.xy = normalScale * mapN.xy;",
				"mat3 tsn = mat3( S, T, N );",
				"return normalize( tsn * mapN );",

			"}",

		"#endif"

	].join("\n"),

	// SPECULAR MAP

	specularmap_pars_fragment: [

		"#ifdef USE_SPECULARMAP",

			"uniform sampler2D specularMap;",

		"#endif"

	].join("\n"),

	specularmap_fragment: [

		"float specularStrength;",

		"#ifdef USE_SPECULARMAP",

			"vec4 texelSpecular = texture2D( specularMap, vUv );",
			"specularStrength = texelSpecular.r;",

		"#else",

			"specularStrength = 1.0;",

		"#endif"

	].join("\n"),

	// LIGHTS LAMBERT

	lights_lambert_pars_vertex: [

		"uniform vec3 ambient;",
		"uniform vec3 diffuse;",
		"uniform vec3 emissive;",

		"uniform vec3 ambientLightColor;",

		"#if MAX_DIR_LIGHTS > 0",

			"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
			"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

		"#endif",

		"#if MAX_HEMI_LIGHTS > 0",

			"uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];",
			"uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];",
			"uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",
			"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
			"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0",

			"uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
			"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
			"uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
			"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",
			"uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];",
			"uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",

		"#endif",

		"#ifdef WRAP_AROUND",

			"uniform vec3 wrapRGB;",

		"#endif"

	].join("\n"),

	lights_lambert_vertex: [

		"vLightFront = vec3( 0.0 );",

		"#ifdef DOUBLE_SIDED",

			"vLightBack = vec3( 0.0 );",

		"#endif",

		"transformedNormal = normalize( transformedNormal );",

		"#if MAX_DIR_LIGHTS > 0",

		"for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

			"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
			"vec3 dirVector = normalize( lDirection.xyz );",

			"float dotProduct = dot( transformedNormal, dirVector );",
			"vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",

			"#ifdef DOUBLE_SIDED",

				"vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

				"#ifdef WRAP_AROUND",

					"vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

				"#endif",

			"#endif",

			"#ifdef WRAP_AROUND",

				"vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
				"directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );",

				"#ifdef DOUBLE_SIDED",

					"directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );",

				"#endif",

			"#endif",

			"vLightFront += directionalLightColor[ i ] * directionalLightWeighting;",

			"#ifdef DOUBLE_SIDED",

				"vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;",

			"#endif",

		"}",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

				"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
				"vec3 lVector = lPosition.xyz - mvPosition.xyz;",

				"float lDistance = 1.0;",
				"if ( pointLightDistance[ i ] > 0.0 )",
					"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

				"lVector = normalize( lVector );",
				"float dotProduct = dot( transformedNormal, lVector );",

				"vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );",

				"#ifdef DOUBLE_SIDED",

					"vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

					"#ifdef WRAP_AROUND",

						"vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

					"#endif",

				"#endif",

				"#ifdef WRAP_AROUND",

					"vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
					"pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );",

					"#ifdef DOUBLE_SIDED",

						"pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );",

					"#endif",

				"#endif",

				"vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;",

				"#ifdef DOUBLE_SIDED",

					"vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;",

				"#endif",

			"}",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0",

			"for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

				"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
				"vec3 lVector = lPosition.xyz - mvPosition.xyz;",

				"float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );",

				"if ( spotEffect > spotLightAngleCos[ i ] ) {",

					"spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );",

					"float lDistance = 1.0;",
					"if ( spotLightDistance[ i ] > 0.0 )",
						"lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",

					"lVector = normalize( lVector );",

					"float dotProduct = dot( transformedNormal, lVector );",
					"vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );",

					"#ifdef DOUBLE_SIDED",

						"vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

						"#ifdef WRAP_AROUND",

							"vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

						"#endif",

					"#endif",

					"#ifdef WRAP_AROUND",

						"vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
						"spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );",

						"#ifdef DOUBLE_SIDED",

							"spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );",

						"#endif",

					"#endif",

					"vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;",

					"#ifdef DOUBLE_SIDED",

						"vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;",

					"#endif",

				"}",

			"}",

		"#endif",

		"#if MAX_HEMI_LIGHTS > 0",

			"for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {",

				"vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );",
				"vec3 lVector = normalize( lDirection.xyz );",

				"float dotProduct = dot( transformedNormal, lVector );",

				"float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",
				"float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;",

				"vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );",

				"#ifdef DOUBLE_SIDED",

					"vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );",

				"#endif",

			"}",

		"#endif",

		"vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;",

		"#ifdef DOUBLE_SIDED",

			"vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;",

		"#endif"

	].join("\n"),

	// LIGHTS PHONG

	lights_phong_pars_vertex: [

		"#ifndef PHONG_PER_PIXEL",

		"#if MAX_POINT_LIGHTS > 0",

			"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
			"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

			"varying vec4 vPointLight[ MAX_POINT_LIGHTS ];",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0",

			"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
			"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",

			"varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];",

		"#endif",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )",

			"varying vec3 vWorldPosition;",

		"#endif"

	].join("\n"),


	lights_phong_vertex: [

		"#ifndef PHONG_PER_PIXEL",

		"#if MAX_POINT_LIGHTS > 0",

			"for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

				"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
				"vec3 lVector = lPosition.xyz - mvPosition.xyz;",

				"float lDistance = 1.0;",
				"if ( pointLightDistance[ i ] > 0.0 )",
					"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

				"vPointLight[ i ] = vec4( lVector, lDistance );",

			"}",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0",

			"for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

				"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
				"vec3 lVector = lPosition.xyz - mvPosition.xyz;",

				"float lDistance = 1.0;",
				"if ( spotLightDistance[ i ] > 0.0 )",
					"lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",

				"vSpotLight[ i ] = vec4( lVector, lDistance );",

			"}",

		"#endif",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )",

			"vWorldPosition = worldPosition.xyz;",

		"#endif"

	].join("\n"),

	lights_phong_pars_fragment: [

		"uniform vec3 ambientLightColor;",

		"#if MAX_DIR_LIGHTS > 0",

			"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
			"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

		"#endif",

		"#if MAX_HEMI_LIGHTS > 0",

			"uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];",
			"uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];",
			"uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",

			"#ifdef PHONG_PER_PIXEL",

				"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
				"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

			"#else",

				"varying vec4 vPointLight[ MAX_POINT_LIGHTS ];",

			"#endif",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0",

			"uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
			"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
			"uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
			"uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];",
			"uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",

			"#ifdef PHONG_PER_PIXEL",

				"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",

			"#else",

				"varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];",

			"#endif",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )",

			"varying vec3 vWorldPosition;",

		"#endif",

		"#ifdef WRAP_AROUND",

			"uniform vec3 wrapRGB;",

		"#endif",

		"varying vec3 vViewPosition;",
		"varying vec3 vNormal;"

	].join("\n"),

	lights_phong_fragment: [

		"vec3 normal = normalize( vNormal );",
		"vec3 viewPosition = normalize( vViewPosition );",

		"#ifdef DOUBLE_SIDED",

			"normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );",

		"#endif",

		"#ifdef USE_NORMALMAP",

			"normal = perturbNormal2Arb( -viewPosition, normal );",

		"#elif defined( USE_BUMPMAP )",

			"normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"vec3 pointDiffuse  = vec3( 0.0 );",
			"vec3 pointSpecular = vec3( 0.0 );",

			"for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

				"#ifdef PHONG_PER_PIXEL",

					"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
					"vec3 lVector = lPosition.xyz + vViewPosition.xyz;",

					"float lDistance = 1.0;",
					"if ( pointLightDistance[ i ] > 0.0 )",
						"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

					"lVector = normalize( lVector );",

				"#else",

					"vec3 lVector = normalize( vPointLight[ i ].xyz );",
					"float lDistance = vPointLight[ i ].w;",

				"#endif",

				// diffuse

				"float dotProduct = dot( normal, lVector );",

				"#ifdef WRAP_AROUND",

					"float pointDiffuseWeightFull = max( dotProduct, 0.0 );",
					"float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

					"vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );",

				"#else",

					"float pointDiffuseWeight = max( dotProduct, 0.0 );",

				"#endif",

				"pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;",

				// specular

				"vec3 pointHalfVector = normalize( lVector + viewPosition );",
				"float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );",
				"float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );",

				"#ifdef PHYSICALLY_BASED_SHADING",

					// 2.0 => 2.0001 is hack to work around ANGLE bug

					"float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

					"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );",
					"pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;",

				"#else",

					"pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;",

				"#endif",

			"}",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0",

			"vec3 spotDiffuse  = vec3( 0.0 );",
			"vec3 spotSpecular = vec3( 0.0 );",

			"for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

				"#ifdef PHONG_PER_PIXEL",

					"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
					"vec3 lVector = lPosition.xyz + vViewPosition.xyz;",

					"float lDistance = 1.0;",
					"if ( spotLightDistance[ i ] > 0.0 )",
						"lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );",

					"lVector = normalize( lVector );",

				"#else",

					"vec3 lVector = normalize( vSpotLight[ i ].xyz );",
					"float lDistance = vSpotLight[ i ].w;",

				"#endif",

				"float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );",

				"if ( spotEffect > spotLightAngleCos[ i ] ) {",

					"spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );",

					// diffuse

					"float dotProduct = dot( normal, lVector );",

					"#ifdef WRAP_AROUND",

						"float spotDiffuseWeightFull = max( dotProduct, 0.0 );",
						"float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

						"vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );",

					"#else",

						"float spotDiffuseWeight = max( dotProduct, 0.0 );",

					"#endif",

					"spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;",

					// specular

					"vec3 spotHalfVector = normalize( lVector + viewPosition );",
					"float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );",
					"float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );",

					"#ifdef PHYSICALLY_BASED_SHADING",

						// 2.0 => 2.0001 is hack to work around ANGLE bug

						"float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

						"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );",
						"spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;",

					"#else",

						"spotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;",

					"#endif",

				"}",

			"}",

		"#endif",

		"#if MAX_DIR_LIGHTS > 0",

			"vec3 dirDiffuse  = vec3( 0.0 );",
			"vec3 dirSpecular = vec3( 0.0 );" ,

			"for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

				"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
				"vec3 dirVector = normalize( lDirection.xyz );",

				// diffuse

				"float dotProduct = dot( normal, dirVector );",

				"#ifdef WRAP_AROUND",

					"float dirDiffuseWeightFull = max( dotProduct, 0.0 );",
					"float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

					"vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );",

				"#else",

					"float dirDiffuseWeight = max( dotProduct, 0.0 );",

				"#endif",

				"dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;",

				// specular

				"vec3 dirHalfVector = normalize( dirVector + viewPosition );",
				"float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );",
				"float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );",

				"#ifdef PHYSICALLY_BASED_SHADING",

					/*
					// fresnel term from skin shader
					"const float F0 = 0.128;",

					"float base = 1.0 - dot( viewPosition, dirHalfVector );",
					"float exponential = pow( base, 5.0 );",

					"float fresnel = exponential + F0 * ( 1.0 - exponential );",
					*/

					/*
					// fresnel term from fresnel shader
					"const float mFresnelBias = 0.08;",
					"const float mFresnelScale = 0.3;",
					"const float mFresnelPower = 5.0;",

					"float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );",
					*/

					// 2.0 => 2.0001 is hack to work around ANGLE bug

					"float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

					//"dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;",

					"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );",
					"dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;",

				"#else",

					"dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;",

				"#endif",

			"}",

		"#endif",

		"#if MAX_HEMI_LIGHTS > 0",

			"vec3 hemiDiffuse  = vec3( 0.0 );",
			"vec3 hemiSpecular = vec3( 0.0 );" ,

			"for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {",

				"vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );",
				"vec3 lVector = normalize( lDirection.xyz );",

				// diffuse

				"float dotProduct = dot( normal, lVector );",
				"float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",

				"vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );",

				"hemiDiffuse += diffuse * hemiColor;",

				// specular (sky light)

				"vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );",
				"float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;",
				"float hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );",

				// specular (ground light)

				"vec3 lVectorGround = -lVector;",

				"vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );",
				"float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;",
				"float hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );",

				"#ifdef PHYSICALLY_BASED_SHADING",

					"float dotProductGround = dot( normal, lVectorGround );",

					// 2.0 => 2.0001 is hack to work around ANGLE bug

					"float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

					"vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );",
					"vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );",
					"hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );",

				"#else",

					"hemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;",

				"#endif",

			"}",

		"#endif",

		"vec3 totalDiffuse = vec3( 0.0 );",
		"vec3 totalSpecular = vec3( 0.0 );",

		"#if MAX_DIR_LIGHTS > 0",

			"totalDiffuse += dirDiffuse;",
			"totalSpecular += dirSpecular;",

		"#endif",

		"#if MAX_HEMI_LIGHTS > 0",

			"totalDiffuse += hemiDiffuse;",
			"totalSpecular += hemiSpecular;",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"totalDiffuse += pointDiffuse;",
			"totalSpecular += pointSpecular;",

		"#endif",

		"#if MAX_SPOT_LIGHTS > 0",

			"totalDiffuse += spotDiffuse;",
			"totalSpecular += spotSpecular;",

		"#endif",

		"#ifdef METAL",

			"gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );",

		"#else",

			"gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;",

		"#endif"

	].join("\n"),

	// VERTEX COLORS

	color_pars_fragment: [

		"#ifdef USE_COLOR",

			"varying vec3 vColor;",

		"#endif"

	].join("\n"),


	color_fragment: [

		"#ifdef USE_COLOR",

			"gl_FragColor = gl_FragColor * vec4( vColor, opacity );",

		"#endif"

	].join("\n"),

	color_pars_vertex: [

		"#ifdef USE_COLOR",

			"varying vec3 vColor;",

		"#endif"

	].join("\n"),


	color_vertex: [

		"#ifdef USE_COLOR",

			"#ifdef GAMMA_INPUT",

				"vColor = color * color;",

			"#else",

				"vColor = color;",

			"#endif",

		"#endif"

	].join("\n"),

	// SKINNING

	skinning_pars_vertex: [

		"#ifdef USE_SKINNING",

			"#ifdef BONE_TEXTURE",

				"uniform sampler2D boneTexture;",

				"mat4 getBoneMatrix( const in float i ) {",

					"float j = i * 4.0;",
					"float x = mod( j, N_BONE_PIXEL_X );",
					"float y = floor( j / N_BONE_PIXEL_X );",

					"const float dx = 1.0 / N_BONE_PIXEL_X;",
					"const float dy = 1.0 / N_BONE_PIXEL_Y;",

					"y = dy * ( y + 0.5 );",

					"vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );",
					"vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );",
					"vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );",
					"vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );",

					"mat4 bone = mat4( v1, v2, v3, v4 );",

					"return bone;",

				"}",

			"#else",

				"uniform mat4 boneGlobalMatrices[ MAX_BONES ];",

				"mat4 getBoneMatrix( const in float i ) {",

					"mat4 bone = boneGlobalMatrices[ int(i) ];",
					"return bone;",

				"}",

			"#endif",

		"#endif"

	].join("\n"),

	skinbase_vertex: [

		"#ifdef USE_SKINNING",

			"mat4 boneMatX = getBoneMatrix( skinIndex.x );",
			"mat4 boneMatY = getBoneMatrix( skinIndex.y );",

		"#endif"

	].join("\n"),

	skinning_vertex: [

		"#ifdef USE_SKINNING",

			"#ifdef USE_MORPHTARGETS",

			"vec4 skinVertex = vec4( morphed, 1.0 );",

			"#else",

			"vec4 skinVertex = vec4( position, 1.0 );",

			"#endif",

			"vec4 skinned  = boneMatX * skinVertex * skinWeight.x;",
			"skinned 	  += boneMatY * skinVertex * skinWeight.y;",

		"#endif"

	].join("\n"),

	// MORPHING

	morphtarget_pars_vertex: [

		"#ifdef USE_MORPHTARGETS",

			"#ifndef USE_MORPHNORMALS",

			"uniform float morphTargetInfluences[ 8 ];",

			"#else",

			"uniform float morphTargetInfluences[ 4 ];",

			"#endif",

		"#endif"

	].join("\n"),

	morphtarget_vertex: [

		"#ifdef USE_MORPHTARGETS",

			"vec3 morphed = vec3( 0.0 );",
			"morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];",
			"morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];",
			"morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];",
			"morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];",

			"#ifndef USE_MORPHNORMALS",

			"morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];",
			"morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];",
			"morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];",
			"morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];",

			"#endif",

			"morphed += position;",

		"#endif"

	].join("\n"),

	default_vertex : [

		"vec4 mvPosition;",

		"#ifdef USE_SKINNING",

			"mvPosition = modelViewMatrix * skinned;",

		"#endif",

		"#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )",

			"mvPosition = modelViewMatrix * vec4( morphed, 1.0 );",

		"#endif",

		"#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )",

			"mvPosition = modelViewMatrix * vec4( position, 1.0 );",

		"#endif",

		"gl_Position = projectionMatrix * mvPosition;",

	].join("\n"),

	morphnormal_vertex: [

		"#ifdef USE_MORPHNORMALS",

			"vec3 morphedNormal = vec3( 0.0 );",

			"morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];",
			"morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];",
			"morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];",
			"morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];",

			"morphedNormal += normal;",

		"#endif"

	].join("\n"),

	skinnormal_vertex: [

		"#ifdef USE_SKINNING",

			"mat4 skinMatrix = skinWeight.x * boneMatX;",
			"skinMatrix 	+= skinWeight.y * boneMatY;",

			"#ifdef USE_MORPHNORMALS",

			"vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );",

			"#else",

			"vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );",

			"#endif",

		"#endif"

	].join("\n"),

	defaultnormal_vertex: [

		"vec3 objectNormal;",

		"#ifdef USE_SKINNING",

			"objectNormal = skinnedNormal.xyz;",

		"#endif",

		"#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )",

			"objectNormal = morphedNormal;",

		"#endif",

		"#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )",

			"objectNormal = normal;",

		"#endif",

		"#ifdef FLIP_SIDED",

			"objectNormal = -objectNormal;",

		"#endif",

		"vec3 transformedNormal = normalMatrix * objectNormal;",

	].join("\n"),

	// SHADOW MAP

	// based on SpiderGL shadow map and Fabien Sanglard's GLSL shadow mapping examples
	//  http://spidergl.org/example.php?id=6
	// 	http://fabiensanglard.net/shadowmapping

	shadowmap_pars_fragment: [

		"#ifdef USE_SHADOWMAP",

			"uniform sampler2D shadowMap[ MAX_SHADOWS ];",
			"uniform vec2 shadowMapSize[ MAX_SHADOWS ];",

			"uniform float shadowDarkness[ MAX_SHADOWS ];",
			"uniform float shadowBias[ MAX_SHADOWS ];",

			"varying vec4 vShadowCoord[ MAX_SHADOWS ];",

			"float unpackDepth( const in vec4 rgba_depth ) {",

				"const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );",
				"float depth = dot( rgba_depth, bit_shift );",
				"return depth;",

			"}",

		"#endif"

	].join("\n"),

	shadowmap_fragment: [

		"#ifdef USE_SHADOWMAP",

			"#ifdef SHADOWMAP_DEBUG",

				"vec3 frustumColors[3];",
				"frustumColors[0] = vec3( 1.0, 0.5, 0.0 );",
				"frustumColors[1] = vec3( 0.0, 1.0, 0.8 );",
				"frustumColors[2] = vec3( 0.0, 0.5, 1.0 );",

			"#endif",

			"#ifdef SHADOWMAP_CASCADE",

				"int inFrustumCount = 0;",

			"#endif",

			"float fDepth;",
			"vec3 shadowColor = vec3( 1.0 );",

			"for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

				"vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;",

				// "if ( something && something )" 		 breaks ATI OpenGL shader compiler
				// "if ( all( something, something ) )"  using this instead

				"bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );",
				"bool inFrustum = all( inFrustumVec );",

				// don't shadow pixels outside of light frustum
				// use just first frustum (for cascades)
				// don't shadow pixels behind far plane of light frustum

				"#ifdef SHADOWMAP_CASCADE",

					"inFrustumCount += int( inFrustum );",
					"bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );",

				"#else",

					"bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );",

				"#endif",

				"bool frustumTest = all( frustumTestVec );",

				"if ( frustumTest ) {",

					"shadowCoord.z += shadowBias[ i ];",

					"#ifdef SHADOWMAP_SOFT",

						// Percentage-close filtering
						// (9 pixel kernel)
						// http://fabiensanglard.net/shadowmappingPCF/

						"float shadow = 0.0;",

						/*
						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL
						// must enroll loop manually

						"for ( float y = -1.25; y <= 1.25; y += 1.25 )",
							"for ( float x = -1.25; x <= 1.25; x += 1.25 ) {",

								"vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );",

								// doesn't seem to produce any noticeable visual difference compared to simple "texture2D" lookup
								//"vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );",

								"float fDepth = unpackDepth( rgbaDepth );",

								"if ( fDepth < shadowCoord.z )",
									"shadow += 1.0;",

						"}",

						"shadow /= 9.0;",

						*/

						"const float shadowDelta = 1.0 / 9.0;",

						"float xPixelOffset = 1.0 / shadowMapSize[ i ].x;",
						"float yPixelOffset = 1.0 / shadowMapSize[ i ].y;",

						"float dx0 = -1.25 * xPixelOffset;",
						"float dy0 = -1.25 * yPixelOffset;",
						"float dx1 = 1.25 * xPixelOffset;",
						"float dy1 = 1.25 * yPixelOffset;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );",

					"#else",

						"vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );",
						"float fDepth = unpackDepth( rgbaDepth );",

						"if ( fDepth < shadowCoord.z )",

							// spot with multiple shadows is darker

							"shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );",

							// spot with multiple shadows has the same color as single shadow spot

							//"shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );",

					"#endif",

				"}",


				"#ifdef SHADOWMAP_DEBUG",

					"#ifdef SHADOWMAP_CASCADE",

						"if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];",

					"#else",

						"if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];",

					"#endif",

				"#endif",

			"}",

			"#ifdef GAMMA_OUTPUT",

				"shadowColor *= shadowColor;",

			"#endif",

			"gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;",

		"#endif"

	].join("\n"),

	shadowmap_pars_vertex: [

		"#ifdef USE_SHADOWMAP",

			"varying vec4 vShadowCoord[ MAX_SHADOWS ];",
			"uniform mat4 shadowMatrix[ MAX_SHADOWS ];",

		"#endif"

	].join("\n"),

	shadowmap_vertex: [

		"#ifdef USE_SHADOWMAP",

			"for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

				"vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;",

			"}",

		"#endif"

	].join("\n"),

	// ALPHATEST

	alphatest_fragment: [

		"#ifdef ALPHATEST",

			"if ( gl_FragColor.a < ALPHATEST ) discard;",

		"#endif"

	].join("\n"),

	// LINEAR SPACE

	linear_to_gamma_fragment: [

		"#ifdef GAMMA_OUTPUT",

			"gl_FragColor.xyz = sqrt( gl_FragColor.xyz );",

		"#endif"

	].join("\n"),


};

THREE.UniformsUtils = {

	merge: function ( uniforms ) {

		var u, p, tmp, merged = {};

		for ( u = 0; u < uniforms.length; u ++ ) {

			tmp = this.clone( uniforms[ u ] );

			for ( p in tmp ) {

				merged[ p ] = tmp[ p ];

			}

		}

		return merged;

	},

	clone: function ( uniforms_src ) {

		var u, p, parameter, parameter_src, uniforms_dst = {};

		for ( u in uniforms_src ) {

			uniforms_dst[ u ] = {};

			for ( p in uniforms_src[ u ] ) {

				parameter_src = uniforms_src[ u ][ p ];

				if ( parameter_src instanceof THREE.Color ||
					 parameter_src instanceof THREE.Vector2 ||
					 parameter_src instanceof THREE.Vector3 ||
					 parameter_src instanceof THREE.Vector4 ||
					 parameter_src instanceof THREE.Matrix4 ||
					 parameter_src instanceof THREE.Texture ) {

					uniforms_dst[ u ][ p ] = parameter_src.clone();

				} else if ( parameter_src instanceof Array ) {

					uniforms_dst[ u ][ p ] = parameter_src.slice();

				} else {

					uniforms_dst[ u ][ p ] = parameter_src;

				}

			}

		}

		return uniforms_dst;

	}

};

THREE.UniformsLib = {

	common: {

		"diffuse" : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		"opacity" : { type: "f", value: 1.0 },

		"map" : { type: "t", value: null },
		"offsetRepeat" : { type: "v4", value: new THREE.Vector4( 0, 0, 1, 1 ) },

		"lightMap" : { type: "t", value: null },
		"specularMap" : { type: "t", value: null },

		"envMap" : { type: "t", value: null },
		"flipEnvMap" : { type: "f", value: -1 },
		"useRefract" : { type: "i", value: 0 },
		"reflectivity" : { type: "f", value: 1.0 },
		"refractionRatio" : { type: "f", value: 0.98 },
		"combine" : { type: "i", value: 0 },

		"morphTargetInfluences" : { type: "f", value: 0 }

	},

	bump: {

		"bumpMap" : { type: "t", value: null },
		"bumpScale" : { type: "f", value: 1 }

	},

	normalmap: {

		"normalMap" : { type: "t", value: null },
		"normalScale" : { type: "v2", value: new THREE.Vector2( 1, 1 ) }
	},

	fog : {

		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }

	},

	lights: {

		"ambientLightColor" : { type: "fv", value: [] },

		"directionalLightDirection" : { type: "fv", value: [] },
		"directionalLightColor" : { type: "fv", value: [] },

		"hemisphereLightDirection" : { type: "fv", value: [] },
		"hemisphereLightSkyColor" : { type: "fv", value: [] },
		"hemisphereLightGroundColor" : { type: "fv", value: [] },

		"pointLightColor" : { type: "fv", value: [] },
		"pointLightPosition" : { type: "fv", value: [] },
		"pointLightDistance" : { type: "fv1", value: [] },

		"spotLightColor" : { type: "fv", value: [] },
		"spotLightPosition" : { type: "fv", value: [] },
		"spotLightDirection" : { type: "fv", value: [] },
		"spotLightDistance" : { type: "fv1", value: [] },
		"spotLightAngleCos" : { type: "fv1", value: [] },
		"spotLightExponent" : { type: "fv1", value: [] }

	},

	particle: {

		"psColor" : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		"opacity" : { type: "f", value: 1.0 },
		"size" : { type: "f", value: 1.0 },
		"scale" : { type: "f", value: 1.0 },
		"map" : { type: "t", value: null },

		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }

	},

	shadowmap: {

		"shadowMap": { type: "tv", value: [] },
		"shadowMapSize": { type: "v2v", value: [] },

		"shadowBias" : { type: "fv1", value: [] },
		"shadowDarkness": { type: "fv1", value: [] },

		"shadowMatrix" : { type: "m4v", value: [] },

	}

};

THREE.ShaderLib = {

	'depth': {

		uniforms: {

			"mNear": { type: "f", value: 1.0 },
			"mFar" : { type: "f", value: 2000.0 },
			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			"void main() {",

				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float mNear;",
			"uniform float mFar;",
			"uniform float opacity;",

			"void main() {",

				"float depth = gl_FragCoord.z / gl_FragCoord.w;",
				"float color = 1.0 - smoothstep( mNear, mFar, depth );",
				"gl_FragColor = vec4( vec3( color ), opacity );",

			"}"

		].join("\n")

	},

	'normal': {

		uniforms: {

			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			"varying vec3 vNormal;",

			"void main() {",

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				"vNormal = normalize( normalMatrix * normal );",

				"gl_Position = projectionMatrix * mvPosition;",

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float opacity;",
			"varying vec3 vNormal;",

			"void main() {",

				"gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",

			"}"

		].join("\n")

	},

	'basic': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],

				"#ifdef USE_ENVMAP",

				THREE.ShaderChunk[ "morphnormal_vertex" ],
				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],
				THREE.ShaderChunk[ "defaultnormal_vertex" ],

				"#endif",

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "specularmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( diffuse, opacity );",

				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "specularmap_fragment" ],
				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'lambert': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{
				"ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			}

		] ),

		vertexShader: [

			"#define LAMBERT",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

				"varying vec3 vLightBack;",

			"#endif",

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],

				THREE.ShaderChunk[ "morphnormal_vertex" ],
				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],
				THREE.ShaderChunk[ "defaultnormal_vertex" ],

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "lights_lambert_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float opacity;",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

				"varying vec3 vLightBack;",

			"#endif",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "specularmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "specularmap_fragment" ],

				"#ifdef DOUBLE_SIDED",

					//"float isFront = float( gl_FrontFacing );",
					//"gl_FragColor.xyz *= isFront * vLightFront + ( 1.0 - isFront ) * vLightBack;",

					"if ( gl_FrontFacing )",
						"gl_FragColor.xyz *= vLightFront;",
					"else",
						"gl_FragColor.xyz *= vLightBack;",

				"#else",

					"gl_FragColor.xyz *= vLightFront;",

				"#endif",

				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'phong': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "bump" ],
			THREE.UniformsLib[ "normalmap" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{
				"ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"specular" : { type: "c", value: new THREE.Color( 0x111111 ) },
				"shininess": { type: "f", value: 30 },
				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			}

		] ),

		vertexShader: [

			"#define PHONG",

			"varying vec3 vViewPosition;",
			"varying vec3 vNormal;",

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],

				THREE.ShaderChunk[ "morphnormal_vertex" ],
				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],
				THREE.ShaderChunk[ "defaultnormal_vertex" ],

				"vNormal = normalize( transformedNormal );",

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],

				"vViewPosition = -mvPosition.xyz;",

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "lights_phong_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			"uniform vec3 ambient;",
			"uniform vec3 emissive;",
			"uniform vec3 specular;",
			"uniform float shininess;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "lights_phong_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "bumpmap_pars_fragment" ],
			THREE.ShaderChunk[ "normalmap_pars_fragment" ],
			THREE.ShaderChunk[ "specularmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "specularmap_fragment" ],

				THREE.ShaderChunk[ "lights_phong_fragment" ],

				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'particle_basic': {

		uniforms:  THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "particle" ],
			THREE.UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			"uniform float size;",
			"uniform float scale;",

			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "color_vertex" ],

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

				"#ifdef USE_SIZEATTENUATION",
					"gl_PointSize = size * ( scale / length( mvPosition.xyz ) );",
				"#else",
					"gl_PointSize = size;",
				"#endif",

				"gl_Position = projectionMatrix * mvPosition;",

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 psColor;",
			"uniform float opacity;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_particle_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( psColor, opacity );",

				THREE.ShaderChunk[ "map_particle_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],
				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'dashed': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],

			{
				"scale":     { type: "f", value: 1 },
				"dashSize":  { type: "f", value: 1 },
				"totalSize": { type: "f", value: 2 }
			}

		] ),

		vertexShader: [

			"uniform float scale;",
			"attribute float lineDistance;",

			"varying float vLineDistance;",

			THREE.ShaderChunk[ "color_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "color_vertex" ],

				"vLineDistance = scale * lineDistance;",

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				"gl_Position = projectionMatrix * mvPosition;",

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			"uniform float dashSize;",
			"uniform float totalSize;",

			"varying float vLineDistance;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],

			"void main() {",

				"if ( mod( vLineDistance, totalSize ) > dashSize ) {",

					"discard;",

				"}",

				"gl_FragColor = vec4( diffuse, opacity );",

				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	// Depth encoding into RGBA texture
	// 	based on SpiderGL shadow map example
	// 		http://spidergl.org/example.php?id=6
	// 	originally from
	//		http://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD
	// 	see also here:
	//		http://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/

	'depthRGBA': {

		uniforms: {},

		vertexShader: [

			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"vec4 pack_depth( const in float depth ) {",

				"const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
				"const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
				"vec4 res = fract( depth * bit_shift );",
				"res -= res.xxyz * bit_mask;",
				"return res;",

			"}",

			"void main() {",

				"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );",

				//"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );",
				//"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );",
				//"gl_FragData[ 0 ] = pack_depth( z );",
				//"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );",

			"}"

		].join("\n")

	}

};
/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

THREE.WebGLRenderer = function ( parameters ) {

	console.log( 'THREE.WebGLRenderer', THREE.REVISION );

	parameters = parameters || {};

	var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' ),

	_precision = parameters.precision !== undefined ? parameters.precision : 'highp',

	_alpha = parameters.alpha !== undefined ? parameters.alpha : true,
	_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
	_antialias = parameters.antialias !== undefined ? parameters.antialias : false,
	_stencil = parameters.stencil !== undefined ? parameters.stencil : true,
	_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,

	_clearColor = parameters.clearColor !== undefined ? new THREE.Color( parameters.clearColor ) : new THREE.Color( 0x000000 ),
	_clearAlpha = parameters.clearAlpha !== undefined ? parameters.clearAlpha : 0;

	// public properties

	this.domElement = _canvas;
	this.context = null;

	// clearing

	this.autoClear = true;
	this.autoClearColor = true;
	this.autoClearDepth = true;
	this.autoClearStencil = true;

	// scene graph

	this.sortObjects = true;

	this.autoUpdateObjects = true;
	this.autoUpdateScene = true;

	// physically based shading

	this.gammaInput = false;
	this.gammaOutput = false;
	this.physicallyBasedShading = false;

	// shadow map

	this.shadowMapEnabled = false;
	this.shadowMapAutoUpdate = true;
	this.shadowMapSoft = true;
	this.shadowMapCullFrontFaces = true;
	this.shadowMapDebug = false;
	this.shadowMapCascade = false;

	// morphs

	this.maxMorphTargets = 8;
	this.maxMorphNormals = 4;

	// flags

	this.autoScaleCubemaps = true;

	// custom render plugins

	this.renderPluginsPre = [];
	this.renderPluginsPost = [];

	// info

	this.info = {

		memory: {

			programs: 0,
			geometries: 0,
			textures: 0

		},

		render: {

			calls: 0,
			vertices: 0,
			faces: 0,
			points: 0

		}

	};

	// internal properties

	var _this = this,

	_programs = [],
	_programs_counter = 0,

	// internal state cache

	_currentProgram = null,
	_currentFramebuffer = null,
	_currentMaterialId = -1,
	_currentGeometryGroupHash = null,
	_currentCamera = null,
	_geometryGroupCounter = 0,

	_usedTextureUnits = 0,

	// GL state cache

	_oldDoubleSided = -1,
	_oldFlipSided = -1,

	_oldBlending = -1,

	_oldBlendEquation = -1,
	_oldBlendSrc = -1,
	_oldBlendDst = -1,

	_oldDepthTest = -1,
	_oldDepthWrite = -1,

	_oldPolygonOffset = null,
	_oldPolygonOffsetFactor = null,
	_oldPolygonOffsetUnits = null,

	_oldLineWidth = null,

	_viewportX = 0,
	_viewportY = 0,
	_viewportWidth = 0,
	_viewportHeight = 0,
	_currentWidth = 0,
	_currentHeight = 0,

	// frustum

	_frustum = new THREE.Frustum(),

	 // camera matrices cache

	_projScreenMatrix = new THREE.Matrix4(),
	_projScreenMatrixPS = new THREE.Matrix4(),

	_vector3 = new THREE.Vector4(),

	// light arrays cache

	_direction = new THREE.Vector3(),

	_lightsNeedUpdate = true,

	_lights = {

		ambient: [ 0, 0, 0 ],
		directional: { length: 0, colors: new Array(), positions: new Array() },
		point: { length: 0, colors: new Array(), positions: new Array(), distances: new Array() },
		spot: { length: 0, colors: new Array(), positions: new Array(), distances: new Array(), directions: new Array(), anglesCos: new Array(), exponents: new Array() },
		hemi: { length: 0, skyColors: new Array(), groundColors: new Array(), positions: new Array() }

	};

	// initialize

	var _gl;

	var _glExtensionTextureFloat;
	var _glExtensionStandardDerivatives;
	var _glExtensionTextureFilterAnisotropic;
	var _glExtensionCompressedTextureS3TC;

	initGL();

	setDefaultGLState();

	this.context = _gl;

	// GPU capabilities

	var _maxTextures = _gl.getParameter( _gl.MAX_TEXTURE_IMAGE_UNITS );
	var _maxVertexTextures = _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
	var _maxTextureSize = _gl.getParameter( _gl.MAX_TEXTURE_SIZE );
	var _maxCubemapSize = _gl.getParameter( _gl.MAX_CUBE_MAP_TEXTURE_SIZE );

	var _maxAnisotropy = _glExtensionTextureFilterAnisotropic ? _gl.getParameter( _glExtensionTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT ) : 0;

	var _supportsVertexTextures = ( _maxVertexTextures > 0 );
	var _supportsBoneTextures = _supportsVertexTextures && _glExtensionTextureFloat;

	var _compressedTextureFormats = _glExtensionCompressedTextureS3TC ? _gl.getParameter( _gl.COMPRESSED_TEXTURE_FORMATS ) : [];

	// API

	this.getContext = function () {

		return _gl;

	};

	this.supportsVertexTextures = function () {

		return _supportsVertexTextures;

	};

	this.getMaxAnisotropy  = function () {

		return _maxAnisotropy;

	};

	this.setSize = function ( width, height ) {

		_canvas.width = width;
		_canvas.height = height;

		this.setViewport( 0, 0, _canvas.width, _canvas.height );

	};

	this.setViewport = function ( x, y, width, height ) {

		_viewportX = x !== undefined ? x : 0;
		_viewportY = y !== undefined ? y : 0;

		_viewportWidth = width !== undefined ? width : _canvas.width;
		_viewportHeight = height !== undefined ? height : _canvas.height;

		_gl.viewport( _viewportX, _viewportY, _viewportWidth, _viewportHeight );

	};

	this.setScissor = function ( x, y, width, height ) {

		_gl.scissor( x, y, width, height );

	};

	this.enableScissorTest = function ( enable ) {

		enable ? _gl.enable( _gl.SCISSOR_TEST ) : _gl.disable( _gl.SCISSOR_TEST );

	};

	// Clearing

	this.setClearColorHex = function ( hex, alpha ) {

		_clearColor.setHex( hex );
		_clearAlpha = alpha;

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	};

	this.setClearColor = function ( color, alpha ) {

		_clearColor.copy( color );
		_clearAlpha = alpha;

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	};

	this.getClearColor = function () {

		return _clearColor;

	};

	this.getClearAlpha = function () {

		return _clearAlpha;

	};

	this.clear = function ( color, depth, stencil ) {

		var bits = 0;

		if ( color === undefined || color ) bits |= _gl.COLOR_BUFFER_BIT;
		if ( depth === undefined || depth ) bits |= _gl.DEPTH_BUFFER_BIT;
		if ( stencil === undefined || stencil ) bits |= _gl.STENCIL_BUFFER_BIT;

		_gl.clear( bits );

	};

	this.clearTarget = function ( renderTarget, color, depth, stencil ) {

		this.setRenderTarget( renderTarget );
		this.clear( color, depth, stencil );

	};

	// Plugins

	this.addPostPlugin = function ( plugin ) {

		plugin.init( this );
		this.renderPluginsPost.push( plugin );

	};

	this.addPrePlugin = function ( plugin ) {

		plugin.init( this );
		this.renderPluginsPre.push( plugin );

	};

	// Deallocation

	this.deallocateObject = function ( object ) {

		if ( ! object.__webglInit ) return;

		object.__webglInit = false;

		delete object._modelViewMatrix;
		delete object._normalMatrix;

		delete object._normalMatrixArray;
		delete object._modelViewMatrixArray;
		delete object._modelMatrixArray;

		if ( object instanceof THREE.Mesh ) {

			for ( var g in object.geometry.geometryGroups ) {

				deleteMeshBuffers( object.geometry.geometryGroups[ g ] );

			}

		} else if ( object instanceof THREE.Ribbon ) {

			deleteRibbonBuffers( object.geometry );

		} else if ( object instanceof THREE.Line ) {

			deleteLineBuffers( object.geometry );

		} else if ( object instanceof THREE.ParticleSystem ) {

			deleteParticleBuffers( object.geometry );

		}

	};

	this.deallocateTexture = function ( texture ) {

		if ( ! texture.__webglInit ) return;

		texture.__webglInit = false;
		_gl.deleteTexture( texture.__webglTexture );

		_this.info.memory.textures --;

	};

	this.deallocateRenderTarget = function ( renderTarget ) {

		if ( !renderTarget || ! renderTarget.__webglTexture ) return;

		_gl.deleteTexture( renderTarget.__webglTexture );

		if ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {

			for ( var i = 0; i < 6; i ++ ) {

				_gl.deleteFramebuffer( renderTarget.__webglFramebuffer[ i ] );
				_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer[ i ] );

			}

		} else {

			_gl.deleteFramebuffer( renderTarget.__webglFramebuffer );
			_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer );

		}

	};

	this.deallocateMaterial = function ( material ) {

		var program = material.program;

		if ( ! program ) return;

		material.program = undefined;

		// only deallocate GL program if this was the last use of shared program
		// assumed there is only single copy of any program in the _programs list
		// (that's how it's constructed)

		var i, il, programInfo;
		var deleteProgram = false;

		for ( i = 0, il = _programs.length; i < il; i ++ ) {

			programInfo = _programs[ i ];

			if ( programInfo.program === program ) {

				programInfo.usedTimes --;

				if ( programInfo.usedTimes === 0 ) {

					deleteProgram = true;

				}

				break;

			}

		}

		if ( deleteProgram ) {

			// avoid using array.splice, this is costlier than creating new array from scratch

			var newPrograms = [];

			for ( i = 0, il = _programs.length; i < il; i ++ ) {

				programInfo = _programs[ i ];

				if ( programInfo.program !== program ) {

					newPrograms.push( programInfo );

				}

			}

			_programs = newPrograms;

			_gl.deleteProgram( program );

			_this.info.memory.programs --;

		}

	};

	// Rendering

	this.updateShadowMap = function ( scene, camera ) {

		_currentProgram = null;
		_oldBlending = -1;
		_oldDepthTest = -1;
		_oldDepthWrite = -1;
		_currentGeometryGroupHash = -1;
		_currentMaterialId = -1;
		_lightsNeedUpdate = true;
		_oldDoubleSided = -1;
		_oldFlipSided = -1;

		this.shadowMapPlugin.update( scene, camera );

	};

	// Internal functions

	// Buffer allocation

	function createParticleBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();

		_this.info.memory.geometries ++;

	};

	function createLineBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();
		geometry.__webglLineDistanceBuffer = _gl.createBuffer();

		_this.info.memory.geometries ++;

	};

	function createRibbonBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();
		geometry.__webglNormalBuffer = _gl.createBuffer();

		_this.info.memory.geometries ++;

	};

	function createMeshBuffers ( geometryGroup ) {

		geometryGroup.__webglVertexBuffer = _gl.createBuffer();
		geometryGroup.__webglNormalBuffer = _gl.createBuffer();
		geometryGroup.__webglTangentBuffer = _gl.createBuffer();
		geometryGroup.__webglColorBuffer = _gl.createBuffer();
		geometryGroup.__webglUVBuffer = _gl.createBuffer();
		geometryGroup.__webglUV2Buffer = _gl.createBuffer();

		geometryGroup.__webglSkinIndicesBuffer = _gl.createBuffer();
		geometryGroup.__webglSkinWeightsBuffer = _gl.createBuffer();

		geometryGroup.__webglFaceBuffer = _gl.createBuffer();
		geometryGroup.__webglLineBuffer = _gl.createBuffer();

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			geometryGroup.__webglMorphTargetsBuffers = [];

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				geometryGroup.__webglMorphTargetsBuffers.push( _gl.createBuffer() );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			geometryGroup.__webglMorphNormalsBuffers = [];

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				geometryGroup.__webglMorphNormalsBuffers.push( _gl.createBuffer() );

			}

		}

		_this.info.memory.geometries ++;

	};

	// Buffer deallocation

	function deleteParticleBuffers ( geometry ) {

		_gl.deleteBuffer( geometry.__webglVertexBuffer );
		_gl.deleteBuffer( geometry.__webglColorBuffer );

		deleteCustomAttributesBuffers( geometry );

		_this.info.memory.geometries --;

	};

	function deleteLineBuffers ( geometry ) {

		_gl.deleteBuffer( geometry.__webglVertexBuffer );
		_gl.deleteBuffer( geometry.__webglColorBuffer );
		_gl.deleteBuffer( geometry.__webglLineDistanceBuffer );

		deleteCustomAttributesBuffers( geometry );

		_this.info.memory.geometries --;

	};

	function deleteRibbonBuffers ( geometry ) {

		_gl.deleteBuffer( geometry.__webglVertexBuffer );
		_gl.deleteBuffer( geometry.__webglColorBuffer );
		_gl.deleteBuffer( geometry.__webglNormalBuffer );

		deleteCustomAttributesBuffers( geometry );

		_this.info.memory.geometries --;

	};

	function deleteMeshBuffers ( geometryGroup ) {

		_gl.deleteBuffer( geometryGroup.__webglVertexBuffer );
		_gl.deleteBuffer( geometryGroup.__webglNormalBuffer );
		_gl.deleteBuffer( geometryGroup.__webglTangentBuffer );
		_gl.deleteBuffer( geometryGroup.__webglColorBuffer );
		_gl.deleteBuffer( geometryGroup.__webglUVBuffer );
		_gl.deleteBuffer( geometryGroup.__webglUV2Buffer );

		_gl.deleteBuffer( geometryGroup.__webglSkinIndicesBuffer );
		_gl.deleteBuffer( geometryGroup.__webglSkinWeightsBuffer );

		_gl.deleteBuffer( geometryGroup.__webglFaceBuffer );
		_gl.deleteBuffer( geometryGroup.__webglLineBuffer );

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				_gl.deleteBuffer( geometryGroup.__webglMorphTargetsBuffers[ m ] );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				_gl.deleteBuffer( geometryGroup.__webglMorphNormalsBuffers[ m ] );

			}

		}

		deleteCustomAttributesBuffers( geometryGroup );

		_this.info.memory.geometries --;

	};

	function deleteCustomAttributesBuffers( geometry ) {

		if ( geometry.__webglCustomAttributesList ) {

			for ( var id in geometry.__webglCustomAttributesList ) {

				_gl.deleteBuffer( geometry.__webglCustomAttributesList[ id ].buffer );

			}

		}

	};

	// Buffer initialization

	function initCustomAttributes ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		var material = object.material;

		if ( material.attributes ) {

			if ( geometry.__webglCustomAttributesList === undefined ) {

				geometry.__webglCustomAttributesList = [];

			}

			for ( var a in material.attributes ) {

				var attribute = material.attributes[ a ];

				if ( !attribute.__webglInitialized || attribute.createUniqueBuffers ) {

					attribute.__webglInitialized = true;

					var size = 1;		// "f" and "i"

					if ( attribute.type === "v2" ) size = 2;
					else if ( attribute.type === "v3" ) size = 3;
					else if ( attribute.type === "v4" ) size = 4;
					else if ( attribute.type === "c"  ) size = 3;

					attribute.size = size;

					attribute.array = new Float32Array( nvertices * size );

					attribute.buffer = _gl.createBuffer();
					attribute.buffer.belongsToAttribute = a;

					attribute.needsUpdate = true;

				}

				geometry.__webglCustomAttributesList.push( attribute );

			}

		}

	};

	function initParticleBuffers ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );

		geometry.__sortArray = [];

		geometry.__webglParticleCount = nvertices;

		initCustomAttributes ( geometry, object );

	};

	function initLineBuffers ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );
		geometry.__lineDistanceArray = new Float32Array( nvertices * 1 );

		geometry.__webglLineCount = nvertices;

		initCustomAttributes ( geometry, object );

	};

	function initRibbonBuffers ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );
		geometry.__normalArray = new Float32Array( nvertices * 3 );

		geometry.__webglVertexCount = nvertices;

		initCustomAttributes ( geometry, object );

	};

	function initMeshBuffers ( geometryGroup, object ) {

		var geometry = object.geometry,
			faces3 = geometryGroup.faces3,
			faces4 = geometryGroup.faces4,

			nvertices = faces3.length * 3 + faces4.length * 4,
			ntris     = faces3.length * 1 + faces4.length * 2,
			nlines    = faces3.length * 3 + faces4.length * 4,

			material = getBufferMaterial( object, geometryGroup ),

			uvType = bufferGuessUVType( material ),
			normalType = bufferGuessNormalType( material ),
			vertexColorType = bufferGuessVertexColorType( material );

		//console.log( "uvType", uvType, "normalType", normalType, "vertexColorType", vertexColorType, object, geometryGroup, material );

		geometryGroup.__vertexArray = new Float32Array( nvertices * 3 );

		if ( normalType ) {

			geometryGroup.__normalArray = new Float32Array( nvertices * 3 );

		}

		if ( geometry.hasTangents ) {

			geometryGroup.__tangentArray = new Float32Array( nvertices * 4 );

		}

		if ( vertexColorType ) {

			geometryGroup.__colorArray = new Float32Array( nvertices * 3 );

		}

		if ( uvType ) {

			if ( geometry.faceUvs.length > 0 || geometry.faceVertexUvs.length > 0 ) {

				geometryGroup.__uvArray = new Float32Array( nvertices * 2 );

			}

			if ( geometry.faceUvs.length > 1 || geometry.faceVertexUvs.length > 1 ) {

				geometryGroup.__uv2Array = new Float32Array( nvertices * 2 );

			}

		}

		if ( object.geometry.skinWeights.length && object.geometry.skinIndices.length ) {

			geometryGroup.__skinIndexArray = new Float32Array( nvertices * 4 );
			geometryGroup.__skinWeightArray = new Float32Array( nvertices * 4 );

		}

		geometryGroup.__faceArray = new Uint16Array( ntris * 3 );
		geometryGroup.__lineArray = new Uint16Array( nlines * 2 );

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			geometryGroup.__morphTargetsArrays = [];

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				geometryGroup.__morphTargetsArrays.push( new Float32Array( nvertices * 3 ) );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			geometryGroup.__morphNormalsArrays = [];

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				geometryGroup.__morphNormalsArrays.push( new Float32Array( nvertices * 3 ) );

			}

		}

		geometryGroup.__webglFaceCount = ntris * 3;
		geometryGroup.__webglLineCount = nlines * 2;


		// custom attributes

		if ( material.attributes ) {

			if ( geometryGroup.__webglCustomAttributesList === undefined ) {

				geometryGroup.__webglCustomAttributesList = [];

			}

			for ( var a in material.attributes ) {

				// Do a shallow copy of the attribute object so different geometryGroup chunks use different
				// attribute buffers which are correctly indexed in the setMeshBuffers function

				var originalAttribute = material.attributes[ a ];

				var attribute = {};

				for ( var property in originalAttribute ) {

					attribute[ property ] = originalAttribute[ property ];

				}

				if ( !attribute.__webglInitialized || attribute.createUniqueBuffers ) {

					attribute.__webglInitialized = true;

					var size = 1;		// "f" and "i"

					if( attribute.type === "v2" ) size = 2;
					else if( attribute.type === "v3" ) size = 3;
					else if( attribute.type === "v4" ) size = 4;
					else if( attribute.type === "c"  ) size = 3;

					attribute.size = size;

					attribute.array = new Float32Array( nvertices * size );

					attribute.buffer = _gl.createBuffer();
					attribute.buffer.belongsToAttribute = a;

					originalAttribute.needsUpdate = true;
					attribute.__original = originalAttribute;

				}

				geometryGroup.__webglCustomAttributesList.push( attribute );

			}

		}

		geometryGroup.__inittedArrays = true;

	};

	function getBufferMaterial( object, geometryGroup ) {

		return object.material instanceof THREE.MeshFaceMaterial
			? object.material.materials[ geometryGroup.materialIndex ]
			: object.material;

	};

	function materialNeedsSmoothNormals ( material ) {

		return material && material.shading !== undefined && material.shading === THREE.SmoothShading;

	};

	function bufferGuessNormalType ( material ) {

		// only MeshBasicMaterial and MeshDepthMaterial don't need normals

		if ( ( material instanceof THREE.MeshBasicMaterial && !material.envMap ) || material instanceof THREE.MeshDepthMaterial ) {

			return false;

		}

		if ( materialNeedsSmoothNormals( material ) ) {

			return THREE.SmoothShading;

		} else {

			return THREE.FlatShading;

		}

	};

	function bufferGuessVertexColorType ( material ) {

		if ( material.vertexColors ) {

			return material.vertexColors;

		}

		return false;

	};

	function bufferGuessUVType ( material ) {

		// material must use some texture to require uvs

		if ( material.map || material.lightMap || material.bumpMap || material.normalMap || material.specularMap || material instanceof THREE.ShaderMaterial ) {

			return true;

		}

		return false;

	};

	//

	function initDirectBuffers( geometry ) {

		var a, attribute, type;

		for ( a in geometry.attributes ) {

			if ( a === "index" ) {

				type = _gl.ELEMENT_ARRAY_BUFFER;

			} else {

				type = _gl.ARRAY_BUFFER;

			}

			attribute = geometry.attributes[ a ];

			attribute.buffer = _gl.createBuffer();

			_gl.bindBuffer( type, attribute.buffer );
			_gl.bufferData( type, attribute.array, _gl.STATIC_DRAW );

		}

	};

	// Buffer setting

	function setParticleBuffers ( geometry, hint, object ) {

		var v, c, vertex, offset, index, color,

		vertices = geometry.vertices,
		vl = vertices.length,

		colors = geometry.colors,
		cl = colors.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,

		sortArray = geometry.__sortArray,

		dirtyVertices = geometry.verticesNeedUpdate,
		dirtyElements = geometry.elementsNeedUpdate,
		dirtyColors = geometry.colorsNeedUpdate,

		customAttributes = geometry.__webglCustomAttributesList,
		i, il,
		a, ca, cal, value,
		customAttribute;

		if ( object.sortParticles ) {

			_projScreenMatrixPS.copy( _projScreenMatrix );
			_projScreenMatrixPS.multiplySelf( object.matrixWorld );

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ];

				_vector3.copy( vertex );
				_projScreenMatrixPS.multiplyVector3( _vector3 );

				sortArray[ v ] = [ _vector3.z, v ];

			}

			sortArray.sort( function( a, b ) { return b[ 0 ] - a[ 0 ]; } );

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ sortArray[v][1] ];

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			for ( c = 0; c < cl; c ++ ) {

				offset = c * 3;

				color = colors[ sortArray[c][1] ];

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			if ( customAttributes ) {

				for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

					customAttribute = customAttributes[ i ];

					if ( ! ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) ) continue;

					offset = 0;

					cal = customAttribute.value.length;

					if ( customAttribute.size === 1 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							customAttribute.array[ ca ] = customAttribute.value[ index ];

						}

					} else if ( customAttribute.size === 2 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							value = customAttribute.value[ index ];

							customAttribute.array[ offset ] 	= value.x;
							customAttribute.array[ offset + 1 ] = value.y;

							offset += 2;

						}

					} else if ( customAttribute.size === 3 ) {

						if ( customAttribute.type === "c" ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								index = sortArray[ ca ][ 1 ];

								value = customAttribute.value[ index ];

								customAttribute.array[ offset ]     = value.r;
								customAttribute.array[ offset + 1 ] = value.g;
								customAttribute.array[ offset + 2 ] = value.b;

								offset += 3;

							}

						} else {

							for ( ca = 0; ca < cal; ca ++ ) {

								index = sortArray[ ca ][ 1 ];

								value = customAttribute.value[ index ];

								customAttribute.array[ offset ] 	= value.x;
								customAttribute.array[ offset + 1 ] = value.y;
								customAttribute.array[ offset + 2 ] = value.z;

								offset += 3;

							}

						}

					} else if ( customAttribute.size === 4 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							value = customAttribute.value[ index ];

							customAttribute.array[ offset ]      = value.x;
							customAttribute.array[ offset + 1  ] = value.y;
							customAttribute.array[ offset + 2  ] = value.z;
							customAttribute.array[ offset + 3  ] = value.w;

							offset += 4;

						}

					}

				}

			}

		} else {

			if ( dirtyVertices ) {

				for ( v = 0; v < vl; v ++ ) {

					vertex = vertices[ v ];

					offset = v * 3;

					vertexArray[ offset ]     = vertex.x;
					vertexArray[ offset + 1 ] = vertex.y;
					vertexArray[ offset + 2 ] = vertex.z;

				}

			}

			if ( dirtyColors ) {

				for ( c = 0; c < cl; c ++ ) {

					color = colors[ c ];

					offset = c * 3;

					colorArray[ offset ]     = color.r;
					colorArray[ offset + 1 ] = color.g;
					colorArray[ offset + 2 ] = color.b;

				}

			}

			if ( customAttributes ) {

				for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

					customAttribute = customAttributes[ i ];

					if ( customAttribute.needsUpdate &&
						 ( customAttribute.boundTo === undefined ||
						   customAttribute.boundTo === "vertices") ) {

						cal = customAttribute.value.length;

						offset = 0;

						if ( customAttribute.size === 1 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								customAttribute.array[ ca ] = customAttribute.value[ ca ];

							}

						} else if ( customAttribute.size === 2 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.x;
								customAttribute.array[ offset + 1 ] = value.y;

								offset += 2;

							}

						} else if ( customAttribute.size === 3 ) {

							if ( customAttribute.type === "c" ) {

								for ( ca = 0; ca < cal; ca ++ ) {

									value = customAttribute.value[ ca ];

									customAttribute.array[ offset ] 	= value.r;
									customAttribute.array[ offset + 1 ] = value.g;
									customAttribute.array[ offset + 2 ] = value.b;

									offset += 3;

								}

							} else {

								for ( ca = 0; ca < cal; ca ++ ) {

									value = customAttribute.value[ ca ];

									customAttribute.array[ offset ] 	= value.x;
									customAttribute.array[ offset + 1 ] = value.y;
									customAttribute.array[ offset + 2 ] = value.z;

									offset += 3;

								}

							}

						} else if ( customAttribute.size === 4 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ]      = value.x;
								customAttribute.array[ offset + 1  ] = value.y;
								customAttribute.array[ offset + 2  ] = value.z;
								customAttribute.array[ offset + 3  ] = value.w;

								offset += 4;

							}

						}

					}

				}

			}

		}

		if ( dirtyVertices || object.sortParticles ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors || object.sortParticles ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( customAttribute.needsUpdate || object.sortParticles ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
					_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

				}

			}

		}


	};

	function setLineBuffers ( geometry, hint ) {

		var v, c, d, vertex, offset, color,

		vertices = geometry.vertices,
		colors = geometry.colors,
		lineDistances = geometry.lineDistances,

		vl = vertices.length,
		cl = colors.length,
		dl = lineDistances.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,
		lineDistanceArray = geometry.__lineDistanceArray,

		dirtyVertices = geometry.verticesNeedUpdate,
		dirtyColors = geometry.colorsNeedUpdate,
		dirtyLineDistances = geometry.lineDistancesNeedUpdate,

		customAttributes = geometry.__webglCustomAttributesList,

		i, il,
		a, ca, cal, value,
		customAttribute;

		if ( dirtyVertices ) {

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ];

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors ) {

			for ( c = 0; c < cl; c ++ ) {

				color = colors[ c ];

				offset = c * 3;

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

		if ( dirtyLineDistances ) {

			for ( d = 0; d < dl; d ++ ) {

				lineDistanceArray[ d ] = lineDistances[ d ];

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglLineDistanceBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, lineDistanceArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( customAttribute.needsUpdate &&
					 ( customAttribute.boundTo === undefined ||
					   customAttribute.boundTo === "vertices" ) ) {

					offset = 0;

					cal = customAttribute.value.length;

					if ( customAttribute.size === 1 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							customAttribute.array[ ca ] = customAttribute.value[ ca ];

						}

					} else if ( customAttribute.size === 2 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ] 	= value.x;
							customAttribute.array[ offset + 1 ] = value.y;

							offset += 2;

						}

					} else if ( customAttribute.size === 3 ) {

						if ( customAttribute.type === "c" ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.r;
								customAttribute.array[ offset + 1 ] = value.g;
								customAttribute.array[ offset + 2 ] = value.b;

								offset += 3;

							}

						} else {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.x;
								customAttribute.array[ offset + 1 ] = value.y;
								customAttribute.array[ offset + 2 ] = value.z;

								offset += 3;

							}

						}

					} else if ( customAttribute.size === 4 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ] 	 = value.x;
							customAttribute.array[ offset + 1  ] = value.y;
							customAttribute.array[ offset + 2  ] = value.z;
							customAttribute.array[ offset + 3  ] = value.w;

							offset += 4;

						}

					}

					_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
					_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

				}

			}

		}

	};

	function setRibbonBuffers ( geometry, hint ) {

		var v, c, n, vertex, offset, color, normal,

		i, il, ca, cal, customAttribute, value,

		vertices = geometry.vertices,
		colors = geometry.colors,
		normals = geometry.normals,

		vl = vertices.length,
		cl = colors.length,
		nl = normals.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,
		normalArray = geometry.__normalArray,

		dirtyVertices = geometry.verticesNeedUpdate,
		dirtyColors = geometry.colorsNeedUpdate,
		dirtyNormals = geometry.normalsNeedUpdate,

		customAttributes = geometry.__webglCustomAttributesList;

		if ( dirtyVertices ) {

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ];

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors ) {

			for ( c = 0; c < cl; c ++ ) {

				color = colors[ c ];

				offset = c * 3;

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

		if ( dirtyNormals ) {

			for ( n = 0; n < nl; n ++ ) {

				normal = normals[ n ];

				offset = n * 3;

				normalArray[ offset ]     = normal.x;
				normalArray[ offset + 1 ] = normal.y;
				normalArray[ offset + 2 ] = normal.z;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglNormalBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, normalArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( customAttribute.needsUpdate &&
					 ( customAttribute.boundTo === undefined ||
					   customAttribute.boundTo === "vertices" ) ) {

					offset = 0;

					cal = customAttribute.value.length;

					if ( customAttribute.size === 1 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							customAttribute.array[ ca ] = customAttribute.value[ ca ];

						}

					} else if ( customAttribute.size === 2 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ] 	= value.x;
							customAttribute.array[ offset + 1 ] = value.y;

							offset += 2;

						}

					} else if ( customAttribute.size === 3 ) {

						if ( customAttribute.type === "c" ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.r;
								customAttribute.array[ offset + 1 ] = value.g;
								customAttribute.array[ offset + 2 ] = value.b;

								offset += 3;

							}

						} else {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.x;
								customAttribute.array[ offset + 1 ] = value.y;
								customAttribute.array[ offset + 2 ] = value.z;

								offset += 3;

							}

						}

					} else if ( customAttribute.size === 4 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ] 	 = value.x;
							customAttribute.array[ offset + 1  ] = value.y;
							customAttribute.array[ offset + 2  ] = value.z;
							customAttribute.array[ offset + 3  ] = value.w;

							offset += 4;

						}

					}

					_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
					_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

				}

			}

		}

	};

	function setMeshBuffers( geometryGroup, object, hint, dispose, material ) {

		if ( ! geometryGroup.__inittedArrays ) {

			return;

		}

		var normalType = bufferGuessNormalType( material ),
		vertexColorType = bufferGuessVertexColorType( material ),
		uvType = bufferGuessUVType( material ),

		needsSmoothNormals = ( normalType === THREE.SmoothShading );

		var f, fl, fi, face,
		vertexNormals, faceNormal, normal,
		vertexColors, faceColor,
		vertexTangents,
		uv, uv2, v1, v2, v3, v4, t1, t2, t3, t4, n1, n2, n3, n4,
		c1, c2, c3, c4,
		sw1, sw2, sw3, sw4,
		si1, si2, si3, si4,
		sa1, sa2, sa3, sa4,
		sb1, sb2, sb3, sb4,
		m, ml, i, il,
		vn, uvi, uv2i,
		vk, vkl, vka,
		nka, chf, faceVertexNormals,
		a,

		vertexIndex = 0,

		offset = 0,
		offset_uv = 0,
		offset_uv2 = 0,
		offset_face = 0,
		offset_normal = 0,
		offset_tangent = 0,
		offset_line = 0,
		offset_color = 0,
		offset_skin = 0,
		offset_morphTarget = 0,
		offset_custom = 0,
		offset_customSrc = 0,

		value,

		vertexArray = geometryGroup.__vertexArray,
		uvArray = geometryGroup.__uvArray,
		uv2Array = geometryGroup.__uv2Array,
		normalArray = geometryGroup.__normalArray,
		tangentArray = geometryGroup.__tangentArray,
		colorArray = geometryGroup.__colorArray,

		skinIndexArray = geometryGroup.__skinIndexArray,
		skinWeightArray = geometryGroup.__skinWeightArray,

		morphTargetsArrays = geometryGroup.__morphTargetsArrays,
		morphNormalsArrays = geometryGroup.__morphNormalsArrays,

		customAttributes = geometryGroup.__webglCustomAttributesList,
		customAttribute,

		faceArray = geometryGroup.__faceArray,
		lineArray = geometryGroup.__lineArray,

		geometry = object.geometry, // this is shared for all chunks

		dirtyVertices = geometry.verticesNeedUpdate,
		dirtyElements = geometry.elementsNeedUpdate,
		dirtyUvs = geometry.uvsNeedUpdate,
		dirtyNormals = geometry.normalsNeedUpdate,
		dirtyTangents = geometry.tangentsNeedUpdate,
		dirtyColors = geometry.colorsNeedUpdate,
		dirtyMorphTargets = geometry.morphTargetsNeedUpdate,

		vertices = geometry.vertices,
		chunk_faces3 = geometryGroup.faces3,
		chunk_faces4 = geometryGroup.faces4,
		obj_faces = geometry.faces,

		obj_uvs  = geometry.faceVertexUvs[ 0 ],
		obj_uvs2 = geometry.faceVertexUvs[ 1 ],

		obj_colors = geometry.colors,

		obj_skinIndices = geometry.skinIndices,
		obj_skinWeights = geometry.skinWeights,

		morphTargets = geometry.morphTargets,
		morphNormals = geometry.morphNormals;

		if ( dirtyVertices ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ] ];

				v1 = vertices[ face.a ];
				v2 = vertices[ face.b ];
				v3 = vertices[ face.c ];

				vertexArray[ offset ]     = v1.x;
				vertexArray[ offset + 1 ] = v1.y;
				vertexArray[ offset + 2 ] = v1.z;

				vertexArray[ offset + 3 ] = v2.x;
				vertexArray[ offset + 4 ] = v2.y;
				vertexArray[ offset + 5 ] = v2.z;

				vertexArray[ offset + 6 ] = v3.x;
				vertexArray[ offset + 7 ] = v3.y;
				vertexArray[ offset + 8 ] = v3.z;

				offset += 9;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				v1 = vertices[ face.a ];
				v2 = vertices[ face.b ];
				v3 = vertices[ face.c ];
				v4 = vertices[ face.d ];

				vertexArray[ offset ]     = v1.x;
				vertexArray[ offset + 1 ] = v1.y;
				vertexArray[ offset + 2 ] = v1.z;

				vertexArray[ offset + 3 ] = v2.x;
				vertexArray[ offset + 4 ] = v2.y;
				vertexArray[ offset + 5 ] = v2.z;

				vertexArray[ offset + 6 ] = v3.x;
				vertexArray[ offset + 7 ] = v3.y;
				vertexArray[ offset + 8 ] = v3.z;

				vertexArray[ offset + 9 ]  = v4.x;
				vertexArray[ offset + 10 ] = v4.y;
				vertexArray[ offset + 11 ] = v4.z;

				offset += 12;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyMorphTargets ) {

			for ( vk = 0, vkl = morphTargets.length; vk < vkl; vk ++ ) {

				offset_morphTarget = 0;

				for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

					chf = chunk_faces3[ f ];
					face = obj_faces[ chf ];

					// morph positions

					v1 = morphTargets[ vk ].vertices[ face.a ];
					v2 = morphTargets[ vk ].vertices[ face.b ];
					v3 = morphTargets[ vk ].vertices[ face.c ];

					vka = morphTargetsArrays[ vk ];

					vka[ offset_morphTarget ] 	  = v1.x;
					vka[ offset_morphTarget + 1 ] = v1.y;
					vka[ offset_morphTarget + 2 ] = v1.z;

					vka[ offset_morphTarget + 3 ] = v2.x;
					vka[ offset_morphTarget + 4 ] = v2.y;
					vka[ offset_morphTarget + 5 ] = v2.z;

					vka[ offset_morphTarget + 6 ] = v3.x;
					vka[ offset_morphTarget + 7 ] = v3.y;
					vka[ offset_morphTarget + 8 ] = v3.z;

					// morph normals

					if ( material.morphNormals ) {

						if ( needsSmoothNormals ) {

							faceVertexNormals = morphNormals[ vk ].vertexNormals[ chf ];

							n1 = faceVertexNormals.a;
							n2 = faceVertexNormals.b;
							n3 = faceVertexNormals.c;

						} else {

							n1 = morphNormals[ vk ].faceNormals[ chf ];
							n2 = n1;
							n3 = n1;

						}

						nka = morphNormalsArrays[ vk ];

						nka[ offset_morphTarget ] 	  = n1.x;
						nka[ offset_morphTarget + 1 ] = n1.y;
						nka[ offset_morphTarget + 2 ] = n1.z;

						nka[ offset_morphTarget + 3 ] = n2.x;
						nka[ offset_morphTarget + 4 ] = n2.y;
						nka[ offset_morphTarget + 5 ] = n2.z;

						nka[ offset_morphTarget + 6 ] = n3.x;
						nka[ offset_morphTarget + 7 ] = n3.y;
						nka[ offset_morphTarget + 8 ] = n3.z;

					}

					//

					offset_morphTarget += 9;

				}

				for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

					chf = chunk_faces4[ f ];
					face = obj_faces[ chf ];

					// morph positions

					v1 = morphTargets[ vk ].vertices[ face.a ];
					v2 = morphTargets[ vk ].vertices[ face.b ];
					v3 = morphTargets[ vk ].vertices[ face.c ];
					v4 = morphTargets[ vk ].vertices[ face.d ];

					vka = morphTargetsArrays[ vk ];

					vka[ offset_morphTarget ] 	  = v1.x;
					vka[ offset_morphTarget + 1 ] = v1.y;
					vka[ offset_morphTarget + 2 ] = v1.z;

					vka[ offset_morphTarget + 3 ] = v2.x;
					vka[ offset_morphTarget + 4 ] = v2.y;
					vka[ offset_morphTarget + 5 ] = v2.z;

					vka[ offset_morphTarget + 6 ] = v3.x;
					vka[ offset_morphTarget + 7 ] = v3.y;
					vka[ offset_morphTarget + 8 ] = v3.z;

					vka[ offset_morphTarget + 9 ]  = v4.x;
					vka[ offset_morphTarget + 10 ] = v4.y;
					vka[ offset_morphTarget + 11 ] = v4.z;

					// morph normals

					if ( material.morphNormals ) {

						if ( needsSmoothNormals ) {

							faceVertexNormals = morphNormals[ vk ].vertexNormals[ chf ];

							n1 = faceVertexNormals.a;
							n2 = faceVertexNormals.b;
							n3 = faceVertexNormals.c;
							n4 = faceVertexNormals.d;

						} else {

							n1 = morphNormals[ vk ].faceNormals[ chf ];
							n2 = n1;
							n3 = n1;
							n4 = n1;

						}

						nka = morphNormalsArrays[ vk ];

						nka[ offset_morphTarget ] 	  = n1.x;
						nka[ offset_morphTarget + 1 ] = n1.y;
						nka[ offset_morphTarget + 2 ] = n1.z;

						nka[ offset_morphTarget + 3 ] = n2.x;
						nka[ offset_morphTarget + 4 ] = n2.y;
						nka[ offset_morphTarget + 5 ] = n2.z;

						nka[ offset_morphTarget + 6 ] = n3.x;
						nka[ offset_morphTarget + 7 ] = n3.y;
						nka[ offset_morphTarget + 8 ] = n3.z;

						nka[ offset_morphTarget + 9 ]  = n4.x;
						nka[ offset_morphTarget + 10 ] = n4.y;
						nka[ offset_morphTarget + 11 ] = n4.z;

					}

					//

					offset_morphTarget += 12;

				}

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ vk ] );
				_gl.bufferData( _gl.ARRAY_BUFFER, morphTargetsArrays[ vk ], hint );

				if ( material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ vk ] );
					_gl.bufferData( _gl.ARRAY_BUFFER, morphNormalsArrays[ vk ], hint );

				}

			}

		}

		if ( obj_skinWeights.length ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				// weights

				sw1 = obj_skinWeights[ face.a ];
				sw2 = obj_skinWeights[ face.b ];
				sw3 = obj_skinWeights[ face.c ];

				skinWeightArray[ offset_skin ]     = sw1.x;
				skinWeightArray[ offset_skin + 1 ] = sw1.y;
				skinWeightArray[ offset_skin + 2 ] = sw1.z;
				skinWeightArray[ offset_skin + 3 ] = sw1.w;

				skinWeightArray[ offset_skin + 4 ] = sw2.x;
				skinWeightArray[ offset_skin + 5 ] = sw2.y;
				skinWeightArray[ offset_skin + 6 ] = sw2.z;
				skinWeightArray[ offset_skin + 7 ] = sw2.w;

				skinWeightArray[ offset_skin + 8 ]  = sw3.x;
				skinWeightArray[ offset_skin + 9 ]  = sw3.y;
				skinWeightArray[ offset_skin + 10 ] = sw3.z;
				skinWeightArray[ offset_skin + 11 ] = sw3.w;

				// indices

				si1 = obj_skinIndices[ face.a ];
				si2 = obj_skinIndices[ face.b ];
				si3 = obj_skinIndices[ face.c ];

				skinIndexArray[ offset_skin ]     = si1.x;
				skinIndexArray[ offset_skin + 1 ] = si1.y;
				skinIndexArray[ offset_skin + 2 ] = si1.z;
				skinIndexArray[ offset_skin + 3 ] = si1.w;

				skinIndexArray[ offset_skin + 4 ] = si2.x;
				skinIndexArray[ offset_skin + 5 ] = si2.y;
				skinIndexArray[ offset_skin + 6 ] = si2.z;
				skinIndexArray[ offset_skin + 7 ] = si2.w;

				skinIndexArray[ offset_skin + 8 ]  = si3.x;
				skinIndexArray[ offset_skin + 9 ]  = si3.y;
				skinIndexArray[ offset_skin + 10 ] = si3.z;
				skinIndexArray[ offset_skin + 11 ] = si3.w;

				offset_skin += 12;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				// weights

				sw1 = obj_skinWeights[ face.a ];
				sw2 = obj_skinWeights[ face.b ];
				sw3 = obj_skinWeights[ face.c ];
				sw4 = obj_skinWeights[ face.d ];

				skinWeightArray[ offset_skin ]     = sw1.x;
				skinWeightArray[ offset_skin + 1 ] = sw1.y;
				skinWeightArray[ offset_skin + 2 ] = sw1.z;
				skinWeightArray[ offset_skin + 3 ] = sw1.w;

				skinWeightArray[ offset_skin + 4 ] = sw2.x;
				skinWeightArray[ offset_skin + 5 ] = sw2.y;
				skinWeightArray[ offset_skin + 6 ] = sw2.z;
				skinWeightArray[ offset_skin + 7 ] = sw2.w;

				skinWeightArray[ offset_skin + 8 ]  = sw3.x;
				skinWeightArray[ offset_skin + 9 ]  = sw3.y;
				skinWeightArray[ offset_skin + 10 ] = sw3.z;
				skinWeightArray[ offset_skin + 11 ] = sw3.w;

				skinWeightArray[ offset_skin + 12 ] = sw4.x;
				skinWeightArray[ offset_skin + 13 ] = sw4.y;
				skinWeightArray[ offset_skin + 14 ] = sw4.z;
				skinWeightArray[ offset_skin + 15 ] = sw4.w;

				// indices

				si1 = obj_skinIndices[ face.a ];
				si2 = obj_skinIndices[ face.b ];
				si3 = obj_skinIndices[ face.c ];
				si4 = obj_skinIndices[ face.d ];

				skinIndexArray[ offset_skin ]     = si1.x;
				skinIndexArray[ offset_skin + 1 ] = si1.y;
				skinIndexArray[ offset_skin + 2 ] = si1.z;
				skinIndexArray[ offset_skin + 3 ] = si1.w;

				skinIndexArray[ offset_skin + 4 ] = si2.x;
				skinIndexArray[ offset_skin + 5 ] = si2.y;
				skinIndexArray[ offset_skin + 6 ] = si2.z;
				skinIndexArray[ offset_skin + 7 ] = si2.w;

				skinIndexArray[ offset_skin + 8 ]  = si3.x;
				skinIndexArray[ offset_skin + 9 ]  = si3.y;
				skinIndexArray[ offset_skin + 10 ] = si3.z;
				skinIndexArray[ offset_skin + 11 ] = si3.w;

				skinIndexArray[ offset_skin + 12 ] = si4.x;
				skinIndexArray[ offset_skin + 13 ] = si4.y;
				skinIndexArray[ offset_skin + 14 ] = si4.z;
				skinIndexArray[ offset_skin + 15 ] = si4.w;

				offset_skin += 16;

			}

			if ( offset_skin > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinIndexArray, hint );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinWeightArray, hint );

			}

		}

		if ( dirtyColors && vertexColorType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				vertexColors = face.vertexColors;
				faceColor = face.color;

				if ( vertexColors.length === 3 && vertexColorType === THREE.VertexColors ) {

					c1 = vertexColors[ 0 ];
					c2 = vertexColors[ 1 ];
					c3 = vertexColors[ 2 ];

				} else {

					c1 = faceColor;
					c2 = faceColor;
					c3 = faceColor;

				}

				colorArray[ offset_color ]     = c1.r;
				colorArray[ offset_color + 1 ] = c1.g;
				colorArray[ offset_color + 2 ] = c1.b;

				colorArray[ offset_color + 3 ] = c2.r;
				colorArray[ offset_color + 4 ] = c2.g;
				colorArray[ offset_color + 5 ] = c2.b;

				colorArray[ offset_color + 6 ] = c3.r;
				colorArray[ offset_color + 7 ] = c3.g;
				colorArray[ offset_color + 8 ] = c3.b;

				offset_color += 9;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				vertexColors = face.vertexColors;
				faceColor = face.color;

				if ( vertexColors.length === 4 && vertexColorType === THREE.VertexColors ) {

					c1 = vertexColors[ 0 ];
					c2 = vertexColors[ 1 ];
					c3 = vertexColors[ 2 ];
					c4 = vertexColors[ 3 ];

				} else {

					c1 = faceColor;
					c2 = faceColor;
					c3 = faceColor;
					c4 = faceColor;

				}

				colorArray[ offset_color ]     = c1.r;
				colorArray[ offset_color + 1 ] = c1.g;
				colorArray[ offset_color + 2 ] = c1.b;

				colorArray[ offset_color + 3 ] = c2.r;
				colorArray[ offset_color + 4 ] = c2.g;
				colorArray[ offset_color + 5 ] = c2.b;

				colorArray[ offset_color + 6 ] = c3.r;
				colorArray[ offset_color + 7 ] = c3.g;
				colorArray[ offset_color + 8 ] = c3.b;

				colorArray[ offset_color + 9 ]  = c4.r;
				colorArray[ offset_color + 10 ] = c4.g;
				colorArray[ offset_color + 11 ] = c4.b;

				offset_color += 12;

			}

			if ( offset_color > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

			}

		}

		if ( dirtyTangents && geometry.hasTangents ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				vertexTangents = face.vertexTangents;

				t1 = vertexTangents[ 0 ];
				t2 = vertexTangents[ 1 ];
				t3 = vertexTangents[ 2 ];

				tangentArray[ offset_tangent ]     = t1.x;
				tangentArray[ offset_tangent + 1 ] = t1.y;
				tangentArray[ offset_tangent + 2 ] = t1.z;
				tangentArray[ offset_tangent + 3 ] = t1.w;

				tangentArray[ offset_tangent + 4 ] = t2.x;
				tangentArray[ offset_tangent + 5 ] = t2.y;
				tangentArray[ offset_tangent + 6 ] = t2.z;
				tangentArray[ offset_tangent + 7 ] = t2.w;

				tangentArray[ offset_tangent + 8 ]  = t3.x;
				tangentArray[ offset_tangent + 9 ]  = t3.y;
				tangentArray[ offset_tangent + 10 ] = t3.z;
				tangentArray[ offset_tangent + 11 ] = t3.w;

				offset_tangent += 12;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				vertexTangents = face.vertexTangents;

				t1 = vertexTangents[ 0 ];
				t2 = vertexTangents[ 1 ];
				t3 = vertexTangents[ 2 ];
				t4 = vertexTangents[ 3 ];

				tangentArray[ offset_tangent ]     = t1.x;
				tangentArray[ offset_tangent + 1 ] = t1.y;
				tangentArray[ offset_tangent + 2 ] = t1.z;
				tangentArray[ offset_tangent + 3 ] = t1.w;

				tangentArray[ offset_tangent + 4 ] = t2.x;
				tangentArray[ offset_tangent + 5 ] = t2.y;
				tangentArray[ offset_tangent + 6 ] = t2.z;
				tangentArray[ offset_tangent + 7 ] = t2.w;

				tangentArray[ offset_tangent + 8 ]  = t3.x;
				tangentArray[ offset_tangent + 9 ]  = t3.y;
				tangentArray[ offset_tangent + 10 ] = t3.z;
				tangentArray[ offset_tangent + 11 ] = t3.w;

				tangentArray[ offset_tangent + 12 ] = t4.x;
				tangentArray[ offset_tangent + 13 ] = t4.y;
				tangentArray[ offset_tangent + 14 ] = t4.z;
				tangentArray[ offset_tangent + 15 ] = t4.w;

				offset_tangent += 16;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, tangentArray, hint );

		}

		if ( dirtyNormals && normalType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				vertexNormals = face.vertexNormals;
				faceNormal = face.normal;

				if ( vertexNormals.length === 3 && needsSmoothNormals ) {

					for ( i = 0; i < 3; i ++ ) {

						vn = vertexNormals[ i ];

						normalArray[ offset_normal ]     = vn.x;
						normalArray[ offset_normal + 1 ] = vn.y;
						normalArray[ offset_normal + 2 ] = vn.z;

						offset_normal += 3;

					}

				} else {

					for ( i = 0; i < 3; i ++ ) {

						normalArray[ offset_normal ]     = faceNormal.x;
						normalArray[ offset_normal + 1 ] = faceNormal.y;
						normalArray[ offset_normal + 2 ] = faceNormal.z;

						offset_normal += 3;

					}

				}

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				vertexNormals = face.vertexNormals;
				faceNormal = face.normal;

				if ( vertexNormals.length === 4 && needsSmoothNormals ) {

					for ( i = 0; i < 4; i ++ ) {

						vn = vertexNormals[ i ];

						normalArray[ offset_normal ]     = vn.x;
						normalArray[ offset_normal + 1 ] = vn.y;
						normalArray[ offset_normal + 2 ] = vn.z;

						offset_normal += 3;

					}

				} else {

					for ( i = 0; i < 4; i ++ ) {

						normalArray[ offset_normal ]     = faceNormal.x;
						normalArray[ offset_normal + 1 ] = faceNormal.y;
						normalArray[ offset_normal + 2 ] = faceNormal.z;

						offset_normal += 3;

					}

				}

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, normalArray, hint );

		}

		if ( dirtyUvs && obj_uvs && uvType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				fi = chunk_faces3[ f ];

				uv = obj_uvs[ fi ];

				if ( uv === undefined ) continue;

				for ( i = 0; i < 3; i ++ ) {

					uvi = uv[ i ];

					uvArray[ offset_uv ]     = uvi.u;
					uvArray[ offset_uv + 1 ] = uvi.v;

					offset_uv += 2;

				}

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				fi = chunk_faces4[ f ];

				uv = obj_uvs[ fi ];

				if ( uv === undefined ) continue;

				for ( i = 0; i < 4; i ++ ) {

					uvi = uv[ i ];

					uvArray[ offset_uv ]     = uvi.u;
					uvArray[ offset_uv + 1 ] = uvi.v;

					offset_uv += 2;

				}

			}

			if ( offset_uv > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, uvArray, hint );

			}

		}

		if ( dirtyUvs && obj_uvs2 && uvType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				fi = chunk_faces3[ f ];

				uv2 = obj_uvs2[ fi ];

				if ( uv2 === undefined ) continue;

				for ( i = 0; i < 3; i ++ ) {

					uv2i = uv2[ i ];

					uv2Array[ offset_uv2 ]     = uv2i.u;
					uv2Array[ offset_uv2 + 1 ] = uv2i.v;

					offset_uv2 += 2;

				}

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				fi = chunk_faces4[ f ];

				uv2 = obj_uvs2[ fi ];

				if ( uv2 === undefined ) continue;

				for ( i = 0; i < 4; i ++ ) {

					uv2i = uv2[ i ];

					uv2Array[ offset_uv2 ]     = uv2i.u;
					uv2Array[ offset_uv2 + 1 ] = uv2i.v;

					offset_uv2 += 2;

				}

			}

			if ( offset_uv2 > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, uv2Array, hint );

			}

		}

		if ( dirtyElements ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				faceArray[ offset_face ] 	 = vertexIndex;
				faceArray[ offset_face + 1 ] = vertexIndex + 1;
				faceArray[ offset_face + 2 ] = vertexIndex + 2;

				offset_face += 3;

				lineArray[ offset_line ]     = vertexIndex;
				lineArray[ offset_line + 1 ] = vertexIndex + 1;

				lineArray[ offset_line + 2 ] = vertexIndex;
				lineArray[ offset_line + 3 ] = vertexIndex + 2;

				lineArray[ offset_line + 4 ] = vertexIndex + 1;
				lineArray[ offset_line + 5 ] = vertexIndex + 2;

				offset_line += 6;

				vertexIndex += 3;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				faceArray[ offset_face ]     = vertexIndex;
				faceArray[ offset_face + 1 ] = vertexIndex + 1;
				faceArray[ offset_face + 2 ] = vertexIndex + 3;

				faceArray[ offset_face + 3 ] = vertexIndex + 1;
				faceArray[ offset_face + 4 ] = vertexIndex + 2;
				faceArray[ offset_face + 5 ] = vertexIndex + 3;

				offset_face += 6;

				lineArray[ offset_line ]     = vertexIndex;
				lineArray[ offset_line + 1 ] = vertexIndex + 1;

				lineArray[ offset_line + 2 ] = vertexIndex;
				lineArray[ offset_line + 3 ] = vertexIndex + 3;

				lineArray[ offset_line + 4 ] = vertexIndex + 1;
				lineArray[ offset_line + 5 ] = vertexIndex + 2;

				lineArray[ offset_line + 6 ] = vertexIndex + 2;
				lineArray[ offset_line + 7 ] = vertexIndex + 3;

				offset_line += 8;

				vertexIndex += 4;

			}

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
			_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, faceArray, hint );

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
			_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, lineArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( ! customAttribute.__original.needsUpdate ) continue;

				offset_custom = 0;
				offset_customSrc = 0;

				if ( customAttribute.size === 1 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							customAttribute.array[ offset_custom ] 	   = customAttribute.value[ face.a ];
							customAttribute.array[ offset_custom + 1 ] = customAttribute.value[ face.b ];
							customAttribute.array[ offset_custom + 2 ] = customAttribute.value[ face.c ];

							offset_custom += 3;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							customAttribute.array[ offset_custom ] 	   = customAttribute.value[ face.a ];
							customAttribute.array[ offset_custom + 1 ] = customAttribute.value[ face.b ];
							customAttribute.array[ offset_custom + 2 ] = customAttribute.value[ face.c ];
							customAttribute.array[ offset_custom + 3 ] = customAttribute.value[ face.d ];

							offset_custom += 4;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							customAttribute.array[ offset_custom ] 	   = value;
							customAttribute.array[ offset_custom + 1 ] = value;
							customAttribute.array[ offset_custom + 2 ] = value;

							offset_custom += 3;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							customAttribute.array[ offset_custom ] 	   = value;
							customAttribute.array[ offset_custom + 1 ] = value;
							customAttribute.array[ offset_custom + 2 ] = value;
							customAttribute.array[ offset_custom + 3 ] = value;

							offset_custom += 4;

						}

					}

				} else if ( customAttribute.size === 2 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							offset_custom += 6;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];
							v4 = customAttribute.value[ face.d ];

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							customAttribute.array[ offset_custom + 6 ] = v4.x;
							customAttribute.array[ offset_custom + 7 ] = v4.y;

							offset_custom += 8;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							offset_custom += 6;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;
							v4 = value;

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							customAttribute.array[ offset_custom + 6 ] = v4.x;
							customAttribute.array[ offset_custom + 7 ] = v4.y;

							offset_custom += 8;

						}

					}

				} else if ( customAttribute.size === 3 ) {

					var pp;

					if ( customAttribute.type === "c" ) {

						pp = [ "r", "g", "b" ];

					} else {

						pp = [ "x", "y", "z" ];

					}

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom ] 	   = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];
							v4 = customAttribute.value[ face.d ];

							customAttribute.array[ offset_custom  ] 	= v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];

							offset_custom += 12;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom ] 	   = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;
							v4 = value;

							customAttribute.array[ offset_custom  ] 	= v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];

							offset_custom += 12;

						}

					} else if ( customAttribute.boundTo === "faceVertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value[ 0 ];
							v2 = value[ 1 ];
							v3 = value[ 2 ];

							customAttribute.array[ offset_custom ] 	   = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value[ 0 ];
							v2 = value[ 1 ];
							v3 = value[ 2 ];
							v4 = value[ 3 ];

							customAttribute.array[ offset_custom  ] 	= v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];

							offset_custom += 12;

						}

					}

				} else if ( customAttribute.size === 4 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];
							v4 = customAttribute.value[ face.d ];

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							customAttribute.array[ offset_custom + 12 ] = v4.x;
							customAttribute.array[ offset_custom + 13 ] = v4.y;
							customAttribute.array[ offset_custom + 14 ] = v4.z;
							customAttribute.array[ offset_custom + 15 ] = v4.w;

							offset_custom += 16;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;
							v4 = value;

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							customAttribute.array[ offset_custom + 12 ] = v4.x;
							customAttribute.array[ offset_custom + 13 ] = v4.y;
							customAttribute.array[ offset_custom + 14 ] = v4.z;
							customAttribute.array[ offset_custom + 15 ] = v4.w;

							offset_custom += 16;

						}

					} else if ( customAttribute.boundTo === "faceVertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value[ 0 ];
							v2 = value[ 1 ];
							v3 = value[ 2 ];

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value[ 0 ];
							v2 = value[ 1 ];
							v3 = value[ 2 ];
							v4 = value[ 3 ];

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							customAttribute.array[ offset_custom + 12 ] = v4.x;
							customAttribute.array[ offset_custom + 13 ] = v4.y;
							customAttribute.array[ offset_custom + 14 ] = v4.z;
							customAttribute.array[ offset_custom + 15 ] = v4.w;

							offset_custom += 16;

						}

					}

				}

				_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

			}

		}

		if ( dispose ) {

			delete geometryGroup.__inittedArrays;
			delete geometryGroup.__colorArray;
			delete geometryGroup.__normalArray;
			delete geometryGroup.__tangentArray;
			delete geometryGroup.__uvArray;
			delete geometryGroup.__uv2Array;
			delete geometryGroup.__faceArray;
			delete geometryGroup.__vertexArray;
			delete geometryGroup.__lineArray;
			delete geometryGroup.__skinIndexArray;
			delete geometryGroup.__skinWeightArray;

		}

	};

	function setDirectBuffers ( geometry, hint, dispose ) {

		var attributes = geometry.attributes;

		var index = attributes[ "index" ];
		var position = attributes[ "position" ];
		var normal = attributes[ "normal" ];
		var uv = attributes[ "uv" ];
		var color = attributes[ "color" ];
		var tangent = attributes[ "tangent" ];

		if ( geometry.elementsNeedUpdate && index !== undefined ) {

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );
			_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, index.array, hint );

		}

		if ( geometry.verticesNeedUpdate && position !== undefined ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, position.buffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, position.array, hint );

		}

		if ( geometry.normalsNeedUpdate && normal !== undefined ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, normal.buffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, normal.array, hint );

		}

		if ( geometry.uvsNeedUpdate && uv !== undefined ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, uv.buffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, uv.array, hint );

		}

		if ( geometry.colorsNeedUpdate && color !== undefined ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, color.buffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, color.array, hint );

		}

		if ( geometry.tangentsNeedUpdate && tangent !== undefined ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, tangent.buffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, tangent.array, hint );

		}

		if ( dispose ) {

			for ( var i in geometry.attributes ) {

				delete geometry.attributes[ i ].array;

			}

		}

	};

	// Buffer rendering

	this.renderBufferImmediate = function ( object, program, material ) {

		if ( object.hasPositions && ! object.__webglVertexBuffer ) object.__webglVertexBuffer = _gl.createBuffer();
		if ( object.hasNormals && ! object.__webglNormalBuffer ) object.__webglNormalBuffer = _gl.createBuffer();
		if ( object.hasUvs && ! object.__webglUvBuffer ) object.__webglUvBuffer = _gl.createBuffer();
		if ( object.hasColors && ! object.__webglColorBuffer ) object.__webglColorBuffer = _gl.createBuffer();

		if ( object.hasPositions ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, object.positionArray, _gl.DYNAMIC_DRAW );
			_gl.enableVertexAttribArray( program.attributes.position );
			_gl.vertexAttribPointer( program.attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.hasNormals ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglNormalBuffer );

			if ( material.shading === THREE.FlatShading ) {

				var nx, ny, nz,
					nax, nbx, ncx, nay, nby, ncy, naz, nbz, ncz,
					normalArray,
					i, il = object.count * 3;

				for( i = 0; i < il; i += 9 ) {

					normalArray = object.normalArray;

					nax  = normalArray[ i ];
					nay  = normalArray[ i + 1 ];
					naz  = normalArray[ i + 2 ];

					nbx  = normalArray[ i + 3 ];
					nby  = normalArray[ i + 4 ];
					nbz  = normalArray[ i + 5 ];

					ncx  = normalArray[ i + 6 ];
					ncy  = normalArray[ i + 7 ];
					ncz  = normalArray[ i + 8 ];

					nx = ( nax + nbx + ncx ) / 3;
					ny = ( nay + nby + ncy ) / 3;
					nz = ( naz + nbz + ncz ) / 3;

					normalArray[ i ] 	 = nx;
					normalArray[ i + 1 ] = ny;
					normalArray[ i + 2 ] = nz;

					normalArray[ i + 3 ] = nx;
					normalArray[ i + 4 ] = ny;
					normalArray[ i + 5 ] = nz;

					normalArray[ i + 6 ] = nx;
					normalArray[ i + 7 ] = ny;
					normalArray[ i + 8 ] = nz;

				}

			}

			_gl.bufferData( _gl.ARRAY_BUFFER, object.normalArray, _gl.DYNAMIC_DRAW );
			_gl.enableVertexAttribArray( program.attributes.normal );
			_gl.vertexAttribPointer( program.attributes.normal, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.hasUvs && material.map ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglUvBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, object.uvArray, _gl.DYNAMIC_DRAW );
			_gl.enableVertexAttribArray( program.attributes.uv );
			_gl.vertexAttribPointer( program.attributes.uv, 2, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.hasColors && material.vertexColors !== THREE.NoColors ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, object.colorArray, _gl.DYNAMIC_DRAW );
			_gl.enableVertexAttribArray( program.attributes.color );
			_gl.vertexAttribPointer( program.attributes.color, 3, _gl.FLOAT, false, 0, 0 );

		}

		_gl.drawArrays( _gl.TRIANGLES, 0, object.count );

		object.count = 0;

	};

	this.renderBufferDirect = function ( camera, lights, fog, material, geometry, object ) {

		if ( material.visible === false ) return;

		var program, attributes, linewidth, primitives, a, attribute;

		program = setProgram( camera, lights, fog, material, object );

		attributes = program.attributes;

		var updateBuffers = false,
			wireframeBit = material.wireframe ? 1 : 0,
			geometryHash = ( geometry.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;

		if ( geometryHash !== _currentGeometryGroupHash ) {

			_currentGeometryGroupHash = geometryHash;
			updateBuffers = true;

		}

		// render mesh

		if ( object instanceof THREE.Mesh ) {

			var offsets = geometry.offsets;

			// if there is more than 1 chunk
			// must set attribute pointers to use new offsets for each chunk
			// even if geometry and materials didn't change

			if ( offsets.length > 1 ) updateBuffers = true;

			for ( var i = 0, il = offsets.length; i < il; ++ i ) {

				var startIndex = offsets[ i ].index;

				if ( updateBuffers ) {

					// vertices

					var position = geometry.attributes[ "position" ];
					var positionSize = position.itemSize;

					_gl.bindBuffer( _gl.ARRAY_BUFFER, position.buffer );
					_gl.vertexAttribPointer( attributes.position, positionSize, _gl.FLOAT, false, 0, startIndex * positionSize * 4 ); // 4 bytes per Float32

					// normals

					var normal = geometry.attributes[ "normal" ];

					if ( attributes.normal >= 0 && normal ) {

						var normalSize = normal.itemSize;

						_gl.bindBuffer( _gl.ARRAY_BUFFER, normal.buffer );
						_gl.vertexAttribPointer( attributes.normal, normalSize, _gl.FLOAT, false, 0, startIndex * normalSize * 4 );

					}

					// uvs

					var uv = geometry.attributes[ "uv" ];

					if ( attributes.uv >= 0 && uv ) {

						if ( uv.buffer ) {

							var uvSize = uv.itemSize;

							_gl.bindBuffer( _gl.ARRAY_BUFFER, uv.buffer );
							_gl.vertexAttribPointer( attributes.uv, uvSize, _gl.FLOAT, false, 0, startIndex * uvSize * 4 );

							_gl.enableVertexAttribArray( attributes.uv );

						} else {

							_gl.disableVertexAttribArray( attributes.uv );

						}

					}

					// colors

					var color = geometry.attributes[ "color" ];

					if ( attributes.color >= 0 && color ) {

						var colorSize = color.itemSize;

						_gl.bindBuffer( _gl.ARRAY_BUFFER, color.buffer );
						_gl.vertexAttribPointer( attributes.color, colorSize, _gl.FLOAT, false, 0, startIndex * colorSize * 4 );

					}

					// tangents

					var tangent = geometry.attributes[ "tangent" ];

					if ( attributes.tangent >= 0 && tangent ) {

						var tangentSize = tangent.itemSize;

						_gl.bindBuffer( _gl.ARRAY_BUFFER, tangent.buffer );
						_gl.vertexAttribPointer( attributes.tangent, tangentSize, _gl.FLOAT, false, 0, startIndex * tangentSize * 4 );

					}

					// indices

					var index = geometry.attributes[ "index" ];

					_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );

				}

				// render indexed triangles

				_gl.drawElements( _gl.TRIANGLES, offsets[ i ].count, _gl.UNSIGNED_SHORT, offsets[ i ].start * 2 ); // 2 bytes per Uint16

				_this.info.render.calls ++;
				_this.info.render.vertices += offsets[ i ].count; // not really true, here vertices can be shared
				_this.info.render.faces += offsets[ i ].count / 3;

			}

		// render particles

		} else if ( object instanceof THREE.ParticleSystem ) {

			if ( updateBuffers ) {

				// vertices

				var position = geometry.attributes[ "position" ];
				var positionSize = position.itemSize;

				_gl.bindBuffer( _gl.ARRAY_BUFFER, position.buffer );
				_gl.vertexAttribPointer( attributes.position, positionSize, _gl.FLOAT, false, 0, 0 );

				// colors

				var color = geometry.attributes[ "color" ];

				if ( attributes.color >= 0 && color ) {

					var colorSize = color.itemSize;

					_gl.bindBuffer( _gl.ARRAY_BUFFER, color.buffer );
					_gl.vertexAttribPointer( attributes.color, colorSize, _gl.FLOAT, false, 0, 0 );

				}

				// render particles

				_gl.drawArrays( _gl.POINTS, 0, position.numItems / 3 );

				_this.info.render.calls ++;
				_this.info.render.points += position.numItems / 3;

			}

		}

	};

	this.renderBuffer = function ( camera, lights, fog, material, geometryGroup, object ) {

		if ( material.visible === false ) return;

		var program, attributes, linewidth, primitives, a, attribute, i, il;

		program = setProgram( camera, lights, fog, material, object );

		attributes = program.attributes;

		var updateBuffers = false,
			wireframeBit = material.wireframe ? 1 : 0,
			geometryGroupHash = ( geometryGroup.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;

		if ( geometryGroupHash !== _currentGeometryGroupHash ) {

			_currentGeometryGroupHash = geometryGroupHash;
			updateBuffers = true;

		}

		// vertices

		if ( !material.morphTargets && attributes.position >= 0 ) {

			if ( updateBuffers ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
				_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

			}

		} else {

			if ( object.morphTargetBase ) {

				setupMorphTargets( material, geometryGroup, object );

			}

		}


		if ( updateBuffers ) {

			// custom attributes

			// Use the per-geometryGroup custom attribute arrays which are setup in initMeshBuffers

			if ( geometryGroup.__webglCustomAttributesList ) {

				for ( i = 0, il = geometryGroup.__webglCustomAttributesList.length; i < il; i ++ ) {

					attribute = geometryGroup.__webglCustomAttributesList[ i ];

					if ( attributes[ attribute.buffer.belongsToAttribute ] >= 0 ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, attribute.buffer );
						_gl.vertexAttribPointer( attributes[ attribute.buffer.belongsToAttribute ], attribute.size, _gl.FLOAT, false, 0, 0 );

					}

				}

			}


			// colors

			if ( attributes.color >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );
				_gl.vertexAttribPointer( attributes.color, 3, _gl.FLOAT, false, 0, 0 );

			}

			// normals

			if ( attributes.normal >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
				_gl.vertexAttribPointer( attributes.normal, 3, _gl.FLOAT, false, 0, 0 );

			}

			// tangents

			if ( attributes.tangent >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );
				_gl.vertexAttribPointer( attributes.tangent, 4, _gl.FLOAT, false, 0, 0 );

			}

			// uvs

			if ( attributes.uv >= 0 ) {

				if ( geometryGroup.__webglUVBuffer ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );
					_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 0, 0 );

					_gl.enableVertexAttribArray( attributes.uv );

				} else {

					_gl.disableVertexAttribArray( attributes.uv );

				}

			}

			if ( attributes.uv2 >= 0 ) {

				if ( geometryGroup.__webglUV2Buffer ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );
					_gl.vertexAttribPointer( attributes.uv2, 2, _gl.FLOAT, false, 0, 0 );

					_gl.enableVertexAttribArray( attributes.uv2 );

				} else {

					_gl.disableVertexAttribArray( attributes.uv2 );

				}

			}

			if ( material.skinning &&
				 attributes.skinIndex >= 0 && attributes.skinWeight >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );
				_gl.vertexAttribPointer( attributes.skinIndex, 4, _gl.FLOAT, false, 0, 0 );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );
				_gl.vertexAttribPointer( attributes.skinWeight, 4, _gl.FLOAT, false, 0, 0 );

			}

			// line distances

			if ( attributes.lineDistance >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglLineDistanceBuffer );
				_gl.vertexAttribPointer( attributes.lineDistance, 1, _gl.FLOAT, false, 0, 0 );

			}

		}

		// render mesh

		if ( object instanceof THREE.Mesh ) {

			// wireframe

			if ( material.wireframe ) {

				setLineWidth( material.wireframeLinewidth );

				if ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
				_gl.drawElements( _gl.LINES, geometryGroup.__webglLineCount, _gl.UNSIGNED_SHORT, 0 );

			// triangles

			} else {

				if ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
				_gl.drawElements( _gl.TRIANGLES, geometryGroup.__webglFaceCount, _gl.UNSIGNED_SHORT, 0 );

			}

			_this.info.render.calls ++;
			_this.info.render.vertices += geometryGroup.__webglFaceCount;
			_this.info.render.faces += geometryGroup.__webglFaceCount / 3;

		// render lines

		} else if ( object instanceof THREE.Line ) {

			primitives = ( object.type === THREE.LineStrip ) ? _gl.LINE_STRIP : _gl.LINES;

			setLineWidth( material.linewidth );

			_gl.drawArrays( primitives, 0, geometryGroup.__webglLineCount );

			_this.info.render.calls ++;

		// render particles

		} else if ( object instanceof THREE.ParticleSystem ) {

			_gl.drawArrays( _gl.POINTS, 0, geometryGroup.__webglParticleCount );

			_this.info.render.calls ++;
			_this.info.render.points += geometryGroup.__webglParticleCount;

		// render ribbon

		} else if ( object instanceof THREE.Ribbon ) {

			_gl.drawArrays( _gl.TRIANGLE_STRIP, 0, geometryGroup.__webglVertexCount );

			_this.info.render.calls ++;

		}

	};

	function setupMorphTargets ( material, geometryGroup, object ) {

		// set base

		var attributes = material.program.attributes;

		if ( object.morphTargetBase !== -1 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ object.morphTargetBase ] );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		} else if ( attributes.position >= 0 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.morphTargetForcedOrder.length ) {

			// set forced order

			var m = 0;
			var order = object.morphTargetForcedOrder;
			var influences = object.morphTargetInfluences;

			while ( m < material.numSupportedMorphTargets && m < order.length ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ order[ m ] ] );
				_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

				if ( material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ order[ m ] ] );
					_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

				}

				object.__webglMorphTargetInfluences[ m ] = influences[ order[ m ] ];

				m ++;
			}

		} else {

			// find the most influencing

			var influence, activeInfluenceIndices = [];
			var influences = object.morphTargetInfluences;
			var i, il = influences.length;

			for ( i = 0; i < il; i ++ ) {

				influence = influences[ i ];

				if ( influence > 0 ) {

					activeInfluenceIndices.push( [ i, influence ] );

				}

			}

			if ( activeInfluenceIndices.length > material.numSupportedMorphTargets ) {

				activeInfluenceIndices.sort( numericalSort );
				activeInfluenceIndices.length = material.numSupportedMorphTargets;

			} else if ( activeInfluenceIndices.length > material.numSupportedMorphNormals ) {

				activeInfluenceIndices.sort( numericalSort );

			} else if ( activeInfluenceIndices.length === 0 ) {

				activeInfluenceIndices.push( [ 0, 0 ] );

			};

			var influenceIndex, m = 0;

			while ( m < material.numSupportedMorphTargets ) {

				if ( activeInfluenceIndices[ m ] ) {

					influenceIndex = activeInfluenceIndices[ m ][ 0 ];

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ influenceIndex ] );

					_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

					if ( material.morphNormals ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ influenceIndex ] );
						_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

					}

					object.__webglMorphTargetInfluences[ m ] = influences[ influenceIndex ];

				} else {

					_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

					if ( material.morphNormals ) {

						_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

					}

					object.__webglMorphTargetInfluences[ m ] = 0;

				}

				m ++;

			}

		}

		// load updated influences uniform

		if ( material.program.uniforms.morphTargetInfluences !== null ) {

			_gl.uniform1fv( material.program.uniforms.morphTargetInfluences, object.__webglMorphTargetInfluences );

		}

	};

	// Sorting

	function painterSortStable ( a, b ) {

		if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return b.id - a.id;

		}

	};

	function numericalSort ( a, b ) {

		return b[ 1 ] - a[ 1 ];

	};


	// Rendering

	this.render = function ( scene, camera, renderTarget, forceClear ) {

		if ( camera instanceof THREE.Camera === false ) {

			console.error( 'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.' );
			return;

		}

		var i, il,

		webglObject, object,
		renderList,

		lights = scene.__lights,
		fog = scene.fog;

		// reset caching for this frame

		_currentMaterialId = -1;
		_lightsNeedUpdate = true;

		// update scene graph

		if ( this.autoUpdateScene ) scene.updateMatrixWorld();

		// update camera matrices and frustum

		if ( camera.parent === undefined ) camera.updateMatrixWorld();

		if ( ! camera._viewMatrixArray ) camera._viewMatrixArray = new Float32Array( 16 );
		if ( ! camera._projectionMatrixArray ) camera._projectionMatrixArray = new Float32Array( 16 );

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		camera.matrixWorldInverse.flattenToArray( camera._viewMatrixArray );
		camera.projectionMatrix.flattenToArray( camera._projectionMatrixArray );

		_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
		_frustum.setFromMatrix( _projScreenMatrix );

		// update WebGL objects

		if ( this.autoUpdateObjects ) this.initWebGLObjects( scene );

		// custom render plugins (pre pass)

		renderPlugins( this.renderPluginsPre, scene, camera );

		//

		_this.info.render.calls = 0;
		_this.info.render.vertices = 0;
		_this.info.render.faces = 0;
		_this.info.render.points = 0;

		this.setRenderTarget( renderTarget );

		if ( this.autoClear || forceClear ) {

			this.clear( this.autoClearColor, this.autoClearDepth, this.autoClearStencil );

		}

		// set matrices for regular objects (frustum culled)

		renderList = scene.__webglObjects;

		for ( i = 0, il = renderList.length; i < il; i ++ ) {

			webglObject = renderList[ i ];
			object = webglObject.object;

			webglObject.render = false;

			if ( object.visible ) {

				if ( ! ( object instanceof THREE.Mesh || object instanceof THREE.ParticleSystem ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {

					//object.matrixWorld.flattenToArray( object._modelMatrixArray );

					setupMatrices( object, camera );

					unrollBufferMaterial( webglObject );

					webglObject.render = true;

					if ( this.sortObjects === true ) {

						if ( object.renderDepth !== null ) {

							webglObject.z = object.renderDepth;

						} else {

							_vector3.copy( object.matrixWorld.getPosition() );
							_projScreenMatrix.multiplyVector3( _vector3 );

							webglObject.z = _vector3.z;

						}

						webglObject.id = object.id;

					}

				}

			}

		}

		if ( this.sortObjects ) {

			renderList.sort( painterSortStable );

		}

		// set matrices for immediate objects

		renderList = scene.__webglObjectsImmediate;

		for ( i = 0, il = renderList.length; i < il; i ++ ) {

			webglObject = renderList[ i ];
			object = webglObject.object;

			if ( object.visible ) {

				/*
				if ( object.matrixAutoUpdate ) {

					object.matrixWorld.flattenToArray( object._modelMatrixArray );

				}
				*/

				setupMatrices( object, camera );

				unrollImmediateBufferMaterial( webglObject );

			}

		}

		if ( scene.overrideMaterial ) {

			var material = scene.overrideMaterial;

			this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );
			this.setDepthTest( material.depthTest );
			this.setDepthWrite( material.depthWrite );
			setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

			renderObjects( scene.__webglObjects, false, "", camera, lights, fog, true, material );
			renderObjectsImmediate( scene.__webglObjectsImmediate, "", camera, lights, fog, false, material );

		} else {

			// opaque pass (front-to-back order)

			this.setBlending( THREE.NormalBlending );

			renderObjects( scene.__webglObjects, true, "opaque", camera, lights, fog, false );
			renderObjectsImmediate( scene.__webglObjectsImmediate, "opaque", camera, lights, fog, false );

			// transparent pass (back-to-front order)

			renderObjects( scene.__webglObjects, false, "transparent", camera, lights, fog, true );
			renderObjectsImmediate( scene.__webglObjectsImmediate, "transparent", camera, lights, fog, true );

		}

		// custom render plugins (post pass)

		renderPlugins( this.renderPluginsPost, scene, camera );


		// Generate mipmap if we're using any kind of mipmap filtering

		if ( renderTarget && renderTarget.generateMipmaps && renderTarget.minFilter !== THREE.NearestFilter && renderTarget.minFilter !== THREE.LinearFilter ) {

			updateRenderTargetMipmap( renderTarget );

		}

		// Ensure depth buffer writing is enabled so it can be cleared on next render

		this.setDepthTest( true );
		this.setDepthWrite( true );

		// _gl.finish();

	};

	function renderPlugins( plugins, scene, camera ) {

		if ( ! plugins.length ) return;

		for ( var i = 0, il = plugins.length; i < il; i ++ ) {

			// reset state for plugin (to start from clean slate)

			_currentProgram = null;
			_currentCamera = null;

			_oldBlending = -1;
			_oldDepthTest = -1;
			_oldDepthWrite = -1;
			_oldDoubleSided = -1;
			_oldFlipSided = -1;
			_currentGeometryGroupHash = -1;
			_currentMaterialId = -1;

			_lightsNeedUpdate = true;

			plugins[ i ].render( scene, camera, _currentWidth, _currentHeight );

			// reset state after plugin (anything could have changed)

			_currentProgram = null;
			_currentCamera = null;

			_oldBlending = -1;
			_oldDepthTest = -1;
			_oldDepthWrite = -1;
			_oldDoubleSided = -1;
			_oldFlipSided = -1;
			_currentGeometryGroupHash = -1;
			_currentMaterialId = -1;

			_lightsNeedUpdate = true;

		}

	};

	function renderObjects ( renderList, reverse, materialType, camera, lights, fog, useBlending, overrideMaterial ) {

		var webglObject, object, buffer, material, start, end, delta;

		if ( reverse ) {

			start = renderList.length - 1;
			end = -1;
			delta = -1;

		} else {

			start = 0;
			end = renderList.length;
			delta = 1;
		}

		for ( var i = start; i !== end; i += delta ) {

			webglObject = renderList[ i ];

			if ( webglObject.render ) {

				object = webglObject.object;
				buffer = webglObject.buffer;

				if ( overrideMaterial ) {

					material = overrideMaterial;

				} else {

					material = webglObject[ materialType ];

					if ( ! material ) continue;

					if ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );

					_this.setDepthTest( material.depthTest );
					_this.setDepthWrite( material.depthWrite );
					setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

				}

				_this.setMaterialFaces( material );

				if ( buffer instanceof THREE.BufferGeometry ) {

					_this.renderBufferDirect( camera, lights, fog, material, buffer, object );

				} else {

					_this.renderBuffer( camera, lights, fog, material, buffer, object );

				}

			}

		}

	};

	function renderObjectsImmediate ( renderList, materialType, camera, lights, fog, useBlending, overrideMaterial ) {

		var webglObject, object, material, program;

		for ( var i = 0, il = renderList.length; i < il; i ++ ) {

			webglObject = renderList[ i ];
			object = webglObject.object;

			if ( object.visible ) {

				if ( overrideMaterial ) {

					material = overrideMaterial;

				} else {

					material = webglObject[ materialType ];

					if ( ! material ) continue;

					if ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );

					_this.setDepthTest( material.depthTest );
					_this.setDepthWrite( material.depthWrite );
					setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

				}

				_this.renderImmediateObject( camera, lights, fog, material, object );

			}

		}

	};

	this.renderImmediateObject = function ( camera, lights, fog, material, object ) {

		var program = setProgram( camera, lights, fog, material, object );

		_currentGeometryGroupHash = -1;

		_this.setMaterialFaces( material );

		if ( object.immediateRenderCallback ) {

			object.immediateRenderCallback( program, _gl, _frustum );

		} else {

			object.render( function( object ) { _this.renderBufferImmediate( object, program, material ); } );

		}

	};

	function unrollImmediateBufferMaterial ( globject ) {

		var object = globject.object,
			material = object.material;

		if ( material.transparent ) {

			globject.transparent = material;
			globject.opaque = null;

		} else {

			globject.opaque = material;
			globject.transparent = null;

		}

	};

	function unrollBufferMaterial ( globject ) {

		var object = globject.object,
			buffer = globject.buffer,
			material, materialIndex, meshMaterial;

		meshMaterial = object.material;

		if ( meshMaterial instanceof THREE.MeshFaceMaterial ) {

			materialIndex = buffer.materialIndex;

			if ( materialIndex >= 0 ) {

				material = meshMaterial.materials[ materialIndex ];

				if ( material.transparent ) {

					globject.transparent = material;
					globject.opaque = null;

				} else {

					globject.opaque = material;
					globject.transparent = null;

				}

			}

		} else {

			material = meshMaterial;

			if ( material ) {

				if ( material.transparent ) {

					globject.transparent = material;
					globject.opaque = null;

				} else {

					globject.opaque = material;
					globject.transparent = null;

				}

			}

		}

	};

	// Geometry splitting

	function sortFacesByMaterial ( geometry, material ) {

		var f, fl, face, materialIndex, vertices,
			materialHash, groupHash,
			hash_map = {};

		var numMorphTargets = geometry.morphTargets.length;
		var numMorphNormals = geometry.morphNormals.length;

		var usesFaceMaterial = material instanceof THREE.MeshFaceMaterial;

		geometry.geometryGroups = {};

		for ( f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

			face = geometry.faces[ f ];
			materialIndex = usesFaceMaterial ? face.materialIndex : undefined;

			materialHash = ( materialIndex !== undefined ) ? materialIndex : -1;

			if ( hash_map[ materialHash ] === undefined ) {

				hash_map[ materialHash ] = { 'hash': materialHash, 'counter': 0 };

			}

			groupHash = hash_map[ materialHash ].hash + '_' + hash_map[ materialHash ].counter;

			if ( geometry.geometryGroups[ groupHash ] === undefined ) {

				geometry.geometryGroups[ groupHash ] = { 'faces3': [], 'faces4': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };

			}

			vertices = face instanceof THREE.Face3 ? 3 : 4;

			if ( geometry.geometryGroups[ groupHash ].vertices + vertices > 65535 ) {

				hash_map[ materialHash ].counter += 1;
				groupHash = hash_map[ materialHash ].hash + '_' + hash_map[ materialHash ].counter;

				if ( geometry.geometryGroups[ groupHash ] === undefined ) {

					geometry.geometryGroups[ groupHash ] = { 'faces3': [], 'faces4': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };

				}

			}

			if ( face instanceof THREE.Face3 ) {

				geometry.geometryGroups[ groupHash ].faces3.push( f );

			} else {

				geometry.geometryGroups[ groupHash ].faces4.push( f );

			}

			geometry.geometryGroups[ groupHash ].vertices += vertices;

		}

		geometry.geometryGroupsList = [];

		for ( var g in geometry.geometryGroups ) {

			geometry.geometryGroups[ g ].id = _geometryGroupCounter ++;

			geometry.geometryGroupsList.push( geometry.geometryGroups[ g ] );

		}

	};

	// Objects refresh

	this.initWebGLObjects = function ( scene ) {

		if ( !scene.__webglObjects ) {

			scene.__webglObjects = [];
			scene.__webglObjectsImmediate = [];
			scene.__webglSprites = [];
			scene.__webglFlares = [];

		}

		while ( scene.__objectsAdded.length ) {

			addObject( scene.__objectsAdded[ 0 ], scene );
			scene.__objectsAdded.splice( 0, 1 );

		}

		while ( scene.__objectsRemoved.length ) {

			removeObject( scene.__objectsRemoved[ 0 ], scene );
			scene.__objectsRemoved.splice( 0, 1 );

		}

		// update must be called after objects adding / removal

		for ( var o = 0, ol = scene.__webglObjects.length; o < ol; o ++ ) {

			updateObject( scene.__webglObjects[ o ].object );

		}

	};

	// Objects adding

	function addObject ( object, scene ) {

		var g, geometry, material, geometryGroup;

		if ( ! object.__webglInit ) {

			object.__webglInit = true;

			object._modelViewMatrix = new THREE.Matrix4();
			object._normalMatrix = new THREE.Matrix3();

			if ( object instanceof THREE.Mesh ) {

				geometry = object.geometry;
				material = object.material;

				if ( geometry instanceof THREE.Geometry ) {

					if ( geometry.geometryGroups === undefined ) {

						sortFacesByMaterial( geometry, material );

					}

					// create separate VBOs per geometry chunk

					for ( g in geometry.geometryGroups ) {

						geometryGroup = geometry.geometryGroups[ g ];

						// initialise VBO on the first access

						if ( ! geometryGroup.__webglVertexBuffer ) {

							createMeshBuffers( geometryGroup );
							initMeshBuffers( geometryGroup, object );

							geometry.verticesNeedUpdate = true;
							geometry.morphTargetsNeedUpdate = true;
							geometry.elementsNeedUpdate = true;
							geometry.uvsNeedUpdate = true;
							geometry.normalsNeedUpdate = true;
							geometry.tangentsNeedUpdate = true;
							geometry.colorsNeedUpdate = true;

						}

					}

				} else if ( geometry instanceof THREE.BufferGeometry ) {

					initDirectBuffers( geometry );

				}

			} else if ( object instanceof THREE.Ribbon ) {

				geometry = object.geometry;

				if ( ! geometry.__webglVertexBuffer ) {

					createRibbonBuffers( geometry );
					initRibbonBuffers( geometry, object );

					geometry.verticesNeedUpdate = true;
					geometry.colorsNeedUpdate = true;
					geometry.normalsNeedUpdate = true;

				}

			} else if ( object instanceof THREE.Line ) {

				geometry = object.geometry;

				if ( ! geometry.__webglVertexBuffer ) {

					createLineBuffers( geometry );
					initLineBuffers( geometry, object );

					geometry.verticesNeedUpdate = true;
					geometry.colorsNeedUpdate = true;
					geometry.lineDistancesNeedUpdate = true;

				}

			} else if ( object instanceof THREE.ParticleSystem ) {

				geometry = object.geometry;

				if ( ! geometry.__webglVertexBuffer ) {

					if ( geometry instanceof THREE.Geometry ) {

						createParticleBuffers( geometry );
						initParticleBuffers( geometry, object );

						geometry.verticesNeedUpdate = true;
						geometry.colorsNeedUpdate = true;

					} else if ( geometry instanceof THREE.BufferGeometry ) {

						initDirectBuffers( geometry );

					}


				}

			}

		}

		if ( ! object.__webglActive ) {

			if ( object instanceof THREE.Mesh ) {

				geometry = object.geometry;

				if ( geometry instanceof THREE.BufferGeometry ) {

					addBuffer( scene.__webglObjects, geometry, object );

				} else {

					for ( g in geometry.geometryGroups ) {

						geometryGroup = geometry.geometryGroups[ g ];

						addBuffer( scene.__webglObjects, geometryGroup, object );

					}

				}

			} else if ( object instanceof THREE.Ribbon ||
						object instanceof THREE.Line ||
						object instanceof THREE.ParticleSystem ) {

				geometry = object.geometry;
				addBuffer( scene.__webglObjects, geometry, object );

			} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

				addBufferImmediate( scene.__webglObjectsImmediate, object );

			} else if ( object instanceof THREE.Sprite ) {

				scene.__webglSprites.push( object );

			} else if ( object instanceof THREE.LensFlare ) {

				scene.__webglFlares.push( object );

			}

			object.__webglActive = true;

		}

	};

	function addBuffer ( objlist, buffer, object ) {

		objlist.push(
			{
				buffer: buffer,
				object: object,
				opaque: null,
				transparent: null
			}
		);

	};

	function addBufferImmediate ( objlist, object ) {

		objlist.push(
			{
				object: object,
				opaque: null,
				transparent: null
			}
		);

	};

	// Objects updates

	function updateObject ( object ) {

		var geometry = object.geometry,
			geometryGroup, customAttributesDirty, material;

		if ( object instanceof THREE.Mesh ) {

			if ( geometry instanceof THREE.BufferGeometry ) {

				if ( geometry.verticesNeedUpdate || geometry.elementsNeedUpdate ||
					 geometry.uvsNeedUpdate || geometry.normalsNeedUpdate ||
					 geometry.colorsNeedUpdate || geometry.tangentsNeedUpdate ) {

					setDirectBuffers( geometry, _gl.DYNAMIC_DRAW, !geometry.dynamic );

				}

				geometry.verticesNeedUpdate = false;
				geometry.elementsNeedUpdate = false;
				geometry.uvsNeedUpdate = false;
				geometry.normalsNeedUpdate = false;
				geometry.colorsNeedUpdate = false;
				geometry.tangentsNeedUpdate = false;

			} else {

				// check all geometry groups

				for( var i = 0, il = geometry.geometryGroupsList.length; i < il; i ++ ) {

					geometryGroup = geometry.geometryGroupsList[ i ];

					material = getBufferMaterial( object, geometryGroup );

					if ( geometry.buffersNeedUpdate ) {

						initMeshBuffers( geometryGroup, object );

					}

					customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

					if ( geometry.verticesNeedUpdate || geometry.morphTargetsNeedUpdate || geometry.elementsNeedUpdate ||
						 geometry.uvsNeedUpdate || geometry.normalsNeedUpdate ||
						 geometry.colorsNeedUpdate || geometry.tangentsNeedUpdate || customAttributesDirty ) {

						setMeshBuffers( geometryGroup, object, _gl.DYNAMIC_DRAW, !geometry.dynamic, material );

					}

				}

				geometry.verticesNeedUpdate = false;
				geometry.morphTargetsNeedUpdate = false;
				geometry.elementsNeedUpdate = false;
				geometry.uvsNeedUpdate = false;
				geometry.normalsNeedUpdate = false;
				geometry.colorsNeedUpdate = false;
				geometry.tangentsNeedUpdate = false;

				geometry.buffersNeedUpdate = false;

				material.attributes && clearCustomAttributes( material );

			}

		} else if ( object instanceof THREE.Ribbon ) {

			material = getBufferMaterial( object, geometry );

			customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

			if ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate || geometry.normalsNeedUpdate || customAttributesDirty ) {

				setRibbonBuffers( geometry, _gl.DYNAMIC_DRAW );

			}

			geometry.verticesNeedUpdate = false;
			geometry.colorsNeedUpdate = false;
			geometry.normalsNeedUpdate = false;

			material.attributes && clearCustomAttributes( material );

		} else if ( object instanceof THREE.Line ) {

			material = getBufferMaterial( object, geometry );

			customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

			if ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate || geometry.lineDistancesNeedUpdate || customAttributesDirty ) {

				setLineBuffers( geometry, _gl.DYNAMIC_DRAW );

			}

			geometry.verticesNeedUpdate = false;
			geometry.colorsNeedUpdate = false;
			geometry.lineDistancesNeedUpdate = false;

			material.attributes && clearCustomAttributes( material );

		} else if ( object instanceof THREE.ParticleSystem ) {

			if ( geometry instanceof THREE.BufferGeometry ) {

				if ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate ) {

					setDirectBuffers( geometry, _gl.DYNAMIC_DRAW, !geometry.dynamic );

				}

				geometry.verticesNeedUpdate = false;
				geometry.colorsNeedUpdate = false;

			} else {

				material = getBufferMaterial( object, geometry );

				customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

				if ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate || object.sortParticles || customAttributesDirty ) {

					setParticleBuffers( geometry, _gl.DYNAMIC_DRAW, object );

				}

				geometry.verticesNeedUpdate = false;
				geometry.colorsNeedUpdate = false;

				material.attributes && clearCustomAttributes( material );

			}

		}

	};

	// Objects updates - custom attributes check

	function areCustomAttributesDirty ( material ) {

		for ( var a in material.attributes ) {

			if ( material.attributes[ a ].needsUpdate ) return true;

		}

		return false;

	};

	function clearCustomAttributes ( material ) {

		for ( var a in material.attributes ) {

			material.attributes[ a ].needsUpdate = false;

		}

	};

	// Objects removal

	function removeObject ( object, scene ) {

		if ( object instanceof THREE.Mesh  ||
			 object instanceof THREE.ParticleSystem ||
			 object instanceof THREE.Ribbon ||
			 object instanceof THREE.Line ) {

			removeInstances( scene.__webglObjects, object );

		} else if ( object instanceof THREE.Sprite ) {

			removeInstancesDirect( scene.__webglSprites, object );

		} else if ( object instanceof THREE.LensFlare ) {

			removeInstancesDirect( scene.__webglFlares, object );

		} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

			removeInstances( scene.__webglObjectsImmediate, object );

		}

		object.__webglActive = false;

	};

	function removeInstances ( objlist, object ) {

		for ( var o = objlist.length - 1; o >= 0; o -- ) {

			if ( objlist[ o ].object === object ) {

				objlist.splice( o, 1 );

			}

		}

	};

	function removeInstancesDirect ( objlist, object ) {

		for ( var o = objlist.length - 1; o >= 0; o -- ) {

			if ( objlist[ o ] === object ) {

				objlist.splice( o, 1 );

			}

		}

	};

	// Materials

	this.initMaterial = function ( material, lights, fog, object ) {

		var u, a, identifiers, i, parameters, maxLightCount, maxBones, maxShadows, shaderID;

		if ( material instanceof THREE.MeshDepthMaterial ) {

			shaderID = 'depth';

		} else if ( material instanceof THREE.MeshNormalMaterial ) {

			shaderID = 'normal';

		} else if ( material instanceof THREE.MeshBasicMaterial ) {

			shaderID = 'basic';

		} else if ( material instanceof THREE.MeshLambertMaterial ) {

			shaderID = 'lambert';

		} else if ( material instanceof THREE.MeshPhongMaterial ) {

			shaderID = 'phong';

		} else if ( material instanceof THREE.LineBasicMaterial ) {

			shaderID = 'basic';

		} else if ( material instanceof THREE.LineDashedMaterial ) {

			shaderID = 'dashed';

		} else if ( material instanceof THREE.ParticleBasicMaterial ) {

			shaderID = 'particle_basic';

		}

		if ( shaderID ) {

			setMaterialShaders( material, THREE.ShaderLib[ shaderID ] );

		}

		// heuristics to create shader parameters according to lights in the scene
		// (not to blow over maxLights budget)

		maxLightCount = allocateLights( lights );

		maxShadows = allocateShadows( lights );

		maxBones = allocateBones( object );

		parameters = {

			map: !!material.map,
			envMap: !!material.envMap,
			lightMap: !!material.lightMap,
			bumpMap: !!material.bumpMap,
			normalMap: !!material.normalMap,
			specularMap: !!material.specularMap,

			vertexColors: material.vertexColors,

			fog: fog,
			useFog: material.fog,
			fogExp: fog instanceof THREE.FogExp2,

			sizeAttenuation: material.sizeAttenuation,

			skinning: material.skinning,
			maxBones: maxBones,
			useVertexTexture: _supportsBoneTextures && object && object.useVertexTexture,
			boneTextureWidth: object && object.boneTextureWidth,
			boneTextureHeight: object && object.boneTextureHeight,

			morphTargets: material.morphTargets,
			morphNormals: material.morphNormals,
			maxMorphTargets: this.maxMorphTargets,
			maxMorphNormals: this.maxMorphNormals,

			maxDirLights: maxLightCount.directional,
			maxPointLights: maxLightCount.point,
			maxSpotLights: maxLightCount.spot,
			maxHemiLights: maxLightCount.hemi,

			maxShadows: maxShadows,
			shadowMapEnabled: this.shadowMapEnabled && object.receiveShadow,
			shadowMapSoft: this.shadowMapSoft,
			shadowMapDebug: this.shadowMapDebug,
			shadowMapCascade: this.shadowMapCascade,

			alphaTest: material.alphaTest,
			metal: material.metal,
			perPixel: material.perPixel,
			wrapAround: material.wrapAround,
			doubleSided: material.side === THREE.DoubleSide,
			flipSided: material.side === THREE.BackSide

		};

		material.program = buildProgram( shaderID, material.fragmentShader, material.vertexShader, material.uniforms, material.attributes, material.defines, parameters );

		var attributes = material.program.attributes;

		if ( attributes.position >= 0 ) _gl.enableVertexAttribArray( attributes.position );
		if ( attributes.color >= 0 ) _gl.enableVertexAttribArray( attributes.color );
		if ( attributes.normal >= 0 ) _gl.enableVertexAttribArray( attributes.normal );
		if ( attributes.tangent >= 0 ) _gl.enableVertexAttribArray( attributes.tangent );
		if ( attributes.lineDistance >= 0 ) _gl.enableVertexAttribArray( attributes.lineDistance );

		if ( material.skinning &&
			 attributes.skinIndex >= 0 && attributes.skinWeight >= 0 ) {

			_gl.enableVertexAttribArray( attributes.skinIndex );
			_gl.enableVertexAttribArray( attributes.skinWeight );

		}

		if ( material.attributes ) {

			for ( a in material.attributes ) {

				if ( attributes[ a ] !== undefined && attributes[ a ] >= 0 ) _gl.enableVertexAttribArray( attributes[ a ] );

			}

		}

		if ( material.morphTargets ) {

			material.numSupportedMorphTargets = 0;

			var id, base = "morphTarget";

			for ( i = 0; i < this.maxMorphTargets; i ++ ) {

				id = base + i;

				if ( attributes[ id ] >= 0 ) {

					_gl.enableVertexAttribArray( attributes[ id ] );
					material.numSupportedMorphTargets ++;

				}

			}

		}

		if ( material.morphNormals ) {

			material.numSupportedMorphNormals = 0;

			var id, base = "morphNormal";

			for ( i = 0; i < this.maxMorphNormals; i ++ ) {

				id = base + i;

				if ( attributes[ id ] >= 0 ) {

					_gl.enableVertexAttribArray( attributes[ id ] );
					material.numSupportedMorphNormals ++;

				}

			}

		}

		material.uniformsList = [];

		for ( u in material.uniforms ) {

			material.uniformsList.push( [ material.uniforms[ u ], u ] );

		}

	};

	function setMaterialShaders( material, shaders ) {

		material.uniforms = THREE.UniformsUtils.clone( shaders.uniforms );
		material.vertexShader = shaders.vertexShader;
		material.fragmentShader = shaders.fragmentShader;

	};

	function setProgram( camera, lights, fog, material, object ) {

		_usedTextureUnits = 0;

		if ( material.needsUpdate ) {

			if ( material.program ) _this.deallocateMaterial( material );

			_this.initMaterial( material, lights, fog, object );
			material.needsUpdate = false;

		}

		if ( material.morphTargets ) {

			if ( ! object.__webglMorphTargetInfluences ) {

				object.__webglMorphTargetInfluences = new Float32Array( _this.maxMorphTargets );

			}

		}

		var refreshMaterial = false;

		var program = material.program,
			p_uniforms = program.uniforms,
			m_uniforms = material.uniforms;

		if ( program !== _currentProgram ) {

			_gl.useProgram( program );
			_currentProgram = program;

			refreshMaterial = true;

		}

		if ( material.id !== _currentMaterialId ) {

			_currentMaterialId = material.id;
			refreshMaterial = true;

		}

		if ( refreshMaterial || camera !== _currentCamera ) {

			_gl.uniformMatrix4fv( p_uniforms.projectionMatrix, false, camera._projectionMatrixArray );

			if ( camera !== _currentCamera ) _currentCamera = camera;

		}

		// skinning uniforms must be set even if material didn't change
		// auto-setting of texture unit for bone texture must go before other textures
		// not sure why, but otherwise weird things happen

		if ( material.skinning ) {

			if ( _supportsBoneTextures && object.useVertexTexture ) {

				if ( p_uniforms.boneTexture !== null ) {

					var textureUnit = getTextureUnit();

					_gl.uniform1i( p_uniforms.boneTexture, textureUnit );
					_this.setTexture( object.boneTexture, textureUnit );

				}

			} else {

				if ( p_uniforms.boneGlobalMatrices !== null ) {

					_gl.uniformMatrix4fv( p_uniforms.boneGlobalMatrices, false, object.boneMatrices );

				}

			}

		}

		if ( refreshMaterial ) {

			// refresh uniforms common to several materials

			if ( fog && material.fog ) {

				refreshUniformsFog( m_uniforms, fog );

			}

			if ( material instanceof THREE.MeshPhongMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material.lights ) {

				if ( _lightsNeedUpdate ) {

					setupLights( program, lights );
					_lightsNeedUpdate = false;

				}

				refreshUniformsLights( m_uniforms, _lights );

			}

			if ( material instanceof THREE.MeshBasicMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material instanceof THREE.MeshPhongMaterial ) {

				refreshUniformsCommon( m_uniforms, material );

			}

			// refresh single material specific uniforms

			if ( material instanceof THREE.LineBasicMaterial ) {

				refreshUniformsLine( m_uniforms, material );

			} else if ( material instanceof THREE.LineDashedMaterial ) {

				refreshUniformsLine( m_uniforms, material );
				refreshUniformsDash( m_uniforms, material );

			} else if ( material instanceof THREE.ParticleBasicMaterial ) {

				refreshUniformsParticle( m_uniforms, material );

			} else if ( material instanceof THREE.MeshPhongMaterial ) {

				refreshUniformsPhong( m_uniforms, material );

			} else if ( material instanceof THREE.MeshLambertMaterial ) {

				refreshUniformsLambert( m_uniforms, material );

			} else if ( material instanceof THREE.MeshDepthMaterial ) {

				m_uniforms.mNear.value = camera.near;
				m_uniforms.mFar.value = camera.far;
				m_uniforms.opacity.value = material.opacity;

			} else if ( material instanceof THREE.MeshNormalMaterial ) {

				m_uniforms.opacity.value = material.opacity;

			}

			if ( object.receiveShadow && ! material._shadowPass ) {

				refreshUniformsShadow( m_uniforms, lights );

			}

			// load common uniforms

			loadUniformsGeneric( program, material.uniformsList );

			// load material specific uniforms
			// (shader material also gets them for the sake of genericity)

			if ( material instanceof THREE.ShaderMaterial ||
				 material instanceof THREE.MeshPhongMaterial ||
				 material.envMap ) {

				if ( p_uniforms.cameraPosition !== null ) {

					var position = camera.matrixWorld.getPosition();
					_gl.uniform3f( p_uniforms.cameraPosition, position.x, position.y, position.z );

				}

			}

			if ( material instanceof THREE.MeshPhongMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material instanceof THREE.ShaderMaterial ||
				 material.skinning ) {

				if ( p_uniforms.viewMatrix !== null ) {

					_gl.uniformMatrix4fv( p_uniforms.viewMatrix, false, camera._viewMatrixArray );

				}

			}

		}

		loadUniformsMatrices( p_uniforms, object );

		if ( p_uniforms.modelMatrix !== null ) {

			_gl.uniformMatrix4fv( p_uniforms.modelMatrix, false, object.matrixWorld.elements );

		}

		return program;

	};

	// Uniforms (refresh uniforms objects)

	function refreshUniformsCommon ( uniforms, material ) {

		uniforms.opacity.value = material.opacity;

		if ( _this.gammaInput ) {

			uniforms.diffuse.value.copyGammaToLinear( material.color );

		} else {

			uniforms.diffuse.value = material.color;

		}

		uniforms.map.value = material.map;
		uniforms.lightMap.value = material.lightMap;
		uniforms.specularMap.value = material.specularMap;

		if ( material.bumpMap ) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;

		}

		if ( material.normalMap ) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy( material.normalScale );

		}

		// uv repeat and offset setting priorities
		//	1. color map
		//	2. specular map
		//	3. normal map
		//	4. bump map

		var uvScaleMap;

		if ( material.map ) {

			uvScaleMap = material.map;

		} else if ( material.specularMap ) {

			uvScaleMap = material.specularMap;

		} else if ( material.normalMap ) {

			uvScaleMap = material.normalMap;

		} else if ( material.bumpMap ) {

			uvScaleMap = material.bumpMap;

		}

		if ( uvScaleMap !== undefined ) {

			var offset = uvScaleMap.offset;
			var repeat = uvScaleMap.repeat;

			uniforms.offsetRepeat.value.set( offset.x, offset.y, repeat.x, repeat.y );

		}

		uniforms.envMap.value = material.envMap;
		uniforms.flipEnvMap.value = ( material.envMap instanceof THREE.WebGLRenderTargetCube ) ? 1 : -1;

		if ( _this.gammaInput ) {

			//uniforms.reflectivity.value = material.reflectivity * material.reflectivity;
			uniforms.reflectivity.value = material.reflectivity;

		} else {

			uniforms.reflectivity.value = material.reflectivity;

		}

		uniforms.refractionRatio.value = material.refractionRatio;
		uniforms.combine.value = material.combine;
		uniforms.useRefract.value = material.envMap && material.envMap.mapping instanceof THREE.CubeRefractionMapping;

	};

	function refreshUniformsLine ( uniforms, material ) {

		uniforms.diffuse.value = material.color;
		uniforms.opacity.value = material.opacity;

	};

	function refreshUniformsDash ( uniforms, material ) {

		uniforms.dashSize.value = material.dashSize;
		uniforms.totalSize.value = material.dashSize + material.gapSize;
		uniforms.scale.value = material.scale;

	};

	function refreshUniformsParticle ( uniforms, material ) {

		uniforms.psColor.value = material.color;
		uniforms.opacity.value = material.opacity;
		uniforms.size.value = material.size;
		uniforms.scale.value = _canvas.height / 2.0; // TODO: Cache this.

		uniforms.map.value = material.map;

	};

	function refreshUniformsFog ( uniforms, fog ) {

		uniforms.fogColor.value = fog.color;

		if ( fog instanceof THREE.Fog ) {

			uniforms.fogNear.value = fog.near;
			uniforms.fogFar.value = fog.far;

		} else if ( fog instanceof THREE.FogExp2 ) {

			uniforms.fogDensity.value = fog.density;

		}

	};

	function refreshUniformsPhong ( uniforms, material ) {

		uniforms.shininess.value = material.shininess;

		if ( _this.gammaInput ) {

			uniforms.ambient.value.copyGammaToLinear( material.ambient );
			uniforms.emissive.value.copyGammaToLinear( material.emissive );
			uniforms.specular.value.copyGammaToLinear( material.specular );

		} else {

			uniforms.ambient.value = material.ambient;
			uniforms.emissive.value = material.emissive;
			uniforms.specular.value = material.specular;

		}

		if ( material.wrapAround ) {

			uniforms.wrapRGB.value.copy( material.wrapRGB );

		}

	};

	function refreshUniformsLambert ( uniforms, material ) {

		if ( _this.gammaInput ) {

			uniforms.ambient.value.copyGammaToLinear( material.ambient );
			uniforms.emissive.value.copyGammaToLinear( material.emissive );

		} else {

			uniforms.ambient.value = material.ambient;
			uniforms.emissive.value = material.emissive;

		}

		if ( material.wrapAround ) {

			uniforms.wrapRGB.value.copy( material.wrapRGB );

		}

	};

	function refreshUniformsLights ( uniforms, lights ) {

		uniforms.ambientLightColor.value = lights.ambient;

		uniforms.directionalLightColor.value = lights.directional.colors;
		uniforms.directionalLightDirection.value = lights.directional.positions;

		uniforms.pointLightColor.value = lights.point.colors;
		uniforms.pointLightPosition.value = lights.point.positions;
		uniforms.pointLightDistance.value = lights.point.distances;

		uniforms.spotLightColor.value = lights.spot.colors;
		uniforms.spotLightPosition.value = lights.spot.positions;
		uniforms.spotLightDistance.value = lights.spot.distances;
		uniforms.spotLightDirection.value = lights.spot.directions;
		uniforms.spotLightAngleCos.value = lights.spot.anglesCos;
		uniforms.spotLightExponent.value = lights.spot.exponents;

		uniforms.hemisphereLightSkyColor.value = lights.hemi.skyColors;
		uniforms.hemisphereLightGroundColor.value = lights.hemi.groundColors;
		uniforms.hemisphereLightDirection.value = lights.hemi.positions;

	};

	function refreshUniformsShadow ( uniforms, lights ) {

		if ( uniforms.shadowMatrix ) {

			var j = 0;

			for ( var i = 0, il = lights.length; i < il; i ++ ) {

				var light = lights[ i ];

				if ( ! light.castShadow ) continue;

				if ( light instanceof THREE.SpotLight || ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) ) {

					uniforms.shadowMap.value[ j ] = light.shadowMap;
					uniforms.shadowMapSize.value[ j ] = light.shadowMapSize;

					uniforms.shadowMatrix.value[ j ] = light.shadowMatrix;

					uniforms.shadowDarkness.value[ j ] = light.shadowDarkness;
					uniforms.shadowBias.value[ j ] = light.shadowBias;

					j ++;

				}

			}

		}

	};

	// Uniforms (load to GPU)

	function loadUniformsMatrices ( uniforms, object ) {

		_gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, object._modelViewMatrix.elements );

		if ( uniforms.normalMatrix ) {

			_gl.uniformMatrix3fv( uniforms.normalMatrix, false, object._normalMatrix.elements );

		}

	};

	function getTextureUnit() {

		var textureUnit = _usedTextureUnits;

		if ( textureUnit >= _maxTextures ) {

			console.warn( "Trying to use " + textureUnit + " texture units while this GPU supports only " + _maxTextures );

		}

		_usedTextureUnits += 1;

		return textureUnit;

	};

	function loadUniformsGeneric ( program, uniforms ) {

		var uniform, value, type, location, texture, textureUnit, i, il, j, jl, offset;

		for ( j = 0, jl = uniforms.length; j < jl; j ++ ) {

			location = program.uniforms[ uniforms[ j ][ 1 ] ];
			if ( !location ) continue;

			uniform = uniforms[ j ][ 0 ];

			type = uniform.type;
			value = uniform.value;

			if ( type === "i" ) { // single integer

				_gl.uniform1i( location, value );

			} else if ( type === "f" ) { // single float

				_gl.uniform1f( location, value );

			} else if ( type === "v2" ) { // single THREE.Vector2

				_gl.uniform2f( location, value.x, value.y );

			} else if ( type === "v3" ) { // single THREE.Vector3

				_gl.uniform3f( location, value.x, value.y, value.z );

			} else if ( type === "v4" ) { // single THREE.Vector4

				_gl.uniform4f( location, value.x, value.y, value.z, value.w );

			} else if ( type === "c" ) { // single THREE.Color

				_gl.uniform3f( location, value.r, value.g, value.b );

			} else if ( type === "iv1" ) { // flat array of integers (JS or typed array)

				_gl.uniform1iv( location, value );

			} else if ( type === "iv" ) { // flat array of integers with 3 x N size (JS or typed array)

				_gl.uniform3iv( location, value );

			} else if ( type === "fv1" ) { // flat array of floats (JS or typed array)

				_gl.uniform1fv( location, value );

			} else if ( type === "fv" ) { // flat array of floats with 3 x N size (JS or typed array)

				_gl.uniform3fv( location, value );

			} else if ( type === "v2v" ) { // array of THREE.Vector2

				if ( uniform._array === undefined ) {

					uniform._array = new Float32Array( 2 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					offset = i * 2;

					uniform._array[ offset ] 	 = value[ i ].x;
					uniform._array[ offset + 1 ] = value[ i ].y;

				}

				_gl.uniform2fv( location, uniform._array );

			} else if ( type === "v3v" ) { // array of THREE.Vector3

				if ( uniform._array === undefined ) {

					uniform._array = new Float32Array( 3 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					offset = i * 3;

					uniform._array[ offset ] 	 = value[ i ].x;
					uniform._array[ offset + 1 ] = value[ i ].y;
					uniform._array[ offset + 2 ] = value[ i ].z;

				}

				_gl.uniform3fv( location, uniform._array );

			} else if ( type === "v4v" ) { // array of THREE.Vector4

				if ( uniform._array === undefined ) {

					uniform._array = new Float32Array( 4 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					offset = i * 4;

					uniform._array[ offset ] 	 = value[ i ].x;
					uniform._array[ offset + 1 ] = value[ i ].y;
					uniform._array[ offset + 2 ] = value[ i ].z;
					uniform._array[ offset + 3 ] = value[ i ].w;

				}

				_gl.uniform4fv( location, uniform._array );

			} else if ( type === "m4") { // single THREE.Matrix4

				if ( uniform._array === undefined ) {

					uniform._array = new Float32Array( 16 );

				}

				value.flattenToArray( uniform._array );
				_gl.uniformMatrix4fv( location, false, uniform._array );

			} else if ( type === "m4v" ) { // array of THREE.Matrix4

				if ( uniform._array === undefined ) {

					uniform._array = new Float32Array( 16 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					value[ i ].flattenToArrayOffset( uniform._array, i * 16 );

				}

				_gl.uniformMatrix4fv( location, false, uniform._array );

			} else if ( type === "t" ) { // single THREE.Texture (2d or cube)

				texture = value;
				textureUnit = getTextureUnit();

				_gl.uniform1i( location, textureUnit );

				if ( !texture ) continue;

				if ( texture.image instanceof Array && texture.image.length === 6 ) {

					setCubeTexture( texture, textureUnit );

				} else if ( texture instanceof THREE.WebGLRenderTargetCube ) {

					setCubeTextureDynamic( texture, textureUnit );

				} else {

					_this.setTexture( texture, textureUnit );

				}

			} else if ( type === "tv" ) { // array of THREE.Texture (2d)

				if ( uniform._array === undefined ) {

					uniform._array = [];

				}

				for( i = 0, il = uniform.value.length; i < il; i ++ ) {

					uniform._array[ i ] = getTextureUnit();

				}

				_gl.uniform1iv( location, uniform._array );

				for( i = 0, il = uniform.value.length; i < il; i ++ ) {

					texture = uniform.value[ i ];
					textureUnit = uniform._array[ i ];

					if ( !texture ) continue;

					_this.setTexture( texture, textureUnit );

				}

			}

		}

	};

	function setupMatrices ( object, camera ) {

		object._modelViewMatrix.multiply( camera.matrixWorldInverse, object.matrixWorld );

		object._normalMatrix.getInverse( object._modelViewMatrix );
		object._normalMatrix.transpose();

	};

	//

	function setColorGamma( array, offset, color, intensitySq ) {

		array[ offset ]     = color.r * color.r * intensitySq;
		array[ offset + 1 ] = color.g * color.g * intensitySq;
		array[ offset + 2 ] = color.b * color.b * intensitySq;

	};

	function setColorLinear( array, offset, color, intensity ) {

		array[ offset ]     = color.r * intensity;
		array[ offset + 1 ] = color.g * intensity;
		array[ offset + 2 ] = color.b * intensity;

	};

	function setupLights ( program, lights ) {

		var l, ll, light, n,
		r = 0, g = 0, b = 0,
		color, skyColor, groundColor,
		intensity,  intensitySq,
		position,
		distance,

		zlights = _lights,

		dirColors = zlights.directional.colors,
		dirPositions = zlights.directional.positions,

		pointColors = zlights.point.colors,
		pointPositions = zlights.point.positions,
		pointDistances = zlights.point.distances,

		spotColors = zlights.spot.colors,
		spotPositions = zlights.spot.positions,
		spotDistances = zlights.spot.distances,
		spotDirections = zlights.spot.directions,
		spotAnglesCos = zlights.spot.anglesCos,
		spotExponents = zlights.spot.exponents,

		hemiSkyColors = zlights.hemi.skyColors,
		hemiGroundColors = zlights.hemi.groundColors,
		hemiPositions = zlights.hemi.positions,

		dirLength = 0,
		pointLength = 0,
		spotLength = 0,
		hemiLength = 0,

		dirCount = 0,
		pointCount = 0,
		spotCount = 0,
		hemiCount = 0,

		dirOffset = 0,
		pointOffset = 0,
		spotOffset = 0,
		hemiOffset = 0;

		for ( l = 0, ll = lights.length; l < ll; l ++ ) {

			light = lights[ l ];

			if ( light.onlyShadow ) continue;

			color = light.color;
			intensity = light.intensity;
			distance = light.distance;

			if ( light instanceof THREE.AmbientLight ) {

				if ( ! light.visible ) continue;

				if ( _this.gammaInput ) {

					r += color.r * color.r;
					g += color.g * color.g;
					b += color.b * color.b;

				} else {

					r += color.r;
					g += color.g;
					b += color.b;

				}

			} else if ( light instanceof THREE.DirectionalLight ) {

				dirCount += 1;

				if ( ! light.visible ) continue;

				dirOffset = dirLength * 3;

				if ( _this.gammaInput ) {

					setColorGamma( dirColors, dirOffset, color, intensity * intensity );

				} else {

					setColorLinear( dirColors, dirOffset, color, intensity );

				}

				_direction.copy( light.matrixWorld.getPosition() );
				_direction.subSelf( light.target.matrixWorld.getPosition() );
				_direction.normalize();

				dirPositions[ dirOffset ]     = _direction.x;
				dirPositions[ dirOffset + 1 ] = _direction.y;
				dirPositions[ dirOffset + 2 ] = _direction.z;

				dirLength += 1;

			} else if ( light instanceof THREE.PointLight ) {

				pointCount += 1;

				if ( ! light.visible ) continue;

				pointOffset = pointLength * 3;

				if ( _this.gammaInput ) {

					setColorGamma( pointColors, pointOffset, color, intensity * intensity );

				} else {

					setColorLinear( pointColors, pointOffset, color, intensity );

				}

				position = light.matrixWorld.getPosition();

				pointPositions[ pointOffset ]     = position.x;
				pointPositions[ pointOffset + 1 ] = position.y;
				pointPositions[ pointOffset + 2 ] = position.z;

				pointDistances[ pointLength ] = distance;

				pointLength += 1;

			} else if ( light instanceof THREE.SpotLight ) {

				spotCount += 1;

				if ( ! light.visible ) continue;

				spotOffset = spotLength * 3;

				if ( _this.gammaInput ) {

					setColorGamma( spotColors, spotOffset, color, intensity * intensity );

				} else {

					setColorLinear( spotColors, spotOffset, color, intensity );

				}

				position = light.matrixWorld.getPosition();

				spotPositions[ spotOffset ]     = position.x;
				spotPositions[ spotOffset + 1 ] = position.y;
				spotPositions[ spotOffset + 2 ] = position.z;

				spotDistances[ spotLength ] = distance;

				_direction.copy( position );
				_direction.subSelf( light.target.matrixWorld.getPosition() );
				_direction.normalize();

				spotDirections[ spotOffset ]     = _direction.x;
				spotDirections[ spotOffset + 1 ] = _direction.y;
				spotDirections[ spotOffset + 2 ] = _direction.z;

				spotAnglesCos[ spotLength ] = Math.cos( light.angle );
				spotExponents[ spotLength ] = light.exponent;

				spotLength += 1;

			} else if ( light instanceof THREE.HemisphereLight ) {

				hemiCount += 1;

				if ( ! light.visible ) continue;

				skyColor = light.color;
				groundColor = light.groundColor;

				hemiOffset = hemiLength * 3;

				if ( _this.gammaInput ) {

					intensitySq = intensity * intensity;

					setColorGamma( hemiSkyColors, hemiOffset, skyColor, intensitySq );
					setColorGamma( hemiGroundColors, hemiOffset, groundColor, intensitySq );

				} else {

					setColorLinear( hemiSkyColors, hemiOffset, skyColor, intensity );
					setColorLinear( hemiGroundColors, hemiOffset, groundColor, intensity );

				}

				_direction.copy( light.matrixWorld.getPosition() );
				_direction.normalize();

				hemiPositions[ hemiOffset ]     = _direction.x;
				hemiPositions[ hemiOffset + 1 ] = _direction.y;
				hemiPositions[ hemiOffset + 2 ] = _direction.z;

				hemiLength += 1;

			}

		}

		// null eventual remains from removed lights
		// (this is to avoid if in shader)

		for ( l = dirLength * 3, ll = Math.max( dirColors.length, dirCount * 3 ); l < ll; l ++ ) dirColors[ l ] = 0.0;
		for ( l = dirLength * 3, ll = Math.max( dirPositions.length, dirCount * 3 ); l < ll; l ++ ) dirPositions[ l ] = 0.0;

		for ( l = pointLength * 3, ll = Math.max( pointColors.length, pointCount * 3 ); l < ll; l ++ ) pointColors[ l ] = 0.0;
		for ( l = pointLength * 3, ll = Math.max( pointPositions.length, pointCount * 3 ); l < ll; l ++ ) pointPositions[ l ] = 0.0;
		for ( l = pointLength, ll = Math.max( pointDistances.length, pointCount ); l < ll; l ++ ) pointDistances[ l ] = 0.0;

		for ( l = spotLength * 3, ll = Math.max( spotColors.length, spotCount * 3 ); l < ll; l ++ ) spotColors[ l ] = 0.0;
		for ( l = spotLength * 3, ll = Math.max( spotPositions.length, spotCount * 3 ); l < ll; l ++ ) spotPositions[ l ] = 0.0;
		for ( l = spotLength * 3, ll = Math.max( spotDirections.length, spotCount * 3 ); l < ll; l ++ ) spotDirections[ l ] = 0.0;
		for ( l = spotLength, ll = Math.max( spotAnglesCos.length, spotCount ); l < ll; l ++ ) spotAnglesCos[ l ] = 0.0;
		for ( l = spotLength, ll = Math.max( spotExponents.length, spotCount ); l < ll; l ++ ) spotExponents[ l ] = 0.0;
		for ( l = spotLength, ll = Math.max( spotDistances.length, spotCount ); l < ll; l ++ ) spotDistances[ l ] = 0.0;

		for ( l = hemiLength * 3, ll = Math.max( hemiSkyColors.length, hemiCount * 3 ); l < ll; l ++ ) hemiSkyColors[ l ] = 0.0;
		for ( l = hemiLength * 3, ll = Math.max( hemiGroundColors.length, hemiCount * 3 ); l < ll; l ++ ) hemiGroundColors[ l ] = 0.0;
		for ( l = hemiLength * 3, ll = Math.max( hemiPositions.length, hemiCount * 3 ); l < ll; l ++ ) hemiPositions[ l ] = 0.0;

		zlights.directional.length = dirLength;
		zlights.point.length = pointLength;
		zlights.spot.length = spotLength;
		zlights.hemi.length = hemiLength;

		zlights.ambient[ 0 ] = r;
		zlights.ambient[ 1 ] = g;
		zlights.ambient[ 2 ] = b;

	};

	// GL state setting

	this.setFaceCulling = function ( cullFace, frontFace ) {

		if ( cullFace ) {

			if ( !frontFace || frontFace === "ccw" ) {

				_gl.frontFace( _gl.CCW );

			} else {

				_gl.frontFace( _gl.CW );

			}

			if( cullFace === "back" ) {

				_gl.cullFace( _gl.BACK );

			} else if( cullFace === "front" ) {

				_gl.cullFace( _gl.FRONT );

			} else {

				_gl.cullFace( _gl.FRONT_AND_BACK );

			}

			_gl.enable( _gl.CULL_FACE );

		} else {

			_gl.disable( _gl.CULL_FACE );

		}

	};

	this.setMaterialFaces = function ( material ) {

		var doubleSided = material.side === THREE.DoubleSide;
		var flipSided = material.side === THREE.BackSide;

		if ( _oldDoubleSided !== doubleSided ) {

			if ( doubleSided ) {

				_gl.disable( _gl.CULL_FACE );

			} else {

				_gl.enable( _gl.CULL_FACE );

			}

			_oldDoubleSided = doubleSided;

		}

		if ( _oldFlipSided !== flipSided ) {

			if ( flipSided ) {

				_gl.frontFace( _gl.CW );

			} else {

				_gl.frontFace( _gl.CCW );

			}

			_oldFlipSided = flipSided;

		}

	};

	this.setDepthTest = function ( depthTest ) {

		if ( _oldDepthTest !== depthTest ) {

			if ( depthTest ) {

				_gl.enable( _gl.DEPTH_TEST );

			} else {

				_gl.disable( _gl.DEPTH_TEST );

			}

			_oldDepthTest = depthTest;

		}

	};

	this.setDepthWrite = function ( depthWrite ) {

		if ( _oldDepthWrite !== depthWrite ) {

			_gl.depthMask( depthWrite );
			_oldDepthWrite = depthWrite;

		}

	};

	function setLineWidth ( width ) {

		if ( width !== _oldLineWidth ) {

			_gl.lineWidth( width );

			_oldLineWidth = width;

		}

	};

	function setPolygonOffset ( polygonoffset, factor, units ) {

		if ( _oldPolygonOffset !== polygonoffset ) {

			if ( polygonoffset ) {

				_gl.enable( _gl.POLYGON_OFFSET_FILL );

			} else {

				_gl.disable( _gl.POLYGON_OFFSET_FILL );

			}

			_oldPolygonOffset = polygonoffset;

		}

		if ( polygonoffset && ( _oldPolygonOffsetFactor !== factor || _oldPolygonOffsetUnits !== units ) ) {

			_gl.polygonOffset( factor, units );

			_oldPolygonOffsetFactor = factor;
			_oldPolygonOffsetUnits = units;

		}

	};

	this.setBlending = function ( blending, blendEquation, blendSrc, blendDst ) {

		if ( blending !== _oldBlending ) {

			if ( blending === THREE.NoBlending ) {

				_gl.disable( _gl.BLEND );

			} else if ( blending === THREE.AdditiveBlending ) {

				_gl.enable( _gl.BLEND );
				_gl.blendEquation( _gl.FUNC_ADD );
				_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE );

			} else if ( blending === THREE.SubtractiveBlending ) {

				// TODO: Find blendFuncSeparate() combination
				_gl.enable( _gl.BLEND );
				_gl.blendEquation( _gl.FUNC_ADD );
				_gl.blendFunc( _gl.ZERO, _gl.ONE_MINUS_SRC_COLOR );

			} else if ( blending === THREE.MultiplyBlending ) {

				// TODO: Find blendFuncSeparate() combination
				_gl.enable( _gl.BLEND );
				_gl.blendEquation( _gl.FUNC_ADD );
				_gl.blendFunc( _gl.ZERO, _gl.SRC_COLOR );

			} else if ( blending === THREE.CustomBlending ) {

				_gl.enable( _gl.BLEND );

			} else {

				_gl.enable( _gl.BLEND );
				_gl.blendEquationSeparate( _gl.FUNC_ADD, _gl.FUNC_ADD );
				_gl.blendFuncSeparate( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA );

			}

			_oldBlending = blending;

		}

		if ( blending === THREE.CustomBlending ) {

			if ( blendEquation !== _oldBlendEquation ) {

				_gl.blendEquation( paramThreeToGL( blendEquation ) );

				_oldBlendEquation = blendEquation;

			}

			if ( blendSrc !== _oldBlendSrc || blendDst !== _oldBlendDst ) {

				_gl.blendFunc( paramThreeToGL( blendSrc ), paramThreeToGL( blendDst ) );

				_oldBlendSrc = blendSrc;
				_oldBlendDst = blendDst;

			}

		} else {

			_oldBlendEquation = null;
			_oldBlendSrc = null;
			_oldBlendDst = null;

		}

	};

	// Defines

	function generateDefines ( defines ) {

		var value, chunk, chunks = [];

		for ( var d in defines ) {

			value = defines[ d ];
			if ( value === false ) continue;

			chunk = "#define " + d + " " + value;
			chunks.push( chunk );

		}

		return chunks.join( "\n" );

	};

	// Shaders

	function buildProgram ( shaderID, fragmentShader, vertexShader, uniforms, attributes, defines, parameters ) {

		var p, pl, d, program, code;
		var chunks = [];

		// Generate code

		if ( shaderID ) {

			chunks.push( shaderID );

		} else {

			chunks.push( fragmentShader );
			chunks.push( vertexShader );

		}

		for ( d in defines ) {

			chunks.push( d );
			chunks.push( defines[ d ] );

		}

		for ( p in parameters ) {

			chunks.push( p );
			chunks.push( parameters[ p ] );

		}

		code = chunks.join();

		// Check if code has been already compiled

		for ( p = 0, pl = _programs.length; p < pl; p ++ ) {

			var programInfo = _programs[ p ];

			if ( programInfo.code === code ) {

				//console.log( "Code already compiled." /*: \n\n" + code*/ );

				programInfo.usedTimes ++;

				return programInfo.program;

			}

		}

		//console.log( "building new program " );

		//

		var customDefines = generateDefines( defines );

		//

		program = _gl.createProgram();

		var prefix_vertex = [

			"precision " + _precision + " float;",

			customDefines,

			_supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",

			_this.gammaInput ? "#define GAMMA_INPUT" : "",
			_this.gammaOutput ? "#define GAMMA_OUTPUT" : "",
			_this.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",

			"#define MAX_DIR_LIGHTS " + parameters.maxDirLights,
			"#define MAX_POINT_LIGHTS " + parameters.maxPointLights,
			"#define MAX_SPOT_LIGHTS " + parameters.maxSpotLights,
			"#define MAX_HEMI_LIGHTS " + parameters.maxHemiLights,

			"#define MAX_SHADOWS " + parameters.maxShadows,

			"#define MAX_BONES " + parameters.maxBones,

			parameters.map ? "#define USE_MAP" : "",
			parameters.envMap ? "#define USE_ENVMAP" : "",
			parameters.lightMap ? "#define USE_LIGHTMAP" : "",
			parameters.bumpMap ? "#define USE_BUMPMAP" : "",
			parameters.normalMap ? "#define USE_NORMALMAP" : "",
			parameters.specularMap ? "#define USE_SPECULARMAP" : "",
			parameters.vertexColors ? "#define USE_COLOR" : "",

			parameters.skinning ? "#define USE_SKINNING" : "",
			parameters.useVertexTexture ? "#define BONE_TEXTURE" : "",
			parameters.boneTextureWidth ? "#define N_BONE_PIXEL_X " + parameters.boneTextureWidth.toFixed( 1 ) : "",
			parameters.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + parameters.boneTextureHeight.toFixed( 1 ) : "",

			parameters.morphTargets ? "#define USE_MORPHTARGETS" : "",
			parameters.morphNormals ? "#define USE_MORPHNORMALS" : "",
			parameters.perPixel ? "#define PHONG_PER_PIXEL" : "",
			parameters.wrapAround ? "#define WRAP_AROUND" : "",
			parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
			parameters.flipSided ? "#define FLIP_SIDED" : "",

			parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
			parameters.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
			parameters.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
			parameters.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",

			parameters.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",

			"uniform mat4 modelMatrix;",
			"uniform mat4 modelViewMatrix;",
			"uniform mat4 projectionMatrix;",
			"uniform mat4 viewMatrix;",
			"uniform mat3 normalMatrix;",
			"uniform vec3 cameraPosition;",

			"attribute vec3 position;",
			"attribute vec3 normal;",
			"attribute vec2 uv;",
			"attribute vec2 uv2;",

			"#ifdef USE_COLOR",

				"attribute vec3 color;",

			"#endif",

			"#ifdef USE_MORPHTARGETS",

				"attribute vec3 morphTarget0;",
				"attribute vec3 morphTarget1;",
				"attribute vec3 morphTarget2;",
				"attribute vec3 morphTarget3;",

				"#ifdef USE_MORPHNORMALS",

					"attribute vec3 morphNormal0;",
					"attribute vec3 morphNormal1;",
					"attribute vec3 morphNormal2;",
					"attribute vec3 morphNormal3;",

				"#else",

					"attribute vec3 morphTarget4;",
					"attribute vec3 morphTarget5;",
					"attribute vec3 morphTarget6;",
					"attribute vec3 morphTarget7;",

				"#endif",

			"#endif",

			"#ifdef USE_SKINNING",

				"attribute vec4 skinIndex;",
				"attribute vec4 skinWeight;",

			"#endif",

			""

		].join("\n");

		var prefix_fragment = [

			"precision " + _precision + " float;",

			( parameters.bumpMap || parameters.normalMap ) ? "#extension GL_OES_standard_derivatives : enable" : "",

			customDefines,

			"#define MAX_DIR_LIGHTS " + parameters.maxDirLights,
			"#define MAX_POINT_LIGHTS " + parameters.maxPointLights,
			"#define MAX_SPOT_LIGHTS " + parameters.maxSpotLights,
			"#define MAX_HEMI_LIGHTS " + parameters.maxHemiLights,

			"#define MAX_SHADOWS " + parameters.maxShadows,

			parameters.alphaTest ? "#define ALPHATEST " + parameters.alphaTest: "",

			_this.gammaInput ? "#define GAMMA_INPUT" : "",
			_this.gammaOutput ? "#define GAMMA_OUTPUT" : "",
			_this.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",

			( parameters.useFog && parameters.fog ) ? "#define USE_FOG" : "",
			( parameters.useFog && parameters.fogExp ) ? "#define FOG_EXP2" : "",

			parameters.map ? "#define USE_MAP" : "",
			parameters.envMap ? "#define USE_ENVMAP" : "",
			parameters.lightMap ? "#define USE_LIGHTMAP" : "",
			parameters.bumpMap ? "#define USE_BUMPMAP" : "",
			parameters.normalMap ? "#define USE_NORMALMAP" : "",
			parameters.specularMap ? "#define USE_SPECULARMAP" : "",
			parameters.vertexColors ? "#define USE_COLOR" : "",

			parameters.metal ? "#define METAL" : "",
			parameters.perPixel ? "#define PHONG_PER_PIXEL" : "",
			parameters.wrapAround ? "#define WRAP_AROUND" : "",
			parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
			parameters.flipSided ? "#define FLIP_SIDED" : "",

			parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
			parameters.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
			parameters.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
			parameters.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",

			"uniform mat4 viewMatrix;",
			"uniform vec3 cameraPosition;",
			""

		].join("\n");

		var glFragmentShader = getShader( "fragment", prefix_fragment + fragmentShader );
		var glVertexShader = getShader( "vertex", prefix_vertex + vertexShader );

		_gl.attachShader( program, glVertexShader );
		_gl.attachShader( program, glFragmentShader );

		_gl.linkProgram( program );

		if ( !_gl.getProgramParameter( program, _gl.LINK_STATUS ) ) {

			console.error( "Could not initialise shader\n" + "VALIDATE_STATUS: " + _gl.getProgramParameter( program, _gl.VALIDATE_STATUS ) + ", gl error [" + _gl.getError() + "]" );

		}

		// clean up

		_gl.deleteShader( glFragmentShader );
		_gl.deleteShader( glVertexShader );

		//console.log( prefix_fragment + fragmentShader );
		//console.log( prefix_vertex + vertexShader );

		program.uniforms = {};
		program.attributes = {};

		var identifiers, u, a, i;

		// cache uniform locations

		identifiers = [

			'viewMatrix', 'modelViewMatrix', 'projectionMatrix', 'normalMatrix', 'modelMatrix', 'cameraPosition',
			'morphTargetInfluences'

		];

		if ( parameters.useVertexTexture ) {

			identifiers.push( 'boneTexture' );

		} else {

			identifiers.push( 'boneGlobalMatrices' );

		}

		for ( u in uniforms ) {

			identifiers.push( u );

		}

		cacheUniformLocations( program, identifiers );

		// cache attributes locations

		identifiers = [

			"position", "normal", "uv", "uv2", "tangent", "color",
			"skinIndex", "skinWeight", "lineDistance"

		];

		for ( i = 0; i < parameters.maxMorphTargets; i ++ ) {

			identifiers.push( "morphTarget" + i );

		}

		for ( i = 0; i < parameters.maxMorphNormals; i ++ ) {

			identifiers.push( "morphNormal" + i );

		}

		for ( a in attributes ) {

			identifiers.push( a );

		}

		cacheAttributeLocations( program, identifiers );

		program.id = _programs_counter ++;

		_programs.push( { program: program, code: code, usedTimes: 1 } );

		_this.info.memory.programs = _programs.length;

		return program;

	};

	// Shader parameters cache

	function cacheUniformLocations ( program, identifiers ) {

		var i, l, id;

		for( i = 0, l = identifiers.length; i < l; i ++ ) {

			id = identifiers[ i ];
			program.uniforms[ id ] = _gl.getUniformLocation( program, id );

		}

	};

	function cacheAttributeLocations ( program, identifiers ) {

		var i, l, id;

		for( i = 0, l = identifiers.length; i < l; i ++ ) {

			id = identifiers[ i ];
			program.attributes[ id ] = _gl.getAttribLocation( program, id );

		}

	};

	function addLineNumbers ( string ) {

		var chunks = string.split( "\n" );

		for ( var i = 0, il = chunks.length; i < il; i ++ ) {

			// Chrome reports shader errors on lines
			// starting counting from 1

			chunks[ i ] = ( i + 1 ) + ": " + chunks[ i ];

		}

		return chunks.join( "\n" );

	};

	function getShader ( type, string ) {

		var shader;

		if ( type === "fragment" ) {

			shader = _gl.createShader( _gl.FRAGMENT_SHADER );

		} else if ( type === "vertex" ) {

			shader = _gl.createShader( _gl.VERTEX_SHADER );

		}

		_gl.shaderSource( shader, string );
		_gl.compileShader( shader );

		if ( !_gl.getShaderParameter( shader, _gl.COMPILE_STATUS ) ) {

			console.error( _gl.getShaderInfoLog( shader ) );
			console.error( addLineNumbers( string ) );
			return null;

		}

		return shader;

	};

	// Textures


	function isPowerOfTwo ( value ) {

		return ( value & ( value - 1 ) ) === 0;

	};

	function setTextureParameters ( textureType, texture, isImagePowerOfTwo ) {

		if ( isImagePowerOfTwo ) {

			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, paramThreeToGL( texture.wrapS ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, paramThreeToGL( texture.wrapT ) );

			_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, paramThreeToGL( texture.magFilter ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, paramThreeToGL( texture.minFilter ) );

		} else {

			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );

			_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterFallback( texture.magFilter ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterFallback( texture.minFilter ) );

		}

		if ( _glExtensionTextureFilterAnisotropic && texture.type !== THREE.FloatType ) {

			if ( texture.anisotropy > 1 || texture.__oldAnisotropy ) {

				_gl.texParameterf( textureType, _glExtensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, _maxAnisotropy ) );
				texture.__oldAnisotropy = texture.anisotropy;

			}

		}

	};

	this.setTexture = function ( texture, slot ) {

		if ( texture.needsUpdate ) {

			if ( ! texture.__webglInit ) {

				texture.__webglInit = true;
				texture.__webglTexture = _gl.createTexture();

				_this.info.memory.textures ++;

			}

			_gl.activeTexture( _gl.TEXTURE0 + slot );
			_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );

			_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );
			_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );

			var image = texture.image,
			isImagePowerOfTwo = isPowerOfTwo( image.width ) && isPowerOfTwo( image.height ),
			glFormat = paramThreeToGL( texture.format ),
			glType = paramThreeToGL( texture.type );

			setTextureParameters( _gl.TEXTURE_2D, texture, isImagePowerOfTwo );

			if ( texture instanceof THREE.CompressedTexture ) {

				var mipmap, mipmaps = texture.mipmaps;

				for( var i = 0, il = mipmaps.length; i < il; i ++ ) {

					mipmap = mipmaps[ i ];
					_gl.compressedTexImage2D( _gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, mipmap.data );

				}

			} else if ( texture instanceof THREE.DataTexture ) {

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, image.width, image.height, 0, glFormat, glType, image.data );

			} else {

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, glFormat, glType, texture.image );

			}

			if ( texture.generateMipmaps && isImagePowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

			texture.needsUpdate = false;

			if ( texture.onUpdate ) texture.onUpdate();

		} else {

			_gl.activeTexture( _gl.TEXTURE0 + slot );
			_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );

		}

	};

	function clampToMaxSize ( image, maxSize ) {

		if ( image.width <= maxSize && image.height <= maxSize ) {

			return image;

		}

		// Warning: Scaling through the canvas will only work with images that use
		// premultiplied alpha.

		var maxDimension = Math.max( image.width, image.height );
		var newWidth = Math.floor( image.width * maxSize / maxDimension );
		var newHeight = Math.floor( image.height * maxSize / maxDimension );

		var canvas = document.createElement( 'canvas' );
		canvas.width = newWidth;
		canvas.height = newHeight;

		var ctx = canvas.getContext( "2d" );
		ctx.drawImage( image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight );

		return canvas;

	}

	function setCubeTexture ( texture, slot ) {

		if ( texture.image.length === 6 ) {

			if ( texture.needsUpdate ) {

				if ( ! texture.image.__webglTextureCube ) {

					texture.image.__webglTextureCube = _gl.createTexture();

				}

				_gl.activeTexture( _gl.TEXTURE0 + slot );
				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );

				_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );

				var isCompressed = texture instanceof THREE.CompressedTexture;

				var cubeImage = [];

				for ( var i = 0; i < 6; i ++ ) {

					if ( _this.autoScaleCubemaps && ! isCompressed ) {

						cubeImage[ i ] = clampToMaxSize( texture.image[ i ], _maxCubemapSize );

					} else {

						cubeImage[ i ] = texture.image[ i ];

					}

				}

				var image = cubeImage[ 0 ],
				isImagePowerOfTwo = isPowerOfTwo( image.width ) && isPowerOfTwo( image.height ),
				glFormat = paramThreeToGL( texture.format ),
				glType = paramThreeToGL( texture.type );

				setTextureParameters( _gl.TEXTURE_CUBE_MAP, texture, isImagePowerOfTwo );

				for ( var i = 0; i < 6; i ++ ) {

					if ( isCompressed ) {

						var mipmap, mipmaps = cubeImage[ i ].mipmaps;

						for( var j = 0, jl = mipmaps.length; j < jl; j ++ ) {

							mipmap = mipmaps[ j ];
							_gl.compressedTexImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glFormat, mipmap.width, mipmap.height, 0, mipmap.data );

						}

					} else {

						_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, glFormat, glType, cubeImage[ i ] );

					}

				}

				if ( texture.generateMipmaps && isImagePowerOfTwo ) {

					_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );

				}

				texture.needsUpdate = false;

				if ( texture.onUpdate ) texture.onUpdate();

			} else {

				_gl.activeTexture( _gl.TEXTURE0 + slot );
				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );

			}

		}

	};

	function setCubeTextureDynamic ( texture, slot ) {

		_gl.activeTexture( _gl.TEXTURE0 + slot );
		_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.__webglTexture );

	};

	// Render targets

	function setupFrameBuffer ( framebuffer, renderTarget, textureTarget ) {

		_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
		_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, textureTarget, renderTarget.__webglTexture, 0 );

	};

	function setupRenderBuffer ( renderbuffer, renderTarget  ) {

		_gl.bindRenderbuffer( _gl.RENDERBUFFER, renderbuffer );

		if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

		/* For some reason this is not working. Defaulting to RGBA4.
		} else if( ! renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.STENCIL_INDEX8, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );
		*/
		} else if( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

		} else {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height );

		}

	};

	this.setRenderTarget = function ( renderTarget ) {

		var isCube = ( renderTarget instanceof THREE.WebGLRenderTargetCube );

		if ( renderTarget && ! renderTarget.__webglFramebuffer ) {

			if ( renderTarget.depthBuffer === undefined ) renderTarget.depthBuffer = true;
			if ( renderTarget.stencilBuffer === undefined ) renderTarget.stencilBuffer = true;

			renderTarget.__webglTexture = _gl.createTexture();

			// Setup texture, create render and frame buffers

			var isTargetPowerOfTwo = isPowerOfTwo( renderTarget.width ) && isPowerOfTwo( renderTarget.height ),
				glFormat = paramThreeToGL( renderTarget.format ),
				glType = paramThreeToGL( renderTarget.type );

			if ( isCube ) {

				renderTarget.__webglFramebuffer = [];
				renderTarget.__webglRenderbuffer = [];

				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );
				setTextureParameters( _gl.TEXTURE_CUBE_MAP, renderTarget, isTargetPowerOfTwo );

				for ( var i = 0; i < 6; i ++ ) {

					renderTarget.__webglFramebuffer[ i ] = _gl.createFramebuffer();
					renderTarget.__webglRenderbuffer[ i ] = _gl.createRenderbuffer();

					_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

					setupFrameBuffer( renderTarget.__webglFramebuffer[ i ], renderTarget, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i );
					setupRenderBuffer( renderTarget.__webglRenderbuffer[ i ], renderTarget );

				}

				if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );

			} else {

				renderTarget.__webglFramebuffer = _gl.createFramebuffer();
				renderTarget.__webglRenderbuffer = _gl.createRenderbuffer();

				_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );
				setTextureParameters( _gl.TEXTURE_2D, renderTarget, isTargetPowerOfTwo );

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

				setupFrameBuffer( renderTarget.__webglFramebuffer, renderTarget, _gl.TEXTURE_2D );
				setupRenderBuffer( renderTarget.__webglRenderbuffer, renderTarget );

				if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

			}

			// Release everything

			if ( isCube ) {

				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

			} else {

				_gl.bindTexture( _gl.TEXTURE_2D, null );

			}

			_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );
			_gl.bindFramebuffer( _gl.FRAMEBUFFER, null);

		}

		var framebuffer, width, height, vx, vy;

		if ( renderTarget ) {

			if ( isCube ) {

				framebuffer = renderTarget.__webglFramebuffer[ renderTarget.activeCubeFace ];

			} else {

				framebuffer = renderTarget.__webglFramebuffer;

			}

			width = renderTarget.width;
			height = renderTarget.height;

			vx = 0;
			vy = 0;

		} else {

			framebuffer = null;

			width = _viewportWidth;
			height = _viewportHeight;

			vx = _viewportX;
			vy = _viewportY;

		}

		if ( framebuffer !== _currentFramebuffer ) {

			_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
			_gl.viewport( vx, vy, width, height );

			_currentFramebuffer = framebuffer;

		}

		_currentWidth = width;
		_currentHeight = height;

	};

	function updateRenderTargetMipmap ( renderTarget ) {

		if ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {

			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );
			_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );
			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

		} else {

			_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );
			_gl.generateMipmap( _gl.TEXTURE_2D );
			_gl.bindTexture( _gl.TEXTURE_2D, null );

		}

	};

	// Fallback filters for non-power-of-2 textures

	function filterFallback ( f ) {

		if ( f === THREE.NearestFilter || f === THREE.NearestMipMapNearestFilter || f === THREE.NearestMipMapLinearFilter ) {

			return _gl.NEAREST;

		}

		return _gl.LINEAR;

	};

	// Map three.js constants to WebGL constants

	function paramThreeToGL ( p ) {

		if ( p === THREE.RepeatWrapping ) return _gl.REPEAT;
		if ( p === THREE.ClampToEdgeWrapping ) return _gl.CLAMP_TO_EDGE;
		if ( p === THREE.MirroredRepeatWrapping ) return _gl.MIRRORED_REPEAT;

		if ( p === THREE.NearestFilter ) return _gl.NEAREST;
		if ( p === THREE.NearestMipMapNearestFilter ) return _gl.NEAREST_MIPMAP_NEAREST;
		if ( p === THREE.NearestMipMapLinearFilter ) return _gl.NEAREST_MIPMAP_LINEAR;

		if ( p === THREE.LinearFilter ) return _gl.LINEAR;
		if ( p === THREE.LinearMipMapNearestFilter ) return _gl.LINEAR_MIPMAP_NEAREST;
		if ( p === THREE.LinearMipMapLinearFilter ) return _gl.LINEAR_MIPMAP_LINEAR;

		if ( p === THREE.UnsignedByteType ) return _gl.UNSIGNED_BYTE;
		if ( p === THREE.UnsignedShort4444Type ) return _gl.UNSIGNED_SHORT_4_4_4_4;
		if ( p === THREE.UnsignedShort5551Type ) return _gl.UNSIGNED_SHORT_5_5_5_1;
		if ( p === THREE.UnsignedShort565Type ) return _gl.UNSIGNED_SHORT_5_6_5;

		if ( p === THREE.ByteType ) return _gl.BYTE;
		if ( p === THREE.ShortType ) return _gl.SHORT;
		if ( p === THREE.UnsignedShortType ) return _gl.UNSIGNED_SHORT;
		if ( p === THREE.IntType ) return _gl.INT;
		if ( p === THREE.UnsignedIntType ) return _gl.UNSIGNED_INT;
		if ( p === THREE.FloatType ) return _gl.FLOAT;

		if ( p === THREE.AlphaFormat ) return _gl.ALPHA;
		if ( p === THREE.RGBFormat ) return _gl.RGB;
		if ( p === THREE.RGBAFormat ) return _gl.RGBA;
		if ( p === THREE.LuminanceFormat ) return _gl.LUMINANCE;
		if ( p === THREE.LuminanceAlphaFormat ) return _gl.LUMINANCE_ALPHA;

		if ( p === THREE.AddEquation ) return _gl.FUNC_ADD;
		if ( p === THREE.SubtractEquation ) return _gl.FUNC_SUBTRACT;
		if ( p === THREE.ReverseSubtractEquation ) return _gl.FUNC_REVERSE_SUBTRACT;

		if ( p === THREE.ZeroFactor ) return _gl.ZERO;
		if ( p === THREE.OneFactor ) return _gl.ONE;
		if ( p === THREE.SrcColorFactor ) return _gl.SRC_COLOR;
		if ( p === THREE.OneMinusSrcColorFactor ) return _gl.ONE_MINUS_SRC_COLOR;
		if ( p === THREE.SrcAlphaFactor ) return _gl.SRC_ALPHA;
		if ( p === THREE.OneMinusSrcAlphaFactor ) return _gl.ONE_MINUS_SRC_ALPHA;
		if ( p === THREE.DstAlphaFactor ) return _gl.DST_ALPHA;
		if ( p === THREE.OneMinusDstAlphaFactor ) return _gl.ONE_MINUS_DST_ALPHA;

		if ( p === THREE.DstColorFactor ) return _gl.DST_COLOR;
		if ( p === THREE.OneMinusDstColorFactor ) return _gl.ONE_MINUS_DST_COLOR;
		if ( p === THREE.SrcAlphaSaturateFactor ) return _gl.SRC_ALPHA_SATURATE;

		if ( _glExtensionCompressedTextureS3TC !== undefined ) {

			if ( p === THREE.RGB_S3TC_DXT1_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if ( p === THREE.RGBA_S3TC_DXT1_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if ( p === THREE.RGBA_S3TC_DXT3_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if ( p === THREE.RGBA_S3TC_DXT5_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT5_EXT;

		}

		return 0;

	};

	// Allocations

	function allocateBones ( object ) {

		if ( _supportsBoneTextures && object && object.useVertexTexture ) {

			return 1024;

		} else {

			// default for when object is not specified
			// ( for example when prebuilding shader
			//   to be used with multiple objects )
			//
			// 	- leave some extra space for other uniforms
			//  - limit here is ANGLE's 254 max uniform vectors
			//    (up to 54 should be safe)

			var nVertexUniforms = _gl.getParameter( _gl.MAX_VERTEX_UNIFORM_VECTORS );
			var nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );

			var maxBones = nVertexMatrices;

			if ( object !== undefined && object instanceof THREE.SkinnedMesh ) {

				maxBones = Math.min( object.bones.length, maxBones );

				if ( maxBones < object.bones.length ) {

					console.warn( "WebGLRenderer: too many bones - " + object.bones.length + ", this GPU supports just " + maxBones + " (try OpenGL instead of ANGLE)" );

				}

			}

			return maxBones;

		}

	};

	function allocateLights ( lights ) {

		var l, ll, light, dirLights, pointLights, spotLights, hemiLights;

		dirLights = pointLights = spotLights = hemiLights = 0;

		for ( l = 0, ll = lights.length; l < ll; l ++ ) {

			light = lights[ l ];

			if ( light.onlyShadow ) continue;

			if ( light instanceof THREE.DirectionalLight ) dirLights ++;
			if ( light instanceof THREE.PointLight ) pointLights ++;
			if ( light instanceof THREE.SpotLight ) spotLights ++;
			if ( light instanceof THREE.HemisphereLight ) hemiLights ++;

		}

		return { 'directional' : dirLights, 'point' : pointLights, 'spot': spotLights, 'hemi': hemiLights };

	};

	function allocateShadows ( lights ) {

		var l, ll, light, maxShadows = 0;

		for ( l = 0, ll = lights.length; l < ll; l++ ) {

			light = lights[ l ];

			if ( ! light.castShadow ) continue;

			if ( light instanceof THREE.SpotLight ) maxShadows ++;
			if ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) maxShadows ++;

		}

		return maxShadows;

	};

	// Initialization

	function initGL () {

		try {

			if ( ! ( _gl = _canvas.getContext( 'experimental-webgl', { alpha: _alpha, premultipliedAlpha: _premultipliedAlpha, antialias: _antialias, stencil: _stencil, preserveDrawingBuffer: _preserveDrawingBuffer } ) ) ) {

				throw 'Error creating WebGL context.';

			}

		} catch ( error ) {

			console.error( error );

		}

		_glExtensionTextureFloat = _gl.getExtension( 'OES_texture_float' );
		_glExtensionStandardDerivatives = _gl.getExtension( 'OES_standard_derivatives' );

		_glExtensionTextureFilterAnisotropic = _gl.getExtension( 'EXT_texture_filter_anisotropic' ) ||
											   _gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) ||
											   _gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );


		_glExtensionCompressedTextureS3TC = _gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) ||
											_gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) ||
											_gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );

		if ( ! _glExtensionTextureFloat ) {

			console.log( 'THREE.WebGLRenderer: Float textures not supported.' );

		}

		if ( ! _glExtensionStandardDerivatives ) {

			console.log( 'THREE.WebGLRenderer: Standard derivatives not supported.' );

		}

		if ( ! _glExtensionTextureFilterAnisotropic ) {

			console.log( 'THREE.WebGLRenderer: Anisotropic texture filtering not supported.' );

		}

		if ( ! _glExtensionCompressedTextureS3TC ) {

			console.log( 'THREE.WebGLRenderer: S3TC compressed textures not supported.' );

		}

	};

	function setDefaultGLState () {

		_gl.clearColor( 0, 0, 0, 1 );
		_gl.clearDepth( 1 );
		_gl.clearStencil( 0 );

		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthFunc( _gl.LEQUAL );

		_gl.frontFace( _gl.CCW );
		_gl.cullFace( _gl.BACK );
		_gl.enable( _gl.CULL_FACE );

		_gl.enable( _gl.BLEND );
		_gl.blendEquation( _gl.FUNC_ADD );
		_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	};

	// default plugins (order is important)

	this.shadowMapPlugin = new THREE.ShadowMapPlugin();
	this.addPrePlugin( this.shadowMapPlugin );

	this.addPostPlugin( new THREE.SpritePlugin() );
	this.addPostPlugin( new THREE.LensFlarePlugin() );

};
/**
 * @author szimek / https://github.com/szimek/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.WebGLRenderTarget = function ( width, height, options ) {

	this.width = width;
	this.height = height;

	options = options || {};

	this.wrapS = options.wrapS !== undefined ? options.wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = options.wrapT !== undefined ? options.wrapT : THREE.ClampToEdgeWrapping;

	this.magFilter = options.magFilter !== undefined ? options.magFilter : THREE.LinearFilter;
	this.minFilter = options.minFilter !== undefined ? options.minFilter : THREE.LinearMipMapLinearFilter;

	this.anisotropy = options.anisotropy !== undefined ? options.anisotropy : 1;

	this.offset = new THREE.Vector2( 0, 0 );
	this.repeat = new THREE.Vector2( 1, 1 );

	this.format = options.format !== undefined ? options.format : THREE.RGBAFormat;
	this.type = options.type !== undefined ? options.type : THREE.UnsignedByteType;

	this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
	this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;

	this.generateMipmaps = true;

};

THREE.WebGLRenderTarget.prototype.clone = function() {

	var tmp = new THREE.WebGLRenderTarget( this.width, this.height );

	tmp.wrapS = this.wrapS;
	tmp.wrapT = this.wrapT;

	tmp.magFilter = this.magFilter;
	tmp.anisotropy = this.anisotropy;

	tmp.minFilter = this.minFilter;

	tmp.offset.copy( this.offset );
	tmp.repeat.copy( this.repeat );

	tmp.format = this.format;
	tmp.type = this.type;

	tmp.depthBuffer = this.depthBuffer;
	tmp.stencilBuffer = this.stencilBuffer;

	tmp.generateMipmaps = this.generateMipmaps;

	return tmp;

};
/**
 * @author alteredq / http://alteredqualia.com
 */

THREE.WebGLRenderTargetCube = function ( width, height, options ) {

	THREE.WebGLRenderTarget.call( this, width, height, options );

	this.activeCubeFace = 0; // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5

};

THREE.WebGLRenderTargetCube.prototype = Object.create( THREE.WebGLRenderTarget.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RenderableVertex = function () {

	this.positionWorld = new THREE.Vector3();
	this.positionScreen = new THREE.Vector4();

	this.visible = true;

};

THREE.RenderableVertex.prototype.copy = function ( vertex ) {

	this.positionWorld.copy( vertex.positionWorld );
	this.positionScreen.copy( vertex.positionScreen );

}
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RenderableFace3 = function () {

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();
	this.v3 = new THREE.RenderableVertex();

	this.centroidWorld = new THREE.Vector3();
	this.centroidScreen = new THREE.Vector3();

	this.normalWorld = new THREE.Vector3();
	this.vertexNormalsWorld = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	this.vertexNormalsLength = 0;

	this.color = null;
	this.material = null;
	this.uvs = [[]];

	this.z = null;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RenderableFace4 = function () {

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();
	this.v3 = new THREE.RenderableVertex();
	this.v4 = new THREE.RenderableVertex();

	this.centroidWorld = new THREE.Vector3();
	this.centroidScreen = new THREE.Vector3();

	this.normalWorld = new THREE.Vector3();
	this.vertexNormalsWorld = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	this.vertexNormalsLength = 0;

	this.color = null;
	this.material = null;
	this.uvs = [[]];

	this.z = null;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RenderableObject = function () {

	this.object = null;
	this.z = null;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RenderableParticle = function () {

	this.object = null;

	this.x = null;
	this.y = null;
	this.z = null;

	this.rotation = null;
	this.scale = new THREE.Vector2();

	this.material = null;

};
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RenderableLine = function () {

	this.z = null;

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();

	this.material = null;

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ColorUtils = {

	adjustHSV : function ( color, h, s, v ) {

		var hsv = THREE.ColorUtils.__hsv;

		color.getHSV( hsv );

		hsv.h = THREE.Math.clamp( hsv.h + h, 0, 1 );
		hsv.s = THREE.Math.clamp( hsv.s + s, 0, 1 );
		hsv.v = THREE.Math.clamp( hsv.v + v, 0, 1 );

		color.setHSV( hsv.h, hsv.s, hsv.v );

	}

};

THREE.ColorUtils.__hsv = { h: 0, s: 0, v: 0 };/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.GeometryUtils = {

	// Merge two geometries or geometry and geometry from object (using object's transform)

	merge: function ( geometry1, object2 /* mesh | geometry */ ) {

		var matrix, matrixRotation,
		vertexOffset = geometry1.vertices.length,
		uvPosition = geometry1.faceVertexUvs[ 0 ].length,
		geometry2 = object2 instanceof THREE.Mesh ? object2.geometry : object2,
		vertices1 = geometry1.vertices,
		vertices2 = geometry2.vertices,
		faces1 = geometry1.faces,
		faces2 = geometry2.faces,
		uvs1 = geometry1.faceVertexUvs[ 0 ],
		uvs2 = geometry2.faceVertexUvs[ 0 ];

		if ( object2 instanceof THREE.Mesh ) {

			object2.matrixAutoUpdate && object2.updateMatrix();

			matrix = object2.matrix;
			matrixRotation = new THREE.Matrix4();
			matrixRotation.extractRotation( matrix, object2.scale );

		}

		// vertices

		for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

			var vertex = vertices2[ i ];

			var vertexCopy = vertex.clone();

			if ( matrix ) matrix.multiplyVector3( vertexCopy );

			vertices1.push( vertexCopy );

		}

		// faces

		for ( i = 0, il = faces2.length; i < il; i ++ ) {

			var face = faces2[ i ], faceCopy, normal, color,
			faceVertexNormals = face.vertexNormals,
			faceVertexColors = face.vertexColors;

			if ( face instanceof THREE.Face3 ) {

				faceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );

			} else if ( face instanceof THREE.Face4 ) {

				faceCopy = new THREE.Face4( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset, face.d + vertexOffset );

			}

			faceCopy.normal.copy( face.normal );

			if ( matrixRotation ) matrixRotation.multiplyVector3( faceCopy.normal );

			for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

				normal = faceVertexNormals[ j ].clone();

				if ( matrixRotation ) matrixRotation.multiplyVector3( normal );

				faceCopy.vertexNormals.push( normal );

			}

			faceCopy.color.copy( face.color );

			for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {

				color = faceVertexColors[ j ];
				faceCopy.vertexColors.push( color.clone() );

			}

			faceCopy.materialIndex = face.materialIndex;

			faceCopy.centroid.copy( face.centroid );
			if ( matrix ) matrix.multiplyVector3( faceCopy.centroid );

			faces1.push( faceCopy );

		}

		// uvs

		for ( i = 0, il = uvs2.length; i < il; i ++ ) {

			var uv = uvs2[ i ], uvCopy = [];

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.UV( uv[ j ].u, uv[ j ].v ) );

			}

			uvs1.push( uvCopy );

		}

	},

	removeMaterials: function ( geometry, materialIndexArray ) {

		var materialIndexMap = {};

		for ( var i = 0, il = materialIndexArray.length; i < il; i ++ ) {

			materialIndexMap[ materialIndexArray[i] ] = true;

		}

		var face, newFaces = [];

		for ( var i = 0, il = geometry.faces.length; i < il; i ++ ) {

			face = geometry.faces[ i ];
			if ( ! ( face.materialIndex in materialIndexMap ) ) newFaces.push( face );

		}

		geometry.faces = newFaces;

	},

	// Get random point in triangle (via barycentric coordinates)
	// 	(uniform distribution)
	// 	http://www.cgafaq.info/wiki/Random_Point_In_Triangle

	randomPointInTriangle: function ( vectorA, vectorB, vectorC ) {

		var a, b, c,
			point = new THREE.Vector3(),
			tmp = THREE.GeometryUtils.__v1;

		a = THREE.GeometryUtils.random();
		b = THREE.GeometryUtils.random();

		if ( ( a + b ) > 1 ) {

			a = 1 - a;
			b = 1 - b;

		}

		c = 1 - a - b;

		point.copy( vectorA );
		point.multiplyScalar( a );

		tmp.copy( vectorB );
		tmp.multiplyScalar( b );

		point.addSelf( tmp );

		tmp.copy( vectorC );
		tmp.multiplyScalar( c );

		point.addSelf( tmp );

		return point;

	},

	// Get random point in face (triangle / quad)
	// (uniform distribution)

	randomPointInFace: function ( face, geometry, useCachedAreas ) {

		var vA, vB, vC, vD;

		if ( face instanceof THREE.Face3 ) {

			vA = geometry.vertices[ face.a ];
			vB = geometry.vertices[ face.b ];
			vC = geometry.vertices[ face.c ];

			return THREE.GeometryUtils.randomPointInTriangle( vA, vB, vC );

		} else if ( face instanceof THREE.Face4 ) {

			vA = geometry.vertices[ face.a ];
			vB = geometry.vertices[ face.b ];
			vC = geometry.vertices[ face.c ];
			vD = geometry.vertices[ face.d ];

			var area1, area2;

			if ( useCachedAreas ) {

				if ( face._area1 && face._area2 ) {

					area1 = face._area1;
					area2 = face._area2;

				} else {

					area1 = THREE.GeometryUtils.triangleArea( vA, vB, vD );
					area2 = THREE.GeometryUtils.triangleArea( vB, vC, vD );

					face._area1 = area1;
					face._area2 = area2;

				}

			} else {

				area1 = THREE.GeometryUtils.triangleArea( vA, vB, vD ),
				area2 = THREE.GeometryUtils.triangleArea( vB, vC, vD );

			}

			var r = THREE.GeometryUtils.random() * ( area1 + area2 );

			if ( r < area1 ) {

				return THREE.GeometryUtils.randomPointInTriangle( vA, vB, vD );

			} else {

				return THREE.GeometryUtils.randomPointInTriangle( vB, vC, vD );

			}

		}

	},

	// Get uniformly distributed random points in mesh
	// 	- create array with cumulative sums of face areas
	//  - pick random number from 0 to total area
	//  - find corresponding place in area array by binary search
	//	- get random point in face

	randomPointsInGeometry: function ( geometry, n ) {

		var face, i,
			faces = geometry.faces,
			vertices = geometry.vertices,
			il = faces.length,
			totalArea = 0,
			cumulativeAreas = [],
			vA, vB, vC, vD;

		// precompute face areas

		for ( i = 0; i < il; i ++ ) {

			face = faces[ i ];

			if ( face instanceof THREE.Face3 ) {

				vA = vertices[ face.a ];
				vB = vertices[ face.b ];
				vC = vertices[ face.c ];

				face._area = THREE.GeometryUtils.triangleArea( vA, vB, vC );

			} else if ( face instanceof THREE.Face4 ) {

				vA = vertices[ face.a ];
				vB = vertices[ face.b ];
				vC = vertices[ face.c ];
				vD = vertices[ face.d ];

				face._area1 = THREE.GeometryUtils.triangleArea( vA, vB, vD );
				face._area2 = THREE.GeometryUtils.triangleArea( vB, vC, vD );

				face._area = face._area1 + face._area2;

			}

			totalArea += face._area;

			cumulativeAreas[ i ] = totalArea;

		}

		// binary search cumulative areas array

		function binarySearchIndices( value ) {

			function binarySearch( start, end ) {

				// return closest larger index
				// if exact number is not found

				if ( end < start )
					return start;

				var mid = start + Math.floor( ( end - start ) / 2 );

				if ( cumulativeAreas[ mid ] > value ) {

					return binarySearch( start, mid - 1 );

				} else if ( cumulativeAreas[ mid ] < value ) {

					return binarySearch( mid + 1, end );

				} else {

					return mid;

				}

			}

			var result = binarySearch( 0, cumulativeAreas.length - 1 )
			return result;

		}

		// pick random face weighted by face area

		var r, index,
			result = [];

		var stats = {};

		for ( i = 0; i < n; i ++ ) {

			r = THREE.GeometryUtils.random() * totalArea;

			index = binarySearchIndices( r );

			result[ i ] = THREE.GeometryUtils.randomPointInFace( faces[ index ], geometry, true );

			if ( ! stats[ index ] ) {

				stats[ index ] = 1;

			} else {

				stats[ index ] += 1;

			}

		}

		return result;

	},

	// Get triangle area (by Heron's formula)
	// 	http://en.wikipedia.org/wiki/Heron%27s_formula

	triangleArea: function ( vectorA, vectorB, vectorC ) {

		var s, a, b, c,
			tmp = THREE.GeometryUtils.__v1;

		tmp.sub( vectorA, vectorB );
		a = tmp.length();

		tmp.sub( vectorA, vectorC );
		b = tmp.length();

		tmp.sub( vectorB, vectorC );
		c = tmp.length();

		s = 0.5 * ( a + b + c );

		return Math.sqrt( s * ( s - a ) * ( s - b ) * ( s - c ) );

	},

	// Center geometry so that 0,0,0 is in center of bounding box

	center: function ( geometry ) {

		geometry.computeBoundingBox();

		var bb = geometry.boundingBox;

		var offset = new THREE.Vector3();

		offset.add( bb.min, bb.max );
		offset.multiplyScalar( -0.5 );

		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( offset.x, offset.y, offset.z ) );
		geometry.computeBoundingBox();

		return offset;

	},

	// Normalize UVs to be from <0,1>
	// (for now just the first set of UVs)

	normalizeUVs: function ( geometry ) {

		var uvSet = geometry.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvSet.length; i < il; i ++ ) {

			var uvs = uvSet[ i ];

			for ( var j = 0, jl = uvs.length; j < jl; j ++ ) {

				// texture repeat

				if( uvs[ j ].u !== 1.0 ) uvs[ j ].u = uvs[ j ].u - Math.floor( uvs[ j ].u );
				if( uvs[ j ].v !== 1.0 ) uvs[ j ].v = uvs[ j ].v - Math.floor( uvs[ j ].v );

			}

		}

	},

	triangulateQuads: function ( geometry ) {

		var i, il, j, jl;

		var faces = [];
		var faceUvs = [];
		var faceVertexUvs = [];

		for ( i = 0, il = geometry.faceUvs.length; i < il; i ++ ) {

			faceUvs[ i ] = [];

		}

		for ( i = 0, il = geometry.faceVertexUvs.length; i < il; i ++ ) {

			faceVertexUvs[ i ] = [];

		}

		for ( i = 0, il = geometry.faces.length; i < il; i ++ ) {

			var face = geometry.faces[ i ];

			if ( face instanceof THREE.Face4 ) {

				var a = face.a;
				var b = face.b;
				var c = face.c;
				var d = face.d;

				var triA = new THREE.Face3();
				var triB = new THREE.Face3();

				triA.color.copy( face.color );
				triB.color.copy( face.color );

				triA.materialIndex = face.materialIndex;
				triB.materialIndex = face.materialIndex;

				triA.a = a;
				triA.b = b;
				triA.c = d;

				triB.a = b;
				triB.b = c;
				triB.c = d;

				if ( face.vertexColors.length === 4 ) {

					triA.vertexColors[ 0 ] = face.vertexColors[ 0 ].clone();
					triA.vertexColors[ 1 ] = face.vertexColors[ 1 ].clone();
					triA.vertexColors[ 2 ] = face.vertexColors[ 3 ].clone();

					triB.vertexColors[ 0 ] = face.vertexColors[ 1 ].clone();
					triB.vertexColors[ 1 ] = face.vertexColors[ 2 ].clone();
					triB.vertexColors[ 2 ] = face.vertexColors[ 3 ].clone();

				}

				faces.push( triA, triB );

				for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {

					if ( geometry.faceVertexUvs[ j ].length ) {

						var uvs = geometry.faceVertexUvs[ j ][ i ];

						var uvA = uvs[ 0 ];
						var uvB = uvs[ 1 ];
						var uvC = uvs[ 2 ];
						var uvD = uvs[ 3 ];

						var uvsTriA = [ uvA.clone(), uvB.clone(), uvD.clone() ];
						var uvsTriB = [ uvB.clone(), uvC.clone(), uvD.clone() ];

						faceVertexUvs[ j ].push( uvsTriA, uvsTriB );

					}

				}

				for ( j = 0, jl = geometry.faceUvs.length; j < jl; j ++ ) {

					if ( geometry.faceUvs[ j ].length ) {

						var faceUv = geometry.faceUvs[ j ][ i ];

						faceUvs[ j ].push( faceUv, faceUv );

					}

				}

			} else {

				faces.push( face );

				for ( j = 0, jl = geometry.faceUvs.length; j < jl; j ++ ) {

					faceUvs[ j ].push( geometry.faceUvs[ j ][ i ] );

				}

				for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {

					faceVertexUvs[ j ].push( geometry.faceVertexUvs[ j ][ i ] );

				}

			}

		}

		geometry.faces = faces;
		geometry.faceUvs = faceUvs;
		geometry.faceVertexUvs = faceVertexUvs;

		geometry.computeCentroids();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		if ( geometry.hasTangents ) geometry.computeTangents();

	},

	// Make all faces use unique vertices
	// so that each face can be separated from others

	explode: function( geometry ) {

		var vertices = [];

		for ( var i = 0, il = geometry.faces.length; i < il; i ++ ) {

			var n = vertices.length;

			var face = geometry.faces[ i ];

			if ( face instanceof THREE.Face4 ) {

				var a = face.a;
				var b = face.b;
				var c = face.c;
				var d = face.d;

				var va = geometry.vertices[ a ];
				var vb = geometry.vertices[ b ];
				var vc = geometry.vertices[ c ];
				var vd = geometry.vertices[ d ];

				vertices.push( va.clone() );
				vertices.push( vb.clone() );
				vertices.push( vc.clone() );
				vertices.push( vd.clone() );

				face.a = n;
				face.b = n + 1;
				face.c = n + 2;
				face.d = n + 3;

			} else {

				var a = face.a;
				var b = face.b;
				var c = face.c;

				var va = geometry.vertices[ a ];
				var vb = geometry.vertices[ b ];
				var vc = geometry.vertices[ c ];

				vertices.push( va.clone() );
				vertices.push( vb.clone() );
				vertices.push( vc.clone() );

				face.a = n;
				face.b = n + 1;
				face.c = n + 2;

			}

		}

		geometry.vertices = vertices;
		delete geometry.__tmpVertices;

	},

	// Break faces with edges longer than maxEdgeLength
	// - not recursive

	tessellate: function ( geometry, maxEdgeLength ) {

		var i, il, face,
		a, b, c, d,
		va, vb, vc, vd,
		dab, dbc, dac, dcd, dad,
		m, m1, m2,
		vm, vm1, vm2,
		vnm, vnm1, vnm2,
		vcm, vcm1, vcm2,
		triA, triB,
		quadA, quadB,
		edge;

		var faces = [];
		var faceVertexUvs = [];

		for ( i = 0, il = geometry.faceVertexUvs.length; i < il; i ++ ) {

			faceVertexUvs[ i ] = [];

		}

		for ( i = 0, il = geometry.faces.length; i < il; i ++ ) {

			face = geometry.faces[ i ];

			if ( face instanceof THREE.Face3 ) {

				a = face.a;
				b = face.b;
				c = face.c;

				va = geometry.vertices[ a ];
				vb = geometry.vertices[ b ];
				vc = geometry.vertices[ c ];

				dab = va.distanceTo( vb );
				dbc = vb.distanceTo( vc );
				dac = va.distanceTo( vc );

				if ( dab > maxEdgeLength || dbc > maxEdgeLength || dac > maxEdgeLength ) {

					m = geometry.vertices.length;

					triA = face.clone();
					triB = face.clone();

					if ( dab >= dbc && dab >= dac ) {

						vm = va.clone();
						vm.lerpSelf( vb, 0.5 );

						triA.a = a;
						triA.b = m;
						triA.c = c;

						triB.a = m;
						triB.b = b;
						triB.c = c;

						if ( face.vertexNormals.length === 3 ) {

							vnm = face.vertexNormals[ 0 ].clone();
							vnm.lerpSelf( face.vertexNormals[ 1 ], 0.5 );

							triA.vertexNormals[ 1 ].copy( vnm );
							triB.vertexNormals[ 0 ].copy( vnm );

						}

						if ( face.vertexColors.length === 3 ) {

							vcm = face.vertexColors[ 0 ].clone();
							vcm.lerpSelf( face.vertexColors[ 1 ], 0.5 );

							triA.vertexColors[ 1 ].copy( vcm );
							triB.vertexColors[ 0 ].copy( vcm );

						}

						edge = 0;

					} else if ( dbc >= dab && dbc >= dac ) {

						vm = vb.clone();
						vm.lerpSelf( vc, 0.5 );

						triA.a = a;
						triA.b = b;
						triA.c = m;

						triB.a = m;
						triB.b = c;
						triB.c = a;

						if ( face.vertexNormals.length === 3 ) {

							vnm = face.vertexNormals[ 1 ].clone();
							vnm.lerpSelf( face.vertexNormals[ 2 ], 0.5 );

							triA.vertexNormals[ 2 ].copy( vnm );

							triB.vertexNormals[ 0 ].copy( vnm );
							triB.vertexNormals[ 1 ].copy( face.vertexNormals[ 2 ] );
							triB.vertexNormals[ 2 ].copy( face.vertexNormals[ 0 ] );

						}

						if ( face.vertexColors.length === 3 ) {

							vcm = face.vertexColors[ 1 ].clone();
							vcm.lerpSelf( face.vertexColors[ 2 ], 0.5 );

							triA.vertexColors[ 2 ].copy( vcm );

							triB.vertexColors[ 0 ].copy( vcm );
							triB.vertexColors[ 1 ].copy( face.vertexColors[ 2 ] );
							triB.vertexColors[ 2 ].copy( face.vertexColors[ 0 ] );

						}

						edge = 1;

					} else {

						vm = va.clone();
						vm.lerpSelf( vc, 0.5 );

						triA.a = a;
						triA.b = b;
						triA.c = m;

						triB.a = m;
						triB.b = b;
						triB.c = c;

						if ( face.vertexNormals.length === 3 ) {

							vnm = face.vertexNormals[ 0 ].clone();
							vnm.lerpSelf( face.vertexNormals[ 2 ], 0.5 );

							triA.vertexNormals[ 2 ].copy( vnm );
							triB.vertexNormals[ 0 ].copy( vnm );

						}

						if ( face.vertexColors.length === 3 ) {

							vcm = face.vertexColors[ 0 ].clone();
							vcm.lerpSelf( face.vertexColors[ 2 ], 0.5 );

							triA.vertexColors[ 2 ].copy( vcm );
							triB.vertexColors[ 0 ].copy( vcm );

						}

						edge = 2;

					}

					faces.push( triA, triB );
					geometry.vertices.push( vm );

					var j, jl, uvs, uvA, uvB, uvC, uvM, uvsTriA, uvsTriB;

					for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {

						if ( geometry.faceVertexUvs[ j ].length ) {

							uvs = geometry.faceVertexUvs[ j ][ i ];

							uvA = uvs[ 0 ];
							uvB = uvs[ 1 ];
							uvC = uvs[ 2 ];

							// AB

							if ( edge === 0 ) {

								uvM = uvA.clone();
								uvM.lerpSelf( uvB, 0.5 );

								uvsTriA = [ uvA.clone(), uvM.clone(), uvC.clone() ];
								uvsTriB = [ uvM.clone(), uvB.clone(), uvC.clone() ];

							// BC

							} else if ( edge === 1 ) {

								uvM = uvB.clone();
								uvM.lerpSelf( uvC, 0.5 );

								uvsTriA = [ uvA.clone(), uvB.clone(), uvM.clone() ];
								uvsTriB = [ uvM.clone(), uvC.clone(), uvA.clone() ];

							// AC

							} else {

								uvM = uvA.clone();
								uvM.lerpSelf( uvC, 0.5 );

								uvsTriA = [ uvA.clone(), uvB.clone(), uvM.clone() ];
								uvsTriB = [ uvM.clone(), uvB.clone(), uvC.clone() ];

							}

							faceVertexUvs[ j ].push( uvsTriA, uvsTriB );

						}

					}

				} else {

					faces.push( face );

					for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {

						faceVertexUvs[ j ].push( geometry.faceVertexUvs[ j ][ i ] );

					}

				}

			} else {

				a = face.a;
				b = face.b;
				c = face.c;
				d = face.d;

				va = geometry.vertices[ a ];
				vb = geometry.vertices[ b ];
				vc = geometry.vertices[ c ];
				vd = geometry.vertices[ d ];

				dab = va.distanceTo( vb );
				dbc = vb.distanceTo( vc );
				dcd = vc.distanceTo( vd );
				dad = va.distanceTo( vd );

				if ( dab > maxEdgeLength || dbc > maxEdgeLength || dcd > maxEdgeLength || dad > maxEdgeLength ) {

					m1 = geometry.vertices.length;
					m2 = geometry.vertices.length + 1;

					quadA = face.clone();
					quadB = face.clone();

					if ( ( dab >= dbc && dab >= dcd && dab >= dad ) || ( dcd >= dbc && dcd >= dab && dcd >= dad ) ) {

						vm1 = va.clone();
						vm1.lerpSelf( vb, 0.5 );

						vm2 = vc.clone();
						vm2.lerpSelf( vd, 0.5 );

						quadA.a = a;
						quadA.b = m1;
						quadA.c = m2;
						quadA.d = d;

						quadB.a = m1;
						quadB.b = b;
						quadB.c = c;
						quadB.d = m2;

						if ( face.vertexNormals.length === 4 ) {

							vnm1 = face.vertexNormals[ 0 ].clone();
							vnm1.lerpSelf( face.vertexNormals[ 1 ], 0.5 );

							vnm2 = face.vertexNormals[ 2 ].clone();
							vnm2.lerpSelf( face.vertexNormals[ 3 ], 0.5 );

							quadA.vertexNormals[ 1 ].copy( vnm1 );
							quadA.vertexNormals[ 2 ].copy( vnm2 );

							quadB.vertexNormals[ 0 ].copy( vnm1 );
							quadB.vertexNormals[ 3 ].copy( vnm2 );

						}

						if ( face.vertexColors.length === 4 ) {

							vcm1 = face.vertexColors[ 0 ].clone();
							vcm1.lerpSelf( face.vertexColors[ 1 ], 0.5 );

							vcm2 = face.vertexColors[ 2 ].clone();
							vcm2.lerpSelf( face.vertexColors[ 3 ], 0.5 );

							quadA.vertexColors[ 1 ].copy( vcm1 );
							quadA.vertexColors[ 2 ].copy( vcm2 );

							quadB.vertexColors[ 0 ].copy( vcm1 );
							quadB.vertexColors[ 3 ].copy( vcm2 );

						}

						edge = 0;

					} else {

						vm1 = vb.clone();
						vm1.lerpSelf( vc, 0.5 );

						vm2 = vd.clone();
						vm2.lerpSelf( va, 0.5 );

						quadA.a = a;
						quadA.b = b;
						quadA.c = m1;
						quadA.d = m2;

						quadB.a = m2;
						quadB.b = m1;
						quadB.c = c;
						quadB.d = d;

						if ( face.vertexNormals.length === 4 ) {

							vnm1 = face.vertexNormals[ 1 ].clone();
							vnm1.lerpSelf( face.vertexNormals[ 2 ], 0.5 );

							vnm2 = face.vertexNormals[ 3 ].clone();
							vnm2.lerpSelf( face.vertexNormals[ 0 ], 0.5 );

							quadA.vertexNormals[ 2 ].copy( vnm1 );
							quadA.vertexNormals[ 3 ].copy( vnm2 );

							quadB.vertexNormals[ 0 ].copy( vnm2 );
							quadB.vertexNormals[ 1 ].copy( vnm1 );

						}

						if ( face.vertexColors.length === 4 ) {

							vcm1 = face.vertexColors[ 1 ].clone();
							vcm1.lerpSelf( face.vertexColors[ 2 ], 0.5 );

							vcm2 = face.vertexColors[ 3 ].clone();
							vcm2.lerpSelf( face.vertexColors[ 0 ], 0.5 );

							quadA.vertexColors[ 2 ].copy( vcm1 );
							quadA.vertexColors[ 3 ].copy( vcm2 );

							quadB.vertexColors[ 0 ].copy( vcm2 );
							quadB.vertexColors[ 1 ].copy( vcm1 );

						}

						edge = 1;

					}

					faces.push( quadA, quadB );
					geometry.vertices.push( vm1, vm2 );

					var j, jl, uvs, uvA, uvB, uvC, uvD, uvM1, uvM2, uvsQuadA, uvsQuadB;

					for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {

						if ( geometry.faceVertexUvs[ j ].length ) {

							uvs = geometry.faceVertexUvs[ j ][ i ];

							uvA = uvs[ 0 ];
							uvB = uvs[ 1 ];
							uvC = uvs[ 2 ];
							uvD = uvs[ 3 ];

							// AB + CD

							if ( edge === 0 ) {

								uvM1 = uvA.clone();
								uvM1.lerpSelf( uvB, 0.5 );

								uvM2 = uvC.clone();
								uvM2.lerpSelf( uvD, 0.5 );

								uvsQuadA = [ uvA.clone(), uvM1.clone(), uvM2.clone(), uvD.clone() ];
								uvsQuadB = [ uvM1.clone(), uvB.clone(), uvC.clone(), uvM2.clone() ];

							// BC + AD

							} else {

								uvM1 = uvB.clone();
								uvM1.lerpSelf( uvC, 0.5 );

								uvM2 = uvD.clone();
								uvM2.lerpSelf( uvA, 0.5 );

								uvsQuadA = [ uvA.clone(), uvB.clone(), uvM1.clone(), uvM2.clone() ];
								uvsQuadB = [ uvM2.clone(), uvM1.clone(), uvC.clone(), uvD.clone() ];

							}

							faceVertexUvs[ j ].push( uvsQuadA, uvsQuadB );

						}

					}

				} else {

					faces.push( face );

					for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {

						faceVertexUvs[ j ].push( geometry.faceVertexUvs[ j ][ i ] );

					}

				}

			}

		}

		geometry.faces = faces;
		geometry.faceVertexUvs = faceVertexUvs;

	}

};

THREE.GeometryUtils.random = THREE.Math.random16;

THREE.GeometryUtils.__v1 = new THREE.Vector3();
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ImageUtils = {

	crossOrigin: 'anonymous',

	loadTexture: function ( url, mapping, onLoad, onError ) {

		var image = new Image();
		var texture = new THREE.Texture( image, mapping );

		var loader = new THREE.ImageLoader();

		loader.addEventListener( 'load', function ( event ) {

			texture.image = event.content;
			texture.needsUpdate = true;

			if ( onLoad ) onLoad( texture );

		} );

		loader.addEventListener( 'error', function ( event ) {

			if ( onError ) onError( event.message );

		} );

		loader.crossOrigin = this.crossOrigin;
		loader.load( url, image );

		texture.sourceFile = url;

		return texture;

	},

	loadCompressedTexture: function ( url, mapping, onLoad, onError ) {

		var texture = new THREE.CompressedTexture();
		texture.mapping = mapping;

		var request = new XMLHttpRequest();

		request.onload = function () {

			var buffer = request.response;
			var dds = THREE.ImageUtils.parseDDS( buffer, true );

			texture.format = dds.format;

			texture.mipmaps = dds.mipmaps;
			texture.image.width = dds.width;
			texture.image.height = dds.height;

			// gl.generateMipmap fails for compressed textures
			// mipmaps must be embedded in the DDS file
			// or texture filters must not use mipmapping

			texture.generateMipmaps = false;

			texture.needsUpdate = true;

			if ( onLoad ) onLoad( texture );

		}

		request.onerror = onError;

		request.open( 'GET', url, true );
		request.responseType = "arraybuffer";
		request.send( null );

		return texture;

	},

	loadTextureCube: function ( array, mapping, onLoad, onError ) {

		var images = [];
		images.loadCount = 0;

		var texture = new THREE.Texture();
		texture.image = images;
		if ( mapping !== undefined ) texture.mapping = mapping;

		// no flipping needed for cube textures

		texture.flipY = false;

		for ( var i = 0, il = array.length; i < il; ++ i ) {

			var cubeImage = new Image();
			images[ i ] = cubeImage;

			cubeImage.onload = function () {

				images.loadCount += 1;

				if ( images.loadCount === 6 ) {

					texture.needsUpdate = true;
					if ( onLoad ) onLoad();

				}

			};

			cubeImage.onerror = onError;

			cubeImage.crossOrigin = this.crossOrigin;
			cubeImage.src = array[ i ];

		}

		return texture;

	},

	loadCompressedTextureCube: function ( array, mapping, onLoad, onError ) {

		var images = [];
		images.loadCount = 0;

		var texture = new THREE.CompressedTexture();
		texture.image = images;
		if ( mapping !== undefined ) texture.mapping = mapping;

		// no flipping for cube textures
		// (also flipping doesn't work for compressed textures )

		texture.flipY = false;

		// can't generate mipmaps for compressed textures
		// mips must be embedded in DDS files

		texture.generateMipmaps = false;

		var generateCubeFaceCallback = function ( rq, img ) {

			return function () {

				var buffer = rq.response;
				var dds = THREE.ImageUtils.parseDDS( buffer, true );

				img.format = dds.format;

				img.mipmaps = dds.mipmaps;
				img.width = dds.width;
				img.height = dds.height;

				images.loadCount += 1;

				if ( images.loadCount === 6 ) {

					texture.format = dds.format;
					texture.needsUpdate = true;
					if ( onLoad ) onLoad();

				}

			}

		}

		for ( var i = 0, il = array.length; i < il; ++ i ) {

			var cubeImage = {};
			images[ i ] = cubeImage;

			var request = new XMLHttpRequest();

			request.onload = generateCubeFaceCallback( request, cubeImage );
			request.onerror = onError;

			var url = array[ i ];

			request.open( 'GET', url, true );
			request.responseType = "arraybuffer";
			request.send( null );

		}

		return texture;

	},

	parseDDS: function ( buffer, loadMipmaps ) {

		var dds = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };

		// Adapted from @toji's DDS utils
		//	https://github.com/toji/webgl-texture-utils/blob/master/texture-util/dds.js

		// All values and structures referenced from:
		// http://msdn.microsoft.com/en-us/library/bb943991.aspx/

		var DDS_MAGIC = 0x20534444;

		var DDSD_CAPS = 0x1,
			DDSD_HEIGHT = 0x2,
			DDSD_WIDTH = 0x4,
			DDSD_PITCH = 0x8,
			DDSD_PIXELFORMAT = 0x1000,
			DDSD_MIPMAPCOUNT = 0x20000,
			DDSD_LINEARSIZE = 0x80000,
			DDSD_DEPTH = 0x800000;

		var DDSCAPS_COMPLEX = 0x8,
			DDSCAPS_MIPMAP = 0x400000,
			DDSCAPS_TEXTURE = 0x1000;

		var DDSCAPS2_CUBEMAP = 0x200,
			DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,
			DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,
			DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,
			DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,
			DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,
			DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,
			DDSCAPS2_VOLUME = 0x200000;

		var DDPF_ALPHAPIXELS = 0x1,
			DDPF_ALPHA = 0x2,
			DDPF_FOURCC = 0x4,
			DDPF_RGB = 0x40,
			DDPF_YUV = 0x200,
			DDPF_LUMINANCE = 0x20000;

		function fourCCToInt32( value ) {

			return value.charCodeAt(0) +
				(value.charCodeAt(1) << 8) +
				(value.charCodeAt(2) << 16) +
				(value.charCodeAt(3) << 24);

		}

		function int32ToFourCC( value ) {

			return String.fromCharCode(
				value & 0xff,
				(value >> 8) & 0xff,
				(value >> 16) & 0xff,
				(value >> 24) & 0xff
			);
		}

		var FOURCC_DXT1 = fourCCToInt32("DXT1");
		var FOURCC_DXT3 = fourCCToInt32("DXT3");
		var FOURCC_DXT5 = fourCCToInt32("DXT5");

		var headerLengthInt = 31; // The header length in 32 bit ints

		// Offsets into the header array

		var off_magic = 0;

		var off_size = 1;
		var off_flags = 2;
		var off_height = 3;
		var off_width = 4;

		var off_mipmapCount = 7;

		var off_pfFlags = 20;
		var off_pfFourCC = 21;

		// Parse header

		var header = new Int32Array( buffer, 0, headerLengthInt );

        if ( header[ off_magic ] !== DDS_MAGIC ) {

            console.error( "ImageUtils.parseDDS(): Invalid magic number in DDS header" );
            return dds;

        }

        if ( ! header[ off_pfFlags ] & DDPF_FOURCC ) {

            console.error( "ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code" );
            return dds;

        }

		var blockBytes;

		var fourCC = header[ off_pfFourCC ];

        switch ( fourCC ) {

			case FOURCC_DXT1:

				blockBytes = 8;
                dds.format = THREE.RGB_S3TC_DXT1_Format;
                break;

            case FOURCC_DXT3:

                blockBytes = 16;
                dds.format = THREE.RGBA_S3TC_DXT3_Format;
                break;

            case FOURCC_DXT5:

                blockBytes = 16;
                dds.format = THREE.RGBA_S3TC_DXT5_Format;
                break;

            default:

                console.error( "ImageUtils.parseDDS(): Unsupported FourCC code: ", int32ToFourCC( fourCC ) );
                return dds;

        }

		dds.mipmapCount = 1;

        if ( header[ off_flags ] & DDSD_MIPMAPCOUNT && loadMipmaps !== false ) {

            dds.mipmapCount = Math.max( 1, header[ off_mipmapCount ] );

        }

        dds.width = header[ off_width ];
        dds.height = header[ off_height ];

        var dataOffset = header[ off_size ] + 4;

		// Extract mipmaps buffers

		var width = dds.width;
		var height = dds.height;

		for ( var i = 0; i < dds.mipmapCount; i ++ ) {

			var dataLength = Math.max( 4, width ) / 4 * Math.max( 4, height ) / 4 * blockBytes;
			var byteArray = new Uint8Array( buffer, dataOffset, dataLength );

			var mipmap = { "data": byteArray, "width": width, "height": height };
			dds.mipmaps.push( mipmap );

			dataOffset += dataLength;

			width = Math.max( width * 0.5, 1 );
			height = Math.max( height * 0.5, 1 );

		}

		return dds;

	},

	getNormalMap: function ( image, depth ) {

		// Adapted from http://www.paulbrunt.co.uk/lab/heightnormal/

		var cross = function ( a, b ) {

			return [ a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ], a[ 2 ] * b[ 0 ] - a[ 0 ] * b[ 2 ], a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ] ];

		}

		var subtract = function ( a, b ) {

			return [ a[ 0 ] - b[ 0 ], a[ 1 ] - b[ 1 ], a[ 2 ] - b[ 2 ] ];

		}

		var normalize = function ( a ) {

			var l = Math.sqrt( a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ] );
			return [ a[ 0 ] / l, a[ 1 ] / l, a[ 2 ] / l ];

		}

		depth = depth | 1;

		var width = image.width;
		var height = image.height;

		var canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;

		var context = canvas.getContext( '2d' );
		context.drawImage( image, 0, 0 );

		var data = context.getImageData( 0, 0, width, height ).data;
		var imageData = context.createImageData( width, height );
		var output = imageData.data;

		for ( var x = 0; x < width; x ++ ) {

			for ( var y = 0; y < height; y ++ ) {

				var ly = y - 1 < 0 ? 0 : y - 1;
				var uy = y + 1 > height - 1 ? height - 1 : y + 1;
				var lx = x - 1 < 0 ? 0 : x - 1;
				var ux = x + 1 > width - 1 ? width - 1 : x + 1;

				var points = [];
				var origin = [ 0, 0, data[ ( y * width + x ) * 4 ] / 255 * depth ];
				points.push( [ - 1, 0, data[ ( y * width + lx ) * 4 ] / 255 * depth ] );
				points.push( [ - 1, - 1, data[ ( ly * width + lx ) * 4 ] / 255 * depth ] );
				points.push( [ 0, - 1, data[ ( ly * width + x ) * 4 ] / 255 * depth ] );
				points.push( [  1, - 1, data[ ( ly * width + ux ) * 4 ] / 255 * depth ] );
				points.push( [ 1, 0, data[ ( y * width + ux ) * 4 ] / 255 * depth ] );
				points.push( [ 1, 1, data[ ( uy * width + ux ) * 4 ] / 255 * depth ] );
				points.push( [ 0, 1, data[ ( uy * width + x ) * 4 ] / 255 * depth ] );
				points.push( [ - 1, 1, data[ ( uy * width + lx ) * 4 ] / 255 * depth ] );

				var normals = [];
				var num_points = points.length;

				for ( var i = 0; i < num_points; i ++ ) {

					var v1 = points[ i ];
					var v2 = points[ ( i + 1 ) % num_points ];
					v1 = subtract( v1, origin );
					v2 = subtract( v2, origin );
					normals.push( normalize( cross( v1, v2 ) ) );

				}

				var normal = [ 0, 0, 0 ];

				for ( var i = 0; i < normals.length; i ++ ) {

					normal[ 0 ] += normals[ i ][ 0 ];
					normal[ 1 ] += normals[ i ][ 1 ];
					normal[ 2 ] += normals[ i ][ 2 ];

				}

				normal[ 0 ] /= normals.length;
				normal[ 1 ] /= normals.length;
				normal[ 2 ] /= normals.length;

				var idx = ( y * width + x ) * 4;

				output[ idx ] = ( ( normal[ 0 ] + 1.0 ) / 2.0 * 255 ) | 0;
				output[ idx + 1 ] = ( ( normal[ 1 ] + 1.0 ) / 2.0 * 255 ) | 0;
				output[ idx + 2 ] = ( normal[ 2 ] * 255 ) | 0;
				output[ idx + 3 ] = 255;

			}

		}

		context.putImageData( imageData, 0, 0 );

		return canvas;

	},

	generateDataTexture: function ( width, height, color ) {

		var size = width * height;
		var data = new Uint8Array( 3 * size );

		var r = Math.floor( color.r * 255 );
		var g = Math.floor( color.g * 255 );
		var b = Math.floor( color.b * 255 );

		for ( var i = 0; i < size; i ++ ) {

			data[ i * 3 ] 	  = r;
			data[ i * 3 + 1 ] = g;
			data[ i * 3 + 2 ] = b;

		}

		var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat );
		texture.needsUpdate = true;

		return texture;

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SceneUtils = {

	createMultiMaterialObject: function ( geometry, materials ) {

		var group = new THREE.Object3D();

		for ( var i = 0, l = materials.length; i < l; i ++ ) {

			group.add( new THREE.Mesh( geometry, materials[ i ] ) );

		}

		return group;

	},

	detach : function ( child, parent, scene ) {

		child.applyMatrix( parent.matrixWorld );
		parent.remove( child );
		scene.add( child );

	},

	attach: function ( child, scene, parent ) {

		var matrixWorldInverse = new THREE.Matrix4();
		matrixWorldInverse.getInverse( parent.matrixWorld );
		child.applyMatrix( matrixWorldInverse );

		scene.remove( child );
		parent.add( child );

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 *
 * ShaderUtils currently contains:
 *
 *	fresnel
 *	normal
 * 	cube
 *
 */

THREE.ShaderUtils = {

	lib: {

		/* -------------------------------------------------------------------------
		//	Fresnel shader
		//	- based on Nvidia Cg tutorial
		 ------------------------------------------------------------------------- */

		'fresnel': {

			uniforms: {

				"mRefractionRatio": { type: "f", value: 1.02 },
				"mFresnelBias": { type: "f", value: 0.1 },
				"mFresnelPower": { type: "f", value: 2.0 },
				"mFresnelScale": { type: "f", value: 1.0 },
				"tCube": { type: "t", value: null }

			},

			fragmentShader: [

				"uniform samplerCube tCube;",

				"varying vec3 vReflect;",
				"varying vec3 vRefract[3];",
				"varying float vReflectionFactor;",

				"void main() {",

					"vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );",
					"vec4 refractedColor = vec4( 1.0 );",

					"refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;",
					"refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;",
					"refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;",

					"gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );",

				"}"

			].join("\n"),

			vertexShader: [

				"uniform float mRefractionRatio;",
				"uniform float mFresnelBias;",
				"uniform float mFresnelScale;",
				"uniform float mFresnelPower;",

				"varying vec3 vReflect;",
				"varying vec3 vRefract[3];",
				"varying float vReflectionFactor;",

				"void main() {",

					"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
					"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

					"vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

					"vec3 I = worldPosition.xyz - cameraPosition;",

					"vReflect = reflect( I, worldNormal );",
					"vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );",
					"vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );",
					"vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );",
					"vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );",

					"gl_Position = projectionMatrix * mvPosition;",

				"}"

			].join("\n")

		},

		/* -------------------------------------------------------------------------
		//	Normal map shader
		//		- Blinn-Phong
		//		- normal + diffuse + specular + AO + displacement + reflection + shadow maps
		//		- point and directional lights (use with "lights: true" material option)
		 ------------------------------------------------------------------------- */

		'normal' : {

			uniforms: THREE.UniformsUtils.merge( [

				THREE.UniformsLib[ "fog" ],
				THREE.UniformsLib[ "lights" ],
				THREE.UniformsLib[ "shadowmap" ],

				{

				"enableAO"		  : { type: "i", value: 0 },
				"enableDiffuse"	  : { type: "i", value: 0 },
				"enableSpecular"  : { type: "i", value: 0 },
				"enableReflection": { type: "i", value: 0 },
				"enableDisplacement": { type: "i", value: 0 },

				"tDisplacement": { type: "t", value: null }, // must go first as this is vertex texture
				"tDiffuse"	   : { type: "t", value: null },
				"tCube"		   : { type: "t", value: null },
				"tNormal"	   : { type: "t", value: null },
				"tSpecular"	   : { type: "t", value: null },
				"tAO"		   : { type: "t", value: null },

				"uNormalScale": { type: "v2", value: new THREE.Vector2( 1, 1 ) },

				"uDisplacementBias": { type: "f", value: 0.0 },
				"uDisplacementScale": { type: "f", value: 1.0 },

				"uDiffuseColor": { type: "c", value: new THREE.Color( 0xffffff ) },
				"uSpecularColor": { type: "c", value: new THREE.Color( 0x111111 ) },
				"uAmbientColor": { type: "c", value: new THREE.Color( 0xffffff ) },
				"uShininess": { type: "f", value: 30 },
				"uOpacity": { type: "f", value: 1 },

				"useRefract": { type: "i", value: 0 },
				"uRefractionRatio": { type: "f", value: 0.98 },
				"uReflectivity": { type: "f", value: 0.5 },

				"uOffset" : { type: "v2", value: new THREE.Vector2( 0, 0 ) },
				"uRepeat" : { type: "v2", value: new THREE.Vector2( 1, 1 ) },

				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }

				}

			] ),

			fragmentShader: [

				"uniform vec3 uAmbientColor;",
				"uniform vec3 uDiffuseColor;",
				"uniform vec3 uSpecularColor;",
				"uniform float uShininess;",
				"uniform float uOpacity;",

				"uniform bool enableDiffuse;",
				"uniform bool enableSpecular;",
				"uniform bool enableAO;",
				"uniform bool enableReflection;",

				"uniform sampler2D tDiffuse;",
				"uniform sampler2D tNormal;",
				"uniform sampler2D tSpecular;",
				"uniform sampler2D tAO;",

				"uniform samplerCube tCube;",

				"uniform vec2 uNormalScale;",

				"uniform bool useRefract;",
				"uniform float uRefractionRatio;",
				"uniform float uReflectivity;",

				"varying vec3 vTangent;",
				"varying vec3 vBinormal;",
				"varying vec3 vNormal;",
				"varying vec2 vUv;",

				"uniform vec3 ambientLightColor;",

				"#if MAX_DIR_LIGHTS > 0",

					"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
					"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

				"#endif",

				"#if MAX_HEMI_LIGHTS > 0",

					"uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];",
					"uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];",
					"uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];",

				"#endif",

				"#if MAX_POINT_LIGHTS > 0",

					"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",
					"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
					"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

				"#endif",

				"#if MAX_SPOT_LIGHTS > 0",

					"uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
					"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
					"uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
					"uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];",
					"uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",
					"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",

				"#endif",

				"#ifdef WRAP_AROUND",

					"uniform vec3 wrapRGB;",

				"#endif",

				"varying vec3 vWorldPosition;",
				"varying vec3 vViewPosition;",

				THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
				THREE.ShaderChunk[ "fog_pars_fragment" ],

				"void main() {",

					"gl_FragColor = vec4( vec3( 1.0 ), uOpacity );",

					"vec3 specularTex = vec3( 1.0 );",

					"vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;",
					"normalTex.xy *= uNormalScale;",
					"normalTex = normalize( normalTex );",

					"if( enableDiffuse ) {",

						"#ifdef GAMMA_INPUT",

							"vec4 texelColor = texture2D( tDiffuse, vUv );",
							"texelColor.xyz *= texelColor.xyz;",

							"gl_FragColor = gl_FragColor * texelColor;",

						"#else",

							"gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );",

						"#endif",

					"}",

					"if( enableAO ) {",

						"#ifdef GAMMA_INPUT",

							"vec4 aoColor = texture2D( tAO, vUv );",
							"aoColor.xyz *= aoColor.xyz;",

							"gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;",

						"#else",

							"gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;",

						"#endif",

					"}",

					"if( enableSpecular )",
						"specularTex = texture2D( tSpecular, vUv ).xyz;",

					"mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );",
					"vec3 finalNormal = tsb * normalTex;",

					"#ifdef FLIP_SIDED",

						"finalNormal = -finalNormal;",

					"#endif",

					"vec3 normal = normalize( finalNormal );",
					"vec3 viewPosition = normalize( vViewPosition );",

					// point lights

					"#if MAX_POINT_LIGHTS > 0",

						"vec3 pointDiffuse = vec3( 0.0 );",
						"vec3 pointSpecular = vec3( 0.0 );",

						"for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

							"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
							"vec3 pointVector = lPosition.xyz + vViewPosition.xyz;",

							"float pointDistance = 1.0;",
							"if ( pointLightDistance[ i ] > 0.0 )",
								"pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );",

							"pointVector = normalize( pointVector );",

							// diffuse

							"#ifdef WRAP_AROUND",

								"float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );",
								"float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );",

								"vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );",

							"#else",

								"float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );",

							"#endif",

							"pointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;",

							// specular

							"vec3 pointHalfVector = normalize( pointVector + viewPosition );",
							"float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );",
							"float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );",

							"#ifdef PHYSICALLY_BASED_SHADING",

								// 2.0 => 2.0001 is hack to work around ANGLE bug

								"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;",

								"vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );",
								"pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;",

							"#else",

								"pointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;",

							"#endif",

						"}",

					"#endif",

					// spot lights

					"#if MAX_SPOT_LIGHTS > 0",

						"vec3 spotDiffuse = vec3( 0.0 );",
						"vec3 spotSpecular = vec3( 0.0 );",

						"for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

							"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
							"vec3 spotVector = lPosition.xyz + vViewPosition.xyz;",

							"float spotDistance = 1.0;",
							"if ( spotLightDistance[ i ] > 0.0 )",
								"spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );",

							"spotVector = normalize( spotVector );",

							"float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );",

							"if ( spotEffect > spotLightAngleCos[ i ] ) {",

								"spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );",

								// diffuse

								"#ifdef WRAP_AROUND",

									"float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );",
									"float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );",

									"vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );",

								"#else",

									"float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );",

								"#endif",

								"spotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;",

								// specular

								"vec3 spotHalfVector = normalize( spotVector + viewPosition );",
								"float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );",
								"float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );",

								"#ifdef PHYSICALLY_BASED_SHADING",

									// 2.0 => 2.0001 is hack to work around ANGLE bug

									"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;",

									"vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );",
									"spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;",

								"#else",

									"spotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;",

								"#endif",

							"}",

						"}",

					"#endif",

					// directional lights

					"#if MAX_DIR_LIGHTS > 0",

						"vec3 dirDiffuse = vec3( 0.0 );",
						"vec3 dirSpecular = vec3( 0.0 );",

						"for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {",

							"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
							"vec3 dirVector = normalize( lDirection.xyz );",

							// diffuse

							"#ifdef WRAP_AROUND",

								"float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );",
								"float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );",

								"vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );",

							"#else",

								"float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );",

							"#endif",

							"dirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;",

							// specular

							"vec3 dirHalfVector = normalize( dirVector + viewPosition );",
							"float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );",
							"float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );",

							"#ifdef PHYSICALLY_BASED_SHADING",

								// 2.0 => 2.0001 is hack to work around ANGLE bug

								"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;",

								"vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );",
								"dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;",

							"#else",

								"dirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;",

							"#endif",

						"}",

					"#endif",

					// hemisphere lights

					"#if MAX_HEMI_LIGHTS > 0",

						"vec3 hemiDiffuse  = vec3( 0.0 );",
						"vec3 hemiSpecular = vec3( 0.0 );" ,

						"for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {",

							"vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );",
							"vec3 lVector = normalize( lDirection.xyz );",

							// diffuse

							"float dotProduct = dot( normal, lVector );",
							"float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",

							"vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );",

							"hemiDiffuse += uDiffuseColor * hemiColor;",

							// specular (sky light)


							"vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );",
							"float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;",
							"float hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );",

							// specular (ground light)

							"vec3 lVectorGround = -lVector;",

							"vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );",
							"float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;",
							"float hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );",

							"#ifdef PHYSICALLY_BASED_SHADING",

								"float dotProductGround = dot( normal, lVectorGround );",

								// 2.0 => 2.0001 is hack to work around ANGLE bug

								"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;",

								"vec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );",
								"vec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );",
								"hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );",

							"#else",

								"hemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;",

							"#endif",

						"}",

					"#endif",

					// all lights contribution summation

					"vec3 totalDiffuse = vec3( 0.0 );",
					"vec3 totalSpecular = vec3( 0.0 );",

					"#if MAX_DIR_LIGHTS > 0",

						"totalDiffuse += dirDiffuse;",
						"totalSpecular += dirSpecular;",

					"#endif",

					"#if MAX_HEMI_LIGHTS > 0",

						"totalDiffuse += hemiDiffuse;",
						"totalSpecular += hemiSpecular;",

					"#endif",

					"#if MAX_POINT_LIGHTS > 0",

						"totalDiffuse += pointDiffuse;",
						"totalSpecular += pointSpecular;",

					"#endif",

					"#if MAX_SPOT_LIGHTS > 0",

						"totalDiffuse += spotDiffuse;",
						"totalSpecular += spotSpecular;",

					"#endif",

					"#ifdef METAL",

						"gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );",

					"#else",

						"gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;",

					"#endif",

					"if ( enableReflection ) {",

						"vec3 vReflect;",
						"vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );",

						"if ( useRefract ) {",

							"vReflect = refract( cameraToVertex, normal, uRefractionRatio );",

						"} else {",

							"vReflect = reflect( cameraToVertex, normal );",

						"}",

						"vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );",

						"#ifdef GAMMA_INPUT",

							"cubeColor.xyz *= cubeColor.xyz;",

						"#endif",

						"gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );",

					"}",

					THREE.ShaderChunk[ "shadowmap_fragment" ],
					THREE.ShaderChunk[ "linear_to_gamma_fragment" ],
					THREE.ShaderChunk[ "fog_fragment" ],

				"}"

			].join("\n"),

			vertexShader: [

				"attribute vec4 tangent;",

				"uniform vec2 uOffset;",
				"uniform vec2 uRepeat;",

				"uniform bool enableDisplacement;",

				"#ifdef VERTEX_TEXTURES",

					"uniform sampler2D tDisplacement;",
					"uniform float uDisplacementScale;",
					"uniform float uDisplacementBias;",

				"#endif",

				"varying vec3 vTangent;",
				"varying vec3 vBinormal;",
				"varying vec3 vNormal;",
				"varying vec2 vUv;",

				"varying vec3 vWorldPosition;",
				"varying vec3 vViewPosition;",

				THREE.ShaderChunk[ "skinning_pars_vertex" ],
				THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

				"void main() {",

					THREE.ShaderChunk[ "skinbase_vertex" ],
					THREE.ShaderChunk[ "skinnormal_vertex" ],

					// normal, tangent and binormal vectors

					"#ifdef USE_SKINNING",

						"vNormal = normalize( normalMatrix * skinnedNormal.xyz );",

						"vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );",
						"vTangent = normalize( normalMatrix * skinnedTangent.xyz );",

					"#else",

						"vNormal = normalize( normalMatrix * normal );",
						"vTangent = normalize( normalMatrix * tangent.xyz );",

					"#endif",

					"vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );",

					"vUv = uv * uRepeat + uOffset;",

					// displacement mapping

					"vec3 displacedPosition;",

					"#ifdef VERTEX_TEXTURES",

						"if ( enableDisplacement ) {",

							"vec3 dv = texture2D( tDisplacement, uv ).xyz;",
							"float df = uDisplacementScale * dv.x + uDisplacementBias;",
							"displacedPosition = position + normalize( normal ) * df;",

						"} else {",

							"#ifdef USE_SKINNING",

								"vec4 skinVertex = vec4( position, 1.0 );",

								"vec4 skinned  = boneMatX * skinVertex * skinWeight.x;",
								"skinned 	  += boneMatY * skinVertex * skinWeight.y;",

								"displacedPosition  = skinned.xyz;",

							"#else",

								"displacedPosition = position;",

							"#endif",

						"}",

					"#else",

						"#ifdef USE_SKINNING",

							"vec4 skinVertex = vec4( position, 1.0 );",

							"vec4 skinned  = boneMatX * skinVertex * skinWeight.x;",
							"skinned 	  += boneMatY * skinVertex * skinWeight.y;",

							"displacedPosition  = skinned.xyz;",

						"#else",

							"displacedPosition = position;",

						"#endif",

					"#endif",

					//

					"vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );",
					"vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );",

					"gl_Position = projectionMatrix * mvPosition;",

					//

					"vWorldPosition = worldPosition.xyz;",
					"vViewPosition = -mvPosition.xyz;",

					// shadows

					"#ifdef USE_SHADOWMAP",

						"for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

							"vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;",

						"}",

					"#endif",

				"}"

			].join("\n")

		},

		/* -------------------------------------------------------------------------
		//	Cube map shader
		 ------------------------------------------------------------------------- */

		'cube': {

			uniforms: { "tCube": { type: "t", value: null },
						"tFlip": { type: "f", value: -1 } },

			vertexShader: [

				"varying vec3 vWorldPosition;",

				"void main() {",

					"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
					"vWorldPosition = worldPosition.xyz;",

					"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				"}"

			].join("\n"),

			fragmentShader: [

				"uniform samplerCube tCube;",
				"uniform float tFlip;",

				"varying vec3 vWorldPosition;",

				"void main() {",

					"gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",

				"}"

			].join("\n")

		}

	}

};
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * For Text operations in three.js (See TextGeometry)
 *
 * It uses techniques used in:
 *
 * 	typeface.js and canvastext
 * 		For converting fonts and rendering with javascript
 *		http://typeface.neocracy.org
 *
 *	Triangulation ported from AS3
 *		Simple Polygon Triangulation
 *		http://actionsnippet.com/?p=1462
 *
 * 	A Method to triangulate shapes with holes
 *		http://www.sakri.net/blog/2009/06/12/an-approach-to-triangulating-polygons-with-holes/
 *
 */

THREE.FontUtils = {

	faces : {},

	// Just for now. face[weight][style]

	face : "helvetiker",
	weight: "normal",
	style : "normal",
	size : 150,
	divisions : 10,

	getFace : function() {

		return this.faces[ this.face ][ this.weight ][ this.style ];

	},

	loadFace : function( data ) {

		var family = data.familyName.toLowerCase();

		var ThreeFont = this;

		ThreeFont.faces[ family ] = ThreeFont.faces[ family ] || {};

		ThreeFont.faces[ family ][ data.cssFontWeight ] = ThreeFont.faces[ family ][ data.cssFontWeight ] || {};
		ThreeFont.faces[ family ][ data.cssFontWeight ][ data.cssFontStyle ] = data;

		var face = ThreeFont.faces[ family ][ data.cssFontWeight ][ data.cssFontStyle ] = data;

		return data;

	},

	drawText : function( text ) {

		var characterPts = [], allPts = [];

		// RenderText

		var i, p,
			face = this.getFace(),
			scale = this.size / face.resolution,
			offset = 0,
			chars = String( text ).split( '' ),
			length = chars.length;

		var fontPaths = [];

		for ( i = 0; i < length; i ++ ) {

			var path = new THREE.Path();

			var ret = this.extractGlyphPoints( chars[ i ], face, scale, offset, path );
			offset += ret.offset;

			fontPaths.push( ret.path );

		}

		// get the width

		var width = offset / 2;
		//
		// for ( p = 0; p < allPts.length; p++ ) {
		//
		// 	allPts[ p ].x -= width;
		//
		// }

		//var extract = this.extractPoints( allPts, characterPts );
		//extract.contour = allPts;

		//extract.paths = fontPaths;
		//extract.offset = width;

		return { paths : fontPaths, offset : width };

	},




	extractGlyphPoints : function( c, face, scale, offset, path ) {

		var pts = [];

		var i, i2, divisions,
			outline, action, length,
			scaleX, scaleY,
			x, y, cpx, cpy, cpx0, cpy0, cpx1, cpy1, cpx2, cpy2,
			laste,
			glyph = face.glyphs[ c ] || face.glyphs[ '?' ];

		if ( !glyph ) return;

		if ( glyph.o ) {

			outline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );
			length = outline.length;

			scaleX = scale;
			scaleY = scale;

			for ( i = 0; i < length; ) {

				action = outline[ i ++ ];

				//console.log( action );

				switch( action ) {

				case 'm':

					// Move To

					x = outline[ i++ ] * scaleX + offset;
					y = outline[ i++ ] * scaleY;

					path.moveTo( x, y );
					break;

				case 'l':

					// Line To

					x = outline[ i++ ] * scaleX + offset;
					y = outline[ i++ ] * scaleY;
					path.lineTo(x,y);
					break;

				case 'q':

					// QuadraticCurveTo

					cpx  = outline[ i++ ] * scaleX + offset;
					cpy  = outline[ i++ ] * scaleY;
					cpx1 = outline[ i++ ] * scaleX + offset;
					cpy1 = outline[ i++ ] * scaleY;

					path.quadraticCurveTo(cpx1, cpy1, cpx, cpy);

					laste = pts[ pts.length - 1 ];

					if ( laste ) {

						cpx0 = laste.x;
						cpy0 = laste.y;

						for ( i2 = 1, divisions = this.divisions; i2 <= divisions; i2 ++ ) {

							var t = i2 / divisions;
							var tx = THREE.Shape.Utils.b2( t, cpx0, cpx1, cpx );
							var ty = THREE.Shape.Utils.b2( t, cpy0, cpy1, cpy );
					  }

				  }

				  break;

				case 'b':

					// Cubic Bezier Curve

					cpx  = outline[ i++ ] *  scaleX + offset;
					cpy  = outline[ i++ ] *  scaleY;
					cpx1 = outline[ i++ ] *  scaleX + offset;
					cpy1 = outline[ i++ ] * -scaleY;
					cpx2 = outline[ i++ ] *  scaleX + offset;
					cpy2 = outline[ i++ ] * -scaleY;

					path.bezierCurveTo( cpx, cpy, cpx1, cpy1, cpx2, cpy2 );

					laste = pts[ pts.length - 1 ];

					if ( laste ) {

						cpx0 = laste.x;
						cpy0 = laste.y;

						for ( i2 = 1, divisions = this.divisions; i2 <= divisions; i2 ++ ) {

							var t = i2 / divisions;
							var tx = THREE.Shape.Utils.b3( t, cpx0, cpx1, cpx2, cpx );
							var ty = THREE.Shape.Utils.b3( t, cpy0, cpy1, cpy2, cpy );

						}

					}

					break;

				}

			}
		}



		return { offset: glyph.ha*scale, path:path};
	}

};


THREE.FontUtils.generateShapes = function( text, parameters ) {

	// Parameters

	parameters = parameters || {};

	var size = parameters.size !== undefined ? parameters.size : 100;
	var curveSegments = parameters.curveSegments !== undefined ? parameters.curveSegments: 4;

	var font = parameters.font !== undefined ? parameters.font : "helvetiker";
	var weight = parameters.weight !== undefined ? parameters.weight : "normal";
	var style = parameters.style !== undefined ? parameters.style : "normal";

	THREE.FontUtils.size = size;
	THREE.FontUtils.divisions = curveSegments;

	THREE.FontUtils.face = font;
	THREE.FontUtils.weight = weight;
	THREE.FontUtils.style = style;

	// Get a Font data json object

	var data = THREE.FontUtils.drawText( text );

	var paths = data.paths;
	var shapes = [];

	for ( var p = 0, pl = paths.length; p < pl; p ++ ) {

		Array.prototype.push.apply( shapes, paths[ p ].toShapes() );

	}

	return shapes;

};


/**
 * This code is a quick port of code written in C++ which was submitted to
 * flipcode.com by John W. Ratcliff  // July 22, 2000
 * See original code and more information here:
 * http://www.flipcode.com/archives/Efficient_Polygon_Triangulation.shtml
 *
 * ported to actionscript by Zevan Rosser
 * www.actionsnippet.com
 *
 * ported to javascript by Joshua Koo
 * http://www.lab4games.net/zz85/blog
 *
 */


( function( namespace ) {

	var EPSILON = 0.0000000001;

	// takes in an contour array and returns

	var process = function( contour, indices ) {

		var n = contour.length;

		if ( n < 3 ) return null;

		var result = [],
			verts = [],
			vertIndices = [];

		/* we want a counter-clockwise polygon in verts */

		var u, v, w;

		if ( area( contour ) > 0.0 ) {

			for ( v = 0; v < n; v++ ) verts[ v ] = v;

		} else {

			for ( v = 0; v < n; v++ ) verts[ v ] = ( n - 1 ) - v;

		}

		var nv = n;

		/*  remove nv - 2 vertices, creating 1 triangle every time */

		var count = 2 * nv;   /* error detection */

		for( v = nv - 1; nv > 2; ) {

			/* if we loop, it is probably a non-simple polygon */

			if ( ( count-- ) <= 0 ) {

				//** Triangulate: ERROR - probable bad polygon!

				//throw ( "Warning, unable to triangulate polygon!" );
				//return null;
				// Sometimes warning is fine, especially polygons are triangulated in reverse.
				console.log( "Warning, unable to triangulate polygon!" );

				if ( indices ) return vertIndices;
				return result;

			}

			/* three consecutive vertices in current polygon, <u,v,w> */

			u = v; 	 	if ( nv <= u ) u = 0;     /* previous */
			v = u + 1;  if ( nv <= v ) v = 0;     /* new v    */
			w = v + 1;  if ( nv <= w ) w = 0;     /* next     */

			if ( snip( contour, u, v, w, nv, verts ) ) {

				var a, b, c, s, t;

				/* true names of the vertices */

				a = verts[ u ];
				b = verts[ v ];
				c = verts[ w ];

				/* output Triangle */

				/*
				result.push( contour[ a ] );
				result.push( contour[ b ] );
				result.push( contour[ c ] );
				*/
				result.push( [ contour[ a ],
					contour[ b ],
					contour[ c ] ] );


				vertIndices.push( [ verts[ u ], verts[ v ], verts[ w ] ] );

				/* remove v from the remaining polygon */

				for( s = v, t = v + 1; t < nv; s++, t++ ) {

					verts[ s ] = verts[ t ];

				}

				nv--;

				/* reset error detection counter */

				count = 2 * nv;

			}

		}

		if ( indices ) return vertIndices;
		return result;

	};

	// calculate area of the contour polygon

	var area = function ( contour ) {

		var n = contour.length;
		var a = 0.0;

		for( var p = n - 1, q = 0; q < n; p = q++ ) {

			a += contour[ p ].x * contour[ q ].y - contour[ q ].x * contour[ p ].y;

		}

		return a * 0.5;

	};

	// see if p is inside triangle abc

	var insideTriangle = function( ax, ay,
								   bx, by,
								   cx, cy,
								   px, py ) {

		  var aX, aY, bX, bY;
		  var cX, cY, apx, apy;
		  var bpx, bpy, cpx, cpy;
		  var cCROSSap, bCROSScp, aCROSSbp;

		  aX = cx - bx;  aY = cy - by;
		  bX = ax - cx;  bY = ay - cy;
		  cX = bx - ax;  cY = by - ay;
		  apx= px  -ax;  apy= py - ay;
		  bpx= px - bx;  bpy= py - by;
		  cpx= px - cx;  cpy= py - cy;

		  aCROSSbp = aX*bpy - aY*bpx;
		  cCROSSap = cX*apy - cY*apx;
		  bCROSScp = bX*cpy - bY*cpx;

		  return ( (aCROSSbp >= 0.0) && (bCROSScp >= 0.0) && (cCROSSap >= 0.0) );

	};


	var snip = function ( contour, u, v, w, n, verts ) {

		var p;
		var ax, ay, bx, by;
		var cx, cy, px, py;

		ax = contour[ verts[ u ] ].x;
		ay = contour[ verts[ u ] ].y;

		bx = contour[ verts[ v ] ].x;
		by = contour[ verts[ v ] ].y;

		cx = contour[ verts[ w ] ].x;
		cy = contour[ verts[ w ] ].y;

		if ( EPSILON > (((bx-ax)*(cy-ay)) - ((by-ay)*(cx-ax))) ) return false;

			for ( p = 0; p < n; p++ ) {

				if( (p == u) || (p == v) || (p == w) ) continue;

				px = contour[ verts[ p ] ].x
				py = contour[ verts[ p ] ].y

				if ( insideTriangle( ax, ay, bx, by, cx, cy, px, py ) ) return false;

		  }

		  return true;

	};


	namespace.Triangulate = process;
	namespace.Triangulate.area = area;

	return namespace;

})(THREE.FontUtils);

// To use the typeface.js face files, hook up the API
self._typeface_js = { faces: THREE.FontUtils.faces, loadFace: THREE.FontUtils.loadFace };/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Extensible curve object
 *
 * Some common of Curve methods
 * .getPoint(t), getTangent(t)
 * .getPointAt(u), getTagentAt(u)
 * .getPoints(), .getSpacedPoints()
 * .getLength()
 * .updateArcLengths()
 *
 * This file contains following classes:
 *
 * -- 2d classes --
 * THREE.Curve
 * THREE.LineCurve
 * THREE.QuadraticBezierCurve
 * THREE.CubicBezierCurve
 * THREE.SplineCurve
 * THREE.ArcCurve
 * THREE.EllipseCurve
 *
 * -- 3d classes --
 * THREE.LineCurve3
 * THREE.QuadraticBezierCurve3
 * THREE.CubicBezierCurve3
 * THREE.SplineCurve3
 * THREE.ClosedSplineCurve3
 *
 * A series of curves can be represented as a THREE.CurvePath
 *
 **/

/**************************************************************
 *	Abstract Curve base class
 **************************************************************/

THREE.Curve = function () {

};

// Virtual base class method to overwrite and implement in subclasses
//	- t [0 .. 1]

THREE.Curve.prototype.getPoint = function ( t ) {

	console.log( "Warning, getPoint() not implemented!" );
	return null;

};

// Get point at relative position in curve according to arc length
// - u [0 .. 1]

THREE.Curve.prototype.getPointAt = function ( u ) {

	var t = this.getUtoTmapping( u );
	return this.getPoint( t );

};

// Get sequence of points using getPoint( t )

THREE.Curve.prototype.getPoints = function ( divisions ) {

	if ( !divisions ) divisions = 5;

	var d, pts = [];

	for ( d = 0; d <= divisions; d ++ ) {

		pts.push( this.getPoint( d / divisions ) );

	}

	return pts;

};

// Get sequence of points using getPointAt( u )

THREE.Curve.prototype.getSpacedPoints = function ( divisions ) {

	if ( !divisions ) divisions = 5;

	var d, pts = [];

	for ( d = 0; d <= divisions; d ++ ) {

		pts.push( this.getPointAt( d / divisions ) );

	}

	return pts;

};

// Get total curve arc length

THREE.Curve.prototype.getLength = function () {

	var lengths = this.getLengths();
	return lengths[ lengths.length - 1 ];

};

// Get list of cumulative segment lengths

THREE.Curve.prototype.getLengths = function ( divisions ) {

	if ( !divisions ) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions): 200;

	if ( this.cacheArcLengths
		&& ( this.cacheArcLengths.length == divisions + 1 )
		&& !this.needsUpdate) {

		//console.log( "cached", this.cacheArcLengths );
		return this.cacheArcLengths;

	}

	this.needsUpdate = false;

	var cache = [];
	var current, last = this.getPoint( 0 );
	var p, sum = 0;

	cache.push( 0 );

	for ( p = 1; p <= divisions; p ++ ) {

		current = this.getPoint ( p / divisions );
		sum += current.distanceTo( last );
		cache.push( sum );
		last = current;

	}

	this.cacheArcLengths = cache;

	return cache; // { sums: cache, sum:sum }; Sum is in the last element.

};


THREE.Curve.prototype.updateArcLengths = function() {
	this.needsUpdate = true;
	this.getLengths();
};

// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equi distance

THREE.Curve.prototype.getUtoTmapping = function ( u, distance ) {

	var arcLengths = this.getLengths();

	var i = 0, il = arcLengths.length;

	var targetArcLength; // The targeted u distance value to get

	if ( distance ) {

		targetArcLength = distance;

	} else {

		targetArcLength = u * arcLengths[ il - 1 ];

	}

	//var time = Date.now();

	// binary search for the index with largest value smaller than target u distance

	var low = 0, high = il - 1, comparison;

	while ( low <= high ) {

		i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

		comparison = arcLengths[ i ] - targetArcLength;

		if ( comparison < 0 ) {

			low = i + 1;
			continue;

		} else if ( comparison > 0 ) {

			high = i - 1;
			continue;

		} else {

			high = i;
			break;

			// DONE

		}

	}

	i = high;

	//console.log('b' , i, low, high, Date.now()- time);

	if ( arcLengths[ i ] == targetArcLength ) {

		var t = i / ( il - 1 );
		return t;

	}

	// we could get finer grain at lengths, or use simple interpolatation between two points

	var lengthBefore = arcLengths[ i ];
    var lengthAfter = arcLengths[ i + 1 ];

    var segmentLength = lengthAfter - lengthBefore;

    // determine where we are between the 'before' and 'after' points

    var segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

    // add that fractional amount to t

    var t = ( i + segmentFraction ) / ( il -1 );

	return t;

};


// In 2D space, there are actually 2 normal vectors,
// and in 3D space, infinte
// TODO this should be depreciated.
THREE.Curve.prototype.getNormalVector = function( t ) {

	var vec = this.getTangent( t );

	return new THREE.Vector2( -vec.y , vec.x );

};

// Returns a unit vector tangent at t
// In case any sub curve does not implement its tangent / normal finding,
// we get 2 points with a small delta and find a gradient of the 2 points
// which seems to make a reasonable approximation

THREE.Curve.prototype.getTangent = function( t ) {

	var delta = 0.0001;
	var t1 = t - delta;
	var t2 = t + delta;

	// Capping in case of danger

	if ( t1 < 0 ) t1 = 0;
	if ( t2 > 1 ) t2 = 1;

	var pt1 = this.getPoint( t1 );
	var pt2 = this.getPoint( t2 );

	var vec = pt2.clone().subSelf(pt1);
	return vec.normalize();

};


THREE.Curve.prototype.getTangentAt = function ( u ) {

	var t = this.getUtoTmapping( u );
	return this.getTangent( t );

};

/**************************************************************
 *	Line
 **************************************************************/

THREE.LineCurve = function ( v1, v2 ) {

	this.v1 = v1;
	this.v2 = v2;

};

THREE.LineCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.LineCurve.prototype.getPoint = function ( t ) {

	var point = this.v2.clone().subSelf(this.v1);
	point.multiplyScalar( t ).addSelf( this.v1 );

	return point;

};

// Line curve is linear, so we can overwrite default getPointAt

THREE.LineCurve.prototype.getPointAt = function ( u ) {

	return this.getPoint( u );

};

THREE.LineCurve.prototype.getTangent = function( t ) {

	var tangent = this.v2.clone().subSelf(this.v1);

	return tangent.normalize();

};

/**************************************************************
 *	Quadratic Bezier curve
 **************************************************************/


THREE.QuadraticBezierCurve = function ( v0, v1, v2 ) {

	this.v0 = v0;
	this.v1 = v1;
	this.v2 = v2;

};

THREE.QuadraticBezierCurve.prototype = Object.create( THREE.Curve.prototype );


THREE.QuadraticBezierCurve.prototype.getPoint = function ( t ) {

	var tx, ty;

	tx = THREE.Shape.Utils.b2( t, this.v0.x, this.v1.x, this.v2.x );
	ty = THREE.Shape.Utils.b2( t, this.v0.y, this.v1.y, this.v2.y );

	return new THREE.Vector2( tx, ty );

};


THREE.QuadraticBezierCurve.prototype.getTangent = function( t ) {

	var tx, ty;

	tx = THREE.Curve.Utils.tangentQuadraticBezier( t, this.v0.x, this.v1.x, this.v2.x );
	ty = THREE.Curve.Utils.tangentQuadraticBezier( t, this.v0.y, this.v1.y, this.v2.y );

	// returns unit vector

	var tangent = new THREE.Vector2( tx, ty );
	tangent.normalize();

	return tangent;

};


/**************************************************************
 *	Cubic Bezier curve
 **************************************************************/

THREE.CubicBezierCurve = function ( v0, v1, v2, v3 ) {

	this.v0 = v0;
	this.v1 = v1;
	this.v2 = v2;
	this.v3 = v3;

};

THREE.CubicBezierCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.CubicBezierCurve.prototype.getPoint = function ( t ) {

	var tx, ty;

	tx = THREE.Shape.Utils.b3( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );
	ty = THREE.Shape.Utils.b3( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );

	return new THREE.Vector2( tx, ty );

};

THREE.CubicBezierCurve.prototype.getTangent = function( t ) {

	var tx, ty;

	tx = THREE.Curve.Utils.tangentCubicBezier( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );
	ty = THREE.Curve.Utils.tangentCubicBezier( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );

	var tangent = new THREE.Vector2( tx, ty );
	tangent.normalize();

	return tangent;

};


/**************************************************************
 *	Spline curve
 **************************************************************/

THREE.SplineCurve = function ( points /* array of Vector2 */ ) {

	this.points = (points == undefined) ? [] : points;

};

THREE.SplineCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.SplineCurve.prototype.getPoint = function ( t ) {

	var v = new THREE.Vector2();
	var c = [];
	var points = this.points, point, intPoint, weight;
	point = ( points.length - 1 ) * t;

	intPoint = Math.floor( point );
	weight = point - intPoint;

	c[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;
	c[ 1 ] = intPoint;
	c[ 2 ] = intPoint  > points.length - 2 ? points.length -1 : intPoint + 1;
	c[ 3 ] = intPoint  > points.length - 3 ? points.length -1 : intPoint + 2;

	v.x = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].x, points[ c[ 1 ] ].x, points[ c[ 2 ] ].x, points[ c[ 3 ] ].x, weight );
	v.y = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].y, points[ c[ 1 ] ].y, points[ c[ 2 ] ].y, points[ c[ 3 ] ].y, weight );

	return v;

};

/**************************************************************
 *	Ellipse curve
 **************************************************************/

THREE.EllipseCurve = function ( aX, aY, xRadius, yRadius,
							aStartAngle, aEndAngle,
							aClockwise ) {

	this.aX = aX;
	this.aY = aY;

	this.xRadius = xRadius;
	this.yRadius = yRadius;

	this.aStartAngle = aStartAngle;
	this.aEndAngle = aEndAngle;

	this.aClockwise = aClockwise;

};

THREE.EllipseCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.EllipseCurve.prototype.getPoint = function ( t ) {

	var deltaAngle = this.aEndAngle - this.aStartAngle;

	if ( !this.aClockwise ) {

		t = 1 - t;

	}

	var angle = this.aStartAngle + t * deltaAngle;

	var tx = this.aX + this.xRadius * Math.cos( angle );
	var ty = this.aY + this.yRadius * Math.sin( angle );

	return new THREE.Vector2( tx, ty );

};

/**************************************************************
 *	Arc curve
 **************************************************************/

THREE.ArcCurve = function ( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ) {

	THREE.EllipseCurve.call( this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise );
};

THREE.ArcCurve.prototype = Object.create( THREE.EllipseCurve.prototype );


/**************************************************************
 *	Utils
 **************************************************************/

THREE.Curve.Utils = {

	tangentQuadraticBezier: function ( t, p0, p1, p2 ) {

		return 2 * ( 1 - t ) * ( p1 - p0 ) + 2 * t * ( p2 - p1 );

	},

	// Puay Bing, thanks for helping with this derivative!

	tangentCubicBezier: function (t, p0, p1, p2, p3 ) {

		return -3 * p0 * (1 - t) * (1 - t)  +
			3 * p1 * (1 - t) * (1-t) - 6 *t *p1 * (1-t) +
			6 * t *  p2 * (1-t) - 3 * t * t * p2 +
			3 * t * t * p3;
	},


	tangentSpline: function ( t, p0, p1, p2, p3 ) {

		// To check if my formulas are correct

		var h00 = 6 * t * t - 6 * t; 	// derived from 2t^3 ? 3t^2 + 1
		var h10 = 3 * t * t - 4 * t + 1; // t^3 ? 2t^2 + t
		var h01 = -6 * t * t + 6 * t; 	// ? 2t3 + 3t2
		var h11 = 3 * t * t - 2 * t;	// t3 ? t2

		return h00 + h10 + h01 + h11;

	},

	// Catmull-Rom

	interpolate: function( p0, p1, p2, p3, t ) {

		var v0 = ( p2 - p0 ) * 0.5;
		var v1 = ( p3 - p1 ) * 0.5;
		var t2 = t * t;
		var t3 = t * t2;
		return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	}

};


// TODO: Transformation for Curves?

/**************************************************************
 *	3D Curves
 **************************************************************/

// A Factory method for creating new curve subclasses

THREE.Curve.create = function ( constructor, getPointFunc ) {

	constructor.prototype = Object.create( THREE.Curve.prototype );
	constructor.prototype.getPoint = getPointFunc;

	return constructor;

};


/**************************************************************
 *	Line3D
 **************************************************************/

THREE.LineCurve3 = THREE.Curve.create(

	function ( v1, v2 ) {

		this.v1 = v1;
		this.v2 = v2;

	},

	function ( t ) {

		var r = new THREE.Vector3();


		r.sub( this.v2, this.v1 ); // diff
		r.multiplyScalar( t );
		r.addSelf( this.v1 );

		return r;

	}

);


/**************************************************************
 *	Quadratic Bezier 3D curve
 **************************************************************/

THREE.QuadraticBezierCurve3 = THREE.Curve.create(

	function ( v0, v1, v2 ) {

		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;

	},

	function ( t ) {

		var tx, ty, tz;

		tx = THREE.Shape.Utils.b2( t, this.v0.x, this.v1.x, this.v2.x );
		ty = THREE.Shape.Utils.b2( t, this.v0.y, this.v1.y, this.v2.y );
		tz = THREE.Shape.Utils.b2( t, this.v0.z, this.v1.z, this.v2.z );

		return new THREE.Vector3( tx, ty, tz );

	}

);



/**************************************************************
 *	Cubic Bezier 3D curve
 **************************************************************/

THREE.CubicBezierCurve3 = THREE.Curve.create(

	function ( v0, v1, v2, v3 ) {

		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;

	},

	function ( t ) {

		var tx, ty, tz;

		tx = THREE.Shape.Utils.b3( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );
		ty = THREE.Shape.Utils.b3( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );
		tz = THREE.Shape.Utils.b3( t, this.v0.z, this.v1.z, this.v2.z, this.v3.z );

		return new THREE.Vector3( tx, ty, tz );

	}

);



/**************************************************************
 *	Spline 3D curve
 **************************************************************/


THREE.SplineCurve3 = THREE.Curve.create(

	function ( points /* array of Vector3 */) {

		this.points = (points == undefined) ? [] : points;

	},

	function ( t ) {

		var v = new THREE.Vector3();
		var c = [];
		var points = this.points, point, intPoint, weight;
		point = ( points.length - 1 ) * t;

		intPoint = Math.floor( point );
		weight = point - intPoint;

		c[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;
		c[ 1 ] = intPoint;
		c[ 2 ] = intPoint  > points.length - 2 ? points.length - 1 : intPoint + 1;
		c[ 3 ] = intPoint  > points.length - 3 ? points.length - 1 : intPoint + 2;

		var pt0 = points[ c[0] ],
			pt1 = points[ c[1] ],
			pt2 = points[ c[2] ],
			pt3 = points[ c[3] ];

		v.x = THREE.Curve.Utils.interpolate(pt0.x, pt1.x, pt2.x, pt3.x, weight);
		v.y = THREE.Curve.Utils.interpolate(pt0.y, pt1.y, pt2.y, pt3.y, weight);
		v.z = THREE.Curve.Utils.interpolate(pt0.z, pt1.z, pt2.z, pt3.z, weight);

		return v;

	}

);


// THREE.SplineCurve3.prototype.getTangent = function(t) {
// 		var v = new THREE.Vector3();
// 		var c = [];
// 		var points = this.points, point, intPoint, weight;
// 		point = ( points.length - 1 ) * t;

// 		intPoint = Math.floor( point );
// 		weight = point - intPoint;

// 		c[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;
// 		c[ 1 ] = intPoint;
// 		c[ 2 ] = intPoint  > points.length - 2 ? points.length - 1 : intPoint + 1;
// 		c[ 3 ] = intPoint  > points.length - 3 ? points.length - 1 : intPoint + 2;

// 		var pt0 = points[ c[0] ],
// 			pt1 = points[ c[1] ],
// 			pt2 = points[ c[2] ],
// 			pt3 = points[ c[3] ];

// 	// t = weight;
// 	v.x = THREE.Curve.Utils.tangentSpline( t, pt0.x, pt1.x, pt2.x, pt3.x );
// 	v.y = THREE.Curve.Utils.tangentSpline( t, pt0.y, pt1.y, pt2.y, pt3.y );
// 	v.z = THREE.Curve.Utils.tangentSpline( t, pt0.z, pt1.z, pt2.z, pt3.z );

// 	return v;

// }

/**************************************************************
 *	Closed Spline 3D curve
 **************************************************************/


THREE.ClosedSplineCurve3 = THREE.Curve.create(

	function ( points /* array of Vector3 */) {

		this.points = (points == undefined) ? [] : points;

	},

    function ( t ) {

        var v = new THREE.Vector3();
        var c = [];
        var points = this.points, point, intPoint, weight;
        point = ( points.length - 0 ) * t;
            // This needs to be from 0-length +1

        intPoint = Math.floor( point );
        weight = point - intPoint;

        intPoint += intPoint > 0 ? 0 : ( Math.floor( Math.abs( intPoint ) / points.length ) + 1 ) * points.length;
        c[ 0 ] = ( intPoint - 1 ) % points.length;
        c[ 1 ] = ( intPoint ) % points.length;
        c[ 2 ] = ( intPoint + 1 ) % points.length;
        c[ 3 ] = ( intPoint + 2 ) % points.length;

        v.x = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].x, points[ c[ 1 ] ].x, points[ c[ 2 ] ].x, points[ c[ 3 ] ].x, weight );
        v.y = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].y, points[ c[ 1 ] ].y, points[ c[ 2 ] ].y, points[ c[ 3 ] ].y, weight );
        v.z = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].z, points[ c[ 1 ] ].z, points[ c[ 2 ] ].z, points[ c[ 3 ] ].z, weight );

        return v;

    }

);
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 **/

/**************************************************************
 *	Curved Path - a curve path is simply a array of connected
 *  curves, but retains the api of a curve
 **************************************************************/

THREE.CurvePath = function () {

	this.curves = [];
	this.bends = [];

	this.autoClose = false; // Automatically closes the path
};

THREE.CurvePath.prototype = Object.create( THREE.Curve.prototype );

THREE.CurvePath.prototype.add = function ( curve ) {

	this.curves.push( curve );

};

THREE.CurvePath.prototype.checkConnection = function() {
	// TODO
	// If the ending of curve is not connected to the starting
	// or the next curve, then, this is not a real path
};

THREE.CurvePath.prototype.closePath = function() {
	// TODO Test
	// and verify for vector3 (needs to implement equals)
	// Add a line curve if start and end of lines are not connected
	var startPoint = this.curves[0].getPoint(0);
	var endPoint = this.curves[this.curves.length-1].getPoint(1);

	if (!startPoint.equals(endPoint)) {
		this.curves.push( new THREE.LineCurve(endPoint, startPoint) );
	}

};

// To get accurate point with reference to
// entire path distance at time t,
// following has to be done:

// 1. Length of each sub path have to be known
// 2. Locate and identify type of curve
// 3. Get t for the curve
// 4. Return curve.getPointAt(t')

THREE.CurvePath.prototype.getPoint = function( t ) {

	var d = t * this.getLength();
	var curveLengths = this.getCurveLengths();
	var i = 0, diff, curve;

	// To think about boundaries points.

	while ( i < curveLengths.length ) {

		if ( curveLengths[ i ] >= d ) {

			diff = curveLengths[ i ] - d;
			curve = this.curves[ i ];

			var u = 1 - diff / curve.getLength();

			return curve.getPointAt( u );

			break;
		}

		i ++;

	}

	return null;

	// loop where sum != 0, sum > d , sum+1 <d

};

/*
THREE.CurvePath.prototype.getTangent = function( t ) {
};*/


// We cannot use the default THREE.Curve getPoint() with getLength() because in
// THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
// getPoint() depends on getLength

THREE.CurvePath.prototype.getLength = function() {

	var lens = this.getCurveLengths();
	return lens[ lens.length - 1 ];

};

// Compute lengths and cache them
// We cannot overwrite getLengths() because UtoT mapping uses it.

THREE.CurvePath.prototype.getCurveLengths = function() {

	// We use cache values if curves and cache array are same length

	if ( this.cacheLengths && this.cacheLengths.length == this.curves.length ) {

		return this.cacheLengths;

	};

	// Get length of subsurve
	// Push sums into cached array

	var lengths = [], sums = 0;
	var i, il = this.curves.length;

	for ( i = 0; i < il; i ++ ) {

		sums += this.curves[ i ].getLength();
		lengths.push( sums );

	}

	this.cacheLengths = lengths;

	return lengths;

};



// Returns min and max coordinates, as well as centroid

THREE.CurvePath.prototype.getBoundingBox = function () {

	var points = this.getPoints();

	var maxX, maxY, maxZ;
	var minX, minY, minZ;

	maxX = maxY = Number.NEGATIVE_INFINITY;
	minX = minY = Number.POSITIVE_INFINITY;

	var p, i, il, sum;

	var v3 = points[0] instanceof THREE.Vector3;

	sum = v3 ? new THREE.Vector3() : new THREE.Vector2();

	for ( i = 0, il = points.length; i < il; i ++ ) {

		p = points[ i ];

		if ( p.x > maxX ) maxX = p.x;
		else if ( p.x < minX ) minX = p.x;

		if ( p.y > maxY ) maxY = p.y;
		else if ( p.y < minY ) minY = p.y;

		if (v3) {

			if ( p.z > maxZ ) maxZ = p.z;
			else if ( p.z < minZ ) minZ = p.z;

		}

		sum.addSelf( p );

	}

	var ret = {

		minX: minX,
		minY: minY,
		maxX: maxX,
		maxY: maxY,
		centroid: sum.divideScalar( il )

	};

	if (v3) {

		ret.maxZ = maxZ;
		ret.minZ = minZ;

	}

	return ret;

};

/**************************************************************
 *	Create Geometries Helpers
 **************************************************************/

/// Generate geometry from path points (for Line or ParticleSystem objects)

THREE.CurvePath.prototype.createPointsGeometry = function( divisions ) {

	var pts = this.getPoints( divisions, true );
	return this.createGeometry( pts );

};

// Generate geometry from equidistance sampling along the path

THREE.CurvePath.prototype.createSpacedPointsGeometry = function( divisions ) {

	var pts = this.getSpacedPoints( divisions, true );
	return this.createGeometry( pts );

};

THREE.CurvePath.prototype.createGeometry = function( points ) {

	var geometry = new THREE.Geometry();

	for ( var i = 0; i < points.length; i ++ ) {

		geometry.vertices.push( new THREE.Vector3( points[ i ].x, points[ i ].y, points[ i ].z || 0) );

	}

	return geometry;

};


/**************************************************************
 *	Bend / Wrap Helper Methods
 **************************************************************/

// Wrap path / Bend modifiers?

THREE.CurvePath.prototype.addWrapPath = function ( bendpath ) {

	this.bends.push( bendpath );

};

THREE.CurvePath.prototype.getTransformedPoints = function( segments, bends ) {

	var oldPts = this.getPoints( segments ); // getPoints getSpacedPoints
	var i, il;

	if ( !bends ) {

		bends = this.bends;

	}

	for ( i = 0, il = bends.length; i < il; i ++ ) {

		oldPts = this.getWrapPoints( oldPts, bends[ i ] );

	}

	return oldPts;

};

THREE.CurvePath.prototype.getTransformedSpacedPoints = function( segments, bends ) {

	var oldPts = this.getSpacedPoints( segments );

	var i, il;

	if ( !bends ) {

		bends = this.bends;

	}

	for ( i = 0, il = bends.length; i < il; i ++ ) {

		oldPts = this.getWrapPoints( oldPts, bends[ i ] );

	}

	return oldPts;

};

// This returns getPoints() bend/wrapped around the contour of a path.
// Read http://www.planetclegg.com/projects/WarpingTextToSplines.html

THREE.CurvePath.prototype.getWrapPoints = function ( oldPts, path ) {

	var bounds = this.getBoundingBox();

	var i, il, p, oldX, oldY, xNorm;

	for ( i = 0, il = oldPts.length; i < il; i ++ ) {

		p = oldPts[ i ];

		oldX = p.x;
		oldY = p.y;

		xNorm = oldX / bounds.maxX;

		// If using actual distance, for length > path, requires line extrusions
		//xNorm = path.getUtoTmapping(xNorm, oldX); // 3 styles. 1) wrap stretched. 2) wrap stretch by arc length 3) warp by actual distance

		xNorm = path.getUtoTmapping( xNorm, oldX );

		// check for out of bounds?

		var pathPt = path.getPoint( xNorm );
		var normal = path.getNormalVector( xNorm ).multiplyScalar( oldY );

		p.x = pathPt.x + normal.x;
		p.y = pathPt.y + normal.y;

	}

	return oldPts;

};

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Gyroscope = function () {

	THREE.Object3D.call( this );

};

THREE.Gyroscope.prototype = Object.create( THREE.Object3D.prototype );

THREE.Gyroscope.prototype.updateMatrixWorld = function ( force ) {

	this.matrixAutoUpdate && this.updateMatrix();

	// update matrixWorld

	if ( this.matrixWorldNeedsUpdate || force ) {

		if ( this.parent ) {

			this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );

			this.matrixWorld.decompose( this.translationWorld, this.rotationWorld, this.scaleWorld );
			this.matrix.decompose( this.translationObject, this.rotationObject, this.scaleObject );

			this.matrixWorld.compose( this.translationWorld, this.rotationObject, this.scaleWorld );


		} else {

			this.matrixWorld.copy( this.matrix );

		}


		this.matrixWorldNeedsUpdate = false;

		force = true;

	}

	// update children

	for ( var i = 0, l = this.children.length; i < l; i ++ ) {

		this.children[ i ].updateMatrixWorld( force );

	}

};

THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion();
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion();
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Creates free form 2d path using series of points, lines or curves.
 *
 **/

THREE.Path = function ( points ) {

	THREE.CurvePath.call(this);

	this.actions = [];

	if ( points ) {

		this.fromPoints( points );

	}

};

THREE.Path.prototype = Object.create( THREE.CurvePath.prototype );

THREE.PathActions = {

	MOVE_TO: 'moveTo',
	LINE_TO: 'lineTo',
	QUADRATIC_CURVE_TO: 'quadraticCurveTo', // Bezier quadratic curve
	BEZIER_CURVE_TO: 'bezierCurveTo', 		// Bezier cubic curve
	CSPLINE_THRU: 'splineThru',				// Catmull-rom spline
	ARC: 'arc',								// Circle
	ELLIPSE: 'ellipse'
};

// TODO Clean up PATH API

// Create path using straight lines to connect all points
// - vectors: array of Vector2

THREE.Path.prototype.fromPoints = function ( vectors ) {

	this.moveTo( vectors[ 0 ].x, vectors[ 0 ].y );

	for ( var v = 1, vlen = vectors.length; v < vlen; v ++ ) {

		this.lineTo( vectors[ v ].x, vectors[ v ].y );

	};

};

// startPath() endPath()?

THREE.Path.prototype.moveTo = function ( x, y ) {

	var args = Array.prototype.slice.call( arguments );
	this.actions.push( { action: THREE.PathActions.MOVE_TO, args: args } );

};

THREE.Path.prototype.lineTo = function ( x, y ) {

	var args = Array.prototype.slice.call( arguments );

	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var curve = new THREE.LineCurve( new THREE.Vector2( x0, y0 ), new THREE.Vector2( x, y ) );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.LINE_TO, args: args } );

};

THREE.Path.prototype.quadraticCurveTo = function( aCPx, aCPy, aX, aY ) {

	var args = Array.prototype.slice.call( arguments );

	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var curve = new THREE.QuadraticBezierCurve( new THREE.Vector2( x0, y0 ),
												new THREE.Vector2( aCPx, aCPy ),
												new THREE.Vector2( aX, aY ) );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.QUADRATIC_CURVE_TO, args: args } );

};

THREE.Path.prototype.bezierCurveTo = function( aCP1x, aCP1y,
                                               aCP2x, aCP2y,
                                               aX, aY ) {

	var args = Array.prototype.slice.call( arguments );

	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var curve = new THREE.CubicBezierCurve( new THREE.Vector2( x0, y0 ),
											new THREE.Vector2( aCP1x, aCP1y ),
											new THREE.Vector2( aCP2x, aCP2y ),
											new THREE.Vector2( aX, aY ) );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.BEZIER_CURVE_TO, args: args } );

};

THREE.Path.prototype.splineThru = function( pts /*Array of Vector*/ ) {

	var args = Array.prototype.slice.call( arguments );
	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];
//---
	var npts = [ new THREE.Vector2( x0, y0 ) ];
	Array.prototype.push.apply( npts, pts );

	var curve = new THREE.SplineCurve( npts );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.CSPLINE_THRU, args: args } );

};

// FUTURE: Change the API or follow canvas API?

THREE.Path.prototype.arc = function ( aX, aY, aRadius,
									  aStartAngle, aEndAngle, aClockwise ) {

	var lastargs = this.actions[ this.actions.length - 1].args;
	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	this.absarc(aX + x0, aY + y0, aRadius,
		aStartAngle, aEndAngle, aClockwise );

 };

 THREE.Path.prototype.absarc = function ( aX, aY, aRadius,
									  aStartAngle, aEndAngle, aClockwise ) {
	this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
 };

THREE.Path.prototype.ellipse = function ( aX, aY, xRadius, yRadius,
									  aStartAngle, aEndAngle, aClockwise ) {

	var lastargs = this.actions[ this.actions.length - 1].args;
	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	this.absellipse(aX + x0, aY + y0, xRadius, yRadius,
		aStartAngle, aEndAngle, aClockwise );

 };


THREE.Path.prototype.absellipse = function ( aX, aY, xRadius, yRadius,
									  aStartAngle, aEndAngle, aClockwise ) {

	var args = Array.prototype.slice.call( arguments );
	var curve = new THREE.EllipseCurve( aX, aY, xRadius, yRadius,
									aStartAngle, aEndAngle, aClockwise );
	this.curves.push( curve );

	var lastPoint = curve.getPoint(aClockwise ? 1 : 0);
	args.push(lastPoint.x);
	args.push(lastPoint.y);

	this.actions.push( { action: THREE.PathActions.ELLIPSE, args: args } );

 };

THREE.Path.prototype.getSpacedPoints = function ( divisions, closedPath ) {

	if ( ! divisions ) divisions = 40;

	var points = [];

	for ( var i = 0; i < divisions; i ++ ) {

		points.push( this.getPoint( i / divisions ) );

		//if( !this.getPoint( i / divisions ) ) throw "DIE";

	}

	// if ( closedPath ) {
	//
	// 	points.push( points[ 0 ] );
	//
	// }

	return points;

};

/* Return an array of vectors based on contour of the path */

THREE.Path.prototype.getPoints = function( divisions, closedPath ) {

	if (this.useSpacedPoints) {
		console.log('tata');
		return this.getSpacedPoints( divisions, closedPath );
	}

	divisions = divisions || 12;

	var points = [];

	var i, il, item, action, args;
	var cpx, cpy, cpx2, cpy2, cpx1, cpy1, cpx0, cpy0,
		laste, j,
		t, tx, ty;

	for ( i = 0, il = this.actions.length; i < il; i ++ ) {

		item = this.actions[ i ];

		action = item.action;
		args = item.args;

		switch( action ) {

		case THREE.PathActions.MOVE_TO:

			points.push( new THREE.Vector2( args[ 0 ], args[ 1 ] ) );

			break;

		case THREE.PathActions.LINE_TO:

			points.push( new THREE.Vector2( args[ 0 ], args[ 1 ] ) );

			break;

		case THREE.PathActions.QUADRATIC_CURVE_TO:

			cpx  = args[ 2 ];
			cpy  = args[ 3 ];

			cpx1 = args[ 0 ];
			cpy1 = args[ 1 ];

			if ( points.length > 0 ) {

				laste = points[ points.length - 1 ];

				cpx0 = laste.x;
				cpy0 = laste.y;

			} else {

				laste = this.actions[ i - 1 ].args;

				cpx0 = laste[ laste.length - 2 ];
				cpy0 = laste[ laste.length - 1 ];

			}

			for ( j = 1; j <= divisions; j ++ ) {

				t = j / divisions;

				tx = THREE.Shape.Utils.b2( t, cpx0, cpx1, cpx );
				ty = THREE.Shape.Utils.b2( t, cpy0, cpy1, cpy );

				points.push( new THREE.Vector2( tx, ty ) );

		  	}

			break;

		case THREE.PathActions.BEZIER_CURVE_TO:

			cpx  = args[ 4 ];
			cpy  = args[ 5 ];

			cpx1 = args[ 0 ];
			cpy1 = args[ 1 ];

			cpx2 = args[ 2 ];
			cpy2 = args[ 3 ];

			if ( points.length > 0 ) {

				laste = points[ points.length - 1 ];

				cpx0 = laste.x;
				cpy0 = laste.y;

			} else {

				laste = this.actions[ i - 1 ].args;

				cpx0 = laste[ laste.length - 2 ];
				cpy0 = laste[ laste.length - 1 ];

			}


			for ( j = 1; j <= divisions; j ++ ) {

				t = j / divisions;

				tx = THREE.Shape.Utils.b3( t, cpx0, cpx1, cpx2, cpx );
				ty = THREE.Shape.Utils.b3( t, cpy0, cpy1, cpy2, cpy );

				points.push( new THREE.Vector2( tx, ty ) );

			}

			break;

		case THREE.PathActions.CSPLINE_THRU:

			laste = this.actions[ i - 1 ].args;

			var last = new THREE.Vector2( laste[ laste.length - 2 ], laste[ laste.length - 1 ] );
			var spts = [ last ];

			var n = divisions * args[ 0 ].length;

			spts = spts.concat( args[ 0 ] );

			var spline = new THREE.SplineCurve( spts );

			for ( j = 1; j <= n; j ++ ) {

				points.push( spline.getPointAt( j / n ) ) ;

			}

			break;

		case THREE.PathActions.ARC:

			var aX = args[ 0 ], aY = args[ 1 ],
				aRadius = args[ 2 ],
				aStartAngle = args[ 3 ], aEndAngle = args[ 4 ],
				aClockwise = !!args[ 5 ];

			var deltaAngle = aEndAngle - aStartAngle;
			var angle;
			var tdivisions = divisions * 2;

			for ( j = 1; j <= tdivisions; j ++ ) {

				t = j / tdivisions;

				if ( ! aClockwise ) {

					t = 1 - t;

				}

				angle = aStartAngle + t * deltaAngle;

				tx = aX + aRadius * Math.cos( angle );
				ty = aY + aRadius * Math.sin( angle );

				//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);

				points.push( new THREE.Vector2( tx, ty ) );

			}

			//console.log(points);

		  break;

		case THREE.PathActions.ELLIPSE:

			var aX = args[ 0 ], aY = args[ 1 ],
				xRadius = args[ 2 ],
				yRadius = args[ 3 ],
				aStartAngle = args[ 4 ], aEndAngle = args[ 5 ],
				aClockwise = !!args[ 6 ];


			var deltaAngle = aEndAngle - aStartAngle;
			var angle;
			var tdivisions = divisions * 2;

			for ( j = 1; j <= tdivisions; j ++ ) {

				t = j / tdivisions;

				if ( ! aClockwise ) {

					t = 1 - t;

				}

				angle = aStartAngle + t * deltaAngle;

				tx = aX + xRadius * Math.cos( angle );
				ty = aY + yRadius * Math.sin( angle );

				//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);

				points.push( new THREE.Vector2( tx, ty ) );

			}

			//console.log(points);

		  break;

		} // end switch

	}



	// Normalize to remove the closing point by default.
	var lastPoint = points[ points.length - 1];
	var EPSILON = 0.0000000001;
	if ( Math.abs(lastPoint.x - points[ 0 ].x) < EPSILON &&
             Math.abs(lastPoint.y - points[ 0 ].y) < EPSILON)
		points.splice( points.length - 1, 1);
	if ( closedPath ) {

		points.push( points[ 0 ] );

	}

	return points;

};

// Breaks path into shapes

THREE.Path.prototype.toShapes = function() {

	var i, il, item, action, args;

	var subPaths = [], lastPath = new THREE.Path();

	for ( i = 0, il = this.actions.length; i < il; i ++ ) {

		item = this.actions[ i ];

		args = item.args;
		action = item.action;

		if ( action == THREE.PathActions.MOVE_TO ) {

			if ( lastPath.actions.length != 0 ) {

				subPaths.push( lastPath );
				lastPath = new THREE.Path();

			}

		}

		lastPath[ action ].apply( lastPath, args );

	}

	if ( lastPath.actions.length != 0 ) {

		subPaths.push( lastPath );

	}

	// console.log(subPaths);

	if ( subPaths.length == 0 ) return [];

	var tmpPath, tmpShape, shapes = [];

	var holesFirst = !THREE.Shape.Utils.isClockWise( subPaths[ 0 ].getPoints() );
	// console.log("Holes first", holesFirst);

	if ( subPaths.length == 1) {
		tmpPath = subPaths[0];
		tmpShape = new THREE.Shape();
		tmpShape.actions = tmpPath.actions;
		tmpShape.curves = tmpPath.curves;
		shapes.push( tmpShape );
		return shapes;
	};

	if ( holesFirst ) {

		tmpShape = new THREE.Shape();

		for ( i = 0, il = subPaths.length; i < il; i ++ ) {

			tmpPath = subPaths[ i ];

			if ( THREE.Shape.Utils.isClockWise( tmpPath.getPoints() ) ) {

				tmpShape.actions = tmpPath.actions;
				tmpShape.curves = tmpPath.curves;

				shapes.push( tmpShape );
				tmpShape = new THREE.Shape();

				//console.log('cw', i);

			} else {

				tmpShape.holes.push( tmpPath );

				//console.log('ccw', i);

			}

		}

	} else {

		// Shapes first

		for ( i = 0, il = subPaths.length; i < il; i ++ ) {

			tmpPath = subPaths[ i ];

			if ( THREE.Shape.Utils.isClockWise( tmpPath.getPoints() ) ) {


				if ( tmpShape ) shapes.push( tmpShape );

				tmpShape = new THREE.Shape();
				tmpShape.actions = tmpPath.actions;
				tmpShape.curves = tmpPath.curves;

			} else {

				tmpShape.holes.push( tmpPath );

			}

		}

		shapes.push( tmpShape );

	}

	//console.log("shape", shapes);

	return shapes;

};
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Defines a 2d shape plane using paths.
 **/

// STEP 1 Create a path.
// STEP 2 Turn path into shape.
// STEP 3 ExtrudeGeometry takes in Shape/Shapes
// STEP 3a - Extract points from each shape, turn to vertices
// STEP 3b - Triangulate each shape, add faces.

THREE.Shape = function ( ) {

	THREE.Path.apply( this, arguments );
	this.holes = [];

};

THREE.Shape.prototype = Object.create( THREE.Path.prototype );

// Convenience method to return ExtrudeGeometry

THREE.Shape.prototype.extrude = function ( options ) {

	var extruded = new THREE.ExtrudeGeometry( this, options );
	return extruded;

};

// Convenience method to return ShapeGeometry

THREE.Shape.prototype.makeGeometry = function ( options ) {

	var geometry = new THREE.ShapeGeometry( this, options );
	return geometry;

};

// Get points of holes

THREE.Shape.prototype.getPointsHoles = function ( divisions ) {

	var i, il = this.holes.length, holesPts = [];

	for ( i = 0; i < il; i ++ ) {

		holesPts[ i ] = this.holes[ i ].getTransformedPoints( divisions, this.bends );

	}

	return holesPts;

};

// Get points of holes (spaced by regular distance)

THREE.Shape.prototype.getSpacedPointsHoles = function ( divisions ) {

	var i, il = this.holes.length, holesPts = [];

	for ( i = 0; i < il; i ++ ) {

		holesPts[ i ] = this.holes[ i ].getTransformedSpacedPoints( divisions, this.bends );

	}

	return holesPts;

};


// Get points of shape and holes (keypoints based on segments parameter)

THREE.Shape.prototype.extractAllPoints = function ( divisions ) {

	return {

		shape: this.getTransformedPoints( divisions ),
		holes: this.getPointsHoles( divisions )

	};

};

THREE.Shape.prototype.extractPoints = function ( divisions ) {

	if (this.useSpacedPoints) {
		return this.extractAllSpacedPoints(divisions);
	}

	return this.extractAllPoints(divisions);

};

//
// THREE.Shape.prototype.extractAllPointsWithBend = function ( divisions, bend ) {
//
// 	return {
//
// 		shape: this.transform( bend, divisions ),
// 		holes: this.getPointsHoles( divisions, bend )
//
// 	};
//
// };

// Get points of shape and holes (spaced by regular distance)

THREE.Shape.prototype.extractAllSpacedPoints = function ( divisions ) {

	return {

		shape: this.getTransformedSpacedPoints( divisions ),
		holes: this.getSpacedPointsHoles( divisions )

	};

};

/**************************************************************
 *	Utils
 **************************************************************/

THREE.Shape.Utils = {

	/*
		contour - array of vector2 for contour
		holes   - array of array of vector2
	*/

	removeHoles: function ( contour, holes ) {

		var shape = contour.concat(); // work on this shape
		var allpoints = shape.concat();

		/* For each isolated shape, find the closest points and break to the hole to allow triangulation */


		var prevShapeVert, nextShapeVert,
			prevHoleVert, nextHoleVert,
			holeIndex, shapeIndex,
			shapeId, shapeGroup,
			h, h2,
			hole, shortest, d,
			p, pts1, pts2,
			tmpShape1, tmpShape2,
			tmpHole1, tmpHole2,
			verts = [];

		for ( h = 0; h < holes.length; h ++ ) {

			hole = holes[ h ];

			/*
			shapeholes[ h ].concat(); // preserves original
			holes.push( hole );
			*/

			Array.prototype.push.apply( allpoints, hole );

			shortest = Number.POSITIVE_INFINITY;


			// Find the shortest pair of pts between shape and hole

			// Note: Actually, I'm not sure now if we could optimize this to be faster than O(m*n)
			// Using distanceToSquared() intead of distanceTo() should speed a little
			// since running square roots operations are reduced.

			for ( h2 = 0; h2 < hole.length; h2 ++ ) {

				pts1 = hole[ h2 ];
				var dist = [];

				for ( p = 0; p < shape.length; p++ ) {

					pts2 = shape[ p ];
					d = pts1.distanceToSquared( pts2 );
					dist.push( d );

					if ( d < shortest ) {

						shortest = d;
						holeIndex = h2;
						shapeIndex = p;

					}

				}

			}

			//console.log("shortest", shortest, dist);

			prevShapeVert = ( shapeIndex - 1 ) >= 0 ? shapeIndex - 1 : shape.length - 1;
			prevHoleVert = ( holeIndex - 1 ) >= 0 ? holeIndex - 1 : hole.length - 1;

			var areaapts = [

				hole[ holeIndex ],
				shape[ shapeIndex ],
				shape[ prevShapeVert ]

			];

			var areaa = THREE.FontUtils.Triangulate.area( areaapts );

			var areabpts = [

				hole[ holeIndex ],
				hole[ prevHoleVert ],
				shape[ shapeIndex ]

			];

			var areab = THREE.FontUtils.Triangulate.area( areabpts );

			var shapeOffset = 1;
			var holeOffset = -1;

			var oldShapeIndex = shapeIndex, oldHoleIndex = holeIndex;
			shapeIndex += shapeOffset;
			holeIndex += holeOffset;

			if ( shapeIndex < 0 ) { shapeIndex += shape.length;  }
			shapeIndex %= shape.length;

			if ( holeIndex < 0 ) { holeIndex += hole.length;  }
			holeIndex %= hole.length;

			prevShapeVert = ( shapeIndex - 1 ) >= 0 ? shapeIndex - 1 : shape.length - 1;
			prevHoleVert = ( holeIndex - 1 ) >= 0 ? holeIndex - 1 : hole.length - 1;

			areaapts = [

				hole[ holeIndex ],
				shape[ shapeIndex ],
				shape[ prevShapeVert ]

			];

			var areaa2 = THREE.FontUtils.Triangulate.area( areaapts );

			areabpts = [

				hole[ holeIndex ],
				hole[ prevHoleVert ],
				shape[ shapeIndex ]

			];

			var areab2 = THREE.FontUtils.Triangulate.area( areabpts );
			//console.log(areaa,areab ,areaa2,areab2, ( areaa + areab ),  ( areaa2 + areab2 ));

			if ( ( areaa + areab ) > ( areaa2 + areab2 ) ) {

				// In case areas are not correct.
				//console.log("USE THIS");

				shapeIndex = oldShapeIndex;
				holeIndex = oldHoleIndex ;

				if ( shapeIndex < 0 ) { shapeIndex += shape.length;  }
				shapeIndex %= shape.length;

				if ( holeIndex < 0 ) { holeIndex += hole.length;  }
				holeIndex %= hole.length;

				prevShapeVert = ( shapeIndex - 1 ) >= 0 ? shapeIndex - 1 : shape.length - 1;
				prevHoleVert = ( holeIndex - 1 ) >= 0 ? holeIndex - 1 : hole.length - 1;

			} else {

				//console.log("USE THAT ")

			}

			tmpShape1 = shape.slice( 0, shapeIndex );
			tmpShape2 = shape.slice( shapeIndex );
			tmpHole1 = hole.slice( holeIndex );
			tmpHole2 = hole.slice( 0, holeIndex );

			// Should check orders here again?

			var trianglea = [

				hole[ holeIndex ],
				shape[ shapeIndex ],
				shape[ prevShapeVert ]

			];

			var triangleb = [

				hole[ holeIndex ] ,
				hole[ prevHoleVert ],
				shape[ shapeIndex ]

			];

			verts.push( trianglea );
			verts.push( triangleb );

			shape = tmpShape1.concat( tmpHole1 ).concat( tmpHole2 ).concat( tmpShape2 );

		}

		return {

			shape:shape, 		/* shape with no holes */
			isolatedPts: verts, /* isolated faces */
			allpoints: allpoints

		}


	},

	triangulateShape: function ( contour, holes ) {

		var shapeWithoutHoles = THREE.Shape.Utils.removeHoles( contour, holes );

		var shape = shapeWithoutHoles.shape,
			allpoints = shapeWithoutHoles.allpoints,
			isolatedPts = shapeWithoutHoles.isolatedPts;

		var triangles = THREE.FontUtils.Triangulate( shape, false ); // True returns indices for points of spooled shape

		// To maintain reference to old shape, one must match coordinates, or offset the indices from original arrays. It's probably easier to do the first.

		//console.log( "triangles",triangles, triangles.length );
		//console.log( "allpoints",allpoints, allpoints.length );

		var i, il, f, face,
			key, index,
			allPointsMap = {},
			isolatedPointsMap = {};

		// prepare all points map

		for ( i = 0, il = allpoints.length; i < il; i ++ ) {

			key = allpoints[ i ].x + ":" + allpoints[ i ].y;

			if ( allPointsMap[ key ] !== undefined ) {

				console.log( "Duplicate point", key );

			}

			allPointsMap[ key ] = i;

		}

		// check all face vertices against all points map

		for ( i = 0, il = triangles.length; i < il; i ++ ) {

			face = triangles[ i ];

			for ( f = 0; f < 3; f ++ ) {

				key = face[ f ].x + ":" + face[ f ].y;

				index = allPointsMap[ key ];

				if ( index !== undefined ) {

					face[ f ] = index;

				}

			}

		}

		// check isolated points vertices against all points map

		for ( i = 0, il = isolatedPts.length; i < il; i ++ ) {

			face = isolatedPts[ i ];

			for ( f = 0; f < 3; f ++ ) {

				key = face[ f ].x + ":" + face[ f ].y;

				index = allPointsMap[ key ];

				if ( index !== undefined ) {

					face[ f ] = index;

				}

			}

		}

		return triangles.concat( isolatedPts );

	}, // end triangulate shapes

	/*
	triangulate2 : function( pts, holes ) {

		// For use with Poly2Tri.js

		var allpts = pts.concat();
		var shape = [];
		for (var p in pts) {
			shape.push(new js.poly2tri.Point(pts[p].x, pts[p].y));
		}

		var swctx = new js.poly2tri.SweepContext(shape);

		for (var h in holes) {
			var aHole = holes[h];
			var newHole = []
			for (i in aHole) {
				newHole.push(new js.poly2tri.Point(aHole[i].x, aHole[i].y));
				allpts.push(aHole[i]);
			}
			swctx.AddHole(newHole);
		}

		var find;
		var findIndexForPt = function (pt) {
			find = new THREE.Vector2(pt.x, pt.y);
			var p;
			for (p=0, pl = allpts.length; p<pl; p++) {
				if (allpts[p].equals(find)) return p;
			}
			return -1;
		};

		// triangulate
		js.poly2tri.sweep.Triangulate(swctx);

		var triangles =  swctx.GetTriangles();
		var tr ;
		var facesPts = [];
		for (var t in triangles) {
			tr =  triangles[t];
			facesPts.push([
				findIndexForPt(tr.GetPoint(0)),
				findIndexForPt(tr.GetPoint(1)),
				findIndexForPt(tr.GetPoint(2))
					]);
		}


	//	console.log(facesPts);
	//	console.log("triangles", triangles.length, triangles);

		// Returns array of faces with 3 element each
	return facesPts;
	},
*/

	isClockWise: function ( pts ) {

		return THREE.FontUtils.Triangulate.area( pts ) < 0;

	},

	// Bezier Curves formulas obtained from
	// http://en.wikipedia.org/wiki/B%C3%A9zier_curve

	// Quad Bezier Functions

	b2p0: function ( t, p ) {

		var k = 1 - t;
		return k * k * p;

	},

	b2p1: function ( t, p ) {

		return 2 * ( 1 - t ) * t * p;

	},

	b2p2: function ( t, p ) {

		return t * t * p;

	},

	b2: function ( t, p0, p1, p2 ) {

		return this.b2p0( t, p0 ) + this.b2p1( t, p1 ) + this.b2p2( t, p2 );

	},

	// Cubic Bezier Functions

	b3p0: function ( t, p ) {

		var k = 1 - t;
		return k * k * k * p;

	},

	b3p1: function ( t, p ) {

		var k = 1 - t;
		return 3 * k * k * t * p;

	},

	b3p2: function ( t, p ) {

		var k = 1 - t;
		return 3 * k * t * t * p;

	},

	b3p3: function ( t, p ) {

		return t * t * t * p;

	},

	b3: function ( t, p0, p1, p2, p3 ) {

		return this.b3p0( t, p0 ) + this.b3p1( t, p1 ) + this.b3p2( t, p2 ) +  this.b3p3( t, p3 );

	}

};

/**
 * @author mikael emtinger / http://gomo.se/
 */

THREE.AnimationHandler = (function() {

	var playing = [];
	var library = {};
	var that    = {};


	//--- update ---

	that.update = function( deltaTimeMS ) {

		for( var i = 0; i < playing.length; i ++ )
			playing[ i ].update( deltaTimeMS );

	};


	//--- add ---

	that.addToUpdate = function( animation ) {

		if ( playing.indexOf( animation ) === -1 )
			playing.push( animation );

	};


	//--- remove ---

	that.removeFromUpdate = function( animation ) {

		var index = playing.indexOf( animation );

		if( index !== -1 )
			playing.splice( index, 1 );

	};


	//--- add ---

	that.add = function( data ) {

		if ( library[ data.name ] !== undefined )
			console.log( "THREE.AnimationHandler.add: Warning! " + data.name + " already exists in library. Overwriting." );

		library[ data.name ] = data;
		initData( data );

	};


	//--- get ---

	that.get = function( name ) {

		if ( typeof name === "string" ) {

			if ( library[ name ] ) {

				return library[ name ];

			} else {

				console.log( "THREE.AnimationHandler.get: Couldn't find animation " + name );
				return null;

			}

		} else {

			// todo: add simple tween library

		}

	};

	//--- parse ---

	that.parse = function( root ) {

		// setup hierarchy

		var hierarchy = [];

		if ( root instanceof THREE.SkinnedMesh ) {

			for( var b = 0; b < root.bones.length; b++ ) {

				hierarchy.push( root.bones[ b ] );

			}

		} else {

			parseRecurseHierarchy( root, hierarchy );

		}

		return hierarchy;

	};

	var parseRecurseHierarchy = function( root, hierarchy ) {

		hierarchy.push( root );

		for( var c = 0; c < root.children.length; c++ )
			parseRecurseHierarchy( root.children[ c ], hierarchy );

	}


	//--- init data ---

	var initData = function( data ) {

		if( data.initialized === true )
			return;


		// loop through all keys

		for( var h = 0; h < data.hierarchy.length; h ++ ) {

			for( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

				// remove minus times

				if( data.hierarchy[ h ].keys[ k ].time < 0 )
					data.hierarchy[ h ].keys[ k ].time = 0;


				// create quaternions

				if( data.hierarchy[ h ].keys[ k ].rot !== undefined &&
				 !( data.hierarchy[ h ].keys[ k ].rot instanceof THREE.Quaternion ) ) {

					var quat = data.hierarchy[ h ].keys[ k ].rot;
					data.hierarchy[ h ].keys[ k ].rot = new THREE.Quaternion( quat[0], quat[1], quat[2], quat[3] );

				}

			}


			// prepare morph target keys

			if( data.hierarchy[ h ].keys.length && data.hierarchy[ h ].keys[ 0 ].morphTargets !== undefined ) {

				// get all used

				var usedMorphTargets = {};

				for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

					for ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {

						var morphTargetName = data.hierarchy[ h ].keys[ k ].morphTargets[ m ];
						usedMorphTargets[ morphTargetName ] = -1;

					}

				}

				data.hierarchy[ h ].usedMorphTargets = usedMorphTargets;


				// set all used on all frames

				for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

					var influences = {};

					for ( var morphTargetName in usedMorphTargets ) {

						for ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {

							if ( data.hierarchy[ h ].keys[ k ].morphTargets[ m ] === morphTargetName ) {

								influences[ morphTargetName ] = data.hierarchy[ h ].keys[ k ].morphTargetsInfluences[ m ];
								break;

							}

						}

						if ( m === data.hierarchy[ h ].keys[ k ].morphTargets.length ) {

							influences[ morphTargetName ] = 0;

						}

					}

					data.hierarchy[ h ].keys[ k ].morphTargetsInfluences = influences;

				}

			}


			// remove all keys that are on the same time

			for ( var k = 1; k < data.hierarchy[ h ].keys.length; k ++ ) {

				if ( data.hierarchy[ h ].keys[ k ].time === data.hierarchy[ h ].keys[ k - 1 ].time ) {

					data.hierarchy[ h ].keys.splice( k, 1 );
					k --;

				}

			}


			// set index

			for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

				data.hierarchy[ h ].keys[ k ].index = k;

			}

		}


		// JIT

		var lengthInFrames = parseInt( data.length * data.fps, 10 );

		data.JIT = {};
		data.JIT.hierarchy = [];

		for( var h = 0; h < data.hierarchy.length; h ++ )
			data.JIT.hierarchy.push( new Array( lengthInFrames ) );


		// done

		data.initialized = true;

	};


	// interpolation types

	that.LINEAR = 0;
	that.CATMULLROM = 1;
	that.CATMULLROM_FORWARD = 2;

	return that;

}());
/**
 * @author mikael emtinger / http://gomo.se/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Animation = function ( root, name, interpolationType ) {

	this.root = root;
	this.data = THREE.AnimationHandler.get( name );
	this.hierarchy = THREE.AnimationHandler.parse( root );

	this.currentTime = 0;
	this.timeScale = 1;

	this.isPlaying = false;
	this.isPaused = true;
	this.loop = true;

	this.interpolationType = interpolationType !== undefined ? interpolationType : THREE.AnimationHandler.LINEAR;

	this.points = [];
	this.target = new THREE.Vector3();

};

THREE.Animation.prototype.play = function ( loop, startTimeMS ) {

	if ( this.isPlaying === false ) {

		this.isPlaying = true;
		this.loop = loop !== undefined ? loop : true;
		this.currentTime = startTimeMS !== undefined ? startTimeMS : 0;

		// reset key cache

		var h, hl = this.hierarchy.length,
			object;

		for ( h = 0; h < hl; h ++ ) {

			object = this.hierarchy[ h ];

			if ( this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD ) {

				object.useQuaternion = true;

			}

			object.matrixAutoUpdate = true;

			if ( object.animationCache === undefined ) {

				object.animationCache = {};
				object.animationCache.prevKey = { pos: 0, rot: 0, scl: 0 };
				object.animationCache.nextKey = { pos: 0, rot: 0, scl: 0 };
				object.animationCache.originalMatrix = object instanceof THREE.Bone ? object.skinMatrix : object.matrix;

			}

			var prevKey = object.animationCache.prevKey;
			var nextKey = object.animationCache.nextKey;

			prevKey.pos = this.data.hierarchy[ h ].keys[ 0 ];
			prevKey.rot = this.data.hierarchy[ h ].keys[ 0 ];
			prevKey.scl = this.data.hierarchy[ h ].keys[ 0 ];

			nextKey.pos = this.getNextKeyWith( "pos", h, 1 );
			nextKey.rot = this.getNextKeyWith( "rot", h, 1 );
			nextKey.scl = this.getNextKeyWith( "scl", h, 1 );

		}

		this.update( 0 );

	}

	this.isPaused = false;

	THREE.AnimationHandler.addToUpdate( this );

};


THREE.Animation.prototype.pause = function() {

	if ( this.isPaused === true ) {

		THREE.AnimationHandler.addToUpdate( this );

	} else {

		THREE.AnimationHandler.removeFromUpdate( this );

	}

	this.isPaused = !this.isPaused;

};


THREE.Animation.prototype.stop = function() {

	this.isPlaying = false;
	this.isPaused  = false;
	THREE.AnimationHandler.removeFromUpdate( this );

};


THREE.Animation.prototype.update = function ( deltaTimeMS ) {

	// early out

	if ( this.isPlaying === false ) return;


	// vars

	var types = [ "pos", "rot", "scl" ];
	var type;
	var scale;
	var vector;
	var prevXYZ, nextXYZ;
	var prevKey, nextKey;
	var object;
	var animationCache;
	var frame;
	var JIThierarchy = this.data.JIT.hierarchy;
	var currentTime, unloopedCurrentTime;
	var currentPoint, forwardPoint, angle;


	this.currentTime += deltaTimeMS * this.timeScale;

	unloopedCurrentTime = this.currentTime;
	currentTime = this.currentTime = this.currentTime % this.data.length;
	frame = parseInt( Math.min( currentTime * this.data.fps, this.data.length * this.data.fps ), 10 );


	for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

		object = this.hierarchy[ h ];
		animationCache = object.animationCache;

		// loop through pos/rot/scl

		for ( var t = 0; t < 3; t ++ ) {

			// get keys

			type    = types[ t ];
			prevKey = animationCache.prevKey[ type ];
			nextKey = animationCache.nextKey[ type ];

			// switch keys?

			if ( nextKey.time <= unloopedCurrentTime ) {

				// did we loop?

				if ( currentTime < unloopedCurrentTime ) {

					if ( this.loop ) {

						prevKey = this.data.hierarchy[ h ].keys[ 0 ];
						nextKey = this.getNextKeyWith( type, h, 1 );

						while( nextKey.time < currentTime ) {

							prevKey = nextKey;
							nextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );

						}

					} else {

						this.stop();
						return;

					}

				} else {

					do {

						prevKey = nextKey;
						nextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );

					} while( nextKey.time < currentTime )

				}

				animationCache.prevKey[ type ] = prevKey;
				animationCache.nextKey[ type ] = nextKey;

			}


			object.matrixAutoUpdate = true;
			object.matrixWorldNeedsUpdate = true;

			scale = ( currentTime - prevKey.time ) / ( nextKey.time - prevKey.time );
			prevXYZ = prevKey[ type ];
			nextXYZ = nextKey[ type ];


			// check scale error

			if ( scale < 0 || scale > 1 ) {

				console.log( "THREE.Animation.update: Warning! Scale out of bounds:" + scale + " on bone " + h );
				scale = scale < 0 ? 0 : 1;

			}

			// interpolate

			if ( type === "pos" ) {

				vector = object.position;

				if ( this.interpolationType === THREE.AnimationHandler.LINEAR ) {

					vector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;
					vector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;
					vector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;

				} else if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
						    this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

					this.points[ 0 ] = this.getPrevKeyWith( "pos", h, prevKey.index - 1 )[ "pos" ];
					this.points[ 1 ] = prevXYZ;
					this.points[ 2 ] = nextXYZ;
					this.points[ 3 ] = this.getNextKeyWith( "pos", h, nextKey.index + 1 )[ "pos" ];

					scale = scale * 0.33 + 0.33;

					currentPoint = this.interpolateCatmullRom( this.points, scale );

					vector.x = currentPoint[ 0 ];
					vector.y = currentPoint[ 1 ];
					vector.z = currentPoint[ 2 ];

					if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

						forwardPoint = this.interpolateCatmullRom( this.points, scale * 1.01 );

						this.target.set( forwardPoint[ 0 ], forwardPoint[ 1 ], forwardPoint[ 2 ] );
						this.target.subSelf( vector );
						this.target.y = 0;
						this.target.normalize();

						angle = Math.atan2( this.target.x, this.target.z );
						object.rotation.set( 0, angle, 0 );

					}

				}

			} else if ( type === "rot" ) {

				THREE.Quaternion.slerp( prevXYZ, nextXYZ, object.quaternion, scale );

			} else if ( type === "scl" ) {

				vector = object.scale;

				vector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;
				vector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;
				vector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;

			}

		}

	}

};

// Catmull-Rom spline

THREE.Animation.prototype.interpolateCatmullRom = function ( points, scale ) {

	var c = [], v3 = [],
	point, intPoint, weight, w2, w3,
	pa, pb, pc, pd;

	point = ( points.length - 1 ) * scale;
	intPoint = Math.floor( point );
	weight = point - intPoint;

	c[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;
	c[ 1 ] = intPoint;
	c[ 2 ] = intPoint > points.length - 2 ? intPoint : intPoint + 1;
	c[ 3 ] = intPoint > points.length - 3 ? intPoint : intPoint + 2;

	pa = points[ c[ 0 ] ];
	pb = points[ c[ 1 ] ];
	pc = points[ c[ 2 ] ];
	pd = points[ c[ 3 ] ];

	w2 = weight * weight;
	w3 = weight * w2;

	v3[ 0 ] = this.interpolate( pa[ 0 ], pb[ 0 ], pc[ 0 ], pd[ 0 ], weight, w2, w3 );
	v3[ 1 ] = this.interpolate( pa[ 1 ], pb[ 1 ], pc[ 1 ], pd[ 1 ], weight, w2, w3 );
	v3[ 2 ] = this.interpolate( pa[ 2 ], pb[ 2 ], pc[ 2 ], pd[ 2 ], weight, w2, w3 );

	return v3;

};

THREE.Animation.prototype.interpolate = function ( p0, p1, p2, p3, t, t2, t3 ) {

	var v0 = ( p2 - p0 ) * 0.5,
		v1 = ( p3 - p1 ) * 0.5;

	return ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;

};



// Get next key with

THREE.Animation.prototype.getNextKeyWith = function ( type, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;

	if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
		 this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

		key = key < keys.length - 1 ? key : keys.length - 1;

	} else {

		key = key % keys.length;

	}

	for ( ; key < keys.length; key++ ) {

		if ( keys[ key ][ type ] !== undefined ) {

			return keys[ key ];

		}

	}

	return this.data.hierarchy[ h ].keys[ 0 ];

};

// Get previous key with

THREE.Animation.prototype.getPrevKeyWith = function ( type, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;

	if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
		 this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

		key = key > 0 ? key : 0;

	} else {

		key = key >= 0 ? key : key + keys.length;

	}


	for ( ; key >= 0; key -- ) {

		if ( keys[ key ][ type ] !== undefined ) {

			return keys[ key ];

		}

	}

	return this.data.hierarchy[ h ].keys[ keys.length - 1 ];

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author khang duong
 * @author erik kitson
 */

THREE.KeyFrameAnimation = function( root, data, JITCompile ) {

	this.root = root;
	this.data = THREE.AnimationHandler.get( data );
	this.hierarchy = THREE.AnimationHandler.parse( root );
	this.currentTime = 0;
	this.timeScale = 0.001;
	this.isPlaying = false;
	this.isPaused = true;
	this.loop = true;
	this.JITCompile = JITCompile !== undefined ? JITCompile : true;

	// initialize to first keyframes

	for ( var h = 0, hl = this.hierarchy.length; h < hl; h++ ) {

		var keys = this.data.hierarchy[h].keys,
			sids = this.data.hierarchy[h].sids,
			obj = this.hierarchy[h];

		if ( keys.length && sids ) {

			for ( var s = 0; s < sids.length; s++ ) {

				var sid = sids[ s ],
					next = this.getNextKeyWith( sid, h, 0 );

				if ( next ) {

					next.apply( sid );

				}

			}

			obj.matrixAutoUpdate = false;
			this.data.hierarchy[h].node.updateMatrix();
			obj.matrixWorldNeedsUpdate = true;

		}

	}

};

// Play

THREE.KeyFrameAnimation.prototype.play = function( loop, startTimeMS ) {

	if( !this.isPlaying ) {

		this.isPlaying = true;
		this.loop = loop !== undefined ? loop : true;
		this.currentTime = startTimeMS !== undefined ? startTimeMS : 0;
		this.startTimeMs = startTimeMS;
		this.startTime = 10000000;
		this.endTime = -this.startTime;


		// reset key cache

		var h, hl = this.hierarchy.length,
			object,
			node;

		for ( h = 0; h < hl; h++ ) {

			object = this.hierarchy[ h ];
			node = this.data.hierarchy[ h ];
			object.useQuaternion = true;

			if ( node.animationCache === undefined ) {

				node.animationCache = {};
				node.animationCache.prevKey = null;
				node.animationCache.nextKey = null;
				node.animationCache.originalMatrix = object instanceof THREE.Bone ? object.skinMatrix : object.matrix;

			}

			var keys = this.data.hierarchy[h].keys;

			if (keys.length) {

				node.animationCache.prevKey = keys[ 0 ];
				node.animationCache.nextKey = keys[ 1 ];

				this.startTime = Math.min( keys[0].time, this.startTime );
				this.endTime = Math.max( keys[keys.length - 1].time, this.endTime );

			}

		}

		this.update( 0 );

	}

	this.isPaused = false;

	THREE.AnimationHandler.addToUpdate( this );

};



// Pause

THREE.KeyFrameAnimation.prototype.pause = function() {

	if( this.isPaused ) {

		THREE.AnimationHandler.addToUpdate( this );

	} else {

		THREE.AnimationHandler.removeFromUpdate( this );

	}

	this.isPaused = !this.isPaused;

};


// Stop

THREE.KeyFrameAnimation.prototype.stop = function() {

	this.isPlaying = false;
	this.isPaused  = false;
	THREE.AnimationHandler.removeFromUpdate( this );


	// reset JIT matrix and remove cache

	for ( var h = 0; h < this.data.hierarchy.length; h++ ) {

        var obj = this.hierarchy[ h ];
		var node = this.data.hierarchy[ h ];

		if ( node.animationCache !== undefined ) {

			var original = node.animationCache.originalMatrix;

			if( obj instanceof THREE.Bone ) {

				original.copy( obj.skinMatrix );
				obj.skinMatrix = original;

			} else {

				original.copy( obj.matrix );
				obj.matrix = original;

			}

			delete node.animationCache;

		}

	}

};


// Update

THREE.KeyFrameAnimation.prototype.update = function( deltaTimeMS ) {

	// early out

	if( !this.isPlaying ) return;


	// vars

	var prevKey, nextKey;
	var object;
	var node;
	var frame;
	var JIThierarchy = this.data.JIT.hierarchy;
	var currentTime, unloopedCurrentTime;
	var looped;


	// update

	this.currentTime += deltaTimeMS * this.timeScale;

	unloopedCurrentTime = this.currentTime;
	currentTime         = this.currentTime = this.currentTime % this.data.length;

	// if looped around, the current time should be based on the startTime
	if ( currentTime < this.startTimeMs ) {

		currentTime = this.currentTime = this.startTimeMs + currentTime;

	}

	frame               = parseInt( Math.min( currentTime * this.data.fps, this.data.length * this.data.fps ), 10 );
	looped 				= currentTime < unloopedCurrentTime;

	if ( looped && !this.loop ) {

		// Set the animation to the last keyframes and stop
		for ( var h = 0, hl = this.hierarchy.length; h < hl; h++ ) {

			var keys = this.data.hierarchy[h].keys,
				sids = this.data.hierarchy[h].sids,
				end = keys.length-1,
				obj = this.hierarchy[h];

			if ( keys.length ) {

				for ( var s = 0; s < sids.length; s++ ) {

					var sid = sids[ s ],
						prev = this.getPrevKeyWith( sid, h, end );

					if ( prev ) {
						prev.apply( sid );

					}

				}

				this.data.hierarchy[h].node.updateMatrix();
				obj.matrixWorldNeedsUpdate = true;

			}

		}

		this.stop();
		return;

	}

	// check pre-infinity
	if ( currentTime < this.startTime ) {

		return;

	}

	// update

	for ( var h = 0, hl = this.hierarchy.length; h < hl; h++ ) {

		object = this.hierarchy[ h ];
		node = this.data.hierarchy[ h ];

		var keys = node.keys,
			animationCache = node.animationCache;

		// use JIT?

		if ( this.JITCompile && JIThierarchy[ h ][ frame ] !== undefined ) {

			if( object instanceof THREE.Bone ) {

				object.skinMatrix = JIThierarchy[ h ][ frame ];
				object.matrixWorldNeedsUpdate = false;

			} else {

				object.matrix = JIThierarchy[ h ][ frame ];
				object.matrixWorldNeedsUpdate = true;

			}

		// use interpolation

		} else if ( keys.length ) {

			// make sure so original matrix and not JIT matrix is set

			if ( this.JITCompile && animationCache ) {

				if( object instanceof THREE.Bone ) {

					object.skinMatrix = animationCache.originalMatrix;

				} else {

					object.matrix = animationCache.originalMatrix;

				}

			}

			prevKey = animationCache.prevKey;
			nextKey = animationCache.nextKey;

			if ( prevKey && nextKey ) {

				// switch keys?

				if ( nextKey.time <= unloopedCurrentTime ) {

					// did we loop?

					if ( looped && this.loop ) {

						prevKey = keys[ 0 ];
						nextKey = keys[ 1 ];

						while ( nextKey.time < currentTime ) {

							prevKey = nextKey;
							nextKey = keys[ prevKey.index + 1 ];

						}

					} else if ( !looped ) {

						var lastIndex = keys.length - 1;

						while ( nextKey.time < currentTime && nextKey.index !== lastIndex ) {

							prevKey = nextKey;
							nextKey = keys[ prevKey.index + 1 ];

						}

					}

					animationCache.prevKey = prevKey;
					animationCache.nextKey = nextKey;

				}
                if(nextKey.time >= currentTime)
                    prevKey.interpolate( nextKey, currentTime );
                else
                    prevKey.interpolate( nextKey, nextKey.time);

			}

			this.data.hierarchy[h].node.updateMatrix();
			object.matrixWorldNeedsUpdate = true;

		}

	}

	// update JIT?

	if ( this.JITCompile ) {

		if ( JIThierarchy[ 0 ][ frame ] === undefined ) {

			this.hierarchy[ 0 ].updateMatrixWorld( true );

			for ( var h = 0; h < this.hierarchy.length; h++ ) {

				if( this.hierarchy[ h ] instanceof THREE.Bone ) {

					JIThierarchy[ h ][ frame ] = this.hierarchy[ h ].skinMatrix.clone();

				} else {

					JIThierarchy[ h ][ frame ] = this.hierarchy[ h ].matrix.clone();

				}

			}

		}

	}

};

// Get next key with

THREE.KeyFrameAnimation.prototype.getNextKeyWith = function( sid, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;
	key = key % keys.length;

	for ( ; key < keys.length; key++ ) {

		if ( keys[ key ].hasTarget( sid ) ) {

			return keys[ key ];

		}

	}

	return keys[ 0 ];

};

// Get previous key with

THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function( sid, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;
	key = key >= 0 ? key : key + keys.length;

	for ( ; key >= 0; key-- ) {

		if ( keys[ key ].hasTarget( sid ) ) {

			return keys[ key ];

		}

	}

	return keys[ keys.length - 1 ];

};
/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */

THREE.CubeCamera = function ( near, far, cubeResolution ) {

	THREE.Object3D.call( this );

	var fov = 90, aspect = 1;

	var cameraPX = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraPX.up.set( 0, -1, 0 );
	cameraPX.lookAt( new THREE.Vector3( 1, 0, 0 ) );
	this.add( cameraPX );

	var cameraNX = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraNX.up.set( 0, -1, 0 );
	cameraNX.lookAt( new THREE.Vector3( -1, 0, 0 ) );
	this.add( cameraNX );

	var cameraPY = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraPY.up.set( 0, 0, 1 );
	cameraPY.lookAt( new THREE.Vector3( 0, 1, 0 ) );
	this.add( cameraPY );

	var cameraNY = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraNY.up.set( 0, 0, -1 );
	cameraNY.lookAt( new THREE.Vector3( 0, -1, 0 ) );
	this.add( cameraNY );

	var cameraPZ = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraPZ.up.set( 0, -1, 0 );
	cameraPZ.lookAt( new THREE.Vector3( 0, 0, 1 ) );
	this.add( cameraPZ );

	var cameraNZ = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraNZ.up.set( 0, -1, 0 );
	cameraNZ.lookAt( new THREE.Vector3( 0, 0, -1 ) );
	this.add( cameraNZ );

	this.renderTarget = new THREE.WebGLRenderTargetCube( cubeResolution, cubeResolution, { format: THREE.RGBFormat, magFilter: THREE.LinearFilter, minFilter: THREE.LinearFilter } );

	this.updateCubeMap = function ( renderer, scene ) {

		var renderTarget = this.renderTarget;
		var generateMipmaps = renderTarget.generateMipmaps;

		renderTarget.generateMipmaps = false;

		renderTarget.activeCubeFace = 0;
		renderer.render( scene, cameraPX, renderTarget );

		renderTarget.activeCubeFace = 1;
		renderer.render( scene, cameraNX, renderTarget );

		renderTarget.activeCubeFace = 2;
		renderer.render( scene, cameraPY, renderTarget );

		renderTarget.activeCubeFace = 3;
		renderer.render( scene, cameraNY, renderTarget );

		renderTarget.activeCubeFace = 4;
		renderer.render( scene, cameraPZ, renderTarget );

		renderTarget.generateMipmaps = generateMipmaps;

		renderTarget.activeCubeFace = 5;
		renderer.render( scene, cameraNZ, renderTarget );

	};

};

THREE.CubeCamera.prototype = Object.create( THREE.Object3D.prototype );
/*
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *
 *	A general perpose camera, for setting FOV, Lens Focal Length,
 *		and switching between perspective and orthographic views easily.
 *		Use this only if you do not wish to manage
 *		both a Orthographic and Perspective Camera
 *
 */


THREE.CombinedCamera = function ( width, height, fov, near, far, orthoNear, orthoFar ) {

	THREE.Camera.call( this );

	this.fov = fov;

	this.left = -width / 2;
	this.right = width / 2
	this.top = height / 2;
	this.bottom = -height / 2;

	// We could also handle the projectionMatrix internally, but just wanted to test nested camera objects

	this.cameraO = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 	orthoNear, orthoFar );
	this.cameraP = new THREE.PerspectiveCamera( fov, width / height, near, far );

	this.zoom = 1;

	this.toPerspective();

	var aspect = width/height;

};

THREE.CombinedCamera.prototype = Object.create( THREE.Camera.prototype );

THREE.CombinedCamera.prototype.toPerspective = function () {

	// Switches to the Perspective Camera

	this.near = this.cameraP.near;
	this.far = this.cameraP.far;

	this.cameraP.fov =  this.fov / this.zoom ;

	this.cameraP.updateProjectionMatrix();

	this.projectionMatrix = this.cameraP.projectionMatrix;

	this.inPerspectiveMode = true;
	this.inOrthographicMode = false;

};

THREE.CombinedCamera.prototype.toOrthographic = function () {

	// Switches to the Orthographic camera estimating viewport from Perspective

	var fov = this.fov;
	var aspect = this.cameraP.aspect;
	var near = this.cameraP.near;
	var far = this.cameraP.far;

	// The size that we set is the mid plane of the viewing frustum

	var hyperfocus = ( near + far ) / 2;

	var halfHeight = Math.tan( fov / 2 ) * hyperfocus;
	var planeHeight = 2 * halfHeight;
	var planeWidth = planeHeight * aspect;
	var halfWidth = planeWidth / 2;

	halfHeight /= this.zoom;
	halfWidth /= this.zoom;

	this.cameraO.left = -halfWidth;
	this.cameraO.right = halfWidth;
	this.cameraO.top = halfHeight;
	this.cameraO.bottom = -halfHeight;

	// this.cameraO.left = -farHalfWidth;
	// this.cameraO.right = farHalfWidth;
	// this.cameraO.top = farHalfHeight;
	// this.cameraO.bottom = -farHalfHeight;

	// this.cameraO.left = this.left / this.zoom;
	// this.cameraO.right = this.right / this.zoom;
	// this.cameraO.top = this.top / this.zoom;
	// this.cameraO.bottom = this.bottom / this.zoom;

	this.cameraO.updateProjectionMatrix();

	this.near = this.cameraO.near;
	this.far = this.cameraO.far;
	this.projectionMatrix = this.cameraO.projectionMatrix;

	this.inPerspectiveMode = false;
	this.inOrthographicMode = true;

};


THREE.CombinedCamera.prototype.setSize = function( width, height ) {

	this.cameraP.aspect = width / height;
	this.left = -width / 2;
	this.right = width / 2
	this.top = height / 2;
	this.bottom = -height / 2;

};


THREE.CombinedCamera.prototype.setFov = function( fov ) {

	this.fov = fov;

	if ( this.inPerspectiveMode ) {

		this.toPerspective();

	} else {

		this.toOrthographic();

	}

};

// For mantaining similar API with PerspectiveCamera

THREE.CombinedCamera.prototype.updateProjectionMatrix = function() {

	if ( this.inPerspectiveMode ) {

		this.toPerspective();

	} else {

		this.toPerspective();
		this.toOrthographic();

	}

};

/*
* Uses Focal Length (in mm) to estimate and set FOV
* 35mm (fullframe) camera is used if frame size is not specified;
* Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
*/
THREE.CombinedCamera.prototype.setLens = function ( focalLength, frameHeight ) {

	if ( frameHeight === undefined ) frameHeight = 24;

	var fov = 2 * Math.atan( frameHeight / ( focalLength * 2 ) ) * ( 180 / Math.PI );

	this.setFov( fov );

	return fov;
};


THREE.CombinedCamera.prototype.setZoom = function( zoom ) {

	this.zoom = zoom;

	if ( this.inPerspectiveMode ) {

		this.toPerspective();

	} else {

		this.toOrthographic();

	}

};

THREE.CombinedCamera.prototype.toFrontView = function() {

	this.rotation.x = 0;
	this.rotation.y = 0;
	this.rotation.z = 0;

	// should we be modifing the matrix instead?

	this.rotationAutoUpdate = false;

};

THREE.CombinedCamera.prototype.toBackView = function() {

	this.rotation.x = 0;
	this.rotation.y = Math.PI;
	this.rotation.z = 0;
	this.rotationAutoUpdate = false;

};

THREE.CombinedCamera.prototype.toLeftView = function() {

	this.rotation.x = 0;
	this.rotation.y = - Math.PI / 2;
	this.rotation.z = 0;
	this.rotationAutoUpdate = false;

};

THREE.CombinedCamera.prototype.toRightView = function() {

	this.rotation.x = 0;
	this.rotation.y = Math.PI / 2;
	this.rotation.z = 0;
	this.rotationAutoUpdate = false;

};

THREE.CombinedCamera.prototype.toTopView = function() {

	this.rotation.x = - Math.PI / 2;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = false;

};

THREE.CombinedCamera.prototype.toBottomView = function() {

	this.rotation.x = Math.PI / 2;
	this.rotation.y = 0;
	this.rotation.z = 0;
	this.rotationAutoUpdate = false;

};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- 3d asterisk shape (for line pieces THREE.Line)
 */

THREE.AsteriskGeometry = function ( innerRadius, outerRadius ) {

	THREE.Geometry.call( this );

	var sd = innerRadius;
	var ed = outerRadius;

	var sd2 = 0.707 * sd;
	var ed2 = 0.707 * ed;

	var rays = [ [ sd, 0, 0 ], [ ed, 0, 0 ], [ -sd, 0, 0 ], [ -ed, 0, 0 ],
				 [ 0, sd, 0 ], [ 0, ed, 0 ], [ 0, -sd, 0 ], [ 0, -ed, 0 ],
				 [ 0, 0, sd ], [ 0, 0, ed ], [ 0, 0, -sd ], [ 0, 0, -ed ],
				 [ sd2, sd2, 0 ], [ ed2, ed2, 0 ], [ -sd2, -sd2, 0 ], [ -ed2, -ed2, 0 ],
				 [ sd2, -sd2, 0 ], [ ed2, -ed2, 0 ], [ -sd2, sd2, 0 ], [ -ed2, ed2, 0 ],
				 [ sd2, 0, sd2 ], [ ed2, 0, ed2 ], [ -sd2, 0, -sd2 ], [ -ed2, 0, -ed2 ],
				 [ sd2, 0, -sd2 ], [ ed2, 0, -ed2 ], [ -sd2, 0, sd2 ], [ -ed2, 0, ed2 ],
				 [ 0, sd2, sd2 ], [ 0, ed2, ed2 ], [ 0, -sd2, -sd2 ], [ 0, -ed2, -ed2 ],
				 [ 0, sd2, -sd2 ], [ 0, ed2, -ed2 ], [ 0, -sd2, sd2 ], [ 0, -ed2, ed2 ]
	];

	for ( var i = 0, il = rays.length; i < il; i ++ ) {

		var x = rays[ i ][ 0 ];
		var y = rays[ i ][ 1 ];
		var z = rays[ i ][ 2 ];

		this.vertices.push( new THREE.Vector3( x, y, z ) );

	}

};

THREE.AsteriskGeometry.prototype = Object.create( THREE.Geometry.prototype );/**
 * @author hughes
 */

THREE.CircleGeometry = function ( radius, segments, thetaStart, thetaLength ) {

    THREE.Geometry.call( this );

    radius = radius || 50;

    thetaStart = thetaStart !== undefined ? thetaStart : 0;
    thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;
    segments = segments !== undefined ? Math.max( 3, segments ) : 8;

    var i, uvs = [],
    center = new THREE.Vector3(), centerUV = new THREE.UV( 0.5, 0.5 );

    this.vertices.push(center);
    uvs.push( centerUV );

    for ( i = 0; i <= segments; i ++ ) {

        var vertex = new THREE.Vector3();

        vertex.x = radius * Math.cos( thetaStart + i / segments * thetaLength );
        vertex.y = radius * Math.sin( thetaStart + i / segments * thetaLength );

        this.vertices.push( vertex );
        uvs.push( new THREE.UV( ( vertex.x / radius + 1 ) / 2, - ( vertex.y / radius + 1 ) / 2 + 1 ) );

    }

    var n = new THREE.Vector3( 0, 0, -1 );

    for ( i = 1; i <= segments; i ++ ) {

        var v1 = i;
        var v2 = i + 1 ;
        var v3 = 0;

        this.faces.push( new THREE.Face3( v1, v2, v3, [ n, n, n ] ) );
        this.faceVertexUvs[ 0 ].push( [ uvs[ i ], uvs[ i + 1 ], centerUV ] );

    }

    this.computeCentroids();
    this.computeFaceNormals();

    this.boundingSphere = { radius: radius };

};

THREE.CircleGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
 */

THREE.CubeGeometry = function ( width, height, depth, widthSegments, heightSegments, depthSegments ) {

	THREE.Geometry.call( this );

	var scope = this;

	this.width = width;
	this.height = height;
	this.depth = depth;

	this.widthSegments = widthSegments || 1;
	this.heightSegments = heightSegments || 1;
	this.depthSegments = depthSegments || 1;

	var width_half = this.width / 2;
	var height_half = this.height / 2;
	var depth_half = this.depth / 2;

	buildPlane( 'z', 'y', - 1, - 1, this.depth, this.height, width_half, 0 ); // px
	buildPlane( 'z', 'y',   1, - 1, this.depth, this.height, - width_half, 1 ); // nx
	buildPlane( 'x', 'z',   1,   1, this.width, this.depth, height_half, 2 ); // py
	buildPlane( 'x', 'z',   1, - 1, this.width, this.depth, - height_half, 3 ); // ny
	buildPlane( 'x', 'y',   1, - 1, this.width, this.height, depth_half, 4 ); // pz
	buildPlane( 'x', 'y', - 1, - 1, this.width, this.height, - depth_half, 5 ); // nz

	function buildPlane( u, v, udir, vdir, width, height, depth, materialIndex ) {

		var w, ix, iy,
		gridX = scope.widthSegments,
		gridY = scope.heightSegments,
		width_half = width / 2,
		height_half = height / 2,
		offset = scope.vertices.length;

		if ( ( u === 'x' && v === 'y' ) || ( u === 'y' && v === 'x' ) ) {

			w = 'z';

		} else if ( ( u === 'x' && v === 'z' ) || ( u === 'z' && v === 'x' ) ) {

			w = 'y';
			gridY = scope.depthSegments;

		} else if ( ( u === 'z' && v === 'y' ) || ( u === 'y' && v === 'z' ) ) {

			w = 'x';
			gridX = scope.depthSegments;

		}

		var gridX1 = gridX + 1,
		gridY1 = gridY + 1,
		segment_width = width / gridX,
		segment_height = height / gridY,
		normal = new THREE.Vector3();

		normal[ w ] = depth > 0 ? 1 : - 1;

		for ( iy = 0; iy < gridY1; iy ++ ) {

			for ( ix = 0; ix < gridX1; ix ++ ) {

				var vector = new THREE.Vector3();
				vector[ u ] = ( ix * segment_width - width_half ) * udir;
				vector[ v ] = ( iy * segment_height - height_half ) * vdir;
				vector[ w ] = depth;

				scope.vertices.push( vector );

			}

		}

		for ( iy = 0; iy < gridY; iy++ ) {

			for ( ix = 0; ix < gridX; ix++ ) {

				var a = ix + gridX1 * iy;
				var b = ix + gridX1 * ( iy + 1 );
				var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				var d = ( ix + 1 ) + gridX1 * iy;

				var face = new THREE.Face4( a + offset, b + offset, c + offset, d + offset );
				face.normal.copy( normal );
				face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone(), normal.clone() );
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [
							new THREE.UV( ix / gridX, 1 - iy / gridY ),
							new THREE.UV( ix / gridX, 1 - ( iy + 1 ) / gridY ),
							new THREE.UV( ( ix + 1 ) / gridX, 1- ( iy + 1 ) / gridY ),
							new THREE.UV( ( ix + 1 ) / gridX, 1 - iy / gridY )
						] );

			}

		}

	}

	this.computeCentroids();
	this.mergeVertices();

};

THREE.CubeGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.CylinderGeometry = function ( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded ) {

	THREE.Geometry.call( this );

	radiusTop = radiusTop !== undefined ? radiusTop : 20;
	radiusBottom = radiusBottom !== undefined ? radiusBottom : 20;
	height = height !== undefined ? height : 100;

	var heightHalf = height / 2;
	var segmentsX = radiusSegments || 8;
	var segmentsY = heightSegments || 1;

	var x, y, vertices = [], uvs = [];

	for ( y = 0; y <= segmentsY; y ++ ) {

		var verticesRow = [];
		var uvsRow = [];

		var v = y / segmentsY;
		var radius = v * ( radiusBottom - radiusTop ) + radiusTop;

		for ( x = 0; x <= segmentsX; x ++ ) {

			var u = x / segmentsX;

			var vertex = new THREE.Vector3();
			vertex.x = radius * Math.sin( u * Math.PI * 2 );
			vertex.y = - v * height + heightHalf;
			vertex.z = radius * Math.cos( u * Math.PI * 2 );

			this.vertices.push( vertex );

			verticesRow.push( this.vertices.length - 1 );
			uvsRow.push( new THREE.UV( u, 1 - v ) );

		}

		vertices.push( verticesRow );
		uvs.push( uvsRow );

	}

	var tanTheta = ( radiusBottom - radiusTop ) / height;
	var na, nb;

	for ( x = 0; x < segmentsX; x ++ ) {

		if ( radiusTop !== 0 ) {

			na = this.vertices[ vertices[ 0 ][ x ] ].clone();
			nb = this.vertices[ vertices[ 0 ][ x + 1 ] ].clone();

		} else {

			na = this.vertices[ vertices[ 1 ][ x ] ].clone();
			nb = this.vertices[ vertices[ 1 ][ x + 1 ] ].clone();

		}

		na.setY( Math.sqrt( na.x * na.x + na.z * na.z ) * tanTheta ).normalize();
		nb.setY( Math.sqrt( nb.x * nb.x + nb.z * nb.z ) * tanTheta ).normalize();

		for ( y = 0; y < segmentsY; y ++ ) {

			var v1 = vertices[ y ][ x ];
			var v2 = vertices[ y + 1 ][ x ];
			var v3 = vertices[ y + 1 ][ x + 1 ];
			var v4 = vertices[ y ][ x + 1 ];

			var n1 = na.clone();
			var n2 = na.clone();
			var n3 = nb.clone();
			var n4 = nb.clone();

			var uv1 = uvs[ y ][ x ].clone();
			var uv2 = uvs[ y + 1 ][ x ].clone();
			var uv3 = uvs[ y + 1 ][ x + 1 ].clone();
			var uv4 = uvs[ y ][ x + 1 ].clone();

			this.faces.push( new THREE.Face4( v1, v2, v3, v4, [ n1, n2, n3, n4 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3, uv4 ] );

		}

	}

	// top cap

	if ( !openEnded && radiusTop > 0 ) {

		this.vertices.push( new THREE.Vector3( 0, heightHalf, 0 ) );

		for ( x = 0; x < segmentsX; x ++ ) {

			var v1 = vertices[ 0 ][ x ];
			var v2 = vertices[ 0 ][ x + 1 ];
			var v3 = this.vertices.length - 1;

			var n1 = new THREE.Vector3( 0, 1, 0 );
			var n2 = new THREE.Vector3( 0, 1, 0 );
			var n3 = new THREE.Vector3( 0, 1, 0 );

			var uv1 = uvs[ 0 ][ x ].clone();
			var uv2 = uvs[ 0 ][ x + 1 ].clone();
			var uv3 = new THREE.UV( uv2.u, 0 );

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );

		}

	}

	// bottom cap

	if ( !openEnded && radiusBottom > 0 ) {

		this.vertices.push( new THREE.Vector3( 0, - heightHalf, 0 ) );

		for ( x = 0; x < segmentsX; x ++ ) {

			var v1 = vertices[ y ][ x + 1 ];
			var v2 = vertices[ y ][ x ];
			var v3 = this.vertices.length - 1;

			var n1 = new THREE.Vector3( 0, - 1, 0 );
			var n2 = new THREE.Vector3( 0, - 1, 0 );
			var n3 = new THREE.Vector3( 0, - 1, 0 );

			var uv1 = uvs[ y ][ x + 1 ].clone();
			var uv2 = uvs[ y ][ x ].clone();
			var uv3 = new THREE.UV( uv2.u, 1 );

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );

		}

	}

	this.computeCentroids();
	this.computeFaceNormals();

}

THREE.CylinderGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 * Creates extruded geometry from a path shape.
 *
 * parameters = {
 *
 *  size: <float>, // size of the text
 *  height: <float>, // thickness to extrude text
 *  curveSegments: <int>, // number of points on the curves
 *  steps: <int>, // number of points for z-side extrusions / used for subdividing segements of extrude spline too
 *  amount: <int>, // Amount
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into text bevel goes
 *  bevelSize: <float>, // how far from text outline is bevel
 *  bevelSegments: <int>, // number of bevel layers
 *
 *  extrudePath: <THREE.CurvePath> // 3d spline path to extrude shape along. (creates Frames if .frames aren't defined)
 *  frames: <THREE.TubeGeometry.FrenetFrames> // containing arrays of tangents, normals, binormals
 *
 *  material: <int> // material index for front and back faces
 *  extrudeMaterial: <int> // material index for extrusion and beveled faces
 *  uvGenerator: <Object> // object that provides UV generator functions
 *
 * }
 **/

THREE.ExtrudeGeometry = function ( shapes, options ) {

	if ( typeof( shapes ) === "undefined" ) {
		shapes = [];
		return;
	}

	THREE.Geometry.call( this );

	shapes = shapes instanceof Array ? shapes : [ shapes ];

	this.shapebb = shapes[ shapes.length - 1 ].getBoundingBox();

	this.addShapeList( shapes, options );

	this.computeCentroids();
	this.computeFaceNormals();

	// can't really use automatic vertex normals
	// as then front and back sides get smoothed too
	// should do separate smoothing just for sides

	//this.computeVertexNormals();

	//console.log( "took", ( Date.now() - startTime ) );

};

THREE.ExtrudeGeometry.prototype = Object.create( THREE.Geometry.prototype );

THREE.ExtrudeGeometry.prototype.addShapeList = function ( shapes, options ) {
	var sl = shapes.length;

	for ( var s = 0; s < sl; s ++ ) {
		var shape = shapes[ s ];
		this.addShape( shape, options );
	}
};

THREE.ExtrudeGeometry.prototype.addShape = function ( shape, options ) {

	var amount = options.amount !== undefined ? options.amount : 100;

	var bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 6; // 10
	var bevelSize = options.bevelSize !== undefined ? options.bevelSize : bevelThickness - 2; // 8
	var bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;

	var bevelEnabled = options.bevelEnabled !== undefined ? options.bevelEnabled : true; // false

	var curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;

	var steps = options.steps !== undefined ? options.steps : 1;

	var extrudePath = options.extrudePath;
	var extrudePts, extrudeByPath = false;

	var material = options.material;
	var extrudeMaterial = options.extrudeMaterial;

	// Use default WorldUVGenerator if no UV generators are specified.
	var uvgen = options.UVGenerator !== undefined ? options.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;

	var shapebb = this.shapebb;
	//shapebb = shape.getBoundingBox();



	var splineTube, binormal, normal, position2;
	if ( extrudePath ) {

		extrudePts = extrudePath.getSpacedPoints( steps );

		extrudeByPath = true;
		bevelEnabled = false; // bevels not supported for path extrusion

		// SETUP TNB variables

		// Reuse TNB from TubeGeomtry for now.
		// TODO1 - have a .isClosed in spline?

		splineTube = options.frames !== undefined ? options.frames : new THREE.TubeGeometry.FrenetFrames(extrudePath, steps, false);

		// console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);

		binormal = new THREE.Vector3();
		normal = new THREE.Vector3();
		position2 = new THREE.Vector3();

	}

	// Safeguards if bevels are not enabled

	if ( ! bevelEnabled ) {

		bevelSegments = 0;
		bevelThickness = 0;
		bevelSize = 0;

	}

	// Variables initalization

	var ahole, h, hl; // looping of holes
	var scope = this;
	var bevelPoints = [];

	var shapesOffset = this.vertices.length;

	var shapePoints = shape.extractPoints();

	var vertices = shapePoints.shape;
	var holes = shapePoints.holes;

	var reverse = !THREE.Shape.Utils.isClockWise( vertices ) ;

	if ( reverse ) {

		vertices = vertices.reverse();

		// Maybe we should also check if holes are in the opposite direction, just to be safe ...

		for ( h = 0, hl = holes.length; h < hl; h ++ ) {

			ahole = holes[ h ];

			if ( THREE.Shape.Utils.isClockWise( ahole ) ) {

				holes[ h ] = ahole.reverse();

			}

		}

		reverse = false; // If vertices are in order now, we shouldn't need to worry about them again (hopefully)!

	}


	var faces = THREE.Shape.Utils.triangulateShape ( vertices, holes );

	/* Vertices */

	var contour = vertices; // vertices has all points but contour has only points of circumference

	for ( h = 0, hl = holes.length;  h < hl; h ++ ) {

		ahole = holes[ h ];

		vertices = vertices.concat( ahole );

	}


	function scalePt2 ( pt, vec, size ) {

		if ( !vec ) console.log( "die" );

		return vec.clone().multiplyScalar( size ).addSelf( pt );

	}

	var b, bs, t, z,
		vert, vlen = vertices.length,
		face, flen = faces.length,
		cont, clen = contour.length;


	// Find directions for point movement

	var RAD_TO_DEGREES = 180 / Math.PI;


	function getBevelVec( pt_i, pt_j, pt_k ) {

		// Algorithm 2

		return getBevelVec2( pt_i, pt_j, pt_k );

	}

	function getBevelVec1( pt_i, pt_j, pt_k ) {

		var anglea = Math.atan2( pt_j.y - pt_i.y, pt_j.x - pt_i.x );
		var angleb = Math.atan2( pt_k.y - pt_i.y, pt_k.x - pt_i.x );

		if ( anglea > angleb ) {

			angleb += Math.PI * 2;

		}

		var anglec = ( anglea + angleb ) / 2;


		//console.log('angle1', anglea * RAD_TO_DEGREES,'angle2', angleb * RAD_TO_DEGREES, 'anglec', anglec *RAD_TO_DEGREES);

		var x = - Math.cos( anglec );
		var y = - Math.sin( anglec );

		var vec = new THREE.Vector2( x, y ); //.normalize();

		return vec;

	}

	function getBevelVec2( pt_i, pt_j, pt_k ) {

		var a = THREE.ExtrudeGeometry.__v1,
			b = THREE.ExtrudeGeometry.__v2,
			v_hat = THREE.ExtrudeGeometry.__v3,
			w_hat = THREE.ExtrudeGeometry.__v4,
			p = THREE.ExtrudeGeometry.__v5,
			q = THREE.ExtrudeGeometry.__v6,
			v, w,
			v_dot_w_hat, q_sub_p_dot_w_hat,
			s, intersection;

		// good reading for line-line intersection
		// http://sputsoft.com/blog/2010/03/line-line-intersection.html

		// define a as vector j->i
		// define b as vectot k->i

		a.set( pt_i.x - pt_j.x, pt_i.y - pt_j.y );
		b.set( pt_i.x - pt_k.x, pt_i.y - pt_k.y );

		// get unit vectors

		v = a.normalize();
		w = b.normalize();

		// normals from pt i

		v_hat.set( -v.y, v.x );
		w_hat.set( w.y, -w.x );

		// pts from i

		p.copy( pt_i ).addSelf( v_hat );
		q.copy( pt_i ).addSelf( w_hat );

		if ( p.equals( q ) ) {

			//console.log("Warning: lines are straight");
			return w_hat.clone();

		}

		// Points from j, k. helps prevents points cross overover most of the time

		p.copy( pt_j ).addSelf( v_hat );
		q.copy( pt_k ).addSelf( w_hat );

		v_dot_w_hat = v.dot( w_hat );
		q_sub_p_dot_w_hat = q.subSelf( p ).dot( w_hat );

		// We should not reach these conditions

		if ( v_dot_w_hat === 0 ) {

			console.log( "Either infinite or no solutions!" );

			if ( q_sub_p_dot_w_hat === 0 ) {

				console.log( "Its finite solutions." );

			} else {

				console.log( "Too bad, no solutions." );

			}

		}

		s = q_sub_p_dot_w_hat / v_dot_w_hat;

		if ( s < 0 ) {

			// in case of emergecy, revert to algorithm 1.

			return getBevelVec1( pt_i, pt_j, pt_k );

		}

		intersection = v.multiplyScalar( s ).addSelf( p );

		return intersection.subSelf( pt_i ).clone(); // Don't normalize!, otherwise sharp corners become ugly

	}

	var contourMovements = [];

	for ( var i = 0, il = contour.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {

		if ( j === il ) j = 0;
		if ( k === il ) k = 0;

		//  (j)---(i)---(k)
		// console.log('i,j,k', i, j , k)

		var pt_i = contour[ i ];
		var pt_j = contour[ j ];
		var pt_k = contour[ k ];

		contourMovements[ i ]= getBevelVec( contour[ i ], contour[ j ], contour[ k ] );

	}

	var holesMovements = [], oneHoleMovements, verticesMovements = contourMovements.concat();

	for ( h = 0, hl = holes.length; h < hl; h ++ ) {

		ahole = holes[ h ];

		oneHoleMovements = [];

		for ( i = 0, il = ahole.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {

			if ( j === il ) j = 0;
			if ( k === il ) k = 0;

			//  (j)---(i)---(k)
			oneHoleMovements[ i ]= getBevelVec( ahole[ i ], ahole[ j ], ahole[ k ] );

		}

		holesMovements.push( oneHoleMovements );
		verticesMovements = verticesMovements.concat( oneHoleMovements );

	}


	// Loop bevelSegments, 1 for the front, 1 for the back

	for ( b = 0; b < bevelSegments; b ++ ) {
	//for ( b = bevelSegments; b > 0; b -- ) {

		t = b / bevelSegments;
		z = bevelThickness * ( 1 - t );

		//z = bevelThickness * t;
		bs = bevelSize * ( Math.sin ( t * Math.PI/2 ) ) ; // curved
		//bs = bevelSize * t ; // linear

		// contract shape

		for ( i = 0, il = contour.length; i < il; i ++ ) {

			vert = scalePt2( contour[ i ], contourMovements[ i ], bs );
			//vert = scalePt( contour[ i ], contourCentroid, bs, false );
			v( vert.x, vert.y,  - z );

		}

		// expand holes

		for ( h = 0, hl = holes.length; h < hl; h++ ) {

			ahole = holes[ h ];
			oneHoleMovements = holesMovements[ h ];

			for ( i = 0, il = ahole.length; i < il; i++ ) {

				vert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );
				//vert = scalePt( ahole[ i ], holesCentroids[ h ], bs, true );

				v( vert.x, vert.y,  -z );

			}

		}

	}

	bs = bevelSize;

	// Back facing vertices

	for ( i = 0; i < vlen; i ++ ) {

		vert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];

		if ( !extrudeByPath ) {

			v( vert.x, vert.y, 0 );

		} else {

			// v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );

			normal.copy( splineTube.normals[0] ).multiplyScalar(vert.x);
			binormal.copy( splineTube.binormals[0] ).multiplyScalar(vert.y);

			position2.copy( extrudePts[0] ).addSelf(normal).addSelf(binormal);

			v( position2.x, position2.y, position2.z );

		}

	}

	// Add stepped vertices...
	// Including front facing vertices

	var s;

	for ( s = 1; s <= steps; s ++ ) {

		for ( i = 0; i < vlen; i ++ ) {

			vert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];

			if ( !extrudeByPath ) {

				v( vert.x, vert.y, amount / steps * s );

			} else {

				// v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );

				normal.copy( splineTube.normals[s] ).multiplyScalar( vert.x );
				binormal.copy( splineTube.binormals[s] ).multiplyScalar( vert.y );

				position2.copy( extrudePts[s] ).addSelf( normal ).addSelf( binormal );

				v( position2.x, position2.y, position2.z );

			}

		}

	}


	// Add bevel segments planes

	//for ( b = 1; b <= bevelSegments; b ++ ) {
	for ( b = bevelSegments - 1; b >= 0; b -- ) {

		t = b / bevelSegments;
		z = bevelThickness * ( 1 - t );
		//bs = bevelSize * ( 1-Math.sin ( ( 1 - t ) * Math.PI/2 ) );
		bs = bevelSize * Math.sin ( t * Math.PI/2 ) ;

		// contract shape

		for ( i = 0, il = contour.length; i < il; i ++ ) {

			vert = scalePt2( contour[ i ], contourMovements[ i ], bs );
			v( vert.x, vert.y,  amount + z );

		}

		// expand holes

		for ( h = 0, hl = holes.length; h < hl; h ++ ) {

			ahole = holes[ h ];
			oneHoleMovements = holesMovements[ h ];

			for ( i = 0, il = ahole.length; i < il; i ++ ) {

				vert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );

				if ( !extrudeByPath ) {

					v( vert.x, vert.y,  amount + z );

				} else {

					v( vert.x, vert.y + extrudePts[ steps - 1 ].y, extrudePts[ steps - 1 ].x + z );

				}

			}

		}

	}

	/* Faces */

	// Top and bottom faces

	buildLidFaces();

	// Sides faces

	buildSideFaces();


	/////  Internal functions

	function buildLidFaces() {

		if ( bevelEnabled ) {

			var layer = 0 ; // steps + 1
			var offset = vlen * layer;

			// Bottom faces

			for ( i = 0; i < flen; i ++ ) {

				face = faces[ i ];
				f3( face[ 2 ]+ offset, face[ 1 ]+ offset, face[ 0 ] + offset, true );

			}

			layer = steps + bevelSegments * 2;
			offset = vlen * layer;

			// Top faces

			for ( i = 0; i < flen; i ++ ) {

				face = faces[ i ];
				f3( face[ 0 ] + offset, face[ 1 ] + offset, face[ 2 ] + offset, false );

			}

		} else {

			// Bottom faces

			for ( i = 0; i < flen; i++ ) {

				face = faces[ i ];
				f3( face[ 2 ], face[ 1 ], face[ 0 ], true );

			}

			// Top faces

			for ( i = 0; i < flen; i ++ ) {

				face = faces[ i ];
				f3( face[ 0 ] + vlen * steps, face[ 1 ] + vlen * steps, face[ 2 ] + vlen * steps, false );

			}
		}

	}

	// Create faces for the z-sides of the shape

	function buildSideFaces() {

		var layeroffset = 0;
		sidewalls( contour, layeroffset );
		layeroffset += contour.length;

		for ( h = 0, hl = holes.length;  h < hl; h ++ ) {

			ahole = holes[ h ];
			sidewalls( ahole, layeroffset );

			//, true
			layeroffset += ahole.length;

		}

	}

	function sidewalls( contour, layeroffset ) {

		var j, k;
		i = contour.length;

		while ( --i >= 0 ) {

			j = i;
			k = i - 1;
			if ( k < 0 ) k = contour.length - 1;

			//console.log('b', i,j, i-1, k,vertices.length);

			var s = 0, sl = steps  + bevelSegments * 2;

			for ( s = 0; s < sl; s ++ ) {

				var slen1 = vlen * s;
				var slen2 = vlen * ( s + 1 );

				var a = layeroffset + j + slen1,
					b = layeroffset + k + slen1,
					c = layeroffset + k + slen2,
					d = layeroffset + j + slen2;

				f4( a, b, c, d, contour, s, sl, j, k );

			}
		}

	}


	function v( x, y, z ) {

		scope.vertices.push( new THREE.Vector3( x, y, z ) );

	}

	function f3( a, b, c, isBottom ) {

		a += shapesOffset;
		b += shapesOffset;
		c += shapesOffset;

		// normal, color, material
		scope.faces.push( new THREE.Face3( a, b, c, null, null, material ) );

		var uvs = isBottom ? uvgen.generateBottomUV( scope, shape, options, a, b, c ) : uvgen.generateTopUV( scope, shape, options, a, b, c );

 		scope.faceVertexUvs[ 0 ].push( uvs );

	}

	function f4( a, b, c, d, wallContour, stepIndex, stepsLength, contourIndex1, contourIndex2 ) {

		a += shapesOffset;
		b += shapesOffset;
		c += shapesOffset;
		d += shapesOffset;

 		scope.faces.push( new THREE.Face4( a, b, c, d, null, null, extrudeMaterial ) );

 		var uvs = uvgen.generateSideWallUV( scope, shape, wallContour, options, a, b, c, d,
 		                                    stepIndex, stepsLength, contourIndex1, contourIndex2 );
 		scope.faceVertexUvs[ 0 ].push( uvs );

	}

};

THREE.ExtrudeGeometry.WorldUVGenerator = {

	generateTopUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC ) {
		var ax = geometry.vertices[ indexA ].x,
			ay = geometry.vertices[ indexA ].y,

			bx = geometry.vertices[ indexB ].x,
			by = geometry.vertices[ indexB ].y,

			cx = geometry.vertices[ indexC ].x,
			cy = geometry.vertices[ indexC ].y;

		return [
			new THREE.UV( ax, ay ),
			new THREE.UV( bx, by ),
			new THREE.UV( cx, cy )
		];

	},

	generateBottomUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC ) {

		return this.generateTopUV( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC );

	},

	generateSideWallUV: function( geometry, extrudedShape, wallContour, extrudeOptions,
	                              indexA, indexB, indexC, indexD, stepIndex, stepsLength,
	                              contourIndex1, contourIndex2 ) {

		var ax = geometry.vertices[ indexA ].x,
			ay = geometry.vertices[ indexA ].y,
			az = geometry.vertices[ indexA ].z,

			bx = geometry.vertices[ indexB ].x,
			by = geometry.vertices[ indexB ].y,
			bz = geometry.vertices[ indexB ].z,

			cx = geometry.vertices[ indexC ].x,
			cy = geometry.vertices[ indexC ].y,
			cz = geometry.vertices[ indexC ].z,

			dx = geometry.vertices[ indexD ].x,
			dy = geometry.vertices[ indexD ].y,
			dz = geometry.vertices[ indexD ].z;

		if ( Math.abs( ay - by ) < 0.01 ) {
			return [
				new THREE.UV( ax, 1 - az ),
				new THREE.UV( bx, 1 - bz ),
				new THREE.UV( cx, 1 - cz ),
				new THREE.UV( dx, 1 - dz )
			];
		} else {
			return [
				new THREE.UV( ay, 1 - az ),
				new THREE.UV( by, 1 - bz ),
				new THREE.UV( cy, 1 - cz ),
				new THREE.UV( dy, 1 - dz )
			];
		}
	}
};

THREE.ExtrudeGeometry.__v1 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2();
/**
 * @author jonobr1 / http://jonobr1.com
 *
 * Creates a one-sided polygonal geometry from a path shape. Similar to
 * ExtrudeGeometry.
 *
 * parameters = {
 *
 *	curveSegments: <int>, // number of points on the curves. NOT USED AT THE MOMENT.
 *
 *	material: <int> // material index for front and back faces
 *	uvGenerator: <Object> // object that provides UV generator functions
 *
 * }
 **/

THREE.ShapeGeometry = function ( shapes, options ) {

	THREE.Geometry.call( this );

	if ( shapes instanceof Array === false ) shapes = [ shapes ];

	this.shapebb = shapes[ shapes.length - 1 ].getBoundingBox();

	this.addShapeList( shapes, options );

	this.computeCentroids();
	this.computeFaceNormals();

};

THREE.ShapeGeometry.prototype = Object.create( THREE.Geometry.prototype );

/**
 * Add an array of shapes to THREE.ShapeGeometry.
 */
THREE.ShapeGeometry.prototype.addShapeList = function ( shapes, options ) {

	for ( var i = 0, l = shapes.length; i < l; i++ ) {

		this.addShape( shapes[ i ], options );

	}

	return this;

};

/**
 * Adds a shape to THREE.ShapeGeometry, based on THREE.ExtrudeGeometry.
 */
THREE.ShapeGeometry.prototype.addShape = function ( shape, options ) {

	if ( options === undefined ) options = {};

	var material = options.material;
	var uvgen = options.UVGenerator === undefined ? THREE.ExtrudeGeometry.WorldUVGenerator : options.UVGenerator;

	var shapebb = this.shapebb;

	//

	var i, l, hole, s;

	var shapesOffset = this.vertices.length;
	var shapePoints = shape.extractPoints();

	var vertices = shapePoints.shape;
	var holes = shapePoints.holes;

	var reverse = !THREE.Shape.Utils.isClockWise( vertices );

	if ( reverse ) {

		vertices = vertices.reverse();

		// Maybe we should also check if holes are in the opposite direction, just to be safe...

		for ( i = 0, l = holes.length; i < l; i++ ) {

			hole = holes[ i ];

			if ( THREE.Shape.Utils.isClockWise( hole ) ) {

				holes[ i ] = hole.reverse();

			}

		}

		reverse = false;

	}

	var faces = THREE.Shape.Utils.triangulateShape( vertices, holes );

	// Vertices

	var contour = vertices;

	for ( i = 0, l = holes.length; i < l; i++ ) {

		hole = holes[ i ];
		vertices = vertices.concat( hole );

	}

	//

	var vert, vlen = vertices.length;
	var face, flen = faces.length;
	var cont, clen = contour.length;

	for ( i = 0; i < vlen; i++ ) {

		vert = vertices[ i ];

		this.vertices.push( new THREE.Vector3( vert.x, vert.y, 0 ) );

	}

	for ( i = 0; i < flen; i++ ) {

		face = faces[ i ];

		var a = face[ 0 ] + shapesOffset;
		var b = face[ 1 ] + shapesOffset;
		var c = face[ 2 ] + shapesOffset;

		this.faces.push( new THREE.Face3( a, b, c, null, null, material ) );
		this.faceVertexUvs[ 0 ].push( uvgen.generateBottomUV( this, shape, options, a, b, c ) );

	}

};
/**
 * @author astrodud / http://astrodud.isgreat.org/
 * @author zz85 / https://github.com/zz85
 */

THREE.LatheGeometry = function ( points, steps, angle ) {

	THREE.Geometry.call( this );

	var _steps = steps || 12;
	var _angle = angle || 2 * Math.PI;

	var _newV = [];
	var _matrix = new THREE.Matrix4().makeRotationZ( _angle / _steps );

	for ( var j = 0; j < points.length; j ++ ) {

		_newV[ j ] = points[ j ].clone();
		this.vertices.push( _newV[ j ] );

	}

	var i, il = _steps + 1;

	for ( i = 0; i < il; i ++ ) {

		for ( var j = 0; j < _newV.length; j ++ ) {

			_newV[ j ] = _matrix.multiplyVector3( _newV[ j ].clone() );
			this.vertices.push( _newV[ j ] );

		}

	}

	for ( i = 0; i < _steps; i ++ ) {

		for ( var k = 0, kl = points.length; k < kl - 1; k ++ ) {

			var a = i * kl + k;
			var b = ( ( i + 1 ) % il ) * kl + k;
			var c = ( ( i + 1 ) % il ) * kl + ( k + 1 ) % kl;
			var d = i * kl + ( k + 1 ) % kl;

			this.faces.push( new THREE.Face4( a, b, c, d ) );

			this.faceVertexUvs[ 0 ].push( [

				new THREE.UV( 1 - i / _steps, k / kl ),
				new THREE.UV( 1 - ( i + 1 ) / _steps, k / kl ),
				new THREE.UV( 1 - ( i + 1 ) / _steps, ( k + 1 ) / kl ),
				new THREE.UV( 1 - i / _steps, ( k + 1 ) / kl )

			] );

		}

	}

	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.LatheGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */

THREE.PlaneGeometry = function ( width, height, widthSegments, heightSegments ) {

	THREE.Geometry.call( this );

	this.width = width;
	this.height = height;

	this.widthSegments = widthSegments || 1;
	this.heightSegments = heightSegments || 1;

	var ix, iz;
	var width_half = width / 2;
	var height_half = height / 2;

	var gridX = this.widthSegments;
	var gridZ = this.heightSegments;

	var gridX1 = gridX + 1;
	var gridZ1 = gridZ + 1;

	var segment_width = this.width / gridX;
	var segment_height = this.height / gridZ;

	var normal = new THREE.Vector3( 0, 0, 1 );

	for ( iz = 0; iz < gridZ1; iz ++ ) {

		for ( ix = 0; ix < gridX1; ix ++ ) {

			var x = ix * segment_width - width_half;
			var y = iz * segment_height - height_half;

			this.vertices.push( new THREE.Vector3( x, - y, 0 ) );

		}

	}

	for ( iz = 0; iz < gridZ; iz ++ ) {

		for ( ix = 0; ix < gridX; ix ++ ) {

			var a = ix + gridX1 * iz;
			var b = ix + gridX1 * ( iz + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iz + 1 );
			var d = ( ix + 1 ) + gridX1 * iz;

			var face = new THREE.Face4( a, b, c, d );
			face.normal.copy( normal );
			face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone(), normal.clone() );

			this.faces.push( face );
			this.faceVertexUvs[ 0 ].push( [
				new THREE.UV( ix / gridX, 1 - iz / gridZ ),
				new THREE.UV( ix / gridX, 1 - ( iz + 1 ) / gridZ ),
				new THREE.UV( ( ix + 1 ) / gridX, 1 - ( iz + 1 ) / gridZ ),
				new THREE.UV( ( ix + 1 ) / gridX, 1 - iz / gridZ )
			] );

		}

	}

	this.computeCentroids();

};

THREE.PlaneGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.SphereGeometry = function ( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

	THREE.Geometry.call( this );

	this.radius = radius || 50;

	this.widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
	this.heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

	phiStart = phiStart !== undefined ? phiStart : 0;
	phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

	var x, y, vertices = [], uvs = [];

	for ( y = 0; y <= this.heightSegments; y ++ ) {

		var verticesRow = [];
		var uvsRow = [];

		for ( x = 0; x <= this.widthSegments; x ++ ) {

			var u = x / this.widthSegments;
			var v = y / this.heightSegments;

			var vertex = new THREE.Vector3();
			vertex.x = - this.radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
			vertex.y = this.radius * Math.cos( thetaStart + v * thetaLength );
			vertex.z = this.radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

			this.vertices.push( vertex );

			verticesRow.push( this.vertices.length - 1 );
			uvsRow.push( new THREE.UV( u, 1 - v ) );

		}

		vertices.push( verticesRow );
		uvs.push( uvsRow );

	}

	for ( y = 0; y < this.heightSegments; y ++ ) {

		for ( x = 0; x < this.widthSegments; x ++ ) {

			var v1 = vertices[ y ][ x + 1 ];
			var v2 = vertices[ y ][ x ];
			var v3 = vertices[ y + 1 ][ x ];
			var v4 = vertices[ y + 1 ][ x + 1 ];

			var n1 = this.vertices[ v1 ].clone().normalize();
			var n2 = this.vertices[ v2 ].clone().normalize();
			var n3 = this.vertices[ v3 ].clone().normalize();
			var n4 = this.vertices[ v4 ].clone().normalize();

			var uv1 = uvs[ y ][ x + 1 ].clone();
			var uv2 = uvs[ y ][ x ].clone();
			var uv3 = uvs[ y + 1 ][ x ].clone();
			var uv4 = uvs[ y + 1 ][ x + 1 ].clone();

			if ( Math.abs( this.vertices[ v1 ].y ) === this.radius ) {

				this.faces.push( new THREE.Face3( v1, v3, v4, [ n1, n3, n4 ] ) );
				this.faceVertexUvs[ 0 ].push( [ uv1, uv3, uv4 ] );

			} else if ( Math.abs( this.vertices[ v3 ].y ) === this.radius ) {

				this.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );
				this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );

			} else {

				this.faces.push( new THREE.Face4( v1, v2, v3, v4, [ n1, n2, n3, n4 ] ) );
				this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3, uv4 ] );

			}

		}

	}

	this.computeCentroids();
	this.computeFaceNormals();

	this.boundingSphere = { radius: this.radius };

};

THREE.SphereGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * For creating 3D text geometry in three.js
 *
 * Text = 3D Text
 *
 * parameters = {
 *  size: 			<float>, 	// size of the text
 *  height: 		<float>, 	// thickness to extrude text
 *  curveSegments: 	<int>,		// number of points on the curves
 *
 *  font: 			<string>,		// font name
 *  weight: 		<string>,		// font weight (normal, bold)
 *  style: 			<string>,		// font style  (normal, italics)
 *
 *  bevelEnabled:	<bool>,			// turn on bevel
 *  bevelThickness: <float>, 		// how deep into text bevel goes
 *  bevelSize:		<float>, 		// how far from text outline is bevel
 *  }
 *
 */

/*	Usage Examples

	// TextGeometry wrapper

	var text3d = new TextGeometry( text, options );

	// Complete manner

	var textShapes = THREE.FontUtils.generateShapes( text, options );
	var text3d = new ExtrudeGeometry( textShapes, options );

*/


THREE.TextGeometry = function ( text, parameters ) {

	var textShapes = THREE.FontUtils.generateShapes( text, parameters );

	// translate parameters to ExtrudeGeometry API

	parameters.amount = parameters.height !== undefined ? parameters.height : 50;

	// defaults

	if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
	if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
	if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

	THREE.ExtrudeGeometry.call( this, textShapes, parameters );

};

THREE.TextGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );
/**
 * @author oosmoxiecode
 * @author mrdoob / http://mrdoob.com/
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3DLite/src/away3dlite/primitives/Torus.as?r=2888
 */

THREE.TorusGeometry = function ( radius, tube, radialSegments, tubularSegments, arc ) {

	THREE.Geometry.call( this );

	var scope = this;

	this.radius = radius || 100;
	this.tube = tube || 40;
	this.radialSegments = radialSegments || 8;
	this.tubularSegments = tubularSegments || 6;
	this.arc = arc || Math.PI * 2;

	var center = new THREE.Vector3(), uvs = [], normals = [];

	for ( var j = 0; j <= this.radialSegments; j ++ ) {

		for ( var i = 0; i <= this.tubularSegments; i ++ ) {

			var u = i / this.tubularSegments * this.arc;
			var v = j / this.radialSegments * Math.PI * 2;

			center.x = this.radius * Math.cos( u );
			center.y = this.radius * Math.sin( u );

			var vertex = new THREE.Vector3();
			vertex.x = ( this.radius + this.tube * Math.cos( v ) ) * Math.cos( u );
			vertex.y = ( this.radius + this.tube * Math.cos( v ) ) * Math.sin( u );
			vertex.z = this.tube * Math.sin( v );

			this.vertices.push( vertex );

			uvs.push( new THREE.UV( i / this.tubularSegments, j / this.radialSegments ) );
			normals.push( vertex.clone().subSelf( center ).normalize() );

		}
	}


	for ( var j = 1; j <= this.radialSegments; j ++ ) {

		for ( var i = 1; i <= this.tubularSegments; i ++ ) {

			var a = ( this.tubularSegments + 1 ) * j + i - 1;
			var b = ( this.tubularSegments + 1 ) * ( j - 1 ) + i - 1;
			var c = ( this.tubularSegments + 1 ) * ( j - 1 ) + i;
			var d = ( this.tubularSegments + 1 ) * j + i;

			var face = new THREE.Face4( a, b, c, d, [ normals[ a ], normals[ b ], normals[ c ], normals[ d ] ] );
			face.normal.addSelf( normals[ a ] );
			face.normal.addSelf( normals[ b ] );
			face.normal.addSelf( normals[ c ] );
			face.normal.addSelf( normals[ d ] );
			face.normal.normalize();

			this.faces.push( face );

			this.faceVertexUvs[ 0 ].push( [ uvs[ a ].clone(), uvs[ b ].clone(), uvs[ c ].clone(), uvs[ d ].clone() ] );
		}

	}

	this.computeCentroids();

};

THREE.TorusGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author oosmoxiecode
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3D/src/away3d/primitives/TorusKnot.as?spec=svn2473&r=2473
 */

THREE.TorusKnotGeometry = function ( radius, tube, radialSegments, tubularSegments, p, q, heightScale ) {

	THREE.Geometry.call( this );

	var scope = this;

	this.radius = radius || 200;
	this.tube = tube || 40;
	this.radialSegments = radialSegments || 64;
	this.tubularSegments = tubularSegments || 8;
	this.p = p || 2;
	this.q = q || 3;
	this.heightScale = heightScale || 1;
	this.grid = new Array(this.radialSegments);

	var tang = new THREE.Vector3();
	var n = new THREE.Vector3();
	var bitan = new THREE.Vector3();

	for ( var i = 0; i < this.radialSegments; ++ i ) {

		this.grid[ i ] = new Array( this.tubularSegments );

		for ( var j = 0; j < this.tubularSegments; ++ j ) {

			var u = i / this.radialSegments * 2 * this.p * Math.PI;
			var v = j / this.tubularSegments * 2 * Math.PI;
			var p1 = getPos( u, v, this.q, this.p, this.radius, this.heightScale );
			var p2 = getPos( u + 0.01, v, this.q, this.p, this.radius, this.heightScale );
			var cx, cy;

			tang.sub( p2, p1 );
			n.add( p2, p1 );

			bitan.cross( tang, n );
			n.cross( bitan, tang );
			bitan.normalize();
			n.normalize();

			cx = - this.tube * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.
			cy = this.tube * Math.sin( v );

			p1.x += cx * n.x + cy * bitan.x;
			p1.y += cx * n.y + cy * bitan.y;
			p1.z += cx * n.z + cy * bitan.z;

			this.grid[ i ][ j ] = vert( p1.x, p1.y, p1.z );

		}

	}

	for ( var i = 0; i < this.radialSegments; ++ i ) {

		for ( var j = 0; j < this.tubularSegments; ++ j ) {

			var ip = ( i + 1 ) % this.radialSegments;
			var jp = ( j + 1 ) % this.tubularSegments;

			var a = this.grid[ i ][ j ];
			var b = this.grid[ ip ][ j ];
			var c = this.grid[ ip ][ jp ];
			var d = this.grid[ i ][ jp ];

			var uva = new THREE.UV( i / this.radialSegments, j / this.tubularSegments );
			var uvb = new THREE.UV( ( i + 1 ) / this.radialSegments, j / this.tubularSegments );
			var uvc = new THREE.UV( ( i + 1 ) / this.radialSegments, ( j + 1 ) / this.tubularSegments );
			var uvd = new THREE.UV( i / this.radialSegments, ( j + 1 ) / this.tubularSegments );

			this.faces.push( new THREE.Face4( a, b, c, d ) );
			this.faceVertexUvs[ 0 ].push( [ uva,uvb,uvc, uvd ] );

		}
	}

	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();

	function vert( x, y, z ) {

		return scope.vertices.push( new THREE.Vector3( x, y, z ) ) - 1;

	}

	function getPos( u, v, in_q, in_p, radius, heightScale ) {

		var cu = Math.cos( u );
		var cv = Math.cos( v );
		var su = Math.sin( u );
		var quOverP = in_q / in_p * u;
		var cs = Math.cos( quOverP );

		var tx = radius * ( 2 + cs ) * 0.5 * cu;
		var ty = radius * ( 2 + cs ) * su * 0.5;
		var tz = heightScale * radius * Math.sin( quOverP ) * 0.5;

		return new THREE.Vector3( tx, ty, tz );

	}

};

THREE.TorusKnotGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author WestLangley / https://github.com/WestLangley
 * @author zz85 / https://github.com/zz85
 * @author miningold / https://github.com/miningold
 *
 * Modified from the TorusKnotGeometry by @oosmoxiecode
 *
 * Creates a tube which extrudes along a 3d spline
 *
 * Uses parallel transport frames as described in
 * http://www.cs.indiana.edu/pub/techreports/TR425.pdf
 */

THREE.TubeGeometry = function( path, segments, radius, radiusSegments, closed, debug ) {

	THREE.Geometry.call( this );

	this.path = path;
	this.segments = segments || 64;
	this.radius = radius || 1;
	this.radiusSegments = radiusSegments || 8;
	this.closed = closed || false;

	if ( debug ) this.debug = new THREE.Object3D();

	this.grid = [];

	var scope = this,

		tangent,
		normal,
		binormal,

		numpoints = this.segments + 1,

		x, y, z,
		tx, ty, tz,
		u, v,

		cx, cy,
		pos, pos2 = new THREE.Vector3(),
		i, j,
		ip, jp,
		a, b, c, d,
		uva, uvb, uvc, uvd;

	var frames = new THREE.TubeGeometry.FrenetFrames(path, segments, closed),
		tangents = frames.tangents,
		normals = frames.normals,
		binormals = frames.binormals;

	// proxy internals
	this.tangents = tangents;
	this.normals = normals;
	this.binormals = binormals;

	function vert( x, y, z ) {

		return scope.vertices.push( new THREE.Vector3( x, y, z ) ) - 1;

	}


	// consruct the grid

	for ( i = 0; i < numpoints; i++ ) {

		this.grid[ i ] = [];

		u = i / ( numpoints - 1 );

		pos = path.getPointAt( u );

		tangent = tangents[ i ];
		normal = normals[ i ];
		binormal = binormals[ i ];

		if ( this.debug ) {

			this.debug.add( new THREE.ArrowHelper(tangent, pos, radius, 0x0000ff ) );
			this.debug.add( new THREE.ArrowHelper(normal, pos, radius, 0xff0000 ) );
			this.debug.add( new THREE.ArrowHelper(binormal, pos, radius, 0x00ff00 ) );

		}

		for ( j = 0; j < this.radiusSegments; j++ ) {

			v = j / this.radiusSegments * 2 * Math.PI;

			cx = -this.radius * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.
			cy = this.radius * Math.sin( v );

			pos2.copy( pos );
			pos2.x += cx * normal.x + cy * binormal.x;
			pos2.y += cx * normal.y + cy * binormal.y;
			pos2.z += cx * normal.z + cy * binormal.z;

			this.grid[ i ][ j ] = vert( pos2.x, pos2.y, pos2.z );

		}
	}


	// construct the mesh

	for ( i = 0; i < this.segments; i++ ) {

		for ( j = 0; j < this.radiusSegments; j++ ) {

			ip = ( closed ) ? (i + 1) % this.segments : i + 1;
			jp = (j + 1) % this.radiusSegments;

			a = this.grid[ i ][ j ];		// *** NOT NECESSARILY PLANAR ! ***
			b = this.grid[ ip ][ j ];
			c = this.grid[ ip ][ jp ];
			d = this.grid[ i ][ jp ];

			uva = new THREE.UV( i / this.segments, j / this.radiusSegments );
			uvb = new THREE.UV( ( i + 1 ) / this.segments, j / this.radiusSegments );
			uvc = new THREE.UV( ( i + 1 ) / this.segments, ( j + 1 ) / this.radiusSegments );
			uvd = new THREE.UV( i / this.segments, ( j + 1 ) / this.radiusSegments );

			this.faces.push( new THREE.Face4( a, b, c, d ) );
			this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc, uvd ] );

		}
	}

	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.TubeGeometry.prototype = Object.create( THREE.Geometry.prototype );


// For computing of Frenet frames, exposing the tangents, normals and binormals the spline
THREE.TubeGeometry.FrenetFrames = function(path, segments, closed) {

	var
		tangent = new THREE.Vector3(),
		normal = new THREE.Vector3(),
		binormal = new THREE.Vector3(),

		tangents = [],
		normals = [],
		binormals = [],

		vec = new THREE.Vector3(),
		mat = new THREE.Matrix4(),

		numpoints = segments + 1,
		theta,
		epsilon = 0.0001,
		smallest,

		tx, ty, tz,
		i, u, v;


	// expose internals
	this.tangents = tangents;
	this.normals = normals;
	this.binormals = binormals;

	// compute the tangent vectors for each segment on the path

	for ( i = 0; i < numpoints; i++ ) {

		u = i / ( numpoints - 1 );

		tangents[ i ] = path.getTangentAt( u );
		tangents[ i ].normalize();

	}

	initialNormal3();

	function initialNormal1(lastBinormal) {
		// fixed start binormal. Has dangers of 0 vectors
		normals[ 0 ] = new THREE.Vector3();
		binormals[ 0 ] = new THREE.Vector3();
		if (lastBinormal===undefined) lastBinormal = new THREE.Vector3( 0, 0, 1 );
		normals[ 0 ].cross( lastBinormal, tangents[ 0 ] ).normalize();
		binormals[ 0 ].cross( tangents[ 0 ], normals[ 0 ] ).normalize();
	}

	function initialNormal2() {

		// This uses the Frenet-Serret formula for deriving binormal
		var t2 = path.getTangentAt( epsilon );

		normals[ 0 ] = new THREE.Vector3().sub( t2, tangents[ 0 ] ).normalize();
		binormals[ 0 ] = new THREE.Vector3().cross( tangents[ 0 ], normals[ 0 ] );

		normals[ 0 ].cross( binormals[ 0 ], tangents[ 0 ] ).normalize(); // last binormal x tangent
		binormals[ 0 ].cross( tangents[ 0 ], normals[ 0 ] ).normalize();

	}

	function initialNormal3() {
		// select an initial normal vector perpenicular to the first tangent vector,
		// and in the direction of the smallest tangent xyz component

		normals[ 0 ] = new THREE.Vector3();
		binormals[ 0 ] = new THREE.Vector3();
		smallest = Number.MAX_VALUE;
		tx = Math.abs( tangents[ 0 ].x );
		ty = Math.abs( tangents[ 0 ].y );
		tz = Math.abs( tangents[ 0 ].z );

		if ( tx <= smallest ) {
			smallest = tx;
			normal.set( 1, 0, 0 );
		}

		if ( ty <= smallest ) {
			smallest = ty;
			normal.set( 0, 1, 0 );
		}

		if ( tz <= smallest ) {
			normal.set( 0, 0, 1 );
		}

		vec.cross( tangents[ 0 ], normal ).normalize();

		normals[ 0 ].cross( tangents[ 0 ], vec );
		binormals[ 0 ].cross( tangents[ 0 ], normals[ 0 ] );
	}


	// compute the slowly-varying normal and binormal vectors for each segment on the path

	for ( i = 1; i < numpoints; i++ ) {

		normals[ i ] = normals[ i-1 ].clone();

		binormals[ i ] = binormals[ i-1 ].clone();

		vec.cross( tangents[ i-1 ], tangents[ i ] );

		if ( vec.length() > epsilon ) {

			vec.normalize();

			theta = Math.acos( tangents[ i-1 ].dot( tangents[ i ] ) );

			mat.makeRotationAxis( vec, theta ).multiplyVector3( normals[ i ] );

		}

		binormals[ i ].cross( tangents[ i ], normals[ i ] );

	}


	// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same

	if ( closed ) {

		theta = Math.acos( normals[ 0 ].dot( normals[ numpoints-1 ] ) );
		theta /= ( numpoints - 1 );

		if ( tangents[ 0 ].dot( vec.cross( normals[ 0 ], normals[ numpoints-1 ] ) ) > 0 ) {

			theta = -theta;

		}

		for ( i = 1; i < numpoints; i++ ) {

			// twist a little...
			mat.makeRotationAxis( tangents[ i ], theta * i ).multiplyVector3( normals[ i ] );
			binormals[ i ].cross( tangents[ i ], normals[ i ] );

		}

	}
};
/**
 * @author clockworkgeek / https://github.com/clockworkgeek
 * @author timothypratley / https://github.com/timothypratley
 */

THREE.PolyhedronGeometry = function ( vertices, faces, radius, detail ) {

	THREE.Geometry.call( this );

	radius = radius || 1;
	detail = detail || 0;

	var that = this;

	for ( var i = 0, l = vertices.length; i < l; i ++ ) {

		prepare( new THREE.Vector3( vertices[ i ][ 0 ], vertices[ i ][ 1 ], vertices[ i ][ 2 ] ) );

	}

	var midpoints = [], p = this.vertices;

	for ( var i = 0, l = faces.length; i < l; i ++ ) {

		make( p[ faces[ i ][ 0 ] ], p[ faces[ i ][ 1 ] ], p[ faces[ i ][ 2 ] ], detail );

	}

	this.mergeVertices();

	// Apply radius

	for ( var i = 0, l = this.vertices.length; i < l; i ++ ) {

		this.vertices[ i ].multiplyScalar( radius );

	}


	// Project vector onto sphere's surface

	function prepare( vector ) {

		var vertex = vector.normalize().clone();
		vertex.index = that.vertices.push( vertex ) - 1;

		// Texture coords are equivalent to map coords, calculate angle and convert to fraction of a circle.

		var u = azimuth( vector ) / 2 / Math.PI + 0.5;
		var v = inclination( vector ) / Math.PI + 0.5;
		vertex.uv = new THREE.UV( u, 1 - v );

		return vertex;

	}


	// Approximate a curved face with recursively sub-divided triangles.

	function make( v1, v2, v3, detail ) {

		if ( detail < 1 ) {

			var face = new THREE.Face3( v1.index, v2.index, v3.index, [ v1.clone(), v2.clone(), v3.clone() ] );
			face.centroid.addSelf( v1 ).addSelf( v2 ).addSelf( v3 ).divideScalar( 3 );
			face.normal = face.centroid.clone().normalize();
			that.faces.push( face );

			var azi = azimuth( face.centroid );
			that.faceVertexUvs[ 0 ].push( [
				correctUV( v1.uv, v1, azi ),
				correctUV( v2.uv, v2, azi ),
				correctUV( v3.uv, v3, azi )
			] );

		} else {

			detail -= 1;

			// split triangle into 4 smaller triangles

			make( v1, midpoint( v1, v2 ), midpoint( v1, v3 ), detail ); // top quadrant
			make( midpoint( v1, v2 ), v2, midpoint( v2, v3 ), detail ); // left quadrant
			make( midpoint( v1, v3 ), midpoint( v2, v3 ), v3, detail ); // right quadrant
			make( midpoint( v1, v2 ), midpoint( v2, v3 ), midpoint( v1, v3 ), detail ); // center quadrant

		}

	}

	function midpoint( v1, v2 ) {

		if ( !midpoints[ v1.index ] ) midpoints[ v1.index ] = [];
		if ( !midpoints[ v2.index ] ) midpoints[ v2.index ] = [];

		var mid = midpoints[ v1.index ][ v2.index ];

		if ( mid === undefined ) {

			// generate mean point and project to surface with prepare()

			midpoints[ v1.index ][ v2.index ] = midpoints[ v2.index ][ v1.index ] = mid = prepare(
				new THREE.Vector3().add( v1, v2 ).divideScalar( 2 )
			);
		}

		return mid;

	}


	// Angle around the Y axis, counter-clockwise when looking from above.

	function azimuth( vector ) {

		return Math.atan2( vector.z, -vector.x );

	}


	// Angle above the XZ plane.

	function inclination( vector ) {

		return Math.atan2( -vector.y, Math.sqrt( ( vector.x * vector.x ) + ( vector.z * vector.z ) ) );

	}


	// Texture fixing helper. Spheres have some odd behaviours.

	function correctUV( uv, vector, azimuth ) {

		if ( ( azimuth < 0 ) && ( uv.u === 1 ) ) uv = new THREE.UV( uv.u - 1, uv.v );
		if ( ( vector.x === 0 ) && ( vector.z === 0 ) ) uv = new THREE.UV( azimuth / 2 / Math.PI + 0.5, uv.v );
		return uv;

	}

	this.computeCentroids();

	this.boundingSphere = { radius: radius };

};

THREE.PolyhedronGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author timothypratley / https://github.com/timothypratley
 */

THREE.IcosahedronGeometry = function ( radius, detail ) {

	var t = ( 1 + Math.sqrt( 5 ) ) / 2;

	var vertices = [
		[ -1,  t,  0 ], [  1, t, 0 ], [ -1, -t,  0 ], [  1, -t,  0 ],
		[  0, -1,  t ], [  0, 1, t ], [  0, -1, -t ], [  0,  1, -t ],
		[  t,  0, -1 ], [  t, 0, 1 ], [ -t,  0, -1 ], [ -t,  0,  1 ]
	];

	var faces = [
		[ 0, 11,  5 ], [ 0,  5,  1 ], [  0,  1,  7 ], [  0,  7, 10 ], [  0, 10, 11 ],
		[ 1,  5,  9 ], [ 5, 11,  4 ], [ 11, 10,  2 ], [ 10,  7,  6 ], [  7,  1,  8 ],
		[ 3,  9,  4 ], [ 3,  4,  2 ], [  3,  2,  6 ], [  3,  6,  8 ], [  3,  8,  9 ],
		[ 4,  9,  5 ], [ 2,  4, 11 ], [  6,  2, 10 ], [  8,  6,  7 ], [  9,  8,  1 ]
	];

	THREE.PolyhedronGeometry.call( this, vertices, faces, radius, detail );

};

THREE.IcosahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author timothypratley / https://github.com/timothypratley
 */

THREE.OctahedronGeometry = function ( radius, detail ) {

	var vertices = [
		[ 1, 0, 0 ], [ -1, 0, 0 ], [ 0, 1, 0 ], [ 0, -1, 0 ], [ 0, 0, 1 ], [ 0, 0, -1 ]
	];

	var faces = [
		[ 0, 2, 4 ], [ 0, 4, 3 ], [ 0, 3, 5 ], [ 0, 5, 2 ], [ 1, 2, 5 ], [ 1, 5, 3 ], [ 1, 3, 4 ], [ 1, 4, 2 ]
	];

	THREE.PolyhedronGeometry.call( this, vertices, faces, radius, detail );
};

THREE.OctahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author timothypratley / https://github.com/timothypratley
 */

THREE.TetrahedronGeometry = function ( radius, detail ) {

	var vertices = [
		[ 1,  1,  1 ], [ -1, -1, 1 ], [ -1, 1, -1 ], [ 1, -1, -1 ]
	];

	var faces = [
		[ 2, 1, 0 ], [ 0, 3, 2 ], [ 1, 3, 0 ], [ 2, 3, 1 ]
	];

	THREE.PolyhedronGeometry.call( this, vertices, faces, radius, detail );

};

THREE.TetrahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author zz85 / https://github.com/zz85
 * Parametric Surfaces Geometry
 * based on the brilliant article by @prideout http://prideout.net/blog/?p=44
 *
 * new THREE.ParametricGeometry( parametricFunction, uSegments, ySegements, useTris );
 *
 */

THREE.ParametricGeometry = function ( func, slices, stacks, useTris ) {

	THREE.Geometry.call( this );

	var verts = this.vertices;
	var faces = this.faces;
	var uvs = this.faceVertexUvs[ 0 ];

	useTris = (useTris === undefined) ? false : useTris;

	var i, il, j, p;
	var u, v;

	var stackCount = stacks + 1;
	var sliceCount = slices + 1;

	for ( i = 0; i <= stacks; i ++ ) {

		v = i / stacks;

		for ( j = 0; j <= slices; j ++ ) {

			u = j / slices;

			p = func( u, v );
			verts.push( p );

		}
	}

	var a, b, c, d;
	var uva, uvb, uvc, uvd;

	for ( i = 0; i < stacks; i ++ ) {

		for ( j = 0; j < slices; j ++ ) {

			a = i * sliceCount + j;
			b = i * sliceCount + j + 1;
			c = (i + 1) * sliceCount + j;
			d = (i + 1) * sliceCount + j + 1;

			uva = new THREE.UV( j / slices, i / stacks );
			uvb = new THREE.UV( ( j + 1 ) / slices, i / stacks );
			uvc = new THREE.UV( j / slices, ( i + 1 ) / stacks );
			uvd = new THREE.UV( ( j + 1 ) / slices, ( i + 1 ) / stacks );

			if ( useTris ) {

				faces.push( new THREE.Face3( a, b, c ) );
				faces.push( new THREE.Face3( b, d, c ) );

				uvs.push( [ uva, uvb, uvc ] );
				uvs.push( [ uvb, uvd, uvc ] );

			} else {

				faces.push( new THREE.Face4( a, b, d, c ) );
				uvs.push( [ uva, uvb, uvd, uvc ] );

			}

		}

	}

	// console.log(this);

	// magic bullet
	// var diff = this.mergeVertices();
	// console.log('removed ', diff, ' vertices by merging');

	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.ParametricGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author qiao / https://github.com/qiao
 * @fileoverview This is a convex hull generator using the incremental method.
 * The complexity is O(n^2) where n is the number of vertices.
 * O(nlogn) algorithms do exist, but they are much more complicated.
 *
 * Benchmark:
 *
 *  Platform: CPU: P7350 @2.00GHz Engine: V8
 *
 *  Num Vertices	Time(ms)
 *
 *     10           1
 *     20           3
 *     30           19
 *     40           48
 *     50           107
 */

THREE.ConvexGeometry = function( vertices ) {

	THREE.Geometry.call( this );

	var faces = [ [ 0, 1, 2 ], [ 0, 2, 1 ] ];

	for ( var i = 3; i < vertices.length; i++ ) {

		addPoint( i );

	}


	function addPoint( vertexId ) {

		var vertex = vertices[ vertexId ].clone();

		var mag = vertex.length();
		vertex.x += mag * randomOffset();
		vertex.y += mag * randomOffset();
		vertex.z += mag * randomOffset();

		var hole = [];

		for ( var f = 0; f < faces.length; ) {

			var face = faces[ f ];

			// for each face, if the vertex can see it,
			// then we try to add the face's edges into the hole.
			if ( visible( face, vertex ) ) {

				for ( var e = 0; e < 3; e++ ) {

					var edge = [ face[ e ], face[ ( e + 1 ) % 3 ] ];
					var boundary = true;

					// remove duplicated edges.
					for ( var h = 0; h < hole.length; h++ ) {

						if ( equalEdge( hole[ h ], edge ) ) {

							hole[ h ] = hole[ hole.length - 1 ];
							hole.pop();
							boundary = false;
							break;

						}

					}

					if ( boundary ) {

						hole.push( edge );

					}

				}

				// remove faces[ f ]
				faces[ f ] = faces[ faces.length - 1 ];
				faces.pop();

			} else { // not visible

				f++;

			}
		}

		// construct the new faces formed by the edges of the hole and the vertex
		for ( var h = 0; h < hole.length; h++ ) {

			faces.push( [
				hole[ h ][ 0 ],
				hole[ h ][ 1 ],
				vertexId
			] );

		}
	}

	/**
	 * Whether the face is visible from the vertex
	 */
	function visible( face, vertex ) {

		var va = vertices[ face[ 0 ] ];
		var vb = vertices[ face[ 1 ] ];
		var vc = vertices[ face[ 2 ] ];

		var n = normal( va, vb, vc );

		// distance from face to origin
		var dist = n.dot( va );

		return n.dot( vertex ) >= dist;

	}

	/**
	 * Face normal
	 */
	function normal( va, vb, vc ) {

		var cb = new THREE.Vector3();
		var ab = new THREE.Vector3();

		cb.sub( vc, vb );
		ab.sub( va, vb );
		cb.crossSelf( ab );

		cb.normalize();

		return cb;

	}

	/**
	 * Detect whether two edges are equal.
	 * Note that when constructing the convex hull, two same edges can only
	 * be of the negative direction.
	 */
	function equalEdge( ea, eb ) {

		return ea[ 0 ] === eb[ 1 ] && ea[ 1 ] === eb[ 0 ];

	}

	/**
	 * Create a random offset between -1e-6 and 1e-6.
	 */
	function randomOffset() {

		return ( Math.random() - 0.5 ) * 2 * 1e-6;

	}


	/**
	 * XXX: Not sure if this is the correct approach. Need someone to review.
	 */
	function vertexUv( vertex ) {

		var mag = vertex.length();
		return new THREE.UV( vertex.x / mag, vertex.y / mag );

	}

	// Push vertices into `this.vertices`, skipping those inside the hull
	var id = 0;
	var newId = new Array( vertices.length ); // map from old vertex id to new id

	for ( var i = 0; i < faces.length; i++ ) {

		 var face = faces[ i ];

		 for ( var j = 0; j < 3; j++ ) {

				if ( newId[ face[ j ] ] === undefined ) {

						newId[ face[ j ] ] = id++;
						this.vertices.push( vertices[ face[ j ] ] );

				}

				face[ j ] = newId[ face[ j ] ];

		 }

	}

	// Convert faces into instances of THREE.Face3
	for ( var i = 0; i < faces.length; i++ ) {

		this.faces.push( new THREE.Face3(
				faces[ i ][ 0 ],
				faces[ i ][ 1 ],
				faces[ i ][ 2 ]
		) );

	}

	// Compute UVs
	for ( var i = 0; i < this.faces.length; i++ ) {

		var face = this.faces[ i ];

		this.faceVertexUvs[ 0 ].push( [
			vertexUv( this.vertices[ face.a ] ),
			vertexUv( this.vertices[ face.b ] ),
			vertexUv( this.vertices[ face.c ])
		] );

	}


	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.ConvexGeometry.prototype = Object.create( THREE.Geometry.prototype );
/**
 * @author sroucheray / http://sroucheray.org/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.AxisHelper = function ( size ) {

	var geometry = new THREE.Geometry();

	geometry.vertices.push(
		new THREE.Vector3(), new THREE.Vector3( size || 1, 0, 0 ),
		new THREE.Vector3(), new THREE.Vector3( 0, size || 1, 0 ),
		new THREE.Vector3(), new THREE.Vector3( 0, 0, size || 1 )
	);

	geometry.colors.push(
		new THREE.Color( 0xff0000 ), new THREE.Color( 0xffaa00 ),
		new THREE.Color( 0x00ff00 ), new THREE.Color( 0xaaff00 ),
		new THREE.Color( 0x0000ff ), new THREE.Color( 0x00aaff )
	);

	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	THREE.Line.call( this, geometry, material, THREE.LinePieces );

};

THREE.AxisHelper.prototype = Object.create( THREE.Line.prototype );
/**
 * @author WestLangley / http://github.com/WestLangley
 * @author zz85 / https://github.com/zz85
 *
 * Creates an arrow for visualizing directions
 *
 * Parameters:
 *  dir - Vector3
 *  origin - Vector3
 *  length - Number
 *  hex - color in hex value
 */

THREE.ArrowHelper = function ( dir, origin, length, hex ) {

	THREE.Object3D.call( this );

	if ( hex === undefined ) hex = 0xffff00;
	if ( length === undefined ) length = 20;

	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
	lineGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );

	this.line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: hex } ) );
	this.add( this.line );

	var coneGeometry = new THREE.CylinderGeometry( 0, 0.05, 0.25, 5, 1 );

	this.cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color: hex } ) );
	this.cone.position.set( 0, 1, 0 );
	this.add( this.cone );

	if ( origin instanceof THREE.Vector3 ) this.position = origin;

	this.setDirection( dir );
	this.setLength( length );

};

THREE.ArrowHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.ArrowHelper.prototype.setDirection = function ( dir ) {

	var axis = new THREE.Vector3( 0, 1, 0 ).crossSelf( dir );

	var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir.clone().normalize() ) );

	this.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );

	this.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );

};

THREE.ArrowHelper.prototype.setLength = function ( length ) {

	this.scale.set( length, length, length );

};

THREE.ArrowHelper.prototype.setColor = function ( hex ) {

	this.line.material.color.setHex( hex );
	this.cone.material.color.setHex( hex );

};
/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows frustum, line of sight and up of the camera
 *	- suitable for fast updates
 * 	- based on frustum visualization in lightgl.js shadowmap example
 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
 */

THREE.CameraHelper = function ( camera ) {

	THREE.Line.call( this );

	var scope = this;

	this.geometry = new THREE.Geometry();
	this.material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
	this.type = THREE.LinePieces;

	this.matrixWorld = camera.matrixWorld;
	this.matrixAutoUpdate = false;

	this.pointMap = {};

	// colors

	var hexFrustum = 0xffaa00;
	var hexCone = 0xff0000;
	var hexUp = 0x00aaff;
	var hexTarget = 0xffffff;
	var hexCross = 0x333333;

	// near

	addLine( "n1", "n2", hexFrustum );
	addLine( "n2", "n4", hexFrustum );
	addLine( "n4", "n3", hexFrustum );
	addLine( "n3", "n1", hexFrustum );

	// far

	addLine( "f1", "f2", hexFrustum );
	addLine( "f2", "f4", hexFrustum );
	addLine( "f4", "f3", hexFrustum );
	addLine( "f3", "f1", hexFrustum );

	// sides

	addLine( "n1", "f1", hexFrustum );
	addLine( "n2", "f2", hexFrustum );
	addLine( "n3", "f3", hexFrustum );
	addLine( "n4", "f4", hexFrustum );

	// cone

	addLine( "p", "n1", hexCone );
	addLine( "p", "n2", hexCone );
	addLine( "p", "n3", hexCone );
	addLine( "p", "n4", hexCone );

	// up

	addLine( "u1", "u2", hexUp );
	addLine( "u2", "u3", hexUp );
	addLine( "u3", "u1", hexUp );

	// target

	addLine( "c", "t", hexTarget );
	addLine( "p", "c", hexCross );

	// cross

	addLine( "cn1", "cn2", hexCross );
	addLine( "cn3", "cn4", hexCross );

	addLine( "cf1", "cf2", hexCross );
	addLine( "cf3", "cf4", hexCross );

	this.camera = camera;

	function addLine( a, b, hex ) {

		addPoint( a, hex );
		addPoint( b, hex );

	}

	function addPoint( id, hex ) {

		scope.geometry.vertices.push( new THREE.Vector3() );
		scope.geometry.colors.push( new THREE.Color( hex ) );

		if ( scope.pointMap[ id ] === undefined ) scope.pointMap[ id ] = [];

		scope.pointMap[ id ].push( scope.geometry.vertices.length - 1 );

	}

	this.update( camera );

};

THREE.CameraHelper.prototype = Object.create( THREE.Line.prototype );

THREE.CameraHelper.prototype.update = function () {

	var scope = this;

	var w = 1, h = 1;

	// we need just camera projection matrix
	// world matrix must be identity

	THREE.CameraHelper.__c.projectionMatrix.copy( this.camera.projectionMatrix );

	// center / target

	setPoint( "c", 0, 0, -1 );
	setPoint( "t", 0, 0,  1 );

	// near

	setPoint( "n1", -w, -h, -1 );
	setPoint( "n2",  w, -h, -1 );
	setPoint( "n3", -w,  h, -1 );
	setPoint( "n4",  w,  h, -1 );

	// far

	setPoint( "f1", -w, -h, 1 );
	setPoint( "f2",  w, -h, 1 );
	setPoint( "f3", -w,  h, 1 );
	setPoint( "f4",  w,  h, 1 );

	// up

	setPoint( "u1",  w * 0.7, h * 1.1, -1 );
	setPoint( "u2", -w * 0.7, h * 1.1, -1 );
	setPoint( "u3",        0, h * 2,   -1 );

	// cross

	setPoint( "cf1", -w,  0, 1 );
	setPoint( "cf2",  w,  0, 1 );
	setPoint( "cf3",  0, -h, 1 );
	setPoint( "cf4",  0,  h, 1 );

	setPoint( "cn1", -w,  0, -1 );
	setPoint( "cn2",  w,  0, -1 );
	setPoint( "cn3",  0, -h, -1 );
	setPoint( "cn4",  0,  h, -1 );

	function setPoint( point, x, y, z ) {

		THREE.CameraHelper.__v.set( x, y, z );
		THREE.CameraHelper.__projector.unprojectVector( THREE.CameraHelper.__v, THREE.CameraHelper.__c );

		var points = scope.pointMap[ point ];

		if ( points !== undefined ) {

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				scope.geometry.vertices[ points[ i ] ].copy( THREE.CameraHelper.__v );

			}

		}

	}

	this.geometry.verticesNeedUpdate = true;

};

THREE.CameraHelper.__projector = new THREE.Projector();
THREE.CameraHelper.__v = new THREE.Vector3();
THREE.CameraHelper.__c = new THREE.Camera();

/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows directional light color, intensity, position, orientation and target
 */

THREE.DirectionalLightHelper = function ( light, sphereSize, arrowLength ) {

	THREE.Object3D.call( this );

	this.light = light;

	// position

	this.position = light.position;

	// direction

	this.direction = new THREE.Vector3();
	this.direction.sub( light.target.position, light.position );

	// color

	this.color = light.color.clone();

	var intensity = THREE.Math.clamp( light.intensity, 0, 1 );

	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	var hexColor = this.color.getHex();

	// light helper

	var bulbGeometry = new THREE.SphereGeometry( sphereSize, 16, 8 );
	var raysGeometry = new THREE.AsteriskGeometry( sphereSize * 1.25, sphereSize * 2.25 );

	var bulbMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false } );
	var raysMaterial = new THREE.LineBasicMaterial( { color: hexColor, fog: false } );

	this.lightArrow = new THREE.ArrowHelper( this.direction, null, arrowLength, hexColor );
	this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );

	this.lightArrow.cone.material.fog = false;
	this.lightArrow.line.material.fog = false;

	this.lightRays = new THREE.Line( raysGeometry, raysMaterial, THREE.LinePieces );

	this.add( this.lightArrow );
	this.add( this.lightSphere );
	this.add( this.lightRays );

	this.lightSphere.properties.isGizmo = true;
	this.lightSphere.properties.gizmoSubject = light;
	this.lightSphere.properties.gizmoRoot = this;

	// light target helper

	this.targetSphere = null;

	if ( light.target.properties.targetInverse ) {

		var targetGeo = new THREE.SphereGeometry( sphereSize, 8, 4 );
		var targetMaterial = new THREE.MeshBasicMaterial( { color: hexColor, wireframe: true, fog: false } );

		this.targetSphere = new THREE.Mesh( targetGeo, targetMaterial );
		this.targetSphere.position = light.target.position;

		this.targetSphere.properties.isGizmo = true;
		this.targetSphere.properties.gizmoSubject = light.target;
		this.targetSphere.properties.gizmoRoot = this.targetSphere;

		var lineMaterial = new THREE.LineDashedMaterial( { color: hexColor, dashSize: 4, gapSize: 4, opacity: 0.75, transparent: true, fog: false } );
		var lineGeometry = new THREE.Geometry();
		lineGeometry.vertices.push( this.position.clone() );
		lineGeometry.vertices.push( this.targetSphere.position.clone() );
		lineGeometry.computeLineDistances();

		this.targetLine = new THREE.Line( lineGeometry, lineMaterial );
		this.targetLine.properties.isGizmo = true;

	}

	//

	this.properties.isGizmo = true;

}

THREE.DirectionalLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.DirectionalLightHelper.prototype.update = function () {

	// update arrow orientation
	// pointing from light to target

	this.direction.sub( this.light.target.position, this.light.position );
	this.lightArrow.setDirection( this.direction );

	// update arrow, spheres, rays and line colors to light color * light intensity

	this.color.copy( this.light.color );

	var intensity = THREE.Math.clamp( this.light.intensity, 0, 1 );
	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	this.lightArrow.setColor( this.color.getHex() );
	this.lightSphere.material.color.copy( this.color );
	this.lightRays.material.color.copy( this.color );

	this.targetSphere.material.color.copy( this.color );
	this.targetLine.material.color.copy( this.color );

	// update target line vertices

	this.targetLine.geometry.vertices[ 0 ].copy( this.light.position );
	this.targetLine.geometry.vertices[ 1 ].copy( this.light.target.position );

	this.targetLine.geometry.computeLineDistances();
	this.targetLine.geometry.verticesNeedUpdate = true;

}

/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows hemisphere light intensity, sky and ground colors and directions
 */

THREE.HemisphereLightHelper = function ( light, sphereSize, arrowLength, domeSize ) {

	THREE.Object3D.call( this );

	this.light = light;

	// position

	this.position = light.position;

	//

	var intensity = THREE.Math.clamp( light.intensity, 0, 1 );

	// sky color

	this.color = light.color.clone();

	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	var hexColor = this.color.getHex();

	// ground color

	this.groundColor = light.groundColor.clone();

	this.groundColor.r *= intensity;
	this.groundColor.g *= intensity;
	this.groundColor.b *= intensity;

	var hexColorGround = this.groundColor.getHex();

	// double colored light bulb

	var bulbGeometry = new THREE.SphereGeometry( sphereSize, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5 );
	var bulbGroundGeometry = new THREE.SphereGeometry( sphereSize, 16, 8, 0, Math.PI * 2, Math.PI * 0.5, Math.PI );

	var bulbSkyMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false } );
	var bulbGroundMaterial = new THREE.MeshBasicMaterial( { color: hexColorGround, fog: false } );

	for ( var i = 0, il = bulbGeometry.faces.length; i < il; i ++ ) {

		bulbGeometry.faces[ i ].materialIndex = 0;

	}

	for ( var i = 0, il = bulbGroundGeometry.faces.length; i < il; i ++ ) {

		bulbGroundGeometry.faces[ i ].materialIndex = 1;

	}

	THREE.GeometryUtils.merge( bulbGeometry, bulbGroundGeometry );

	this.lightSphere = new THREE.Mesh( bulbGeometry, new THREE.MeshFaceMaterial( [ bulbSkyMaterial, bulbGroundMaterial ] ) );

	// arrows for sky and ground light directions

	this.lightArrow = new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, ( sphereSize + arrowLength ) * 1.1, 0 ), arrowLength, hexColor );
	this.lightArrow.rotation.x = Math.PI;

	this.lightArrowGround = new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, ( sphereSize + arrowLength ) * -1.1, 0 ), arrowLength, hexColorGround );

	var joint = new THREE.Object3D();
	joint.rotation.x = -Math.PI * 0.5;

	joint.add( this.lightSphere );
	joint.add( this.lightArrow );
	joint.add( this.lightArrowGround );

	this.add( joint );

	//

	this.lightSphere.properties.isGizmo = true;
	this.lightSphere.properties.gizmoSubject = light;
	this.lightSphere.properties.gizmoRoot = this;

	//

	this.properties.isGizmo = true;

	//

	this.target = new THREE.Vector3();
	this.lookAt( this.target );

}

THREE.HemisphereLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.HemisphereLightHelper.prototype.update = function () {

	// update sphere sky and ground colors to light color * light intensity

	var intensity = THREE.Math.clamp( this.light.intensity, 0, 1 );

	this.color.copy( this.light.color );
	this.groundColor.copy( this.light.groundColor );

	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	this.groundColor.r *= intensity;
	this.groundColor.g *= intensity;
	this.groundColor.b *= intensity;

	this.lightSphere.material.materials[ 0 ].color.copy( this.color );
	this.lightSphere.material.materials[ 1 ].color.copy( this.groundColor );

	this.lightArrow.setColor( this.color.getHex() );
	this.lightArrowGround.setColor( this.groundColor.getHex() );

	this.lookAt( this.target );

}

/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows point light color, intensity, position and distance
 */

THREE.PointLightHelper = function ( light, sphereSize ) {

	THREE.Object3D.call( this );

	this.light = light;

	// position

	this.position = light.position;

	// color

	this.color = light.color.clone();

	var intensity = THREE.Math.clamp( light.intensity, 0, 1 );

	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	var hexColor = this.color.getHex();

	// light helper

	var bulbGeometry = new THREE.SphereGeometry( sphereSize, 16, 8 );
	var raysGeometry = new THREE.AsteriskGeometry( sphereSize * 1.25, sphereSize * 2.25 );
	var distanceGeometry = new THREE.IcosahedronGeometry( 1, 2 );

	var bulbMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false } );
	var raysMaterial = new THREE.LineBasicMaterial( { color: hexColor, fog: false } );
	var distanceMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false, wireframe: true, opacity: 0.1, transparent: true } );

	this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );
	this.lightRays = new THREE.Line( raysGeometry, raysMaterial, THREE.LinePieces );
	this.lightDistance = new THREE.Mesh( distanceGeometry, distanceMaterial );

	var d = light.distance;

	if ( d === 0.0 ) {

		this.lightDistance.visible = false;

	} else {

		this.lightDistance.scale.set( d, d, d );

	}

	this.add( this.lightSphere );
	this.add( this.lightRays );
	this.add( this.lightDistance );

	//

	this.lightSphere.properties.isGizmo = true;
	this.lightSphere.properties.gizmoSubject = light;
	this.lightSphere.properties.gizmoRoot = this;

	//

	this.properties.isGizmo = true;

}

THREE.PointLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.PointLightHelper.prototype.update = function () {

	// update sphere and rays colors to light color * light intensity

	this.color.copy( this.light.color );

	var intensity = THREE.Math.clamp( this.light.intensity, 0, 1 );
	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	this.lightSphere.material.color.copy( this.color );
	this.lightRays.material.color.copy( this.color );
	this.lightDistance.material.color.copy( this.color );

	//

	var d = this.light.distance;

	if ( d === 0.0 ) {

		this.lightDistance.visible = false;

	} else {

		this.lightDistance.visible = true;
		this.lightDistance.scale.set( d, d, d );

	}

}

/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows spot light color, intensity, position, orientation, light cone and target
 */

THREE.SpotLightHelper = function ( light, sphereSize, arrowLength ) {

	THREE.Object3D.call( this );

	this.light = light;

	// position

	this.position = light.position;

	// direction

	this.direction = new THREE.Vector3();
	this.direction.sub( light.target.position, light.position );

	// color

	this.color = light.color.clone();

	var intensity = THREE.Math.clamp( light.intensity, 0, 1 );

	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	var hexColor = this.color.getHex();

	// light helper

	var bulbGeometry = new THREE.SphereGeometry( sphereSize, 16, 8 );
	var raysGeometry = new THREE.AsteriskGeometry( sphereSize * 1.25, sphereSize * 2.25 );
	var coneGeometry = new THREE.CylinderGeometry( 0.0001, 1, 1, 8, 1, true );

	var coneMatrix = new THREE.Matrix4();
	coneMatrix.rotateX( -Math.PI/2 );
	coneMatrix.translate( new THREE.Vector3( 0, -0.5, 0 ) );
	coneGeometry.applyMatrix( coneMatrix );

	var bulbMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false } );
	var raysMaterial = new THREE.LineBasicMaterial( { color: hexColor, fog: false } );
	var coneMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false, wireframe: true, opacity: 0.3, transparent: true } );

	this.lightArrow = new THREE.ArrowHelper( this.direction, null, arrowLength, hexColor );
	this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );
	this.lightCone = new THREE.Mesh( coneGeometry, coneMaterial );

	var coneLength = light.distance ? light.distance : 10000;
	var coneWidth = coneLength * Math.tan( light.angle * 0.5 ) * 2;
	this.lightCone.scale.set( coneWidth, coneWidth, coneLength );

	this.lightArrow.cone.material.fog = false;
	this.lightArrow.line.material.fog = false;

	this.lightRays = new THREE.Line( raysGeometry, raysMaterial, THREE.LinePieces );

	this.gyroscope = new THREE.Gyroscope();

	this.gyroscope.add( this.lightArrow );
	this.gyroscope.add( this.lightSphere );
	this.gyroscope.add( this.lightRays );

	this.add( this.gyroscope );
	this.add( this.lightCone );

	this.lookAt( light.target.position );

	this.lightSphere.properties.isGizmo = true;
	this.lightSphere.properties.gizmoSubject = light;
	this.lightSphere.properties.gizmoRoot = this;

	// light target helper

	this.targetSphere = null;

	if ( light.target.properties.targetInverse ) {

		var targetGeo = new THREE.SphereGeometry( sphereSize, 8, 4 );
		var targetMaterial = new THREE.MeshBasicMaterial( { color: hexColor, wireframe: true, fog: false } );

		this.targetSphere = new THREE.Mesh( targetGeo, targetMaterial );
		this.targetSphere.position = light.target.position;

		this.targetSphere.properties.isGizmo = true;
		this.targetSphere.properties.gizmoSubject = light.target;
		this.targetSphere.properties.gizmoRoot = this.targetSphere;

		var lineMaterial = new THREE.LineDashedMaterial( { color: hexColor, dashSize: 4, gapSize: 4, opacity: 0.75, transparent: true, fog: false } );
		var lineGeometry = new THREE.Geometry();
		lineGeometry.vertices.push( this.position.clone() );
		lineGeometry.vertices.push( this.targetSphere.position.clone() );
		lineGeometry.computeLineDistances();

		this.targetLine = new THREE.Line( lineGeometry, lineMaterial );
		this.targetLine.properties.isGizmo = true;

	}

	//

	this.properties.isGizmo = true;

}

THREE.SpotLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.SpotLightHelper.prototype.update = function () {

	// update arrow orientation
	// pointing from light to target

	this.direction.sub( this.light.target.position, this.light.position );
	this.lightArrow.setDirection( this.direction );

	// update light cone orientation and size

	this.lookAt( this.light.target.position );

	var coneLength = this.light.distance ? this.light.distance : 10000;
	var coneWidth = coneLength * Math.tan( this.light.angle * 0.5 ) * 2;
	this.lightCone.scale.set( coneWidth, coneWidth, coneLength );

	// update arrow, spheres, rays and line colors to light color * light intensity

	this.color.copy( this.light.color );

	var intensity = THREE.Math.clamp( this.light.intensity, 0, 1 );
	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	this.lightArrow.setColor( this.color.getHex() );
	this.lightSphere.material.color.copy( this.color );
	this.lightRays.material.color.copy( this.color );
	this.lightCone.material.color.copy( this.color );

	this.targetSphere.material.color.copy( this.color );
	this.targetLine.material.color.copy( this.color );

	// update target line vertices

	this.targetLine.geometry.vertices[ 0 ].copy( this.light.position );
	this.targetLine.geometry.vertices[ 1 ].copy( this.light.target.position );

	this.targetLine.geometry.computeLineDistances();
	this.targetLine.geometry.verticesNeedUpdate = true;

}

/*
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *
 *	Subdivision Geometry Modifier
 *		using Catmull-Clark Subdivision Surfaces
 *		for creating smooth geometry meshes
 *
 *	Note: a modifier modifies vertices and faces of geometry,
 *		so use geometry.clone() if original geometry needs to be retained
 *
 *	Readings:
 *		http://en.wikipedia.org/wiki/Catmull%E2%80%93Clark_subdivision_surface
 *		http://www.rorydriscoll.com/2008/08/01/catmull-clark-subdivision-the-basics/
 *		http://xrt.wikidot.com/blog:31
 *		"Subdivision Surfaces in Character Animation"
 *
 *		(on boundary edges)
 *		http://rosettacode.org/wiki/Catmull%E2%80%93Clark_subdivision_surface
 *		https://graphics.stanford.edu/wikis/cs148-09-summer/Assignment3Description
 *
 *	Supports:
 *		Closed and Open geometries.
 *
 *	TODO:
 *		crease vertex and "semi-sharp" features
 *		selective subdivision
 */


THREE.SubdivisionModifier = function( subdivisions ) {

	this.subdivisions = (subdivisions === undefined ) ? 1 : subdivisions;

	// Settings
	this.useOldVertexColors = false;
	this.supportUVs = true;
	this.debug = false;

};

// Applies the "modify" pattern
THREE.SubdivisionModifier.prototype.modify = function ( geometry ) {

	var repeats = this.subdivisions;

	while ( repeats-- > 0 ) {
		this.smooth( geometry );
	}

};

/// REFACTORING THIS OUT

THREE.GeometryUtils.orderedKey = function ( a, b ) {

	return Math.min( a, b ) + "_" + Math.max( a, b );

};


// Returns a hashmap - of { edge_key: face_index }
THREE.GeometryUtils.computeEdgeFaces = function ( geometry ) {

	var i, il, v1, v2, j, k,
		face, faceIndices, faceIndex,
		edge,
		hash,
		edgeFaceMap = {};

	var orderedKey = THREE.GeometryUtils.orderedKey;

	function mapEdgeHash( hash, i ) {

		if ( edgeFaceMap[ hash ] === undefined ) {

			edgeFaceMap[ hash ] = [];

		}

		edgeFaceMap[ hash ].push( i );
	}


	// construct vertex -> face map

	for( i = 0, il = geometry.faces.length; i < il; i ++ ) {

		face = geometry.faces[ i ];

		if ( face instanceof THREE.Face3 ) {

			hash = orderedKey( face.a, face.b );
			mapEdgeHash( hash, i );

			hash = orderedKey( face.b, face.c );
			mapEdgeHash( hash, i );

			hash = orderedKey( face.c, face.a );
			mapEdgeHash( hash, i );

		} else if ( face instanceof THREE.Face4 ) {

			hash = orderedKey( face.a, face.b );
			mapEdgeHash( hash, i );

			hash = orderedKey( face.b, face.c );
			mapEdgeHash( hash, i );

			hash = orderedKey( face.c, face.d );
			mapEdgeHash( hash, i );

			hash = orderedKey( face.d, face.a );
			mapEdgeHash( hash, i );

		}

	}

	// extract faces

	// var edges = [];
	//
	// var numOfEdges = 0;
	// for (i in edgeFaceMap) {
	// 	numOfEdges++;
	//
	// 	edge = edgeFaceMap[i];
	// 	edges.push(edge);
	//
	// }

	//debug('edgeFaceMap', edgeFaceMap, 'geometry.edges',geometry.edges, 'numOfEdges', numOfEdges);

	return edgeFaceMap;

}

/////////////////////////////

// Performs an iteration of Catmull-Clark Subdivision
THREE.SubdivisionModifier.prototype.smooth = function ( oldGeometry ) {

	//debug( 'running smooth' );

	// New set of vertices, faces and uvs
	var newVertices = [], newFaces = [], newUVs = [];

	function v( x, y, z ) {
		newVertices.push( new THREE.Vector3( x, y, z ) );
	}

	var scope = this;
	var orderedKey = THREE.GeometryUtils.orderedKey;
	var computeEdgeFaces = THREE.GeometryUtils.computeEdgeFaces;

	function assert() {

		if (scope.debug && console && console.assert) console.assert.apply(console, arguments);

	}

	function debug() {

		if (scope.debug) console.log.apply(console, arguments);

	}

	function warn() {

		if (console)
		console.log.apply(console, arguments);

	}

	function f4( a, b, c, d, oldFace, orders, facei ) {

		// TODO move vertex selection over here!

		var newFace = new THREE.Face4( a, b, c, d, null, oldFace.color, oldFace.materialIndex );

		if (scope.useOldVertexColors) {

			newFace.vertexColors = [];

			var color, tmpColor, order;

			for (var i=0;i<4;i++) {

				order = orders[i];

				color = new THREE.Color(),
				color.setRGB(0,0,0);

				for (var j=0, jl=0; j<order.length;j++) {
					tmpColor = oldFace.vertexColors[order[j]-1];
					color.r += tmpColor.r;
					color.g += tmpColor.g;
					color.b += tmpColor.b;
				}

				color.r /= order.length;
				color.g /= order.length;
				color.b /= order.length;

				newFace.vertexColors[i] = color;

			}

		}

		newFaces.push( newFace );

		if (scope.supportUVs) {

			var aUv = [
				getUV(a, ''),
				getUV(b, facei),
				getUV(c, facei),
				getUV(d, facei)
			];

			if (!aUv[0]) debug('a :( ', a+':'+facei);
			else if (!aUv[1]) debug('b :( ', b+':'+facei);
			else if (!aUv[2]) debug('c :( ', c+':'+facei);
			else if (!aUv[3]) debug('d :( ', d+':'+facei);
			else
				newUVs.push( aUv );

		}
	}

	var originalPoints = oldGeometry.vertices;
	var originalFaces = oldGeometry.faces;
	var originalVerticesLength = originalPoints.length;

	var newPoints = originalPoints.concat(); // New set of vertices to work on

	var facePoints = [], // these are new points on exisiting faces
		edgePoints = {}; // these are new points on exisiting edges

	var sharpEdges = {}, sharpVertices = []; // Mark edges and vertices to prevent smoothening on them
	// TODO: handle this correctly.

	var uvForVertices = {}; // Stored in {vertex}:{old face} format


	function debugCoreStuff() {

		console.log('facePoints', facePoints, 'edgePoints', edgePoints);
		console.log('edgeFaceMap', edgeFaceMap, 'vertexEdgeMap', vertexEdgeMap);

	}

	function getUV(vertexNo, oldFaceNo) {
		var j,jl;

		var key = vertexNo+':'+oldFaceNo;
		var theUV = uvForVertices[key];

		if (!theUV) {
			if (vertexNo>=originalVerticesLength && vertexNo < (originalVerticesLength + originalFaces.length)) {
				debug('face pt');
			} else {
				debug('edge pt');
			}

			warn('warning, UV not found for', key);

			return null;
		}

		return theUV;

		// Original faces -> Vertex Nos.
		// new Facepoint -> Vertex Nos.
		// edge Points

	}

	function addUV(vertexNo, oldFaceNo, value) {

		var key = vertexNo+':'+oldFaceNo;
		if (!(key in uvForVertices)) {
			uvForVertices[key] = value;
		} else {
			warn('dup vertexNo', vertexNo, 'oldFaceNo', oldFaceNo, 'value', value, 'key', key, uvForVertices[key]);
		}
	}

	// Step 1
	//	For each face, add a face point
	//	Set each face point to be the centroid of all original points for the respective face.
	// debug(oldGeometry);
	var i, il, j, jl, face;

	// For Uvs
	var uvs = oldGeometry.faceVertexUvs[0];
	var abcd = 'abcd', vertice;

	debug('originalFaces, uvs, originalVerticesLength', originalFaces.length, uvs.length, originalVerticesLength);

	if (scope.supportUVs)

	for (i=0, il = uvs.length; i<il; i++ ) {

		for (j=0,jl=uvs[i].length;j<jl;j++) {

			vertice = originalFaces[i][abcd.charAt(j)];
			addUV(vertice, i, uvs[i][j]);

		}

	}

	if (uvs.length == 0) scope.supportUVs = false;

	// Additional UVs check, if we index original
	var uvCount = 0;
	for (var u in uvForVertices) {
		uvCount++;
	}
	if (!uvCount) {
		scope.supportUVs = false;
		debug('no uvs');
	}

	var avgUv ;

	for (i=0, il = originalFaces.length; i<il ;i++) {

		face = originalFaces[ i ];
		facePoints.push( face.centroid );
		newPoints.push( face.centroid );

		if (!scope.supportUVs) continue;

		// Prepare subdivided uv

		avgUv = new THREE.UV();

		if ( face instanceof THREE.Face3 ) {

			avgUv.u = getUV( face.a, i ).u + getUV( face.b, i ).u + getUV( face.c, i ).u;
			avgUv.v = getUV( face.a, i ).v + getUV( face.b, i ).v + getUV( face.c, i ).v;
			avgUv.u /= 3;
			avgUv.v /= 3;

		} else if ( face instanceof THREE.Face4 ) {

			avgUv.u = getUV( face.a, i ).u + getUV( face.b, i ).u + getUV( face.c, i ).u + getUV( face.d, i ).u;
			avgUv.v = getUV( face.a, i ).v + getUV( face.b, i ).v + getUV( face.c, i ).v + getUV( face.d, i ).v;
			avgUv.u /= 4;
			avgUv.v /= 4;

		}

		addUV(originalVerticesLength + i, '', avgUv);

	}

	// Step 2
	//	For each edge, add an edge point.
	//	Set each edge point to be the average of the two neighbouring face points and its two original endpoints.

	var edgeFaceMap = computeEdgeFaces ( oldGeometry ); // Edge Hash -> Faces Index  eg { edge_key: [face_index, face_index2 ]}
	var edge, faceIndexA, faceIndexB, avg;

	// debug('edgeFaceMap', edgeFaceMap);

	var edgeCount = 0;

	var edgeVertex, edgeVertexA, edgeVertexB;

	////

	var vertexEdgeMap = {}; // Gives edges connecting from each vertex
	var vertexFaceMap = {}; // Gives faces connecting from each vertex

	function addVertexEdgeMap(vertex, edge) {

		if (vertexEdgeMap[vertex]===undefined) {

			vertexEdgeMap[vertex] = [];

		}

		vertexEdgeMap[vertex].push(edge);
	}

	function addVertexFaceMap(vertex, face, edge) {

		if (vertexFaceMap[vertex]===undefined) {

			vertexFaceMap[vertex] = {};

		}

		vertexFaceMap[vertex][face] = edge;
		// vertexFaceMap[vertex][face] = null;
	}

	// Prepares vertexEdgeMap and vertexFaceMap
	for (i in edgeFaceMap) { // This is for every edge
		edge = edgeFaceMap[i];

		edgeVertex = i.split('_');
		edgeVertexA = edgeVertex[0];
		edgeVertexB = edgeVertex[1];

		// Maps an edgeVertex to connecting edges
		addVertexEdgeMap(edgeVertexA, [edgeVertexA, edgeVertexB] );
		addVertexEdgeMap(edgeVertexB, [edgeVertexA, edgeVertexB] );

		for (j=0,jl=edge.length;j<jl;j++) {

			face = edge[j];
			addVertexFaceMap(edgeVertexA, face, i);
			addVertexFaceMap(edgeVertexB, face, i);

		}

		// {edge vertex: { face1: edge_key, face2: edge_key.. } }

		// this thing is fishy right now.
		if (edge.length < 2) {

			// edge is "sharp";
			sharpEdges[i] = true;
			sharpVertices[edgeVertexA] = true;
			sharpVertices[edgeVertexB] = true;

		}

	}

	for (i in edgeFaceMap) {

		edge = edgeFaceMap[i];

		faceIndexA = edge[0]; // face index a
		faceIndexB = edge[1]; // face index b

		edgeVertex = i.split('_');
		edgeVertexA = edgeVertex[0];
		edgeVertexB = edgeVertex[1];

		avg = new THREE.Vector3();

		//debug(i, faceIndexB,facePoints[faceIndexB]);

		assert(edge.length > 0, 'an edge without faces?!');

		if (edge.length==1) {

			avg.addSelf(originalPoints[edgeVertexA]);
			avg.addSelf(originalPoints[edgeVertexB]);
			avg.multiplyScalar(0.5);

			sharpVertices[newPoints.length] = true;

		} else {

			avg.addSelf(facePoints[faceIndexA]);
			avg.addSelf(facePoints[faceIndexB]);

			avg.addSelf(originalPoints[edgeVertexA]);
			avg.addSelf(originalPoints[edgeVertexB]);

			avg.multiplyScalar(0.25);

		}

		edgePoints[i] = originalVerticesLength + originalFaces.length + edgeCount;

		newPoints.push( avg );

		edgeCount ++;

		if (!scope.supportUVs) {
			continue;
		}

		// Prepare subdivided uv

		avgUv = new THREE.UV();

		avgUv.u = getUV(edgeVertexA, faceIndexA).u + getUV(edgeVertexB, faceIndexA).u;
		avgUv.v = getUV(edgeVertexA, faceIndexA).v + getUV(edgeVertexB, faceIndexA).v;
		avgUv.u /= 2;
		avgUv.v /= 2;

		addUV(edgePoints[i], faceIndexA, avgUv);

		if (edge.length>=2) {
			assert(edge.length == 2, 'did we plan for more than 2 edges?');
			avgUv = new THREE.UV();

			avgUv.u = getUV(edgeVertexA, faceIndexB).u + getUV(edgeVertexB, faceIndexB).u;
			avgUv.v = getUV(edgeVertexA, faceIndexB).v + getUV(edgeVertexB, faceIndexB).v;
			avgUv.u /= 2;
			avgUv.v /= 2;

			addUV(edgePoints[i], faceIndexB, avgUv);
		}

	}

	debug('-- Step 2 done');

	// Step 3
	//	For each face point, add an edge for every edge of the face,
	//	connecting the face point to each edge point for the face.

	var facePt, currentVerticeIndex;

	var hashAB, hashBC, hashCD, hashDA, hashCA;

	var abc123 = ['123', '12', '2', '23'];
	var bca123 = ['123', '23', '3', '31'];
	var cab123 = ['123', '31', '1', '12'];
	var abc1234 = ['1234', '12', '2', '23'];
	var bcd1234 = ['1234', '23', '3', '34'];
	var cda1234 = ['1234', '34', '4', '41'];
	var dab1234 = ['1234', '41', '1', '12'];

	for (i=0, il = facePoints.length; i<il ;i++) { // for every face
		facePt = facePoints[i];
		face = originalFaces[i];
		currentVerticeIndex = originalVerticesLength+ i;

		if ( face instanceof THREE.Face3 ) {

			// create 3 face4s

			hashAB = orderedKey( face.a, face.b );
			hashBC = orderedKey( face.b, face.c );
			hashCA = orderedKey( face.c, face.a );

			f4( currentVerticeIndex, edgePoints[hashAB], face.b, edgePoints[hashBC], face, abc123, i );
			f4( currentVerticeIndex, edgePoints[hashBC], face.c, edgePoints[hashCA], face, bca123, i );
			f4( currentVerticeIndex, edgePoints[hashCA], face.a, edgePoints[hashAB], face, cab123, i );

		} else if ( face instanceof THREE.Face4 ) {

			// create 4 face4s

			hashAB = orderedKey( face.a, face.b );
			hashBC = orderedKey( face.b, face.c );
			hashCD = orderedKey( face.c, face.d );
			hashDA = orderedKey( face.d, face.a );

			f4( currentVerticeIndex, edgePoints[hashAB], face.b, edgePoints[hashBC], face, abc1234, i );
			f4( currentVerticeIndex, edgePoints[hashBC], face.c, edgePoints[hashCD], face, bcd1234, i );
			f4( currentVerticeIndex, edgePoints[hashCD], face.d, edgePoints[hashDA], face, cda1234, i );
			f4( currentVerticeIndex, edgePoints[hashDA], face.a, edgePoints[hashAB], face, dab1234, i );


		} else {

			debug('face should be a face!', face);

		}

	}

	newVertices = newPoints;

	// Step 4

	//	For each original point P,
	//		take the average F of all n face points for faces touching P,
	//		and take the average R of all n edge midpoints for edges touching P,
	//		where each edge midpoint is the average of its two endpoint vertices.
	//	Move each original point to the point


	var F = new THREE.Vector3();
	var R = new THREE.Vector3();

	var n;
	for (i=0, il = originalPoints.length; i<il; i++) {
		// (F + 2R + (n-3)P) / n

		if (vertexEdgeMap[i]===undefined) continue;

		F.set(0,0,0);
		R.set(0,0,0);
		var newPos =  new THREE.Vector3(0,0,0);

		var f = 0; // this counts number of faces, original vertex is connected to (also known as valance?)
		for (j in vertexFaceMap[i]) {
			F.addSelf(facePoints[j]);
			f++;
		}

		var sharpEdgeCount = 0;

		n = vertexEdgeMap[i].length; // given a vertex, return its connecting edges

		// Are we on the border?
		var boundary_case = f != n;

		// if (boundary_case) {
		// 	console.error('moo', 'o', i, 'faces touched', f, 'edges',  n, n == 2);
		// }

		for (j=0;j<n;j++) {
			if (
				sharpEdges[
					orderedKey(vertexEdgeMap[i][j][0],vertexEdgeMap[i][j][1])
				]) {
					sharpEdgeCount++;
				}
		}

		// if ( sharpEdgeCount==2 ) {
		// 	continue;
		// 	// Do not move vertex if there's 2 connecting sharp edges.
		// }

		/*
		if (sharpEdgeCount>2) {
			// TODO
		}
		*/

		F.divideScalar(f);


		var boundary_edges = 0;

		if (boundary_case) {

			var bb_edge;
			for (j=0; j<n;j++) {
				edge = vertexEdgeMap[i][j];
				bb_edge = edgeFaceMap[orderedKey(edge[0], edge[1])].length == 1
				if (bb_edge) {
					var midPt = originalPoints[edge[0]].clone().addSelf(originalPoints[edge[1]]).divideScalar(2);
					R.addSelf(midPt);
					boundary_edges++;
				}
			}

			R.divideScalar(4);
			// console.log(j + ' --- ' + n + ' --- ' + boundary_edges);
			assert(boundary_edges == 2, 'should have only 2 boundary edges');

		} else {
			for (j=0; j<n;j++) {
				edge = vertexEdgeMap[i][j];
				var midPt = originalPoints[edge[0]].clone().addSelf(originalPoints[edge[1]]).divideScalar(2);
				R.addSelf(midPt);
			}

			R.divideScalar(n);
		}

		// Sum the formula
		newPos.addSelf(originalPoints[i]);


		if (boundary_case) {

			newPos.divideScalar(2);
			newPos.addSelf(R);

		} else {

			newPos.multiplyScalar(n - 3);

			newPos.addSelf(F);
			newPos.addSelf(R.multiplyScalar(2));
			newPos.divideScalar(n);

		}

		newVertices[i] = newPos;

	}

	var newGeometry = oldGeometry; // Let's pretend the old geometry is now new :P

	newGeometry.vertices = newVertices;
	newGeometry.faces = newFaces;
	newGeometry.faceVertexUvs[ 0 ] = newUVs;

	delete newGeometry.__tmpVertices; // makes __tmpVertices undefined :P

	newGeometry.computeCentroids();
	newGeometry.computeFaceNormals();
	newGeometry.computeVertexNormals();

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ImmediateRenderObject = function ( ) {

	THREE.Object3D.call( this );

	this.render = function ( renderCallback ) { };

};

THREE.ImmediateRenderObject.prototype = Object.create( THREE.Object3D.prototype );
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.LensFlare = function ( texture, size, distance, blending, color ) {

	THREE.Object3D.call( this );

	this.lensFlares = [];

	this.positionScreen = new THREE.Vector3();
	this.customUpdateCallback = undefined;

	if( texture !== undefined ) {

		this.add( texture, size, distance, blending, color );

	}

};

THREE.LensFlare.prototype = Object.create( THREE.Object3D.prototype );


/*
 * Add: adds another flare
 */

THREE.LensFlare.prototype.add = function ( texture, size, distance, blending, color, opacity ) {

	if( size === undefined ) size = -1;
	if( distance === undefined ) distance = 0;
	if( opacity === undefined ) opacity = 1;
	if( color === undefined ) color = new THREE.Color( 0xffffff );
	if( blending === undefined ) blending = THREE.NormalBlending;

	distance = Math.min( distance, Math.max( 0, distance ) );

	this.lensFlares.push( { texture: texture, 			// THREE.Texture
		                    size: size, 				// size in pixels (-1 = use texture.width)
		                    distance: distance, 		// distance (0-1) from light source (0=at light source)
		                    x: 0, y: 0, z: 0,			// screen position (-1 => 1) z = 0 is ontop z = 1 is back
		                    scale: 1, 					// scale
		                    rotation: 1, 				// rotation
		                    opacity: opacity,			// opacity
							color: color,				// color
		                    blending: blending } );		// blending

};


/*
 * Update lens flares update positions on all flares based on the screen position
 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.
 */

THREE.LensFlare.prototype.updateLensFlares = function () {

	var f, fl = this.lensFlares.length;
	var flare;
	var vecX = -this.positionScreen.x * 2;
	var vecY = -this.positionScreen.y * 2;

	for( f = 0; f < fl; f ++ ) {

		flare = this.lensFlares[ f ];

		flare.x = this.positionScreen.x + vecX * flare.distance;
		flare.y = this.positionScreen.y + vecY * flare.distance;

		flare.wantedRotation = flare.x * Math.PI * 0.25;
		flare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;

	}

};












/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MorphBlendMesh = function( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );

	this.animationsMap = {};
	this.animationsList = [];

	// prepare default animation
	// (all frames played together in 1 second)

	var numFrames = this.geometry.morphTargets.length;

	var name = "__default";

	var startFrame = 0;
	var endFrame = numFrames - 1;

	var fps = numFrames / 1;

	this.createAnimation( name, startFrame, endFrame, fps );
	this.setAnimationWeight( name, 1 );

};

THREE.MorphBlendMesh.prototype = Object.create( THREE.Mesh.prototype );

THREE.MorphBlendMesh.prototype.createAnimation = function ( name, start, end, fps ) {

	var animation = {

		startFrame: start,
		endFrame: end,

		length: end - start + 1,

		fps: fps,
		duration: ( end - start ) / fps,

		lastFrame: 0,
		currentFrame: 0,

		active: false,

		time: 0,
		direction: 1,
		weight: 1,

		directionBackwards: false,
		mirroredLoop: false

	};

	this.animationsMap[ name ] = animation;
	this.animationsList.push( animation );

};

THREE.MorphBlendMesh.prototype.autoCreateAnimations = function ( fps ) {

	var pattern = /([a-z]+)(\d+)/;

	var firstAnimation, frameRanges = {};

	var geometry = this.geometry;

	for ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {

		var morph = geometry.morphTargets[ i ];
		var chunks = morph.name.match( pattern );

		if ( chunks && chunks.length > 1 ) {

			var name = chunks[ 1 ];
			var num = chunks[ 2 ];

			if ( ! frameRanges[ name ] ) frameRanges[ name ] = { start: Infinity, end: -Infinity };

			var range = frameRanges[ name ];

			if ( i < range.start ) range.start = i;
			if ( i > range.end ) range.end = i;

			if ( ! firstAnimation ) firstAnimation = name;

		}

	}

	for ( var name in frameRanges ) {

		var range = frameRanges[ name ];
		this.createAnimation( name, range.start, range.end, fps );

	}

	this.firstAnimation = firstAnimation;

};

THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.direction = 1;
		animation.directionBackwards = false;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.direction = -1;
		animation.directionBackwards = true;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationFPS = function ( name, fps ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.fps = fps;
		animation.duration = ( animation.end - animation.start ) / animation.fps;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationDuration = function ( name, duration ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.duration = duration;
		animation.fps = ( animation.end - animation.start ) / animation.duration;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationWeight = function ( name, weight ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.weight = weight;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationTime = function ( name, time ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.time = time;

	}

};

THREE.MorphBlendMesh.prototype.getAnimationTime = function ( name ) {

	var time = 0;

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		time = animation.time;

	}

	return time;

};

THREE.MorphBlendMesh.prototype.getAnimationDuration = function ( name ) {

	var duration = -1;

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		duration = animation.duration;

	}

	return duration;

};

THREE.MorphBlendMesh.prototype.playAnimation = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.time = 0;
		animation.active = true;

	} else {

		console.warn( "animation[" + name + "] undefined" );

	}

};

THREE.MorphBlendMesh.prototype.stopAnimation = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.active = false;

	}

};

THREE.MorphBlendMesh.prototype.update = function ( delta ) {

	for ( var i = 0, il = this.animationsList.length; i < il; i ++ ) {

		var animation = this.animationsList[ i ];

		if ( ! animation.active ) continue;

		var frameTime = animation.duration / animation.length;

		animation.time += animation.direction * delta;

		if ( animation.mirroredLoop ) {

			if ( animation.time > animation.duration || animation.time < 0 ) {

				animation.direction *= -1;

				if ( animation.time > animation.duration ) {

					animation.time = animation.duration;
					animation.directionBackwards = true;

				}

				if ( animation.time < 0 ) {

					animation.time = 0;
					animation.directionBackwards = false;

				}

			}

		} else {

			animation.time = animation.time % animation.duration;

			if ( animation.time < 0 ) animation.time += animation.duration;

		}

		var keyframe = animation.startFrame + THREE.Math.clamp( Math.floor( animation.time / frameTime ), 0, animation.length - 1 );
		var weight = animation.weight;

		if ( keyframe !== animation.currentFrame ) {

			this.morphTargetInfluences[ animation.lastFrame ] = 0;
			this.morphTargetInfluences[ animation.currentFrame ] = 1 * weight;

			this.morphTargetInfluences[ keyframe ] = 0;

			animation.lastFrame = animation.currentFrame;
			animation.currentFrame = keyframe;

		}

		var mix = ( animation.time % frameTime ) / frameTime;

		if ( animation.directionBackwards ) mix = 1 - mix;

		this.morphTargetInfluences[ animation.currentFrame ] = mix * weight;
		this.morphTargetInfluences[ animation.lastFrame ] = ( 1 - mix ) * weight;

	}

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.LensFlarePlugin = function ( ) {

	var _gl, _renderer, _lensFlare = {};

	this.init = function ( renderer ) {

		_gl = renderer.context;
		_renderer = renderer;

		_lensFlare.vertices = new Float32Array( 8 + 8 );
		_lensFlare.faces = new Uint16Array( 6 );

		var i = 0;
		_lensFlare.vertices[ i++ ] = -1; _lensFlare.vertices[ i++ ] = -1;	// vertex
		_lensFlare.vertices[ i++ ] = 0;  _lensFlare.vertices[ i++ ] = 0;	// uv... etc.

		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = -1;
		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 0;

		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 1;
		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 1;

		_lensFlare.vertices[ i++ ] = -1; _lensFlare.vertices[ i++ ] = 1;
		_lensFlare.vertices[ i++ ] = 0;  _lensFlare.vertices[ i++ ] = 1;

		i = 0;
		_lensFlare.faces[ i++ ] = 0; _lensFlare.faces[ i++ ] = 1; _lensFlare.faces[ i++ ] = 2;
		_lensFlare.faces[ i++ ] = 0; _lensFlare.faces[ i++ ] = 2; _lensFlare.faces[ i++ ] = 3;

		// buffers

		_lensFlare.vertexBuffer     = _gl.createBuffer();
		_lensFlare.elementBuffer    = _gl.createBuffer();

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _lensFlare.vertexBuffer );
		_gl.bufferData( _gl.ARRAY_BUFFER, _lensFlare.vertices, _gl.STATIC_DRAW );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.elementBuffer );
		_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.faces, _gl.STATIC_DRAW );

		// textures

		_lensFlare.tempTexture      = _gl.createTexture();
		_lensFlare.occlusionTexture = _gl.createTexture();

		_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );
		_gl.texImage2D( _gl.TEXTURE_2D, 0, _gl.RGB, 16, 16, 0, _gl.RGB, _gl.UNSIGNED_BYTE, null );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST );

		_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.occlusionTexture );
		_gl.texImage2D( _gl.TEXTURE_2D, 0, _gl.RGBA, 16, 16, 0, _gl.RGBA, _gl.UNSIGNED_BYTE, null );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST );

		if ( _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ) <= 0 ) {

			_lensFlare.hasVertexTexture = false;
			_lensFlare.program = createProgram( THREE.ShaderFlares[ "lensFlare" ] );

		} else {

			_lensFlare.hasVertexTexture = true;
			_lensFlare.program = createProgram( THREE.ShaderFlares[ "lensFlareVertexTexture" ] );

		}

		_lensFlare.attributes = {};
		_lensFlare.uniforms = {};

		_lensFlare.attributes.vertex       = _gl.getAttribLocation ( _lensFlare.program, "position" );
		_lensFlare.attributes.uv           = _gl.getAttribLocation ( _lensFlare.program, "uv" );

		_lensFlare.uniforms.renderType     = _gl.getUniformLocation( _lensFlare.program, "renderType" );
		_lensFlare.uniforms.map            = _gl.getUniformLocation( _lensFlare.program, "map" );
		_lensFlare.uniforms.occlusionMap   = _gl.getUniformLocation( _lensFlare.program, "occlusionMap" );
		_lensFlare.uniforms.opacity        = _gl.getUniformLocation( _lensFlare.program, "opacity" );
		_lensFlare.uniforms.color          = _gl.getUniformLocation( _lensFlare.program, "color" );
		_lensFlare.uniforms.scale          = _gl.getUniformLocation( _lensFlare.program, "scale" );
		_lensFlare.uniforms.rotation       = _gl.getUniformLocation( _lensFlare.program, "rotation" );
		_lensFlare.uniforms.screenPosition = _gl.getUniformLocation( _lensFlare.program, "screenPosition" );

		_lensFlare.attributesEnabled = false;

	};


	/*
	 * Render lens flares
	 * Method: renders 16x16 0xff00ff-colored points scattered over the light source area,
	 *         reads these back and calculates occlusion.
	 *         Then _lensFlare.update_lensFlares() is called to re-position and
	 *         update transparency of flares. Then they are rendered.
	 *
	 */

	this.render = function ( scene, camera, viewportWidth, viewportHeight ) {

		var flares = scene.__webglFlares,
			nFlares = flares.length;

		if ( ! nFlares ) return;

		var tempPosition = new THREE.Vector3();

		var invAspect = viewportHeight / viewportWidth,
			halfViewportWidth = viewportWidth * 0.5,
			halfViewportHeight = viewportHeight * 0.5;

		var size = 16 / viewportHeight,
			scale = new THREE.Vector2( size * invAspect, size );

		var screenPosition = new THREE.Vector3( 1, 1, 0 ),
			screenPositionPixels = new THREE.Vector2( 1, 1 );

		var uniforms = _lensFlare.uniforms,
			attributes = _lensFlare.attributes;

		// set _lensFlare program and reset blending

		_gl.useProgram( _lensFlare.program );

		if ( ! _lensFlare.attributesEnabled ) {

			_gl.enableVertexAttribArray( _lensFlare.attributes.vertex );
			_gl.enableVertexAttribArray( _lensFlare.attributes.uv );

			_lensFlare.attributesEnabled = true;

		}

		// loop through all lens flares to update their occlusion and positions
		// setup gl and common used attribs/unforms

		_gl.uniform1i( uniforms.occlusionMap, 0 );
		_gl.uniform1i( uniforms.map, 1 );

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _lensFlare.vertexBuffer );
		_gl.vertexAttribPointer( attributes.vertex, 2, _gl.FLOAT, false, 2 * 8, 0 );
		_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.elementBuffer );

		_gl.disable( _gl.CULL_FACE );
		_gl.depthMask( false );

		var i, j, jl, flare, sprite;

		for ( i = 0; i < nFlares; i ++ ) {

			size = 16 / viewportHeight;
			scale.set( size * invAspect, size );

			// calc object screen position

			flare = flares[ i ];

			tempPosition.set( flare.matrixWorld.elements[12], flare.matrixWorld.elements[13], flare.matrixWorld.elements[14] );

			camera.matrixWorldInverse.multiplyVector3( tempPosition );
			camera.projectionMatrix.multiplyVector3( tempPosition );

			// setup arrays for gl programs

			screenPosition.copy( tempPosition )

			screenPositionPixels.x = screenPosition.x * halfViewportWidth + halfViewportWidth;
			screenPositionPixels.y = screenPosition.y * halfViewportHeight + halfViewportHeight;

			// screen cull

			if ( _lensFlare.hasVertexTexture || (
				screenPositionPixels.x > 0 &&
				screenPositionPixels.x < viewportWidth &&
				screenPositionPixels.y > 0 &&
				screenPositionPixels.y < viewportHeight ) ) {

				// save current RGB to temp texture

				_gl.activeTexture( _gl.TEXTURE1 );
				_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );
				_gl.copyTexImage2D( _gl.TEXTURE_2D, 0, _gl.RGB, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );


				// render pink quad

				_gl.uniform1i( uniforms.renderType, 0 );
				_gl.uniform2f( uniforms.scale, scale.x, scale.y );
				_gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );

				_gl.disable( _gl.BLEND );
				_gl.enable( _gl.DEPTH_TEST );

				_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );


				// copy result to occlusionMap

				_gl.activeTexture( _gl.TEXTURE0 );
				_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.occlusionTexture );
				_gl.copyTexImage2D( _gl.TEXTURE_2D, 0, _gl.RGBA, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );


				// restore graphics

				_gl.uniform1i( uniforms.renderType, 1 );
				_gl.disable( _gl.DEPTH_TEST );

				_gl.activeTexture( _gl.TEXTURE1 );
				_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );
				_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );


				// update object positions

				flare.positionScreen.copy( screenPosition )

				if ( flare.customUpdateCallback ) {

					flare.customUpdateCallback( flare );

				} else {

					flare.updateLensFlares();

				}

				// render flares

				_gl.uniform1i( uniforms.renderType, 2 );
				_gl.enable( _gl.BLEND );

				for ( j = 0, jl = flare.lensFlares.length; j < jl; j ++ ) {

					sprite = flare.lensFlares[ j ];

					if ( sprite.opacity > 0.001 && sprite.scale > 0.001 ) {

						screenPosition.x = sprite.x;
						screenPosition.y = sprite.y;
						screenPosition.z = sprite.z;

						size = sprite.size * sprite.scale / viewportHeight;

						scale.x = size * invAspect;
						scale.y = size;

						_gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );
						_gl.uniform2f( uniforms.scale, scale.x, scale.y );
						_gl.uniform1f( uniforms.rotation, sprite.rotation );

						_gl.uniform1f( uniforms.opacity, sprite.opacity );
						_gl.uniform3f( uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );

						_renderer.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );
						_renderer.setTexture( sprite.texture, 1 );

						_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );

					}

				}

			}

		}

		// restore gl

		_gl.enable( _gl.CULL_FACE );
		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthMask( true );

	};

	function createProgram ( shader ) {

		var program = _gl.createProgram();

		var fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );
		var vertexShader = _gl.createShader( _gl.VERTEX_SHADER );

		_gl.shaderSource( fragmentShader, shader.fragmentShader );
		_gl.shaderSource( vertexShader, shader.vertexShader );

		_gl.compileShader( fragmentShader );
		_gl.compileShader( vertexShader );

		_gl.attachShader( program, fragmentShader );
		_gl.attachShader( program, vertexShader );

		_gl.linkProgram( program );

		return program;

	};

};/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShadowMapPlugin = function ( ) {

	var _gl,
	_renderer,
	_depthMaterial, _depthMaterialMorph, _depthMaterialSkin, _depthMaterialMorphSkin,

	_frustum = new THREE.Frustum(),
	_projScreenMatrix = new THREE.Matrix4(),

	_min = new THREE.Vector3(),
	_max = new THREE.Vector3();

	this.init = function ( renderer ) {

		_gl = renderer.context;
		_renderer = renderer;

		var depthShader = THREE.ShaderLib[ "depthRGBA" ];
		var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

		_depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
		_depthMaterialMorph = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true } );
		_depthMaterialSkin = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, skinning: true } );
		_depthMaterialMorphSkin = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true, skinning: true } );

		_depthMaterial._shadowPass = true;
		_depthMaterialMorph._shadowPass = true;
		_depthMaterialSkin._shadowPass = true;
		_depthMaterialMorphSkin._shadowPass = true;

	};

	this.render = function ( scene, camera ) {

		if ( ! ( _renderer.shadowMapEnabled && _renderer.shadowMapAutoUpdate ) ) return;

		this.update( scene, camera );

	};

	this.update = function ( scene, camera ) {

		var i, il, j, jl, n,

		shadowMap, shadowMatrix, shadowCamera,
		program, buffer, material,
		webglObject, object, light,
		renderList,

		lights = [],
		k = 0,

		fog = null;

		// set GL state for depth map

		_gl.clearColor( 1, 1, 1, 1 );
		_gl.disable( _gl.BLEND );

		_gl.enable( _gl.CULL_FACE );
		_gl.frontFace( _gl.CCW );

		if ( _renderer.shadowMapCullFrontFaces ) {

			_gl.cullFace( _gl.FRONT );

		} else {

			_gl.cullFace( _gl.BACK );

		}

		_renderer.setDepthTest( true );

		// preprocess lights
		// 	- skip lights that are not casting shadows
		//	- create virtual lights for cascaded shadow maps

		for ( i = 0, il = scene.__lights.length; i < il; i ++ ) {

			light = scene.__lights[ i ];

			if ( ! light.castShadow ) continue;

			if ( ( light instanceof THREE.DirectionalLight ) && light.shadowCascade ) {

				for ( n = 0; n < light.shadowCascadeCount; n ++ ) {

					var virtualLight;

					if ( ! light.shadowCascadeArray[ n ] ) {

						virtualLight = createVirtualLight( light, n );
						virtualLight.originalCamera = camera;

						var gyro = new THREE.Gyroscope();
						gyro.position = light.shadowCascadeOffset;

						gyro.add( virtualLight );
						gyro.add( virtualLight.target );

						camera.add( gyro );

						light.shadowCascadeArray[ n ] = virtualLight;

						console.log( "Created virtualLight", virtualLight );

					} else {

						virtualLight = light.shadowCascadeArray[ n ];

					}

					updateVirtualLight( light, n );

					lights[ k ] = virtualLight;
					k ++;

				}

			} else {

				lights[ k ] = light;
				k ++;

			}

		}

		// render depth map

		for ( i = 0, il = lights.length; i < il; i ++ ) {

			light = lights[ i ];

			if ( ! light.shadowMap ) {

				var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };

				light.shadowMap = new THREE.WebGLRenderTarget( light.shadowMapWidth, light.shadowMapHeight, pars );
				light.shadowMapSize = new THREE.Vector2( light.shadowMapWidth, light.shadowMapHeight );

				light.shadowMatrix = new THREE.Matrix4();

			}

			if ( ! light.shadowCamera ) {

				if ( light instanceof THREE.SpotLight ) {

					light.shadowCamera = new THREE.PerspectiveCamera( light.shadowCameraFov, light.shadowMapWidth / light.shadowMapHeight, light.shadowCameraNear, light.shadowCameraFar );

				} else if ( light instanceof THREE.DirectionalLight ) {

					light.shadowCamera = new THREE.OrthographicCamera( light.shadowCameraLeft, light.shadowCameraRight, light.shadowCameraTop, light.shadowCameraBottom, light.shadowCameraNear, light.shadowCameraFar );

				} else {

					console.error( "Unsupported light type for shadow" );
					continue;

				}

				scene.add( light.shadowCamera );

				if ( _renderer.autoUpdateScene ) scene.updateMatrixWorld();

			}

			if ( light.shadowCameraVisible && ! light.cameraHelper ) {

				light.cameraHelper = new THREE.CameraHelper( light.shadowCamera );
				light.shadowCamera.add( light.cameraHelper );

			}

			if ( light.isVirtual && virtualLight.originalCamera == camera ) {

				updateShadowCamera( camera, light );

			}

			shadowMap = light.shadowMap;
			shadowMatrix = light.shadowMatrix;
			shadowCamera = light.shadowCamera;

			shadowCamera.position.copy( light.matrixWorld.getPosition() );
			shadowCamera.lookAt( light.target.matrixWorld.getPosition() );
			shadowCamera.updateMatrixWorld();

			shadowCamera.matrixWorldInverse.getInverse( shadowCamera.matrixWorld );

			if ( light.cameraHelper ) light.cameraHelper.visible = light.shadowCameraVisible;
			if ( light.shadowCameraVisible ) light.cameraHelper.update();

			// compute shadow matrix

			shadowMatrix.set( 0.5, 0.0, 0.0, 0.5,
							  0.0, 0.5, 0.0, 0.5,
							  0.0, 0.0, 0.5, 0.5,
							  0.0, 0.0, 0.0, 1.0 );

			shadowMatrix.multiplySelf( shadowCamera.projectionMatrix );
			shadowMatrix.multiplySelf( shadowCamera.matrixWorldInverse );

			// update camera matrices and frustum

			if ( ! shadowCamera._viewMatrixArray ) shadowCamera._viewMatrixArray = new Float32Array( 16 );
			if ( ! shadowCamera._projectionMatrixArray ) shadowCamera._projectionMatrixArray = new Float32Array( 16 );

			shadowCamera.matrixWorldInverse.flattenToArray( shadowCamera._viewMatrixArray );
			shadowCamera.projectionMatrix.flattenToArray( shadowCamera._projectionMatrixArray );

			_projScreenMatrix.multiply( shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse );
			_frustum.setFromMatrix( _projScreenMatrix );

			// render shadow map

			_renderer.setRenderTarget( shadowMap );
			_renderer.clear();

			// set object matrices & frustum culling

			renderList = scene.__webglObjects;

			for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

				webglObject = renderList[ j ];
				object = webglObject.object;

				webglObject.render = false;

				if ( object.visible && object.castShadow ) {

					if ( ! ( object instanceof THREE.Mesh || object instanceof THREE.ParticleSystem ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {

						object._modelViewMatrix.multiply( shadowCamera.matrixWorldInverse, object.matrixWorld );

						webglObject.render = true;

					}

				}

			}

			// render regular objects

			var objectMaterial, useMorphing, useSkinning;

			for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

				webglObject = renderList[ j ];

				if ( webglObject.render ) {

					object = webglObject.object;
					buffer = webglObject.buffer;

					// culling is overriden globally for all objects
					// while rendering depth map

					// need to deal with MeshFaceMaterial somehow
					// in that case just use the first of material.materials for now
					// (proper solution would require to break objects by materials
					//  similarly to regular rendering and then set corresponding
					//  depth materials per each chunk instead of just once per object)

					objectMaterial = getObjectMaterial( object );

					useMorphing = object.geometry.morphTargets.length > 0 && objectMaterial.morphTargets;
					useSkinning = object instanceof THREE.SkinnedMesh && objectMaterial.skinning;

					if ( object.customDepthMaterial ) {

						material = object.customDepthMaterial;

					} else if ( useSkinning ) {

						material = useMorphing ? _depthMaterialMorphSkin : _depthMaterialSkin;

					} else if ( useMorphing ) {

						material = _depthMaterialMorph;

					} else {

						material = _depthMaterial;

					}

					if ( buffer instanceof THREE.BufferGeometry ) {

						_renderer.renderBufferDirect( shadowCamera, scene.__lights, fog, material, buffer, object );

					} else {

						_renderer.renderBuffer( shadowCamera, scene.__lights, fog, material, buffer, object );

					}

				}

			}

			// set matrices and render immediate objects

			renderList = scene.__webglObjectsImmediate;

			for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

				webglObject = renderList[ j ];
				object = webglObject.object;

				if ( object.visible && object.castShadow ) {

					object._modelViewMatrix.multiply( shadowCamera.matrixWorldInverse, object.matrixWorld );

					_renderer.renderImmediateObject( shadowCamera, scene.__lights, fog, _depthMaterial, object );

				}

			}

		}

		// restore GL state

		var clearColor = _renderer.getClearColor(),
		clearAlpha = _renderer.getClearAlpha();

		_gl.clearColor( clearColor.r, clearColor.g, clearColor.b, clearAlpha );
		_gl.enable( _gl.BLEND );

		if ( _renderer.shadowMapCullFrontFaces ) {

			_gl.cullFace( _gl.BACK );

		}

	};

	function createVirtualLight( light, cascade ) {

		var virtualLight = new THREE.DirectionalLight();

		virtualLight.isVirtual = true;

		virtualLight.onlyShadow = true;
		virtualLight.castShadow = true;

		virtualLight.shadowCameraNear = light.shadowCameraNear;
		virtualLight.shadowCameraFar = light.shadowCameraFar;

		virtualLight.shadowCameraLeft = light.shadowCameraLeft;
		virtualLight.shadowCameraRight = light.shadowCameraRight;
		virtualLight.shadowCameraBottom = light.shadowCameraBottom;
		virtualLight.shadowCameraTop = light.shadowCameraTop;

		virtualLight.shadowCameraVisible = light.shadowCameraVisible;

		virtualLight.shadowDarkness = light.shadowDarkness;

		virtualLight.shadowBias = light.shadowCascadeBias[ cascade ];
		virtualLight.shadowMapWidth = light.shadowCascadeWidth[ cascade ];
		virtualLight.shadowMapHeight = light.shadowCascadeHeight[ cascade ];

		virtualLight.pointsWorld = [];
		virtualLight.pointsFrustum = [];

		var pointsWorld = virtualLight.pointsWorld,
			pointsFrustum = virtualLight.pointsFrustum;

		for ( var i = 0; i < 8; i ++ ) {

			pointsWorld[ i ] = new THREE.Vector3();
			pointsFrustum[ i ] = new THREE.Vector3();

		}

		var nearZ = light.shadowCascadeNearZ[ cascade ];
		var farZ = light.shadowCascadeFarZ[ cascade ];

		pointsFrustum[ 0 ].set( -1, -1, nearZ );
		pointsFrustum[ 1 ].set(  1, -1, nearZ );
		pointsFrustum[ 2 ].set( -1,  1, nearZ );
		pointsFrustum[ 3 ].set(  1,  1, nearZ );

		pointsFrustum[ 4 ].set( -1, -1, farZ );
		pointsFrustum[ 5 ].set(  1, -1, farZ );
		pointsFrustum[ 6 ].set( -1,  1, farZ );
		pointsFrustum[ 7 ].set(  1,  1, farZ );

		return virtualLight;

	}

	// Synchronize virtual light with the original light

	function updateVirtualLight( light, cascade ) {

		var virtualLight = light.shadowCascadeArray[ cascade ];

		virtualLight.position.copy( light.position );
		virtualLight.target.position.copy( light.target.position );
		virtualLight.lookAt( virtualLight.target );

		virtualLight.shadowCameraVisible = light.shadowCameraVisible;
		virtualLight.shadowDarkness = light.shadowDarkness;

		virtualLight.shadowBias = light.shadowCascadeBias[ cascade ];

		var nearZ = light.shadowCascadeNearZ[ cascade ];
		var farZ = light.shadowCascadeFarZ[ cascade ];

		var pointsFrustum = virtualLight.pointsFrustum;

		pointsFrustum[ 0 ].z = nearZ;
		pointsFrustum[ 1 ].z = nearZ;
		pointsFrustum[ 2 ].z = nearZ;
		pointsFrustum[ 3 ].z = nearZ;

		pointsFrustum[ 4 ].z = farZ;
		pointsFrustum[ 5 ].z = farZ;
		pointsFrustum[ 6 ].z = farZ;
		pointsFrustum[ 7 ].z = farZ;

	}

	// Fit shadow camera's ortho frustum to camera frustum

	function updateShadowCamera( camera, light ) {

		var shadowCamera = light.shadowCamera,
			pointsFrustum = light.pointsFrustum,
			pointsWorld = light.pointsWorld;

		_min.set( Infinity, Infinity, Infinity );
		_max.set( -Infinity, -Infinity, -Infinity );

		for ( var i = 0; i < 8; i ++ ) {

			var p = pointsWorld[ i ];

			p.copy( pointsFrustum[ i ] );
			THREE.ShadowMapPlugin.__projector.unprojectVector( p, camera );

			shadowCamera.matrixWorldInverse.multiplyVector3( p );

			if ( p.x < _min.x ) _min.x = p.x;
			if ( p.x > _max.x ) _max.x = p.x;

			if ( p.y < _min.y ) _min.y = p.y;
			if ( p.y > _max.y ) _max.y = p.y;

			if ( p.z < _min.z ) _min.z = p.z;
			if ( p.z > _max.z ) _max.z = p.z;

		}

		shadowCamera.left = _min.x;
		shadowCamera.right = _max.x;
		shadowCamera.top = _max.y;
		shadowCamera.bottom = _min.y;

		// can't really fit near/far
		//shadowCamera.near = _min.z;
		//shadowCamera.far = _max.z;

		shadowCamera.updateProjectionMatrix();

	}

	// For the moment just ignore objects that have multiple materials with different animation methods
	// Only the first material will be taken into account for deciding which depth material to use for shadow maps

	function getObjectMaterial( object ) {

		return object.material instanceof THREE.MeshFaceMaterial
			? object.material.materials[ 0 ]
			: object.material;

	};

};

THREE.ShadowMapPlugin.__projector = new THREE.Projector();
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SpritePlugin = function ( ) {

	var _gl, _renderer, _sprite = {};

	this.init = function ( renderer ) {

		_gl = renderer.context;
		_renderer = renderer;

		_sprite.vertices = new Float32Array( 8 + 8 );
		_sprite.faces    = new Uint16Array( 6 );

		var i = 0;

		_sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = -1;	// vertex 0
		_sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 0;	// uv 0

		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = -1;	// vertex 1
		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 0;	// uv 1

		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;	// vertex 2
		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;	// uv 2

		_sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = 1;	// vertex 3
		_sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 1;	// uv 3

		i = 0;

		_sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 1; _sprite.faces[ i++ ] = 2;
		_sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 2; _sprite.faces[ i++ ] = 3;

		_sprite.vertexBuffer  = _gl.createBuffer();
		_sprite.elementBuffer = _gl.createBuffer();

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
		_gl.bufferData( _gl.ARRAY_BUFFER, _sprite.vertices, _gl.STATIC_DRAW );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );
		_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _sprite.faces, _gl.STATIC_DRAW );

		_sprite.program = createProgram( THREE.ShaderSprite[ "sprite" ] );

		_sprite.attributes = {};
		_sprite.uniforms = {};

		_sprite.attributes.position           = _gl.getAttribLocation ( _sprite.program, "position" );
		_sprite.attributes.uv                 = _gl.getAttribLocation ( _sprite.program, "uv" );

		_sprite.uniforms.uvOffset             = _gl.getUniformLocation( _sprite.program, "uvOffset" );
		_sprite.uniforms.uvScale              = _gl.getUniformLocation( _sprite.program, "uvScale" );

		_sprite.uniforms.rotation             = _gl.getUniformLocation( _sprite.program, "rotation" );
		_sprite.uniforms.scale                = _gl.getUniformLocation( _sprite.program, "scale" );
		_sprite.uniforms.alignment            = _gl.getUniformLocation( _sprite.program, "alignment" );

		_sprite.uniforms.color                = _gl.getUniformLocation( _sprite.program, "color" );
		_sprite.uniforms.map                  = _gl.getUniformLocation( _sprite.program, "map" );
		_sprite.uniforms.opacity              = _gl.getUniformLocation( _sprite.program, "opacity" );

		_sprite.uniforms.useScreenCoordinates = _gl.getUniformLocation( _sprite.program, "useScreenCoordinates" );
		_sprite.uniforms.affectedByDistance   = _gl.getUniformLocation( _sprite.program, "affectedByDistance" );
		_sprite.uniforms.screenPosition    	  = _gl.getUniformLocation( _sprite.program, "screenPosition" );
		_sprite.uniforms.modelViewMatrix      = _gl.getUniformLocation( _sprite.program, "modelViewMatrix" );
		_sprite.uniforms.projectionMatrix     = _gl.getUniformLocation( _sprite.program, "projectionMatrix" );

		_sprite.uniforms.fogType 		  	  = _gl.getUniformLocation( _sprite.program, "fogType" );
		_sprite.uniforms.fogDensity 		  = _gl.getUniformLocation( _sprite.program, "fogDensity" );
		_sprite.uniforms.fogNear 		  	  = _gl.getUniformLocation( _sprite.program, "fogNear" );
		_sprite.uniforms.fogFar 		  	  = _gl.getUniformLocation( _sprite.program, "fogFar" );
		_sprite.uniforms.fogColor 		  	  = _gl.getUniformLocation( _sprite.program, "fogColor" );

		_sprite.attributesEnabled = false;

	};

	this.render = function ( scene, camera, viewportWidth, viewportHeight ) {

		var sprites = scene.__webglSprites,
			nSprites = sprites.length;

		if ( ! nSprites ) return;

		var attributes = _sprite.attributes,
			uniforms = _sprite.uniforms;

		var invAspect = viewportHeight / viewportWidth;

		var halfViewportWidth = viewportWidth * 0.5,
			halfViewportHeight = viewportHeight * 0.5;

		var mergeWith3D = true;

		// setup gl

		_gl.useProgram( _sprite.program );

		if ( ! _sprite.attributesEnabled ) {

			_gl.enableVertexAttribArray( attributes.position );
			_gl.enableVertexAttribArray( attributes.uv );

			_sprite.attributesEnabled = true;

		}

		_gl.disable( _gl.CULL_FACE );
		_gl.enable( _gl.BLEND );
		_gl.depthMask( true );

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
		_gl.vertexAttribPointer( attributes.position, 2, _gl.FLOAT, false, 2 * 8, 0 );
		_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );

		_gl.uniformMatrix4fv( uniforms.projectionMatrix, false, camera._projectionMatrixArray );

		_gl.activeTexture( _gl.TEXTURE0 );
		_gl.uniform1i( uniforms.map, 0 );

		var oldFogType = 0;
		var sceneFogType = 0;
		var fog = scene.fog;

		if ( fog ) {

			_gl.uniform3f( uniforms.fogColor, fog.color.r, fog.color.g, fog.color.b );

			if ( fog instanceof THREE.Fog ) {

				_gl.uniform1f( uniforms.fogNear, fog.near );
				_gl.uniform1f( uniforms.fogFar, fog.far );

				_gl.uniform1i( uniforms.fogType, 1 );
				oldFogType = 1;
				sceneFogType = 1;

			} else if ( fog instanceof THREE.FogExp2 ) {

				_gl.uniform1f( uniforms.fogDensity, fog.density );

				_gl.uniform1i( uniforms.fogType, 2 );
				oldFogType = 2;
				sceneFogType = 2;

			}

		} else {

			_gl.uniform1i( uniforms.fogType, 0 );
			oldFogType = 0;
			sceneFogType = 0;

		}


		// update positions and sort

		var i, sprite, screenPosition, size, fogType, scale = [];

		for( i = 0; i < nSprites; i ++ ) {

			sprite = sprites[ i ];

			if ( ! sprite.visible || sprite.opacity === 0 ) continue;

			if ( ! sprite.useScreenCoordinates ) {

				sprite._modelViewMatrix.multiply( camera.matrixWorldInverse, sprite.matrixWorld );
				sprite.z = - sprite._modelViewMatrix.elements[ 14 ];

			} else {

				sprite.z = - sprite.position.z;

			}

		}

		sprites.sort( painterSortStable );

		// render all sprites

		for( i = 0; i < nSprites; i ++ ) {

			sprite = sprites[ i ];

			if ( ! sprite.visible || sprite.opacity === 0 ) continue;

			if ( sprite.map && sprite.map.image && sprite.map.image.width ) {

				if ( sprite.useScreenCoordinates ) {

					_gl.uniform1i( uniforms.useScreenCoordinates, 1 );
					_gl.uniform3f(
						uniforms.screenPosition,
						( sprite.position.x - halfViewportWidth  ) / halfViewportWidth,
						( halfViewportHeight - sprite.position.y ) / halfViewportHeight,
						Math.max( 0, Math.min( 1, sprite.position.z ) )
					);

				} else {

					_gl.uniform1i( uniforms.useScreenCoordinates, 0 );
					_gl.uniform1i( uniforms.affectedByDistance, sprite.affectedByDistance ? 1 : 0 );
					_gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, sprite._modelViewMatrix.elements );

				}

				if ( scene.fog && sprite.fog ) {

					fogType = sceneFogType;

				} else {

					fogType = 0;

				}

				if ( oldFogType !== fogType ) {

					_gl.uniform1i( uniforms.fogType, fogType );
					oldFogType = fogType;

				}

				size = 1 / ( sprite.scaleByViewport ? viewportHeight : 1 );

				scale[ 0 ] = size * invAspect * sprite.scale.x;
				scale[ 1 ] = size * sprite.scale.y;

				_gl.uniform2f( uniforms.uvScale, sprite.uvScale.x, sprite.uvScale.y );
				_gl.uniform2f( uniforms.uvOffset, sprite.uvOffset.x, sprite.uvOffset.y );
				_gl.uniform2f( uniforms.alignment, sprite.alignment.x, sprite.alignment.y );

				_gl.uniform1f( uniforms.opacity, sprite.opacity );
				_gl.uniform3f( uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );

				_gl.uniform1f( uniforms.rotation, sprite.rotation );
				_gl.uniform2fv( uniforms.scale, scale );

				if ( sprite.mergeWith3D && !mergeWith3D ) {

					_gl.enable( _gl.DEPTH_TEST );
					mergeWith3D = true;

				} else if ( ! sprite.mergeWith3D && mergeWith3D ) {

					_gl.disable( _gl.DEPTH_TEST );
					mergeWith3D = false;

				}

				_renderer.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );
				_renderer.setTexture( sprite.map, 0 );

				_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );

			}

		}

		// restore gl

		_gl.enable( _gl.CULL_FACE );
		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthMask( true );

	};

	function createProgram ( shader ) {

		var program = _gl.createProgram();

		var fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );
		var vertexShader = _gl.createShader( _gl.VERTEX_SHADER );

		_gl.shaderSource( fragmentShader, shader.fragmentShader );
		_gl.shaderSource( vertexShader, shader.vertexShader );

		_gl.compileShader( fragmentShader );
		_gl.compileShader( vertexShader );

		_gl.attachShader( program, fragmentShader );
		_gl.attachShader( program, vertexShader );

		_gl.linkProgram( program );

		return program;

	};

	function painterSortStable ( a, b ) {

		if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return b.id - a.id;

		}

	};

};/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.DepthPassPlugin = function ( ) {

	this.enabled = false;
	this.renderTarget = null;

	var _gl,
	_renderer,
	_depthMaterial, _depthMaterialMorph, _depthMaterialSkin, _depthMaterialMorphSkin,

	_frustum = new THREE.Frustum(),
	_projScreenMatrix = new THREE.Matrix4();

	this.init = function ( renderer ) {

		_gl = renderer.context;
		_renderer = renderer;

		var depthShader = THREE.ShaderLib[ "depthRGBA" ];
		var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

		_depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
		_depthMaterialMorph = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true } );
		_depthMaterialSkin = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, skinning: true } );
		_depthMaterialMorphSkin = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true, skinning: true } );

		_depthMaterial._shadowPass = true;
		_depthMaterialMorph._shadowPass = true;
		_depthMaterialSkin._shadowPass = true;
		_depthMaterialMorphSkin._shadowPass = true;

	};

	this.render = function ( scene, camera ) {

		if ( ! this.enabled ) return;

		this.update( scene, camera );

	};

	this.update = function ( scene, camera ) {

		var i, il, j, jl, n,

		program, buffer, material,
		webglObject, object, light,
		renderList,

		fog = null;

		// set GL state for depth map

		_gl.clearColor( 1, 1, 1, 1 );
		_gl.disable( _gl.BLEND );

		_renderer.setDepthTest( true );

		// update scene

		if ( _renderer.autoUpdateScene ) scene.updateMatrixWorld();

		// update camera matrices and frustum

		if ( ! camera._viewMatrixArray ) camera._viewMatrixArray = new Float32Array( 16 );
		if ( ! camera._projectionMatrixArray ) camera._projectionMatrixArray = new Float32Array( 16 );

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		camera.matrixWorldInverse.flattenToArray( camera._viewMatrixArray );
		camera.projectionMatrix.flattenToArray( camera._projectionMatrixArray );

		_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
		_frustum.setFromMatrix( _projScreenMatrix );

		// render depth map

		_renderer.setRenderTarget( this.renderTarget );
		_renderer.clear();

		// set object matrices & frustum culling

		renderList = scene.__webglObjects;

		for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

			webglObject = renderList[ j ];
			object = webglObject.object;

			webglObject.render = false;

			if ( object.visible ) {

				if ( ! ( object instanceof THREE.Mesh || object instanceof THREE.ParticleSystem ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {

					object._modelViewMatrix.multiply( camera.matrixWorldInverse, object.matrixWorld );

					webglObject.render = true;

				}

			}

		}

		// render regular objects

		var objectMaterial, useMorphing, useSkinning;

		for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

			webglObject = renderList[ j ];

			if ( webglObject.render ) {

				object = webglObject.object;
				buffer = webglObject.buffer;

				// todo: create proper depth material for particles

				if ( object instanceof THREE.ParticleSystem && !object.customDepthMaterial ) continue;

				objectMaterial = getObjectMaterial( object );

				if ( objectMaterial ) _renderer.setMaterialFaces( object.material );

				useMorphing = object.geometry.morphTargets.length > 0 && objectMaterial.morphTargets;
				useSkinning = object instanceof THREE.SkinnedMesh && objectMaterial.skinning;

				if ( object.customDepthMaterial ) {

					material = object.customDepthMaterial;

				} else if ( useSkinning ) {

					material = useMorphing ? _depthMaterialMorphSkin : _depthMaterialSkin;

				} else if ( useMorphing ) {

					material = _depthMaterialMorph;

				} else {

					material = _depthMaterial;

				}

				if ( buffer instanceof THREE.BufferGeometry ) {

					_renderer.renderBufferDirect( camera, scene.__lights, fog, material, buffer, object );

				} else {

					_renderer.renderBuffer( camera, scene.__lights, fog, material, buffer, object );

				}

			}

		}

		// set matrices and render immediate objects

		renderList = scene.__webglObjectsImmediate;

		for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

			webglObject = renderList[ j ];
			object = webglObject.object;

			if ( object.visible ) {

				object._modelViewMatrix.multiply( camera.matrixWorldInverse, object.matrixWorld );

				_renderer.renderImmediateObject( camera, scene.__lights, fog, _depthMaterial, object );

			}

		}

		// restore GL state

		var clearColor = _renderer.getClearColor(),
		clearAlpha = _renderer.getClearAlpha();

		_gl.clearColor( clearColor.r, clearColor.g, clearColor.b, clearAlpha );
		_gl.enable( _gl.BLEND );

	};

	// For the moment just ignore objects that have multiple materials with different animation methods
	// Only the first material will be taken into account for deciding which depth material to use

	function getObjectMaterial( object ) {

		return object.material instanceof THREE.MeshFaceMaterial
			? object.material.materials[ 0 ]
			: object.material;

	};

};

/**
 * @author mikael emtinger / http://gomo.se/
 *
 */

THREE.ShaderFlares = {

	'lensFlareVertexTexture': {

		vertexShader: [

			"uniform vec3 screenPosition;",
			"uniform vec2 scale;",
			"uniform float rotation;",
			"uniform int renderType;",

			"uniform sampler2D occlusionMap;",

			"attribute vec2 position;",
			"attribute vec2 uv;",

			"varying vec2 vUV;",
			"varying float vVisibility;",

			"void main() {",

				"vUV = uv;",

				"vec2 pos = position;",

				"if( renderType == 2 ) {",

					"vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.5, 0.5 ) );",

					"vVisibility = (       visibility.r / 9.0 ) *",
								  "( 1.0 - visibility.g / 9.0 ) *",
								  "(       visibility.b / 9.0 ) *",
								  "( 1.0 - visibility.a / 9.0 );",

					"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;",
					"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;",

				"}",

				"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"precision mediump float;",

			"uniform sampler2D map;",
			"uniform float opacity;",
			"uniform int renderType;",
			"uniform vec3 color;",

			"varying vec2 vUV;",
			"varying float vVisibility;",

			"void main() {",

				// pink square

				"if( renderType == 0 ) {",

					"gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );",

				// restore

				"} else if( renderType == 1 ) {",

					"gl_FragColor = texture2D( map, vUV );",

				// flare

				"} else {",

					"vec4 texture = texture2D( map, vUV );",
					"texture.a *= opacity * vVisibility;",
					"gl_FragColor = texture;",
					"gl_FragColor.rgb *= color;",

				"}",

			"}"
		].join( "\n" )

	},


	'lensFlare': {

		vertexShader: [

			"uniform vec3 screenPosition;",
			"uniform vec2 scale;",
			"uniform float rotation;",
			"uniform int renderType;",

			"attribute vec2 position;",
			"attribute vec2 uv;",

			"varying vec2 vUV;",

			"void main() {",

				"vUV = uv;",

				"vec2 pos = position;",

				"if( renderType == 2 ) {",

					"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;",
					"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;",

				"}",

				"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"precision mediump float;",

			"uniform sampler2D map;",
			"uniform sampler2D occlusionMap;",
			"uniform float opacity;",
			"uniform int renderType;",
			"uniform vec3 color;",

			"varying vec2 vUV;",

			"void main() {",

				// pink square

				"if( renderType == 0 ) {",

					"gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );",

				// restore

				"} else if( renderType == 1 ) {",

					"gl_FragColor = texture2D( map, vUV );",

				// flare

				"} else {",

					"float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +",
									   "texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +",
									   "texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +",
									   "texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;",

					"visibility = ( 1.0 - visibility / 4.0 );",

					"vec4 texture = texture2D( map, vUV );",
					"texture.a *= opacity * visibility;",
					"gl_FragColor = texture;",
					"gl_FragColor.rgb *= color;",

				"}",

			"}"

		].join( "\n" )

	}

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 *
 */

THREE.ShaderSprite = {

	'sprite': {

		vertexShader: [

			"uniform int useScreenCoordinates;",
			"uniform int affectedByDistance;",
			"uniform vec3 screenPosition;",
			"uniform mat4 modelViewMatrix;",
			"uniform mat4 projectionMatrix;",
			"uniform float rotation;",
			"uniform vec2 scale;",
			"uniform vec2 alignment;",
			"uniform vec2 uvOffset;",
			"uniform vec2 uvScale;",

			"attribute vec2 position;",
			"attribute vec2 uv;",

			"varying vec2 vUV;",

			"void main() {",

				"vUV = uvOffset + uv * uvScale;",

				"vec2 alignedPosition = position + alignment;",

				"vec2 rotatedPosition;",
				"rotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;",
				"rotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;",

				"vec4 finalPosition;",

				"if( useScreenCoordinates != 0 ) {",

					"finalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );",

				"} else {",

					"finalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );",
					"finalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );",

				"}",

				"gl_Position = finalPosition;",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"precision mediump float;",

			"uniform vec3 color;",
			"uniform sampler2D map;",
			"uniform float opacity;",

			"uniform int fogType;",
			"uniform vec3 fogColor;",
			"uniform float fogDensity;",
			"uniform float fogNear;",
			"uniform float fogFar;",

			"varying vec2 vUV;",

			"void main() {",

				"vec4 texture = texture2D( map, vUV );",
				"gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );",

				"if ( fogType > 0 ) {",

					"float depth = gl_FragCoord.z / gl_FragCoord.w;",
					"float fogFactor = 0.0;",

					"if ( fogType == 1 ) {",

						"fogFactor = smoothstep( fogNear, fogFar, depth );",

					"} else {",

						"const float LOG2 = 1.442695;",
						"float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );",
						"fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",

					"}",

					"gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

				"}nce == 1 ? 1.0 : finalPosition.z );",

				"}",

				"gl_Position = finalPosition;",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"precision mediump float;",

			"uniform vec3 color;",
			"uniform sampler2D map;",
			"uniform float opacity;",

			"varying vec2 vUV;",

			"void main() {",

				"vec4 texture = texture2D( map, vUV );",
				"gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );",

			"}"

		].join( "\n" )

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    if (!Detector) throw new Error('Four.Buffer requires Detector');
    /**
     * Buffer constructor
     * A buffer stores references to objects that require their webgl buffers cleared together
     */
    window.Four.Buffer = function (renderer, scene) {
        var buffer = {};
        buffer.arr = [];
        buffer.add = function (object) {
            buffer.arr.push(object);
            return object;
        };
        buffer.clear = function (custom) {
            if (!custom && !buffer.arr.length) return;
            (function dealobj (val) {
                if (typeof val === 'object') scene.remove(val);
                if ($.isArray(val)) val.forEach(function (val) {dealobj(val);});
                else if (val instanceof THREE.Texture) renderer.deallocateTexture(val);
                else if (val instanceof THREE.ParticleSystem) renderer.deallocateObject(val);
                else if (val instanceof THREE.Mesh) renderer.deallocateObject(val);
                else if (val instanceof THREE.Material) renderer.deallocateMaterial(val);
                else if (val instanceof THREE.Object3D && Detector.webgl)
                    renderer.deallocateObject(val), dealobj(val.children);
            }(custom || buffer.arr));
            if (!custom) buffer.arr = [];
        };
        return buffer;
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    /**
     * If Webgl inspector, query the dom and log out the active buffers
     */
    window.Four.buffercount = function () {
        var live_buffer = '.buffer-item.listing-item', deleted_buffer = '.buffer-item.listing-item.buffer-item-deleted';
        if ($(live_buffer).length) console.log($(live_buffer).length - $(deleted_buffer).length);
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    /**
     * Keeps a tally of meshes that need to support raycasting
     */
    window.Four.InteractiveMeshes = function () {
        return {
            add: function (name, mesh) {
                if (!this.meshes[name]) this.meshes[name] = {};
                this.meshes[name] = mesh;
            },
            meshes: {},
            remove: function (name) {
                if (name in this.meshes) delete this.meshes[name];
            }
        };
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    if (!Detector) throw new Error('Four.Matlib requires Detector');
    var webgl = Detector.webgl ? true : false;
    window.Four.Matlib = function () {
        var matlib = {canvas: {}, cache: {}};
        matlib.get_material = function (material, color) {
            var name = material + '_' + color;
            if (matlib.cache[name]) return matlib.cache[name];
            matlib.cache[name] = matlib[material](typeof color === 'number' ? color : void 0);
            return matlib.cache[name];
        };
        matlib.canvas.compound_surface = function () {
            return [matlib.canvas.flat('0xbbbbbb'), matlib.canvas.flat('0xbbbbbb')];
        };
        matlib.canvas.compound_surface_wire = function () {
            return [matlib.canvas.wire('0xffffff')];
        };
        matlib.canvas.flat = function (color) {
            return new THREE.MeshBasicMaterial({color: color, shading: THREE.FlatShading});
        };
        matlib.canvas.wire = function (color) {
            return new THREE.MeshBasicMaterial({color: color || 0xcccccc, wireframe: true});
        };
        matlib.compound_grid_wire = function () {
            return [
                new THREE.MeshPhongMaterial({
                    // color represents diffuse in THREE.MeshPhongMaterial
                    ambient: 0x000000, color: 0xeeeeee, specular: 0xdddddd, emissive: 0x000000, shininess: 0
                }),
                matlib.wire(0xcccccc)
            ];
        };
        matlib.compound_floor_wire = function () {
            return [
                new THREE.MeshPhongMaterial({
                    ambient: 0x000000, color: 0xefefef, specular: 0xffffff, emissive: 0x000000, shininess: 10
                }),
                matlib.wire(0xcccccc)
            ];
        };
        matlib.compound_surface = function () {
            if (!webgl) return matlib.canvas.compound_surface();
            return [matlib.transparent(), matlib.vertex()];
        };
        matlib.compound_surface_wire = function () {
            if (!webgl) return matlib.canvas.compound_surface_wire();
            return [matlib.transparent(), matlib.wire('0x000000')];
        };
        matlib.wire = function (color) {
            if (!webgl) return matlib.canvas.wire(color);
            return new THREE.MeshBasicMaterial({color: color || 0x999999, wireframe: true});
        };
        matlib.transparent = function () {
            return new THREE.MeshBasicMaterial({opacity: 0, transparent: true});
        };
        matlib.flat = function (color) {
            if (!webgl) return matlib.canvas.flat(color);
            return new THREE.MeshBasicMaterial({color: color, wireframe: false});
        };
        matlib.particles = function () {return new THREE.ParticleBasicMaterial({color: '0xbbbbbb', size: 1});};
        matlib.phong = function (color) {
            if (!webgl) return matlib.canvas.flat(color);
            return new THREE.MeshPhongMaterial({
                ambient: 0x000000, color: color, specular: 0x999999, shininess: 50, shading: THREE.SmoothShading
            });
        };
        matlib.texture = function (texture) {
            return new THREE.MeshBasicMaterial({
                map: texture, color: 0xffffff, transparent: true, side: THREE.DoubleSide
            });
        };
        matlib.vertex = function () {
            // MeshPhongMaterial Throws a WebGL Error when using VertexColors and dealocating buffers
            return new THREE.MeshBasicMaterial({
                shading: THREE.FlatShading, vertexColors: THREE.VertexColors, side: THREE.DoubleSide
            });
        };
        matlib.meshface = function () {
            return new THREE.MeshFaceMaterial();
        };
        return matlib;
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    /**
     * Custom THREE.SceneUtils.createMultiMaterialObject, THREE's current version creates flickering
     * @param {THREE.PlaneGeometry} geometry
     * @param {Array} materials Array of THREE materials
     */
    window.Four.multimaterial_object = function (geometry, materials) {
        var i = 0, il = materials.length, group = new THREE.Object3D();
        for (; i < il; i++) {
            var object = new THREE.Mesh(geometry, materials[i]);
            object.position.y = i / 100;
            group.add(object);
        }
        return group;
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    /**
     * Scales an Array of numbers to a new range
     * @param {Array} arr Array to be scaled
     * @param {Number} range_min New minimum range
     * @param {Number} range_max New maximum range
     * @returns {Array}
     */
    window.Four.scale = function (arr, range_min, range_max) {
        var min = Math.min.apply(null, arr), max = Math.max.apply(null, arr);
        return arr.map(function (val) {return ((val - min) / (max - min) * (range_max - range_min) + range_min);});
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    window.Four.Text3D = function (matlib, settings) {
        var char_geometries = {};
        /**
         * Creates new or fetches cached 3D text geometry
         * @param {String} str
         * @param {Object} options text geometry options
         * @returns {THREE.Geometry}
         */
        var create_geometry = function (str, options) {
            var geometry;
            if (char_geometries[str]) return char_geometries[str];
            if (str === ' ') {
                geometry = new THREE.Geometry();
                geometry.boundingBox = {min: new THREE.Vector3(0, 0, 0), max: new THREE.Vector3(100, 0, 0)};
                return geometry;
            }
            geometry = new THREE.TextGeometry(str, options);
            geometry.computeBoundingBox();
            return char_geometries[str] = geometry;
        };
        /**
         * @param {String} str String you want to create
         * @param {String} color text colour in hex
         * @param {Boolean} preserve_kerning set to true to cache geometry without breaking it into characters
         * @param {Boolean} bevel
         * @returns {THREE.Mesh}
         */
        return function (str, color, preserve_kerning, bevel) {
            var object, merged = new THREE.Geometry(),
                material = matlib.get_material('phong', color), xpos = 0,
                options = {
                    size: settings.font_size, height: settings.font_height,
                    font: settings.font_face_3d, weight: 'normal', style: 'normal',
                    bevelEnabled: bevel || false, bevelSize: 0.6, bevelThickness: 0.6
                };
            if (preserve_kerning) return new THREE.Mesh(create_geometry(str, options), material);
            str.split('').forEach(function (val) {
                var text = create_geometry(val, options), mesh = new THREE.Mesh(text, material);
                mesh.position.x = xpos + (val === '.' ? 5 : 0);                                   // space before
                xpos = xpos + ((THREE.FontUtils.drawText(val).offset)) + (val === '.' ? 10 : 15); // space after
                THREE.GeometryUtils.merge(merged, mesh);
            });
            merged.computeFaceNormals();
            object = new THREE.Mesh(merged, material);
            object.matrixAutoUpdate = false;
            return object;
        };
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.Four) window.Four = {};
    /**
     * Constructor for a tube.
     * THREE doesnt currently support creating a tube with a line as a path
     * (Spline is supported, but we dont want that), so we create separate tubes and add them to an object.
     * Also linewidth doest seem to work for a LineBasicMaterial, thus using tube
     * @param {Array} points Array of Vector3's
     * @param {String} color hex colour
     * @return {THREE.Object3D}
     */
    window.Four.Tube = function (matlib, points, color) {
        var group, line, tube, i = points.length - 1,
            merged = new THREE.Geometry(), material = matlib.get_material('flat', color);
        while (i--) {
            line = new THREE.LineCurve3(points[i], points[i+1]);
            tube = new THREE.TubeGeometry(line, 1, 0.2, 4, false, false);
            THREE.GeometryUtils.merge(merged, tube);
            merged.computeFaceNormals();
            merged.computeBoundingSphere();
            group = new THREE.Mesh(merged, material);
            group.matrixAutoUpdate = false;
        }
        return group;
    };
})();
/**
 * <strong>LICENSING INFORMATION:</strong>
 * <blockquote><pre>
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * </pre></blockquote>
 * @see <a href="http://www.opengamma.com/">OpenGamma</a>
 * @see <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>
 * @author Alan Ayoub
 * @name JSurface3D
 * @namespace JSurface3D
 * @constructor
 * @param {Object} config surface configuration object
 *     @param {String} config.selector A css selector. This is where the suface will load
 *     @param {Object} config.options Optional overwrides for default values
 *     <pre>
 *         axis_offset: 1.7,           // X and Z axis distance from the surface
 *         camera_focus_y_offset: 0,   // Move the focal point of the camera up and down
 *         debug: false,               // stats.js is required for debugging (https://github.com/mrdoob/stats.js/)
 *         floating_height: 5,         // Height the surface floats over the floor
 *         font_face_3d: 'helvetiker', // 3D text font (glyphs for 3D fonts need to be loaded separately)
 *         font_size: 35,              // 3D text font size (not in any particular units)
 *         font_height: 4,             // Extrusion height for 3D text
 *         font_color: 0x000000,       // Font color for value labels
 *         font_color_axis_labels: 0xcccccc,      // Font color for axis labels
 *         hud: true,                             // Toggle options overlay and volatility display
 *         log: false,                            // Apply natural log by default
 *         interactive_surface_color: 0xff0000,   // Highlight for interactive surface elements (in hex)
 *         interactive_hud_color: '#f00',         // Highlight colour for volatility display (in css)
 *         precision_lbl: 2,                      // Floating point precisions for labels
 *         precision_hud: 3,                      // Floating point precisions for vol display
 *         slice_handle_color: 0xbbbbbb,          // Default colour for slice handles
 *         slice_handle_color_hover: 0x999999,    // Hover colour for slice handles
 *         slice_bar_color: 0xe7e7e7,             // Default slice bar colour
 *         slice_bar_color_active: 0xffbd00,      // Active slice bar colour
 *         smile_distance: 50,                    // Distance the smile planes are from the surface
 *         snap_distance: 3,                      // Mouse proximity to vertices before an interaction is approved
 *         surface_x: 100,                        // Width
 *         surface_z: 100,                        // Depth
 *         surface_y: 40,                         // The height range of the surface
 *         texture_size: 512,                     // Texture map size for axis ticks
 *         tick_length: 20,                       // Axis tick length
 *         y_segments: 10,                        // Number of segments to thin vol out to for smile planes
 *         vertex_shading_hue_min: 180,           // vertex shading hue range min value
 *         vertex_shading_hue_max: 0,             // vertex shading hue range max value
 *         zoom_default: 160,                     // Bigger numbers are further away
 *         zoom_sensitivity: 10                   // Mouse wheel sensitivity
 *     </pre>
 *     @param {Object} config.data surface data object
 *     <pre>
 *         vol       : [],  // Surface data points
 *         xs        : [],  // X axis data points
 *         xs_labels : [],  // X axis labels (optional)
 *         xs_label  : '',  // X axis label
 *         zs        : [],  // X axis data points
 *         zs_labels : [],  // X axis labels (optional)
 *         zs_label  : ''   // X axis label
 *     </pre>
 */
(function () {
    if (!Detector) throw new Error('JSurface3D requires Detector');
    var stylesheet = '[data-og=surface]',
        default_settings = {
            axis_offset: 1.7,           // X and Z axis distance from the surface
            camera_focus_y_offset: 0,   // Move the focal point of the camera up and down
            debug: false,               // stats.js is required for debugging (https://github.com/mrdoob/stats.js/)
            floating_height: 5,         // Height the surface floats over the floor
            font_face_3d: 'helvetiker', // 3D text font (glyphs for 3D fonts need to be loaded separately)
            font_size: 30,              // 3D text font size (not in any particular units)
            font_height: 4,             // Extrusion height for 3D text
            font_color: 0x555555,       // Font color for value labels
            font_color_axis_labels: 0x555555,      // Font color for axis labels
            hud: true,                             // Toggle options overlay and volatility display
            log: false,                            // Apply natural log by default
            interactive_surface_color: 0xff0000,   // Highlight for interactive surface elements (in hex)
            interactive_hud_color: '#f00',         // Highlight colour for volatility display (in css)
            precision_lbl: 2,                      // Floating point precisions for labels
            precision_hud: 3,                      // Floating point precisions for vol display
            slice_handle_color: 0xbbbbbb,          // Default colour for slice handles
            slice_handle_color_hover: 0x999999,    // Hover colour for slice handles
            slice_bar_color: 0xe7e7e7,             // Default slice bar colour
            slice_bar_color_active: 0xffbd00,      // Active slice bar colour
            smile_distance: 50,                    // Distance the smile planes are from the surface
            snap_distance: 3,                      // Mouse proximity to vertices before an interaction is approved
            surface_x: 100,                        // Width
            surface_z: 100,                        // Depth
            surface_y: 40,                         // The height range of the surface
            texture_size: 512,                     // Texture map size for axis ticks
            tick_length: 20,                       // Axis tick length
            y_segments: 10,                        // Number of segments to thin vol out to for smile planes
            vertex_shading_hue_min: 180,           // vertex shading hue range min value
            vertex_shading_hue_max: 0,             // vertex shading hue range max value
            zoom_default: 160,                     // Bigger numbers are further away
            zoom_sensitivity: 10                   // Mouse wheel sensitivity
        };
    /** @ignore */
    window.JSurface3D = function (config) {
        var js3d = this, $selector, animation_frame, timeout, buffers, settings, stats = {},
            renderer, scene, backlight, keylight, filllight, ambientlight;
        js3d.webgl = Detector.webgl ? true : false;
        js3d.data = config.data;
        js3d.selector = $selector = $(config.selector);
        js3d.settings = settings = $.extend({}, default_settings, config.options);
        js3d.local_settings = {play: null, stopping: false};
        js3d.matlib = new Four.Matlib();
        js3d.projector = new THREE.Projector();
        js3d.x_segments = js3d.data.xs.length - 1;
        js3d.z_segments = js3d.data.zs.length - 1;
        js3d.y_segments = settings.y_segments;
        js3d.interactive_meshes = new Four.InteractiveMeshes();
        js3d.buffers = buffers = {};
        js3d.width = null;
        js3d.height = null;
        js3d.camera = null;
        js3d.sel_offset = null;
        js3d.surface_plane = new JSurface3D.SurfacePlane(js3d);
        js3d.slice = new JSurface3D.Slice(js3d);
        js3d.text3d = new Four.Text3D(js3d.matlib, js3d.settings);
        js3d.surface_world = new JSurface3D.SurfaceWorld(js3d);
        js3d.hud = new JSurface3D.Hud(js3d, $selector, stylesheet);
        js3d.vol_max = Math.max.apply(null, js3d.data.vol);
        js3d.vol_min = Math.min.apply(null, js3d.data.vol);
        js3d.groups = {animation: new THREE.Object3D()};
        /**
         * Clean up after JSurface3D. Dealocate buffers, cancel animation frame, <br />
         * removes shared stylesheet (optional)
         *
         * @function
         * @name JSurface3D.prototype.die
         * @type undefined
         * @param {Boolean} all removes shared stylesheet
         */
        js3d.die = function (all) {
            buffers.load.clear();
            cancelAnimationFrame(animation_frame);
            if (all) {$(stylesheet).remove();}
        };
        /**
         * Partialy reloads the scene. Resizes the canvas, reloads the hud, rerenderes the scene
         * @function
         * @name JSurface3D.prototype.resize
         * @type undefined
         */
        js3d.resize = function () {
            var width = js3d.width = $selector.width(), height = js3d.height = $selector.height(), camera = js3d.camera;
            js3d.sel_offset = $selector.offset();
            $selector.find('> canvas').css({width: width, height: height});
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.render(scene, camera);
            js3d.hud.load();
        };
        /**
         * Call update to rerender the surface with new data or reload the whole scene
         * @function
         * @name JSurface3D.prototype.update
         * @param {String} level What to update, the whole 'world' or just the 'surface'.
         * @param {Object} data New data for the surface, if omited the surface will update with the last data it received.
         * @type undefined
         */
        js3d.update = function (level, data) {
            js3d.surface_world.init_data(data || js3d.data);
            if (level === 'world') {
                buffers.hover.clear();
                buffers.slice.clear();
                buffers.surface.clear();
                js3d.groups.animation.add(js3d.surface_world.create_world());
                if (js3d.webgl) js3d.slice.load();
            }
            if (level === 'surface') js3d.surface_plane.update();
        };
        /** @ignore */
        js3d.load = function () {
            var animation_group = js3d.groups.animation, camera;
            scene = new THREE.Scene();
            js3d.sel_offset = $selector.offset();
            js3d.width = $selector.width();
            js3d.height = $selector.height();
            js3d.vertex_sphere = new THREE.Mesh(
                new THREE.SphereGeometry(1.5, 10, 10),
                js3d.matlib.get_material('phong', settings.interactive_surface_color)
            );
            js3d.vertex_sphere.matrixAutoUpdate = false;
            js3d.vertex_sphere.visible = false;
            js3d.renderer = renderer = js3d.webgl ?
                new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer();
            renderer.setSize(js3d.width, js3d.height);
            /* buffers */
            buffers.load = new Four.Buffer(renderer, scene);
            buffers.hover = new Four.Buffer(renderer, scene);
            buffers.slice = new Four.Buffer(renderer, scene);
            buffers.surface = new Four.Buffer(renderer, scene);
            buffers.load.add(animation_group);
            /* lights */
            keylight = new THREE.DirectionalLight(0xf2f6ff, 0.7, 300);  // surface light
            backlight = new THREE.DirectionalLight(0xf2f6ff, 0.5, 500); // smile left
            filllight = new THREE.DirectionalLight(0xf2f6ff, 0.5, 500); // smile right
            ambientlight = new THREE.AmbientLight(0xffffff);
            keylight.position.set(-80, 150, 80);
            backlight.position.set(-150, 100, 100);
            filllight.position.set(100, 100, 150);
            /* init data */
            js3d.surface_world.init_data(js3d.data);
            /* animation group */
            animation_group.add(ambientlight);
            animation_group.add(backlight);
            animation_group.add(keylight);
            animation_group.add(filllight);
            animation_group.add(js3d.surface_world.create_world());
            animation_group.rotation.y = Math.PI * 0.25;
            /* camera */
            camera = js3d.camera = new THREE.PerspectiveCamera(45, js3d.width / js3d.height, 1, 1000);
            camera.position.x = 0;
            camera.position.y = 125;
            camera.position.z = settings.zoom_default;
            camera.lookAt({x: 0, y: 0 + settings.camera_focus_y_offset, z: 0});
            /* scene */
            scene.add(animation_group);
            scene.add(camera);
            /* render scene */
            $selector.html(renderer.domElement).find('canvas').css({position: 'relative'});
            js3d.hud.load();
            /* stats */
            if (settings.debug) {
                stats.loop = new Stats();
                stats.loop.domElement.style.position = 'absolute';
                stats.loop.domElement.style.top = '0';
                stats.loop.domElement.style.right = '0';
                $(stats.loop.domElement).appendTo($selector);
                stats.render = new Stats();
                stats.render.domElement.style.position = 'absolute';
                stats.render.domElement.style.top = '50px';
                stats.render.domElement.style.right = '0';
                $(stats.render.domElement).appendTo($selector);
            }
            js3d.surface_world.interactive();
            if (js3d.webgl) js3d.slice.load();
        };
        js3d.load();
        /** @ignore */
        (function animate() {
            if (settings.debug) stats.loop.update();
            if (js3d.local_settings.play === null || js3d.local_settings.play) {
                renderer.render(scene, js3d.camera);
                if (settings.debug) stats.render.update();
                if (!js3d.local_settings.stopping)
                    clearTimeout(timeout), timeout = setTimeout(function () {js3d.local_settings.play = false;}, 5000);
                js3d.local_settings.stopping = true;
            }
            animation_frame = requestAnimationFrame(animate);
        }());
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.JSurface3D) throw new Error('JSurface3D.SurfaceWorld requires JSurface3D');
    var last_vertex;
    /**
     * Implements any valid hover interaction with the surface.
     * Adds vertex_sphere, lines (tubes), active axis labels
     * @private
     * @param {Object} js3d An instance of JSurface3D
     * @param {THREE.Vector3} vertex The vertex within settings.snap_distance of the mouse
     * @param {Number} index The index of the vertex
     * @param {THREE.Mesh} object The closest object to the camera that THREE.Ray returned
     */
    var hover = function (js3d, vertex, index, object) {
        var hover_buffer = js3d.buffers.hover, hover_group = js3d.groups.hover, matlib = js3d.matlib,
            vertex_sphere = js3d.vertex_sphere, settings = js3d.settings;
        if (vertex === last_vertex) return;
        if (hover_group) js3d.groups.surface_top.remove(hover_group), hover_buffer.clear();
        last_vertex = vertex;
        hover_group = hover_buffer.add(new THREE.Object3D());
        hover_group.name = 'Hover Group';
        vertex_sphere.position.copy(vertex);
        vertex_sphere.position.y += js3d.settings.floating_height;
        vertex_sphere.updateMatrix();
        vertex_sphere.visible = true;
        (function () {
            // [xz]from & [xz]to are the start and end vertex indexes for a vertex row or column
            var x, xvertices = [], xvertices_bottom = [], z, zvertices = [], zvertices_bottom = [],
                color = settings.interactive_surface_color,
                xfrom = index - (index % (js3d.x_segments + 1)),
                xto   = xfrom + js3d.x_segments + 1,
                zfrom = index % (js3d.x_segments + 1),
                zto   = ((js3d.x_segments + 1) * (js3d.z_segments + 1)) - (js3d.x_segments - zfrom);
            for (x = xfrom; x < xto; x++) xvertices.push(object.geometry.vertices[x]);
            for (z = zfrom; z < zto; z += js3d.x_segments + 1) zvertices.push(object.geometry.vertices[z]);
            js3d.hud.set_volatility(js3d.data.vol[index]);
            // surface lines
            (function () {
                var xlft = js3d.x_segments - js3d.slice.lft_x_handle_position,
                    xrgt = js3d.x_segments - js3d.slice.rgt_x_handle_position,
                    zlft = js3d.z_segments - js3d.slice.lft_z_handle_position,
                    zrgt = js3d.z_segments - js3d.slice.rgt_z_handle_position,
                    zmin = Math.min.apply(null, [zlft, zrgt]),
                    zmax = Math.max.apply(null, [zlft, zrgt]),
                    xmin = Math.min.apply(null, [xlft, xrgt]),
                    xmax = Math.max.apply(null, [xlft, xrgt]),
                    x_surface_lines = new Four.Tube(matlib, xvertices.slice(xmin, xmax + 1), color),
                    z_surface_lines = new Four.Tube(matlib, zvertices.slice(zmin, zmax + 1), color);
                x_surface_lines.name = 'X Surface Lines';
                z_surface_lines.name = 'Z Surface Lines';
                hover_group.add(x_surface_lines);
                hover_group.add(z_surface_lines);
            }());
            // smile z, z and y lines
            (function () {
                var yvertices = [{x: 0, y: 0, z: vertex.z}, {x: 0, y: settings.surface_y, z: vertex.z}],
                    zlines = new Four.Tube(matlib, zvertices, color), ylines = new Four.Tube(matlib, yvertices, color);
                zlines.name = 'Smile Z, Z Hover Lines';
                ylines.name = 'Smile Z, Y Hover Lines';
                zlines.position.x = Math.abs(zvertices[0].x - settings.surface_x / 2) + settings.smile_distance;
                ylines.position.x = settings.surface_x / 2 + settings.smile_distance;
                zlines.matrixAutoUpdate = false;
                ylines.matrixAutoUpdate = false;
                zlines.updateMatrix();
                ylines.updateMatrix();
                hover_group.add(zlines);
                hover_group.add(ylines);
            }());
            // smile x, x and y lines
            (function () {
                var yvertices = [{x: vertex.x, y: 0, z: 0}, {x: vertex.x, y: settings.surface_y, z: 0}],
                    xlines = new Four.Tube(matlib, xvertices, color), ylines = new Four.Tube(matlib, yvertices, color);
                xlines.name = 'Smile X, X Hover Lines';
                ylines.name = 'Smile X, Y Hover Lines';
                xlines.position.z = -((settings.surface_z / 2) + xvertices[0].z + settings.smile_distance);
                ylines.position.z = -(settings.surface_z / 2) - settings.smile_distance;
                xlines.matrixAutoUpdate = false;
                ylines.matrixAutoUpdate = false;
                xlines.updateMatrix();
                ylines.updateMatrix();
                hover_group.add(xlines);
                hover_group.add(ylines);
            }());
            // bottom grid, x and z lines
            (function () {
                var xlines, zlines;
                xvertices_bottom.push(xvertices[0].clone(), xvertices[xvertices.length-1].clone());
                xvertices_bottom[0].y = xvertices_bottom[1].y = -settings.floating_height;
                zvertices_bottom.push(zvertices[0].clone(), zvertices[zvertices.length-1].clone());
                zvertices_bottom[0].y = zvertices_bottom[1].y = -settings.floating_height;
                xlines = new Four.Tube(matlib, xvertices_bottom, color);
                zlines = new Four.Tube(matlib, zvertices_bottom, color);
                xlines.name = 'Bottom Grid X Hover lines';
                zlines.name = 'Bottom Grid Z Hover lines';
                xlines.matrixAutoUpdate = false;
                zlines.matrixAutoUpdate = false;
                hover_group.add(xlines);
                hover_group.add(zlines);
            }());
            // surface labels
            ['x', 'z'].forEach(function (val) {
                var data = js3d.data, lbl_arr = data[val + 's_labels'] || data[val + 's'], width, offset, lbl, vertices,
                    txt = val === 'x'
                        ? lbl_arr[index % (js3d.x_segments + 1)]
                        : lbl_arr[~~(index / (js3d.x_segments + 1))],
                    scale = '0.1', group = new THREE.Object3D();
                group.name = 'Surface Label ' + val;
                // create label
                lbl = js3d.text3d(txt, color);
                lbl.matrixAutoUpdate = false;
                width = lbl.geometry.boundingSphere.radius / 2;
                offset = ((width / 2) * scale) + (width * 0.05); // half the width * scale + a relative offset
                vertices = val === 'x' ? zvertices : xvertices;
                group.add(lbl);
                // create box
                (function () {
                    var height = 60,
                        box_width = (width * 2) + 20,
                        box = new THREE.CubeGeometry(box_width, height, 4, 4, 0, 0),
                        mesh = new THREE.Mesh(box, matlib.get_material('phong', 0xdddddd));
                    mesh.position.x = box_width / 2 - 10;
                    mesh.position.y = 20;
                    // create the tail by moving the 2 center vertices closes to the surface
                    mesh.geometry.vertices.filter(function (val) {
                        return (val.x === 0 && val.y === height / 2);
                    }).forEach(function (vertex) {vertex.y = height;});
                    mesh.matrixAutoUpdate = false;
                    mesh.updateMatrix();
                    group.add(mesh);
                }());
                // position / rotation
                group.scale.set(scale, scale, scale);
                group.position.y = -settings.floating_height + 0.5;
                group.rotation.x = -Math.PI * 0.5;
                if (val === 'x') {
                    group.position.x = vertices[0][val] - offset;
                    group.position.z = (settings.surface_z / 2) + 12 + settings.axis_offset;
                    group.position.z = (settings.surface_z / 2) + 12 + settings.axis_offset;
                }
                if (val === 'z') {
                    group.position.x = -((settings.surface_x / 2) + 12) - settings.axis_offset;
                    group.position.z = vertices[0][val] - offset;
                    group.rotation.z = -Math.PI * 0.5;
                }
                group.matrixAutoUpdate = false;
                group.updateMatrix();
                hover_group.matrixAutoUpdate = false;
                hover_group.updateMatrix();
                hover_group.add(group);
            });
        }());
        js3d.groups.surface_top.add(js3d.groups.hover = hover_group);
    };
    /**
     * Test if the cursor is over a mesh
     * @event {Object} mouse event object
     * @meshes {Array} meshes array of meshes to test
     * @return {Object} THREE.Ray intersects object
     */
    var intersects_mesh = function (js3d, event, meshes) {
        var mouse = {x: 0, y: 0}, vector, ray;
        mouse.x = ((event.pageX - js3d.sel_offset.left) / js3d.width) * 2 - 1;
        mouse.y = -((event.pageY - js3d.sel_offset.top) / js3d.height) * 2 + 1;
        vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        js3d.projector.unprojectVector(vector, js3d.camera);
        ray = new THREE.Ray(js3d.camera.position, vector.subSelf(js3d.camera.position).normalize());
        return ray.intersectObjects(meshes);
    };
    /**
     * Creates all geomerty, initializes data and implements interactions
     * @name JSurface3D.SurfaceWorld
     * @namespace JSurface3D.SurfaceWorld
     * @param {Object} js3d JSurface3D instance
     * @private
     * @constructor
     */
    window.JSurface3D.SurfaceWorld = function (js3d) {
        var surface_world = this, settings = js3d.settings, matlib = js3d.matlib, webgl = js3d.webgl;
        /**
         * Creates all the geomerty and groups, removes existing items first
         * @name JSurface3D.SurfaceWorld.prototype.create_world
         * @function
         * @private
         * @return {THREE.Object3D}
         */
        surface_world.create_world = function () {
            var groups = js3d.groups, buffers = js3d.buffers;
            if (groups.surface) groups.animation.remove(groups.surface), buffers.surface.clear();
            js3d.interactive_meshes.remove('surface');
            groups.surface = new THREE.Object3D();
            groups.surface.name = 'Surface Group';
            groups.slice = buffers.slice.add(new THREE.Object3D());
            groups.slice.name = 'Slice Group';
            groups.surface_top = new THREE.Object3D();
            groups.surface_bottom = new THREE.Object3D();
            if (typeof js3d.surface_plane === 'object') js3d.surface_plane.update();
            else js3d.surface_plane.init();
            groups.slice.add(js3d.surface_plane);
            if (webgl) {
                // create bottom grid
                (function () {
                    var grid = Four.multimaterial_object(
                        JSurface3D.plane(js3d, 'surface'),
                        matlib.get_material('compound_grid_wire')
                    );
                    grid.overdraw = true;
                    grid.matrixAutoUpdate = false;
                    groups.surface_bottom.add(buffers.surface.add(grid));
                })();
                // create floor
                (function () {
                    var floor = Four.multimaterial_object(
                        new THREE.PlaneGeometry(5000, 5000, 100, 100),
                        matlib.get_material('compound_floor_wire')
                    );
                    floor.rotation.x = - Math.PI / 2;
                    floor.position.y = -0.01;
                    groups.surface_bottom.add(buffers.surface.add(floor));
                })();
                // create axes
                (function () {
                    var x_axis = JSurface3D.Axis({axis: 'x'}, js3d),
                        z_axis = JSurface3D.Axis({axis: 'z'}, js3d);
                    x_axis.position.z = settings.surface_z / 2 + settings.axis_offset;
                    z_axis.position.x = -settings.surface_x / 2 - settings.axis_offset;
                    z_axis.rotation.y = -Math.PI * 0.5;
                    groups.surface_bottom.add(x_axis);
                    groups.surface_bottom.add(z_axis);
                })();
                groups.surface_top.add(JSurface3D.smile(js3d));
                groups.animation.add(js3d.vertex_sphere);
                groups.surface_top.position.y = js3d.settings.floating_height;
                groups.surface.add(groups.surface_bottom);
            }
            groups.surface.add(buffers.surface.add(groups.surface_top));
            groups.surface.add(groups.slice);
            return groups.surface;
        };
        /**
         * Scale data to fit surface dimensions, apply Log (to x and z) if enabled
         * @name JSurface3D.SurfaceWorld.prototype.init_data
         * @param {Object} data
         * @function
         * @private
         */
        surface_world.init_data = function (data) {
            var log = function (arr) {return arr.map(function (val) {return Math.log(val);});};
            // adjusted data is the original data scaled to fit 2D grids width/length/height.
            // It is used to set the distance between plane segments. Then the real data is used as the values
            js3d.adjusted_vol = Four.scale(data.vol, 0, settings.surface_y);
            js3d.adjusted_xs = Four.scale(
                js3d.settings.log ? log(data.xs) : data.xs,
                -(settings.surface_x / 2), settings.surface_x / 2
            );
            js3d.adjusted_zs = Four.scale(
                js3d.settings.log ? log(data.zs) : data.zs,
                -(settings.surface_z / 2), settings.surface_z / 2
            );
            // data.ys doesnt exist, so we need to create js3d.adjusted_ys manualy out of the given
            // vol plane range: 0 - settings.surface_y
            js3d.adjusted_ys = (function () {
                var increment = settings.surface_y / js3d.y_segments, arr = [], i;
                for (i = 0; i < js3d.y_segments + 1; i++) arr.push(i * increment);
                return arr;
            }());
            // create data.ys out of js3d.vol_min and js3d.vol_max, call it ys not to confuse with config paramater
            // we are not using ys to create js3d.adjusted_ys as we want more control over js3d.adjusted_ys
            // than a standard Four.scale
            js3d.ys = (function () {
                var increment = (js3d.vol_max - js3d.vol_min) / js3d.y_segments, arr = [], i;
                for (i = 0; i < js3d.y_segments + 1; i++)
                    arr.push((+js3d.vol_min + (i * increment)).toFixed(settings.precision_lbl));
                return arr;
            }());
        };
        /**
         * Implement interactivity
         * @name JSurface3D.SurfaceWorld.prototype.interactive
         * @function
         * @private
         */
        surface_world.interactive = function () {
            var imeshes = js3d.interactive_meshes.meshes, groups = js3d.groups,
                $selector = js3d.selector, surface_hittest, handle_hittest, // store the return of successful raycasts
                mousedown = false, sx = 0, sy = 0, mouse_x = null, mouse_y = null,
                hit_handle = false, rotation_enabled = true, slice_enabled = false;
            /**
             * Populate surface_hittest and handle_hittest
             * Trigger rotate_world and slice_handle_drag events
             */
            $selector.on('mousemove.surface.interactive', function (event) {
                event.preventDefault();
                js3d.local_settings.play = true;
                js3d.local_settings.stopping = false;
                var xlft = intersects_mesh(js3d, event, [imeshes.lft_x_handle]),
                    xrgt = intersects_mesh(js3d, event, [imeshes.rgt_x_handle]),
                    zlft = intersects_mesh(js3d, event, [imeshes.lft_z_handle]),
                    zrgt = intersects_mesh(js3d, event, [imeshes.rgt_z_handle]);
                /**
                 * slice handle interactions
                 */
                hit_handle = false;
                if (xlft.length) handle_hittest = xlft, handle_hittest[0].lbl = 'lft_x_handle', hit_handle = true;
                if (xrgt.length) handle_hittest = xrgt, handle_hittest[0].lbl = 'rgt_x_handle', hit_handle = true;
                if (zlft.length) handle_hittest = zlft, handle_hittest[0].lbl = 'lft_z_handle', hit_handle = true;
                if (zrgt.length) handle_hittest = zrgt, handle_hittest[0].lbl = 'rgt_z_handle', hit_handle = true;
                hit_handle ? $selector.trigger('handle_over') : $selector.trigger('handle_out');
                /**
                 * surface interaction
                 */
                surface_hittest = intersects_mesh(js3d, event, [imeshes.surface]);
                if (surface_hittest.length > 0 && surface_hittest[0].face.materialIndex === 1)
                    $selector.trigger('surface_over', surface_hittest);
                else $selector.trigger('surface_out');
                /**
                 * original mouse x & y
                 */
                mouse_x = event.pageX;
                mouse_y = event.pageY;
                /**
                 * Trigger custom events
                 */
                if (mousedown && rotation_enabled) $selector.trigger('rotate_world', event);
                if (webgl && mousedown && slice_enabled) $selector.trigger('slice_handle_drag', event);
            });
            $selector.on('rotate_world', function () {
                var dx = mouse_x - sx, dy = mouse_y - sy;
                groups.animation.rotation.y += dx * 0.01;
                groups.animation.rotation.x += dy * 0.01;
                sx += dx, sy += dy;
            });
            $selector.on('mousedown.surface.interactive', function (event) {
                event.preventDefault();
                mousedown = true, sx = event.pageX, sy = event.pageY;
                if (hit_handle) $selector.trigger('slice_handle_click');
                $(document).on('mouseup.surface.interactive', function () {
                    rotation_enabled = true;
                    slice_enabled = false;
                    mousedown = false;
                    $(document).off('mouse.surface.interactive');
                });
            });
            $selector.on('mousewheel.surface.interactive', function (event, direction) {
                if (!direction) return; // jquery mousewheel plugin doesnt exist
                var camera = js3d.camera, pos = camera.position.z - (direction * settings.zoom_sensitivity);
                camera.position.z = pos < 1 ? 1 : pos;
                camera.lookAt({x: 0, y: 0, z: 0});
            });
            /**
             * Only implement hover interactivity for webgl browsers
             */
            if (!webgl) return;
            $selector.on('surface_over', function (event, intersects) {
                var faces = 'abcd', i = 0, index, vertex, vertex_world_position,
                    intersected_obj = $.isArray(intersects) ? intersects[0] : intersects,
                    object = intersected_obj.object, point = intersected_obj.point;
                for (; i < 4; i++) { // loop through vertices
                    index = intersected_obj.face[faces.charAt(i)];
                    vertex = object.geometry.vertices[index];
                    vertex_world_position = object.matrixWorld.multiplyVector3(vertex.clone());
                    if (vertex_world_position.distanceTo(point) < settings.snap_distance) {
                        hover(js3d, vertex, index, object);
                    }
                }
            });
            $selector.on('surface_out', function () {
                if (groups.hover) {
                    groups.surface_top.remove(groups.hover);
                    last_vertex = null;
                    js3d.buffers.hover.clear();
                }
                js3d.vertex_sphere.visible = false;
                js3d.hud.set_volatility();
            });
            $selector.on('handle_over', function () {
                js3d.slice.reset_handle_material();
                handle_hittest[0].object.material = matlib.get_material('phong', settings.slice_handle_color_hover);
                $selector.css({cursor: 'pointer'});
            });
            $selector.on('handle_out', function () {
                js3d.slice.reset_handle_material();
                $selector.css({cursor: 'default'});
            });
            $selector.on('slice_handle_click', function () {
                slice_enabled = true;
                rotation_enabled = false;
            });
            /**
             * Move the drag handles and update the bar
             */
            $selector.on('slice_handle_drag', function (event, original_event) {
                var handle_lbl = handle_hittest[0].lbl, axis = handle_lbl.replace(/^.*_([xz])_.*$/, '$1'),
                    particles = js3d.slice[axis + '_particles'];
                (function () {
                    var intersects = intersects_mesh(js3d, original_event, [js3d.slice.intersection_plane]),
                        vertices = particles.geometry.vertices, vertex, vertex_world_position, index,
                        i = vertices.length, dist = [] /* distances from raycast/plane intersection & particles */;
                    while (i--) {
                        vertex = vertices[i];
                        vertex_world_position = particles.matrixWorld.multiplyVector3(vertices[i].clone());
                        dist[i] = vertex_world_position.distanceTo(intersects[0].point);
                    }
                    index = dist.indexOf(Math.min.apply(null, dist));
                    if (index !== js3d.slice[handle_lbl + '_position']) {
                        js3d.slice.reset_handle_material();
                        handle_hittest[0].object.material = matlib
                            .get_material('phong', settings.slice_handle_color_hover);
                        /**
                         * move handles along particles
                         */
                        js3d.slice[handle_lbl + '_position'] = index;
                        js3d.slice[handle_lbl].position[axis] = vertices[index].x;
                        /**
                         * recreate surface plane
                         */
                        js3d.surface_plane.update();
                        /**
                         * update resize bars
                         */
                        js3d.slice.create_slice_bar(axis);
                    }
                }());
            });
        };
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.JSurface3D) throw new Error('JSurface3D.Axis requires JSurface3D');
    /**
     * Remove every nth item in Array keeping the first and last,
     * also specifically remove the second last (as we want to keep the last)
     * @private
     * @param {Array} arr
     * @param {Number} nth
     * @returns {Array}
     */
    var thin = function (arr, nth) {
        if (!nth || nth === 1) return arr;
        var len = arr.length;
        return arr.filter(function (val, i) {
            return ((i === 0) || !(i % nth) || (i === (len -1))) || (i === (len -2)) && false
        });
    };
    /**
     * Creates an Axis with labels for the bottom grid
     * @name JSurface3D.Axis
     * @namespace JSurface3D.Axis
     * @param {Object} config
     * <pre>
     *     axis     {String} x or z
     *     spacing  {Array}  Array of numbers adjusted to fit units of mesh
     *     labels   {Array}  Array of labels
     *     label    {String} Axis label
     * </pre>
     * @param {Object} js3d A JSurface3D instance
     * @private
     * @return {THREE.Object3D}
     */
    window.JSurface3D.Axis = function (config, js3d) {
        var axis = config.axis, spacing = js3d['adjusted_' + axis + 's'],
            values = js3d.data[config.axis + 's_labels'] || (axis === 'y' ? js3d[axis + 's'] : js3d.data[axis + 's']),
            lbl = axis === 'y' ? null : js3d.data[axis + 's_label'],
            mesh = new THREE.Object3D(), i, nth = Math.ceil(spacing.length / 6),
            lbl_arr = thin(values, nth), pos_arr = thin(spacing, nth), settings = js3d.settings,
            axis_len = settings['surface_' + axis];
        mesh.name = axis + ' Axis';
        (function () { // axis values
            var value, n;
            for (i = 0; i < lbl_arr.length; i++) {
                n = lbl_arr[i];
                n = n % 1 === 0 || isNaN(n % 1) ? n : (+n).toFixed(settings.precision_lbl).replace(/0+$/, '');
                value = js3d.text3d(n+'', settings.font_color);
                value.scale.set(0.1, 0.1, 0.1);
                if (config.axis === 'y') {
                    value.position.x = pos_arr[i] - 6;
                    value.position.z = config.right
                        ? -(THREE.FontUtils.drawText(n).offset * 0.2) + 18
                        : 2;
                    value.rotation.z = -Math.PI * 0.5;
                    value.rotation.x = -Math.PI * 0.5;
                } else {
                    value.rotation.x = -Math.PI * 0.5;
                    value.position.x = pos_arr[i] - ((THREE.FontUtils.drawText(n).offset * 0.2) / 2);
                    value.position.y = 0.1;
                    value.position.z = 12;
                }
                value.matrixAutoUpdate = false;
                value.updateMatrix();
                js3d.buffers.load.add(value);
                mesh.add(value);
            }
        }());
        (function () { // axis label
            if (!lbl) return;
            var label = js3d.text3d(lbl, settings.font_color_axis_labels, true, true);
            label.scale.set(0.2, 0.2, 0.1);
            label.rotation.x = -Math.PI * 0.5;
            label.position.x = -(axis_len / 2) -3;
            label.position.y = 1;
            label.position.z = 22;
            label.matrixAutoUpdate = false;
            label.updateMatrix();
            js3d.buffers.load.add(label);
            mesh.add(label);
        }());
        (function () { // axis ticks
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                plane = new THREE.PlaneGeometry(axis_len, 5, 0, 0),
                axis = new THREE.Mesh(plane, js3d.matlib.texture(new THREE.Texture(canvas))),
                tick_stop_pos =  settings.tick_length + 0.5,
                labels = thin(spacing.map(function (val) {
                    // if not y axis offset half. y planes start at 0, x and z start at minus half width
                    var offset = config.axis === 'y' ? 0 : axis_len / 2;
                    return (val + offset) * (settings.texture_size / axis_len);
                }), nth);
            plane.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
            canvas.width = settings.texture_size;
            canvas.height = 32;
            ctx.beginPath();
            ctx.lineWidth = 2;
            for (i = 0; i < labels.length; i++)
                ctx.moveTo(labels[i] + 0.5, tick_stop_pos), ctx.lineTo(labels[i] + 0.5, 0);
            ctx.moveTo(0.5, tick_stop_pos);
            ctx.lineTo(0.5, 0.5);
            ctx.lineTo(canvas.width - 0.5, 0.5);
            ctx.lineTo(canvas.width - 0.5, tick_stop_pos);
            ctx.stroke();
            axis.material.map.needsUpdate = true;
            axis.doubleSided = true;
            if (config.axis === 'y') {
                if (config.right) axis.rotation.x = Math.PI, axis.position.z = 20;
                axis.position.x = (axis_len / 2) - 4;
            } else {
                axis.position.z = 5;
            }
            axis.matrixAutoUpdate = false;
            axis.updateMatrix();
            js3d.buffers.surface.add(axis);
            mesh.add(axis);
        }());
        return mesh;
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.JSurface3D) throw new Error('JSurface3D.Hud requires JSurface3D');
    /**
     * Create the html overlay with the log option and volatility display
     * @param {Object} js3d A JSurface3D instance
     * @param {String} $selector A Jquery selector to the surfaces container
     * @param {String} stylesheet Selector to the surfaces shared stylesheet location
     * @name JSurface3D.Hud
     * @namespace JSurface3D.Hud
     * @private
     * @constructor
     */
    window.JSurface3D.Hud = function (js3d, $selector, stylesheet) {
        var hud = this, settings = js3d.settings;
        /**
         * Loads 2D overlay display with form
         * @name JSurface3D.Hud.load
         * @function
         * @private
         */
        hud.load = function () {
            if (!settings.hud) return;
            $selector.find('.js3d').remove();
            (function () {
                if ($(stylesheet).length) return;
                var css = '\
                    .js3d {bottom: 10px; left: 10px; top: 0; position: absolute;}\
                    .js3d .j-o {position: absolute; top: 10px; white-space: nowrap;}\
                    .js3d .j-o input {vertical-align: top;}\
                    .js3d .j-v {padding-top: 9px; padding-bottom: 3px; position: absolute; bottom: 0;}\
                    .js3d .j-v canvas {border: 1px solid #ccc;}\
                    .js3d .j-v span {position: absolute; left: 20px;}\
                    .js3d .j-v .j-max {top: 0;}\
                    .js3d .j-v .j-min {bottom: 0;}\
                    .js3d .j-v .j-vol {display: none; background: #eee; border: 1px solid #ddd; padding: 0 5px;}\
                    .js3d .j-v .j-vol:after {content: ""; display: block; position: absolute; \
                        width: 0; height: 0; left: -10px; top: 50%; margin-top: -4px; \
                        border-top: 5px solid transparent; border-right: 10px solid #ddd; \
                        border-bottom: 5px solid transparent;}',
                    head = document.querySelector('head'), style = document.createElement('style');
                style.setAttribute('data-og', 'surface');
                if (style.styleSheet) style.styleSheet.cssText = css; // IE
                else style.appendChild(document.createTextNode(css));
                head.appendChild(stylesheet = style);
            })();
            var tmpl = '\
                <div class="js3d">\
                  <div class="j-o"><label>Log<input type="checkbox" checked="checked" /></label></div>\
                  <div class="j-v">\
                    <span class="j-max">{{max}}</span><span class="j-min">{{min}}</span><span class="j-vol"></span>\
                    <canvas>canvas</canvas>\
                  </div>\
                </div>',
                min = js3d.vol_min.toFixed(settings.precision_hud), max = js3d.vol_max.toFixed(settings.precision_hud),
                html = tmpl.replace(/\{\{(?:max|min)\}\}/g, function (m) {return m === '{{min}}' ? min : max;}),
                $html = $(html).appendTo($selector);
            hud.vol_canvas_height = js3d.height / 2;
            if (js3d.webgl) hud.volatility($html.find('canvas')[0]);
            else $html.find('.j-v').hide();
            hud.form();
        };
        /**
         * Attach change handler to log option
         * @function
         * @private
         * @ignore
         */
        hud.form = function () {
            $selector.find('.j-o input').prop('checked', js3d.settings.log).on('change', function () {
                js3d.settings.log = $(this).is(':checked');
                js3d.update('world');
            });
        };
        /**
         * Set a value in the 2D volatility display
         * @param {Number} value The value to set. If value is not a number the indicator is hidden
         * @function
         * @private
         * @ignore
         */
        hud.set_volatility = function (value) {
            if (!settings.hud) return;
            var top = (Four.scale([js3d.vol_min, value, js3d.vol_max], hud.vol_canvas_height, 0))[1],
                css = {top: top + 'px', color: settings.interactive_hud_color},
                $vol = $selector.find('.j-vol');
            typeof value === 'number'
                ? $vol.html(value.toFixed(settings.precision_hud)).css(css).show()
                : $vol.empty().hide();
        };
        hud.vol_canvas_height = null;
        /**
         * Volatility gradient canvas
         * @param {Object} canvas html canvas element
         * @function
         * @private
         * @ignore
         */
        hud.volatility = function (canvas) {
            var ctx = canvas.getContext('2d'), gradient,
                min_hue = settings.vertex_shading_hue_min, max_hue = settings.vertex_shading_hue_max,
                steps = Math.abs(max_hue - min_hue) / 60, stop;
            gradient = ctx.createLinearGradient(0, 0, 0, hud.vol_canvas_height);
            canvas.width = 10;
            canvas.height = hud.vol_canvas_height;
            gradient.addColorStop(0, 'hsl(' + max_hue + ', 100%, 50%)');
            while (steps--) { // 60: the number of hue increaments before one color starts fading in and another out
                stop = (steps * 60 / (min_hue / 100)) / 100;
                gradient.addColorStop(stop, 'hsl(' + steps * 60 + ', 100%, 50%)');
                gradient.addColorStop(stop, 'hsl(' + steps * 60 + ', 100%, 50%)');
            }
            gradient.addColorStop(1, 'hsl(' + min_hue + ', 100%, 50%)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 10, hud.vol_canvas_height);
        };
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.JSurface3D) throw new Error('JSurface3D.Plane requires JSurface3D');
    /**
     * Creates a plane with the correct segments and spacing
     * @name JSurface3D.plane
     * @namespace JSurface3D.plane
     * @param {Object} js3d A JSurface3D instance
     * @param {String} type The type of plane to create. 'surface', 'smilex' or 'smiley'
     * @function
     * @private
     * @returns {THREE.PlaneGeometry}
     */
    window.JSurface3D.plane = function (js3d, type) {
        var xlen, ylen, xseg, yseg, xoff, yoff, plane, vertex, len, i, k, settings = js3d.settings;
        if (type === 'surface') {
            xlen = settings.surface_x;
            ylen = settings.surface_z;
            xseg = js3d.x_segments;
            yseg = js3d.z_segments;
            xoff = js3d.adjusted_xs;
            yoff = js3d.adjusted_zs;
        }
        if (type === 'smilex') {
            xlen = settings.surface_x;
            ylen = settings.surface_y;
            xseg = js3d.x_segments;
            yseg = js3d.y_segments;
            xoff = js3d.adjusted_xs;
            yoff = js3d.adjusted_ys;
        }
        if (type === 'smiley') {
            xlen = settings.surface_y;
            ylen = settings.surface_z;
            xseg = js3d.y_segments;
            yseg = js3d.z_segments;
            xoff = js3d.adjusted_ys;
            yoff = js3d.adjusted_zs;
        }
        plane = new THREE.PlaneGeometry(xlen, ylen, xseg, yseg);
        plane.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        len = (xseg + 1) * (yseg + 1);
        for (i = 0, k = 0; i < len; i++, k++) {
            vertex = plane.vertices[i];
            if (typeof xoff[k] === 'undefined') k = 0;
            vertex.x = xoff[k];
            vertex.z = yoff[Math.floor(i / xoff.length)];
        }
        return plane;
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.JSurface3D) throw new Error('JSurface3D.Slice requires JSurface3D');
    /**
     * Slice handle constructor
     * @return {THREE.Mesh}
     */
    var Handle = function (matlib, settings) {
        var geo = new THREE.CubeGeometry(3, 1.2, 3, 2, 0, 0);
        geo.vertices // move middle vertices out to a point
            .filter(function (val) {return (val.x === 0 && val.z === -1.5);})
            .forEach(function (vertex) {vertex.z = -2.9;});
        return new THREE.Mesh(geo, matlib.get_material('phong', settings.slice_handle_color));
    };
    /**
     * Slice Bar constructor
     * @param {Object} matlib material library
     * @param {Object} settings settings
     * @param {String} orientation 'x' or 'z'
     * @return {THREE.Mesh}
     */
    var SliceBar = function (matlib, settings, orientation) {
        var geo = new THREE.CubeGeometry(settings['surface_' + orientation], 1, 2, 0, 0),
            mesh = new THREE.Mesh(geo, matlib.get_material('phong', settings.slice_bar_color));
        if (orientation === 'x') mesh.position.z = settings.surface_z / 2 + 1.5 + settings.axis_offset;
        if (orientation === 'z') {
            mesh.position.x = -(settings.surface_x / 2) - 1.5 - settings.axis_offset;
            mesh.rotation.y = -Math.PI * 0.5;
        }
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        return mesh;
    };
    /**
     * Create slicing functionality
     * @param {Object} js3d An instance of JSurface3D
     * @name JSurface3D.Slice
     * @mamespace JSurface3D.Slice
     * @private
     * @constructor
     */
    window.JSurface3D.Slice = function (js3d) {
        var slice = this, matlib = js3d.matlib, settings = js3d.settings;
        slice.lft_x_handle_position = js3d.x_segments;
        slice.rgt_x_handle_position = 0;
        slice.lft_z_handle_position = js3d.z_segments;
        slice.rgt_z_handle_position = 0;
        slice.load = function () {
            var plane = new THREE.PlaneGeometry(5000, 5000, 0, 0), mesh;
            plane.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
            mesh = new THREE.Mesh(plane, matlib.get_material('wire', 0xcccccc));
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();
            slice.intersection_plane = mesh;
            js3d.groups.surface_bottom.add(slice.intersection_plane);
            slice.x();
            slice.z();
        };
        slice.reset_handle_material = function () {
            slice.lft_x_handle.material = slice.rgt_x_handle.material = slice.lft_z_handle.material =
            slice.rgt_z_handle.material = matlib.get_material('phong', settings.slice_handle_color);
        };
        slice.create_slice_bar = function (axis) {
            var vertices, bar_lbl = axis + '_bar',
                lx = slice['lft_' + axis + '_handle'].position[axis],
                rx = slice['rgt_' + axis + '_handle'].position[axis];
            if (js3d.buffers.slice) js3d.buffers.slice.clear(slice[bar_lbl]);
            js3d.groups.slice.remove(slice[bar_lbl]);
            slice[bar_lbl] = new SliceBar(matlib, settings, axis);
            vertices = slice[bar_lbl].geometry.vertices;
            vertices[0].x = vertices[1].x = vertices[2].x = vertices[3].x = Math.max.apply(null, [lx, rx]);
            vertices[4].x = vertices[5].x = vertices[6].x = vertices[7].x = Math.min.apply(null, [lx, rx]);
            if (!(Math.abs(lx) + Math.abs(rx) === settings['surface_' + axis])) // change color
                slice[bar_lbl].material = matlib.get_material('phong', settings.slice_bar_color_active);
            js3d.groups.slice.add(js3d.buffers.slice.add(slice[bar_lbl]));
        };
        slice.x = function () {
            var xpos = (settings.surface_x / 2), zpos = settings.surface_z / 2 + 1.5 + settings.axis_offset;
            /**
             * particle guide
             * (dotted lines that guide the slice handles)
             */
            (function () {
                var geo = new THREE.Geometry(), num_vertices = js3d.adjusted_xs.length, xparticles;
                while (num_vertices--) geo.vertices.push(new THREE.Vector3(js3d.adjusted_xs[num_vertices], 0, 0));
                xparticles = new THREE.ParticleSystem(geo, matlib.get_material('particles'));
                xparticles.position.x += 0.1;
                xparticles.position.z = zpos;
                js3d.groups.surface_bottom.add(slice.x_particles = xparticles);
            }());
            /**
             * handles
             */
            if (!slice.lft_x_handle) slice.lft_x_handle = new Handle(matlib, settings);
            slice.lft_x_handle.position.x = -xpos;
            slice.lft_x_handle.position.z = zpos;
            if (!slice.rgt_x_handle) slice.rgt_x_handle = new Handle(matlib, settings);
            slice.rgt_x_handle.position.x = xpos;
            slice.rgt_x_handle.position.z = zpos;
            js3d.groups.surface_bottom.add(slice.lft_x_handle);
            js3d.groups.surface_bottom.add(slice.rgt_x_handle);
            js3d.interactive_meshes.add('lft_x_handle', slice.lft_x_handle);
            js3d.interactive_meshes.add('rgt_x_handle', slice.rgt_x_handle);
            slice.lft_x_handle.position.x = slice.x_particles.geometry.vertices[slice.lft_x_handle_position].x;
            slice.rgt_x_handle.position.x = slice.x_particles.geometry.vertices[slice.rgt_x_handle_position].x;
            /**
             * slice bar
             */
            slice.create_slice_bar('x');
        };
        slice.z = function () {
            var xpos = (settings.surface_x / 2) + 1.5 + settings.axis_offset, zpos = settings.surface_z / 2;
            /**
             * particle guide
             * (dotted lines that guide the slice handles)
             */
            (function () {
                var geo = new THREE.Geometry(), num_vertices = js3d.adjusted_zs.length, zparticles;
                while (num_vertices--) geo.vertices.push(new THREE.Vector3(js3d.adjusted_zs[num_vertices], 0, 0));
                zparticles = new THREE.ParticleSystem(geo, matlib.get_material('particles'));
                zparticles.rotation.y = -Math.PI * 0.5;
                zparticles.position.x = -xpos;
                js3d.groups.surface_bottom.add(slice.z_particles = zparticles);
            }());
            /**
             * handles
             */
            if (!slice.lft_z_handle) slice.lft_z_handle = new Handle(matlib, settings);
            slice.lft_z_handle.position.x = -xpos;
            slice.lft_z_handle.position.z = -zpos;
            slice.lft_z_handle.rotation.y = -Math.PI * 0.5;
            if (!slice.rgt_z_handle) slice.rgt_z_handle = new Handle(matlib, settings);
            slice.rgt_z_handle.position.x = -xpos;
            slice.rgt_z_handle.position.z = zpos;
            slice.rgt_z_handle.rotation.y = -Math.PI * 0.5;
            js3d.groups.surface_bottom.add(slice.lft_z_handle);
            js3d.groups.surface_bottom.add(slice.rgt_z_handle);
            js3d.interactive_meshes.add('lft_z_handle', slice.lft_z_handle);
            js3d.interactive_meshes.add('rgt_z_handle', slice.rgt_z_handle);
            slice.lft_z_handle.position.z = slice.z_particles.geometry.vertices[slice.lft_z_handle_position].x;
            slice.rgt_z_handle.position.z = slice.z_particles.geometry.vertices[slice.rgt_z_handle_position].x;
            /**
             * slice bar
             */
            slice.create_slice_bar('z');
        };
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.JSurface3D) throw new Error('JSurface3D.Smile requires JSurface3D');
    /**
     * Creates new smile planes
     * @name JSurface3D.smile
     * @namespace JSurface3D.smile
     * @param {Object} js3d JSurface3D instance
     * @function
     * @private
     * @returns {THREE.Object3D}
     */
    window.JSurface3D.smile = function (js3d) {
        var settings = js3d.settings, matlib = js3d.matlib, smile = new THREE.Object3D();
        var x = function () {
            var obj = new THREE.Object3D();
            (function () { // plane
                var plane = JSurface3D.plane(js3d, 'smilex'),
                    material = matlib.get_material('compound_grid_wire'),
                    mesh = Four.multimaterial_object(plane, material);
                mesh.rotation.x = Math.PI * 0.5;
                mesh.position.y = settings.surface_y;
                mesh.position.z = -((settings.surface_z / 2) + settings.smile_distance);
                mesh.matrixAutoUpdate = false;
                mesh.updateMatrix();
                obj.add(mesh);
            }());
            (function () { // axis
                var y_axis = JSurface3D.Axis({axis: 'y', right: true}, js3d);
                y_axis.position.x = -(settings.surface_x / 2) - 25;
                y_axis.position.y = 4;
                y_axis.position.z = -(settings.surface_z / 2) - settings.smile_distance;
                y_axis.rotation.y = Math.PI * 0.5;
                y_axis.rotation.z = Math.PI * 0.5;
                obj.add(y_axis);
            }());
            return obj;
        };
        var z = function () {
            var obj = new THREE.Object3D();
            (function () { // plane
                var plane = JSurface3D.plane(js3d, 'smiley'),
                    material = matlib.get_material('compound_grid_wire'),
                    mesh = Four.multimaterial_object(plane, material);
                mesh.position.x = (settings.surface_x / 2) + settings.smile_distance;
                mesh.rotation.z = Math.PI * 0.5;
                mesh.matrixAutoUpdate = false;
                mesh.updateMatrix();
                obj.add(mesh);
            }());
            (function () { // axis
                var y_axis = JSurface3D.Axis({axis: 'y'}, js3d);
                y_axis.position.y = 4;
                y_axis.position.z = (settings.surface_z / 2) + 5;
                y_axis.position.x = (settings.surface_x / 2) + settings.smile_distance;
                y_axis.rotation.z = Math.PI * 0.5;
                obj.add(y_axis);
            }());
            return obj;
        };
        var shadows = function () {
            var obj = new THREE.Object3D();
            (function () { // x shadow
                var z = settings.surface_z / 2 + settings.smile_distance, half_width = settings.surface_x / 2,
                    points = [{x: -half_width, y: 0, z: -z}, {x: half_width, y: 0, z: -z}],
                    shadow = new Four.Tube(matlib, points, 0xaaaaaa);
                shadow.matrixAutoUpdate = false;
                obj.add(shadow);
            }());
            (function () { // z shadow
                var x = settings.surface_x / 2 + settings.smile_distance, half_width = settings.surface_z / 2,
                    points = [{x: x, y: 0, z: -half_width}, {x: x, y: 0, z: half_width}],
                    shadow = new Four.Tube(matlib, points, 0xaaaaaa);
                shadow.matrixAutoUpdate = false;
                obj.add(shadow);
            }());
            obj.position.y -= settings.floating_height;
            return obj;
        };
        smile.add(x());
        smile.add(z());
        smile.add(shadows());
        return smile;
    };
})();
/**
 * Copyright 2012 - present by OpenGamma Inc. and the OpenGamma group of companies
 * Please see distribution for license.
 */
(function () {
    if (!window.JSurface3D) throw new Error('JSurface3D.SurfacePlane requires JSurface3D');
    /**
     * Creates a surface plane with extrutions and vertex shading.
     * Clips plane if required
     * Adds update method
     * @name JSurface3D.SurfacePlane
     * @namespace JSurface3D.SurfacePlane
     * @param {Object} js3d JSurface3D instance
     * @private
     * @returns {Function} {THREE.Object3D} A surface plane object
     * @constructor
     */
    window.JSurface3D.SurfacePlane = function (js3d) {
        var surfaceplane = new THREE.Object3D(), wiremesh, planemesh;
        surfaceplane.name = 'SurfacePlane';
        surfaceplane.init = function () {
            var settings = js3d.settings, matlib = js3d.matlib, plane = JSurface3D.plane(js3d, 'surface'), i, wire;
            plane.verticesNeedUpdate = true;
            for (i = 0; i < js3d.adjusted_vol.length; i++) {plane.vertices[i].y = js3d.adjusted_vol[i];} // extrude
            wire = plane.clone();
            plane.computeCentroids();
            plane.computeFaceNormals();
            plane.computeBoundingSphere();
            (function () { // apply heatmap
                if (!Detector.webgl) return;
                var faces = 'abcd', face, color, vertex, index, i, k,
                    min = Math.min.apply(null, js3d.adjusted_vol), max = Math.max.apply(null, js3d.adjusted_vol),
                    hue_min = settings.vertex_shading_hue_min, hue_max = settings.vertex_shading_hue_max, hue;
                for (i = 0; i < plane.faces.length; i ++) {
                    face = plane.faces[i];
                    for (k = 0; k < 4; k++) {
                        index = face[faces.charAt(k)];
                        vertex = plane.vertices[index];
                        color = new THREE.Color(0xffffff);
                        hue = ~~((vertex.y - min) / (max - min) * (hue_max - hue_min) + hue_min) / 360;
                        color.setHSV(hue, 0.9, 1);
                        face.vertexColors[k] = color;
                    }
                }
            }());
            /* apply surface materials */
            (function () { // clip/slice
                var row, i, x, l,
                    zlft = Math.abs(js3d.slice.lft_z_handle_position - js3d.z_segments) * js3d.x_segments,
                    zrgt = Math.abs(js3d.slice.rgt_z_handle_position - js3d.z_segments) * js3d.x_segments,
                    xlft = Math.abs(js3d.slice.lft_x_handle_position - js3d.x_segments),
                    xrgt = Math.abs(js3d.slice.rgt_x_handle_position - js3d.x_segments),
                    zmin = Math.min.apply(null, [zlft, zrgt]),
                    zmax = Math.max.apply(null, [zlft, zrgt]),
                    xmin = Math.min.apply(null, [xlft, xrgt]),
                    xmax = Math.max.apply(null, [xlft, xrgt]);
                for (i = 0, x = 0, row = 0, l = plane.faces.length; i < l; i++, x++) {
                    var plane_face = plane.faces[i], wire_face = wire.faces[i];
                    if (x === js3d.x_segments) x = 0, row++;
                    if (
                        (i < zmax) && (i > zmin - 1) && // z slice
                        (i > xmin + row * js3d.x_segments -1) && (i < xmax + row * js3d.x_segments)  // x slice
                    ) plane_face.materialIndex = wire_face.materialIndex = 1;
                    else plane_face.materialIndex = wire_face.materialIndex = 0;
                }
            }());
            wiremesh = new THREE.Mesh(wire, new THREE.MeshFaceMaterial(matlib.get_material('compound_surface_wire')));
            wiremesh.position.y = 0.01; // move wiremesh to account for Z-fighting
            planemesh = new THREE.Mesh(plane, new THREE.MeshFaceMaterial(matlib.get_material('compound_surface')));
            surfaceplane.add(planemesh);
            surfaceplane.add(wiremesh);
            surfaceplane.position.y = settings.floating_height;
            surfaceplane.matrixAutoUpdate = false;
            surfaceplane.updateMatrix();
            surfaceplane.children.forEach(function (mesh) {
                mesh.doubleSided = true;
                mesh.matrixAutoUpdate = false;
            });
            js3d.interactive_meshes.add('surface', surfaceplane.children[0]);
            if (js3d.buffers.surface) js3d.buffers.surface.add(planemesh);
            if (js3d.buffers.surface) js3d.buffers.surface.add(wiremesh);
        };
        surfaceplane.update = function () {
            if (js3d.buffers.surface) js3d.buffers.surface.clear(planemesh);
            if (js3d.buffers.surface) js3d.buffers.surface.clear(wiremesh);
            surfaceplane.remove(wiremesh);
            surfaceplane.remove(planemesh);
            surfaceplane.init(js3d);
        };
        return surfaceplane
    };
})();
// stats.js r10 - http://github.com/mrdoob/stats.js
var Stats=function(){var l=Date.now(),m=l,g=0,n=1E3,o=0,h=0,p=1E3,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};
if (_typeface_js && _typeface_js.loadFace) _typeface_js.loadFace({"glyphs":{"ο":{"x_min":0,"x_max":712,"ha":815,"o":"m 356 -25 q 96 88 192 -25 q 0 368 0 201 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 "},"S":{"x_min":0,"x_max":788,"ha":890,"o":"m 788 291 q 662 54 788 144 q 397 -26 550 -26 q 116 68 226 -26 q 0 337 0 168 l 131 337 q 200 152 131 220 q 384 85 269 85 q 557 129 479 85 q 650 270 650 183 q 490 429 650 379 q 194 513 341 470 q 33 739 33 584 q 142 964 33 881 q 388 1041 242 1041 q 644 957 543 1041 q 756 716 756 867 l 625 716 q 561 874 625 816 q 395 933 497 933 q 243 891 309 933 q 164 759 164 841 q 325 609 164 656 q 625 526 475 568 q 788 291 788 454 "},"¦":{"x_min":343,"x_max":449,"ha":792,"o":"m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "},"/":{"x_min":183.25,"x_max":608.328125,"ha":792,"o":"m 608 1041 l 266 -129 l 183 -129 l 520 1041 l 608 1041 "},"Τ":{"x_min":-0.4375,"x_max":777.453125,"ha":839,"o":"m 777 893 l 458 893 l 458 0 l 319 0 l 319 892 l 0 892 l 0 1013 l 777 1013 l 777 893 "},"y":{"x_min":0,"x_max":684.78125,"ha":771,"o":"m 684 738 l 388 -83 q 311 -216 356 -167 q 173 -279 252 -279 q 97 -266 133 -279 l 97 -149 q 132 -155 109 -151 q 168 -160 155 -160 q 240 -114 213 -160 q 274 -26 248 -98 l 0 738 l 137 737 l 341 139 l 548 737 l 684 738 "},"Π":{"x_min":0,"x_max":803,"ha":917,"o":"m 803 0 l 667 0 l 667 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 803 1012 l 803 0 "},"ΐ":{"x_min":-111,"x_max":339,"ha":361,"o":"m 339 800 l 229 800 l 229 925 l 339 925 l 339 800 m -1 800 l -111 800 l -111 925 l -1 925 l -1 800 m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 m 302 1040 l 113 819 l 30 819 l 165 1040 l 302 1040 "},"g":{"x_min":0,"x_max":686,"ha":838,"o":"m 686 34 q 586 -213 686 -121 q 331 -306 487 -306 q 131 -252 216 -306 q 31 -84 31 -190 l 155 -84 q 228 -174 166 -138 q 345 -207 284 -207 q 514 -109 454 -207 q 564 89 564 -27 q 461 6 521 36 q 335 -23 401 -23 q 88 100 184 -23 q 0 370 0 215 q 87 634 0 522 q 330 758 183 758 q 457 728 398 758 q 564 644 515 699 l 564 737 l 686 737 l 686 34 m 582 367 q 529 560 582 481 q 358 652 468 652 q 189 561 250 652 q 135 369 135 482 q 189 176 135 255 q 361 85 251 85 q 529 176 468 85 q 582 367 582 255 "},"²":{"x_min":0,"x_max":442,"ha":539,"o":"m 442 383 l 0 383 q 91 566 0 492 q 260 668 176 617 q 354 798 354 727 q 315 875 354 845 q 227 905 277 905 q 136 869 173 905 q 99 761 99 833 l 14 761 q 82 922 14 864 q 232 974 141 974 q 379 926 316 974 q 442 797 442 878 q 351 635 442 704 q 183 539 321 611 q 92 455 92 491 l 442 455 l 442 383 "},"–":{"x_min":0,"x_max":705.5625,"ha":803,"o":"m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "},"Κ":{"x_min":0,"x_max":819.5625,"ha":893,"o":"m 819 0 l 650 0 l 294 509 l 139 356 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "},"ƒ":{"x_min":-46.265625,"x_max":392,"ha":513,"o":"m 392 651 l 259 651 l 79 -279 l -46 -278 l 134 651 l 14 651 l 14 751 l 135 751 q 151 948 135 900 q 304 1041 185 1041 q 334 1040 319 1041 q 392 1034 348 1039 l 392 922 q 337 931 360 931 q 271 883 287 931 q 260 793 260 853 l 260 751 l 392 751 l 392 651 "},"e":{"x_min":0,"x_max":714,"ha":813,"o":"m 714 326 l 140 326 q 200 157 140 227 q 359 87 260 87 q 488 130 431 87 q 561 245 545 174 l 697 245 q 577 48 670 123 q 358 -26 484 -26 q 97 85 195 -26 q 0 363 0 197 q 94 642 0 529 q 358 765 195 765 q 626 627 529 765 q 714 326 714 503 m 576 429 q 507 583 564 522 q 355 650 445 650 q 206 583 266 650 q 140 429 152 522 l 576 429 "},"ό":{"x_min":0,"x_max":712,"ha":815,"o":"m 356 -25 q 94 91 194 -25 q 0 368 0 202 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 m 576 1040 l 387 819 l 303 819 l 438 1040 l 576 1040 "},"J":{"x_min":0,"x_max":588,"ha":699,"o":"m 588 279 q 287 -26 588 -26 q 58 73 126 -26 q 0 327 0 158 l 133 327 q 160 172 133 227 q 288 96 198 96 q 426 171 391 96 q 449 336 449 219 l 449 1013 l 588 1013 l 588 279 "},"»":{"x_min":-1,"x_max":503,"ha":601,"o":"m 503 302 l 280 136 l 281 256 l 429 373 l 281 486 l 280 608 l 503 440 l 503 302 m 221 302 l 0 136 l 0 255 l 145 372 l 0 486 l -1 608 l 221 440 l 221 302 "},"©":{"x_min":-3,"x_max":1008,"ha":1106,"o":"m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 741 394 q 661 246 731 302 q 496 190 591 190 q 294 285 369 190 q 228 497 228 370 q 295 714 228 625 q 499 813 370 813 q 656 762 588 813 q 733 625 724 711 l 634 625 q 589 704 629 673 q 498 735 550 735 q 377 666 421 735 q 334 504 334 597 q 374 340 334 408 q 490 272 415 272 q 589 304 549 272 q 638 394 628 337 l 741 394 "},"ώ":{"x_min":0,"x_max":922,"ha":1030,"o":"m 687 1040 l 498 819 l 415 819 l 549 1040 l 687 1040 m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 338 0 202 q 45 551 0 444 q 161 737 84 643 l 302 737 q 175 552 219 647 q 124 336 124 446 q 155 179 124 248 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 341 797 257 q 745 555 797 450 q 619 737 705 637 l 760 737 q 874 551 835 640 q 922 339 922 444 "},"^":{"x_min":193.0625,"x_max":598.609375,"ha":792,"o":"m 598 772 l 515 772 l 395 931 l 277 772 l 193 772 l 326 1013 l 462 1013 l 598 772 "},"«":{"x_min":0,"x_max":507.203125,"ha":604,"o":"m 506 136 l 284 302 l 284 440 l 506 608 l 507 485 l 360 371 l 506 255 l 506 136 m 222 136 l 0 302 l 0 440 l 222 608 l 221 486 l 73 373 l 222 256 l 222 136 "},"D":{"x_min":0,"x_max":828,"ha":935,"o":"m 389 1013 q 714 867 593 1013 q 828 521 828 729 q 712 161 828 309 q 382 0 587 0 l 0 0 l 0 1013 l 389 1013 m 376 124 q 607 247 523 124 q 681 510 681 355 q 607 771 681 662 q 376 896 522 896 l 139 896 l 139 124 l 376 124 "},"∙":{"x_min":0,"x_max":142,"ha":239,"o":"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "},"ÿ":{"x_min":0,"x_max":47,"ha":125,"o":"m 47 3 q 37 -7 47 -7 q 28 0 30 -7 q 39 -4 32 -4 q 45 3 45 -1 l 37 0 q 28 9 28 0 q 39 19 28 19 l 47 16 l 47 19 l 47 3 m 37 1 q 44 8 44 1 q 37 16 44 16 q 30 8 30 16 q 37 1 30 1 m 26 1 l 23 22 l 14 0 l 3 22 l 3 3 l 0 25 l 13 1 l 22 25 l 26 1 "},"w":{"x_min":0,"x_max":1009.71875,"ha":1100,"o":"m 1009 738 l 783 0 l 658 0 l 501 567 l 345 0 l 222 0 l 0 738 l 130 738 l 284 174 l 432 737 l 576 738 l 721 173 l 881 737 l 1009 738 "},"$":{"x_min":0,"x_max":700,"ha":793,"o":"m 664 717 l 542 717 q 490 825 531 785 q 381 872 450 865 l 381 551 q 620 446 540 522 q 700 241 700 370 q 618 45 700 116 q 381 -25 536 -25 l 381 -152 l 307 -152 l 307 -25 q 81 62 162 -25 q 0 297 0 149 l 124 297 q 169 146 124 204 q 307 81 215 89 l 307 441 q 80 536 148 469 q 13 725 13 603 q 96 910 13 839 q 307 982 180 982 l 307 1077 l 381 1077 l 381 982 q 574 917 494 982 q 664 717 664 845 m 307 565 l 307 872 q 187 831 233 872 q 142 724 142 791 q 180 618 142 656 q 307 565 218 580 m 381 76 q 562 237 562 96 q 517 361 562 313 q 381 423 472 409 l 381 76 "},"\\":{"x_min":-0.015625,"x_max":425.0625,"ha":522,"o":"m 425 -129 l 337 -129 l 0 1041 l 83 1041 l 425 -129 "},"µ":{"x_min":0,"x_max":697.21875,"ha":747,"o":"m 697 -4 q 629 -14 658 -14 q 498 97 513 -14 q 422 9 470 41 q 313 -23 374 -23 q 207 4 258 -23 q 119 81 156 32 l 119 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 173 124 246 q 308 83 216 83 q 452 178 402 83 q 493 359 493 255 l 493 738 l 617 738 l 617 214 q 623 136 617 160 q 673 92 637 92 q 697 96 684 92 l 697 -4 "},"Ι":{"x_min":42,"x_max":181,"ha":297,"o":"m 181 0 l 42 0 l 42 1013 l 181 1013 l 181 0 "},"Ύ":{"x_min":0,"x_max":1144.5,"ha":1214,"o":"m 1144 1012 l 807 416 l 807 0 l 667 0 l 667 416 l 325 1012 l 465 1012 l 736 533 l 1004 1012 l 1144 1012 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"’":{"x_min":0,"x_max":139,"ha":236,"o":"m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "},"Ν":{"x_min":0,"x_max":801,"ha":915,"o":"m 801 0 l 651 0 l 131 822 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 191 l 670 1013 l 801 1013 l 801 0 "},"-":{"x_min":8.71875,"x_max":350.390625,"ha":478,"o":"m 350 317 l 8 317 l 8 428 l 350 428 l 350 317 "},"Q":{"x_min":0,"x_max":968,"ha":1072,"o":"m 954 5 l 887 -79 l 744 35 q 622 -11 687 2 q 483 -26 556 -26 q 127 130 262 -26 q 0 504 0 279 q 127 880 0 728 q 484 1041 262 1041 q 841 884 708 1041 q 968 507 968 735 q 933 293 968 398 q 832 104 899 188 l 954 5 m 723 191 q 802 330 777 248 q 828 499 828 412 q 744 790 828 673 q 483 922 650 922 q 228 791 322 922 q 142 505 142 673 q 227 221 142 337 q 487 91 323 91 q 632 123 566 91 l 520 215 l 587 301 l 723 191 "},"ς":{"x_min":1,"x_max":676.28125,"ha":740,"o":"m 676 460 l 551 460 q 498 595 542 546 q 365 651 448 651 q 199 578 263 651 q 136 401 136 505 q 266 178 136 241 q 508 106 387 142 q 640 -50 640 62 q 625 -158 640 -105 q 583 -278 611 -211 l 465 -278 q 498 -182 490 -211 q 515 -80 515 -126 q 381 12 515 -15 q 134 91 197 51 q 1 388 1 179 q 100 651 1 542 q 354 761 199 761 q 587 680 498 761 q 676 460 676 599 "},"M":{"x_min":0,"x_max":954,"ha":1067,"o":"m 954 0 l 819 0 l 819 869 l 537 0 l 405 0 l 128 866 l 128 0 l 0 0 l 0 1013 l 200 1013 l 472 160 l 757 1013 l 954 1013 l 954 0 "},"Ψ":{"x_min":0,"x_max":1006,"ha":1094,"o":"m 1006 678 q 914 319 1006 429 q 571 200 814 200 l 571 0 l 433 0 l 433 200 q 92 319 194 200 q 0 678 0 429 l 0 1013 l 139 1013 l 139 679 q 191 417 139 492 q 433 326 255 326 l 433 1013 l 571 1013 l 571 326 l 580 326 q 813 423 747 326 q 868 679 868 502 l 868 1013 l 1006 1013 l 1006 678 "},"C":{"x_min":0,"x_max":886,"ha":944,"o":"m 886 379 q 760 87 886 201 q 455 -26 634 -26 q 112 136 236 -26 q 0 509 0 283 q 118 882 0 737 q 469 1041 245 1041 q 748 955 630 1041 q 879 708 879 859 l 745 708 q 649 862 724 805 q 473 920 573 920 q 219 791 312 920 q 136 509 136 675 q 217 229 136 344 q 470 99 311 99 q 672 179 591 99 q 753 379 753 259 l 886 379 "},"!":{"x_min":0,"x_max":138,"ha":236,"o":"m 138 684 q 116 409 138 629 q 105 244 105 299 l 33 244 q 16 465 33 313 q 0 684 0 616 l 0 1013 l 138 1013 l 138 684 m 138 0 l 0 0 l 0 151 l 138 151 l 138 0 "},"{":{"x_min":0,"x_max":480.5625,"ha":578,"o":"m 480 -286 q 237 -213 303 -286 q 187 -45 187 -159 q 194 48 187 -15 q 201 141 201 112 q 164 264 201 225 q 0 314 118 314 l 0 417 q 164 471 119 417 q 201 605 201 514 q 199 665 201 644 q 193 772 193 769 q 241 941 193 887 q 480 1015 308 1015 l 480 915 q 336 866 375 915 q 306 742 306 828 q 310 662 306 717 q 314 577 314 606 q 288 452 314 500 q 176 365 256 391 q 289 275 257 337 q 314 143 314 226 q 313 84 314 107 q 310 -11 310 -5 q 339 -131 310 -94 q 480 -182 377 -182 l 480 -286 "},"X":{"x_min":-0.015625,"x_max":854.15625,"ha":940,"o":"m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 428 637 l 675 1013 l 836 1013 l 504 520 l 854 0 "},"#":{"x_min":0,"x_max":963.890625,"ha":1061,"o":"m 963 690 l 927 590 l 719 590 l 655 410 l 876 410 l 840 310 l 618 310 l 508 -3 l 393 -2 l 506 309 l 329 310 l 215 -2 l 102 -3 l 212 310 l 0 310 l 36 410 l 248 409 l 312 590 l 86 590 l 120 690 l 347 690 l 459 1006 l 573 1006 l 462 690 l 640 690 l 751 1006 l 865 1006 l 754 690 l 963 690 m 606 590 l 425 590 l 362 410 l 543 410 l 606 590 "},"ι":{"x_min":42,"x_max":284,"ha":361,"o":"m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 738 l 167 738 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 "},"Ά":{"x_min":0,"x_max":906.953125,"ha":982,"o":"m 283 1040 l 88 799 l 5 799 l 145 1040 l 283 1040 m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1012 l 529 1012 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "},")":{"x_min":0,"x_max":318,"ha":415,"o":"m 318 365 q 257 25 318 191 q 87 -290 197 -141 l 0 -290 q 140 21 93 -128 q 193 360 193 189 q 141 704 193 537 q 0 1024 97 850 l 87 1024 q 257 706 197 871 q 318 365 318 542 "},"ε":{"x_min":0,"x_max":634.71875,"ha":714,"o":"m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 314 0 265 q 128 390 67 353 q 56 460 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 "},"Δ":{"x_min":0,"x_max":952.78125,"ha":1028,"o":"m 952 0 l 0 0 l 400 1013 l 551 1013 l 952 0 m 762 124 l 476 867 l 187 124 l 762 124 "},"}":{"x_min":0,"x_max":481,"ha":578,"o":"m 481 314 q 318 262 364 314 q 282 136 282 222 q 284 65 282 97 q 293 -58 293 -48 q 241 -217 293 -166 q 0 -286 174 -286 l 0 -182 q 143 -130 105 -182 q 171 -2 171 -93 q 168 81 171 22 q 165 144 165 140 q 188 275 165 229 q 306 365 220 339 q 191 455 224 391 q 165 588 165 505 q 168 681 165 624 q 171 742 171 737 q 141 865 171 827 q 0 915 102 915 l 0 1015 q 243 942 176 1015 q 293 773 293 888 q 287 675 293 741 q 282 590 282 608 q 318 466 282 505 q 481 417 364 417 l 481 314 "},"‰":{"x_min":-3,"x_max":1672,"ha":1821,"o":"m 846 0 q 664 76 732 0 q 603 244 603 145 q 662 412 603 344 q 846 489 729 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 846 0 962 0 m 845 103 q 945 143 910 103 q 981 243 981 184 q 947 340 981 301 q 845 385 910 385 q 745 342 782 385 q 709 243 709 300 q 742 147 709 186 q 845 103 781 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 m 1428 0 q 1246 76 1314 0 q 1185 244 1185 145 q 1244 412 1185 344 q 1428 489 1311 489 q 1610 412 1542 489 q 1672 244 1672 343 q 1612 76 1672 144 q 1428 0 1545 0 m 1427 103 q 1528 143 1492 103 q 1564 243 1564 184 q 1530 340 1564 301 q 1427 385 1492 385 q 1327 342 1364 385 q 1291 243 1291 300 q 1324 147 1291 186 q 1427 103 1363 103 "},"a":{"x_min":0,"x_max":698.609375,"ha":794,"o":"m 698 0 q 661 -12 679 -7 q 615 -17 643 -17 q 536 12 564 -17 q 500 96 508 41 q 384 6 456 37 q 236 -25 312 -25 q 65 31 130 -25 q 0 194 0 88 q 118 390 0 334 q 328 435 180 420 q 488 483 476 451 q 495 523 495 504 q 442 619 495 584 q 325 654 389 654 q 209 617 257 654 q 152 513 161 580 l 33 513 q 123 705 33 633 q 332 772 207 772 q 528 712 448 772 q 617 531 617 645 l 617 163 q 624 108 617 126 q 664 90 632 90 l 698 94 l 698 0 m 491 262 l 491 372 q 272 329 350 347 q 128 201 128 294 q 166 113 128 144 q 264 83 205 83 q 414 130 346 83 q 491 262 491 183 "},"—":{"x_min":0,"x_max":941.671875,"ha":1039,"o":"m 941 334 l 0 334 l 0 410 l 941 410 l 941 334 "},"=":{"x_min":8.71875,"x_max":780.953125,"ha":792,"o":"m 780 510 l 8 510 l 8 606 l 780 606 l 780 510 m 780 235 l 8 235 l 8 332 l 780 332 l 780 235 "},"N":{"x_min":0,"x_max":801,"ha":914,"o":"m 801 0 l 651 0 l 131 823 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 193 l 670 1013 l 801 1013 l 801 0 "},"ρ":{"x_min":0,"x_max":712,"ha":797,"o":"m 712 369 q 620 94 712 207 q 362 -26 521 -26 q 230 2 292 -26 q 119 83 167 30 l 119 -278 l 0 -278 l 0 362 q 91 643 0 531 q 355 764 190 764 q 617 647 517 764 q 712 369 712 536 m 583 366 q 530 559 583 480 q 359 651 469 651 q 190 562 252 651 q 135 370 135 483 q 189 176 135 257 q 359 85 250 85 q 528 175 466 85 q 583 366 583 254 "},"2":{"x_min":59,"x_max":731,"ha":792,"o":"m 731 0 l 59 0 q 197 314 59 188 q 457 487 199 315 q 598 691 598 580 q 543 819 598 772 q 411 867 488 867 q 272 811 328 867 q 209 630 209 747 l 81 630 q 182 901 81 805 q 408 986 271 986 q 629 909 536 986 q 731 694 731 826 q 613 449 731 541 q 378 316 495 383 q 201 122 235 234 l 731 122 l 731 0 "},"¯":{"x_min":0,"x_max":941.671875,"ha":938,"o":"m 941 1033 l 0 1033 l 0 1109 l 941 1109 l 941 1033 "},"Z":{"x_min":0,"x_max":779,"ha":849,"o":"m 779 0 l 0 0 l 0 113 l 621 896 l 40 896 l 40 1013 l 779 1013 l 778 887 l 171 124 l 779 124 l 779 0 "},"u":{"x_min":0,"x_max":617,"ha":729,"o":"m 617 0 l 499 0 l 499 110 q 391 10 460 45 q 246 -25 322 -25 q 61 58 127 -25 q 0 258 0 136 l 0 738 l 125 738 l 125 284 q 156 148 125 202 q 273 82 197 82 q 433 165 369 82 q 493 340 493 243 l 493 738 l 617 738 l 617 0 "},"k":{"x_min":0,"x_max":612.484375,"ha":697,"o":"m 612 738 l 338 465 l 608 0 l 469 0 l 251 382 l 121 251 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 402 l 456 738 l 612 738 "},"Η":{"x_min":0,"x_max":803,"ha":917,"o":"m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "},"Α":{"x_min":0,"x_max":906.953125,"ha":985,"o":"m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "},"s":{"x_min":0,"x_max":604,"ha":697,"o":"m 604 217 q 501 36 604 104 q 292 -23 411 -23 q 86 43 166 -23 q 0 238 0 114 l 121 237 q 175 122 121 164 q 300 85 223 85 q 415 112 363 85 q 479 207 479 147 q 361 309 479 276 q 140 372 141 370 q 21 544 21 426 q 111 708 21 647 q 298 761 190 761 q 492 705 413 761 q 583 531 583 643 l 462 531 q 412 625 462 594 q 298 657 363 657 q 199 636 242 657 q 143 558 143 608 q 262 454 143 486 q 484 394 479 397 q 604 217 604 341 "},"B":{"x_min":0,"x_max":778,"ha":876,"o":"m 580 546 q 724 469 670 535 q 778 311 778 403 q 673 83 778 171 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 892 q 691 633 732 693 q 580 546 650 572 m 393 899 l 139 899 l 139 588 l 379 588 q 521 624 462 588 q 592 744 592 667 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 303 635 219 q 559 436 635 389 q 402 477 494 477 l 139 477 l 139 124 l 419 124 "},"…":{"x_min":0,"x_max":614,"ha":708,"o":"m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 m 378 0 l 236 0 l 236 151 l 378 151 l 378 0 m 614 0 l 472 0 l 472 151 l 614 151 l 614 0 "},"?":{"x_min":0,"x_max":607,"ha":704,"o":"m 607 777 q 543 599 607 674 q 422 474 482 537 q 357 272 357 391 l 236 272 q 297 487 236 395 q 411 619 298 490 q 474 762 474 691 q 422 885 474 838 q 301 933 371 933 q 179 880 228 933 q 124 706 124 819 l 0 706 q 94 963 0 872 q 302 1044 177 1044 q 511 973 423 1044 q 607 777 607 895 m 370 0 l 230 0 l 230 151 l 370 151 l 370 0 "},"H":{"x_min":0,"x_max":803,"ha":915,"o":"m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "},"ν":{"x_min":0,"x_max":675,"ha":761,"o":"m 675 738 l 404 0 l 272 0 l 0 738 l 133 738 l 340 147 l 541 738 l 675 738 "},"c":{"x_min":1,"x_max":701.390625,"ha":775,"o":"m 701 264 q 584 53 681 133 q 353 -26 487 -26 q 91 91 188 -26 q 1 370 1 201 q 92 645 1 537 q 353 761 190 761 q 572 688 479 761 q 690 493 666 615 l 556 493 q 487 606 545 562 q 356 650 428 650 q 186 563 246 650 q 134 372 134 487 q 188 179 134 258 q 359 88 250 88 q 492 136 437 88 q 566 264 548 185 l 701 264 "},"¶":{"x_min":0,"x_max":566.671875,"ha":678,"o":"m 21 892 l 52 892 l 98 761 l 145 892 l 176 892 l 178 741 l 157 741 l 157 867 l 108 741 l 88 741 l 40 871 l 40 741 l 21 741 l 21 892 m 308 854 l 308 731 q 252 691 308 691 q 227 691 240 691 q 207 696 213 695 l 207 712 l 253 706 q 288 733 288 706 l 288 763 q 244 741 279 741 q 193 797 193 741 q 261 860 193 860 q 287 860 273 860 q 308 854 302 855 m 288 842 l 263 843 q 213 796 213 843 q 248 756 213 756 q 288 796 288 756 l 288 842 m 566 988 l 502 988 l 502 -1 l 439 -1 l 439 988 l 317 988 l 317 -1 l 252 -1 l 252 602 q 81 653 155 602 q 0 805 0 711 q 101 989 0 918 q 309 1053 194 1053 l 566 1053 l 566 988 "},"β":{"x_min":0,"x_max":660,"ha":745,"o":"m 471 550 q 610 450 561 522 q 660 280 660 378 q 578 64 660 151 q 367 -22 497 -22 q 239 5 299 -22 q 126 82 178 32 l 126 -278 l 0 -278 l 0 593 q 54 903 0 801 q 318 1042 127 1042 q 519 964 436 1042 q 603 771 603 887 q 567 644 603 701 q 471 550 532 586 m 337 79 q 476 138 418 79 q 535 279 535 198 q 427 437 535 386 q 226 477 344 477 l 226 583 q 398 620 329 583 q 486 762 486 668 q 435 884 486 833 q 312 935 384 935 q 169 861 219 935 q 126 698 126 797 l 126 362 q 170 169 126 242 q 337 79 224 79 "},"Μ":{"x_min":0,"x_max":954,"ha":1068,"o":"m 954 0 l 819 0 l 819 868 l 537 0 l 405 0 l 128 865 l 128 0 l 0 0 l 0 1013 l 199 1013 l 472 158 l 758 1013 l 954 1013 l 954 0 "},"Ό":{"x_min":0.109375,"x_max":1120,"ha":1217,"o":"m 1120 505 q 994 132 1120 282 q 642 -29 861 -29 q 290 130 422 -29 q 167 505 167 280 q 294 883 167 730 q 650 1046 430 1046 q 999 882 868 1046 q 1120 505 1120 730 m 977 504 q 896 784 977 669 q 644 915 804 915 q 391 785 484 915 q 307 504 307 669 q 391 224 307 339 q 644 95 486 95 q 894 224 803 95 q 977 504 977 339 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"Ή":{"x_min":0,"x_max":1158,"ha":1275,"o":"m 1158 0 l 1022 0 l 1022 475 l 496 475 l 496 0 l 356 0 l 356 1012 l 496 1012 l 496 599 l 1022 599 l 1022 1012 l 1158 1012 l 1158 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"•":{"x_min":0,"x_max":663.890625,"ha":775,"o":"m 663 529 q 566 293 663 391 q 331 196 469 196 q 97 294 194 196 q 0 529 0 393 q 96 763 0 665 q 331 861 193 861 q 566 763 469 861 q 663 529 663 665 "},"¥":{"x_min":0.1875,"x_max":819.546875,"ha":886,"o":"m 563 561 l 697 561 l 696 487 l 520 487 l 482 416 l 482 380 l 697 380 l 695 308 l 482 308 l 482 0 l 342 0 l 342 308 l 125 308 l 125 380 l 342 380 l 342 417 l 303 487 l 125 487 l 125 561 l 258 561 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 l 563 561 "},"(":{"x_min":0,"x_max":318.0625,"ha":415,"o":"m 318 -290 l 230 -290 q 61 23 122 -142 q 0 365 0 190 q 62 712 0 540 q 230 1024 119 869 l 318 1024 q 175 705 219 853 q 125 360 125 542 q 176 22 125 187 q 318 -290 223 -127 "},"U":{"x_min":0,"x_max":796,"ha":904,"o":"m 796 393 q 681 93 796 212 q 386 -25 566 -25 q 101 95 208 -25 q 0 393 0 211 l 0 1013 l 138 1013 l 138 391 q 204 191 138 270 q 394 107 276 107 q 586 191 512 107 q 656 391 656 270 l 656 1013 l 796 1013 l 796 393 "},"γ":{"x_min":0.5,"x_max":744.953125,"ha":822,"o":"m 744 737 l 463 54 l 463 -278 l 338 -278 l 338 54 l 154 495 q 104 597 124 569 q 13 651 67 651 l 0 651 l 0 751 l 39 753 q 168 711 121 753 q 242 594 207 676 l 403 208 l 617 737 l 744 737 "},"α":{"x_min":0,"x_max":765.5625,"ha":809,"o":"m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 728 407 760 q 563 637 524 696 l 563 739 l 685 739 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 96 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 "},"F":{"x_min":0,"x_max":683.328125,"ha":717,"o":"m 683 888 l 140 888 l 140 583 l 613 583 l 613 458 l 140 458 l 140 0 l 0 0 l 0 1013 l 683 1013 l 683 888 "},"­":{"x_min":0,"x_max":705.5625,"ha":803,"o":"m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "},":":{"x_min":0,"x_max":142,"ha":239,"o":"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "},"Χ":{"x_min":0,"x_max":854.171875,"ha":935,"o":"m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 427 637 l 675 1013 l 836 1013 l 504 521 l 854 0 "},"*":{"x_min":116,"x_max":674,"ha":792,"o":"m 674 768 l 475 713 l 610 544 l 517 477 l 394 652 l 272 478 l 178 544 l 314 713 l 116 766 l 153 876 l 341 812 l 342 1013 l 446 1013 l 446 811 l 635 874 l 674 768 "},"†":{"x_min":0,"x_max":777,"ha":835,"o":"m 458 804 l 777 804 l 777 683 l 458 683 l 458 0 l 319 0 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 "},"°":{"x_min":0,"x_max":347,"ha":444,"o":"m 173 802 q 43 856 91 802 q 0 977 0 905 q 45 1101 0 1049 q 173 1153 90 1153 q 303 1098 255 1153 q 347 977 347 1049 q 303 856 347 905 q 173 802 256 802 m 173 884 q 238 910 214 884 q 262 973 262 937 q 239 1038 262 1012 q 173 1064 217 1064 q 108 1037 132 1064 q 85 973 85 1010 q 108 910 85 937 q 173 884 132 884 "},"V":{"x_min":0,"x_max":862.71875,"ha":940,"o":"m 862 1013 l 505 0 l 361 0 l 0 1013 l 143 1013 l 434 165 l 718 1012 l 862 1013 "},"Ξ":{"x_min":0,"x_max":734.71875,"ha":763,"o":"m 723 889 l 9 889 l 9 1013 l 723 1013 l 723 889 m 673 463 l 61 463 l 61 589 l 673 589 l 673 463 m 734 0 l 0 0 l 0 124 l 734 124 l 734 0 "}," ":{"x_min":0,"x_max":0,"ha":853},"Ϋ":{"x_min":0.328125,"x_max":819.515625,"ha":889,"o":"m 588 1046 l 460 1046 l 460 1189 l 588 1189 l 588 1046 m 360 1046 l 232 1046 l 232 1189 l 360 1189 l 360 1046 m 819 1012 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1012 l 140 1012 l 411 533 l 679 1012 l 819 1012 "},"0":{"x_min":73,"x_max":715,"ha":792,"o":"m 394 -29 q 153 129 242 -29 q 73 479 73 272 q 152 829 73 687 q 394 989 241 989 q 634 829 545 989 q 715 479 715 684 q 635 129 715 270 q 394 -29 546 -29 m 394 89 q 546 211 489 89 q 598 479 598 322 q 548 748 598 640 q 394 871 491 871 q 241 748 298 871 q 190 479 190 637 q 239 211 190 319 q 394 89 296 89 "},"”":{"x_min":0,"x_max":347,"ha":454,"o":"m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 m 347 851 q 310 737 347 784 q 208 669 273 690 l 208 734 q 267 787 250 741 q 280 873 280 821 l 208 873 l 208 1013 l 347 1013 l 347 851 "},"@":{"x_min":0,"x_max":1260,"ha":1357,"o":"m 1098 -45 q 877 -160 1001 -117 q 633 -203 752 -203 q 155 -29 327 -203 q 0 360 0 127 q 176 802 0 616 q 687 1008 372 1008 q 1123 854 969 1008 q 1260 517 1260 718 q 1155 216 1260 341 q 868 82 1044 82 q 772 106 801 82 q 737 202 737 135 q 647 113 700 144 q 527 82 594 82 q 367 147 420 82 q 314 312 314 212 q 401 565 314 452 q 639 690 498 690 q 810 588 760 690 l 849 668 l 938 668 q 877 441 900 532 q 833 226 833 268 q 853 182 833 198 q 902 167 873 167 q 1088 272 1012 167 q 1159 512 1159 372 q 1051 793 1159 681 q 687 925 925 925 q 248 747 415 925 q 97 361 97 586 q 226 26 97 159 q 627 -122 370 -122 q 856 -87 737 -122 q 1061 8 976 -53 l 1098 -45 m 786 488 q 738 580 777 545 q 643 615 700 615 q 483 517 548 615 q 425 322 425 430 q 457 203 425 250 q 552 156 490 156 q 722 273 665 156 q 786 488 738 309 "},"Ί":{"x_min":0,"x_max":499,"ha":613,"o":"m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 m 499 0 l 360 0 l 360 1012 l 499 1012 l 499 0 "},"i":{"x_min":14,"x_max":136,"ha":275,"o":"m 136 873 l 14 873 l 14 1013 l 136 1013 l 136 873 m 136 0 l 14 0 l 14 737 l 136 737 l 136 0 "},"Β":{"x_min":0,"x_max":778,"ha":877,"o":"m 580 545 q 724 468 671 534 q 778 310 778 402 q 673 83 778 170 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 891 q 691 632 732 692 q 580 545 650 571 m 393 899 l 139 899 l 139 587 l 379 587 q 521 623 462 587 q 592 744 592 666 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 302 635 219 q 559 435 635 388 q 402 476 494 476 l 139 476 l 139 124 l 419 124 "},"υ":{"x_min":0,"x_max":617,"ha":725,"o":"m 617 352 q 540 94 617 199 q 308 -24 455 -24 q 76 94 161 -24 q 0 352 0 199 l 0 739 l 126 739 l 126 355 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 355 492 257 l 492 739 l 617 739 l 617 352 "},"]":{"x_min":0,"x_max":275,"ha":372,"o":"m 275 -281 l 0 -281 l 0 -187 l 151 -187 l 151 920 l 0 920 l 0 1013 l 275 1013 l 275 -281 "},"m":{"x_min":0,"x_max":1019,"ha":1128,"o":"m 1019 0 l 897 0 l 897 454 q 860 591 897 536 q 739 660 816 660 q 613 586 659 660 q 573 436 573 522 l 573 0 l 447 0 l 447 455 q 412 591 447 535 q 294 657 372 657 q 165 586 213 657 q 122 437 122 521 l 122 0 l 0 0 l 0 738 l 117 738 l 117 640 q 202 730 150 697 q 316 763 254 763 q 437 730 381 763 q 525 642 494 697 q 621 731 559 700 q 753 763 682 763 q 943 694 867 763 q 1019 512 1019 625 l 1019 0 "},"χ":{"x_min":8.328125,"x_max":780.5625,"ha":815,"o":"m 780 -278 q 715 -294 747 -294 q 616 -257 663 -294 q 548 -175 576 -227 l 379 133 l 143 -277 l 9 -277 l 313 254 l 163 522 q 127 586 131 580 q 36 640 91 640 q 8 637 27 640 l 8 752 l 52 757 q 162 719 113 757 q 236 627 200 690 l 383 372 l 594 737 l 726 737 l 448 250 l 625 -69 q 670 -153 647 -110 q 743 -188 695 -188 q 780 -184 759 -188 l 780 -278 "},"8":{"x_min":55,"x_max":736,"ha":792,"o":"m 571 527 q 694 424 652 491 q 736 280 736 358 q 648 71 736 158 q 395 -26 551 -26 q 142 69 238 -26 q 55 279 55 157 q 96 425 55 359 q 220 527 138 491 q 120 615 153 562 q 88 726 88 668 q 171 904 88 827 q 395 986 261 986 q 618 905 529 986 q 702 727 702 830 q 670 616 702 667 q 571 527 638 565 m 394 565 q 519 610 475 565 q 563 717 563 655 q 521 823 563 781 q 392 872 474 872 q 265 824 312 872 q 224 720 224 783 q 265 613 224 656 q 394 565 312 565 m 395 91 q 545 150 488 91 q 597 280 597 204 q 546 408 597 355 q 395 465 492 465 q 244 408 299 465 q 194 280 194 356 q 244 150 194 203 q 395 91 299 91 "},"ί":{"x_min":42,"x_max":326.71875,"ha":361,"o":"m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 102 239 101 q 284 112 257 104 l 284 3 m 326 1040 l 137 819 l 54 819 l 189 1040 l 326 1040 "},"Ζ":{"x_min":0,"x_max":779.171875,"ha":850,"o":"m 779 0 l 0 0 l 0 113 l 620 896 l 40 896 l 40 1013 l 779 1013 l 779 887 l 170 124 l 779 124 l 779 0 "},"R":{"x_min":0,"x_max":781.953125,"ha":907,"o":"m 781 0 l 623 0 q 587 242 590 52 q 407 433 585 433 l 138 433 l 138 0 l 0 0 l 0 1013 l 396 1013 q 636 946 539 1013 q 749 731 749 868 q 711 597 749 659 q 608 502 674 534 q 718 370 696 474 q 729 207 722 352 q 781 26 736 62 l 781 0 m 373 551 q 533 594 465 551 q 614 731 614 645 q 532 859 614 815 q 373 896 465 896 l 138 896 l 138 551 l 373 551 "},"o":{"x_min":0,"x_max":713,"ha":821,"o":"m 357 -25 q 94 91 194 -25 q 0 368 0 202 q 93 642 0 533 q 357 761 193 761 q 618 644 518 761 q 713 368 713 533 q 619 91 713 201 q 357 -25 521 -25 m 357 85 q 528 175 465 85 q 584 369 584 255 q 529 562 584 484 q 357 651 467 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 357 85 250 85 "},"5":{"x_min":54.171875,"x_max":738,"ha":792,"o":"m 738 314 q 626 60 738 153 q 382 -23 526 -23 q 155 47 248 -23 q 54 256 54 125 l 183 256 q 259 132 204 174 q 382 91 314 91 q 533 149 471 91 q 602 314 602 213 q 538 469 602 411 q 386 528 475 528 q 284 506 332 528 q 197 439 237 484 l 81 439 l 159 958 l 684 958 l 684 840 l 254 840 l 214 579 q 306 627 258 612 q 407 643 354 643 q 636 552 540 643 q 738 314 738 457 "},"7":{"x_min":58.71875,"x_max":730.953125,"ha":792,"o":"m 730 839 q 469 448 560 641 q 335 0 378 255 l 192 0 q 328 441 235 252 q 593 830 421 630 l 58 830 l 58 958 l 730 958 l 730 839 "},"K":{"x_min":0,"x_max":819.46875,"ha":906,"o":"m 819 0 l 649 0 l 294 509 l 139 355 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "},",":{"x_min":0,"x_max":142,"ha":239,"o":"m 142 -12 q 105 -132 142 -82 q 0 -205 68 -182 l 0 -138 q 57 -82 40 -124 q 70 0 70 -51 l 0 0 l 0 151 l 142 151 l 142 -12 "},"d":{"x_min":0,"x_max":683,"ha":796,"o":"m 683 0 l 564 0 l 564 93 q 456 6 516 38 q 327 -25 395 -25 q 87 100 181 -25 q 0 365 0 215 q 90 639 0 525 q 343 763 187 763 q 564 647 486 763 l 564 1013 l 683 1013 l 683 0 m 582 373 q 529 562 582 484 q 361 653 468 653 q 190 561 253 653 q 135 365 135 479 q 189 175 135 254 q 358 85 251 85 q 529 178 468 85 q 582 373 582 258 "},"¨":{"x_min":-109,"x_max":247,"ha":232,"o":"m 247 1046 l 119 1046 l 119 1189 l 247 1189 l 247 1046 m 19 1046 l -109 1046 l -109 1189 l 19 1189 l 19 1046 "},"E":{"x_min":0,"x_max":736.109375,"ha":789,"o":"m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "},"Y":{"x_min":0,"x_max":820,"ha":886,"o":"m 820 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 534 l 679 1012 l 820 1013 "},"\"":{"x_min":0,"x_max":299,"ha":396,"o":"m 299 606 l 203 606 l 203 988 l 299 988 l 299 606 m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "},"‹":{"x_min":17.984375,"x_max":773.609375,"ha":792,"o":"m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "},"„":{"x_min":0,"x_max":364,"ha":467,"o":"m 141 -12 q 104 -132 141 -82 q 0 -205 67 -182 l 0 -138 q 56 -82 40 -124 q 69 0 69 -51 l 0 0 l 0 151 l 141 151 l 141 -12 m 364 -12 q 327 -132 364 -82 q 222 -205 290 -182 l 222 -138 q 279 -82 262 -124 q 292 0 292 -51 l 222 0 l 222 151 l 364 151 l 364 -12 "},"δ":{"x_min":1,"x_max":710,"ha":810,"o":"m 710 360 q 616 87 710 196 q 356 -28 518 -28 q 99 82 197 -28 q 1 356 1 192 q 100 606 1 509 q 355 703 199 703 q 180 829 288 754 q 70 903 124 866 l 70 1012 l 643 1012 l 643 901 l 258 901 q 462 763 422 794 q 636 592 577 677 q 710 360 710 485 m 584 365 q 552 501 584 447 q 451 602 521 555 q 372 611 411 611 q 197 541 258 611 q 136 355 136 472 q 190 171 136 245 q 358 85 252 85 q 528 173 465 85 q 584 365 584 252 "},"έ":{"x_min":0,"x_max":634.71875,"ha":714,"o":"m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 313 0 265 q 128 390 67 352 q 56 459 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 m 520 1040 l 331 819 l 248 819 l 383 1040 l 520 1040 "},"ω":{"x_min":0,"x_max":922,"ha":1031,"o":"m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 339 0 203 q 45 551 0 444 q 161 738 84 643 l 302 738 q 175 553 219 647 q 124 336 124 446 q 155 179 124 249 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 342 797 257 q 745 556 797 450 q 619 738 705 638 l 760 738 q 874 551 835 640 q 922 339 922 444 "},"´":{"x_min":0,"x_max":96,"ha":251,"o":"m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "},"±":{"x_min":11,"x_max":781,"ha":792,"o":"m 781 490 l 446 490 l 446 255 l 349 255 l 349 490 l 11 490 l 11 586 l 349 586 l 349 819 l 446 819 l 446 586 l 781 586 l 781 490 m 781 21 l 11 21 l 11 115 l 781 115 l 781 21 "},"|":{"x_min":343,"x_max":449,"ha":792,"o":"m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "},"ϋ":{"x_min":0,"x_max":617,"ha":725,"o":"m 482 800 l 372 800 l 372 925 l 482 925 l 482 800 m 239 800 l 129 800 l 129 925 l 239 925 l 239 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 "},"§":{"x_min":0,"x_max":593,"ha":690,"o":"m 593 425 q 554 312 593 369 q 467 233 516 254 q 537 83 537 172 q 459 -74 537 -12 q 288 -133 387 -133 q 115 -69 184 -133 q 47 96 47 -6 l 166 96 q 199 7 166 40 q 288 -26 232 -26 q 371 -5 332 -26 q 420 60 420 21 q 311 201 420 139 q 108 309 210 255 q 0 490 0 383 q 33 602 0 551 q 124 687 66 654 q 75 743 93 712 q 58 812 58 773 q 133 984 58 920 q 300 1043 201 1043 q 458 987 394 1043 q 529 814 529 925 l 411 814 q 370 908 404 877 q 289 939 336 939 q 213 911 246 939 q 180 841 180 883 q 286 720 180 779 q 484 612 480 615 q 593 425 593 534 m 467 409 q 355 544 467 473 q 196 630 228 612 q 146 587 162 609 q 124 525 124 558 q 239 387 124 462 q 398 298 369 315 q 448 345 429 316 q 467 409 467 375 "},"b":{"x_min":0,"x_max":685,"ha":783,"o":"m 685 372 q 597 99 685 213 q 347 -25 501 -25 q 219 5 277 -25 q 121 93 161 36 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 634 q 214 723 157 692 q 341 754 272 754 q 591 637 493 754 q 685 372 685 526 m 554 356 q 499 550 554 470 q 328 644 437 644 q 162 556 223 644 q 108 369 108 478 q 160 176 108 256 q 330 83 221 83 q 498 169 435 83 q 554 356 554 245 "},"q":{"x_min":0,"x_max":683,"ha":876,"o":"m 683 -278 l 564 -278 l 564 97 q 474 8 533 39 q 345 -23 415 -23 q 91 93 188 -23 q 0 364 0 203 q 87 635 0 522 q 337 760 184 760 q 466 727 408 760 q 564 637 523 695 l 564 737 l 683 737 l 683 -278 m 582 375 q 527 564 582 488 q 358 652 466 652 q 190 565 253 652 q 135 377 135 488 q 189 179 135 261 q 361 84 251 84 q 530 179 469 84 q 582 375 582 260 "},"Ω":{"x_min":-0.171875,"x_max":969.5625,"ha":1068,"o":"m 969 0 l 555 0 l 555 123 q 744 308 675 194 q 814 558 814 423 q 726 812 814 709 q 484 922 633 922 q 244 820 334 922 q 154 567 154 719 q 223 316 154 433 q 412 123 292 199 l 412 0 l 0 0 l 0 124 l 217 124 q 68 327 122 210 q 15 572 15 444 q 144 911 15 781 q 484 1041 274 1041 q 822 909 691 1041 q 953 569 953 777 q 899 326 953 443 q 750 124 846 210 l 969 124 l 969 0 "},"ύ":{"x_min":0,"x_max":617,"ha":725,"o":"m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 535 1040 l 346 819 l 262 819 l 397 1040 l 535 1040 "},"z":{"x_min":-0.015625,"x_max":613.890625,"ha":697,"o":"m 613 0 l 0 0 l 0 100 l 433 630 l 20 630 l 20 738 l 594 738 l 593 636 l 163 110 l 613 110 l 613 0 "},"™":{"x_min":0,"x_max":894,"ha":1000,"o":"m 389 951 l 229 951 l 229 503 l 160 503 l 160 951 l 0 951 l 0 1011 l 389 1011 l 389 951 m 894 503 l 827 503 l 827 939 l 685 503 l 620 503 l 481 937 l 481 503 l 417 503 l 417 1011 l 517 1011 l 653 580 l 796 1010 l 894 1011 l 894 503 "},"ή":{"x_min":0.78125,"x_max":697,"ha":810,"o":"m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 721 124 755 q 200 630 193 687 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 m 479 1040 l 290 819 l 207 819 l 341 1040 l 479 1040 "},"Θ":{"x_min":0,"x_max":960,"ha":1056,"o":"m 960 507 q 833 129 960 280 q 476 -32 698 -32 q 123 129 255 -32 q 0 507 0 280 q 123 883 0 732 q 476 1045 255 1045 q 832 883 696 1045 q 960 507 960 732 m 817 500 q 733 789 817 669 q 476 924 639 924 q 223 792 317 924 q 142 507 142 675 q 222 222 142 339 q 476 89 315 89 q 730 218 636 89 q 817 500 817 334 m 716 449 l 243 449 l 243 571 l 716 571 l 716 449 "},"®":{"x_min":-3,"x_max":1008,"ha":1106,"o":"m 503 532 q 614 562 566 532 q 672 658 672 598 q 614 747 672 716 q 503 772 569 772 l 338 772 l 338 532 l 503 532 m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 788 146 l 678 146 q 653 316 655 183 q 527 449 652 449 l 338 449 l 338 146 l 241 146 l 241 854 l 518 854 q 688 808 621 854 q 766 658 766 755 q 739 563 766 607 q 668 497 713 519 q 751 331 747 472 q 788 164 756 190 l 788 146 "},"~":{"x_min":0,"x_max":833,"ha":931,"o":"m 833 958 q 778 753 833 831 q 594 665 716 665 q 402 761 502 665 q 240 857 302 857 q 131 795 166 857 q 104 665 104 745 l 0 665 q 54 867 0 789 q 237 958 116 958 q 429 861 331 958 q 594 765 527 765 q 704 827 670 765 q 729 958 729 874 l 833 958 "},"Ε":{"x_min":0,"x_max":736.21875,"ha":778,"o":"m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "},"³":{"x_min":0,"x_max":450,"ha":547,"o":"m 450 552 q 379 413 450 464 q 220 366 313 366 q 69 414 130 366 q 0 567 0 470 l 85 567 q 126 470 85 504 q 225 437 168 437 q 320 467 280 437 q 360 552 360 498 q 318 632 360 608 q 213 657 276 657 q 195 657 203 657 q 176 657 181 657 l 176 722 q 279 733 249 722 q 334 815 334 752 q 300 881 334 856 q 220 907 267 907 q 133 875 169 907 q 97 781 97 844 l 15 781 q 78 926 15 875 q 220 972 135 972 q 364 930 303 972 q 426 817 426 888 q 344 697 426 733 q 421 642 392 681 q 450 552 450 603 "},"[":{"x_min":0,"x_max":273.609375,"ha":371,"o":"m 273 -281 l 0 -281 l 0 1013 l 273 1013 l 273 920 l 124 920 l 124 -187 l 273 -187 l 273 -281 "},"L":{"x_min":0,"x_max":645.828125,"ha":696,"o":"m 645 0 l 0 0 l 0 1013 l 140 1013 l 140 126 l 645 126 l 645 0 "},"σ":{"x_min":0,"x_max":803.390625,"ha":894,"o":"m 803 628 l 633 628 q 713 368 713 512 q 618 93 713 204 q 357 -25 518 -25 q 94 91 194 -25 q 0 368 0 201 q 94 644 0 533 q 356 761 194 761 q 481 750 398 761 q 608 739 564 739 l 803 739 l 803 628 m 360 85 q 529 180 467 85 q 584 374 584 262 q 527 566 584 490 q 352 651 463 651 q 187 559 247 651 q 135 368 135 478 q 189 175 135 254 q 360 85 251 85 "},"ζ":{"x_min":0,"x_max":573,"ha":642,"o":"m 573 -40 q 553 -162 573 -97 q 510 -278 543 -193 l 400 -278 q 441 -187 428 -219 q 462 -90 462 -132 q 378 -14 462 -14 q 108 45 197 -14 q 0 290 0 117 q 108 631 0 462 q 353 901 194 767 l 55 901 l 55 1012 l 561 1012 l 561 924 q 261 669 382 831 q 128 301 128 489 q 243 117 128 149 q 458 98 350 108 q 573 -40 573 80 "},"θ":{"x_min":0,"x_max":674,"ha":778,"o":"m 674 496 q 601 160 674 304 q 336 -26 508 -26 q 73 153 165 -26 q 0 485 0 296 q 72 840 0 683 q 343 1045 166 1045 q 605 844 516 1045 q 674 496 674 692 m 546 579 q 498 798 546 691 q 336 935 437 935 q 178 798 237 935 q 126 579 137 701 l 546 579 m 546 475 l 126 475 q 170 233 126 348 q 338 80 230 80 q 504 233 447 80 q 546 475 546 346 "},"Ο":{"x_min":0,"x_max":958,"ha":1054,"o":"m 485 1042 q 834 883 703 1042 q 958 511 958 735 q 834 136 958 287 q 481 -26 701 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 729 q 485 1042 263 1042 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 670 q 480 913 640 913 q 226 785 321 913 q 142 504 142 671 q 226 224 142 339 q 480 98 319 98 "},"Γ":{"x_min":0,"x_max":705.28125,"ha":749,"o":"m 705 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 705 1012 l 705 886 "}," ":{"x_min":0,"x_max":0,"ha":375},"%":{"x_min":-3,"x_max":1089,"ha":1186,"o":"m 845 0 q 663 76 731 0 q 602 244 602 145 q 661 412 602 344 q 845 489 728 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 845 0 962 0 m 844 103 q 945 143 909 103 q 981 243 981 184 q 947 340 981 301 q 844 385 909 385 q 744 342 781 385 q 708 243 708 300 q 741 147 708 186 q 844 103 780 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 "},"P":{"x_min":0,"x_max":726,"ha":806,"o":"m 424 1013 q 640 931 555 1013 q 726 719 726 850 q 637 506 726 587 q 413 426 548 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 379 889 l 140 889 l 140 548 l 372 548 q 522 589 459 548 q 593 720 593 637 q 528 845 593 801 q 379 889 463 889 "},"Έ":{"x_min":0,"x_max":1078.21875,"ha":1118,"o":"m 1078 0 l 342 0 l 342 1013 l 1067 1013 l 1067 889 l 481 889 l 481 585 l 1019 585 l 1019 467 l 481 467 l 481 125 l 1078 125 l 1078 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"Ώ":{"x_min":0.125,"x_max":1136.546875,"ha":1235,"o":"m 1136 0 l 722 0 l 722 123 q 911 309 842 194 q 981 558 981 423 q 893 813 981 710 q 651 923 800 923 q 411 821 501 923 q 321 568 321 720 q 390 316 321 433 q 579 123 459 200 l 579 0 l 166 0 l 166 124 l 384 124 q 235 327 289 210 q 182 572 182 444 q 311 912 182 782 q 651 1042 441 1042 q 989 910 858 1042 q 1120 569 1120 778 q 1066 326 1120 443 q 917 124 1013 210 l 1136 124 l 1136 0 m 277 1040 l 83 800 l 0 800 l 140 1041 l 277 1040 "},"_":{"x_min":0,"x_max":705.5625,"ha":803,"o":"m 705 -334 l 0 -334 l 0 -234 l 705 -234 l 705 -334 "},"Ϊ":{"x_min":-110,"x_max":246,"ha":275,"o":"m 246 1046 l 118 1046 l 118 1189 l 246 1189 l 246 1046 m 18 1046 l -110 1046 l -110 1189 l 18 1189 l 18 1046 m 136 0 l 0 0 l 0 1012 l 136 1012 l 136 0 "},"+":{"x_min":23,"x_max":768,"ha":792,"o":"m 768 372 l 444 372 l 444 0 l 347 0 l 347 372 l 23 372 l 23 468 l 347 468 l 347 840 l 444 840 l 444 468 l 768 468 l 768 372 "},"½":{"x_min":0,"x_max":1050,"ha":1149,"o":"m 1050 0 l 625 0 q 712 178 625 108 q 878 277 722 187 q 967 385 967 328 q 932 456 967 429 q 850 484 897 484 q 759 450 798 484 q 721 352 721 416 l 640 352 q 706 502 640 448 q 851 551 766 551 q 987 509 931 551 q 1050 385 1050 462 q 976 251 1050 301 q 829 179 902 215 q 717 68 740 133 l 1050 68 l 1050 0 m 834 985 l 215 -28 l 130 -28 l 750 984 l 834 985 m 224 422 l 142 422 l 142 811 l 0 811 l 0 867 q 104 889 62 867 q 164 973 157 916 l 224 973 l 224 422 "},"Ρ":{"x_min":0,"x_max":720,"ha":783,"o":"m 424 1013 q 637 933 554 1013 q 720 723 720 853 q 633 508 720 591 q 413 426 546 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 378 889 l 140 889 l 140 548 l 371 548 q 521 589 458 548 q 592 720 592 637 q 527 845 592 801 q 378 889 463 889 "},"'":{"x_min":0,"x_max":139,"ha":236,"o":"m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "},"ª":{"x_min":0,"x_max":350,"ha":397,"o":"m 350 625 q 307 616 328 616 q 266 631 281 616 q 247 673 251 645 q 190 628 225 644 q 116 613 156 613 q 32 641 64 613 q 0 722 0 669 q 72 826 0 800 q 247 866 159 846 l 247 887 q 220 934 247 916 q 162 953 194 953 q 104 934 129 953 q 76 882 80 915 l 16 882 q 60 976 16 941 q 166 1011 104 1011 q 266 979 224 1011 q 308 891 308 948 l 308 706 q 311 679 308 688 q 331 670 315 670 l 350 672 l 350 625 m 247 757 l 247 811 q 136 790 175 798 q 64 726 64 773 q 83 682 64 697 q 132 667 103 667 q 207 690 174 667 q 247 757 247 718 "},"΅":{"x_min":0,"x_max":450,"ha":553,"o":"m 450 800 l 340 800 l 340 925 l 450 925 l 450 800 m 406 1040 l 212 800 l 129 800 l 269 1040 l 406 1040 m 110 800 l 0 800 l 0 925 l 110 925 l 110 800 "},"T":{"x_min":0,"x_max":777,"ha":835,"o":"m 777 894 l 458 894 l 458 0 l 319 0 l 319 894 l 0 894 l 0 1013 l 777 1013 l 777 894 "},"Φ":{"x_min":0,"x_max":915,"ha":997,"o":"m 527 0 l 389 0 l 389 122 q 110 231 220 122 q 0 509 0 340 q 110 785 0 677 q 389 893 220 893 l 389 1013 l 527 1013 l 527 893 q 804 786 693 893 q 915 509 915 679 q 805 231 915 341 q 527 122 696 122 l 527 0 m 527 226 q 712 310 641 226 q 779 507 779 389 q 712 705 779 627 q 527 787 641 787 l 527 226 m 389 226 l 389 787 q 205 698 275 775 q 136 505 136 620 q 206 308 136 391 q 389 226 276 226 "},"⁋":{"x_min":0,"x_max":0,"ha":694},"j":{"x_min":-77.78125,"x_max":167,"ha":349,"o":"m 167 871 l 42 871 l 42 1013 l 167 1013 l 167 871 m 167 -80 q 121 -231 167 -184 q -26 -278 76 -278 l -77 -278 l -77 -164 l -41 -164 q 26 -143 11 -164 q 42 -65 42 -122 l 42 737 l 167 737 l 167 -80 "},"Σ":{"x_min":0,"x_max":756.953125,"ha":819,"o":"m 756 0 l 0 0 l 0 107 l 395 523 l 22 904 l 22 1013 l 745 1013 l 745 889 l 209 889 l 566 523 l 187 125 l 756 125 l 756 0 "},"1":{"x_min":215.671875,"x_max":574,"ha":792,"o":"m 574 0 l 442 0 l 442 697 l 215 697 l 215 796 q 386 833 330 796 q 475 986 447 875 l 574 986 l 574 0 "},"›":{"x_min":18.0625,"x_max":774,"ha":792,"o":"m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "},"<":{"x_min":17.984375,"x_max":773.609375,"ha":792,"o":"m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "},"£":{"x_min":0,"x_max":704.484375,"ha":801,"o":"m 704 41 q 623 -10 664 5 q 543 -26 583 -26 q 359 15 501 -26 q 243 36 288 36 q 158 23 197 36 q 73 -21 119 10 l 6 76 q 125 195 90 150 q 175 331 175 262 q 147 443 175 383 l 0 443 l 0 512 l 108 512 q 43 734 43 623 q 120 929 43 854 q 358 1010 204 1010 q 579 936 487 1010 q 678 729 678 857 l 678 684 l 552 684 q 504 838 552 780 q 362 896 457 896 q 216 852 263 896 q 176 747 176 815 q 199 627 176 697 q 248 512 217 574 l 468 512 l 468 443 l 279 443 q 297 356 297 398 q 230 194 297 279 q 153 107 211 170 q 227 133 190 125 q 293 142 264 142 q 410 119 339 142 q 516 96 482 96 q 579 105 550 96 q 648 142 608 115 l 704 41 "},"t":{"x_min":0,"x_max":367,"ha":458,"o":"m 367 0 q 312 -5 339 -2 q 262 -8 284 -8 q 145 28 183 -8 q 108 143 108 64 l 108 638 l 0 638 l 0 738 l 108 738 l 108 944 l 232 944 l 232 738 l 367 738 l 367 638 l 232 638 l 232 185 q 248 121 232 140 q 307 102 264 102 q 345 104 330 102 q 367 107 360 107 l 367 0 "},"¬":{"x_min":0,"x_max":706,"ha":803,"o":"m 706 411 l 706 158 l 630 158 l 630 335 l 0 335 l 0 411 l 706 411 "},"λ":{"x_min":0,"x_max":750,"ha":803,"o":"m 750 -7 q 679 -15 716 -15 q 538 59 591 -15 q 466 214 512 97 l 336 551 l 126 0 l 0 0 l 270 705 q 223 837 247 770 q 116 899 190 899 q 90 898 100 899 l 90 1004 q 152 1011 125 1011 q 298 938 244 1011 q 373 783 326 901 l 605 192 q 649 115 629 136 q 716 95 669 95 l 736 95 q 750 97 745 97 l 750 -7 "},"W":{"x_min":0,"x_max":1263.890625,"ha":1351,"o":"m 1263 1013 l 995 0 l 859 0 l 627 837 l 405 0 l 265 0 l 0 1013 l 136 1013 l 342 202 l 556 1013 l 701 1013 l 921 207 l 1133 1012 l 1263 1013 "},">":{"x_min":18.0625,"x_max":774,"ha":792,"o":"m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "},"v":{"x_min":0,"x_max":675.15625,"ha":761,"o":"m 675 738 l 404 0 l 272 0 l 0 738 l 133 737 l 340 147 l 541 737 l 675 738 "},"τ":{"x_min":0.28125,"x_max":644.5,"ha":703,"o":"m 644 628 l 382 628 l 382 179 q 388 120 382 137 q 436 91 401 91 q 474 94 447 91 q 504 97 501 97 l 504 0 q 454 -9 482 -5 q 401 -14 426 -14 q 278 67 308 -14 q 260 233 260 118 l 260 628 l 0 628 l 0 739 l 644 739 l 644 628 "},"ξ":{"x_min":0,"x_max":624.9375,"ha":699,"o":"m 624 -37 q 608 -153 624 -96 q 563 -278 593 -211 l 454 -278 q 491 -183 486 -200 q 511 -83 511 -126 q 484 -23 511 -44 q 370 1 452 1 q 323 0 354 1 q 283 -1 293 -1 q 84 76 169 -1 q 0 266 0 154 q 56 431 0 358 q 197 538 108 498 q 94 613 134 562 q 54 730 54 665 q 77 823 54 780 q 143 901 101 867 l 27 901 l 27 1012 l 576 1012 l 576 901 l 380 901 q 244 863 303 901 q 178 745 178 820 q 312 600 178 636 q 532 582 380 582 l 532 479 q 276 455 361 479 q 118 281 118 410 q 165 173 118 217 q 274 120 208 133 q 494 101 384 110 q 624 -37 624 76 "},"&":{"x_min":-3,"x_max":894.25,"ha":992,"o":"m 894 0 l 725 0 l 624 123 q 471 0 553 40 q 306 -41 390 -41 q 168 -7 231 -41 q 62 92 105 26 q 14 187 31 139 q -3 276 -3 235 q 55 433 -3 358 q 248 581 114 508 q 170 689 196 640 q 137 817 137 751 q 214 985 137 922 q 384 1041 284 1041 q 548 988 483 1041 q 622 824 622 928 q 563 666 622 739 q 431 556 516 608 l 621 326 q 649 407 639 361 q 663 493 653 426 l 781 493 q 703 229 781 352 l 894 0 m 504 818 q 468 908 504 877 q 384 940 433 940 q 293 907 331 940 q 255 818 255 875 q 289 714 255 767 q 363 628 313 678 q 477 729 446 682 q 504 818 504 771 m 556 209 l 314 499 q 179 395 223 449 q 135 283 135 341 q 146 222 135 253 q 183 158 158 192 q 333 80 241 80 q 556 209 448 80 "},"Λ":{"x_min":0,"x_max":862.5,"ha":942,"o":"m 862 0 l 719 0 l 426 847 l 143 0 l 0 0 l 356 1013 l 501 1013 l 862 0 "},"I":{"x_min":41,"x_max":180,"ha":293,"o":"m 180 0 l 41 0 l 41 1013 l 180 1013 l 180 0 "},"G":{"x_min":0,"x_max":921,"ha":1011,"o":"m 921 0 l 832 0 l 801 136 q 655 15 741 58 q 470 -28 568 -28 q 126 133 259 -28 q 0 499 0 284 q 125 881 0 731 q 486 1043 259 1043 q 763 957 647 1043 q 905 709 890 864 l 772 709 q 668 866 747 807 q 486 926 589 926 q 228 795 322 926 q 142 507 142 677 q 228 224 142 342 q 483 94 323 94 q 712 195 625 94 q 796 435 796 291 l 477 435 l 477 549 l 921 549 l 921 0 "},"ΰ":{"x_min":0,"x_max":617,"ha":725,"o":"m 524 800 l 414 800 l 414 925 l 524 925 l 524 800 m 183 800 l 73 800 l 73 925 l 183 925 l 183 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 489 1040 l 300 819 l 216 819 l 351 1040 l 489 1040 "},"`":{"x_min":0,"x_max":138.890625,"ha":236,"o":"m 138 699 l 0 699 l 0 861 q 36 974 0 929 q 138 1041 72 1020 l 138 977 q 82 931 95 969 q 69 839 69 893 l 138 839 l 138 699 "},"·":{"x_min":0,"x_max":142,"ha":239,"o":"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "},"Υ":{"x_min":0.328125,"x_max":819.515625,"ha":889,"o":"m 819 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 "},"r":{"x_min":0,"x_max":355.5625,"ha":432,"o":"m 355 621 l 343 621 q 179 569 236 621 q 122 411 122 518 l 122 0 l 0 0 l 0 737 l 117 737 l 117 604 q 204 719 146 686 q 355 753 262 753 l 355 621 "},"x":{"x_min":0,"x_max":675,"ha":764,"o":"m 675 0 l 525 0 l 331 286 l 144 0 l 0 0 l 256 379 l 12 738 l 157 737 l 336 473 l 516 738 l 661 738 l 412 380 l 675 0 "},"μ":{"x_min":0,"x_max":696.609375,"ha":747,"o":"m 696 -4 q 628 -14 657 -14 q 498 97 513 -14 q 422 8 470 41 q 313 -24 374 -24 q 207 3 258 -24 q 120 80 157 31 l 120 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 172 124 246 q 308 82 216 82 q 451 177 402 82 q 492 358 492 254 l 492 738 l 616 738 l 616 214 q 623 136 616 160 q 673 92 636 92 q 696 95 684 92 l 696 -4 "},"h":{"x_min":0,"x_max":615,"ha":724,"o":"m 615 472 l 615 0 l 490 0 l 490 454 q 456 590 490 535 q 338 654 416 654 q 186 588 251 654 q 122 436 122 522 l 122 0 l 0 0 l 0 1013 l 122 1013 l 122 633 q 218 727 149 694 q 362 760 287 760 q 552 676 484 760 q 615 472 615 600 "},".":{"x_min":0,"x_max":142,"ha":239,"o":"m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "},"φ":{"x_min":-2,"x_max":878,"ha":974,"o":"m 496 -279 l 378 -279 l 378 -17 q 101 88 204 -17 q -2 367 -2 194 q 68 626 -2 510 q 283 758 151 758 l 283 646 q 167 537 209 626 q 133 373 133 462 q 192 177 133 254 q 378 93 259 93 l 378 758 q 445 764 426 763 q 476 765 464 765 q 765 659 653 765 q 878 377 878 553 q 771 96 878 209 q 496 -17 665 -17 l 496 -279 m 496 93 l 514 93 q 687 183 623 93 q 746 380 746 265 q 691 569 746 491 q 522 658 629 658 l 496 656 l 496 93 "},";":{"x_min":0,"x_max":142,"ha":239,"o":"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 -12 q 105 -132 142 -82 q 0 -206 68 -182 l 0 -138 q 58 -82 43 -123 q 68 0 68 -56 l 0 0 l 0 151 l 142 151 l 142 -12 "},"f":{"x_min":0,"x_max":378,"ha":472,"o":"m 378 638 l 246 638 l 246 0 l 121 0 l 121 638 l 0 638 l 0 738 l 121 738 q 137 935 121 887 q 290 1028 171 1028 q 320 1027 305 1028 q 378 1021 334 1026 l 378 908 q 323 918 346 918 q 257 870 273 918 q 246 780 246 840 l 246 738 l 378 738 l 378 638 "},"“":{"x_min":1,"x_max":348.21875,"ha":454,"o":"m 140 670 l 1 670 l 1 830 q 37 943 1 897 q 140 1011 74 990 l 140 947 q 82 900 97 940 q 68 810 68 861 l 140 810 l 140 670 m 348 670 l 209 670 l 209 830 q 245 943 209 897 q 348 1011 282 990 l 348 947 q 290 900 305 940 q 276 810 276 861 l 348 810 l 348 670 "},"A":{"x_min":0.03125,"x_max":906.953125,"ha":1008,"o":"m 906 0 l 756 0 l 648 303 l 251 303 l 142 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 610 421 l 452 867 l 293 421 l 610 421 "},"6":{"x_min":53,"x_max":739,"ha":792,"o":"m 739 312 q 633 62 739 162 q 400 -31 534 -31 q 162 78 257 -31 q 53 439 53 206 q 178 859 53 712 q 441 986 284 986 q 643 912 559 986 q 732 713 732 833 l 601 713 q 544 830 594 786 q 426 875 494 875 q 268 793 331 875 q 193 517 193 697 q 301 597 240 570 q 427 624 362 624 q 643 540 552 624 q 739 312 739 451 m 603 298 q 540 461 603 400 q 404 516 484 516 q 268 461 323 516 q 207 300 207 401 q 269 137 207 198 q 405 83 325 83 q 541 137 486 83 q 603 298 603 197 "},"‘":{"x_min":1,"x_max":139.890625,"ha":236,"o":"m 139 670 l 1 670 l 1 830 q 37 943 1 897 q 139 1011 74 990 l 139 947 q 82 900 97 940 q 68 810 68 861 l 139 810 l 139 670 "},"ϊ":{"x_min":-70,"x_max":283,"ha":361,"o":"m 283 800 l 173 800 l 173 925 l 283 925 l 283 800 m 40 800 l -70 800 l -70 925 l 40 925 l 40 800 m 283 3 q 232 -10 257 -5 q 181 -15 206 -15 q 84 26 118 -15 q 41 200 41 79 l 41 737 l 166 737 l 167 215 q 171 141 167 157 q 225 101 182 101 q 247 103 238 101 q 283 112 256 104 l 283 3 "},"π":{"x_min":-0.21875,"x_max":773.21875,"ha":857,"o":"m 773 -7 l 707 -11 q 575 40 607 -11 q 552 174 552 77 l 552 226 l 552 626 l 222 626 l 222 0 l 97 0 l 97 626 l 0 626 l 0 737 l 773 737 l 773 626 l 676 626 l 676 171 q 695 103 676 117 q 773 90 714 90 l 773 -7 "},"ά":{"x_min":0,"x_max":765.5625,"ha":809,"o":"m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 727 407 760 q 563 637 524 695 l 563 738 l 685 738 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 95 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 m 604 1040 l 415 819 l 332 819 l 466 1040 l 604 1040 "},"O":{"x_min":0,"x_max":958,"ha":1057,"o":"m 485 1041 q 834 882 702 1041 q 958 512 958 734 q 834 136 958 287 q 481 -26 702 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 728 q 485 1041 263 1041 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 669 q 480 912 640 912 q 226 784 321 912 q 142 504 142 670 q 226 224 142 339 q 480 98 319 98 "},"n":{"x_min":0,"x_max":615,"ha":724,"o":"m 615 463 l 615 0 l 490 0 l 490 454 q 453 592 490 537 q 331 656 410 656 q 178 585 240 656 q 117 421 117 514 l 117 0 l 0 0 l 0 738 l 117 738 l 117 630 q 218 728 150 693 q 359 764 286 764 q 552 675 484 764 q 615 463 615 593 "},"3":{"x_min":54,"x_max":737,"ha":792,"o":"m 737 284 q 635 55 737 141 q 399 -25 541 -25 q 156 52 248 -25 q 54 308 54 140 l 185 308 q 245 147 185 202 q 395 96 302 96 q 539 140 484 96 q 602 280 602 190 q 510 429 602 390 q 324 454 451 454 l 324 565 q 487 584 441 565 q 565 719 565 617 q 515 835 565 791 q 395 879 466 879 q 255 824 307 879 q 203 661 203 769 l 78 661 q 166 909 78 822 q 387 992 250 992 q 603 921 513 992 q 701 723 701 844 q 669 607 701 656 q 578 524 637 558 q 696 434 655 499 q 737 284 737 369 "},"9":{"x_min":53,"x_max":739,"ha":792,"o":"m 739 524 q 619 94 739 241 q 362 -32 516 -32 q 150 47 242 -32 q 59 244 59 126 l 191 244 q 246 129 191 176 q 373 82 301 82 q 526 161 466 82 q 597 440 597 255 q 363 334 501 334 q 130 432 216 334 q 53 650 53 521 q 134 880 53 786 q 383 986 226 986 q 659 841 566 986 q 739 524 739 719 m 388 449 q 535 514 480 449 q 585 658 585 573 q 535 805 585 744 q 388 873 480 873 q 242 809 294 873 q 191 658 191 745 q 239 514 191 572 q 388 449 292 449 "},"l":{"x_min":41,"x_max":166,"ha":279,"o":"m 166 0 l 41 0 l 41 1013 l 166 1013 l 166 0 "},"¤":{"x_min":40.09375,"x_max":728.796875,"ha":825,"o":"m 728 304 l 649 224 l 512 363 q 383 331 458 331 q 256 363 310 331 l 119 224 l 40 304 l 177 441 q 150 553 150 493 q 184 673 150 621 l 40 818 l 119 898 l 267 749 q 321 766 291 759 q 384 773 351 773 q 447 766 417 773 q 501 749 477 759 l 649 898 l 728 818 l 585 675 q 612 618 604 648 q 621 553 621 587 q 591 441 621 491 l 728 304 m 384 682 q 280 643 318 682 q 243 551 243 604 q 279 461 243 499 q 383 423 316 423 q 487 461 449 423 q 525 553 525 500 q 490 641 525 605 q 384 682 451 682 "},"κ":{"x_min":0,"x_max":632.328125,"ha":679,"o":"m 632 0 l 482 0 l 225 384 l 124 288 l 124 0 l 0 0 l 0 738 l 124 738 l 124 446 l 433 738 l 596 738 l 312 466 l 632 0 "},"4":{"x_min":48,"x_max":742.453125,"ha":792,"o":"m 742 243 l 602 243 l 602 0 l 476 0 l 476 243 l 48 243 l 48 368 l 476 958 l 602 958 l 602 354 l 742 354 l 742 243 m 476 354 l 476 792 l 162 354 l 476 354 "},"p":{"x_min":0,"x_max":685,"ha":786,"o":"m 685 364 q 598 96 685 205 q 350 -23 504 -23 q 121 89 205 -23 l 121 -278 l 0 -278 l 0 738 l 121 738 l 121 633 q 220 726 159 691 q 351 761 280 761 q 598 636 504 761 q 685 364 685 522 m 557 371 q 501 560 557 481 q 330 651 437 651 q 162 559 223 651 q 108 366 108 479 q 162 177 108 254 q 333 87 224 87 q 502 178 441 87 q 557 371 557 258 "},"‡":{"x_min":0,"x_max":777,"ha":835,"o":"m 458 238 l 458 0 l 319 0 l 319 238 l 0 238 l 0 360 l 319 360 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 l 777 804 l 777 683 l 458 683 l 458 360 l 777 360 l 777 238 l 458 238 "},"ψ":{"x_min":0,"x_max":808,"ha":907,"o":"m 465 -278 l 341 -278 l 341 -15 q 87 102 180 -15 q 0 378 0 210 l 0 739 l 133 739 l 133 379 q 182 195 133 275 q 341 98 242 98 l 341 922 l 465 922 l 465 98 q 623 195 563 98 q 675 382 675 278 l 675 742 l 808 742 l 808 381 q 720 104 808 213 q 466 -13 627 -13 l 465 -278 "},"η":{"x_min":0.78125,"x_max":697,"ha":810,"o":"m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 720 124 755 q 200 630 193 686 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 "}},"cssFontWeight":"normal","ascender":1189,"underlinePosition":-100,"cssFontStyle":"normal","boundingBox":{"yMin":-334,"xMin":-111,"yMax":1189,"xMax":1672},"resolution":1000,"original_font_information":{"postscript_name":"Helvetiker-Regular","version_string":"Version 1.00 2004 initial release","vendor_url":"http://www.magenta.gr/","full_font_name":"Helvetiker","font_family_name":"Helvetiker","copyright":"Copyright (c) Μagenta ltd, 2004","description":"","trademark":"","designer":"","designer_url":"","unique_font_identifier":"Μagenta ltd:Helvetiker:22-10-104","license_url":"http://www.ellak.gr/fonts/MgOpen/license.html","license_description":"Copyright (c) 2004 by MAGENTA Ltd. All Rights Reserved.\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy of the fonts accompanying this license (\"Fonts\") and associated documentation files (the \"Font Software\"), to reproduce and distribute the Font Software, including without limitation the rights to use, copy, merge, publish, distribute, and/or sell copies of the Font Software, and to permit persons to whom the Font Software is furnished to do so, subject to the following conditions: \r\n\r\nThe above copyright and this permission notice shall be included in all copies of one or more of the Font Software typefaces.\r\n\r\nThe Font Software may be modified, altered, or added to, and in particular the designs of glyphs or characters in the Fonts may be modified and additional glyphs or characters may be added to the Fonts, only if the fonts are renamed to names not containing the word \"MgOpen\", or if the modifications are accepted for inclusion in the Font Software itself by the each appointed Administrator.\r\n\r\nThis License becomes null and void to the extent applicable to Fonts or Font Software that has been modified and is distributed under the \"MgOpen\" name.\r\n\r\nThe Font Software may be sold as part of a larger software package but no copy of one or more of the Font Software typefaces may be sold by itself. \r\n\r\nTHE FONT SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL MAGENTA OR PERSONS OR BODIES IN CHARGE OF ADMINISTRATION AND MAINTENANCE OF THE FONT SOFTWARE BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.","manufacturer_name":"Μagenta ltd","font_sub_family_name":"Regular"},"descender":-334,"familyName":"Helvetiker","lineHeight":1522,"underlineThickness":50});






















function jsurface3d_init(surfaceMapData){
    new JSurface3D({
        selector: '.surfaceMap',
        data: surfaceMapData,
        options: {
            /*
            axis_offset: 5,             // X and Z axis distance from the surface
            camera_focus_y_offset: 10,  // Move the focal point of the camera up and down
            floating_height: 20,        // Height the surface floats over the floor
            font_face_3d: 'helvetiker', // 3D text font (glyphs for 3D fonts need to be loaded separately)
            font_size: 34,              // 3D text font size (not in any particular units)
            font_height: 3,             // Extrusion height for 3D text
            font_color: 0x555555,       // Font color for value labels
            font_color_axis_labels: 0x555555,     // Font color for axis labels
            hud: true,                            // Toggle options overlay and volatility display

            interactive_surface_color: 0x555555,  // Highlight for interactive surface elements (in hex)
            interactive_hud_color: '#555',        // Highlight colour for volatility display (in css)
            precision_lbl: 2,                     // Floating point precisions for labels
            precision_hud: 3,                     // Floating point precisions for vol display
            slice_handle_color: 0xbbbbbb,         // Default colour for slice handles
            slice_handle_color_hover: 0x999999,   // Hover colour for slice handles
            slice_bar_color: 0xe7e7e7,            // Default slice bar colour
            slice_bar_color_active: 0xffbd00,     // Active slice bar colour
            smile_distance: 80,                   // Distance the smile planes are from the surface
            snap_distance: 3,                     // Mouse proximity to vertices before an interaction is approved
            surface_x: 100,                       // Width
            surface_z: 100,                       // Depth
            surface_y: 50,                        // The height range of the surface
            texture_size: 512,                    // Texture map size for axis ticks
            tick_length: 10,                      // Axis tick length
            y_segments: 5,                        // Number of segments to thin vol out to for smile planes
            vertex_shading_hue_min: 240,          // vertex shading hue range min value
            vertex_shading_hue_max: 180,          // vertex shading hue range max value
            zoom_default: 200,                    // Bigger numbers are further away
            zoom_sensitivity: 10                  // Mouse wheel sensitivity
            */
        }
    });
}

$(function(){
    $( "#datepicker" ).datepicker();
    if(gon.data.surfacemap !== undefined ){
        jsurface3d_init(gon.data.surfacemap);
    }
});
