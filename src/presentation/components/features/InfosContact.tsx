import { Globe, Mail, Github, Linkedin } from "lucide-react";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import { contactSectionTranslations } from "@/presentation/shared/constantes/translations";

const InfosContact = () => {
  const language = useNavbarStore((state) => state.language);
  const copy = contactSectionTranslations[language];

  return (
    <div className="md:col-span-2 space-y-8">
      <div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {copy.infoTitle}
        </h4>
        <div className="space-y-4">
          <a
            href="mailto:fadhelubain@gmail.com"
            className="flex items-center gap-3 text-slate-600 dark:text-sky-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center border border-sky-200 dark:border-sky-700/40"
              aria-hidden="true"
            >
              <Mail className="w-5 h-5" />
            </div>
            fadhelubain@gmail.com
          </a>
          <div className="flex items-center gap-3 text-slate-600 dark:text-sky-300">
            <div
              className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center border border-sky-200 dark:border-sky-700/40"
              aria-hidden="true"
            >
              <Globe className="w-5 h-5" />
            </div>
            {copy.location}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {copy.networksTitle}
        </h4>
        <div className="flex gap-4">
          <a
            href="https://github.com/lubain"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Profil GitHub de Lubain Fadhel (nouvel onglet)"
            className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-800/40 hover:-translate-y-1 flex items-center justify-center border border-sky-200 dark:border-sky-700/40 transition-all text-slate-700 dark:text-sky-200"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/zafindramanga-lubain-fadhel/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Profil LinkedIn de Lubain Fadhel (nouvel onglet)"
            className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 hover:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/20 hover:-translate-y-1 flex items-center justify-center border border-sky-200 dark:border-sky-700/40 transition-all text-slate-700 dark:text-sky-200 hover:border-[#0077b5]/50 hover:text-[#0077b5]"
          >
            <Linkedin className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfosContact;
