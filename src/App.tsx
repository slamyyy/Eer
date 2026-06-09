import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Terminal as TerminalIcon, 
  Database, 
  Network, 
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cppCodeLines, generateSteps } from './simulationData';
import { SimulationStep, NodeState } from './types';

export default function App() {
  const [steps] = useState<SimulationStep[]>(() => generateSteps());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // ms per step
  const [activeTab, setActiveTab] = useState<'graph' | 'code' | 'memory' | 'terminal'>('graph');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentIndex] || steps[0];

  // Auto-scroll the active code line into view
  useEffect(() => {
    const activeLine = document.getElementById(`cpp-line-${currentStep.lineIndex}`);
    if (activeLine && codeContainerRef.current) {
      activeLine.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentStep.lineIndex]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep.terminal]);

  // Handle auto playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handlePhaseJump = (phase: 'init' | 'edges' | 'search' | 'reconstruct') => {
    const targetIdx = steps.findIndex((s) => s.phase === phase);
    if (targetIdx !== -1) {
      setIsPlaying(false);
      setCurrentIndex(targetIdx);
    }
  };

  // Coordinates matching the node names
  const nodeCoords: Record<string, { x: number; y: number }> = {
    A: { x: 80, y: 130 },
    B: { x: 260, y: 55 },
    C: { x: 260, y: 205 },
    D: { x: 440, y: 130 },
  };

  const edgesData = [
    { from: 'A', to: 'B', cost: 2 },
    { from: 'A', to: 'C', cost: 4 },
    { from: 'B', to: 'C', cost: 1 },
    { from: 'B', to: 'D', cost: 5 },
    { from: 'C', to: 'D', cost: 2 },
  ];

  // Helper to highlight C++ keyword tokens
  const renderCppHighlights = (text: string) => {
    if (!text) return ' ';
    
    const keywords = [
      'struct', 'void', 'double', 'int', 'bool', 'string', 'new', 
      'if', 'else', 'while', 'for', 'return', 'nullptr', 'true', 'false',
      'using', 'namespace', 'cout', 'cin', 'endl'
    ];

    const parts = text.split(/(\b\w+\b|[^\w\s\n])/g);
    return parts.map((part, i) => {
      if (keywords.includes(part)) {
        if (part === 'struct' || part === 'class') return <span key={i} className="text-pink-400 font-semibold">{part}</span>;
        if (['if', 'else', 'while', 'for', 'return'].includes(part)) return <span key={i} className="text-yellow-400 font-bold">{part}</span>;
        if (['int', 'double', 'bool', 'string', 'void'].includes(part)) return <span key={i} className="text-teal-400">{part}</span>;
        if (['nullptr', 'true', 'false'].includes(part)) return <span key={i} className="text-indigo-300 font-medium">{part}</span>;
        return <span key={i} className="text-sky-300 font-medium">{part}</span>;
      }
      if (/^\d+(\.\d+)?$/.test(part)) {
        return <span key={i} className="text-emerald-400 font-mono">{part}</span>;
      }
      if (part.startsWith('"') || part.startsWith('\'')) {
        return <span key={i} className="text-amber-300 font-mono">{part}</span>;
      }
      if (part === '//' || part.startsWith('//')) {
        return <span key={i} className="text-slate-500 italic">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white" dir="rtl">
      {/* HEADER SECTION */}
      <header className="bg-slate-900/90 border-b border-slate-800 py-4 px-4 sticky top-0 z-50 shadow-md backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Cpu className="w-6 h-6 animate-pulse text-indigo-100" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-slate-100 flex items-center gap-2">
                محاكي ومصحح خوارزمية A* (C++) تفصيلي سطر بسطر
              </h1>
              <p className="text-xs text-indigo-400">تتبع كامل الذاكرة، المؤشرات وعمليات الـ Stack خطوة بخطوة</p>
            </div>
          </div>

          {/* SIMULATION CONTROLS */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto bg-slate-950/70 p-2 rounded-xl border border-slate-800">
            {/* Speed selection */}
            <div className="flex items-center gap-1.5 ml-2 border-l border-slate-800 pl-3">
              <span className="text-[10px] text-slate-400 font-medium">السرعة:</span>
              <select 
                value={playbackSpeed} 
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded px-1.5 py-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              >
                <option value={2500}>بطيء (2.5 ث)</option>
                <option value={1500}>متوسط (1.5 ث)</option>
                <option value={800}>سريع (0.8 ث)</option>
                <option value={400}>سريع جداً (0.4 ث)</option>
              </select>
            </div>

            {/* Step buttons */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleRestart}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition active:scale-95"
                title="إعادة التشغيل بالكامل"
                id="btn-restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-1.5 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none rounded-lg transition active:scale-95 flex items-center gap-1 text-xs"
                title="الخطوة السابقة"
                id="btn-prev"
              >
                <ChevronRight className="w-4 h-4" />
                <span>السابق</span>
              </button>

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-1.5 font-semibold rounded-lg shadow-md transition active:scale-95 flex items-center gap-2 text-xs ${
                  isPlaying 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
                id="btn-play"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span id="play-text">{isPlaying ? 'إيقاف مؤقت' : 'تشغيل تلقائي'}</span>
              </button>

              <button 
                onClick={handleNext}
                disabled={currentIndex === steps.length - 1}
                className="px-3 py-1.5 bg-slate-800 text-indigo-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none font-bold rounded-lg transition active:scale-95 flex items-center gap-1 text-xs"
                title="الخطوة التالية (سطر بسطر)"
                id="btn-next"
              >
                <span>التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs text-slate-400 font-mono tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0 select-none">
              {currentIndex + 1} / {steps.length}
            </span>
          </div>
        </div>
      </header>

      {/* PHASE TIMELINE JUMPS */}
      <div className="bg-slate-950 border-b border-indigo-950/40 p-2 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-start gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] text-indigo-400 font-bold shrink-0 ml-2">المراحل الزمنية للملف:</span>
          
          <button 
            onClick={() => handlePhaseJump('init')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition ${
              currentStep.phase === 'init'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border border-transparent hover:bg-slate-800'
            }`}
          >
            1. تعريف العقد والـ RAM
          </button>

          <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />

          <button 
            onClick={() => handlePhaseJump('edges')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition ${
              currentStep.phase === 'edges'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border border-transparent hover:bg-slate-800'
            }`}
          >
            2. إدخال وتوصيل مسارات الحواف
          </button>

          <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />

          <button 
            onClick={() => handlePhaseJump('search')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition ${
              currentStep.phase === 'search'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border border-transparent hover:bg-slate-800'
            }`}
          >
            3. تشغيل ورصدر حسابات A*
          </button>

          <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />

          <button 
            onClick={() => handlePhaseJump('reconstruct')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 transition ${
              ['reconstruct', 'done'].includes(currentStep.phase)
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border border-transparent hover:bg-slate-800'
            }`}
          >
            4. طباعة واسترجاع المسار الأقصر
          </button>
        </div>
      </div>

      {/* RESPONSIVE MOBILE TABS BAR */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 sticky top-[138px] z-40 p-2 overflow-x-auto">
        <div className="flex gap-2 min-w-[480px]">
          <button 
            onClick={() => setActiveTab('graph')}
            className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'graph' 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Network className="w-3.5 h-3.5" /> الرسم البياني
          </button>
          
          <button 
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'code' 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> تتبع الكود
          </button>

          <button 
            onClick={() => setActiveTab('memory')}
            className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'memory' 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> خريطة الذاكرة
          </button>

          <button 
            onClick={() => setActiveTab('terminal')}
            className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'terminal' 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" /> الكونسول
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: SOURCE CODE & CONSOLE OUTPUT */}
        <div className={`lg:col-span-6 flex flex-col gap-6 ${activeTab !== 'code' && activeTab !== 'terminal' ? 'hidden lg:flex' : ''}`}>
          
          {/* C++ IDE Stepper Code */}
          <div className={`bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col h-[420px] lg:h-[500px] ${activeTab === 'terminal' ? 'hidden lg:flex' : ''}`}>
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 rounded-full h-2 bg-red-500 inline-block"></span>
                <span className="w-2 rounded-full h-2 bg-yellow-500 inline-block"></span>
                <span className="w-2 rounded-full h-2 bg-green-500 inline-block"></span>
                <span className="text-xs font-semibold text-slate-400 font-mono">main.cpp</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-indigo-400 px-2 py-0.5 rounded font-mono select-none">C++ IDE Stack View</span>
            </div>

            {/* Line Explanatory Box */}
            <div className="bg-indigo-950/20 px-4 py-2 border-b border-indigo-900/10 text-xs text-indigo-300 flex items-start gap-2 min-h-[48px] shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-yellow-400 ml-1">السطر {currentStep.lineIndex}:</span>
                {currentStep.explanation}
              </div>
            </div>

            {/* Source Code Scrolling Container */}
            <div 
              ref={codeContainerRef}
              className="flex-1 overflow-y-auto overflow-x-auto p-2 font-mono text-[11px] leading-relaxed text-slate-300 whitespace-pre scrollbar text-left select-text" 
              dir="ltr"
            >
              {cppCodeLines.map((line, idx) => {
                const isCurrent = idx + 1 === currentStep.lineIndex;
                return (
                  <div 
                    key={idx}
                    id={`cpp-line-${idx + 1}`}
                    className={`py-0.5 px-3 flex hover:bg-slate-800/40 transition-colors duration-200 cursor-help rounded ${
                      isCurrent ? 'bg-amber-950/40 border-l-4 border-amber-500' : ''
                    }`}
                    title={line.desc}
                  >
                    <span className={`w-8 text-right pr-2 select-none font-semibold shrink-0 border-r border-slate-800 mr-2 ${
                      isCurrent ? 'text-amber-400' : 'text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`flex-1 pl-2 whitespace-pre ${isCurrent ? 'text-white font-medium' : ''}`}>
                      {renderCppHighlights(line.text)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIMULATED TERMINAL */}
          <div className={`bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[200px] lg:h-[220px] ${activeTab === 'code' ? 'hidden lg:flex' : ''}`}>
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center shrink-0">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 font-mono">
                <TerminalIcon className="w-3.5 h-3.5 text-indigo-500" /> Output Console (المدخلات والمخرجات)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            </div>

            <div className="flex-1 p-3 overflow-y-auto font-mono text-emerald-400 text-xs leading-relaxed space-y-1.5 text-left" dir="ltr">
              {currentStep.terminal ? (
                currentStep.terminal.split('\n').map((line, idx) => {
                  let textStyle = 'text-emerald-400';
                  if (line.startsWith('---')) textStyle = 'text-yellow-400 font-bold border-b border-slate-800 pb-1 mt-2';
                  else if (line.startsWith('[الذاكرة]')) textStyle = 'text-cyan-400 font-semibold';
                  else if (line.startsWith('[A*')) textStyle = 'text-indigo-300';
                  return (
                    <div key={idx} className={`${textStyle} whitespace-pre-wrap break-all`}>
                      {line}
                    </div>
                  );
                })
              ) : (
                <span className="text-slate-600 italic">بشاشة الفحص فارغة، قم بالنقر على زر التالي لتشغيل المحرك...</span>
              )}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GRAPH VISUALIZATION & MEMORY LAYERS */}
        <div className={`lg:col-span-6 flex flex-col gap-6 ${activeTab !== 'graph' && activeTab !== 'memory' ? 'hidden lg:flex' : ''}`}>
          
          {/* INTERACTIVE GRAPH CANVAS */}
          <div className={`bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col h-[330px] lg:h-[350px] ${activeTab === 'memory' ? 'hidden lg:flex' : ''}`}>
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span className="text-xs lg:text-sm font-semibold text-slate-200">الرسم البياني النشط (A* Search Graph Grid)</span>
              </div>
              <div className="text-[10px] text-slate-400 hidden sm:block">
                العقدة الممتازة: <span className="inline-block w-2.5 h-2.5 bg-amber-500 rounded-full align-middle mx-1"></span> 
                | المنتهية: <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full align-middle mx-1"></span>
              </div>
            </div>

            {/* SVG Visual Stage */}
            <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-3 overflow-hidden select-none">
              <svg className="w-full h-full max-h-full" viewBox="0 0 520 260" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                  </marker>
                  <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                  </marker>
                  <marker id="arrow-path" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Draw Link Lines */}
                {edgesData.map((edge, i) => {
                  const from = nodeCoords[edge.from];
                  const to = nodeCoords[edge.to];
                  if (!from || !to) return null;

                  // Evaluate line color
                  let color = '#475569'; // default slate-600
                  let activeArrow = 'url(#arrow)';
                  let strokeWidth = '2';
                  let dashArray = undefined;

                  // Check if in final optimal path
                  let isOptimal = false;
                  if (currentStep.optimalPath && currentStep.optimalPath.length > 0) {
                    for (let j = 0; j < currentStep.optimalPath.length - 1; j++) {
                      if (currentStep.optimalPath[j] === edge.from && currentStep.optimalPath[j + 1] === edge.to) {
                        isOptimal = true;
                      }
                    }
                  }

                  const isEdgeSearching = currentStep.activeNode === edge.from;

                  if (isOptimal) {
                    color = '#10b981'; // emerald-500
                    activeArrow = 'url(#arrow-path)';
                    strokeWidth = '3.5';
                  } else if (isEdgeSearching) {
                    color = '#f59e0b'; // amber-500
                    activeArrow = 'url(#arrow-active)';
                    strokeWidth = '2.5';
                    dashArray = '5,5';
                  }

                  const midX = (from.x + to.x) / 2;
                  const midY = (from.y + to.y) / 2;

                  return (
                    <g key={i}>
                      <line 
                        x1={from.x} 
                        y1={from.y} 
                        x2={to.x} 
                        y2={to.y} 
                        stroke={color} 
                        strokeWidth={strokeWidth}
                        strokeDasharray={dashArray}
                        markerEnd={activeArrow}
                        className="transition-all duration-300"
                      />
                      {/* Weight rectangle block */}
                      <rect 
                        x={midX - 10} 
                        y={midY - 9} 
                        width="20" 
                        height="16" 
                        fill="#0b0f19" 
                        rx="4" 
                        stroke="#1e293b" 
                        strokeWidth="1"
                      />
                      <text 
                        x={midX} 
                        y={midY + 3} 
                        fill={isOptimal ? '#34d399' : isEdgeSearching ? '#fbbf24' : '#94a3b8'}
                        fontSize="9"
                        textAnchor="middle"
                        fontWeight="bold"
                        className="font-mono"
                      >
                        {edge.cost}
                      </text>
                    </g>
                  );
                })}

                {/* Draw Node Circles */}
                {currentStep.nodes.map((node, i) => {
                  const coord = nodeCoords[node.name];
                  if (!coord) return null;

                  const isActive = currentStep.activeNode === node.name;
                  const isVisited = node.visited;
                  const isCalculated = node.g !== 999;

                  let nodeColor = '#1f2937'; // slate-800
                  let strokeColor = '#4b5563'; // slate-600
                  let textColor = '#ffffff';

                  if (isActive) {
                    nodeColor = '#d97706'; // amber-600
                    strokeColor = '#fbbf24'; // yellow-400
                  } else if (isVisited) {
                    nodeColor = '#065f46'; // emerald-800
                    strokeColor = '#10b981'; // emerald-500
                  } else if (isCalculated) {
                    nodeColor = '#1e3a8a'; // blue-900
                    strokeColor = '#3b82f6'; // blue-500
                  }

                  // Format infinity value
                  const gString = node.g === 999 ? '∞' : node.g.toString();
                  const fString = node.f === 999 ? '∞' : node.f.toString();

                  return (
                    <g key={i} className="transition-all duration-300">
                      <circle 
                        cx={coord.x} 
                        cy={coord.y} 
                        r="20" 
                        fill={nodeColor} 
                        stroke={strokeColor} 
                        strokeWidth="2.5" 
                        className="transition-all duration-300"
                      />
                      <text 
                        x={coord.x} 
                        y={coord.y + 5} 
                        fill={textColor} 
                        fontSize="14" 
                        fontWeight="bold" 
                        textAnchor="middle"
                      >
                        {node.name}
                      </text>

                      {/* Display Heuristic h above node */}
                      <text 
                        x={coord.x} 
                        y={coord.y - 25} 
                        fill="#94a3b8" 
                        fontSize="10" 
                        fontWeight="600" 
                        textAnchor="middle"
                      >
                        h = {node.h}
                      </text>

                      {/* Info values f(g) below node */}
                      <text 
                        x={coord.x} 
                        y={coord.y + 32} 
                        fill={isActive ? '#fbbf24' : isVisited ? '#34d399' : '#60a5fa'}
                        fontSize="9" 
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {`f: ${fString} (g: ${gString})`}
                      </text>

                      {/* Parent node annotation */}
                      {node.parent && (
                        <text 
                          x={coord.x} 
                          y={coord.y + 42} 
                          fill="#c084fc" 
                          fontSize="8" 
                          textAnchor="middle"
                          fontWeight="500"
                        >
                          الأب: {node.parent}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Floating legends */}
              <div className="absolute bottom-2 left-2 bg-slate-900/95 border border-slate-800 rounded-lg p-2 text-[10px] text-slate-400 space-y-1 backdrop-blur" dir="rtl">
                <div>نقطة البداية: <span className="font-bold text-indigo-400">A (h=6)</span></div>
                <div>نقطة المستهدف: <span className="font-bold text-emerald-400">D (h=0)</span></div>
              </div>
            </div>
          </div>

          {/* DYNAMIC MEMORY MAP (C++ STACK / HEAP) */}
          <div className={`bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col h-[340px] lg:h-[370px] ${activeTab === 'graph' ? 'hidden lg:flex' : ''}`}>
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-yellow-500" />
                <span className="text-xs lg:text-sm font-semibold text-slate-200">هياكل الذاكرة العشوائية وتخطيط المؤشرات (Virtual Heap)</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">nodesHead → [Node* list]</span>
            </div>

            {/* Dynamic RAM view container */}
            <div 
              className="flex-1 overflow-x-auto p-4 flex flex-row gap-4 items-start bg-slate-950/40 scrollbar select-text" 
              dir="ltr"
            >
              <AnimatePresence mode="popLayout">
                {currentStep.nodes.map((node, idx) => {
                  const virtAddr = `0x7ffe8b${idx * 16}`;
                  const isNodeActive = currentStep.activeNode === node.name;
                  const nextNodeAddr = idx < currentStep.nodes.length - 1 ? `0x7ffe8b${(idx + 1) * 16}` : 'nullptr';
                  const edgesHeadAddr = node.edges.length > 0 ? `0x55d2c${idx * 32}` : 'nullptr';

                  return (
                    <div key={node.name} className="flex items-center gap-2 shrink-0">
                      {/* Node object block representation */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        className={`w-60 bg-slate-900 border rounded-xl p-3 flex flex-col gap-1.5 shadow-lg relative ${
                          isNodeActive ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-800'
                        }`}
                      >
                        {/* Header details */}
                        <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                          <span className="text-xs font-bold text-indigo-400 font-mono">struct Node</span>
                          <span className="text-[9px] text-slate-500 font-mono tracking-wider" title="العنوان الافتراضي في الـ Heap">{virtAddr}</span>
                        </div>

                        {/* Values variables */}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] font-mono">
                          <div className="text-slate-400">string name:</div>
                          <div className="text-emerald-400 text-right font-bold">"{node.name}"</div>
                          
                          <div className="text-slate-400">double h:</div>
                          <div className="text-blue-400 text-right">{node.h}</div>
                          
                          <div className="text-slate-400">double g:</div>
                          <div className="text-blue-400 text-right">{node.g === 999 ? '999.0' : node.g.toFixed(1)}</div>
                          
                          <div className="text-slate-400">double f:</div>
                          <div className="text-yellow-400 text-right font-semibold">{node.f === 999 ? '999.0' : node.f.toFixed(1)}</div>
                          
                          <div className="text-slate-400">bool visited:</div>
                          <div className={`text-right font-semibold ${node.visited ? 'text-green-400' : 'text-red-400'}`}>
                            {node.visited ? 'true' : 'false'}
                          </div>
                          
                          <div className="text-slate-400">string parent:</div>
                          <div className="text-purple-400 text-right font-semibold">"{node.parent || 'NULL'}"</div>
                        </div>

                        {/* edgesHead Linked List representation */}
                        <div className="mt-1.5 pt-1.5 border-t border-slate-800 flex flex-col gap-1 font-mono text-[10px]">
                          <div className="flex justify-between items-center text-slate-400">
                            <span>Edge* edgesHead:</span>
                            <span className={node.edges.length > 0 ? 'text-amber-400 font-medium' : 'text-slate-500'}>
                              {edgesHeadAddr}
                            </span>
                          </div>

                          {/* Edge struct instances sub-render */}
                          {node.edges.length > 0 && (
                            <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800 mt-1 flex flex-col gap-1.5">
                              {node.edges.map((edge, edgeIdx) => {
                                const edgeAddr = `0x55d2c${idx * 32 + edgeIdx * 12}`;
                                const nextEdgeAddr = edgeIdx < node.edges.length - 1 ? `0x55d2c${idx * 32 + (edgeIdx + 1) * 12}` : 'nullptr';
                                return (
                                  <div key={edge.to} className="p-1 px-1.5 bg-slate-900 border border-slate-800 rounded text-[9px] space-y-0.5">
                                    <div className="flex justify-between text-[8px] text-slate-500 font-normal">
                                      <span>struct Edge</span>
                                      <span>{edgeAddr}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">to:</span>
                                      <span className="text-yellow-400 font-bold">"{edge.to}"</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">cost:</span>
                                      <span className="text-emerald-400">{edge.cost.toFixed(1)}</span>
                                    </div>
                                    <div className="flex justify-between text-[8px]">
                                      <span className="text-slate-400">next*:</span>
                                      <span className={nextEdgeAddr !== 'nullptr' ? 'text-amber-400 font-medium' : 'text-slate-500'}>
                                        {nextEdgeAddr}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Node next pointer representation */}
                        <div className="mt-auto pt-1.5 border-t border-slate-800 text-[10px] font-mono flex justify-between">
                          <span className="text-slate-400">Node* next:</span>
                          <span className={nextNodeAddr !== 'nullptr' ? 'text-indigo-400 font-medium' : 'text-slate-500'}>
                            {nextNodeAddr}
                          </span>
                        </div>
                      </motion.div>

                      {/* Direction arrow between Nodes (Heap address links) */}
                      {idx < currentStep.nodes.length - 1 && (
                        <div className="text-slate-700 mx-0.5 font-bold text-sm shrink-0 flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-indigo-500/40" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </main>

      {/* DETAILED EXPLAINERS AND ALGORITHM DESCRIPTION */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
          <div className="space-y-2 border-r border-transparent md:border-slate-800/80 pr-0 md:pr-4">
            <h4 className="text-slate-200 font-semibold flex items-center gap-2 text-sm">
              <Cpu className="w-4 h-4 text-indigo-500" />
              كيفية عمل تتبع الكود سطر بسطر؟
            </h4>
            <p>
              يقوم المعالج الافتراضي لدينا بقراءة برنامج C++ وتنفيذه خطوة بخطوة بالكامل. يشمل ذلك الدخول لتفاصيل تخصيص الذاكرة (Memory Allocation) داخل الدوال مثل <code className="text-indigo-300 font-mono">addNode</code> و <code className="text-indigo-300 font-mono">addEdge</code>، ومتابعة تفرعات الاستدعاءات والـ Stack.
            </p>
          </div>

          <div className="space-y-2 border-r border-transparent md:border-slate-800/80 pr-0 md:pr-4">
            <h4 className="text-slate-200 font-semibold flex items-center gap-2 text-sm">
              <Layers className="w-4 h-4 text-yellow-500" />
              حساب تكاليف خوارزمية A*
            </h4>
            <p>
              في كل خطوة استكشافية، تبحث المعادلة <code className="text-yellow-400 font-mono">f = g + h</code> عن العقدة صاحبة الوزن الأقل. قيمة <code className="text-slate-300 font-mono">g</code> تمثل التكلفة التراكمية الدقيقة للوصول إليها، بينما <code className="text-slate-300 font-mono">h</code> (Heuristic) تمثل البعد التقديري عن الهدف.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold flex items-center gap-2 text-sm">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              فهم مخطط الذاكرة والمؤشرات
            </h4>
            <p>
              بإمكانك تصفح ورصد العناوين البرمجية الافتراضية للذاكرة (مثل <code className="text-sky-300 font-mono">0x7ffe8b0</code>). انظر كيف يشير المؤشر <code className="text-indigo-400 font-mono">next</code> للعقدة التالية كقائمة متصلة (Linked List)، وكيف يسجل العنوان <code className="text-slate-500 font-mono">nullptr</code> نهاية المسار بالقرص.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
