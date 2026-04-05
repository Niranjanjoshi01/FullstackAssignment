import { useCallback, useEffect, useState } from "react"

export type Users ={
    id:number,
    name:string,
    email:string,
    status:string,
    joinedAt:string,

}

export default function useFetch(url:string,status:string){
    const [users,setUsers] = useState<Users[]>([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")

    const fetchUser = useCallback(async (value:string)=>{
        setLoading(true)
        try{
            const response = await fetch(value)
            
            if(!response.ok){
                const err = await response.json()
                throw new Error(err.error || "request failed")
            }

            const data = await response.json()
            setUsers(data)
            setLoading(false)
        }
        catch(errors : any){
            setError(errors)
        }
        finally{
            setLoading(false)
        }
    },[status])

    useEffect(()=>{
        fetchUser(url)
    },[status,fetchUser])

    return {users,loading,error,fetchUser}
}