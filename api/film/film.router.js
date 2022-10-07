const {
    createFilm,
    getFilmBySearchParameters
} = require('./film.controller');
const router = require('express').Router();

router.post("/", createFilm);
router.get("/", getFilmBySearchParameters);

module.exports = router;