import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, FileText, Newspaper, BookMarked } from "lucide-react";

export default function Publications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Издание
          </h1>
          <p className="text-muted-foreground mt-1">
            Школьные газеты, журналы, сборники и методические материалы
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить публикацию
        </Button>
      </div>

      {/* Publication Categories */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-5 w-5 text-blue-600" />
              Школьные газеты
            </CardTitle>
            <CardDescription>
              Ежемесячные выпуски школьной газеты
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить выпуск
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookMarked className="h-5 w-5 text-green-600" />
              Журналы и сборники
            </CardTitle>
            <CardDescription>
              Методические сборники и журналы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить издание
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5 text-purple-600" />
              Электронные публикации
            </CardTitle>
            <CardDescription>
              Статьи и методические материалы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить статью
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Publications */}
      <Card>
        <CardHeader>
          <CardTitle>Последние публикации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium mb-2">Публикации не найдены</h3>
            <p className="text-muted-foreground mb-6">
              Начните добавлять школьные издания и методические материалы
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Создать первую публикацию
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">💡 Типы публикаций</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Школьные газеты</strong>: PDF-файлы выпусков, дата издания</li>
            <li>• <strong>Журналы</strong>: Методические журналы, научные сборники</li>
            <li>• <strong>Методические материалы</strong>: Учебные пособия, рекомендации</li>
            <li>• <strong>Электронные статьи</strong>: Статьи педагогов, исследования</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
