const express = require('express');
const app = express();
const router = express.Router();
const server = app.listen(process.env.PORT || 8000);




const passport = require('passport');
const Auth0Strategy = require('passport-auth0');



const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const util = require('util');
const url = require('url');
const querystring = require('querystring');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');


// Session/Login

const session = require('express-session');

// config express-session
const sess = {
  secret: 'ITS A SEEEECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  app.set('trust proxy', 1);
}




// Load environment variables from .env
const dotenv = require('dotenv');
dotenv.config();





// Configure Passport to use Auth0
const strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);


passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());



app.use(session(sess));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});




// const routes = require('./routes.js');
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const userInViews = require('./lib/middleware/userInViews');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

app.use(userInViews());
app.use('/', authRouter);
app.use('/', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;