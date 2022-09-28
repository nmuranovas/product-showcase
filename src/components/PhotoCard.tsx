import styled from "styled-components";
import { PhotoDto } from "../services/PhotoService";
import Button from "./Button";

const Container = styled.li`
  position: relative;

  border-radius: 4px;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  padding: 20px;

  position: absolute;
  inset: 0;

  opacity: 0;

  border-radius: inherit;

  transition: 0.25s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
  }
`;

const TitleText = styled.p`
  font-size: 1.375rem;
  font-weight: bold;
  color: white;

  overflow-wrap: anywhere;

  margin: 0 0 8px 0;

  text-align: center;
`;

const AuthorText = styled.p`
  font-size: 1.375rem;
  font-style: italic;
  color: white;

  overflow-wrap: anywhere;

  margin: 0 0 20px 0;

  text-align: center;
`;

const Separator = styled.span`
  display: block;
  border-bottom: 3px solid white;
  width: 25%;

  margin-bottom: 8px;

  border-radius: 4px;
`;

const truncateText = (str: string, maxLength: number = 36) =>
  `${str?.substring(0, maxLength)}${str.length > maxLength ? "..." : ""}`;

export interface PhotoCardProps extends PhotoDto {
  onFavorite?: (photoId: string, status: boolean) => void;
}

export const PhotoCard = ({
  url,
  title,
  author,
  id,
  favorite,
  onFavorite,
}: PhotoCardProps) => {
  return (
    <Container>
      <Image src={url} alt={title} />
      <Overlay>
        <TitleText>{truncateText(title)}</TitleText>
        <Separator />
        <AuthorText>By - {truncateText(author)}</AuthorText>
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
