import { OTPForm } from "@/registry/patterns/blocks/otp-01/components/otp-form"

export default function OTPPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <OTPForm />
      </div>
    </div>
  )
}
