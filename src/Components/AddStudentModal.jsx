import React, { useState } from "react";
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
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AddStudentModal = ({ open, setOpen }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    section: "",
    gender: "",
    address: "",
    dateOfJoining: "",
    admissionDate: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!student.name.trim()) newErrors.name = "Name is required";
    if (!student.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!student.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(student.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!student.class.trim()) newErrors.class = "Class is required";
    if (!student.section.trim()) newErrors.section = "Section is required";
    if (!student.gender.trim()) newErrors.gender = "Gender is required";
    if (!student.address.trim()) newErrors.address = "Address is required";
    if (!student.dateOfJoining.trim()) newErrors.dateOfJoining = "Date of Joining is required";
    if (!student.admissionDate.trim()) newErrors.admissionDate = "Admission Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    console.log("Student data:", student);

    setStudent({
      name: "",
      email: "",
      phone: "",
      class: "",
      section: "",
      gender: "",
      address: "",
      dateOfJoining: "",
      admissionDate: "",
    });
    setErrors({});
    setOpen(false);
  };

  const handleClose = () => {
    setStudent({
      name: "",
      email: "",
      phone: "",
      class: "",
      section: "",
      gender: "",
      address: "",
      dateOfJoining: "",
      admissionDate: "",
    });
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl bg-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Text fields */}
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "class", label: "Class", type: "text" },
            { name: "section", label: "Section", type: "text" },
            { name: "dateOfJoining", label: "Date of Joining", type: "date" },
          ].map(({ name, label, type }) => (
            <div key={name} className="flex flex-col space-y-1">
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                type={type}
                value={student[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className={errors[name] ? "border-red-500 focus:border-red-500" : ""}
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
              value={student.gender}
            >
              <SelectTrigger id="gender" className="cursor-pointer w-full">
                <SelectValue placeholder="Select gender" className="cursor-pointer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male" className="cursor-pointer">Male</SelectItem>
                <SelectItem value="Female" className="cursor-pointer">Female</SelectItem>
                <SelectItem value="Other" className="cursor-pointer">Other</SelectItem>
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
              value={student.dateOfJoining}
              onChange={handleChange}
              className={errors.dateOfJoining ? "border-red-500" : ""}
            />
            {errors.dateOfJoining && (
              <p className="text-red-500 text-sm">{errors.dateOfJoining}</p>
            )}
          </div>

          {/* Address Textarea (full width) */}
          <div className="flex flex-col space-y-1 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows={3}
              className={errors.address ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClose} className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave} className="cursor-pointer">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
