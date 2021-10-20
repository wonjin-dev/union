const characterModel = require('../models/character');
const unionModel = require('../models/union');
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
const deleteCharacter = (model, _id) => {
    model.deleteOne(_id, (err)=>{
        if(err){
            console.log('삭제 실패');
        }
    });
}
// routes
router.get("/", async(req, res) => {
    const unionList = await findCharacters();
    const findUnionSum = await unionModel.find().sort({updated: -1}).limit(1);
    const unionLv = findUnionSum[0].lv;
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
    const findList = await characterModel.find().sort({'lv':-1}).limit(40);
    console.log(findList)
    const unionSumLv = await sumList(findList);
    const sumLv = await new unionModel({
        lv: unionSumLv
    });
    await sumLv.save();
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
        deleteCharacter(characterModel, findCharacter[0]._id);
        return res.redirect('/');
});

module.exports = router;