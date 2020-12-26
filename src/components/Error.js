import React from 'react';
import styled from '@emotion/styled';

const MensajeError = styled.p`
    background-color: #ff4a4a;
    padding: 1rem;
    color: #FFF;
    font-size: 25px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;  font-family: 'Montserrat';
    border-radius: 15px;
`;

const Error = ({mensaje}) => {
    return ( 
    <MensajeError>{mensaje}</MensajeError>
     );
}

export default Error;