import React, { useState } from "react"; // Removed useEffect import
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
import { Plus } from "lucide-react"; // Removed Eye import since it's now in SubjectModal
import { generateFakeSubjects } from "@/utils/fakeSubjects"; // Import from utils
import AddSubjectModal from "@/components/AddSubjectModal";
import SubjectModal from "@/components/SubjectModal"; // Import the comprehensive SubjectModal
import DeleteModal from "@/components/DeleteModal";

const classOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

function Subjects() {
  // Initialize subjects directly with fake data
  const [subjects, setSubjects] = useState(generateFakeSubjects(60));
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const perPage = 10;

  /* ------------------ filtering & pagination ------------------ */
  const filtered = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      filterClass === "All" || s.className === filterClass;

    return matchesSearch && matchesClass;
  });

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  /* ------------------ CRUD helpers ------------------ */
  const handleSave = (payload, isEdit) => {
    setSubjects((prev) =>
      isEdit ? prev.map((s) => (s.id === payload.id ? payload : s)) : [payload, ...prev]
    );
  };

  /* ------------------ UI ------------------ */
  return (
    <Layout title="Subjects">
      <div className="sm:p-4 space-y-4 overflow-hidden">
        <Breadcrumbs items={["Home", "Subjects"]} />

        {/* header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
              Subject Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Manage all academic subjects here
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            {selected.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setIsDeleteOpen(true)}
                className="w-full sm:w-auto cursor-pointer"
              >
                Delete Selected ({selected.length})
              </Button>
            )}

            <Button
              onClick={() => setIsAddOpen(true)}
              className="w-full sm:w-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Subject</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          {/* dialogs */}
          <AddSubjectModal
            open={isAddOpen}
            setOpen={setIsAddOpen}
            onSave={handleSave}
          />

          <DeleteModal
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            onConfirm={() => {
              setSubjects((prev) => prev.filter((s) => !selected.includes(s.id)));
              setSelected([]);
            }}
          />
        </div>

        {/* table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* New header section with search */}
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold">All Subjects</h1>
              <Badge variant="secondary" className="bg-black text-white">
                {subjects.length}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
            <Input
              placeholder="Search by subject, code, or teacher..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64"
            />
              <div className="">
            <Select
              value={filterClass}
              onValueChange={(val) => {
                setFilterClass(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-48 cursor-pointer">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className="cursor-pointer">
                  All Classes
                </SelectItem>
                {classOptions.map((c) => (
                  <SelectItem key={c} value={c} className="cursor-pointer">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>
          </div>

          {/* Class filter */}
        

          {/* Desktop table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-muted font-semibold text-sm">
                    <TableHead className="w-10">
                      <input
                        type="checkbox"
                        checked={
                          paginated.length > 0 &&
                          selected.length === paginated.length
                        }
                        onChange={(e) =>
                          setSelected(
                            e.target.checked ? paginated.map((s) => s.id) : []
                          )
                        }
                      />
                    </TableHead>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead className="w-40">Name</TableHead>
                    <TableHead className="w-24">Code</TableHead>
                    <TableHead className="w-24">Class</TableHead>
                    <TableHead className="w-40">Teacher</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginated.map((s, idx) => (
                    <TableRow key={s.id} className="hover:bg-gray-50">
                      <TableCell className="w-10">
                        <input
                          type="checkbox"
                          checked={selected.includes(s.id)}
                          onChange={(e) =>
                            setSelected((prev) =>
                              e.target.checked
                                ? [...prev, s.id]
                                : prev.filter((id) => id !== s.id)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{(currentPage - 1) * perPage + idx + 1}</TableCell>
                      <TableCell className="truncate" title={s.name}>
                        {s.name}
                      </TableCell>
                      <TableCell>{s.code}</TableCell>
                      <TableCell>{s.className}</TableCell>
                      <TableCell className="truncate" title={s.teacher}>
                        {s.teacher}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            s.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {s.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <SubjectModal subject={s} onEdit={handleSave} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* mobile cards */}
          <div className="lg:hidden divide-y">
            {paginated.map((s, idx) => (
              <div key={s.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{s.name}</h3>
                    <p className="text-xs text-gray-500">{s.code}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        s.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </span>
                    <SubjectModal subject={s} onEdit={handleSave} />
                  </div>
                </div>
                <p className="text-sm mt-1">
                  <span className="font-medium">{s.className}</span> •{" "}
                  {s.teacher}
                </p>
              </div>
            ))}
          </div>

          {/* pagination */}
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

export default Subjects;
