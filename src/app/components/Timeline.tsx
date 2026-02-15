import { motion } from "motion/react";
import { Calendar, MapPin, Heart, Sparkles, Star, Coffee } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "February, 2023",
    title: "First Meeting",
    description: "The time we met at your aunt's house... I was so nervous I couldn't even look you in the eye.",
    icon: <Coffee className="w-6 h-6" />
  },
  {
    date: "March, 2023",
    title: "First Date",
    description: "Our first date! We went to the movies and even played Uno while waiting for the film to start. We had such a great time together",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    date: "April 26, 2023",
    title: "Became Official",
    description: "The moment I asked you to be mine and you said yes. Since we didn't know when our relationship actually started, that was necessary haha. Best decision we ever made.",
    icon: <Heart className="w-6 h-6" />
  },
  {
    date: "May, 2023",
    title: "Surprise at the Academy",
    description: "The day I surprised you at your academy and gave you Liam, our bear.",
    icon: <MapPin className="w-6 h-6" />
  },
  {
    date: "July-August, 2023",
    title: "The Goodbye Promise",
    description: "The day I went to your house to say goodbye before you left for Spain, and we made a promise to see each other again.",
    icon: <Star className="w-6 h-6" />
  },
  {
    date: "February 17, 2026",
    title: "Today",
    description: "Celebrating you and all the beautiful moments we've shared. Here's to many more!",
    icon: <Heart className="w-6 h-6" />
  }
];

export function Timeline() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-rose-50 via-pink-50 to-cream-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-5xl md:text-6xl font-bold text-rose-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Love Story
          </h2>
          <p 
            className="text-lg text-rose-700"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            A timeline of unforgettable moments
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-300 hidden md:block" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col`}
            >
              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-rose-100">
                  <div className="flex items-center gap-3 mb-3" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                    <Calendar className="w-4 h-4 text-rose-500" />
                    <span 
                      className="text-sm font-semibold text-rose-600"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {event.date}
                    </span>
                  </div>
                  <h3 
                    className="text-2xl font-bold text-rose-900 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {event.title}
                  </h3>
                  <p 
                    className="text-gray-700"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Center Icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hidden md:flex z-10">
                {event.icon}
              </div>

              {/* Mobile Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg md:hidden mb-4">
                {event.icon}
              </div>

              {/* Spacer for other side */}
              <div className="w-full md:w-5/12 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
