import { useRef, useState } from "react";

export function PlayButton({
  handleKeyPress,
  isGameOver,
  isPlaying,
  setIsPlaying,
  restartGame,
}) {
  const inputEl = useRef(null);
  const [debounceId, setDebounceId] = useState(null);

  function debounce() {
    clearTimeout(debounceId);
    setDebounceId(
      setTimeout(() => {
        setDebounceId(null);
        clearTimeout(debounceId);
      }, 100)
    );
  }

  function onFocus() {
    if (debounceId) return;

    debounce();

    setIsPlaying(true);
  }
  function onBlur() {
    if (debounceId) return;

    debounce();

    setIsPlaying(false);
  }
  function onClick() {
    if (debounceId) return;

    if (isGameOver) {
      restartGame();
      inputEl.current.blur();
    }
    isPlaying ? inputEl.current.blur() : inputEl.current.focus();
  }
  return (
    <div className={`start-game ${isPlaying ? "playing" : ""}`}>
      {isPlaying ? (
        <span>
          <span className="play-button-icon">⏸️</span>
          <span>pause</span>
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
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        ref={inputEl}
      />
    </div>
  );
}
