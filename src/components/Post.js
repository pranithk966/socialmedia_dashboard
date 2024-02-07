import {Item, Image, Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";

function Post({post}) {
    return (
        <Item as={Link} to={`/posts/${post.id}`}>
        {/* use photo uploaded or default image */}
        <Item.Image 
            src={post.imageURL || "https://react.semantic-ui.com/images/wireframe/image.png"} 
            size="medium"
        />
        <Item.Content>
            <Item.Meta>
                {post.author.photoURL ? (
                    <Image src={post.author.photoURL} avatar />
                ) : ( 
                    <Icon name="user circle"/>
                )}{" "}
                {post.topic} · {post.author.displayName || "User"}
            </Item.Meta>
            <Item.Header>{post.title}</Item.Header>
            <Item.Description>{post.content}</Item.Description>
            <Item.Extra>
                Comment {post.commentsCount || 0} · Like {post.likedBy?.length || 0}
            </Item.Extra>
        </Item.Content>
    </Item>
    )
}

export default Post;