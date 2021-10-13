const characterModel = require('../models/character');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index.html');
});

router.get('/addUnion', (req, res) => {
    res.render('addUnion.html');
});
router.post('/addUnion', async(req, res) => {
    const role = req.body.role;
    const lv = req.body.lv;
    
    let character = await new characterModel({
        role: role,
        lv: lv
    });

    await character.save((err) => {
        if(err){
            return console.log(err);
        } else {
            console.log('캐릭터 레벨 추가 완료');
            return res.render('index.html');
        }
    });
});

module.exports = router;