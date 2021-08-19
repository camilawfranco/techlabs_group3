const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

/* app.use((req, res, next) => {
    if (req.method === 'GET') {

        res.send('GET reqeusts are disable')
    } else {
        next()
    }

}) */
/* app.use((req, res, next) => {
    if (req.method) {

        res.send('reqeusts are disable. We are working on it ')
    } else {
        next()
    }
}) */
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    /* const task = await Task.findById('611ce41d82b52e19b24358ec')
    await task.populate('owner').execPopulate()
    console.log(task.owner) */

    const user = await User.findById('611ce2322afce715f0137c88')
    await user.populate('mytasks').execPopulate()
    console.log(user.mytasks)
 
}
main()