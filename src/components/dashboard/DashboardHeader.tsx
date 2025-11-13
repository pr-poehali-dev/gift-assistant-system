import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export default function DashboardHeader() {
  return (
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
  );
}
