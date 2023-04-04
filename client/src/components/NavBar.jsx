import React, { useState } from "react";
import DarkMode from "../utils/DarkMode";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiPizza } from "react-icons/ci";
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaHome,
} from "react-icons/fa";
import {
  GiChickenOven,
  GiFishEggs,
  GiFullPizza,
  GiChickenLeg,
  GiFrenchFries,
} from "react-icons/gi";
import { TbSalad, TbIceCream } from "react-icons/tb";
import { BiDrink, BiDish } from "react-icons/bi";
import {
  useColorMode,
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@chakra-ui/react";
import { BiMessageDetail } from "react-icons/bi";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiShoppingCart } from "react-icons/gi";
import AuthButton from "./Auth0";

export default function NavBar({
  setShowAbout,
  setProducts,
  handleMostrarFormulario,
}) {
  const [activeCategory, setActiveCategory] = useState(null);

  const FoodResponsive = useSelector((state) => state.comidas);

  const handleClick = (category) => {
    setActiveCategory(category);

    // Filtra la base de datos por categoría seleccionada
    const filteredProducts = FoodResponsive.filter(
      (product) => product.Categoria === category
    );
    setProducts(filteredProducts);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode } = useColorMode();

  const buttonColorScheme = colorMode === "light" ? "#F08080" : "gray";

  return (
    <Box>
      <Box>
        <Flex
          bg="yellow.300"
          color="white"
          py={{ base: 2, md: 4 }}
          px={8}
          display={{ base: "flex", md: "flex" }}
          justifyContent={{ base: "space-between" }}
        >
          <Box display="flex" alignItems="center">
            {/* Responsivo icon hamburguer */}
            <Box>
              <IconButton
                marginLeft={{ base: "-4.5rem" }}
                marginTop={{ base: "0rem" }}
                aria-label="Abrir menú"
                icon={<HamburgerIcon />}
                size="md"
                fontSize="24px"
                variant="ghost"
                color="white"
                onClick={onOpen}
                display={{ md: "none" }} // Sólo muestra el botón en modo responsivo
              />

              <Button
                display={{ md: "none" }}
                variant="ghost"
                marginLeft="-1rem"
                marginTop="0.5rem"
                color="white"
                fontSize="24px"
                onClick={() => window.location.reload()}
              >
                {<FaHome />}
              </Button>

              <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg="red.400" p="9" size="xs" maxW="50vw">
                  <DrawerCloseButton />
                  <DrawerHeader color="white">Menú</DrawerHeader>
                  <DrawerBody marginLeft="-2rem">
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Carnes");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiChickenOven />}
                    >
                      Carnes
                    </Button>

                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pollo");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiChickenLeg />}
                    >
                      Pollo
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pasta");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFullPizza />}
                    >
                      Pastas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pizzas");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<CiPizza />}
                    >
                      Pizzas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Pescados");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFishEggs />}
                    >
                      Pescados
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Ensaladas");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<TbSalad />}
                    >
                      Ensaladas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Guarniciones");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<GiFrenchFries />}
                    >
                      Guarniciones
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Platos frios");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<BiDish />}
                    >
                      Platos Frios
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Bebidas");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<BiDrink />}
                    >
                      Bebidas
                    </Button>
                    <Button
                      as="a"
                      href="#Cartas"
                      onClick={() => {
                        handleClick("Postres");
                        onClose();
                      }}
                      variant="ghost"
                      color="white"
                      leftIcon={<TbIceCream />}
                    >
                      Postres
                    </Button>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
            {/* Fin Responsivo icon hamburguer */}
          </Box>
          <Box marginLeft="-2rem">
            <DarkMode display={{ base: "none", md: "inline-flex" }} />
            <Button
              variant="ghost"
              color="white"
              title="Envianos tu Mensaje!"
              fontSize="22px"
              
              marginLeft={{ base: "none", md: "inline-flex" }}
              
              onClick={handleMostrarFormulario}
            >
              <BiMessageDetail />
            </Button>

            <Button
              title="Home"
              display={{ base: "none", md: "inline-flex" }}
              variant="ghost"
              fontSize="22px"
              color="white"
              mr={2}
              onClick={() => window.location.reload()}
            >
              <FaHome />
            </Button>
            <Button
              as="a"
              href="#About"
              display={{ base: "none", md: "inline-flex" }}
              variant="ghost"
              color="white"
              mr={2}
              onClick={handleAboutClick}
            >
              Sobre Nosotros
            </Button>
          </Box>

          <Box
            flex="1"
            ml="auto"
            mr="auto"
            maxWidth={{ base: "100px", md: "400px" }}
          >
            {/* <SearchBar /> */}
          </Box>

          <Box display="flex" alignItems="center" mr={{ base: -12, md: 1 }}>
            <Box display="flex" alignItems="center">
              <Link to="/sCart">
                <IconButton
                  target="_blank"
                  aria-label="ShoppingCart"
                  fontSize={{ base: "28px", md: "28px" }}
                  icon={<GiShoppingCart />}
                  mr={{ base: 0, md: 2 }}
                  
                  variant="ghost"
              color="white"
                />
              </Link>
              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://www.instagram.com/"
                target="_blank"
                aria-label="Instagram"
                fontSize={{ base: "28px", md: "22px" }}
                icon={<FaInstagram />}
                mr={2}
                variant="ghost"
              color="white"
              />
              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://www.facebook.com/"
                target="_blank"
                aria-label="Facebook"
                fontSize={{ base: "28px", md: "22px" }}
                icon={<FaFacebook />}
                mr={2}
                variant="ghost"
              color="white"
              />
              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://maps.google.com/"
                target="_blank"
                fontSize={{ base: "28px", md: "22px" }}
                aria-label="Geolocalización"
                icon={<FaMapMarkerAlt />}
                mr={2}
                variant="ghost"
              color="white"
              />
              <IconButton
                display={{ base: "none", md: "inline-flex" }}
                as="a"
                href="https://wa.me/5492215704647?text=Hola,%20quisiera%20hacerte%20un%20pedido"
                target="_blank"
                fontSize={{ base: "28px", md: "22px" }}
                aria-label="Whatsapp"
                icon={<FaWhatsapp />}
                variant="ghost"
              color="white"
              />
            </Box>
          </Box>
          <Box>
            <AuthButton />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
