require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit').rateLimit || require('express-rate-limit');
const User = require('./models/User');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 1000 }));

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.exmple.mongodb.net/freelanceX?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "flx_super_secret_key_2026_ninja";

if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('DB Connected'))
        .catch(err => console.error('DB Error:', err.message));
}

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch {
            return res.status(401).json({ message: 'Not authorized' });
        }
    }
    if (!token) return res.status(401).json({ message: 'Not authorized' });
};

app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User exists' });
        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({
                _id: user.id, name: user.name, email: user.email, currency: user.currency, avatar: user.avatar, bio: user.bio, role: `Freelancer · ${user.currency} Node`, token: generateToken(user._id)
            });
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
        } else { res.status(401).json({ message: 'Invalid credentials' }); }
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
        }
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/health', (req, res) => res.json({ status: 'Online' }));

app.get('/api/rates', async (req, res) => {
    try {
        const base = req.query.base || 'USD';
        const fetchRes = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        const data = await fetchRes.json();
        res.json({ success: true, base: data.base_code, rates: data.rates });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = app;
