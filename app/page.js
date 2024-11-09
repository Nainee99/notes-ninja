"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  BrainCircuit,
  FileText,
  Sparkles,
  Check,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Scroll animations for main section
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const descriptionOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const descriptionY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const buttonY = useTransform(scrollYProgress, [0, 0.3], [0, -20]);

  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName,
    });
    console.log(result);
  };

  useEffect(() => {
    user && checkUser();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">
              NotesNinja
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button className="hidden md:inline-flex rounded-full bg-purple-600 text-white hover:bg-purple-700 outline-none">
              Sign Up
            </Button>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section with Enhanced Animations */}
        <section className="py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1
                className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-purple-100"
                style={{ opacity: titleOpacity, y: titleY }}
              >
                Turn PDFs into Powerful Insights with NotesNinja
              </motion.h1>
              <motion.p
                className="text-xl mb-8 text-gray-300"
                style={{ opacity: descriptionOpacity, y: descriptionY }}
              >
                Harness the power of AI to extract, summarize, and organize your
                PDF notes effortlessly.
              </motion.p>
              <motion.div style={{ opacity: buttonOpacity, y: buttonY }}>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
            <div className="md:w-1/2 relative">
              <motion.div
                className="w-full h-[400px] bg-blue-500 rounded-lg shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/hero.png"
                  alt="AI-powered note-taking illustration"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br opacity-75 mix-blend-overlay"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section with Scroll Animations */}
        <section id="features" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-100">
              Supercharge Your Note-Taking
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BrainCircuit className="h-12 w-12 text-purple-400" />,
                  title: "Smart Summarization",
                  description:
                    "AI-powered technology condenses lengthy PDFs into concise, actionable summaries.",
                },
                {
                  icon: <FileText className="h-12 w-12 text-blue-400" />,
                  title: "Quick Note Extraction",
                  description:
                    "Instantly pull out key points and annotations from any PDF document.",
                },
                {
                  icon: <BookOpen className="h-12 w-12 text-purple-400" />,
                  title: "Organized Note Saving",
                  description:
                    "Automatically categorize and store your notes for easy retrieval and review.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gray-700">
                    <CardHeader>
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="text-purple-100">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Improved Pricing Section with Animations */}
        <section id="pricing" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-100">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Free",
                  price: "$0",
                  description: "Perfect for casual users",
                  features: [
                    "5 PDF uploads per month",
                    "Basic summarization",
                    "Limited note extraction",
                    "7-day history",
                  ],
                },
                {
                  name: "Pro",
                  price: "$9.99",
                  description: "Ideal for students and professionals",
                  features: [
                    "Unlimited PDF uploads",
                    "Advanced AI summarization",
                    "Full note extraction and organization",
                    "30-day history",
                    "Priority support",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "For teams and organizations",
                  features: [
                    "All Pro features",
                    "Custom AI model training",
                    "API access",
                    "Unlimited history",
                    "Dedicated account manager",
                    "SSO and advanced security",
                  ],
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`flex flex-col ${index === 1 ? "border-purple-400 border-2" : ""} bg-gray-700`}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-purple-100">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-xl font-semibold text-gray-300">
                        {plan.price}
                        {plan.name !== "Enterprise" && "/month"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-300 mb-4">{plan.description}</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-gray-200">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 mt-auto">
                      <Button
                        className="w-full"
                        variant={index === 1 ? "default" : "outline"}
                      >
                        {index === 2 ? "Contact Sales" : "Get Started"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section with Animations */}
        <section id="faq" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-100">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              {[
                {
                  question: "How does NotesNinja work?",
                  answer:
                    "NotesNinja uses advanced AI algorithms to analyze your PDF documents, extract key information, and generate concise summaries. It organizes the extracted notes into easily digestible formats, making it simple to review and retain important information.",
                },
                {
                  question: "Is my data secure with NotesNinja?",
                  answer:
                    "Yes, we take data security very seriously. All uploaded PDFs and generated notes are encrypted and stored securely. We never share your data with third parties, and you can delete your data at any time.",
                },
                {
                  question: "Can I use NotesNinja offline?",
                  answer:
                    "Currently, NotesNinja requires an internet connection to process PDFs and generate summaries. However, once your notes are generated, you can access them offline through our mobile app.",
                },
                {
                  question: "What types of PDFs does NotesNinja support?",
                  answer:
                    "NotesNinja supports a wide range of PDF types, including academic papers, business reports, e-books, and more. Our AI is trained on diverse content and can adapt to various document structures and writing styles.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`item-${index + 1}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Testimonials Section with Enhanced Animations */}
        <section id="testimonials" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-100">
              What Our Users Say
            </h2>
            <Carousel className="max-w-xl mx-auto">
              <CarouselContent>
                {[
                  {
                    name: "Alex Johnson",
                    role: "Graduate Student",
                    quote:
                      "NotesNinja has revolutionized my research process. I can quickly extract key information from lengthy academic papers.",
                    avatar: "/user1.jpeg",
                  },
                  {
                    name: "Sarah Lee",
                    role: "Business Analyst",
                    quote:
                      "This tool has saved me countless hours in summarizing reports. It's an indispensable part of my workflow now.",
                    avatar: "/user3.jpeg",
                  },
                  {
                    name: "Michael Chen",
                    role: "Software Engineer",
                    quote:
                      "The AI-powered summaries are incredibly accurate. NotesNinja helps me stay on top of technical documentation effortlessly.",
                    avatar: "/user2.jpg",
                  },
                ].map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-gray-700">
                        <CardContent className="flex flex-col items-center text-center p-6">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="rounded-full mb-4"
                            loading="lazy"
                          />
                          <blockquote className="text-lg mb-4 text-gray-300">
                            {testimonial.quote}
                          </blockquote>
                          <cite className="not-italic font-semibold text-gray-200">
                            {testimonial.name}
                          </cite>
                          <p className="text-sm text-gray-400">
                            {testimonial.role}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-gray-700 text-gray-200 hover:bg-gray-600" />
              <CarouselNext className="bg-gray-700 text-gray-200 hover:bg-gray-600" />
            </Carousel>
          </div>
        </section>

        {/* CTA Section with Animation */}
        <section className="py-20 bg-gradient-to-b from-purple-800 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Ninja Your Notes?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of users who have transformed their note-taking
                experience with NotesNinja.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-gray-800 text-purple-400 hover:bg-gray-700"
              >
                Try NotesNinja for Free
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold">NotesNinja</span>
              </div>
              <p className="mt-2 text-gray-400">
                Empowering your notes with AI
              </p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
              <a
                key={social}
                href={`https://${social}.com`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">{social}</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} NotesNinja. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
