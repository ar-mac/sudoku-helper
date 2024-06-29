import React from "react";

export default function Iframe() {
  return (
    <div className="Iframe-wrapper">
      <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="600"
        height="100%"
        src="https://sudoku.com/killer/expert/"
      />
    </div>
  )
}
