import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Montserrat';
    color: #FFF;
    font-weight: 600;
    font-size: 2.2rem;
    margin-top: 2rem;
    margin-bottom:0.5rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {

    //console.log(opciones);

    //State de nuestro custom hook
    const [state, actualizarState] = useState(stateInicial);


    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => actualizarState(e.target.value)}
                value={state}
            >
                <option value=""> Select </option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    //Retornar state, interfaz y fn que modifica el state
    return [state, SelectCripto, actualizarState];
}

export default useCriptomoneda;