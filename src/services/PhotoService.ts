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
  fetchDateUTC: number;
}

function mapPhotoDto(photo: Photo, fetchDateUTC: number): PhotoDto {
  const sizeSuffix = "c";
  return {
    id: photo.id,
    url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeSuffix}.jpg`,
    title: photo.title,
    author: photo.owner,
    fetchDateUTC,
  };
}

const getPhotos = (page: number = 0, itemsPerPage: number = 24) =>
  fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.flickrApiKey}&text=minimalist&safe_search=1&page=${page}&per_page=${itemsPerPage}&sort=date-posted-asc&format=json&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((res) => {
      const utcFetchDate = new Date().getTime();
      return (res as RootObject).photos.photo.map((photo) =>
        mapPhotoDto(photo, utcFetchDate)
      );
    });

export const PhotoService = {
  getPhotos,
};
