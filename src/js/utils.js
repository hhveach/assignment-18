export function randomNumBtw(num1, num2, isInclusive){
  var randomNum = Math.random()
  var range = num2 - num1 // 4
  if(isInclusive) { range = range + 1 }

  return num1 + ( Math.floor(randomNum * range) )
}


export function forEach (arr){
	for(var i = 0; i < arr.length; i++){
		cb(arr[i], i, arr)
	}
}

export function createClassNames(styleClassesObj){
	var classNameStr = ''

	for(var propName in styleClassesObj  ){
		var boolValueForClassNameProperty = styleClassesObj[propName]
		if (boolValueForClassNameProperty === true){
			classNameStr += " " + propName
		}
	}
	return classNameStr
	//OUTPUT : string (space separated)
}
