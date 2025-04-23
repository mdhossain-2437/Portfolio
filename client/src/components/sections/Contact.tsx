import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SectionTitle from "@/components/ui/section-title";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
	Send,
	MessageSquare,
	MapPin,
	Mail,
	Phone,
	Loader2,
} from "lucide-react";

// Contact form validation schema
const contactFormSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	subject: z
		.string()
		.min(5, { message: "Subject must be at least 5 characters." }),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactProps {
	onChatOpen: () => void;
}

export default function Contact({ onChatOpen }: ContactProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Initialize form with react-hook-form and zod validation
	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	// Form submission handler
	const onSubmit = async (data: ContactFormValues) => {
		setIsSubmitting(true);

		try {
			// This would typically send data to a server endpoint
			// For now we'll simulate a network request
			await new Promise((resolve) => setTimeout(resolve, 1500));

			console.log("Form submitted:", data);

			// Reset the form after successful submission
			form.reset();

			// Show success message
			toast({
				title: "Message Sent Successfully!",
				description: "Thanks for reaching out. I'll get back to you soon.",
			});
		} catch (error) {
			// Show error message
			toast({
				title: "Something went wrong",
				description: "Your message couldn't be sent. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handler for chat button click
	const handleChatClick = useCallback(() => {
		onChatOpen();
	}, [onChatOpen]);

	return (
		<section id="contact" className="py-24 relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950"></div>
				<div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl -top-48 -right-48"></div>
				<div className="absolute w-96 h-96 bg-secondary/5 rounded-full blur-3xl -bottom-48 -left-48"></div>
			</div>

			<div className="container mx-auto px-6">
				<SectionTitle
					title="Get In Touch"
					highlight="Touch"
					subtitle="Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!"
					startDelay={300}
					isHero={false}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-16">
					{/* Contact Info - 2 columns on large screens */}
					<div className="lg:col-span-2 glass-dark rounded-xl p-8 border border-gray-800">
						<h3 className="text-2xl font-bold mb-6">Contact Information</h3>

						<div className="space-y-6">
							<div className="flex items-start">
								<div className="bg-primary/10 p-3 rounded-lg mr-4">
									<Mail className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h4 className="text-lg font-semibold">Email</h4>
									<a
										href="mailto:contact@delowarhossain.dev"
										className="text-gray-400 hover:text-primary transition-colors"
									>
										contact@delowarhossain.dev
									</a>
								</div>
							</div>

							<div className="flex items-start">
								<div className="bg-secondary/10 p-3 rounded-lg mr-4">
									<Phone className="w-5 h-5 text-secondary" />
								</div>
								<div>
									<h4 className="text-lg font-semibold">Phone</h4>
									<a
										href="tel:+8809696053134"
										className="text-gray-400 hover:text-secondary transition-colors"
									>
										+8809696053134
									</a>
								</div>
							</div>

							<div className="flex items-start">
								<div className="bg-accent/10 p-3 rounded-lg mr-4">
									<MapPin className="w-5 h-5 text-accent" />
								</div>
								<div>
									<h4 className="text-lg font-semibold">Location</h4>
									<p className="text-gray-400">Dhaka, Bangladesh</p>
								</div>
							</div>
						</div>

						{/* Quick chat option */}
						<div className="mt-10 pt-8 border-t border-gray-800">
							<h4 className="text-lg font-semibold mb-4">
								Need a quick response?
							</h4>
							<motion.button
								onClick={handleChatClick}
								className="neo-brutal bg-gray-800 text-white w-full py-4 rounded-lg flex items-center justify-center group"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<MessageSquare className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
								<span>Start a Chat</span>
							</motion.button>
							<p className="text-sm text-gray-400 mt-3 text-center">
								I'm usually available during my working hours.
							</p>
						</div>
					</div>

					{/* Contact Form - 3 columns on large screens */}
					<div className="lg:col-span-3">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Your Name</FormLabel>
												<FormControl>
													<Input
														placeholder="John Doe"
														{...field}
														className="glass-dark border-gray-700"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input
														placeholder="example@domain.com"
														{...field}
														className="glass-dark border-gray-700"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="subject"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subject</FormLabel>
											<FormControl>
												<Input
													placeholder="How can I help you?"
													{...field}
													className="glass-dark border-gray-700"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Message</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Tell me about your project or inquiry..."
													{...field}
													className="glass-dark border-gray-700 min-h-[150px] resize-none"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end">
									<Button
										type="submit"
										className="neo-brutal bg-primary text-white px-8 py-6 h-auto text-base"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												Sending...
											</>
										) : (
											<>
												<Send className="w-4 h-4 mr-2" />
												Send Message
											</>
										)}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>

				{/* Download Resume Button */}
				<motion.div
					className="text-center mt-20"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="neo-brutal inline-block bg-gray-800 text-white px-8 py-4 rounded-lg group relative overflow-hidden"
					>
						<span className="absolute inset-0 w-full h-full bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
						<span className="relative z-10">Download Resume</span>
					</a>
				</motion.div>
			</div>
		</section>
	);
}
