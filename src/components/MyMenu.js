// shared components will be stored in the components folder

import React from "react";

import { List } from "semantic-ui-react";

import { Link, useLocation } from "react-router-dom";

import "firebase/firestore";

function MyMenu () {

    // get current domain address
    const location = useLocation()

    const menuItems =[{
        name: "My posts",
        path: "/my/posts"
    }, 
    {
        name: "My collections",
        path: "/my/collections"
    },
    {
        name: "Member info",
        path: "/my/settings"
    }]

    // get current domain address
    // console.log(location);
    // {pathname: '/my/posts', search: '', hash: '', state: null, key: 't5krfkdu'}
    // hash: ""
    // key: "t5krfkdu"
    // pathname: "/my/posts"
    // search: ""
    // state: null

    // change returned object into list
    return (
        <List animated selection>
            {menuItems.map(menuItem => {
                return (
                    <List.Item 
                        as={Link} 
                        to={menuItem.path} 
                        key={menuItem.name} 
                        active={menuItem.path === location.pathname}
                    >
                        {menuItem.name}
                    </List.Item>
                );
        })}</List>
    );
}

export default MyMenu;
