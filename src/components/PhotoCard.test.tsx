import { fireEvent, render, screen } from "@testing-library/react";
import { PhotoDto } from "../services/PhotoService";
import { PhotoCard } from "./PhotoCard";

describe("PhotoCard", () => {
  const testProps: PhotoDto = {
    title: "Title",
    author: "Author",
    fetchDateUTC: 123,
    id: "id",
    url: "testUrl",
    favorite: false,
  };

  it("should display title and author text", () => {
    render(<PhotoCard {...testProps} />);

    expect(screen.getByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/By - Author/i)).toBeInTheDocument();
  });

  it("should truncate title and author text to be truncated with ellipsis", () => {
    render(
      <PhotoCard
        {...testProps}
        author={testProps.author.repeat(10)}
        title={testProps.title.repeat(10)}
      />
    );

    expect(screen.getByText(/Title/i)).toHaveTextContent("...");
    expect(screen.getByText(/Author/i)).toHaveTextContent("...");
  });

  it("should invoke onFavorite with id and true when pressed", () => {
    const onFavorite = jest.fn();

    render(<PhotoCard {...testProps} onFavorite={onFavorite} />);
    const favoriteButtonElement = screen.getByText(/Favorite/i);
    fireEvent.click(favoriteButtonElement);

    expect(onFavorite).toHaveBeenCalledWith(testProps.id, true);
  });

  it("should display unfavorite button if photo already favorited", () => {
    render(<PhotoCard {...testProps} favorite />);

    expect(screen.getByText(/Unfavorite/i)).toBeInTheDocument();
  });

  it("should display image with alt and src attributes", () => {
    render(<PhotoCard {...testProps} />);

    const imageElement = screen.getByAltText(testProps.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", testProps.url);
  });
});
