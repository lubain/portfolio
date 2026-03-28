import { Globe, Mail, Github, Linkedin } from "lucide-react";
import { FadeIn } from "../ui/FadeIn";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-100 dark:to-[#0a0f1d] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Prêt à collaborer ?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Que ce soit pour un projet freelance, une offre d'emploi ou
                simplement pour échanger sur la tech.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-12 relative z-10">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Informations
                  </h4>
                  <div className="space-y-4">
                    <a
                      href="mailto:hello@example.com"
                      className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                        <Mail className="w-5 h-5" />
                      </div>
                      fadhelubain@gmail.com
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                        <Globe className="w-5 h-5" />
                      </div>
                      Antananarivo (Remote)
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Réseaux
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:-translate-y-1 flex items-center justify-center border border-slate-200 dark:border-white/10 transition-all text-slate-700 dark:text-white"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/20 hover:-translate-y-1 flex items-center justify-center border border-slate-200 dark:border-white/10 transition-all text-slate-700 dark:text-white hover:border-[#0077b5]/50 hover:text-[#0077b5] dark:hover:text-[#0077b5]"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                      placeholder="Parlez-moi de votre idée..."
                    ></textarea>
                  </div>
                  <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] active:scale-[0.98]">
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
