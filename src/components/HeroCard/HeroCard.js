import React from "react";

import Flex from "components/Flex";
import Image from "components/Image";
import Box from "components/Box";
import Text from "components/Text";

import heart from "assets/icones/heart/heart.svg";
import heartFullfilled from "assets/icones/heart/heart-fullfilled.svg";

export const HeroCard = ({
  onClick,
  hero,
  favorite,
  onClickFavorite,
  ...props
}) => {
  return (
    <Box my="15px" mx="10px" width="200px" height="250px">
      <Flex flex={1}>
        <Image
          onClick={onClick}
          height="200px"
          width="200px"
          img={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        />
      </Flex>
      <Flex mt="15px" justifyContent="space-between">
        <Text key={hero.id}>{hero.name}</Text>
        <Image
          onClick={() => onClickFavorite(hero)}
          src={favorite ? heartFullfilled : heart}
          width="20px"
          height="20px"
        />
      </Flex>
    </Box>
  );
};
