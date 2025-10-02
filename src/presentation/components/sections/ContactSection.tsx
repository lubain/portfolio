import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Facebook } from "lucide-react";
import Button from "../ui/Button";

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Contact</h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Vous avez un projet en tête ? Contactez-moi pour discuter de vos
            besoins et transformer vos idées en réalité.
          </p>

          {/* Bloc téléphone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 text-lg font-medium text-primary mb-6"
          >
            <Phone className="w-5 h-5" />
            <a href="tel:+261320639218" className="hover:underline">
              +261 32 06 392 18
            </a>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <a
              href="https://www.linkedin.com/in/zafindramanga-lubain-fadhel/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.facebook.com/fadhellubain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </a>
          </motion.div>

          {/* Bouton email */}
          <Button size="lg" className="text-lg px-8 py-3">
            <Mail className="mr-2 w-5 h-5" />
            Me contacter
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
