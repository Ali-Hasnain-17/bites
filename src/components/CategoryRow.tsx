"use client";
function CategoryRow() {
  const filters = [];
  return (
    <>
      <div className="flex gap-3">
        <div className="p-5 rounded-lg bg-white text-green-500 font-bold">
          I mastered it
        </div>
        <div className="p-5 rounded-lg bg-white text-red-500 font-bold">
          Still Learning
        </div>
        <div className="p-5 rounded-lg bg-white font-bold">Remaining</div>
      </div>
    </>
  );
}

export default CategoryRow;
