import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Event {
  id: string;
  title: string;
  date: Date;
  recipient: string;
  category: string;
  giftSelected?: string;
  status: "upcoming" | "reminder" | "delivered";
}

interface DashboardStatsProps {
  events: Event[];
}

export default function DashboardStats({ events }: DashboardStatsProps) {
  return (
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
  );
}
