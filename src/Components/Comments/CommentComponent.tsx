import React from 'react';
import { IComment, TestimonialCardProps } from "./IComment";
import { Center, Box, Text, Flex, useColorModeValue, chakra, SimpleGrid } from "@chakra-ui/react"

const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
];
const CommentComponent = (comment: IComment) => {
    const testimonials = [
        {
            title: comment.comment,
            author: comment.author
        },
    ];

    function TestimonialCard(props: TestimonialCardProps) {
        const { title, author, index } = props;


        const chatBubble = require("../../Assets/chat-bubble.png")
        return (
            <Flex
                boxShadow={'lg'}
                maxW={'540px'}
                direction={{ base: 'column-reverse', md: 'row' }}
                width={['20rem', '25rem']}
                rounded={'xl'}
                p={10}
                justifyContent={'space-between'}
                position={'relative'}
                bg={useColorModeValue('white', 'gray.800')}
                _after={{
                    content: '""',
                    position: 'absolute',
                    height: '50px',
                    width: '49px',
                    right: '15px',
                    top: '-30px',
                    backgroundSize: 'cover',
                    backgroundImage: chatBubble,
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
                    w={"full"}
                    direction={'column'}

                    justifyContent={'space-between'}>
                    <chakra.p
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        fontSize={'25px'}
                        pb={4}>
                        {title}
                    </chakra.p>
                    <chakra.p
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        fontSize={'15px'}
                        pb={4}>
                        {author}
                    </chakra.p>
                </Flex>
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

export default CommentComponent;