import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays, isSameDay } from "date-fns";
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

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "День рождения мамы",
      date: addDays(new Date(), 12),
      recipient: "Мама",
      category: "birthday",
      status: "upcoming"
    },
    {
      id: "2",
      title: "Годовщина свадьбы",
      date: addDays(new Date(), 5),
      recipient: "Анна",
      category: "anniversary",
      giftSelected: "Букет из роз",
      status: "reminder"
    },
    {
      id: "3",
      title: "День рождения друга",
      date: addDays(new Date(), -3),
      recipient: "Алексей",
      category: "birthday",
      giftSelected: "Набор конфет премиум",
      status: "delivered"
    }
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<"economy" | "premium">("premium");
  const [showTestEmailDialog, setShowTestEmailDialog] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const modifiedDays = events.map(event => event.date);

  const handlePayment = () => {
    setShowPaymentDialog(true);
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) return;
    
    setEmailSending(true);
    
    const upcomingEvent = events.find(e => e.status === "upcoming") || events[0];
    
    try {
      const response = await fetch("https://functions.poehali.dev/0f1ac36c-6386-4222-ac24-68f86a4d74b4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recipient_email: testEmail,
          event_title: upcomingEvent.title,
          event_date: format(upcomingEvent.date, "d MMMM yyyy", { locale: ru }),
          recipient_name: upcomingEvent.recipient
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Тестовое письмо отправлено! Проверьте почту.");
        setShowTestEmailDialog(false);
        setTestEmail("");
      } else {
        alert(`❌ Ошибка: ${data.error || "Не удалось отправить письмо"}`);
      }
    } catch (error) {
      alert("❌ Ошибка сети. Проверьте соединение.");
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center">
              <Icon name="Gift" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Личный кабинет
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="gradient-orange-blue text-white border-0">
              Премиум
            </Badge>
            <Button variant="outline" size="sm" onClick={() => window.location.href = "/"}>
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Calendar" className="text-primary" size={20} />
                Активных событий
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{events.filter(e => e.status !== "delivered").length}</div>
              <p className="text-sm text-muted-foreground mt-1">в этом году</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Bell" className="text-accent" size={20} />
                Скоро напоминания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{events.filter(e => e.status === "reminder").length}</div>
              <p className="text-sm text-muted-foreground mt-1">за 7 дней</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-600" size={20} />
                Доставлено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{events.filter(e => e.status === "delivered").length}</div>
              <p className="text-sm text-muted-foreground mt-1">подарков</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="calendar">
              <Icon name="Calendar" size={16} className="mr-2" />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="events">
              <Icon name="List" size={16} className="mr-2" />
              События
            </TabsTrigger>
            <TabsTrigger value="subscription">
              <Icon name="CreditCard" size={16} className="mr-2" />
              Подписка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
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
                            <Label htmlFor="recipient">Получатель</Label>
                            <Input id="recipient" placeholder="Имя получателя" />
                          </div>
                          <div className="space-y-2">
                            <Label>Категория</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите категорию" />
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
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Отмена</Button>
                          <Button className="gradient-purple-pink border-0">Сохранить</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                  <CardDescription>
                    Отмечены даты с запланированными событиями
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    locale={ru}
                    modifiers={{ events: modifiedDays }}
                    modifiersClassNames={{
                      events: "bg-primary/10 font-bold text-primary"
                    }}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                    </CardTitle>
                    <CardDescription>События на эту дату</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-3">
                        {getEventsForDate(selectedDate).map(event => (
                          <div key={event.id} className="p-4 rounded-lg border-2 hover:border-primary/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{event.title}</h4>
                                <p className="text-sm text-muted-foreground">Для: {event.recipient}</p>
                              </div>
                              <Badge variant={event.status === "delivered" ? "default" : "secondary"}>
                                {event.status === "delivered" ? "Доставлено" : event.status === "reminder" ? "Напоминание" : "Ожидание"}
                              </Badge>
                            </div>
                            {event.giftSelected && (
                              <p className="text-sm text-muted-foreground">
                                🎁 {event.giftSelected}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Icon name="CalendarX" size={48} className="mx-auto mb-2 opacity-20" />
                        <p>Нет событий на эту дату</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-2 gradient-purple-pink text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Sparkles" size={20} />
                      Подсказка
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm opacity-90">
                      Напоминания приходят за 7 дней до события. Вы можете изменить адрес доставки прямо из SMS!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Все события</CardTitle>
                <CardDescription>Полный список ваших запланированных событий</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.map(event => (
                    <div key={event.id} className="p-4 rounded-lg border-2 hover:border-primary/50 transition-all hover-scale">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 items-start flex-1">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            event.status === "delivered" ? "bg-green-100" :
                            event.status === "reminder" ? "bg-orange-100" : "bg-blue-100"
                          }`}>
                            <Icon 
                              name={event.status === "delivered" ? "CheckCircle" : event.status === "reminder" ? "Bell" : "Calendar"} 
                              className={
                                event.status === "delivered" ? "text-green-600" :
                                event.status === "reminder" ? "text-orange-600" : "text-blue-600"
                              }
                              size={24} 
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <Icon name="User" size={14} />
                                {event.recipient}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                {format(event.date, "d MMMM yyyy", { locale: ru })}
                              </span>
                            </div>
                            {event.giftSelected && (
                              <p className="text-sm bg-muted px-3 py-1 rounded-full inline-block">
                                🎁 {event.giftSelected}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="gradient-orange-blue text-white border-0">Активная</Badge>
                    <Icon name="Crown" className="text-accent" size={24} />
                  </div>
                  <CardTitle>Премиум подписка</CardTitle>
                  <CardDescription>Действует до 13 ноября 2026</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Использовано дат</span>
                      <span className="font-semibold">2 из 5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="gradient-purple-pink h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="text-primary" size={16} />
                      <span>5 предоплаченных дат</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="text-primary" size={16} />
                      <span>Доставка по всей России</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="text-primary" size={16} />
                      <span>Премиум каталог</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="text-primary" size={16} />
                      <span>Скидка 15% на доп. услуги</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Управление подпиской
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-4">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Email-уведомления</span>
                      <Icon name="Mail" className="text-primary" size={20} />
                    </CardTitle>
                    <CardDescription>Получайте напоминания на почту</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Мы будем отправлять вам красивые письма-напоминания за 7 дней до каждого события.
                    </p>
                    <Button 
                      className="w-full gradient-purple-pink border-0" 
                      onClick={() => setShowTestEmailDialog(true)}
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить тестовое письмо
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Добавить дополнительные даты</CardTitle>
                    <CardDescription>Расширьте свою подписку</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Количество дат</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 дата — ₽790</SelectItem>
                          <SelectItem value="3">3 даты — ₽2 100</SelectItem>
                          <SelectItem value="5">5 дат — ₽3 450</SelectItem>
                          <SelectItem value="10">10 дат — ₽6 500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Стоимость</span>
                        <span className="font-semibold">₽790</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Скидка (Премиум 15%)</span>
                        <span className="font-semibold text-green-600">-₽119</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Итого</span>
                        <span>₽671</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-pink border-0" onClick={handlePayment}>
                      <Icon name="CreditCard" size={16} className="mr-2" />
                      Оплатить через Т-Банк
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Изменить тариф</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-between">
                        <span>Эконом — ₽2 990/год</span>
                        <Icon name="ArrowRight" size={16} />
                      </Button>
                      <Button variant="outline" className="w-full justify-between border-primary">
                        <span className="font-semibold">Премиум — ₽5 990/год</span>
                        <Badge className="gradient-orange-blue text-white border-0">Текущий</Badge>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="CreditCard" className="text-primary" size={24} />
              Оплата через Т-Банк
            </DialogTitle>
            <DialogDescription>
              Для оплаты отсканируйте QR-код в приложении Т-Банк
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed">
                <div className="text-center space-y-2">
                  <Icon name="QrCode" size={80} className="mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">QR-код для оплаты</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Получатель</span>
                <span className="font-medium">Подарочный помощник</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Назначение</span>
                <span className="font-medium">1 дополнительная дата</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Сумма</span>
                <span className="font-bold text-lg">₽671</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full gradient-purple-pink border-0" size="lg">
                <Icon name="Smartphone" size={20} className="mr-2" />
                Открыть в приложении Т-Банк
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowPaymentDialog(false)}>
                Отмена
              </Button>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg">
              <Icon name="Info" size={14} className="flex-shrink-0 mt-0.5 text-blue-600" />
              <p>
                После оплаты QR-кода дополнительная дата автоматически добавится в ваш аккаунт в течение 1-2 минут
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTestEmailDialog} onOpenChange={setShowTestEmailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Mail" className="text-primary" size={24} />
              Отправить тестовое письмо
            </DialogTitle>
            <DialogDescription>
              Укажите email, на который хотите получить пример напоминания
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Email адрес</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="example@mail.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5 text-blue-600" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Что придет на почту:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Красивое HTML-письмо с градиентами</li>
                    <li>Детали события из вашего календаря</li>
                    <li>Ссылка в личный кабинет</li>
                    <li>Информация о доставке подарка</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full gradient-purple-pink border-0" 
                size="lg"
                onClick={handleSendTestEmail}
                disabled={!testEmail || emailSending}
              >
                {emailSending ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить письмо
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowTestEmailDialog(false)}
                disabled={emailSending}
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}