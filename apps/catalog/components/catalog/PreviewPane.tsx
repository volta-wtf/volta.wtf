import { Separator } from "@/components/ui/separator";
export default function PreviewPane({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-svh flex flex-col">
      <div className="p-4"><h1 className="text-xl font-semibold">{title}</h1></div>
      <Separator />
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}
