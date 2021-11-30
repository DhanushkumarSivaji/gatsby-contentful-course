import React from "react";
import { SEO, Layout } from "components";
import { useStaticQuery, graphql } from "gatsby"
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const Test = () => {
const data = useStaticQuery(graphql`
    query MyQuery {
        contentfulComponentTinyMceAdvance {
        childContentfulComponentTinyMceAdvanceBodyTextNode {
            body
        }
        }
    }
  `)

const dirtyHTML = data?.contentfulComponentTinyMceAdvance?.childContentfulComponentTinyMceAdvanceBodyTextNode?.body
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

export default Test;
