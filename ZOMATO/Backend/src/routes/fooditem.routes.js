const express = require('express');
const {createfooditem,getfooditems,likeFoodItem,saveFoodItem,getSavedItemsForUser} = require('../controllers/food.controller');
const router = express.Router();
const { foodpartnerauth,userauth } = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.memoryStorage({});
const upload = multer({ storage });


router.post('/', foodpartnerauth,upload.single("video"),createfooditem);
router.get('/', userauth,getfooditems);
router.post('/like', userauth, likeFoodItem);
router.post('/save', userauth, saveFoodItem);
router.get('/saved', userauth, getSavedItemsForUser);

module.exports = router;