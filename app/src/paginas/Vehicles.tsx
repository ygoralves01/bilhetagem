import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Car } from "lucide-react";

export default function Vehicles() {
  const [searchText, setSearchText] = useState("");

  // Mock data - replace with actual API calls
  const vehicles = [
    {
      id: "1",
      placa: "ABC-1234",
      modelo: "Caminhão Mercedes 2024",
      carroceria: "Baú",
      tecnologia: "Diesel",
      fabricante: "Mercedes-Benz",
      equipmentCount: 5,
    },
    {
      id: "2",
      placa: "DEF-5678",
      modelo: "Volvo FH16",
      carroceria: "Refrigerado",
      tecnologia: "Diesel",
      fabricante: "Volvo",
      equipmentCount: 8,
    },
    {
      id: "3",
      placa: "GHI-9012",
      modelo: "Scania R450",
      carroceria: "Sider",
      tecnologia: "Diesel Euro 6",
      fabricante: "Scania",
      equipmentCount: 6,
    },
  ];

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.placa.toLowerCase().includes(searchText.toLowerCase()) ||
      v.modelo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Veículos</h1>
          <p className="text-muted-foreground">Gerencie sua frota de veículos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Veículo
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa ou modelo..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vehicle.placa}</CardTitle>
                    <CardDescription>{vehicle.modelo}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {vehicle.carroceria && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Carroceria:</span>
                  <span className="font-medium">{vehicle.carroceria}</span>
                </div>
              )}
              {vehicle.tecnologia && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tecnologia:</span>
                  <span className="font-medium">{vehicle.tecnologia}</span>
                </div>
              )}
              {vehicle.fabricante && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fabricante:</span>
                  <span className="font-medium">{vehicle.fabricante}</span>
                </div>
              )}
              <div className="pt-2 border-t">
                <Badge variant="secondary">
                  {vehicle.equipmentCount} equipamentos
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
