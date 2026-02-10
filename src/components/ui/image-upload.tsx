
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Loader2 } from "lucide-react";
import { storage } from "@/services/storage";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string | null;
    onChange: (url: string) => void;
    onRemove?: () => void;
    className?: string;
}

export function ImageUpload({ value, onChange, onRemove, className }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await storage.uploadImage(file);
            if (url) {
                onChange(url);
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Failed to upload image");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error uploading image");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative aspect-video h-40 w-40 overflow-hidden rounded-md border bg-muted">
                        <img
                            src={value}
                            alt="Upload"
                            className="h-full w-full object-cover"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2 h-6 w-6"
                            onClick={() => onRemove ? onRemove() : onChange('')}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div
                        className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="mb-2 h-6 w-6 text-gray-400" />
                        <span className="text-xs text-gray-500">Click to upload</span>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleUpload}
                    />
                    {!value && (
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Image
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
            {value && (
                <div className="flex gap-2">
                    <Input
                        value={value}
                        readOnly
                        className="text-xs text-muted-foreground bg-gray-50"
                    />
                </div>
            )}
        </div>
    );
}
