import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, User, Flag } from "lucide-react";
import AddEventModal from "./AddEventModal";
import DeleteModal from "./DeleteModal";

const EventModal = ({ event, onEdit }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (!event) return null;

  const getTypeColor = (type) => {
    const colors = {
      "Holiday": "bg-red-100 text-red-700 border-red-200",
      "Exam": "bg-orange-100 text-orange-700 border-orange-200",
      "Event": "bg-blue-100 text-blue-700 border-blue-200",
      "Meeting": "bg-purple-100 text-purple-700 border-purple-200",
      "Workshop": "bg-green-100 text-green-700 border-green-200",
      "Sports": "bg-cyan-100 text-cyan-700 border-cyan-200",
      "Cultural": "bg-pink-100 text-pink-700 border-pink-200",
      "Break": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Term Start": "bg-indigo-100 text-indigo-700 border-indigo-200",
      "Term End": "bg-gray-100 text-gray-700 border-gray-200"
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "High": "bg-red-100 text-red-700 border-red-200",
      "Medium": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Low": "bg-green-100 text-green-700 border-green-200"
    };
    return colors[priority] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => setIsViewOpen(true)}
      >
        View
      </Button>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left: Event Overview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-y-auto">
              <div className="text-center mb-4">
                <div className="w-32 h-32 mx-auto mb-2 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-gray-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge variant="outline" className={getTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(event.priority)}>
                    {event.priority} Priority
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{event.startDate}</p>
                  <p className="text-xs text-gray-600">Start Date</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{event.targetAudience}</p>
                  <p className="text-xs text-gray-600">Audience</p>
                </div>
              </div>

              {/* Event Summary Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Event Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Duration:</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {event.startDate} to {event.endDate}
                    </span>
                  </div>
                  {!event.isAllDay && (
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Time:</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Location:</span>
                    <span className="text-sm font-semibold text-gray-800">{event.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Organizer:</span>
                    <span className="text-sm font-semibold text-gray-800">{event.organizer}</span>
                  </div>
                </div>
              </div>

          
            </div>

            {/* Right: Detailed Info */}
            <div className="bg-white flex flex-col h-full">
              <div className="border-b p-4 flex-shrink-0">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-gray-800">
                    Event Details
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 mt-1">Complete information for {event.title}</p>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setIsEditOpen(true);
                      setIsViewOpen(false);
                    }}
                  >
                    Edit Event
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="cursor-pointer" 
                    onClick={() => {
                      setIsDeleteOpen(true);
                      setIsViewOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" className="cursor-pointer">
                    Print Details
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {/* Event Configuration */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                    Event Configuration
                  </h3>
                  <hr className="border-b border-gray-100 my-2" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Event Type</p>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Priority Level</p>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Event Format</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {event.isAllDay ? "All Day" : "Timed"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Frequency</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {event.isRecurring ? "Recurring" : "One-time"}
                      </p>
                    </div>
                   
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg mt-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                      <Badge 
                  variant="outline" 
                  className={`${
                    event.status === "Scheduled" 
                      ? "border-blue-200 text-blue-700 bg-blue-50"
                      : event.status === "Completed"
                      ? "border-green-200 text-green-700 bg-green-50"
                      : event.status === "Cancelled"
                      ? "border-red-200 text-red-700 bg-red-50"
                      : "border-yellow-200 text-yellow-700 bg-yellow-50"
                  }`}
                >
                  {event.status}
                </Badge>
                    </div>
                </div>

   
                {/* Event Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                    Event Description
                  </h3>
                  <hr className="border-b border-gray-100 my-2" />
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {event.description || 'No description available for this event.'}
                    </p>
                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddEventModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        initialData={event}
        onSave={onEdit}
      />

      <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemType="event"
        itemName={event.title}
        onConfirm={() => {
          console.log("Deleting event:", event);
        }}
      />
    </>
  );
};

export default EventModal;
