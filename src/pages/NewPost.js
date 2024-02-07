// Solution to user does not have permission to access this object . Firebase storage
// https://stackoverflow.com/questions/38671444/user-does-not-have-permission-to-access-this-object-firebase-storage-android

import { Container, Header, Form, Image, Button } from "semantic-ui-react"; 

import React from "react";

import "firebase/firestore";

import firebase from "../utils/firebase";

// need to add ../compat/..
import "firebase/compat/storage";

// react-router-dom version 6 need to use useNavigate (not useHistory)
import { useNavigate } from "react-router-dom";

function NewPost() {
    // return "New Post!";

    // usehistory from useHistory
    const navigate = useNavigate();

    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    // get data from firebase
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

    const options = topics.map(topic => {
        return {
            text: topic.name,
            value: topic.name,
        }   
    })

    const previewUrl = file 
        ? URL.createObjectURL(file)
        : "https://react.semantic-ui.com/images/wireframe/image.png";

    function onSubmit() {

        // loading time for submit
        setIsLoading(true);

        // once submitted, user will create a posts object on firebase firestore
        const documentRef = firebase.firestore().collection("posts").doc()

        // create a ref for photo uploaded
        const fileRef = firebase.storage().ref("post-images/" + documentRef.id)
        // upload file of photo
        const metadata = {
            contentType: file.type
        };
        fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imageURL) => {
                documentRef.set({
                    title,
                    content,
                    topic: topicName,
                    createdAt: firebase.firestore.Timestamp.now(),
                    author: {  // map object on firebase firestore
                        // ||: or
                        displayName: firebase.auth().currentUser.displayName || "",
                        photoURL: firebase.auth().currentUser.photoURL || "",
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email,
                    },
                    imageURL
                }).then(() => {
                    // redirect to the homepage
                    // history.push('/');
                    // react-router-dom version 6 need to use navigate
                    navigate("/posts");
        
                    // loading time for submit
                    setIsLoading(false);
                });
            })
        });
    }

    return (
        <Container>
 
            <Header>
                Publish a new post
            </Header>

            <Form onSubmit={onSubmit}>

                {/* section for upload photos and preview */}
                <Image 
                    src={previewUrl}
                    size="medium"
                    floated="left"/>
                <Button basic as="label" htmlFor="post-image">Upload photo</Button >
                <Form.Input 
                    type="file" 
                    id="post-image" 
                    style={{display: "none"}}
                    onChange={(e) => setFile(e.target.files[0])}
                />


                {/* section for text and category */}
                <Form.Input 
                    placeholder="Type the title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <Form.TextArea
                    placeholder="Write the content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                />

                <Form.Dropdown
                    placeholder="Choose category"

                    // options={[
                    //     {
                    //         text: "Basketball",
                    //         value: "sports"
                    //     },
                    //     {
                    //         text: "Cuisine",
                    //         value: "food"
                    //     },
                    //     {
                    //         text: "Sci-fi",
                    //         value: "movie"
                    //     },
                    // ]}
                    // use return value of options function to replace above data structure
                    options={options}
                    selection
                    value={topicName}
                    onChange={(e, { value}) => setTopicName(value)}
                />
                <Form.Button loading={isLoading}>Submit</Form.Button>
            </Form>
        </Container>
    )
};

export default NewPost;