import { useEffect, useState } from "react";

interface MicrolinkResponse {
  data?: {
    screenshot?: {
      url: string;
    };
  };
}

export const useProjectScreenshot = (siteUrl: string) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&screenshot=true&viewport.width=1200&viewport.height=800`;
        const response = await fetch(apiUrl);
        const data: MicrolinkResponse = await response.json();

        if (data.data?.screenshot?.url) {
          setImageUrl(data.data.screenshot.url);
        } else {
          setError("Screenshot not available");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch screenshot",
        );
      } finally {
        setLoading(false);
      }
    };

    if (siteUrl && siteUrl !== "#") {
      fetchScreenshot();
    }
  }, [siteUrl]);

  return { imageUrl, loading, error };
};
