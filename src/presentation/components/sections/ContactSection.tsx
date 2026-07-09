import { FadeIn } from "@/presentation/components/ui/FadeIn";
import InfosContact from "@/presentation/components/features/InfosContact";
import FormContact from "@/presentation/components/features/FormContact";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-transparent to-sky-50 dark:to-[#030d1a] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <InfosContact />
            <FormContact />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
