import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

function UserPostCard({ variant = "top-image", profile, name, caption, image, likes, comments }) {
  return (
 <>
    

     <div className=" mr-auto ml-4 rounded-xl w-[350px] h-[100%] pt-5 pb-5  max-w-sm space-y-3 z-40">
      
      {variant === "top-image" ? (
        <>
          
          <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <Heart width={28}/>
              <span className="mr-2">{likes}</span>
              <MessageCircle width={28}/>
              <span>{comments}</span>
            </div>
            <MoreHorizontal width={28}/>
          </div>
          <div className="flex items-center gap-3">
            <img src={profile} className="w-8 h-8 rounded-full" alt={name} />
            <div>
              <h3 className="text-sm font-semibold capitalize">{name}</h3>
              <p className="text-xs text-gray-600">{caption}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img src={profile} className="w-8 h-8 rounded-full" alt={name} />
              <div>
                <h3 className="text-sm font-semibold capitalize">{name}</h3>
                <p className="text-xs text-gray-600">{caption}</p>
              </div>
            </div>
             <MoreHorizontal width={28}/>
          </div>
          <div className="flex items-center gap-1">
              <Heart width={28}/>
              <span className="mr-2">{likes}</span>
              <MessageCircle width={28}/>
              <span>{comments}</span>
            </div>
          <img src={image} alt={name} className="w-full h-48 object-center rounded-lg" />
        </>
      )}
    </div>

 </>
  );
}

export default UserPostCard;
