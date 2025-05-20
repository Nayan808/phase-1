require('dotenv').config();
const express = require('express');
const path = require('path');
const { clerkMiddleware, requireAuth, getAuth } = require('@clerk/express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(clerkMiddleware());

// Public routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Protected routes
app.get('/hom', requireAuth(), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hom.html'));
});

app.get('/profile', requireAuth(), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Auth status endpoint
app.get('/api/auth-status', (req, res) => {
    const { userId } = getAuth(req);
    res.json({
        isSignedIn: !!userId,
        userId: userId
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.status === 401) {
        res.redirect('/login');
    } else {
        res.status(500).send('Something broke!');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 