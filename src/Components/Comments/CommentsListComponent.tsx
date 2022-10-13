import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentComponent from "./CommentComponent";
import { IComment } from "./IComment";
import { Box, Text, Image } from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const CommentsListComponent = () => {

    const store = useSelector((state: State) => state)

    const [comments, setComments] = useState<IComment[]>([])
    const [dontHaveComments, setDontHaveComments] = useState<any>()
    const params = useParams();

    useEffect(() => {
        const GetComments = async () => {
            const response = await axios.post('http://localhost:3333/getAllCommentsFromPost', {
                "postId": params.postId
            })
            if (response.data.length === 0) {
                const commentImage = require("../../Assets/comment.png")
                setDontHaveComments(
                    <Box h={"50rem"}
                        alignItems='center'
                        justifyContent='center'>
                        <Image boxSize={"10rem"} src={commentImage}
                            h={"10rem"}
                            alignItems='center'
                            justifyContent='center' />
                    </Box>
                )
            }

            setComments(response.data.reverse())
        }

        GetComments()
    }, [])

    return (
        <div>
            <Box>{dontHaveComments}</Box>
            <Box mb={"13rem"}>{comments.map((c, i) => <CommentComponent comment={c.comment} author={c.author} key={i} />)}</Box>
        </div>
    );
};
export default CommentsListComponent;