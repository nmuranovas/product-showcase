import styled from "styled-components";
import { PhotoDto } from "../hooks/useFlickr";
import Button from "./Button";

const Container = styled.li`
  position: relative;
  display: flex;

  flex: 1 1 30%;
  padding: 8px;
  height: 30vh;

  border-radius: 4px;
  overflow: hidden;

  @media screen and (max-width: 480px) {
    flex: 1 0 100%;
    height: 50vh;
  }

  @media screen and (max-width: 768px) {
    flex: 1 0 100%;
    height: 50vh;
  }

  @media screen and (max-width: 1024px) {
    flex: 1 0 48%;
    height: 40vh;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;

  border-radius: inherit;
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  padding: 2rem;

  position: absolute;
  inset: 8px;

  overflow: hidden;
  opacity: 0;

  border-radius: inherit;

  transition: 0.25s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
    opacity: 1;
  }
`;

const TitleText = styled.p`
  font-size: 1.375rem;
  font-weight: bold;
  color: white;

  margin: 0 0 8px 0;

  text-align: center;
`;

const AuthorText = styled.p`
  font-size: 1.375rem;
  font-style: italic;
  color: white;

  margin: 0 0 8px 0;

  text-align: center;
`;

const Separator = styled.span`
  display: block;
  border: 4px solid white;
  width: 25%;

  margin-bottom: 8px;

  border-radius: 4px;
`;

export interface ProductCardProps extends PhotoDto {
  onFavorite?: (photoId: string, status: boolean) => void;
}

export const ProductCard = ({
  url,
  title,
  author,
  id,
  favorite,
  onFavorite,
}: ProductCardProps) => {
  return (
    <Container>
      <Image src={url} alt={title} />
      <Overlay>
        <TitleText>{title?.substring(0, 36)}</TitleText>
        <Separator />
        <AuthorText>By -{author.substring(0, 36)}</AuthorText>
        <Button
          label={favorite ? "Unfavorite" : "Favorite"}
          onClick={() => {
            onFavorite?.(id, !favorite);
          }}
        />
      </Overlay>
    </Container>
  );
};
