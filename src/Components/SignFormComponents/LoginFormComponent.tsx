import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
    Alert,
    AlertIcon, AlertTitle,
    Box,
    Button, Center,
    Container,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Text
} from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";
import {State} from "../../redux/reducers/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import { actionCreator } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import {StateModel} from "../../Model/StateModel";



const LoginFormComponent = () => {

    const dispatch = useDispatch();

    const store = useSelector((state: State) => state)

    const {SetLogin, Login, SetToken} = bindActionCreators(actionCreator, dispatch)

    const navigate = useNavigate();

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorLogin, setErrrorLogin] = useState<any>("")



    const OnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }

    const OnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }


    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const LoginAccount = async () => {

        if (login === "" || password === "") {
            setErrrorLogin(<Alert status='error'>
                <AlertIcon />
                <AlertTitle color={"black"}>To pole nie możę być puste</AlertTitle>
            </Alert>)
            return;
        }
        try {
            const response = await axios.post('http://194.181.109.242:3333/login', {
                "login": login,
                "password": password
            });

            if (response.data.Token === "") {
                setErrrorLogin(
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle color={"black"}>Złe hasło lub login</AlertTitle>
                    </Alert>)
                return
            }

            Login(new StateModel(login, response.data.Token, response.data.Role))

            console.log(store)

            console.log('Login successfully')
            navigate("/myAccount")
            //window.location.reload()
        }
        catch {
            setErrrorLogin(<Alert status='error'>
                <AlertIcon />
                <AlertTitle color={"black"}>Złe hasło lub login</AlertTitle>
            </Alert>)
            console.log("error :)")
        }
    }

    const pageHeight = document.documentElement.scrollHeight
    const loginImage = require('../../Assets/login-ilustration.png')

    return (
        <>
            <Flex>

                <Box color="purple" bgSize={"100%"} w={"100%"} h={"100%"}>
                    <Box h={pageHeight} w={"100%"} position={"absolute"} zIndex="1"
                        bgPosition={"center center"}
                        bgAttachment={"fixed"}
                        bgRepeat={"no - repeat"}
                        bgSize={"cover"}
                        bgImage={loginImage}></Box>
                    <Box 
                    position={"relative"} zIndex="4" 
                        h={"100vh"}

                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        alignContent={"center"}
                        justifyContent={"center"}
                        justifyItems={"center"}
                     
                    >

                        <Container borderRadius={"10"} boxShadow='dark-lg' bg={"white"} w={["100%", "70%"]} color={"black."} >
                            <Center>< Text color="purple" mt="5 " fontSize='4xl'>Witamy w TEBRY</Text></Center>
                            <Box>{errorLogin}</Box>
                            <label> <Text color={"b"}>Login</Text></label>
                            <Input

                                type="text"
                                value={login}
                                onChange={OnChangeLogin}
                                placeholder="enter login"
                                bg={"purple.200"}
                            />
                            <label>Password</label>
                            <InputGroup size='md'>

                                <Input
                                    
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={OnChangePassword}
                                    bg={"purple.200"}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Button colorScheme={"purple"} mt={"1rem"} onClick={LoginAccount}>Login</Button>
                            <Center flexDirection={"column"}>

                                <Text bg={"white"} color={"purple"}>Nie masz konta w TEBRY?</Text>
                                <Text mb={"5"} bg="white" color={"yellow.500"}><Link to="/register">Stwórz go!</Link></Text>
                            </Center>
                        </Container>
                    </Box>
                </Box>

            </Flex>

        </>
    );
};

export default LoginFormComponent;