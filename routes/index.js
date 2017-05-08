var express = require('express');
var router = express.Router();

var Article = require('../models/article');
var articlesRouter = require('./articles')



/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

router.use('/articles', articlesRouter)



module.exports = router;
