
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgramProps {
  title: string;
  time: string;
  description: string;
  host?: string;
  category?: string;
  isLive?: boolean;
}

export function ProgramCard({
  title,
  time,
  description,
  host,
  category = "Émission",
  isLive = false,
}: ProgramProps) {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm mt-1">{time}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={category === "Actualités" ? "default" : "secondary"}>
              {category}
            </Badge>
            {isLive && (
              <Badge variant="destructive" className="animate-pulse-live">
                En direct
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
        {host && (
          <div className="mt-3 flex items-center">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
              {host.charAt(0)}
            </div>
            <span className="ml-2 text-sm font-medium">Animé par {host}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
