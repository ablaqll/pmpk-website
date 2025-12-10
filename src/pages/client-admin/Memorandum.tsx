import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSignature, Plus, Building, Calendar } from "lucide-react";

export default function Memorandum() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileSignature className="h-8 w-8" />
            Меморандум
          </h1>
          <p className="text-muted-foreground mt-1">
            Официальные соглашения о сотрудничестве с другими организациями
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить меморандум
        </Button>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="py-16 text-center">
          <FileSignature className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-medium mb-2">Меморандумы не найдены</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Добавьте информацию о соглашениях о сотрудничестве с другими образовательными организациями
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Создать первый меморандум
          </Button>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base">💡 Что включить в меморандум?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Building className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Партнерские организации</strong>: Название, логотип, контакты</span>
            </li>
            <li className="flex items-start gap-2">
              <FileSignature className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Цели и направления</strong>: Области сотрудничества</span>
            </li>
            <li className="flex items-start gap-2">
              <Users className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Участники и подписанты</strong>: Ответственные лица</span>
            </li>
            <li className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Итоги</strong>: Результаты совместных мероприятий</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


