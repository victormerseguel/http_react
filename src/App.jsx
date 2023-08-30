import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";
// const url = ""; // forçando erro com url vazia

import "./App.css";

function App() {
  // 1 - resgantando dados
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   (async function getData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setProducts(data);
  //   })();

  // getData();
  // }, []);

  // 4 - custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url);

  // 2 - envio de dados
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name, // é o mesmo que "name: name"
      price,
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    if (!name || !price) {
      return;
    }
    // 5 - refatorando post
    httpConfig(product, "POST"); // invoca a função
    setName("");
    setPrice("");
    setPriceInput("");
  };

  const handlePrice = (e) => {
    const price = e.target.value.replace(",", "."); // pega o valor de input e substitui vírgula por ponto para ficar no padrão json
    const validPrice = e.target.value.replace(/[^0-9,]/g, ""); // pega tudo o que entra no input e substitui tudo o que não for números e vírgulas por nada.
    setPrice(price); // coloca o valor no padrão json em price que será salvo na base
    setPriceInput(validPrice); // limita a entrada de números e e vírgulas apenas, uma vez que o value do input está condicionado à este estate ("priceInput")
  };

  return (
    <>
      <h1>HTTP em React</h1>
      {/* 1 - resgate de dados */}
      <ul>
        {/* {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))} */}

        {/* 4 - custom hook */}
        {items
          ? items.map((item) => (
              <li key={item.id}>
                {item.name} - R${" "}
                {Number(item.price).toFixed(2).toString().replace(".", ",")}
              </li>
            ))
          : null}
        {/* 6 - loading */}
        {loading ? <p>Carregando...</p> : null}
        {/* 8 - tratando erros */}
        {error ? <p>{error}</p> : null}
      </ul>
      {/* 2 - enviando dados */}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <div className="lable-containter">
            <label>
              <span>Nome</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span>Preço</span>
              <input
                type="text"
                value={priceInput}
                onChange={(e) => handlePrice(e)}
              />
            </label>
          </div>
          {/* 7 - loading post e 8 - tratamento de erros */}
          {/* <input type="submit" value="Enviar" /> */}
          {loading || error ? (
            <input type="submit" disabled value="Aguarde... " />
          ) : (
            <input type="submit" value="Criar" />
          )}
        </form>
      </div>
    </>
  );
}

export default App;
