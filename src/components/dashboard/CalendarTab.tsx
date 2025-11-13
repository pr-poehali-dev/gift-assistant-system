import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";

interface Event {
  id: string;
  title: string;
  date: Date;
  recipient: string;
  category: string;
  giftSelected?: string;
  status: "upcoming" | "reminder" | "delivered";
}

interface CalendarTabProps {
  events: Event[];
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  getEventsForDate: (date: Date) => Event[];
  modifiedDays: Date[];
}

export default function CalendarTab({ 
  events, 
  selectedDate, 
  onDateSelect, 
  getEventsForDate, 
  modifiedDays 
}: CalendarTabProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "birthday": return "Cake";
      case "anniversary": return "Heart";
      case "holiday": return "PartyPopper";
      default: return "Gift";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-500";
      case "reminder": return "bg-yellow-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming": return "Ожидает";
      case "reminder": return "Напоминание";
      case "delivered": return "Доставлено";
      default: return status;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Календарь событий</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gradient-purple-pink border-0">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Добавить событие</DialogTitle>
                  <DialogDescription>
                    Укажите детали события и дату напоминания
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Название события</Label>
                    <Input id="event-title" placeholder="День рождения..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-recipient">Получатель</Label>
                    <Input id="event-recipient" placeholder="Имя получателя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-category">Категория</Label>
                    <Select defaultValue="birthday">
                      <SelectTrigger id="event-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birthday">День рождения</SelectItem>
                        <SelectItem value="anniversary">Годовщина</SelectItem>
                        <SelectItem value="holiday">Праздник</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Дата события</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <Button className="w-full gradient-orange-blue border-0">
                    Создать событие
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Выберите дату для просмотра событий
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border"
            locale={ru}
            modifiers={{
              hasEvent: modifiedDays
            }}
            modifiersStyles={{
              hasEvent: {
                backgroundColor: "hsl(var(--primary))",
                color: "white",
                fontWeight: "bold"
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>
            {selectedDate 
              ? `События на ${format(selectedDate, "d MMMM yyyy", { locale: ru })}`
              : "Все события"
            }
          </CardTitle>
          <CardDescription>
            {selectedDate 
              ? `${getEventsForDate(selectedDate).length} событий`
              : `${events.length} всего событий`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(selectedDate ? getEventsForDate(selectedDate) : events).map((event) => (
              <Card key={event.id} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-orange-blue flex items-center justify-center flex-shrink-0">
                        <Icon name={getCategoryIcon(event.category)} className="text-white" size={20} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{event.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {format(event.date, "d MMMM yyyy", { locale: ru })}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(event.status)} text-white border-0`}>
                      {getStatusLabel(event.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Получатель:</span>
                      <span className="font-medium">{event.recipient}</span>
                    </div>
                    {event.giftSelected && (
                      <div className="flex items-center gap-2">
                        <Icon name="Gift" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Подарок:</span>
                        <span className="font-medium">{event.giftSelected}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Edit" size={14} className="mr-2" />
                    Редактировать
                  </Button>
                  {!event.giftSelected && (
                    <Button size="sm" className="flex-1 gradient-purple-pink border-0">
                      <Icon name="ShoppingBag" size={14} className="mr-2" />
                      Выбрать подарок
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
