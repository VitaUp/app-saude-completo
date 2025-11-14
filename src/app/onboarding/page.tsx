"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    sleepTime: "",
    wakeTime: "",
    workoutLevel: "",
    dailyRoutine: "",
    restrictions: [] as string[],
    preferences: [] as string[],
    availableTime: "",
    gymExperience: "",
    dietHistory: "",
  });

  const { updateProfile, profile } = useAuth();
  const router = useRouter();
  const totalSteps = 8;

  const nextStep = () => {
    if (step < totalSteps - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFinish = async () => {
    try {
      await updateProfile({
        name: formData.name,
        age: parseInt(formData.age) || undefined,
        gender: formData.gender,
        weight: parseFloat(formData.weight) || undefined,
        height: parseFloat(formData.height) || undefined,
        goal: formData.goal,
        sleep_time: formData.sleepTime,
        wake_time: formData.wakeTime,
        workout_level: formData.workoutLevel,
        daily_routine: formData.dailyRoutine,
        restrictions: formData.restrictions,
        preferences: formData.preferences,
        available_time: parseInt(formData.availableTime) || undefined,
        gym_experience: formData.gymExperience,
        diet_history: formData.dietHistory,
      });

      router.push('/');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">Passo {step + 1} de {totalSteps}</span>
            <span className="text-white text-sm font-medium">{Math.round(((step + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="bg-white/30 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {step === 0 && <WelcomeStep />}
          {step === 1 && <BasicInfoStep formData={formData} updateField={updateField} />}
          {step === 2 && <PhysicalInfoStep formData={formData} updateField={updateField} />}
          {step === 3 && <GoalStep formData={formData} updateField={updateField} />}
          {step === 4 && <SleepStep formData={formData} updateField={updateField} />}
          {step === 5 && <WorkoutStep formData={formData} updateField={updateField} />}
          {step === 6 && <DietStep formData={formData} updateField={updateField} />}
          {step === 7 && <FinalStep formData={formData} />}

          {/* Botões de Navegação */}
          <div className="flex items-center gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Voltar
              </button>
            )}
            <button
              onClick={step === totalSteps - 1 ? handleFinish : nextStep}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#AEE2FF] to-[#62D8B5] text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {step === totalSteps - 1 ? "Começar Jornada" : "Continuar"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao VitaUp! 🎉</h1>
      <p className="text-gray-600 text-lg mb-6">
        Vamos criar seu plano personalizado de saúde, nutrição e treino em poucos minutos.
      </p>
      <div className="bg-gradient-to-br from-[#AEE2FF]/20 to-[#62D8B5]/20 rounded-2xl p-6 border-2 border-[#62D8B5]/30">
        <p className="text-gray-700 text-sm">
          ✨ Responda algumas perguntas e nossa IA CoachUp vai criar um plano perfeito para você!
        </p>
      </div>
    </div>
  );
}

function BasicInfoStep({ formData, updateField }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Vamos nos conhecer!</h2>
      <p className="text-gray-600 mb-6">Conte um pouco sobre você</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Como você se chama?</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Seu nome"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Qual sua idade?</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateField("age", e.target.value)}
            placeholder="Ex: 28"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
          <div className="grid grid-cols-3 gap-3">
            <GenderButton label="Masculino" icon="👨" selected={formData.gender === "male"} onClick={() => updateField("gender", "male")} />
            <GenderButton label="Feminino" icon="👩" selected={formData.gender === "female"} onClick={() => updateField("gender", "female")} />
            <GenderButton label="Outro" icon="🧑" selected={formData.gender === "other"} onClick={() => updateField("gender", "other")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhysicalInfoStep({ formData, updateField }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações físicas</h2>
      <p className="text-gray-600 mb-6">Vamos calcular suas necessidades</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso atual (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => updateField("weight", e.target.value)}
            placeholder="Ex: 70"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => updateField("height", e.target.value)}
            placeholder="Ex: 170"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
          />
        </div>
      </div>
    </div>
  );
}

function GoalStep({ formData, updateField }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual seu objetivo?</h2>
      <p className="text-gray-600 mb-6">Escolha seu foco principal</p>

      <div className="space-y-3">
        <GoalOption
          icon="🔥"
          title="Perder Peso"
          description="Emagrecer de forma saudável"
          selected={formData.goal === "lose"}
          onClick={() => updateField("goal", "lose")}
        />
        <GoalOption
          icon="💪"
          title="Ganhar Massa"
          description="Hipertrofia e força"
          selected={formData.goal === "gain"}
          onClick={() => updateField("goal", "gain")}
        />
        <GoalOption
          icon="⚖️"
          title="Manter Peso"
          description="Equilíbrio e saúde"
          selected={formData.goal === "maintain"}
          onClick={() => updateField("goal", "maintain")}
        />
        <GoalOption
          icon="🏃"
          title="Melhorar Condicionamento"
          description="Resistência e energia"
          selected={formData.goal === "fitness"}
          onClick={() => updateField("goal", "fitness")}
        />
      </div>
    </div>
  );
}

function SleepStep({ formData, updateField }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Rotina de sono</h2>
      <p className="text-gray-600 mb-6">Quando você costuma dormir e acordar?</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Horário de dormir</label>
          <input
            type="time"
            value={formData.sleepTime}
            onChange={(e) => updateField("sleepTime", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Horário de acordar</label>
          <input
            type="time"
            value={formData.wakeTime}
            onChange={(e) => updateField("wakeTime", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
          />
        </div>
      </div>
    </div>
  );
}

function WorkoutStep({ formData, updateField }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Experiência com treino</h2>
      <p className="text-gray-600 mb-6">Qual seu nível atual?</p>

      <div className="space-y-3">
        <LevelOption
          icon="🌱"
          title="Iniciante"
          description="Nunca treinei ou parei há muito tempo"
          selected={formData.workoutLevel === "beginner"}
          onClick={() => updateField("workoutLevel", "beginner")}
        />
        <LevelOption
          icon="🏃"
          title="Intermediário"
          description="Treino regularmente há alguns meses"
          selected={formData.workoutLevel === "intermediate"}
          onClick={() => updateField("workoutLevel", "intermediate")}
        />
        <LevelOption
          icon="💪"
          title="Avançado"
          description="Treino há anos e tenho experiência"
          selected={formData.workoutLevel === "advanced"}
          onClick={() => updateField("workoutLevel", "advanced")}
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Quanto tempo você tem por dia?</label>
        <select
          value={formData.availableTime}
          onChange={(e) => updateField("availableTime", e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5]"
        >
          <option value="">Selecione</option>
          <option value="15">15-30 minutos</option>
          <option value="30">30-45 minutos</option>
          <option value="45">45-60 minutos</option>
          <option value="60">Mais de 1 hora</option>
        </select>
      </div>
    </div>
  );
}

function DietStep({ formData, updateField }: any) {
  const toggleRestriction = (restriction: string) => {
    const current = formData.restrictions || [];
    if (current.includes(restriction)) {
      updateField("restrictions", current.filter((r: string) => r !== restriction));
    } else {
      updateField("restrictions", [...current, restriction]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferências alimentares</h2>
      <p className="text-gray-600 mb-6">Tem alguma restrição ou preferência?</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Restrições alimentares</label>
          <div className="grid grid-cols-2 gap-3">
            <RestrictionTag 
              label="Vegetariano" 
              icon="🥗" 
              selected={formData.restrictions?.includes("vegetarian")}
              onClick={() => toggleRestriction("vegetarian")}
            />
            <RestrictionTag 
              label="Vegano" 
              icon="🌱" 
              selected={formData.restrictions?.includes("vegan")}
              onClick={() => toggleRestriction("vegan")}
            />
            <RestrictionTag 
              label="Sem Lactose" 
              icon="🥛" 
              selected={formData.restrictions?.includes("lactose-free")}
              onClick={() => toggleRestriction("lactose-free")}
            />
            <RestrictionTag 
              label="Sem Glúten" 
              icon="🌾" 
              selected={formData.restrictions?.includes("gluten-free")}
              onClick={() => toggleRestriction("gluten-free")}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Histórico de dieta</label>
          <textarea
            value={formData.dietHistory}
            onChange={(e) => updateField("dietHistory", e.target.value)}
            placeholder="Já fez alguma dieta antes? Como foi?"
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62D8B5] resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function FinalStep({ formData }: any) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] flex items-center justify-center animate-pulse">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Tudo pronto, {formData.name}! 🎉</h1>
      <p className="text-gray-600 text-lg mb-6">
        Nossa IA CoachUp está criando seu plano personalizado de saúde, nutrição e treino.
      </p>
      <div className="bg-gradient-to-br from-[#AEE2FF]/20 to-[#62D8B5]/20 rounded-2xl p-6 border-2 border-[#62D8B5]/30 mb-6">
        <p className="text-gray-700 font-medium mb-4">Seu plano inclui:</p>
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <span className="text-sm text-gray-700">Dieta personalizada com {formData.goal === "lose" ? "déficit calórico" : formData.goal === "gain" ? "superávit calórico" : "manutenção"}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <span className="text-sm text-gray-700">Treinos {formData.workoutLevel} de {formData.availableTime} minutos</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <span className="text-sm text-gray-700">Monitoramento de sono otimizado</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">✅</span>
            <span className="text-sm text-gray-700">CoachUp IA disponível 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenderButton({ label, icon, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
        selected ? "border-[#62D8B5] bg-[#62D8B5]/10" : "border-gray-200 bg-gray-50 hover:border-[#62D8B5]/50"
      }`}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs font-medium text-gray-700">{label}</div>
    </button>
  );
}

function GoalOption({ icon, title, description, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
        selected ? "border-[#62D8B5] bg-[#62D8B5]/10" : "border-gray-200 bg-gray-50 hover:border-[#62D8B5]/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
}

function LevelOption({ icon, title, description, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
        selected ? "border-[#62D8B5] bg-[#62D8B5]/10" : "border-gray-200 bg-gray-50 hover:border-[#62D8B5]/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
}

function RestrictionTag({ label, icon, selected, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
        selected ? "border-[#62D8B5] bg-[#62D8B5]/10" : "border-gray-200 bg-gray-50 hover:border-[#62D8B5]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    </button>
  );
}
