import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { storage, StaffMember } from "@/services/storage";
import { ImageUpload } from "@/components/ui/image-upload";

export default function StaffEditor() {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<StaffMember>>({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = async () => {
        const data = await storage.getStaff();
        setStaff(data);
    };

    const handleSave = async () => {
        if (!editingItem.name || !editingItem.position || !editingItem.department) {
            toast.error("Please fill in all required fields (Name, Position, Department)");
            return;
        }

        try {
            await storage.saveStaffMember(editingItem as any);
            toast.success("Staff member saved successfully");
            setIsOpen(false);
            setEditingItem({});
            loadStaff();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save staff member");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this member?")) {
            await storage.deleteStaffMember(id);
            toast.success("Staff member deleted");
            loadStaff();
        }
    };

    const filteredStaff = staff.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.position.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Staff & Structure</h2>
                <Button onClick={() => { setEditingItem({ department: 'Specialists' }); setIsOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search staff..."
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
                            <TableHead>Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStaff.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No staff members found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredStaff.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                                                {item.photoUrl && <img src={item.photoUrl} alt="" className="h-full w-full object-cover" />}
                                            </div>
                                            {item.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.position}</TableCell>
                                    <TableCell>{item.department}</TableCell>
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
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingItem.id ? 'Edit Member' : 'Add Member'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={editingItem.name || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="position">Position *</Label>
                            <Input
                                id="position"
                                value={editingItem.position || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                                id="department"
                                placeholder="e.g. Specialists, Administration"
                                value={editingItem.department || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Photo</Label>
                            <ImageUpload
                                value={editingItem.photoUrl}
                                onChange={(url) => setEditingItem({ ...editingItem, photoUrl: url })}
                                onRemove={() => setEditingItem({ ...editingItem, photoUrl: '' })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={editingItem.email || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={editingItem.phone || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                                />
                            </div>
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
