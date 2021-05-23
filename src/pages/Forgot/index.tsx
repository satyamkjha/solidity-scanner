import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Link,
} from '@chakra-ui/react';

import { FiAtSign } from 'react-icons/fi';

import { Logo } from 'components/icons';
const ForgotPassword: React.FC = () => {
  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        maxW="80vw"
        mx="auto"
        py={8}
      >
        <Logo />
      </Flex>
      <Flex align="center" direction="column" my={40}>
        <Heading fontSize="2xl">Forgot password?</Heading>
        <Text color="subtle" my={3}>
          Enter your details to recieve a reset link
        </Text>

        <ForgotPasswordForm />
        <Link
          as={RouterLink}
          variant="subtle"
          fontSize="sm"
          mr={1}
          mt={4}
          to="/signin"
        >
          Back to sign in
        </Link>
      </Flex>
    </>
  );
};

type FormData = {
  emailId: string;
};

const ForgotPasswordForm: React.FC = () => {
  const { handleSubmit, register, formState } = useForm<FormData>();

  const onSubmit = async ({ emailId }: FormData) => {
    console.log({ emailId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6} mt={8} width={['300px', '400px', '500px']}>
        <InputGroup alignItems="center">
          <InputLeftElement
            height="48px"
            children={<Icon as={FiAtSign} color="gray.300" />}
          />
          <Input
            isRequired
            type="email"
            placeholder="Your email"
            variant="brand"
            size="lg"
            {...register('emailId', { required: true })}
          />
        </InputGroup>

        <Button
          type="submit"
          variant="brand"
          isLoading={formState.isSubmitting}
        >
          Send Now
        </Button>
      </Stack>
    </form>
  );
};
export default ForgotPassword;
