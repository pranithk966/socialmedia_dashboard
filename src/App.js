// App.js file contain all domain address of pages

// nested routes
// https://www.youtube.com/watch?v=bj5SW7_FvVs&list=PLddLA9QpG2T2__tPfi6nwaL8Rf_wWQaz7&index=19


// For react-router-dom v6, simply replace Redirect with Navigate
// https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom

// how to update code
// https://www.youtube.com/watch?v=5alyWQnEsls&list=PLddLA9QpG2T2__tPfi6nwaL8Rf_wWQaz7&index=30

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import { Container, Grid } from "semantic-ui-react";

import React from "react"


import HomePage from "./HomePage"; // Import the new component


import firebase from "./utils/firebase"


import Header from "./Header";


import Signin from "./pages/Signin";

import Posts from "./pages/Posts";

import NewPost from "./pages/NewPost";

import Post from "./pages/Post";

import MyPosts from "./pages/MyPosts";

import MyCollections from "./pages/MyCollections";

import MySettings from "./pages/MySettings";


import Topics from "./components/Topics";

import MyMenu from "./components/MyMenu";

// App() function sets up domain address for the web application
// function App() {
//     // return "Hello! Social Platform!"
//     return (
//         <BrowserRouter>
//             <Header />
//             <Routes>
                
//                 {/* call function from Posts.js */}
//                 {/* <Route path="/" element="Homepage"> */}
//                 <Router>
//     );
// }Route path="/posts" element={<Posts/>}>
//                 </Route>

//                 {/* call function from Signin.js */}
//                 <Route path="/signin" element={<Signin />}>    
//                 </Route>

//                 {/* call function from NewPost.js */}
//                 <Route path="/new-post" element={<NewPost />}>    
//                 </Route>

//                 {/* function to direct to domain address of each post */}
//                 {/* <Route path="/posts/:postId" element="Hello, Post" exact> */}
//                 <Route path="/posts/:postId" element={<Post />} exact>
//                 </Route>

//             </Routes>
//         </Browser>

const PostViewLayout = () => {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Topics />
            </Grid.Column>
            <Grid.Column width={10}>
              <Outlet />
            </Grid.Column>
            {/* <Grid.Column width={3}>Space</Grid.Column> */}
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  };
  
  const MyAccountLayout = () => {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              {/* <Topics /> */}
              {/* Member Center */}
                <MyMenu />
            </Grid.Column>
            <Grid.Column width={10}>
              <Outlet />
            </Grid.Column>
            {/* <Grid.Column width={3}>Space</Grid.Column> */}
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  };

function App() {

    const [user, setUser] = React.useState();

    // monitoring user status
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, [])


    return (



      <BrowserRouter>
        <Header user={user}/>
        <Routes>

            <Route path="/" element={<HomePage />} /> {/* Set the home page route */}


            <Route exact path="/posts" element={<PostViewLayout />}>
                <Route path="/posts" element={<Posts />} exact />
                {/* For react-router-dom v6, simply replace Redirect with Navigate */}
                <Route path="/posts/:postId" element={user !== null ? <Post /> : <Navigate to="/posts"/>} exact />
            </Route>
    
            {/* <Route path="/my" element={<MyAccountLayout />}> */}
            <Route path="/my" element={user !== null ? <MyAccountLayout/> : <Navigate to="/posts"/>}>
                <Route path="/my/posts" element={<MyPosts />} exact />
                {/* <Route path="/my/posts" element={user ? <MyPosts/> : <Navigate to="/posts"/>} exact /> */}
                <Route path="/my/collections" element={<MyCollections/>} exact />
                <Route path="/my/settings" element={<MySettings user={user}/>} exact />
            </Route>

             
            <Route exact path="/signin" element={user !== null ? <Navigate to="/posts" /> : <Signin/>} />
            <Route exact path="/new-post" element={user !== null ? <NewPost /> : <Navigate to="/posts"/>} />
            {/* <Route exact path="posts/:postId" element={<Post />} /> */}
            
            {/* <Route exact path="posts/:postId" element={user ? <Post /> : <Navigate to="/posts"/>} /> */}

        </Routes>
      </BrowserRouter>
    );
  }
  


export default App


// or create a new file called "PostNavigate"

// import React from 'react'
// import {Routes,Route} from 'react-router-dom'
// import { Grid ,Container,} from 'semantic-ui-react';
// import Post from './Post'
// import Posts from './Posts'
// import Topics from '../components/Topics';
// function PostNavigate() {
//   return (
//     <Container>
//          <Grid>
//         <Grid.Row>
//             <Grid.Column width={3}><Topics/></Grid.Column>
//             <Grid.Column width={10}>
//                 <Routes>
//                     <Route path="*" element={<Posts />} exact/>
//                     <Route path=":postId" element={<Post/>} exact/>
//                 </Routes>
//                 </Grid.Column>
//             <Grid.Column width={3}></Grid.Column>
//             </Grid.Row>
//         </Grid>
//     </Container>
    
//   )
// }

// export default PostNavigate;
