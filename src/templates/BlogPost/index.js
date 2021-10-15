import React from "react";
import { graphql } from "gatsby";
import { Layout, RichText, SEO } from "components";

const BlogPost = (props) => {
    console.log("props",props);
    return (
        <Layout>
            <SEO
                title={props.data.contentfulComponentBlogPost.title}
                description={props.data.contentfulComponentBlogPost.description}
            />
            <RichText raw={props.data.contentfulComponentBlogPost.pageContent.raw} />
        </Layout>
    );
};

export const query = graphql`
    query BlogPostQuery($postId: String) {
        contentfulComponentBlogPost(contentful_id: { eq: $postId }) {
            publishedDate(formatString: "DD MMM YYYY")
            pageContent {
                raw
            }
            description
            title
            contentful_id
            slug
        }
    }
`;

export default BlogPost;
