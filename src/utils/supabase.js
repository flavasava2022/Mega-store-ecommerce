import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oyzeyafuhhqwknrotmts.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95emV5YWZ1aGhxd2tucm90bXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzUxMDgsImV4cCI6MjA2Mzg1MTEwOH0.VqbVGy15d2rf13gBVwbgVYD_t_3MzUCZ1u1xf-tSklI"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  multiTab: false,
});
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

export async function handleSignIn(userData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData?.email,
    password: userData?.password,
  });
  if (error) {
    return { errorMsg: error.error_description || error.message };
  } else {
    if (data) {
      return;
    }
  }
}



