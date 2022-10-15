import React, { useState } from 'react';
import NavbarComponent from "../UI/NavbarComponent";
import axios from 'axios';
import CommentsListComponent from "./CommentsListComponent";
import { useParams } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";
import {Box, Button, Center, Input} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const CreateCommentComponent = () => {

    const store = useSelector((state: State) => state)

    const [comment, setComment] = useState<string>("")

    const params = useParams()

    const CreateComment = async () => {
        try{
            const response = await axios.post('http://194.181.109.242:3333/comment', {
                "postId": params.postId,
                "content": comment,
                "login": store.Login,
                "token": store.Token
            })
            console.log(response.data)
            window.location.reload()
        }catch{ }
    }

    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <Center>

            <CommentsListComponent/>
                <Box
                    borderRadius={10}
                    bg={"cyan.600"}
                pos={"fixed"}
                bottom={"4rem"}
                p={5}>
                <Input type="text" value={comment} onChange={event => {
                    setComment(event.target.value)
                }}  placeholder={"Write Your Comment!"}/>
                <Button onClick={CreateComment}>Create</Button>
                </Box>
            </Center>
        </div>
    );
};

export default CreateCommentComponent;
