"use client";
import { useEffect, useState } from "react";
import axios from "axios";
 import { studentapi } from "@/utils/apiRoutes";
export default function apitestpage() {
  const [studentData, setStudentData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(studentapi);
       
        setStudentData(response.data.allusers);
        console.log("Student data set", response.data.allusers);
      } catch (error) {
        console.error("There was an error fetching the student data:", error);
      }
    };

    fetchData();
  }, []); 
  return (
    <div>
       {studentData.map((student) => (
              <div className="col-md-6 col-lg-4" key={student.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{student.FirstName}</h5>
                    <p className="card-text">Email: {student.Email}</p>
                    <p className="card-text">Mobile: {student.Gender}</p>
                    
                  </div>
                </div>
              </div>
            ))}
    </div>
  )
}
