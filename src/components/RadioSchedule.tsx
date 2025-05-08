
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Définition des types pour les données du programme
type TimeSlot = {
  time: string;
  programs: {
    [day: string]: string;
  };
};

// Les jours de la semaine
const DAYS_OF_WEEK = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// Données structurées du programme radio
const RADIO_SCHEDULE: TimeSlot[] = [
  { 
    time: "05:30-06:00", 
    programs: { 
      "Lundi": "KREFELD", 
      "Mardi": "KREFELD", 
      "Mercredi": "KREFELD", 
      "Jeudi": "KREFELD", 
      "Vendredi": "KREFELD", 
      "Samedi": "KREFELD", 
      "Dimanche": "KREFELD" 
    } 
  },
  { 
    time: "06:00-06:30", 
    programs: { 
      "Lundi": "JT KINSHASA + REVUE DE PRESSE", 
      "Mardi": "JT KINSHASA + REVUE DE PRESSE", 
      "Mercredi": "JT KINSHASA + REVUE DE PRESSE", 
      "Jeudi": "JT KINSHASA + REVUE DE PRESSE", 
      "Vendredi": "JT KINSHASA + REVUE DE PRESSE", 
      "Samedi": "JT KINSHASA + REVUE DE PRESSE", 
      "Dimanche": "JT KINSHASA + REVUE DE PRESSE" 
    } 
  },
  { 
    time: "06:30-07:00", 
    programs: { 
      "Lundi": "RT FRANÇAIS", 
      "Mardi": "RT FRANÇAIS", 
      "Mercredi": "RT FRANÇAIS", 
      "Jeudi": "RT FRANÇAIS", 
      "Vendredi": "RT FRANÇAIS", 
      "Samedi": "RT FRANÇAIS", 
      "Dimanche": "RT FRANÇAIS" 
    } 
  },
  { 
    time: "07:00-07:30", 
    programs: { 
      "Lundi": "NURU YA MASHARIKI", 
      "Mardi": "NURU YA MASHARIKI", 
      "Mercredi": "NURU YA MASHARIKI", 
      "Jeudi": "NURU YA MASHARIKI", 
      "Vendredi": "NURU YA MASHARIKI", 
      "Samedi": "NURU YA MASHARIKI", 
      "Dimanche": "NURU YA MASHARIKI" 
    } 
  },
  { 
    time: "07:30-08:00", 
    programs: { 
      "Lundi": "JT GOMA/KIN\nJEUNESSE CHINE", 
      "Mardi": "JT GOMA/KIN\nJEUNESSE CHINE", 
      "Mercredi": "JT GOMA/KIN\nJEUNESSE CHINE", 
      "Jeudi": "JT GOMA/KIN\nJEUNESSE CHINE", 
      "Vendredi": "JT GOMA/KIN\nJEUNESSE CHINE", 
      "Samedi": "JT GOMA/KIN\nJEUNESSE CHINE", 
      "Dimanche": "JT GOMA/KIN\nJEUNESSE CHINE" 
    } 
  },
  { 
    time: "08:00-08:30", 
    programs: { 
      "Lundi": "JT KINSHASA + REVUE DE PRESSE", 
      "Mardi": "JT KINSHASA + REVUE DE PRESSE", 
      "Mercredi": "JT KINSHASA + REVUE DE PRESSE", 
      "Jeudi": "JT KINSHASA + REVUE DE PRESSE", 
      "Vendredi": "JT KINSHASA + REVUE DE PRESSE", 
      "Samedi": "JT KINSHASA + REVUE DE PRESSE", 
      "Dimanche": "JT KINSHASA + REVUE DE PRESSE" 
    } 
  },
  { 
    time: "08:30-09:00", 
    programs: { 
      "Lundi": "LINGALA, HABARI NAIROBI", 
      "Mardi": "LINGALA, HABARI NAIROBI", 
      "Mercredi": "LINGALA, HABARI NAIROBI", 
      "Jeudi": "LINGALA, HABARI NAIROBI", 
      "Vendredi": "LINGALA, HABARI NAIROBI", 
      "Samedi": "LINGALA, HABARI NAIROBI", 
      "Dimanche": "LINGALA, HABARI NAIROBI" 
    } 
  },
  { 
    time: "09:00-09:30", 
    programs: { 
      "Lundi": "ZOOM 15", 
      "Mardi": "ZOOM 15", 
      "Mercredi": "ZOOM 15", 
      "Jeudi": "ZOOM 15", 
      "Vendredi": "ZOOM 15", 
      "Samedi": "ZOOM 15", 
      "Dimanche": "ZOOM 15" 
    } 
  },
  { 
    time: "09:30-10:00", 
    programs: { 
      "Lundi": "DOC GMG/ CHINE", 
      "Mardi": "DOC GMG/ CHINE", 
      "Mercredi": "DOC GMG/ CHINE", 
      "Jeudi": "DOC GMG/ CHINE", 
      "Vendredi": "DOC GMG/ CHINE", 
      "Samedi": "DOC GMG/ CHINE", 
      "Dimanche": "DOC GMG/ CHINE" 
    } 
  },
  { 
    time: "10:00-10:30", 
    programs: { 
      "Lundi": "JT GOMA/KIN", 
      "Mardi": "JT GOMA/KIN", 
      "Mercredi": "JT GOMA/KIN", 
      "Jeudi": "JT GOMA/KIN", 
      "Vendredi": "JT GOMA/KIN", 
      "Samedi": "JT GOMA/KIN", 
      "Dimanche": "JT GOMA/KIN" 
    } 
  },
  { 
    time: "10:30-11:00", 
    programs: { 
      "Lundi": "A NOUS LES ENFANTS", 
      "Mardi": "A NOUS LES ENFANTS", 
      "Mercredi": "A NOUS LES ENFANTS", 
      "Jeudi": "A NOUS LES ENFANTS", 
      "Vendredi": "A NOUS LES ENFANTS", 
      "Samedi": "A NOUS LES ENFANTS", 
      "Dimanche": "A NOUS LES ENFANTS" 
    } 
  },
  { 
    time: "11:00-11:30", 
    programs: { 
      "Lundi": "ROUE CONGOLAISE", 
      "Mardi": "PLEIN FEU SUR LES RELIGIONS", 
      "Mercredi": "ROUE CONGOLAISE", 
      "Jeudi": "PLEIN FEU SUR LES RELIGIONS", 
      "Vendredi": "ROUE CONGOLAISE", 
      "Samedi": "PLEIN FEU SUR LES RELIGIONS", 
      "Dimanche": "ROUE CONGOLAISE" 
    } 
  },
  // Ajouté plus de tranches horaires...
  { 
    time: "11:30-12:00", 
    programs: { 
      "Lundi": "DOCUMENTAIRE RUSSE (RT)", 
      "Mardi": "DOCUMENTAIRE RUSSE (RT)", 
      "Mercredi": "DOCUMENTAIRE RUSSE (RT)", 
      "Jeudi": "DOCUMENTAIRE RUSSE (RT)", 
      "Vendredi": "DOCUMENTAIRE RUSSE (RT)", 
      "Samedi": "DOCUMENTAIRE RUSSE (RT)", 
      "Dimanche": "MIBEKO YA CONGO" 
    } 
  },
  { 
    time: "12:00-12:30", 
    programs: { 
      "Lundi": "JT KINSHASA + REVUE DE PRESSE", 
      "Mardi": "JT KINSHASA + REVUE DE PRESSE", 
      "Mercredi": "JT KINSHASA + REVUE DE PRESSE", 
      "Jeudi": "JT KINSHASA + REVUE DE PRESSE", 
      "Vendredi": "JT KINSHASA + REVUE DE PRESSE", 
      "Samedi": "JT KINSHASA + REVUE DE PRESSE", 
      "Dimanche": "JT KINSHASA + REVUE DE PRESSE" 
    } 
  },
  { 
    time: "12:30-13:00", 
    programs: { 
      "Lundi": "BALADE CURIEUSE\nPUB", 
      "Mardi": "BALADE CURIEUSE\nPUB", 
      "Mercredi": "BALADE CURIEUSE\nPUB", 
      "Jeudi": "BALADE CURIEUSE\nPUB", 
      "Vendredi": "BALADE CURIEUSE\nPUB", 
      "Samedi": "BALADE CURIEUSE\nPUB", 
      "Dimanche": "PLEIN FEU SUR LES RELIGIONS" 
    } 
  },
  { 
    time: "13:00-13:30", 
    programs: { 
      "Lundi": "NURU YA MASHARIKI", 
      "Mardi": "NURU YA MASHARIKI", 
      "Mercredi": "NURU YA MASHARIKI", 
      "Jeudi": "NURU YA MASHARIKI", 
      "Vendredi": "NURU YA MASHARIKI", 
      "Samedi": "NURU YA MASHARIKI", 
      "Dimanche": "NURU YA MASHARIKI" 
    } 
  },
  { 
    time: "13:30-14:00", 
    programs: { 
      "Lundi": "JT GOMA/KIN", 
      "Mardi": "JT GOMA/KIN", 
      "Mercredi": "JT GOMA/KIN", 
      "Jeudi": "JT GOMA/KIN", 
      "Vendredi": "JT GOMA/KIN", 
      "Samedi": "JT GOMA/KIN", 
      "Dimanche": "JT GOMA/KIN" 
    } 
  },
  { 
    time: "14:00-14:30", 
    programs: { 
      "Lundi": "CMG DOCUMENTAIRE", 
      "Mardi": "CMG DOCUMENTAIRE", 
      "Mercredi": "CMG DOCUMENTAIRE", 
      "Jeudi": "CMG DOCUMENTAIRE", 
      "Vendredi": "CMG DOCUMENTAIRE", 
      "Samedi": "CMG DOCUMENTAIRE", 
      "Dimanche": "CMG DOCUMENTAIRE" 
    } 
  },
  { 
    time: "14:30-15:00", 
    programs: { 
      "Lundi": "VID7", 
      "Mardi": "VID7", 
      "Mercredi": "VID7", 
      "Jeudi": "VID7", 
      "Vendredi": "VID7", 
      "Samedi": "VID7", 
      "Dimanche": "VID7" 
    } 
  },
  { 
    time: "15:00-15:30", 
    programs: { 
      "Lundi": "47 IDEES/S", 
      "Mardi": "47 IDEES/S", 
      "Mercredi": "47 IDEES/S", 
      "Jeudi": "47 IDEES/S", 
      "Vendredi": "47 IDEES/S", 
      "Samedi": "47 IDEES/S", 
      "Dimanche": "MUSIQUES GOSPEL" 
    } 
  },
  { 
    time: "15:30-16:00", 
    programs: { 
      "Lundi": "VOIX DE LA FEMME", 
      "Mardi": "VOIX DE LA FEMME", 
      "Mercredi": "VOIX DE LA FEMME", 
      "Jeudi": "VOIX DE LA FEMME", 
      "Vendredi": "VOIX DE LA FEMME", 
      "Samedi": "VOIX DE LA FEMME", 
      "Dimanche": "KREFELD OU PREDICATIONS TMK" 
    } 
  },
];

// Définition des couleurs pour les catégories de programmes
const getProgramColor = (program: string): string => {
  const programLower = program.toLowerCase();
  
  if (programLower.includes("goma") || programLower.includes("kin")) {
    return "bg-blue-100 text-blue-800";
  } else if (programLower.includes("rt") || programLower.includes("chine") || programLower.includes("krefeld")) {
    return "bg-amber-100 text-amber-800";
  } else if (programLower.includes("nairobi") || programLower.includes("mashariki")) {
    return "bg-green-100 text-green-800";
  }
  
  return "";
};

// Obtenir le jour actuel de la semaine (1 pour lundi, 7 pour dimanche)
const getCurrentDayOfWeek = (): number => {
  const day = new Date().getDay();
  return day === 0 ? 7 : day; // Convertir 0 (dimanche) en 7
};

export function RadioSchedule() {
  const [viewType, setViewType] = useState<"day" | "week">("day");
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_WEEK[getCurrentDayOfWeek() - 1]);
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Grille des programmes</h2>
      
      <div className="flex justify-between items-center mb-4">
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as "day" | "week")}>
          <TabsList>
            <TabsTrigger value="day">Vue par jour</TabsTrigger>
            <TabsTrigger value="week">Vue complète</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {viewType === "day" && (
          <div className="flex overflow-x-auto scrollbar-none py-2 space-x-2">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-full ${
                  selectedDay === day 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-primary/10"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-card border rounded-lg overflow-auto max-h-[600px]">
        {viewType === "day" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Heure</TableHead>
                <TableHead>Programme</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RADIO_SCHEDULE.map((slot) => (
                <TableRow key={slot.time}>
                  <TableCell className="font-medium">{slot.time}</TableCell>
                  <TableCell>
                    <div className={`px-2 py-1 rounded ${getProgramColor(slot.programs[selectedDay])}`}>
                      {slot.programs[selectedDay].split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-card z-10 w-32">Heure</TableHead>
                  {DAYS_OF_WEEK.map((day) => (
                    <TableHead key={day}>{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {RADIO_SCHEDULE.map((slot) => (
                  <TableRow key={slot.time}>
                    <TableCell className="sticky left-0 bg-card z-10 font-medium">{slot.time}</TableCell>
                    {DAYS_OF_WEEK.map((day) => (
                      <TableCell key={day} className="min-w-[140px]">
                        <div className={`px-2 py-1 rounded text-xs ${getProgramColor(slot.programs[day])}`}>
                          {slot.programs[day].split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
          <span className="text-sm text-muted-foreground">Goma/Kinshasa</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-100 rounded mr-2"></div>
          <span className="text-sm text-muted-foreground">Partenaires (VOA, Chine, Krefeld, RT)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
          <span className="text-sm text-muted-foreground">Nairobi</span>
        </div>
      </div>
    </div>
  );
}
