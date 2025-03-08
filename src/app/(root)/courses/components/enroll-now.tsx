"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  courseName: string;
  anyHealth: string;
  whyInterested: string;
}

const EnrollNow = ({ course }: { course: string }) => {
  const [enrollForm, setEnrollForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    courseName: course,
    anyHealth: "",
    whyInterested: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnrollForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, email, phone, address, whyInterested } = enrollForm;

    if (!name || !email || !phone || !address || !whyInterested) {
      setError("Please fill in all required fields.");
      return;
    }

    // Simulate form submission (Replace with API call)
    console.log("Form submitted:", enrollForm);
    alert("Enrollment successful! We will contact you soon.");

    // Optionally, reset the form after submission
    setEnrollForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      courseName: course,
      anyHealth: "",
      whyInterested: "",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="mt-4 md:mt-0 bg-secondary hover:bg-secondary/70 text-white px-6 py-2 rounded-lg duration-200">
        Enroll Now
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enroll Now</AlertDialogTitle>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              name="name"
              value={enrollForm.name}
              onChange={handleChange}
              placeholder="Full name *"
              required
            />
            <Input
              type="email"
              name="email"
              value={enrollForm.email}
              onChange={handleChange}
              placeholder="Email *"
              required
            />
            <Input
              type="tel"
              name="phone"
              value={enrollForm.phone}
              onChange={handleChange}
              placeholder="Phone *"
              required
            />
            <Input
              type="text"
              name="address"
              value={enrollForm.address}
              onChange={handleChange}
              placeholder="Address *"
              required
            />
            <Input
              type="text"
              name="anyHealth"
              value={enrollForm.anyHealth}
              onChange={handleChange}
              placeholder="Any Health Condition (optional)"
            />
            <Input
              type="text"
              name="whyInterested"
              value={enrollForm.whyInterested}
              onChange={handleChange}
              placeholder="Why Are You Interested in This Training? *"
              required
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-none bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={
              !enrollForm.name ||
              !enrollForm.email ||
              !enrollForm.phone ||
              !enrollForm.address ||
              !enrollForm.whyInterested
            }
            className="bg-secondary hover:bg-secondary/70 duration-200 text-white"
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EnrollNow;
