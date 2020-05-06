
const router = require("express").Router();
const { createSubject } = require('../controllers/category');

router.post('/:category/subject', createSubject);

module.exports = router