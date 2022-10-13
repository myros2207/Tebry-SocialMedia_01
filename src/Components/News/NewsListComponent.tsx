import React, { useEffect, useRef, useState } from 'react';
import { IPost } from "../Post/Abstract/IPost";
import useElementOnScreen from "../../Hooks/useElementOnScreen";
import axios from "axios";
import UserPostComponent from "../Post/UserPostComponent";
import NewsComponent from "./NewsComponent";
import { INews } from "./INews";

const NewsListComponent = () => {
    const [posts, setPosts] = useState<INews[]>([]);
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
        const response = await axios.post('http://194.181.109.242:3333/getNews', {
            "amountToGet": postsToGet.current
        });
        setPosts(response.data[0]);
    }
    
    return (
        <div>
            <p>{posts.map((n, index) => <NewsComponent newsTitle={n.newsTitle} newsContent={n.newsContent} date={n.date} key={index} />)}</p>
            <h1 //@ts-ignore
                ref={containerRef}></h1>
        </div>
    );
};

export default NewsListComponent;