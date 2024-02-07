// need to install react-waypoint package to load more posts after the first 3 posts showing on the website
// npm install react-waypoint

import React from "react";

import { Item } from "semantic-ui-react";

import { Link, useLocation } from "react-router-dom";

import { Waypoint } from "react-waypoint";

import firebase from "../utils/firebase";

import Post from "../components/Post"



import { Grid } from 'semantic-ui-react';


function Posts() {
    // return "Hello, Posts";

    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get("topic");
    
    const [posts, setPosts] = React.useState([]);

    const lastPostSnapshotRef = React.useRef();

    // once topic categories selected, run below code again and update
    React.useEffect(() => {
        
        // if topic categories selected, show the posts of selected topic
        // otherwise, show all posts
        if (currentTopic) {
            firebase
                .firestore()
                .collection("posts")
                // filter and get posts with matching topic 
                .where("topic", "==", currentTopic)
                // sort posts based on data created 
                .orderBy("createdAt", "desc")
                // limit to only 3 posts on the page
                .limit(3)
                .get()
                .then((collectionSnapshot) =>{
                    const data = collectionSnapshot.docs.map(docSnapshot => {
                        const id = docSnapshot.id;
                        return { ...docSnapshot.data(), id };
                });
                // the current post is the last post of the previous snapshot
                lastPostSnapshotRef.current = 
                    collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                setPosts(data);
            });
        } else {
            firebase
                .firestore()
                .collection("posts")
                // sort posts based on data created 
                .orderBy("createdAt", "desc")
                // limit to only 3 posts on the page
                .limit(3)
                .get()
                .then((collectionSnapshot) =>{
                    const data = collectionSnapshot.docs.map(docSnapshot => {
                        const id = docSnapshot.id;
                        return { ...docSnapshot.data(), id };
                });
                // the current post is the last post of the previous snapshot
                lastPostSnapshotRef.current = 
                    collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                setPosts(data);
            });
        }
    }, [currentTopic]);
    
    return (
        // <Container>
        //     <Grid>
        //         {/* default grid size of row is 16 */}
        //         <Grid.Row>
        //             {/* <Grid.Column width={3}>Category</Grid.Column> */}
        //             <Grid.Column width={3}><Topics/></Grid.Column>

        //             <Grid.Column width={10}>
                    <>
                        {/*  */}
                        {/* <Item.Group>

                            
                            {posts.map((post) => { 
                                // return <p>{post.title}</p>
                                return (
                                    <Post post={post} key={post.id} />

                                    // move below codes to "../components/Post"

                                    // as={Link} us Link item to render AND lead to  
                                    // <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                                    //     use photo uploaded or default image
                                    //     <Item.Image 
                                    //         src={post.imageURL || "https://react.semantic-ui.com/images/wireframe/image.png"} 
                                    //         size="medium"
                                    //     />
                                    //     <Item.Content>
                                    //         <Item.Meta>
                                    //             {post.author.photoURL ? (
                                    //                 <Image src={post.author.photoURL} />
                                    //             ) : ( 
                                    //                 <Icon name="user circle"/>
                                    //             )}
                                    //             {post.topic} · {post.author.displayName || "User"}
                                    //         </Item.Meta>
                                    //         <Item.Header>{post.title}</Item.Header>
                                    //         <Item.Description>{post.content}</Item.Description>
                                    //         <Item.Extra>
                                    //             Comment {post.commentsCount || 0} · Like {post.likedBy?.length || 0}
                                    //         </Item.Extra>
                                    //     </Item.Content>
                                    // </Item>
                                );
                                })  
                            }
                        </Item.Group> */}


                        <Grid>
                            {/* 每个Grid.Row将作为一个帖子的容器 */}
                            <Grid.Row>
                                {posts.map((post) => (
                                    // 为每个帖子分配相等的空间，如果希望一行显示三个帖子，则每个Grid.Column宽度为16/3
                                    // 注意这里我们使用了Math.floor来确保宽度为整数
                                    // <Grid.Column key={post.id} width={Math.floor(16 / 2)}>
                                    // <Grid.Column key={post.id} width={Math.floor(5.3333)}>
                                    <Grid.Column key={post.id} mobile={16} tablet={8} computer={5}>
                                        <Post post={post} />
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                        </Grid>
                        
                        {/* an invisible line at the buttom of the web page, 
                        once scroll down to the buttom, activate onEnter and print out "test" */}

                        <Waypoint 
                            onEnter={() => {
                            // console.log("test")
                            
                            if (lastPostSnapshotRef.current) {
                                if (currentTopic) {
                                    firebase
                                        .firestore()
                                        .collection("posts")
                                        // filter and get posts with matching topic 
                                        .where("topic", "==", currentTopic)
                                        // sort posts based on data created 
                                        .orderBy("createdAt", "desc")
                                        .startAfter(lastPostSnapshotRef.current)
                                        // limit to only 3 posts on the page
                                        .limit(6)
                                        .get()
                                        .then((collectionSnapshot) =>{
                                            const data = collectionSnapshot.docs.map(docSnapshot => {
                                                const id = docSnapshot.id;
                                                return { ...docSnapshot.data(), id };
                                        });
                                        lastPostSnapshotRef.current = 
                                            collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                                        setPosts([...posts, ...data]);
                                    });
                                } else {
                                    firebase
                                        .firestore()
                                        .collection("posts")
                                        // sort posts based on data created 
                                        .orderBy("createdAt", "desc")
                                        .startAfter(lastPostSnapshotRef.current)
                                        // limit to only 3 posts on the page
                                        .limit(6)
                                        .get()
                                        .then((collectionSnapshot) =>{
                                            const data = collectionSnapshot.docs.map(docSnapshot => {
                                                const id = docSnapshot.id;
                                                return { ...docSnapshot.data(), id };
                                        });
                                        lastPostSnapshotRef.current = 
                                            collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                                        setPosts([...posts, ...data]);
                                    });
                                    }  
                                }
                            }
                        }/>
                    </>
        //             </Grid.Column>

        //             <Grid.Column width={3}>Space</Grid.Column>
        //         </Grid.Row>    
        //     </Grid>
        // </Container>
    );
}

export default Posts;
