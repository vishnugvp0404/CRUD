import axios from "axios";

const url="http://localhost:3000/products"

export async function getData() {
    return await axios.get(url);
}

export async function deleteData(id) {
    return await axios.delete(`${url}/${id}`);
}

// Modified postData function to ensure sequential IDs
export async function postData(data) {
    try {
        // Fetch all existing products
        const response = await axios.get(url);
        const products = response.data;

        // Find the highest ID in the existing products and increment it
        const maxId = products.length > 0 ? Math.max(...products.map(product => product.id)) : 0;
        const newProduct = { ...data, id: maxId + 1 }; // Assign the new ID

        // Post the new product with the assigned sequential ID
        return await axios.post(url, newProduct, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error posting data:", error);
    }
}
export async function putData(id,data) {
    try {
        // Fetch all existing products
        const response = await axios.get(url);
        const products = response.data;

        // Find the highest ID in the existing products and increment it
        const maxId = products.length > 0 ? Math.max(...products.map(product => product.id)) : 0;
        const newProduct = { ...data, id: maxId + 1 }; // Assign the new ID

        // Post the new product with the assigned sequential ID
        return await axios.put(url+"/"+id, newProduct, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error posting data:", error);
    }
}

