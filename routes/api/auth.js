const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route   GET api/auth
//@desc    Test route
//@access  Public
router.get('/', auth, async (req, res) => {
  try {
    //.select('-password') makes sure the password is not returned
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
