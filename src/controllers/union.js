const characterModel = require('../models/character');
const express = require('express');
const router = express.Router();

const findCharacters = async() => {
    const filteredArray = [];
    const findList = await characterModel.find().sort({'lv':-1});
        for(i in findList){
            role=findList[i].role
            lv=findList[i].lv
            updated=findList[i].updated
            filteredArray.push({role:role, lv:lv, date:updated});
        }
    return filteredArray;
}
const sumList = async(findList) => {
    let unionSum = 0;
    if(findList.length>40){
        for(i=0; i<=39; i++){
            unionSum += findList[i].lv
        }
        return unionSum
    }
    for(i in findList){
        unionSum += findList[i].lv
    }
    return unionSum
}
// routes
router.get("/", async(req, res) => {
    let unionList = await findCharacters();
    let unionLv = await sumList(unionList);
    return res.render('index.html', {unionLv, unionList});
});
router.get('/addUnion', (req, res) => {
    return res.render('addUnion.html');
});
router.get('/updateUnion', async(req, res) => {
    let unionList = await findCharacters();
    return res.render('updateUnion.html', {unionList});
});
// route + function
router.post('/addUnion', async(req, res) => {
    const role = req.body.role;
    const lv = req.body.lv;
    let character = await new characterModel({
        role: role,
        lv: lv
    });
    await character.save(async() => {
        let unionList = await findCharacters();
        let unionLv = await sumList(unionList);
        res.redirect('/');
        return res.render('index.html', {unionLv, unionList});
    });
});
router.post('/updateUnion', async(req, res) => {
    const role = req.body.role;
    const lv = req.body.updatedLv;
    const findCharacter = await characterModel.find({role:role});
    const Oid = findCharacter[0]._id;
    const update = async() => {
        await characterModel.findByIdAndUpdate(Oid, {$set: {lv:lv}});
    }
    await update();
    let unionList = await findCharacters();
    return res.render('updateUnion.html', {unionList});
    });

module.exports = router;