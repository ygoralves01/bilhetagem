import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Package, Wrench, AlertCircle } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusChart from "@/components/dashboard/StatusChart";
import BrandChart from "@/components/dashboard/BrandChart";

export default function Dashboard() {
  // Mock data - replace with actual API calls
  const stats = {
    totalVehicles: 45,
    totalEquipments: 128,
    equipmentInStock: 56,
    equipmentInUse: 52,
    equipmentInMaintenance: 20,
    openMaintenance: 12,
  };

  const equipmentStatus = [
    { name: "Estoque", value: 56, color: "hsl(var(--success))" },
    { name: "Em Uso", value: 52, color: "hsl(var(--info))" },
    { name: "Manutenção", value: 20, color: "hsl(var(--warning))" },
  ];

  const equipmentByBrand = [
    { name: "Marca A", value: 35 },
    { name: "Marca B", value: 28 },
    { name: "Marca C", value: 22 },
    { name: "Marca D", value: 18 },
    { name: "Marca E", value: 25 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema de gestão</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Veículos"
          value={stats.totalVehicles}
          icon={Car}
          iconColor="text-primary"
        />
        <StatsCard
          title="Total de Equipamentos"
          value={stats.totalEquipments}
          icon={Package}
          iconColor="text-info"
        />
        <StatsCard
          title="Em Manutenção"
          value={stats.equipmentInMaintenance}
          icon={Wrench}
          iconColor="text-warning"
        />
        <StatsCard
          title="Manutenções Abertas"
          value={stats.openMaintenance}
          icon={AlertCircle}
          iconColor="text-destructive"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Equipamentos por Marca</CardTitle>
            <CardDescription>Distribuição de equipamentos por fabricante</CardDescription>
          </CardHeader>
          <CardContent>
            <BrandChart data={equipmentByBrand} />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Status dos Equipamentos</CardTitle>
            <CardDescription>Distribuição por status atual</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusChart data={equipmentStatus} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.equipmentInStock}</div>
            <p className="text-xs text-muted-foreground mt-1">equipamentos disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Em Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{stats.equipmentInUse}</div>
            <p className="text-xs text-muted-foreground mt-1">equipamentos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.equipmentInMaintenance}</div>
            <p className="text-xs text-muted-foreground mt-1">em reparo</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
