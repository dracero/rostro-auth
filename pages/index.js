import React, { useState } from "react";
import { connectToDatabase } from "../util/mongodb";
import WebcamCapture from "./camphot";
import { useDispatch } from "react-redux";

const mailUpdater = () => {
  const dispatch = useDispatch();
  const mailing = (mail) =>
    dispatch({
      type: "MAIL",
      payload: mail
    });
  return { mailing };
};

export default function Movies({ movies, Component, pageProps }) {
  const [mail, setMail] = useState("");
  const { mailing } = mailUpdater();
  const photo = (e) => {
    setMail(e);
    mailing(e);
  };
  //acá es donde tengo que tomar la foto y hacer el upsert

  return (
    <div>
      <select onChange={(event) => photo(event.target.value)}>
        <option disabled selected value>
          {" "}
          -- seleciona tu mail --{" "}
        </option>
        {movies.map((movie) => (
          <option>{movie.alumail}</option>
        ))}
      </select>
      <p></p>
      {mail !== "" ? <WebcamCapture /> : null}
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const movies = await db.collection("aluinsc").find({}).toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies))
    }
  };
}
