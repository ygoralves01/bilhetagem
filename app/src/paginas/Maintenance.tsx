import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Maintenance() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const records = [
    {
      id: "1",
      equipment: {
        tipo: "Rastreador",
        modelo: "GPS-2000",
        numero_serie: "SN123456",
      },
      descricao: "Troca de bateria e verificação de conexão",
      data_inicio: "2024-01-15",
      data_previsao: "2024-01-20",
      status: "em_andamento",
      responsavel: "João Silva",
    },
    {
      id: "2",
      equipment: {
        tipo: "Sensor",
        modelo: "TEMP-500",
        numero_serie: "SN789012",
      },
      descricao: "Calibração do sensor de temperatura",
      data_inicio: "2024-01-10",
      data_fim: "2024-01-12",
      status: "concluida",
      responsavel: "Maria Santos",
    },
    {
      id: "3",
      equipment: {
        tipo: "Câmera",
        modelo: "CAM-HD",
        numero_serie: "SN345678",
      },
      descricao: "Atualização de firmware",
      data_inicio: "2024-01-18",
      status: "aberta",
      responsavel: "Pedro Costa",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberta":
        return "warning";
      case "em_andamento":
        return "info";
      case "concluida":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "aberta":
        return "Aberta";
      case "em_andamento":
        return "Em Andamento";
      case "concluida":
        return "Concluída";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
  };

  const filteredRecords = records.filter((r) => !filterStatus || r.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manutenção</h1>
          <p className="text-muted-foreground">Gerencie as manutenções de equipamentos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Manutenção
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filterStatus === null ? "default" : "outline"}
          onClick={() => setFilterStatus(null)}
          size="sm"
        >
          Todas
        </Button>
        <Button
          variant={filterStatus === "aberta" ? "default" : "outline"}
          onClick={() => setFilterStatus("aberta")}
          size="sm"
        >
          Abertas
        </Button>
        <Button
          variant={filterStatus === "em_andamento" ? "default" : "outline"}
          onClick={() => setFilterStatus("em_andamento")}
          size="sm"
        >
          Em Andamento
        </Button>
        <Button
          variant={filterStatus === "concluida" ? "default" : "outline"}
          onClick={() => setFilterStatus("concluida")}
          size="sm"
        >
          Concluídas
        </Button>
      </div>

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {record.equipment.tipo} - {record.equipment.modelo}
                    </CardTitle>
                    <CardDescription>Série: {record.equipment.numero_serie}</CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(record.status) as any}>
                  {getStatusLabel(record.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">{record.descricao}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Data de Início</p>
                  <p className="text-sm font-medium">{formatDate(record.data_inicio)}</p>
                </div>
                
                {record.data_previsao && (
                  <div>
                    <p className="text-xs text-muted-foreground">Previsão</p>
                    <p className="text-sm font-medium">{formatDate(record.data_previsao)}</p>
                  </div>
                )}
                
                {record.data_fim && (
                  <div>
                    <p className="text-xs text-muted-foreground">Data de Conclusão</p>
                    <p className="text-sm font-medium">{formatDate(record.data_fim)}</p>
                  </div>
                )}
                
                {record.responsavel && (
                  <div>
                    <p className="text-xs text-muted-foreground">Responsável</p>
                    <p className="text-sm font-medium">{record.responsavel}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
