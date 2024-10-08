import React, { useEffect, useState } from "react";

const BackgroundStyle = ({ children }) => {
  const [randomNumber, updateRandomNumber] = useState(null);

  useEffect(() => {
    const randomNumberHandler = () => {
      updateRandomNumber(Math.floor(Math.random() * 5));
    };
    randomNumberHandler();
  }, [randomNumber]);

  return (
    <div
      className="body"
      style={
        randomNumber === 0
          ? {
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 20%, rgba(0, 0, 0, 1) 100%), url("/unnamed (1).jpg") no-repeat`,
            }
          : randomNumber === 1
          ? {
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 1) 100%), url("/unnamed.jpg") no-repeat`,
            }
          : randomNumber === 2
          ? {
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 1) 100%), url("/2147717095.jpg") no-repeat`,
            }
          : randomNumber === 3
          ? {
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 1) 100%), url("/2147717106.jpg") no-repeat`,
            }
          : randomNumber === 4
          ? {
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 1) 100%), url("/30369.jpg") no-repeat`,
            }
          : randomNumber === 5
          ? {
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 1) 100%), url("/volumetric-musical-background-with-treble-clef-notes-generative-ai.jpg") no-repeat`,
            }
          : {}
      }
    >
      {children}
    </div>
  );
};

export default BackgroundStyle;
