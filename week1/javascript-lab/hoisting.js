// 1.
function cube(x) {
  return x * x * x;
}

const cubeRef = function(x){
    return x * x * x
};


// 2.
function fullName(first, last) {
  return first + " " + last;
}

const fullNameRef = function(first,last){
    return first + " " + last
}


// 3.
function power(base, exp) {
  if (exp === 0) {
    return 1;
  }
  return base * power(base, exp - 1);
}

const powerRef = function(base, exp){
    if (exp === 0){
        return 1;
    }
    return base * power(base, exp-1)
}


// 4.
function sumCubes(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
}

const sumCubesRef = function(numbers){
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
}


// 1.
let values = [10, 20, 30];

for(let i = 0; i < values.length; i++){
  console.log(values[i]);
}

// 2.
let lastLogin = '1/1/1970';

console.log(welcome('Charlie', 'Munger'));

function welcome(first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
};

