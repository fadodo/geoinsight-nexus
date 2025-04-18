import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Events = () => {
  const { t } = useTranslation();

  const events = [
    {
      id: "webinar",
      title: t("events.webinar.title"),
      description: t("events.webinar.description"),
      date: "2024-02-15",
      time: "14:00",
      location: t("events.online"),
      type: t("events.types.webinar"),
      maxParticipants: 100,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: "workshop",
      title: t("events.workshop.title"),
      description: t("events.workshop.description"),
      date: "2024-03-01",
      time: "09:30",
      location: "Paris",
      type: t("events.types.workshop"),
      maxParticipants: 20,
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833"
    },
    {
      id: "conference",
      title: t("events.conference.title"),
      description: t("events.conference.description"),
      date: "2024-04-10",
      time: "10:00",
      location: "Lyon",
      type: t("events.types.conference"),
      maxParticipants: 200,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          {t("events.title")}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground mb-12 max-w-2xl"
        >
          {t("events.description")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {event.type}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <time dateTime={event.date}>
                        {new Date(event.date).toLocaleDateString()}
                      </time>
                      <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{t("events.maxParticipants", { count: event.maxParticipants })}</span>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to={`/events/${event.id}`}>
                      {t("events.register")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;