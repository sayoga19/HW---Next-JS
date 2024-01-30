import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link href={`/books/${id}`}>
      <Box key={id} m={4} p={4} border={"1px"} borderColor={"black"} cursor='pointer' _hover={{ transform: "scale(1.1)" }} boxShadow={"2xl"} bg={"gray.100"} w={200} h={300}>
        <VStack spacing={3} align={"center"}>
          <Heading size={"md"} color={"teal.500"} textAlign={"center"}>
            {title} ({year})
          </Heading>
          <Text fontSize={"sm"} color={"gray.500"}>{author}</Text>
          <Image width={96} height={96} src={`http://localhost:3000/${image}`} alt={"Book"} objectFit={"cover"} borderRadius={"md"}/>
          <Text fontSize={"sm"}>
            <Text as={"span"} fontWeight={"bold"}>Publisher: </Text>
            {publisher}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
}
