import React, {Fragment, useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './Cryptocurrency_PNG.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  flex: 1 0 auto;
  max-width: 900px; 
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap:2rem;
  }
  @media (max-width:992px) {
    padding-left: 4%;
    padding-right: 4%;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Montserrat';
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top:80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #8c4aff;
    display:block;
  }
`;

const Footer = styled.footer`
  font-family: 'Montserrat';
  color: #FFF;
  display: flex;
  justify-content: center;
  padding: 2rem;
  flex-shrink: 0;
`;

const Link = styled.a`
  color: #8c4aff;
  text-decoration: none;
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
          //evitamos la ejecucion la primera vez
        if(moneda === '') return;

        // consultar la api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);

        // mostrar el spinner
        guardarCargando(true);

        // ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          // cambiar el estado de cargando
          guardarCargando(false);

          // guardar cotizacion
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        }, 2000)

        
    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>

  return (
    <Fragment>
      <Contenedor>
        <div>
          <Imagen src={imagen} alt="imagen cripto" />
        </div>
        <div>
          <Heading>Quote Cryptocurrencies Instantly</Heading>

          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />

          {componente}
        </div>
      </Contenedor>
      <Footer>
        <span>
          Find the code in <Link href="https://github.com/Chris-specs/cryptocurrency-quote">GitHub</Link>
        </span>
      </Footer>
    </Fragment>
  );
}

export default App;
