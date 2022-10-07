const { 
    createActor, 
    getAllActors, 
    getActorsbyFirstNameorLastName, 
    updateActor, 
    deleteActor 
} = require('./actor.service')

module.exports = {
    createActor : (req, res) => {
        const body = req.body;
        createActor(body, (err, results) =>{
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
    getAllActor : (req, res) => {
        getAllActors((err, results) => {
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
    updateActor : (req, res) => {
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
    deleteActor : (req, res) => {
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
                    message : 'Actor Not Found!'
                });
            }
            return res.status(200).json({
                success : 1,
                message : 'Actor Deleted Successfully',
                data : results
            })
        });
    },
    getActorsbyFirstNameorLastName : (req, res) => {
        const searchObject = {
            "first_name": req.query.first_name,
            "last_name": req.query.last_name
        }
        getActorsbyFirstNameorLastName(searchObject, (err, results) => {
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