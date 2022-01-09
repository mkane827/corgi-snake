export function PlayButton({ handleKeyPress, isPlaying, setIsPlaying }) {
  return (
    <div className={`start-game ${isPlaying ? "playing" : ""}`}>
      {isPlaying ? (
        <span>
          <span className="play-button-icon">⏸️</span>
          <span>Playing</span>
        </span>
      ) : (
        <span>
          <span className="play-button-icon">▶️</span>
          <span>play</span>
        </span>
      )}
      <input
        type="button"
        onKeyDown={handleKeyPress}
        onFocus={() => setIsPlaying(true)}
        onBlur={() => setIsPlaying(false)}
      />
    </div>
  );
}
