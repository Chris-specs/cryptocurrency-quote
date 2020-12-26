import React,{ useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    font-family: 'Montserrat';
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #8c4aff;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #733ece;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // state del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'US Dollar' },
        { codigo: 'MXN', nombre: 'Mexican Peso' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Pound Sterling' }
    ]

    //Utilizar useMoneda
    const [ moneda, SelectMonedas, actualizarState ] = useMoneda('Choose your currency', '', MONEDAS);

    //Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Choose your cryptocurrency', '', listacripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url)

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);


    // cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }


    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="All fields are required" />: null}

            <SelectMonedas/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calculate"
            />
        </form>
     );
}

export default Formulario;