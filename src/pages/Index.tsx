import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Index() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center">
              <Icon name="Gift" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Подарочный помощник
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#tariffs" className="text-muted-foreground hover:text-primary transition-colors">Тарифы</a>
            <a href="#catalog" className="text-muted-foreground hover:text-primary transition-colors">Каталог</a>
            <a href="#how" className="text-muted-foreground hover:text-primary transition-colors">Как работает</a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
            <Button className="gradient-purple-pink border-0" onClick={() => window.location.href = "/dashboard"}>Войти</Button>
          </nav>
          
          <button className="md:hidden">
            <Icon name="Menu" size={24} />
          </button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 gradient-orange-blue text-white border-0">
                🎁 Никогда не забывайте о важных датах
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Мы напомним и{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  доставим подарок
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Автоматические напоминания о днях рождения, годовщинах и праздниках. 
                Выбор подарка и доставка — за 7 дней до события.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gradient-purple-pink border-0 text-lg px-8 hover-scale" onClick={() => window.location.href = "/dashboard"}>
                  Начать бесплатно
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 hover-scale">
                  <Icon name="Play" size={20} className="mr-2" />
                  Как это работает
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  { icon: "Bell", label: "Напоминания", value: "За 7 дней" },
                  { icon: "Gift", label: "Подарков", value: "500+" },
                  { icon: "Users", label: "Клиентов", value: "10 000+" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <Icon name={stat.icon} className="text-primary" size={24} />
                    </div>
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full"></div>
              <img 
                src="https://cdn.poehali.dev/projects/246c762f-08b3-49ef-b20d-6fc142f7ac05/files/547f0004-7be7-4cb3-b792-d727d204fec0.jpg"
                alt="Подарки"
                className="relative rounded-3xl shadow-2xl w-full hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-purple-orange text-white border-0">
              Просто и понятно
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Как это работает</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Всего 4 шага до того, как вы забудете о стрессе с подарками
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: "Calendar", 
                title: "Добавьте даты", 
                desc: "Выберите праздники или добавьте свои важные даты",
                color: "from-purple-500 to-pink-500"
              },
              { 
                icon: "CreditCard", 
                title: "Оформите подписку", 
                desc: "Выберите тариф Эконом или Премиум",
                color: "from-pink-500 to-orange-500"
              },
              { 
                icon: "Bell", 
                title: "Получите напоминание", 
                desc: "За 7 дней до события вам придет SMS",
                color: "from-orange-500 to-blue-500"
              },
              { 
                icon: "Truck", 
                title: "Подарок доставлен", 
                desc: "Мы сами выберем и доставим подарок вовремо",
                color: "from-blue-500 to-purple-500"
              }
            ].map((step, i) => (
              <Card key={i} className="relative overflow-hidden hover-scale border-2 hover:border-primary/50 transition-all">
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${step.color}`}></div>
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                    <Icon name={step.icon} className="text-white" size={32} />
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">Шаг {i + 1}</div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="tariffs" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-purple-pink text-white border-0">
              💎 Гибкие тарифы
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выберите свой тариф</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Годовая подписка с возможностью добавления дополнительных дат
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">Эконом</Badge>
                  <Icon name="Zap" className="text-primary" size={24} />
                </div>
                <CardTitle className="text-3xl mb-2">₽2 990</CardTitle>
                <CardDescription className="text-base">в год</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "1 бесплатная дата на выбор",
                    "SMS-напоминания за 7 дней",
                    "Доставка по городу",
                    "Базовый каталог подарков",
                    "Дополнительные даты — ₽990/шт"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" size="lg">
                  Выбрать Эконом
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover-scale border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <div className="gradient-purple-pink text-white text-sm font-semibold px-6 py-2 rounded-bl-2xl">
                  Популярный
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="gradient-orange-blue text-white border-0">Премиум</Badge>
                  <Icon name="Crown" className="text-accent" size={24} />
                </div>
                <CardTitle className="text-3xl mb-2">₽5 990</CardTitle>
                <CardDescription className="text-base">в год</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "5 предоплаченных дат",
                    "SMS-напоминания за 7 дней",
                    "Доставка по всей России",
                    "Премиум каталог подарков",
                    "Дополнительные даты — ₽790/шт",
                    "Скидка 15% на дополнительные услуги",
                    "Приоритетная поддержка"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gradient-purple-pink border-0" size="lg">
                  Выбрать Премиум
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-orange-blue text-white border-0">
              🎁 500+ подарков
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог подарков</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Тщательно подобранные подарки на любой вкус и повод
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Цветы и букеты", icon: "Flower2", color: "from-pink-500 to-rose-500" },
              { name: "Сладости", icon: "Cake", color: "from-orange-500 to-amber-500" },
              { name: "Косметика", icon: "Sparkles", color: "from-purple-500 to-pink-500" },
              { name: "Аксессуары", icon: "Watch", color: "from-blue-500 to-cyan-500" },
              { name: "Книги", icon: "BookOpen", color: "from-indigo-500 to-purple-500" },
              { name: "Игрушки", icon: "Toy", color: "from-green-500 to-emerald-500" },
              { name: "Электроника", icon: "Smartphone", color: "from-slate-600 to-slate-800" },
              { name: "Впечатления", icon: "Ticket", color: "from-red-500 to-pink-500" }
            ].map((category, i) => (
              <Card key={i} className="hover-scale cursor-pointer group border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon name={category.icon} className="text-white" size={32} />
                  </div>
                  <h3 className="text-center font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                name: "Букет из роз", 
                price: "3 500", 
                image: "https://cdn.poehali.dev/projects/246c762f-08b3-49ef-b20d-6fc142f7ac05/files/547f0004-7be7-4cb3-b792-d727d204fec0.jpg",
                badge: "Хит"
              },
              { 
                name: "Набор конфет премиум", 
                price: "2 900", 
                image: "https://cdn.poehali.dev/projects/246c762f-08b3-49ef-b20d-6fc142f7ac05/files/0b0f6d57-098d-4536-9202-a51094f7e966.jpg",
                badge: "Новинка"
              },
              { 
                name: "Подарочный сертификат", 
                price: "5 000", 
                image: "https://cdn.poehali.dev/projects/246c762f-08b3-49ef-b20d-6fc142f7ac05/files/3f195c35-1954-479b-80cd-7fc674ed1a0f.jpg",
                badge: "Премиум"
              }
            ].map((product, i) => (
              <Card key={i} className="hover-scale group overflow-hidden border-2 hover:border-primary/50 transition-all">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 gradient-purple-pink text-white border-0">
                    {product.badge}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    ₽{product.price}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Подробнее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-purple-orange text-white border-0">
              ❓ Часто задаваемые вопросы
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Вопросы и ответы</h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Как происходит оплата?",
                a: "Оплата происходит через безопасную платежную систему Т-Банк с помощью QR-кода. Подписка оформляется на год с автоматическим продлением."
              },
              {
                q: "Можно ли отменить подписку?",
                a: "Да, вы можете отменить подписку в любой момент в личном кабинете. При отмене до окончания периода деньги не возвращаются, но сервис остается активным до конца оплаченного периода."
              },
              {
                q: "Как добавить дополнительные даты?",
                a: "В личном кабинете есть раздел 'Мои события', где вы можете добавить неограниченное количество дат. Каждая дополнительная дата оплачивается отдельно согласно вашему тарифу."
              },
              {
                q: "Можно ли изменить адрес доставки?",
                a: "Да, за 7 дней до события вам придет SMS с подтверждением адреса и контактов получателя. Вы сможете внести изменения прямо из SMS или в личном кабинете."
              },
              {
                q: "Что если подарок не понравится?",
                a: "Мы тщательно подбираем подарки под каждый повод. Если что-то пошло не так — свяжитесь с поддержкой в течение 24 часов, и мы найдем решение."
              }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-2 rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 px-4 gradient-purple-pink text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы забыть о стрессе с подарками?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Присоединяйтесь к 10 000+ пользователей, которые уже никогда не забывают о важных датах
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 hover-scale">
            Начать бесплатно
            <Icon name="Sparkles" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <footer className="py-12 px-4 bg-muted/30 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center">
                  <Icon name="Gift" className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">Подарочный помощник</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Автоматические напоминания и доставка подарков к важным датам
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Продукт</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#tariffs" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#catalog" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#how" className="hover:text-primary transition-colors">Как работает</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>hello@gifts.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 555-35-35</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Подарочный помощник. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}