import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import SavedColors from "./SavedColors";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [savedColors, setSavedColors] = useState([]);

  const getColorList = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        console.log("GET COLOR LIST:", res);
        setColorList(res.data);
      })
      .catch(err => {
        console.log("GET COLOR LIST ERR:", err);
      });
  };

  useEffect(() => {
    getColorList();
  }, []);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        savedColors={savedColors}
        setSavedColors={setSavedColors}
      />
      <SavedColors savedColorList={savedColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
