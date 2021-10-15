const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
    });
};

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const {
        data: { contentfulComponentBlog, allContentfulComponentBlogPost },
    } = await graphql(`
        {
            contentfulComponentBlog {
                postsPerPage
                slug
            }
            allContentfulComponentBlogPost(
                sort: { fields: publishedDate, order: DESC }
            ) {
                edges {
                    node {
                        slug
                        publishedDate(formatString: "DD MMM YYYY")
                        pageContent {
                            raw
                        }
                        description
                        title
                        contentful_id
                    }
                }
            }
        }
    `);

    allContentfulComponentBlogPost.edges.forEach((blogPost) => {
        createPage({
            path: `${contentfulComponentBlog.slug}/${blogPost.node.slug}`,
            context: {
                postId: blogPost.node.contentful_id,
            },
            component: path.resolve("./src/templates/BlogPost/index.js"),
        });
    });

    const numPages = Math.ceil(
        allContentfulComponentBlogPost.edges.length / contentfulComponentBlog.postsPerPage
    );

    for (let i = 0; i < numPages; i++) {
        createPage({
            path: `${contentfulComponentBlog.slug}${i === 0 ? "" : `/${i + 1}`}`,
            component: path.resolve(
                "./src/templates/PaginatedBlogPage/index.js"
            ),
            context: {
                blogSlug: contentfulComponentBlog.slug,
                totalPages: numPages,
                currentPage: i + 1,
                posts: allContentfulComponentBlogPost.edges
                    .map((blogPost) => blogPost.node)
                    .slice(
                        i * contentfulComponentBlog.postsPerPage,
                        i * contentfulComponentBlog.postsPerPage +
                            contentfulComponentBlog.postsPerPage
                    ),
            },
        });
    }
};
