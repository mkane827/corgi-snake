import React from "react";
import { Speed } from "../enums/Speed";

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
          <option value={Speed.SNOOZE}>Snooze</option>
          <option value={Speed.TREATOS}>Looking for treatos</option>
          <option value={Speed.ZOOMIES}>ZOOOOOOMIES!!!</option>
        </select>
      </label>
    </form>
  );
}
