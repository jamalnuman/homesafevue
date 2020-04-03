function areThereDuplicates(array) {
  let hash = {};
  array.forEach(function(element) {
    hash[element] ? hash[element] += 1 : hash[element] = 1
  });
  
  for (let key in hash) {
    if (hash[key] > 1) {
        return true
    } 
  }  
  return false 
}

areThereDuplicates([9, 'a', 1, 2,  3])


function areThereDuplicates(...args) {
  let hash = {};
  args.forEach(function(element) {
    hash[element] ? hash[element] += 1 : hash[element] = 1
  });
  
  for (let key in hash) {
    if (hash[key] > 1) {
        return true
    } 
  }  
  return false 
}

areThereDuplicates(9, 'a', 1, 2,  3)


function areThereDuplicates(...args) {
  // Two pointers
  args.sort((a,b) => a > b);
  let start = 0;
  let next = 1;
  while(next < args.length){
    if(args[start] === args[next]){
        return true
    }
    start++
    next++
  }
  return false
}

areThereDuplicates(9, 'a', 1, 2,  3)


function areThereDuplicates() {
  return new Set(arguments).size !== arguments.length;
} //Set will take a argument and create an array with only unique values. so if Set is longer than arguments, then arguments had doubles of a value 



def are_there_duplicates(*args)
  hash = {}
  args.each do |element|
    hash[element] ? hash[element] += 1 : hash[element] = 1
  end
 
  hash.each do |key, value|
    if value > 1
      return true
    end
  end
    return false
end

are_there_duplicates('g', 'i' ,'a', 'b', 'a', 'c')



def are_there_duplicates(*args)
  first = 0
  second = 1
  array = args.sort
  while second < array.length
    if array[first] == array[second]
      return true
    else
      first += 1
      second += 1
    end
    return false
  end
end

are_there_duplicates('g', 'i' , 'b', 'a', 'c')