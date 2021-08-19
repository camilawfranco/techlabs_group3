require('../src/db/mongoose')
const Task = require('../src/models/task')
//

// Task.findByIdAndDelete('60d3a973174cf21934a1287e').then((todo) => {
//     console.log(todo)
//     return Task.countDocuments({compl: false})
// }).then((reuslt) => {
//     console.log(reuslt)
// }).catch((e) =>{
//     console.log(e)
// })
const findAndDel = async (id) => {
    const todo = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({compl: false})
    return count
}
findAndDel ("60d3a89ffc9d9e17f1416d1a").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})