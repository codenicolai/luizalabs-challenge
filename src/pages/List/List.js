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
import hero from "assets/icones/heroi/hero.svg";
import search from "assets/busca/Lupa/search.svg";

import { getCharacters } from "api/characters";
import { useHistory } from "react-router-dom";

export const List = () => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [frase, setFrase] = useState("");
  const [orderBy, setOrderBy] = useState("name");

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
      <Box
        pt="20px"
        pb="80px"
        px="10px"
        maxWidth="100vw"
        minHeight="calc(100vh - 135px)"
        bg="white"
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
            Explore o universo
          </Text>
          <Text textAlign="justify" fontSize="12px" color="gray">
            Mergulhe no domínio deslumbrante de todos os personagens clássicos
            que voce ama - e aqueles que voce descobrirá em breve!
          </Text>
        </Flex>

        <Flex my="20px" justifyContent="center">
          <Input icon={search} onChange={(e) => setFrase(e.target.value)} />
        </Flex>

        <Flex justifyContent="space-between">
          <Text fontSize="12px" color="gray">
            Econtrados {characters?.results?.length || 0} resultados
          </Text>
          <Flex alignItems="center">
            <Flex
              mr="10px"
              alignItems="center"
              onClick={() => setOrderBy(!orderBy)}
            >
              <Image src={hero} width="20px" height="20px" />
              <Text ml="5px" fontSize="10px" color="red">
                {orderBy ? "Ordenar por nome Z / A" : "Ordenar por nome A / Z"}
              </Text>
            </Flex>

            <Image src={heart} width="20px" height="20px" />
            <Text ml="5px" fontSize="10px" color="red">
              Somente favoritos
            </Text>
          </Flex>
        </Flex>

        <Flex>
          {isLoading ? (
            <Box>Loading...</Box>
          ) : isError ? (
            <Box>Error: {error.message}</Box>
          ) : (
            <Flex justifyContent="center" flex={1} flexWrap="wrap">
              {characters.results.map((hero, i) => (
                <HeroCard
                  onClick={() => history.push(`characters/${hero.id}`)}
                  hero={hero}
                />
              ))}
            </Flex>
          )}
        </Flex>
        <Flex justifyContent="center">
          <Text>Current Page: {page + 1}</Text>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous Page
          </button>
          <button
            onClick={() => {
              if (!isPreviousData) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData}
          >
            Next Page
          </button>
          {isFetching ? <Text> Loading...</Text> : null}
        </Flex>
      </Box>
      <Box bg="red" height="35px"></Box>
    </>
  );
};
