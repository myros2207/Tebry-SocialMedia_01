import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IPost } from "../Post/Abstract/IPost";
import YourPostComponent from "../Post/YourPostComponent";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage"
import { Box, Image, Text, Center } from '@chakra-ui/react'
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const UserPostsListComponent = () => {

    const store = useSelector((state: State) => state)

    const [posts, setPosts] = useState<IPost[]>([]);
    const [dontHavePosts, setDontHavePosts] = useState<any>()


    useEffect(() => {
        const LoadPosts = async () => {
            try {
                const axiosPosts = await axios.post('http://194.181.109.242:3333/getAllUserPosts', {
                    "login": store.Login
                })
                if (axiosPosts.data.length === 0) {
                    const dontHavePostImage = require("../../Assets/social-media.png")
                    setDontHavePosts(
                        <Center><Image mb={"-100px"} src={dontHavePostImage}></Image></Center>
                    )
                }
                else {
                    setPosts(axiosPosts.data)
                }

                console.log(axiosPosts.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        LoadPosts();
    }, [])

    return (
        <Box>
            <>
                <Box>{dontHavePosts}</Box>
                {posts.map((post, index) => <YourPostComponent PostId={post.PostId} PostAuthor={post.PostAuthor} PostContent={post.PostContent} PostTitle={post.PostTitle} IsLiked={post.IsLiked} key={index} />).reverse()}
            </>
        </Box>
    );
};

export default UserPostsListComponent;
