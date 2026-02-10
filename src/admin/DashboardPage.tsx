
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Users, Building2 } from "lucide-react";
import { storage } from "@/services/storage";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        newsCount: 0,
        staffCount: 0,
        directorName: ''
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const news = await storage.getNews();
                const staff = await storage.getStaff();
                const info = await storage.getGeneralInfo();
                setStats({
                    newsCount: news.length,
                    staffCount: staff.length,
                    directorName: info.directorName
                });
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            }
        };
        loadStats();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total News</CardTitle>
                        <Newspaper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.newsCount}</div>
                        <p className="text-xs text-muted-foreground">Articles published</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.staffCount}</div>
                        <p className="text-xs text-muted-foreground">Active members</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Director</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold truncate">{stats.directorName}</div>
                        <p className="text-xs text-muted-foreground">Current Head</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            Select a module from the sidebar to start editing content.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
