import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Plus, FileText, CheckCircle2, Clock } from "lucide-react";

export default function Attestation() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Award className="h-8 w-8" />
            Аттестация
          </h1>
          <p className="text-muted-foreground mt-1">
            Документация, результаты и протоколы аттестации
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить документ аттестации
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Завершено</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">В процессе</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Документов</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <p className="text-2xl font-bold">2024</p>
              <p className="text-sm text-muted-foreground">Текущий год</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attestation Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Документы аттестации</CardTitle>
          <CardDescription>
            Протоколы, результаты и заключения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Award className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium mb-2">Документы не найдены</h3>
            <p className="text-muted-foreground mb-6">
              Загрузите документацию, результаты и протоколы аттестации
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Загрузить документ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">📋 Документы для аттестации</h3>
          <ul className="space-y-2 text-sm">
            <li>• Протоколы аттестационной комиссии</li>
            <li>• Результаты аттестации педагогических работников</li>
            <li>• Заключения и рекомендации</li>
            <li>• Отчеты о проведении аттестации</li>
            <li>• Нормативные документы по аттестации</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}



