import React, { useEffect, useState } from "react";
import "../index.css"
import { generateFakeTeachers } from "../utils/fakeTeachers";
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
import TeacherModal from "@/Components/TeacherModal";
import Breadcrumbs from "@/Components/Breadcrums";
    import AddTeacherModal from "@/components/AddTeacherModal"; 
    import DeleteModal from "@/Components/DeleteModal";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const teachersPerPage = 10;

  useEffect(() => {
    const fakeData = generateFakeTeachers(50);
    setTeachers(fakeData);
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === "all" || teacher.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * teachersPerPage,
    currentPage * teachersPerPage
  );

  return (
    <Layout title="Teachers">
      <div className="sm:p-4 space-y-4 overflow-hidden">
        <Breadcrumbs items={["Home", "Teachers"]} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md">
  <div>
    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
      Teacher Management
    </h1>
    <h4 className="text-xs sm:text-sm text-gray-500">
      Manage your Teachers here
    </h4>
  </div>

  <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
    {selectedTeachers.length > 0 && (
      <Button
        variant="destructive"
        className="w-full sm:w-auto cursor-pointer"
        onClick={() => {
          setIsDeleteOpen(true);
        }}
      >
        Delete Selected ({selectedTeachers.length})
      </Button>
    )}

    <Button
      className="w-full sm:w-auto cursor-pointer"
      onClick={() => setIsAddOpen(true)}
    >
      <Plus className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Add Teacher</span>
      <span className="sm:hidden">Add</span>
    </Button>
  </div>

  <AddTeacherModal open={isAddOpen} setOpen={setIsAddOpen} />
  <DeleteModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        onConfirm={() => {
          setTeachers((prev) =>
            prev.filter((teacher) => !selectedTeachers.includes(teacher.id))
          );
          setSelectedTeachers([]);
        }}
      />
  </div>


        <div className="bg-white rounded-lg overflow-auto shadow-md">
          <div className="flex flex-col gap-4 border-b-2 border-black">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-semibold">
                  All Teachers
                </h1>
                <span className="bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {teachers.length}
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
                  value={selectedSubject}
                  onValueChange={(value) => {
                    setSelectedSubject(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-40 cursor-pointer">
                    <SelectValue placeholder="Filter by subject" className="cursor-pointer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">All Subjects</SelectItem>
                    {[...new Set(teachers.map((t) => t.subject))]
                      .filter(Boolean)
                      .sort()
                      .map((subject) => (
                        <SelectItem key={subject} value={subject} className="cursor-pointer">
                          {subject}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>


<div className="hidden lg:block w-full overflow-hidden">
  <div className="overflow-x-auto">
    <Table className="w-[120%] table-fixed">
      <TableHeader>
        <TableRow className="bg-muted text-muted-foreground font-semibold text-sm">
          <TableHead className="text-black w-12">
            <input
              type="checkbox"
              checked={selectedTeachers.length === paginatedTeachers.length && paginatedTeachers.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTeachers(paginatedTeachers.map((t) => t.id));
                } else {
                  setSelectedTeachers([]);
                }
              }}
            />
          </TableHead>
          <TableHead className="text-black w-12">#</TableHead>
          <TableHead className="text-black w-32">Name</TableHead>
          <TableHead className="text-black w-24">Subject</TableHead>
          <TableHead className="text-black w-24">Experience</TableHead>
          <TableHead className="text-black w-28">Qualification</TableHead>
          <TableHead className="text-black w-48">Email</TableHead>
          <TableHead className="text-black w-28">Phone</TableHead>
          <TableHead className="text-black w-20">Status</TableHead>
          <TableHead className="text-black w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white">
        {paginatedTeachers.map((teacher, index) => (
          <TableRow key={teacher.id} className="bg-white hover:bg-gray-100 transition-colors shadow-sm">
            <TableCell className="w-12">
              <input
                type="checkbox"
                checked={selectedTeachers.includes(teacher.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTeachers((prev) => [...prev, teacher.id]);
                  } else {
                    setSelectedTeachers((prev) => prev.filter((id) => id !== teacher.id));
                  }
                }}
              />
            </TableCell>
            <TableCell className="w-12">{(currentPage - 1) * teachersPerPage + index + 1}</TableCell>
            <TableCell className="font-medium w-32 truncate" title={teacher.name}>{teacher.name}</TableCell>
            <TableCell className="w-24 truncate" title={teacher.subject}>{teacher.subject}</TableCell>
            <TableCell className="w-24">{teacher.experience}</TableCell>
            <TableCell className="w-28 truncate" title={teacher.qualification}>{teacher.qualification}</TableCell>
            <TableCell className="text-sm text-gray-600 w-48 truncate" title={teacher.email}>{teacher.email}</TableCell>
            <TableCell className="w-28">{teacher.phone}</TableCell>
            <TableCell className="w-20">
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  teacher.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : teacher.status === "Inactive"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {teacher.status}
              </span>
            </TableCell>
            <TableCell className="w-20">
              <TeacherModal teacher={teacher} className="cursor-pointer" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>




          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="divide-y divide-gray-200">
              {paginatedTeachers.map((teacher, index) => (
                <div key={teacher.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 font-medium">
                          #{(currentPage - 1) * teachersPerPage + index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-900">
                          {teacher.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">{teacher.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          teacher.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : teacher.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {teacher.status}
                      </span>
                      <TeacherModal teacher={teacher} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Subject:</span>
                      <span className="ml-1 font-medium">{teacher.subject}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Qualification:</span>
                      <span className="ml-1 font-medium">{teacher.qualification}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Experience:</span>
                      <span className="ml-1">{teacher.experience}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-1">{teacher.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t bg-gray-50">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {Math.min((currentPage - 1) * teachersPerPage + 1, filteredTeachers.length)} to{" "}
              {Math.min(currentPage * teachersPerPage, filteredTeachers.length)} of{" "}
              {filteredTeachers.length} results
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                Prev
              </Button>
              <span className="text-sm font-medium px-3 py-1">
                {currentPage} of {totalPages || 1}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                variant="outline"
                size="sm"
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
};

export default Teachers;
