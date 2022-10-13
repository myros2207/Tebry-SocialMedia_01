import React from 'react';
import NavbarComponent from "../UI/NavbarComponent";
import MainPagePostsListComponent from "./MainPagePostsListComponent";
import FooterComponent from "../UI/FooterComponent";
import {Box, Center, Text} from "@chakra-ui/react";



const HomePageComponent = () => {
    return (
        <div>
            <NavbarComponent />

            <Center><Text>Home</Text></Center>
            <MainPagePostsListComponent/>

            <FooterComponent />
        </div>
    );
};

export default HomePageComponent;