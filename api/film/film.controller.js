const {
    createFilm,
    updateFilm,
    deleteFilm,
    getFilmBySearchParameters
} = require('./film.service')

module.exports = {
    createFilm : (req, res) => {
        const body = req.body;
        createFilm(body, (err, results) =>{
            if (err) {
                console.log(err);
                return res.status(500),json({
                    success : 0,
                    message : 'Database Connection Error!'
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        });
    },
    updateFilm : (req, res) => {
        const body = req.body;
        updateActor(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500),json({
                    success : 0,
                    message : 'Database Connection Error!'
                });
            }
            if (!results) {
                return res.json({
                    success : 0,
                    message : 'Update Not Successful'
                })
            }
            return res.status(200).json({
                success : 1,
                message :  'Updated Successfully',
                data : results
            })
        });
    },
    deleteFilm : (req, res) => {
        const body = req.body;
        deleteActor(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500),json({
                    success : 0,
                    message : 'Database Connection Error!'
                });
            }
            if (!results) {
                return res.json({
                    success : 0,
                    message : 'Film Not Found!'
                });
            }
            return res.status(200).json({
                success : 1,
                message : 'Film Deleted Successfully',
                data : results
            })
        });
    },
    getFilmBySearchParameters : (req, res) => {
        const searchObject = {
            "title" : req.query.title,
            "actor" : req.query.actor,
            "genre" : req.query.genre
        }
        getFilmBySearchParameters(searchObject, (err, results) => {
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
                    message: 'No Record Found!'
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        });
    }
}