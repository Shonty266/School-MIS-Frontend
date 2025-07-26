import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, GraduationCap, Calendar, FileText, Users } from "lucide-react";
import AddSubjectModal from "./AddSubjectModal";
import DeleteModal from "./DeleteModal";

const SubjectModal = ({ subject, onEdit }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (!subject) return null;

  return (
    <>
      {/* View Button to open subject modal */}
      <Button
        variant="outline"
        className="cursor-pointer" // Removed size="sm" to match StudentModal
        onClick={() => setIsViewOpen(true)}
      >
        View
      </Button>

      {/* Subject View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left: Subject Overview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-y-auto">
              <div className="text-center mb-4">
                <div className="w-32 h-32 mx-auto mb-2 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-gray-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {subject.name}
                </h2>
                <Badge variant="outline" className="mb-4">
                  Code: {subject.code}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{subject.className}</p>
                  <p className="text-sm text-gray-600">Class</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">1</p>
                  <p className="text-sm text-gray-600">Teacher</p>
                </div>
              </div>

              {/* Subject Information Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Subject Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject Name:</span>
                    <span className="font-medium text-gray-900">{subject.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject Code:</span>
                    <span className="font-medium text-gray-900">{subject.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium text-gray-900">{subject.className}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teacher:</span>
                    <span className="font-medium text-gray-900">{subject.teacher}</span>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Status</h4>
                <Badge variant="outline" className="text-xs">
          {subject.status || 'Active'}
        </Badge>
              </div>
            </div>

            {/* Right: Detailed Info */}
            <div className="bg-white flex flex-col h-full">
              {/* Header - Fixed */}
              <div className="border-b p-4 flex-shrink-0">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-gray-800">
                    Subject Details
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 mt-1">Complete information for {subject.name}</p>

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
                    Edit Subject
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
                    Print Details {/* Changed from "Print Details" to match StudentModal's "Print Report" */}
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                

                {/* Academic Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                    Academic Information {/* Changed from "Teaching Information" */}
                  </h3>
                  <hr className="border-b border-gray-100 my-2" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Assigned Teacher</p>
                      <p className="text-sm font-semibold text-gray-800">{subject.teacher}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Subject Type</p>
                      <p className="text-sm font-semibold text-gray-800">Core Subject</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {subject.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                    Course Details {/* Changed from "Additional Information" */}
                  </h3>
                  <hr className="border-b border-gray-100 my-2" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Credits</p>
                      <p className="text-sm font-semibold text-gray-800">4</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Weekly Hours</p>
                      <p className="text-sm font-semibold text-gray-800">5 hours</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Total Students</p>
                      <p className="text-sm font-semibold text-gray-800">30</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Subject Status</p>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {subject.status || 'Active'}
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

      {/* Edit Subject Modal */}
      <AddSubjectModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        initialData={subject}
        onSave={onEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemType="subject"
        itemName={subject.name}
       
      />
    </>
  );
};

export default SubjectModal;
