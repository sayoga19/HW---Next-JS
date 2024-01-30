import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { loginUser } from '../lib/api';

export default function Navbar () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(
        e.target.email.value,
        e.target.password.value
      );
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token.token);
      }
      router.push('/');
      onClose();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
    }
    setIsLogin(false);
    router.push('/');
  };

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5} cursor="pointer" onClick={() => router.push('/')}>
        <Text fontSize="xl" fontWeight="bold">
          Bookle
        </Text>
      </Flex>
      <HStack>
        {isLogin && (
          <Button colorScheme="blackAlpha" onClick={() => router.push('/newbook')}>
            Create New Book
          </Button>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form id="login-form" onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Button variant="ghost" onClick={() => router.push('/register')}>
                Doesn't Have Account? Click here
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

