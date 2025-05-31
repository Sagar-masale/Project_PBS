import React from "react";
import { ChevronRight } from "lucide-react";

const stories = [
  {
    name: "Virat Kohli",
    img: "https://english.cdn.zeenews.com/sites/default/files/2024/10/05/1535993-untitled-design-32.jpg",
  },
  {
    name: "Hrithik Roshan",
    img: "https://cf-img-a-in.tosshub.com/sites/visualstory/stories/2022_09/story_9815/assets/2.jpeg?time=1664540733",
  },
  {
    name: "Tiger Shroff",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxsF4xULlSgLC5TZBz4vxw01tZi0qQOR5KIw&s",
  },
  {
    name: "Rohit Sharma",
    img: "https://akm-img-a-in.tosshub.com/aajtak/images/story/202407/6682f3e179ddc-rohit-sharma-captaincy-in-t20-world-cup-2024-012224297-16x9.jpg?size=948:533",
  },
  {
    name: "Anil Kapoor",
    img: "https://www.koimoi.com/wp-content/new-galleries/2025/05/anil-kapoor.jpg",
  },
  {
    name: "Dhoni MS",
    img: "https://livingtotellatale.wordpress.com/wp-content/uploads/2020/08/msd.jpg",
  },
];

const StoryItem = ({ name, img }) => (
<div className="flex flex-col items-center mx-1">
  <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#3DC1F9] to-[#0150A0] p-[2px] flex items-center justify-center">
    <div className="w-full h-full rounded-full bg-white p-[3px] flex items-center justify-center">
      <img
        src={img}
        alt={name}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  </div>
  <span className="text-xs mt-1 w-16 truncate text-center">{name}</span>
</div>

);

const Stories = () => {
  return (
    <div className="flex items-center ml-8 space-x-3 gap-5 overflow-x-auto py-2">
      {/* Your Snap */}
      <div className="flex flex-col items-center mx-1">
        <div className="w-[80px] h-[80px] rounded-full bg-[#3B9DFF] flex  items-center  justify-center text-white text-2xl">
          +
        </div>
        <span className="text-xs mt-1 w-16 truncate text-center">Your Snap</span>
      </div>

      {/* Other Stories */}
      {stories.map((story, index) => (
        <StoryItem key={index} name={story.name} img={story.img} />
      ))}

      {/* Scroll Arrow */}
      <div className="w-[80px] h-[80px]  bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default Stories;
