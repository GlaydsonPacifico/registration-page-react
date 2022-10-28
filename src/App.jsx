import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import {
  Text,
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  Select,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useCountrys } from "./hooks/useCountrys";
import { useCitys } from "./hooks/useCitys";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string("11").required(),
    cpf: yup.string("11").required(),
  })
  .required();

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const { countrys } = useCountrys();
  const { citys } = useCitys(selectedCountry);

  useEffect(() => {
    console.log(citys);
  }, []);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSelectCountry = (event) => {
    setSelectedCountry(event.target.value);
    console.log(event.target.value);
  };

  function handleSubmitForm(data) {
    console.log(data);
  }

  return (
    <Box h={"100vh"}>
      <Center
        // border={"5px solid #48077b"}
        as="header"
        h={150}
        bg="cyan.600"
        color={"white"}
        fontWeight="bold"
        fontSize={"6xl"}
        pb="8"
      >
        Cadastro
      </Center>
      <Flex
        // border={"5px solid #48077b"}
        align={"center"}
        flexDir={"column"}
        justify={"center"}
        bg="blackAlpha.200"
        h={"calc(100vh - 150px)"}
      >
        <Center
          // border={"5px solid #48077b"}
          display={"flex"}
          flexDir={"column"}
          w={"100%"}
          p={"6"}
          maxW={840}
          bg="white"
          top={100}
          position="absolute"
          borderRadius={5}
          boxShadow={"1px 2px #ccc"}
        >
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(handleSubmitForm)}
            id="controlForm"
          >
            <FormControl display={"flex"} p={"4"} gap={4} w={"100%"}>
              <Box flex={1}>
                <Text textAlign={"center"} mb={"4"}>
                  Dados Pessoais
                </Text>
                <HStack>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <Input {...register("name")} id="name" />
                    {formState.errors.name && (
                      <span style={{ fontSize: 12, color: "#ff0000" }}>
                        Campo nome é obrigatório.
                      </span>
                    )}
                    <FormHelperText fontSize={"xs"} mb={"3"}>
                      Digite seu nome completo.
                    </FormHelperText>
                  </Box>
                </HStack>
                <HStack>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...register("email")} id={"email"} />
                    {formState.errors.email && (
                      <span style={{ fontSize: 12, color: "#ff0000" }}>
                        Campo email é obrigatório.
                      </span>
                    )}
                    <FormHelperText fontSize={"xs"} mb={"3"}>
                      Nunca compartilharemos seu e-mail.
                    </FormHelperText>
                  </Box>
                </HStack>
                <HStack>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="phone">Telefone</FormLabel>
                    <Input
                      {...register("phone")}
                      id="phone"
                      as={InputMask}
                      mask="(**)*****-****"
                      maskChar={null}
                    />
                    {formState.errors.phone && (
                      <span style={{ fontSize: 12, color: "#ff0000" }}>
                        Campo telefone é obrigatório.
                      </span>
                    )}
                    <FormHelperText fontSize={"xs"} mb={"3"}>
                      Digite apenas números.
                    </FormHelperText>
                  </Box>
                </HStack>
                <HStack>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="cpf">CPF</FormLabel>
                    <Input
                      {...register("cpf")}
                      id="cpf"
                      as={InputMask}
                      mask="***.***.***-**"
                      maskChar={null}
                    />
                    {formState.errors.cpf && (
                      <span style={{ fontSize: 12, color: "#ff0000" }}>
                        Campo CPF é obrigatório.
                      </span>
                    )}
                    <FormHelperText fontSize={"xs"} mb={"3"}>
                      Digite apenas números.
                    </FormHelperText>
                  </Box>
                </HStack>
              </Box>

              <Box flex={1}>
                <Text textAlign={"center"} mb={"4"}>
                  Destinos de Interesse
                </Text>
                <HStack>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="country">País</FormLabel>
                    <Select
                      value={selectedCountry}
                      onChange={handleSelectCountry}
                      placeholder="País"
                    >
                      {countrys.map((country, key) => {
                        return (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        );
                      })}
                    </Select>
                    <FormHelperText fontSize={"xs"} mb={"3"}>
                      Selecione sua cidade.
                    </FormHelperText>
                  </Box>
                </HStack>
                <HStack>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="city">Cidade</FormLabel>
                    <Select placeholder="Cidade">
                      {citys &&
                        citys.map((city, key) => {
                          return (
                            <option key={city.id} value={city.country_code}>
                              {city.name}
                            </option>
                          );
                        })}
                    </Select>
                    <FormHelperText fontSize={"xs"} mb={"3"}>
                      Selecione sua cidade.
                    </FormHelperText>
                  </Box>
                </HStack>
              </Box>
            </FormControl>
          </form>
          <Flex justifyContent={"center"} w={"100%"}>
            <Button
              form="controlForm"
              type="submit"
              boxShadow={"1px 2px #ccc"}
              size={"lg"}
              colorScheme="cyan"
              color={"white"}
            >
              Enviar
            </Button>
          </Flex>
        </Center>
      </Flex>
    </Box>
  );
}

export default App;
