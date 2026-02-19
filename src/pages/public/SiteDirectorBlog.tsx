import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Quote } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteDirectorBlog() {
    const { t } = useLanguage();

    const director = {
        name: 'Байболова Айнур Сайранбекқызы',
        role: t('about.director'),
        photo: '/director.jpg',
        bio: 'Педагог-психолог высшей категории, стаж работы 20 лет.'
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Hero Section */}
            <section className="bg-gov-primary text-white py-12 mb-8">
                <div className="container">
                    <div className="flex items-center gap-4 mb-6">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-0 h-auto">
                                <ChevronLeft className="h-5 w-5 mr-1" />
                                {t('home.welcome')}
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold">
                        {t('about.directorBlogTitle')}
                    </h1>
                </div>
            </section>

            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <Card className="border-0 shadow-lg overflow-hidden">
                        <div className="grid md:grid-cols-3 gap-0">
                            {/* Sidebar with Photo */}
                            <div className="bg-muted/30 p-8 flex flex-col items-center text-center border-r">
                                <div className="relative mb-6">
                                    <div className="h-48 w-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                        <img
                                            src={director.photo}
                                            alt={director.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60';
                                            }}
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 bg-gov-primary text-white p-2 rounded-lg shadow-lg">
                                        <Quote className="h-5 w-5 fill-current" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gov-primary mb-1">
                                    {director.name}
                                </h2>
                                <p className="text-sm font-medium text-muted-foreground mb-4">
                                    {director.role}
                                </p>
                                <div className="w-full pt-4 border-t border-muted-foreground/10">
                                    <p className="text-sm italic text-muted-foreground">
                                        {director.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="md:col-span-2 p-8 lg:p-12 bg-white">
                                <div className="prose prose-blue max-w-none">
                                    <div className="flex items-center gap-2 mb-6 text-gov-primary/30">
                                        <Quote className="h-8 w-8 rotate-180" />
                                    </div>

                                    {t('about.directorBlogContent').split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6 last:mb-0">
                                            {paragraph}
                                        </p>
                                    ))}

                                    <div className="flex items-center gap-2 mt-8 text-gov-primary/30 justify-end">
                                        <Quote className="h-8 w-8" />
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t flex justify-between items-center">
                                    <Link href="/">
                                        <Button variant="outline">
                                            {t('home.welcome')}
                                        </Button>
                                    </Link>
                                    <Link href="/about">
                                        <Button variant="ghost">
                                            {t('nav.about')}
                                            <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
