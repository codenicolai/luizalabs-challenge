import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";

import Box from "components/Box";
import Flex from "components/Flex";
import Text from "components/Text";
import Image from "components/Image";
import Input from "components/Input";
import HeroCard from "components/HeroCard";

import logo from "assets/logo/Group.png";
import heart from "assets/icones/heart/heart.svg";
import heartFullfilled from "assets/icones/heart/heart-fullfilled.svg";
import hero from "assets/icones/heroi/hero.svg";
import search from "assets/busca/Lupa/search.svg";
import toggleOn from "assets/toggle/toggleOn.svg";
import toggleOff from "assets/toggle/toggleOff.svg";

import { getCharacters } from "api/characters";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loading from "components/Loading";
import useFavorites from "hooks/useFavorites";

const Button = styled.button`
  margin-left: 2px;
  margin-right: 2px;
  outline: 0;
  background-color: ${(props) =>
    props.variant === "contained"
      ? props.theme.colors.red
      : props.theme.colors.white};
  color: ${(props) =>
    props.variant === "contained"
      ? props.theme.colors.white
      : props.theme.colors.red};
  padding-left: 7px;
  padding-right: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: none;
  font-size: 10px;
  border-radius: 100px;
  cursor: pointer;
`;

export const List = () => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [frase, setFrase] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const { addOrRemoveFavorite, isFavorite, favorites } = useFavorites();

  const history = useHistory();

  const {
    isLoading,
    isError,
    error,
    data: characters,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["characters", offset, frase, orderBy],
    () =>
      getCharacters({
        frase,
        offset: frase ? undefined : offset,
        orderBy: orderBy ? "name" : "-name",
      }),
    {}
  );

  useEffect(() => {
    if (page) {
      setOffset(page * 20);
    }

    if (page === 0) {
      setOffset(0);
    }
  }, [page]);

  return (
    <>
      <Flex
        pt="20px"
        pb="80px"
        px="10px"
        maxWidth="100vw"
        minHeight="calc(100vh - 135px)"
        bg="white"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Flex alignItems="center" flexDirection="column">
          <Image height="60px" width="180px" img={logo} />

          <Text
            mt="10px"
            textAlign="justify"
            fontSize="24px"
            fontWeight="700"
            color="black"
          >
            Explore the universe
          </Text>
          <Text textAlign="justify" fontSize="12px" color="gray">
            Immerse yourself in the dazzling realm of all the classic characters
            you love - and those you will soon discover!
          </Text>
        </Flex>

        <Flex
          width="100%"
          mt="20px"
          mb={{ _: "40px", tablet: "80px" }}
          justifyContent="center"
        >
          <Flex width="100%" maxWidth="600px">
            <Input
              placeholder="Search for your heroes..."
              full
              icon={search}
              onChange={(e) => setFrase(e.target.value)}
            />
          </Flex>
        </Flex>

        <Flex
          width={{ _: "100%", tablet: "80%", hd: "70%" }}
          justifyContent="space-between"
        >
          <Text fontSize="12px" color="gray">
            Found {characters?.results?.length || 0} results
          </Text>
          <Flex alignItems="center">
            <Flex mr="20px" alignItems="center">
              <Image src={hero} width="20px" height="20px" />
              <Text mx="5px" fontSize="10px" color="red">
                Order by name A / Z
              </Text>
              <Image
                onClick={() => setOrderBy(!orderBy)}
                src={orderBy ? toggleOn : toggleOff}
                width="30px"
                height="20px"
              />
            </Flex>

            <Flex
              alignItems="center"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
            >
              <Image
                src={onlyFavorites ? heartFullfilled : heart}
                width="20px"
                height="20px"
              />
              <Text ml="5px" fontSize="10px" color="red">
                Only favorites
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex width={{ _: "100%", tablet: "80%", hd: "70%" }}>
          {isLoading || isFetching ? (
            <Flex
              minHeight="300px"
              flex={1}
              justifyContent="center"
              alignItems="center"
            >
              <Loading />
            </Flex>
          ) : isError ? (
            <Box>Error: {error.message}</Box>
          ) : (
            <Flex justifyContent="center" flex={1} flexWrap="wrap">
              {!onlyFavorites
                ? characters.results.map((hero, i) => {
                    return (
                      <HeroCard
                        onClick={() => history.push(`characters/${hero.id}`)}
                        hero={hero}
                        onClickFavorite={addOrRemoveFavorite}
                        favorite={isFavorite(hero)}
                      />
                    );
                  })
                : favorites.map((hero, i) => {
                    return (
                      <HeroCard
                        onClick={() => history.push(`characters/${hero.id}`)}
                        hero={hero}
                        onClickFavorite={addOrRemoveFavorite}
                        favorite={isFavorite(hero)}
                      />
                    );
                  })}
            </Flex>
          )}
        </Flex>
        {!onlyFavorites && (
          <Flex alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              Previous Page
            </Button>
            {page > 0 && (
              <Button variant="outlined" onClick={() => setPage(page - 1)}>
                {page}
              </Button>
            )}
            <Button variant="contained">{page + 1}</Button>
            <Button variant="outlined" onClick={() => setPage(page + 1)}>
              {page + 2}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (!isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPreviousData}
            >
              Next Page
            </Button>
          </Flex>
        )}
      </Flex>
      <Box bg="red" height="35px"></Box>
    </>
  );
};
