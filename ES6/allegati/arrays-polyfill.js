/*
########	Polyfill dei metodi arrays introdotti in ES6 	########
slice	- isArray - indexOf - lastIndexOf - map - filter - forEach - every - some - reduce - from - fill - find - findIndex - Object.assign() 

*/


//### 	Polyfill che risolve una incompatilità dei browser sull'uso di <b>Array.prototype.slice</b> con oggetti del DOM 	###
(function () {
	'use strict';
	var _slice = Array.prototype.slice;

	try {
//		Can't be used with DOM elements in IE < 9
		_slice.call(document.documentElement);
	} catch (e) { // Fails in IE < 9
//		This will work for genuine arrays, array-like objects, 
//		NodeList (getElementsByTagName), HTMLCollection (childNodes), and will not fail on other DOM objects (as do DOM elements in IE < 9)
		Array.prototype.slice = function(begin, end) {
		// IE < 9 gets unhappy with an undefined end argument
			end = (typeof end !== 'undefined') ? end : this.length;

      // For native Array objects, we use the native slice function
			if (Object.prototype.toString.call(this) === '[object Array]'){
				return _slice.call(this, begin, end); 
			}
      // For array like object we handle it ourselves.
			var i, cloned = [],
			size, len = this.length;
//			Handle negative value for "begin"
			var start = begin || 0;
			start = (start >= 0) ? start: len + start;
//			Handle negative value for "end"
			var upTo = (end) ? end : len;
			if (end < 0) {
				upTo = len + end;
			}
//			Actual expected size of the slice
			size = upTo - start;
			if (size > 0) {
				cloned = new Array(size);
				if (this.charAt) {
					for (i = 0; i < size; i++) {
						cloned[i] = this.charAt(start + i);
					}
				} else {
					for (i = 0; i < size; i++) {
						cloned[i] = this[start + i];
					}
				}
			}
      	return cloned;
		};
	}
}());



//### 	Polyfill isArray (Provato su IE8 funziona) 	###
if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

//### 	Polyfill indexOf (Provato su IE8 funziona) 	###
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		var k;
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = +fromIndex || 0;
		if (Math.abs(n) === Infinity) {
			n = 0;
		}
		if (n >= len) {
			return -1;
		}
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		while (k < len) {
			if (k in O && O[k] === searchElement) {
				return k;
			}
		k++;
		}
		return -1;
	};
}


//### 	Polyfill lastIndexOf (Provato su IE8 funziona) 	###
if (!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
		'use strict';
		if (this === void 0 || this === null) {
			throw new TypeError();
		}
		var n, k,
		t = Object(this),
		len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		n = len - 1;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) {
				n = 0;
			}else if(n != 0 && n != (1 / 0) && n != -(1 / 0)) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}

		for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}



//### 	Polyfill map (Provato su IE8 funziona) 	###
if (!Array.prototype.map) {
	Array.prototype.map = function(callback, thisArg) {
		var T, A, k;
		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;

		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		A = new Array(len);
		k = 0;
		while (k < len) {
			var kValue, mappedValue;
			if (k in O) {
				kValue = O[k];
				mappedValue = callback.call(T, kValue, k, O);
				A[k] = mappedValue;
			}
			k++;
		}
		return A;
	};
}

//### 	Polyfill filter (Provato su IE funziona) 	###
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun/*, thisArg*/) {
		'use strict';
		if (this === void 0 || this === null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}
		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];
				if (fun.call(thisArg, val, i, t)) {
					res.push(val);
				}
			}
		}
		return res;
	};
}


//### 	Polyfill forEach (Provato su IE funziona) 	### 
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}


//### 	Polyfill every (Provato su IE funziona) 	###
if (!Array.prototype.every) {
	Array.prototype.every = function(callbackfn, thisArg) {
		'use strict';
		var T, k;
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (typeof callbackfn !== 'function') {
			throw new TypeError();
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O) {
				kValue = O[k];
				var testResult = callbackfn.call(T, kValue, k, O);
				if (!testResult) {
					return false;
				}
			}
		k++;
		}
		return true;
	};
}

//### 	Polyfill some (Provato su IE funziona)
if (!Array.prototype.some) {
	Array.prototype.some = function(fun /*, thisArg*/) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}
		if (typeof fun !== 'function') {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}
		return false;
	};
}


//### 	Polyfill reduce (Provato su IE8 funziona) 	### 
if (!Array.prototype.reduce) {
	Array.prototype.reduce = function(callback /*, initialValue*/) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		var t = Object(this), len = t.length >>> 0, k = 0, value;
		if (arguments.length == 2) {
			value = arguments[1];
		} else {
			while (k < len && ! k in t) {
				k++; 
			}
			if (k >= len) {
				throw new TypeError('Reduce of empty array with no initial value');
			}
			value = t[k++];
		}
		for (; k < len; k++) {
			if (k in t) {
				value = callback(value, t[k], k, t);
			}
		}
		return value;
	};
}


//### 	Polyfill from (Provato su IE8 funziona) 	### 
if (!Array.from) {
	Array.from = (function () {
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) { return 0; }
			if (number === 0 || !isFinite(number)) { return number; }
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};
		return function from(arrayLike/*, mapFn, thisArg */) {
			var C = this;
			var items = Object(arrayLike);
			if (arrayLike == null) {
				throw new TypeError("Array.from requires an array-like object - not null or undefined");
			}
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}
			var len = toLength(items.length);
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);
			var k = 0;
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			A.length = len;
			return A;
		};
	}());
}


//### 	Polyfill fill (Provato su IE8 funziona) 	### 
if (!Array.prototype.fill) {
	Array.prototype.fill = function(value) {
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		var start = arguments[1];
		var relativeStart = start >> 0;
		var k = relativeStart < 0 ?
		Math.max(len + relativeStart, 0) :
		Math.min(relativeStart, len);
		var end = arguments[2];
		var relativeEnd = end === undefined ?
		len : end >> 0;
		var finale = relativeEnd < 0 ?
		Math.max(len + relativeEnd, 0) :
		Math.min(relativeEnd, len);
		while (k < finale) {
			O[k] = value;
			k++;
		}
		return O;
	};
}


//### 	Polyfill find (Provato su IE8 funziona) 	### 
if (!Array.prototype.find) {
	Array.prototype.find = function(predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
}


//### 	Polyfill findIndex (Provato su IE8 funziona) 	### 
if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function(predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return i;
			}
		}
		return -1;
	};
}


//### Polyfill Object.assign()

if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}

				nextSource = Object(nextSource);

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}

      	return to;

		}
	});
}











