import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const EditTeacherModal = ({ open, setOpen, teacher: initialTeacher }) => {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    qualification: "",
    experience: "",
    subject: "",
    classAssigned: "",
    section: "",
    dateOfJoining: "",
  });

  const [errors, setErrors] = useState({});

  // Load teacher info when modal opens
  useEffect(() => {
    if (initialTeacher) setTeacher(initialTeacher);
  }, [initialTeacher]);

  const validateForm = () => {
    const newErrors = {};

    if (!teacher.name.trim()) newErrors.name = "Name is required";
    if (!teacher.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(teacher.email)) newErrors.email = "Invalid email format";
    if (!teacher.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(teacher.phone.replace(/\s/g, ''))) newErrors.phone = "Invalid phone number";
    if (!teacher.gender) newErrors.gender = "Gender is required";
    if (!teacher.address.trim()) newErrors.address = "Address is required";
    if (!teacher.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!teacher.experience.trim()) newErrors.experience = "Experience is required";
    if (!teacher.subject.trim()) newErrors.subject = "Subject is required";
    if (!teacher.classAssigned.trim()) newErrors.classAssigned = "Class is required";
    if (!teacher.section.trim()) newErrors.section = "Section is required";
    if (!teacher.dateOfJoining.trim()) newErrors.dateOfJoining = "Joining date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSelectChange = (field, value) => {
    setTeacher({ ...teacher, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Perform update logic here (e.g. API call)
    console.log("Updated Teacher:", teacher);

    setOpen(false);
  };

  const handleSubmit = () => {
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-white overflow-y-auto max-h-[90vh] custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Qualification", name: "qualification", type: "text" },
            { label: "Experience (Years)", name: "experience", type: "text" },
            { label: "Subject", name: "subject", type: "text" },
            { label: "Class Assigned", name: "classAssigned", type: "text" },
            { label: "Section", name: "section", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="grid gap-1">
              <Label htmlFor={name} className="capitalize text-sm">{label}</Label>
              <Input
                id={name}
                name={name}
                type={type}
                value={teacher[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className={errors[name] ? "border-red-500" : ""}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Gender */}
          <div className="grid gap-1">
            <Label htmlFor="gender" className="capitalize text-sm">Gender</Label>
            <Select
              onValueChange={(val) => handleSelectChange("gender", val)}
              value={teacher.gender}
            >
              <SelectTrigger id="gender" className={`cursor-pointer w-full ${errors.gender ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Date of Joining */}
          <div className="grid gap-1">
            <Label htmlFor="dateOfJoining" className="capitalize text-sm">Date of Joining</Label>
            <Input
              type="date"
              id="dateOfJoining"
              name="dateOfJoining"
              value={teacher.dateOfJoining}
              onChange={handleChange}
              className={errors.dateOfJoining ? "border-red-500" : ""}
            />
            {errors.dateOfJoining && (
              <p className="text-red-500 text-sm">{errors.dateOfJoining}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="">
          <Label htmlFor="address" className="capitalize text-sm">Address</Label>
          <Textarea
            id="address"
            name="address"
            rows="3"
            value={teacher.address}
            onChange={handleChange}
            placeholder="Enter address"
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleSubmit} className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} className="cursor-pointer">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeacherModal;
