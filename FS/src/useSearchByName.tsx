import { useMemo } from "react";
import type { Users } from "./useFetch";

export default function useSearchByName(name:string, users:Array<Users>){
    const searchedUsers = useMemo(()=>{
        if(!name.trim()){
            return users
        }
        const value = name.toLowerCase()
        return users.filter((user)=> user.name.toLowerCase().includes(value))
    },[users,name]) 

    return searchedUsers
}