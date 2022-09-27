import "./App.css";
import ErrorCard from "./components/ErrorCard";
import ProductCards from "./components/ProductCards";
import { useFlickr } from "./hooks/useFlickr";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import Layout from "./Layouts/Layout";

function App() {
  const { photos, apiState, loadNextPage, setFavoriteStatus } = useFlickr();

  useInfiniteScroll(() => {
    return loadNextPage();
  });

  return (
    <Layout>
      {apiState === "error" ? (
        <ErrorCard>Error fetching cards</ErrorCard>
      ) : undefined}
      {apiState === "loading" && photos?.length === 0 ? (
        <p>Loading</p>
      ) : undefined}
      {photos ? (
        <ProductCards photos={photos} onFavorite={setFavoriteStatus} />
      ) : undefined}
      {apiState === "loading" && photos && photos.length > 0 ? (
        <p>Loading next</p>
      ) : undefined}
      <button onClick={loadNextPage}>Load photos</button>
    </Layout>
  );
}

export default App;
