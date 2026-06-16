"use client";

import React, { use, useState } from "react";
import { createJob } from "@/lib/actions/jobs";
import {
  Form,
  Fieldset,
  TextField,
  Input,
  TextArea,
  Select,
  Label,
  ListBox,
  Switch,
  Button,
  toast,
} from "@heroui/react";
import { redirect } from "next/navigation";

// Corrected Gravity UI Icon Exports

export default function NewJobPostForm({
  company
}) {
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const companyData = company;
  console.log(company)
  const categories = [
    { label: "Technology", id: "technology" },
    { label: "Design", id: "design" },
    { label: "Marketing", id: "marketing" },
    { label: "Finance", id: "finance" },
  ];

  const jobTypes = [
    { label: "Full-time", id: "full-time" },
    { label: "Part-time", id: "part-time" },
    { label: "Contract", id: "contract" },
    { label: "Internship", id: "internship" },
  ];

  const currencies = [
    { label: "USD ($)", id: "USD" },
    { label: "EUR (€)", id: "EUR" },
    { label: "GBP (£)", id: "GBP" },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(companyData,"companyData");
    const submissionPayload = {
      ...data,
      isRemote,
      companyId: companyData._id,
      companyName: companyData.name,
      companyLogo: companyData.logo,
      status: "active",
      isPublic: true,
    };
    console.log(submissionPayload)
    const res = await createJob(submissionPayload);
    if (res.insertedId) {
      toast.success("job posted successfully!");
      e.target.reset();
      setIsRemote(false);
      redirect("/dashboard/recruiter/jobs");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  // Input styles referencing layout design patterns from image_e58b04.png
  const inputThemeClasses =
    "bg-[#1c1c1e] border border-[#2c2c2e] hover:bg-[#2c2c2e] focus-within:!bg-[#1c1c1e] focus-within:!border-white text-white rounded-lg transition-colors";
  const selectTriggerClass =
    "w-full flex items-center justify-between px-3 h-10 bg-[#1c1c1e] border border-[#2c2c2e] hover:bg-[#2c2c2e] rounded-lg text-white text-sm transition-colors text-left";

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-[#121214] border border-[#232326] rounded-xl shadow-2xl">
      {/* Form Title Banner */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Post a New Job
        </h1>
        <p className="text-sm text-default-400 text-white mt-1">
          Fill out the details below to publish your open position on HireLoop.
        </p>
      </div>
      {/* copy */}
      <div className="p-4 bg-[#18181b] border border-[#232326] rounded-xl flex justify-between items-center text-sm">
          <div>
            <span className="text-default-400 text-white  block text-xs">
              Posting Company
            </span>
            <span className="text-white font-medium">{companyData.name}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {company.status}
          </span>
        </div>

        {company.status !== 'Approved' && <div className="text-white">please wait to get approval</div>}

      {company.status === 'Approved' &&  <Form
        onSubmit={onSubmit}
        className="space-y-8"
        validationBehavior="native"
      >
        {/* SECTION 1: Job Info */}
        <Fieldset
          legend="Job Information"
          className={{
            legend:
              "text-lg font-medium text-white mb-4 border-b border-[#232326] pb-2 w-full",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <TextField isRequired className="w-full flex flex-col gap-1">
              <Label className="text-white text-sm font-medium">
                Job Title
              </Label>
              <Input
                name="title"
                placeholder="e.g. Senior Frontend Engineer"
                className={inputThemeClasses}
              />
            </TextField>

            {/* Job Category Select Primitive */}
            <div className="flex flex-col gap-1">
              <Label className="text-white text-sm font-medium">
                Job Category
              </Label>
              <Select name="category" placeholder="Select a category">
                <Select.Trigger className={selectTriggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg shadow-xl">
                  <ListBox className="text-white p-1">
                    {categories.map((cat) => (
                      <ListBox.Item
                        key={cat.id}
                        id={cat.id}
                        textValue={cat.label}
                        className="hover:bg-[#2c2c2e] p-2 rounded cursor-pointer transition-colors"
                      >
                        {cat.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Job Type Select Primitive */}
            <div className="flex flex-col gap-1">
              <Label className="text-white text-sm font-medium">Job Type</Label>
              <Select name="jobType" placeholder="Select job commitment">
                <Select.Trigger className={selectTriggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg shadow-xl">
                  <ListBox className="text-white p-1">
                    {jobTypes.map((type) => (
                      <ListBox.Item
                        key={type.id}
                        id={type.id}
                        textValue={type.label}
                        className="hover:bg-[#2c2c2e] p-2 rounded cursor-pointer transition-colors"
                      >
                        {type.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField isRequired className="w-full flex flex-col gap-1">
              <Label className="text-white text-sm font-medium">
                Application Deadline
              </Label>
              <Input
                type="date"
                name="deadline"
                className={inputThemeClasses}
              />
            </TextField>

            {/* Salary Container */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-4 bg-[#18181b] p-4 rounded-xl border border-[#232326]">
              <TextField isRequired className="w-full flex flex-col gap-1">
                <Label className="text-white text-sm font-medium">
                  Min Salary
                </Label>
                <div className="relative flex items-center">
                  <Input
                    type="number"
                    name="minSalary"
                    placeholder="0"
                    className={`${inputThemeClasses} pl-9 w-full`}
                  />
                </div>
              </TextField>

              <TextField isRequired className="w-full flex flex-col gap-1">
                <Label className="text-white text-sm font-medium">
                  Max Salary
                </Label>
                <div className="relative flex items-center">
                  <Input
                    type="number"
                    name="maxSalary"
                    placeholder="0"
                    className={`${inputThemeClasses} pl-9 w-full`}
                  />
                </div>
              </TextField>

              <div className="flex flex-col gap-1">
                <Label className="text-white text-sm font-medium">
                  Currency
                </Label>
                <Select
                  name="currency"
                  defaultSelectedKey="USD"
                  placeholder="USD"
                >
                  <Select.Trigger className={selectTriggerClass}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-lg shadow-xl">
                    <ListBox className="text-white p-1">
                      {currencies.map((cur) => (
                        <ListBox.Item
                          key={cur.id}
                          id={cur.id}
                          textValue={cur.label}
                          className="hover:bg-[#2c2c2e] p-2 rounded cursor-pointer transition-colors"
                        >
                          {cur.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Location Entry & Corrected Remote Toggle Switch Box */}
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-start md:items-end gap-6">
              <TextField
                isDisabled={isRemote}
                isRequired={!isRemote}
                className="flex-1 w-full flex flex-col gap-1"
              >
                <Label className="text-white text-sm font-medium">
                  Location
                </Label>
                <div className="relative flex items-center">
                  <Input
                    name="location"
                    placeholder={
                      isRemote ? "Remote chosen" : "e.g. Los Angeles, CA"
                    }
                    className={`${inputThemeClasses} pl-9 w-full`}
                  />
                </div>
              </TextField>

              <div className="flex items-center h-10 pb-1">
                <Switch
                  isSelected={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                  className="text-white"
                >
                  Remote Position
                </Switch>
              </div>
            </div>
          </div>
        </Fieldset>

        {/* SECTION 2: Description text blocks using composition <TextArea> */}
        <Fieldset
          legend="Job Requirements & Details"
          className={{
            legend:
              "text-lg font-medium text-white mb-4 border-b border-[#232326] pb-2 w-full",
          }}
        >
          <div className="space-y-6 w-full">
            <TextField isRequired className="w-full flex flex-col gap-1">
              <Label className="text-white text-sm font-medium">
                Responsibilities
              </Label>
              <TextArea
                name="responsibilities"
                placeholder="Outline daily tasks and team expectations..."
                rows={4}
                className={`${inputThemeClasses} p-2 min-h-[100px]`}
              />
            </TextField>

            <TextField isRequired className="w-full flex flex-col gap-1">
              <Label className="text-white text-sm font-medium">
                Requirements
              </Label>
              <TextArea
                name="requirements"
                placeholder="List required skills, education background, and runtime toolsets..."
                rows={4}
                className={`${inputThemeClasses} p-2 min-h-[100px]`}
              />
            </TextField>

            <TextField className="w-full flex flex-col gap-1">
              <Label className="text-white text-sm font-medium">
                Benefits (Optional)
              </Label>
              <TextArea
                name="benefits"
                placeholder="Healthcare coverage, modern gear allowances, 401k plans..."
                rows={3}
                className={`${inputThemeClasses} p-2 min-h-[80px]`}
              />
            </TextField>
          </div>
        </Fieldset>

        {/* SECTION 3: Company verification footprint */}
        

        {/* Action Panel Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#232326]">
          <Button
            type="button"
            variant="flat"
            className="bg-transparent border border-[#2c2c2e] text-white hover:bg-[#1c1c1e] font-medium px-6 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="bg-white text-black font-semibold px-6 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            New Job Post
          </Button>
        </div>
      </Form>}
    </div>
  );
}
