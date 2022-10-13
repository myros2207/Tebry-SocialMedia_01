import React, { useState } from 'react';
import { Box, Button, Center, Container, Input, Text, Textarea } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../UI/NavbarComponent";
import secureLocalStorage from "react-secure-storage";
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers/MainReducer";

const EditPostComponent = () => {

    const store = useSelector((state: State) => state)

    const params = useParams<string>()
    const navigate = useNavigate()

    //@ts-ignore
    const [newTitle, setNewTitle] = useState<string>(() => {
        return params.postTitle;
    });

    //@ts-ignore
    const [newDescription, setNewDescription] = useState<string>(() => {
        return params.postDescription;
    });

    const OnChangeNewTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewTitle(e.target.value);
    }

    const OnChangeNewDescriptionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(e.target.value);
    }

    const EditPost = async () => {
        const postId = await axios.post('http://localhost:3333/findPost', {
            "title": params.postTitle,
            "description": params.postDescription,
            "author": store.Login
        })

        const response = await axios.post("http://localhost:3333/post", {
            "postId": postId.data,
            "title": newTitle,
            "content": newDescription,
            "login": store.Login,
            "token": store.Token
        });

        if (response.data !== false)
            navigate('../myAccount')
    }

    return (
        <>
            <NavbarComponent></NavbarComponent>
            <Box>
                <Container p={5}>
                    <Center><Text fontSize={"2rem"}>Edit post </Text></Center>
                    <Text>Title: </Text>
                    <Textarea mb={3} placeholder="New Title" onChange={OnChangeNewTitleInput} value={newTitle}></Textarea>
                    <Text >Description: </Text>
                    <Textarea placeholder="New Description" onChange={OnChangeNewDescriptionInput} value={newDescription}></Textarea>
                    <Button mt={2} float={"right"} onClick={EditPost}>OK</Button>
                </Container>

            </Box>
        </>
    );
};

export default EditPostComponent;