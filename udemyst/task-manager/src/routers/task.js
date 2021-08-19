const express = require ('express')
const Task = require('../models/task')
const auth = require ('../middleware/auth')
const trouter = new express.Router()

trouter.post('/tasks', auth, async (req, res) => {
    
    const todo = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await todo.save()
        res.status(201).send(todo)
    } catch (e) {
        res.status(400).send(e)
    }


})

trouter.get('/tasks', auth, async (req, res) => {
    try {
        const todos = await Task.find({
    
        owner: req.user._id

        })
        res.send(todos)


    } catch (e) { 
        res.status(500).send()

    }
   
})
trouter.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id
    try {
       
       const todo = await Task.findOne({_id,owner: req.user._id})
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
trouter.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['compl', 'desc', 'task']
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try{
        const todo = await Task.findOne({_id: req.params.id, owner: req.user.id})
       

        if (!todo) {
            return res.status(404).send()
            
        }
        updates.forEach((update)=> todo[update] = req.body[update])
        await todo.save()
        res.send(todo)

    }  catch(e) {
        res.status(400).send(e)
    }

})
trouter.delete('/tasks/:id', auth,  async (req, res) =>{
    try {
        const todo = await Task.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        if (!todo) {
            return res.status(404).send()

        }
        res.send(todo)

    } catch(e){

        res.status(500).send()
    }
})

module.exports = trouter