import { useParams } from "react-router-dom";
import { useGetPageQuery } from "../../slices/pagesApiSlice";
import Loader from "../../components/Loader";
import HTMLReactParser from "html-react-parser";

export const Page = () => {
  const { slug } = useParams();

  const currentSlug = slug || "home";
  const { data: page, isLoading, error } = useGetPageQuery(currentSlug);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error.data.message}</p>;
  }

  return <div>{HTMLReactParser(page?.body)}</div>;
};
