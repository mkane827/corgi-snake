import play from "../assets/play.png";

export function PlayButton({ handleKeyPress, isPlaying, setIsPlaying }) {
  return (
    <div className={`start-game ${isPlaying ? "playing" : ""}`}>
      <img src={play} />
      <span>{isPlaying ? "Playing" : "play"}</span>
      <input
        type="button"
        onKeyDown={handleKeyPress}
        onFocus={() => setIsPlaying(true)}
        onBlur={() => setIsPlaying(false)}
      />
    </div>
  );
}
