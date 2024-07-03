// controllers/userController.js
const User = require("../models/User");

async function getUser(req, res) {
  try {
    const userId = req.params.id;
    // const user = await User.findByPk(userId);
    const allusers = await User.findAll({});
    res.status(200).json({allusers});
    
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    // res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUser,
};
