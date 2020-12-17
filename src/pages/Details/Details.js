import React from "react";

import { useHistory, useParams } from "react-router-dom";

import Box from "components/Box";

import logo from "assets/logo/Group.png";
import search from "assets/busca/Lupa/search.svg";
import heart from "assets/icones/heart/heart.svg";
import book from "assets/icones/book/book.svg";
import video from "assets/icones/video/video.svg";
import review from "assets/review/review.svg";

import Image from "components/Image";
import Flex from "components/Flex";
import Input from "components/Input";
import { useQuery } from "react-query";
import { getCharacterById } from "api/characters";
import Text from "components/Text";
import moment from "moment";

export const Details = () => {
  const { id } = useParams();
  const history = useHistory();

  const { data: character } = useQuery("characterById", () =>
    getCharacterById({ id })
  );

  return (
    <>
      <Box
        pt="20px"
        pb="80px"
        maxWidth="100vw"
        bg="green"
        minHeight="calc(100vh - 135px)"
      >
        <Flex px={{ _: "10px", mobile: "40px" }} flexDirection="column">
          <Flex flex={1}>
            <Image mr="100px" height="50px" width="150px" img={logo} />
            <Input
              onClick={() => history.push("/characters")}
              icon={search}
              full
              variant="outlined"
            ></Input>
          </Flex>
          <Flex
            alignItems="center"
            flexDirection={{ _: "column-reverse", tablet: "row" }}
            px="20px"
            mt="50px"
          >
            <Flex
              width={{ _: "400px", tablet: "fit-content" }}
              flexDirection="column"
              flex={1}
            >
              <Flex justifyContent="space-between">
                <Text color="black" fontSize="24px" fontWeight="600">
                  {character?.name}
                </Text>
                <Image src={heart} width="20px" height="20px" />
              </Flex>
              <Text mt="20px" fontSize="12px" color="gray">
                {character?.description || "-"}
              </Text>
              <Flex mt="15px">
                <Flex mr="40px" flexDirection="column">
                  <Text fontSize="10px" fontWeight="bold">
                    Comics
                  </Text>
                  <Flex mt="5px" alignItems="center">
                    <Image src={book} width="20px" height="20px" />
                    <Text fontSize="14px" ml="10px">
                      {character?.comics?.available || 0}
                    </Text>
                  </Flex>
                </Flex>
                <Flex mr="20px" flexDirection="column">
                  <Text fontSize="10px" fontWeight="bold">
                    Series
                  </Text>
                  <Flex mt="5px" alignItems="center">
                    <Image src={video} width="20px" height="20px" />
                    <Text fontSize="14px" ml="10px">
                      {character?.series?.available || 0}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex alignItems="center" mt="20px">
                <Text mr="5px" fontSize="12px" fontWeight="bold">
                  Rating:
                </Text>
                <Image src={review} height="12px" width="60px" />
              </Flex>
              <Flex alignItems="center" mt="20px">
                <Text mr="5px" fontSize="12px" fontWeight="bold">
                  Last comic:
                </Text>

                <Text fontSize="12px">
                  {moment(character?.modified, "DD-MM-YYYY").format(
                    "DD MMMM YYYY"
                  )}
                </Text>
              </Flex>
            </Flex>
            <Flex
              mb={{ _: "20px", tablet: 0 }}
              justifyContent="center"
              flex={2}
            >
              <Image
                src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                width="400px"
                height="400px"
              />
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Text mt="40px" fontSize="16px" fontWeight="600">
              Last releases
            </Text>
            <Flex justifyContent="center" flex={1} flexWrap="wrap">
              {character?.comics?.items?.map((comic, i) => {
                return (
                  <Flex
                    mt="40px"
                    height="220px"
                    width="120px"
                    flexDirection="column"
                    mx="10px"
                  >
                    <Image
                      src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                      width="120px"
                      height="190px"
                    />
                    <Text mt="10px" fontSize="10px" fontWeight="600">
                      {comic?.name}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box bg="red" height="35px"></Box>
    </>
  );
};
