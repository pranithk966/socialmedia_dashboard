import React from "react";

import { 
    Header,
    Button, 
    Segment, 
    Modal, 
    Input, 
    Image } from "semantic-ui-react";

import firebase from "../utils/firebase";

function MyName({ user }) {

    // const user = firebase.auth().currentUser || {};

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [displayName, setDisplayName] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);

    function onSubmit() {
        setIsLoading(true);
        user
        .updateProfile({
            // displayName: displayName,
            displayName,
        })
        .then(() => {
            setIsLoading(false);
            setDisplayName("");
            setIsModalOpen(false);
        })
    }

    return (
        <>
            <Header size="small">
                Account name
                {/* floated="right" will locate button on right-hand side */}
                <Button floated="right" onClick={() => setIsModalOpen(true)}>
                    Edit
                </Button>
            </Header>
            <Segment vertical>
                {user.displayName}
            </Segment>
            {/* after activating modal, a new screen will pop up */}
            <Modal open={isModalOpen} size="mini">
                <Modal.Header>Edit username</Modal.Header>
                <Modal.Content>
                    <Input 
                        placeholder="New username"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        // fluid extend input section size
                        fluid
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={onSubmit} loading={isLoading}>Edit</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

function MyPhoto({ user }) {

    // const user = firebase.auth().currentUser || {};

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [file, setFile] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(false);

    // preview photo uploaded
    const previewImageUrl = file ? URL.createObjectURL(file) : user.photoURL;

    // function to upload photo of user
    function onSubmit() {
        
        setIsLoading(true);

        // get the object
        const fileRef = firebase.storage().ref("user-photos/" + user.uid)
        // upload file of photo
        const metadata = {
            contentType: file.type,
        };
        // upload file of photo
        fileRef.put(file, metadata).then(() => {
            // get url of file uploaded
            fileRef.getDownloadURL().then((imageURL) => {
                user
                .updateProfile({
                    photoURL: imageURL,
                })
                .then(() => {
                    setIsLoading(false);
                    setFile(null);
                    setIsModalOpen(false);
                })
            })
        });
    }

    return (
        <>
            <Header size="small">
                Member photo
                {/* floated="right" will locate button on right-hand side */}
                <Button floated="right" onClick={() => setIsModalOpen(true)}>
                    Edit
                </Button>
            </Header>
            <Segment vertical>
                <Image src={user.photoURL} avatar/>
            </Segment>
            <Modal open={isModalOpen} size="mini">
                <Modal.Header>Edit user photo</Modal.Header>
                <Modal.Content image>
                    <Image src={previewImageUrl} avatar wrapped/>
                    <Modal.Description>
                        {/* clicking htmlFor="post-image" activates the next line having the same id */}
                        <Button as="label" htmlFor="post-image">
                            Upload
                        </Button>
                        <Input
                            type="file" 
                            id="post-image" 
                            style={{ display: "none" }} 
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={onSubmit} loading={isLoading}>Edit</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

function MyPassword({ user }) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [oldPassword, setOldPassword] = React.useState("");

    const [newPassword, setNewPassword] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);

    function onSubmit() {
        setIsLoading(true);
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldPassword
        );
        user.reauthenticateWithCredential(credential).then(() => {        
            user.updatePassword(newPassword).then(() => {
                setIsModalOpen(false);
                setOldPassword("");
                setNewPassword("");
                setIsLoading(false);
            });
        });
    }

    return (
        <>
            <Header size="small">
                Member password
                {/* floated="right" will locate button on right-hand side */}
                <Button floated="right" onClick={() => setIsModalOpen(true)}>
                    Edit
                </Button>
            </Header>
            <Segment vertical>
                *********
            </Segment>
            <Modal open={isModalOpen} size="mini">
                <Modal.Header>Change user password</Modal.Header>
                <Modal.Content>
                    <Header size="small">Current password</Header>
                    <Input
                        type="Current password" 
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        // fluid extend input section size
                        fluid
                    />
                <Header size="small">New password</Header>
                    <Input
                        type="New password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        // fluid extend input section size
                        fluid
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={onSubmit} loading={isLoading} >Save</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

function MySettings ({user}) {
    // return "Member info"


    // use monitoring function from App.js
    // const [user, setUser] = React.useState({});
    // React.useEffect(() => {
    //     firebase.auth().onAuthStateChanged((user) =>{
    //         setUser(user || {});
    //     });
    // }, []);

    // const user = firebase.auth().currentUser || {};

    return (
    <>
        <Header>
            Member information
        </Header>

        <MyName user={user}/>

        <MyPhoto user={user}/>

        <MyPassword user={user}/>

    </>
    );
}

export default MySettings;
