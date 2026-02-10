
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Newspaper,
    Users,
    Settings,
    LogOut,
    Building2,
    FileText,
    Briefcase,
    MessageSquare
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [location, setLocation] = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) {
            setLocation('/admin/login');
        }
    }, [location, setLocation]);

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        setLocation('/admin/login');
    };

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'News & Events', href: '/admin/news', icon: Newspaper },
        { label: 'Staff & Structure', href: '/admin/staff', icon: Users },
        { label: 'Vacancies', href: '/admin/vacancies', icon: Briefcase },
        { label: 'FAQ & Feedback', href: '/admin/faq', icon: MessageSquare },
        { label: 'General Info', href: '/admin/info', icon: Building2 },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className={`bg-slate-900 text-white w-64 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? '' : '-ml-64'}`}>
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <h1 className="font-bold text-xl">PMPK Admin</h1>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-64 p-4 border-t border-slate-800">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white border-b h-16 flex items-center px-6 justify-between">
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <LayoutDashboard className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Welcome, Admin</span>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-5xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
            <Toaster />
        </div>
    );
}
