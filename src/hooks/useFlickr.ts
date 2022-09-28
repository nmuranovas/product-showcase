import { useCallback, useState } from "react";
import { PhotoDto, PhotoService } from "../services/PhotoService";

export type ApiState = "idle" | "loading" | "loadingNext" | "error";

export const useFlickr = (maxPageNumber: number, itemsPerPage: number) => {
  const [apiState, setApiState] = useState<ApiState>("idle");
  const [photos, setPhotos] = useState<PhotoDto[]>([]);
  const [error, setError] = useState<string>();
  const [pageNumber, setPageNumber] = useState(1);

  const fetchPhotos = useCallback(() => {
    setApiState("loading");
    return PhotoService.getPhotos(1, itemsPerPage)
      .then((photoDtos) => {
        setApiState("idle");
        setPhotos(photoDtos);
      })
      .catch((error) => {
        setApiState("error");
        setError(`Error fetching photos ${error}`);
      });
  }, [itemsPerPage]);

  const loadNextPage = useCallback(() => {
    if (!photos) {
      return Promise.reject("Did not load initial photos.");
    }

    if (pageNumber >= maxPageNumber) {
      return Promise.resolve("End of allowed GETs reached.");
    }

    setApiState("loadingNext");
    return PhotoService.getPhotos(pageNumber + 1, itemsPerPage)
      .then((photoDtos) => {
        setApiState("idle");
        setPhotos((ps) => ps && [...ps, ...photoDtos]);
        setPageNumber((ps) => ps + 1);
      })
      .catch(() => {
        // sink error
      });
  }, [pageNumber, maxPageNumber, itemsPerPage]);

  const setFavoriteStatus = (photoId: string, status: boolean) => {
    const photoIndex = photos.findIndex((p) => p.id === photoId);
    if (photoIndex === -1) {
      return;
    }

    setPhotos((ps) => {
      const newPhoto: PhotoDto = { ...photos[photoIndex], favorite: status };
      const newArr = [...ps];
      newArr[photoIndex] = newPhoto;
      return newArr;
    });
  };

  return {
    apiState,
    error,
    photos,
    fetchPhotos,
    loadNextPage,
    setFavoriteStatus,
  };
};
