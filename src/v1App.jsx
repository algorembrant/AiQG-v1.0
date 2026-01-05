import React, { useState } from 'react';
import { Plus, X, ExternalLink, Grip, AlertCircle, Layout, Grid } from 'lucide-react';

const ALL_LLMS = [
  // Major AI Assistants
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', color: '#10a37f', category: 'Major', description: 'OpenAI ChatGPT' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', color: '#d97757', category: 'Major', description: 'Anthropic Claude' },
  { id: 'gemini', name: 'Google Gemini', url: 'https://gemini.google.com/app', color: '#4285f4', category: 'Major', description: 'Google Gemini AI' },
  { id: 'copilot', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com/', color: '#0078d4', category: 'Major', description: 'Microsoft Copilot' },
  
  // Search & Research AI
  { id: 'perplexity', name: 'Perplexity AI', url: 'https://www.perplexity.ai/', color: '#20808d', category: 'Search', description: 'AI-powered search' },
  { id: 'you', name: 'You.com', url: 'https://you.com/', color: '#0a6dc2', category: 'Search', description: 'AI search engine' },
  { id: 'phind', name: 'Phind', url: 'https://www.phind.com/', color: '#5468ff', category: 'Search', description: 'AI search for developers' },
  { id: 'andi', name: 'Andi', url: 'https://andisearch.com/', color: '#ff6b6b', category: 'Search', description: 'Conversational search' },
  
  // Multi-Model Platforms
  { id: 'poe', name: 'Poe', url: 'https://poe.com/', color: '#ff6b6b', category: 'Multi-Model', description: 'Multiple AI models' },
  { id: 'huggingchat', name: 'HuggingChat', url: 'https://huggingface.co/chat/', color: '#ff9d00', category: 'Multi-Model', description: 'Open source models' },
  
  // Open Source AI
  { id: 'llama', name: 'Meta AI', url: 'https://www.meta.ai/', color: '#0668e1', category: 'Open Source', description: 'Meta Llama models' },
  { id: 'mistral', name: 'Mistral AI', url: 'https://chat.mistral.ai/', color: '#f2690b', category: 'Open Source', description: 'Mistral AI' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/', color: '#2d5a8c', category: 'Open Source', description: 'DeepSeek AI' },
  
  // Chinese AI Platforms
  { id: 'ernie', name: 'ERNIE Bot', url: 'https://yiyan.baidu.com/', color: '#de3f31', category: 'Chinese', description: 'Baidu ERNIE' },
  { id: 'tongyi', name: 'Tongyi Qianwen', url: 'https://tongyi.aliyun.com/', color: '#ff6a00', category: 'Chinese', description: 'Alibaba Tongyi' },
  { id: 'chatglm', name: 'ChatGLM', url: 'https://chatglm.cn/', color: '#4f46e5', category: 'Chinese', description: 'Zhipu AI ChatGLM' },
  { id: 'spark', name: 'iFlytek Spark', url: 'https://xinghuo.xfyun.cn/', color: '#0078ff', category: 'Chinese', description: 'iFlytek Spark' },
  { id: 'tiangong', name: 'Tiangong AI', url: 'https://www.tiangong.cn/', color: '#1890ff', category: 'Chinese', description: 'Kunlun Tiangong' },
  { id: 'sensechat', name: 'SenseChat', url: 'https://chat.sensetime.com/', color: '#00b4d8', category: 'Chinese', description: 'SenseTime AI' },
  { id: 'doubao', name: 'ByteDance Doubao', url: 'https://www.doubao.com/', color: '#ff4757', category: 'Chinese', description: 'ByteDance Doubao' },
  
  // Specialized AI
  { id: 'character', name: 'Character.AI', url: 'https://character.ai/', color: '#6c5ce7', category: 'Specialized', description: 'Character roleplay' },
  { id: 'jasper', name: 'Jasper AI', url: 'https://www.jasper.ai/', color: '#6f3ff4', category: 'Specialized', description: 'Content creation' },
  { id: 'writesonic', name: 'Writesonic', url: 'https://writesonic.com/', color: '#6c5ce7', category: 'Specialized', description: 'AI writing' },
  { id: 'copy', name: 'Copy.ai', url: 'https://www.copy.ai/', color: '#00d4ff', category: 'Specialized', description: 'Marketing copy' },
  { id: 'rytr', name: 'Rytr', url: 'https://rytr.me/', color: '#2f80ed', category: 'Specialized', description: 'AI writing tool' },
  { id: 'chatpdf', name: 'ChatPDF', url: 'https://www.chatpdf.com/', color: '#ef4444', category: 'Specialized', description: 'Chat with PDFs' },
  { id: 'humata', name: 'Humata AI', url: 'https://www.humata.ai/', color: '#8b5cf6', category: 'Specialized', description: 'Document AI' },
  
  // Code-Focused AI
  { id: 'codeium', name: 'Codeium Chat', url: 'https://codeium.com/chat', color: '#09b6a2', category: 'Coding', description: 'AI coding assistant' },
  { id: 'tabnine', name: 'Tabnine', url: 'https://www.tabnine.com/', color: '#5b48d9', category: 'Coding', description: 'AI code completion' },
  { id: 'replit', name: 'Replit AI', url: 'https://replit.com/ai', color: '#f26207', category: 'Coding', description: 'Collaborative coding' },
  { id: 'cursor', name: 'Cursor', url: 'https://cursor.sh/', color: '#000000', category: 'Coding', description: 'AI-powered IDE' },
  { id: 'github-copilot', name: 'GitHub Copilot', url: 'https://github.com/features/copilot', color: '#24292e', category: 'Coding', description: 'GitHub AI pair programmer' },
  
  // Regional AI
  { id: 'clova', name: 'Clova X', url: 'https://clova-x.naver.com/', color: '#03c75a', category: 'Regional', description: 'Naver Clova (Korea)' },
  { id: 'wrtn', name: 'Wrtn', url: 'https://wrtn.ai/', color: '#5b4dff', category: 'Regional', description: 'Korean AI platform' },
  { id: 'yandex', name: 'YandexGPT', url: 'https://300.ya.ru/', color: '#fc3f1d', category: 'Regional', description: 'Yandex AI (Russia)' },
  
  // Educational AI
  { id: 'khanmigo', name: 'Khanmigo', url: 'https://www.khanacademy.org/khan-labs', color: '#14bf96', category: 'Education', description: 'Khan Academy AI tutor' },
  { id: 'socratic', name: 'Socratic', url: 'https://socratic.org/', color: '#4285f4', category: 'Education', description: 'Google Socratic' },
  
  // Creative AI
  { id: 'midjourney', name: 'Midjourney', url: 'https://www.midjourney.com/', color: '#000000', category: 'Creative', description: 'AI image generation' },
  { id: 'dall-e', name: 'DALL-E', url: 'https://labs.openai.com/', color: '#10a37f', category: 'Creative', description: 'OpenAI image AI' },
  { id: 'leonardo', name: 'Leonardo.ai', url: 'https://leonardo.ai/', color: '#8b5cf6', category: 'Creative', description: 'AI art platform' },
  { id: 'playground', name: 'Playground AI', url: 'https://playgroundai.com/', color: '#ff6b6b', category: 'Creative', description: 'AI image creation' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', url: 'https://stablediffusionweb.com/', color: '#7c3aed', category: 'Creative', description: 'Open source image AI' },
  
  // Voice & Audio AI
  { id: 'elevenlabs', name: 'ElevenLabs', url: 'https://elevenlabs.io/', color: '#000000', category: 'Voice', description: 'AI voice synthesis' },
  { id: 'murf', name: 'Murf AI', url: 'https://murf.ai/', color: '#6c5ce7', category: 'Voice', description: 'AI voiceover' },
  
  // Experimental & Research
  { id: 'pi', name: 'Pi (Inflection)', url: 'https://pi.ai/', color: '#6366f1', category: 'Experimental', description: 'Personal AI assistant' },
  { id: 'cohere', name: 'Cohere Chat', url: 'https://coral.cohere.com/', color: '#d18ee2', category: 'Experimental', description: 'Cohere AI' },
  { id: 'ai21', name: 'AI21 Studio', url: 'https://studio.ai21.com/', color: '#4f46e5', category: 'Experimental', description: 'AI21 Labs' },
  
  // Open Source Platforms
  { id: 'lmsys', name: 'LMSYS Chat', url: 'https://chat.lmsys.org/', color: '#f97316', category: 'Open Source', description: 'Compare LLMs' },
  { id: 'ollama', name: 'Ollama', url: 'https://ollama.ai/', color: '#000000', category: 'Open Source', description: 'Local LLM runner' },
  
  // Productivity AI
  { id: 'notion', name: 'Notion AI', url: 'https://www.notion.so/product/ai', color: '#000000', category: 'Productivity', description: 'Notion AI assistant' },
  { id: 'mem', name: 'Mem', url: 'https://get.mem.ai/', color: '#6366f1', category: 'Productivity', description: 'AI note-taking' },
  { id: 'otter', name: 'Otter.ai', url: 'https://otter.ai/', color: '#1e90ff', category: 'Productivity', description: 'AI meeting notes' },
  
  // Additional Platforms
  { id: 'forefront', name: 'Forefront', url: 'https://www.forefront.ai/', color: '#6366f1', category: 'Multi-Model', description: 'Multi-model platform' },
  { id: 'ora', name: 'Ora.ai', url: 'https://ora.ai/', color: '#ff6b9d', category: 'Multi-Model', description: 'Create AI chatbots' },
  { id: 'nat', name: 'Nat.dev', url: 'https://nat.dev/', color: '#10b981', category: 'Multi-Model', description: 'AI chat interface' },
  
  // Japanese AI
  { id: 'rinna', name: 'Rinna AI', url: 'https://www.rinna.jp/', color: '#ff69b4', category: 'Regional', description: 'Japanese conversational AI' },
  
  // Developer Platforms
  { id: 'anthropic-api', name: 'Claude API Playground', url: 'https://console.anthropic.com/', color: '#d97757', category: 'Developer', description: 'Anthropic Console' },
  { id: 'openai-playground', name: 'OpenAI Playground', url: 'https://platform.openai.com/playground', color: '#10a37f', category: 'Developer', description: 'OpenAI Playground' },
];

function App() {
  const [activeLLMs, setActiveLLMs] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openWindows, setOpenWindows] = useState({});

  const categories = ['All', ...new Set(ALL_LLMS.map(llm => llm.category))];

  const handleDragStart = (e, llm) => {
    setDraggedItem(llm);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem && !activeLLMs.find(llm => llm.id === draggedItem.id)) {
      setActiveLLMs([...activeLLMs, draggedItem]);
    }
    setDraggedItem(null);
  };

  const removeLLM = (id) => {
    setActiveLLMs(activeLLMs.filter(llm => llm.id !== id));
    if (openWindows[id]) {
      openWindows[id].close();
      const newWindows = { ...openWindows };
      delete newWindows[id];
      setOpenWindows(newWindows);
    }
  };

  const openInNewWindow = (llm) => {
    const width = 1000;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=yes,status=yes`;
    const newWindow = window.open(llm.url, `llm_${llm.id}`, windowFeatures);
    setOpenWindows({ ...openWindows, [llm.id]: newWindow });
  };

  const filteredLLMs = selectedCategory === 'All' 
    ? ALL_LLMS 
    : ALL_LLMS.filter(llm => llm.category === selectedCategory);

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <div className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-200 flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold mb-2">LLM Hub</h1>
          <p className="text-sm text-gray-600">Drag & drop AI models to compare</p>
          <p className="text-xs text-gray-500 mt-2">{ALL_LLMS.length} AI platforms available</p>
        </div>

        {/* Category Filter */}
        <div className="px-4 py-3 border-b border-gray-200 overflow-x-auto">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* LLM List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredLLMs.map(llm => (
              <div
                key={llm.id}
                draggable
                onDragStart={(e) => handleDragStart(e, llm)}
                className="p-3 border border-gray-200 rounded-lg cursor-move hover:border-gray-400 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: llm.color }}
                      />
                      <h3 className="font-medium text-sm">{llm.name}</h3>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{llm.description}</p>
                    <span className="text-xs text-gray-500 mt-1 inline-block">{llm.category}</span>
                  </div>
                  <Grip className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Layout className="w-5 h-5" />
          </button>
          <div className="text-sm text-gray-600">
            {activeLLMs.length} {activeLLMs.length === 1 ? 'model' : 'models'} active
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveLLMs([])}
              className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Drop Zone / Active LLMs */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex-1 overflow-hidden"
        >
          {activeLLMs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Drop AI models here</p>
                <p className="text-sm mt-2">Drag from the sidebar to start comparing</p>
              </div>
            </div>
          ) : (
            <div className={`h-full grid gap-2 p-2 ${
              activeLLMs.length === 1 ? 'grid-cols-1' :
              activeLLMs.length === 2 ? 'grid-cols-2' :
              activeLLMs.length === 3 ? 'grid-cols-3' :
              activeLLMs.length === 4 ? 'grid-cols-2 grid-rows-2' :
              'grid-cols-3'
            }`}>
              {activeLLMs.map((llm) => (
                <div
                  key={llm.id}
                  className="relative border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col"
                >
                  {/* LLM Header */}
                  <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: llm.color }}
                      />
                      <span className="font-medium text-sm">{llm.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openInNewWindow(llm)}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        title="Open in new window"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeLLM(llm.id)}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 relative bg-gray-50">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center space-y-4">
                        <AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">
                            Direct Embedding Not Available
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {llm.name} cannot be embedded due to browser security restrictions.
                          </p>
                          <div className="space-y-2">
                            <button
                              onClick={() => openInNewWindow(llm)}
                              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Open in New Window
                            </button>
                            <a
                              href={llm.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-center text-sm"
                            >
                              Open in New Tab
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;