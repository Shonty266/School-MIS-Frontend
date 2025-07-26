import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrums';
import StatsCard from '@/components/StatsCard';
import { 
  LineChart,
  DoughnutChart,
  BarChart,
  AreaChart
} from '@/components/ChartComponents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  UserCheck,

  DollarSign,
 
  Monitor
} from 'lucide-react';
import {
  generateFakeDashboardStats,
  generateFakeRecentActivities,
  generateFakeAttendanceData,
  generateFakePerformanceData,
  generateFakeSubjectEnrollment,
  generateFakeMonthlyFees,
  generateFakeStudentGrowth,
  generateFakeAgeDistribution
} from '@/utils/fakedashboardData';
import AddStudentModal from '@/components/AddStudentModal';
import AddTeacherModal from '@/components/AddTeacherModal';
import AddClassModal from '@/components/AddClassModal';
import AddEventModal from '@/components/AddEventModal';
import ProjectInfoModal from '@/Components/ProjectInfoModal';

const Dashboard = () => {
  const [stats] = useState(generateFakeDashboardStats());
  const [recentActivities] = useState(generateFakeRecentActivities(6));
  const [attendanceData] = useState(generateFakeAttendanceData());
  const [performanceData] = useState(generateFakePerformanceData().slice(0, 5));
  const [subjectEnrollment] = useState(generateFakeSubjectEnrollment());
  const [monthlyFees] = useState(generateFakeMonthlyFees());
  const [studentGrowth] = useState(generateFakeStudentGrowth());
  const [ageDistribution] = useState(generateFakeAgeDistribution());
  
  // Modal states
  const [openAddStudentModal, setOpenAddStudentModal] = useState(false);
  const [openAddTeacherModal, setOpenAddTeacherModal] = useState(false);
  const [openAddClassModal, setOpenAddClassModal] = useState(false);
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [openProjectInfoModal, setOpenProjectInfoModal] = useState(false);


  const getActivityIcon = (type) => {
    switch (type) {
      case 'info': return '📋';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      default: return '📋';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenProjectInfoModal(true);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="sm:p-4 space-y-4 overflow-hidden">
        {/* Breadcrumb with Date and Time */}
        <div className="flex flex-row justify-between items-start sm:items-center gap-4 p-2 sm:p-0">
          <Breadcrumbs items={["Home", "Dashboard"]} />
          
          <div className="flex flex-row items-start sm:items-center gap-2">
            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-600">Today's Date</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="block w-px h-10 bg-gray-300"></div>
            
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-600">Current Time</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800">
            Welcome Back! 👋
          </h1>
          <p className="text-base text-gray-500">
            Here's what's happening at your school today.
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
            color="gray"
            trend={{ direction: 'up', percentage: 5.2, color: 'gray' }}
          />
          <StatsCard
            title="Total Teachers"
            value={stats.totalTeachers}
            icon={GraduationCap}
            color="gray"
            trend={{ direction: 'up', percentage: 2.1, color: 'gray' }}
          />
          <StatsCard
            title="Present Today"
            value={stats.presentToday}
            icon={UserCheck}
            color="gray"
            trend={{ direction: 'up', percentage: 3.2, color: 'gray' }}
          />
          <StatsCard
            title="Pending Fees"
            value={stats.pendingFees}
            icon={DollarSign}
            color="gray"
          />
        </div>

        {/* Key Insights Section - Chart.js Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Student Growth Trend - Line Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Student Growth</h3>
                <p className="text-sm text-gray-500">Enrollment trend over the last 6 months</p>
              </div>
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                Last 6 Months
              </Badge>
            </div>
            <LineChart data={studentGrowth} title="Student Enrollment" />
          </div>

          {/* Age Distribution - Doughnut Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Student Demographics</h3>
                <p className="text-sm text-gray-500">Age distribution across all students</p>
              </div>
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                Current Year
              </Badge>
            </div>
            <DoughnutChart data={ageDistribution} title="Age Groups" />
          </div>
        </div>

        {/* Academic Performance Section - Chart.js Bar Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Subject Enrollment - Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Subject Enrollment</h3>
                <p className="text-sm text-gray-500">Students enrolled per subject</p>
              </div>
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                Current Term
              </Badge>
            </div>
            <BarChart data={subjectEnrollment} title="Subject Enrollment" color="gray" />
          </div>

          {/* Fee Collection - Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Monthly Revenue</h3>
                <p className="text-sm text-gray-500">Fee collection over time</p>
              </div>
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                Last 6 Months
              </Badge>
            </div>
            <BarChart data={monthlyFees} title="Monthly Revenue" color="black" />
          </div>
        </div>

        {/* Additional Chart Section - Area Chart */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Attendance Trend</h3>
                <p className="text-sm text-gray-500">Daily attendance percentage over the week</p>
              </div>
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                This Week
              </Badge>
            </div>
            <AreaChart 
              data={attendanceData.map(day => ({
                label: day.day,
                value: Math.round((day.present / (day.present + day.absent)) * 100),
              }))} 
              title="Attendance %" 
            />
          </div>
        </div>

        {/* Activities and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Recent Activities</h3>
                <p className="text-sm text-gray-500">Latest updates and actions</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">
                View All
              </Button>
            </div>
            <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-xl">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.activity}
                    </p>
                    <p className="text-xs text-gray-600">
                      by {activity.user} • {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class Performance Summary with Scrollbar */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Class Performance</h3>
              <p className="text-sm text-gray-500">Average scores by class</p>
            </div>
            <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar">
              {performanceData.map((classData) => (
                <div key={classData.class} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-700">{classData.class}</span>
                    <p className="text-xs text-gray-500">{classData.students} students</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{classData.average}%</span>
                    <div className="flex items-center gap-1 mt-6">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            classData.average >= 80
                              ? 'bg-black'
                              : classData.average >= 70
                              ? 'bg-gray-600'
                              : 'bg-gray-400'
                          }`}
                          style={{ width: `${classData.average}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Add more dummy data to demonstrate scrollbar */}
              {[...Array(5)].map((_, index) => (
                <div key={`extra-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Grade {index + 6}</span>
                    <p className="text-xs text-gray-500">{Math.floor(Math.random() * 50) + 20} students</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{Math.floor(Math.random() * 20) + 70}%</span>
                    <div className="flex items-center gap-1 mt-6">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500 bg-gray-500"
                          style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
            <p className="text-sm text-gray-500">Common tasks and shortcuts</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer" 
              onClick={() => setOpenAddStudentModal(true)}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Add Student</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer" 
              onClick={() => setOpenAddTeacherModal(true)}
            >
              <GraduationCap className="h-6 w-6" />
              <span className="text-sm">Add Teacher</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer" 
              onClick={() => setOpenAddClassModal(true)}
            >
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Add Class</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer" 
              onClick={() => setOpenAddEventModal(true)}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Add Event</span>
            </Button>
            <Button 
  variant="outline" 
  className="h-20 flex flex-col items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer" 
  onClick={() => setOpenProjectInfoModal(true)}
>
  <Monitor className="h-6 w-6" />
  <span className="text-sm">Project Info</span>
</Button>

          </div>
        </div>
      </div>

      <AddStudentModal open={openAddStudentModal} setOpen={setOpenAddStudentModal} />
      <AddTeacherModal open={openAddTeacherModal} setOpen={setOpenAddTeacherModal} />
      <AddClassModal open={openAddClassModal} setOpen={setOpenAddClassModal} />
      <AddEventModal open={openAddEventModal} setOpen={setOpenAddEventModal} />
      <ProjectInfoModal open={openProjectInfoModal} setOpen={setOpenProjectInfoModal} />
    </Layout>
  );
};

export default Dashboard;
