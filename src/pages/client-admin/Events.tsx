import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Video, Users, Trophy } from "lucide-react";

export default function Events() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Мероприятия
          </h1>
          <p className="text-muted-foreground mt-1">
            Конференции, семинары и челленджи
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Добавить мероприятие
        </Button>
      </div>

      {/* Event Categories */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-5 w-5 text-blue-600" />
              Конференции
            </CardTitle>
            <CardDescription>
              Научные, образовательные и методические конференции
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить конференцию
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Video className="h-5 w-5 text-green-600" />
              Семинары
            </CardTitle>
            <CardDescription>
              Педагогические семинары для учителей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить семинар
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-5 w-5 text-orange-600" />
              Челленджи
            </CardTitle>
            <CardDescription>
              Интерактивные задания и конкурсы для учеников
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить челлендж
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Предстоящие мероприятия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium mb-2">Мероприятия не найдены</h3>
            <p className="text-muted-foreground mb-6">
              Начните добавлять конференции, семинары и челленджи
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Создать первое мероприятие
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">💡 Типы мероприятий</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Конференции</strong>: Программа, участники, темы докладов</li>
            <li>• <strong>Семинары</strong>: Программа семинара для педагогов</li>
            <li>• <strong>Челленджи</strong>: Описание условий участия, фото и видеоотчёты, победители</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}



