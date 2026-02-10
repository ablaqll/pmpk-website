
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
import { storage, FaqItem } from "@/services/storage";

export default function FaqEditor() {
    const [faq, setFaq] = useState<FaqItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<FaqItem>>({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadFaq();
    }, []);

    const loadFaq = async () => {
        const data = await storage.getFaq();
        setFaq(data);
    };

    const handleSave = async () => {
        if (!editingItem.question || !editingItem.answer) {
            toast.error("Please fill in question and answer");
            return;
        }

        try {
            await storage.saveFaq(editingItem as any);
            toast.success("FAQ saved successfully");
            setIsOpen(false);
            setEditingItem({});
            loadFaq();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save FAQ");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            await storage.deleteFaq(id);
            toast.success("FAQ deleted");
            loadFaq();
        }
    };

    const filteredFaq = faq.filter(item =>
        item.question.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
                <Button onClick={() => { setEditingItem({ published: true }); setIsOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Add FAQ
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search FAQ..."
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
                            <TableHead>Question</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredFaq.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No FAQ items found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredFaq.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.question}</TableCell>
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
                        <DialogTitle>{editingItem.id ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="question">Question *</Label>
                            <Input
                                id="question"
                                value={editingItem.question || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="answer">Answer *</Label>
                            <Textarea
                                id="answer"
                                className="min-h-[150px]"
                                value={editingItem.answer || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
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
