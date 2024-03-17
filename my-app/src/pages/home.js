"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import message from "../data/data.js";
import JSConfetti from "js-confetti";

export default function HomePage() {
  const [noCount, setNoCount] = React.useState(1);
  const [noHovered, setNoHovered] = React.useState(1);
  const [buttonPosition, setButtonPosition] = useState({
    bottom: "260px",
    left: "800px",
  });
  const [absolutePosition, setAbsolutePosition] = useState(false);
  const [yesPressed, setYesPressed] = React.useState(false);

  useEffect(() => {
    if ((noCount === 1 || noCount === 3) && yesPressed) {
      const jsConfetti = new JSConfetti();
      const addConfettiWithDelay = (count, delay) => {
        setTimeout(() => {
          for (let i = 0; i < count; i++) {
            jsConfetti.addConfetti({
              emojis: ["💖", "🥰", "✨", "🌸"],
            });
          }
        }, delay);
      };
      for (let i = 0; i < 10; i++) {
        addConfettiWithDelay(1, i * 500);
      }
    }
  }, [yesPressed]);
  function noClickHandler() {
    setNoCount((noCountTemp) => {
      if (noCountTemp + 1 == 3) {
        handleMouseOver();
      }
      return noCountTemp + 1;
    });
  }
  const yesClickHandler = async () => {
    if (noCount == 1 || noCount == 3) {
      try {
        await axios.post("https://proposal-4tui.onrender.com/api/response", {
          answer: `Tried to click on No button ${noCount} times and Hovered on it ${noHovered} times`,
        });
        alert("Response saved(I might be the happiest guy fr)");
      } catch (error) {
        console.error("Error saving response:", error);
        alert("An error occurred while saving your response.");
      }
      setYesPressed((prev) => {
        return true;
      });
    }
    if (noCount == 2) {
      setNoCount((noCountTemp) => {
        return noCountTemp - 1;
      });
    }
  };
  function handleMouseOver() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const randH = Math.floor(Math.random() * screenHeight) / 2;
    const randW = Math.floor(Math.random() * screenWidth) - 50;

    setButtonPosition({ bottom: randH, left: randW });
    setAbsolutePosition(true);
    setNoHovered((prev) => {
      return prev + 1;
    });
  }

  return (
    <div className="flex relative items-center flex-col bg-pink-200 h-screen">
      <div className=" w-[250px] mt-[100px]">
        {noCount === 3 ? (
          <video autoPlay loop width="250">
            <source src="denji.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src={yesPressed ? "rose.gif" : message[noCount - 1].gif}
            alt="gif"
          />
        )}
      </div>
      <p className="font-light text-3xl">
        {yesPressed ? "Yay, we should go out " : message[noCount - 1].text}
      </p>
      <div className={`gap-10 flex ${yesPressed ? "hidden" : ""}`}>
        <button
          onClick={yesClickHandler}
          className="btn btn-outline w-[100px]  btn-secondary"
        >
          Yes
        </button>
        <button
          onClick={noClickHandler}
          onMouseEnter={noCount == 3 ? handleMouseOver : null}
          className={`btn btn-outline w-[100px]  btn-error ${
            absolutePosition ? "absolute" : ""
          }`}
          style={{ bottom: buttonPosition.bottom, left: buttonPosition.left }}
        >
          No
        </button>
      </div>

      <div></div>
    </div>
  );
}
