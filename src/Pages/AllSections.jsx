import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, BookOpen, User, Search, Calendar, GraduationCap, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/Components/Breadcrums';
import { useParams, useNavigate } from 'react-router-dom';
import { generateFakeClasses } from '../utils/fakeClassData';
import { MapPin } from 'lucide-react';
import SectionDetailsModal from '@/Components/SectionDetailsModal';
import EditSectionModal from '@/Components/EditSectionModal';   
import AddSectionModal from '@/Components/AddSectionModal';

const AllSections = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classData, setClassData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const sectionsPerPage = 9;

  useEffect(() => {
    fetchClassData(classId);
  }, [classId]);

  // ... (keeping all the existing helper functions unchanged)
  const fetchClassData = async (id) => {
    try {
      // Generate fake data
      const fakeClasses = generateFakeClasses(50);
      
      // Group classes by className to simulate the structure you need
      const groupedClasses = groupClassesByName(fakeClasses);
      
      // Find the specific class by ID or create a mock one
      let targetClass = groupedClasses.find(cls => cls.id.toString() === id);
      
      // If no class found with that ID, create a specific one or use the first one
      if (!targetClass && groupedClasses.length > 0) {
        targetClass = groupedClasses[0];
        targetClass.id = id; // Set the ID to match the URL parameter
      }
      
      // If still no class, create a default one
      if (!targetClass) {
        targetClass = {
          id: id,
          className: `Class ${Math.floor(Math.random() * 12) + 1}`,
          sections: generateSectionsForClass(),
          totalStudents: 0,
          createdAt: new Date().toDateString()
        };
        // Calculate total students
        targetClass.totalStudents = targetClass.sections.reduce((sum, section) => sum + section.students, 0);
      }
      
      setClassData(targetClass);
    } catch (error) {
      console.error('Error fetching class data:', error);
      // Fallback to mock data
      setClassData(createFallbackClassData(id));
    }
  };

  // Helper function to group classes by name and organize sections
  const groupClassesByName = (classes) => {
    const grouped = classes.reduce((acc, classItem) => {
      const className = classItem.className;
      
      if (!acc[className]) {
        acc[className] = {
          id: classItem.id,
          className: className,
          sections: [],
          totalStudents: 0,
          createdAt: classItem.createdAt,
          academicYear: classItem.academicYear,
          metadata: classItem.metadata
        };
      }
      
      acc[className].sections.push({
        section: classItem.section,
        subject: classItem.subject,
        classTeacher: classItem.classTeacher,
        students: classItem.totalStudents,
        classCode: classItem.classCode,
        schedule: classItem.schedule,
        classroom: classItem.classroom,
        performance: classItem.performance,
        resources: classItem.resources,
        status: classItem.status,
        fees: classItem.fees
      });
      
      acc[className].totalStudents += classItem.totalStudents;
      
      return acc;
    }, {});

    return Object.values(grouped);
  };

  // Generate sections for a class using faker data
  const generateSectionsForClass = () => {
    const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
    
    return sections.slice(0, Math.floor(Math.random() * 4) + 3).map((section, index) => {
      const fakeClass = generateFakeClasses(1)[0];
      return {
        section: section,
        subject: subjects[index % subjects.length],
        classTeacher: fakeClass.classTeacher,
        students: fakeClass.totalStudents,
        classCode: fakeClass.classCode,
        schedule: fakeClass.schedule,
        classroom: fakeClass.classroom,
        performance: fakeClass.performance,
        resources: fakeClass.resources,
        status: fakeClass.status,
        fees: fakeClass.fees
      };
    });
  };

  // Fallback data creation
  const createFallbackClassData = (id) => {
    const sections = generateSectionsForClass();
    return {
      id: id,
      className: `Class ${Math.floor(Math.random() * 12) + 1}`,
      sections: sections,
      totalStudents: sections.reduce((sum, section) => sum + section.students, 0),
      createdAt: new Date().toDateString()
    };
  };

  if (!classData) {
    return (
      <Layout title="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading class data...</div>
        </div>
      </Layout>
    );
  }

  // Enhanced search functionality
  const filteredSections = classData.sections.filter((section) => {
    const searchTerm = searchQuery.toLowerCase();
    
    return (
      // Search by section name
      section.section.toLowerCase().includes(searchTerm) ||
      
      // Search by subject
      section.subject.toLowerCase().includes(searchTerm) ||
      
      // Search by class teacher name
      section.classTeacher.toLowerCase().includes(searchTerm) ||
      
      // Search by classroom/room number
      (section.classroom && (
        section.classroom.roomNumber.toLowerCase().includes(searchTerm) ||
        section.classroom.building.toLowerCase().includes(searchTerm) ||
        section.classroom.floor.toLowerCase().includes(searchTerm)
      )) ||
      
      // Search by class code
      (section.classCode && section.classCode.toLowerCase().includes(searchTerm)) ||
      
      // Search by status
      (section.status && section.status.toLowerCase().includes(searchTerm))
    );
  });

  const totalSections = classData.sections.length;
  const totalStudents = classData.totalStudents;
  const avgStudentsPerSection = Math.round(totalStudents / totalSections);

  const totalPages = Math.ceil(filteredSections.length / sectionsPerPage);
  const paginatedSections = filteredSections.slice(
    (currentPage - 1) * sectionsPerPage,
    currentPage * sectionsPerPage
  );

  return (
    <Layout title={`${classData.className} - All Sections`}>
      <div className="sm:p-4 space-y-4">
        {/* Breadcrumbs */}
        <Breadcrumbs items={["Home", "Class Management", "All Sections"]} />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md border">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
              {classData.className} - All Sections
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Complete overview of all sections in {classData.className}
            </p>
          </div>

          <Button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white cursor-pointer" onClick={() => setIsAddSectionOpen(true)}    >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add New Section</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
       
        <div className="bg-white p-4 rounded-lg shadow-md border">
          {/* Statistics Heading */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Class Statistics</h2>
            <p className="text-sm text-gray-600">Overview of key metrics for {classData.className}</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Class</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {classData.className}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Sections</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {totalSections}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-gray-600 rounded-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Total Students</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {totalStudents}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-gray-500 rounded-lg">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Avg per Section</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {avgStudentsPerSection}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md border">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">All Sections</h2>
              <Badge variant="secondary" className="bg-black text-white">
                {filteredSections.length}
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by section, teacher, classroom, or subject..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 w-64 border-gray-300 focus:border-gray-500"
              />
            </div>
          </div>

          {/* Sections Grid */}
          <div className="p-6">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">No sections found</div>
                <div className="text-sm text-gray-400">
                  {searchQuery ? 'Try adjusting your search criteria' : 'No sections available'}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedSections.map((section, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-gray-800 border border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Badge variant="default" className="bg-gray-800 text-white hover:bg-gray-700">
                            Section {section.section}
                          </Badge>
                        </CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1 border-gray-300 text-gray-700">
                          <Users className="h-3 w-3" />
                          {section.students}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Classroom */}
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="p-2 bg-gray-200 rounded-lg">
                          <MapPin className="h-4 w-4 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Classroom</div>
                          <div className="font-semibold text-gray-900">
                            {section.classroom ? `Room ${section.classroom.roomNumber}` : 'Not Assigned'}
                          </div>
                        </div>
                      </div>

                      {/* Class Teacher */}
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="p-2 bg-gray-300 rounded-lg">
                          <User className="h-4 w-4 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Class Teacher</div>
                          <div className="font-semibold text-gray-900">{section.classTeacher}</div>
                        </div>
                      </div>

                      {/* Student Count */}
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-100">
                        <div className="p-2 bg-gray-400 rounded-lg">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Students</div>
                          <div className="font-semibold text-gray-900">
                            {section.students} students enrolled
                          </div>
                        </div>
                      </div>

                      {/* Additional Info - Class Code & Status */}
                      {section.classCode && (
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                          <span>Code: {section.classCode}</span>
                          {section.status && (
                            <Badge variant="outline" className="text-xs">
                              {section.status}
                            </Badge>
                          )}
                        </div>
                      )}

<div className="flex gap-2 pt-2">
  <SectionDetailsModal
    section={section}
    className={classData.className}
  />
  <Button
    onClick={() => {
      setSelectedSection(section); // Pass the section data
      setIsEditSectionOpen(true);
    }}
    variant="ghost"
    size="sm"
    className="flex-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
  >
    Edit Section
  </Button>
</div>

                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * sectionsPerPage + 1, filteredSections.length)} to {Math.min(currentPage * sectionsPerPage, filteredSections.length)} of {filteredSections.length} sections
              </div>

              <div className="flex items-center gap-2">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </Button>

                <span className="text-sm font-medium px-3 py-1 text-gray-900">
                  {currentPage} of {totalPages}
                </span>

                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <EditSectionModal
  open={isEditSectionOpen}
  setOpen={setIsEditSectionOpen}
  initialData={selectedSection} // This will now have the correct section data
  className={classData.className} // Add className prop if your modal needs it
 
/>
            <AddSectionModal
              open={isAddSectionOpen}
              setOpen={setIsAddSectionOpen}
              className={classData.className}
            />
    </Layout>
  );
};

export default AllSections;
