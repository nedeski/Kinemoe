import "./seek-bar.css";

import React from "react";

interface SeekBarProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export const SeekBar: React.FC<SeekBarProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="seekbar-container">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="seekbar"
      />
    </div>
  );
};
