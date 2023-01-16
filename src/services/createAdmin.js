const Users = require("../models/Users");

const createAdmin = async () => {
  try {
    const admin = await Users.findOne({
      role: "admin",
      email: process.env.ADMIN_EMAIL,
    });

    if (!admin) {
      const newAdmin = new Users({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: ["admin"],
      });

      newAdmin.password = await newAdmin.encryptPassword(newAdmin.password);
      const adminSaved = await newAdmin.save();

      return console.log("Admin created");
    }

    return console.log("Admin exist yet");
  } catch (error) {
    console.log(error);
  }
};

module.exports = createAdmin;
