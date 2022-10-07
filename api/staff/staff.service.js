const pool = require('../../config/database');

module.exports = {
    getStaffByUsername : (username, callBack) => {
        pool.query(
            `SELECT * FROM staff WHERE username = ?`,
            [username],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res[0])
            }
        )
    }
}