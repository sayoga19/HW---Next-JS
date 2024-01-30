import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteBook, getBookDetailById } from "../../lib/api";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Box>
        {isLoading ? (
          <Skeleton height="300px" my="6" />
        ) : (
          <Flex my="6">
            <Box w="300px">
              <Image
                src={`http://localhost:3000/${book.image}`}
                alt={book.title}
              />
            </Box>
            <Box ml="8">
              <Heading as="h1" size="lg" color={"teal.500"}>
                {book.title}
              </Heading>
              <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                {book.author}
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {book.publisher}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="teal.600" mb="4">
                {book.year} | {book.pages} pages
              </Text>
            </Box>
          </Flex>
        )}
        {typeof window !== "undefined" && localStorage.getItem("token") && (
          <HStack>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme="red">Delete</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete this book?
                </PopoverBody>
                <Button onClick={handleDeleteBook} colorScheme="red">
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
            <Link href={`/editbook/${id}`}>
              <Button as="a">Edit</Button>
            </Link>
          </HStack>
        )}
      </Box>
    </Layout>
  );
}
