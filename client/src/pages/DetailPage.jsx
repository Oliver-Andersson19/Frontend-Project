import React from "react";
import MovieDesc from "../components/DetailPage/MovieDesc";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { Container } from "react-bootstrap";
import ScreeningsList from "../components/DetailPage/ScreeningsList";
import MovieCaruosel from "../components/MovieCaruosel";
import TrailerComponent from "../components/TrailerComponent";

/**
 * @author Louise Johansson
 * @description Renders the information about the film based on the movie id. Movie id comes from params,
 * fetches with useFetchData hook.Fetches similar movie to send as props to CarouselComponent
 */

function DetailPage() {
  const { movieId } = useParams();
  const { loading, err, data } = useFetchData(`/api/movies/${movieId}`);

  return (
    <>
      <Container fluid className="detail-page-container m-0 p-0 justify-content-center">
        {err && <p>Filmdetaljer kunde inte visas, försök igen senare</p>}
        {loading ? (
          <p>laddar...</p>
        ) : (
          <>
            <TrailerComponent movie={data?.movie} />
            <MovieDesc movie={data?.movie} />
          </>
        )}
      </Container>
      {err && <p>Filmdetaljer kunde inte visas, försök igen senare</p>}
      {loading ? (
        <p>laddar...</p>
      ) : (
        <>
          <ScreeningsList movie={data?.movie} movieId={movieId} />

          <h2 className="mt-5 line-center text-center">Liknande filmer</h2>
          <MovieCaruosel {...{ url: `/api/filter?query=${data?.movie.Genre}`, movieId }} />
        </>
      )}
    </>
  );
}

export default DetailPage;