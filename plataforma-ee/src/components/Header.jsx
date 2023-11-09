// LOGO Y BOTON DE INICIAR SESION Y REGISTARSE
import React from "react";
import styled from "styled-components";
import logo from "/Users/Magali/Proyecto-EI/plataforma-ei/src/Imagenes/Logo.png";
import { useNavigate } from "react-router-dom";


export default function Header(props){
    const navigate = useNavigate();
    return (
        <Container className="flex a-center j-between">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <button onClick={()=>navigate(props.login ? "/login" : "/singup")}>{props.login ? "Iniciar Session" : "Registrarse"}</button>
        </Container>
    )
}

const Container = styled.div`
   padding: 0 4rem;
   .logo{
    img{
        height: 5rem;
    }
   }
   button {
    padding: 0,5rem 1rem;
    background-color: yellow;
    border: none;
    cursor: pointer;
    color: black;
    border-radius: o,2rem;
    font-weight: bolder;
    font-size:1.05rem;
   }
`;