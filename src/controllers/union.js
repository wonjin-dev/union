const characterModel = require('../models/character');
const express = require('express');
const router = express.Router();

const findCharacters = async() => {
    const findList = await characterModel.find({});
    return findList;
}

const sumList = async() => {
    let findList = await findCharacters();
    if(!findList){
        return '캐릭터가 존재하지 않습니다.'
    }
    let unionList =[];
    for(i in findList){
        unionList.push(findList[i].lv)
    }
    const sum = (pre, now) => pre + now;
    let sumArray = unionList.reduce(sum);
    return sumArray
}

router.get("/", async(req, res) => {
    let unionList = await findCharacters();
    let unionLv = await sumList();
    return res.render('index.html', {unionList, unionLv});
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

    await character.save(async(err) => {
        if(err){
            return console.log(err);
        } else {
            let unionList = await findCharacters();
            let unionLv = await sumList();
            return res.render('index.html', {unionList, unionLv});
        }
    });
});

module.exports = router;