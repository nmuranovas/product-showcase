import { render, screen } from "@testing-library/react";
import { PhotoDto } from "../services/PhotoService";
import { PhotoCards } from "./PhotoCards";

describe("PhotoCards", () => {
  const testPhotos: PhotoDto[] = Array.from(Array(10)).map((_, index) => ({
    title: "Title",
    author: "Author",
    fetchDateUTC: 123,
    id: index.toString(),
    url: "testUrl",
    favorite: false,
  }));

  it("should display 10 photo cards", () => {
    render(<PhotoCards photos={testPhotos} />);

    expect(screen.getAllByText(testPhotos[0].title)).toHaveLength(
      testPhotos.length
    );
  });
});
