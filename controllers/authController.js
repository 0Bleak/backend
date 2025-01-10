const { Admin } = require('../models/Admin');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.validateToken = (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
};


exports.createAdmin = async (req, res) => {
  try {
    const { email, password, admintoken } = req.body;

    if (admintoken !== process.env.ADMINTOKEN) {
      return res.status(401).json({ message: 'Invalid admintoken' });
    }


    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
      email,
      password
    });

    await admin.save();
    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
