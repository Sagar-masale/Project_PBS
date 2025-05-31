import {Plus} from "lucide-react";

function CreatePost() {
  return (
<>
<button className="absolute flex justify-center right-4 top-4 sm:top-6 sm:right-8 md:top-8 md:right-10 w-44 px-6 py-2 text-white font-semibold rounded-2xl 
  bg-[linear-gradient(to_right,_#3DC1F9,_#0160BF)] 
  hover:bg-[linear-gradient(to_left,_#3DC1F9,_#0160BF)] 
  hover:scale-105 
  transition-all duration-300 ease-in-out shadow-md">
  <Plus width={15}/> Create a post
</button>


</>


  )
}

export default CreatePost
