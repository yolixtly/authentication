var mongoose = require('mongoose');
var User = require('./models/user');
var bcrypt = require('bcrypt');

function runBcryptAndSave(username, password, res) {
    bcrypt.genSalt(10, function(err, salt) {
        console.log('new Salt: ', salt);
        if (err) {
            if (res !== null) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                if (res !== null) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
            }

            console.log('the hash: ', hash);
            // new Instance of User from the user-schema
            var user = new User({
                username: username,
                password: hash
            });
            
            user.save(function(err) {
                console.log('user saved')
                if (err) {
                    if (res !== null) {
                        return res.status(500).json({
                        message: 'Internal server error'
                        });
                    }
                }
             //should have header (location)  "setting up location response HTTP header Express framework"
            // everytime we create a new user, we send a location header that contains a unique URL
                if (res !== null) {
                    res.location('/users/' + user._id);
                    return res.status(201).json({});
                }
            });
        });
    });
}

exports.runBcryptAndSave = runBcryptAndSave;