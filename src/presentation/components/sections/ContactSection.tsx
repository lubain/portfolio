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
      className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-100 dark:to-[#0a0f1d] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                {copy.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
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
