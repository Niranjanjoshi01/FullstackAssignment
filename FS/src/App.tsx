import { useEffect, useRef, useState } from "react"
import useFetch from "./useFetch"
import useSearchByName from "./useSearchByName"
import useSort from "./useSort"
import sort  from './assets/sort.png'
import { Alert } from "react-bootstrap"
import tagSummaryValidator from "./utils/tagSummaryValidator"
import usePost from "./usePost"

function App() {
  const baseUrl = "http://localhost:5000/getUsers"
  const url = useRef(baseUrl)
  const [status, setStatus] = useState("")
  const [isClicked, setIsClicked] = useState(false)
  const { users, loading, fetchUser, error, setError } = useFetch(url.current, status)
  const [searchInput, setSearchInput] = useState("")
  const [searchName, setSearchName] = useState("")
  const filterUsers = useSearchByName(searchInput, users)
  const [sortConfig, setSortConfig] = useState({ id: "", order: "asc" })
  const sortedUsers = useSort(filterUsers, sortConfig)
  const [postData, setPostData] = useState("")



  useEffect(() => {
    // console.log("in effec")
    if (sortedUsers === null || sortedUsers === undefined) {
      setError("Users array is null")
    }
  }, [])

  if(loading){
    return("Loading Users.....")
  }

  function handleClick(value: string) {

    if (sortConfig.id == value) {
      setSortConfig((prev) => {
        let obj = { id: value, order: prev.order == "asc" ? "dsc" : "asc" }
        return obj;
      })
    }
    else {
      setSortConfig({ id: value, order: "asc" })
    }

  }

  async function handleRefresh() {
    await fetchUser(baseUrl)
    setSearchInput("")
    setSearchName("")
    setSortConfig({ id: "", order: "asc" })
  }

  async function handlePost() {
    
      
      const result = tagSummaryValidator(postData)
      console.log("result",result)
      if(result.error){
        console.log("heyy")
        alert(result.message)
      }

      usePost(baseUrl + "/user/tagSummary",result,setError)

      

  }

  return (
    <>

      {error ? <div style={{ position: "absolute", top: 0, right: 0 }}><Alert variant="danger" >

        <Alert.Heading>{error}</Alert.Heading>
        {/* <p>Error message goes here.</p> */}
      </Alert></div> : <></>}


      <h2>Users</h2>
      <br />
      <div className="row">
        <div className="offset-1">
         
          <input type="text" placeholder="Enter user name here..." className="m-2" onChange={(event) => { setSearchName(event.target.value) }} />
          <button className="m-2" onClick={() => { setSearchInput(searchName) }}>Search By Name</button>
          <button className="m-2" onClick={handleRefresh}>Refresh</button>
           <button className="btn btn-secondary" onClick={() => { setIsClicked((prev) => !prev) }}>Filter</button>
          {isClicked ? <div style={{ position: "absolute", backgroundColor: "white" }}>
            <p>Filter by Status...</p>
            <button className="btn btn-info m-1" onClick={() => { url.current = baseUrl + "?status=Active"; setStatus("Active"); setIsClicked(false) }}>Active</button>
            <button className="btn btn-info m-1" onClick={() => { url.current = baseUrl + "?status=InActive"; setStatus("InActive"); setIsClicked(false) }}>InActive</button>
          </div> : <div></div>}
        </div>
      </div>

      
      <div className="row">
        <div className="col-md-10 offset-1">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name <button onClick={() => handleClick("name")}><img src={sort} alt="" /></button></th>
                <th scope="col">Email</th>
                <th scope="col">Status </th>
                <th scope="col">JoinedAt <button onClick={() => handleClick("date")}><img src={sort} alt="" /></button></th>
              </tr>
            </thead>

            <tbody>

              {sortedUsers.length == 0 ? <p>No Data Found</p> :
              sortedUsers?.map((value) => (
                <tr key={value.id}>
                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                  <td>{value.status}</td>
                  <td>{value.joinedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2>Add Data To Get Summary</h2>
      <input type="text" className="offset-1" onChange={(event) => { setPostData(event.target.value) }} />
      <button onClick={handlePost}>POST</button>
    </>
  )

}

export default App