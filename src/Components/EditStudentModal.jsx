import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EditStudentModal = ({ open, setOpen, initialData, onSave }) => {
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

  // Load initial data into form when modal opens
  useEffect(() => {
    if (initialData && open) {
      setStudent({ ...initialData });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(student);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Name</Label>
              <Input name="name" value={student.name} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Email</Label>
              <Input name="email" type="email" value={student.email} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Phone</Label>
              <Input name="phone" value={student.phone} onChange={handleChange} />
            </div>
            <div>
              <Label className="mb-1">Class</Label>
              <Select
                value={student.class}
                onValueChange={(value) => setStudent((prev) => ({ ...prev, class: value }))}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 1" className="cursor-pointer">Class 1</SelectItem>
                  <SelectItem value="Class 2" className="cursor-pointer">Class 2</SelectItem>
                  <SelectItem value="Class 3" className="cursor-pointer">Class 3</SelectItem>
                  <SelectItem value="Class 4" className="cursor-pointer">Class 4</SelectItem>
                  <SelectItem value="Class 5" className="cursor-pointer">Class 5</SelectItem>
                  <SelectItem value="Class 6" className="cursor-pointer">Class 6</SelectItem>
                  <SelectItem value="Class 7" className="cursor-pointer">Class 7</SelectItem>
                  <SelectItem value="Class 8" className="cursor-pointer">Class 8</SelectItem>
                  <SelectItem value="Class 9" className="cursor-pointer">Class 9</SelectItem>
                  <SelectItem value="Class 10" className="cursor-pointer">Class 10</SelectItem>
                  <SelectItem value="Class 11" className="cursor-pointer">Class 11</SelectItem>
                  <SelectItem value="Class 12" className="cursor-pointer">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Section</Label>
              <Select
                value={student.section}
                onValueChange={(value) => setStudent((prev) => ({ ...prev, section: value }))}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A" className="cursor-pointer">A</SelectItem>
                  <SelectItem value="B" className="cursor-pointer">B</SelectItem>
                  <SelectItem value="C" className="cursor-pointer">C</SelectItem>
                  <SelectItem value="D" className="cursor-pointer">D</SelectItem>
                  <SelectItem value="E" className="cursor-pointer">E</SelectItem>
                  <SelectItem value="F" className="cursor-pointer">F</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Gender</Label>
              <Select
                value={student.gender}
                onValueChange={(value) => setStudent((prev) => ({ ...prev, gender: value }))}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male" className="cursor-pointer">Male</SelectItem>
                  <SelectItem value="Female" className="cursor-pointer">Female</SelectItem>
                  <SelectItem value="Other" className="cursor-pointer">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Date of Joining</Label>
              <Input
                type="date"
                name="dateOfJoining"
                value={student.dateOfJoining}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Admission Date</Label>
              <Input
                type="date"
                name="admissionDate"
                value={student.admissionDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="address" className="mb-1">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="cursor-pointer">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentModal;
