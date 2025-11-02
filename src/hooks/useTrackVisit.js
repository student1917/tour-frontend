import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../utils/config'


export const useTrackVisit = (tourId = null) => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const url = tourId ? `${BASE_URL}/visit/track/${tourId}` : `${BASE_URL}/visit/track`;

        const key = tourId ? `lastVisit_${tourId}` : "lastVisit_site";
        const lastVisit = localStorage.getItem(key);
        const now = Date.now();

        if (lastVisit && now - parseInt(lastVisit, 10) <  60 * 60 * 1000) {
          return;
        }

        await axios.post(url);
        localStorage.setItem(key, now.toString());
        console.log("Visit tracked successfully");
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    trackVisit();
  }, [tourId]);
};
