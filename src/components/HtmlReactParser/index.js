import React from "react";
import parse from "html-react-parser";

const HtmlReactParser = ({htmlContent=""}) => {  
    return (
    <>
    {parse(htmlContent)}
    </>
    )
};

export default HtmlReactParser;
