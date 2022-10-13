import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { IPost } from '../Post/Abstract/IPost';
import UserPostComponent from "../Post/UserPostComponent";
import useElementOnScreen from "../../Hooks/useElementOnScreen";
import { useTimeout } from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const MainPagePostsListComponent = () => {

    const store = useSelector((state: State) => state)

    const [posts, setPosts] = useState<IPost[]>([]);
    const postsToGet = useRef<number>(0);
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });

    useEffect(() => {
        postsToGet.current = 10;
        GetPosts()

    }, [])

    useEffect(() => {
        if (isVisible) {
            postsToGet.current += 10;
            GetPosts()
        }
    }, [isVisible])

    const GetPosts = async () => {
        const response = await axios.post('http://194.181.109.242:3333/getPosts', {
            "amountToGet": postsToGet.current,
            "login": store.Login
        });
        setPosts(response.data[0]);
    }

    return (
        <div>
            <p>{posts.map((p, index) => <UserPostComponent title={p.title} description={p.description} author={p.author} key={index} />)}</p>
            <h1 //@ts-ignore
                ref={containerRef}></h1>
        </div>
    );
};

export default MainPagePostsListComponent;