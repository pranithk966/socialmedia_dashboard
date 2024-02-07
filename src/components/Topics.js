// shared components will be stored in the components folder

import React from "react";
import firebase from "../utils/firebase";
import { List } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom"
import "firebase/firestore";

function Topics () {
    
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get("topic");

    const [topics, setTopics] = React.useState([]);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("topics")
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((doc) => {
                    return doc.data();
                });

                setTopics(data)

                // print out data stored on Firestore
                // Array (2) [{…}, {…}]
                // 0: {name: 'film'}
                // 1: {name: 'basketball'}
                // length: 2
                // console.log(data);
            });
    }, []);

    // return "Hello, Topics"
    
    // change returned object into list
    return (
        <List animated selection>
            {topics.map(topic => {
                return (
                
                // add the link of doamin address once topic categories clicked
                <List.Item 
                    key={topic.name}
                    as={Link}
                    to={`/posts?topic=${topic.name}`}
                    // make the words bold once categories selected
                    active={currentTopic === topic.name}
                >
                    {topic.name}
                </List.Item>
                )
        })}</List>
    );
}

export default Topics;
