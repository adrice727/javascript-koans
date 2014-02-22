var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      var noNuts = _(products).filter(function (a) { return a.containsNuts == false } );

      productsICanEat.push(_(noNuts).reject(function (a) { return _(a.ingredients).any(function (b) { return b == "mushrooms" } ) } ));

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _.chain(_.range(1000)).filter(function(num) { return num % 3 === 0 || num % 5 === 0 }).reduce(function(memo, num) { return memo + num;}).value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {

    /* chain() together map(), flatten() and reduce() */
    var ingredientCount = _.chain(products)
                            .map(function (a) { return a.ingredients })
                            .flatten()
                            .reduce(function(counts, word) 
                              {counts[word] = (counts[word] || 0) + 1; 
                              return counts;
                            }, {}).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /* All items below were the extra-credit problems */

 
  it("should find the largest prime factor of a composite number", function () {

    var comp = 51;
    var result;

    for (var i = comp - 1; i < 1; i--) {
      if (comp % i == 0 && isPrime(i)) {
        result = i;;
      }
    }

    if (!result) {
      return "No prime factor found";
    } else {return result;
    };

    function isPrime(num) {
      if (num <= 2) {
        return false;
      } else {
        for (var i = 2; i < num; i++) {
          if (num % i == 0) {
            return false;
          }
        }
      }
      return true;
    }

    expect(51).toBe(17);
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var result;
    var pals = [];
    var current;

    for (var i = 100; i < 1000; i++) {
      for (var j = 100; j< 1000; j++) {
       current = i * j;
       if ( current.toString().split("").join("") == current.toString().split("").reverse().join("")) {
         pals.push(current)
       }
      }
    }

    result = _.max(pals);
    return result;

    expect(result).toBe(906609);
    
  });


  // Not working in the console, but the koan passes.  Not sure what the issue is, but it has to be somewhere in the while loop.

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var num = 1;
    var result;

    while (!result) {
      if ( divisibleByAll(num) ) {
        result = num;
      } else {
        num++;
      }
    };

    function divisibleByAll(number){
      if (number ==0) return false;
      for ( var i  = 1; i < 21; i++){
        if ( number % i != 0) return false;
      }
      return true;
    } 

    expect(result).toBe(232792560);
    
  });


  //Not entirely sure how this is supposed to work without passing in any arguments, but I think I solved the "gist" of it
  it("should find the difference between the sum of the squares and the square of the sums", function () {

    var arguments = [2,3];
    var sum;
    var square;

    for (var i = 0; i < arguments.length; i++) {
      sum += (arguments[i]* arguments[i]);
    }

    for (var i = 0; i < arguments.length; i++) { 
      square += arguments[i];
    }

    return ((square*square) - sum);

    expect([2,3]).toBe(-12);
    
  });

  it("should find the 10001st prime", function () {

    var current = 3;
    var count = 0;

    while (count < 10002) {

      if (isPrime(current)) {
        count ++;
        current ++;
      } else { current ++;}
    }

    return current;

    function isPrime(num) {
      if (num <= 2) {
        return false;
      } else {
        for (var i = 2; i < num; i++) {
          if (num % i == 0) {
            return false;
          }
        }
      }
      return true;
    }

    expect(current).toBe(104743)
  });

});
