const Users = require("../models/Users");
const Videogames = require("../models/Videogames");
const createToken = require("../helpers/jwt");

const userController = {};

userController.listUsers = (req, res) => {
  Users.find({})
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).send({ message: "There are not users yet" });
      }

      res.status(200).json(users).end();
    })
    .catch((err) => next(err));
};

userController.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const userDeleted = await Users.findById(id);
    console.log(userDeleted);
    if (userDeleted.videogames.length > 0) {
      userDeleted.videogames.forEach(async (el) => {
        const borrado = await Videogames.findById(el.toString());
      });
    }

    await Users.findByIdAndDelete(id);

    res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    next(err);
  }
};

userController.createUsers = (req, res, next) => {
  const { name, email, password } = req.body;

  Users.findOne({ email })
    .then((user) => {
      if (user) {
        console.log("This user exist yet");
        res.status(400);
        const err = new Error("This email exists yet");
        err.name = "UserExistYet";
        return next(err);
      }

      const newUser = new Users({
        name,
        password,
        email,
      });

      newUser.encryptPassword(password).then((hashPassword) => {
        console.log(hashPassword);
        newUser.password = hashPassword;
        newUser
          .save()
          .then((userSaved) => {
            const { id, email } = userSaved;
            const token = createToken(id, email);
            res
              .status(201)
              .json({
                token,
                id,
                email,
              })
              .end();
          }) //Hay que devolver id y token
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
};

userController.login = (req, res, next) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        const err = new Error("Email does not exist");
        res.status(404);
        next(err);
      } else {
        user
          .matchPassword(password)
          .then((match) => {
            // console.log(match)
            if (match) {
              const { id, email } = user;
              const token = createToken(id, email);
              return res.status(200).json({
                token,
                id,
                email, //Hay que devolver id y token
              });
            } else {
              const err = new Error("Password incorrect");
              res.status(401);
              next(err);
            }
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

module.exports = userController;
