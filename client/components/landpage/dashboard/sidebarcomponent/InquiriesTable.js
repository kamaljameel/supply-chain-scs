"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-react";
import DataTablesCore from "datatables.net-bs5"; // Bootstrap 5 theme
// import "datatables.net-select-bs5";
// import "datatables.net-responsive-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

DataTable.use(DataTablesCore);

const InquiriesTable = ({ onEditClick, refreshTrigger }) => {
  const [data, setData] = useState([]);

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
    item.InquiryID,
    item.InquiryLine,
    item.ExpectedShipmentDate,
    item.Carrier,
    item.RevenueCurrency,
    item.InquiryID,
  ]);

  return (
    <div className="table-container shadow-sm rounded p-3 bg-white mt-4">
      <h5 className="mb-3">Inquiry List</h5>
      <DataTable
        className="table table-striped table-hover table-bordered text-center align-middle"
        data={formattedData}
        columns={[
          { title: "Inquiry ID" },
          { title: "Inquiry Line" },
          { title: "Expected Shipping Date" },
          { title: "Carrier" },
          { title: "Currency" },
          {
            title: "Actions",
            orderable: false,
            createdCell: (td, cellData, rowData) => {
              const id = rowData[0];
              td.innerHTML = `
            <div class="d-flex">
            <button class="btn btn-sm btn-outline-primary me-2 edit-btn">
              <i class="bi bi-pencil-square"></i> Edit
            </button>
            <button class="btn btn-sm btn-outline-danger delete-btn">
              <i class="bi bi-trash"></i> Delete
            </button>
            </div>
          `;
              td.querySelector(".edit-btn").onclick = () => handleEdit(id);
              td.querySelector(".delete-btn").onclick = () => handleDelete(id);
            },
          },
        ]}
        options={{
          paging: true,
          pageLength: 5,
          lengthMenu: [5, 10, 25, 50],
          responsive: true,
          language: {
            search: "_INPUT_",
            searchPlaceholder: "Search inquiries...",
            lengthMenu: "Show _MENU_ entries",
          },
        }}
      />
    </div>
  );
};

export default InquiriesTable;
