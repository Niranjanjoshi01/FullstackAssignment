const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

let posts = require('./users.json')

app.get('/getUsers',(req,res)=>{
    let filtered  = posts.users
    const queryKeys = Object.keys(req.query)

    const param = req.query.status

    const Allowed_Status = ["Active","InActive"]

    if(param){
        for(const key of queryKeys){
            if(!(key == "status")){
                return res.status(400).json({
                    error : "invalid query Key",
                    invalidKey : key
                })
            }
        }

        if(param && ! Allowed_Status.includes(param)){
            return res.status(400).json({
                    error : "Invalid Status Value",
                    allowed : Allowed_Status
                })
        }

        switch (param){
            case "Active" :
                filtered = posts.users.filter((value)=> value.status == "active")
                break;

            case "InActive" :
                filtered = posts.users.filter((value)=> value.status == "inactive")
                break;
        }
    }

    res.json(filtered)
})

app.post('/getUsers/user/tagSummary',(req,res)=>{
    const users = req.body.users

    const startTime = Date.now()

    const tagCount = {}

    let processedCount = 0

    users.forEach(user => {
        processedCount++;
        const uniqueTagsPerUser = new Set()

        user.tags.forEach((tag)=>{
            const normalized = tag.trim().toLowerCase()
            if(!uniqueTagsPerUser.has(normalized)){
                uniqueTagsPerUser.add(normalized)
                tagCount[normalized] = (tagCount[normalized] || 0) +1;
            }
        })
    });

    const summary = Object.entries(tagCount).map((value)=>({
        "tag":value[0],
        "count":value[1]
    })).sort((a,b)=>b.count - a.count)

    const duration = Math.round(Date.now()-startTime)

    const response = {
        summary,
        processedCount,
        duration
    }

    res.json(response)
})

app.listen(PORT , ()=>{
    console.log(`Server running at ${PORT}`)
})