const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

// router.post("/users", async (req, res) => {
//   const user = new User(req.body);
//   try {
//     await user.save();
//     const token = await user.generateAuthToken();

//     res.status(201).send({ user, token });
//   } catch (e) {
//     res.status(401).send(e);
//   }
// });
router.post("/users", async (req, res) => {
  console.log("reached");
  const user = new User(req.body);
  console.log("req.body", req.body);
  try {
    const user = new User(req.body);
    await user.save().then(() => {
      res.send(user);
    });

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "password", "email"];

  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOp) {
    return res.status(400).send({ error: "invalid" });
  }
  try {
    const user = await req.user;

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(501).send();
  }
});
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;

// -----------------------------------------------------------------------------
// Old Code
// -----------------------------------------------------------------------------

// const express = require('express')
// const User = require('../models/user')
// const router = new express.Router()

// router.post('/users', async (req, res) => {
//     console.log("reached");
//     const user = new User(req.body);
//     console.log("req.body",req.body);
//     try {
//         const user = new User(req.body)
//         user.save().then(()=> {res.send(user)}

//         )
//         await user.save()

//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }

// })

// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)

//     } catch (e) {
//         res.status(500).send()

//     }

// })
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     console
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//                      return res.status(404).send()}
//         res.send(user)

//     } catch(e) {
//         res.status(500).send()

//     }

// })
// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'age', 'password', 'email']
//     const _id = req.params.id
//     const isValidOp = updates.every((update)=> allowedUpdates.includes(update))
//     if (! isValidOp) {
//         return res.status(400).send({ error: 'invalid'})
//     }
//     try {
//         const user = await User.findById(_id)
//         updates.forEach((update)=> user(update) =  req.body(update))
//         if (!user) {
//                      return res.status(404).send()}
//         res.send(user)

//     } catch(e) {
//         res.status(500).send()

//     }

// })
// router.delete('/users/:id', async (req, res) =>{
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) {
//             return res.status(404).send()

//         }
//         res.send(user)

//     } catch(e){

//         res.status(500).send()
//     }
// })
// module.exports = router
