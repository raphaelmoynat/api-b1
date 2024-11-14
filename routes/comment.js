const { Router } = require('express');
const router = Router();
const { index, show, create, update, remove } = require('../controllers/comment');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', index);

router.get('/show/:id', show);

router.post('/create', authMiddleware, create);

router.put('/update/:id', authMiddleware, update);

router.delete('/delete/:id', authMiddleware, remove);

module.exports = router;

