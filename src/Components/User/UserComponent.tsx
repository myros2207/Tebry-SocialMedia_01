import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import UserPostComponent from "../Post/UserPostComponent";
import {IPost} from "../Post/Abstract/IPost";
import NavbarComponent from "../UI/NavbarComponent";
import {Avatar, Box, Button, Center, Container, Flex, Heading, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import FooterComponent from "../UI/FooterComponent";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";
const UserComponent = () => {

    const store = useSelector((state: State) => state)

    const params = useParams();

    const navigate = useNavigate();

    const [posts, setPosts] = useState<IPost[]>([]);
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followers, setFollowers] = useState<number>(0)
    const [followed, setFollowed] = useState<number>(0)
    const [statusFollowing, setSatatusFollowing] = useState<any>("")
    const [userFirstName, setUserFirstName] = useState("")
    const [userSecondName, setUserSecondName] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        const LoadInfo = async() => {
            try{
                const response = await axios.post('http://194.181.109.242:3333/getAllAccountInfo', {
                    "login": params.userLogin
                })

                console.log(response.data)

                if(response.data.Followers.includes(store.Login)){
                    setIsFollowing(true)
                    setSatatusFollowing(<Text>Unfollow</Text>)
                }
                else{
                    setIsFollowing(false)
                    setSatatusFollowing(<Text>Follow</Text>)
                }

                setFollowers(response.data.Followers.length)
                setFollowed(response.data.Followed.length)
                setUserFirstName(response.data.FirstName)
                setUserSecondName(response.data.SecondName)
                setRole(response.data.Role)
            }
            catch{
                setFollowed(0)
            }
        }

        const LoadPosts = async () => {
            try {
                const axiosPosts = await axios.post('http://194.181.109.242:3333/getAllChoosedUserPosts', {
                    "login": store.Login,
                    "userLogin": params.userLogin
                })

                await setPosts(axiosPosts.data)
                await LoadInfo()


                console.log(isFollowing)
            }
            catch {
                console.log("error -_-")
            }
        }

        const CheckAccount = () => {
            if(params.userLogin === store.Login) {
                navigate("/myAccount")
            }
            else{
                return
            }
        }

        CheckAccount()
        LoadPosts();

    }, []);


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
        await IsFollow()
    }

    const IsFollow = async () => {
        try{
            const response = await axios.post('http://194.181.109.242:3333/followers', {
                "login": store.Login
            })
            console.log(response.data)
            setFollowers(response.data.length)
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
                                    <Text color={'gray.500'}>{role}</Text>
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

                {posts.map((post, index) => <UserPostComponent PostId={post.PostId} PostTitle={post.PostTitle} PostContent={post.PostContent} PostAuthor={post.PostAuthor} IsLiked={post.IsLiked} key={index}/>)}
            </Container>
            <FooterComponent></FooterComponent>
        </>
    );
};

export default UserComponent;
