import { useCallback, useEffect, useState } from "react";
import config from "../config.json";

export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: any;
  farm: number;
  title: any;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface Photos {
  page: number;
  pages: string;
  perpage: number;
  total: string;
  photo: Photo[];
}

export interface RootObject {
  photos: Photos;
  stat: string;
}

export interface PhotoDto {
  id: string;
  url: string;
  title: string;
  author: string;
  favorite?: boolean;
}

function mapPhotoDto(photo: Photo): PhotoDto {
  const sizeSuffix = "c";
  return {
    id: photo.id,
    url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeSuffix}.jpg`,
    title: photo.title,
    author: photo.owner,
  };
}

const getPhotos = (pageNumber: number = 0, perPage: number = 24) =>
  fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.flickrApiKey}&text=shirt&safe_search=1&page=${pageNumber}&per_page=${perPage}&format=json&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return (res as RootObject).photos.photo.map(mapPhotoDto);
    });

export type ApiState = "loading" | "error" | "idle";

export const useFlickr = () => {
  const [apiState, setApiState] = useState<ApiState>("loading");
  const [photos, setPhotos] = useState<PhotoDto[]>([]);
  const [error, setError] = useState<string>();
  const [pageNumber, setPageNumber] = useState(1);

  const fetchPhotos = (pageNumber: number = 0, perPage: number = 24) => {
    setApiState("loading");
    getPhotos(pageNumber, perPage)
      .then((photoDtos) => {
        setApiState("idle");
        setPhotos(photoDtos);
      })
      .catch((error) => {
        setApiState("error");
        setError(error);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const loadNextPage = useCallback(() => {
    setApiState("loading");
    return getPhotos(pageNumber + 1)
      .then((photoDtos) => {
        setApiState("idle");
        setPhotos((ps) => ps && [...ps, ...photoDtos]);
        setPageNumber((ps) => ps + 1);
      })
      .catch((error) => {
        setApiState("error");
        setError(error);
      });
  }, [pageNumber]);

  const setFavoriteStatus = (photoId: string, status: boolean) => {
    const photoIndex = photos.findIndex((p) => p.id === photoId);

    if (photoIndex === -1) {
      return;
    }

    const newPhoto: PhotoDto = { ...photos[photoIndex], favorite: status };
    setPhotos((ps) => {
      const newArr = [...ps];
      newArr[photoIndex] = newPhoto;
      return newArr;
    });
  };

  return {
    apiState,
    error,
    photos,
    loadNextPage,
    setFavoriteStatus,
  };
};
