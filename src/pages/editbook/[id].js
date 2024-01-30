import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookForm from "../../components/BookForm";
import { getBookDetailById } from "../../lib/api";
import Layout from "../../components/Layout";

export default function EditBookPage() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
      } catch (e) {
        console.log(e);
      }
    };
    if (id) {
      fetchBook();
    }
  }, [id]);

  return (
    <Layout>
      <Box>
        <BookForm bookData={book} />
      </Box>
    </Layout>
  );
}
