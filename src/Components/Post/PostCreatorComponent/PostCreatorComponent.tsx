import React, { ReactComponentElement, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Center, Container, Input, Button, Text, Textarea } from "@chakra-ui/react";
import NavbarComponent from "../../UI/NavbarComponent";
import secureLocalStorage from "react-secure-storage";
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers/MainReducer";

const PostCreatorComponent = () => {

    const store = useSelector((state: State) => state)

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false)
    const [creatingError, setCreatingError] = useState<boolean>(false)

    const OnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
        setInputError(false)
        setCreatingError(false)
    }

    const OnChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        setInputError(false)
        setCreatingError(false)
    }

    const CreatePost = async () => {

        if (title === "" || description === "") {
            setInputError(true)
            setCreatingError(false)
            return
        }

        const response = await axios.post("http://194.181.109.242:3333/post", {
            "postId": "0",
            "title": title.toString(),
            "content": description.toString(),
            "login": store.Login,
            "token": store.Token
        });

        if (response.data !== false)
            navigate('/myAccount');
        else
            setCreatingError(true)

    }

    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <Container mt="3vh">
                <Center>
                    <Text fontSize={["1rem", "3rem"]}>Creat post</Text>
                </Center>
                <Text>Post title:</Text>
                <Textarea onChange={OnChangeTitle} value={title} placeholder="Title post" />
                <Text>Post description:</Text>
                <Textarea h="10rem" onChange={OnChangeDescription} value={description} placeholder="Description post"></Textarea>
                <Center><Button mt="2.5vh" onClick={CreatePost}>Create</Button></Center>
                <Center><Text mt='2vh' display={inputError ? 'block' : 'none'}>You can not have empty fields when you creating post</Text></Center>
                <Center><Text mt='2vh' display={creatingError ? 'block' : 'none'}>You already have that post</Text></Center>
            </Container>
        </div>
    );
};

export default PostCreatorComponent;