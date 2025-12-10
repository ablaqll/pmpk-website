import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Save, Image as ImageIcon, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AboutPmpk() {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    directorName: 'Иванова Мария Ивановна',
    directorBio: 'Педагог-психолог высшей категории, стаж работы 20 лет.',
    directorPhoto: '',
    organizationDescription: 'Психолого-медико-педагогическая консультация оказывает комплексную помощь детям с особыми образовательными потребностями и их семьям.',
    mission: '',
    values: '',
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Implement API call to save organization info
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Информация сохранена");
    } catch (error) {
      toast.error("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            О ПМПК
          </h1>
          <p className="text-muted-foreground mt-1">
            Управление информацией об организации
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>

      {/* Director Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Информация о руководителе
          </CardTitle>
          <CardDescription>
            Информация о директоре отображается на главной странице сайта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="directorName">ФИО руководителя</Label>
            <Input
              id="directorName"
              value={formData.directorName}
              onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
              placeholder="Иванова Мария Ивановна"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="directorBio">Биография / Должность</Label>
            <Textarea
              id="directorBio"
              value={formData.directorBio}
              onChange={(e) => setFormData({ ...formData, directorBio: e.target.value })}
              placeholder="Педагог-психолог высшей категории..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="directorPhoto">Фото руководителя (URL)</Label>
            <div className="flex gap-2">
              <Input
                id="directorPhoto"
                value={formData.directorPhoto}
                onChange={(e) => setFormData({ ...formData, directorPhoto: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
              <Button variant="outline" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Рекомендуемый размер: 400x400px
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Organization Description */}
      <Card>
        <CardHeader>
          <CardTitle>Описание организации</CardTitle>
          <CardDescription>
            Краткое описание ПМПК для главной страницы
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.organizationDescription}
              onChange={(e) => setFormData({ ...formData, organizationDescription: e.target.value })}
              placeholder="Описание организации..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mission & Values */}
      <Card>
        <CardHeader>
          <CardTitle>Миссия и ценности</CardTitle>
          <CardDescription>
            Отображается на странице "О нас"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mission">Миссия</Label>
            <Textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              placeholder="Наша миссия..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="values">Ценности</Label>
            <Textarea
              id="values"
              value={formData.values}
              onChange={(e) => setFormData({ ...formData, values: e.target.value })}
              placeholder="Наши ценности..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
