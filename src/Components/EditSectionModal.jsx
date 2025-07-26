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


const EditSectionModal = ({ open, setOpen, initialData, onSave, className }) => {
  const [section, setSection] = useState({
    section: "",
    subject: "",
    classTeacher: "",
    students: "",
    roomNumber: "",
    building: "",
    capacity: "",
    status: "Active"
  });

  // Load initial data into form when modal opens
  useEffect(() => {
    if (initialData && open) {
      setSection({
        section: initialData.section || "",
        subject: initialData.subject || "",
        classTeacher: initialData.classTeacher || "",
        students: initialData.students?.toString() || "",
        roomNumber: initialData.classroom?.roomNumber || "",
        building: initialData.classroom?.building || "",
        capacity: initialData.classroom?.capacity?.toString() || "",
        status: initialData.status || "Active"
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Section</Label>
            <Select
              value={section.section}
              onValueChange={(value) => setSection((prev) => ({ ...prev, section: value }))}
              className="cursor-pointer"
            >
              <SelectTrigger className="cursor-pointer w-full">
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
            <Label className="mb-1">Subject</Label>
            <Select
              value={section.subject}
              onValueChange={(value) => setSection((prev) => ({ ...prev, subject: value }))}
            >
              <SelectTrigger className="cursor-pointer w-full">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics" className="cursor-pointer">Mathematics</SelectItem>
                <SelectItem value="Physics" className="cursor-pointer">Physics</SelectItem>
                <SelectItem value="Chemistry" className="cursor-pointer">Chemistry</SelectItem>
                <SelectItem value="Biology" className="cursor-pointer">Biology</SelectItem>
                <SelectItem value="English" className="cursor-pointer">English</SelectItem>
                <SelectItem value="Hindi" className="cursor-pointer">Hindi</SelectItem>
                <SelectItem value="Computer Science" className="cursor-pointer">Computer Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1">Class Teacher</Label>
            <Input 
              name="classTeacher" 
              value={section.classTeacher} 
              onChange={handleChange} 
              placeholder="Teacher name" 
            />
          </div>

          <div>
            <Label className="mb-1">Room Number</Label>
            <Input 
              name="roomNumber" 
              value={section.roomNumber} 
              onChange={handleChange} 
              placeholder="e.g., A101" 
            />
          </div>

          <div>
            <Label className="mb-1">Building</Label>
            <Select
              value={section.building}
              onValueChange={(value) => setSection((prev) => ({ ...prev, building: value }))}
            >
              <SelectTrigger className="cursor-pointer w-full">
                <SelectValue placeholder="Select building" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Building" className="cursor-pointer">Main Building</SelectItem>
                <SelectItem value="Science Block" className="cursor-pointer">Science Block</SelectItem>
                <SelectItem value="Arts Block" className="cursor-pointer">Arts Block</SelectItem>
                <SelectItem value="Admin Block" className="cursor-pointer">Admin Block</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
  <Label className="mb-1">Number of Students</Label>
  <Input 
    name="students" 
    type="number" 
    value={section.students} 
    onChange={handleChange} 
    placeholder="Current enrollment"
    className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
  />
</div>

<div>
  <Label className="mb-1">Classroom Capacity</Label>
  <Input 
    name="capacity" 
    type="number" 
    value={section.capacity} 
    onChange={handleChange} 
    placeholder="Max students"
    className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
  />
</div>


          <div>
            <Label className="mb-1">Status</Label>
            <Select
              value={section.status}
              onValueChange={(value) => setSection((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="cursor-pointer w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active" className="cursor-pointer">Active</SelectItem>
                <SelectItem value="Inactive" className="cursor-pointer">Inactive</SelectItem>
                <SelectItem value="Suspended" className="cursor-pointer">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSectionModal;
