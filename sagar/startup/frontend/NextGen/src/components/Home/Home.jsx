import SearchBar from "../SearchBar/SearchBar"
import CreatePost from "../SearchBar/CreatePost"
import Stories from "./Stories"
import PostCard from "../Posts/UserPostCards"

function Home({TitlePage="Dialogue"}) {
const posts = [
  {
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr1yi71iJyyuMONWDjio3mNMo1iPdZ2ZGS2w&s",
    name: "Virat Kohli",
    caption: "King Kohli👑",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr1yi71iJyyuMONWDjio3mNMo1iPdZ2ZGS2w&s",
    likes: "400.k",
    comments: "20.1k",
    variant: "top-image",
  },
  {
    profile: "https://images.tv9hindi.com/wp-content/uploads/2024/04/arijit-singh-life-story.jpg",
    name: "Argit Singh",
    caption: "New Song ✨…",
    image: "https://images.tv9hindi.com/wp-content/uploads/2024/04/arijit-singh-life-story.jpg",
    likes: "10.5k",
    comments: "2.2k",
    variant: "bottom-image",
  },
  {
    profile: "https://media.assettype.com/newindianexpress%2F2025-04-01%2Fbc1gpp5u%2FAP25088521942501.jpg?w=480&auto=format%2Ccompress",
    name: "rohit sharma",
    caption: "The match day❤️",
    image: "https://media.assettype.com/newindianexpress%2F2025-04-01%2Fbc1gpp5u%2FAP25088521942501.jpg?w=480&auto=format%2Ccompress",
    likes: "280.5k",
    comments: "20.1k",
    variant: "top-image",
  },
    {
    profile: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202202/Neha_Shetty_slams_journalist_1200x768.jpeg?size=690:388",
    name: "neha shetty",
    caption: "The match day❤️",
    image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202202/Neha_Shetty_slams_journalist_1200x768.jpeg?size=690:388",
    likes: "280.5k",
    comments: "20.1k",
    variant: "top-image",
  },
    {
    profile: "https://i.imgur.com/bpGJqlo.jpg",
    name: "narendra modi",
    caption: "The match day❤️",
    image: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-04/04/full/1743751530-3189.jpg?im=FeatureCrop,size=(826,465)",
    likes: "280.5k",
    comments: "20.1k",
    variant: "bottom-image",
  },  
    {
    profile: "https://i.imgur.com/bpGJqlo.jpg",
    name: "varun dhavan",
    caption: "The match day❤️",
    image: "https://static.iwmbuzz.com/wp-content/uploads/2019/09/varun-dhawans-most-adorable-wish-for-his-gym-trainer2.jpg",
    likes: "280.5k",
    comments: "20.1k",
    variant: "top-image",
  },
    {
    profile: "https://i.imgur.com/bL0dwhk.jpg",
    name: "Virat Kohli",
    caption: "King Kohli👑",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr1yi71iJyyuMONWDjio3mNMo1iPdZ2ZGS2w&s",
    likes: "400.k",
    comments: "20.1k",
    variant: "top-image",
  },
  {
    profile: "https://i.imgur.com/s0F8OE3.jpg",
    name: "Argit Singh",
    caption: "New Song ✨…",
    image: "https://images.tv9hindi.com/wp-content/uploads/2024/04/arijit-singh-life-story.jpg",
    likes: "10.5k",
    comments: "2.2k",
    variant: "bottom-image",
  },
  {
    profile: "https://i.imgur.com/bpGJqlo.jpg",
    name: "rohit sharma",
    caption: "The match day❤️",
    image: "https://media.assettype.com/newindianexpress%2F2025-04-01%2Fbc1gpp5u%2FAP25088521942501.jpg?w=480&auto=format%2Ccompress",
    likes: "280.5k",
    comments: "20.1k",
    variant: "top-image",
  },
    {
    profile: "https://c.ndtvimg.com/2024-04/5dbuj8to_-kiara-advani-_625x300_23_April_24.jpeg",
    name: "neha shetty",
    caption: "The match day❤️",
    image: "https://c.ndtvimg.com/2024-04/5dbuj8to_-kiara-advani-_625x300_23_April_24.jpeg",
    likes: "280.5k",
    comments: "20.1k",
    variant: "top-image",
  },
    {
    profile: "https://i.imgur.com/bpGJqlo.jpg",
    name: "narendra modi",
    caption: "The match day❤️",
    image: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-04/04/full/1743751530-3189.jpg?im=FeatureCrop,size=(826,465)",
    likes: "280.5k",
    comments: "20.1k",
    variant: "bottom-image",
  },  
    {
    profile: "https://i.imgur.com/bpGJqlo.jpg",
    name: "varun dhavan",
    caption: "The match day❤️",
    image: "https://static.iwmbuzz.com/wp-content/uploads/2019/09/varun-dhawans-most-adorable-wish-for-his-gym-trainer2.jpg",
    likes: "280.5k",
    comments: "20.1k",
    variant: "top-image",
  },
];
  return (
    <>
    <div className=" ml-80 overflow-hidden overflow-y-scroll w-[100%] h-[100vh]">
       <SearchBar />
       <CreatePost/>
       <div className="Title-Page z-10 relative">
    <h2 className="Title-Text mt-25 ml-10 text-[23px] ">
        {TitlePage}
    </h2>
</div>
<Stories/>
<div className="UserPosts-Block w-[76%]">
  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-2 place-items-center">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
</div>
    </div>
    </>
  )
}

export default Home
