const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Event = require("./event");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Pasword cannot contain "password" ');
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  /* age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be positve number')
                
            }

        }

    }, */
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

userSchema.virtual("myevent", {
  ref: "Event",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.token;
  return userObject;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "abdrakadabra");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Event.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// -----------------------------------------------------------------------------
// Old Code
// -----------------------------------------------------------------------------
// const mongoose = require("mongoose");
// const validator = require("validator");
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error('Pasword cannot contain "password" ');
//       }
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   //for the beginning without age
//   // age: {
//   //     type: Number,
//   //     default: 0,
//   //     validate(value){
//   //         if (value < 0) {
//   //             throw new Error('Age must be positve number')

//   //         }

//   //     }

//   // }
// });
// userSchema.pre("save", async function (next) {
//   const user = this;
//   console.log("just before saving");
//   next();
// });
// const User = mongoose.model("User", userSchema);

// module.exports = User;
