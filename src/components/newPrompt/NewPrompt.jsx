import React, { useEffect, useRef } from "react";
import "./NewPrompt.css";
function NewPrompt({ endRef }) {
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="endChat" ref={endRef}>
        <div className="newPrompt">
          <form className="newForm">
            <label htmlFor="file">
              <img src="/attachment.png"></img>
            </label>
            <input id="file" type="file" multiple={false} hidden></input>
            <input type="text" placeholder="Ask anything..."></input>
            <button>
              <img src="/arrow.png" alt=""></img>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPrompt;
