import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useContactSection } from "@/presentation/hooks/useContactSection";
import { useNavbarStore } from "@/presentation/store/useNavbarStore";
import { contactSectionTranslations } from "@/presentation/shared/constantes/translations";

const inputClass =
  "w-full bg-sky-50 dark:bg-[#030d1a]/60 border border-sky-200 dark:border-sky-800/50 rounded-xl px-4 py-3 text-slate-900 dark:text-sky-100 placeholder:text-slate-400 dark:placeholder:text-sky-300/30 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all";

const FormContact = () => {
  const language = useNavbarStore((state) => state.language);
  const copy = contactSectionTranslations[language];
  const { formState, formData, setFormState, handleChange, handleSubmit } =
    useContactSection();

  return (
    <div className="md:col-span-3">
      {formState === "success" ? (
        <div className="h-full flex flex-col items-center justify-center gap-4 py-12 text-center">
          <CheckCircle className="w-16 h-16 text-sky-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {copy.successTitle}
          </h3>
          <p className="text-slate-500 dark:text-sky-200/60">
            {copy.successDescription}
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="mt-4 px-6 py-2 rounded-xl border border-sky-400 text-sky-500 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all"
          >
            {copy.sendAnother}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {formState === "error" && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {copy.error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-sky-200/80 ml-1">
                {copy.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder={copy.namePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-sky-200/80 ml-1">
                {copy.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-sky-200/80 ml-1">
              {copy.message}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className={inputClass + " resize-none"}
              placeholder={copy.messagePlaceholder}
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
            aria-label={copy.send}
            className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold transition-all hover:shadow-[0_0_20px_-5px_rgba(56,189,248,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {formState === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {copy.sending}
              </>
            ) : (
              copy.send
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FormContact;
