import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";

const Categories = () => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <div>
      <h3>Categories</h3>

      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/category/all">All</Link>
        </li>
        {categories?.map((category, index) => (
          <li className="list-group-item" key={index}>
            <Link to={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
