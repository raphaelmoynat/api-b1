const { Router } = require('express');
const router = Router();
const {index, create, update, remove, show} = require('../controllers/car');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/', index);
router.post('/create', authMiddleware, create);
router.get('/show/:id', show);
router.put('/update/:id', authMiddleware, update)
router.delete('/delete/:id', authMiddleware, remove);


module.exports = router;