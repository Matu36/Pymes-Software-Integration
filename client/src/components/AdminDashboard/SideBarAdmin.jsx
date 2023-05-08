import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  useColorMode,
  
} from "@chakra-ui/react";
import {
  MdShoppingBasket,
  MdPerson,
  MdAttachMoney,
  MdAssignment,
  MdMail, 
  MdOutlineEditCalendar
} from "react-icons/md";
import { FaHome } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { changeHomeAdminShow } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";


const SideBarAdmin = () => {
  const {user} = useAuth0();
  const dispatch = useDispatch();

  const usuarios = useSelector(state => state.users);

  const Usuario = usuarios.map ((user) => user.address, user.id);
  console.log(Usuario);
  

  const handleHomeAdmin = (e) => {
    dispatch(changeHomeAdminShow(e.target.textContent));
  };

  const categories = [
    { label: "Home", icon: FaHome },
    { label: "Productos", icon: MdShoppingBasket},
    { label: "Usuarios", icon: MdPerson},
    { label: "Ventas", icon: MdAttachMoney},
    { label: "MercadoPago", icon: MdAssignment},
    { label: "Mensajes", icon: MdMail },
    { label: "Calendario", icon: MdOutlineEditCalendar },
  ];

  const { colorMode } = useColorMode();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const bgColor = colorMode === "light" ? "blue.400" : "gray.800";
  const hoverBgColor = colorMode === "light" ? "gray.100" : "gray.600";
  const activeBgColor = "orange.400";
  const textColor = colorMode === "light" ? "gray.800" : "white";

  return (
    <Box display={{base:"none", md:"block"}}
      w="64"
      bg={bgColor}
      color={textColor}
      backgroundColor= "blue.400"
      boxShadow="lg"
      pos="fixed"
      top="0"
      left="0"
      h="full"
      borderRightWidth="1px"
      borderRightColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
       
      <Flex
        h="20"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        <Box display="block">
        <Box>
       <Text color="gray.500" marginLeft="2.5rem"> Admin </Text>
       </Box>
       <Box>
        {user.name}
        </Box>
       
        </Box>
      </Flex>
      <img style={{width:"50px", marginLeft:"6rem", borderRadius:"50%"}} src={user.picture} alt="" />
      <Box flex="1" overflowY="auto" mt="8">
        
        <Stack spacing="4" mt="4" align="stretch">
          {categories.map((category) => (
            <Box 
              key={category.label}
              as="button"
              onClick={(e) => {
                handleHomeAdmin(e);
                setActiveCategory(category);
              }}
              p="3"
              borderRadius="md"
              transition="background-color 0.2s"
              _hover={{ bg: hoverBgColor }}
              bg={
                activeCategory.label === category.label ? activeBgColor : bgColor
              }
            >
              <Flex alignItems="center">
                <Icon as={category.icon} mr="2" />
                <Text>{category.label}</Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SideBarAdmin;