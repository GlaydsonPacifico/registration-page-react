import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import MakeAnimated  from 'react-select/animated';
import  Select from 'react-select';
import {
  Text,
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useCountries  } from "./hooks/useCountries";
import { useCities } from "./hooks/useCities";

const animatedComponets = MakeAnimated();

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
  const { countries } = useCountries ();
  const { cities } = useCities();

  const filteredCountries = countries.map((country) => ({
    key: country.code,
    value: country.name,
    label: country.name_ptbr,
  }));  

  const filteredCities = cities.map((city) => ({
    key: city.id,
    value: city.name,
    label: city.name_ptbr,
  }));   
  

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSubmitForm(data) {
    console.log(data);
  }

  return (
    <Box h={"100vh"}>
      <Center
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
        align={"center"}
        flexDir={"column"}
        justify={"center"}
        bg="blackAlpha.200"
        h={"calc(100vh - 150px)"}
      >
        <Center
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
                      onChange={(item) => setSelectedCountries(item) }
                      components={animatedComponets}
                      closeMenuOnSelect={false}
                      options={filteredCountries}
                      isMulti
                      placeholder="País"
                      >
                    </Select>
                    <FormHelperText fontSize={"xs"} mb={"3"}>
                      Selecione seu país.
                    </FormHelperText>
                  </Box>
                </HStack>
                <HStack>
                  <Box w={"100%"}>
                    <FormLabel htmlFor="city">Cidade</FormLabel>
                    <Select
                      components={animatedComponets}
                      closeMenuOnSelect={false}
                      options={filteredCities}
                      isMulti
                      placeholder="Cidades"
                    />                   
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
