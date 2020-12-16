import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";

import Box from "components/Box";
import Flex from "components/Flex";
import Text from "components/Text";
import Image from "components/Image";

import logo from "assets/logo.png";
import { getCharacters } from "api/characters";

export const List = () => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [frase, setFrase] = useState("");
  const [orderBy, setOrderBy] = useState("name");

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
    <Box py="40px" px="10px" maxWidth="100vw" height="100vh" bg="white">
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
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          voce ama - e aqueles que voce descobrirá em breve!
        </Text>
      </Flex>
      search:
      <input onChange={(e) => setFrase(e.target.value)}></input>
      <button onClick={() => setOrderBy(!orderBy)}>
        {orderBy ? "orderByDesc" : "orderByAsc"}
      </button>
      <Flex>
        {isLoading ? (
          <Box>Loading...</Box>
        ) : isError ? (
          <Box>Error: {error.message}</Box>
        ) : (
          <Flex justifyContent="center" flex={1} flexWrap="wrap">
            {characters.results.map((project, i) => (
              <Box mt="15px" mx="10px">
                {console.log(project)}
                <Image
                  height="200px"
                  width="200px"
                  img={`${project.thumbnail.path}.${project.thumbnail.extension}`}
                />
                <p key={project.id}>{project.name}</p>
              </Box>
            ))}
          </Flex>
        )}
      </Flex>
      <Flex>
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
  );
};
