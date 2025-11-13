import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
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

interface SubscriptionTabProps {
  events: Event[];
  showPaymentDialog: boolean;
  setShowPaymentDialog: (show: boolean) => void;
  selectedTariff: "economy" | "premium";
  setSelectedTariff: (tariff: "economy" | "premium") => void;
  handlePayment: () => void;
  showTestEmailDialog: boolean;
  setShowTestEmailDialog: (show: boolean) => void;
  testEmail: string;
  setTestEmail: (email: string) => void;
  emailSending: boolean;
  handleSendTestEmail: () => void;
}

export default function SubscriptionTab({
  showPaymentDialog,
  setShowPaymentDialog,
  selectedTariff,
  setSelectedTariff,
  handlePayment,
  showTestEmailDialog,
  setShowTestEmailDialog,
  testEmail,
  setTestEmail,
  emailSending,
  handleSendTestEmail
}: SubscriptionTabProps) {
  return (
    <>
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
                  <span>Налоги</span>
                  <span className="font-semibold">₽0</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Итого</span>
                  <span>₽790</span>
                </div>
              </div>
              <Button onClick={handlePayment} className="w-full gradient-orange-blue border-0">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Купить даты
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-500">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sparkles" className="text-yellow-500" size={20} />
                <CardTitle className="text-lg">Реферальная программа</CardTitle>
              </div>
              <CardDescription>Приглашайте друзей и получайте бонусы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium mb-2">Ваша реферальная ссылка:</p>
                <div className="flex gap-2">
                  <Input 
                    value="https://example.com/ref/ABC123" 
                    readOnly 
                    className="bg-white"
                  />
                  <Button variant="outline" size="icon">
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Приглашено друзей</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Заработано дат</span>
                  <span className="font-semibold text-yellow-600">+2 даты</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="CreditCard" className="text-primary" size={24} />
              Оплата дополнительных дат
            </DialogTitle>
            <DialogDescription>
              Выберите удобный способ оплаты
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer border-2 transition-all ${
                  selectedTariff === "economy" 
                    ? "border-primary shadow-lg" 
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setSelectedTariff("economy")}
              >
                <CardHeader>
                  <CardTitle className="text-lg">Эконом</CardTitle>
                  <CardDescription>1 дата</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽790</div>
                  <p className="text-sm text-muted-foreground mt-2">Базовая доставка</p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer border-2 transition-all ${
                  selectedTariff === "premium" 
                    ? "border-primary shadow-lg" 
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setSelectedTariff("premium")}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Премиум</CardTitle>
                      <CardDescription>5 дат</CardDescription>
                    </div>
                    <Badge className="gradient-orange-blue text-white border-0">-13%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽3 450</div>
                  <p className="text-sm text-muted-foreground mt-2">₽690 за дату</p>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 bg-muted/50 rounded-lg text-center">
              <Icon name="QrCode" size={120} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-semibold mb-2">Отсканируйте QR-код для оплаты</p>
              <p className="text-sm text-muted-foreground">
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
    </>
  );
}
