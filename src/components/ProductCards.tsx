import styled from "styled-components";
import { PhotoDto } from "../hooks/useFlickr";
import { ProductCard } from "./ProductCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export interface ProductCardsProps {
  photos: PhotoDto[];
  onFavorite?: (photoId: string, status: boolean) => void;
}

export default function ProductCards({
  photos,
  onFavorite,
}: ProductCardsProps) {
  return (
    <Container>
      {photos.map((photo) => (
        <ProductCard key={photo.id} {...photo} onFavorite={onFavorite} />
      ))}
    </Container>
  );
}
