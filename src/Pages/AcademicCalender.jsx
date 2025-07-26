import React, { useState } from "react";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrums";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Plus, CalendarDays } from "lucide-react";
import { generateFakeCalendarEvents } from "@/utils/fakeCalendar";
import AddEventModal from "@/components/AddEventModal";
import EventModal from "@/components/EventModal";
import DeleteModal from "@/components/DeleteModal";

const eventTypes = [
  "Holiday", "Exam", "Term Start", "Term End", "Event", 
  "Meeting", "Workshop", "Sports", "Cultural", "Break"
];

const priorities = ["High", "Medium", "Low"];
const statuses = ["Scheduled", "Completed", "Cancelled", "Postponed"];

function AcademicCalendar() {
  const [events, setEvents] = useState(generateFakeCalendarEvents(80));
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const perPage = 10;

  const filtered = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "All" || event.type === filterType;
    const matchesStatus = filterStatus === "All" || event.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleSave = (payload, isEdit) => {
    setEvents((prev) =>
      isEdit ? prev.map((e) => (e.id === payload.id ? payload : e)) : [payload, ...prev]
    );
  };

  const getTypeColor = (type) => {
    const colors = {
      "Holiday": "bg-red-100 text-red-700",
      "Exam": "bg-orange-100 text-orange-700",
      "Event": "bg-blue-100 text-blue-700",
      "Meeting": "bg-purple-100 text-purple-700",
      "Workshop": "bg-green-100 text-green-700",
      "Sports": "bg-cyan-100 text-cyan-700",
      "Cultural": "bg-pink-100 text-pink-700",
      "Break": "bg-yellow-100 text-yellow-700",
      "Term Start": "bg-indigo-100 text-indigo-700",
      "Term End": "bg-gray-100 text-gray-700"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "High": "bg-red-100 text-red-700",
      "Medium": "bg-yellow-100 text-yellow-700",
      "Low": "bg-green-100 text-green-700"
    };
    return colors[priority] || "bg-gray-100 text-gray-700";
  };

  return (
    <Layout title="Academic Calendar">
      <div className="sm:p-4 space-y-4 overflow-hidden">
        <Breadcrumbs items={["Home", "Academic Calendar"]} />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
              Academic Calendar Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Manage school events, holidays, exams, and important dates
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto cursor-pointer">
            {selected.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setIsDeleteOpen(true)}
                className="w-full sm:w-auto"
              >
                Delete Selected ({selected.length})
              </Button>
            )}

            <Button
              onClick={() => setIsAddOpen(true)}
              className="w-full sm:w-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Event</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          <AddEventModal
            open={isAddOpen}
            setOpen={setIsAddOpen}
            onSave={handleSave}
          />

          <DeleteModal
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            onConfirm={() => {
              setEvents((prev) => prev.filter((e) => !selected.includes(e.id)));
              setSelected([]);
            }}
          />
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header with search */}
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold">All Events</h1>
              <Badge variant="secondary" className="bg-black text-white">
                {events.length}
              </Badge>
            </div>
           <div className="flex items-center gap-4">
           <Input
              placeholder="Search events, organizer, or location..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64"
            />
            {/* Filters */}
         
            <Select
              value={filterType}
              onValueChange={(val) => {
                setFilterType(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-48 cursor-pointer">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className="cursor-pointer">
                  All Types
                </SelectItem>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type} className="cursor-pointer">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filterStatus}
              onValueChange={(val) => {
                setFilterStatus(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-48 cursor-pointer">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className="cursor-pointer">
                  All Status
                </SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status} className="cursor-pointer">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>

          

    {/* Desktop Table */}
<div className="hidden lg:block w-full overflow-hidden">
  <div className="overflow-x-auto">
    <Table className="w-full">
      <TableHeader>
        <TableRow className="bg-muted text-muted-foreground font-semibold text-sm">
          <TableHead className="text-black">
            <input
              type="checkbox"
              checked={
                paginated.length > 0 &&
                selected.length === paginated.length
              }
              onChange={(e) =>
                setSelected(
                  e.target.checked ? paginated.map((e) => e.id) : []
                )
              }
            />
          </TableHead>
          <TableHead className="text-black">#</TableHead>
          <TableHead className="text-black">Event Title</TableHead>
          <TableHead className="text-black">Type</TableHead>
          <TableHead className="text-black">Start Date</TableHead>
          <TableHead className="text-black">End Date</TableHead>
          <TableHead className="text-black">Location</TableHead>
          <TableHead className="text-black">Priority</TableHead>
          <TableHead className="text-black">Status</TableHead>
          <TableHead className="text-black">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white">
        {paginated.map((event, idx) => (
          <TableRow key={event.id} className="bg-white hover:bg-gray-100 transition-colors shadow-sm">
            <TableCell>
              <input
                type="checkbox"
                checked={selected.includes(event.id)}
                onChange={(e) =>
                  setSelected((prev) =>
                    e.target.checked
                      ? [...prev, event.id]
                      : prev.filter((id) => id !== event.id)
                  )
                }
              />
            </TableCell>
            <TableCell>{(currentPage - 1) * perPage + idx + 1}</TableCell>
            <TableCell className="font-medium truncate" title={event.title}>
              {event.title}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(event.type)}`}
              >
                {event.type}
              </span>
            </TableCell>
            <TableCell className="text-sm">{event.startDate}</TableCell>
            <TableCell className="text-sm">{event.endDate}</TableCell>
            <TableCell className="text-sm truncate" title={event.location}>
              {event.location}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(event.priority)}`}
              >
                {event.priority}
              </span>
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  event.status === "Scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : event.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : event.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {event.status}
              </span>
            </TableCell>
            <TableCell>
              <EventModal event={event} onEdit={handleSave} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>


          {/* Mobile Cards */}
          <div className="lg:hidden divide-y">
            {paginated.map((event) => (
              <div key={event.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {event.title}
                    </h3>
                    <div className="flex gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                    </div>
                  </div>
                  <EventModal event={event} onEdit={handleSave} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Start:</span>
                    <span className="ml-1 font-medium">{event.startDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">End:</span>
                    <span className="ml-1 font-medium">{event.endDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <span className="ml-1 font-medium">{event.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                        event.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : event.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : event.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center bg-gray-50 p-4 text-sm">
            <span>
              Showing{" "}
              {filtered.length === 0
                ? 0
                : (currentPage - 1) * perPage + 1}{" "}
              to {Math.min(currentPage * perPage, filtered.length)} of{" "}
              {filtered.length} results
            </span>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="cursor-pointer"
              >
                Prev
              </Button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AcademicCalendar;
