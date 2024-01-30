import BookForm from "@/components/BookForm";
import Layout from "@/components/Layout";
import { Box } from "@chakra-ui/react";

export default function NewBook() {
  return (
    <Layout>
      <Box>
        <BookForm />
      </Box>
    </Layout>
  );
}
