"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-react";
import DataTablesCore from "datatables.net-dt";
// import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

DataTable.use(DataTablesCore);

const InquiriesTable = ({ onEditClick, refreshTrigger }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const abisolToken = localStorage.getItem("abisolToken");

  if (!abisolToken) {
    console.error("No token found.");
    return;
  }

  const fetchData = async () => {
    if (!abisolToken) return;
    try {
      const response = await axios.get("http://localhost:3001/api/Inquiry", {
        headers: {
          Authorization: `Bearer ${abisolToken}`,
        },
      });
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [abisolToken, refreshTrigger]); // Added refreshTrigger to refetch when it changes

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/Inquiry/${id}`, {
        headers: {
          Authorization: `Bearer ${abisolToken}`,
        },
      });
      onEditClick(res.data);
      console.log("akbar", res.data);
    } catch (error) {
      console.error("Edit failed", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );
    if (!confirmDelete) return;

    console.log("Attempting to delete inquiry with ID:", id);

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/Inquiry/${id}`,
        {
          headers: {
            Authorization: `Bearer ${abisolToken}`,
          },
        }
      );
      console.log("Delete response:", response);
      alert("Inquiry deleted successfully");
      fetchData(); // Refresh the table data after delete
    } catch (error) {
      alert("Failed to delete inquiry");
      console.error("Delete error:", error);
    }
  };

  // Formatting data for the table with edit and delete actions
  const formattedData = data.map((item) => [
    item.InquiryID, // InquiryID for display
    item.InquiryLine, // InquiryLine for display
    item.InquiryID, // InquiryID is also used for action buttons
  ]);

  return (
    <div className="table-responsive">
      <DataTable
        data={formattedData}
        columns={[
          { title: "Inquiry ID" },
          { title: "Inquiry Line" },
          {
            title: "Actions",
            orderable: false,
            createdCell: (td, cellData, rowData) => {
              const id = rowData[0]; // rowData[0] is InquiryID
              td.innerHTML = `
                <button class="btn btn-sm btn-primary edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
              `;
              // Attach event listeners directly to the buttons
              td.querySelector(".edit-btn").onclick = () => handleEdit(id);
              td.querySelector(".delete-btn").onclick = () => handleDelete(id);
            },
          },
        ]}
      />
    </div>
  );
};

export default InquiriesTable;
