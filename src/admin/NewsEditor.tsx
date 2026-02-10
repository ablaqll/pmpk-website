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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { storage, NewsItem } from "@/services/storage";
import { ImageUpload } from "@/components/ui/image-upload";

export default function NewsEditor() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<NewsItem>>({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        const data = await storage.getNews();
        setNews(data);
    };

    const handleSave = async () => {
        if (!editingItem.title || !editingItem.content || !editingItem.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            await storage.saveNewsItem(editingItem as any);
            toast.success("News item saved successfully");
            setIsOpen(false);
            setEditingItem({});
            loadNews();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save news item");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            await storage.deleteNewsItem(id);
            toast.success("News item deleted");
            loadNews();
        }
    };

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">News & Events</h2>
                <Button onClick={() => { setEditingItem({ category: 'news', published: true }); setIsOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Add News
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search news..."
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
                            <TableHead>Category</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredNews.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No news items found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredNews.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="capitalize">{item.category?.replace('_', ' ')}</TableCell>
                                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {item.published ? 'Published' : 'Draft'}
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
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingItem.id ? 'Edit News' : 'Create News'}</DialogTitle>
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
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={editingItem.category}
                                onValueChange={(val: any) => setEditingItem({ ...editingItem, category: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="news">News</SelectItem>
                                    <SelectItem value="press_release">Press Release</SelectItem>
                                    <SelectItem value="announcement">Announcement</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Image</Label>
                            <ImageUpload
                                value={editingItem.imageUrl}
                                onChange={(url) => setEditingItem({ ...editingItem, imageUrl: url })}
                                onRemove={() => setEditingItem({ ...editingItem, imageUrl: '' })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content *</Label>
                            <Textarea
                                id="content"
                                className="min-h-[200px]"
                                value={editingItem.content || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
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
