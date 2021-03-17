// Immutability
const numbers = [1, 2 , 3]

// Adding
const added = [4, ...numbers]

//adding at index
const index = numbers.indexOf(2)
const added1 = [
    ...numbers.slice(0, index),
    4,
    ...numbers.slice(index)
]
console.log(added1)

//Removing
const removed = numbers.filter(n => n!==2)
console.log(removed)

//updating 
const updated = numbers.map( n => n === 2 ? 20 : n)
console.log(updated)