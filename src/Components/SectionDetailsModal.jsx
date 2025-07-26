import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, User, BookOpen, Calendar, TrendingUp, Clock } from "lucide-react";
import EditSectionModal from "./EditSectionModal";
import DeleteModal from "./DeleteModal";

const SectionDetailsModal = ({ section, className }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 
  if (!section) return null;

  return (
    <>
      {/* 👁️ View Button to open section modal */}
      <Button
        variant="outline"
        size="sm"
        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
        onClick={() => setIsViewOpen(true)}
      >
        View Details
      </Button>

      {/* 👁️ Section View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left: Section Overview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-y-auto">
  <div className="text-center mb-4">
    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
      <span className="text-xl font-bold text-white">
        {section.section}
      </span>
    </div>
    <h2 className="text-lg font-bold text-gray-900 mb-1">
      {className} - Section {section.section}
    </h2>
    <Badge variant="outline" className="mb-3 text-xs">
      {section.classCode || 'N/A'}
    </Badge>
  </div>

  {/* Quick Stats */}
  <div className="grid grid-cols-2 gap-3 mb-4">
    <div className="bg-white p-3 rounded-lg shadow-sm text-center">
      <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-1">
        <Users className="h-4 w-4 text-white" />
      </div>
      <p className="text-lg font-bold text-gray-900">{section.students}</p>
      <p className="text-xs text-gray-600">Students</p>
    </div>
    <div className="bg-white p-3 rounded-lg shadow-sm text-center">
      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-1">
        <MapPin className="h-4 w-4 text-white" />
      </div>
      <p className="text-lg font-bold text-gray-900">
        {section.classroom?.roomNumber || 'N/A'}
      </p>
      <p className="text-xs text-gray-600">Room</p>
    </div>
  </div>

  {/* Teacher Information Card */}
  <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Teacher Information</h4>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600 text-sm">Class Teacher:</span>
        <span className="font-medium text-gray-900 text-sm">{section.classTeacher}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 text-sm">Subject:</span>
        <span className="font-medium text-gray-900 text-sm">{section.subject}</span>
      </div>
      {section.hasAssistant && (
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">Assistant:</span>
          <Badge variant="outline" className="text-xs">Available</Badge>
        </div>
      )}
      
    </div>
  </div>

  {/* Classroom Information Card */}
  <div className="bg-white p-3 rounded-lg shadow-sm">
    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Classroom Information</h4>
    {section.classroom && (
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">Room Number:</span>
          <span className="font-medium text-gray-900 text-sm">{section.classroom.roomNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">Building:</span>
          <span className="font-medium text-gray-900 text-sm">{section.classroom.building}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">Floor:</span>
          <span className="font-medium text-gray-900 text-sm">{section.classroom.floor || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">Capacity:</span>
          <span className="font-medium text-gray-900 text-sm">{section.classroom.capacity} students</span>
        </div>
      </div>
    )}
  </div>
</div>


            {/* Right: Detailed Info */}
            <div className="bg-white flex flex-col h-full">
              {/* Header - Fixed */}
              <div className="border-b p-4 flex-shrink-0">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold text-gray-800">
                    Section Details
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 mt-1 text-sm">Complete information for Section {section.section}</p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-xs"
                    onClick={() => {
                      setIsEditOpen(true);
                      setIsViewOpen(false);
                    }}
                  >
                    Edit Section
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="cursor-pointer text-xs" 
                    onClick={() => {
                      setIsDeleteOpen(true);
                      setIsViewOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" className="cursor-pointer text-xs">
                    Print Report
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Performance Metrics */}
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                    Performance Metrics
                  </h3>
                  <hr className="border-b border-gray-100 mb-3" />
                  {section.performance ? (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Average Grade</p>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            {section.performance.averageGrade}
                          </Badge>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Attendance Rate</p>
                        <p className="text-sm font-semibold text-gray-800">{section.performance.attendanceRate}%</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Pass Rate</p>
                        <p className="text-sm font-semibold text-gray-800">{section.performance.passRate}%</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3 text-gray-500 bg-gray-50 rounded-lg text-sm">
                      No performance data available
                    </div>
                  )}
                </div>

                {/* Classroom Information */}
               

                {/* Student Information */}
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                    Student Information
                  </h3>
                  <hr className="border-b border-gray-100 mb-3" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Enrolled Students</p>
                      <p className="text-sm font-semibold text-gray-800">{section.students}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Available Seats</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {section.classroom?.capacity ? section.classroom.capacity - section.students : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Section Status</p>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {section.status || 'Active'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {section.classCode && (
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                      Additional Information
                    </h3>
                    <hr className="border-b border-gray-100 mb-3" />
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Section Code</p>
                      <p className="text-sm font-semibold text-gray-800 font-mono">{section.classCode}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditSectionModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        initialData={section}
        className={className}
      />

      <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemType="section"
        itemName={`Section ${section.section}`}
      />
    </>
  );
};

export default SectionDetailsModal;
