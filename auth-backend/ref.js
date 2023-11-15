// Import the required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load the environment variables
dotenv.config();

// Create the express app
const app = express();

// Use JSON middleware
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(err));

// Define the schemas and models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
});

const organizationSchema = new mongoose.Schema({
  name: String,
  description: String
});

const roleSchema = new mongoose.Schema({
  name: String,
  privileges: [String]
});

const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Role = mongoose.model('Role', roleSchema);

// Define the endpoints
// Create a user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Get a user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    if (!user) {
      res.status(404).json({message: 'User not found'});
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Update a user by id
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('role');
    if (!user) {
      res.status(404).json({message: 'User not found'});
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Delete a user by id
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({message: 'User not found'});
    } else {
      res.status(200).json({message: 'User deleted'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Create an organization
app.post('/organizations', async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json(organization);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Get all organizations


// Create a role
app.post('/roles', async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Get all roles
app.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Get a role by id
app.get('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      res.status(404).json({message: 'Role not found'});
    } else {
      res.status(200).json(role);
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Update a role by id
app.put('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!role) {
      res.status(404).json({message: 'Role not found'});
    } else {
      res.status(200).json(role);
    }
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Delete a role by id
app.delete('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      res.status(404).json({message: 'Role not found'});
    } else {
      res.status(200).json({message: 'Role deleted'});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});