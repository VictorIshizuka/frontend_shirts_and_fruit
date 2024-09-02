import { useParams } from "react-router-dom";
import { useGetPageQuery } from "../../slices/pagesApiSlice";
import Loader from "../../components/Loader";

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

  return <div>{page?.body}</div>;
};
