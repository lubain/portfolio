// components/TestimonialsSection.tsx
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "../ui/Card";

export interface Testimonial {
  id: number;
  nom: string;
  poste: string;
  message: string;
  note: number;
}

interface TestimonialsSectionProps {
  temoignages: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  temoignages,
}) => {
  return (
    <section id="temoignages" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Témoignages</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ce que disent mes clients sur notre collaboration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {temoignages.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <div className="flex mb-4">
                  {[...Array(t.note)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{t.message}"
                </p>
                <div>
                  <p className="font-semibold">{t.nom}</p>
                  <p className="text-sm text-muted-foreground">{t.poste}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
