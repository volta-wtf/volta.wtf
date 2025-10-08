import { CardsDemo } from "@/registry/cards"

export default function ThemePage() {
    return (
        <div className="container-wrapper section-soft flex flex-1 flex-col pb-6">
            <div className="theme-container container flex flex-1 flex-col">
                <CardsDemo />
            </div>
        </div>
    )
}
