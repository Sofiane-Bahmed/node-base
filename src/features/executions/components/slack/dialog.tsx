"use client"

import { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";



export type SlackFormValues = z.infer<typeof formSchema>;

interface SlackDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onSubmit: (values: z.infer<typeof formSchema>) => void,
    defaultValues?: Partial<SlackFormValues>
};

export const formSchema = z.object({
    variableName: z
        .string()
        .min(1, { message: "Variable name is required " })
        .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
            message: "variable name must start with a letter oe underscore and contain only letters, numbers, and underscores"
        }),
    content: z.string()
        .min(1, { message: "Message content is required " }),
    webhookUrl: z.string().min(1, { message: "Webhook URL is required " })
});

export const SlackDialog = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues = {},
}: SlackDialogProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            variableName: defaultValues.variableName || "",
            content: defaultValues.content || "",
            webhookUrl: defaultValues.webhookUrl || ""
        },
    });

    //reset form values when dialog opens with new defaults
    useEffect(() => {
        if (open) {
            form.reset({
                variableName: defaultValues.variableName || "",
                content: defaultValues.content || "",
                webhookUrl: defaultValues.webhookUrl || ""
            });
        }
    }, [
        open,
        defaultValues,
        form
    ])

    const watchVariableName = form.watch("variableName") || "mySlack";

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Slack Configuration</DialogTitle>
                    <DialogDescription>
                        Configure slac webhook settings for this node.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="variableName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Variable Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="mySlack"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        use this name to reference the resullt in other nodes: {" "} {`{{${watchVariableName}.text}}`}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="webhookUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>webhook URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://hooks.slack.com/services..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Get this from slack : Workspace settings → Workflows → webhooks
                                    </FormDescription>
                                    <FormDescription>
                                        Make sure the key is "content"
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message content </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Summary : {{myGemini.text}} "
                                            className="min-h-[80px] font-mono text-sm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        the message to. Use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="mt-4">
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
