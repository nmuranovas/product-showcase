import styled from "styled-components";
import { PhotoDto } from "../services/PhotoService";
import { PhotoCard } from "./PhotoCard";

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 500px;
  gap: 32px;

  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (min-width: 576px) {
    grid-auto-rows: 400px;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 300px;
  }
`;

export interface PhotoCardsProps {
  photos: PhotoDto[];
  onFavorite?: (photoId: string, status: boolean) => void;
}

export const PhotoCards = ({ photos, onFavorite }: PhotoCardsProps) => {
  return (
    <Container>
      {photos.map((photo) => (
        <PhotoCard
          key={`${photo.id}_${photo.fetchDateUTC}`}
          {...photo}
          onFavorite={onFavorite}
        />
      ))}
    </Container>
  );
};
