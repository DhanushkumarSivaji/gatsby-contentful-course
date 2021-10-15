import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { MenuWrapper, MenuItem, SubMenuItemWrapper } from "./style";

const Menu = () => {
    const result = useStaticQuery(graphql`
        fragment menuItemData on ContentfulComponentMenuItem {
            id
            label
            page {
                ... on ContentfulComponentPage {
                    slug
                }
                ... on ContentfulComponentBlog {
                    slug
                }
            }
        }

        query MenuQuery {
            contentfulComponentMenu {
                menuItems {
                    ...menuItemData
                    subMenuItem {
                        ...menuItemData
                    }
                }
            }
        }
    `);
    return (
        <MenuWrapper>
            {result.contentfulComponentMenu.menuItems.map((menuItem) => (
                <MenuItem key={menuItem.id}>
                    {!menuItem.subMenuItem ? (
                        <Link to={`/${menuItem.page.slug}`}>
                            {menuItem.label}
                        </Link>
                    ) : (
                        <SubMenuItemWrapper>
                            <div>{menuItem.label}</div>
                            <div>
                                {menuItem.subMenuItem?.map((subMenuItem) => (
                                    <div key={subMenuItem.id}>
                                        <Link to={`/${subMenuItem.page.slug}`}>
                                            {subMenuItem.label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </SubMenuItemWrapper>
                    )}
                </MenuItem>
            ))}
            <MenuItem>
                <Link to="/contact">Contact</Link>
            </MenuItem>
        </MenuWrapper>
    );
};

export default Menu;
