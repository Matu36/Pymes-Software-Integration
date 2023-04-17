import React, {useState, useEffect} from "react";
import { Flex, Box, Text, IconButton, Spacer, Badge } from "@chakra-ui/react";
import { FaUser, FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function NavBarAdmin() {

  const mensajessinleer = useSelector((state) => state.mensajesnoleidos);
  const [mensajeNoLeido, setMensajeNoLeido] = useState(0);


  useEffect(() => {
    const contador = mensajessinleer.length
    setMensajeNoLeido(contador);
  }, [mensajessinleer]);
  
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.500"
      color="white"
    >
      <Box>
        <Text marginLeft= "35rem"  fontSize="lg" fontWeight="bold">
          Panel de Administrador
        </Text>
      </Box>
      <Spacer />
      <Box>
        <IconButton
          aria-label="Usuario"
          icon={<FaUser />}
          variant="ghost"
          mr={2}
        />
        <IconButton
          aria-label="Notificaciones"
          icon={<FaBell />}
          variant="ghost"
          onClick={() => {
            alert(`Tiene ${mensajeNoLeido} mensajes sin leer.`);
            
          }}
        >
          
        </IconButton>
        {mensajeNoLeido > 0 && (
            <Badge 
              colorScheme="red" 
              borderRadius="full" 
              px="2" 
              fontSize="0.8em"
            >
              {mensajeNoLeido}
            </Badge>
          )}
      </Box>
    </Flex>
  );
          }
