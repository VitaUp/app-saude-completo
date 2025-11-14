"use client";

import { useState, useEffect } from "react";
import { Home, Utensils, Dumbbell, Moon, MessageCircle, User, Plus, Droplet, Camera, Scan, TrendingUp, Award, Target, Zap, Heart, Activity, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function VitaUpApp() {
  const [activeTab, setActiveTab] = useState("home");
  const { user, profile, gamification, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redireciona para login se não estiver autenticado
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] animate-pulse"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null; // Retorna null enquanto redireciona
  }

  const userName = profile.name || "Campeão(a)";

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Renderiza a tela ativa */}
      {activeTab === "home" && <HomeScreen userName={userName} profile={profile} gamification={gamification} setActiveTab={setActiveTab} />}
      {activeTab === "nutrition" && <NutritionScreen userId={user.id} />}
      {activeTab === "workout" && <WorkoutScreen userId={user.id} />}
      {activeTab === "sleep" && <SleepScreen userName={userName} userId={user.id} />}
      {activeTab === "coach" && <CoachScreen userName={userName} profile={profile} />}
      {activeTab === "profile" && <ProfileScreen profile={profile} gamification={gamification} signOut={signOut} />}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <NavButton icon={Home} label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavButton icon={Utensils} label="Dieta" active={activeTab === "nutrition"} onClick={() => setActiveTab("nutrition")} />
          <NavButton icon={Dumbbell} label="Treino" active={activeTab === "workout"} onClick={() => setActiveTab("workout")} />
          <NavButton icon={Moon} label="Sono" active={activeTab === "sleep"} onClick={() => setActiveTab("sleep")} />
          <NavButton icon={MessageCircle} label="Coach" active={activeTab === "coach"} onClick={() => setActiveTab("coach")} />
          <NavButton icon={User} label="Perfil" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
        </div>
      </nav>
    </div>
  );
}

// Componente de botão de navegação
function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${
        active ? "text-[#62D8B5]" : "text-gray-400"
      }`}
    >
      <Icon className={`w-6 h-6 ${active ? "scale-110" : ""}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

// 🏠 HOME SCREEN
function HomeScreen({ userName, profile, gamification, setActiveTab }: any) {
  const level = gamification?.level || 1;
  const vitaPoints = gamification?.vita_points || 0;
  const streakDays = gamification?.streak_days || 0;
  const xp = gamification?.xp || 0;
  const xpForNextLevel = level * 500;
  const xpProgress = (xp / xpForNextLevel) * 100;

  return (
    <div className="pb-24 px-4 pt-8 max-w-md mx-auto">
      {/* Saudação CoachUp */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Olá, {userName}! 👋</h1>
            <p className="text-gray-600 mt-1">Bora começar leve e terminar forte!</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center">
            <span className="text-xl">🎯</span>
          </div>
        </div>
      </div>

      {/* Gamificação */}
      <div className="bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] rounded-3xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-3xl">💪</span>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Nível {level}</p>
              <p className="text-white/80 text-sm">Guerreiro(a) da Saúde</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-2xl">{vitaPoints.toLocaleString()}</p>
            <p className="text-white/80 text-xs">VitaPoints</p>
          </div>
        </div>
        <div className="bg-white/30 rounded-full h-3 overflow-hidden">
          <div className="bg-white h-full rounded-full" style={{ width: `${Math.min(xpProgress, 100)}%` }}></div>
        </div>
        <p className="text-white/90 text-sm mt-2">{xpForNextLevel - xp} XP para o próximo nível</p>
      </div>

      {/* Missão do Dia */}
      <div className="bg-white border-2 border-[#AEE2FF] rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#AEE2FF]/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-[#62D8B5]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Missão do Dia</p>
            <p className="text-sm text-gray-600">Beba 2L de água hoje</p>
          </div>
          <div className="text-2xl">🎯</div>
        </div>
      </div>

      {/* Cards Principais */}
      <div className="space-y-4 mb-6">
        {/* Nutrição */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#62D8B5]" />
              <h3 className="font-semibold text-gray-900">Nutrição</h3>
            </div>
            <button onClick={() => setActiveTab("nutrition")} className="text-[#62D8B5] text-sm font-medium">Ver mais</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="transform -rotate-90" width="80" height="80">
                <circle cx="40" cy="40" r="35" stroke="#F0F0F0" strokeWidth="8" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#62D8B5"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.65)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">65%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-900">1.300</p>
              <p className="text-sm text-gray-600">de 2.000 kcal</p>
              <p className="text-xs text-[#62D8B5] mt-1">Restam 700 kcal</p>
            </div>
          </div>
        </div>

        {/* Treino */}
        <div className="bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] rounded-2xl p-5 shadow-md text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5" />
              <h3 className="font-semibold">Treino de Hoje</h3>
            </div>
            <Award className="w-5 h-5" />
          </div>
          <p className="text-lg font-semibold mb-2">Treino de Hipertrofia - Peito</p>
          <div className="flex items-center gap-4 text-sm mb-4">
            <span>⏱️ 45 min</span>
            <span>🔥 350 kcal</span>
          </div>
          <button onClick={() => setActiveTab("workout")} className="w-full bg-white text-[#62D8B5] font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all duration-300">
            Iniciar Treino
          </button>
        </div>

        {/* Sono */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-[#AEE2FF]" />
              <h3 className="font-semibold text-gray-900">Sono</h3>
            </div>
            <button onClick={() => setActiveTab("sleep")} className="text-[#AEE2FF] text-sm font-medium">Ver mais</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="transform -rotate-90" width="80" height="80">
                <circle cx="40" cy="40" r="35" stroke="#F0F0F0" strokeWidth="8" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#AEE2FF"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.88)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">88%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-900">7h 30m</p>
              <p className="text-sm text-gray-600">de 8h meta</p>
              <p className="text-xs text-[#AEE2FF] mt-1">Qualidade excelente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border-2 border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#62D8B5] transition-all duration-300">
            <Plus className="w-6 h-6 text-[#62D8B5]" />
            <span className="text-sm font-medium text-gray-900">Registrar Refeição</span>
          </button>
          <button className="bg-white border-2 border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#AEE2FF] transition-all duration-300">
            <Droplet className="w-6 h-6 text-[#AEE2FF]" />
            <span className="text-sm font-medium text-gray-900">Registrar Água</span>
          </button>
          <button className="bg-white border-2 border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#62D8B5] transition-all duration-300">
            <Dumbbell className="w-6 h-6 text-[#62D8B5]" />
            <span className="text-sm font-medium text-gray-900">Adicionar Treino</span>
          </button>
          <button className="bg-white border-2 border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#AEE2FF] transition-all duration-300">
            <Heart className="w-6 h-6 text-[#AEE2FF]" />
            <span className="text-sm font-medium text-gray-900">Check-in Humor</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 🍽️ NUTRITION SCREEN
function NutritionScreen({ userId }: any) {
  const [nutritionLogs, setNutritionLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNutritionLogs();
  }, []);

  const loadNutritionLogs = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setNutritionLogs(data || []);
    } catch (error) {
      console.error('Erro ao carregar logs de nutrição:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = nutritionLogs.reduce((sum, log) => sum + log.calories, 0);
  const totalProtein = nutritionLogs.reduce((sum, log) => sum + (log.protein || 0), 0);
  const totalCarbs = nutritionLogs.reduce((sum, log) => sum + (log.carbs || 0), 0);
  const totalFats = nutritionLogs.reduce((sum, log) => sum + (log.fats || 0), 0);

  const calorieGoal = 2000;
  const proteinGoal = 120;
  const carbsGoal = 250;
  const fatsGoal = 65;

  const calorieProgress = (totalCalories / calorieGoal) * 100;

  return (
    <div className="pb-24 px-4 pt-8 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Nutrição</h1>
        <button className="w-12 h-12 rounded-full bg-[#62D8B5] flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Resumo de Calorias */}
      <div className="bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] rounded-3xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-28 h-28">
            <svg className="transform -rotate-90" width="112" height="112">
              <circle cx="56" cy="56" r="50" stroke="rgba(255,255,255,0.3)" strokeWidth="10" fill="none" />
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="white"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - Math.min(calorieProgress / 100, 1))}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">{totalCalories}</span>
              <span className="text-xs text-white/80">consumidas</span>
            </div>
          </div>
          <div className="text-white">
            <div className="mb-3">
              <p className="text-sm opacity-90">Meta</p>
              <p className="text-2xl font-bold">{calorieGoal} kcal</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Restante</p>
              <p className="text-xl font-semibold">{Math.max(0, calorieGoal - totalCalories)} kcal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrientes */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Macronutrientes</h3>
        <div className="space-y-4">
          <MacroBar label="Carboidratos" current={totalCarbs} goal={carbsGoal} color="#62D8B5" />
          <MacroBar label="Proteínas" current={totalProtein} goal={proteinGoal} color="#AEE2FF" />
          <MacroBar label="Gorduras" current={totalFats} goal={fatsGoal} color="#FFB84D" />
        </div>
      </div>

      {/* Refeições */}
      <div className="space-y-4">
        <MealSection 
          title="Café da Manhã" 
          icon="🌅" 
          logs={nutritionLogs.filter(log => log.meal_type === 'breakfast')}
        />
        <MealSection 
          title="Almoço" 
          icon="☀️" 
          logs={nutritionLogs.filter(log => log.meal_type === 'lunch')}
        />
        <MealSection 
          title="Jantar" 
          icon="🌙" 
          logs={nutritionLogs.filter(log => log.meal_type === 'dinner')}
        />
        <MealSection 
          title="Lanches" 
          icon="🍎" 
          logs={nutritionLogs.filter(log => log.meal_type === 'snack')}
        />
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <button className="bg-white border-2 border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#62D8B5] transition-all duration-300">
          <Scan className="w-6 h-6 text-[#62D8B5]" />
          <span className="text-xs font-medium text-gray-900">Scanner</span>
        </button>
        <button className="bg-white border-2 border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#62D8B5] transition-all duration-300">
          <Camera className="w-6 h-6 text-[#62D8B5]" />
          <span className="text-xs font-medium text-gray-900">Foto IA</span>
        </button>
        <button className="bg-white border-2 border-gray-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-[#AEE2FF] transition-all duration-300">
          <Droplet className="w-6 h-6 text-[#AEE2FF]" />
          <span className="text-xs font-medium text-gray-900">Água</span>
        </button>
      </div>
    </div>
  );
}

function MacroBar({ label, current, goal, color }: any) {
  const percentage = (current / goal) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">
          {current.toFixed(1)}g / {goal}g
        </span>
      </div>
      <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}

function MealSection({ title, icon, logs }: any) {
  const totalCalories = logs.reduce((sum: number, log: any) => sum + log.calories, 0);
  const isEmpty = logs.length === 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <span className="text-sm font-semibold text-[#62D8B5]">{totalCalories} kcal</span>
      </div>
      {isEmpty ? (
        <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm hover:border-[#62D8B5] hover:text-[#62D8B5] transition-all duration-300">
          + Adicionar alimento
        </button>
      ) : (
        <div className="space-y-2">
          {logs.map((log: any) => (
            <div key={log.id} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-[#62D8B5]"></div>
              {log.food_name} - {log.calories} kcal
            </div>
          ))}
          <button className="w-full py-2 text-[#62D8B5] text-sm font-medium hover:bg-[#62D8B5]/5 rounded-lg transition-all duration-300">
            + Adicionar mais
          </button>
        </div>
      )}
    </div>
  );
}

// 🏋️ WORKOUT SCREEN
function WorkoutScreen({ userId }: any) {
  return (
    <div className="pb-24 px-4 pt-8 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Treinos</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-[#AEE2FF] to-[#62D8B5] text-white rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          ✨ Gerar com IA
        </button>
      </div>

      {/* Treino do Dia */}
      <div className="bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] rounded-3xl p-6 mb-6 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-white" />
            <span className="text-white/90 text-sm font-medium">Treino de Hoje</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Hipertrofia - Peito e Tríceps</h2>
          <div className="flex items-center gap-4 text-white/90 text-sm mb-6">
            <span>⏱️ 45 minutos</span>
            <span>🔥 350 kcal</span>
            <span>💪 8 exercícios</span>
          </div>
          <button className="w-full bg-white text-[#62D8B5] font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg">
            Iniciar Treino Agora
          </button>
        </div>
      </div>

      {/* Categorias */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
        <div className="grid grid-cols-4 gap-3">
          <CategoryCard icon="💪" label="Hipertrofia" />
          <CategoryCard icon="🔥" label="Emagrecimento" />
          <CategoryCard icon="🤸" label="Funcional" />
          <CategoryCard icon="🧘" label="Yoga" />
          <CategoryCard icon="⚡" label="HIIT" />
          <CategoryCard icon="🏃" label="Aeróbico" />
          <CategoryCard icon="🎯" label="Core" />
          <CategoryCard icon="🤲" label="Mobilidade" />
        </div>
      </div>

      {/* Progresso Semanal */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Seu Progresso</h3>
          <span className="text-sm text-[#62D8B5] font-medium">Esta semana</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-32 mb-4">
          <WeekBar day="S" height={60} active />
          <WeekBar day="T" height={80} active />
          <WeekBar day="Q" height={70} active />
          <WeekBar day="Q" height={90} active />
          <WeekBar day="S" height={0} />
          <WeekBar day="S" height={0} />
          <WeekBar day="D" height={0} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-600">Consistência</p>
            <p className="text-2xl font-bold text-gray-900">4 dias</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Total</p>
            <p className="text-2xl font-bold text-[#62D8B5]">1.200 kcal</p>
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="bg-gradient-to-br from-[#FFB84D]/20 to-[#FF6B6B]/20 rounded-2xl p-5 border-2 border-[#FFB84D]/30">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFB84D] to-[#FF6B6B] flex items-center justify-center shadow-lg">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Streak de 4 dias! 🔥</p>
            <p className="text-sm text-gray-600">Continue assim, campeão!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ icon, label }: any) {
  return (
    <button className="bg-white border-2 border-gray-100 rounded-2xl p-3 flex flex-col items-center gap-2 hover:border-[#62D8B5] hover:scale-105 transition-all duration-300">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-gray-900 text-center">{label}</span>
    </button>
  );
}

function WeekBar({ day, height, active }: any) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: "100%" }}>
        {active && (
          <div
            className="w-full bg-gradient-to-t from-[#62D8B5] to-[#AEE2FF] rounded-t-lg transition-all duration-500"
            style={{ height: `${height}%` }}
          ></div>
        )}
      </div>
      <span className="text-xs text-gray-600 font-medium">{day}</span>
    </div>
  );
}

// 😴 SLEEP SCREEN
function SleepScreen({ userName, userId }: any) {
  return (
    <div className="pb-24 px-4 pt-8 max-w-md mx-auto bg-gradient-to-b from-[#0A0A0A] to-[#1a1a2e] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Sono</h1>
        <p className="text-gray-400">Última noite</p>
      </div>

      {/* Círculo Principal */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-64 h-64">
          <svg className="transform -rotate-90" width="256" height="256">
            <circle cx="128" cy="128" r="110" stroke="rgba(174, 226, 255, 0.1)" strokeWidth="16" fill="none" />
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="#AEE2FF"
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 110}`}
              strokeDashoffset={`${2 * Math.PI * 110 * (1 - 0.88)}`}
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_rgba(174,226,255,0.5)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white mb-1">7h 30m</span>
            <span className="text-gray-400 text-sm">de 8h meta</span>
            <div className="mt-3 px-4 py-1.5 bg-[#62D8B5]/20 rounded-full">
              <span className="text-[#62D8B5] text-sm font-semibold">88% Qualidade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <SleepMetric icon="🌙" label="Sono Leve" value="3h 20m" color="#AEE2FF" />
        <SleepMetric icon="💤" label="Sono Profundo" value="2h 45m" color="#62D8B5" />
        <SleepMetric icon="🧠" label="REM" value="1h 25m" color="#9D7CFF" />
        <SleepMetric icon="❤️" label="BPM Médio" value="58" color="#FF6B6B" />
      </div>

      {/* Gráfico de Fases */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6">
        <h3 className="font-semibold text-white mb-4">Fases do Sono</h3>
        <div className="flex items-end justify-between gap-1 h-32">
          {[40, 60, 80, 90, 70, 50, 60, 80, 90, 85, 70, 60].map((height, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-[#62D8B5] to-[#AEE2FF] rounded-t" style={{ height: `${height}%` }}></div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>23:00</span>
          <span>03:00</span>
          <span>06:30</span>
        </div>
      </div>

      {/* Detalhes */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6">
        <div className="space-y-4">
          <SleepDetail label="Horário de Dormir" value="23:15" />
          <SleepDetail label="Horário de Acordar" value="06:45" />
          <SleepDetail label="Vezes que Acordou" value="2 vezes" />
          <SleepDetail label="Eficiência" value="88%" />
        </div>
      </div>

      {/* CoachUp Sono */}
      <div className="bg-gradient-to-br from-[#AEE2FF]/20 to-[#62D8B5]/20 rounded-2xl p-5 border border-[#62D8B5]/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white mb-1">CoachUp</p>
            <p className="text-gray-300 text-sm">E aí, {userName}! Boa noite de sono, hein? Tenta dormir 20 min mais cedo hoje pra bater a meta. Bora! 💪</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SleepMetric({ icon, label, value, color }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function SleepDetail({ label, value }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

// 🤖 COACH SCREEN
function CoachScreen({ userName, profile }: any) {
  return (
    <div className="pb-24 px-4 pt-8 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CoachUp</h1>
        <p className="text-gray-600">Sua IA de saúde brasileira</p>
      </div>

      {/* Avatar CoachUp */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center shadow-2xl">
          <span className="text-5xl">🤖</span>
        </div>
      </div>

      {/* Mensagens */}
      <div className="space-y-4 mb-6">
        <CoachMessage
          message={`Bom dia, ${userName}! 🌅 Você dormiu bem, mas pode melhorar. Que tal tentar dormir 20 minutos mais cedo hoje?`}
          time="08:30"
        />
        <UserMessage message="Oi CoachUp! Como está meu progresso?" time="08:32" />
        <CoachMessage
          message="Tá arrasando! 🔥 Você treinou 4 dias essa semana e manteve as calorias no alvo. Só falta beber mais água, campeã!"
          time="08:32"
        />
        <CoachMessage
          message="Dica do dia: Que tal adicionar mais proteína no café da manhã? Vai te dar mais energia! 💪"
          time="08:33"
        />
      </div>

      {/* Recomendações do Dia */}
      <div className="bg-gradient-to-br from-[#AEE2FF]/20 to-[#62D8B5]/20 rounded-2xl p-5 border-2 border-[#62D8B5]/30 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#62D8B5]" />
          Recomendações de Hoje
        </h3>
        <div className="space-y-3">
          <RecommendationItem icon="💧" text="Beba 2L de água hoje" />
          <RecommendationItem icon="🥗" text="Adicione mais vegetais no almoço" />
          <RecommendationItem icon="🏃" text="Faça 10 min de caminhada após o jantar" />
        </div>
      </div>

      {/* Input de Mensagem */}
      <div className="fixed bottom-20 left-0 right-0 px-4 bg-white pb-4">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="Pergunte ao CoachUp..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
          />
          <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300">
            <MessageCircle className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CoachMessage({ message, time }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center flex-shrink-0">
        <span className="text-xl">🤖</span>
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
          <p className="text-sm text-gray-900">{message}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1 ml-2">{time}</span>
      </div>
    </div>
  );
}

function UserMessage({ message, time }: any) {
  return (
    <div className="flex items-start gap-3 flex-row-reverse">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <User className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1">
        <div className="bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] rounded-2xl rounded-tr-none p-4">
          <p className="text-sm text-white">{message}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1 mr-2 float-right">{time}</span>
      </div>
    </div>
  );
}

function RecommendationItem({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}

// 👤 PROFILE SCREEN
function ProfileScreen({ profile, gamification, signOut }: any) {
  const level = gamification?.level || 1;
  const vitaPoints = gamification?.vita_points || 0;
  const streakDays = gamification?.streak_days || 0;
  const achievements = gamification?.achievements?.length || 0;

  return (
    <div className="pb-24 px-4 pt-8 max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center shadow-2xl mb-4">
          <span className="text-5xl">💪</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{profile?.name || "Usuário"}</h2>
        <p className="text-gray-600">Nível {level} - Guerreiro(a) da Saúde</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Streak" value={streakDays.toString()} unit="dias" />
        <StatCard label="VitaPoints" value={vitaPoints.toLocaleString()} unit="pts" />
        <StatCard label="Conquistas" value={achievements.toString()} unit="medalhas" />
      </div>

      {/* Plano Atual */}
      <div className="bg-gradient-to-br from-[#FFB84D] to-[#FF6B6B] rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/90 text-sm mb-1">Plano Atual</p>
            <h3 className="text-2xl font-bold text-white">
              {profile?.plan_type === 'premium' ? 'VitaUp+' : 'VitaUp Free'}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">{profile?.plan_type === 'premium' ? '💎' : '🆓'}</span>
          </div>
        </div>
        {profile?.plan_type !== 'premium' && (
          <button className="w-full bg-white text-[#FF6B6B] font-bold py-3 rounded-xl hover:bg-gray-50 transition-all duration-300">
            Upgrade para VitaUp+ 💎
          </button>
        )}
      </div>

      {/* Menu */}
      <div className="space-y-2 mb-6">
        <MenuItem icon={User} label="Editar Perfil" />
        <MenuItem icon={Target} label="Meus Objetivos" />
        <MenuItem icon={Award} label="Conquistas" />
        <MenuItem icon={TrendingUp} label="Estatísticas" />
        <MenuItem icon={Activity} label="Histórico" />
      </div>

      {/* Botão Sair */}
      <button 
        onClick={signOut}
        className="w-full bg-red-50 text-red-600 font-semibold py-4 rounded-xl hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Sair da Conta
      </button>
    </div>
  );
}

function StatCard({ label, value, unit }: any) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
}

function MenuItem({ icon: Icon, label }: any) {
  return (
    <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#62D8B5] transition-all duration-300">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#62D8B5]" />
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
