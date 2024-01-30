import { HStack } from "@chakra-ui/react";
import Books from "../components/Books";
import { getAllBooks } from "../lib/api";
import Layout from "@/components/Layout";

export default function Homepage({ books }) {
  return (
    <Layout>
      <HStack w="100vw">
        {books?.books?.map((book) => (
          <Books key={`${book.id} ${book.title}`} {...book} />
        ))}
      </HStack>
    </Layout>
  );
}

export async function getServerSideProps() {
  const books = await getAllBooks();
  return {
    props: { books },
  };
}
