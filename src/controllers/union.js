// TODO::
// 최초렌더시 => 현재 리스트 목업 => 유니온모델에서 유니온썸 목업
// 리스트 수정, 추가, 삭제시 캐릭터 모델 업데이트 => 유니온모델에서 유니온썸 업데이트
// 데이터 없을때 최초 렌더링 오류 해결

const characterModel = require('../models/character');
const unionModel = require('../models/union');

const express = require('express');
const router = express.Router();

const findCharacters = async() => {
    let filteredArray = [];
    const findList = await characterModel.find().sort({'lv':-1});
    for(i in findList){
        filteredArray.push({
            name: findList[i].name,
            role: findList[i].role,
            lv: findList[i].lv,
            date: findList[i].updated
        });
    }
    return filteredArray;
}

const calculateUnionLv = async(findList) => {
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

const saveCharacter = async(name, role, lv) => {
    const character = await new characterModel({
        name: name,
        role: role,
        lv: lv
    });
    await character.save();
}

const deleteCharacter = (model, _id) => {
    model.deleteOne(_id, (err)=>{
        if(err){
            console.log('삭제 실패');
        }
    });
}

const resaveSumLv = async(lv) => {
    const recentSum = await new unionModel({
        lv:lv
    });
    await recentSum.save();
}

router.get("/", async(req, res) => {
    try{
        const unionList = await findCharacters();
        const unionLv = await calculateUnionLv(unionList);
        // const checkSum = await unionModel.find().sort({updated:-1}).limit(1);
        // console.log(unionLv, checkSum, checkSum[0].lv);
            return res.render('index.html', {unionLv, unionList});
    } catch {
        console.log('err');
    } 
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
    try{
        await saveCharacter(name, role, lv)
        const findList = await characterModel.find().sort({'lv': -1}).limit(40);
        const unionSumLv = await calculateUnionLv(findList);
        const sumLv = await new unionModel({
            lv: unionSumLv
        });
        await sumLv.save();
        res.redirect('/');
    } catch {
        console.log('err');
    }
});
router.post('/updateUnion', async(req, res) => {
    const {name, updatedLv} = req.body;
    const findCharacter = await characterModel.find({name: name});
    await characterModel.findByIdAndUpdate(findCharacter[0]._id, {$set: {lv: updatedLv}});
    return res.redirect('/updateUnion');
});
router.post('/deleteUnion', async(req, res) => {
    const {name} = req.body;
    try{
        const findCharacter = await characterModel.find({name: name});
        deleteCharacter(characterModel, findCharacter[0]._id);
        return res.redirect('/');
    } catch {
        console.log('err');
    }
});

module.exports = router;