"use client"
import BorderLayout from '@/components/layout/borderLayout'
import CrossSVG from '@/components/svg/CrossSVG'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod'
import { Button } from '@/components/ui/button'
import { LoadingSwap } from '@/components/ui/loading-swap'
import { BadgeCheck, CheckIcon, Clock, CopyIcon, ShieldCheck } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { toastManager } from '@/components/ui/toast'


const proofCodeSchema = z.object({
    proofCode: z.string().min(1, "Proof code is required"),
})
type proofCodeFormData = z.infer<typeof proofCodeSchema>

export default function page() {
    const [isTrue, setIsTrue] = useState(false)
    const [copied, setCopied] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const id = "verifiedCode"

    const form = useForm<proofCodeFormData>({
        resolver: zodResolver(proofCodeSchema),
        mode: 'all',
        defaultValues: {
            proofCode: ""
        },
    })
    const { isSubmitting } = form.formState

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        }
    }

    const onSubmit = async (data: proofCodeFormData) => {
        let id: string | undefined;

        try {
            id = toastManager.add({
                title: "Verifying proof code...",
                type: "loading",
            });

            // simulate backend verification delay
            await new Promise((resolve) => setTimeout(resolve, 2000));

            toastManager.close(id);

            if (data.proofCode === "123456") {
                toastManager.add({
                    title: "Proof code verified",
                    description: `Proof code "${data.proofCode}" is valid.`,
                    type: "success",
                    timeout: 2000,
                });
                setIsTrue(true)
            } else {
                toastManager.add({
                    title: "Invalid proof code",
                    description: "The proof code you entered is incorrect.",
                    type: "error",
                    timeout: 3000,
                });
            }
        } catch (err: any) {
            if (id) toastManager.close(id);

            toastManager.add({
                title: "Verification failed",
                description: err.message || "Something went wrong while verifying the code.",
                type: "error",
                timeout: 3000,
            });
        }
    };


    return (
        <BorderLayout id='verify-page' className='mt-3 border-t'>
            <CrossSVG className="absolute -left-3 -top-3 " />
            <CrossSVG className="absolute -right-3 -top-3" />

            <div className="seciton-py">
                <div className="text-center">
                    <div className='font-matter space-y-4 pb-8 flex flex-col items-center justify-center text-center'>
                        {/* title */}
                        <div className='text-[32px] lg:text-[48px] text-[#141414] font-cal text-balance leading-tight'>
                            <h1>Verify Employment Proof</h1>
                        </div>
                        {/* description */}
                        <div className='text-base lg:text-lg text-gray-700 max-w-2xl'>
                            <h2>
                                Enter a proof code to verify employment status instantly
                            </h2>
                        </div>
                    </div>

                    <div className="w-full flex justify-center flex-col items-center gap-6">
                        <Card className="w-full max-w-xl shadow-md">
                            <CardHeader className='text-start'>
                                <CardTitle>Enter Proof Code</CardTitle>
                                <CardDescription>
                                    Proof codes are in the format: COMPANY_ID-EMPLOYEE_ID-TIMESTAMP
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form id="proofCode" onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className='text-start'>
                                        <FieldGroup className='gap-4'>
                                            <Controller
                                                control={form.control}
                                                name="proofCode"
                                                render={({ field, fieldState }) => (
                                                    <Field data-invalid={fieldState.invalid}>
                                                        <div className="flex items-center">
                                                            <FieldLabel htmlFor="proofCode">Proof Code  <span className="text-destructive">*</span></FieldLabel>
                                                        </div>
                                                        <Input
                                                            {...field}
                                                            aria-invalid={fieldState.invalid}
                                                            id="proofCode"
                                                            // type=""
                                                            // autoComplete=""
                                                            placeholder="enter the proof code"
                                                            spellCheck="false"
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                            <Field>
                                                <Button form="proofCode" type="submit" disabled={isSubmitting} className="w-full">
                                                    <LoadingSwap isLoading={isSubmitting}>Verify Proof Code</LoadingSwap>
                                                </Button>
                                            </Field>
                                            {isTrue && (
                                                <div className="*:not-first:mt-2">
                                                    <Label htmlFor={id}>Copy to clipboard</Label>
                                                    <div className="relative">
                                                        <Input
                                                            ref={inputRef}
                                                            id={id}
                                                            className="pe-9"
                                                            type="text"
                                                            defaultValue="pnpm install origin-ui"
                                                            readOnly
                                                        />
                                                        <TooltipProvider delayDuration={0}>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <button
                                                                        onClick={handleCopy}
                                                                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed"
                                                                        aria-label={copied ? "Copied" : "Copy to clipboard"}
                                                                        disabled={copied}
                                                                    >
                                                                        <div
                                                                            className={cn(
                                                                                "transition-all",
                                                                                copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                                                            )}
                                                                        >
                                                                            <CheckIcon
                                                                                className="stroke-emerald-500"
                                                                                size={16}
                                                                                aria-hidden="true"
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            className={cn(
                                                                                "absolute transition-all",
                                                                                copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                                                                            )}
                                                                        >
                                                                            <CopyIcon size={16} aria-hidden="true" />
                                                                        </div>
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="px-2 py-1 text-xs">
                                                                    Copy to clipboard
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </FieldGroup>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="w-full max-w-xl shadow-md text-start">
                            {/* <CardHeader className='text-start'>
                                <CardTitle>How Verification Works</CardTitle>
                            </CardHeader> */}
                            {/* <CardContent>
                                <h5>How Verification Works</h5>
                                <div className="flex items-start flex-wrap">
                                    <ShieldCheck className='size-4 text-[#6b7280]' />
                                    <p>Proof codes are generated by verified employees and stored securely on the Internet Computer blockchain.</p>
                                </div>
                                <div className="flex items-start flex-wrap">
                                    <Clock className='size-4 text-[#6b7280]' />
                                    <p>Each proof code is valid for 1 hour from lore the time of generation.</p>
                                </div>
                                <div className="flex items-start flex-wrap">
                                    <BadgeCheck className='size-4 text-[#6b7280]' />
                                    <p>Verification is instant and does not require authentication.</p>
                                </div>
                            </CardContent> */}
                            <CardContent className="space-y-4">
                                <h5 className="text-lg font-semibold text-gray-900">
                                    How Verification Works
                                </h5>

                                <div className="space-y-3">
                                    {/* Step 1 */}
                                    <div className="flex items-start gap-2">
                                        <div className="shrink-0 pt-1">
                                            <ShieldCheck className="size-4 text-gray-700" />
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            Proof codes are generated by verified employees and stored securely
                                            on the Internet Computer blockchain.
                                        </p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-start gap-2">
                                        <div className="shrink-0 pt-1">
                                            <Clock className="size-4 text-gray-700" />
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            Each proof code is valid for 1 hour from the time of generation.
                                        </p>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start gap-2">
                                        <div className="shrink-0 pt-1">
                                            <BadgeCheck className="size-4 text-gray-700" />
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            Verification is instant and does not require authentication.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </BorderLayout>
    )
}
