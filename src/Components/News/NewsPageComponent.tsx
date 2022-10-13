import React from 'react';
import NavbarComponent from "../UI/NavbarComponent";
import NewsListComponent from "./NewsListComponent";
import FooterComponent from "../UI/FooterComponent";
import { Center, Text } from "@chakra-ui/react";

const NewsPageComponent = () => {
    return (
        <>
            <NavbarComponent />
            <Center>
                <Text textAlign={"center"} fontFamily={"Anton"} mt="4" fontSize={["3rem","5rem"]}>Time to news </Text>
            </Center>
            <NewsListComponent />
            <FooterComponent />
        </>
    );
};

export default NewsPageComponent;
