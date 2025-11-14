"use client";

import { Check, Sparkles, Crown, Zap } from "lucide-react";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AEE2FF] to-[#62D8B5] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha seu plano VitaUp
          </h1>
          <p className="text-white/90 text-lg">
            Comece grátis e evolua quando quiser
          </p>
        </div>

        {/* Cards de Planos */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Free */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">VitaUp Free</h2>
                <p className="text-gray-600 text-sm">Para começar sua jornada</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900">R$ 0</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">Grátis para sempre</p>
            </div>

            <button className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 mb-8">
              Começar Grátis
            </button>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">O que está incluído:</h3>
              <Feature icon="✅" text="Contagem básica de calorias" />
              <Feature icon="✅" text="Registro de água e passos" />
              <Feature icon="✅" text="Algumas receitas gratuitas" />
              <Feature icon="✅" text="Diário de treino limitado" />
              <Feature icon="✅" text="Relatório simples de sono" />
              <Feature icon="✅" text="1 recomendação/dia do CoachUp" />
              <Feature icon="❌" text="Dieta personalizada por IA" disabled />
              <Feature icon="❌" text="Treinos personalizados" disabled />
              <Feature icon="❌" text="Gamificação completa" disabled />
              <Feature icon="❌" text="CoachUp ilimitado" disabled />
            </div>
          </div>

          {/* Plano Premium */}
          <div className="bg-gradient-to-br from-[#FFB84D] to-[#FF6B6B] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Badge Premium */}
            <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-white text-xs font-bold">MAIS POPULAR</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">VitaUp+</h2>
                <p className="text-white/90 text-sm">Experiência completa</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">R$ 29,90</span>
                <span className="text-white/90">/mês</span>
              </div>
              <p className="text-white/90 text-sm mt-2">Cancele quando quiser</p>
            </div>

            <button className="w-full py-4 bg-white text-[#FF6B6B] font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 mb-8 shadow-lg">
              Começar Teste Grátis de 7 Dias
            </button>

            <div className="space-y-4">
              <h3 className="font-semibold text-white mb-4">Tudo do Free, mais:</h3>
              <Feature icon="✨" text="Dieta personalizada por IA" premium />
              <Feature icon="✨" text="Treinos personalizados" premium />
              <Feature icon="✨" text="Ajuste automático de calorias" premium />
              <Feature icon="✨" text="Relatórios completos de sono" premium />
              <Feature icon="✨" text="Acesso total às receitas" premium />
              <Feature icon="✨" text="CoachUp ilimitado" premium />
              <Feature icon="✨" text="Gamificação completa" premium />
              <Feature icon="✨" text="Avatar personalizável" premium />
              <Feature icon="✨" text="Desafios semanais" premium />
              <Feature icon="✨" text="Insights de humor e energia" premium />
            </div>
          </div>
        </div>

        {/* Comparação Detalhada */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compare os planos
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-900 font-semibold">Funcionalidade</th>
                  <th className="text-center py-4 px-4 text-gray-900 font-semibold">Free</th>
                  <th className="text-center py-4 px-4 text-gray-900 font-semibold">VitaUp+</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <ComparisonRow feature="Contagem de calorias" free="Básica" premium="Avançada com IA" />
                <ComparisonRow feature="Registro de água" free={true} premium={true} />
                <ComparisonRow feature="Monitoramento de passos" free={true} premium={true} />
                <ComparisonRow feature="Receitas" free="Limitadas" premium="Ilimitadas" />
                <ComparisonRow feature="Diário de treino" free="Limitado" premium="Completo" />
                <ComparisonRow feature="Relatórios de sono" free="Simples" premium="Detalhados" />
                <ComparisonRow feature="CoachUp IA" free="1/dia" premium="Ilimitado" />
                <ComparisonRow feature="Dieta personalizada" free={false} premium={true} />
                <ComparisonRow feature="Treinos personalizados" free={false} premium={true} />
                <ComparisonRow feature="Ajuste automático" free={false} premium={true} />
                <ComparisonRow feature="Gamificação" free={false} premium={true} />
                <ComparisonRow feature="Avatar customizável" free={false} premium={true} />
                <ComparisonRow feature="Desafios semanais" free={false} premium={true} />
                <ComparisonRow feature="Insights avançados" free={false} premium={true} />
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            <FAQItem
              question="Posso cancelar quando quiser?"
              answer="Sim! Você pode cancelar sua assinatura VitaUp+ a qualquer momento, sem taxas ou multas."
            />
            <FAQItem
              question="Como funciona o teste grátis?"
              answer="Você tem 7 dias para experimentar todos os recursos do VitaUp+ gratuitamente. Se não gostar, cancele antes do fim do período e não será cobrado."
            />
            <FAQItem
              question="Posso mudar de plano depois?"
              answer="Claro! Você pode fazer upgrade do Free para o VitaUp+ a qualquer momento e começar a usar todos os recursos premium imediatamente."
            />
            <FAQItem
              question="O que acontece com meus dados se eu cancelar?"
              answer="Seus dados ficam salvos por 90 dias. Se você voltar, tudo estará lá esperando por você!"
            />
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto">
            <Zap className="w-16 h-16 mx-auto mb-6 text-[#62D8B5]" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pronto para transformar sua saúde?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Junte-se a milhares de brasileiros que já estão vivendo melhor com o VitaUp
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#AEE2FF] to-[#62D8B5] text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
              Começar Agora - É Grátis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text, disabled, premium }: any) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-lg ${premium ? "text-white" : disabled ? "text-gray-300" : "text-[#62D8B5]"}`}>
        {icon}
      </span>
      <span className={`text-sm ${premium ? "text-white" : disabled ? "text-gray-400" : "text-gray-700"}`}>
        {text}
      </span>
    </div>
  );
}

function ComparisonRow({ feature, free, premium }: any) {
  return (
    <tr>
      <td className="py-4 px-4 text-gray-700">{feature}</td>
      <td className="py-4 px-4 text-center">
        {typeof free === "boolean" ? (
          free ? (
            <Check className="w-5 h-5 text-[#62D8B5] mx-auto" />
          ) : (
            <span className="text-gray-300">—</span>
          )
        ) : (
          <span className="text-sm text-gray-600">{free}</span>
        )}
      </td>
      <td className="py-4 px-4 text-center">
        {typeof premium === "boolean" ? (
          premium ? (
            <Check className="w-5 h-5 text-[#62D8B5] mx-auto" />
          ) : (
            <span className="text-gray-300">—</span>
          )
        ) : (
          <span className="text-sm text-gray-600">{premium}</span>
        )}
      </td>
    </tr>
  );
}

function FAQItem({ question, answer }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="font-semibold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600 text-sm">{answer}</p>
    </div>
  );
}
