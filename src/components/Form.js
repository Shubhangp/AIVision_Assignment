import { useState, useEffect, useRef } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    const initialValues = { subject: "", query: "", contact: "", level: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFile = (e) => {
        const files = e.target.files[0];
        console.log(e.target.files);
        setFormValues({ ...formValues, files });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formValues.subject != "" && formValues.query != "" && formValues.contact != "" && formValues.level != ""){
            axios.post('https://jsonplaceholder.typicode.com/posts', {formValues})
            .then((res) => {
                console.log(res);
                toast.success('Submitted successfully');
            })
            .catch(err => console.log(err))
            emailjs.sendForm('service_t20j8dv', 'template_66wja3i', form.current, 'xzyGaCQDylMsqiMcX')
            .then((result) => {
                console.log(result.text);
                toast.success('Email send Successfully');
            }, (error) => {
                console.log(error.text);
            });
        }
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        var p = new RegExp(/^[0-9\b]+$/);
        if (!values.subject) {
            errors.subject = "*Subject is required!";
        }
        if (!values.query) {
            errors.query = "*Query is required!";
        }
        if(!values.contact) {
            errors.contact = "*Contact is required!";
        }else if(!p.test(values.contact)) {
            errors.contact = "*Should be number only!";
        }else if(values.contact.length != 10) {
            errors.contact = "*Contact number should be of 10 digits";
        }
        if (!values.level) {
            errors.level = "*Level is required!";
        }
        return errors;
    };

  return (
    <div className="flex flex-col items-center gap-3 max-w-2xl m-auto">
        <div className="w-full h-24 absolute bg-gray-600">
            <h2 className="text-4xl text-white font-bold mt-4 ml-4">Feedback Form</h2>
            <p className="mt-1 ml-4 text-white">Response to this E-mail will be send to your registered E-mail</p>
        </div>
        <form className="w-full mb-20 mt-28" ref={form} onSubmit={handleSubmit}>
            {/* User Email Set in This Input value on Which Email is Send on Submit */}
            <label>
                <input
                    className="hidden"
                    type="email"
                    name="reply_to"
                    value="shubhang2799@gmail.com"
                />
            </label>
            <label>
                <h4 className="text-xl font-medium mb-1">Subject</h4>
                <input
                    className="h-7 border border-black w-full"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formValues.subject}
                    onChange={handleChange}
                />
            </label>
            <p className="text-red-500 mb-5">{formErrors.subject}</p>
            <label>
                <h4 className="text-xl font-medium mb-1">Mention your Query Here</h4>
                <textarea
                    className="border border-black w-full"
                    rows="10"
                    cols="30"
                    placeholder="Mention your Query Here"
                    name="query"
                    value={formValues.query}
                    onChange={handleChange}
                />
            </label>
            <p className="text-red-500 mb-5">{formErrors.query}</p>
            <label>
                <h4 className="flex items-center text-xl font-medium mb-1">Attachments<p className="text-sm font-normal text-gray-600 ">(Optional)</p></h4>
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-36 flex flex-col items-center py-1 bg-gray-400 shadow-md tracking-wide cursor-pointer hover:bg-white hover:text-gray-600 text-black ease-linear transition-all duration-150">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <span className="text-xl leading-normal">Choose File</span>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/jpeg"
                            name="image"
                            value={formValues.image}
                            onChange={handleFile}
                        />
                    </div>
                    <p>*. Images should be in JPG format.</p>
                </div>
            </label>
            <div className="flex justify-between">
                <label>
                    <h4 className="text-xl font-medium mb-1">Contact Number</h4>
                    <input
                        type="text"
                        name="contact"
                        className="h-7 border border-black w-full"
                        placeholder="Contact"
                        value={formValues.contact}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <h4 className="text-xl font-medium mb-1">How critical is your request</h4>
                    <select 
                        className="border border-black w-full h-7" 
                        name="level"
                        value={formValues.level}
                        onChange={handleChange}
                    >
                        <option disabled selected value>Select Level</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
            </div>
            <div className="flex justify-between">
                <p className="text-red-500 mb-10">{formErrors.contact}</p>
                <p className="text-red-500 mb-10">{formErrors.level}</p>
            </div>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <ToastContainer />
            ) : (
                ("")
            )}
            <button className="px-5 py-1 bg-green-500 hover:bg-green-800 text-white font-medium ease-linear transition-all duration-150">
                Submit
            </button>
        </form>
    </div>
  );
}

export default Form;