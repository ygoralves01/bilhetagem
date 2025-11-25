import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Package } from "lucide-react";

export default function Equipments() {
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const equipments = [
    {
      id: "1",
      tipo: "Rastreador",
      modelo: "GPS-2000",
      numero_serie: "SN123456",
      numero_final: "1234",
      marca: "Omnilink",
      tecnologia: "4G",
      status: "estoque",
    },
    {
      id: "2",
      tipo: "Sensor",
      modelo: "TEMP-500",
      numero_serie: "SN789012",
      numero_final: "7890",
      marca: "Sensortec",
      tecnologia: "Bluetooth",
      status: "uso",
    },
    {
      id: "3",
      tipo: "Câmera",
      modelo: "CAM-HD",
      numero_serie: "SN345678",
      numero_final: "3456",
      marca: "VisionTech",
      tecnologia: "WiFi",
      status: "manutencao",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "estoque":
        return "success";
      case "uso":
        return "info";
      case "manutencao":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "estoque":
        return "Estoque";
      case "uso":
        return "Em Uso";
      case "manutencao":
        return "Manutenção";
      default:
        return status;
    }
  };

  const filteredEquipments = equipments.filter((e) => {
    const matchesSearch =
      e.numero_serie?.toLowerCase().includes(searchText.toLowerCase()) ||
      e.numero_final?.toLowerCase().includes(searchText.toLowerCase()) ||
      e.tipo?.toLowerCase().includes(searchText.toLowerCase()) ||
      e.modelo?.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = !filterStatus || e.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equipamentos</h1>
          <p className="text-muted-foreground">Gerencie seus equipamentos e dispositivos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Equipamento
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por série, tipo ou modelo..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === null ? "default" : "outline"}
            onClick={() => setFilterStatus(null)}
            size="sm"
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === "estoque" ? "default" : "outline"}
            onClick={() => setFilterStatus("estoque")}
            size="sm"
          >
            Estoque
          </Button>
          <Button
            variant={filterStatus === "uso" ? "default" : "outline"}
            onClick={() => setFilterStatus("uso")}
            size="sm"
          >
            Em Uso
          </Button>
          <Button
            variant={filterStatus === "manutencao" ? "default" : "outline"}
            onClick={() => setFilterStatus("manutencao")}
            size="sm"
          >
            Manutenção
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEquipments.map((equipment) => (
          <Card key={equipment.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{equipment.tipo}</CardTitle>
                    <CardDescription>{equipment.modelo}</CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(equipment.status) as any}>
                  {getStatusLabel(equipment.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Série:</span>
                <span className="font-medium">{equipment.numero_serie}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Final:</span>
                <span className="font-medium">{equipment.numero_final}</span>
              </div>
              {equipment.marca && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Marca:</span>
                  <span className="font-medium">{equipment.marca}</span>
                </div>
              )}
              {equipment.tecnologia && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tecnologia:</span>
                  <span className="font-medium">{equipment.tecnologia}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
