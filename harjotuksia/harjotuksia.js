const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
}

const object12 = {
    name: 'Full Stack -websovelluskehitys',
    level: 'aineopinto',
    size: 5,
}

const object3 = {
    name: {
        first: 'Juha',
        last: 'Tauriainen',
    },
    grades: [2, 3, 5, 3],
    department: 'TKTL',
}

console.log(object1.name)
const fieldName = 'age'
console.log(object1[fieldName])

object1.address = 'Tapiola'
object1['secret number'] = 12341

console.log(object1.address)
console.log(object1['secret number'])

//----------------------Funktio-------------------------

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const square = p => p * p

const result = sum(1, 5)
console.log(result)

console.log(square(4))

const t = [1, 2, 3]
const tSquared = t.map(p => p * p)

console.log(tSquared)