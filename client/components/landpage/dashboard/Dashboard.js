import { useState, useEffect } from "react";
import styles from "./dashboard.css"; // Assuming you have a CSS module for styling
import Navbar from "@/components/landpage/Navbar";
import Footer from "@/components/landpage/Footer";
import { loginApi } from "@/utils/apiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import GoodsDeclarations from "./sidebarcomponent/GoodsDeclarations";
import Documentation from "./sidebarcomponent/Documentation";
import RoadTransport from "./sidebarcomponent/RoadTransport";
import SeaShipment from "./sidebarcomponent/SeaShipment";
import HomeCards from "./sidebarcomponent/HomeCards";
import AirShipment from "./sidebarcomponent/AirShipment";
import ChatGPTWithAutoQuestions from "./ChatGPTWithAutoQuestions";
import Opentest from "@/components/Opentest";
import SearatesWidget from "@/components/searates/SearatesWidget";
import ProductForm from "./sidebarcomponent/ProductForm";
import { Button, Modal } from "react-bootstrap";
import FullWidthModal from "./sidebarcomponent/FullWidthModal";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [pinnedLinks, setPinnedLinks] = useState([]);
  const [selectedPage, setSelectedPage] = useState("home");
  const [businessbutton, setbuisnessButton] = useState("");
  const [showNewProduct, setNewProductShow] = useState(false);

  const [showbuisness, setShowbuisness] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [pid, setpid] = useState("");
  const [companyOptions, setCompanyOptions] = useState([
    "Company A",
    "Company B",
    "Company C",
  ]);

  const addCompany = (newCompany) => {
    setCompanyOptions((prevOptions) => [...prevOptions, newCompany]);
  };

  const handleNewProductClose = () => setNewProductShow(false);
  const handleNewProductShow = () => setNewProductShow(true);

  const handleBuisnessShow = () => {
    setbuisnessButton("buisnessButton");
    setShowbuisness(true);
  };
  const handleMyProfileShow = () => {
    setbuisnessButton("buisnessButton");
    setShowbuisness(true);
    setShowMyProfile(true);
  };
  // const seefooter = () => {
  //   setSeeFooter(true);
  // };
  const handleFullWidthModalClose = () => {
    setShowbuisness(false);
  };
  const handlePinClick = (pageName) => {
    if (!pinnedLinks.includes(pageName)) {
      const updatedLinks = [...pinnedLinks, pageName];
      setPinnedLinks(updatedLinks);
      localStorage.setItem("pinnedLinks", JSON.stringify(updatedLinks));
    }
  };

  const handleLinkClick = (pageName) => {
    setSelectedPage(pageName);
  };

  const handleRemoveCard = (pageName) => {
    const updatedLinks = pinnedLinks.filter((link) => link !== pageName);
    setPinnedLinks(updatedLinks);
    localStorage.setItem("pinnedLinks", JSON.stringify(updatedLinks));
    if (selectedPage === pageName) {
      setSelectedPage("home");
    }
  };
  const handleCardClick = (pageName) => {
    setSelectedPage(pageName);
  };
  useEffect(() => {
    const savedPinnedLinks = JSON.parse(localStorage.getItem("pinnedLinks"));
    if (savedPinnedLinks) {
      setPinnedLinks(savedPinnedLinks);
    }

    async function fetchUser() {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get(`${loginApi}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, []);

  if (!user)
    return (
      <div className="d-flex justify-content-center my-5 align-items-center fs-4">
        Loading... Please{" "}
        <Link
          href="/login"
          className="btn bg-secondary text-white rounded-5 ms-3 px-4"
        >
          Login
        </Link>
      </div>
    );

  const renderMainContent = () => {
    switch (selectedPage) {
      case "home":
        return (
          <HomeCards
            onPinClick={handlePinClick}
            onCardClick={handleCardClick}
          />
        );
      case "Customs Declarations":
        return <GoodsDeclarations />;
      case "Documentation":
        return <Documentation />;
      case "Road Transport":
        return <RoadTransport />;
      case "Sea Shipment":
        return <SeaShipment />;
      case "Air Shipment":
        return <AirShipment />;
      default:
        return (
          <HomeCards
            onPinClick={handlePinClick}
            onCardClick={handleCardClick}
          />
        );
    }
  };

  const getIconForLink = (link) => {
    switch (link) {
      case "Documentation":
        return "bi bi-file-earmark-richtext me-2";
      case "Road Transport":
        return "bi bi-bus-front-fill me-2";
      case "Sea Shipment":
        return "bi bi-compass me-2";
      case "Customs Declarations":
        return "bi bi-box-fill me-2";
      case "Air Shipment":
        return "bi bi-airplane me-2";
      default:
        return "bi bi-pin";
    }
  };
  console.log("busi", showbuisness);
  return (
    <>
      <Navbar />
      <div className={`${styles.body} d-flex gap-2`}>
        <div className={`${styles.sidebar} p-3 sidebar d-flex flex-column `}>
          <div className="sidebaritems">
            {/* <div>
              <p>{user.id}</p>
            </div> */}
            <div className="my-2">
              <a
                href="#"
                className="text-left p-0 bg-transparent fs-14"
                onClick={() => handleLinkClick("home")}
              >
                <i className="bi bi-house-fill"></i> Home
              </a>
            </div>
            {pinnedLinks.map((link, index) => (
              <div
                key={index}
                className="my-2 dashlink d-flex align-items-center"
              >
                <a
                  href="#"
                  className={`text-left p-0 bg-transparent fs-6 ${
                    selectedPage === link ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick(link)}
                >
                  <i className={`${getIconForLink(link)} me-2`}></i> {link}
                </a>
                <i
                  className="bi bi-x-circle-fill text-danger ms-2"
                  onClick={() => handleRemoveCard(link)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            ))}
          </div>

          <Button
            className="fs-6 px-0 bg-transparent text-white mt-2 w-100 addproductbtn"
            onClick={handleMyProfileShow}
          >
            My Profile
          </Button>
          <Button
            className="fs-6 px-0 bg-transparent text-white mt-2 w-100 addproductbtn"
            onClick={handleNewProductShow}
          >
            Add Product
          </Button>

          <Button
            className="fs-6 px-0 bg-transparent text-white mt-2 w-100 addproductbtn"
            onClick={handleBuisnessShow}
          >
            Add Buisness
          </Button>
          <Modal
            show={showNewProduct}
            onHide={handleNewProductClose}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProductForm
                closeModel={handleNewProductClose}
                ///onFormSubmit={fetchProducts}
                productToEdit={pid}
              />
            </Modal.Body>
          </Modal>
        </div>
        <div
          className={`${styles["main-content"]} bg-white w-100 p-3  position-relative`}
        >
          <div className="d-flex justify-content-between align-items-center mb-3 rounded-3 shadow-sm bgBlue p-2 px-3">
            <div>
              <div className="input-group bg-bluelight rounded-2">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search ......"
                  aria-label="Recipient's username"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent border-0">
                    <i className="bi bi-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="userdata">
              <Link href="/profile" className="text-white">
                <i className="bi bi-person-circle me-2"></i>
                {user.FirstName} {user.LastName}
              </Link>
            </div>
          </div>
          <div className="dashboardcontainer">{renderMainContent()}</div>
          <div>
            {/* <ChatGPTWithAutoQuestions /> */}
            {/* <SearatesWidget /> */}
          </div>
          <div className="position-absolute bottom-0 end-0 start-0 mx-auto mb-3 text-center">
            {/* <span
              onMouseEnter={seefooter}
              className="seefooter rounded-3 shadow-sm border-1 px-3 py-1"
            >
              See Footer
            </span> */}
          </div>
        </div>
      </div>

      {/* <div
        className={`dashfooter ${seeFooter ? "footervisible" : ""}`}
        onClick={hidefooter}
        onMouseLeave={hidefooter}
      >
        <Footer />
      </div> */}
      <FullWidthModal
        show={showbuisness}
        companyOptions={companyOptions}
        addCompany={addCompany}
        onHide={handleFullWidthModalClose}
        businessbutton={businessbutton}
        showMyProfile={showMyProfile}
      />
    </>
  );
};

export default Dashboard;
