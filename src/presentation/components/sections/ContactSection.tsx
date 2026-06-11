import { FadeIn } from "@/presentation/components/ui/FadeIn";
import InfosContact from "@/presentation/components/features/InfosContact";
import FormContact from "@/presentation/components/features/FormContact";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import { contactSectionTranslations } from "@/presentation/shared/constantes/translations";

const ContactSection: React.FC = () => {
  const language = useNavbarStore((state) => state.language);
  const copy = contactSectionTranslations[language];

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-transparent to-sky-50 dark:to-[#030d1a] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="bg-white/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/40 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                {copy.title}
              </h2>
              <p className="text-slate-600 dark:text-sky-200">
                {copy.description}
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-12 relative z-10">
              <InfosContact />
              <FormContact />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
