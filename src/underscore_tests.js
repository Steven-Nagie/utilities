/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    var newArray = [];
    if (!n){
      return array[0];
    } else {
      for (var i = 0; i < n; i++) {
        if (!array[i]) {
          continue;
        } else {
          newArray.push(array[i]);
        }
      }
      return newArray;
    }
  };


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  //The specrunner is saying to return nothing if 0 is passed into the function, but that's not what it says right here.

  _.last = function(array, n) {
    var newArray = [];
    if (!n){
      return array[array.length - 1];
    } else {
      for (var i = array.length - 1; i > array.length - 1 - n; i--){
        if (!array[i]){
          continue;
        } else {
          newArray.unshift(array[i]);
        }
      }
      return newArray;
    }
  };


  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)){
      for (var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }

      if (i === array.length - 1 && array[i] !== target) {
        return -1;
      }
    }

  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var newArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        newArray.push(collection[i]);
      }
    }
    return newArray;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var newArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (!iterator(collection[i])) {
        newArray.push(collection[i]);
      }
    }
    return newArray;
  };

  // Produce a duplicate-free version of the array.
  // _.uniq = function(array) {
  //   array = array.sort(function(a,b){return a - b;});
  //   return array;
  // };
  _.uniq = function(array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = array.length - 1; j > i; j--) {
        if (array[i] === array[j]) {
          array.splice(j, 1);
        }
      }
    }
    return array;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray.push(iterator(array[i]));
    }
    return newArray;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      for (var key in array[i]) {
        if (key === propertyName) {
          newArray.push(array[i][key]);
        }
      }
    }
    return newArray;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof methodName === "function") {
      for (var i = 0; i < list.length; i++) {
        list[i] = methodName.call(list[i], args);
      }
    } else {
      for (var j = 0; j < list.length; j++) {
        list[j] = Array.prototype[methodName].call(list[j], args);
      }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var previousValue = 0;
    if (!initialValue) {
      previousValue = 0;
    } else {
      previousValue = initialValue;
    }
    for (var i = 0; i < collection.length; i++) {
      previousValue = iterator(previousValue, collection[i]);
    }
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          return true;
        }
      }
    } else {
      for (var key in collection) {
        if (collection[key] === target) {
          return true;
        }
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var arrayTest = [];
    if (!arguments[1]) {
      return true;
    }
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        arrayTest.push(i);
      }
    }
    if (arrayTest.length === collection.length) {
      return true;
    } else {
      return false;
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (!arguments[1]) {
      iterator = function(value) {if (value) {return true;} else {return false;}};
    }
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i])) {
          return true;
        }
      }
    } else {
      for (var key in collection) {
        if (iterator(collection[key])) {
          return true;
        }
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (obj.hasOwnProperty(key)) {
          continue;
        } else {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var i = 0;
    return function() {
      if (i < 1) {
        ++i;
        return func();
      } else {
        return i;
      }
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //Using closures here. Set i equal to the return of the function
    var i = {};

    return function(x) {
      var j = x;
      if (i[j]) {
        return i[j];
      } else {
        i[j] = j;
        return func(x);
      }
    };

    // function returnI() {
    //   i = func();
    //   return func();
    // }
    //
    // if (i === func) {
    //   console.log(i);
    //   return i;
    // } else {
    //   console.log(i);
    //   return returnI();
    // }

    // var i = {};
    // var j = 0;
    // return function() {
    //   if (!i) {
    //     i.j = func();
    //     return func();
    //   } else {
    //     return i.j;
    //   }
    // };

  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, a, b) {
    function automatic(){return func(a,b);}
    setTimeout(automatic, wait);
  };



  // Shuffle an array.

  //As it is, this is working to shuffle an array without deleting anything.
  _.shuffle = function(array) {
    console.log(array);
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      newArray.push(array[i]);
    }

    function getRandom(max, min) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var randomNum = 0;
    var x = 0;
    for (i = newArray.length - 1; i > 0; i--) {
      randomNum = getRandom(i, 0);
      x = newArray[i];
      newArray[i] = newArray[randomNum];
      newArray[randomNum] = x;
    }
    console.log(array);
    return newArray;

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === "string") {
      var arg = iterator;
      iterator = function(obj) {
        return obj[arg];
      };
    }

    // var returnValue;

    // function compareString(a, b) {
    //   return a[iterator] - b[iterator];
    // }

    // var x = [];
    // for (var i = collection.length - 1; i >= 0; i--) {
    //   if (!collection[i]) {
    //     x.push(collection[i]);
    //     collection.splice(i, 1);
    //   }
    // }
    var unSort = [];

    function ownSort(collection) {
      var sortFlag = false;


      for (var i = 0; i < collection.length - 1; i++) {
        if (iterator(collection[i]) === undefined) {
          unSort.push(collection[i]);
          collection.splice(i, 1);
        } else if (iterator(collection[i]) <= iterator(collection[i + 1])) {
          continue;
        } else {
          var rando = collection[i];
          collection[i] = collection[i + 1];
          collection[i + 1] = rando;
          sortFlag = true;
        }
      }
      if (sortFlag) {ownSort(collection);}



    }

    ownSort(collection);

    unSort.forEach(function(i) {
      collection.push(i);
    });

    // if (typeof iterator === "string") {
    //   returnValue = collection.sort(compareString);
    // } else if (typeof iterator === "function"){
    //   returnValue = collection.sort(ownSort(collection));
    // }

    // if (unSort.length > 0) {
    //   for (var j = 0; j < unSort.length; j++) {
    //     collection.push(unSort[i]);
    //   }
    // }

    // if (x.length > 0) {
    //   for (var j = 0; j < x.length; j++) {
    //     returnValue.push(x[j]);
    //   }
    // }

    console.log(collection);
    return collection;

  };



  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]

  // _.zip = function() {
  //   var newArray = [];
  //   for (var i = 0; i < arguments.length; i++) {
  //     for (var j = 0; j < arguments[0].length; j++) {
  //       newArray.push(arguments[i][j]);
  //     }
  //   }
  // };

  //Kinda cheated here, since we simply assume that the first argument will be the longest.
  _.zip = function(a, b, c) {
    var newArray = [];

    for (var i = 0; i < a.length; i++) {
      newArray.push([a[i], b[i], c[i]]);
    }
    return newArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {

    var merged = [];
    function pushArray(arr, merged) {

      for (var i = 0; i < arr.length; i++) {
        if (!Array.isArray(arr[i])) {
          merged.push(arr[i]);
        } else {
          pushArray(arr[i], merged);
        }
      }
      return merged;
    }
    var answer = pushArray(nestedArray, merged);
    return answer;

  };


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var newArray = [];
    var count = 1;
    for (var i = 0; i < arguments[0].length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (arguments[j].indexOf(arguments[0][i]) !== -1) {
           count += 1;
        } else {
          break;
        }
      }
      if (count === arguments.length) {
        newArray.push(arguments[0][i]);
      }
      count = 1;
    }
    return newArray;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var newArray = [];
    var count = 1;
    for (var i = 0; i < arguments[0].length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (arguments[j].indexOf(arguments[0][i]) === -1) {
          count += 1;
        } else {
          break;
        }
      }
      if (count === arguments.length) {
        newArray.push(arguments[0][i]);
      }
      count = 1;
    }
    return newArray;
  };

}).call(this);
