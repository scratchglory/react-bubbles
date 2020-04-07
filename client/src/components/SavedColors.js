import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SavedColors = props => {
  console.log("SAVED COLROS PROPS", props);

  return (
    <div className="colors-wrap">
      <p>saved colors</p>
      {props.savedColorList.map(color => (
        <ul>
          <li
            key={color.color}
            //   onClick={() => editColor(color)}
          >
            <span>
              {/* <span
              className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
            >
              x
            </span>{" "} */}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        </ul>
      ))}
    </div>
  );
};

export default SavedColors;
