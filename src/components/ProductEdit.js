import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const ProductEdit = () => {
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState('');
  const [businessModels, setBusinessModels] = useState('');
  const [trl, setTrl] = useState('');
  const [investmentEffortCost, setInvestmentEffortCost] = useState('');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('https://api-test.innoloft.com/product/6781/')
      .then((response) => {
        setProduct(response.data);
        setDescription(response.data.description);
        setCategories(response.data.categories.join(', '));
        setBusinessModels(response.data.businessModels.join(', '));
        setTrl(response.data.trl);
        setInvestmentEffortCost(response.data.investmentEffort);
      });
  }, []);

  const handleDescriptionChange = (content) => {
    setDescription(content);
  };

  const handleCategoriesChange = (event) => {
    setCategories(event.target.value);
  };

  const handleBusinessModelsChange = (event) => {
    setBusinessModels(event.target.value);
  };

  const handleTrlChange = (event) => {
    setTrl(event.target.value);
  };

  const handleInvestmentEffortCostChange = (event) => {
    setInvestmentEffortCost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const updatedProduct = {
      ...product,
      description,
      categories: categories.split(', ').filter((category) => category),
      businessModels: businessModels.split(', ').filter((model) => model),
      trl,
      investmentEffortCost,
    };

    axios
      .put('https://api-test.innoloft.com/product/6781/', updatedProduct)
      .then(() => {
        setIsSubmitting(false);
        navigate('/product');
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-8 my-8">
        <div>
          <img src={product.picture} alt={product.name} className="w-full" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-500 mb-4">{product.type}</p>
          <Editor
            initialValue={product.description}
            onEditorChange={handleDescriptionChange}
            apiKey="your-api-key"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
            }}
          />
          <div className="my-4">
            <h3 className="font-bold mb-2">Technologies/Categories</h3>
            <input
              type="text"
              value={categories}
              onChange={handleCategoriesChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="my-4">
            <h3 className="font-bold mb-2">Business Models</h3>
            <input
              type="text"
              value={businessModels}
              onChange={handleBusinessModelsChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="my-4">
            <h3 className="font-bold mb-2">TRL</h3>
            <select
              value={trl}
              onChange={handleTrlChange}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select a TRL</option>
              <option value="1">TRL 1 - Basic principles observed</option>
              <option value="2">TRL 2 - Technology concept formulated</option>
              <option value="3">TRL 3 - Experimental proof of concept</option>
              <option value="4">TRL 4 - Technology validated in lab</option>
              <option value="5">
                TRL 5 - Technology validated in relevant environment
                (industrially relevant environment in the case of key enabling
                technologies)
              </option>
              <option value="6">
                TRL 6 - Technology demonstrated in relevant environment
                (industrially relevant environment in the case of key enabling
                technologies)
              </option>
              <option value="7">
                TRL 7 - System prototype demonstration in operational
                environment
              </option>
              <option value="8">TRL 8 - System complete and qualified</option>
              <option value="9">
                TRL 9 - Actual system proven in operational environment
                (competitive manufacturing in the case of the key enabling
                technologies; or in space)
              </option>
            </select>
          </div>
          <div className="my-4">
            <h3 className="font-bold mb-2">Investment Effort / Cost</h3>
            <input
              type="text"
              value={investmentEffortCost}
              onChange={handleInvestmentEffortCostChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductEdit;
