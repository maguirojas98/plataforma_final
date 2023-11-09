// IMAGEN DE FONDO 
import React from "react";
import background from "/Users/Magali/Proyecto-EI/plataforma-ei/src/Imagenes/Fondo.jpeg";
import styled from "styled-components";

export default function BackgroupImage(){
    return (
        <Container>
            <img src={background} alt="background" />
        </Container>
    );
}

  const Container = styled.div`
    height: 100vh;
    width: 100vw;
    img{
        height: 100vh;
        width: 100vw;
    }
`;
