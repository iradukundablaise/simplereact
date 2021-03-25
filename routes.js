const express = require('express');
const controller = require('./controllers/users');

const router = express.Router();

router.get('/users', controller.index);
router.get('/users/:id', controller.find);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.destroy);


module.exports = router;
