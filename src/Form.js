import React, { useState } from 'react';

const Form = (props) => {
  const [product, setProduct] = useState(props.data);
  const [submitted, setSubmitted] = useState(false);

  const changeFormData = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Check if the form is valid before submitting
    if (
      product.name.trim() && 
      product.name.trim().length >= 5 && 
      product.price > 0 && 
      product.category !== '-1'
    ) {
      props.add(product);  // Submit form if valid
    }
  };

  return (
    <div className='form-overlay'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            placeholder='Product Name'
            className='form-control mt-2'
            value={product.name}
            onChange={changeFormData}
          />
          {/* Show error if submitted and name is empty */}
          {submitted && !product.name.trim() && (
            <span className='text-danger'>Product name is required</span>
          )}
          {/* Show error if submitted and name length is less than 5 */}
          {submitted && product.name.trim().length > 0 && product.name.trim().length < 5 && (
            <span className='text-danger'>Product name must be at least 5 characters long</span>
          )}
        </div>

        <div className='form-group'>
          <label>Price:</label>
          <input
            type='number'
            name='price'
            placeholder='Enter Price'
            className='form-control mt-2'
            value={product.price}
            onChange={changeFormData}
          />
          {/* Show error if submitted and price is empty or invalid */}
          {submitted && (!product.price || product.price <= 0) && (
            <span className='text-danger'>Valid product price is required</span>
          )}
        </div>

        <div className='form-group'>
          <label>Category:</label>
          <select
            className='form-control mt-2'
            name='category'
            value={product.category}
            onChange={changeFormData}
          >
            <option value='-1'>Select Category</option>
            <option value='mobiles'>Mobiles</option>
            <option value='laptops'>Laptops</option>
            <option value='tv'>TVs</option>
          </select>
          {/* Show error if submitted and no category is selected */}
          {submitted && (product.category === '-1' || !product.category) && (
            <span className='text-danger'>Product category is required</span>
          )}
        </div>

        <button className='btn btn-primary float-end' type="submit">
          Send
        </button>

        <button
          className='btn btn-danger float-end'
          onClick={(e) => {
            e.preventDefault();
            props.closeForm();  // Close form on Cancel
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Form;
