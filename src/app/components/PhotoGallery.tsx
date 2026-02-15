import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Camera } from "lucide-react";

const photos = [
  {
    url: new URL("../../assets/images/niyati-1.jpeg", import.meta.url).href,
    caption: "Nuestro momento especial"
  },
  {
    url: new URL("../../assets/images/niyati-2.jpeg", import.meta.url).href,
    caption: "Juntos para siempre"
  },
  {
    url: new URL("../../assets/images/niyati-3.jpeg", import.meta.url).href,
    caption: "Momentos inolvidables"
  },
  {
    url: new URL("../../assets/images/niyati-4.jpeg", import.meta.url).href,
    caption: "Mi persona favorita"
  }
];

export function PhotoGallery() {
  return (
    <section className="py-20 px-4 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-rose-500" />
            <h2 
              className="text-5xl md:text-6xl font-bold text-rose-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Moments with Niyati
            </h2>
          </div>
          <p 
            className="text-lg text-rose-700"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            A collection of our most cherished memories
          </p>
        </motion.div>

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry gutter="1.5rem">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-auto block transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p 
                    className="text-white text-lg font-medium"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}