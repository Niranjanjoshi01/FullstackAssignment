export default async function usePost(url :string, result :any,setError : any){
    try{
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.parsedObj)

      })

      if (!response.ok) {
        const err = await response.json()
        setError(err.error)
        // throw new Error(err.error || "request failed")
      } else {
        if (response.ok) {
          console.log(await response.json())
        }
      }
    }
    catch (error) {
      // alert("invalid JSON format")
      return 
    }
}