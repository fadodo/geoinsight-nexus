import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ContactFormFields } from "./ContactFormFields";
import { ContactFormData } from "./types";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export const ContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    try {
      setIsSubmitting(true);
      
      // Verify reCAPTCHA
      const recaptchaValue = await recaptchaRef.current?.executeAsync();
      if (!recaptchaValue) {
        throw new Error("Veuillez valider le reCAPTCHA");
      }

      // Insert into Supabase
      const { error: supabaseError } = await supabase
        .from("Contacts")
        .insert(values);

      if (supabaseError) throw supabaseError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('contact-notification', {
        body: values
      });

      if (emailError) throw emailError;

      toast({
        title: t("contact.success"),
        description: t("contact.successDetail"),
      });

      form.reset();
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t("contact.error"),
        description: t("contact.errorDetail"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactFormFields form={form} />
        
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
        </Button>
      </form>
    </Form>
  );
};