import { useMemo } from "react";
import type { Users } from "./useFetch";

export default function useSort(filterUsers:Users[],sortConfig:{id:string,order:string}){
    const sortUsers = useMemo(()=>{
        if(!sortConfig.id){return filterUsers}

        let  sorted  = [...filterUsers]

        switch(sortConfig.id){
            case "name":
                sorted.sort((a,b)=>{
                    const nameA = a.name?.trim()?? ""
                    const nameB = b.name?.trim()?? ""
                    return sortConfig.order === "asc" 
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA)
            
                })
                break;

            case "date":
                sorted.sort((a,b)=>{
                    let dateA = new Date(a.joinedAt).getTime()
                    let dateB = new Date(b.joinedAt).getTime()
                    return sortConfig.order == "asc" ? dateA - dateB : dateB -dateA
                 })

                break;
            case "":
                sorted = [...filterUsers]
        }

        return sorted
    },[filterUsers,sortConfig])

    return sortUsers
}