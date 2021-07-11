const express = require ('express')
const Task = require('../models/task')
const trouter = new express.Router()
trouter.post('/tasks', async (req, res) => {
    const todo =new Task(req.body)
    try {
        await todo.save()
        res.status(201).send(todo)
    } catch (e) {
        res.status(400).send(e)
    }


})

trouter.get('/tasks', async (req, res) => {
    try {
        const todos = await Task.find({})
        res.send(todos)


    } catch (e) { 
        res.status(500).send()

    }
   
})
trouter.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id
    try {
        const todo = await Task.findById(_id)
        if (!todo) {
                     return res.status(404).send()}
        res.send(todo)

    } catch(e) {
        res.status(500).send()


    }
  
})
trouter.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if (!user) {
            return res.status(404).send()
            
        }
        res.send(user)

    }  catch(e) {
        res.status(400).send(e)
    }

})
trouter.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['compl', 'desc', 'task']
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try{
        const todo = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if (!todo) {
            return res.status(404).send()
            
        }
        res.send(todo)

    }  catch(e) {
        res.status(400).send(e)
    }

})
trouter.delete('/tasks/:id', async (req, res) =>{
    try {
        const todo = await Task.findByIdAndDelete(req.params.id)
        if (!todo) {
            return res.status(404).send()

        }
        res.send(todo)

    } catch(e){

        res.status(500).send()
    }
})

module.exports = trouter