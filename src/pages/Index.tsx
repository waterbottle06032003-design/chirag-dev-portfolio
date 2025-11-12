import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sun, Download, Mail, Phone, MapPin, Linkedin, Github, Instagram, ExternalLink } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    
    window.location.href = `mailto:chiragparmarbuilds@gmail.com?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(
      `${message}\n\nFrom: ${name} (${email})`
    )}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const skills = [
    { title: "Languages", items: "Java, J2EE, HTML, CSS, JavaScript, SQL" },
    { title: "Frameworks", items: "Spring, Spring Boot, Hibernate, Spring MVC" },
    { title: "Databases", items: "MySQL, PostgreSQL" },
    { title: "Tools & Platforms", items: "GitHub, Eclipse, IntelliJ IDEA" },
  ];

  const projects = [
    {
      title: "E-commerce Store",
      description: "Developed using Spring Boot with functionalities for users and admins. Integrated Spring Security for authentication and authorization. Admins can manage inventory and apply discounts.",
    },
    {
      title: "Online Resume Builder",
      description: "Built a web-based resume builder using Spring Boot, Hibernate, and Thymeleaf. Added authentication using Spring Security and stored data in MySQL.",
    },
    {
      title: "Student Registration Module",
      description: "Account management module built using JSP and Servlets, handling personal information and document uploads efficiently for 100+ users.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Chirag Parmar</h1>
            
            <nav className="hidden md:flex gap-6">
              {["about", "skills", "projects", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium transition-colors hover:text-primary ${
                    activeSection === section ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {section}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button className="hidden sm:flex gap-2">
                <Download className="h-4 w-4" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slideInLeft">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-primary">Chirag Parmar</span> 👋
              </h2>
              <p className="text-xl text-muted-foreground">
                Motivated and detail-oriented <span className="font-semibold text-foreground">Java Full Stack Developer</span> passionate about building scalable web applications using Spring Boot, Hibernate, JSP, and Servlets.
              </p>
              <p className="text-muted-foreground">
                Currently pursuing MCA at S.V. Institute of Management (CGPI: 8.67)
              </p>
              
              <div className="flex flex-col gap-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Kadi, Gujarat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:chiragparmarbuilds@gmail.com" className="hover:text-primary transition-colors">
                    chiragparmarbuilds@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 7228059945</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="http://linkedin.com/in/chirag-parmar-7aba22275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-card-foreground/10 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/chiragparmar-builds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-card-foreground/10 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/chiragparmar420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card hover:bg-card-foreground/10 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="flex justify-center animate-slideInRight">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-glow"></div>
                <img
                  src={profilePhoto}
                  alt="Chirag Parmar"
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border/50"
              >
                <h3 className="text-xl font-bold mb-3 text-primary">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.items}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border/50 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 border-l-2 border-primary">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
              <Card className="p-6 mb-8 bg-card border-border/50">
                <h3 className="text-xl font-bold text-primary mb-2">
                  Java Full Stack Intern
                </h3>
                <p className="text-muted-foreground mb-2">QSpiders, Ahmedabad</p>
                <p className="text-sm text-muted-foreground mb-4">Dec 2024 – Jun 2025</p>
                <p className="text-foreground">
                  Learning development, debugging, and Agile practices through real-world Java-based projects.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <Card className="max-w-2xl mx-auto p-8 bg-card border-border/50">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 bg-background">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Chirag Parmar • Java Full Stack Developer</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
