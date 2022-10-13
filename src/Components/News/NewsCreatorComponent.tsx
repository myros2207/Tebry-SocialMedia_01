import React, { useState } from 'react';
import NavbarComponent from "../UI/NavbarComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Button, Center, Container, Text, Textarea } from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const NewsCreatorComponent = () => {

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

    const CreateNews = async () => {

        if (title === "" || description === "") {
            setInputError(true)
            setCreatingError(false)
            return
        }

        const response = await axios.post("http://localhost:3333/news", {
            "title": title.toString(),
            "description": description.toString(),
            "login": store.Login,
            "token": store.Token
        });


        if (response.data !== false)
            navigate('/news');
        else
            setCreatingError(true)

    }

    return (
        <>
            <NavbarComponent></NavbarComponent>
            <Container mt="3vh">
                <Center>
                <Text fontSize={["1rem", "3rem"]}>Create news!</Text>
                </Center>
                <Text>News title:</Text>
                <Textarea onChange={OnChangeTitle} value={title} placeholder="News title" />
                <Text>News content:</Text>
                <Textarea h="10rem" onChange={OnChangeDescription} value={description} placeholder="News content"></Textarea>

                <Center><Button mt="2.5vh" onClick={CreateNews}>Create</Button></Center>
                <Center><Text mt='2vh' display={inputError ? 'block' : 'none'}>You can not have empty fields when you creating post</Text></Center>
                <Center><Text mt='2vh' display={creatingError ? 'block' : 'none'}>You already have that post</Text></Center>

            </Container>
        </>
    )
};

export default NewsCreatorComponent;
