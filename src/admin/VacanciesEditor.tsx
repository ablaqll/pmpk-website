
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { storage, Vacancy } from "@/services/storage";

export default function VacanciesEditor() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<Vacancy>>({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadVacancies();
    }, []);

    const loadVacancies = async () => {
        const data = await storage.getVacancies();
        setVacancies(data);
    };

    const handleSave = async () => {
        if (!editingItem.title) {
            toast.error("Please fill in the title");
            return;
        }

        try {
            await storage.saveVacancy(editingItem as any);
            toast.success("Vacancy saved successfully");
            setIsOpen(false);
            setEditingItem({});
            loadVacancies();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save vacancy");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this vacancy?")) {
            await storage.deleteVacancy(id);
            toast.success("Vacancy deleted");
            loadVacancies();
        }
    };

    const filteredVacancies = vacancies.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Vacancies</h2>
                <Button onClick={() => { setEditingItem({ published: true }); setIsOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Add Vacancy
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search vacancies..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredVacancies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No vacancies found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredVacancies.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {item.published ? 'Active' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => { setEditingItem(item); setIsOpen(true); }}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingItem.id ? 'Edit Vacancy' : 'Create Vacancy'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={editingItem.title || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                id="salary"
                                placeholder="e.g. 200 000 KZT"
                                value={editingItem.salary || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, salary: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="requirements">Requirements (one per line)</Label>
                            <Textarea
                                id="requirements"
                                className="min-h-[150px]"
                                value={editingItem.requirements || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, requirements: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Switch
                                id="published"
                                checked={editingItem.published}
                                onCheckedChange={(checked) => setEditingItem({ ...editingItem, published: checked })}
                            />
                            <Label htmlFor="published">Published</Label>
                        </div>

                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
