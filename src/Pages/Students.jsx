import React, { useEffect, useState } from "react";
import { generateFakeStudents } from "../utils/fakeStudents";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout"; 
import { Plus } from "lucide-react";
import StudentModal from "@/Components/StudentModal";
import Breadcrumbs from "@/Components/Breadcrums";
import AddModal from "@/Components/AddStudentModal"; 
import DeleteModal from "@/Components/DeleteModal";


const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);



  const studentsPerPage = 10;

  useEffect(() => {
    const fakeData = generateFakeStudents(50);
    setStudents(fakeData);
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass =
      selectedClass === "all" || student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <Layout title="Students">
      <div className="sm:p-4 space-y-4">
        {/* Page Heading - Responsive */}
        <Breadcrumbs items={["Home", "Students"]} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md">
  {/* Title Section */}
  <div>
    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
      Student Management
    </h1>
    <h4 className="text-xs sm:text-sm text-gray-500">
      Manage your students here
    </h4>
  </div>

  {/* Action Buttons Section */}
  <div className="flex items-center gap-3 ml-auto">
    {selectedStudents.length > 0 && (
      <Button
        variant="destructive"
        className="cursor-pointer"
        onClick={() => {
          setIsDeleteOpen(true);
        }}
      >
        Delete Selected ({selectedStudents.length})
      </Button>
    )}

    <Button
      className="cursor-pointer"
      onClick={() => setIsAddOpen(true)}
    >
      <Plus className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Add Student</span>
      <span className="sm:hidden">Add</span>
    </Button>
  </div>

  {/* Add Modal */}
  <AddModal open={isAddOpen} setOpen={setIsAddOpen} />
  <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        onConfirm={() => {
          setStudents((prev) =>
            prev.filter((student) => !selectedStudents.includes(student.id))
          );
          setSelectedStudents([]);
        }}
      />
</div>


        {/* Table Container - Responsive */}
        <div className="bg-white rounded-lg overflow-auto shadow-md">
          {/* Filters Section */}
          <div className="flex flex-col gap-4 border-b-2 border-black">
            {/* Stats Section */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-semibold">All Students</h1>
                <span className="bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {students.length}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-64"
              />

              <Select
                value={selectedClass}
                onValueChange={(value) => {
                  setSelectedClass(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-40 cursor-pointer">
                  <SelectValue placeholder="Filter by class" className="cursor-pointer" />
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                  <SelectItem value="all" className="cursor-pointer">All Classes</SelectItem>
                  {[...new Set(students.map((s) => s.class))]
                    .filter((cls) => cls)
                    .sort((a, b) => Number(a) - Number(b))
                    .map((cls) => (
                      <SelectItem key={cls} value={cls} className="cursor-pointer">
                        Class {cls}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            </div>

            {/* Search and Filter Controls */}
            
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted text-muted-foreground font-semibold text-sm">
                <TableHead className="text-black">
  <input
    type="checkbox"
    checked={selectedStudents.length === paginatedStudents.length && paginatedStudents.length > 0}
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedStudents(paginatedStudents.map((s) => s.id));
      } else {
        setSelectedStudents([]);
      }
    }}
  />
</TableHead>

                  <TableHead className="text-black">#</TableHead>
                  <TableHead className="text-black">Name</TableHead>
                  <TableHead className="text-black">Class</TableHead>
                  <TableHead className="text-black">Section</TableHead>
                  <TableHead className="text-black">Gender</TableHead>
                  <TableHead className="text-black">Email</TableHead>
                  <TableHead className="text-black">Phone</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="bg-white">
                {paginatedStudents.map((student, index) => (
                  <TableRow key={student.id} className="hover:bg-muted/50 bg-white">
                    <TableCell>
  <input
    type="checkbox"
    checked={selectedStudents.includes(student.id)}
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedStudents((prev) => [...prev, student.id]);
      } else {
        setSelectedStudents((prev) => prev.filter((id) => id !== student.id));
      }
    }}
  />
</TableCell>

                    <TableCell>{(currentPage - 1) * studentsPerPage + index + 1}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell className="text-sm text-gray-600">{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium
                          ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : student.status === "Inactive"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StudentModal student={student} className="cursor-pointer" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="divide-y divide-gray-200">
              {paginatedStudents.map((student, index) => (
                <div key={student.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 font-medium">
                          #{(currentPage - 1) * studentsPerPage + index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium
                          ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : student.status === "Inactive"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {student.status}
                      </span>
                      <StudentModal student={student} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Class:</span>
                      <span className="ml-1 font-medium">{student.class}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Section:</span>
                      <span className="ml-1 font-medium">{student.section}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <span className="ml-1">{student.gender}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-1">{student.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination - Responsive */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t bg-gray-50">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {Math.min((currentPage - 1) * studentsPerPage + 1, filteredStudents.length)} to{" "}
              {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of{" "}
              {filteredStudents.length} results
            </div>
            
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              
              <span className="text-sm font-medium px-3 py-1 ">
                {currentPage} of {totalPages || 1}
              </span>
              
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Students;
