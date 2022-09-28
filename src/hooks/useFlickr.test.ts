import { useFlickr } from "./useFlickr";
import {
  act,
  renderHook,
  RenderHookResult,
  waitFor,
} from "@testing-library/react";
import { PhotoDto, PhotoService } from "../services/PhotoService";

describe("useFlickr", () => {
  const testPhotos: PhotoDto[] = Array.from(Array(10)).map((_, index) => ({
    title: "Title",
    author: "Author",
    fetchDateUTC: 123,
    id: index.toString(),
    url: "testUrl",
    favorite: false,
  }));

  beforeEach(() => {
    jest.restoreAllMocks();
    jest
      .spyOn(PhotoService, "getPhotos")
      .mockReturnValue(Promise.resolve(testPhotos));
  });

  it("should have idle initial state", async () => {
    const { result } = renderHook(() => useFlickr(12, 12));

    expect(result.current.apiState).toEqual("idle");
  });

  it("should have idle state after fetch", async () => {
    const { result } = renderHook(() => useFlickr(12, 12));

    await act(() => result.current.fetchPhotos());

    expect(result.current.apiState).toEqual("idle");
  });

  it("should contain 10 photos on fetch", async () => {
    jest
      .spyOn(PhotoService, "getPhotos")
      .mockReturnValue(Promise.resolve(testPhotos));

    const { result } = renderHook(() => useFlickr(12, 12));

    await act(() => result.current.fetchPhotos());

    expect(result.current.photos).toHaveLength(10);
  });

  it("should contain 20 photos on fetch and fetchNext", async () => {
    jest
      .spyOn(PhotoService, "getPhotos")
      .mockReturnValue(Promise.resolve(testPhotos));

    const { result } = renderHook(() => useFlickr(12, 12));

    await act(() => result.current.fetchPhotos());
    await act(() => result.current.loadNextPage() as Promise<void>);

    expect(result.current.photos).toHaveLength(20);
  });
});
