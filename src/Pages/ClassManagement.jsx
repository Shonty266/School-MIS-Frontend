import React, { useEffect, useState } from "react";
import { generateFakeClasses } from "../utils/fakeClassData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { Plus, Users, BookOpen, User } from "lucide-react";
import Breadcrumbs from "@/Components/Breadcrums";
import AddClassModal from "@/Components/AddClassModal";
import { useNavigate } from "react-router-dom";
const ClassManagement = () => {
  const [classData, setClassData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);  
  const [selectedClass, setSelectedClass] = useState(null); 
  const navigate = useNavigate();
  const classesPerPage = 6; // Show 6 class cards per page

  useEffect(() => {
    // Transform the fake data to group by class
    const fakeData = generateFakeClasses(50);
    const groupedData = groupClassesByName(fakeData);
    setClassData(groupedData);
  }, []);

  // Group classes by class name and organize sections
  const groupClassesByName = (classes) => {
    const grouped = classes.reduce((acc, classItem) => {
      const className = classItem.className;
      
      if (!acc[className]) {
        acc[className] = {
          id: classItem.id,
          className: className,
          sections: [],
          totalStudents: 0,
          createdAt: classItem.createdAt
        };
      }
      
      acc[className].sections.push({
        section: classItem.section,
        subject: classItem.subject,
        classTeacher: classItem.classTeacher,
        students: classItem.totalStudents
      });
      
      acc[className].totalStudents += classItem.totalStudents;
      
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const filteredClasses = classData.filter((classItem) => {
    return (
      classItem.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.sections.some(section => 
        section.classTeacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * classesPerPage,
    currentPage * classesPerPage
  );

  const handleAddClass = (newClass) => {
    setClassData(prev => {
      const existingClassIndex = prev.findIndex(c => c.className === newClass.className);
      
      if (existingClassIndex >= 0) {
        // Add section to existing class
        const updated = [...prev];
        updated[existingClassIndex].sections.push({
          section: newClass.section,
          subject: newClass.subject,
          classTeacher: newClass.classTeacher,
          students: newClass.totalStudents
        });
        updated[existingClassIndex].totalStudents += newClass.totalStudents;
        return updated;
      } else {
        // Create new class with first section
        return [...prev, {
          id: Date.now(),
          className: newClass.className,
          sections: [{
            section: newClass.section,
            subject: newClass.subject,
            classTeacher: newClass.classTeacher,
            students: newClass.totalStudents
          }],
          totalStudents: newClass.totalStudents,
          createdAt: new Date().toLocaleDateString()
        }];
      }
    });
  };

  return (
    <Layout title="Class Management">
      <div className="sm:p-4 space-y-4">
        <Breadcrumbs items={["Home", "Class Management"]} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
              Class Management
            </h1>
            <h4 className="text-xs sm:text-sm text-gray-500">
              Manage your classes and sections here
            </h4>
          </div>

          <Button className="cursor-pointer" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Class</span>
            <span className="sm:hidden">Add</span>
          </Button>

          <AddClassModal
            open={isAddOpen}
            setOpen={setIsAddOpen}
            onAddClass={handleAddClass}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold">All Classes</h1>
              <Badge variant="secondary" className="bg-black text-white">
                {classData.length}
              </Badge>
            </div>
            <Input
              placeholder="Search by class, teacher, or subject..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64"
            />
          </div>

          {/* Class Cards Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedClasses.map((classItem) => (
                <Card key={classItem.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-gray-800">
                        {classItem.className}
                      </CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {classItem.totalStudents}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Created: {classItem.createdAt}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Sections</span>
                      <Badge variant="secondary">
                        {classItem.sections.length} section{classItem.sections.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                      {classItem.sections.map((section, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {section.section}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <BookOpen className="h-3 w-3" />
                                {section.subject}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <User className="h-3 w-3" />
                              {section.classTeacher}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-700">
                              {section.students}
                            </div>
                            <div className="text-xs text-gray-500">students</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {classItem.sections.length > 3 && (
                      <div className="text-center pt-2">
                       <Button
  variant="ghost"
  size="sm"
  onClick={() => navigate(`/classes/${classItem.id}/sections`)}
  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
>
  View All Sections
</Button>

                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {paginatedClasses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">No classes found</div>
                <div className="text-sm text-gray-400">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Add your first class to get started'}
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * classesPerPage + 1, filteredClasses.length)} to {Math.min(currentPage * classesPerPage, filteredClasses.length)} of {filteredClasses.length} classes
              </div>

              <div className="flex items-center gap-2">
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
                  {currentPage} of {totalPages}
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
          )}
        </div>
      </div>
      
    </Layout>
  );
};

export default ClassManagement;
