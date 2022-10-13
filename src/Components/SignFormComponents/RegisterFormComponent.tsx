import React, {useEffect, useState} from 'react';
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

    const [secondName, setSecondName] = useState<string>("");

    const [login, setLogin] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [repeatPassword, setRepeatPassword] = useState<string>("")

    const [errorRegister, setErrorRegister] = useState<any>("")

    const [show, setShow] = useState<boolean>(false)

    const [isDisable, setIsDisable] = useState(false)

    const navigate = useNavigate();

    const handleClick = () => setShow(!show)

    const OnChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const OnChangeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondName(e.target.value);
    }

    const OnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
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

        if (login === "" || password === "") {
            console.log("Incorrect login or password")
            return;
        }
        try {
            const response = await axios.post('http://localhost:3333/register', {
                "firstName": firstName,
                "secondName": secondName,
                "login": login,
                "password": password
            });

            if (response.data === true && password === repeatPassword) {
                navigate('/login');
                return;
            }
            if (response.data === false) {
                setErrorRegister(<Alert status='error'>
                    <AlertIcon />
                    <AlertTitle color={"black"}>Taki użytkownik już jest)</AlertTitle>
                </Alert>)
            }

            if ( password !== repeatPassword){
                setErrorRegister(<Alert status='error'>
                <AlertIcon />
                <AlertTitle color={"black"}>Hasło się róznią</AlertTitle>
            </Alert>)
            }
        }
        catch {

        }
    }

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
                                bg={"red.100"} />
                            <label>Nazwisko: </label>
                            <Input
                                type="text"
                                value={secondName}
                                onChange={OnChangeSecondName}
                                placeholder={"Podaj nazwisko"}
                                bg={"red.100"} />
                            <label>Login: </label>

                            <Input
                                type="text"
                                value={login}
                                onChange={OnChangeLogin}
                                placeholder="enter login"
                                bg={"red.100"} />
                            <label>Hasło: </label>

                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={OnChangePassword}
                                    bg={"red.100"}
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
                           bg={"red.100"}></Input>
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