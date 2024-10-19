import React from 'react';

const Table = (props) => {
  // Ensure products is an array and not empty
  if (!Array.isArray(props.products) || props.products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <table className='table m-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            props.products.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>{data.category}</td>
                <td><button className='btn btn-primary m-1' onClick={()=>{
                  props.edit(data)
                }}>Edit</button></td>
                <td><button className='btn btn-danger m-1' onClick={()=>{
                  props.delete(data.id)
                }}>Delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
