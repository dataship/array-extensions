
Object.defineProperty(Array.prototype, "min", {
	enumerable : false,
	writable : false,
	value: function(){
		if(this.length === 0) throw new Error("min called on zero size array.");

		var min = this[0];
		for(var i = 1; i < this.length; i++){
			min = Math.min(min, this[i]);
		}
		return min;
	}
});

Object.defineProperty(Array.prototype, "max", {
	enumerable : false,
	writable : false,
	value: function(){
		if(this.length === 0) throw new Error("max called on zero size array.");

		var max = this[0];
		for(var i = 1; i < this.length; i++){
			max = Math.max(max, this[i]);
		}
		return max;
	}
});

Object.defineProperty(Array.prototype, "sum", {
	enumerable : false,
	writable : false,
	value: function(){
		var sum = 0;
		for(var i = 0; i < this.length; i++){
			sum += this[i];
		}

		return sum;
	}
});

Object.defineProperty(Array.prototype, "mean", {
	enumerable : false,
	writable : false,
	value: function(){
		if(this.length === 0) throw new Error("mean called on zero size array.");

		return this.sum() / this.length;
	}
});

/* population standard deviation */
Object.defineProperty(Array.prototype, "std", {
	enumerable : false,
	writable : false,
	value: function(){
		if(this.length === 0) throw new Error("std called on zero size array.");

		var mean = this.mean();

		var variance = 0;
		for(var i = 0; i < this.length; i++){
			variance += Math.pow(mean - this[i], 2);
		}
		variance = variance / this.length;

		return Math.sqrt(variance);
	}
});

Object.defineProperty(Array.prototype, "mode", {
	enumerable : false,
	writable : false,
	value: function(){
		if(this.length === 0) throw new Error("mode called on zero size array.");

		var counts = {};
		var mode = this[0];

		for(var i = 0; i < this.length; i++){
			var val = this[i];

			if(val in counts)
				counts[val] += 1;
			else
				counts[val] = 1;

			if(counts[val] > counts[mode])
				mode = val;
		}

		return mode;
	}
});

// a comparator for sorting arrays of numbers
function comparator(a, b){ return a > b ? 1 : a < b ? -1 : 0;};

Object.defineProperty(Array.prototype, "median", {
	enumerable : false,
	writable : false,
	value: function(){
		if(this.length === 0) throw new Error("median called on zero size array.");

		var sorted = this.slice(0);
		sorted.sort(comparator);

		var middle = sorted.length / 2 | 0;
		// even number of elements?
		if(sorted.length % 2 !== 0){
			// no, return the middle one
			return sorted[middle];
		} else {
			// yes, return the average of the middle two
			return (sorted[middle - 1] + sorted[middle]) / 2;
		}
	}
});
