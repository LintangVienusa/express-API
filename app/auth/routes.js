const routes = require('express').Router();
const authController = require('./controller');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({usernameField: 'email'}, authController.localStrategy))
routes.post('/register', authController.register) 
routes.post('/login', authController.login)
routes.post('/logout', authController.logout)
routes.get('/whoami', authController.whoami)

module.exports = routes;