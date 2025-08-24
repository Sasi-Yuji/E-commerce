import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DonationModal = ({ show, onClose, onProceed }) => {
  const [showForm, setShowForm] = useState(false);
  const [donation, setDonation] = useState({
    title: "",
    itemType: "",
    description: "",
    quantity: "",
    condition: "New",
  });

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  const handleNo = () => {
    onClose();
    onProceed(false, null);
  };

  const handleDonate = (e) => {
    e.preventDefault();
    onProceed(true, donation);
    onClose();
    setShowForm(false);
    setDonation({
      title: "",
      itemType: "",
      description: "",
      quantity: "",
      condition: "New",
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Would you like to donate an item?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!showForm ? (
          <div>
            <p>Your contribution of clothes, shoes, or essentials can help others!</p>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleNo}>
                No, Continue to Payment
              </Button>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Yes, Donate and Continue
              </Button>
            </div>
          </div>
        ) : (
          <Form onSubmit={handleDonate}>
            <Form.Group className="mb-3">
              <Form.Label>Donation Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={donation.title}
                onChange={handleChange}
                placeholder="Enter donation title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Item Type</Form.Label>
              <Form.Select name="itemType" value={donation.itemType} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="food">Food</option>
                <option value="clothes">Clothes</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
                <option value="hygiene">Hygiene</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={donation.description}
                onChange={handleChange}
                placeholder="Brief description about the item"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={donation.quantity}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Condition</Form.Label>
              <Form.Select name="condition" value={donation.condition} onChange={handleChange}>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Used">Used</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleNo}>Cancel</Button>
              <Button variant="success" type="submit">Donate and Continue</Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DonationModal;
