require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit').rateLimit || require('express-rate-limit');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// DB connection string 
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.exmple.mongodb.net/freelanceX?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "flx_super_secret_key_2026_ninja";

// Connect to MongoDB
if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB Connected to Vercel Instance'))
        .catch(err => console.error('MongoDB Connection Error:', err.message));
}

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Auth Middleware
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// ROUTES
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Please provide all fields' });

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({
                _id: user.id, name: user.name, email: user.email, currency: user.currency, avatar: user.avatar, bio: user.bio, role: `Freelancer · ${user.currency} Node`, token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id, name: user.name, email: user.email, currency: user.currency, avatar: user.avatar, bio: user.bio, role: `Freelancer · ${user.currency} Node`, token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/users/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.currency = req.body.currency || user.currency;
            user.bio = req.body.bio || user.bio;
            if (req.body.avatar !== undefined) user.avatar = req.body.avatar;
            if (req.body.password) user.password = req.body.password;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, currency: updatedUser.currency, avatar: updatedUser.avatar, bio: updatedUser.bio, role: `Freelancer · ${updatedUser.currency} Node`, token: generateToken(updatedUser._id)
            });
        } else { res.status(404).json({ message: 'User not found' }); }
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/health', (req, res) => res.json({ status: 'Online.' }));

app.get('/api/rates', async (req, res) => {
    try {
        const base = req.query.base || 'USD';
        const fetchRes = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        if (!fetchRes.ok) throw new Error('Failed to fetch rates');
        const data = await fetchRes.json();
        res.json({ success: true, base: data.base_code, rates: data.rates });
    } catch (err) { res.status(500).json({ success: false, message: 'Rate fetch failed', error: err.message }); }
});

// For Vercel, we export the app
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}
module.exports = app;
