var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
opts.secretOrKey = 'todo-app-super-shared-secret';

const models = require('../models');

let Strategy = new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload)
    models.User.findOne({where: {id: jwt_payload.id}}).then((user) => {

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }).catch((err) => {
        return done('err : ' + err, false);
    });
})

module.exports = Strategy