import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DonationModal from "../components/DonationModal";

const DonationPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleProceed = async (donate, donationData) => {
    if (donate && donationData) {
      try {
        const token = localStorage.getItem("token");
        await axios.post("/api/donations", donationData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Donation submitted successfully!");
      } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error("Failed to submit donation");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Make a Donation</h2>
      <p>Your donation can make a big difference!</p>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Donate Now
      </button>

      <DonationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onProceed={handleProceed}
      />
    </div>
  );
};

export default DonationPage;
