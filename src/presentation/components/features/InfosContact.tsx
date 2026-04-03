import { Globe, Mail, Github, Linkedin } from "lucide-react";

const InfosContact = () => {
  return (
    <div className="md:col-span-2 space-y-8">
      <div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Informations
        </h4>
        <div className="space-y-4">
          <a
            href="mailto:fadhelubain@gmail.com"
            className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
              <Mail className="w-5 h-5" />
            </div>
            fadhelubain@gmail.com
          </a>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
              <Globe className="w-5 h-5" />
            </div>
            Antananarivo (Remote)
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Réseaux
        </h4>
        <div className="flex gap-4">
          <a
            href="https://github.com/lubain"
            target="_blank"
            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:-translate-y-1 flex items-center justify-center border border-slate-200 dark:border-white/10 transition-all text-slate-700 dark:text-white"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/zafindramanga-lubain-fadhel/"
            target="_blank"
            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/20 hover:-translate-y-1 flex items-center justify-center border border-slate-200 dark:border-white/10 transition-all text-slate-700 dark:text-white hover:border-[#0077b5]/50 hover:text-[#0077b5] dark:hover:text-[#0077b5]"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfosContact;
