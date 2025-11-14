"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, UserProfile, Gamification } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  gamification: Gamification | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [gamification, setGamification] = useState<Gamification | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        setProfile(null);
        setGamification(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      // Carregar perfil
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Erro ao carregar perfil:', profileError);
      } else {
        setProfile(profileData);
      }

      // Carregar gamificação
      const { data: gamificationData, error: gamificationError } = await supabase
        .from('gamification')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (gamificationError && gamificationError.code !== 'PGRST116') {
        console.error('Erro ao carregar gamificação:', gamificationError);
      } else {
        setGamification(gamificationData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Tentar criar perfil inicial (pode falhar por RLS)
        try {
          const { error: profileError } = await supabase.from('user_profiles').insert({
            id: data.user.id,
            name,
            plan_type: 'free',
          });

          if (profileError && profileError.code !== '42501') {
            console.error('Erro ao criar perfil:', profileError);
          }
        } catch (err) {
          console.error('Erro ao criar perfil:', err);
        }

        // Tentar criar gamificação inicial (pode falhar por RLS)
        try {
          const { error: gamificationError } = await supabase.from('gamification').insert({
            user_id: data.user.id,
            level: 1,
            xp: 0,
            vita_points: 0,
            streak_days: 0,
          });

          if (gamificationError && gamificationError.code !== '42501') {
            console.error('Erro ao criar gamificação:', gamificationError);
          }
        } catch (err) {
          console.error('Erro ao criar gamificação:', err);
        }

        // Aguardar um pouco para garantir que os dados foram salvos
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Recarregar dados do usuário
        await loadUserData(data.user.id);

        // Redirecionar para a página principal
        router.push('/');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Aguardar um pouco para garantir que a sessão foi estabelecida
        await new Promise(resolve => setTimeout(resolve, 500));

        // Recarregar dados do usuário
        await loadUserData(data.user.id);

        // Redirecionar para a página principal
        router.push('/');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setGamification(null);
      
      router.push('/login');
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    await loadUserData(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        gamification,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
