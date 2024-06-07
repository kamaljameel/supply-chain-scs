const Contact = require('../models/contact');
const contactController = {
  contactForm: async (req, res) => {
    try {
      const { name, email, address, notes } = req.body;
      await Contact.create({
        name,
        email,
        address,
        notes,
      });
      res.status(200).json("Contact Form Data Submitted");
      console.log(req.body);
    } catch (error) {
      res.status(400).send("Sorry, it’s not registered");
      console.error(error);
    }
  },
};
module.exports = contactController;
