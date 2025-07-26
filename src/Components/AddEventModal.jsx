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
  import { Checkbox } from "@/components/ui/checkbox";
  import { useState, useEffect } from "react";
  import { faker } from "@faker-js/faker";
  
  const eventTypes = [
    "Holiday", "Exam", "Term Start", "Term End", "Event", 
    "Meeting", "Workshop", "Sports", "Cultural", "Break"
  ];
  
  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const audiences = ["All Students", "Teachers", "Parents", ...classes];
  const locations = ["Main Hall", "Auditorium", "Classroom", "Playground", "Library", "Computer Lab"];
  const priorities = ["High", "Medium", "Low"];
  const statuses = ["Scheduled", "Completed", "Cancelled", "Postponed"];
  
  function AddEventModal({ open, setOpen, onSave, initialData = null }) {
    const [event, setEvent] = useState({
      title: "",
      type: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      description: "",
      location: "",
      targetAudience: "",
      organizer: "",
      status: "Scheduled",
      isAllDay: false,
      isRecurring: false,
      priority: "Medium"
    });
  
    useEffect(() => {
      if (initialData && open) {
        setEvent(initialData);
      }
    }, [initialData, open]);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setEvent((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        id: initialData?.id ?? faker.number.int({ min: 1000, max: 9999 }),
        ...event,
        createdAt: initialData?.createdAt ?? new Date().toISOString().split('T')[0]
      };
      onSave(payload, !!initialData);
      setOpen(false);
      setEvent({
        title: "",
        type: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
        location: "",
        targetAudience: "",
        organizer: "",
        status: "Scheduled",
        isAllDay: false,
        isRecurring: false,
        priority: "Medium"
      });
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>{initialData ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label className="mb-1">Event Title</Label>
                <Input
                  name="title"
                  value={event.title}
                  onChange={handleChange}
                  placeholder="e.g. Annual Sports Day"
                  required
                />
              </div>
  
              <div>
                <Label className="mb-1">Event Type</Label>
                <Select
                  value={event.type}
                  onValueChange={(val) => setEvent((p) => ({ ...p, type: val }))}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type} className="cursor-pointer">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label className="mb-1">Priority</Label>
                <Select
                  value={event.priority}
                  onValueChange={(val) => setEvent((p) => ({ ...p, priority: val }))}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority} className="cursor-pointer">
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label className="mb-1">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  value={event.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div>
                <Label className="mb-1">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  value={event.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
  
              {!event.isAllDay && (
                <>
                  <div>
                    <Label className="mb-1">Start Time</Label>
                    <Input
                      type="time"
                      name="startTime"
                      value={event.startTime}
                      onChange={handleChange}
                    />
                  </div>
  
                  <div>
                    <Label className="mb-1">End Time</Label>
                    <Input
                      type="time"
                      name="endTime"
                      value={event.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
  
              <div>
                <Label className="mb-1">Location</Label>
                <Select
                  value={event.location}
                  onValueChange={(val) => setEvent((p) => ({ ...p, location: val }))}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location} className="cursor-pointer">
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label className="mb-1">Target Audience</Label>
                <Select
                  value={event.targetAudience}
                  onValueChange={(val) => setEvent((p) => ({ ...p, targetAudience: val }))}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map((audience) => (
                      <SelectItem key={audience} value={audience} className="cursor-pointer">
                        {audience}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div>
                <Label className="mb-1">Organizer</Label>
                <Input
                  name="organizer"
                  value={event.organizer}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
              </div>
  
              <div>
                <Label className="mb-1">Status</Label>
                <Select
                  value={event.status}
                  onValueChange={(val) => setEvent((p) => ({ ...p, status: val }))}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status} className="cursor-pointer">
                        {status}
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
                value={event.description}
                onChange={handleChange}
                placeholder="Event description..."
              />
            </div>
  
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAllDay"
                  name="isAllDay"
                  checked={event.isAllDay}
                  onCheckedChange={(checked) => setEvent((p) => ({ ...p, isAllDay: checked }))}
                />
                <Label htmlFor="isAllDay" className="text-sm">All Day Event</Label>
              </div>
  
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isRecurring"
                  name="isRecurring"
                  checked={event.isRecurring}
                  onCheckedChange={(checked) => setEvent((p) => ({ ...p, isRecurring: checked }))}
                />
                <Label htmlFor="isRecurring" className="text-sm">Recurring Event</Label>
              </div>
            </div>
  
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit"className="cursor-pointer">
                {initialData ? "Save Changes" : "Add Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default AddEventModal;
  