import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../utils/supabase";

export const useFetch = (forceUpdate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null)
      try {
        const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

        setData(data || []);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    fetchData();
  }, [forceUpdate]);
  return { data, loading, error };
};
