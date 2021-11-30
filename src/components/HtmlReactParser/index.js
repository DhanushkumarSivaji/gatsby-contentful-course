import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const HtmlReactParser = ({htmlContent=""}) => {

const dirtyHTML = htmlContent;
  // The library allows HTML, SVG and MathML
// We only need HTML
const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });
  
    return (
    <>
    {parse(cleanHTML)}
    </>
    )
};

export default HtmlReactParser;
