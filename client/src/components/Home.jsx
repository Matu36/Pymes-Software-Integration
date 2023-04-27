import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import RandomSlider from "./randomSlider";
import Logo from "../img/LOGO.png";
import Sidebar from "./Sidebar";
import About from "./About";
import Card from "./Card";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { getComidas } from "../Redux/actions";
import MensajesUsuario from "./MensajesUsuario";
import { CgCloseO } from "react-icons/cg";



export default function Home() {
  //RENDERIZADO DE CARTA EN EL FILTRO DE CATEGORIA
  const [products, setProducts] = useState([]);

  //About
  const [showAbout, setShowAbout] = useState(false);

  //TRAIGO LA DATA

  const dispatch = useDispatch();
  const Food = useSelector(state => state.comidas);
  



  //AUTOCOMPLETE//

  const [searchTerm, setSearchTerm] = useState("");
  const [comidas, setComidas] = useState(Food);
  const [selectedComida, setSelectedComida] = useState(null);
  const [filteredComidas, setFilteredComidas] = useState([]);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  useEffect(() => {
    dispatch(getComidas());
  }, [comidas]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtrar las opciones de autocompletado
    let options = Food
      .filter((comida) => {
        return comida.Nombre.toLowerCase().includes(value.toLowerCase());
      })
      .slice(0, 3);

      console.log (comidas)
    setAutocompleteOptions(options);
  };

   const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  }; 

  const handleSearch = () => {
    const filteredComidas = Food.filter((comida) => {
      return comida.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredComidas(filteredComidas);
  };

  const handleComidaClick = (comida) => {
    setSelectedComida(comida);
    setSearchTerm(comida.Nombre);
    setFilteredComidas([]);
    setAutocompleteOptions([]);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredComidas([]);
    setAutocompleteOptions([]);
  };
  useEffect(() => {
    if (searchTerm === "") {
      handleReset();
    }
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getComidas());
  }, [comidas]);

  const handleResetComidaSeleccionada = () => {
    setSelectedComida(null);
  };
  //FIN AUTOCOMPLETE

  //MENSAJES USUARIO//

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //FIN MENSAJES DE USUARIO

  return (
    <Box >
<Box borderWidth="0px" borderLeftWidth="40px" borderRightWidth="40px" solid
      borderColor= "yellow.300"
>
      <Box>
        <NavBar 
        handleMostrarFormulario= {handleMostrarFormulario}
        setShowAbout={setShowAbout}
        setProducts= {setProducts} />
      </Box>
      
      <Box marginTop={{base: "-3rem", md: "-3.5rem"}} marginLeft={{base: "2rem", md: "22rem"}} 
      maxWidth={{base: "70%", md:"35%"}} >
        <InputGroup borderRadius="5%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            backgroundColor="white"
            placeholder="Buscar Comida"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        </InputGroup>
        <button onClick={handleSearch}></button>
        <Box marginTop="-1em" height="30px" overflow-y="auto"
        zIndex= "1">
          <ul>
            {autocompleteOptions.map((comida) => (
              <Text background= "white" width= "100%"
                paddingLeft="1rem"
                zIndex="1"
                fontWeight= "bold"
                fontSize={{base: "12px",md:"16px"}}
                key={comida.id}
                onClick={() => handleComidaClick(comida)}
                style={{ cursor: 'pointer' }}
              >
                {comida.Nombre}
              </Text>
            ))}
          </ul>
          </Box>
        </Box>
       
       
        <Box>
        {mostrarFormulario && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "10px",
            zIndex: "999",
          }}
        >
          <button fontSize="2rem" onClick={handleCerrarFormulario}>
            <CgCloseO />
          </button>
          <MensajesUsuario />
        </div>
        
      )}
      </Box>
      <Box maxWidth={{base: "85%", md:"40%"}} marginTop={{base: "-3rem", md: "0"}} 
      marginLeft={{base: "1.5rem", md: "20rem"}} zIndex="2">
        {selectedComida && (
          // <Box marginTop= "3rem">
           
  <Card 
    id={selectedComida.id}
    Imagen ={selectedComida.Imagen}
    alt={selectedComida.Nombre}
    Nombre={selectedComida.Nombre}
    Efectivo={selectedComida.Efectivo}
    onClose= {handleResetComidaSeleccionada}
  />
  
  // </Box>
)}
        
      </Box>
      {showAbout ? <About /> : null}
      <Box id="About"
        display={{ base: "none", md: "flex" }}
        position="fixed"
        backgroundColor="#F6F6F6"
        borderRight="1px solid #F6F6F6"
        padding="10px"
        top="79.9"
        left="0"
        bottom="0"
        width="10rem"
        overflow="auto"
      >
        <Sidebar setProducts={setProducts} />
        
      </Box>
      <Box
        mt={{ base: "-20rem", md: "-10rem" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          maxWidth={{ base: "200px", md: "400px" }}
          maxHeight={{ base: "50px", md: "200px" }}
          margin="auto"
        >
          <Image
            src={Logo}
            alt="Logo de la empresa"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
      </Box>
      <Box>

       </Box>

      <Box
      
        marginLeft={{ base: "2rem", md: "17rem" }}
        marginTop={{ base: "-18rem", md: "-9rem" }}
        maxW={{ base: "80%" }}
      >
        {RandomSlider()}
      </Box>
      
      <Box 
        id="Cartas"
        maxW="sm"
        overflow="hidden"
        boxShadow="md"
        mx="auto"
        mt="4"
      >
        {/* Renderiza los productos filtrados */}
        {products.map((product, index) => (
          <Card
            id={product.id}
            key={index}
            Imagen={product.Imagen}
            Nombre={product.Nombre}
            Efectivo={product.Efectivo}
          />
        ))}
      </Box>
      </Box>
      <Box display={{md:"none"}}>
        

<Footer setShowAbout={setShowAbout}
handleMostrarFormulario= {handleMostrarFormulario}/>
      </Box>

    </Box>
  );
}
