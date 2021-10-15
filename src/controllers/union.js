const characterModel = require('../models/character');
const express = require('express');
const router = express.Router();

const findCharacters = async() => {
    const filteredArray = [];
    const findList = await characterModel.find({});

    for(i in findList){
        role=findList[i].role
        lv=findList[i].lv
        filteredArray.push({role:role,lv:lv});
        }
    return filteredArray;
}

const sumList = async(findList) => {
    let unionSum = 0;
    for(i in findList){
        unionSum += findList[i].lv
    }
    return unionSum
}

router.get("/", async(req, res) => {
    let unionList = await findCharacters();
    let unionLv = await sumList(unionList);
    
    return res.render('index.html', {unionLv, unionList});
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
            return res.render('index.html', {unionLv, unionList});
        }
    });
});

module.exports = router;