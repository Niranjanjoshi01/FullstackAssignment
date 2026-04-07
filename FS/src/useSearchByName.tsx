import { useMemo } from "react";
import type { Users } from "./useFetch";

export default function useSearchByName(name: string, users: Array<Users>, setError: any) {



    const searchedUsers = useMemo(() => {

        try {
            if ((users == null || users == undefined) && name.length > 0) {
                throw new Error("cannot search users , users is null or undeined")
            }
            if (!name.trim()) {
                return users
            }
            const value = name.toLowerCase()
            return users.filter((user) => user.name.toLowerCase().includes(value))
        }
        catch (error: any) {
            setError(error.message)
            return []
        }

    }, [users, name])

    return searchedUsers
}