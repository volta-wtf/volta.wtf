import { CardRevenue } from "@/components/demo/card-revenue";
import { CardSubscriptions } from "@/components/demo/card-subscriptions";
import { CardTeam } from "@/components/demo/card-team";
import { CardCalendar } from "@/components/demo/card-calendar";
import { CardChat } from "@/components/demo/card-chat";
import { CardExercise } from "@/components/demo/card-exercise";
import { CardGoal } from "@/components/demo/card-goal";
import { CardSettings } from "@/components/demo/card-settings";
import { CardIssue } from "@/components/demo/card-issue";
import { CardPayment } from "@/components/demo/card-payment";
import { CardShare } from "@/components/demo/card-share";
import { CardAccount } from "@/components/demo/card-account";
import { CardMethods } from "@/components/demo/card-methods";

export default function DemoPage() {
    return (
        <div className="relative flex min-h-svh flex-col bg-background">
            <div data-wrapper="" className="border-grid flex flex-1 flex-col">
                <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    header
                </header>
                <main className="flex flex-1 flex-col">
                    <section className="border-grid border-b">
                        <div className="container-wrapper">
                            <div className="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
                                Heading
                            </div>
                        </div>
                    </section>
                    <div className="container-wrapper">
                        <div className="container py-6">
                            <section id="themes" className="scroll-mt-20">
                                <div className="theme-red w-full flex gap-4" style={{ "--radius": "1rem" } as React.CSSProperties}>
                                    <div className="flex flex-col gap-4 w-1/2">
                                        <div className="flex gap-4">
                                            <CardRevenue amount="$15,231.89" percentage={20.1} />
                                            <CardSubscriptions amount="$15,231.89" percentage={20.1} />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex flex-col gap-4 w-1/2">
                                                <CardTeam />
                                                <CardSettings />
                                                <CardMethods />
                                            </div>
                                            <div className="flex flex-col gap-4 w-1/2">
                                                <CardChat />
                                                <CardAccount />
                                                <CardIssue />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 w-1/2">
                                        <div className="flex gap-4">
                                            <CardCalendar />
                                            <CardGoal />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <CardExercise />
                                            <CardPayment />
                                            <CardShare />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <footer className="border-grid border-t py-6 md:py-0">

                </footer>
            </div>
        </div>
    );
}