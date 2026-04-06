

export default function tagSummaryValidator(postData : any){
    try {
      console.log(postData)
      const parsedObj = JSON.parse(postData)
      console.log(! Array.isArray(parsedObj.users))

      if(! Array.isArray(parsedObj.users)){
        // alert("users must be an array")
        return {error : true , message : "users must be an array"}
      }

      for(let i = 0;i< parsedObj.users.length ; i++){
        if(! parsedObj.users[i].name || ! parsedObj.users[i].id || ! Array.isArray(parsedObj.users[i].tags)){
            console.log(parsedObj.users[i].name ,"    ", parsedObj.users[i].id ,"    ", Array.isArray(! parsedObj.users[i].tags))
            return {error : true , message : "Wrong JSON fields"}
        }
      }
    //   console.log(2)
      return{error : false , message : "success", parsedObj}

    }
    catch (error) {
    //   alert("invalid JSON format")
      return {error : true , message : "Invalid JSON format"}
    }
}