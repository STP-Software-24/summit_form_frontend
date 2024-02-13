import { useState } from "react";
import {useNavigate} from "react-router-dom"
import FormInput from "./FormInput";
import "./RegistrationForm.css"
import axios from "axios";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        phone_number: "",
        email: "",
        national_id: "",
        university: "",
        faculty: "",
        grad_year: ""
      });
    
      const inputs = [
        {
          id: 1,
          name: "name",
          type: "text",
          errorMessage: "Your Fullname should be 6-35 characters and shouldn't include any special character",
          label: "Full Name",
          pattern:'[(a-zA-Z)||(a-zA-Z ?:\s)]{3,16}?$', // Corrected the minimum and maximum length
          required: true,
        },
        {
          id: 2,
          name: "phone_number",
          type: "text", // Changed type to text to allow for validation of non-numeric characters
          errorMessage: "Invalid Phone Number",
          label: "Phone",
          pattern:"/^(02)?(01)[0125][0-9]{8}$/",
          required: true,
          minLength:"0",
          maxlength:"11"
        },
        {
          id: 3,
          name: "email",
          type: "email",
          //pattern:"/^(02)?(01)[0125][0-9]{8}$/", // Removed unnecessary escape characters
          errorMessage: "It should be a valid email address!",
          label: "Email",
          required: true
        },
        {
          id: 4,
          name: "national_id",
          type: "text", // Changed type to text to allow for validation of non-numeric characters
          pattern:"/^[0-9]{14}$/",
          errorMessage: "Invalid Number",
          label: "National ID",
          maxlength:"14",
          required: true
        },
        {
          id: 5,
          name: "university",
          type: "text",
          pattern:"/[(a-zA-Z)||(a-zA-Z ?:\s)]{3,16}?$/", // Corrected the minimum and maximum length
          errorMessage: "University should be 5-30 characters and shouldn't include any special character",
          label: "University",
          required: true
        },
        {
          id: 6,
          name: "faculty",
          type: "text",
          pattern:"/[(a-zA-Z)||(a-zA-Z ?:\s)]{3,16}?$/", // Corrected the minimum and maximum length
          errorMessage: "Faculty should be 5-30 characters and shouldn't include any special character",
          label: "Faculty",
          required: true,
        },
        {
          id: 7,
          name: "grad_year",
          type: "number",
          //pattern: /^[0-9]{4}$/, // Corrected pattern for graduation year
          label: "Graduation Year",
          required: true
        }
      ];
    
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        //const url = "https://fair-erin-boa-wig.cyclic.app/register";
        const url = "http://localhost:3000/register";
        axios.post(url, values)
          .then(response => {
            console.log("Data sent successfully");
            navigate('/thank-you'); // Redirect to thank you page
          })
          .catch(error => {
            console.error("Error:", error);
          });
      };
    
      const onChange = (e) => {

        if(e.target.name=="phone_number" || e.target.name=="national_id" ){
          if(/^\d+$/.test(e.target.value)){
            setValues({ ...values, [e.target.name]: e.target.value });
          }
        }
        else{
          setValues({ ...values, [e.target.name]: e.target.value });

        }
      };
    
      return (
        <>
          <div className="m-4 d-block d-md-inline ">
            <img src="/img/logo.svg" className=" m-0 mx-auto d-block d-md-inline-block " alt="" />
          </div>
          <div className="m-4 d-block d-md-inline ">
            <img src="/img/mac_logo.svg" alt="mac logo" className="img-fluid d-inline" />
          </div>
          <div className="app">
            <div className="w-75 imgGroup d-none d-md-block">
              <img className="gate" src="/img/gate-01.png" alt="" />
            </div>
            <div className="me-2 p-2 w-100">
              <form onSubmit={handleSubmit} className="group p-3 rounded-2 colorbody h-75 m-5">
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
                <div className="text-center p-2">
                  <button className="form-btn rounded-4 w-50 btn-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>

        </>
      );
};

export default RegistrationForm;