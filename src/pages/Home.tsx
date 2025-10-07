import {
  Activity,
  ArrowRight,
  FileText,
  Headphones,
  Layers,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import React from 'react';

const Home = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Observability',
      description:
        'Monitor all your services with live metrics, health checks, and performance insights across your entire tech ecosystem.',
      gradient: 'from-primary to-cyan-600',
      highlights: ['Live metrics', 'Health monitoring', 'Performance tracking'],
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description:
        'Stay on top of security scores, vulnerability scans, and compliance requirements with automated monitoring and alerts.',
      gradient: 'from-purple-600 to-pink-600',
      highlights: ['Security scoring', 'Automated scans', 'Compliance tracking'],
    },
    {
      icon: Zap,
      title: 'Service Management',
      description:
        'Centralized control over your microservices architecture with deployment tracking, version control, and rollback capabilities.',
      gradient: 'from-warning to-critical',
      highlights: ['Deployment tracking', 'Version control', 'Quick rollbacks'],
    },
    {
      icon: Layers,
      title: 'Unified Dashboard',
      description:
        'Access all tools and services from one place. No more switching between multiple platforms or hunting for links.',
      gradient: 'from-favorable to-emerald-600',
      highlights: ['Single access point', 'Cross-platform', 'Streamlined workflow'],
    },
  ];

  const roles = [
    {
      title: 'For Stakeholders',
      icon: Users,
      description:
        'Get high-level insights into system health, uptime trends, and cost optimization opportunities.',
      color: 'primary',
    },
    {
      title: 'For Tech Leads',
      icon: Layers,
      description:
        'Deep dive into service metrics, error rates, and performance bottlenecks with detailed analytics.',
      color: 'purple',
    },
    {
      title: 'For Managers',
      icon: FileText,
      description:
        'Track team productivity, deployment frequency, and service reliability metrics for better planning.',
      color: 'favorable',
    },
    {
      title: 'For Directors',
      icon: Sparkles,
      description:
        'Strategic overview of tech infrastructure, SLA compliance, and resource allocation insights.',
      color: 'warning',
    },
  ];

  const capabilities = [
    'Monitor services in real-time',
    'Track SLO compliance and burn rates',
    'Automated security vulnerability scanning',
    'Cross-service dependency mapping',
    'Custom alerting and notifications',
    'Historical performance analytics',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"></div>
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-cyan-400 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              <span>Welcome to Portal Hub v1.0.0</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Your Tech Ecosystem
              <span className="block mt-2 bg-gradient-to-r from-primary to-cyan-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                All in One Place
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Portal Hub brings together all your internal services, tools, and metrics into a
              unified platform. Built for teams who demand visibility, control, and efficiency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {/*<button className="group bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">*/}
              {/*  Explore Services*/}
              {/*  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />*/}
              {/*</button>*/}
              {/*<button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-gray-200 dark:border-gray-700">*/}
              {/*  View Documentation*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Stay in Control
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools and insights designed to help you monitor, manage, and optimize your
            services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 dark:opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500`}
                ></div>

                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 relative`}
                >
                  <Icon className="text-white" size={28} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roles Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Every Role
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Whether you're overseeing strategy or diving into technical details, Portal Hub adapts
              to your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              const colorMap = {
                primary:
                  'bg-primary/10 text-primary dark:bg-primary/20 dark:text-cyan-400 border-primary/20 dark:border-primary/30',
                purple:
                  'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-purple-100 dark:border-purple-800',
                favorable:
                  'bg-favorable/10 text-favorable dark:bg-favorable/20 dark:text-green-400 border-favorable/20 dark:border-favorable/30',
                warning:
                  'bg-warning/10 text-warning dark:bg-warning/20 dark:text-orange-400 border-warning/20 dark:border-warning/30',
              };

              return (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                >
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${colorMap[role.color]}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-primary to-cyan-700 dark:from-primary dark:to-cyan-900 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Powerful Capabilities at Your Fingertips
              </h2>
              <p className="text-cyan-100 dark:text-cyan-200 text-lg mb-8">
                Portal Hub provides enterprise-grade monitoring and management tools that scale with
                your organization.
              </p>
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {capabilities.map((capability, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-white font-medium">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Take Control?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          Start exploring your services, check system health, or dive into detailed analytics.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/*<button className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">*/}
          {/*  View Observability Dashboard*/}
          {/*</button>*/}
          <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2">
            <Headphones size={20} />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
