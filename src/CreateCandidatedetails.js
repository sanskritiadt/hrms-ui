// {
//     "candidateName": "Siddharth",
//     "emailId"  : "mailto:siddharth.adt@gmail.com",
//     "contactNo": "9666256882",
//     "address"  : "indore, MP",
//     "highestQualification" : "CS",
//     "workExperience" : "2.0 Year",
//     "technicalStack" : "Java, HTML, CSS, BootStrap",
//     "cvShortlisted" : true,
//     "lastCTC" : 3.4,
//     "noticePeriod" : 90
// }


import React, { useState } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik';
import { CandidateSchema } from './Validations/Candidate'

export default function InterviewCandidate() {
    const token = localStorage.getItem("response-token");

    const formik = useFormik({
        initialValues: {
            candidateName: '',
            emailId: '',
            contactNo: '',
            address: '',
            highestQualification: '',
            workExperience: '',
            technicalStack: '',
            cvShortlisted: '',
            lastCTC: '',
            noticePeriod: '',
        },
        validationSchema: CandidateSchema,
        onSubmit: (values, action) => {
            console.log(values)
            axios.post(`/hrms/interviewCandidate/saveInterviewCandidate`, {
                candidateName: values.candidateName,
                emailId: values.emailId,
                contactNo: values.contactNo,
                address: values.address,
                highestQualification: values.highestQualification,
                workExperience: values.workExperience,
                technicalStack: values.technicalStack,
                cvShortlisted: values.cvShortlisted,
                lastCTC: values.lastCTC,
                noticePeriod: parseInt(values.noticePeriod)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data)
                    alert("Interview details successfully created !!")
                }).catch((err) => {
                    console.log(err)
                    alert("cannot show the interview details values!!")
                })
            action.resetForm();
        },
    });
    //   const handleScreeningRoundChange = (e) => {
    //     const value = e.target.value === "true";
    //     formik.setFieldValue('cvShortlisted', value);
    //   }

    return (
        <>
            <div className='container pt-3'>
                <div className='row'>
                    <div className='col-lg-8 col-md-10 mx-auto'>
                        <div className='card border-0 shadow'>
                            <div className='card-body'>
                                <form className='container py-3  mb-3' onSubmit={formik.handleSubmit} >
                                    <div className="row mb-3">
                                        <label htmlFor="Interviewer Name" className="col-sm-2 col-form-label" name='candidateName'>Candidate Name</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text "
                                                id="candidateName"
                                                name='candidateName'
                                                step='0.1'
                                                placeholder='Enter Your Name'
                                                className={`form-control ${formik.touched.candidateName && formik.errors.candidateName ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.candidateName}
                                            />
                                            {formik.touched.candidateName && formik.errors.candidateName ? (
                                                <div className="invalid-feedback">{formik.errors.candidateName}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="emailId" className="col-sm-2 col-form-label">Email Id</label>
                                        <div className="col-sm-10">
                                            <input
                                                placeholder='Enter Email'
                                                type="email"
                                                id="emailId"
                                                name="emailId"
                                                className={`form-control ${formik.touched.emailId && formik.errors.emailId ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.emailId}
                                            />
                                            {formik.touched.emailId && formik.errors.emailId ? (
                                                <div className="invalid-feedback">{formik.errors.emailId}</div>
                                            ) : null}
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <label htmlFor="ContactNumber " className="col-sm-2 col-form-label">Contact Number</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="number "
                                                id="contactNo"
                                                name='contactNo'
                                                step='0.1'
                                                placeholder='Enter Number'
                                                className={`form-control ${formik.touched.contactNo && formik.errors.contactNo ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contactNo}
                                            />
                                            {formik.touched.contactNo && formik.errors.contactNo ? (
                                                <div className="invalid-feedback">{formik.errors.contactNo}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="Address" className="col-sm-2 col-form-label" name="address">Address</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text "
                                                id="address"
                                                name='address'
                                                step='0.1'
                                                placeholder='Enter Your Address'
                                                className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                            />
                                            {formik.touched.address && formik.errors.address ? (
                                                <div className="invalid-feedback">{formik.errors.address}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="highestQualification" className="col-sm-2 col-form-label" name="highestQualification">Highest Qualification</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text "
                                                id="highestQualification"
                                                name='highestQualification'
                                                step='0.1'
                                                placeholder='Enter Your Highest Qualification'
                                                className={`form-control ${formik.touched.highestQualification && formik.errors.highestQualification ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.highestQualification}
                                            />
                                            {formik.touched.highestQualification && formik.errors.highestQualification ? (
                                                <div className="invalid-feedback">{formik.errors.highestQualification}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="WorkExperience " className="col-sm-2 col-form-label">Work Experience</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="number "
                                                id="workExperience"
                                                name='workExperience'
                                                step='0.1'
                                                placeholder='Enter Experience'
                                                className={`form-control ${formik.touched.workExperience && formik.errors.workExperience ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.workExperience}
                                            />
                                            {formik.touched.workExperience && formik.errors.workExperience ? (
                                                <div className="invalid-feedback">{formik.errors.workExperience}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="technicalStack" className="col-sm-2 col-form-label" name='technicalStack'> Technical Stack</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text "
                                                id="technicalStack"
                                                name='technicalStack'
                                                step='0.1'
                                                placeholder='Enter Your Technical Stack'
                                                className={`form-control ${formik.touched.technicalStack && formik.errors.technicalStack ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.technicalStack}
                                            />
                                            {formik.touched.technicalStack && formik.errors.technicalStack ? (
                                                <div className="invalid-feedback">{formik.errors.technicalStack}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="lastCTC" className="col-sm-2 col-form-label"> Last CTC</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="number"
                                                id="lastCTC"
                                                name='lastCTC'
                                                step='0.1'
                                                placeholder='Enter Last CTC'
                                                className={`form-control ${formik.touched.lastCTC && formik.errors.lastCTC ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.lastCTC}
                                            />
                                            {formik.touched.lastCTC && formik.errors.lastCTC ? (
                                                <div className="invalid-feedback">{formik.errors.lastCTC}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="noticePeriod" className="col-sm-2 col-form-label">Notice Period</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="number "
                                                id="noticePeriod"
                                                name='noticePeriod'
                                                step='0.1'
                                                placeholder='Enter Notice Period'
                                                className={`form-control ${formik.touched.noticePeriod && formik.errors.noticePeriod ? 'is-invalid' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.noticePeriod}
                                            />
                                            {formik.touched.noticePeriod && formik.errors.noticePeriod ? (
                                                <div className="invalid-feedback">{formik.errors.noticePeriod}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <fieldset className="row mb-3">
                                        <legend className="col-form-label col-sm-2 pt-0">CV Shortlisted</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    onChange={(event) => {
                                                        formik.setFieldValue("cvShortlisted", true);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.cvShortlisted === true}
                                                    className={`form-control ${formik.touched.cvShortlisted && formik.errors.cvShortlisted ? 'is-invalid' : ''
                                                        }`}
                                                    type="radio"
                                                    name="cvShortlisted"
                                                    id="remote"
                                                    value="true"
                                                />

                                                {formik.touched.cvShortlisted && formik.errors.cvShortlisted ? (
                                                    <div className="invalid-feedback">{formik.errors.cvShortlisted}</div>
                                                ) : null}

                                                <label className="form-check-label" htmlFor="inlineRadio1">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    onChange={(event) => {
                                                        formik.setFieldValue("cvShortlisted", false);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.cvShortlisted === false}
                                                    className={`form-control ${formik.touched.cvShortlisted && formik.errors.cvShortlisted ? 'is-invalid' : ''
                                                        }`}
                                                    type="radio"
                                                    name="cvShortlisted"
                                                    id="remote"
                                                    value="false"
                                                />

                                                {formik.touched.cvShortlisted && formik.errors.cvShortlisted ? (
                                                    <div className="invalid-feedback">{formik.errors.cvShortlisted}</div>
                                                ) : null}

                                                <label className="form-check-label" htmlFor="inlineRadio1">
                                                    NO
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <button className="btn btn-outline-danger" type="submit">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}