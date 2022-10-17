import React, {useEffect, useState, FocusEvent} from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Alert, AlertIcon, AlertTitle,
    Box,
    Button,
    Center,
    Container,
    Divider,
    extendTheme, Flex, Image,
    Input,
    InputGroup,
    InputRightElement,
    Text
} from "@chakra-ui/react";


const RegisterFormComponent = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [errorFirstName, setErrorFirstName] = useState<any>(" ");

    const [secondName, setSecondName] = useState<string>("");
    const [errorSecondName, setErrorSecondName] = useState<any>(" ");

    const [login, setLogin] = useState<string>("");
    const [errorLogin, setErrorLogin] = useState<any>(" ");

    const [password, setPassword] = useState<string>("");

    const [repeatPassword, setRepeatPassword] = useState<string>("")

    const [errorRegister, setErrorRegister] = useState<any>(" ")

    const [show, setShow] = useState<boolean>(false)

    const [completedError, setCompletedError] = useState<any>(" ")

    const navigate = useNavigate();

    const handleClick = () => setShow(!show)

    const OnChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    const OnBlurFirstName = (blur: React.FocusEvent<HTMLInputElement>) => {
        if (firstName.length === 0 ) {
            setErrorFirstName(
                <Text color={"red"}>To pole musi być wypełnione</Text>)
            console.log("testOYu")
            return
        }
        else {
            setErrorFirstName(" ")
        }
    }

    const OnChangeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondName(e.target.value);
    }
    const OnBlurSecondName = (blur: React.FocusEvent<HTMLInputElement>) => {
        if (secondName.length === 0 ) {
            setErrorSecondName(
                <Text color={"red"}>To pole musi być wypełnione</Text>)
            console.log("testOYu")
            return
        }
        else {
            setErrorSecondName(" ")
        }
    }

    const OnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }
    const OnBlurLogin = (blur: React.FocusEvent<HTMLInputElement>) => {
        if (login.length === 0 ) {
            setErrorLogin(
                <Text color={"red"}>To pole musi być wypełnione</Text>)
            console.log("testOYu")
            return
        }
        else {
            setErrorLogin(" ")
        }
    }

    const OnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const OnChangeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    }

    useEffect(() => {
        const ChekPassword = () =>{
            if (password !== repeatPassword ) {
                console.log("dont")
            }
        }

        ChekPassword()
    }, []);

    const Register = async () => {

        if (login === "" || password === "" || repeatPassword === "" || firstName === "" || secondName === "" ) {
            console.log("Incorrect login or password")
            setErrorRegister(<Alert status='error'>
                <AlertIcon />
                <AlertTitle color={"black"}>Wszystko musi być wypełnione</AlertTitle>
            </Alert>)
            return;
        }
        try {
            const response = await axios.post('http://194.181.109.242:3333/register', {
                "firstName": firstName,
                "secondName": secondName,
                "login": login,
                "password": password
            });

            if (response.data === true && password === repeatPassword ) {
                navigate('/login');
                return

            }

            if (response.data === false) {
                setErrorRegister(<Alert status='error'>
                    <AlertIcon />
                    <AlertTitle color={"black"}>Taki użytkownik już jest)</AlertTitle>
                </Alert>)
            }

        }
        catch {

        }
    }

    const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
        if   (password !== repeatPassword ) {
            setErrorRegister(
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle color={"black"}>Hasło się róznią</AlertTitle>
                </Alert>)
        }
        if   (password === repeatPassword ) {
            setErrorRegister(
                <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle color={"black"}>Wszystko ok</AlertTitle>
                </Alert>)

        }

    };

    const registerImage = require('../../Assets/register-ilustration.png')

    const pageHeight = document.documentElement.scrollHeight

    return (

        <>
            <Flex>

                <Box color="yellow.500" bgSize={"100%"} w={"100%"} h={"100%"}>
                    <Box h={pageHeight} w={"100%"} position={"absolute"} zIndex="1"
                        bgPosition={"center center"}
                        bgAttachment={"fixed"}
                        bgRepeat={"no - repeat"}
                        bgSize={"cover"}
                        bgImage={registerImage}></Box>
                    <Box position={"relative"} zIndex="4" mt={["10rem", "10rem"]} >

                        <Container borderRadius={"10"} boxShadow='dark-lg' bg={"white"} w={["100%", "70%"]} color={"black."} >
                            <Center flexDirection={"column"}>< Text mt="5 " fontSize='4xl'>Witamy w TEBRY</Text><
                                Text fontSize={"xl"}>Register: </Text></Center>
                            <Box>{errorRegister}</Box>
                            <label>Imię :</label>
                            <Input
                                type="text"
                                value={firstName}
                                onChange={OnChangeFirstName}
                                placeholder={"Podaj Imie"}
                                bg={"red.100"}
                                onBlur={OnBlurFirstName}
                            />
                            <Text>{errorFirstName}</Text>
                            <label>Nazwisko: </label>
                            <Input
                                type="text"
                                value={secondName}
                                onChange={OnChangeSecondName}
                                placeholder={"Podaj nazwisko"}
                                bg={"red.100"}
                                onBlur={OnBlurSecondName}
                            />
                            <Text>{errorSecondName}</Text>
                            <label>Login: </label>

                            <Input
                                type="text"
                                value={login}
                                onChange={OnChangeLogin}
                                placeholder="enter login"
                                bg={"red.100"}
                                onBlur={OnBlurLogin}
                            />
                            <Text>{errorLogin}</Text>
                            <label>Hasło: </label>

                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={OnChangePassword}
                                    bg={"red.100"}
                                    onBlur={handleFocusEvent}
                                />

                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                          <label>Powtórz Hasło</label>
                          <Input
                           pr='4.5rem'
                           type={show ? 'text' : 'password'}

                           placeholder='Enter password'
                           value={repeatPassword}
                           onChange={OnChangeRepeatPassword}
                           bg={"red.100"}
                           onBlur={handleFocusEvent}></Input>
                            <Button disabled={false} colorScheme={"yellow"} mt={"1rem"} onClick={Register}>Register</Button>
                            <Center flexDirection={"column"}>
                                <Text bg={"white"}>Masz już konto w TEBRY?</Text>
                                <Text mb={"5"} bg="white" color={"purple"}><Link to="/login">Zaloguj się!</Link></Text>
                            </Center>
                        </Container>
                    </Box>
                </Box>

            </Flex>

        </>
    );
};

export default RegisterFormComponent;