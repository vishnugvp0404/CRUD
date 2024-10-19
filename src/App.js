import React, { useEffect, useState } from 'react';
import Table from './table'; 
import { getData,deleteData, postData ,putData} from './api';
import Form from './Form';

const App = () => {
  const [products, setProducts] = useState([]);
  const [openForm, setopenForm] = useState(false);
  const [initialForm,setForm] = useState({
    name:'',price:'',category:''
  })
  const [edit,setEdit] = useState(false);

  useEffect(() => {
    getProducts();
  }, []); 

  const getProducts = async () => {
    try{
      let res = await getData();
      console.log('API Response:', res);
      setProducts(res.data || []);  
    } catch (error){
      console.error('Failed to fetch products:', error);
    }
  };
  const deleteProducts = async (id) => {
    try {
      await deleteData(id);
      getProducts();
      } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  const addProducts= async (product) => {

    let data={
      name:product.name,
      price:product.price,
      category:product.category
    }


    try {
      if(edit)
        await putData(product.id,data);
      else
        await postData(data);
      getProducts();
      setopenForm(false)
      } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  const editProducts= async (data) => {
    try {
      setForm(data)
      setopenForm(true)
      setEdit(true)
      } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  let showForm = () =>{
    setopenForm(true);
    setForm({
      name:'',price:'',category:''
    })
  }
  let closeForm = () =>{
    setopenForm(false);
  }
  

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-primary">Crud Operations</h2>
      <button className="btn btn-primary" onClick={()=>{
        showForm()
      }}>Add Product</button>
      <Table products={products} delete={deleteProducts} edit={editProducts}/> {/* Pass products prop */}
      {
        openForm && <Form closeForm={closeForm} data={initialForm} add={addProducts}/>
      }
    </div>
  );
};

export default App;
