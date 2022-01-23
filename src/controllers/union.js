const express = require('express');
const router = express.Router();
const characterModel = require('../models/character');
const unionModel = require('../models/union');

const findCharacters = async() => {
    try {
        let characterArray = [];
        const findList = await characterModel.find().sort({lv: -1});
        for(i in findList){
            characterArray.push({
                name: findList[i].name,
                role: findList[i].role,
                lv: findList[i].lv,
                date: findList[i].updated
            });
        }
        return characterArray;
    } catch {
        console.log('캐릭터 배열을 만드는 데 실패하였습니다');
    }
}

const calculateUnionLv = async(findList) => {
    try{
        let unionSum = 0;
        if(findList.length > 40){
            for(i=0; i < 40; i++){
                unionSum += findList[i].lv
            }
            return unionSum;
        }
        for(i in findList){
            unionSum += findList[i].lv
        }
        return unionSum;
    } catch {
        console.log('유니온 계산에 실패하였습니다');
    }
}

const saveCharacter = async(name, role, lv) => {
    try{
        const character = await new characterModel({
            name: name,
            role: role,
            lv: lv
        });
        await character.save();
    } catch {
        console.log('캐릭터 저장 실패');
    }
}

const deleteCharacter = (model, _id) => {
    model.deleteOne(_id, (err)=>{
        if(err){
            console.log('캐릭터 삭제 실패');
        }
    });
}

const resaveSumLv = async(lv) => {
    try{
        const recentSum = await new unionModel({
            lv:lv
        });
        await recentSum.save();
    } catch {
        console.log('유니온 레벨 최종 저장 함수 실패');
    }
}

const createGraphArray = async() => {
    try{
        let recentArray = [];
        let searchRecent = await unionModel.find().sort({updated: -1}).limit(5);
        if(searchRecent.length < 5){
            recentArray = [0,0,0,0,0];
        } else {
            recentArray = [searchRecent[4].lv, searchRecent[3].lv, searchRecent[2].lv, searchRecent[1].lv, searchRecent[0].lv];
        }
        return recentArray;
    } catch {
        console.log('그래프 배열 생성 실패');
    }
}

router.get("/", async(res) => {
    try{
        const unionList = await findCharacters();
        const LastUnion = await unionModel.find().sort({ updated: -1 }).limit(1);
        const graphArray = await createGraphArray();
        if(LastUnion.length === 0){
            unionLv = 0;
        } else {
            unionLv = 0 + LastUnion[0].lv;
        }
        return res.render('index.html', {graphArray, unionLv, unionList});
    } catch {
        console.log('\'/\' 라우팅 실패');
    }
});

router.get('/addUnion', (res) => {
    return res.render('addUnion.html');
});

router.get('/updateUnion', async(req, res) => {
    try{
        const unionList = await findCharacters();
        return res.render('updateUnion.html', { unionList });
    } catch {
        console.log('\'/updateUnion\' 라우팅 실패');
    }
});

router.post('/addUnion', async(req, res) => {
    const {name, role, lv} = req.body;
    try{
        await saveCharacter(name, role, lv);
        const findList = await characterModel.find().sort({lv: -1}).limit(40);
        const unionSumLv = await calculateUnionLv(findList);
        await resaveSumLv(unionSumLv);
        res.redirect('/');
    } catch {
        console.log('캐릭터 저장 실패');
    }
});

router.post('/updateUnion', async(req, res) => {
    const {name, updatedLv} = req.body;
    try{
        const findCharacter = await characterModel.find({name: name});
        await characterModel.findByIdAndUpdate(findCharacter[0]._id, {$set: {lv: updatedLv}});
        const refindList = await characterModel.find().sort({lv: -1}).limit(40);
        const updatedSumLv = await calculateUnionLv(refindList);
        await resaveSumLv(updatedSumLv);
        return res.redirect('/updateUnion');
    } catch {
        console.log('캐릭터 업데이트 실패');
    }
});

router.post('/deleteUnion', async(req, res) => {
    const {name} = req.body;
    try{
        const findCharacter = await characterModel.find({ name: name });
        deleteCharacter(characterModel, findCharacter[0]._id);
        const refindList = await characterModel.find().sort({lv: -1}).limit(40);
        const updatedSumLv = await calculateUnionLv(refindList);
        await resaveSumLv(updatedSumLv);
        return res.redirect('/');
    } catch {
        console.log('캐릭터 삭제 실패');
    }
});

module.exports = router;