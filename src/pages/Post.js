// https://www.youtube.com/watch?v=1BpKTReF-O0&list=PLddLA9QpG2T2__tPfi6nwaL8Rf_wWQaz7&index=29

import React from "react";

import { useParams } from "react-router-dom";

import { 
    Container, 
    Grid, 
    Image, 
    Header, 
    Segment, 
    Icon,
    Comment,
    Form } from "semantic-ui-react";

import Topics from "../components/Topics";
import firebase from "../utils/firebase";

function Post() {
    // return "Post"

    // use postId to get the post
    const { postId } = useParams();
    const [post, setPost] = React.useState({
        author: {},
    });
    const [commentContent, setCommentContent] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        // use .doc() to get the post from the .collection()
        firebase
            .firestore()
            .collection("posts")
            .doc(postId)

            // below code enable bookmark change immediately right after click
            // .onSnapshot monitor and auto render
            .onSnapshot((docSnapshot) => {
                const data = docSnapshot.data();
                setPost(data);
            })

            // below code need to refresh the page every time after changing something
            // .get()
            // .then((docSnapshot) => {
            //     const data = docSnapshot.data();
            //     setPost(data);
            // });
        }, []);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("posts")
            .doc(postId)
            .collection("comments")
            // sort comments base on the time of comment created
            // .orderBy("createdAt", "desc")  //descending
            .orderBy("createdAt")  // asending
            // monitoring firebase, update immediately once changes made
            .onSnapshot((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(doc => {
                    return doc.data();
                })
                // console.log(data);
                setComments(data);
            })
    }, [])


    function toggle(isActive, field) {

        const uid = firebase.auth().currentUser.uid;

        firebase
            .firestore()
            .collection("posts")
            .doc(postId)
            .update({
                // this will keep all previous users and remove the current users
                [field]: isActive 
                    ? firebase.firestore.FieldValue.arrayRemove(uid)
                    : firebase.firestore.FieldValue.arrayUnion(uid)
        });

        // replace below if else with above code
        // if (isActive) {
        //     firebase
        //         .firestore()
        //         .collection("posts")
        //         .doc(postId)
        //         .update({
        //             // this will keep all previous users and remove the current users
        //             [field]: firebase.firestore.FieldValue.arrayRemove(uid),
        //         });
        // } else {
        //     firebase
        //         .firestore()
        //         .collection("posts")
        //         .doc(postId)
        //         .update({

        //             // this wil clear all other users
        //             // collectedBy: [uid],
        //             // this will keep all previous users and append the current users
        //             [field]: firebase.firestore.FieldValue.arrayUnion(uid),
        //         });
    }

    // replace below function with toggle() function
    // function to save post and connect with firebase, firestore
    // function toggleCollected() {

    //     const uid = firebase.auth().currentUser.uid;

    //     if (isCollected) {
    //         firebase
    //             .firestore()
    //             .collection("posts")
    //             .doc(postId)
    //             .update({

    //                 // this will keep all previous users and remove the current users
    //                 collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
    //             });
    //     } else {
    //         firebase
    //             .firestore()
    //             .collection("posts")
    //             .doc(postId)
    //             .update({

    //                 // this wil clear all other users
    //                 // collectedBy: [uid],

    //                 // this will keep all previous users and append the current users
    //                 collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
    //             });
    //     }
    // }


    // replace below function with toggle() function
    // function to save post and connect with firebase, firestore
    // function toggleLiked() {

    //     const uid = firebase.auth().currentUser.uid;

    //     if (isLiked) {
    //         firebase
    //             .firestore()
    //             .collection("posts")
    //             .doc(postId)
    //             .update({

    //                 // this will keep all previous users and remove the current users
    //                 likedBy: firebase.firestore.FieldValue.arrayRemove(uid),
    //             });
    //     } else {
    //         firebase
    //             .firestore()
    //             .collection("posts")
    //             .doc(postId)
    //             .update({

    //                 // this wil clear all other users
    //                 // collectedBy: [uid],

    //                 // this will keep all previous users and append the current users
    //                 likedBy: firebase.firestore.FieldValue.arrayUnion(uid),
    //             });
    //     }
    // }

    // posts saved by the current user
    // .collectedBy? to check if there's .collectedBy on firebase, firestore
    // .includes() to check if there's current user
    const isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid)

    // posts liked by the current user
    const isLiked = post.likedBy?.includes(firebase.auth().currentUser.uid)

    // post a new comment, connect with firebase, firestore, and add one more post in the below comment list 
    function onSubmit() {

        setIsLoading(true);

        // use firestore batch object
        const firestore = firebase.firestore();
        const batch = firestore.batch();

        // update both count of comment and comment list
        const postRef = firestore.collection("posts").doc(postId)  // get the post
        // increase the count of posts by 1
        batch.update(postRef, {
            commentsCount: firebase.firestore.FieldValue.increment(1)
        } )

        // create a new union of comments under a post on firebase, firestore
        const commentRef = postRef.collection("comments").doc();
        batch.set(commentRef, {
            content: commentContent,
            createdAt: firebase.firestore.Timestamp.now(),
            author: {
                uid: firebase.auth().currentUser.uid,
                displayName: firebase.auth().currentUser.displayName || "",
                photoURL: firebase.auth().currentUser.photoURL || "",
            },
        });

        // set up an auto email response function when anyone comments on a post
        const mailRef = firestore.collection("mail").doc();
        batch.set(mailRef, {
            to: post.author.email,
            message: {
                subject: `New Message: ${
                    firebase.auth().currentUser.displayName
                } just commented on your post!`,
                html: `<a href="${
                    window.location.origin
                }/posts/${postId}">Go to post</a>`
            },
        });

        // upload batch, load the comment button, and clear comment after submitting
        batch.commit().then(() => {
            setCommentContent("");
            setIsLoading(false);
        });
    }

    return (
        // <Container>
        //     <Grid>
        //         {/* default grid size of row is 16 */}
        //         <Grid.Row>
        //             {/* <Grid.Column width={3}>Category</Grid.Column> */}
        //             <Grid.Column width={3}>
        //                 <Topics/>
        //             </Grid.Column>

        //             <Grid.Column width={10}>

        <>
                        {/* display user icon if no photo of user */}
                        {post.author.photoURL ? 
                            (<Image src={post.author.photoURL} avatar/>
                            ) : (
                            <Icon name="user circle" />)
                            } {""}
                            {/* display User if no username */}
                            {post.author.displayName || "User"}
                        <Header>
                            {post.title}
                            <Header.Subheader>
                                {post.topic}
                                {/* use .toDate() to turn firebase object into JavaScript date format */}
                                ．
                                {/* .createdAt?: optional chaining */}
                                {post.createdAt?.toDate().toLocaleDateString()}
                            </Header.Subheader>
                        </Header>
                        <Image src={post.imageURL} />
                        {/* basic hide border and vertical remove border */}
                        <Segment basic vertical>{post.content}</Segment>
                        <Segment basic vertical>
                            Comment {post.commentsCount || 0}．Like {post.likedBy?.length || 0}．
                            {/* like icon */}
                            {/* <Icon name="thumbs up outline" color="grey"/> */}
                            <Icon 
                                name={`thumbs up ${isLiked ? "" : "outline"}`}
                                color={isLiked ? "blue" : "grey"}
                                link
                                // onClick={toggleLiked}
                                onClick={() => toggle(isLiked, "likedBy")}
                            />
                            {/* save icon */}
                            <Icon 
                                // if saved before, the bookmark icon is blue. Otherwise, only outline
                                // name="bookmark outline"
                                // need to separate ...bookmark and ${... Otherwise, the bookmark won't show
                                name={`bookmark ${isCollected ? "" : "outline"}`}
                                color={isCollected ? "blue" : "grey"}
                                link 
                                // onClick={toggleCollected}
                                onClick={() => toggle(isCollected, "collectedBy")}
                            />
                        </Segment>
                            <Comment.Group>
                                {/* reply increases the height of comment section */}
                                <Form reply>
                                    {/* enable typing in the comment area */}
                                    <Form.TextArea
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)} 
                                    />
                                    <Form.Button onClick={onSubmit} loading={isLoading}>Comment</Form.Button>
                                </Form>
                                {/* <Header>1 Comment(s)</Header> */}
                                <Header>{post.commentsCount} Post(s)</Header>
                                {comments.map((comment) => {
                                    return (
                                        <Comment>
                                            <Comment.Avatar src={comment.author.photoURL}/>
                                            <Comment.Content>
                                                {/* as="span" is in-line element */}
                                                {/* <Comment.Author as="span">Username</Comment.Author>  */}
                                                <Comment.Author as="span">
                                                    {comment.author.displayName || "User"}
                                                </Comment.Author> 
                                                {/* <Comment.Metadata>{new Date().toLocaleString()}</Comment.Metadata> */}
                                                <Comment.Metadata>
                                                    {comment.createdAt.toDate().toLocaleString()}
                                                </Comment.Metadata>
                                                {/* <Comment.Text>Content</Comment.Text> */}
                                                <Comment.Text>{comment.content}</Comment.Text>
                                            </Comment.Content>
                                    </Comment>
                                    );
                                })}

                            </Comment.Group>

        </>
        //             </Grid.Column>

        //             <Grid.Column width={3}>
                        
        //             </Grid.Column>

        //         </Grid.Row>    
        //     </Grid>
        // </Container>
        
    );
}

export default Post;
