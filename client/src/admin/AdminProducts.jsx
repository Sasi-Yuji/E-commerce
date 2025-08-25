import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Table, Spinner } from "react-bootstrap";

const API = "http://localhost:5000/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (editingId) {
        await axios.put(`${API}/${editingId}`, data, config);
        alert("Product updated!");
      } else {
        await axios.post(API, data, config);
        alert("Product created!");
      }

      setFormData({ name: "", description: "", price: "", category: "", image: null });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error creating/updating product", err);
      alert("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
      alert("Error deleting product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: null,
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4 className="mb-3 text-center">{editingId ? "Edit Product" : "Add New Product"}</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={handleChange} />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">{editingId ? "Update Product" : "Create Product"}</Button>
              {editingId && (
                <Button
                  variant="secondary"
                  className="w-100 mt-2"
                  onClick={() => { setEditingId(null); setFormData({ name: "", description: "", price: "", category: "", image: null }); }}
                >
                  Cancel Edit
                </Button>
              )}
            </Form>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="p-3 shadow-sm">
            <h4 className="mb-3 text-center">Manage Products</h4>
            {loading ? (
              <div className="text-center"><Spinner animation="border" /></div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <Table bordered hover responsive style={{ minWidth: "750px" }}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? products.map(product => {
                      const imageUrl = product.image ? `http://localhost:5000/uploads/${product.image.replace(/^\/uploads\//, "")}` : null;

                      return (
                        <tr key={product._id}>
                          <td>
                            <img
                              src={imageUrl || "https://via.placeholder.com/60"}
                              alt={product.name || "No Image"}
                              width="60"
                              height="60"
                              style={{ objectFit: "cover", borderRadius: "8px" }}
                              onError={e => e.target.src = "https://via.placeholder.com/60"}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>₹{product.price}</td>
                          <td>{product.description}</td>
                          <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(product)}>Edit</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="5" className="text-center">No products found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProducts;
