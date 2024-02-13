import { useState } from "react";
import {useNavigate} from "react-router-dom"
import FormInput from "./FormInput";
import "./RegistrationForm.css"
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
    const notifyServerError = () => toast("Internal Server Error, Try again later!");
    const notifyAlreadyRig = () => toast("You have already registered!");
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
    const [errors, setErrors] = useState({
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
          errorMessage: "Your Fullname should be 6-55 characters and shouldn't include any special character",
          label: "Full Name",
          required: true,
          validation: (value) => {
            if (value.length < 6 || value.length > 55) {
              return "Your Fullname should be 6-55 characters and shouldn't include any special character";
            }
            return "";
          }
        },
        {
          id: 2,
          name: "phone_number",
          type: "text", // Changed type to text to allow for validation of non-numeric characters
          errorMessage: "Invalid Phone Number",
          label: "Phone",
          required: true,
          minLength:"0",
          maxLength:"11",
          validation: (value) => {
            if (!/^\d+$/.test(value) || value.length !== 11) {
              return "Invalid Phone Number";
            }
            return "";
          }
        },
        {
          id: 3,
          name: "email",
          type: "email",
          errorMessage: "It should be a valid email address!",
          label: "Email",
          required: true,
          validation: (value) => {
            if(!/.+@[^@]+\.[^@]{2,}$/.test(value) || value.length < 6){
              return "Invalid Email Address";
            }
            return "";
          }
        },
        {
          id: 4,
          name: "national_id",
          type: "text", // Changed type to text to allow for validation of non-numeric characters
          errorMessage: "Invalid Number",
          label: "National ID",
          maxLength:"14",
          minLength:"14",
          required: true,
          validation: (value) => {
            if(!/^\d{14}$/.test(value)){
              return "Invalid National ID";
            }
            return "";
          }
        },
        {
          id: 5,
          name: "university",
          type: "text",
          errorMessage: "University should be 3-40 characters and shouldn't include any special character",
          label: "University",
          required: true,
          validation: (value) => {
            if(value.length < 3 || value.length > 40){
              return "University should be between 3 and 40 characters";
            }
            return "";
          }
        },
        {
          id: 6,
          name: "faculty",
          type: "text",
          errorMessage: "Faculty should be 3-40 characters and shouldn't include any special character",
          label: "Faculty",
          required: true,
          validation: (value) => {
            if(value.length < 3 || value.length > 40){
              return "Faculty should be between 3 and 40 characters";
            }
            return "";
          }
        },
        {
          id: 7,
          name: "grad_year",
          type: "text",
          label: "Graduation Year",
          maxLength:"4",
          minLength:"4",
          required: true,
          validation: (value) => {
            if(value.length !== 4 || value < 1990 || value > 2033){
              return "Invalid Graduation Year";
            }
            return "";
          }
        }
      ];
    
      const handleSubmit = (e) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {};
    
        // Validate each field
        Object.entries(values).forEach(([name, value]) => {
          const errorMessage = inputs.find(input => input.name === name)?.validation(value);
          if (errorMessage) {
            hasErrors = true;
            newErrors[name] = errorMessage;
          }
        });
    
        // Update errors state
        setErrors(newErrors);
    
        // If there are errors, prevent form submission
        if (hasErrors) {
          console.log(newErrors);
          return;
        }

        //
        console.log(values);
        const url = "https://fair-erin-boa-wig.cyclic.app/";
        //const url = "http://localhost:3000/";
        // check if user exists in Database
        const exist = axios.get(url + `?email=${encodeURI(values.email)}&nid=${values.national_id}`, values);
        if(exist.data.length == 0){
          axios.post(url + "register", values)
          .then(response => {
            console.log("Data sent successfully");
            navigate('/thankyou'); // Redirect to thank you page
        }).catch(error => {
          console.error("Error:", error);
        });
        }
        else{
          notifyAlreadyRig();
        }
      };
    
      const onChange = (e) => {
        if(e.target.name=="phone_number" || e.target.name=="national_id"){
          if(/^\d+$/.test(e.target.value)){
            setValues({ ...values, [e.target.name]: e.target.value });
          }
        }
        else if(e.target.name=="grad_year"){
          if(/^\d+$/.test(e.target.value) && e.target.value.length <= 4){
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
              <img className="gate" src="/img/Group.png" alt="" />
            </div>
            <div className="me-2 p-2 w-100">
              <form onSubmit={handleSubmit} className="group p-3 rounded-2 colorbody h-75 m-5">
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                    error={errors[input.name]}
                  />
                ))}
                <div className="text-center p-2">
                  <button className="form-btn rounded-4 mt-2 w-40 btn-primary submit-button" type="submit">SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer />
        </>
      );
};

export default RegistrationForm;