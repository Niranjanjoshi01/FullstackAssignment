import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.json());

type User = {
    id: number;
    name: string;
    email: string;
    status: "active" | "inactive";
    joinedAt: string;
    tags: string[];
};

type UsersFile = {
    users: User[];
};

type UserTagSummary ={
    
        id:number;
        name:string;
        tags:string[];
};

export type TagSummary = {
    users:UserTagSummary[]
}

import postsData from "./users.json";

const posts = postsData as UsersFile;
// const posts = null

// console.log(posts)



app.get("/getUsers", (req: Request, res: Response) => {

    try {
        let filtered: User[] = posts.users;
        // let filtered = null

        const queryKeys = Object.keys(req.query);

        //   console.log(queryKeys)

        // console.log("STATUS ",req.query.status)
        const param = req.query.status as string;

        const Allowed_Status = ["Active", "InActive"];

        //   console.log("QueryKeys :" ,queryKeys)
        // console.log(param)
        if (queryKeys.length > 0) {

            if (queryKeys.length > 1) {
                return res.status(400).json({
                    error: "invalid query Key ",
                    invalidKey: queryKeys,
                });
            }

            console.log(queryKeys[0])

            if (!Allowed_Status.includes(param)) {
                return res.status(400).json({
                    error: `Invalid query param value , Allowed values : ${Allowed_Status}`,
                });
            }



            switch (param) {
                case "Active":
                    filtered = posts.users.filter(
                        (value) => value.status === "active"
                    );
                    break;

                case "InActive":
                    filtered = posts.users.filter(
                        (value) => value.status === "inactive"
                    );
                    break;
            }
        }
        res.json(filtered);
    }
    catch(errors){
        console.log(errors)
    }
  
  
});


app.post(
    "/getUsers/user/tagSummary",
    (req: Request, res: Response) => {

        const users: UserTagSummary[] = req.body.users;

        // if(typeof(users) != Array){

        // }

        console.log(typeof(users))

        const startTime = Date.now();

        const tagCount: Record<string, number> = {};

        let processedCount = 0;

        users.forEach((user) => {
            processedCount++;
            const uniqueTagsPerUser = new Set<string>();

            user.tags.forEach((tag: string) => {
                const normalized = tag.trim().toLowerCase();

                if (!uniqueTagsPerUser.has(normalized)) {
                    uniqueTagsPerUser.add(normalized);
                    tagCount[normalized] = (tagCount[normalized] || 0) + 1;
                }
            });
        });

        
    const summary = Object.entries(tagCount).map((value)=>({
        "tag":value[0],
        "count":value[1]
    })).sort((a,b)=>b.count - a.count)

        const duration = Math.round(Date.now() - startTime);

        const response = {
            summary,
            processedCount,
            duration,
        };

        res.status(400).json({error : 'anjsc'});
    }
);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});