import React from "react";
import styles from "./dashboard.css";
import Navbar from "@/components/landpage/Navbar";
import Footer from "@/components/landpage/Footer";

const Dashboard = () => {
  const username = "John Doe"; // Replace with dynamic username
  const userImage = "./img/user.png"; // Replace with dynamic user image path

  return (
    <>
      <Navbar />
      <div className={`${styles.body} p-3 d-flex gap-5`}>
        <div className={`${styles.sidebar} bg-white p-3 rounded-3 sidbar`}>
          <div className="text-center mb-4">
            <img
              src="./img/iscbgs.svg"
              alt="User Profile"
              width={50}
              height={50}
            />
          </div>

          <div className={styles["profile-section"]}>
            <img
              src={userImage}
              alt="User Profile"
              width={30}
              height={30}
              className="me-2"
            />
            <span className={styles.username}>{username}</span>
            <button
              className={`${styles["edit-button"]} btn d-block bg-primary text-white my-2 rounded-3`}
            >
              Edit Profile
            </button>
          </div>
          <div className=" my-2">
            <a href="#" className={styles.navLink}>
              Home
            </a>
          </div>
          <div className=" my-2">
            <a href="#" className={styles.navLink}>
              Profile
            </a>
          </div>
          <div className=" my-2">
            <a href="#" className={styles.navLink}>
              Settings
            </a>
          </div>

          <div className=" my-2">
            <a href="#" className={styles.navLink}>
              Logout
            </a>
          </div>
        </div>
        <div
          className={`${styles["main-content"]} bg-white w-100 p-3 rounded-3`}
        >
          <div className={styles.welcome}>Welcome to your dashboard</div>
          <div className={styles["dashboard-cards"]}>
            {/* Example Dashboard Cards */}
            <div className={styles["dashboard-card"]}>
              <h3>Card 1</h3>
              <p>Content of Card 1</p>
            </div>
            <div className={styles["dashboard-card"]}>
              <h3>Card 2</h3>
              <p>Content of Card 2</p>
            </div>
            <div className={styles["dashboard-card"]}>
              <h3>Card 3</h3>
              <p>Content of Card 3</p>
            </div>
            <div className={styles["dashboard-card"]}>
              <h3>Card 4</h3>
              <p>Content of Card 4</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
