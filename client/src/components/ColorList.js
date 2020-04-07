import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setSavedColors, savedColors }) => {
  console.log("COLORS LIST", colors);
  console.log("SAVED COLORS", savedColors);
  //   console.log("UPDATE COLORS", updateColors);
  //   console.log("SET SAVED COLORS", setSavedColors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    const color = colors.find(c => colorToEdit.code.hex === c.code.hex);
    axiosWithAuth()
      // Must have two arguments
      .put(`/api/colors/${color.id}`, colorToEdit)
      .then(res => {
        console.log("SAVE EDIT", res.data);
        setSavedColors([...savedColors, res.data]);
      })
      .catch(err => console.log("SAVE EDIT ERROR:", err));

    setSavedColors(
      colors.filter(item => {
        return item.id !== color.id;
      })
    );
  };

  // Clicking on the red X will remove the color from the list and rerender the list with updateColors function
  //   const deleteColor = color => {
  const deleteColor = color => {
    console.log("DELETE COLOR ID:", color);
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        setEditing(false);
        console.log("DELETE COLOR:", res);
      })
      .catch(err => console.log("DELETE COLOR ERR:", err));

    // Need to update the color list
    updateColors(
      colors.filter(item => {
        return item.id !== color.id;
      })
    );
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
