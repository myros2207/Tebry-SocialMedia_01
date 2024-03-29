import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IPost, TestimonialCardProps } from "./Abstract/IPost";
import {
    Button,
    useDisclosure,
    Box,
    Flex,
    useColorModeValue,
    chakra,
    Avatar,
    SimpleGrid,
    Image,
    Collapse,
    Icon,
    Modal, ModalOverlay, ModalBody, ModalHeader, ModalContent, ModalFooter, ModalCloseButton,
    Text,
    List, ListItem, ListIcon,
    Menu, MenuItem, MenuList, MenuButton,
    IconButton, Input, Textarea
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, HamburgerIcon, ArrowUpIcon, ArrowDownIcon, ViewIcon} from "@chakra-ui/icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import secureLocalStorage from "react-secure-storage"
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const YourPostComponent = (post: IPost) => {

    const store = useSelector((state: State) => state)
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState<boolean>(post.IsLiked)
    const [postId, setPostId] = useState<string>(post.PostId.toString())

    const [show, setShow] = useState(false) 
    const handleToggle = () => setShow(!show)

    const [isMorreText, setIsMorreText] = useState <boolean>(false)

    const [postLikeCount, setPostLikeCount] = useState <any>("")
    const [postLikeBy, setPostLikeBy] = useState <any> ([])

    const [title, setTitle] = useState<string>(post.PostTitle)
    const [content, setContent] = useState<string>(post.PostContent)

    const [isEdit, setIsEdit] = useState <boolean>(false)





    const backgrounds = [
        `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
    ];
    const likedPostPhoto = require("../../Assets/like.png")
    const dontLikedPostPhoto = require("../../Assets/dontLike.png")
    const commentPost = require("../../Assets/chat.png")
    useEffect(() => {
         const ChekLongDescription = async () => {
        if (post.PostContent.length > 100){
            setIsMorreText(true)
        }
        await LikeCount ()
    }
        ChekLongDescription()
    }, [])

   
    const LikeCount = async () => {

        try{
           const like =  await axios.get("http://194.181.109.242:3333/postLikedBy/" + postId)
            console.log(like.data + postId)
            setPostLikeCount(like.data.length)
            setPostLikeBy(like.data.reverse())
        }
        catch {

        }
    }
     const IsPostLiked = async () => {
        try {
            setPostId(post.PostId.toString())

            const isLiked = await axios.post('http://194.181.109.242:3333/isPostLiked', {
                "postId": post.PostId,
                "login": store.Login
            })
            setIsLiked(isLiked.data)
        }
        catch {

        }
    }

    const LikePost = async () => {

        try {
            await axios.post('http://194.181.109.242:3333/like', {
                "postId": post.PostId,
                "login": store.Login,
                "token": store.Token
            })

            await IsPostLiked()
            await LikeCount()
        }
        catch { }
    }
    const testimonials = [
        {
            title: title,

            content: content

        },
    ];

        const { isOpen, onOpen, onClose } = useDisclosure()

        // const { isOpenDelete, onOpenDelete, onCloseDelete } = useDisclosure()



    function TestimonialCard(props: TestimonialCardProps) {
        const { title, content, index, } = props;


        const DeletePost = async () => {
            await axios.delete('http://194.181.109.242:3333/removePost', {
                data: {
                    "postId": post.PostId,
                    "login": store.Login,
                    "token": store.Token,
                }
            });
            window.location.reload();

        }


        const store = useSelector((state: State) => state)



        //@ts-ignore
        const [newTitle, setNewTitle] = useState<string>(() => {
            return post.PostTitle;
        });

        //@ts-ignore
        const [newContent, setNewContent] = useState<string>(() => {
            return post.PostContent;
        });

        const OnChangeNewTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNewTitle(e.target.value);
        }

        const OnChangeNewContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNewContent(e.target.value);
        }

        const OpenEditPost = () => {
            setIsEdit(true)
        }
        const SendEditPost = async () => {
            const response = await axios.post("http://194.181.109.242:3333/post", {
                "postId": post.PostId,
                "title": newTitle,
                "content": newContent,
                "login": store.Login,
                "token": store.Token
            });
            setIsEdit(false)
            setTitle(newTitle)
            setContent(newContent)
            setNewTitle(newTitle)
            setNewContent(newContent)
        }

//         

return (
            <Flex
                boxShadow={'lg'}
                maxW={'540px'}
                direction={{ base: 'column-reverse', md: 'row' }}
                width={['20rem', '35rem']}
                rounded={'xl'}
                p={10}
                justifyContent={'space-between'}
                position={'relative'}
                bg={useColorModeValue('white', 'gray.800')}
                _after={{
                    content: '""',
                    position: 'absolute',
                    height: '21px',
                    width: '29px',
                    left: '35px',
                    top: '-10px',
                    backgroundSize: 'cover',
                    backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
                }}
                _before={{
                    content: '""',
                    position: 'absolute',
                    zIndex: '-1',
                    height: 'full',
                    maxW: '640px',
                    width: 'full',
                    filter: 'blur(40px)',
                    transform: 'scale(0.98)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    top: 0,
                    left: 0,
                    backgroundImage: backgrounds[index % 4],
                }}>

                <Flex
                    w={isEdit? ["15rem","28rem"] : ["13rem", "20rem"]}
                    direction={'column'}
                    textAlign={'left'}
                    justifyContent={'space-between'}>

                    <Box>
                    <chakra.p
                        display={isEdit ? "none": "content"}
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        fontSize={'25px'}
                        pb={4}>
                        {title}
                    </chakra.p>
                        <Textarea mb={5} display={isEdit ? "content": "none"} placeholder="New Title" onChange={OnChangeNewTitleInput} value={newTitle}></Textarea>
                    <chakra.p
                        display={isEdit ? "none": "content"}
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        fontSize={'15px'} 
                        pb={4}> 
                       <Collapse startingHeight={isMorreText? 90 : "100%"} in={show}>
                            {content}
                        </Collapse>
                        <Box color="purple.300"cursor={"pointer"} display={isMorreText? "contents" : "none"}  onClick={handleToggle} mt='2rem'>
                          <Icon as={show ? ArrowUpIcon : ArrowDownIcon }/>  Show {show ? 'Less' : 'More'}
                        </Box>
                    </chakra.p>
                        <Textarea display={isEdit ? "content": "none"} placeholder="New Content" onChange={OnChangeNewContent} value={newContent}></Textarea>
                        </Box>


                    <Flex display={isEdit ? "none": "flex"}>
                        <Box cursor="pointer" w={"3rem"} h={"3rem"} backgroundSize={"3rem"} bgRepeat={"none"} backgroundImage={isLiked ? likedPostPhoto : dontLikedPostPhoto} onClick={LikePost}></Box>
                        <Link to={"/account/" + postId + "/comment"}><Image ml={3} w={"3rem"} h={"3rem"} src={commentPost}></Image></Link>
                    </Flex>
                    <Text  display={isEdit ? "none": "content"} cursor="pointer" onClick={onOpen}>liked by  {postLikeCount}</Text>

                    <Button mb={3} display={isEdit ? "flex": "none"} onClick={SendEditPost}>End edit post</Button>
                    <Button display={isEdit ? "flex": "none"} onClick={DeletePost}>Delete post</Button>

                    <Box display={isEdit ? "none": "content"} >
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent display={isEdit ? "none": "content"}>
                            <ModalHeader>Likes</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <List>

                                    { postLikeBy.map((persons :string) =>
                                            <ListItem><ListIcon as={ViewIcon}/> <Link to={"../account/" +persons}>{persons}</Link></ListItem>
                                        )}
                                </List>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    </Box>
                </Flex>

                        <Menu>
                            <MenuButton display={isEdit ? "none": "content"}
                                // float={"right"}
                                position={"absolute"}
                                ml={["13rem", "25rem"]}
                                top={"2rem"}
                                w={"10%"}
                                // position={"absolute"} right={"-16rem"}  bottom={"9rem"}
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem icon={<DeleteIcon />} onClick={DeletePost}>
                                    <Text>Delete</Text>
                                </MenuItem>
                                <MenuItem icon={<EditIcon />} onClick={OpenEditPost}>
                                    {/*() => { navigate("../myAccount/posts/editPost/" + post.PostTitle.toString() + "&" + post.PostContent.toString()) }*/}

                                    <Text>Edit Post</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
            </Flex>
        );
    }

    return (
        <>

            <Flex
                textAlign={'center'}
                pt={10}
                justifyContent={'center'}
                direction={'column'}
                width={'full'}>

                <SimpleGrid
                    // columns={{ base: 1, xl: 2 }}
                    spacing={'20'}
                    mt={16}
                    mx={'auto'}>
                    {testimonials.map((cardInfo, index) => (
                        <TestimonialCard {...cardInfo} index={index} />
                    ))}
                    
                </SimpleGrid>

            </Flex>


        </>
    );
};

export default YourPostComponent;