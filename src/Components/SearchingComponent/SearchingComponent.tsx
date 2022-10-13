import React, {useEffect, useState} from "react";
import {useDebounce} from "./Debounce";
import axios from "axios";
import './SearchStyle.css'
import {Link} from "react-router-dom";
import {
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Flex,
    InputRightElement, InputGroup
} from "@chakra-ui/react";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

const SearchingComponent = () => {

    const [result, setResult] = useState<any>([]);
    const [search, setSearch] = useState("");
    const debounced = useDebounce(search);

    const link = document.location.href;

    useEffect(() => {
        console.log(debounced)

        GetResults()
    }, [debounced])

    const GetResults = async () => {
        try{

            const response = await axios.get("http://localhost:3333/findUser", {
                // @ts-ignore
                "firstName": search
            })
            setResult(response.data)
        }
        catch {
            setResult([])
        }
    }

    const CheckLink = () => {
        if(link === document.location.href)
            setTimeout(() => {
                document.location.reload()
            }, 1)

    }

    return (
        <div>
            <Menu>
                <Flex>
                    <InputGroup>
                        <Input w="15rem" type="text" placeholder={"search"} value={search} onChange={e => {setSearch(e.target.value)}}/>
                        <InputRightElement><MenuButton onClick={GetResults} mr="20">Search</MenuButton></InputRightElement>
                    </InputGroup>
                </Flex>
                <Portal >
                    <MenuList w="15rem" position="relative" right={["3.4rem", "9.5rem"]}>
                        <MenuItem >
                            <ul>
                                {
                                    //@ts-ignore
                                    result.map(r => search.length > 3 ? (<Link onClick={CheckLink} to={"../account/"+r}><li className={"searchResult"}>{r}</li></Link>) : <p>No Search Results</p>)
                                }
                            </ul>

                        </MenuItem>
                    </MenuList>
                </Portal>
            </Menu>


        </div>
    );
};

export default SearchingComponent;