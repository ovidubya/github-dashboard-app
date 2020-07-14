import * as React from "react";
import { PollingContext } from "../../context/poll";

interface InputRangeProps {}

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
};

export const InputRange: React.FC<InputRangeProps> = () => {
  const { pollTiming, setPollTiming } = React.useContext(PollingContext);

  return (
    <div>
      <label htmlFor="range">
        Timing to referesh: {millisToMinutesAndSeconds(pollTiming)} seconds
      </label>
      <input
        onChange={(e) => {
          setPollTiming(e.target.value);
        }}
        name="range"
        type="range"
        min={"10000"}
        max={"300000"}
        value={pollTiming}
      />
    </div>
  );
};
