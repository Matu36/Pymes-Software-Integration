import React, { useEffect } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import mercadopagoimg from "../../img/MercadoPago_Logo.png";
import axios from "axios";

/*
Primero crear una aplicacion en MercadoPago, luego ir a esta pagina https://www.mercadopago.com.ar/developers/panel/app;
Fijarse en credenciales de Prueba; ahi estan nuestro acces token y api key;
Poner en variables de entorno:

*/

const CheckoutMP = () => {
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(user));
  }, [user]);

  const carro = useSelector((state) => state.cart);

  //Suma los precios de todos los productos del carrito
  const totalEfectivo = carro.reduce(
    (total, producto) => total + producto.Efectivo * producto.quantity,
    0
  );
  //Manda los nombres de los productos elegidos en el carrito en un array
  const carroNombre = carro.map((product) => product.Nombre);

  return (
    <Box
      borderWidth="20px"
      borderLeftWidth="20px"
      borderRightWidth="20px"
      solid
      borderColor="gray.500"
      display={{ base: "row", md: "flex" }}
      justifyContent="center"
      backgroundColor= "gray.300"
    
    >
      <Box
        marginTop={{ base: "2rem", md: "5rem" }}
        maxWidth={{ md: "100%" }}
        marginLeft={{ base: "4rem", md: "0" }}
      >
        <Image src={mercadopagoimg} width={{ base: "80%", md: "100%" }}></Image>
      </Box>

      <Flex justifyContent="center">
        <Box
          marginLeft={{ base: "0", md: "10rem" }}
          
          sx={{
            "@media (min-width: 0px) and (max-width: 499px)": {
              maxWidth: "80%",
              marginTop: "1.5rem",
            },
          }}
        >
          <Text
            fontSize={{ base: "1.3rem", md: "2rem" }}
            marginTop={{ base: "-2rem", md: "1rem" }}
            marginRight="4rem"
            fontFamily="sans-serif"
            textDecoration="underline"
            textDecorationThickness="from-font"
            marginLeft="4rem"
          >
            {" "}
            Detalle de tu compra{" "}
          </Text>
          <br />
          <br />

          {carro.map((cart, index) => (
            <Box
              key={index}
              background="gray.200"
              padding="15px"
              marginTop={{ base: "-2rem", md: "0" }}
            >
              <Flex justifyContent="space-between">
                <Text fontSize="16px" fontWeight="bold" color="gray.600">
                  {cart.Nombre}
                </Text>
                <Box>
                  <Text ontSize="16px" fontWeight="bold" color="gray.600">
                    {" "}
                    $ {cart.Efectivo}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
          <br />
          <Flex>
            <Box
              marginRight={{ base: "0", md: "12rem" }}
              justifyContent="space-between"
            >
              {isAuthenticated ? (
                <Text fontSize="16px" color="gray.600" fontWeight="bold">
                  {" "}
                  Cliente: {user.name}{" "}
                </Text>
              ) : null}

              <Text fontSize="16px" fontWeight="bold" color="gray.600">
                {" "}
                Total a Pagar: $ {totalEfectivo}
              </Text>
              <br />
              <br />
              <Box
                paddingBlockEnd="2rem"
                marginLeft={{ base: "5rem", md: "8rem" }}
                sx={{
                  "@media (min-width: 0px) and (max-width: 380px)": {
                    justifyContent: "center",
                    margin: "auto",
                  },
                }}
              >
                <Button
                  bgGradient="linear(to-r, #FF6700, #FF9900)"
                  color="white"
                  fontSize={{base:"24px", md:"30px"}}
                  paddingBottom="5px"
                  onClick={() => {
                    axios
                      .post(
                        `https://pymes-software-integration-production.up.railway.app/payment`,
                        {
                          // id:123,
                          title: "Productos",
                          description: carroNombre,
                          price: totalEfectivo,
                        }
                      )
                      .then(
                        (res) =>
                          (window.location.href =
                            res.data.response.body.init_point)
                      );
                    // Segunda solicitud
                    axios
                      .post(
                        `https://pymes-software-integration-production.up.railway.app/paymentDBLOCAL`,
                        {
                          Nombre: carroNombre.toString(),
                          Useremail: isAuthenticated
                            ? user.email
                            : "sinemail@hotmail.com",
                          Precio: totalEfectivo,
                        }
                      )
                      .then((res) => {
                        // Manejar la respuesta de la segunda solicitud
                        console.log("Pago Realizado", res.data);
                        // ...
                      })
                      .catch((error) => {
                        // Manejar el error de la segunda solicitud
                        console.error("No se completo la transacción", error);
                        // ...
                      });
                  }}
                >
                  Pagar
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutMP;
