import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { faker } from "@faker-js/faker";

function AddClassModal({ open, setOpen, onAddClass }) {
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
    status: "Active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClass = {
      id: faker.datatype.uuid(),
      ...formData,
    };

    onAddClass(newClass);
    // Reset form
    setFormData({
      className: "",
      section: "",
      classTeacher: "",
      status: "Active"
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Class Name</Label>
              <Select
                value={formData.className}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, className: value }))}
              >
                <SelectTrigger className="cursor-pointer w-full">
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
              <Label className="mb-1">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="bg-black hover:bg-gray-800 cursor-pointer">
              Add Class
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddClassModal;
