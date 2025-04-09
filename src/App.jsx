import { useEffect, useState } from "react";
import NavBar from "./assets/components/NavBar";
import Cart from "./assets/pages/Cart";
import Menu from "./assets/pages/Menu";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import axios from "axios";
import Admin from "./assets/pages/Admin";
import Item from "./assets/pages/Item";
import Footer from "./assets/components/Footer";


function App() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [originalItems, setOriginalItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [form , setForm] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: ''
  })
  const baseUrl = "http://localhost:5500";

  useEffect(() => {
    const data = async () => {
      const [products, categories] = await Promise.all([
        axios.get(`${baseUrl}/products`),
        axios.get(`${baseUrl}/categories`),
      ]);
      setItems(products.data);
      setOriginalItems(products.data);
      setCategories(categories.data);
      // console.log(categories.data);
    };
    data();
  }, []);

  const handleAddToCart = (id) => {
    const newItems = [...items];
    newItems.map((item) => {
      if (item.id === id) {
        if (item.count === 0) {
          item.count = 1;
        }
        item.inCart = !item.inCart;
      }
      return item;
    });
    setItems(newItems);
  };

  const searchParams = new URLSearchParams(window.location.search);
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const handleSelectedCategory = (id) => {
    setSelectedCategory(id);
    handlePageChange(1);
    searchParams.set("categoryId", id);
    // navigate(`/menu?categoryId=${id}`);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );
  };
  let filteredItems =
    selectedCategory == 0
      ? items
      : items.filter((item) => item.category == selectedCategory);

  // pagination
  const itemsPerPage = 6;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    searchParams.set("page", page);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  if (filteredItems.length < 4) {
    totalPages = 0;
  }
  filteredItems = filteredItems.slice(startIndex, endIndex);

  const handleIncreament = (id) => {
    const newItems = items.map((item) => ({
      ...item,
      count: item.id === id ? item.count + 1 : item.count,
    }));
    setItems(newItems);
  };

  const handleDecreament = (id) => {
    const newItems = [...items];
    newItems.map((item) => {
      if (item.id === id && item.count > 0) {
        item.count--;
      }
      return item;
    });
    setItems(newItems);
  };

  const handleReset = () => {
    const newItems = [...items];
    newItems.map((item) => (item.count = 0));
    newItems.map((item) => (item.inCart = false));
    setItems(newItems);
  };

  const handleDelete = (id) => {
    const newItems = [...items];
    newItems.map((item) => {
      if (item.id === id) {
        item.inCart = false;
        item.count = 0;
      }
      return item;
    });
    setItems(newItems);
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query === "") {
      setItems([...originalItems]);
    } else {
      const filteredItems = originalItems.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setItems(filteredItems);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }
    console.log(quantity);
    const newItems = [...items];
    newItems.map((item) => {
      if (item.id === id) {
        item.count = quantity;
        item.totalPrice = item.price * quantity;
      }
      return item;
    });
    setItems(newItems);
  };
  const navigate = useNavigate()

  const handleAddProduct = async () => {
    try { 
      const parsedPrice = parseFloat(form.price);
      const parsedCategoryId = parseInt(form.category);
      const lastItem = items[items.length - 1];
      const newId = lastItem ? parseInt(lastItem.id) + 1 : 1;
  
      const productToAdd = {        
        id: newId, 
        name: form.name,
        price: parsedPrice,     
        totalPrice: parsedPrice,
        category: parsedCategoryId,  
        count: 0,
        inCart: false,  
        imageUrl: form.imageUrl
      };
  
      const { data } = await axios.post(`${baseUrl}/products`, productToAdd);
  
      const updatedItems = [...items, data];
      setItems(updatedItems);
      setOriginalItems(updatedItems);
  
      navigate('/admin');
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong while adding the product.");
    }
  };
  

  const handleDeleteItem = async(id) =>{
    const deletedItem = await axios.delete(`${baseUrl}/products/${id}`)
    console.log(deletedItem.data)
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    setOriginalItems(newItems);
  }

  const handleEditItem = async (id, updatedItem) => {
    try {
      const existingItem = items.find((item) => item.id == id);
  
      if (!existingItem) {
        alert("Item not found");
        return;
      }
  
      const finalItem = {
        ...existingItem,
        ...updatedItem,
        price: parseFloat(updatedItem.price),
        category: parseInt(updatedItem.category),
      };
  
      // Send updated data to the server
      const response = await axios.put(`${baseUrl}/products/${id}`, finalItem);
  
      const updatedData = response.data;
  
      // Update local state
      const newItems = items.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
  
      setItems(newItems);
      setOriginalItems(newItems);
  
      console.log("Item updated successfully:", updatedData);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };
  
  


  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
}

  return (
    <>
      <NavBar
        items={items}
        numOfItems={items.reduce((sum, i) => i.count + sum, 0)}
      />
      <Routes>
        <Route
          path="/cart"
          element={
            <Cart
              items={items.filter((item) => item.inCart)}
              handleIncreament={handleIncreament}
              handleDecreament={handleDecreament}
              handleReset={handleReset}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="/menu"
          element={
            <Menu
              items={filteredItems}
              categories={categories}
              handleAddToCart={handleAddToCart}
              handleSelectedCategory={handleSelectedCategory}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              handleSearch={handleSearch}
              handleQuantityChange={handleQuantityChange}
            ></Menu>
          }
        ></Route>
        {/* <Route path="/admin" element={<Admin originalItems={originalItems}/>}>
          <Route path="/product" element={<Product/>}/>
        </Route> */}
       <Route path="/admin" element={<Admin originalItems={originalItems} handleDeleteItem={handleDeleteItem} handleChange={handleChange} form={form} categories={categories} handleEditItem={handleEditItem}/>}></Route>
       <Route path="/admin/item" element={<Item categories={categories} form={form} handleChange={handleChange} handleAddProduct={handleAddProduct}></Item>}></Route>
      </Routes>
<Footer></Footer>


     
    </>
  );
}

export default App;
