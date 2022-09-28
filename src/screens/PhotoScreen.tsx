import config from "../config.json";

import styled from "styled-components";
import ErrorCard from "../components/ErrorCard";
import { Spinner } from "../components/Spinner";
import { useFlickr } from "../hooks/useFlickr";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useEffect } from "react";
import { PhotoCards } from "../components/PhotoCards";

const BottomSpinner = styled(Spinner)`
  margin-top: 24px;
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 32px;
  background-color: #e7e7e7;

  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PhotoScreen = () => {
  const {
    photos,
    apiState,
    error,
    fetchPhotos,
    loadNextPage,
    setFavoriteStatus,
  } = useFlickr(config.maxPageNumber, config.itemsPerPage);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  useInfiniteScroll(loadNextPage);

  return (
    <Container>
      {apiState === "error" ? <ErrorCard>{error}</ErrorCard> : undefined}
      {apiState === "loading" ? <Spinner /> : undefined}
      {photos ? (
        <PhotoCards photos={photos} onFavorite={setFavoriteStatus} />
      ) : undefined}
      {apiState === "loadingNext" ? <BottomSpinner /> : undefined}
    </Container>
  );
};
