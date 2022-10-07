const {
    getStaffByUsername
} = require('./staff.service');

const { sign } = require('jsonwebtoken');

module.exports = {
    login : (req, res) => {
        const body = req.body;
        getStaffByUsername(body.username, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500),json({
                    success : 0,
                    message : 'Database Connection Error!'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Invalid credentials!'
                })
            }
            const result = (body.password == results.password)
            if (result) {
                results.password = undefined;
                const jsonToken = sign({ result : results}, process.env.SECRET_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: 'Login Successful',
                    token: jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Invalid Credentials!'
                });
            }
        });
    }
}