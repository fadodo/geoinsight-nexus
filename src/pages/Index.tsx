import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Globe2, Database, Map as MapIcon, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/HeroCarousel";

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6 bg-muted/50 backdrop-blur-sm rounded-lg hover:bg-muted/70 transition-colors"
  >
    <Icon className="w-10 h-10 text-primary mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const ValueCard = ({ title, description }: { title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="p-6 border rounded-lg hover:border-primary transition-colors backdrop-blur-sm bg-background/50"
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen">
        <HeroCarousel />
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              {t("home.hero.title")}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white"
            >
              {t("home.hero.subtitle")}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" variant="default" className="bg-primary hover:bg-primary/90">
                <Link to="/contact" className="flex items-center">
                  {t("home.hero.contact")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90">
                <Link to="/services">
                  {t("home.hero.cta")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section with Glassmorphism */}
      <section className="py-20 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            {t("home.services.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              icon={Globe2}
              title={t("home.services.acquisition.title")}
              description={t("home.services.acquisition.description")}
            />
            <ServiceCard 
              icon={Database}
              title={t("home.services.processing.title")}
              description={t("home.services.processing.description")}
            />
            <ServiceCard 
              icon={MapIcon}
              title={t("home.services.mapping.title")}
              description={t("home.services.mapping.description")}
            />
            <ServiceCard 
              icon={HeartHandshake}
              title={t("home.services.consulting.title")}
              description={t("home.services.consulting.description")}
            />
          </div>
        </div>
      </section>

      {/* Values Section with Glassmorphism */}
      <section className="py-20 bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            {t("home.values.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard 
              title={t("home.values.innovation.title")}
              description={t("home.values.innovation.description")}
            />
            <ValueCard 
              title={t("home.values.quality.title")}
              description={t("home.values.quality.description")}
            />
            <ValueCard 
              title={t("home.values.proximity.title")}
              description={t("home.values.proximity.description")}
            />
            <ValueCard 
              title={t("home.values.listening.title")}
              description={t("home.values.listening.description")}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
