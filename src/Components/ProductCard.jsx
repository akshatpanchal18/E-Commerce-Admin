import { RiDeleteBin5Fill, RiEditBoxFill } from "react-icons/ri";
import { Amount } from "../Helpers/helper";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product, onEdit, onDelete, onClose }) => {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-lg p-4">
      <NavLink to={`/${product._id}`}>
        <div className="rounded-2xl overflow-hidden">
          <img
            src={
              product.image ||
              "https://blocks.astratic.com/img/general-img-portrait.png"
            }
            alt="Roadster Outfit"
            className="w-full h-72 object-cover"
          />
        </div>
      </NavLink>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">
            {truncateText(product.name, 5)}
          </h3>
          <p className="text-gray-500 text-sm">
            {truncateText(product.description, 5)}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-indigo-600 font-bold text-lg">
              <Amount amount={product.price} />
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => onEdit(product)}
            className=" p-1  text-blue-500 "
          >
            <RiEditBoxFill fontSize={30} />
          </button>
          <button onClick={() => onDelete(product)} className="text-red-500 ">
            <RiDeleteBin5Fill fontSize={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
