const { 
    createActor,
    getAllActor,
    getActorsbyFirstNameorLastName,
    updateActor,
    deleteActor
 } = require('./actor.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post("/", createActor);
router.get("/", getActorsbyFirstNameorLastName);
router.patch("/", updateActor);
router.delete("/", deleteActor);

module.exports = router;