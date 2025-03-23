import { useProductAdmin } from "../Context/ProductContext";

const DeleteProductModal = ({ product, isOpen, onClose, onDelete }) => {
  const { deleteProduct } = useProductAdmin();
  if (!isOpen) return null;

  const handleDelete = async () => {
    deleteProduct(product).then((res) => {
      if (res.success) {
        onClose();
        onDelete();
      } else {
        console.log(res.data);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Delete Product
        </h2>
        <p className="text-gray-700">
          Are you sure you want to delete the following product?
        </p>
        <img
          src={product.image}
          alt=""
          className="w-24 h-24 object-cover mt-3 mx-auto rounded-md"
        />
        <p className="text-gray-700 mt-3">
          <strong>ID:</strong> {product._id}
        </p>
        <p className="text-gray-700">
          <strong>Name:</strong> {product.name}
        </p>
        <p className="text-gray-700">
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="text-gray-700">
          <strong>Stock:</strong> {product.stock}
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
