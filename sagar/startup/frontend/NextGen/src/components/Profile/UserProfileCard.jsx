function UserProfileCard() {
  return (
    <div className="text-center mb-6">
      <img
        src="https://english.cdn.zeenews.com/sites/default/files/2024/10/05/1535993-untitled-design-32.jpg"
        alt="Virat Kohli"
        className="w-20 h-20 rounded-full mx-auto object-cover"
      />
      <h2 className="font-semibold mt-2">Virat Kohli</h2>
      <p className="text-sm text-gray-500">Cricketer / Sport</p>
      <div className="mt-2 flex justify-center gap-4 text-sm">
        <span><strong>500</strong> posts</span>
        <span><strong>2,500</strong> Followers</span>
      </div>
    </div>
  );
}
export default UserProfileCard;