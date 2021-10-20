const characterModel = require('../models/character');
const express = require('express');
const router = express.Router();
const findCharacters = async() => {
    let filteredArray = [];
    const findList = await characterModel.find().sort({'lv':-1});
    for(i in findList){
        filteredArray.push(
            {
                name: findList[i].name,
                role: findList[i].role,
                lv: findList[i].lv,
                date: findList[i].updated
            }
        );
    }
    return filteredArray;
}
const sumList = async(findList) => {
    let unionSum = 0;
    if(findList.length > 40){
        for(i=0; i < 40; i++){
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
    const unionList = await findCharacters();
    const unionLv = await sumList(unionList);
    return res.render('index.html', {unionLv, unionList});
});
router.get('/addUnion', (req, res) => {
    return res.render('addUnion.html');
});
router.get('/updateUnion', async(req, res) => {
    const unionList = await findCharacters();
    return res.render('updateUnion.html', {unionList});
});
// route + function
router.post('/addUnion', async(req, res) => {
    const {name, role, lv} = req.body;
    const character = await new characterModel({
        name: name,
        role: role,
        lv: lv
    });
    await character.save();
    res.redirect('/');
});
router.post('/updateUnion', async(req, res) => {
    const {name, updatedLv} = req.body;
    const findCharacter = await characterModel.find({name: name});
    await characterModel.findByIdAndUpdate(findCharacter[0]._id, {$set: {lv: updatedLv}});
    return res.redirect('/updateUnion');
});
router.post('/deleteUnion', async(req, res) => {
    const {name} = req.body;
    const findCharacter = await characterModel.find({name: name});
    await characterModel.findByIdAndDelete(findCharacter[0]._id, (err) => {
        if(err){
            console.error(err);
        } else {
            console.log('캐릭터 정보 삭제 완료');
        }
    })
    return res.redirect('/updateUnion');
});

module.exports = router;