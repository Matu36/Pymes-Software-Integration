import React, {useState} from "react";
import { Box } from "@chakra-ui/react";
import { DB } from "../utils/DB.js";
import { ReactSearchAutocomplete } from "react-search-autocomplete";


export default function SearchBar({ handleSelectFood }) {
  const [searchString, setSearchString] = useState("");
 
const handleOnSearch = (string, results) => {
  setSearchString(string);
};

const searchByName = DB
.filter((product) =>
  product.Nombre.toLowerCase().includes(searchString.toLowerCase())
)
.map((product) => ({
  id: product.id,
  Categoría: product.Categoría,
  Imagen: product.Imagen,
  Nombre: product.Nombre,
  Efectivo: product.Efectivo,
  MercadoPago: product.MercadoPago,
}));

 
  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnSelect = (item) => {
    const selected = DB.find((food) => food.id === item.id);
    handleSelectFood(selected || null);
    
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.Nombre}
        </span>
      </>
    );
  };

  return (
    <Box>
      <ReactSearchAutocomplete
        items={searchByName}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onFocus={handleOnFocus}
        handleOnSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        placeholder="Buscar Comida"
        fuseOptions={{ keys: ["Nombre"] }}
      resultStringKeyName="Nombre"
      />
    
    </Box>
);
     }
