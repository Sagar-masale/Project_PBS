import SearchBar from "../SearchBar/SearchBar"
import CreatePost from "../SearchBar/CreatePost"
import Stories from "./Stories"

function Home({TitlePage="Dialogue"}) {
  return (
    <>
    <div className=" ml-80 overflow-hidden overflow-y-scroll w-[100%] h-[100vh]">
       <SearchBar />
       <CreatePost/>
       <div className="Title-Page">
    <h2 className="Title-Text mt-25 ml-10 text-[23px]">
        {TitlePage}
    </h2>
</div>
<Stories/>
    </div>
    </>
  )
}

export default Home
