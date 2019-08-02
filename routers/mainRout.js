const express = require('express');
const router = express.Router();
const mainCont = require('../controllers/maintCont');


router.get('/', mainCont.getMain);

module.exports = router;