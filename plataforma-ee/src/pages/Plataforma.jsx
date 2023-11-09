//HOME 
// No Puedo Scrollear
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackgroupImage from "../Imagenes/home.jpg";
import MovieLogo from "../Imagenes/homeTitle.png";
import {AiFillCaretRight} from "react-icons/ai";
import {AiOutlineInfoCircle} from "react-icons/ai";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from "../store";
import Slider from "../components/Slider";

export default function Plataforma(){

  const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state)=>state.plataforma.genresLoaded);
    const movies = useSelector((state)=>state.plataforma.movies);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getGenres())
    }, []);

    useEffect(() => {
      if (genresLoaded) {
        dispatch(fetchMovies({type: "all" }));
      }
    });

    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
    //console.log(movies);
    return (
      <Container>
        <Navbar isScrolled={isScrolled} />
        <div className="hero">
          <img
            src={BackgroupImage}
            alt="background"
            className="background-image"
          />
          <div className="cont">
            <div className="logo">
              <img src={MovieLogo} alt="Movie Logo" />
            </div>
            <div className="buttons flex">
              <button
                onClick={() => navigate("/player")}
                className="flex j-center a-center"
              >
                <AiFillCaretRight />
                Play
              </button>
              <button className="flex j-center a-center">
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div>
          </div>
        </div>
        <Slider movies={movies} />
      </Container>
    );
  }
  
  const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .cont {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;