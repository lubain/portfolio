import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useContactSection } from "@/presentation/hooks/useContactSection";

const FormContact = () => {
  const { formState, formData, setFormState, handleChange, handleSubmit } =
    useContactSection();
  return (
    <div className="md:col-span-3">
      {formState === "success" ? (
        <div className="h-full flex flex-col items-center justify-center gap-4 py-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Message envoyé !
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Merci, je vous répondrai dans les plus brefs délais.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="mt-4 px-6 py-2 rounded-xl border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {formState === "error" && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Une erreur est survenue. Veuillez réessayer.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="Nom Prenom"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
              placeholder="Parlez-moi de votre idée..."
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={
              formState === "loading" ||
              !formData.name ||
              !formData.email ||
              !formData.message
            }
            aria-label="Envoyer le message"
            className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold transition-all hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {formState === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer le message"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FormContact;
