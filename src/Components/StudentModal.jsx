import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, User, BookOpen, Calendar, Phone, MapPin, GraduationCap } from "lucide-react";
import EditStudentModal from "./EditStudentModal";
import DeleteModal from "./DeleteModal";

const StudentModal = ({ student }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 
  if (!student) return null;

  return (
    <>
      {/* 👁️ View Button to open student modal */}
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => setIsViewOpen(true)}
      >
        View
      </Button>

      {/* 👁️ Student View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left: Student Overview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-y-auto">
              <div className="text-center mb-4">
                <div className="w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={student.image || "https://via.placeholder.com/300"}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {student.name}
                </h2>
                <Badge variant="outline" className="mb-4">
                  Roll No: {student.rollNo || 'N/A'}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{student.class}</p>
                  <p className="text-sm text-gray-600">Class</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{student.section}</p>
                  <p className="text-sm text-gray-600">Section</p>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{student.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">{student.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium text-gray-900">{student.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-medium text-gray-900">{student.dob || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Info */}
            <div className="bg-white flex flex-col h-full">
              {/* Header - Fixed */}
              <div className="border-b p-4 flex-shrink-0">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-gray-800">
                    Student Details
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 mt-1">Complete information for {student.name}</p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setIsEditOpen(true);
                      setIsViewOpen(false);
                    }}
                  >
                    Edit Student
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
                    Print Report
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                

               {/* Personal Information */}
<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
    Personal Information
  </h3>
  <hr className="border-b border-gray-100 my-2" />
  <div className="grid grid-cols-2 gap-3">
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
      <p className="text-sm font-semibold text-gray-800">{student.name}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Gender</p>
      <p className="text-sm font-semibold text-gray-800">{student.gender}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Date of Birth</p>
      <p className="text-sm font-semibold text-gray-800">{student.dob || 'N/A'}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Age</p>
      <p className="text-sm font-semibold text-gray-800">
        {student.dob ? new Date().getFullYear() - new Date(student.dob).getFullYear() : 'N/A'}
      </p>
    </div>
  </div>
</div>

{/* Enrollment Information */}
<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
    Enrollment Information
  </h3>
  <hr className="border-b border-gray-100 my-2" />
  <div className="grid grid-cols-2 gap-3">
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Admission Date</p>
      <p className="text-sm font-semibold text-gray-800">{student.admissionDate || 'N/A'}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Date of Joining</p>
      <p className="text-sm font-semibold text-gray-800">{student.dateOfJoining || 'N/A'}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Student Status</p>
      <div className="mt-1">
        <Badge variant="outline" className="text-xs">
          {student.status || 'Active'}
        </Badge>
      </div>
    </div>
  </div>
</div>


               
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditStudentModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        initialData={student}
      />

      <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemType="student"
        itemName={student.name}
      />
    </>
  );
};

export default StudentModal;
