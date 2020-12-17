import React from "react";

import moment from "moment";

import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getCharacterById, getComicsByCharacterId } from "api/characters";

import useFavorites from "hooks/useFavorites";

import Image from "components/Image";
import Flex from "components/Flex";
import Box from "components/Box";
import Input from "components/Input";
import Text from "components/Text";
import Loading from "components/Loading";

import logo from "assets/logo/Group.png";
import search from "assets/busca/Lupa/search.svg";
import heart from "assets/icones/heart/heart.svg";
import book from "assets/icones/book/book.svg";
import video from "assets/icones/video/video.svg";
import review from "assets/review/review.svg";
import heartFullfilled from "assets/icones/heart/heart-fullfilled.svg";

export const Details = () => {
  const { id } = useParams();
  const history = useHistory();

  const { isFavorite, addOrRemoveFavorite } = useFavorites();

  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useQuery("characterById", () => getCharacterById({ id }));

  const {
    data: comics,
    isLoading: comicsLoading,
  } = useQuery("comicsByCharacterId", () => getComicsByCharacterId({ id }));

  return (
    <>
      <Box
        pt="20px"
        pb="80px"
        maxWidth="100vw"
        bg="green"
        minHeight="calc(100vh - 135px)"
      >
        {isLoading || comicsLoading ? (
          <Flex
            minHeight="calc(100vh - 135px)"
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <Loading />
          </Flex>
        ) : isError ? (
          <Box>Error: {error.message}</Box>
        ) : (
          <Flex px={{ _: 0, mobile: "40px" }} flexDirection="column">
            <Flex alignItems="center" flex={1}>
              <Image
                mr={{ _: "30px", tablet: "100px" }}
                height="50px"
                width="150px"
                img={logo}
              />
              <Box width="100%" maxWidth="600px">
                <Input
                  placeholder="Search for your heroes..."
                  onClick={() => history.push("/characters")}
                  icon={search}
                  full
                  variant="outlined"
                ></Input>
              </Box>
            </Flex>
            <Flex
              flexDirection={{ _: "column-reverse", tablet: "row" }}
              px={{ _: 0, mobile: "20px" }}
              mt="50px"
            >
              <Flex
                mx={{ _: "10px", mobile: "0px" }}
                flexDirection="column"
                flex={1}
              >
                <Flex justifyContent="space-between">
                  <Text color="black" fontSize="24px" fontWeight="600">
                    {character?.name}
                  </Text>
                  <Image
                    src={isFavorite(character) ? heartFullfilled : heart}
                    width="20px"
                    height="20px"
                    onClick={() => addOrRemoveFavorite(character)}
                  />
                </Flex>
                <Text mt="20px" fontSize="12px" color="gray">
                  {character?.description || "-"}
                </Text>
                <Flex mt="15px">
                  <Flex mr="40px" flexDirection="column">
                    <Text color="black" fontSize="10px" fontWeight="bold">
                      Comics
                    </Text>
                    <Flex mt="5px" alignItems="center">
                      <Image src={book} width="20px" height="20px" />
                      <Text color="black" fontSize="14px" ml="10px">
                        {character?.comics?.available || 0}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex mr="20px" flexDirection="column">
                    <Text color="black" fontSize="10px" fontWeight="bold">
                      Series
                    </Text>
                    <Flex mt="5px" alignItems="center">
                      <Image src={video} width="20px" height="20px" />
                      <Text color="black" fontSize="14px" ml="10px">
                        {character?.series?.available || 0}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alignItems="center" mt="20px">
                  <Text
                    color="black"
                    mr="5px"
                    fontSize="12px"
                    fontWeight="bold"
                  >
                    Rating:
                  </Text>
                  <Image src={review} height="12px" width="60px" />
                </Flex>
                <Flex alignItems="center" mt="20px">
                  <Text
                    color="black"
                    mr="5px"
                    fontSize="12px"
                    fontWeight="bold"
                  >
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
                justifyContent={{ _: "center", tablet: "flex-end" }}
                flex={2}
              >
                <Image
                  src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                  width={{ _: "100%", base: "400px" }}
                  height="400px"
                />
              </Flex>
            </Flex>
            <Flex mx={{ _: "10px", mobile: "20px" }} flexDirection="column">
              <Text color="black" mt="40px" fontSize="16px" fontWeight="600">
                Last releases
              </Text>
              <Flex justifyContent="center" flex={1} flexWrap="wrap">
                {(
                  comics
                    ?.sort((a, b) =>
                      moment(a.dates[0].date).isAfter(b.dates[0].date) ? a : b
                    )
                    .filter((item, i) => i < 10) || []
                )?.map((comic, i) => {
                  return (
                    <Flex
                      mt="40px"
                      height="220px"
                      width="120px"
                      flexDirection="column"
                      mx="10px"
                    >
                      <Image
                        src={`${comic?.images?.[0]?.path}.${comic?.images?.[0]?.extension}`}
                        width="120px"
                        height="190px"
                      />
                      <Text
                        color="black"
                        mt="10px"
                        fontSize="10px"
                        fontWeight="600"
                      >
                        {comic?.title}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Box>
      <Box bg="red" height="35px"></Box>
    </>
  );
};
