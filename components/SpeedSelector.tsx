import React from "react";

export function SpeedSelector({ speed, setSpeed }) {
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSpeed(parseInt(e.target.value), 10);
  }

  return (
    <form className="speed-selector">
      <label htmlFor="snake-speed">
        Corgo Speed
        <select
          name="snake-speed"
          id="snake-speed"
          value={speed}
          onChange={onChange}
        >
          <option value="5">Snooze</option>
          <option value="3">Looking for treatos</option>
          <option value="1">ZOOOOOOMIES!!!</option>
        </select>
      </label>
    </form>
  );
}
