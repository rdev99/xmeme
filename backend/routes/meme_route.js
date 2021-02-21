const express = require('express');
const router = express.Router();

const Meme_model = require('../models/Meme_model');

// Route to get all memes

router.get('/memes',(req,res) => {
    try {
        Meme_model.find({},async(err,data) => {
            let sorted_data = data.sort((a,b) => b.date-a.date)
            sorted_data=sorted_data.slice(0,100);
            res.send(sorted_data);
        })
    }
    catch(err) {
        console.log('Error : ' + err);
        res.sendStatus(500);
    }
})

// Route to post one meme

router.post('/memes',(req,res) => {
    try {
        Meme_model.find({caption : req.body.caption ,url : req.body.url},async(err,data) => {
            if(data.length!=0)
            {
                res.sendStatus(409);
            }
            else
            {
                if(req.body.name===undefined || req.body.url===undefined || req.body.caption ===undefined)
                {
                    res.sendStatus(400);
                }
                else
                {
                    Meme_model.find({},async(err1,data1) => {
                        let n=data1.length;
                        if(data1.length==0)
                        {
                            const newMeme = new Meme_model({
                                id : 1,
                                name : req.body.name,
                                url : req.body.url,
                                caption : req.body.caption
                            })
                            var response = {
                                id : 1
                            }
                            newMeme.save().then(res.status(201).send(response))
                        }
                        else
                        {
                            const newMeme = new Meme_model({
                                id : data1[n-1].id+1,
                                name : req.body.name,
                                url : req.body.url,
                                caption : req.body.caption
                            })
                            var response = {
                                id : data1[n-1].id+1
                            }
                            newMeme.save().then(res.status(201).send(response))
                        }
                    })
                    
                }
            }
        })
    }
    catch(err) {
        console.log('Error : ' + err);
        res.sendStatus(500);
    }
})

// Route to get a meme with particular id

router.get('/memes/:id',(req,res) => {
    try {
        Meme_model.find({id : req.params.id},async(err,data) => {
            if(data.length==0)
            {
                res.sendStatus(404);
            }
            else
            {
                res.send(data);
            }
        })
    }
    catch(err) {
        console.log('Error : '+ err)
        res.send(500);
    }
})

// Route to edit a meme using patch request

router.patch('/memes/:id',(req,res) => {
    try {
        Meme_model.findOne({id : req.params.id},(err,data) => {
            if(!data)
            {
                res.sendStatus(404);
            }
            else {
                if(req.body.name !== undefined)
                {
                    data.name = req.body.name;
                }
                if(req.body.url !==undefined)
                {
                    data.url = req.body.url;
                }
                if(req.body.caption !==undefined)
                {
                    data.caption = req.body.caption;
                }
                data.save((err) => {
                    if(err)
                    {
                        console.log('Error : '+err);
                        res.sendStatus(500);
                    }
                    else
                    {
                        res.sendStatus(200);
                    }
                })
            }
        })
    }
    catch(err) {
        console.log('Error : '+ err)
        res.send(500);
    }
})

// Route to add a like to the meme with a particular id

router.post("/memelike/:id",(req,res) => {
    Meme_model.findOne({id : req.params.id},(err,data) => {
        if(!data)
            {
                res.sendStatus(404);
            }
            else {
                data.likes=data.likes+1;
                let response = {
                    "likes" : data.likes
                }
                data.save((err) => {
                    if(err)
                    {
                        console.log('Error : '+err);
                        res.sendStatus(500);
                    }
                    else
                    {
                        res.status(200).send(response);
                    }
                })
            }
    })
})

// Route to add a dislike to the meme with a particular id

router.post("/memedislike/:id",(req,res) => {
    Meme_model.findOne({id : req.params.id},(err,data) => {
        if(!data)
            {
                res.sendStatus(404);
            }
            else {
                data.likes=data.likes-1;
                let response = {
                    "likes" : data.likes
                }
                data.save((err) => {
                    if(err)
                    {
                        console.log('Error : '+err);
                        res.sendStatus(500);
                    }
                    else
                    {
                        res.status(200).send(response);
                    }
                })
            }
    })
})


module.exports = router;