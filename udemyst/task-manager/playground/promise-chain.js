require('../src/db/mongoose')
const User = require('../src/models/user')

//

// User.findByIdAndUpdate('60d39ffdc31f9f1301d2a9a4', {age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((reuslt) => {
//     console.log(reuslt)
// }).catch((e) =>{
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age})
    return count
}
updateAgeAndCount ('60d39ffdc31f9f1301d2a9a4', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})