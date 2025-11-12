import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, User } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  mobile: z.string().trim().min(10, "Valid mobile number required").max(15),
  email: z.string().trim().email("Valid email required").max(255),
  city: z.string().trim().min(1, "City is required").max(100),
  userType: z.enum(["dealer", "distributor", "customer", "detailing-studio"], {
    required_error: "Please select who you are",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Track lead event with Meta Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_category: data.userType,
          content_name: 'Contact Form Submission'
        });
      }
      
      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-brand-gold/30 shadow-xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 text-brand-primary mb-2">
              <User className="h-4 w-4" />
              Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className="border-brand-royal-blue/30"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="mobile" className="flex items-center gap-2 text-brand-primary mb-2">
              <Phone className="h-4 w-4" />
              Mobile Number
            </Label>
            <Input
              id="mobile"
              {...register("mobile")}
              placeholder="Your mobile number"
              className="border-brand-royal-blue/30"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2 text-brand-primary mb-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className="border-brand-royal-blue/30"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city" className="flex items-center gap-2 text-brand-primary mb-2">
              <MapPin className="h-4 w-4" />
              City
            </Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="Your city"
              className="border-brand-royal-blue/30"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="userType" className="text-brand-primary mb-2 block">
              Who I Am
            </Label>
            <Select
              onValueChange={(value) => setValue("userType", value as any)}
            >
              <SelectTrigger className="border-brand-royal-blue/30">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="dealer">Dealer</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="detailing-studio">Detailing Studio</SelectItem>
              </SelectContent>
            </Select>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-primary font-semibold shadow-[0_0_20px_rgba(255,193,7,0.3)]"
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
