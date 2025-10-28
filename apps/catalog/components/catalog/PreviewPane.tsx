import { Separator } from "@/components/ui/separator";

export default function PreviewPane({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <Separator />
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}
