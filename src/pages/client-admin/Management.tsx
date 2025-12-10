import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, DollarSign, Shield, Save, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Management() {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    budgetUrl: '',
    budgetYear: new Date().getFullYear().toString(),
    procurementLink: 'https://goszakup.gov.kz',
    corruptionInfo: '',
    trustPhone: '',
    servicesDescription: '',
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
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
            <Building className="h-8 w-8" />
            Государственное управление
          </h1>
          <p className="text-muted-foreground mt-1">
            Информация о бюджете, закупках и противодействии коррупции
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>

      {/* Budget Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Бюджет
          </CardTitle>
          <CardDescription>
            Годовой бюджетный план и отчеты
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetYear">Бюджетный год</Label>
              <Input
                id="budgetYear"
                value={formData.budgetYear}
                onChange={(e) => setFormData({ ...formData, budgetYear: e.target.value })}
                placeholder="2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetUrl">Ссылка на бюджет (документ или страница)</Label>
              <Input
                id="budgetUrl"
                value={formData.budgetUrl}
                onChange={(e) => setFormData({ ...formData, budgetUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State Procurement */}
      <Card>
        <CardHeader>
          <CardTitle>Государственные закупки</CardTitle>
          <CardDescription>
            Информация о тендерах и госзакупках
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="procurementLink">Ссылка на портал Goszakup</Label>
            <div className="flex gap-2">
              <Input
                id="procurementLink"
                value={formData.procurementLink}
                onChange={(e) => setFormData({ ...formData, procurementLink: e.target.value })}
                placeholder="https://goszakup.gov.kz"
              />
              <Button variant="outline" size="icon" asChild>
                <a href={formData.procurementLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anti-Corruption */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Противодействие коррупции
          </CardTitle>
          <CardDescription>
            Кодекс этики, телефон доверия и антикоррупционные меры
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trustPhone">Телефон доверия</Label>
            <Input
              id="trustPhone"
              value={formData.trustPhone}
              onChange={(e) => setFormData({ ...formData, trustPhone: e.target.value })}
              placeholder="+7 777 123 45 67"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="corruptionInfo">Информация о противодействии коррупции</Label>
            <Textarea
              id="corruptionInfo"
              value={formData.corruptionInfo}
              onChange={(e) => setFormData({ ...formData, corruptionInfo: e.target.value })}
              placeholder="Описание антикоррупционных мер..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* State Services */}
      <Card>
        <CardHeader>
          <CardTitle>Государственные услуги</CardTitle>
          <CardDescription>
            Правила приема и перечень документов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="servicesDescription">Описание услуг</Label>
            <Textarea
              id="servicesDescription"
              value={formData.servicesDescription}
              onChange={(e) => setFormData({ ...formData, servicesDescription: e.target.value })}
              placeholder="Описание государственных услуг..."
              rows={4}
            />
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 Подсказка: Добавьте информацию о порядке предоставления услуг, необходимых документах и сроках
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
