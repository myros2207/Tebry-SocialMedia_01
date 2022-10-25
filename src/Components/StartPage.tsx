import React, {useEffect} from 'react';
import {Button, Center, Flex} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import secureLocalStorage from "react-secure-storage"

const StartPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const ChekLogin =  () => {

            if ( localStorage.getItem("Login") === " " || localStorage.getItem("Login") === null) {
                navigate("/login")
                return
            }
            else {
                navigate("/myAccount")
            }
        }
        ChekLogin()
    }, []);



    return (
        <div>
            <Center>
                <Flex>
               <Link to="/login"> <Button> Log In</Button></Link>
                    <Link to="/register"><Button> Register</Button></Link>
                </Flex>
            </Center>
        </div>
    );
};

export default StartPage;
