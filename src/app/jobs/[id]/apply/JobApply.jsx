"use client";
import React, { useState } from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
} from "@heroui/react";
import { Link, ChevronRight } from "@gravity-ui/icons";
import { submitApplication } from "@/lib/actions/applications";

const JobApply = ({ job, applicant }) => {
  const [formData, setFormData] = useState({
    resumeLink: "",
    coverLetter: "",
    portfolioLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine existing applicant info with the new form data
    const submissionData = {
      jobId: job?._id,
      jobTitle: job?.title,
      companyName: job?.companyName,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      status: 'applied',
      ...formData,
    };

    console.log("Submitting Application:", submissionData);
    const res = await submitApplication(submissionData);
    if (res.insertedId) {
      alert("applications submitted successfully");
      setFormData({ resumeLink: "", coverLetter: "", portfolioLink: "" });
    }
  };

  const handleReset = () => {
    setFormData({
      resumeLink: "",
      coverLetter: "",
      portfolioLink: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-100 dark:border-zinc-800">
      {/* Header Section */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          Applying For
        </span>
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mt-2">
          {job?.title || "Position"}
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          As:{" "}
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {applicant?.name}
          </span>{" "}
          ({applicant?.email})
        </p>
      </div>

      <hr className="border-zinc-100 dark:border-zinc-800 mb-6" />

      {/* Hero UI Form wrapper */}
      <Form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="space-y-5 w-full"
      >
        {/* Required Resume Link Field */}
        <TextField isRequired className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Link className="text-zinc-400" width={16} height={16} />
            Resume Link
          </Label>
          <div className="relative mt-1.5">
            <Input
              type="url"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/... or https://dropbox.com/..."
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-transparent"
            />
          </div>
          <Description className="text-xs text-zinc-400 mt-1">
            Provide a publicly accessible link to your PDF resume.
          </Description>
          <FieldError className="text-xs text-danger mt-1">
            Please enter a valid URL.
          </FieldError>
        </TextField>

        {/* Optional Portfolio Field */}
        <TextField className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Link className="text-zinc-400" width={16} height={16} />
            Portfolio URL{" "}
            <span className="text-xs text-zinc-400 font-normal">
              (Optional)
            </span>
          </Label>
          <div className="relative mt-1.5">
            <Input
              type="url"
              name="portfolioLink"
              value={formData.portfolioLink}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-transparent"
            />
          </div>
          <FieldError className="text-xs text-danger mt-1">
            Please enter a valid URL.
          </FieldError>
        </TextField>

        {/* Optional Cover Letter / Additional Info Field */}
        <TextField className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            Additional Information{" "}
            <span className="text-xs text-zinc-400 font-normal">
              (Optional)
            </span>
          </Label>
          <div className="relative mt-1.5">
            {/* Note: Standard Hero UI Input can behave like a textarea with multi-line, or standard HTML textarea fits perfectly inside the anatomy wrapper */}
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={4}
              placeholder="Anything else you'd like to share with the hiring team..."
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-transparent text-sm resize-none"
            />
          </div>
        </TextField>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 w-full">
          <Button
            type="reset"
            variant="light"
            color="default"
            className="flex items-center gap-1.5 font-medium"
          >
            Reset
          </Button>

          <Button
            type="submit"
            color="primary"
            className="flex items-center gap-1.5 font-medium shadow-sm"
          >
            Submit Application
            <ChevronRight width={16} height={16} />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobApply;
