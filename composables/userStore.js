import { useLocalStorage } from "@vueuse/core";
import { ROLE_USER } from "~~/constants";

export const useProfileStore = defineStore("user", {
  state: () => ({ user: useLocalStorage("supauser", {}) }),
  hydrate(state) {
    state.user = useLocalStorage("supauser", {});
  },
  getters: {
    userProfile: (state) => state.user,
    isLoggedIn: (state) => Object.keys(state.user || {}).length > 0,
  },
  actions: {
    update(payload) {
      this.user = payload;
    },

    async signIn({ email, password }) {
      try {
        const client = useSupabaseClient();
        const { user, error } = await client.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        const { data, error: selectError } = await client
          .from("users")
          .select()
          .eq("user_id", user.id)
          .single();
        if (selectError) throw selectError;
        this.update(data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async signUp(credential) {
      const { email, password, firstName, lastName } = credential;
      try {
        const client = useSupabaseClient();
        const { user, error } = await client.auth.signUp(
          {
            email,
            password,
          },
          {
            data: { role: ROLE_USER },
          }
        );
        if (error) throw error;

        const userData = {
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          role: ROLE_USER,
        };
        const { error: insertError } = await client
          .from("users")
          .insert(userData, {
            returning: "minimal",
          });
        if (insertError) throw insertError;
      } catch (error) {
        throw error;
      }
    },

    async signOut() {
      const client = useSupabaseClient();
      client.auth.signOut();
      this.update(null);
    },
  },
});
