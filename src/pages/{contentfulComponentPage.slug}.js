import React from "react";
import { Layout, RichText, SEO } from "components";
import { graphql } from "gatsby";

export default function ContentfulPage(props) {
  return (
    <Layout>
      <SEO
        title={props?.data?.contentfulComponentPage?.title}
        description={props?.data?.contentfulComponentPage?.description}
      />
      {!!props?.data?.contentfulComponentPage?.pageContent && (
        <RichText
          references={
            props?.data?.contentfulComponentPage?.pageContent?.references
          }
          raw={props?.data?.contentfulComponentPage?.pageContent?.raw}
        />
      )}
      {JSON.stringify(props.data.contentfulComponentPage.title)}
    </Layout>
  );
}

export const query = graphql`
  query PageQuery($id: String) {
    contentfulComponentPage(id: { eq: $id }) {
      id
      title
      description
      pageContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
          ... on ContentfulComponentHeroBanner {
            __typename
            contentful_id
            heading
            subHeading
            backgroundImage {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
          ... on ContentfulComponentPriceGroup {
            __typename
            contentful_id
            priceOptions {
              id
              title
              amountPerMonth
              description {
                raw
              }
              mostPopular
            }
          }
        }
      }
    }
  }
`;
