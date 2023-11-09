// REGISTARSE

import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import BackgroupImage from "../components/BackgroupImage";
import Header from "../components/Header";
import {firebaseAuth} from "../utils/firebase-config";

export default function SingUp(){
    const [showPassword,setShowPassword]=useState(false);
    const [formValues,setFormValues] =useState({
        email:"",
        password:"",
    });

    const navigate = useNavigate();

    const handleSignIn = async () => {
        try{
            const {email,password} =formValues;
            await createUserWithEmailAndPassword(firebaseAuth,email,password);
        } catch(err){
            console.log(err);
        }
    };

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser)navigate("/");
    });

    return (
    <Container showPassword={showPassword}>
        <BackgroupImage />
        <div className="content">
            <Header login/>
            < div className="body flex column a-center j-center">
            <div className="text flex column">
                <h1>Peliculas, Series, TV en vivo y mucho mas</h1>
                <h4>Mirar ahora</h4>
                <h6>
                    Listo para mirar? Ingresa tu Email o crea tu membresia
                </h6>
            </div>
            <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Registarse</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Acceder</button>}
        </div>
      </div>
    </Container>
);
}


const Container = styled.div`
position: relative;
.content{
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    wight: 100vw;
    display: grid;
    grid-template-rows: 15vh, 85vh;
    .body{
        gap:1rem;
        .text{
            gap:1rem;
            text-align:center;
            font-size: 2rem;
            h1 {
                padding: 0 25rem;
            }
        }
    .form{
        display:grid;
        grid-template-columns: ${({showPassword})=>
            showPassword ? "1fr 1fr":"2fr 1fr"};
        width: 60%;
        input {
            color: black;
            border:none;
            padding: 1.5rem;
            font-size: 1.2rem;
            border: 1px solid black;
            &:focus {
                outline: none;
            }
        }
            button{
                padding: 0,5rem 1rem;
                background-color: yellow;
                border: none;
                cursor: pointer;
                color: black;
                font-weight: bolder;
                font-size:1.05rem;
            }
        }
    button{
        padding: 0,5rem 1rem;
        background-color: yellow;
        border: none;
        cursor: pointer;
        color: black;
        border-radius: o,2rem;
        font-weight: bolder;
        font-size:1.05rem;
    }
    }
}`;
