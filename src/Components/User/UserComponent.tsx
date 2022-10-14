import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import UserPostComponent from "../Post/UserPostComponent";
import {IPost} from "../Post/Abstract/IPost";
import NavbarComponent from "../UI/NavbarComponent";
import {Avatar, Box, Button, Center, Container, Flex, Heading, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";
import FooterComponent from "../UI/FooterComponent";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";
const UserComponent = () => {

    const store = useSelector((state: State) => state)

    const params = useParams();

    const [posts, setPosts] = useState<IPost[]>([]);
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followers, setFollowers] = useState<number>(0)
    const [followed, setFollowed] = useState<number>(0)
    const [statusFollowing, setSatatusFollowing] = useState<any>("")
    const [userFirstName, setUserFirstName] = useState("")
    const [userSecondName, setUserSecondName] = useState("")

    useEffect(() => {
        const GetFollowed = async() => {
            try{
                const response = await axios.post('http://194.181.109.242:3333/getFolloweds', {
                    "userLogin": params.userLogin
                })
                await setFollowed(response.data[0].length)
            }
            catch{
                setFollowed(0)
            }
        }

        const LoadPosts = async () => {
            try {
                const axiosPosts = await axios.post('http://194.181.109.242:3333/getAllUserPosts', {
                    "login": params.userLogin
                })
                await IsFollow()
                await setPosts(axiosPosts.data[0])
                await GetFollowers()
                await GetFollowed()
                await GetInfoUser()


                console.log(isFollowing)
            }
            catch {
                console.log("error -_-")
            }
        }

        LoadPosts();

    }, []);

    const GetFollowers = async() => {
        try {
            const response = await axios.post('http://194.181.109.242:3333/getFollowing', {
                "userLogin" : params.userLogin
            })
            await setFollowers(response.data[0].length)
        }
        catch{

        }
    }

    const FollowUser = async () => {
        const follow = await axios.post('http://194.181.109.242:3333/follow', {
            "login": store.Login,
            "token": store.Token,
            "loginToFollow": params.userLogin
        })
        console.log(follow.data)

        if (follow.data === true){
            setIsFollowing(true)
            setSatatusFollowing(<Text>Unfollow</Text>)
        }

        else if(follow.data === false){
            setIsFollowing(false)
            setSatatusFollowing(<Text>Follow</Text>)
        }
        await GetFollowers()
        await IsFollow()
    }

    const GetInfoUser = async () =>{
        const infoUser = await axios.post('http://194.181.109.242:3333/getInfo', {
            "login": params.userLogin,
        })
        setUserFirstName(infoUser.data.FirstName)
        setUserSecondName(infoUser.data.SecondName)
    }

    const IsFollow = async () => {
        try{
            const isFollow = await axios.post('http://194.181.109.242:3333/isFollowing', {
                "followingUserId": store.Login,
                "followUserId": params.userLogin
            })

            if (isFollow.data === true) {
                setIsFollowing(true);
                setSatatusFollowing(<Text>Unfollow</Text>)
            } else {
                setIsFollowing(false)
                setSatatusFollowing(<Text>Follow</Text>)
            }
        }
        catch{
            console.log("error :)")
        }
    }

    return (
        <>
            <NavbarComponent></NavbarComponent>

            <Container pt={["4.5rem", "0"]}>
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
                                        name={userFirstName}
                                        src={"src='https://bit.ly/broken-link'"}
                                        css={{
                                            border: '2px solid white',
                                        }}
                                    />

                                </Flex>
                                <Stack spacing={0} mb={5}>
                                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                        {userFirstName} {userSecondName}
                                    </Heading>
                                    <Text color={'gray.500'}>Uczen (potom)</Text>
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
                                    <Text fontSize={"2rem"} align={"center"}>{params.userLogin}</Text>
                                </Box>
                            </Container>
                        </Flex>

                        <Box p={6}>
                            <Button
                                onClick={FollowUser}
                                w={'full'}
                                // mt={8}
                                bg={isFollowing  ? "gray.900" : "blue"}
                                color={'white'}
                                rounded={'md'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}>
                                {statusFollowing}
                            </Button>
                        </Box>
                    </Box>
                </Center>






                <h1>{posts.map(post => <UserPostComponent title={post.title} description={post.description} author={post.author}/>)}</h1>
            </Container>
            <FooterComponent></FooterComponent>
        </>
    );
};

export default UserComponent;
