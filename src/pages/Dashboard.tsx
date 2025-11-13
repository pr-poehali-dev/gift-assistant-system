import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { addDays, isSameDay } from "date-fns";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CalendarTab from "@/components/dashboard/CalendarTab";
import SubscriptionTab from "@/components/dashboard/SubscriptionTab";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <DashboardStats events={events} />

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
            <CalendarTab
              events={events}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              getEventsForDate={getEventsForDate}
              modifiedDays={modifiedDays}
            />
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Все события</CardTitle>
                <CardDescription>
                  Полный список ваших событий с возможностью фильтрации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.map((event) => (
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
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <SubscriptionTab
              events={events}
              showPaymentDialog={showPaymentDialog}
              setShowPaymentDialog={setShowPaymentDialog}
              selectedTariff={selectedTariff}
              setSelectedTariff={setSelectedTariff}
              handlePayment={handlePayment}
              showTestEmailDialog={showTestEmailDialog}
              setShowTestEmailDialog={setShowTestEmailDialog}
              testEmail={testEmail}
              setTestEmail={setTestEmail}
              emailSending={emailSending}
              handleSendTestEmail={handleSendTestEmail}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
