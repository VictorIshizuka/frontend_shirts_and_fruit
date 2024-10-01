import { useGetProductImagesQuery } from "../../../slices/productsApiSlice";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductGallery = ({ id }) => {
  const { data: images } = useGetProductImagesQuery(id);
  const galleryImages = images?.map(image => ({
    original: `/gallery/${id}/${image}`,
    thumbnail: `/gallery/${id}/${image}`,
  }));

  return (
    <div className="mt-3">
      {galleryImages?.length > 0 ? (
        <ImageGallery items={galleryImages} />
      ) : (
        <h3>No aditional images avaliable</h3>
      )}
    </div>
  );
};

export default ProductGallery;
