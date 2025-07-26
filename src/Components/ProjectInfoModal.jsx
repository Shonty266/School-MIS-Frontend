import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Palette, 
  Smartphone, 
  Zap, 
  Globe,
  Monitor,
  Database,
  X,
  GraduationCap,
  BarChart3
} from "lucide-react";

const ProjectInfoModal = ({ open, setOpen }) => {
  const techStack = [
    {
      name: "React",
      description: "Frontend JavaScript library",
      icon: <Code2 className="h-4 w-4" />,
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "ShadCN/UI",
      description: "Modern component library",
      icon: <Palette className="h-4 w-4" />,
      color: "bg-gray-200 text-gray-900"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      icon: <Smartphone className="h-4 w-4" />,
      color: "bg-gray-300 text-gray-900"
    },
    {
      name: "JavaScript",
      description: "Core programming language",
      icon: <Zap className="h-4 w-4" />,
      color: "bg-gray-400 text-white"
    },
    {
      name: "Chart.js",
      description: "Data visualization library",
      icon: <BarChart3 className="h-4 w-4" />,
      color: "bg-gray-500 text-white"
    },
    {
      name: "Framer Motion",
      description: "Animation and gesture library",
      icon: <Globe className="h-4 w-4" />,
      color: "bg-gray-600 text-white"
    }
  ];

  const features = [
    "📊 Dashboard with Analytics",
    "👥 Student & Teacher Management",
    "📚 Academic Calendar & Events",
    "📈 Performance Tracking",
    "📱 Responsive Admin Interface",
    "🎨 Modern UI Components"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="border-b p-4 flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span>School MIS - Admin Panel</span>
                  <Badge className="bg-black text-white px-2 py-1 text-xs font-semibold ml-4">
                    Frontend Only
                  </Badge>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mt-4">
            A comprehensive <strong>School Management Information System (MIS)</strong> admin dashboard - Frontend demonstration showcasing modern React development practices
          </p>
        </div>

        {/* Scrollable Content with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center border">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-4 w-4 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-900">Admin Dashboard</p>
              <p className="text-xs text-gray-600">School MIS Frontend</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center border">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="h-4 w-4 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-900">Mock Data</p>
              <p className="text-xs text-gray-600">Faker.js Demo</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center border">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <p className="text-xs font-bold text-gray-900">UI/UX Showcase</p>
              <p className="text-xs text-gray-600">Frontend Demo</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-4"></span>
              Technology Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-gray-100 rounded">
                      {tech.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">{tech.name}</h4>
                        <Badge variant="outline" className={`text-xs ${tech.color}`}>
                          ✓
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{tech.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Features */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-4"></span>
                Key Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="text-sm text-gray-700 flex items-center gap-4">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Project Scope */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-4"></span>
                Project Scope
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                  <div>
                    <span className="font-medium text-gray-900">Frontend Only:</span>
                    <span className="text-gray-600 ml-1">Complete admin interface</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                  <div>
                    <span className="font-medium text-gray-900">Demo Purpose:</span>
                    <span className="text-gray-600 ml-1">Showcase UI/UX skills</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                  <div>
                    <span className="font-medium text-gray-900">No Backend:</span>
                    <span className="text-gray-600 ml-1">Data not persistent</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                  <div>
                    <span className="font-medium text-gray-900">Mock Data:</span>
                    <span className="text-gray-600 ml-1">Generated with Faker.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="mt-4">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-4"></span>
              Admin Panel Modules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded border">
                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <Code2 className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Dashboard</p>
                  <p className="text-xs text-gray-600">Analytics & Stats</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded border">
                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <Smartphone className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Management</p>
                  <p className="text-xs text-gray-600">Students & Teachers</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded border">
                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Calendar</p>
                  <p className="text-xs text-gray-600">Events & Schedule</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacing for better scroll experience */}
          <div className="h-4"></div>
        </div>

        {/* Footer with single close button */}
        <div className="border-t p-4 flex-shrink-0 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              <strong>School MIS Admin Panel</strong> - A frontend-only demonstration of modern React development
            </p>
            <Button 
              onClick={() => setOpen(false)}
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm rounded-md transition-colors cursor-pointer"
            >
              Got it!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectInfoModal;
