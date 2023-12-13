// ColorPicker.tsx
import React from 'react';

interface ColorPickerProps {
  setColor: (color: string) => void;
  colors: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ setColor, colors }) => {
    return (
      <div className="flex flex-row justify-center gap-4">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setColor(color)}
            className={`w-12 h-12 rounded-full ${
              color === 'black' ? 'bg-black' : `bg-${color}-500`
            } focus:ring-2 ring-slate-500`}
          ></button>
        ))}
      </div>
    );
  };

export default ColorPicker;
