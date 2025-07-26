import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
  } from "@/components/ui/select";
  import { Textarea } from "@/components/ui/textarea";
  import { useState, useEffect } from "react";
  import { faker } from "@faker-js/faker";
  
  const classOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const statusOptions = ["Active", "Inactive"];
  
  function AddSubjectModal({ open, setOpen, onSave, initialData = null }) {
    const [subject, setSubject] = useState({
      name: "",
      code: "",
      className: "",
      teacher: "",
      description: "",
      status: "Active"
    });
  
    // Load data when editing
    useEffect(() => {
      if (initialData && open) setSubject(initialData);
    }, [initialData, open]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSubject((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        id: initialData?.id ?? faker.datatype.uuid(),
        ...subject
      };
      onSave(payload, !!initialData); // second arg => isEdit
      setOpen(false);
      setSubject({
        name: "",
        code: "",
        className: "",
        teacher: "",
        description: "",
        status: "Active"
      });
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Subject" : "Add New Subject"}</DialogTitle>
          </DialogHeader>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Subject Name</Label>
                <Input
                  name="name"
                  value={subject.name}
                  onChange={handleChange}
                  placeholder="e.g. Applied Mathematics"
                  required
                />
              </div>
  
              <div>
                <Label className="mb-1">Subject Code</Label>
                <Input
                  name="code"
                  value={subject.code}
                  onChange={handleChange}
                  placeholder="e.g. MAT101"
                  required
                />
              </div>
  
              <div>
                <Label className="mb-1">Class</Label>
                <Select
                  value={subject.className}
                  onValueChange={(val) => setSubject((p) => ({ ...p, className: val }))}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map((c) => (
                      <SelectItem key={c} value={c} className="cursor-pointer">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label className="mb-1">Teacher</Label>
                <Input
                  name="teacher"
                  value={subject.teacher}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Bose"
                />
              </div>
  
              <div>
                <Label className="mb-1">Status</Label>
                <Select
                  value={subject.status}
                  onValueChange={(val) => setSubject((p) => ({ ...p, status: val }))}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s} className="cursor-pointer">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            <div>
              <Label className="mb-1">Description</Label>
              <Textarea
                name="description"
                rows={3}
                value={subject.description}
                onChange={handleChange}
                placeholder="Short description"
              />
            </div>
  
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{initialData ? "Save Changes" : "Add Subject"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default AddSubjectModal;
  