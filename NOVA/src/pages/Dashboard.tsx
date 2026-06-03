import React, { useState, useEffect } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import {
  CalendarCheck,
  GitBranch,
  Star,
  Medal,
  ArrowRight,
  TrendingUp,
  Clock,
  User,
  Bell,
  Lock,
  Shield,
  ExternalLink,
  Code,
  Terminal,
  Cpu,
  Trophy,
  MessageSquareText,
  X,
  Activity
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import MvsrChatbot from '../components/MvsrChatbot'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// --- HELPER UI COMPONENTS FOR GAMIFIED DASHBOARD ---

const TimelineCard = ({ tag, title, desc, date, status }: any) => {
  const statusColors = {
    active: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
    completed: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
    pending: 'border-amber-500/50 bg-amber-500/10 text-amber-400'
  }
  
  const currentStatus = statusColors[status as keyof typeof statusColors] || statusColors.pending;

  return (
    <div className="min-w-[280px] w-[280px] shrink-0 snap-start h-full flex flex-col justify-between p-5 bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors rounded-xl shadow-lg shadow-black/20">
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded border uppercase", currentStatus)}>
            {tag}
          </span>
          <span className="text-xs text-slate-500 font-mono">{date}</span>
        </div>
        <h3 className="font-semibold text-slate-100 text-base mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{desc}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center text-xs text-slate-500 group cursor-pointer hover:text-emerald-400 transition-colors">
        <span className="font-mono">VIEW_DETAILS</span>
        <ArrowRight className="size-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}

const ModuleCard = ({ icon, label, value, glow }: any) => {
  const glowMap = {
    emerald: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-400 bg-emerald-500/10',
    indigo: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] text-indigo-400 bg-indigo-500/10',
    amber: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] text-amber-400 bg-amber-500/10',
    pink: 'group-hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] text-pink-400 bg-pink-500/10',
  }
  
  const currentGlow = glowMap[glow as keyof typeof glowMap];

  return (
    <div className={cn("p-4 bg-slate-900 border border-slate-800 rounded-xl transition-all duration-300 group hover:bg-slate-800/80 cursor-default", currentGlow.split(' ')[0])}>
      <div className="flex items-center justify-between mb-3">
        <div className={cn("p-2 rounded-lg", currentGlow.split(' ').slice(1).join(' '))}>
          {React.cloneElement(icon, { className: "size-5" })}
        </div>
        <Activity className="size-4 text-slate-700 opacity-50" />
      </div>
      <p className="text-2xl font-bold text-slate-100 font-mono tracking-tight mb-1">{value}</p>
      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{label}</p>
    </div>
  )
}

const BadgeIcon = ({ active, icon, color, bg, border, tooltip }: any) => (
  <div className="group relative flex flex-col items-center">
    <div className={cn(
      "p-3 rounded-xl border transition-all duration-300",
      active ? `${bg} ${border} shadow-[0_0_15px_rgba(0,0,0,0.5)]` : "bg-slate-900/50 border-dashed border-slate-800 grayscale opacity-50",
      active ? "hover:scale-105 cursor-help" : ""
    )}>
      {React.cloneElement(icon, { className: cn("size-6", active ? color : "text-slate-600") })}
    </div>
    
    {/* Tooltip */}
    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform origin-bottom bg-slate-800 text-slate-200 text-xs py-1 px-2 rounded font-mono whitespace-nowrap z-10 shadow-xl border border-slate-700 pointer-events-none">
      {tooltip}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
    </div>
  </div>
)


// --- MAIN DASHBOARD COMPONENT ---

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [activeSection, setActiveSection] = useState('overview')
  const [userPoints, setUserPoints] = useState<number>(450) // Default for gamification demonstration
  const [userRole, setUserRole] = useState<string>('student')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDark, setIsDark] = useState<boolean>(true) // Force dark mode for hacker theme by default

  // Apply dark class to html element
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    localStorage.setItem('nova-dashboard-theme', 'dark')
  }, [])

  const toggleTheme = () => setIsDark(true) // Locked to dark for this aesthetic
  const toggleCollapse = () => setIsCollapsed((prev) => !prev)
  const sidebarWidth = isCollapsed ? '68px' : '260px'

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', sidebarWidth)
    return () => document.documentElement.style.removeProperty('--sidebar-width')
  }, [sidebarWidth])

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      try {
        const token = await getToken()
        if (!token) return
        const response = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        const data = await response.json()
        if (data.success && data.user) {
          if (data.user.points !== undefined) setUserPoints(data.user.points)
          setUserRole(data.user.role ?? 'student')
        }
      } catch {
        // Backend offline — use defaults
      }
    }
    fetchProfile()
  }, [user, getToken])

  const displayName = user?.fullName || user?.username || 'GUEST_USER'
  const initials = displayName.substring(0, 2).toUpperCase()
  const profileImage = user?.imageUrl

  const sectionHeader = (title: string, desc: string) => (
    <div className="mb-7">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-100 m-0 tracking-tight font-mono uppercase">
        {title}
      </h1>
      <p className="text-sm text-slate-400 mt-1.5 m-0 font-mono">{desc}</p>
    </div>
  )

  const emptyState = (icon: React.ReactNode, title: string, desc: string) => (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-slate-900 border border-slate-800 rounded-2xl border-dashed">
      <div className="text-slate-700 mb-5">{icon}</div>
      <h3 className="text-base font-semibold text-slate-300 font-mono m-0 mb-2 uppercase">
        {title}
      </h3>
      <p className="text-sm text-slate-500 m-0 max-w-xs leading-relaxed font-mono">
        {desc}
      </p>
    </div>
  )

  // --- OVERVIEW SECTION (GAMIFIED) ---

  const OverviewSection = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-[dashFadeIn_0.35s_ease]">
      {/* Central Feed - Left 2 Columns */}
      <div className="xl:col-span-2 space-y-10">
        
        {/* Hacker Greeting */}
        <div className="mb-2 border-b border-slate-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 m-0 tracking-tight font-mono">
            SYS_INIT: <span className="text-emerald-400">{displayName}</span>
          </h1>
          <p className="text-sm text-slate-500 m-0 mt-2 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SECURE_CONNECTION_ESTABLISHED // WORKSPACE_ONLINE
          </p>
        </div>
        
        {/* Notion-style Activity Board */}
        <div>
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-sm font-mono font-bold text-slate-300 tracking-wider flex items-center gap-2 uppercase">
                <Terminal className="size-4 text-emerald-400" />
                Activity_Stream
             </h2>
           </div>
           
           <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 space-x-5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-slate-900/50 [&::-webkit-scrollbar-thumb]:bg-slate-700/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50 transition-colors">
              <TimelineCard 
                 tag="NEW EVENT" 
                 title="Agentathon 2025" 
                 desc="Registration is now open for the ultimate AI Agent hackathon. Form your team and build the future." 
                 date="Today, 09:00 AM" 
                 status="active"
              />
              <TimelineCard 
                 tag="SYSTEM" 
                 title="Platform Update v2.1" 
                 desc="New gamified dashboard and MvsrChatbot AI integration released to all students." 
                 date="Yesterday, 14:30 PM" 
                 status="completed"
              />
              <TimelineCard 
                 tag="MILESTONE" 
                 title="Sprint 4 Kickoff" 
                 desc="Join the community call in the NOVA discord to discuss next sprint targets." 
                 date="Upcoming" 
                 status="pending"
              />
              {/* Empty placeholder to ensure no blank spaces */}
              <div className="min-w-[280px] shrink-0 snap-start h-full min-h-[180px] flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl bg-slate-900/20 text-slate-600 font-mono text-sm gap-2">
                <Clock className="size-5 opacity-50" />
                AWAITING_DATA...
              </div>
           </div>
        </div>

        {/* Active Modules Track */}
        <div>
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-sm font-mono font-bold text-slate-300 tracking-wider flex items-center gap-2 uppercase">
                <Cpu className="size-4 text-purple-400" />
                Active_Modules
             </h2>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <ModuleCard icon={<CalendarCheck />} label="EVENTS" value="02" glow="emerald" />
               <ModuleCard icon={<GitBranch />} label="OPEN_PRs" value="05" glow="indigo" />
               <ModuleCard icon={<Star />} label="TOTAL_XP" value={userPoints.toString()} glow="amber" />
               <ModuleCard icon={<Medal />} label="RANKING" value="#42" glow="pink" />
           </div>
        </div>
        
        {/* Quick Links Footer style */}
        <div className="pt-6 border-t border-slate-800">
           <div className="flex flex-wrap gap-3">
              <a href="/events" className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors flex items-center gap-2">
                 <CalendarCheck className="size-3" /> BROWSE_EVENTS
              </a>
              <a href="/sprints" className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 hover:text-purple-400 hover:border-purple-500/50 transition-colors flex items-center gap-2">
                 <GitBranch className="size-3" /> VIEW_SPRINTS
              </a>
           </div>
        </div>
      </div>

      {/* Gamified Profile - Right 1 Column */}
      <div className="xl:col-span-1 space-y-6">
         
         {/* Profile Widget */}
         <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-900/50 overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative bg-slate-950 p-6 rounded-2xl border border-slate-800/50 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                     <div className="relative">
                        <Avatar className="size-14 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-slate-900">
                          {profileImage ? (
                            <AvatarImage src={profileImage} alt={displayName} />
                          ) : (
                            <AvatarFallback className="bg-slate-900 text-emerald-400 font-mono font-bold text-lg">
                              {initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 size-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
                     </div>
                     <div>
                        <h3 className="font-mono font-bold text-slate-100 tracking-tight line-clamp-1">{displayName}</h3>
                        <p className="font-mono text-[10px] text-emerald-400 mt-0.5 tracking-wider">LVL 1 DEVELOPER</p>
                     </div>
                  </div>
               </div>

               {/* XP Bar */}
               <div className="space-y-2 mt-8">
                  <div className="flex justify-between font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                     <span className="text-emerald-400 font-bold">{userPoints} XP</span>
                     <span>1000 XP (LVL 2)</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((userPoints / 1000) * 100, 100)}%` }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative"
                     >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[pulse_2s_infinite]" />
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>

         {/* Reward Shelf */}
         <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h3 className="font-mono font-semibold text-slate-300 text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
               <Trophy className="size-4 text-amber-500" />
               Badge_Shelf
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-3 gap-4">
               <BadgeIcon active icon={<Code />} color="text-emerald-400" bg="bg-emerald-500/10" border="border-emerald-500/30" tooltip="Agentathon 2025" />
               <BadgeIcon active icon={<GitBranch />} color="text-purple-400" bg="bg-purple-500/10" border="border-purple-500/30" tooltip="First PR Merged" />
               <BadgeIcon active={false} icon={<Star />} tooltip="Samvarthan 2026" />
               <BadgeIcon active={false} icon={<Cpu />} tooltip="Hardware Sprint" />
               <BadgeIcon active={false} icon={<Terminal />} tooltip="CLI Master" />
               {/* Empty Placeholder slots to fill the shelf visually */}
               <div className="aspect-square rounded-xl border border-dashed border-slate-800/50 bg-slate-900/20" />
            </div>
         </div>

         {/* Local Terminal Hint */}
         <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl text-xs font-mono text-slate-500 leading-relaxed">
            <span className="text-emerald-500/70 mr-2">&gt;</span>
            Use the chat terminal on the bottom right to interface directly with the MVSR AI knowledge matrix.
         </div>

      </div>
    </div>
  )

  // --- OTHER SECTIONS (Maintained for routing, restyled for dark mode) ---

  const ProfileSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('Sys_Config: Profile', 'Manage local user parameters')}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="border-slate-800 bg-slate-950 lg:col-span-2">
          <CardHeader className="pb-3 px-6 pt-6 border-b border-slate-900 mb-4">
            <CardTitle className="text-sm font-mono font-semibold text-slate-300 flex items-center gap-2 uppercase">
              <User className="size-4 text-slate-500" /> Core_Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0">
            <div className="space-y-1">
              <InfoRow label="NAME" value={user?.fullName || 'NULL'} />
              <InfoRow label="EMAIL" value={user?.emailAddresses?.[0]?.emailAddress || 'NULL'} />
              <InfoRow label="USERNAME" value={user?.username || 'NULL'} />
              <InfoRow label="PRIVILEGE" value={userRole === 'admin' ? 'ROOT' : 'USER'} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const EventsSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('Event_Log', "Registered global subroutines")}
      {emptyState(
        <CalendarCheck className="size-10" />,
        'NO_EVENTS_FOUND',
        "Query returned 0 results. Browse the global event registry to attach."
      )}
    </div>
  )

  const SubmissionsSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('Commit_History', 'Committed projects and hacks')}
      {emptyState(
        <GitBranch className="size-10" />,
        'NO_COMMITS_YET',
        'Repository empty. Awaiting first submission payload.'
      )}
    </div>
  )

  const SettingsSection = () => (
    <div className="animate-[dashFadeIn_0.35s_ease]">
      {sectionHeader('Security & Prefs', 'System configuration tuning')}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="border-slate-800 bg-slate-950">
          <CardHeader className="pb-3 px-6 pt-6 border-b border-slate-900 mb-4">
            <CardTitle className="text-sm font-mono font-semibold text-slate-300 flex items-center gap-2 uppercase">
              <Shield className="size-4 text-slate-500" /> Auth_Gateway
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0 font-mono text-sm text-slate-500">
            Authentication is handled via external Clerk provider. Local modifications disabled.
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection />
      case 'profile': return <ProfileSection />
      case 'events': return <EventsSection />
      case 'submissions': return <SubmissionsSection />
      case 'settings': return <SettingsSection />
      default: return null
    }
  }

  function InfoRow({ label, value }: { label: string; value: string }) {
    return (
      <div className="flex items-center gap-3 py-3 border-b border-slate-800/50 last:border-0">
        <span className="text-xs font-mono text-slate-500 min-w-[120px] shrink-0 uppercase tracking-widest">{label}</span>
        <span className="text-sm font-mono text-slate-300 font-medium">{value}</span>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-sm font-mono">
        <Terminal className="size-5 mr-3 text-emerald-500 animate-pulse" />
        BOOTING_WORKSPACE...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-300 selection:bg-emerald-500/30 font-sans">
      
      {/* Existing Sidebar - forced into dark theme implicitly by wrapping background */}
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userRole={userRole}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      
      <main className={cn(
        'flex-1 min-h-screen transition-all duration-300 pt-20 md:pt-24 bg-slate-950',
        isCollapsed ? 'md:ml-[68px]' : 'md:ml-[260px]'
      )}>
        <div className="max-w-7xl px-5 py-8 md:px-8 md:py-10 mx-auto">
          {renderSection()}
        </div>
      </main>

    </div>
  )
}

export default Dashboard
