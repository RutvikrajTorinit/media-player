/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Paper,
  Container,
  Group,
  useMantineTheme,
  Button,
  Text,
  Anchor,
  TextInput,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import Title from "../../components/UI/Title";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, FormEvent } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: FormEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    Cookies.set("email", JSON.stringify(loginData.email), { path: "/" });
    navigate("/");
    setIsLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={{
          fontFamily: theme.fontFamily,
          fontWeight: 900,
        }}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          name="email"
          value={loginData.email}
          label="Email"
          placeholder="you@mantine.dev"
          required
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={loginData.password}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={handleChange}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          component="button"
          onClick={handleLogin}
          loading={isLoading}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
