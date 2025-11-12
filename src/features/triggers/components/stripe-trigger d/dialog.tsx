"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface StripeTriggerProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
};

export const StripeTriggerDialog = ({
    open,
    onOpenChange
}: StripeTriggerProps) => {

    const params = useParams()
    const workflowId = params.workflowId as string;

    //construct the webhook URL 
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`

    const copyToClipBoard = async () => {
        try {
            await navigator.clipboard.writeText(webhookUrl);
            toast.success("webhook URL copied to clipboard")
        } catch {
            toast.error("failed to copy URL")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Stripe trigger configuration</DialogTitle>
                    <DialogDescription>
                        Configure this webhook URL in your Stripe dashboard to trigger this workflow on payment events.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2 ">
                        <Label htmlFor="webhook-url">
                            Webhook URL
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="webhook-url"
                                value={webhookUrl}
                                readOnly
                                className="font-mono text-sm"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                onClick={copyToClipBoard}
                            >
                                <CopyIcon className="size-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 space-y-2">
                        <h4 className="font-medium text-sm">Setup instructions: </h4>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>Open your Stripe dashboard</li>
                            <li>Go to developers → Webhooks</li>
                            <li>Click "Add endpoint"</li>
                            <li>Paste the webhook URL above</li>
                            <li> Select events to listen for (e.g.,payment_intent.succeeded) </li>
                            <li>Save the signing secret</li>
                        </ol>
                    </div>

                    <div className="rounded-lg bg-muted p-4 space-y-2">
                        <h4 className="font-medium text-sm">Available Variables </h4>
                        <ul className="text-sm text-muted-foreground space-y-4">
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">{"{{stripe.amount}}"}</code>- Payment amount
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">{"{{stripe.currency}}"}</code>- Currency code
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">{"{{stripe.customerId}}"}</code>- Customer ID
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">{"{{json stripe}}"}</code>- full event data as json
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">{"{{stripe.eventType}}"}</code>- Event type (e.g., payment_intent.succeeded)
                            </li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
