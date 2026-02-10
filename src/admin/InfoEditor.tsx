import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { storage, GeneralInfo } from "@/services/storage";
import { ImageUpload } from "@/components/ui/image-upload";

export default function InfoEditor() {
    const [info, setInfo] = useState<GeneralInfo | null>(null);

    useEffect(() => {
        const loadInfo = async () => {
            const data = await storage.getGeneralInfo();
            setInfo(data);
        };
        loadInfo();
    }, []);

    const handleSave = async () => {
        if (info) {
            await storage.saveGeneralInfo(info);
            toast.success("General information updated");
        }
    };

    const handleExport = async () => {
        const data = await storage.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pmpk-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Backup downloaded");
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target?.result as string;
                if (await storage.importData(content)) {
                    toast.success("Data imported successfully. Reloading...");
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    toast.error("Failed to import data");
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    if (!info) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">General Information</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleImport}>Import Backup</Button>
                    <Button variant="secondary" onClick={handleExport}>Download Backup</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Director's Block */}
                <Card>
                    <CardHeader>
                        <CardTitle>Director's Block</CardTitle>
                        <CardDescription>Information shown on the home page sidebar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Director's Name</Label>
                            <Input
                                value={info.directorName}
                                onChange={(e) => setInfo({ ...info, directorName: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Bio / Description</Label>
                            <Textarea
                                value={info.directorBio}
                                onChange={(e) => setInfo({ ...info, directorBio: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Photo</Label>
                            <ImageUpload
                                value={info.directorPhoto}
                                onChange={(url) => setInfo({ ...info, directorPhoto: url })}
                                onRemove={() => setInfo({ ...info, directorPhoto: null })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Shown in footer and contacts page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input
                                value={info.address}
                                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input
                                value={info.phone}
                                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input
                                value={info.email}
                                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>WhatsApp (clean number)</Label>
                            <Input
                                value={info.whatsapp || ''}
                                onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Schedule</Label>
                            <Input
                                value={info.schedule || ''}
                                onChange={(e) => setInfo({ ...info, schedule: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
