
// const str = `1992-08-20 12:12:12.001
// 1992-08-20 12:12:12.003
// 1992-08-20 12:12:12.203
// 1992-08-21 12:12:12.001
// 1992-08-21 12:12:12.003`

// function strToArray(str) {
//     const _arr = str.split('.')
//     return [..._arr[0].split(':').map(e => parseInt(e)), parseInt(_arr[1])]

// }
// function calMin(str0, str1) {
//     const arr0 = strToArray(str0)
//     const arr1 = strToArray(str1)
//     let minVal = ''
//     for (let i = 0; i < arr0.length; i++) {
//         if (arr0[i] > arr1[i]) {
//             minVal = str0
//             break;
//         }
//         if (arr0[i] < arr1[i]) {
//             minVal = str1
//             break;
//         }
//     }
//     return minVal
// }
// function getPersonNum(str) {
//     const arr = str.split('\n')
//     const mapSave = {}
//     const regDate = /\d{4}-\d{2}-\d{2}/g
//     const regTime = /\d{2}:\d{2}:\d{2}\.\d{3}/g
//     arr.forEach(e => {
//         const _keyDate = (e.match(regDate))[0]
//         const _valTime = (e.match(regTime))[0]
//         mapSave[_keyDate] = mapSave[_keyDate] ? calMin(mapSave[_keyDate], _valTime) : _valTime
//     })
//     return (Object.keys(mapSave).length)
// }

// console.log(getPersonNum(str))


// function as(arr, str) {
//     const a = arr.join('')
//     return str.indexOf(a)
// }

// function solve(str) {
//     const arr = [...str]
//     const arr_res = [...str].reverse()
//     const str_res = arr_res.join('')
//     const _arr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (str_res.indexOf(a[i]) > -1) {
//             for (let l = i; l < arr.length; l++) {
//                 arr.push(a[i],a[i+1])
//             }

//         }
//     }
//     return maxLength
// }


// const str = 'abccb'
// console.log(solve(str))


function list(args, arr) {
    arr = arr || []
    arr.push(args)
    function untitled(l) {
        return list(l, arr)
    }
    untitled.toString = () => `[${arr}]`
    return untitled
}



// function abc(...a) {
//     return [...a]
// }

// function curried(fn) {
//     return function (...args) {
//         let arr = [];

//         function unname(...args) {
//             if (args.length == 0) {
//                 return unname.toString()
//             }
//             if (args.length == 1) {
//                 arr.push(...args)
//                 return unname;
//             }
//         }
//         unname.toString = () => `[${fn(...arr)}]`
//         return unname(...args)
//     }
// }

// const curry = curried(abc)




// console.log(list(1)) // [1]
console.log(list(1)(2)) // [1,2]
// console.log(list(1)(2)(3)) // [1,2,3]
// console.log(list(1)(2)(3)(4)) // [1,2,3,4]