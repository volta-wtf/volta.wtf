import { redirect } from "next/navigation";
import { getCategories } from "@/lib/catalog.gen";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const categories = getCategories();

  // Redirigir a la primera categoría si existe
  if (categories.length > 0 && categories[0]) {
    redirect(`/${categories[0].name}`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Catálogo VOLTA</CardTitle>
          <CardDescription>No hay categorías configuradas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Para generar el catálogo, ejecuta el siguiente comando:
          </p>
          <Card>
            <CardContent className="p-4">
              <code className="text-sm font-mono">
                pnpm run gen:catalog
              </code>
            </CardContent>
          </Card>
          <Badge variant="outline" className="w-full justify-center py-2">
            Configuración requerida
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
