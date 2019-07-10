const passport = require('passport');
const passportJwt = require('passport-jwt');
const users = require('../controllers/users')

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'SomeVeryRandomThatNobodyCanGuessForIssueTrackingApp',
    issuer: 'issueTrackingApp',
    audience: 'issueTrackingApp'
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
    console.log('payload')
    console.log(payload)

    const user = users.getUserById(parseInt(payload.sub));
    if (user) {
        return done(null, user, payload);
    }
    return done();
}));