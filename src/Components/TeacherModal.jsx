import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, User, BookOpen, Calendar, Phone, MapPin, GraduationCap, Award } from "lucide-react";
import EditTeacherModal from "./EditTeacherModal";
import DeleteModal from "./DeleteModal";

const TeacherModal = ({ teacher }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
 
  if (!teacher) return null;

  return (
    <>
      {/* 👁️ View Button to open teacher modal */}
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => setIsViewOpen(true)}
      >
        View
      </Button>

      {/* 👁️ Teacher View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left: Teacher Overview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-y-auto">
              <div className="text-center mb-4">
                <div className="w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={teacher.image || "https://via.placeholder.com/300"}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {teacher.name}
                </h2>
                <Badge variant="outline" className="mb-4">
                  ID: {teacher.id || 'N/A'}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{teacher.subject}</p>
                  <p className="text-sm text-gray-600">Subject</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{teacher.classAssigned || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Classes</p>
                </div>
              </div>

              {/* Professional Information Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Professional Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{teacher.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">{teacher.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Qualification:</span>
                    <span className="font-medium text-gray-900">{teacher.qualification || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium text-gray-900">{teacher.experience || 'N/A'} years</span>
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
                    Teacher Details
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 mt-1">Complete information for {teacher.name}</p>

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
                    Edit Teacher
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
                <div className="mb-4">
  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
    Personal Information
  </h3>
  <hr className="border-b border-gray-100 my-2" />
  <div className="grid grid-cols-2 gap-3">
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
      <p className="text-sm font-semibold text-gray-800">{teacher.name}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Gender</p>
      <p className="text-sm font-semibold text-gray-800">{teacher.gender}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Date of Birth</p>
      <p className="text-sm font-semibold text-gray-800">{teacher.dob || 'N/A'}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Age</p>
      <p className="text-sm font-semibold text-gray-800">
        {teacher.dob ? new Date().getFullYear() - new Date(teacher.dob).getFullYear() : 'N/A'}
      </p>
    </div>
  </div>
</div>


             

               {/* Employment Information */}
<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
    Employment Information
  </h3>
  <hr className="border-b border-gray-100 my-2" />
  <div className="grid grid-cols-2 gap-3">
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Date of Joining</p>
      <p className="text-sm font-semibold text-gray-800">{teacher.dateOfJoining || 'N/A'}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Experience</p>
      <p className="text-sm font-semibold text-gray-800">{teacher.experience || 'N/A'} years</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Employee Type</p>
      <p className="text-sm font-semibold text-gray-800">{teacher.employeeType || 'Full-time'}</p>
    </div>
    <div className="bg-gray-50 p-3 rounded-lg">
      <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
      <div className="mt-1">
        <Badge variant="outline" className="text-xs">
          {teacher.status || 'Active'}
        </Badge>
      </div>
    </div>
  </div>
</div>


                {/* Additional Information */}
               
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditTeacherModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        initialData={teacher}
      />

      <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemType="teacher"
        itemName={teacher.name}
      />
    </>
  );
};

export default TeacherModal;
