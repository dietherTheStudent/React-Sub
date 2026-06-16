import MoodBoardItem from "./MoodBoardItem";

function MoodBoard() {
  return (
    <div>
      <h1 className="mood-board-heading">Destination Mood Board</h1>
      <div className="mood-board">
        <MoodBoardItem
          color="#cce5ff"
          image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400"
          description="Tropical Beach"
        />
        <MoodBoardItem
          color="#d4edda"
          image="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400"
          description="Mountain Forest"
        />
        <MoodBoardItem
          color="#fff3cd"
          image="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400"
          description="Golden Desert"
        />
        <MoodBoardItem
          color="#f8d7da"
          image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400"
          description="Misty Highlands"
        />
        <MoodBoardItem
          color="#e2d9f3"
          image="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400"
          description="City at Night"
        />
      </div>
    </div>
  );
}

export default MoodBoard;