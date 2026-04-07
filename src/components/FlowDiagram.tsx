import React from 'react';

interface DiagramNode {
  id: string;
  label: string;
  type: 'user' | 'contract' | 'system' | 'reward' | 'burn' | 'team';
  description?: string;
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
  percentage?: string;
  curved?: boolean;
}

interface FlowDiagramProps {
  title: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  note?: string;
  className?: string;
}

const getNodeStyle = (type: DiagramNode['type']): string => {
  switch (type) {
    case 'user':
      return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    case 'contract':
      return 'bg-violet-500/10 border-violet-500/30 text-violet-400';
    case 'system':
      return 'bg-slate-700/30 border-slate-600/50 text-slate-300';
    case 'reward':
      return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    case 'burn':
      return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
    case 'team':
      return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    default:
      return 'bg-slate-800/50 border-slate-700/50 text-slate-400';
  }
};

const FlowDiagram: React.FC<FlowDiagramProps> = ({ 
  title, 
  nodes, 
  connections, 
  note, 
  className = '' 
}) => {
  return (
    <div className={`glass-panel p-6 sm:p-8 ${className}`}>
      <div className="relative">
        <h3 className="text-xl font-bold text-white mb-8 border-b border-slate-700/50 pb-4">
          {title}
        </h3>
        
        {/* Mobile: Vertical Stack */}
        <div className="block lg:hidden space-y-4">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex flex-col items-center">
              <div className={`w-full border rounded-xl py-4 px-6 text-center shadow-sm ${getNodeStyle(node.type)}`}>
                <div className="font-semibold">{node.label}</div>
                {node.description && (
                  <div className="text-xs opacity-75 mt-2">{node.description}</div>
                )}
              </div>
              {index < nodes.length - 1 && (
                <div className="text-slate-600 py-3">↓</div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: Flow Layout */}
        <div className="hidden lg:flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center justify-center gap-4 w-full">
            {nodes.slice(0, 3).map((node, index) => (
              <React.Fragment key={node.id}>
                <div className={`flex-1 border rounded-xl py-5 px-6 text-center shadow-sm min-w-[200px] ${getNodeStyle(node.type)}`}>
                  <div className="font-semibold text-lg">{node.label}</div>
                  {node.description && (
                    <div className="text-sm opacity-80 mt-2">{node.description}</div>
                  )}
                </div>
                {index < 2 && (
                  <div className="text-slate-600 font-bold mx-2">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {nodes.length > 3 && (
            <div className="flex w-full items-center justify-center gap-4 mt-6">
              <div className="text-slate-600 font-bold rotate-90 sm:rotate-0 sm:mr-4">↳</div>
              {nodes.slice(3).map((node) => (
                <div key={node.id} className={`border rounded-xl py-4 px-6 text-center shadow-sm min-w-[200px] ${getNodeStyle(node.type)}`}>
                  <div className="font-semibold text-lg">{node.label}</div>
                  {node.description && (
                    <div className="text-sm opacity-80 mt-2">{node.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {note && (
          <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex gap-3">
            <span className="text-blue-400 font-bold">ℹ</span>
            <p className="text-sm text-slate-300 leading-relaxed">
              {note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowDiagram;