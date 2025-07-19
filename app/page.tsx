"use client"

import { useState } from "react"
import {
  Plus,
  Briefcase,
  Sparkles,
  Calendar,
  DollarSign,
  MapPin,
  Building,
  Star,
  Search,
  MoreVertical,
  Brain,
  FileText,
  Users,
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Award,
  BookOpen,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns';

interface JobApplication {
  id: string
  company: string
  position: string
  status: "applied" | "interview" | "offer" | "rejected"
  appliedDate: string
  salary?: string
  location?: string
  notes?: string
  aiInsight?: string
  interviewDate?: string
  companyRating?: number
  matchScore?: number
  priority: "high" | "medium" | "low"
}

interface InterviewQuestion {
  id: string
  question: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  jobRole?: string
}

interface CompanyInsight {
  company: string
  industry: string
  size: string
  culture: string
  benefits: string[]
  glassdoorRating: number
  salaryRange: string
  growthRate: string
}

interface NetworkContact {
  id: string
  name: string
  position: string
  company: string
  relationship: string
  contactMethod: string
  notes: string
  lastContact: string
}

const statusConfig = {
  applied: { color: "#3B82F6", bg: "#EFF6FF", label: "Applied" },
  interview: { color: "#F59E0B", bg: "#FFFBEB", label: "Interview" },
  offer: { color: "#10B981", bg: "#ECFDF5", label: "Offer" },
  rejected: { color: "#EF4444", bg: "#FEF2F2", label: "Rejected" },
}

const priorityConfig = {
  high: { color: "#DC2626", bg: "#FEE2E2" },
  medium: { color: "#D97706", bg: "#FEF3C7" },
  low: { color: "#059669", bg: "#D1FAE5" },
}

const difficultyColors = {
  Easy: { bg: "#DCFCE7", color: "#166534" },
  Medium: { bg: "#FEF3C7", color: "#92400E" },
  Hard: { bg: "#FEE2E2", color: "#991B1B" },
}

export default function JobTracker() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [activeView, setActiveView] = useState("kanban")
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [jobs, setJobs] = useState<JobApplication[]>([
    {
      id: "1",
      company: "ABC Enterprises",
      position: "Senior Frontend Developer",
      status: "interview",
      appliedDate: "2025-04-15",
      salary: "7600000 LPA",
      location: "Bangalore, India",
      notes: "Great culture fit, technical interview scheduled for next week",
      aiInsight: "Strong match! Your React expertise aligns perfectly with their tech stack.",
      interviewDate: "2025-01-22",
      companyRating: 4.2,
      matchScore: 92,
      priority: "high",
    },
    {
      id: "2",
      company: "Wild Tech",
      position: "Full Stack Engineer",
      status: "applied",
      appliedDate: "2025-06-12",
      salary: "$85,000",
      location: "Remote",
      aiInsight: "Good opportunity for growth. They value versatile developers.",
      companyRating: 4.0,
      matchScore: 78,
      priority: "medium",
    },
    {
      id: "3",
      company: "Crimson Club",
      position: "Product Designer",
      status: "offer",
      appliedDate: "2025-03-08",
      salary: "$78,000",
      location: "New York, NY",
      notes: "Received offer! Need to respond by Friday",
      aiInsight: "Excellent news! This role offers great creative freedom.",
      companyRating: 4.5,
      matchScore: 85,
      priority: "high",
    },
    {
      id: "4",
      company: "TechFlow Inc",
      position: "Backend Developer",
      status: "rejected",
      appliedDate: "2025-03-05",
      salary: "$90,000",
      location: "Austin, TX",
      notes: "Not a good fit for their current needs",
      companyRating: 3.8,
      matchScore: 65,
      priority: "low",
    },
  ])

  const [interviewQuestions] = useState<InterviewQuestion[]>([
    {
      id: "1",
      question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
      category: "Behavioral",
      difficulty: "Medium",
      jobRole: "Frontend Developer",
    },
    {
      id: "2",
      question: "How do you handle code reviews and feedback from senior developers?",
      category: "Technical",
      difficulty: "Easy",
      jobRole: "Full Stack Engineer",
    },
    {
      id: "3",
      question: "Describe your approach to optimizing application performance.",
      category: "Technical",
      difficulty: "Hard",
      jobRole: "Frontend Developer",
    },
    {
      id: "4",
      question: "How do you stay updated with the latest technology trends?",
      category: "General",
      difficulty: "Easy",
    },
    {
      id: "5",
      question: "Explain the difference between SQL and NoSQL databases and when to use each.",
      category: "Technical",
      difficulty: "Medium",
      jobRole: "Backend Developer",
    },
  ])

  const [companyInsights] = useState<CompanyInsight[]>([
    {
      company: "ABC Enterprises",
      industry: "Creative Technology",
      size: "50-200 employees",
      culture: "Collaborative, innovative, work-life balance focused",
      benefits: ["Health Insurance", "Flexible PTO", "Remote Work", "Learning Budget"],
      glassdoorRating: 4.2,
      salaryRange: "64L - 96L",
      growthRate: "25% YoY",
    },
    {
      company: "Wild Tech",
      industry: "SaaS",
      size: "200-500 employees",
      culture: "Fast-paced, results-driven, growth-oriented",
      benefits: ["Stock Options", "Health Insurance", "Gym Membership", "Catered Meals"],
      glassdoorRating: 4.0,
      salaryRange: "$70K - $110K",
      growthRate: "40% YoY",
    },
    {
      company: "Crimson Club",
      industry: "Design & UX",
      size: "20-50 employees",
      culture: "Creative, flexible, client-focused",
      benefits: ["Creative Freedom", "Flexible Hours", "Design Tools", "Conference Budget"],
      glassdoorRating: 4.5,
      salaryRange: "$65K - $95K",
      growthRate: "15% YoY",
    },
  ])

  const [networkContacts] = useState<NetworkContact[]>([
    {
      id: "1",
      name: "Sara",
      position: "Senior Developer",
      company: "Moon Studios",
      relationship: "Former Colleague",
      contactMethod: "LinkedIn",
      notes: "Referred me to the current opening. Very supportive and knowledgeable about company culture.",
      lastContact: "2024-01-10",
    },
    {
      id: "2",
      name: "Soham",
      position: "Product Manager",
      company: "Wild Tech",
      relationship: "Conference Contact",
      contactMethod: "Email",
      notes: "Met at TechConf 2024. Interested in discussing product development approaches.",
      lastContact: "2024-01-08",
    },
    {
      id: "3",
      name: "Emily ",
      position: "Design Director",
      company: "Crimson Club",
      relationship: "Mentor",
      contactMethod: "Phone",
      notes: "Provides great career advice and industry insights. Helped with portfolio review.",
      lastContact: "2024-01-05",
    },
  ])

  const [newJob, setNewJob] = useState({
    company: "",
    position: "",
    status: "applied" as const,
    salary: "",
    location: "",
    notes: "",
    priority: "medium" as const,
  })

  const addJob = () => {
    if (newJob.company && newJob.position) {
      const job: JobApplication = {
        id: Date.now().toString(),
        ...newJob,
        appliedDate: new Date().toISOString().split("T")[0],
        aiInsight: generateAIInsight(newJob.company, newJob.position),
        companyRating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        matchScore: Math.floor(Math.random() * 30 + 70),
      }
      setJobs([job, ...jobs])
      setNewJob({
        company: "",
        position: "",
        status: "applied",
        salary: "",
        location: "",
        notes: "",
        priority: "medium",
      })
      setShowAddForm(false)
    }
  }

  const generateAIInsight = (company: string, position: string) => {
    const insights = [
      `${company} values innovation. Highlight your problem-solving skills for the ${position} role.`,
      `Great opportunity at ${company}. Focus on your collaborative experience for ${position}.`,
      `This ${position} role at ${company} matches your skill set perfectly.`,
      `${company} is expanding. The ${position} role offers growth potential.`,
    ]
    return insights[Math.floor(Math.random() * insights.length)]
  }

  const updateJobStatus = (id: string, status: JobApplication["status"]) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status } : job)))
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interviews: jobs.filter((j) => j.status === "interview").length,
    offers: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
    avgMatchScore: Math.round(jobs.reduce((acc, job) => acc + (job.matchScore || 0), 0) / jobs.length),
    responseRate: Math.round(((jobs.length - jobs.filter((j) => j.status === "applied").length) / jobs.length) * 100),
    interviewRate: Math.round((jobs.filter((j) => j.status === "interview").length / jobs.length) * 100),
    offerRate: Math.round((jobs.filter((j) => j.status === "offer").length / jobs.length) * 100),
  }

  const getJobsByStatus = (status: string) => {
    return filteredJobs.filter((job) => job.status === status)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Unique Header with Diagonal Design */}
      <div className="relative bg-white border-b-4 border-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-to-l from-violet-500 to-purple-600 transform rotate-12 translate-x-24 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-64 h-24 bg-gradient-to-r from-emerald-400 to-cyan-500 transform -rotate-6 -translate-x-16 translate-y-6"></div>

        <div className="relative px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center transform -rotate-3 shadow-xl">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-slate-900" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    CAREER<span className="text-violet-600">FLOW</span>
                  </h1>
                  <p className="text-slate-600 font-medium text-lg">Smart Job Tracking & Career Intelligence</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-2 border-slate-200 focus:border-violet-500 rounded-xl"
                  />
                </div>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs with Unique Design */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-transparent border-b-0 h-auto p-0">
              <TabsTrigger
                value="dashboard"
                className="flex items-center space-x-2 py-4 px-6 border-b-4 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent rounded-none"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-semibold">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="applications"
                className="flex items-center space-x-2 py-4 px-6 border-b-4 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent rounded-none"
              >
                <Briefcase className="w-5 h-5" />
                <span className="font-semibold">Applications</span>
              </TabsTrigger>
              <TabsTrigger
                value="interview-prep"
                className="flex items-center space-x-2 py-4 px-6 border-b-4 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent rounded-none"
              >
                <Brain className="w-5 h-5" />
                <span className="font-semibold">Interview Prep</span>
              </TabsTrigger>
              <TabsTrigger
                value="company-research"
                className="flex items-center space-x-2 py-4 px-6 border-b-4 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent rounded-none"
              >
                <Building className="w-5 h-5" />
                <span className="font-semibold">Research</span>
              </TabsTrigger>
              <TabsTrigger
                value="resume-analysis"
                className="flex items-center space-x-2 py-4 px-6 border-b-4 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent rounded-none"
              >
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Resume AI</span>
              </TabsTrigger>
              <TabsTrigger
                value="networking"
                className="flex items-center space-x-2 py-4 px-6 border-b-4 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent rounded-none"
              >
                <Users className="w-5 h-5" />
                <span className="font-semibold">Network</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center space-x-2 py-4 px-6 border-b-4 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent rounded-none"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <div className="py-8">
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-8 mt-0">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl transform rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-black text-slate-900">{stats.total}</p>
                          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Applications</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-3xl transform -rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-black text-slate-900">{stats.interviews}</p>
                          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Interviews</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200 rounded-3xl transform rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-black text-slate-900">{stats.offers}</p>
                          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Offers</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-violet-200 rounded-3xl transform -rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-3xl font-black text-slate-900">{stats.avgMatchScore}%</p>
                          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Avg Match</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity & AI Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl transform rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-lg">
                      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                        <Calendar className="w-6 h-6 mr-3 text-violet-600" />
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {jobs.slice(0, 4).map((job) => (
                          <div key={job.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: statusConfig[job.status].color }}
                            ></div>
                            <div className="flex-1">
                              <p className="font-semibold text-slate-900">{job.position}</p>
                              <p className="text-sm text-slate-600">{job.company}</p>
                            </div>
                            <div className="text-xs text-slate-500">
                            {format(new Date(job.appliedDate), 'yyyy-MM-dd')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-purple-100 rounded-3xl transform -rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-lg">
                      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                        <Sparkles className="w-6 h-6 mr-3 text-violet-600" />
                        AI Career Insights
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
                          <h4 className="font-bold text-slate-900 mb-2">Skill Gap Analysis</h4>
                          <p className="text-sm text-slate-700">
                            Consider learning TypeScript to match 80% of your target roles.
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl border border-emerald-200">
                          <h4 className="font-bold text-slate-900 mb-2">Market Insights</h4>
                          <p className="text-sm text-slate-700">
                            Frontend developer salaries increased 12% in your area this quarter.
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                          <h4 className="font-bold text-slate-900 mb-2">Application Strategy</h4>
                          <p className="text-sm text-slate-700">
                            Focus on mid-size companies for 40% higher response rates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6 mt-0">
                {/* Stats Bar */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
                        <span className="text-2xl font-bold text-slate-900">{stats.total}</span>
                        <span className="text-slate-600 font-medium">Total Applications</span>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-xl font-bold text-slate-900">{stats.applied}</span>
                        <span className="text-slate-600">Applied</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xl font-bold text-slate-900">{stats.interviews}</span>
                        <span className="text-slate-600">Interviews</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xl font-bold text-slate-900">{stats.offers}</span>
                        <span className="text-slate-600">Offers</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">{stats.avgMatchScore}%</div>
                        <div className="text-sm text-slate-600">Avg Match Score</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant={activeView === "kanban" ? "default" : "outline"}
                          onClick={() => setActiveView("kanban")}
                          className="rounded-lg"
                        >
                          Kanban
                        </Button>
                        <Button
                          variant={activeView === "list" ? "default" : "outline"}
                          onClick={() => setActiveView("list")}
                          className="rounded-lg"
                        >
                          List
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* To Add Job Form */}
                {showAddForm && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-purple-100 rounded-3xl transform rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">Add New Application</h3>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddForm(false)}
                          className="rounded-full border-2 border-slate-300"
                        >
                          ✕
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            Company
                          </label>
                          <Input
                            placeholder="Enter company name"
                            value={newJob.company}
                            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                            className="border-2 border-slate-200 focus:border-violet-500 rounded-xl"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            Position
                          </label>
                          <Input
                            placeholder="Job title"
                            value={newJob.position}
                            onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                            className="border-2 border-slate-200 focus:border-violet-500 rounded-xl"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Status</label>
                          <Select
                            value={newJob.status}
                            onValueChange={(value: any) => setNewJob({ ...newJob, status: value })}
                          >
                            <SelectTrigger className="border-2 border-slate-200 focus:border-violet-500 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="applied">Applied</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="offer">Offer</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Salary</label>
                          <Input
                            placeholder="Expected salary"
                            value={newJob.salary}
                            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                            className="border-2 border-slate-200 focus:border-violet-500 rounded-xl"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            Location
                          </label>
                          <Input
                            placeholder="Job location"
                            value={newJob.location}
                            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                            className="border-2 border-slate-200 focus:border-violet-500 rounded-xl"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            Priority
                          </label>
                          <Select
                            value={newJob.priority}
                            onValueChange={(value: any) => setNewJob({ ...newJob, priority: value })}
                          >
                            <SelectTrigger className="border-2 border-slate-200 focus:border-violet-500 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="low">Low Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Notes</label>
                        <Textarea
                          placeholder="Add any notes about this application..."
                          value={newJob.notes}
                          onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
                          className="border-2 border-slate-200 focus:border-violet-500 rounded-xl"
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end mt-8">
                        <Button
                          onClick={addJob}
                          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                        >
                          Add Application
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Kanban Board View */}
                {activeView === "kanban" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <div key={status} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.color }}></div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wide text-sm">{config.label}</h3>
                            <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs font-semibold">
                              {getJobsByStatus(status).length}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {getJobsByStatus(status).map((job, index) => (
                            <div
                              key={job.id}
                              className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
                              style={{
                                borderLeftColor: config.color,
                                borderLeftWidth: "4px",
                              }}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">
                                    {job.position}
                                  </h4>
                                  <p className="text-slate-600 font-medium">{job.company}</p>
                                  {job.location && (
                                    <div className="flex items-center mt-2 text-sm text-slate-500">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {job.location}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                  <div
                                    className="px-2 py-1 rounded-full text-xs font-semibold"
                                    style={{
                                      backgroundColor: priorityConfig[job.priority].bg,
                                      color: priorityConfig[job.priority].color,
                                    }}
                                  >
                                    {job.priority.toUpperCase()}
                                  </div>
                                  {job.matchScore && (
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3 text-yellow-500" />
                                      <span className="text-xs font-semibold text-slate-600">{job.matchScore}%</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-3">
                                {job.salary && (
                                  <div className="flex items-center text-sm text-slate-600">
                                    <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                                    {job.salary}
                                  </div>
                                )}

                                <div className="flex items-center text-sm text-slate-600">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Applied {new Date(job.appliedDate).toLocaleDateString()}
                                </div>

                                {job.companyRating && (
                                  <div className="flex items-center text-sm text-slate-600">
                                    <Building className="w-4 h-4 mr-2" />
                                    Rating: {job.companyRating}/5.0
                                  </div>
                                )}
                              </div>

                              {job.notes && (
                                <div className="mt-4 p-3 bg-slate-50 rounded-xl">
                                  <p className="text-sm text-slate-700">{job.notes}</p>
                                </div>
                              )}

                              {job.aiInsight && (
                                <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                                  <div className="flex items-start space-x-2">
                                    <Sparkles className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1">
                                        AI INSIGHT
                                      </p>
                                      <p className="text-sm text-slate-700">{job.aiInsight}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <Select
                                  value={job.status}
                                  onValueChange={(value: any) => updateJobStatus(job.id, value)}
                                >
                                  <SelectTrigger className="w-full border border-slate-200 rounded-lg text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="applied">Applied</SelectItem>
                                    <SelectItem value="interview">Interview</SelectItem>
                                    <SelectItem value="offer">Offer</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}

                          {getJobsByStatus(status).length === 0 && (
                            <div className="text-center py-8 text-slate-400">
                              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Briefcase className="w-6 h-6" />
                              </div>
                              <p className="text-sm">No {config.label.toLowerCase()} applications</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* List View */}
                {activeView === "list" && (
                  <div className="space-y-4">
                    {filteredJobs.map((job, index) => (
                      <div
                        key={job.id}
                        className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex-shrink-0">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                                style={{ backgroundColor: statusConfig[job.status].color }}
                              >
                                {job.company.charAt(0)}
                              </div>
                            </div>

                            <div>
                              <h3 className="font-bold text-slate-900 text-xl">{job.position}</h3>
                              <p className="text-slate-600 font-medium text-lg">{job.company}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                                {job.location && (
                                  <div className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {job.location}
                                  </div>
                                )}
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(job.appliedDate).toLocaleDateString()}
                                </div>
                                {job.salary && (
                                  <div className="flex items-center">
                                    <DollarSign className="w-3 h-3 mr-1" />
                                    {job.salary}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            {job.matchScore && (
                              <div className="text-center">
                                <div className="text-2xl font-bold text-slate-900">{job.matchScore}%</div>
                                <div className="text-xs text-slate-500">Match</div>
                              </div>
                            )}

                            <div
                              className="px-4 py-2 rounded-full font-semibold text-sm"
                              style={{
                                backgroundColor: statusConfig[job.status].bg,
                                color: statusConfig[job.status].color,
                              }}
                            >
                              {statusConfig[job.status].label}
                            </div>

                            <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-16">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center transform rotate-6 shadow-xl">
                        <Briefcase className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-slate-900" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                      {searchTerm ? "No matching applications" : "Ready to start your job search?"}
                    </h3>
                    <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                      {searchTerm
                        ? `No applications found matching "${searchTerm}"`
                        : "Add your first job application and let AI help you track your career journey!"}
                    </p>
                    {!searchTerm && (
                      <Button
                        onClick={() => setShowAddForm(true)}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
                      >
                        Add Your First Application
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>

              {/* Interview Prep Tab */}
              <TabsContent value="interview-prep" className="space-y-8 mt-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl transform rotate-1"></div>
                  <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                      <Brain className="w-7 h-7 mr-3 text-violet-600" />
                      AI-Generated Interview Questions
                    </h3>
                    <div className="space-y-6">
                      {interviewQuestions.map((question) => (
                        <div key={question.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex space-x-3">
                              <Badge
                                className="rounded-full font-semibold"
                                style={{
                                  backgroundColor: difficultyColors[question.difficulty].bg,
                                  color: difficultyColors[question.difficulty].color,
                                }}
                              >
                                {question.difficulty}
                              </Badge>
                              <Badge className="bg-violet-100 text-violet-800 rounded-full font-semibold">
                                {question.category}
                              </Badge>
                              {question.jobRole && (
                                <Badge className="bg-slate-200 text-slate-700 rounded-full font-semibold">
                                  {question.jobRole}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-slate-900 font-medium text-lg leading-relaxed">{question.question}</p>
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-violet-200 text-violet-700 hover:bg-violet-50 bg-transparent"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Practice Answer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-8">
                      <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate More Questions
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Company Research Tab */}
              <TabsContent value="company-research" className="space-y-8 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {companyInsights.map((company, index) => (
                    <div key={company.company} className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r rounded-3xl transform ${
                          index % 2 === 0
                            ? "from-emerald-100 to-cyan-100 rotate-1"
                            : "from-violet-100 to-purple-100 -rotate-1"
                        }`}
                      ></div>
                      <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-2xl font-black text-slate-900">{company.company}</h3>
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="text-lg font-bold text-slate-900">{company.glassdoorRating}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-1">Industry</p>
                            <p className="text-slate-900 font-medium">{company.industry}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-1">
                              Company Size
                            </p>
                            <p className="text-slate-900 font-medium">{company.size}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-1">Culture</p>
                            <p className="text-slate-900 font-medium">{company.culture}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">
                              Salary Range
                            </p>
                            <p className="text-slate-900 font-medium">{company.salaryRange}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">Growth Rate</p>
                            <p className="text-slate-900 font-medium">{company.growthRate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">Benefits</p>
                            <div className="flex flex-wrap gap-2">
                              {company.benefits.map((benefit) => (
                                <Badge key={benefit} className="bg-slate-100 text-slate-700 rounded-full font-medium">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <Button
                            variant="outline"
                            className="w-full rounded-xl border-2 border-slate-200 hover:border-violet-500 hover:text-violet-700 bg-transparent"
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            View Company Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Resume Analysis Tab */}
              <TabsContent value="resume-analysis" className="space-y-8 mt-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-3xl transform rotate-1"></div>
                  <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                      <FileText className="w-7 h-7 mr-3 text-violet-600" />
                      AI Resume Analysis
                    </h3>
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-slate-900">Overall Score</h4>
                          <div className="text-3xl font-black text-slate-900">85/100</div>
                        </div>
                        <Progress value={85} className="h-4 mb-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-bold text-green-700 mb-3 flex items-center">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Strengths
                            </h5>
                            <ul className="text-sm text-slate-700 space-y-2">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Strong technical skills section with relevant technologies
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Quantified achievements with specific metrics
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Relevant work experience for target roles
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold text-red-700 mb-3 flex items-center">
                              <XCircle className="w-5 h-5 mr-2" />
                              Areas for Improvement
                            </h5>
                            <ul className="text-sm text-slate-700 space-y-2">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Add more action verbs to describe accomplishments
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Include relevant certifications and courses
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                Optimize keywords for ATS systems
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">ATS Score</span>
                            <span className="text-2xl font-bold text-slate-900">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Keywords</span>
                            <span className="text-2xl font-bold text-slate-900">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Format</span>
                            <span className="text-2xl font-bold text-slate-900">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                          <Upload className="w-5 h-5 mr-2" />
                          Upload Resume for Analysis
                        </Button>
                        <Button
                          variant="outline"
                          className="px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-violet-500 bg-transparent"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download Optimized Version
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Networking Tab */}
              <TabsContent value="networking" className="space-y-8 mt-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl transform -rotate-1"></div>
                  <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                      <Users className="w-7 h-7 mr-3 text-violet-600" />
                      Professional Network
                    </h3>
                    <div className="space-y-6">
                      {networkContacts.map((contact, index) => (
                        <div key={contact.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {contact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-lg">{contact.name}</p>
                                <p className="text-slate-600 font-medium">{contact.position}</p>
                                <p className="text-slate-500 text-sm">{contact.company}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-violet-100 text-violet-800 rounded-full font-medium mb-2">
                                {contact.relationship}
                              </Badge>
                              <p className="text-xs text-slate-500">
                                Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-slate-700 mb-4">{contact.notes}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {contact.contactMethod === "LinkedIn" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                                >
                                  <Users className="w-4 h-4 mr-1" />
                                  LinkedIn
                                </Button>
                              )}
                              {contact.contactMethod === "Email" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                                >
                                  <Mail className="w-4 h-4 mr-1" />
                                  Email
                                </Button>
                              )}
                              {contact.contactMethod === "Phone" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                                >
                                  <Phone className="w-4 h-4 mr-1" />
                                  Phone
                                </Button>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-slate-200 hover:border-violet-500 bg-transparent"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Follow Up
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-8">
                      <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-8 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Success Metrics */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl transform rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                        <TrendingUp className="w-7 h-7 mr-3 text-violet-600" />
                        Success Metrics
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                              Response Rate
                            </span>
                            <span className="text-xl font-bold text-slate-900">67%</span>
                          </div>
                          <Progress value={67} className="h-3" />
                          <p className="text-xs text-slate-500 mt-1">Above industry average of 45%</p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                              Interview Rate
                            </span>
                            <span className="text-xl font-bold text-slate-900">25%</span>
                          </div>
                          <Progress value={25} className="h-3" />
                          <p className="text-xs text-slate-500 mt-1">Industry average: 20%</p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Offer Rate</span>
                            <span className="text-xl font-bold text-slate-900">25%</span>
                          </div>
                          <Progress value={25} className="h-3" />
                          <p className="text-xs text-slate-500 mt-1">Excellent conversion rate</p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                              Time to Offer
                            </span>
                            <span className="text-xl font-bold text-slate-900">14 days</span>
                          </div>
                          <Progress value={80} className="h-3" />
                          <p className="text-xs text-slate-500 mt-1">Faster than average 21 days</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application Trends */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl transform -rotate-1"></div>
                    <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                        <BarChart3 className="w-7 h-7 mr-3 text-violet-600" />
                        Application Trends
                      </h3>
                      <div className="space-y-6">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                          <h4 className="font-bold text-slate-900 mb-2">Most Active Companies</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-700">Tech Startups</span>
                              <span className="text-sm font-semibold text-slate-900">50%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-700">Enterprise</span>
                              <span className="text-sm font-semibold text-slate-900">30%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-700">Agencies</span>
                              <span className="text-sm font-semibold text-slate-900">20%</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl">
                          <h4 className="font-bold text-slate-900 mb-2">Salary Range Distribution</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-700">64L - 80L</span>
                              <span className="text-sm font-semibold text-slate-900">60%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-700">48L - 64L</span>
                              <span className="text-sm font-semibold text-slate-900">25%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-700">80L+</span>
                              <span className="text-sm font-semibold text-slate-900">15%</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
                          <div className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1">
                                AI RECOMMENDATION
                              </p>
                              <p className="text-sm text-slate-700">
                                Focus on companies in the $80K-$100K range for optimal success rate based on your
                                profile.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Goals & Progress */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl transform rotate-1"></div>
                  <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                      <Target className="w-7 h-7 mr-3 text-violet-600" />
                      Career Goals & Progress
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-900">Monthly Goal</h4>
                          <Award className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-slate-900 mb-1">4/5</div>
                          <div className="text-sm text-slate-600">Applications</div>
                          <Progress value={80} className="h-2 mt-3" />
                        </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-900">Interview Goal</h4>
                          <BookOpen className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-slate-900 mb-1">1/2</div>
                          <div className="text-sm text-slate-600">This Month</div>
                          <Progress value={50} className="h-2 mt-3" />
                        </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-900">Skill Development</h4>
                          <Settings className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-slate-900 mb-1">3/4</div>
                          <div className="text-sm text-slate-600">Courses</div>
                          <Progress value={75} className="h-2 mt-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
