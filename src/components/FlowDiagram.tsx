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
      return 'bg-green-500/20 border-green-500/40 text-green-300';
    case 'contract':
      return 'bg-blue-500/20 border-blue-500/40 text-blue-300';
    case 'system':
      return 'bg-purple-500/20 border-purple-500/40 text-purple-300';
    case 'reward':
      return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300';
    case 'burn':
      return 'bg-red-500/20 border-red-500/40 text-red-300';
    case 'team':
      return 'bg-orange-500/20 border-orange-500/40 text-orange-300';
    default:
      return 'bg-gray-500/20 border-gray-500/40 text-gray-300';
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
    <div className={`bg-gray-900/50 border border-green-500/30 rounded-lg p-6 ${className}`}>
      <div className="relative">
        <div className="bg-green-500 text-black px-4 py-2 rounded-lg font-bold text-center text-lg mb-6 font-mono">
          {title}
        </div>
        
        {/* Mobile: Vertical Stack */}
        <div className="block sm:hidden space-y-4">
          {nodes.map((node, index) => (
            <div key={node.id}>
              <div className={`border rounded-full py-4 px-6 text-center font-bold font-mono ${getNodeStyle(node.type)}`}>
                {node.label}
                {node.description && (
                  <div className="text-xs opacity-80 mt-1">{node.description}</div>
                )}
              </div>
              {index < nodes.length - 1 && (
                <div className="text-center text-2xl text-gray-400 py-2">↓</div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: Flow Layout */}
        <div className="hidden sm:flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center justify-center gap-4">
            {nodes.slice(0, 3).map((node, index) => (
              <React.Fragment key={node.id}>
                <div className={`border rounded-full py-4 px-6 text-center font-bold font-mono min-w-[120px] ${getNodeStyle(node.type)}`}>
                  {node.label}
                  {node.description && (
                    <div className="text-xs opacity-80 mt-1">{node.description}</div>
                  )}
                </div>
                {index < 2 && (
                  <div className="text-2xl text-gray-400">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Side flows for additional nodes */}
          {nodes.length > 3 && (
            <div className="flex flex-col gap-4 ml-8">
              {nodes.slice(3).map((node) => {
                const connection = connections.find(c => c.to === node.id);
                return (
                  <div key={node.id} className="flex items-center gap-3">
                    {connection?.percentage && (
                      <span className="text-xs text-gray-400 font-mono">
                        {connection.percentage}
                      </span>
                    )}
                    <div className="text-lg text-gray-400">→</div>
                    <div className={`border rounded-full py-2 px-4 text-center font-bold font-mono text-sm ${getNodeStyle(node.type)}`}>
                      {node.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {note && (
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-yellow-300 font-bold">Note: </span>
              {note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowDiagram;