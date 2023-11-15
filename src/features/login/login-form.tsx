import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../services/palenca-api";

export function LoginForm() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      borderRadius="16px"
      padding="24px"
      w="400px"
      boxShadow="0 1px 3px 1px rgba(0, 0, 0, .15), 0 1px 2px rgba(0, 0, 0, .2)"
    >
      <Box display="flex" justifyContent="center" mb="12px">
        <img width="100px" src="./dundermifflin.jpeg" />
      </Box>
      <VStack spacing="16px">
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input onChange={handleEmailChange} value={email} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={handlePasswordChange}
            value={password}
            type="password"
          />
        </FormControl>
        <Button isDisabled={!email || !password} onClick={handleSubmit}>
          Sign in
        </Button>
      </VStack>
    </Box>
  );

  function handleSubmit() {
    login({ email, password })
      .unwrap()
      .then((response) => {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        navigate("/");
      });
  }

  function handleEmailChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setEmail(ev.target.value);
  }

  function handlePasswordChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setPassword(ev.target.value);
  }
}
