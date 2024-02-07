// npm install sematic-ui-react semantic-ui-css react-router-dom
import { Menu, Search } from "semantic-ui-react";
// react-router-dom version 6 need to use useNavigate (not useHistory)
import { Link, useNavigate } from "react-router-dom";  // need to use (BrwoserRouter) before using Link 

import React from "react";

import firebase from "./utils/firebase";

import algolia from "./utils/algolia";

function Header({ user }) {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = React.useState("");
    const [results, setResults] = React.useState([]);

    // function to show search result on the Header
    function onSearchChange(e, { value }) {

        setInputValue(value);

        algolia.search(value).then((result) => {

            // print out result on web console
            // console.log(result.hits);

            const searchResults = result.hits.map(hit => {
                return {
                    title: hit.title,
                    description: hit.content,
                    id: hit.objectID,
                };
            });
            setResults(searchResults);
        });
    }

    function onResultSelect(e, { result }) {
        // history.push not working
        navigate(`/posts/${result.id}`)
    }

    // use monitoring function from App.js
    // // monitoring the state of signed or not
    // // initializinig state, not sure signed or not => null
    // const [user, setUser] = React.useState(null);
    // // after signOut, the currentUser will become null
    // React.useEffect(() => {
    //     firebase.auth().onAuthStateChanged((currentUser) => {
    //         setUser(currentUser);
    //     });
    // }, []);

    // navbar
    // to="/" is homepage
    // click Register/Login leads to /signin
    // click Social Platform leads to homepage
    return <div className="ui container">
    <Menu>
        <Menu.Item as={Link} to="/posts">  
            Social Platform
        </Menu.Item> 
        <Menu.Item>
            {/* use search function */}
            <Search
                value={inputValue}
                onSearchChange={onSearchChange}
                results={results}
                noResultsMessage="No posts found."
                onResultSelect={onResultSelect}
            />
        </Menu.Item>
        <Menu.Menu position="right">
            {user ? (
                <>
                    <Menu.Item as={Link} to="/new-post">
                        Publish
                    </Menu.Item>
                    <Menu.Item as={Link} to="/my/posts">
                        Account
                    </Menu.Item>
                    {/* after signOut, the currentUser will become null */}
                    <Menu.Item onClick={() => firebase.auth().signOut()}>
                        Log out
                    </Menu.Item>
                    </>
                ) : (
                    <Menu.Item as={Link} to="/signin">
                        Register/Login
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    </div>
    ;
}

export default Header;