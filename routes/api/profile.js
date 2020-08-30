const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profiles');
const User = require('../../models/User');
const Profiles = require('../../models/Profiles');

//@route   GET api/profile/me
//@desc    Get current user's profile
//@access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profiles.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
