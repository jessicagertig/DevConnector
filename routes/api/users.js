const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
//import User model
const User = require('../../models/User');

//@route   POST api/users
//@desc    Register user
//@access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a passowrd with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure req.body
    const { name, email, password } = req.body;

    try {
      //See if user exists
      //If user exists send back error (duplicate)
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exits' }] });
      }

      //Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm', //provides default image if none
      });
      //creates new instance of user, but we will not save user until password is hashed
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password (using Bcrypt)
      const salt = await bcrypt.genSalt(10); //10 rounds

      user.password = await bcrypt.hash(password, salt);

      //save user to the database
      await user.save();

      //Return jsonwebtoken (so after registration user can be logged in immediately)
      const payload = {
        user: {
          id: user.id, //mongoose abstracts away the _id format on mongoDB to just id
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
