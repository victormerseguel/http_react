import { useState, useEffect } from "react";

// 4 - custom hook

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  //   5 - refatorando post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);

  //  6 - loading
  // cria uma variável apenas para controlar se é "true" ou "false" para exportar e fazer uma
  // renderização condicional.
  const [loading, setLoading] = useState(false);

  // 7 - tratando erros
  // criar um state para armazenar os erros
  const [error, setErrorr] = useState(null);

  //
  // esta função é a primeira a ser chamada, por isso está sendo exportada no return
  // esta funçao faz a configuração do fetch, guarda na variável "config"
  // e transforma o conteúdo que vem por meio da props "data" no formato recebido pelo servidor.
  // Atualiza o valor de "method" por meio da props "method"
  // essas duas variáveis ("config" e "method") estão sendo monitoradas por httpRequest.

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method, // é o mesmo que "method: method"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }
  };

  //
  //
  // esta é a função monitora as mudanças em "config", "method" ou "url" e dispara a useEffect
  // ela é chamada quando há uma mudança no conteúdo da função "httpConfig" ou da props "url"
  // cria a variável "json"
  // verifica se o "method" é igual a "POST"
  // se for, cria a variável "response" que armazena a resposta da requisição fetch
  // com os parametros que vem de props e da variável "config"
  // armazena o conteúdo da resposta (response) em formato de json na variável "json".
  // em seguida salva este valor em "callFetch". A mudança desta "callFatch" vai chamar
  // a função de "fetchData" ("GET"), uma vez que está sendo monitorada
  // chama a função.

  //   5 - refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === "POST") {
        // configura a variável como loading, antes da requisição
        setLoading(true);

        const response = await fetch(url, config);

        json = await response.json();

        // depois que a requisição responde, configura o loading como false
        setLoading(false);
      }

      setCallFetch(json);
    };

    httpRequest();
  }, [config, url]);

  //
  //
  // useEffect dispara a função quando "url" ou "callFetch" mudam (valores nas chaves)
  // faz a requisição dos dados no servidor - "fetch" com o methodo "GET" uma vez que não altera o parâmetro
  // aguarda o "fetch" pela url vinda por props (neste caso a "url") na variável "response"
  // transforma o conteúdo da "response" em dados possíveis de ler na variável "json" e salva esses dados na variável "data".
  // por fim, chama a função para que comece a funcionar.

  useEffect(() => {
    const fetchData = async () => {
      // 8 - tratamento de erros.
      // quando chamada a função tenta (try) executar o que foi programado. Se conseguir ótimo,
      // mas se não conseguir, acontecerá um erro que será capturado (catch).
      try {
        // consfigura a variável como loading, antes da requisição
        setLoading(true);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error.message);
        setErrorr("Houve um erro ao carregar! :(");
      }

      // depois que a requisição responde, configura o loading como false
      // esta configuração está fora de trycatch porque independente se conseguir ou
      // der erro, a mensagem de loading deixa de aparecer
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  return { data, httpConfig, loading, error };
};
