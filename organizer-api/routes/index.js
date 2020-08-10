const { Router } = require('express');
const activities = require('./activities');

const router = Router();

router.use('/activities', activities);

module.exports = router;
