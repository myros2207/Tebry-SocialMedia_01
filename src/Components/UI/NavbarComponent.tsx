import {ReactNode, useEffect, useState} from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, ButtonProps, useColorMode, Image,
} from '@chakra-ui/react';

import {Link as LinkRoute, useNavigate} from "react-router-dom";
import {HamburgerIcon, CloseIcon, AddIcon,  } from '@chakra-ui/icons';
import axios from "axios";
import SearchingComponent from "../SearchingComponent/SearchingComponent";
import secureLocalStorage from "react-secure-storage";
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers/MainReducer";

const NavbarComponent =(props: ButtonProps) => {

    const store = useSelector((state: State) => state)

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [roleNavbar, setRoleNavbar] = useState<any>()

    const navigate = useNavigate();

    useEffect(() => {
       if (secureLocalStorage.getItem("Role") === "Nauczyciel"){
           setRoleNavbar(

            <Menu>
                <MenuButton
                    h={"2.5rem"}
                    as={Button}
                    variant={'solid'}
                     colorScheme={'purple'}
                     size={'sm'}
                     mr={1}
                     leftIcon={<AddIcon />}
                ></MenuButton>
                <MenuList>
                <LinkRoute to={"/newsCreating"}><MenuItem>Create news</MenuItem></LinkRoute>
                <LinkRoute to={"/postCreating"}><MenuItem>Create post</MenuItem></LinkRoute>
                </MenuList>
            </Menu>
           )
       }
       else {
           setRoleNavbar(
           <LinkRoute to={"/postCreating"}>
               <Button
                   h={"2.5rem"}
                   variant={'solid'}
                   colorScheme={'teal'}
                   size={'sm'}
                   mr={1}
                   leftIcon={<AddIcon />}>

               </Button>
           </LinkRoute>)
       }

    },);


    const LogOut = async () => {
        try {
            navigate("/login")
        }

        catch {

        }
    }

    const logo = require("../../Assets/Logo3.png")
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}
                 boxShadow={useColorModeValue("0","0px -2px 50px -10px  red")}
                position={["fixed", "static"]} w={"100%"} zIndex={100}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <LinkRoute to={"/home"}><Box ml={["6rem", "0"]}><Image boxSize={'3rem'} src={logo}/></Box></LinkRoute>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                           <LinkRoute to={'/home'}>Home</LinkRoute>
                           <LinkRoute to={'/News'}>News</LinkRoute>


                            <SearchingComponent></SearchingComponent>
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>

                            <Button
                                h={"2.5rem"}
                                mr={1}
                                aria-label="Toggle Color Mode"
                                onClick={toggleColorMode}
                                _focus={{ boxShadow: 'none' }}
                                w="fit-content"
                                {...props}>
                                {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
                            </Button>
                        <Box>
                            {roleNavbar}
                        </Box>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <LinkRoute to="/myAccount"><MenuItem>Account</MenuItem></LinkRoute>
                                <MenuItem>Setting</MenuItem>
                                <MenuItem>Dzienik/librus</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={LogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <LinkRoute to={'/home'}>Home</LinkRoute>
                            <LinkRoute to={'/News'}>News</LinkRoute>
                            <SearchingComponent></SearchingComponent>
                        </Stack>
                    </Box>
                ) : null}
            </Box>


        </>
    );
};

export default NavbarComponent