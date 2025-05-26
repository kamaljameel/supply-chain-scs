"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const InquiriesTable = ({ onEditClick, refreshTrigger }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("abisolToken");
    }
    return null;
  };

  const fetchData = async () => {
    const abisolToken = getToken();
    if (!abisolToken) {
      console.error("No token found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/Inquiry", {
        headers: {
          Authorization: `Bearer ${abisolToken}`,
        },
      });
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleEdit = async (id) => {
    const abisolToken = getToken();
    if (!abisolToken) return;

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

    const abisolToken = getToken();
    if (!abisolToken) return;

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
      fetchData();
    } catch (error) {
      alert("Failed to delete inquiry");
      console.error("Delete error:", error);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (loading) {
    return (
      <div className="table-container shadow-sm rounded p-3 bg-white mt-4">
        <h5 className="mb-3">Inquiry List</h5>
        <div className="text-center p-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container shadow-sm rounded p-3 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Inquiry List</h5>
        <div className="d-flex align-items-center gap-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "250px" }}
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center p-3">
          <p>No inquiries found.</p>
        </div>
      ) : (
        <>
          <div className="table-responsive datatable-container">
            <table className="table table-striped table-hover  text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Sr #</th>
                  <th>PI #</th>
                  <th>PI Date</th>
                  <th>Due Date</th>
                  <th>Buyer Name</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item.InquiryID || index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.InquiryLine}</td>
                    <td>{item.ExpectedShipmentDate}</td>
                    <td>{item.ExpectedShipmentDate}</td>
                    <td>Alex</td>
                    <td>1209</td>
                    <td>{item.RevenueCurrency}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(item.InquiryID)}
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.InquiryID)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-3">
            <div className="text-muted">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)}{" "}
              of {filteredData.length} entries
            </div>
            {/* Pagination */}
            <div className="d-flex align-items-center gap-2">
              {totalPages > 1 && (
                <nav aria-label="Table pagination">
                  <ul className="pagination justify-content-center mb-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              )}

              <div className="d-flex align-items-center">
                <label htmlFor="itemsPerPage" className="form-label me-2 mb-0">
                  Show per show
                </label>
                <select
                  id="itemsPerPage"
                  className="form-select form-select-sm"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  style={{ width: "80px" }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InquiriesTable;
