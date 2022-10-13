import React, { useEffect, useState } from 'react';
import UserPostsListComponent from "./UserPostsListComponent";
import NavbarComponent from "../UI/NavbarComponent";
import axios from "axios";
import {
    Center,
    Container,
    Text,
    Box,
    Flex,
    Avatar,
    useColorModeValue,
    Stack,
    Heading
} from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage"
import "./AccounPoastListStyle.css"
import FooterComponent from "../UI/FooterComponent";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const AccountMainPageComponent = () => {

    const store = useSelector((state: State) => state)

    const [youFirstName, setFirstName] = useState<string>("")
    const [youSecondName, setSecondName] = useState<string>("")

    const [followers, setFollowers] = useState<number>(0)
    const [followed, setFollowed] = useState<number>(0)

    const youRole: any = store.Role
    const youLogin: any = store.Login

    useEffect(() => {
        const GetFollowers = async () => {

            const response = await axios.post('http://194.181.109.242:3333/getFollowing', {
                "userLogin": youLogin
            })
            await setFollowers(response.data[0].length)
            console.log(response.data[0].length + "followers")

            await GetYouInfo()
            await GetFollowed()
        }
        GetFollowers()
    }, []);

    const GetFollowed = async () => {

        const response = await axios.post('http://194.181.109.242:3333/getFolloweds', {
            "userLogin": secureLocalStorage.getItem("Login")
        })
        await setFollowed(response.data[0].length)
        console.log(response.data[0].length + "followed")
    }

    const GetYouInfo = async () => {
        const info = await axios.post('http://194.181.109.242:3333/getInfo', {
            "login": secureLocalStorage.getItem("Login"),
        })

        setFirstName(info.data.FirstName)
        setSecondName(info.data.SecondName)
    }

    return (
        <div>
            <NavbarComponent/>

            <Container>
                <Center py={6}>
                    <Box
                        maxW={'40rem'}
                        w={'full'}
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Flex p={6}>
                            <Box>
                                <Flex>
                                    <Avatar
                                        size={'xl'}
                                        name={youFirstName}
                                        src={"src='https://bit.ly/broken-link'"}
                                        css={{
                                            border: '2px solid white',
                                        }}
                                    />

                                </Flex>
                                <Stack spacing={0} mb={5}>
                                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                        {youFirstName} {youSecondName}
                                    </Heading>
                                    <Text color={'gray.500'}>{youRole}</Text>
                                </Stack>
                            </Box>
                            <Container>
                                <Box>

                                    <Stack direction={'row'} justify={'center'} spacing={6}>
                                        <Stack spacing={0} align={'center'}>
                                            <Text fontWeight={600}>{followers}</Text>
                                            <Text fontSize={'sm'} color={'gray.500'}>
                                                Followers
                                            </Text>
                                        </Stack>
                                        <Stack spacing={0} align={'center'}>
                                            <Text fontWeight={600}>{followed}</Text>
                                            <Text fontSize={'sm'} color={'gray.500'}>
                                                Followed
                                            </Text>
                                        </Stack>
                                    </Stack>
                                    <Text fontSize={"2rem"} align={"center"}>{youLogin}</Text>
                                </Box>
                            </Container>
                        </Flex>
                    </Box>
                </Center>
            </Container>

            <UserPostsListComponent />
            <FooterComponent />
        </div>

    );
};

export default AccountMainPageComponent;
