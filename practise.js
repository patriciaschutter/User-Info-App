// PART 0: If you're having trouble finding matching users, solve this puzzle first:

// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

var stringOne = ['brie', 'gouda', 'cheddar'];
function Matching (astring, value){
	return astring.indexOf(value)
}

console.log(Matching(stringOne, 'cheddar')) // outcome 2 >> its index nr 2 

// now, write a function that finds all the indexes of where the value is located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]

var stringTwo = ['brie', 'gouda', 'brie', 'cheddar'];
var countArray = [];

function locationArray(astring, value){
	var INDEXOF = astring.indexOf(value)
	for (var i = 0; i < astring.length; i++) {
		if (INDEXOF !== -1){ // if its not -1 so if there is a match 
		countArray.push(INDEXOF)
		INDEXOF = astring.indexOf(value, INDEXOF + 1)
		} 
	}
	return countArray
}
console.log(locationArray(stringTwo, 'brie')) // outcome: [ 0, 2 ]
